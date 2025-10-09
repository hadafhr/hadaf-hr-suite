-- إنشاء نظام الإفصاح عن بيانات التدريب

-- جدول فئات التدريب
CREATE TABLE IF NOT EXISTS public.training_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name_ar TEXT NOT NULL,
  category_name_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول جهات التدريب المعتمدة
CREATE TABLE IF NOT EXISTS public.training_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES boud_companies(id) ON DELETE CASCADE,
  provider_name_ar TEXT NOT NULL,
  provider_name_en TEXT,
  license_number TEXT NOT NULL UNIQUE,
  license_expiry_date DATE,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  is_certified BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_programs INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول البرامج التدريبية
CREATE TABLE IF NOT EXISTS public.training_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES boud_companies(id) ON DELETE CASCADE,
  program_number TEXT UNIQUE NOT NULL,
  program_name_ar TEXT NOT NULL,
  program_name_en TEXT,
  category_id UUID REFERENCES training_categories(id),
  provider_id UUID REFERENCES training_providers(id),
  training_type TEXT NOT NULL CHECK (training_type IN ('internal', 'external', 'online', 'workshop', 'on_job')),
  description_ar TEXT,
  description_en TEXT,
  objectives JSONB DEFAULT '[]'::jsonb,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration_hours INTEGER NOT NULL,
  duration_days INTEGER,
  total_cost DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  cost_per_trainee DECIMAL(12,2),
  budget_item TEXT,
  location TEXT,
  max_trainees INTEGER,
  saudi_trainees_count INTEGER DEFAULT 0,
  non_saudi_trainees_count INTEGER DEFAULT 0,
  total_trainees INTEGER GENERATED ALWAYS AS (saudi_trainees_count + non_saudi_trainees_count) STORED,
  completion_rate DECIMAL(5,2) DEFAULT 0.00,
  evaluation_results JSONB DEFAULT '{}'::jsonb,
  certificates_issued INTEGER DEFAULT 0,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'ongoing', 'completed', 'cancelled')),
  attachments JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول المتدربين في البرامج
CREATE TABLE IF NOT EXISTS public.training_program_trainees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES training_programs(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES boud_employees(id) ON DELETE CASCADE,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  completion_date DATE,
  attendance_percentage DECIMAL(5,2) DEFAULT 0.00,
  final_grade DECIMAL(5,2),
  passed BOOLEAN DEFAULT false,
  certificate_number TEXT,
  certificate_issued_date DATE,
  feedback TEXT,
  status TEXT DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'attending', 'completed', 'failed', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(program_id, employee_id)
);

-- جدول تقارير الإفصاح السنوية
CREATE TABLE IF NOT EXISTS public.training_disclosure_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES boud_companies(id) ON DELETE CASCADE,
  report_year INTEGER NOT NULL,
  report_number TEXT UNIQUE NOT NULL,
  total_programs INTEGER DEFAULT 0,
  total_trainees INTEGER DEFAULT 0,
  saudi_trainees INTEGER DEFAULT 0,
  non_saudi_trainees INTEGER DEFAULT 0,
  total_training_hours INTEGER DEFAULT 0,
  total_training_cost DECIMAL(15,2) DEFAULT 0.00,
  average_hours_per_employee DECIMAL(10,2) DEFAULT 0.00,
  training_budget_percentage DECIMAL(5,2) DEFAULT 0.00,
  report_data JSONB DEFAULT '{}'::jsonb,
  validation_status TEXT DEFAULT 'draft' CHECK (validation_status IN ('draft', 'validated', 'submitted', 'approved')),
  validated_by UUID REFERENCES auth.users(id),
  validated_at TIMESTAMP WITH TIME ZONE,
  submitted_to_qiwa BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE,
  qiwa_reference_number TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(company_id, report_year)
);

-- جدول إشعارات الإفصاح
CREATE TABLE IF NOT EXISTS public.training_disclosure_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES boud_companies(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('deadline_reminder', 'incomplete_data', 'validation_required', 'submission_due', 'budget_alert')),
  title_ar TEXT NOT NULL,
  title_en TEXT,
  message_ar TEXT NOT NULL,
  message_en TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  related_report_id UUID REFERENCES training_disclosure_reports(id),
  related_program_id UUID REFERENCES training_programs(id),
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  action_required BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- دالة لتوليد رقم البرنامج التدريبي
CREATE OR REPLACE FUNCTION generate_training_program_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  program_number TEXT;
  current_year TEXT;
  sequence_num INTEGER;
