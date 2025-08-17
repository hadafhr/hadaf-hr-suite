-- Create Performance Goals table
CREATE TABLE public.performance_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  company_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_value NUMERIC,
  current_value NUMERIC DEFAULT 0,
  unit TEXT DEFAULT 'percentage',
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  target_date DATE NOT NULL,
  completion_date DATE,
  weight NUMERIC DEFAULT 1.0 CHECK (weight >= 0 AND weight <= 10),
  category TEXT DEFAULT 'general',
  created_by UUID,
  assigned_by UUID,
  reviewed_by UUID,
  review_date DATE,
  review_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Performance Reviews table
CREATE TABLE public.performance_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  company_id UUID NOT NULL,
  reviewer_id UUID NOT NULL,
  review_period_start DATE NOT NULL,
  review_period_end DATE NOT NULL,
  overall_rating NUMERIC CHECK (overall_rating >= 1 AND overall_rating <= 5),
  goal_achievement_score NUMERIC DEFAULT 0,
  competency_scores JSONB DEFAULT '{}',
  strengths TEXT,
  areas_for_improvement TEXT,
  development_recommendations TEXT,
  manager_comments TEXT,
  employee_comments TEXT,
  hr_comments TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'pending_approval', 'completed', 'cancelled')),
  submitted_date DATE,
  approved_date DATE,
  approved_by UUID,
  next_review_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Performance KPIs table
CREATE TABLE public.performance_kpis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  unit TEXT DEFAULT 'number',
  target_value NUMERIC,
  calculation_method TEXT,
  frequency TEXT DEFAULT 'monthly' CHECK (frequency IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly')),
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Employee KPI Measurements table
CREATE TABLE public.employee_kpi_measurements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  kpi_id UUID NOT NULL,
  measurement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  actual_value NUMERIC NOT NULL,
  target_value NUMERIC,
  variance NUMERIC,
  variance_percentage NUMERIC,
  notes TEXT,
  recorded_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Development Plans table
CREATE TABLE public.development_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  company_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  objective TEXT,
  skills_to_develop TEXT[],
  development_activities JSONB DEFAULT '[]',
  budget_allocated NUMERIC DEFAULT 0,
  budget_used NUMERIC DEFAULT 0,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  target_completion_date DATE NOT NULL,
  actual_completion_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'on_hold', 'cancelled')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  mentor_id UUID,
  created_by UUID,
  approved_by UUID,
  approval_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Performance Competencies table
CREATE TABLE public.performance_competencies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  proficiency_levels JSONB DEFAULT '[
    {"level": 1, "title": "مبتدئ", "description": "مستوى أساسي من المهارة"},
    {"level": 2, "title": "متوسط", "description": "مستوى متوسط من المهارة"},
    {"level": 3, "title": "متقدم", "description": "مستوى متقدم من المهارة"},
    {"level": 4, "title": "خبير", "description": "مستوى خبير في المهارة"},
    {"level": 5, "title": "استثنائي", "description": "مستوى استثنائي ومبدع"}
  ]',
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.performance_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_kpi_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_competencies ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Performance Goals
CREATE POLICY "Employees can view their own goals" ON public.performance_goals
  FOR SELECT USING (
    employee_id IN (
      SELECT boud_employees.id FROM boud_employees 
      WHERE boud_employees.user_id = auth.uid()
    )
  );

CREATE POLICY "HR managers can manage performance goals" ON public.performance_goals
  FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'line_manager'::user_role)
  );

-- Create RLS Policies for Performance Reviews
CREATE POLICY "Employees can view their own reviews" ON public.performance_reviews
  FOR SELECT USING (
    employee_id IN (
      SELECT boud_employees.id FROM boud_employees 
      WHERE boud_employees.user_id = auth.uid()
    ) OR reviewer_id = auth.uid()
  );

CREATE POLICY "HR managers can manage performance reviews" ON public.performance_reviews
  FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'line_manager'::user_role)
  );

-- Create RLS Policies for Performance KPIs
CREATE POLICY "Users can view KPIs in their company" ON public.performance_kpis
  FOR SELECT USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage KPIs" ON public.performance_kpis
  FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
  );

-- Create RLS Policies for Employee KPI Measurements
CREATE POLICY "Employees can view their own KPI measurements" ON public.employee_kpi_measurements
  FOR SELECT USING (
    employee_id IN (
      SELECT boud_employees.id FROM boud_employees 
      WHERE boud_employees.user_id = auth.uid()
    )
  );

CREATE POLICY "HR managers can manage KPI measurements" ON public.employee_kpi_measurements
  FOR ALL USING (
    employee_id IN (
      SELECT e.id FROM boud_employees e
      WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
        boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR
        boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role) OR
        boud_has_role(auth.uid(), e.company_id, 'line_manager'::user_role)
      )
    )
  );

-- Create RLS Policies for Development Plans
CREATE POLICY "Employees can view their own development plans" ON public.development_plans
  FOR SELECT USING (
    employee_id IN (
      SELECT boud_employees.id FROM boud_employees 
      WHERE boud_employees.user_id = auth.uid()
    )
  );

CREATE POLICY "HR managers can manage development plans" ON public.development_plans
  FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'line_manager'::user_role)
  );

-- Create RLS Policies for Performance Competencies
CREATE POLICY "Users can view competencies in their company" ON public.performance_competencies
  FOR SELECT USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage competencies" ON public.performance_competencies
  FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
  );

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_performance_goals_updated_at BEFORE UPDATE ON public.performance_goals FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_performance_reviews_updated_at BEFORE UPDATE ON public.performance_reviews FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_performance_kpis_updated_at BEFORE UPDATE ON public.performance_kpis FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_development_plans_updated_at BEFORE UPDATE ON public.development_plans FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_performance_competencies_updated_at BEFORE UPDATE ON public.performance_competencies FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();