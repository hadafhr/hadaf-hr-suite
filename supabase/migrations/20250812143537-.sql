-- إنشاء الأنواع المخصصة (Enums)
CREATE TYPE public.hr_role AS ENUM (
  'employee', 'line_manager', 'hr_officer', 'hr_manager', 'payroll_officer', 
  'finance', 'compliance_officer', 'er_officer', 'hse_officer', 'training_officer', 
  'exec', 'auditor', 'owner', 'npcs_manager', 'donor_reader'
);

CREATE TYPE public.request_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
CREATE TYPE public.workflow_status AS ENUM ('active', 'inactive', 'draft');
CREATE TYPE public.employee_status AS ENUM ('active', 'inactive', 'terminated', 'suspended');

-- جدول الشركات
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  company_code TEXT NOT NULL UNIQUE,
  commercial_register TEXT,
  vat_number TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  industry TEXT,
  employee_count INTEGER DEFAULT 0,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  owner_id UUID REFERENCES auth.users(id)
);

-- جدول الوحدات التنظيمية
CREATE TABLE public.org_units (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  unit_name TEXT NOT NULL,
  unit_code TEXT NOT NULL,
  parent_unit_id UUID REFERENCES org_units(id),
  manager_id UUID,
  cost_center TEXT,
  budget_amount DECIMAL(15,2) DEFAULT 0,
  level INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول الموظفين (محسن)
CREATE TABLE public.hr_employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  org_unit_id UUID REFERENCES org_units(id),
  manager_id UUID REFERENCES hr_employees(id),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  national_id TEXT,
  passport_number TEXT,
  nationality TEXT,
  position TEXT,
  job_title TEXT,
  grade TEXT,
  hire_date DATE,
  contract_start_date DATE,
  contract_end_date DATE,
  basic_salary DECIMAL(15,2) DEFAULT 0,
  housing_allowance DECIMAL(15,2) DEFAULT 0,
  transport_allowance DECIMAL(15,2) DEFAULT 0,
  other_allowances DECIMAL(15,2) DEFAULT 0,
  bank_name TEXT,
  iban TEXT,
  leave_balances JSONB DEFAULT '{}',
  profile_data JSONB DEFAULT '{}',
  status employee_status DEFAULT 'active',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id, employee_id)
);

-- جدول أدوار المستخدمين
CREATE TABLE public.hr_user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES hr_employees(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role hr_role NOT NULL,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id, company_id, role)
);

-- جدول قوالب سير العمل
CREATE TABLE public.workflow_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  workflow_key TEXT NOT NULL,
  workflow_name TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  workflow_config JSONB NOT NULL,
  status workflow_status DEFAULT 'active',
  version INTEGER DEFAULT 1,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id, workflow_key)
);

-- جدول الطلبات
CREATE TABLE public.hr_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES hr_employees(id) ON DELETE CASCADE,
  request_number TEXT NOT NULL,
  request_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  payload JSONB NOT NULL DEFAULT '{}',
  status request_status DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  workflow_template_id UUID REFERENCES workflow_templates(id),
  current_step INTEGER DEFAULT 1,
  submitted_by UUID REFERENCES auth.users(id),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول الموافقات
CREATE TABLE public.hr_approvals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES hr_requests(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  approver_role hr_role NOT NULL,
  approver_id UUID REFERENCES auth.users(id),
  decision TEXT CHECK (decision IN ('approved', 'rejected', 'pending')),
  comments TEXT,
  decided_at TIMESTAMP WITH TIME ZONE,
  sla_hours INTEGER DEFAULT 24,
  is_escalated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول الأحداث
CREATE TABLE public.hr_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  subject_type TEXT NOT NULL,
  subject_id UUID NOT NULL,
  actor_id UUID REFERENCES auth.users(id),
  payload JSONB DEFAULT '{}',
  occurred_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول الإشعارات
CREATE TABLE public.hr_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  related_type TEXT,
  related_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول سجل المراجعة
CREATE TABLE public.hr_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES auth.users(id),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  before_data JSONB,
  after_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء الفهارس
CREATE INDEX idx_companies_owner ON companies(owner_id);
CREATE INDEX idx_hr_employees_company ON hr_employees(company_id);
CREATE INDEX idx_hr_employees_user ON hr_employees(user_id);
CREATE INDEX idx_hr_employees_manager ON hr_employees(manager_id);
CREATE INDEX idx_hr_requests_company ON hr_requests(company_id);
CREATE INDEX idx_hr_requests_employee ON hr_requests(employee_id);
CREATE INDEX idx_hr_requests_status ON hr_requests(status);
CREATE INDEX idx_hr_approvals_request ON hr_approvals(request_id);
CREATE INDEX idx_hr_events_company ON hr_events(company_id);
CREATE INDEX idx_hr_events_type ON hr_events(event_type);
CREATE INDEX idx_hr_notifications_user ON hr_notifications(user_id);
CREATE INDEX idx_hr_audit_company ON hr_audit_logs(company_id);

-- تمكين RLS على جميع الجداول
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_audit_logs ENABLE ROW LEVEL SECURITY;