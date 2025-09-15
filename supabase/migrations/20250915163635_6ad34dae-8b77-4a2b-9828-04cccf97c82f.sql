-- إضافة باقي الجداول المفقودة
CREATE TABLE IF NOT EXISTS budget_forecasts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES budget_categories(id) ON DELETE CASCADE,
    forecast_year INTEGER NOT NULL,
    method forecast_method NOT NULL,
    predicted_amount DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    ai_model_version TEXT,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budget_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_name TEXT NOT NULL,
    api_endpoint TEXT,
    auth_type auth_type NOT NULL,
    token_secret TEXT,
    last_sync TIMESTAMP WITH TIME ZONE,
    status integration_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budget_approvals (
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

CREATE TABLE IF NOT EXISTS budget_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_type request_type NOT NULL,
    request_id UUID NOT NULL,
    recipient_user_id UUID NOT NULL,
    channel notification_channel NOT NULL,
    message TEXT NOT NULL,
    status notification_status DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budget_audit_log (
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

-- إضافة مصروفات تجريبية للأشهر الستة الأولى
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
CROSS JOIN generate_series(0, 5)
ON CONFLICT DO NOTHING;

-- إضافة بيانات تجريبية للموافقات
INSERT INTO budget_approvals (request_type, request_id, stage_index, approver_user_id, decision, comments, decided_at)
SELECT 
    'allocation',
    ba.id,
    0,
    NULL,
    'approved',
    'تم الاعتماد تلقائياً للبيانات التجريبية',
    NOW()
FROM budget_allocations ba
WHERE ba.status = 'approved'
ON CONFLICT DO NOTHING;

-- إضافة بيانات تجريبية للإشعارات
INSERT INTO budget_notifications (request_type, request_id, recipient_user_id, channel, message, status)
SELECT 
    'allocation',
    ba.id,
    COALESCE(ba.created_by, '00000000-0000-0000-0000-000000000000'::UUID),
    'inapp',
    'تم اعتماد مخصص الميزانية لبند ' || bc.name_ar,
    'unread'
FROM budget_allocations ba
JOIN budget_categories bc ON ba.category_id = bc.id
WHERE ba.status = 'approved'
LIMIT 5
ON CONFLICT DO NOTHING;

-- تفعيل RLS على الجداول الجديدة
ALTER TABLE budget_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_audit_log ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للجداول الجديدة
CREATE POLICY "Allow all for authenticated users" ON budget_forecasts FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_integrations FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_approvals FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_notifications FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all for authenticated users" ON budget_audit_log FOR ALL TO authenticated USING (true);

-- إضافة فهارس إضافية للأداء
CREATE INDEX IF NOT EXISTS idx_budget_forecasts_category_year ON budget_forecasts(category_id, forecast_year);
CREATE INDEX IF NOT EXISTS idx_budget_integrations_status ON budget_integrations(status);
CREATE INDEX IF NOT EXISTS idx_budget_approvals_decision ON budget_approvals(decision, stage_index);
CREATE INDEX IF NOT EXISTS idx_budget_notifications_status ON budget_notifications(status, created_at);
CREATE INDEX IF NOT EXISTS idx_budget_audit_entity ON budget_audit_log(entity_type, entity_id);

-- إنشاء دالة لحساب KPIs متقدمة
CREATE OR REPLACE FUNCTION calculate_budget_kpis(p_year INTEGER DEFAULT NULL)
RETURNS TABLE(
    category_code TEXT,
    category_name_ar TEXT,
    allocated_amount DECIMAL(18,2),
    spent_amount DECIMAL(18,2),
    remaining_amount DECIMAL(18,2),
    utilization_percentage DECIMAL(5,2),
    forecast_amount DECIMAL(18,2),
    variance_amount DECIMAL(18,2),
    status_indicator TEXT
) AS $$
DECLARE
    target_year INTEGER := COALESCE(p_year, EXTRACT(YEAR FROM NOW())::INTEGER);
BEGIN
    RETURN QUERY
    SELECT 
        bc.code,
        bc.name_ar,
        COALESCE(ba.allocated_amount, 0::DECIMAL(18,2)) as allocated_amount,
        COALESCE(expense_totals.total_spent, 0::DECIMAL(18,2)) as spent_amount,
        COALESCE(ba.allocated_amount, 0::DECIMAL(18,2)) - COALESCE(expense_totals.total_spent, 0::DECIMAL(18,2)) as remaining_amount,
        CASE 
            WHEN COALESCE(ba.allocated_amount, 0) > 0 THEN 
                (COALESCE(expense_totals.total_spent, 0) / ba.allocated_amount * 100)::DECIMAL(5,2)
            ELSE 0::DECIMAL(5,2)
        END as utilization_percentage,
        COALESCE(bf.predicted_amount, 0::DECIMAL(18,2)) as forecast_amount,
        COALESCE(expense_totals.total_spent, 0::DECIMAL(18,2)) - COALESCE(ba.allocated_amount, 0::DECIMAL(18,2)) as variance_amount,
        CASE 
            WHEN COALESCE(ba.allocated_amount, 0) = 0 THEN 'no_budget'
            WHEN COALESCE(expense_totals.total_spent, 0) / COALESCE(ba.allocated_amount, 1) > 0.95 THEN 'critical'
            WHEN COALESCE(expense_totals.total_spent, 0) / COALESCE(ba.allocated_amount, 1) > 0.80 THEN 'warning'
            ELSE 'good'
        END as status_indicator
    FROM budget_categories bc
    LEFT JOIN budget_allocations ba ON bc.id = ba.category_id AND ba.year = target_year AND ba.status = 'approved'
    LEFT JOIN (
        SELECT 
            be.category_id,
            SUM(be.amount) as total_spent
        FROM budget_expenses be 
        WHERE EXTRACT(YEAR FROM be.expense_date) = target_year
        AND be.status = 'approved'
        GROUP BY be.category_id
    ) expense_totals ON bc.id = expense_totals.category_id
    LEFT JOIN budget_forecasts bf ON bc.id = bf.category_id AND bf.forecast_year = target_year
    WHERE bc.status = 'active'
    ORDER BY bc.code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;