-- إنشاء جدول الصلاحيات المخصصة للأقسام
CREATE TABLE IF NOT EXISTS public.department_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  permission_code TEXT NOT NULL,
  permission_name_ar TEXT NOT NULL,
  permission_name_en TEXT,
  category TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إنشاء جدول صلاحيات المستخدمين لكل قسم
CREATE TABLE IF NOT EXISTS public.user_department_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_id UUID NOT NULL,
  department_id UUID,
  permission_code TEXT NOT NULL,
  granted_by UUID,
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, company_id, department_id, permission_code)
);

-- إنشاء enum للأدوار المحدثة
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'company_role') THEN
        CREATE TYPE company_role AS ENUM (
            'super_admin',
            'hr_manager', 
            'hr_admin',
            'department_manager',
            'team_leader',
            'senior_employee',
            'employee',
            'trainee'
        );
    END IF;
END
$$;

-- تحديث جدول الأدوار ليدعم الأقسام
CREATE TABLE IF NOT EXISTS public.user_company_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_id UUID NOT NULL,
  role company_role NOT NULL,
  department_id UUID,
  assigned_by UUID,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  valid_from DATE DEFAULT CURRENT_DATE,
  valid_until DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, company_id, department_id, role)
);

-- إضافة الصلاحيات الأساسية
INSERT INTO public.department_permissions (permission_code, permission_name_ar, permission_name_en, category, description) VALUES
-- صلاحيات إدارة الموظفين
('manage_employees', 'إدارة الموظفين', 'Manage Employees', 'hr', 'إضافة وتعديل وحذف بيانات الموظفين في القسم'),
('view_employees', 'عرض بيانات الموظفين', 'View Employees', 'hr', 'عرض بيانات الموظفين في القسم'),
('manage_attendance', 'إدارة الحضور والانصراف', 'Manage Attendance', 'hr', 'إدارة سجلات الحضور والانصراف للموظفين'),
('view_attendance', 'عرض الحضور والانصراف', 'View Attendance', 'hr', 'عرض سجلات الحضور والانصراف'),
('manage_leaves', 'إدارة الإجازات', 'Manage Leaves', 'hr', 'الموافقة على طلبات الإجازات ومراجعتها'),
('view_leaves', 'عرض الإجازات', 'View Leaves', 'hr', 'عرض طلبات الإجازات'),

-- صلاحيات الرواتب
('manage_payroll', 'إدارة الرواتب', 'Manage Payroll', 'finance', 'إعداد ومعالجة رواتب الموظفين'),
('view_payroll', 'عرض الرواتب', 'View Payroll', 'finance', 'عرض تفاصيل رواتب الموظفين'),
('approve_payroll', 'اعتماد الرواتب', 'Approve Payroll', 'finance', 'اعتماد رواتب الموظفين قبل الصرف'),

-- صلاحيات التقارير
('view_reports', 'عرض التقارير', 'View Reports', 'reports', 'عرض التقارير الإدارية والإحصائية'),
('generate_reports', 'إنشاء التقارير', 'Generate Reports', 'reports', 'إنشاء وتخصيص التقارير'),
('export_reports', 'تصدير التقارير', 'Export Reports', 'reports', 'تصدير التقارير بصيغ مختلفة'),

-- صلاحيات إدارة القسم
('manage_department', 'إدارة القسم', 'Manage Department', 'management', 'إدارة شؤون القسم والإعدادات'),
('view_department_analytics', 'عرض تحليلات القسم', 'View Department Analytics', 'analytics', 'عرض تحليلات أداء القسم'),
('manage_department_budget', 'إدارة ميزانية القسم', 'Manage Department Budget', 'finance', 'إدارة ميزانية وموارد القسم'),

-- صلاحيات التقييم والأداء
('manage_evaluations', 'إدارة التقييمات', 'Manage Evaluations', 'performance', 'إجراء وإدارة تقييمات الأداء'),
('view_evaluations', 'عرض التقييمات', 'View Evaluations', 'performance', 'عرض نتائج تقييمات الأداء'),
('conduct_interviews', 'إجراء المقابلات', 'Conduct Interviews', 'hr', 'إجراء مقابلات التوظيف والترقية'),

