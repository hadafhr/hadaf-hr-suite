-- ====================================
-- نظام التأمين والتأمينات الشامل
-- ====================================

-- إنشاء الأنواع المطلوبة
CREATE TYPE insurance_status AS ENUM ('active', 'inactive', 'suspended', 'expired');
CREATE TYPE insurance_type AS ENUM ('health', 'social', 'life', 'disability', 'dental', 'vision');
CREATE TYPE claim_status AS ENUM ('pending', 'approved', 'rejected', 'processing', 'paid');
CREATE TYPE premium_frequency AS ENUM ('monthly', 'quarterly', 'semi_annual', 'annual');
CREATE TYPE coverage_level AS ENUM ('basic', 'standard', 'premium', 'comprehensive');

-- ====================================
-- جدول شركات التأمين
-- ====================================
CREATE TABLE insurance_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    provider_name TEXT NOT NULL,
    provider_code TEXT UNIQUE NOT NULL,
    provider_type insurance_type NOT NULL,
    contact_person TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    api_endpoint TEXT,
    api_key_encrypted TEXT,
    is_active BOOLEAN DEFAULT true,
    license_number TEXT,
    service_areas TEXT[],
    supported_services JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================================
-- جدول وثائق التأمين (البوليصات)
-- ====================================
CREATE TABLE insurance_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    provider_id UUID REFERENCES insurance_providers(id),
    policy_number TEXT UNIQUE NOT NULL,
    policy_name TEXT NOT NULL,
    insurance_type insurance_type NOT NULL,
    coverage_level coverage_level DEFAULT 'standard',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    renewal_date DATE,
    auto_renewal BOOLEAN DEFAULT false,
    premium_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    premium_frequency premium_frequency DEFAULT 'monthly',
    deductible_amount DECIMAL(10,2) DEFAULT 0,
    coverage_limit DECIMAL(15,2),
    status insurance_status DEFAULT 'active',
    terms_conditions TEXT,
    covered_services JSONB DEFAULT '[]'::jsonb,
    exclusions JSONB DEFAULT '[]'::jsonb,
    documents JSONB DEFAULT '[]'::jsonb,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================================
-- جدول اشتراكات الموظفين في التأمين
-- ====================================
CREATE TABLE employee_insurance_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL,
    policy_id UUID REFERENCES insurance_policies(id),
    subscription_number TEXT UNIQUE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status insurance_status DEFAULT 'active',
    employee_contribution DECIMAL(10,2) DEFAULT 0,
    employer_contribution DECIMAL(10,2) DEFAULT 0,
    total_premium DECIMAL(10,2) NOT NULL,
    salary_percentage DECIMAL(5,2),
    dependents JSONB DEFAULT '[]'::jsonb,
    beneficiaries JSONB DEFAULT '[]'::jsonb,
    additional_coverage JSONB DEFAULT '[]'::jsonb,
    medical_conditions JSONB DEFAULT '[]'::jsonb,
    last_medical_checkup DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================================
-- جدول المطالبات التأمينية
-- ====================================
CREATE TABLE insurance_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID REFERENCES employee_insurance_subscriptions(id),
    claim_number TEXT UNIQUE NOT NULL,
    claim_type TEXT NOT NULL,
    incident_date DATE NOT NULL,
    claim_date DATE DEFAULT CURRENT_DATE,
    claimed_amount DECIMAL(10,2) NOT NULL,
    approved_amount DECIMAL(10,2) DEFAULT 0,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    status claim_status DEFAULT 'pending',
    provider_name TEXT,
    treatment_type TEXT,
    diagnosis TEXT,
    prescription_details JSONB DEFAULT '[]'::jsonb,
    supporting_documents JSONB DEFAULT '[]'::jsonb,
    rejection_reason TEXT,
    approval_date DATE,
    payment_date DATE,
    processed_by UUID,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================================
