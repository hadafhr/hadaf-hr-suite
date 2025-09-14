-- تطوير نظام الحضور والانصراف الشامل لمنصة بُعد HR

-- إنشاء أنواع البيانات المطلوبة
CREATE TYPE device_type AS ENUM ('fingerprint', 'face_recognition', 'rfid', 'mobile_gps', 'qr_code', 'camera_wall');
CREATE TYPE check_method AS ENUM ('device', 'gps', 'qr_code', 'manual', 'face_id', 'remote');
CREATE TYPE violation_severity AS ENUM ('minor', 'moderate', 'major', 'critical');
CREATE TYPE penalty_type AS ENUM ('warning', 'salary_deduction', 'suspension', 'termination');
CREATE TYPE work_type AS ENUM ('office', 'remote', 'hybrid', 'flexible');
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');

-- جدول أجهزة الحضور المطور
ALTER TABLE attendance_devices 
ADD COLUMN IF NOT EXISTS device_type device_type DEFAULT 'fingerprint',
ADD COLUMN IF NOT EXISTS face_recognition_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS qr_code_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS api_endpoint TEXT,
ADD COLUMN IF NOT EXISTS auth_token TEXT,
ADD COLUMN IF NOT EXISTS device_config JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS geofence_radius INTEGER DEFAULT 100;

-- جدول المواقع المصرح بها للحضور (Geofencing)
CREATE TABLE IF NOT EXISTS attendance_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES boud_companies(id),
    location_name TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    radius_meters INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT TRUE,
    work_type work_type DEFAULT 'office',
    allowed_methods check_method[] DEFAULT ARRAY['gps', 'device'],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول التتبع المباشر للموظفين الميدانيين
CREATE TABLE IF NOT EXISTS employee_live_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy DECIMAL(5, 2),
    speed DECIMAL(5, 2),
    heading INTEGER,
    activity_type TEXT DEFAULT 'stationary',
    battery_level INTEGER,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    is_inside_geofence BOOLEAN DEFAULT FALSE,
    geofence_location_id UUID REFERENCES attendance_locations(id)
);

-- تحسين جدول سجلات الحضور
ALTER TABLE attendance_records_new 
ADD COLUMN IF NOT EXISTS check_method check_method DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS device_id UUID REFERENCES attendance_devices(id),
ADD COLUMN IF NOT EXISTS location_id UUID REFERENCES attendance_locations(id),
ADD COLUMN IF NOT EXISTS gps_accuracy DECIMAL(5, 2),
ADD COLUMN IF NOT EXISTS face_recognition_confidence DECIMAL(5, 4),
ADD COLUMN IF NOT EXISTS qr_code TEXT,
ADD COLUMN IF NOT EXISTS work_type work_type DEFAULT 'office',
ADD COLUMN IF NOT EXISTS planned_start_time TIME,
ADD COLUMN IF NOT EXISTS planned_end_time TIME,
ADD COLUMN IF NOT EXISTS late_minutes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS early_leave_minutes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS break_duration_minutes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS overtime_approved BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS overtime_approved_by UUID,
ADD COLUMN IF NOT EXISTS attendance_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS penalty_amount DECIMAL(10, 2) DEFAULT 0;

-- جدول الجداول الزمنية والشفتات
CREATE TABLE IF NOT EXISTS work_shifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES boud_companies(id),
    shift_name TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_duration INTEGER DEFAULT 60, -- بالدقائق
    work_days INTEGER[] DEFAULT ARRAY[1,2,3,4,5], -- 1=الأحد, 7=السبت
    is_flexible BOOLEAN DEFAULT FALSE,
    max_late_minutes INTEGER DEFAULT 15,
    overtime_threshold_minutes INTEGER DEFAULT 480, -- 8 ساعات
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول جداول الموظفين الشهرية
CREATE TABLE IF NOT EXISTS employee_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    shift_id UUID REFERENCES work_shifts(id),
    work_date DATE NOT NULL,
    planned_start TIME,
    planned_end TIME,
    work_type work_type DEFAULT 'office',
    location_id UUID REFERENCES attendance_locations(id),
    status approval_status DEFAULT 'approved',
    notes TEXT,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, work_date)
);

-- جدول طلبات تعديل الحضور
CREATE TABLE IF NOT EXISTS attendance_correction_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    attendance_record_id UUID REFERENCES attendance_records_new(id),
    request_type TEXT NOT NULL, -- 'check_in', 'check_out', 'break_time', 'total_hours'
    current_value TEXT,
    requested_value TEXT NOT NULL,
    reason TEXT NOT NULL,
    supporting_documents JSONB DEFAULT '[]',
    status approval_status DEFAULT 'pending',
    manager_approval_by UUID,
    manager_approval_at TIMESTAMPTZ,
    manager_comments TEXT,
    hr_approval_by UUID,
    hr_approval_at TIMESTAMPTZ,
    hr_comments TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول طلبات العمل عن بُعد
