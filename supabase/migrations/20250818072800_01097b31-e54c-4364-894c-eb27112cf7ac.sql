-- إنشاء جداول وحدة خدمات الموظفين

-- جدول أنواع الإجازات
CREATE TABLE IF NOT EXISTS leave_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  max_days_per_year INTEGER DEFAULT 30,
  is_paid BOOLEAN DEFAULT true,
  requires_approval BOOLEAN DEFAULT true,
  carry_forward_allowed BOOLEAN DEFAULT false,
  gender_restriction TEXT, -- 'male', 'female', 'both'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- جدول طلبات الإجازات
CREATE TABLE IF NOT EXISTS leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  leave_type_id UUID NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days INTEGER NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'cancelled'
  approved_by UUID,
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  emergency_contact TEXT,
  replacement_employee_id UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  FOREIGN KEY (leave_type_id) REFERENCES leave_types(id)
);

-- جدول طلبات الموظفين العامة
CREATE TABLE IF NOT EXISTS employee_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  request_type TEXT NOT NULL, -- 'salary_certificate', 'experience_letter', 'transfer', 'bank_letter', etc
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  status TEXT DEFAULT 'submitted', -- 'submitted', 'under_review', 'approved', 'completed', 'rejected'
  assigned_to UUID, -- HR officer handling the request
  documents JSONB DEFAULT '[]',
  response_notes TEXT,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- جدول تصحيحات الحضور
CREATE TABLE IF NOT EXISTS attendance_corrections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  attendance_record_id UUID,
  correction_date DATE NOT NULL,
  correction_type TEXT NOT NULL, -- 'missing_clock_in', 'missing_clock_out', 'wrong_time', 'absent_excuse'
  original_clock_in TIMESTAMPTZ,
  original_clock_out TIMESTAMPTZ,
  corrected_clock_in TIMESTAMPTZ,
  corrected_clock_out TIMESTAMPTZ,
  reason TEXT NOT NULL,
  evidence_documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  manager_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- جدول طلبات الراتب والمزايا
CREATE TABLE IF NOT EXISTS payroll_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  request_type TEXT NOT NULL, -- 'salary_certificate', 'salary_advance', 'housing_allowance', 'transport_allowance'
  requested_amount DECIMAL(12,2),
  request_reason TEXT,
  bank_letter_type TEXT, -- for bank letters: 'loan', 'credit_card', 'mortgage'
  status TEXT DEFAULT 'pending',
  approved_by UUID,
  approved_at TIMESTAMPTZ,
  processed_by UUID,
  processed_at TIMESTAMPTZ,
  documents JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- جدول نهاية الخدمة
CREATE TABLE IF NOT EXISTS end_of_service (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL UNIQUE,
  termination_date DATE NOT NULL,
  termination_type TEXT NOT NULL, -- 'resignation', 'termination', 'contract_end', 'retirement'
  notice_period_days INTEGER DEFAULT 0,
  last_working_day DATE,
  reason TEXT,
  years_of_service DECIMAL(4,2),
  final_settlement JSONB DEFAULT '{}', -- detailed calculation
  total_eos_amount DECIMAL(12,2),
  vacation_balance_days INTEGER DEFAULT 0,
  vacation_balance_amount DECIMAL(12,2) DEFAULT 0,
  other_dues DECIMAL(12,2) DEFAULT 0,
  deductions DECIMAL(12,2) DEFAULT 0,
  net_amount DECIMAL(12,2),
  clearance_status JSONB DEFAULT '{}', -- departments clearance
  exit_interview_completed BOOLEAN DEFAULT false,
  final_documents_issued BOOLEAN DEFAULT false,
  processed_by UUID,
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- جدول سجل الوثائق
CREATE TABLE IF NOT EXISTS employee_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  document_type TEXT NOT NULL, -- 'id_copy', 'passport', 'contract', 'certificate', 'medical_report'
  document_name TEXT NOT NULL,
  file_path TEXT,
  file_size INTEGER,
  mime_type TEXT,
  expiry_date DATE,
  is_verified BOOLEAN DEFAULT false,
  verified_by UUID,
  verified_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- إضافة RLS policies

-- Leave Types
ALTER TABLE leave_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "HR can manage leave types" ON leave_types
FOR ALL USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

CREATE POLICY "Users can view company leave types" ON leave_types
FOR SELECT USING (company_id = boud_get_user_company_id(auth.uid()));

-- Leave Requests
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can manage their leave requests" ON leave_requests
FOR ALL USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "HR can manage all leave requests" ON leave_requests
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- Employee Requests
ALTER TABLE employee_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can manage their requests" ON employee_requests
FOR ALL USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "HR can manage all employee requests" ON employee_requests
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- Attendance Corrections
ALTER TABLE attendance_corrections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can create attendance corrections" ON attendance_corrections
FOR INSERT WITH CHECK (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Employees can view their corrections" ON attendance_corrections
FOR SELECT USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "HR can manage attendance corrections" ON attendance_corrections
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- Payroll Requests
ALTER TABLE payroll_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can manage their payroll requests" ON payroll_requests
FOR ALL USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "HR can manage payroll requests" ON payroll_requests
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'payroll_officer'::user_role)
    )
  )
);

-- End of Service
ALTER TABLE end_of_service ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their EOS" ON end_of_service
FOR SELECT USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "HR can manage EOS records" ON end_of_service
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- Employee Documents
ALTER TABLE employee_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can manage their documents" ON employee_documents
FOR ALL USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "HR can manage all employee documents" ON employee_documents
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- إضافة بيانات تجريبية لأنواع الإجازات
INSERT INTO leave_types (company_id, name_ar, name_en, max_days_per_year, is_paid, requires_approval) VALUES
(NULL, 'الإجازة السنوية', 'Annual Leave', 30, true, true),
(NULL, 'الإجازة المرضية', 'Sick Leave', 30, true, false),
(NULL, 'إجازة الأمومة', 'Maternity Leave', 70, true, true),
(NULL, 'إجازة الأبوة', 'Paternity Leave', 3, true, true),
(NULL, 'إجازة بدون راتب', 'Unpaid Leave', 90, false, true),
(NULL, 'إجازة الحج والعمرة', 'Hajj/Umrah Leave', 15, true, true),
(NULL, 'إجازة الوفاة', 'Bereavement Leave', 7, true, false);

-- إنشاء triggers للتحديث التلقائي
CREATE TRIGGER update_leave_requests_updated_at
  BEFORE UPDATE ON leave_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_requests_updated_at
  BEFORE UPDATE ON employee_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payroll_requests_updated_at
  BEFORE UPDATE ON payroll_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_end_of_service_updated_at
  BEFORE UPDATE ON end_of_service
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_documents_updated_at
  BEFORE UPDATE ON employee_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- إضافة فهارس للأداء
CREATE INDEX idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);
CREATE INDEX idx_employee_requests_employee_id ON employee_requests(employee_id);
CREATE INDEX idx_employee_requests_status ON employee_requests(status);
CREATE INDEX idx_attendance_corrections_employee_id ON attendance_corrections(employee_id);
CREATE INDEX idx_payroll_requests_employee_id ON payroll_requests(employee_id);
CREATE INDEX idx_end_of_service_employee_id ON end_of_service(employee_id);
CREATE INDEX idx_employee_documents_employee_id ON employee_documents(employee_id);