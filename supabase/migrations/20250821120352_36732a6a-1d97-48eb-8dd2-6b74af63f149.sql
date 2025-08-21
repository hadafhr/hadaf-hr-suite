-- إنشاء نظام الإشعارات المتقدم للموظفين
CREATE TABLE IF NOT EXISTS employee_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
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

-- سياسة للموظفين لتحديث حالة قراءة إشعاراتهم
CREATE POLICY "employees_update_own_notifications" ON employee_notifications
FOR UPDATE USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
) WITH CHECK (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

-- سياسة للنظام لإنشاء إشعارات
CREATE POLICY "system_create_notifications" ON employee_notifications
FOR INSERT WITH CHECK (true);

-- إنشاء نظام رفع المستندات
CREATE TABLE IF NOT EXISTS employee_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
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
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.user_id = auth.uid() 
    AND e.company_id IS NOT NULL
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
  OR
  EXISTS (
    SELECT 1 FROM boud_employees emp
    WHERE emp.user_id = auth.uid()
    AND emp.company_id IS NOT NULL
    AND (
      boud_has_role(auth.uid(), emp.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), emp.company_id, 'hr_manager'::user_role)
    )
  )
);

-- إنشاء نظام الحضور المتقدم مع GPS
CREATE TABLE IF NOT EXISTS employee_attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
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
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id IS NOT NULL
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
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
    WHERE e.company_id IS NOT NULL
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
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
BEGIN
  -- إنشاء الإشعار
  INSERT INTO employee_notifications (
    employee_id, title, description, 
    notification_type, action_type, related_id, priority
  ) VALUES (
    p_employee_id, p_title, p_description,
    p_notification_type, p_action_type, p_related_id, p_priority
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;