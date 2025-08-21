-- إنشاء نظام الإشعارات المتقدم للموظفين
CREATE TABLE IF NOT EXISTS employee_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  company_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  notification_type TEXT NOT NULL DEFAULT 'info', -- info, warning, success, error
  action_type TEXT, -- attendance, leave, performance, disciplinary, promotion, etc
  related_id UUID, -- ID للإجراء المرتبط
  is_read BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- إنشاء فهرس للاستعلامات السريعة
CREATE INDEX IF NOT EXISTS idx_employee_notifications_employee_id ON employee_notifications(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_notifications_company_id ON employee_notifications(company_id);
CREATE INDEX IF NOT EXISTS idx_employee_notifications_unread ON employee_notifications(employee_id, is_read) WHERE is_read = FALSE;

-- تفعيل RLS
ALTER TABLE employee_notifications ENABLE ROW LEVEL SECURITY;

-- سياسة للموظفين لرؤية إشعاراتهم فقط
CREATE POLICY "employees_view_own_notifications" ON employee_notifications
FOR SELECT USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

-- سياسة للموارد البشرية لإدارة الإشعارات
CREATE POLICY "hr_manage_notifications" ON employee_notifications
FOR ALL USING (
  company_id IN (
    SELECT company_id FROM boud_employees 
    WHERE user_id = auth.uid() 
    AND (
      boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    )
  )
);

-- سياسة للنظام لإنشاء إشعارات
CREATE POLICY "system_create_notifications" ON employee_notifications
FOR INSERT WITH CHECK (true);

-- إنشاء نظام رفع المستندات
CREATE TABLE IF NOT EXISTS employee_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  company_id UUID,
  document_type TEXT NOT NULL, -- national_id, passport, certificate, other
  document_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_by UUID DEFAULT auth.uid(),
  is_verified BOOLEAN DEFAULT FALSE,
  verified_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- فهرس للمستندات
CREATE INDEX IF NOT EXISTS idx_employee_documents_employee ON employee_documents(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_documents_type ON employee_documents(document_type);

-- تفعيل RLS للمستندات
ALTER TABLE employee_documents ENABLE ROW LEVEL SECURITY;

-- سياسة للموظفين لإدارة مستنداتهم
CREATE POLICY "employees_manage_own_documents" ON employee_documents
FOR ALL USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
) WITH CHECK (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

-- سياسة للموارد البشرية لرؤية جميع المستندات
CREATE POLICY "hr_view_all_documents" ON employee_documents
FOR SELECT USING (
  company_id IN (
    SELECT company_id FROM boud_employees 
    WHERE user_id = auth.uid() 
    AND (
      boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    )
  )
);

-- إنشاء نظام الحضور المتقدم مع GPS
CREATE TABLE IF NOT EXISTS employee_attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  company_id UUID,
  attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  check_in_location JSONB, -- {lat, lng, address}
  check_out_location JSONB,
  break_start_time TIMESTAMP WITH TIME ZONE,
  break_end_time TIMESTAMP WITH TIME ZONE,
  total_hours NUMERIC(4,2),
  overtime_hours NUMERIC(4,2) DEFAULT 0,
  status TEXT DEFAULT 'present', -- present, absent, late, half_day, sick_leave
  notes TEXT,
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- فهرس للحضور
CREATE INDEX IF NOT EXISTS idx_attendance_employee_date ON employee_attendance_records(employee_id, attendance_date);
CREATE INDEX IF NOT EXISTS idx_attendance_company_date ON employee_attendance_records(company_id, attendance_date);

-- تفعيل RLS للحضور
ALTER TABLE employee_attendance_records ENABLE ROW LEVEL SECURITY;

-- سياسة للموظفين لإدارة حضورهم
CREATE POLICY "employees_manage_own_attendance" ON employee_attendance_records
FOR ALL USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
) WITH CHECK (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

-- سياسة للموارد البشرية لإدارة الحضور
CREATE POLICY "hr_manage_attendance" ON employee_attendance_records
FOR ALL USING (
  company_id IN (
    SELECT company_id FROM boud_employees 
    WHERE user_id = auth.uid() 
    AND (
      boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    )
  )
);

-- إنشاء نظام كلمات المرور المؤقتة
CREATE TABLE IF NOT EXISTS employee_temporary_passwords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL UNIQUE,
  temp_password TEXT NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تفعيل RLS
ALTER TABLE employee_temporary_passwords ENABLE ROW LEVEL SECURITY;

-- سياسة للموارد البشرية فقط
CREATE POLICY "hr_manage_temp_passwords" ON employee_temporary_passwords
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
       OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
  )
);

-- إنشاء دالة لإنشاء كلمة مرور مؤقتة
CREATE OR REPLACE FUNCTION generate_temp_password()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$;

