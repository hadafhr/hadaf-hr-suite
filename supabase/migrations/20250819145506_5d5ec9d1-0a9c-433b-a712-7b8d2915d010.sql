-- Create comprehensive leaves and holidays system (Simplified version)

-- Saudi Labor Law leave types (preloaded)
CREATE TABLE IF NOT EXISTS saudi_leave_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  max_days_per_year INTEGER,
  is_paid BOOLEAN DEFAULT true,
  requires_medical_certificate BOOLEAN DEFAULT false,
  gender_restriction TEXT CHECK (gender_restriction IN ('male', 'female', 'both')) DEFAULT 'both',
  minimum_service_years INTEGER DEFAULT 0,
  max_consecutive_days INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert Saudi Labor Law leave types (skip if already exists)
INSERT INTO saudi_leave_types (code, name_ar, name_en, description_ar, description_en, max_days_per_year, is_paid, requires_medical_certificate, gender_restriction, minimum_service_years, max_consecutive_days) 
VALUES
('ANNUAL', 'إجازة سنوية', 'Annual Leave', 'الإجازة السنوية وفقاً لنظام العمل السعودي', 'Annual leave as per Saudi Labor Law', 30, true, false, 'both', 0, 30),
('SICK', 'إجازة مرضية', 'Sick Leave', 'إجازة مرضية بتقرير طبي', 'Sick leave with medical certificate', 30, true, true, 'both', 0, 30),
('MATERNITY', 'إجازة ولادة', 'Maternity Leave', 'إجازة الوضع للموظفة', 'Maternity leave for female employees', 70, true, true, 'female', 0, 70),
('PATERNITY', 'إجازة أبوة', 'Paternity Leave', 'إجازة أبوة للموظف الذكر', 'Paternity leave for male employees', 3, true, false, 'male', 0, 3),
('MARRIAGE', 'إجازة زواج', 'Marriage Leave', 'إجازة الزواج', 'Marriage leave', 5, true, false, 'both', 0, 5),
('BEREAVEMENT', 'إجازة وفاة', 'Bereavement Leave', 'إجازة وفاة قريب من الدرجة الأولى', 'Bereavement leave for immediate family', 3, true, false, 'both', 0, 3),
('HAJJ', 'إجازة حج', 'Hajj Leave', 'إجازة الحج مرة واحدة كل 5 سنوات', 'Hajj pilgrimage leave once every 5 years', 10, true, false, 'both', 2, 10),
('STUDY', 'إجازة دراسية', 'Study Leave', 'إجازة للدراسة والامتحانات', 'Study and examination leave', 15, false, false, 'both', 1, 15),
('UNPAID', 'إجازة بدون راتب', 'Unpaid Leave', 'إجازة اضطرارية بدون راتب', 'Emergency unpaid leave', 90, false, false, 'both', 0, 30),
('EMERGENCY', 'إجازة طارئة', 'Emergency Leave', 'إجازة للظروف الطارئة', 'Emergency leave for urgent circumstances', 5, true, false, 'both', 0, 5)
ON CONFLICT (code) DO NOTHING;

-- Official Saudi holidays
CREATE TABLE IF NOT EXISTS saudi_holidays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  hijri_date TEXT,
  gregorian_date DATE,
  duration_days INTEGER DEFAULT 1,
  is_recurring BOOLEAN DEFAULT true,
  holiday_type TEXT CHECK (holiday_type IN ('national', 'religious', 'royal')) DEFAULT 'national',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert official Saudi holidays
INSERT INTO saudi_holidays (name_ar, name_en, hijri_date, gregorian_date, duration_days, holiday_type, is_recurring) 
VALUES
('عيد الفطر المبارك', 'Eid Al-Fitr', '1 Shawwal', NULL, 3, 'religious', true),
('عيد الأضحى المبارك', 'Eid Al-Adha', '10 Dhu al-Hijjah', NULL, 4, 'religious', true),
('اليوم الوطني السعودي', 'Saudi National Day', NULL, '2024-09-23', 1, 'national', true),
('يوم التأسيس', 'Founding Day', NULL, '2024-02-22', 1, 'national', true)
ON CONFLICT DO NOTHING;