-- جدول دفعات التأمينات
-- ====================================
CREATE TABLE insurance_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    policy_id UUID REFERENCES insurance_policies(id),
    payment_period TEXT NOT NULL, -- "2024-01", "2024-Q1", etc.
    due_date DATE NOT NULL,
    payment_date DATE,
    total_amount DECIMAL(12,2) NOT NULL,
    employee_contributions DECIMAL(12,2) DEFAULT 0,
    employer_contributions DECIMAL(12,2) DEFAULT 0,
    gosi_contributions DECIMAL(12,2) DEFAULT 0,
    additional_fees DECIMAL(10,2) DEFAULT 0,
    penalty_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(12,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_method TEXT,
    transaction_reference TEXT,
    receipt_number TEXT,
    payment_details JSONB DEFAULT '{}'::jsonb,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================================
-- جدول تكامل التأمينات الاجتماعية (GOSI)
-- ====================================
CREATE TABLE gosi_integration (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    employee_id UUID NOT NULL,
    gosi_number TEXT UNIQUE NOT NULL,
    subscription_date DATE NOT NULL,
    salary_subject_to_gosi DECIMAL(10,2) NOT NULL,
    employee_percentage DECIMAL(5,2) DEFAULT 9.75,
    employer_percentage DECIMAL(5,2) DEFAULT 12.25,
    monthly_employee_contribution DECIMAL(10,2) NOT NULL,
    monthly_employer_contribution DECIMAL(10,2) NOT NULL,
    total_months_contributed INTEGER DEFAULT 0,
    last_contribution_date DATE,
    status insurance_status DEFAULT 'active',
    violations JSONB DEFAULT '[]'::jsonb,
    penalties JSONB DEFAULT '[]'::jsonb,
    service_periods JSONB DEFAULT '[]'::jsonb,
    api_sync_date TIMESTAMP WITH TIME ZONE,
    api_response JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================================
-- جدول إشعارات التأمين
-- ====================================
CREATE TABLE insurance_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    recipient_id UUID NOT NULL,
    notification_type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    related_table TEXT,
    related_id UUID,
    priority_level INTEGER DEFAULT 3,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    email_sent BOOLEAN DEFAULT false,
    sms_sent BOOLEAN DEFAULT false,
    push_sent BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================================
-- جدول تقارير التأمين
-- ====================================
CREATE TABLE insurance_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    report_type TEXT NOT NULL,
    report_name TEXT NOT NULL,
    generated_by UUID,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    report_period_start DATE,
    report_period_end DATE,
    report_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    file_path TEXT,
    status TEXT DEFAULT 'completed',
    parameters JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================================
-- إنشاء الفهارس لتحسين الأداء
-- ====================================
CREATE INDEX idx_insurance_policies_company_type ON insurance_policies(company_id, insurance_type);
CREATE INDEX idx_employee_insurance_employee ON employee_insurance_subscriptions(employee_id);
CREATE INDEX idx_insurance_claims_subscription ON insurance_claims(subscription_id);
CREATE INDEX idx_insurance_claims_status ON insurance_claims(status);
CREATE INDEX idx_insurance_payments_company_period ON insurance_payments(company_id, payment_period);
CREATE INDEX idx_gosi_integration_employee ON gosi_integration(employee_id);
CREATE INDEX idx_insurance_notifications_recipient ON insurance_notifications(recipient_id, is_read);

-- ====================================
-- إنشاء الدوال والمشغلات
-- ====================================

-- دالة تحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_insurance_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- تطبيق المشغل على جميع الجداول
CREATE TRIGGER update_insurance_providers_updated_at BEFORE UPDATE ON insurance_providers FOR EACH ROW EXECUTE FUNCTION update_insurance_updated_at_column();
CREATE TRIGGER update_insurance_policies_updated_at BEFORE UPDATE ON insurance_policies FOR EACH ROW EXECUTE FUNCTION update_insurance_updated_at_column();
CREATE TRIGGER update_employee_insurance_subscriptions_updated_at BEFORE UPDATE ON employee_insurance_subscriptions FOR EACH ROW EXECUTE FUNCTION update_insurance_updated_at_column();
CREATE TRIGGER update_insurance_claims_updated_at BEFORE UPDATE ON insurance_claims FOR EACH ROW EXECUTE FUNCTION update_insurance_updated_at_column();
CREATE TRIGGER update_insurance_payments_updated_at BEFORE UPDATE ON insurance_payments FOR EACH ROW EXECUTE FUNCTION update_insurance_updated_at_column();
CREATE TRIGGER update_gosi_integration_updated_at BEFORE UPDATE ON gosi_integration FOR EACH ROW EXECUTE FUNCTION update_insurance_updated_at_column();

-- دالة توليد أرقام المطالبات
CREATE OR REPLACE FUNCTION generate_claim_number()
RETURNS TEXT AS $$
DECLARE
    claim_number TEXT;
    current_year TEXT;
    sequence_num INTEGER;
BEGIN
    current_year := EXTRACT(YEAR FROM NOW())::TEXT;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(claim_number FROM 'CLM-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM insurance_claims
    WHERE claim_number LIKE 'CLM-' || current_year || '-%';
    
    claim_number := 'CLM-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
    
    RETURN claim_number;
END;
$$ LANGUAGE plpgsql;

-- دالة توليد أرقام الاشتراكات
CREATE OR REPLACE FUNCTION generate_subscription_number()
RETURNS TEXT AS $$
DECLARE
    sub_number TEXT;
    current_year TEXT;
    sequence_num INTEGER;
BEGIN
    current_year := EXTRACT(YEAR FROM NOW())::TEXT;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(subscription_number FROM 'SUB-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM employee_insurance_subscriptions
    WHERE subscription_number LIKE 'SUB-' || current_year || '-%';
    
    sub_number := 'SUB-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
    
    RETURN sub_number;
END;
$$ LANGUAGE plpgsql;

-- ====================================
-- إدراج بيانات افتراضية للاختبار
-- ====================================

-- شركات التأمين
INSERT INTO insurance_providers (provider_name, provider_code, provider_type, contact_person, contact_email, contact_phone, service_areas) VALUES
('شركة بوبا العربية للتأمين', 'BUPA_SA', 'health', 'أحمد السالم', 'contact@bupa.com.sa', '+966112345678', ARRAY['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة']),
('الشركة التعاونية للتأمين', 'TAWUNIYA', 'health', 'فاطمة الأحمد', 'info@tawuniya.com.sa', '+966112345679', ARRAY['الرياض', 'جدة', 'الدمام']),
('شركة ميدغلف للتأمين', 'MEDGULF', 'health', 'محمد الخالد', 'support@medgulf.com.sa', '+966112345680', ARRAY['الرياض', 'جدة', 'الخبر']),
('التأمينات الاجتماعية', 'GOSI', 'social', 'إدارة التأمينات الاجتماعية', 'info@gosi.gov.sa', '+966920020123', ARRAY['جميع المناطق']),
('شركة الأهلي للتأمين', 'ALAHLI_INS', 'life', 'سارة العتيبي', 'contact@alahliinsurance.com', '+966112345681', ARRAY['الرياض', 'جدة']);

-- وثائق التأمين
INSERT INTO insurance_policies (provider_id, policy_number, policy_name, insurance_type, coverage_level, start_date, end_date, premium_amount, premium_frequency, coverage_limit) VALUES
((SELECT id FROM insurance_providers WHERE provider_code = 'BUPA_SA'), 'BUPA-2024-001', 'بوليصة التأمين الصحي الشاملة', 'health', 'comprehensive', '2024-01-01', '2024-12-31', 15000.00, 'annual', 500000.00),
((SELECT id FROM insurance_providers WHERE provider_code = 'TAWUNIYA'), 'TAW-2024-002', 'بوليصة التأمين الصحي الأساسية', 'health', 'standard', '2024-01-01', '2024-12-31', 8000.00, 'annual', 200000.00),
((SELECT id FROM insurance_providers WHERE provider_code = 'GOSI'), 'GOSI-2024-001', 'اشتراك التأمينات الاجتماعية', 'social', 'standard', '2024-01-01', '2024-12-31', 0.00, 'monthly', NULL),
((SELECT id FROM insurance_providers WHERE provider_code = 'ALAHLI_INS'), 'ALAHLI-2024-001', 'تأمين الحياة الجماعي', 'life', 'premium', '2024-01-01', '2024-12-31', 12000.00, 'annual', 1000000.00);

-- الموظفين واشتراكاتهم (استخدام معرفات وهمية للاختبار)
INSERT INTO employee_insurance_subscriptions (employee_id, policy_id, subscription_number, start_date, employee_contribution, employer_contribution, total_premium, salary_percentage, dependents) VALUES
('00000000-0000-0000-0000-000000000001', (SELECT id FROM insurance_policies WHERE policy_number = 'BUPA-2024-001'), 'SUB-2024-000001', '2024-01-01', 500.00, 1000.00, 1500.00, 5.00, '[{"name": "زوجة", "relation": "spouse", "age": 28}, {"name": "طفل", "relation": "child", "age": 5}]'::jsonb),
('00000000-0000-0000-0000-000000000002', (SELECT id FROM insurance_policies WHERE policy_number = 'TAW-2024-002'), 'SUB-2024-000002', '2024-01-01', 300.00, 400.00, 700.00, 3.50, '[{"name": "زوجة", "relation": "spouse", "age": 30}]'::jsonb),
('00000000-0000-0000-0000-000000000003', (SELECT id FROM insurance_policies WHERE policy_number = 'GOSI-2024-001'), 'SUB-2024-000003', '2024-01-01', 975.00, 1225.00, 2200.00, 22.00, '[]'::jsonb);

-- التأمينات الاجتماعية GOSI
INSERT INTO gosi_integration (employee_id, gosi_number, subscription_date, salary_subject_to_gosi, monthly_employee_contribution, monthly_employer_contribution, total_months_contributed) VALUES
('00000000-0000-0000-0000-000000000001', '123456789', '2024-01-01', 10000.00, 975.00, 1225.00, 8),
('00000000-0000-0000-0000-000000000002', '123456790', '2024-01-01', 8000.00, 780.00, 980.00, 8),
('00000000-0000-0000-0000-000000000003', '123456791', '2024-01-01', 12000.00, 1170.00, 1470.00, 8);

-- مطالبات تأمينية للاختبار
INSERT INTO insurance_claims (subscription_id, claim_number, claim_type, incident_date, claimed_amount, approved_amount, status, provider_name, treatment_type, diagnosis) VALUES
((SELECT id FROM employee_insurance_subscriptions WHERE subscription_number = 'SUB-2024-000001'), 'CLM-2024-000001', 'علاج طبي', '2024-08-15', 2500.00, 2200.00, 'approved', 'مستشفى الملك فيصل التخصصي', 'فحص شامل', 'فحص دوري شامل'),
((SELECT id FROM employee_insurance_subscriptions WHERE subscription_number = 'SUB-2024-000001'), 'CLM-2024-000002', 'أدوية', '2024-08-10', 350.00, 300.00, 'paid', 'صيدلية النهدي', 'أدوية مزمنة', 'علاج ضغط الدم'),
((SELECT id FROM employee_insurance_subscriptions WHERE subscription_number = 'SUB-2024-000002'), 'CLM-2024-000003', 'طوارئ', '2024-08-05', 1800.00, 0.00, 'rejected', 'مستشفى الملك خالد', 'طوارئ', 'إصابة رياضية');

-- دفعات التأمين
INSERT INTO insurance_payments (policy_id, payment_period, due_date, payment_date, total_amount, employee_contributions, employer_contributions, net_amount, status, payment_method) VALUES
((SELECT id FROM insurance_policies WHERE policy_number = 'BUPA-2024-001'), '2024-08', '2024-08-31', '2024-08-28', 45000.00, 15000.00, 30000.00, 45000.00, 'paid', 'بنك تحويل'),
((SELECT id FROM insurance_policies WHERE policy_number = 'TAW-2024-002'), '2024-08', '2024-08-31', '2024-08-30', 21000.00, 9000.00, 12000.00, 21000.00, 'paid', 'بنك تحويل'),
((SELECT id FROM insurance_policies WHERE policy_number = 'GOSI-2024-001'), '2024-08', '2024-09-15', NULL, 132000.00, 58500.00, 73500.00, 132000.00, 'pending', NULL);

COMMENT ON TABLE insurance_providers IS 'جدول شركات التأمين والمقدمين';
COMMENT ON TABLE insurance_policies IS 'جدول وثائق التأمين (البوليصات)';
COMMENT ON TABLE employee_insurance_subscriptions IS 'جدول اشتراكات الموظفين في التأمين';
COMMENT ON TABLE insurance_claims IS 'جدول المطالبات التأمينية';
COMMENT ON TABLE insurance_payments IS 'جدول دفعات التأمينات';
COMMENT ON TABLE gosi_integration IS 'جدول تكامل التأمينات الاجتماعية';
COMMENT ON TABLE insurance_notifications IS 'جدول إشعارات التأمين';
COMMENT ON TABLE insurance_reports IS 'جدول تقارير التأمين';