-- ====================================
-- إنشاء نظام إدارة المكافآت والحوافز الشامل - إصدار مصحح
-- ====================================

-- إنشاء الـ enums المطلوبة
CREATE TYPE reward_type AS ENUM (
  'annual_bonus',           -- مكافأة سنوية
  'performance_based',      -- مكافأة أداء
  'team_achievement',       -- إنجاز جماعي
  'manager_recommendation', -- ترشيح المدير
  'special_occasion',       -- مناسبة خاصة
  'semi_annual',           -- نصف سنوية
  'project_completion',     -- إنهاء مشروع
  'kpi_achievement',       -- تحقيق مؤشرات
  'attendance_excellence', -- امتياز حضور
  'innovation'             -- ابتكار
);

CREATE TYPE reward_status AS ENUM (
  'pending',      -- معلق
  'approved',     -- معتمد
  'paid',         -- مدفوع
  'rejected',     -- مرفوض
  'processing'    -- قيد المعالجة
);

CREATE TYPE incentive_frequency AS ENUM (
  'monthly',      -- شهري
  'quarterly',    -- ربع سنوي
  'semi_annual',  -- نصف سنوي
  'annual',       -- سنوي
  'one_time'      -- مرة واحدة
);

-- ====================================
-- إنشاء دالة توليد أرقام المكافآت أولاً
-- ====================================
CREATE OR REPLACE FUNCTION generate_reward_number()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    reward_number TEXT;
    current_year TEXT;
    sequence_num INTEGER;
BEGIN
    current_year := EXTRACT(YEAR FROM NOW())::TEXT;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(reward_number FROM 'RWD-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM employee_rewards
    WHERE reward_number LIKE 'RWD-' || current_year || '-%';
    
    reward_number := 'RWD-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
    
    RETURN reward_number;
END;
$$;

-- ====================================
-- جدول برامج الحوافز
-- ====================================
CREATE TABLE IF NOT EXISTS incentive_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  program_name TEXT NOT NULL,
  program_code TEXT NOT NULL UNIQUE,
  description TEXT,
  program_type reward_type NOT NULL,
  target_metric TEXT, -- KPI, OKR, Performance Rating, etc
  target_value NUMERIC,
  reward_percentage NUMERIC CHECK (reward_percentage >= 0 AND reward_percentage <= 100),
  fixed_amount NUMERIC DEFAULT 0,
  frequency incentive_frequency DEFAULT 'annual',
  eligibility_criteria JSONB DEFAULT '{}',
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  requires_manager_approval BOOLEAN DEFAULT true,
  requires_hr_approval BOOLEAN DEFAULT true,
  requires_executive_approval BOOLEAN DEFAULT false,
  auto_process BOOLEAN DEFAULT false,
  max_amount_per_employee NUMERIC,
  budget_limit NUMERIC,
  used_budget NUMERIC DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- جدول مكافآت الموظفين
-- ====================================
CREATE TABLE IF NOT EXISTS employee_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  employee_id UUID REFERENCES boud_employees(id),
  program_id UUID REFERENCES incentive_programs(id),
  reward_number TEXT UNIQUE NOT NULL DEFAULT generate_reward_number(),
  reward_type reward_type NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  calculation_base JSONB DEFAULT '{}', -- base salary, performance score, etc
  eligibility_score NUMERIC, -- calculated score
  performance_period_start DATE,
  performance_period_end DATE,
  status reward_status DEFAULT 'pending',
  reason TEXT NOT NULL,
  recommended_by UUID, -- manager who recommended
  approved_by UUID, -- who approved
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_reason TEXT,
  payment_date DATE,
  payment_reference TEXT,
  tax_deducted NUMERIC DEFAULT 0,
  net_amount NUMERIC,
  attachments JSONB DEFAULT '[]',
  comments TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- جدول سير العمل للموافقات
-- ====================================
CREATE TABLE IF NOT EXISTS reward_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reward_id UUID REFERENCES employee_rewards(id),
  approver_id UUID NOT NULL,
  approval_level INTEGER NOT NULL, -- 1: Manager, 2: HR, 3: Executive
  status reward_status DEFAULT 'pending',
  approved_at TIMESTAMP WITH TIME ZONE,
  comments TEXT,
  is_final_approval BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- جدول تقييم الأهلية التلقائي
-- ====================================
CREATE TABLE IF NOT EXISTS reward_eligibility_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES boud_employees(id),
  program_id UUID REFERENCES incentive_programs(id),
  check_date DATE DEFAULT CURRENT_DATE,
  eligibility_score NUMERIC,
  met_criteria JSONB DEFAULT '{}',
  failed_criteria JSONB DEFAULT '{}',
  is_eligible BOOLEAN DEFAULT false,
  calculated_amount NUMERIC,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- جدول تاريخ المكافآت (للتحليلات)
-- ====================================
CREATE TABLE IF NOT EXISTS reward_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES boud_employees(id),
  company_id UUID,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  total_rewards NUMERIC DEFAULT 0,
  number_of_rewards INTEGER DEFAULT 0,
  average_reward NUMERIC DEFAULT 0,
  top_reward_type reward_type,
  performance_rating NUMERIC,
  department_id UUID,
  position_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- جدول إعدادات النظام
-- ====================================
CREATE TABLE IF NOT EXISTS reward_system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  setting_key TEXT NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type TEXT DEFAULT 'string', -- string, number, boolean, json
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, setting_key)
);