-- إنشاء دالة لإرسال إشعار تلقائي للموظف
CREATE OR REPLACE FUNCTION create_employee_notification(
  p_employee_id UUID,
  p_title TEXT,
  p_description TEXT,
  p_notification_type TEXT DEFAULT 'info',
  p_action_type TEXT DEFAULT NULL,
  p_related_id UUID DEFAULT NULL,
  p_priority TEXT DEFAULT 'medium'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  notification_id UUID;
  employee_company_id UUID;
BEGIN
  -- الحصول على company_id للموظف
  SELECT company_id INTO employee_company_id 
  FROM boud_employees 
  WHERE id = p_employee_id;
  
  -- إنشاء الإشعار
  INSERT INTO employee_notifications (
    employee_id, company_id, title, description, 
    notification_type, action_type, related_id, priority
  ) VALUES (
    p_employee_id, employee_company_id, p_title, p_description,
    p_notification_type, p_action_type, p_related_id, p_priority
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- إنشاء trigger لإرسال إشعارات تلقائية عند تحديث بيانات الموظف
CREATE OR REPLACE FUNCTION notify_employee_on_update()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- عند تحديث الراتب الأساسي
  IF OLD.basic_salary IS DISTINCT FROM NEW.basic_salary THEN
    PERFORM create_employee_notification(
      NEW.id,
      'تحديث الراتب الأساسي',
      'تم تحديث راتبك الأساسي من ' || COALESCE(OLD.basic_salary::TEXT, '0') || ' إلى ' || NEW.basic_salary::TEXT || ' ريال',
      'success',
      'salary_update'
    );
  END IF;
  
  -- عند تحديث المنصب
  IF OLD.position_id IS DISTINCT FROM NEW.position_id THEN
    PERFORM create_employee_notification(
      NEW.id,
      'تحديث المنصب',
      'تم تحديث منصبك الوظيفي',
      'info',
      'position_update'
    );
  END IF;
  
  -- عند تحديث حالة التوظيف
  IF OLD.employment_status IS DISTINCT FROM NEW.employment_status THEN
    PERFORM create_employee_notification(
      NEW.id,
      'تحديث حالة التوظيف',
      'تم تحديث حالة توظيفك إلى: ' || NEW.employment_status::TEXT,
      CASE 
        WHEN NEW.employment_status = 'active' THEN 'success'
        WHEN NEW.employment_status IN ('terminated', 'suspended') THEN 'warning'
        ELSE 'info'
      END,
      'employment_status_update'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- ربط الـ trigger بجدول الموظفين
DROP TRIGGER IF EXISTS employee_update_notification ON boud_employees;
CREATE TRIGGER employee_update_notification
  AFTER UPDATE ON boud_employees
  FOR EACH ROW
  EXECUTE FUNCTION notify_employee_on_update();

-- trigger للإشعار عند إضافة موظف جديد
CREATE OR REPLACE FUNCTION notify_new_employee()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  temp_password TEXT;
BEGIN
  -- إنشاء كلمة مرور مؤقتة
  temp_password := generate_temp_password();
  
  -- حفظ كلمة المرور المؤقتة
  INSERT INTO employee_temporary_passwords (employee_id, temp_password)
  VALUES (NEW.id, temp_password);
  
  -- إنشاء إشعار ترحيبي
  PERFORM create_employee_notification(
    NEW.id,
    'مرحباً بك في منصة بُعد HR',
    'تم إنشاء حسابك بنجاح. رقمك الوظيفي: ' || NEW.employee_id || '. تحقق من بريدك الإلكتروني للحصول على بيانات الدخول.',
    'success',
    'welcome',
    NEW.id,
    'high'
  );
  
  RETURN NEW;
END;
$$;

-- ربط الـ trigger بجدول الموظفين للموظفين الجدد
DROP TRIGGER IF EXISTS new_employee_notification ON boud_employees;
CREATE TRIGGER new_employee_notification
  AFTER INSERT ON boud_employees
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_employee();

-- إنشاء دالة للحصول على إحصائيات الحضور
CREATE OR REPLACE FUNCTION get_employee_attendance_stats(p_employee_id UUID, p_month INTEGER DEFAULT NULL, p_year INTEGER DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stats JSONB;
  target_month INTEGER;
  target_year INTEGER;
BEGIN
  target_month := COALESCE(p_month, EXTRACT(MONTH FROM CURRENT_DATE)::INTEGER);
  target_year := COALESCE(p_year, EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER);
  
  SELECT jsonb_build_object(
    'total_days', COUNT(*),
    'present_days', COUNT(*) FILTER (WHERE status = 'present'),
    'absent_days', COUNT(*) FILTER (WHERE status = 'absent'),
    'late_days', COUNT(*) FILTER (WHERE status = 'late'),
    'total_hours', COALESCE(SUM(total_hours), 0),
    'overtime_hours', COALESCE(SUM(overtime_hours), 0),
    'month', target_month,
    'year', target_year
  ) INTO stats
  FROM employee_attendance_records
  WHERE employee_id = p_employee_id
    AND EXTRACT(MONTH FROM attendance_date) = target_month
    AND EXTRACT(YEAR FROM attendance_date) = target_year;
    
  RETURN stats;
END;
$$;

-- إنشاء دالة لتحديث الموقع الجغرافي للحضور
CREATE OR REPLACE FUNCTION update_attendance_location(
  p_attendance_id UUID,
  p_location JSONB,
  p_is_check_out BOOLEAN DEFAULT FALSE
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_is_check_out THEN
    UPDATE employee_attendance_records 
    SET check_out_location = p_location,
        check_out_time = NOW(),
        updated_at = NOW()
    WHERE id = p_attendance_id;
  ELSE
    UPDATE employee_attendance_records 
    SET check_in_location = p_location,
        check_in_time = NOW(),
        updated_at = NOW()
    WHERE id = p_attendance_id;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- إنشاء bucket للمستندات إذا لم يكن موجود
INSERT INTO storage.buckets (id, name, public) 
VALUES ('employee-documents', 'employee-documents', false)
ON CONFLICT (id) DO NOTHING;

-- سياسات التخزين للمستندات
CREATE POLICY "employees_upload_documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'employee-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "employees_view_own_documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'employee-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "hr_view_all_documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'employee-documents' AND
  EXISTS (
    SELECT 1 FROM boud_employees e
    WHERE e.user_id = auth.uid()
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);