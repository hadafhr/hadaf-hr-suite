-- إنشاء جداول نظام التقييمات المتكامل

-- جدول دورات التقييم
CREATE TABLE public.evaluation_cycles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid NOT NULL,
  cycle_name text NOT NULL,
  cycle_type text NOT NULL DEFAULT 'quarterly', -- quarterly, half_yearly, annual
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text NOT NULL DEFAULT 'draft', -- draft, active, closed
  description text,
  settings jsonb DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid,
  UNIQUE(company_id, cycle_name)
);

-- جدول قوالب التقييم
CREATE TABLE public.evaluation_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid NOT NULL,
  template_name text NOT NULL,
  evaluation_type text NOT NULL, -- mbo, kpi, 360, bsc, continuous
  template_config jsonb NOT NULL DEFAULT '{}',
  is_default boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid,
  UNIQUE(company_id, template_name, evaluation_type)
);

-- جدول التقييمات
CREATE TABLE public.evaluations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid NOT NULL,
  cycle_id uuid REFERENCES public.evaluation_cycles(id),
  template_id uuid REFERENCES public.evaluation_templates(id),
  employee_id uuid NOT NULL,
  evaluator_id uuid,
  evaluation_type text NOT NULL,
  status text NOT NULL DEFAULT 'draft', -- draft, in_progress, completed, approved
  scores jsonb DEFAULT '{}',
  comments text,
  overall_score numeric,
  goals jsonb DEFAULT '[]',
  kpis jsonb DEFAULT '[]',
  competencies jsonb DEFAULT '{}',
  development_plan jsonb DEFAULT '{}',
  submitted_at timestamp with time zone,
  approved_at timestamp with time zone,
  approved_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- جدول تقييمات 360 درجة
CREATE TABLE public.evaluation_360 (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  evaluation_id uuid REFERENCES public.evaluations(id) ON DELETE CASCADE,
  evaluator_id uuid NOT NULL,
  evaluator_type text NOT NULL, -- manager, peer, subordinate, customer
  is_anonymous boolean DEFAULT true,
  scores jsonb DEFAULT '{}',
  comments text,
  status text NOT NULL DEFAULT 'pending', -- pending, completed
  submitted_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- جدول الاختبارات
CREATE TABLE public.assessments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid NOT NULL,
  assessment_name text NOT NULL,
  assessment_type text NOT NULL, -- disc, mbti, hogan, competency, work_sample, birkman
  description text,
  questions jsonb DEFAULT '[]',
  scoring_config jsonb DEFAULT '{}',
  time_limit integer, -- in minutes
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid
);