-- ====================================
-- جدول إشعارات المكافآت
-- ====================================
CREATE TABLE IF NOT EXISTS reward_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  recipient_id UUID NOT NULL,
  reward_id UUID REFERENCES employee_rewards(id),
  notification_type TEXT NOT NULL, -- reward_approved, reward_paid, reward_rejected, etc
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  priority_level INTEGER DEFAULT 3, -- 1: High, 2: Medium, 3: Low
  email_sent BOOLEAN DEFAULT false,
  sms_sent BOOLEAN DEFAULT false,
  push_sent BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- جدول التقارير المحفوظة
-- ====================================
CREATE TABLE IF NOT EXISTS reward_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  report_name TEXT NOT NULL,
  report_type TEXT NOT NULL, -- summary, detailed, analytics, comparison
  filters JSONB DEFAULT '{}',
  data JSONB DEFAULT '{}',
  generated_by UUID,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  file_path TEXT,
  file_format TEXT DEFAULT 'pdf', -- pdf, excel, csv
  is_scheduled BOOLEAN DEFAULT false,
  schedule_frequency TEXT, -- daily, weekly, monthly, quarterly
  next_generation_date TIMESTAMP WITH TIME ZONE,
  recipients JSONB DEFAULT '[]'
);

-- ====================================
-- إنشاء الفهارس لتحسين الأداء
-- ====================================
CREATE INDEX idx_employee_rewards_employee_id ON employee_rewards(employee_id);
CREATE INDEX idx_employee_rewards_company_id ON employee_rewards(company_id);
CREATE INDEX idx_employee_rewards_status ON employee_rewards(status);
CREATE INDEX idx_employee_rewards_reward_type ON employee_rewards(reward_type);
CREATE INDEX idx_employee_rewards_created_at ON employee_rewards(created_at);
CREATE INDEX idx_employee_rewards_payment_date ON employee_rewards(payment_date);

CREATE INDEX idx_incentive_programs_company_id ON incentive_programs(company_id);
CREATE INDEX idx_incentive_programs_is_active ON incentive_programs(is_active);
CREATE INDEX idx_incentive_programs_program_type ON incentive_programs(program_type);

CREATE INDEX idx_reward_approvals_reward_id ON reward_approvals(reward_id);
CREATE INDEX idx_reward_approvals_approver_id ON reward_approvals(approver_id);
CREATE INDEX idx_reward_approvals_status ON reward_approvals(status);

CREATE INDEX idx_reward_history_employee_id ON reward_history(employee_id);
CREATE INDEX idx_reward_history_year_month ON reward_history(year, month);

CREATE INDEX idx_reward_notifications_recipient_id ON reward_notifications(recipient_id);
CREATE INDEX idx_reward_notifications_is_read ON reward_notifications(is_read);

