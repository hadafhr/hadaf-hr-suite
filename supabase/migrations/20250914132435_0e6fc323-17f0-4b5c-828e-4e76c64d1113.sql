-- Fix critical security vulnerability in performance evaluation tables
-- Restrict access to authenticated company users only

-- 1. Fix evaluation_criteria table - restrict to authenticated company users
DROP POLICY IF EXISTS "evaluation_criteria_select_policy" ON evaluation_criteria;
CREATE POLICY "evaluation_criteria_select_policy" 
ON evaluation_criteria FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM evaluation_factors ef
    WHERE ef.id = evaluation_criteria.factor_id 
      AND (
        -- Company employees can view their company's evaluation criteria
        ef.company_id = boud_get_user_company_id(auth.uid())
        OR 
        -- HR managers and super admins can view
        boud_has_role(auth.uid(), COALESCE(ef.company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
        OR 
        boud_has_role(auth.uid(), COALESCE(ef.company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role)
      )
  )
);

-- 2. Fix evaluation_template_factors table - restrict to authenticated company users  
DROP POLICY IF EXISTS "evaluation_template_factors_select_policy" ON evaluation_template_factors;
CREATE POLICY "evaluation_template_factors_select_policy" 
ON evaluation_template_factors FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM evaluation_templates et
    WHERE et.id = evaluation_template_factors.template_id 
      AND (
        -- Company employees can view their company's template factors
        et.company_id = boud_get_user_company_id(auth.uid())
        OR 
        -- HR managers and super admins can view
        boud_has_role(auth.uid(), COALESCE(et.company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
        OR 
        boud_has_role(auth.uid(), COALESCE(et.company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role)
      )
  )
);

-- 3. Strengthen evaluation_factors table policy - ensure only authenticated company users
DROP POLICY IF EXISTS "evaluation_factors_select_policy" ON evaluation_factors;
CREATE POLICY "evaluation_factors_select_policy" 
ON evaluation_factors FOR SELECT 
TO authenticated
USING (
  -- Only authenticated users from the same company can view factors
  company_id = boud_get_user_company_id(auth.uid())
  OR 
  -- HR managers and super admins can view
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
  OR 
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role)
);

-- 4. Also secure evaluation_templates table for completeness
DROP POLICY IF EXISTS "evaluation_templates_select_policy" ON evaluation_templates;
CREATE POLICY "evaluation_templates_select_policy" 
ON evaluation_templates FOR SELECT 
TO authenticated
USING (
  -- Only authenticated users from the same company can view templates
  company_id = boud_get_user_company_id(auth.uid())
  OR 
  -- HR managers and super admins can view
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
  OR 
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role)
);

-- 5. Secure evaluations table as well
DROP POLICY IF EXISTS "evaluations_select_policy" ON evaluations;
CREATE POLICY "evaluations_select_policy" 
ON evaluations FOR SELECT 
TO authenticated
USING (
  -- Only authenticated users from the same company can view evaluations
  company_id = boud_get_user_company_id(auth.uid())
  OR 
  -- HR managers and super admins can view
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'hr_manager'::user_role)
  OR 
  boud_has_role(auth.uid(), COALESCE(company_id, boud_get_user_company_id(auth.uid())), 'super_admin'::user_role)
  OR
  -- Employees can view their own evaluations
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);