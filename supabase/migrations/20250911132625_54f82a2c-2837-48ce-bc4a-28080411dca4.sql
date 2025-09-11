-- تفعيل Row Level Security على الجداول الجديدة
ALTER TABLE evaluation_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_template_factors ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات أمنية لجدول عوامل التقييم
CREATE POLICY "Users can view evaluation factors in their company" 
ON evaluation_factors 
FOR SELECT 
USING (
  company_id IS NULL OR 
  company_id = boud_get_user_company_id(auth.uid())
);

CREATE POLICY "HR managers can manage evaluation factors" 
ON evaluation_factors 
FOR ALL 
USING (
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
);

-- إنشاء سياسات أمنية لجدول معايير التقييم
CREATE POLICY "Users can view evaluation criteria" 
ON evaluation_criteria 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM evaluation_factors ef 
    WHERE ef.id = evaluation_criteria.factor_id 
    AND (ef.company_id IS NULL OR ef.company_id = boud_get_user_company_id(auth.uid()))
  )
);

CREATE POLICY "HR managers can manage evaluation criteria" 
ON evaluation_criteria 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM evaluation_factors ef 
    WHERE ef.id = evaluation_criteria.factor_id 
    AND (
      boud_has_role(auth.uid(), COALESCE(ef.company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), COALESCE(ef.company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM evaluation_factors ef 
    WHERE ef.id = evaluation_criteria.factor_id 
    AND (
      boud_has_role(auth.uid(), COALESCE(ef.company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), COALESCE(ef.company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
    )
  )
);

-- إنشاء سياسات أمنية لجدول قوالب التقييم
CREATE POLICY "Users can view evaluation templates in their company" 
ON evaluation_templates 
FOR SELECT 
USING (
  company_id IS NULL OR 
  company_id = boud_get_user_company_id(auth.uid())
);

CREATE POLICY "HR managers can manage evaluation templates" 
ON evaluation_templates 
FOR ALL 
USING (
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role) OR
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
);

-- إنشاء سياسات أمنية لجدول ربط القوالب بالعوامل
CREATE POLICY "Users can view template factors" 
ON evaluation_template_factors 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM evaluation_templates et 
    WHERE et.id = evaluation_template_factors.template_id 
    AND (et.company_id IS NULL OR et.company_id = boud_get_user_company_id(auth.uid()))
  )
);

CREATE POLICY "HR managers can manage template factors" 
ON evaluation_template_factors 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM evaluation_templates et 
    WHERE et.id = evaluation_template_factors.template_id 
    AND (
      boud_has_role(auth.uid(), COALESCE(et.company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), COALESCE(et.company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM evaluation_templates et 
    WHERE et.id = evaluation_template_factors.template_id 
    AND (
      boud_has_role(auth.uid(), COALESCE(et.company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role) OR
      boud_has_role(auth.uid(), COALESCE(et.company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
    )
  )
);