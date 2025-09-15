-- إنشاء الأنواع المطلوبة (ENUMs)
CREATE TYPE budget_status AS ENUM ('active', 'inactive');
CREATE TYPE allocation_status AS ENUM ('draft', 'pending', 'approved', 'rejected');
CREATE TYPE expense_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE period_type AS ENUM ('month', 'quarter', 'year');
CREATE TYPE forecast_method AS ENUM ('ai', 'linear', 'manual');
CREATE TYPE auth_type AS ENUM ('api_key', 'oauth2');
CREATE TYPE integration_status AS ENUM ('active', 'inactive');
CREATE TYPE request_type AS ENUM ('allocation', 'expense', 'deletion', 'update');
CREATE TYPE decision_status AS ENUM ('pending', 'approved', 'rejected', 'returned');
CREATE TYPE notification_channel AS ENUM ('inapp', 'email', 'push');
CREATE TYPE notification_status AS ENUM ('unread', 'read');

-- جدول فئات الميزانية
CREATE TABLE budget_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description TEXT,
    status budget_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول مخصصات الميزانية
CREATE TABLE budget_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES budget_categories(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    allocated_amount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    status allocation_status DEFAULT 'draft',
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول مصروفات الميزانية
CREATE TABLE budget_expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES budget_categories(id) ON DELETE CASCADE,
    expense_date DATE NOT NULL,
    amount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    description TEXT NOT NULL,
    attachment_url TEXT,
    status expense_status DEFAULT 'pending',
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول مؤشرات الأداء المالي
CREATE TABLE budget_kpis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES budget_categories(id) ON DELETE CASCADE,
    period_type period_type NOT NULL,
    period_value INTEGER NOT NULL,
    planned_amount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    actual_amount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    variance DECIMAL(18,2) GENERATED ALWAYS AS (actual_amount - planned_amount) STORED,
    variance_percent DECIMAL(7,4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول التوقعات المالية
CREATE TABLE budget_forecasts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES budget_categories(id) ON DELETE CASCADE,
    forecast_year INTEGER NOT NULL,
    method forecast_method NOT NULL,
    predicted_amount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    ai_model_version TEXT,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول تكاملات الأنظمة
CREATE TABLE budget_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_name TEXT NOT NULL,
    api_endpoint TEXT,
    auth_type auth_type NOT NULL,
    token_secret TEXT,
    last_sync TIMESTAMP WITH TIME ZONE,
    status integration_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الموافقات
CREATE TABLE budget_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_type request_type NOT NULL,
    request_id UUID NOT NULL,
    stage_index INTEGER NOT NULL DEFAULT 0,
    approver_user_id UUID,
    decision decision_status DEFAULT 'pending',
    comments TEXT,
    decided_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الإشعارات
CREATE TABLE budget_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_type request_type NOT NULL,
    request_id UUID NOT NULL,
    recipient_user_id UUID NOT NULL,
    channel notification_channel NOT NULL,
    message TEXT NOT NULL,
    status notification_status DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول سجل التدقيق
CREATE TABLE budget_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    before_json JSONB,
    after_json JSONB,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء الفهارس للأداء
CREATE INDEX idx_budget_allocations_category_year ON budget_allocations(category_id, year);
CREATE INDEX idx_budget_expenses_category_date ON budget_expenses(category_id, expense_date);
CREATE INDEX idx_budget_expenses_date ON budget_expenses(expense_date);
CREATE INDEX idx_budget_kpis_category_period ON budget_kpis(category_id, period_type, period_value);
CREATE INDEX idx_budget_approvals_request ON budget_approvals(request_type, request_id);
CREATE INDEX idx_budget_notifications_recipient ON budget_notifications(recipient_user_id, status);

-- إدراج البيانات الافتراضية للفئات
INSERT INTO budget_categories (code, name_ar, name_en, description, status) VALUES
('SAL', 'رواتب وأجور', 'Salaries and Wages', 'تكاليف الرواتب الأساسية والأجور', 'active'),
('REC', 'توظيف واستقطاب', 'Recruitment', 'تكاليف عمليات التوظيف والاستقطاب', 'active'),
('TRN', 'تدريب وتطوير', 'Training & Development', 'برامج التدريب وتطوير المهارات', 'active'),
('RWD', 'مكافآت وحوافز', 'Rewards & Incentives', 'المكافآت والحوافز التحفيزية', 'active'),
('WLB', 'جودة الحياة', 'Work-Life Balance', 'برامج تحسين جودة الحياة الوظيفية', 'active'),
('SYS', 'الأنظمة والتقنية', 'Systems & Technology', 'تكاليف الأنظمة والتقنيات المساندة', 'active'),
('LEG', 'الشؤون القانونية والامتثال', 'Legal & Compliance', 'التكاليف القانونية والامتثال', 'active'),
('OPS', 'العمليات الإدارية المساندة', 'Administrative Operations', 'العمليات الإدارية والخدمات المساندة', 'active');

-- إدراج مخصصات افتراضية للسنة الحالية
INSERT INTO budget_allocations (category_id, year, allocated_amount, status, created_by) 
SELECT 
    id,
    EXTRACT(YEAR FROM NOW())::INTEGER,
    CASE 
        WHEN code = 'SAL' THEN 5000000.00
        WHEN code = 'REC' THEN 300000.00
        WHEN code = 'TRN' THEN 450000.00
        WHEN code = 'RWD' THEN 600000.00
        WHEN code = 'WLB' THEN 250000.00
        WHEN code = 'SYS' THEN 800000.00
        WHEN code = 'LEG' THEN 150000.00
        WHEN code = 'OPS' THEN 200000.00
    END,
    'approved',
    NULL
FROM budget_categories;

-- إدراج مصروفات نموذجية
INSERT INTO budget_expenses (category_id, expense_date, amount, description, status, created_by)
SELECT 
    bc.id,
    (DATE_TRUNC('year', NOW()) + (INTERVAL '1 month' * (generate_series % 6)))::DATE,
    CASE 
        WHEN bc.code = 'SAL' THEN 400000.00 + (RANDOM() * 50000)
        WHEN bc.code = 'REC' THEN 15000.00 + (RANDOM() * 10000)
        WHEN bc.code = 'TRN' THEN 25000.00 + (RANDOM() * 15000)
        WHEN bc.code = 'RWD' THEN 30000.00 + (RANDOM() * 20000)
        WHEN bc.code = 'WLB' THEN 12000.00 + (RANDOM() * 8000)
        WHEN bc.code = 'SYS' THEN 45000.00 + (RANDOM() * 25000)
        WHEN bc.code = 'LEG' THEN 8000.00 + (RANDOM() * 5000)
        WHEN bc.code = 'OPS' THEN 10000.00 + (RANDOM() * 8000)
    END,
    CASE 
        WHEN bc.code = 'SAL' THEN 'رواتب الموظفين - شهر ' || (generate_series + 1)
        WHEN bc.code = 'REC' THEN 'تكاليف توظيف - شهر ' || (generate_series + 1)
        WHEN bc.code = 'TRN' THEN 'برامج تدريبية - شهر ' || (generate_series + 1)
        WHEN bc.code = 'RWD' THEN 'مكافآت الأداء - شهر ' || (generate_series + 1)
        WHEN bc.code = 'WLB' THEN 'أنشطة جودة الحياة - شهر ' || (generate_series + 1)
        WHEN bc.code = 'SYS' THEN 'صيانة الأنظمة - شهر ' || (generate_series + 1)
        WHEN bc.code = 'LEG' THEN 'استشارات قانونية - شهر ' || (generate_series + 1)
        WHEN bc.code = 'OPS' THEN 'مصاريف إدارية - شهر ' || (generate_series + 1)
    END,
    'approved',
    NULL
FROM budget_categories bc
CROSS JOIN generate_series(0, 5);

-- إدراج توقعات افتراضية
INSERT INTO budget_forecasts (category_id, forecast_year, method, predicted_amount)
SELECT 
    bc.id,
    EXTRACT(YEAR FROM NOW())::INTEGER,
    'linear',
    ba.allocated_amount * 1.1
FROM budget_categories bc
JOIN budget_allocations ba ON bc.id = ba.category_id
WHERE ba.year = EXTRACT(YEAR FROM NOW())::INTEGER;

-- تفعيل Row Level Security
ALTER TABLE budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_audit_log ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان الأساسية
CREATE POLICY "Allow all for authenticated users" ON budget_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_allocations FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_expenses FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_kpis FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_forecasts FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_integrations FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_approvals FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_notifications FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_audit_log FOR ALL TO authenticated USING (true);