-- تطوير نظام الحضور والانصراف الشامل - الجزء الثاني

-- إنشاء أنواع البيانات الجديدة (تجاهل الموجود منها)
DO $$ BEGIN
    CREATE TYPE device_type AS ENUM ('fingerprint', 'face_recognition', 'rfid', 'mobile_gps', 'qr_code', 'camera_wall');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE check_method AS ENUM ('device', 'gps', 'qr_code', 'manual', 'face_id', 'remote');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE penalty_type AS ENUM ('warning', 'salary_deduction', 'suspension', 'termination');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE work_type AS ENUM ('office', 'remote', 'hybrid', 'flexible');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- تحديث جدول أجهزة الحضور
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
    break_duration INTEGER DEFAULT 60,
    work_days INTEGER[] DEFAULT ARRAY[1,2,3,4,5],
    is_flexible BOOLEAN DEFAULT FALSE,
    max_late_minutes INTEGER DEFAULT 15,
    overtime_threshold_minutes INTEGER DEFAULT 480,
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
    request_type TEXT NOT NULL,
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
    violation_type TEXT NOT NULL,
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
    month_year DATE,
    accumulated_points INTEGER DEFAULT 0,
    reward_amount DECIMAL(10, 2) DEFAULT 0,
    reward_processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- إدراج البيانات التجريبية للاختبار
INSERT INTO attendance_locations (company_id, location_name, latitude, longitude, radius_meters, work_type) 
SELECT id, 'المقر الرئيسي - الرياض', 24.7136, 46.6753, 100, 'office'
FROM boud_companies LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO attendance_locations (company_id, location_name, latitude, longitude, radius_meters, work_type) 
SELECT id, 'فرع جدة', 21.3891, 39.8579, 150, 'office'
FROM boud_companies LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO work_shifts (company_id, shift_name, start_time, end_time, work_days) 
SELECT id, 'الدوام الصباحي', '08:00', '17:00', ARRAY[1,2,3,4,5]
FROM boud_companies LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO work_shifts (company_id, shift_name, start_time, end_time, work_days) 
SELECT id, 'الدوام المسائي', '14:00', '23:00', ARRAY[1,2,3,4,5]
FROM boud_companies LIMIT 1
ON CONFLICT DO NOTHING;

-- إدراج بيانات تجريبية للحضور مع التنوع
INSERT INTO attendance_records_new (
    employee_id, attendance_date, check_in_time, check_out_time, 
    status, check_method, work_type, late_minutes, attendance_points
)
SELECT 
    e.id,
    CURRENT_DATE - INTERVAL '1 day' * (generate_series(0, 30)),
    '08:00:00'::TIME + (random() * INTERVAL '2 hours'),
    '17:00:00'::TIME + (random() * INTERVAL '2 hours'),
    CASE 
        WHEN random() < 0.7 THEN 'present'::attendance_status
        WHEN random() < 0.9 THEN 'late'::attendance_status
        ELSE 'absent'::attendance_status
    END,
    CASE 
        WHEN random() < 0.4 THEN 'device'::check_method
        WHEN random() < 0.7 THEN 'gps'::check_method
        WHEN random() < 0.9 THEN 'qr_code'::check_method
        ELSE 'manual'::check_method
    END,
    CASE 
        WHEN random() < 0.8 THEN 'office'::work_type
        WHEN random() < 0.9 THEN 'remote'::work_type
        ELSE 'hybrid'::work_type
    END,
    (random() * 60)::INTEGER,
    (5 + random() * 10)::INTEGER
FROM boud_employees e
WHERE e.is_active = true
LIMIT 5
ON CONFLICT DO NOTHING;