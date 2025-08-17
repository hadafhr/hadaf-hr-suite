-- إنشاء نظام الجزاءات والمخالفات وفقاً لنظام العمل السعودي

-- إنشاء نوع تعداد لحالة المخالفة
DO $$ BEGIN
  CREATE TYPE disciplinary_status AS ENUM ('pending', 'under_review', 'resolved', 'escalated');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- إنشاء نوع تعداد لنوع الإجراء التأديبي
DO $$ BEGIN
  CREATE TYPE disciplinary_action_type AS ENUM ('verbal_warning', 'written_warning', 'salary_deduction', 'suspension', 'final_warning', 'termination');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- إنشاء نوع تعداد لدرجة خطورة المخالفة  
DO $$ BEGIN
  CREATE TYPE violation_severity AS ENUM ('low', 'medium', 'high', 'critical');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- جدول قاعدة بيانات المخالفات حسب نظام العمل السعودي
CREATE TABLE IF NOT EXISTS public.saudi_labor_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  violation_code TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  violation_name TEXT NOT NULL,
  violation_name_en TEXT,
  article_reference TEXT NOT NULL,
  description TEXT,
  severity violation_severity NOT NULL DEFAULT 'medium',
  first_action TEXT NOT NULL,
  second_action TEXT NOT NULL,
  final_action TEXT NOT NULL,
  auto_trigger_rules JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول الإجراءات التأديبية
CREATE TABLE IF NOT EXISTS public.disciplinary_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  employee_id UUID NOT NULL,
  violation_id UUID REFERENCES public.saudi_labor_violations(id),
  case_number TEXT NOT NULL UNIQUE,
  violation_date DATE NOT NULL,
  reported_by UUID NOT NULL,
  description TEXT NOT NULL,
  evidence JSONB DEFAULT '[]',
  action_type disciplinary_action_type NOT NULL,
  penalty_amount NUMERIC DEFAULT 0,
  suspension_days INTEGER DEFAULT 0,
  status disciplinary_status DEFAULT 'pending',
  review_date DATE,
  resolution_date DATE,
  notes TEXT,
  attendance_record_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول سجل الإجراءات التأديبية للموظف
CREATE TABLE IF NOT EXISTS public.employee_disciplinary_record (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  company_id UUID,
  disciplinary_action_id UUID REFERENCES public.disciplinary_actions(id),
  violation_count INTEGER DEFAULT 1,
  total_warnings INTEGER DEFAULT 0,
  total_penalties NUMERIC DEFAULT 0,
  last_violation_date DATE,
  clean_record_start_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(employee_id, company_id)
);

-- جدول مراجعة وموافقة الإجراءات التأديبية
CREATE TABLE IF NOT EXISTS public.disciplinary_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  disciplinary_action_id UUID REFERENCES public.disciplinary_actions(id),
  approver_id UUID NOT NULL,
  approval_level INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  comments TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إدراج بيانات المخالفات الأساسية حسب نظام العمل السعودي
INSERT INTO public.saudi_labor_violations (violation_code, category, violation_name, article_reference, description, severity, first_action, second_action, final_action) VALUES
('ATT001', 'الحضور والانصراف', 'التأخير عن العمل', 'المادة 80', 'التأخير عن موعد بداية العمل المحدد دون عذر مقبول', 'medium', 'إنذار شفهي', 'إنذار كتابي', 'خصم يوم من الراتب'),
('ATT002', 'الحضور والانصراف', 'الغياب بدون إذن', 'المادة 80', 'الغياب عن العمل دون إذن مسبق من الرئيس المباشر', 'high', 'إنذار كتابي', 'خصم راتب يوم واحد', 'خصم راتب ثلاثة أيام أو إنهاء الخدمة'),
('ATT003', 'الحضور والانصراف', 'الانصراف المبكر بدون إذن', 'المادة 80', 'مغادرة العمل قبل انتهاء الدوام الرسمي دون إذن', 'medium', 'إنذار شفهي', 'إنذار كتابي', 'خصم نصف يوم من الراتب'),
('BEH001', 'السلوك المهني', 'عدم احترام الرؤساء أو الزملاء', 'المادة 80', 'التعامل بعدم احترام مع الرؤساء أو الزملاء في العمل', 'high', 'إنذار كتابي', 'خصم راتب يومين', 'إنهاء الخدمة'),
('BEH002', 'السلوك المهني', 'استخدام لغة غير لائقة', 'المادة 80', 'استخدام ألفاظ نابية أو غير لائقة في مكان العمل', 'medium', 'إنذار كتابي', 'خصم راتب يوم واحد', 'إنذار نهائي'),
('SAF001', 'الأمن والسلامة', 'عدم اتباع إجراءات السلامة', 'المادة 80', 'عدم الالتزام بإجراءات الأمن والسلامة المهنية', 'high', 'إنذار كتابي', 'خصم راتب يوم واحد', 'إنهاء الخدمة'),
('PERF001', 'الأداء الوظيفي', 'إهمال في أداء الواجبات', 'المادة 80', 'عدم أداء الواجبات الوظيفية بالجودة المطلوبة', 'medium', 'إنذار شفهي', 'إنذار كتابي', 'خصم راتب أو تدريب إضافي'),
('PERF002', 'الأداء الوظيفي', 'عدم تحقيق الأهداف المطلوبة', 'المادة 80', 'فشل متكرر في تحقيق الأهداف والمؤشرات المحددة', 'medium', 'تدريب إضافي', 'إنذار كتابي', 'خصم راتب أو تغيير المنصب'),
('POL001', 'سياسة الشركة', 'مخالفة سياسات الشركة', 'المادة 80', 'عدم الالتزام بسياسات وإجراءات الشركة المعتمدة', 'medium', 'إنذار كتابي', 'خصم راتب يوم واحد', 'إنذار نهائي'),
('POL002', 'سياسة الشركة', 'إساءة استخدام ممتلكات الشركة', 'المادة 80', 'استخدام معدات أو موارد الشركة لأغراض شخصية', 'high', 'إنذار كتابي', 'خصم راتب يومين', 'إنهاء الخدمة أو استرداد القيمة')
ON CONFLICT (violation_code) DO NOTHING;

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_disciplinary_actions_employee_id ON public.disciplinary_actions(employee_id);
CREATE INDEX IF NOT EXISTS idx_disciplinary_actions_company_id ON public.disciplinary_actions(company_id);
CREATE INDEX IF NOT EXISTS idx_disciplinary_actions_status ON public.disciplinary_actions(status);
CREATE INDEX IF NOT EXISTS idx_disciplinary_actions_violation_date ON public.disciplinary_actions(violation_date);
CREATE INDEX IF NOT EXISTS idx_employee_disciplinary_record_employee ON public.employee_disciplinary_record(employee_id);
CREATE INDEX IF NOT EXISTS idx_saudi_labor_violations_category ON public.saudi_labor_violations(category);