-- جدول نتائج الاختبارات
CREATE TABLE public.assessment_results (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id uuid REFERENCES public.assessments(id),
  employee_id uuid NOT NULL,
  company_id uuid NOT NULL,
  scores jsonb DEFAULT '{}',
  results jsonb DEFAULT '{}',
  interpretation text,
  development_plan jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'in_progress', -- in_progress, completed
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- جدول الأهداف (MBO)
CREATE TABLE public.objectives (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  evaluation_id uuid REFERENCES public.evaluations(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL,
  company_id uuid NOT NULL,
  objective_title text NOT NULL,
  description text,
  category text, -- institutional, departmental, individual
  weight numeric NOT NULL DEFAULT 0,
  target_value numeric,
  current_value numeric DEFAULT 0,
  measurement_unit text,
  due_date date,
  status text NOT NULL DEFAULT 'active', -- active, completed, cancelled
  achievement_percentage numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- جدول مؤشرات الأداء الرئيسية (KPI)
CREATE TABLE public.kpis (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  evaluation_id uuid REFERENCES public.evaluations(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL,
  company_id uuid NOT NULL,
  kpi_name text NOT NULL,
  description text,
  weight numeric NOT NULL DEFAULT 0,
  target_value numeric NOT NULL,
  current_value numeric DEFAULT 0,
  measurement_unit text,
  frequency text DEFAULT 'monthly', -- daily, weekly, monthly, quarterly
  data_source text,
  calculation_method text,
  achievement_percentage numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- جدول بطاقة الأداء المتوازن (BSC)
CREATE TABLE public.bsc_perspectives (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  evaluation_id uuid REFERENCES public.evaluations(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL,
  company_id uuid NOT NULL,
  perspective_name text NOT NULL, -- financial, customer, internal_process, learning_growth
  weight numeric NOT NULL DEFAULT 25,
  objectives jsonb DEFAULT '[]',
  kpis jsonb DEFAULT '[]',
  initiatives jsonb DEFAULT '[]',
  score numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- جدول الكفاءات
CREATE TABLE public.competencies (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid NOT NULL,
  competency_name text NOT NULL,
  description text,
  category text, -- technical, behavioral, leadership
  levels jsonb DEFAULT '[]', -- 5 levels with descriptions
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(company_id, competency_name)
);

-- جدول تقييم الكفاءات
CREATE TABLE public.competency_evaluations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  evaluation_id uuid REFERENCES public.evaluations(id) ON DELETE CASCADE,
  competency_id uuid REFERENCES public.competencies(id),
  employee_id uuid NOT NULL,
  current_level integer NOT NULL DEFAULT 1,
  target_level integer NOT NULL DEFAULT 1,
  evidence text,
  development_actions jsonb DEFAULT '[]',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- جدول التقييم المستمر
CREATE TABLE public.continuous_feedback (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id uuid NOT NULL,
  manager_id uuid NOT NULL,
  company_id uuid NOT NULL,
  feedback_type text NOT NULL, -- one_on_one, micro_goal, instant_feedback, recognition
  title text NOT NULL,
  description text,
  rating integer, -- 1-5 scale
  tags text[],
  is_public boolean DEFAULT false,
  meeting_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- جدول خطط التطوير
CREATE TABLE public.development_plans (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id uuid NOT NULL,
  company_id uuid NOT NULL,
  evaluation_id uuid REFERENCES public.evaluations(id),
  plan_name text NOT NULL,
  goals jsonb DEFAULT '[]',
  actions jsonb DEFAULT '[]',
  timeline jsonb DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft', -- draft, active, completed
  progress_percentage numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- إنشاء الفهارس
CREATE INDEX idx_evaluations_employee_cycle ON public.evaluations(employee_id, cycle_id);
CREATE INDEX idx_evaluations_company_status ON public.evaluations(company_id, status);
CREATE INDEX idx_assessment_results_employee ON public.assessment_results(employee_id, assessment_id);
CREATE INDEX idx_objectives_evaluation ON public.objectives(evaluation_id);
CREATE INDEX idx_kpis_evaluation ON public.kpis(evaluation_id);
CREATE INDEX idx_competency_evaluations_employee ON public.competency_evaluations(employee_id);

-- تفعيل RLS
ALTER TABLE public.evaluation_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_360 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bsc_perspectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competency_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.continuous_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_plans ENABLE ROW LEVEL SECURITY;

-- سياسات RLS للوصول لبيانات نفس الشركة
CREATE POLICY "Users can view evaluation data for their company" ON public.evaluation_cycles
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "HR can manage evaluation cycles" ON public.evaluation_cycles
  FOR ALL USING (
    company_id = get_user_company_id(auth.uid()) AND 
    (hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role))
  );

CREATE POLICY "Users can view evaluation templates for their company" ON public.evaluation_templates
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "HR can manage evaluation templates" ON public.evaluation_templates
  FOR ALL USING (
    company_id = get_user_company_id(auth.uid()) AND 
    (hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR hr_has_role(auth.uid(), company_id, 'owner'::hr_role))
  );

CREATE POLICY "Users can view evaluations in their company" ON public.evaluations
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Employees can create their evaluations" ON public.evaluations
  FOR INSERT WITH CHECK (
    company_id = get_user_company_id(auth.uid()) AND
    employee_id IN (SELECT id FROM public.hr_employees WHERE user_id = auth.uid())
  );

CREATE POLICY "HR and managers can update evaluations" ON public.evaluations
  FOR UPDATE USING (
    company_id = get_user_company_id(auth.uid()) AND 
    (hr_has_role(auth.uid(), company_id, 'hr_officer'::hr_role) OR 
     hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR 
     hr_has_role(auth.uid(), company_id, 'line_manager'::hr_role) OR 
     hr_has_role(auth.uid(), company_id, 'owner'::hr_role))
  );

CREATE POLICY "Users can view 360 evaluations in their company" ON public.evaluation_360
  FOR SELECT USING (
    evaluation_id IN (SELECT id FROM public.evaluations WHERE company_id = get_user_company_id(auth.uid()))
  );

CREATE POLICY "Users can participate in 360 evaluations" ON public.evaluation_360
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM public.evaluations WHERE company_id = get_user_company_id(auth.uid()))
  );

CREATE POLICY "Users can view assessments for their company" ON public.assessments
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "HR can manage assessments" ON public.assessments
  FOR ALL USING (
    company_id = get_user_company_id(auth.uid()) AND 
    (hr_has_role(auth.uid(), company_id, 'hr_officer'::hr_role) OR 
     hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR 
     hr_has_role(auth.uid(), company_id, 'owner'::hr_role))
  );

CREATE POLICY "Users can view assessment results in their company" ON public.assessment_results
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Employees can create their assessment results" ON public.assessment_results
  FOR INSERT WITH CHECK (
    company_id = get_user_company_id(auth.uid()) AND
    employee_id IN (SELECT id FROM public.hr_employees WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view objectives in their company" ON public.objectives
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can manage their objectives" ON public.objectives
  FOR ALL USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can view KPIs in their company" ON public.kpis
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can manage their KPIs" ON public.kpis
  FOR ALL USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can view BSC perspectives in their company" ON public.bsc_perspectives
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can manage their BSC perspectives" ON public.bsc_perspectives
  FOR ALL USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can view competencies for their company" ON public.competencies
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "HR can manage competencies" ON public.competencies
  FOR ALL USING (
    company_id = get_user_company_id(auth.uid()) AND 
    (hr_has_role(auth.uid(), company_id, 'hr_officer'::hr_role) OR 
     hr_has_role(auth.uid(), company_id, 'hr_manager'::hr_role) OR 
     hr_has_role(auth.uid(), company_id, 'owner'::hr_role))
  );

CREATE POLICY "Users can view competency evaluations in their company" ON public.competency_evaluations
  FOR SELECT USING (
    evaluation_id IN (SELECT id FROM public.evaluations WHERE company_id = get_user_company_id(auth.uid()))
  );

CREATE POLICY "Users can manage competency evaluations in their company" ON public.competency_evaluations
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM public.evaluations WHERE company_id = get_user_company_id(auth.uid()))
  );

CREATE POLICY "Users can view continuous feedback in their company" ON public.continuous_feedback
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can create continuous feedback" ON public.continuous_feedback
  FOR INSERT WITH CHECK (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can view development plans in their company" ON public.development_plans
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can manage development plans in their company" ON public.development_plans
  FOR ALL USING (company_id = get_user_company_id(auth.uid()));

-- إدراج قوالب الكفاءات الافتراضية
INSERT INTO public.competencies (company_id, competency_name, description, category, levels)
SELECT 
  c.id,
  'القيادة والإدارة',
  'القدرة على قيادة الفرق وإدارة المشاريع بفعالية',
  'leadership',
  '[
    {"level": 1, "name": "مبتدئ", "description": "يحتاج إلى التوجيه المستمر"},
    {"level": 2, "name": "متطور", "description": "يعمل بشكل مستقل في المهام الأساسية"},
    {"level": 3, "name": "كفء", "description": "يؤدي المهام بخبرة ويساعد الآخرين"},
    {"level": 4, "name": "متقدم", "description": "يقود المشاريع ويطور العمليات"},
    {"level": 5, "name": "خبير", "description": "يضع الاستراتيجيات ويقود التحول"}
  ]'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'التواصل والعلاقات',
  'مهارات التواصل الفعال وبناء العلاقات المهنية',
  'behavioral',
  '[
    {"level": 1, "name": "مبتدئ", "description": "تواصل أساسي مع التوجيه"},
    {"level": 2, "name": "متطور", "description": "تواصل واضح في معظم الحالات"},
    {"level": 3, "name": "كفء", "description": "تواصل فعال ومؤثر"},
    {"level": 4, "name": "متقدم", "description": "يؤثر ويقنع الآخرين بفعالية"},
    {"level": 5, "name": "خبير", "description": "يلهم ويحفز الآخرين"}
  ]'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'حل المشكلات والابتكار',
  'القدرة على تحليل المشكلات وإيجاد حلول إبداعية',
  'technical',
  '[
    {"level": 1, "name": "مبتدئ", "description": "يحل المشكلات البسيطة بالتوجيه"},
    {"level": 2, "name": "متطور", "description": "يحل المشكلات المعتادة بشكل مستقل"},
    {"level": 3, "name": "كفء", "description": "يحلل ويحل المشكلات المعقدة"},
    {"level": 4, "name": "متقدم", "description": "يبتكر حلولاً جديدة ومبدعة"},
    {"level": 5, "name": "خبير", "description": "يطور منهجيات حل جديدة"}
  ]'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'التعلم والتطوير',
  'الالتزام بالتعلم المستمر وتطوير الذات والآخرين',
  'behavioral',
  '[
    {"level": 1, "name": "مبتدئ", "description": "يتعلم المهارات الأساسية"},
    {"level": 2, "name": "متطور", "description": "يطور مهاراته باستمرار"},
    {"level": 3, "name": "كفء", "description": "يتعلم بسرعة ويطبق المعرفة"},
    {"level": 4, "name": "متقدم", "description": "يعلم ويطور الآخرين"},
    {"level": 5, "name": "خبير", "description": "يقود التطوير المؤسسي"}
  ]'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
ON CONFLICT (company_id, competency_name) DO NOTHING;