-- ====================================
-- إنشاء دالة حساب الأهلية للمكافآت
-- ====================================
CREATE OR REPLACE FUNCTION calculate_reward_eligibility(
  p_employee_id UUID,
  p_program_id UUID
)
RETURNS TABLE(
  is_eligible BOOLEAN,
  eligibility_score NUMERIC,
  calculated_amount NUMERIC,
  met_criteria JSONB,
  failed_criteria JSONB
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  program_record RECORD;
  employee_record RECORD;
  eligibility_result BOOLEAN := false;
  score NUMERIC := 0;
  amount NUMERIC := 0;
  met JSONB := '{}';
  failed JSONB := '{}';
BEGIN
  -- Get program details
  SELECT * INTO program_record FROM incentive_programs WHERE id = p_program_id;
  
  -- Get employee details
  SELECT * INTO employee_record FROM boud_employees WHERE id = p_employee_id;
  
  -- Basic eligibility checks
  IF program_record.is_active = false THEN
    failed := failed || jsonb_build_object('program_active', 'البرنامج غير نشط');
    RETURN QUERY SELECT false, 0::NUMERIC, 0::NUMERIC, met, failed;
    RETURN;
  END IF;
  
  IF employee_record.employment_status != 'active' THEN
    failed := failed || jsonb_build_object('employee_status', 'الموظف غير نشط');
    RETURN QUERY SELECT false, 0::NUMERIC, 0::NUMERIC, met, failed;
    RETURN;
  END IF;
  
  -- Performance-based eligibility (example)
  -- This would connect to actual performance data
  score := 85; -- Mock score, would be calculated from performance systems
  
  IF score >= 70 THEN
    met := met || jsonb_build_object('performance_score', 'تم تحقيق الحد الأدنى للأداء');
    eligibility_result := true;
  ELSE
    failed := failed || jsonb_build_object('performance_score', 'لم يتم تحقيق الحد الأدنى للأداء');
  END IF;
  
  -- Calculate reward amount
  IF eligibility_result THEN
    IF program_record.reward_percentage > 0 THEN
      amount := (employee_record.basic_salary * program_record.reward_percentage / 100);
    ELSE
      amount := program_record.fixed_amount;
    END IF;
    
    -- Apply maximum limit
    IF program_record.max_amount_per_employee IS NOT NULL AND amount > program_record.max_amount_per_employee THEN
      amount := program_record.max_amount_per_employee;
    END IF;
  END IF;
  
  RETURN QUERY SELECT eligibility_result, score, amount, met, failed;
END;
$$;

-- ====================================
-- إنشاء تريجر لتحديث updated_at
-- ====================================
CREATE OR REPLACE FUNCTION update_reward_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Create triggers
CREATE TRIGGER update_incentive_programs_updated_at 
  BEFORE UPDATE ON incentive_programs 
  FOR EACH ROW EXECUTE FUNCTION update_reward_updated_at_column();

CREATE TRIGGER update_employee_rewards_updated_at 
  BEFORE UPDATE ON employee_rewards 
  FOR EACH ROW EXECUTE FUNCTION update_reward_updated_at_column();

CREATE TRIGGER update_reward_system_settings_updated_at 
  BEFORE UPDATE ON reward_system_settings 
  FOR EACH ROW EXECUTE FUNCTION update_reward_updated_at_column();

-- ====================================
-- إدخال بيانات افتراضية للاختبار
-- ====================================

-- إدخال برامج حوافز افتراضية
INSERT INTO incentive_programs (
  program_name, program_code, description, program_type, 
  target_metric, reward_percentage, frequency, start_date, 
  eligibility_criteria, is_active, requires_manager_approval
) VALUES 
(
  'مكافأة الأداء السنوية',
  'ANN-PERF-2024',
  'مكافأة سنوية مبنية على تقييم الأداء الشامل للموظف',
  'annual_bonus',
  'performance_rating',
  15.0,
  'annual',
  '2024-01-01',
  '{"min_performance_rating": 3.5, "min_months_employment": 6}',
  true,
  true
),
(
  'حافز تحقيق المؤشرات الربعية',
  'KPI-QUAR-2024',
  'حافز ربع سنوي لتحقيق مؤشرات الأداء الرئيسية',
  'kpi_achievement',
  'kpi_completion_percentage',
  8.0,
  'quarterly',
  '2024-01-01',
  '{"min_kpi_completion": 90, "department_performance": 85}',
  true,
  true
),
(
  'مكافأة الإنجاز الجماعي',
  'TEAM-ACH-2024',
  'مكافأة للفرق التي تتجاوز الأهداف المحددة',
  'team_achievement',
  'project_success_rate',
  12.0,
  'quarterly',
  '2024-01-01',
  '{"team_performance": 95, "project_completion": 100}',
  true,
  true
),
(
  'مكافأة امتياز الحضور',
  'ATT-EXC-2024',
  'مكافأة للموظفين المتميزين في الحضور والانضباط',
  'attendance_excellence',
  'attendance_rate',
  5.0,
  'monthly',
  '2024-01-01',
  '{"min_attendance_rate": 98, "max_late_days": 1}',
  true,
  false
),
(
  'حافز الابتكار والتطوير',
  'INN-DEV-2024',
  'حافز للموظفين المبدعين والمبتكرين',
  'innovation',
  'innovation_score',
  20.0,
  'semi_annual',
  '2024-01-01',
  '{"innovation_projects": 1, "implementation_success": 80}',
  true,
  true
);

-- إدخال مكافآت افتراضية للموظف الأول
INSERT INTO employee_rewards (
  employee_id, program_id, reward_type, amount, reason, 
  status, performance_period_start, performance_period_end,
  eligibility_score, created_by
) 
SELECT
  e.id,
  p.id,
  'annual_bonus'::reward_type,
  18000.00,
  'تقييم أداء ممتاز للعام 2024 مع تحقيق جميع الأهداف المطلوبة',
  'approved'::reward_status,
  '2024-01-01'::date,
  '2024-12-31'::date,
  92.5,
  e.id
FROM boud_employees e, incentive_programs p
WHERE p.program_code = 'ANN-PERF-2024'
LIMIT 1;

INSERT INTO employee_rewards (
  employee_id, program_id, reward_type, amount, reason, 
  status, performance_period_start, performance_period_end,
  eligibility_score, created_by
) 
SELECT
  e.id,
  p.id,
  'kpi_achievement'::reward_type,
  9600.00,
  'تحقيق 95% من مؤشرات الأداء الربعية',
  'paid'::reward_status,
  '2024-07-01'::date,
  '2024-09-30'::date,
  95.0,
  e.id
FROM boud_employees e, incentive_programs p
WHERE p.program_code = 'KPI-QUAR-2024'
LIMIT 1;

INSERT INTO employee_rewards (
  employee_id, program_id, reward_type, amount, reason, 
  status, performance_period_start, performance_period_end,
  eligibility_score, created_by
) 
SELECT
  e.id,
  p.id,
  'attendance_excellence'::reward_type,
  600.00,
  'امتياز في معدل الحضور 99.5% خلال شهر أغسطس',
  'paid'::reward_status,
  '2024-08-01'::date,
  '2024-08-31'::date,
  99.5,
  e.id
FROM boud_employees e, incentive_programs p
WHERE p.program_code = 'ATT-EXC-2024'
LIMIT 1;

-- إدخال إعدادات النظام الافتراضية
INSERT INTO reward_system_settings (
  setting_key, setting_value, setting_type, description
) VALUES 
('auto_calculate_annual_bonus', 'true', 'boolean', 'حساب المكافأة السنوية تلقائياً'),
('max_reward_percentage', '25', 'number', 'الحد الأقصى لنسبة المكافأة من الراتب'),
('requires_hr_approval_above', '10000', 'number', 'المبلغ الذي يتطلب موافقة الموارد البشرية'),
('requires_executive_approval_above', '50000', 'number', 'المبلغ الذي يتطلب موافقة الإدارة التنفيذية'),
('notification_enabled', 'true', 'boolean', 'تفعيل إشعارات المكافآت'),
('tax_deduction_rate', '0', 'number', 'معدل خصم الضرائب من المكافآت');