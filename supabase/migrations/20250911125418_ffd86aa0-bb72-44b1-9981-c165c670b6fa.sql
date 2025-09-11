-- إنشاء أنواع البيانات المطلوبة
CREATE TYPE indicator_type AS ENUM ('KPI', 'KRI', 'KSI', 'KQI', 'KVI', 'KCI');
CREATE TYPE evaluation_type AS ENUM ('annual', 'semi_annual', 'quarterly', 'monthly', 'custom');
CREATE TYPE evaluation_status AS ENUM ('draft', 'in_progress', 'completed', 'approved', 'archived');
CREATE TYPE rater_type AS ENUM ('self', 'manager', 'hr', '360');
CREATE TYPE decision_type AS ENUM ('promotion', 'bonus', 'warning', 'salary_freeze', 'development_plan');
CREATE TYPE decision_status AS ENUM ('pending', 'approved', 'rejected', 'executed');
CREATE TYPE signature_status AS ENUM ('pending', 'signed', 'rejected');

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
    linked_system TEXT, -- النظام المرتبط للحصول على القيمة تلقائياً
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
    evaluation_factors JSONB NOT NULL, -- العوامل الرئيسية مع الأوزان
    indicators UUID[], -- مصفوفة المؤشرات المحددة
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
    evaluation_purpose TEXT, -- هدف التقييم
    evaluation_duration TEXT, -- مدة التقييم
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
    indicator_scores JSONB DEFAULT '{}', -- نتائج المؤشرات
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
    automatic_amount NUMERIC, -- مبلغ العلاوة أو المكافأة
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
    signer_role TEXT NOT NULL, -- 'employee', 'manager', 'hr'
    signature_data TEXT,
    signature_timestamp TIMESTAMP WITH TIME ZONE,
    status signature_status DEFAULT 'pending',
    ip_address TEXT,
    device_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول موافقات HR
CREATE TABLE hr_approvals (
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
    weak_indicators UUID[], -- المؤشرات الضعيفة
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
(gen_random_uuid(), 'KPI001', 'الإنتاجية', 'KPI', 'الأداء', 'قياس مستوى الإنتاجية الشهرية', 25),
(gen_random_uuid(), 'KPI002', 'الانضباط', 'KPI', 'السلوك', 'معدل الحضور والالتزام بالمواعيد', 20),
(gen_random_uuid(), 'KPI003', 'التطوير المهني', 'KPI', 'التطوير', 'عدد الدورات التدريبية المكتملة', 15),
(gen_random_uuid(), 'KPI004', 'جودة العمل', 'KPI', 'الجودة', 'معدل دقة وجودة المخرجات', 30),

-- مؤشرات KRI
(gen_random_uuid(), 'KRI001', 'إنذارات الأداء', 'KRI', 'المخاطر', 'عدد الإنذارات المتعلقة بالأداء', 100),
(gen_random_uuid(), 'KRI002', 'معدل الاستقالات', 'KRI', 'المخاطر', 'نسبة الاستقالات في الفريق', 100),
(gen_random_uuid(), 'KRI003', 'الغياب المتكرر', 'KRI', 'المخاطر', 'عدد أيام الغياب بدون إذن', 100),

-- مؤشرات KSI
(gen_random_uuid(), 'KSI001', 'إنجاز الأهداف', 'KSI', 'النجاح', 'نسبة إنجاز الأهداف المحددة', 100),
(gen_random_uuid(), 'KSI002', 'إنجاز المشاريع', 'KSI', 'النجاح', 'عدد المشاريع المنجزة في الوقت المحدد', 100),
(gen_random_uuid(), 'KSI003', 'الترقيات المستحقة', 'KSI', 'النجاح', 'استحقاق الموظف للترقية', 100),

-- مؤشرات KQI
(gen_random_uuid(), 'KQI001', 'رضا العملاء', 'KQI', 'الجودة', 'تقييم العملاء للخدمة المقدمة', 100),
(gen_random_uuid(), 'KQI002', 'أخطاء الجودة', 'KQI', 'الجودة', 'عدد أخطاء الجودة الشهرية', 100),
(gen_random_uuid(), 'KQI003', 'إعادة العمل', 'KQI', 'الجودة', 'نسبة الأعمال التي تحتاج إعادة', 100),

-- مؤشرات KVI
(gen_random_uuid(), 'KVI001', 'العائد من التدريب', 'KVI', 'القيمة', 'العائد المحقق من الاستثمار في التدريب', 100),
(gen_random_uuid(), 'KVI002', 'إنتاجية الفرد', 'KVI', 'القيمة', 'القيمة المضافة لكل موظف', 100),
(gen_random_uuid(), 'KVI003', 'مساهمة الإيرادات', 'KVI', 'القيمة', 'مساهمة الموظف في زيادة الإيرادات', 100),

-- مؤشرات KCI
(gen_random_uuid(), 'KCI001', 'المهارات الفنية', 'KCI', 'القدرات', 'مستوى المهارات التقنية', 100),
(gen_random_uuid(), 'KCI002', 'المهارات السلوكية', 'KCI', 'القدرات', 'مهارات التواصل والتعامل', 100),
(gen_random_uuid(), 'KCI003', 'مهارات القيادة', 'KCI', 'القدرات', 'قدرات القيادة وإدارة الفريق', 100),
(gen_random_uuid(), 'KCI004', 'مهارات الابتكار', 'KCI', 'القدرات', 'القدرة على الابتكار والإبداع', 100);

-- إنشاء الفهارس المطلوبة
CREATE INDEX idx_performance_indicators_company ON performance_indicators(company_id);
CREATE INDEX idx_performance_indicators_type ON performance_indicators(indicator_type);
CREATE INDEX idx_evaluations_employee ON evaluations(employee_id);
CREATE INDEX idx_evaluations_program ON evaluations(program_id);
CREATE INDEX idx_evaluations_status ON evaluations(status);
CREATE INDEX idx_automated_decisions_employee ON automated_decisions(employee_id);
CREATE INDEX idx_automated_decisions_status ON automated_decisions(status);

-- إنشاء triggers للتحديث التلقائي
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_performance_indicators_updated_at BEFORE UPDATE ON performance_indicators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_evaluation_programs_updated_at BEFORE UPDATE ON evaluation_programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_evaluation_forms_updated_at BEFORE UPDATE ON evaluation_forms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_evaluations_updated_at BEFORE UPDATE ON evaluations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_automated_decisions_updated_at BEFORE UPDATE ON automated_decisions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_development_plans_updated_at BEFORE UPDATE ON development_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();