-- صلاحيات التدريب والتطوير
('manage_training', 'إدارة التدريب', 'Manage Training', 'development', 'إدارة برامج التدريب والتطوير'),
('view_training', 'عرض التدريب', 'View Training', 'development', 'عرض برامج وسجلات التدريب'),
('approve_training', 'اعتماد التدريب', 'Approve Training', 'development', 'اعتماد طلبات التدريب والدورات'),

-- صلاحيات النظام
('system_admin', 'إدارة النظام', 'System Administration', 'system', 'صلاحيات كاملة لإدارة النظام'),
('backup_data', 'نسخ احتياطي للبيانات', 'Backup Data', 'system', 'إنشاء نسخ احتياطية للبيانات'),
('audit_logs', 'عرض سجلات التدقيق', 'View Audit Logs', 'system', 'عرض سجلات نشاطات النظام');

-- تمكين RLS
ALTER TABLE public.department_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_department_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_company_roles ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للصلاحيات
CREATE POLICY "company_users_view_permissions" ON public.department_permissions
  FOR SELECT USING (true);

CREATE POLICY "hr_manage_department_permissions" ON public.user_department_permissions
  FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
  );

CREATE POLICY "users_view_own_department_permissions" ON public.user_department_permissions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "hr_manage_company_roles" ON public.user_company_roles
  FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
  );

CREATE POLICY "users_view_own_company_roles" ON public.user_company_roles
  FOR SELECT USING (user_id = auth.uid());

-- دالة للتحقق من صلاحية المستخدم في قسم معين
CREATE OR REPLACE FUNCTION public.user_has_department_permission(
  _user_id UUID,
  _company_id UUID,
  _department_id UUID,
  _permission_code TEXT
) RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_department_permissions udp
    WHERE udp.user_id = _user_id 
      AND udp.company_id = _company_id
      AND (udp.department_id = _department_id OR udp.department_id IS NULL)
      AND udp.permission_code = _permission_code
      AND udp.is_active = true
      AND (udp.expires_at IS NULL OR udp.expires_at > now())
  ) OR 
  -- Super admin لديه جميع الصلاحيات
  boud_has_role(_user_id, _company_id, 'super_admin'::user_role);
$$;

-- دالة لإضافة صلاحية لمستخدم في قسم
CREATE OR REPLACE FUNCTION public.grant_department_permission(
  _user_id UUID,
  _company_id UUID,
  _department_id UUID,
  _permission_code TEXT,
  _expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  permission_id UUID;
BEGIN
  -- التحقق من أن المستخدم الحالي لديه صلاحية منح الصلاحيات
  IF NOT (
    boud_has_role(auth.uid(), _company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), _company_id, 'hr_manager'::user_role)
  ) THEN
    RAISE EXCEPTION 'Access denied: insufficient permissions';
  END IF;

  -- إدراج أو تحديث الصلاحية
  INSERT INTO public.user_department_permissions (
    user_id, company_id, department_id, permission_code, 
    granted_by, expires_at, is_active
  ) VALUES (
    _user_id, _company_id, _department_id, _permission_code,
    auth.uid(), _expires_at, true
  )
  ON CONFLICT (user_id, company_id, department_id, permission_code)
  DO UPDATE SET
    is_active = true,
    expires_at = _expires_at,
    granted_by = auth.uid(),
    granted_at = now(),
    updated_at = now()
  RETURNING id INTO permission_id;

  RETURN permission_id;
END;
$$;

-- دالة لسحب صلاحية من مستخدم
CREATE OR REPLACE FUNCTION public.revoke_department_permission(
  _user_id UUID,
  _company_id UUID,
  _department_id UUID,
  _permission_code TEXT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- التحقق من الصلاحيات
  IF NOT (
    boud_has_role(auth.uid(), _company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), _company_id, 'hr_manager'::user_role)
  ) THEN
    RAISE EXCEPTION 'Access denied: insufficient permissions';
  END IF;

  -- إلغاء الصلاحية
  UPDATE public.user_department_permissions 
  SET is_active = false, updated_at = now()
  WHERE user_id = _user_id 
    AND company_id = _company_id
    AND department_id = _department_id
    AND permission_code = _permission_code;

  RETURN FOUND;
END;
$$;