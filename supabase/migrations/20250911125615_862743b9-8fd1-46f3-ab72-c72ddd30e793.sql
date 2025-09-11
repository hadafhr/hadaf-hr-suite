-- إنشاء أنواع البيانات المطلوبة (إذا لم تكن موجودة)
DO $$ BEGIN
    CREATE TYPE indicator_type AS ENUM ('KPI', 'KRI', 'KSI', 'KQI', 'KVI', 'KCI');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE evaluation_type AS ENUM ('annual', 'semi_annual', 'quarterly', 'monthly', 'custom');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE evaluation_status AS ENUM ('draft', 'in_progress', 'completed', 'approved', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE rater_type AS ENUM ('self', 'manager', 'hr', '360');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE decision_type AS ENUM ('promotion', 'bonus', 'warning', 'salary_freeze', 'development_plan');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE decision_status AS ENUM ('pending', 'approved', 'rejected', 'executed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE signature_status AS ENUM ('pending', 'signed', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- حذف الجداول الموجودة إذا كانت موجودة
DROP TABLE IF EXISTS hr_approvals CASCADE;
DROP TABLE IF EXISTS electronic_signatures CASCADE;
DROP TABLE IF EXISTS automated_decisions CASCADE;
DROP TABLE IF EXISTS indicator_values CASCADE;
DROP TABLE IF EXISTS evaluations CASCADE;
DROP TABLE IF EXISTS evaluation_forms CASCADE;
DROP TABLE IF EXISTS evaluation_programs CASCADE;
DROP TABLE IF EXISTS performance_indicators CASCADE;
DROP TABLE IF EXISTS development_plans CASCADE;

-- جدول المؤشرات
CREATE TABLE performance_indicators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    indicator_code TEXT NOT NULL,
    indicator_name TEXT NOT NULL,
    indicator_type indicator_type NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    target_value NUMERIC,
    weight_percentage NUMERIC DEFAULT 0,
    auto_calculation BOOLEAN DEFAULT FALSE,
    linked_system TEXT,
    calculation_formula TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(company_id, indicator_code)
);

-- جدول برامج التقييم
CREATE TABLE evaluation_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    program_name TEXT NOT NULL,
    evaluation_type evaluation_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    target_departments UUID[],
    target_positions UUID[],
    rater_types rater_type[],
    notification_settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول نماذج التقييم
CREATE TABLE evaluation_forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID REFERENCES evaluation_programs(id),
    form_name TEXT NOT NULL,
    evaluation_factors JSONB NOT NULL,
    indicators UUID[],
    max_score NUMERIC DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول التقييمات
CREATE TABLE evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL,
    employee_id UUID NOT NULL,
    program_id UUID REFERENCES evaluation_programs(id),
    form_id UUID REFERENCES evaluation_forms(id),
    evaluation_period_start DATE NOT NULL,
    evaluation_period_end DATE NOT NULL,
    evaluation_purpose TEXT,
    evaluation_duration TEXT,
    status evaluation_status DEFAULT 'draft',
    overall_score NUMERIC,
    self_evaluation_score NUMERIC,
    manager_evaluation_score NUMERIC,
    hr_evaluation_score NUMERIC,
    final_score NUMERIC,
    employee_comments TEXT,
    manager_comments TEXT,
    hr_comments TEXT,
    manager_recommendation TEXT,
    achievements JSONB DEFAULT '[]',
    goals JSONB DEFAULT '[]',
    competencies JSONB DEFAULT '{}',
    indicator_scores JSONB DEFAULT '{}',
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول قيم المؤشرات
CREATE TABLE indicator_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id),
    indicator_id UUID REFERENCES performance_indicators(id),
    actual_value NUMERIC,
    target_value NUMERIC,
    weight_percentage NUMERIC,
    calculated_score NUMERIC,
    is_auto_calculated BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول القرارات التلقائية
CREATE TABLE automated_decisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id),
    employee_id UUID NOT NULL,
    decision_type decision_type NOT NULL,
    decision_details JSONB NOT NULL,
    score_threshold NUMERIC,
    automatic_amount NUMERIC,
    status decision_status DEFAULT 'pending',
    hr_approved_by UUID,
    hr_approved_at TIMESTAMP WITH TIME ZONE,
    hr_rejection_reason TEXT,
    executed_at TIMESTAMP WITH TIME ZONE,
    payroll_updated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول التوقيعات الإلكترونية
