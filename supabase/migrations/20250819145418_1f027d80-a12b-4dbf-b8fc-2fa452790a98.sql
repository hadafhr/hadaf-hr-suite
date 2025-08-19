-- Create comprehensive leaves and holidays system (Fixed version)

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
  hijri_date TEXT, -- For Islamic holidays
  gregorian_date DATE, -- For fixed holidays
  duration_days INTEGER DEFAULT 1,
  is_recurring BOOLEAN DEFAULT true,
  holiday_type TEXT CHECK (holiday_type IN ('national', 'religious', 'royal')) DEFAULT 'national',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert official Saudi holidays (skip if already exists)
INSERT INTO saudi_holidays (name_ar, name_en, hijri_date, gregorian_date, duration_days, holiday_type, is_recurring) 
VALUES
('عيد الفطر المبارك', 'Eid Al-Fitr', '1 Shawwal', NULL, 3, 'religious', true),
('عيد الأضحى المبارك', 'Eid Al-Adha', '10 Dhu al-Hijjah', NULL, 4, 'religious', true),
('اليوم الوطني السعودي', 'Saudi National Day', NULL, '2024-09-23', 1, 'national', true),
('يوم التأسيس', 'Founding Day', NULL, '2024-02-22', 1, 'national', true)
ON CONFLICT DO NOTHING;

-- Enhanced leave requests table (upgrade existing employee_requests if needed)
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

-- Leave request approvals audit trail
CREATE TABLE IF NOT EXISTS leave_approval_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  leave_request_id UUID NOT NULL REFERENCES comprehensive_leave_requests(id) ON DELETE CASCADE,
  approver_id UUID NOT NULL,
  approval_level INTEGER NOT NULL,
  action TEXT CHECK (action IN ('submitted', 'approved', 'rejected', 'cancelled', 'delegated')) NOT NULL,
  comments TEXT,
  previous_status TEXT,
  new_status TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI insights for leave management
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

-- Leave calendar events
CREATE TABLE IF NOT EXISTS leave_calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_date DATE NOT NULL,
  event_type TEXT CHECK (event_type IN ('leave', 'holiday', 'blackout')) NOT NULL,
  leave_request_id UUID REFERENCES comprehensive_leave_requests(id) ON DELETE CASCADE,
  holiday_id UUID REFERENCES saudi_holidays(id) ON DELETE CASCADE,
  employee_id UUID,
  description TEXT,
  is_full_day BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leave_requests_employee_status ON comprehensive_leave_requests(employee_id, status);
CREATE INDEX IF NOT EXISTS idx_leave_requests_dates ON comprehensive_leave_requests(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_leave_balances_employee_year ON employee_leave_balances(employee_id, year);
CREATE INDEX IF NOT EXISTS idx_leave_calendar_date ON leave_calendar_events(event_date);
CREATE INDEX IF NOT EXISTS idx_leave_ai_insights_type ON leave_ai_insights(insight_type, is_dismissed);

-- Enable RLS on all tables
ALTER TABLE saudi_leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE saudi_holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE comprehensive_leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_approval_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_calendar_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Saudi leave types and holidays are public (read-only)
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

CREATE POLICY "Managers can view team leave requests" ON comprehensive_leave_requests
  FOR SELECT TO authenticated
  USING (employee_id IN (SELECT id FROM boud_employees WHERE manager_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())));

CREATE POLICY "HR can manage all company leave requests" ON comprehensive_leave_requests
  FOR ALL TO authenticated
  USING (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
         (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
          boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))))
  WITH CHECK (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
              (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
               boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))));

-- Leave approval history
CREATE POLICY "Users can view approval history for accessible requests" ON leave_approval_history
  FOR SELECT TO authenticated
  USING (leave_request_id IN (SELECT id FROM comprehensive_leave_requests WHERE 
    (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())) OR
    (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
     (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))))));

CREATE POLICY "Approvers can add approval history" ON leave_approval_history
  FOR INSERT TO authenticated
  WITH CHECK (approver_id = auth.uid());

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

-- Leave calendar
CREATE POLICY "Users can view leave calendar" ON leave_calendar_events
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "HR can manage leave calendar" ON leave_calendar_events
  FOR ALL TO authenticated
  USING (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
         (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
          boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))))
  WITH CHECK (employee_id IN (SELECT e.id FROM boud_employees e WHERE 
              (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
               boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))));

-- Triggers for automatic updates
CREATE OR REPLACE FUNCTION update_leave_balance_on_approval() RETURNS TRIGGER AS $$
BEGIN
  -- Update leave balance when leave request status changes
  IF (TG_OP = 'UPDATE' AND NEW.status != OLD.status) THEN
    IF NEW.status = 'approved' THEN
      -- Deduct from balance
      UPDATE employee_leave_balances 
      SET used_days = used_days + NEW.working_days,
          remaining_days = total_entitled - (used_days + NEW.working_days),
          last_updated = now()
      WHERE employee_id = NEW.employee_id 
        AND leave_type_code = NEW.leave_type_code 
        AND year = EXTRACT(YEAR FROM NEW.start_date);
    ELSIF OLD.status = 'approved' AND NEW.status IN ('cancelled', 'rejected') THEN
      -- Restore balance
      UPDATE employee_leave_balances 
      SET used_days = used_days - NEW.working_days,
          remaining_days = total_entitled - (used_days - NEW.working_days),
          last_updated = now()
      WHERE employee_id = NEW.employee_id 
        AND leave_type_code = NEW.leave_type_code 
        AND year = EXTRACT(YEAR FROM NEW.start_date);
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_update_leave_balance_on_approval
  AFTER UPDATE ON comprehensive_leave_requests
  FOR EACH ROW EXECUTE FUNCTION update_leave_balance_on_approval();

-- Function to calculate working days (excluding weekends and holidays)
CREATE OR REPLACE FUNCTION calculate_leave_working_days(
  start_date DATE,
  end_date DATE
) RETURNS DECIMAL AS $$
DECLARE
  working_days DECIMAL := 0;
  current_date DATE;
  day_of_week INTEGER;
  is_holiday BOOLEAN;
BEGIN
  current_date := start_date;
  
  WHILE current_date <= end_date LOOP
    -- Check if it's not a weekend (Friday=5, Saturday=6 in Saudi Arabia)
    day_of_week := EXTRACT(DOW FROM current_date);
    
    IF day_of_week NOT IN (5, 6) THEN -- Not Friday or Saturday
      -- Check if it's not a holiday
      SELECT EXISTS(
        SELECT 1 FROM leave_calendar_events 
        WHERE event_date = current_date 
          AND event_type = 'holiday'
      ) INTO is_holiday;
      
      IF NOT is_holiday THEN
        working_days := working_days + 1;
      END IF;
    END IF;
    
    current_date := current_date + INTERVAL '1 day';
  END LOOP;
  
  RETURN working_days;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;