BEGIN
  current_year := EXTRACT(YEAR FROM NOW())::TEXT;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(program_number FROM 'TRN-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM training_programs
  WHERE program_number LIKE 'TRN-' || current_year || '-%';
  
  program_number := 'TRN-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN program_number;
END;
$$;

-- دالة لتوليد رقم تقرير الإفصاح
CREATE OR REPLACE FUNCTION generate_disclosure_report_number(p_year INTEGER)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  report_number TEXT;
  sequence_num INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(report_number FROM 'DSC-' || p_year::TEXT || '-(.*)') AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM training_disclosure_reports
  WHERE report_number LIKE 'DSC-' || p_year::TEXT || '-%';
  
  report_number := 'DSC-' || p_year::TEXT || '-' || LPAD(sequence_num::TEXT, 4, '0');
  
  RETURN report_number;
END;
$$;

-- Trigger لتحديث updated_at
CREATE OR REPLACE FUNCTION update_training_updated_at_column()
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

CREATE TRIGGER update_training_categories_updated_at BEFORE UPDATE ON training_categories
  FOR EACH ROW EXECUTE FUNCTION update_training_updated_at_column();

CREATE TRIGGER update_training_providers_updated_at BEFORE UPDATE ON training_providers
  FOR EACH ROW EXECUTE FUNCTION update_training_updated_at_column();

CREATE TRIGGER update_training_programs_updated_at BEFORE UPDATE ON training_programs
  FOR EACH ROW EXECUTE FUNCTION update_training_updated_at_column();

CREATE TRIGGER update_training_program_trainees_updated_at BEFORE UPDATE ON training_program_trainees
  FOR EACH ROW EXECUTE FUNCTION update_training_updated_at_column();

CREATE TRIGGER update_training_disclosure_reports_updated_at BEFORE UPDATE ON training_disclosure_reports
  FOR EACH ROW EXECUTE FUNCTION update_training_updated_at_column();

-- RLS Policies

-- training_categories
ALTER TABLE training_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active training categories"
  ON training_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "HR managers can manage training categories"
  ON training_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM boud_user_roles
      WHERE user_id = auth.uid()
        AND role IN ('super_admin', 'hr_manager')
        AND is_active = true
    )
  );

-- training_providers
ALTER TABLE training_providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company users can view training providers"
  ON training_providers FOR SELECT
  USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage training providers"
  ON training_providers FOR ALL
  USING (
    company_id = boud_get_user_company_id(auth.uid()) AND
    (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
     boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))
  );

-- training_programs
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company users can view training programs"
  ON training_programs FOR SELECT
  USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage training programs"
  ON training_programs FOR ALL
  USING (
    company_id = boud_get_user_company_id(auth.uid()) AND
    (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
     boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))
  );

-- training_program_trainees
ALTER TABLE training_program_trainees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their training"
  ON training_program_trainees FOR SELECT
  USING (
    employee_id IN (
      SELECT id FROM boud_employees WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "HR managers can manage training trainees"
  ON training_program_trainees FOR ALL
  USING (
    program_id IN (
      SELECT id FROM training_programs 
      WHERE company_id = boud_get_user_company_id(auth.uid())
        AND (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
             boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))
    )
  );

-- training_disclosure_reports
ALTER TABLE training_disclosure_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company users can view disclosure reports"
  ON training_disclosure_reports FOR SELECT
  USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage disclosure reports"
  ON training_disclosure_reports FOR ALL
  USING (
    company_id = boud_get_user_company_id(auth.uid()) AND
    (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
     boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))
  );

-- training_disclosure_notifications
ALTER TABLE training_disclosure_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company users can view and update their notifications"
  ON training_disclosure_notifications FOR ALL
  USING (company_id = boud_get_user_company_id(auth.uid()));

-- إضافة بيانات أولية لفئات التدريب
INSERT INTO training_categories (category_name_ar, category_name_en, description_ar, description_en, sort_order) VALUES
('مهارات تقنية', 'Technical Skills', 'تدريب على المهارات التقنية والبرمجية', 'Training on technical and programming skills', 1),
('مهارات قيادية', 'Leadership Skills', 'تطوير المهارات القيادية والإدارية', 'Leadership and management skills development', 2),
('السلامة والصحة المهنية', 'Occupational Health & Safety', 'تدريب على معايير السلامة والصحة المهنية', 'Training on occupational health and safety standards', 3),
('خدمة العملاء', 'Customer Service', 'تحسين مهارات خدمة العملاء والتعامل معهم', 'Improving customer service and interaction skills', 4),
('اللغات', 'Languages', 'دورات تعليم اللغات المختلفة', 'Language learning courses', 5),
('المبيعات والتسويق', 'Sales & Marketing', 'تدريب على استراتيجيات المبيعات والتسويق', 'Training on sales and marketing strategies', 6),
('الموارد البشرية', 'Human Resources', 'تطوير مهارات الموارد البشرية', 'HR skills development', 7),
('المالية والمحاسبة', 'Finance & Accounting', 'التدريب على المهارات المالية والمحاسبية', 'Training on financial and accounting skills', 8)
ON CONFLICT DO NOTHING;