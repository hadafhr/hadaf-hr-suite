-- FINAL CRITICAL SECURITY FIX - Phase 2: Remaining Function Security and Auth Config

-- Step 1: Fix remaining functions with mutable search paths
CREATE OR REPLACE FUNCTION public.generate_disciplinary_case_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  case_number TEXT;
  current_year TEXT;
  sequence_num INTEGER;
BEGIN
  current_year := EXTRACT(YEAR FROM NOW())::TEXT;
  
  -- احصل على آخر رقم تسلسلي للسنة الحالية
  SELECT COALESCE(MAX(CAST(SUBSTRING(case_number FROM 'DC-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM disciplinary_actions
  WHERE case_number LIKE 'DC-' || current_year || '-%';
  
  -- إنشاء الرقم الجديد
  case_number := 'DC-' || current_year || '-' || LPAD(sequence_num::TEXT, 4, '0');
  
  RETURN case_number;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_employee_disciplinary_record()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- تحديث أو إنشاء سجل الموظف التأديبي
  INSERT INTO employee_disciplinary_record (
    employee_id, 
    company_id, 
    disciplinary_action_id,
    violation_count,
    total_warnings,
    last_violation_date
  )
  VALUES (
    NEW.employee_id,
    NEW.company_id,
    NEW.id,
    1,
    CASE WHEN NEW.action_type IN ('verbal_warning', 'written_warning', 'final_warning') THEN 1 ELSE 0 END,
    NEW.violation_date
  )
  ON CONFLICT (employee_id, company_id) 
  DO UPDATE SET
    violation_count = employee_disciplinary_record.violation_count + 1,
    total_warnings = employee_disciplinary_record.total_warnings + 
      CASE WHEN NEW.action_type IN ('verbal_warning', 'written_warning', 'final_warning') THEN 1 ELSE 0 END,
    total_penalties = employee_disciplinary_record.total_penalties + COALESCE(NEW.penalty_amount, 0),
    last_violation_date = NEW.violation_date,
    updated_at = now();
    
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_and_create_attendance_violations(p_employee_id uuid, p_company_id uuid)
RETURNS TABLE(violation_type text, count integer, action_created boolean, suggested_action text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  late_count INTEGER;
  absent_count INTEGER;
  early_leave_count INTEGER;
  case_num TEXT;
BEGIN
  -- فحص التأخير المتكرر (أكثر من 3 مرات في الشهر)
  SELECT COUNT(*) INTO late_count
  FROM attendance_records_new 
  WHERE employee_id = p_employee_id 
    AND status = 'late'
    AND attendance_date >= CURRENT_DATE - INTERVAL '30 days';
    
  IF late_count >= 3 THEN
    -- إنشاء إجراء تأديبي تلقائي للتأخير
    SELECT generate_disciplinary_case_number() INTO case_num;
    
    INSERT INTO disciplinary_actions (
      company_id, employee_id, violation_id, case_number,
      violation_date, reported_by, description, action_type, status
    )
    SELECT 
      p_company_id, p_employee_id, v.id, case_num,
      CURRENT_DATE, auth.uid(), 
      'تأخير متكرر تم رصده تلقائياً: ' || late_count || ' مرات في آخر 30 يوم',
      CASE 
        WHEN late_count >= 5 THEN 'written_warning'::disciplinary_action_type
        ELSE 'verbal_warning'::disciplinary_action_type
      END,
      'pending'::disciplinary_status
    FROM saudi_labor_violations v 
    WHERE v.violation_code = 'ATT001'
    ON CONFLICT (case_number) DO NOTHING;
    
    RETURN QUERY SELECT 
      'التأخير المتكرر'::TEXT,
      late_count,
      true,
      CASE 
        WHEN late_count >= 5 THEN 'إنذار كتابي وخصم راتب'
        ELSE 'إنذار شفهي'
      END;
  END IF;
    
  -- فحص الغياب بدون إذن
  SELECT COUNT(*) INTO absent_count
  FROM attendance_records_new 
  WHERE employee_id = p_employee_id 
    AND status = 'absent'
    AND attendance_date >= CURRENT_DATE - INTERVAL '30 days';
    
  IF absent_count >= 1 THEN
    -- إنشاء إجراء تأديبي تلقائي للغياب
    SELECT generate_disciplinary_case_number() INTO case_num;
    
    INSERT INTO disciplinary_actions (
      company_id, employee_id, violation_id, case_number,
      violation_date, reported_by, description, action_type, status
    )
    SELECT 
      p_company_id, p_employee_id, v.id, case_num,
      CURRENT_DATE, auth.uid(), 
      'غياب بدون إذن تم رصده تلقائياً: ' || absent_count || ' مرات في آخر 30 يوم',
      CASE 
        WHEN absent_count >= 3 THEN 'termination'::disciplinary_action_type
        WHEN absent_count >= 2 THEN 'salary_deduction'::disciplinary_action_type
        ELSE 'written_warning'::disciplinary_action_type
      END,
      'pending'::disciplinary_status
    FROM saudi_labor_violations v 
    WHERE v.violation_code = 'ATT002'
    ON CONFLICT (case_number) DO NOTHING;
    
    RETURN QUERY SELECT 
      'الغياب بدون إذن'::TEXT,
      absent_count,
      true,
      CASE 
        WHEN absent_count >= 3 THEN 'إنهاء الخدمة'
        WHEN absent_count >= 2 THEN 'خصم راتب ثلاثة أيام'
        ELSE 'خصم راتب يوم واحد'
      END;
  END IF;
  
  -- فحص الانصراف المبكر
  SELECT COUNT(*) INTO early_leave_count
  FROM attendance_records_new 
  WHERE employee_id = p_employee_id 
    AND status = 'early_leave'
    AND attendance_date >= CURRENT_DATE - INTERVAL '30 days';
    
  IF early_leave_count >= 5 THEN
    RETURN QUERY SELECT 
      'الانصراف المبكر'::TEXT,
      early_leave_count,
      false,
      'إنذار كتابي'::TEXT;
  END IF;
END;
$function$;

-- Step 2: Create additional security function for employee data access control
CREATE OR REPLACE FUNCTION public.secure_employee_access_check(_user_id uuid, _employee_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 
    FROM boud_employees e
    WHERE e.id = _employee_id
      AND (
        -- Employee can access their own data
        e.user_id = _user_id 
        OR 
        -- HR managers and super admins can access company employee data
        (boud_has_role(_user_id, e.company_id, 'super_admin'::user_role) OR boud_has_role(_user_id, e.company_id, 'hr_manager'::user_role))
      )
  )
$function$;

-- Step 3: Create audit log triggers for sensitive table access
CREATE OR REPLACE FUNCTION public.log_employee_data_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only log access, not modifications (which are handled elsewhere)
  IF TG_OP = 'SELECT' THEN
    INSERT INTO audit_logs (
      table_name,
      operation,
      user_id,
      record_id,
      details,
      created_at
    ) VALUES (
      TG_TABLE_NAME,
      'DATA_ACCESS',
      auth.uid(),
      CASE 
        WHEN TG_TABLE_NAME = 'boud_employees' THEN COALESCE(NEW.id, OLD.id)
        WHEN TG_TABLE_NAME = 'hr_employees' THEN COALESCE(NEW.id, OLD.id)
        ELSE NULL
      END,
      jsonb_build_object(
        'accessed_by', auth.uid(),
        'access_time', now(),
        'table_accessed', TG_TABLE_NAME
      ),
      now()
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail queries if audit logging fails
    RETURN COALESCE(NEW, OLD);
END;
$function$;