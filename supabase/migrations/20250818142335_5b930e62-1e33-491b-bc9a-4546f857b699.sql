-- Phase 1: Critical Security Fixes

-- 1. Fix database function security by adding proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_decrypted_national_id(employee_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  result TEXT;
BEGIN
  -- Check if user has permission to view this employee's data
  IF NOT (
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'hr_manager'::user_role) OR
    auth.uid() = (SELECT user_id FROM boud_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(national_id_encrypted), national_id)
  INTO result
  FROM boud_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_decrypted_passport_number(employee_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  result TEXT;
BEGIN
  -- Check if user has permission to view this employee's data
  IF NOT (
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'hr_manager'::user_role) OR
    auth.uid() = (SELECT user_id FROM boud_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(passport_number_encrypted), passport_number)
  INTO result
  FROM boud_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_decrypted_bank_account(employee_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  result TEXT;
BEGIN
  -- Check if user has permission to view this employee's data
  IF NOT (
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'payroll_officer'::user_role) OR
    auth.uid() = (SELECT user_id FROM boud_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(bank_account_number_encrypted), bank_account_number)
  INTO result
  FROM boud_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_decrypted_iban(employee_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  result TEXT;
BEGIN
  -- Check if user has permission to view this employee's data
  IF NOT (
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), (SELECT company_id FROM boud_employees WHERE id = employee_id), 'payroll_officer'::user_role) OR
    auth.uid() = (SELECT user_id FROM boud_employees WHERE id = employee_id)
  ) THEN
    RETURN NULL;
  END IF;
  
  SELECT COALESCE(decrypt_sensitive_data(iban_encrypted), iban)
  INTO result
  FROM boud_employees
  WHERE id = employee_id;
  
  RETURN result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.encrypt_existing_employee_data()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  encrypted_count INTEGER := 0;
  emp_record RECORD;
BEGIN
  -- Encrypt existing sensitive data
  FOR emp_record IN 
    SELECT id, national_id, passport_number, bank_account_number, iban, phone
    FROM boud_employees 
    WHERE national_id_encrypted IS NULL AND national_id IS NOT NULL
  LOOP
    UPDATE boud_employees SET
      national_id_encrypted = CASE 
        WHEN emp_record.national_id IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.national_id) 
        ELSE NULL 
      END,
      passport_number_encrypted = CASE 
        WHEN emp_record.passport_number IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.passport_number) 
        ELSE NULL 
      END,
      bank_account_number_encrypted = CASE 
        WHEN emp_record.bank_account_number IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.bank_account_number) 
        ELSE NULL 
      END,
      iban_encrypted = CASE 
        WHEN emp_record.iban IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.iban) 
        ELSE NULL 
      END,
      phone_encrypted = CASE 
        WHEN emp_record.phone IS NOT NULL 
        THEN encrypt_sensitive_data(emp_record.phone) 
        ELSE NULL 
      END
    WHERE id = emp_record.id;
    
    encrypted_count := encrypted_count + 1;
  END LOOP;
  
  RETURN encrypted_count;
END;
$function$;

CREATE OR REPLACE FUNCTION public.encrypt_employee_sensitive_data()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Encrypt sensitive fields if they are being set
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.national_id IS DISTINCT FROM OLD.national_id) THEN
    NEW.national_id_encrypted := encrypt_sensitive_data(NEW.national_id);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.passport_number IS DISTINCT FROM OLD.passport_number) THEN
    NEW.passport_number_encrypted := encrypt_sensitive_data(NEW.passport_number);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.bank_account_number IS DISTINCT FROM OLD.bank_account_number) THEN
    NEW.bank_account_number_encrypted := encrypt_sensitive_data(NEW.bank_account_number);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.iban IS DISTINCT FROM OLD.iban) THEN
    NEW.iban_encrypted := encrypt_sensitive_data(NEW.iban);
  END IF;
  
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.phone IS DISTINCT FROM OLD.phone) THEN
    NEW.phone_encrypted := encrypt_sensitive_data(NEW.phone);
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_sensitive_data_access()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Log when someone accesses sensitive employee data
  INSERT INTO audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    'hr_employees',
    'SELECT',
    auth.uid(),
    NEW.id,
    jsonb_build_object(
      'accessed_by', auth.uid(),
      'employee_accessed', NEW.id,
      'company_id', NEW.company_id
    ),
    now()
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.boud_has_role(_user_id uuid, _company_id uuid, _role user_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.boud_user_roles
    WHERE user_id = _user_id 
      AND company_id = _company_id 
      AND role = _role 
      AND is_active = true
  )
$function$;

CREATE OR REPLACE FUNCTION public.boud_get_user_company_id(_user_id uuid)
 RETURNS uuid
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT company_id
  FROM public.boud_user_roles
  WHERE user_id = _user_id
    AND is_active = true
  LIMIT 1
$function$;

CREATE OR REPLACE FUNCTION public.get_employee_company_id(_user_id uuid)
 RETURNS uuid
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT company_id
  FROM public.boud_employees
  WHERE user_id = _user_id
  LIMIT 1
$function$;

CREATE OR REPLACE FUNCTION public.encrypt_sensitive_data(data text, key_id text DEFAULT 'default'::text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  IF data IS NULL OR data = '' THEN
    RETURN NULL;
  END IF;
  
  RETURN encode(
    encrypt_iv(
      data::bytea,
      decode(COALESCE(current_setting('app.encryption_key', true), 'default_key_32_chars_long_12345'), 'escape'),
      gen_random_bytes(16),
      'aes'
    ),
    'base64'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.decrypt_sensitive_data(encrypted_data text, key_id text DEFAULT 'default'::text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  IF encrypted_data IS NULL OR encrypted_data = '' THEN
    RETURN NULL;
  END IF;
  
  RETURN convert_from(
    decrypt_iv(
      decode(encrypted_data, 'base64'),
      decode(COALESCE(current_setting('app.encryption_key', true), 'default_key_32_chars_long_12345'), 'escape'),
      decode(substring(encrypted_data from 1 for 24), 'base64'),
      'aes'
    ),
    'utf8'
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.hr_has_role(_user_id uuid, _company_id uuid, _role hr_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.hr_user_roles
    WHERE user_id = _user_id 
      AND company_id = _company_id 
      AND role = _role 
      AND is_active = true
  )
$function$;

CREATE OR REPLACE FUNCTION public.get_user_company_id(_user_id uuid)
 RETURNS uuid
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT e.company_id
  FROM public.hr_employees e
  WHERE e.user_id = _user_id
  LIMIT 1
$function$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$function$;

CREATE OR REPLACE FUNCTION public.log_supplier_access()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.audit_logs (
    table_name,
    operation,
    user_id,
    record_id,
    details,
    created_at
  ) VALUES (
    'suppliers',
    TG_OP,
    auth.uid(),
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'accessed_by', auth.uid(),
      'supplier_code', COALESCE(NEW.supplier_code, OLD.supplier_code),
      'supplier_name', COALESCE(NEW.supplier_name, OLD.supplier_name),
      'user_id', COALESCE(NEW.user_id, OLD.user_id)
    ),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail the query if audit logging fails
    RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_admin_user()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  RAISE NOTICE 'Admin user creation function ready';
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_disciplinary_case_number()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
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
 SET search_path = 'public'
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
 SET search_path = 'public'
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

CREATE OR REPLACE FUNCTION public.secure_employee_access_check(_user_id uuid, _employee_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
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

CREATE OR REPLACE FUNCTION public.log_employee_data_access()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
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