CREATE TABLE electronic_signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id),
    signer_id UUID NOT NULL,
    signer_role TEXT NOT NULL,
    signature_data TEXT,
    signature_timestamp TIMESTAMP WITH TIME ZONE,
    status signature_status DEFAULT 'pending',
    ip_address TEXT,
    device_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول موافقات HR
CREATE TABLE hr_evaluation_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    decision_id UUID REFERENCES automated_decisions(id),
    hr_officer_id UUID NOT NULL,
    approval_status decision_status NOT NULL,
    approval_notes TEXT,
    rejection_reason TEXT,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول خطط التطوير
CREATE TABLE development_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id),
    employee_id UUID NOT NULL,
    weak_indicators UUID[],
    development_activities JSONB DEFAULT '[]',
    training_recommendations JSONB DEFAULT '[]',
    timeline_months INTEGER DEFAULT 6,
    status TEXT DEFAULT 'active',
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إدراج المؤشرات الافتراضية
INSERT INTO performance_indicators (company_id, indicator_code, indicator_name, indicator_type, category, description, weight_percentage) VALUES
-- مؤشرات KPI
((SELECT id FROM boud_companies LIMIT 1), 'KPI001', 'الإنتاجية', 'KPI', 'الأداء', 'قياس مستوى الإنتاجية الشهرية', 25),
((SELECT id FROM boud_companies LIMIT 1), 'KPI002', 'الانضباط', 'KPI', 'السلوك', 'معدل الحضور والالتزام بالمواعيد', 20),
((SELECT id FROM boud_companies LIMIT 1), 'KPI003', 'التطوير المهني', 'KPI', 'التطوير', 'عدد الدورات التدريبية المكتملة', 15),
((SELECT id FROM boud_companies LIMIT 1), 'KPI004', 'جودة العمل', 'KPI', 'الجودة', 'معدل دقة وجودة المخرجات', 30),

-- مؤشرات KRI
((SELECT id FROM boud_companies LIMIT 1), 'KRI001', 'إنذارات الأداء', 'KRI', 'المخاطر', 'عدد الإنذارات المتعلقة بالأداء', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KRI002', 'معدل الاستقالات', 'KRI', 'المخاطر', 'نسبة الاستقالات في الفريق', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KRI003', 'الغياب المتكرر', 'KRI', 'المخاطر', 'عدد أيام الغياب بدون إذن', 100),

-- مؤشرات KSI
((SELECT id FROM boud_companies LIMIT 1), 'KSI001', 'إنجاز الأهداف', 'KSI', 'النجاح', 'نسبة إنجاز الأهداف المحددة', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KSI002', 'إنجاز المشاريع', 'KSI', 'النجاح', 'عدد المشاريع المنجزة في الوقت المحدد', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KSI003', 'الترقيات المستحقة', 'KSI', 'النجاح', 'استحقاق الموظف للترقية', 100),

-- مؤشرات KQI
((SELECT id FROM boud_companies LIMIT 1), 'KQI001', 'رضا العملاء', 'KQI', 'الجودة', 'تقييم العملاء للخدمة المقدمة', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KQI002', 'أخطاء الجودة', 'KQI', 'الجودة', 'عدد أخطاء الجودة الشهرية', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KQI003', 'إعادة العمل', 'KQI', 'الجودة', 'نسبة الأعمال التي تحتاج إعادة', 100),

-- مؤشرات KVI
((SELECT id FROM boud_companies LIMIT 1), 'KVI001', 'العائد من التدريب', 'KVI', 'القيمة', 'العائد المحقق من الاستثمار في التدريب', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KVI002', 'إنتاجية الفرد', 'KVI', 'القيمة', 'القيمة المضافة لكل موظف', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KVI003', 'مساهمة الإيرادات', 'KVI', 'القيمة', 'مساهمة الموظف في زيادة الإيرادات', 100),

-- مؤشرات KCI
((SELECT id FROM boud_companies LIMIT 1), 'KCI001', 'المهارات الفنية', 'KCI', 'القدرات', 'مستوى المهارات التقنية', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KCI002', 'المهارات السلوكية', 'KCI', 'القدرات', 'مهارات التواصل والتعامل', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KCI003', 'مهارات القيادة', 'KCI', 'القدرات', 'قدرات القيادة وإدارة الفريق', 100),
((SELECT id FROM boud_companies LIMIT 1), 'KCI004', 'مهارات الابتكار', 'KCI', 'القدرات', 'القدرة على الابتكار والإبداع', 100);