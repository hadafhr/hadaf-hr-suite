-- تفعيل RLS على جميع الجداول الجديدة
ALTER TABLE performance_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE indicator_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE automated_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE electronic_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_evaluation_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE development_plans ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات RLS للمؤشرات
CREATE POLICY "Company users can view indicators" 
ON performance_indicators FOR SELECT 
USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage indicators" 
ON performance_indicators FOR ALL 
USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- إنشاء سياسات RLS لبرامج التقييم
CREATE POLICY "Company users can view evaluation programs" 
ON evaluation_programs FOR SELECT 
USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage evaluation programs" 
ON evaluation_programs FOR ALL 
USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- إنشاء سياسات RLS لنماذج التقييم
CREATE POLICY "Users can view evaluation forms through programs" 
ON evaluation_forms FOR SELECT 
USING (
  program_id IN (
    SELECT id FROM evaluation_programs 
    WHERE company_id = boud_get_user_company_id(auth.uid())
  )
);

CREATE POLICY "HR managers can manage evaluation forms" 
ON evaluation_forms FOR ALL 
USING (
  program_id IN (
    SELECT id FROM evaluation_programs ep
    WHERE ep.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), ep.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), ep.company_id, 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  program_id IN (
    SELECT id FROM evaluation_programs ep
    WHERE ep.company_id = boud_get_user_company_id(auth.uid())
    AND (
      boud_has_role(auth.uid(), ep.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), ep.company_id, 'hr_manager'::user_role)
    )
  )
);

-- إنشاء سياسات RLS للتقييمات
CREATE POLICY "Employees can view their own evaluations" 
ON evaluations FOR SELECT 
USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Managers can view team evaluations" 
ON evaluations FOR SELECT 
USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.manager_id IN (
      SELECT id FROM boud_employees WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "HR managers can manage all evaluations" 
ON evaluations FOR ALL 
USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

CREATE POLICY "Employees can update their own evaluations" 
ON evaluations FOR UPDATE 
USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
  AND status IN ('draft', 'in_progress')
);

-- إنشاء سياسات RLS لقيم المؤشرات
CREATE POLICY "Users can view indicator values through evaluations" 
ON indicator_values FOR SELECT 
USING (
  evaluation_id IN (
    SELECT id FROM evaluations 
    WHERE employee_id IN (
      SELECT id FROM boud_employees WHERE user_id = auth.uid()
    )
    OR boud_has_role(auth.uid(), company_id, 'super_admin'::user_role)
    OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
  )
);

CREATE POLICY "HR and evaluators can manage indicator values" 
ON indicator_values FOR ALL 
USING (
  evaluation_id IN (
    SELECT e.id FROM evaluations e
    WHERE boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
    OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    OR e.employee_id IN (
      SELECT id FROM boud_employees WHERE user_id = auth.uid()
    )
  )
)
WITH CHECK (
  evaluation_id IN (
    SELECT e.id FROM evaluations e
    WHERE boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
    OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    OR e.employee_id IN (
      SELECT id FROM boud_employees WHERE user_id = auth.uid()
    )
  )
);

-- إنشاء سياسات RLS للقرارات التلقائية
CREATE POLICY "Employees can view their own decisions" 
ON automated_decisions FOR SELECT 
USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "HR managers can manage automated decisions" 
ON automated_decisions FOR ALL 
USING (
  evaluation_id IN (
    SELECT e.id FROM evaluations e
    WHERE boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
    OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
  )
)
WITH CHECK (
  evaluation_id IN (
    SELECT e.id FROM evaluations e
    WHERE boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
    OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
  )
);

-- إنشاء سياسات RLS للتوقيعات الإلكترونية
CREATE POLICY "Users can view signatures for their evaluations" 
ON electronic_signatures FOR SELECT 
USING (
  evaluation_id IN (
    SELECT e.id FROM evaluations e
    WHERE e.employee_id IN (
      SELECT id FROM boud_employees WHERE user_id = auth.uid()
    )
    OR boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
    OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
  )
);

CREATE POLICY "Users can sign their own evaluations" 
ON electronic_signatures FOR INSERT 
WITH CHECK (signer_id = auth.uid());

CREATE POLICY "Users can update their own signatures" 
ON electronic_signatures FOR UPDATE 
USING (signer_id = auth.uid());

-- إنشاء سياسات RLS لموافقات HR
CREATE POLICY "HR officers can manage approvals" 
ON hr_evaluation_approvals FOR ALL 
USING (
  hr_officer_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.user_id = auth.uid()
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
      OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  hr_officer_id IN (
    SELECT e.id FROM boud_employees e
    WHERE e.user_id = auth.uid()
    AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
      OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- إنشاء سياسات RLS لخطط التطوير
CREATE POLICY "Employees can view their development plans" 
ON development_plans FOR SELECT 
USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

CREATE POLICY "HR managers can manage development plans" 
ON development_plans FOR ALL 
USING (
  evaluation_id IN (
    SELECT e.id FROM evaluations e
    WHERE boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
    OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
  )
)
WITH CHECK (
  evaluation_id IN (
    SELECT e.id FROM evaluations e
    WHERE boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role)
    OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
  )
);