-- Create comprehensive departments and organizational structure tables
CREATE TABLE public.boud_departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL,
  parent_department_id UUID REFERENCES public.boud_departments(id) ON DELETE CASCADE,
  department_code TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  department_type TEXT DEFAULT 'operational',
  function_type TEXT DEFAULT 'operational', -- strategic, operational, support
  sector_type TEXT DEFAULT 'private', -- governmental, private, nonprofit
  cost_center_code TEXT,
  location TEXT,
  is_active BOOLEAN DEFAULT true,
  visibility_level TEXT DEFAULT 'internal', -- public, internal, hr_only
  manager_id UUID,
  deputy_manager_id UUID,
  head_count INTEGER DEFAULT 0,
  budget_allocation DECIMAL(15,2) DEFAULT 0,
  custom_fields JSONB DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID,
  UNIQUE(company_id, department_code)
);

-- Create department positions/roles table
CREATE TABLE public.boud_department_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES public.boud_departments(id) ON DELETE CASCADE,
  company_id UUID NOT NULL,
  position_code TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  level INTEGER DEFAULT 1,
  reports_to_position_id UUID REFERENCES public.boud_department_positions(id),
  salary_grade TEXT,
  required_qualifications JSONB DEFAULT '[]',
  responsibilities JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(department_id, position_code)
);

-- Create department employee assignments
CREATE TABLE public.boud_department_employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES public.boud_departments(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL,
  position_id UUID REFERENCES public.boud_department_positions(id),
  assignment_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  is_primary BOOLEAN DEFAULT true,
  assignment_type TEXT DEFAULT 'permanent', -- permanent, temporary, secondment
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create unique index for primary department assignments
CREATE UNIQUE INDEX idx_primary_department_assignment 
ON public.boud_department_employees (employee_id, department_id) 
WHERE is_primary = true;

-- Create department approvals/workflows
CREATE TABLE public.boud_department_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES public.boud_departments(id) ON DELETE CASCADE,
  approval_type TEXT NOT NULL, -- leave, expense, purchase, etc
  approver_position_id UUID REFERENCES public.boud_department_positions(id),
  approver_employee_id UUID,
  approval_level INTEGER NOT NULL,
  amount_limit DECIMAL(15,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create department KPIs
CREATE TABLE public.boud_department_kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES public.boud_departments(id) ON DELETE CASCADE,
  kpi_name TEXT NOT NULL,
  kpi_type TEXT NOT NULL, -- financial, operational, hr, quality
  target_value DECIMAL(15,2),
  current_value DECIMAL(15,2) DEFAULT 0,
  unit_of_measure TEXT,
  frequency TEXT DEFAULT 'monthly', -- daily, weekly, monthly, quarterly, yearly
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.boud_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_department_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_department_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_department_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boud_department_kpis ENABLE ROW LEVEL SECURITY;

-- RLS Policies for departments
CREATE POLICY "Company users can view departments"
ON public.boud_departments FOR SELECT
USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage departments"
ON public.boud_departments FOR ALL
USING (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))
WITH CHECK (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role));

-- RLS Policies for positions
CREATE POLICY "Company users can view positions"
ON public.boud_department_positions FOR SELECT
USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage positions"
ON public.boud_department_positions FOR ALL
USING (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))
WITH CHECK (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role));

-- RLS Policies for employee assignments
CREATE POLICY "Company users can view employee assignments"
ON public.boud_department_employees FOR SELECT
USING (department_id IN (SELECT id FROM public.boud_departments WHERE company_id = boud_get_user_company_id(auth.uid())));

CREATE POLICY "HR managers can manage employee assignments"
ON public.boud_department_employees FOR ALL
USING (department_id IN (SELECT id FROM public.boud_departments WHERE company_id = boud_get_user_company_id(auth.uid()) AND (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))))
WITH CHECK (department_id IN (SELECT id FROM public.boud_departments WHERE company_id = boud_get_user_company_id(auth.uid()) AND (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))));

-- Policies for approvals and KPIs
CREATE POLICY "Department managers can view approvals"
ON public.boud_department_approvals FOR SELECT
USING (department_id IN (SELECT id FROM public.boud_departments WHERE company_id = boud_get_user_company_id(auth.uid())));

CREATE POLICY "HR managers can manage approvals"
ON public.boud_department_approvals FOR ALL
USING (department_id IN (SELECT id FROM public.boud_departments WHERE company_id = boud_get_user_company_id(auth.uid()) AND (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))))
WITH CHECK (department_id IN (SELECT id FROM public.boud_departments WHERE company_id = boud_get_user_company_id(auth.uid()) AND (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))));

CREATE POLICY "Department managers can view KPIs"
ON public.boud_department_kpis FOR SELECT
USING (department_id IN (SELECT id FROM public.boud_departments WHERE company_id = boud_get_user_company_id(auth.uid())));

CREATE POLICY "HR managers can manage KPIs"
ON public.boud_department_kpis FOR ALL
USING (department_id IN (SELECT id FROM public.boud_departments WHERE company_id = boud_get_user_company_id(auth.uid()) AND (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))))
WITH CHECK (department_id IN (SELECT id FROM public.boud_departments WHERE company_id = boud_get_user_company_id(auth.uid()) AND (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role))));

-- Create triggers for updated_at
CREATE TRIGGER update_boud_departments_updated_at
  BEFORE UPDATE ON public.boud_departments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_boud_department_positions_updated_at
  BEFORE UPDATE ON public.boud_department_positions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_boud_department_employees_updated_at
  BEFORE UPDATE ON public.boud_department_employees
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_boud_department_kpis_updated_at
  BEFORE UPDATE ON public.boud_department_kpis
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get department hierarchy
CREATE OR REPLACE FUNCTION public.get_department_hierarchy(company_uuid UUID)
RETURNS TABLE(
  id UUID,
  parent_id UUID,
  name_ar TEXT,
  name_en TEXT,
  level INTEGER,
  path TEXT[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE dept_hierarchy AS (
    -- Base case: root departments
    SELECT 
      d.id,
      d.parent_department_id as parent_id,
      d.name_ar,
      d.name_en,
      1 as level,
      ARRAY[d.name_ar] as path
    FROM boud_departments d
    WHERE d.company_id = company_uuid 
      AND d.parent_department_id IS NULL
      AND d.is_active = true
    
    UNION ALL
    
    -- Recursive case: child departments
    SELECT 
      d.id,
      d.parent_department_id as parent_id,
      d.name_ar,
      d.name_en,
      dh.level + 1,
      dh.path || d.name_ar
    FROM boud_departments d
    INNER JOIN dept_hierarchy dh ON d.parent_department_id = dh.id
    WHERE d.company_id = company_uuid 
      AND d.is_active = true
  )
  SELECT * FROM dept_hierarchy
  ORDER BY level, name_ar;
END;
$$;