CREATE TABLE IF NOT EXISTS remote_work_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    work_type work_type NOT NULL,
    reason TEXT NOT NULL,
    work_location TEXT,
    manager_contact TEXT,
    status approval_status DEFAULT 'pending',
    manager_approval_by UUID,
    manager_approval_at TIMESTAMPTZ,
    manager_comments TEXT,
    hr_approval_by UUID,
    hr_approval_at TIMESTAMPTZ,
    hr_comments TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول الساعات الإضافية
CREATE TABLE IF NOT EXISTS overtime_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    attendance_record_id UUID REFERENCES attendance_records_new(id),
    overtime_hours DECIMAL(4, 2) NOT NULL,
    overtime_start_time TIMESTAMPTZ,
    overtime_end_time TIMESTAMPTZ,
    reason TEXT,
    pre_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID,
    approved_at TIMESTAMPTZ,
    hourly_rate DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    payroll_processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول مخالفات وجزاءات الحضور
CREATE TABLE IF NOT EXISTS attendance_penalties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    attendance_record_id UUID REFERENCES attendance_records_new(id),
    violation_type TEXT NOT NULL, -- 'late_arrival', 'early_departure', 'absence', 'no_show'
    severity violation_severity DEFAULT 'minor',
    penalty_type penalty_type NOT NULL,
    penalty_amount DECIMAL(10, 2) DEFAULT 0,
    penalty_days INTEGER DEFAULT 0,
    auto_generated BOOLEAN DEFAULT TRUE,
    description TEXT,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    effective_date DATE,
    payroll_processed BOOLEAN DEFAULT FALSE,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول نقاط الحضور والمكافآت
CREATE TABLE IF NOT EXISTS attendance_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    attendance_record_id UUID REFERENCES attendance_records_new(id),
    points_earned INTEGER DEFAULT 0,
    points_deducted INTEGER DEFAULT 0,
    bonus_points INTEGER DEFAULT 0,
    reason TEXT,
    month_year DATE, -- أول يوم من الشهر
    accumulated_points INTEGER DEFAULT 0,
    reward_amount DECIMAL(10, 2) DEFAULT 0,
    reward_processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول تحليل سلوك الحضور بالذكاء الاصطناعي
CREATE TABLE IF NOT EXISTS attendance_behavior_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    analysis_period_start DATE,
    analysis_period_end DATE,
    punctuality_score DECIMAL(5, 2), -- من 0 إلى 100
    consistency_score DECIMAL(5, 2),
    reliability_score DECIMAL(5, 2),
    overall_behavior_score DECIMAL(5, 2),
    predicted_future_performance JSONB, -- توقعات الأداء المستقبلي
    risk_factors JSONB, -- عوامل الخطر
    recommendations JSONB, -- توصيات التحسين
    trend_analysis JSONB, -- تحليل الاتجاهات
    ai_insights TEXT,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول QR Codes للموظفين
CREATE TABLE IF NOT EXISTS employee_qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    qr_code_hash TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMPTZ,
    usage_count INTEGER DEFAULT 0,
    max_usage INTEGER DEFAULT 1000,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول إشعارات الحضور
CREATE TABLE IF NOT EXISTS attendance_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id),
    notification_type TEXT NOT NULL, -- 'late_warning', 'absence_alert', 'overtime_approval', etc.
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    is_read BOOLEAN DEFAULT FALSE,
    is_sent BOOLEAN DEFAULT FALSE,
    sent_via TEXT[], -- ['app', 'email', 'sms']
    scheduled_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول إعدادات سياسات الحضور
CREATE TABLE IF NOT EXISTS attendance_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES boud_companies(id),
    policy_name TEXT NOT NULL,
    policy_config JSONB NOT NULL DEFAULT '{
        "late_tolerance_minutes": 10,
        "early_leave_tolerance_minutes": 15,
        "max_late_arrivals_per_month": 3,
        "max_absences_per_month": 2,
        "overtime_requires_approval": true,
        "points_per_perfect_day": 10,
        "points_deduction_per_late_minute": 0.5,
        "penalty_amounts": {
            "late_10_30_minutes": 0.5,
            "late_30_60_minutes": 1.0,
            "late_over_60_minutes": 1.0,
            "absence_per_day": 1.0
        }
    }',
    is_active BOOLEAN DEFAULT TRUE,
    effective_from DATE DEFAULT CURRENT_DATE,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_attendance_records_employee_date ON attendance_records_new(employee_id, attendance_date);
