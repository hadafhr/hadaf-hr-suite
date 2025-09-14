-- إصلاح نظام الحضور والانصراف الشامل

-- إنشاء الأنواع بشكل صحيح
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

-- جدول المواقع المصرح بها للحضور (Geofencing) - مع إصلاح نوع البيانات
DROP TABLE IF EXISTS attendance_locations CASCADE;
CREATE TABLE attendance_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES boud_companies(id),
    location_name TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    radius_meters INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT TRUE,
    work_type work_type DEFAULT 'office',
    allowed_methods TEXT[] DEFAULT ARRAY['gps', 'device'], -- تغيير إلى TEXT[] مؤقتاً
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول التتبع المباشر للموظفين الميدانيين
DROP TABLE IF EXISTS employee_live_tracking CASCADE;
CREATE TABLE employee_live_tracking (
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

-- جدول الجداول الزمنية والشفتات
DROP TABLE IF EXISTS work_shifts CASCADE;
CREATE TABLE work_shifts (
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
DROP TABLE IF EXISTS employee_schedules CASCADE;
CREATE TABLE employee_schedules (
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
DROP TABLE IF EXISTS attendance_correction_requests CASCADE;
CREATE TABLE attendance_correction_requests (
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

-- جدول الساعات الإضافية
DROP TABLE IF EXISTS overtime_records CASCADE;
CREATE TABLE overtime_records (
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

-- جدول نقاط الحضور والمكافآت
DROP TABLE IF EXISTS attendance_points CASCADE;
CREATE TABLE attendance_points (
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

-- تفعيل RLS
ALTER TABLE attendance_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_live_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_correction_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE overtime_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_points ENABLE ROW LEVEL SECURITY;

-- سياسات RLS أساسية
CREATE POLICY "Company users can view attendance locations" ON attendance_locations
    FOR SELECT USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage attendance locations" ON attendance_locations
    FOR ALL USING (
        boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
        boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    );

-- إدراج البيانات التجريبية
INSERT INTO attendance_locations (company_id, location_name, latitude, longitude, radius_meters, work_type) 
SELECT id, 'المقر الرئيسي - الرياض', 24.7136, 46.6753, 100, 'office'::work_type
FROM boud_companies LIMIT 1;

INSERT INTO attendance_locations (company_id, location_name, latitude, longitude, radius_meters, work_type) 
SELECT id, 'فرع جدة', 21.3891, 39.8579, 150, 'office'::work_type
FROM boud_companies LIMIT 1;

INSERT INTO work_shifts (company_id, shift_name, start_time, end_time, work_days) 
SELECT id, 'الدوام الصباحي', '08:00'::TIME, '17:00'::TIME, ARRAY[1,2,3,4,5]
FROM boud_companies LIMIT 1;

INSERT INTO work_shifts (company_id, shift_name, start_time, end_time, work_days) 
SELECT id, 'الدوام المسائي', '14:00'::TIME, '23:00'::TIME, ARRAY[1,2,3,4,5]
FROM boud_companies LIMIT 1;

-- إضافة الأعمدة الجديدة لجدول سجلات الحضور
ALTER TABLE attendance_records_new 
ADD COLUMN IF NOT EXISTS late_minutes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS early_leave_minutes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS break_duration_minutes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS overtime_approved BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS attendance_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS penalty_amount DECIMAL(10, 2) DEFAULT 0;