-- تفعيل Row Level Security
ALTER TABLE public.saudi_labor_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplinary_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_disciplinary_record ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplinary_approvals ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان لقاعدة بيانات المخالفات (للقراءة للجميع)
CREATE POLICY "Everyone can view Saudi labor violations" ON public.saudi_labor_violations
  FOR SELECT USING (is_active = true);

-- سياسات الأمان للإجراءات التأديبية
CREATE POLICY "HR managers can manage disciplinary actions" ON public.disciplinary_actions
  FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_officer'::user_role)
  );

CREATE POLICY "Employees can view their disciplinary actions" ON public.disciplinary_actions
  FOR SELECT USING (
    employee_id IN (
      SELECT id FROM boud_employees WHERE user_id = auth.uid()
    )
  );

-- سياسات الأمان لسجل الإجراءات التأديبية
CREATE POLICY "HR managers can manage employee disciplinary records" ON public.employee_disciplinary_record
  FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_officer'::user_role)
  );

CREATE POLICY "Employees can view their disciplinary record" ON public.employee_disciplinary_record
  FOR SELECT USING (
    employee_id IN (
      SELECT id FROM boud_employees WHERE user_id = auth.uid()
    )
  );

-- سياسات الأمان لموافقات الإجراءات التأديبية
CREATE POLICY "Managers can manage disciplinary approvals" ON public.disciplinary_approvals
  FOR ALL USING (
    approver_id = auth.uid() OR
    disciplinary_action_id IN (
      SELECT da.id FROM disciplinary_actions da 
      WHERE boud_has_role(auth.uid(), da.company_id, 'super_admin'::user_role) OR 
            boud_has_role(auth.uid(), da.company_id, 'hr_manager'::user_role)
    )
  );

-- إنشاء تريغر لتحديث updated_at
CREATE TRIGGER update_saudi_labor_violations_updated_at
  BEFORE UPDATE ON public.saudi_labor_violations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_disciplinary_actions_updated_at
  BEFORE UPDATE ON public.disciplinary_actions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employee_disciplinary_record_updated_at
  BEFORE UPDATE ON public.employee_disciplinary_record
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- دالة لإنشاء رقم قضية تأديبية فريد
CREATE OR REPLACE FUNCTION generate_disciplinary_case_number()
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql;

-- دالة لتحديث سجل الموظف التأديبي تلقائياً
CREATE OR REPLACE FUNCTION update_employee_disciplinary_record()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- تريغر لتحديث سجل الموظف التأديبي
CREATE TRIGGER update_employee_record_on_disciplinary_action
  AFTER INSERT ON disciplinary_actions
  FOR EACH ROW
  EXECUTE FUNCTION update_employee_disciplinary_record();

-- دالة للتحقق من المخالفات المتكررة في الحضور
CREATE OR REPLACE FUNCTION check_attendance_violations(p_employee_id UUID, p_company_id UUID)
RETURNS TABLE (
  violation_type TEXT,
  count INTEGER,
  suggested_action TEXT
) AS $$
BEGIN
  -- فحص التأخير المتكرر (أكثر من 3 مرات في الشهر)
  RETURN QUERY
  SELECT 
    'التأخير المتكرر'::TEXT,
    COUNT(*)::INTEGER,
    CASE 
      WHEN COUNT(*) >= 5 THEN 'إنذار كتابي وخصم راتب'
      WHEN COUNT(*) >= 3 THEN 'إنذار كتابي'
      ELSE 'إنذار شفهي'
    END
  FROM attendance_records_new 
  WHERE employee_id = p_employee_id 
    AND status = 'late'
    AND attendance_date >= CURRENT_DATE - INTERVAL '30 days'
  HAVING COUNT(*) > 0;
    
  -- فحص الغياب بدون إذن
  RETURN QUERY
  SELECT 
    'الغياب بدون إذن'::TEXT,
    COUNT(*)::INTEGER,
    CASE 
      WHEN COUNT(*) >= 3 THEN 'إنهاء الخدمة'
      WHEN COUNT(*) >= 2 THEN 'خصم راتب ثلاثة أيام'
      ELSE 'خصم راتب يوم واحد'
    END
  FROM attendance_records_new 
  WHERE employee_id = p_employee_id 
    AND status = 'absent'
    AND attendance_date >= CURRENT_DATE - INTERVAL '30 days'
  HAVING COUNT(*) > 0;
END;
$$ LANGUAGE plpgsql;