CREATE INDEX IF NOT EXISTS idx_live_tracking_employee_timestamp ON employee_live_tracking(employee_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_attendance_penalties_employee ON attendance_penalties(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_points_employee_month ON attendance_points(employee_id, month_year);
CREATE INDEX IF NOT EXISTS idx_overtime_records_employee ON overtime_records(employee_id);

-- تفعيل RLS على الجداول الجديدة
ALTER TABLE attendance_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_live_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_correction_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE remote_work_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE overtime_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_penalties ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_behavior_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_policies ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان (RLS Policies)

-- المواقع المصرح بها
CREATE POLICY "Company users can view attendance locations" ON attendance_locations
    FOR SELECT USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage attendance locations" ON attendance_locations
    FOR ALL USING (
        boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
        boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    );

-- التتبع المباشر
CREATE POLICY "Employees can insert their own tracking data" ON employee_live_tracking
    FOR INSERT WITH CHECK (
        employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    );

CREATE POLICY "Employees can view their own tracking data" ON employee_live_tracking
    FOR SELECT USING (
        employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    );

CREATE POLICY "HR managers can view company tracking data" ON employee_live_tracking
    FOR SELECT USING (
        employee_id IN (
            SELECT e.id FROM boud_employees e 
            WHERE e.company_id = boud_get_user_company_id(auth.uid())
            AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
        )
    );

-- باقي السياسات للجداول الأخرى...
-- (سأضيف المزيد في الاستدعاءات التالية)

-- دوال مساعدة للنظام

-- دالة حساب النقاط التلقائية
CREATE OR REPLACE FUNCTION calculate_attendance_points(p_employee_id UUID, p_attendance_date DATE)
RETURNS INTEGER AS $$
DECLARE
    points INTEGER := 0;
    late_minutes INTEGER;
    early_leave_minutes INTEGER;
    is_perfect_attendance BOOLEAN;
BEGIN
    -- جلب بيانات الحضور
    SELECT 
        COALESCE(late_minutes, 0),
        COALESCE(early_leave_minutes, 0),
        (status = 'present' AND COALESCE(late_minutes, 0) = 0 AND COALESCE(early_leave_minutes, 0) = 0)
    INTO late_minutes, early_leave_minutes, is_perfect_attendance
    FROM attendance_records_new 
    WHERE employee_id = p_employee_id AND attendance_date = p_attendance_date;
    
    -- حساب النقاط
    IF is_perfect_attendance THEN
        points := 10; -- نقاط الحضور المثالي
    ELSE
        points := GREATEST(0, 5 - (late_minutes * 0.1) - (early_leave_minutes * 0.1));
    END IF;
    
    RETURN points;
END;
$$ LANGUAGE plpgsql;

-- دالة حساب الجزاءات التلقائية
CREATE OR REPLACE FUNCTION calculate_automatic_penalty(p_employee_id UUID, p_attendance_date DATE)
RETURNS DECIMAL AS $$
DECLARE
    penalty_amount DECIMAL := 0;
    late_minutes INTEGER;
    is_absent BOOLEAN;
    employee_salary DECIMAL;
    daily_salary DECIMAL;
BEGIN
    -- جلب راتب الموظف
    SELECT basic_salary INTO employee_salary 
    FROM boud_employees WHERE id = p_employee_id;
    
    daily_salary := employee_salary / 30;
    
    -- جلب بيانات الحضور
    SELECT 
        COALESCE(late_minutes, 0),
        (status = 'absent')
    INTO late_minutes, is_absent
    FROM attendance_records_new 
    WHERE employee_id = p_employee_id AND attendance_date = p_attendance_date;
    
    -- حساب الجزاءات حسب السياسة
    IF is_absent THEN
        penalty_amount := daily_salary; -- خصم يوم كامل للغياب
    ELSIF late_minutes > 60 THEN
        penalty_amount := daily_salary; -- خصم يوم كامل للتأخير أكثر من ساعة
    ELSIF late_minutes BETWEEN 30 AND 60 THEN
        penalty_amount := daily_salary; -- خصم يوم كامل
    ELSIF late_minutes BETWEEN 10 AND 29 THEN
        penalty_amount := daily_salary * 0.5; -- خصم نصف يوم
    END IF;
    
    RETURN penalty_amount;
END;
$$ LANGUAGE plpgsql;

-- إدراج البيانات التجريبية للاختبار
INSERT INTO attendance_locations (company_id, location_name, latitude, longitude, radius_meters, work_type) VALUES
((SELECT id FROM boud_companies LIMIT 1), 'المقر الرئيسي - الرياض', 24.7136, 46.6753, 100, 'office'),
((SELECT id FROM boud_companies LIMIT 1), 'فرع جدة', 21.3891, 39.8579, 150, 'office'),
((SELECT id FROM boud_companies LIMIT 1), 'العمل الميداني - الرياض', 24.7500, 46.7000, 500, 'flexible'),
((SELECT id FROM boud_companies LIMIT 1), 'العمل عن بُعد', 0, 0, 0, 'remote');

INSERT INTO work_shifts (company_id, shift_name, start_time, end_time, work_days) VALUES
((SELECT id FROM boud_companies LIMIT 1), 'الدوام الصباحي', '08:00', '17:00', ARRAY[1,2,3,4,5]),
((SELECT id FROM boud_companies LIMIT 1), 'الدوام المسائي', '14:00', '23:00', ARRAY[1,2,3,4,5]),
((SELECT id FROM boud_companies LIMIT 1), 'دوام نهاية الأسبوع', '09:00', '15:00', ARRAY[6,7]),
((SELECT id FROM boud_companies LIMIT 1), 'الدوام المرن', '06:00', '18:00', ARRAY[1,2,3,4,5]);

-- إدراج سياسة حضور افتراضية
INSERT INTO attendance_policies (company_id, policy_name) VALUES
((SELECT id FROM boud_companies LIMIT 1), 'سياسة الحضور الافتراضية');