-- Enhanced leave requests table
CREATE TABLE IF NOT EXISTS comprehensive_leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  leave_type_code TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days DECIMAL(5,2) NOT NULL,
  working_days DECIMAL(5,2) NOT NULL,
  reason TEXT NOT NULL,
  status TEXT CHECK (status IN ('draft', 'submitted', 'pending_manager', 'pending_hr', 'approved', 'rejected', 'cancelled')) DEFAULT 'draft',
  priority TEXT CHECK (priority IN ('low', 'normal', 'high', 'urgent')) DEFAULT 'normal',
  
  -- Approval workflow
  submitted_at TIMESTAMPTZ,
  manager_approval_at TIMESTAMPTZ,
  hr_approval_at TIMESTAMPTZ,
  final_approval_at TIMESTAMPTZ,
  
  -- Approvers
  submitted_by UUID,
  manager_id UUID,
  hr_approver_id UUID,
  final_approver_id UUID,
  
  -- Comments and reasons
  manager_comments TEXT,
  hr_comments TEXT,
  rejection_reason TEXT,
  
  -- Documents and attachments
  attachments JSONB DEFAULT '[]',
  medical_certificate_url TEXT,
  
  -- Delegation during leave
  delegate_employee_id UUID,
  delegate_instructions TEXT,
  
  -- System fields
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT valid_dates CHECK (end_date >= start_date),
  CONSTRAINT positive_days CHECK (total_days > 0)
);

-- Employee leave balances
CREATE TABLE IF NOT EXISTS employee_leave_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  leave_type_code TEXT NOT NULL,
  total_entitled DECIMAL(5,2) DEFAULT 0,
  used_days DECIMAL(5,2) DEFAULT 0,
  pending_days DECIMAL(5,2) DEFAULT 0,
  remaining_days DECIMAL(5,2) DEFAULT 0,
  carried_forward DECIMAL(5,2) DEFAULT 0,
  year INTEGER NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT now(),
  UNIQUE(employee_id, leave_type_code, year)
);

-- Leave AI insights
CREATE TABLE IF NOT EXISTS leave_ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID,
  department_id UUID,
  insight_type TEXT CHECK (insight_type IN ('burnout_risk', 'excessive_sick_leave', 'unused_leave_alert', 'pattern_detection', 'team_coverage_risk', 'policy_recommendation')) NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  recommendations JSONB DEFAULT '[]',
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE saudi_leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE saudi_holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE comprehensive_leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_ai_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Public access to Saudi leave types and holidays
CREATE POLICY "Everyone can view Saudi leave types" ON saudi_leave_types FOR SELECT TO authenticated USING (true);
CREATE POLICY "Everyone can view Saudi holidays" ON saudi_holidays FOR SELECT TO authenticated USING (true);

-- Employee leave balances
CREATE POLICY "Employees can view their leave balances" ON employee_leave_balances
  FOR SELECT TO authenticated
  USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "HR can manage all leave balances" ON employee_leave_balances
  FOR ALL TO authenticated
  USING (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
         (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
          boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))))
  WITH CHECK (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
              (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
               boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))));

-- Leave requests
CREATE POLICY "Employees can manage their leave requests" ON comprehensive_leave_requests
  FOR ALL TO authenticated
  USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()))
  WITH CHECK (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "HR can manage all company leave requests" ON comprehensive_leave_requests
  FOR ALL TO authenticated
  USING (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
         (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
          boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))))
  WITH CHECK (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
              (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
               boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))));

-- Leave AI insights  
CREATE POLICY "HR can view AI insights" ON leave_ai_insights
  FOR SELECT TO authenticated
  USING (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
         (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
          boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))));

CREATE POLICY "HR can update AI insights" ON leave_ai_insights
  FOR UPDATE TO authenticated
  USING (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
         (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
          boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))));