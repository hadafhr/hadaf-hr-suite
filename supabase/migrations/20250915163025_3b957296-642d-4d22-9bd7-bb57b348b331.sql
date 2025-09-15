-- إنشاء الأنواع المطلوبة (ENUMs) مع التحقق من عدم وجودها
DO $$ BEGIN
    CREATE TYPE budget_status AS ENUM ('active', 'inactive');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE allocation_status AS ENUM ('draft', 'pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE expense_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE period_type AS ENUM ('month', 'quarter', 'year');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE forecast_method AS ENUM ('ai', 'linear', 'manual');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE auth_type AS ENUM ('api_key', 'oauth2');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE integration_status AS ENUM ('active', 'inactive');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_type AS ENUM ('allocation', 'expense', 'deletion', 'update');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_channel AS ENUM ('inapp', 'email', 'push');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_status AS ENUM ('unread', 'read');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- جدول فئات الميزانية
CREATE TABLE IF NOT EXISTS budget_categories (
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
CREATE TABLE IF NOT EXISTS budget_allocations (
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
CREATE TABLE IF NOT EXISTS budget_expenses (
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
CREATE TABLE IF NOT EXISTS budget_kpis (
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

-- إدراج البيانات الافتراضية للفئات (فقط إذا لم تكن موجودة)
INSERT INTO budget_categories (code, name_ar, name_en, description, status) 
VALUES
('SAL', 'رواتب وأجور', 'Salaries and Wages', 'تكاليف الرواتب الأساسية والأجور', 'active'),
('REC', 'توظيف واستقطاب', 'Recruitment', 'تكاليف عمليات التوظيف والاستقطاب', 'active'),
('TRN', 'تدريب وتطوير', 'Training & Development', 'برامج التدريب وتطوير المهارات', 'active'),
('RWD', 'مكافآت وحوافز', 'Rewards & Incentives', 'المكافآت والحوافز التحفيزية', 'active'),
('WLB', 'جودة الحياة', 'Work-Life Balance', 'برامج تحسين جودة الحياة الوظيفية', 'active'),
('SYS', 'الأنظمة والتقنية', 'Systems & Technology', 'تكاليف الأنظمة والتقنيات المساندة', 'active'),
('LEG', 'الشؤون القانونية والامتثال', 'Legal & Compliance', 'التكاليف القانونية والامتثال', 'active'),
('OPS', 'العمليات الإدارية المساندة', 'Administrative Operations', 'العمليات الإدارية والخدمات المساندة', 'active')
ON CONFLICT (code) DO NOTHING;

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
FROM budget_categories bc
WHERE NOT EXISTS (
    SELECT 1 FROM budget_allocations ba 
    WHERE ba.category_id = bc.id 
    AND ba.year = EXTRACT(YEAR FROM NOW())::INTEGER
);

-- تفعيل Row Level Security
ALTER TABLE budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_kpis ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان الأساسية
CREATE POLICY "Allow all for authenticated users" ON budget_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_allocations FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_expenses FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_kpis FOR ALL TO authenticated USING (true);