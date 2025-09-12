-- إنشاء جداول نظام الحضور والانصراف الذكي

-- جدول الشفتات والدوامات
CREATE TABLE IF NOT EXISTS shifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES boud_companies(id) ON DELETE CASCADE,
    shift_name TEXT NOT NULL,
    shift_name_ar TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_duration INTEGER DEFAULT 60, -- بالدقائق
    is_flexible BOOLEAN DEFAULT false,
    late_threshold_minutes INTEGER DEFAULT 15,
    early_leave_threshold_minutes INTEGER DEFAULT 15,
    overtime_threshold_minutes INTEGER DEFAULT 30,
    work_days INTEGER[] DEFAULT '{1,2,3,4,5}', -- أيام الأسبوع (0=أحد, 1=إثنين...)
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول الجداول المجدولة للموظفين
CREATE TABLE IF NOT EXISTS employee_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id) ON DELETE CASCADE,
    shift_id UUID REFERENCES shifts(id) ON DELETE CASCADE,
    work_date DATE NOT NULL,
    planned_start TIME NOT NULL,
    planned_end TIME NOT NULL,
    work_type TEXT DEFAULT 'office' CHECK (work_type IN ('office', 'remote', 'hybrid', 'flexible')),
    work_location TEXT,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'holiday', 'leave', 'sick')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, work_date)
);

-- جدول الأجهزة (بصمة، وجه، RFID)
CREATE TABLE IF NOT EXISTS attendance_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES boud_companies(id) ON DELETE CASCADE,
    device_code TEXT NOT NULL UNIQUE,
    device_name TEXT NOT NULL,
    device_type TEXT NOT NULL CHECK (device_type IN ('fingerprint', 'face_recognition', 'rfid', 'mobile_gps')),
    location TEXT NOT NULL,
    ip_address INET,
    port INTEGER,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT true,
    last_sync_at TIMESTAMPTZ,
    status TEXT DEFAULT 'online' CHECK (status IN ('online', 'offline', 'maintenance', 'error')),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول سجلات الأجهزة
CREATE TABLE IF NOT EXISTS device_attendance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID REFERENCES attendance_devices(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES boud_employees(id) ON DELETE SET NULL,
    employee_code TEXT, -- في حال عدم التطابق مع الموظف
    log_time TIMESTAMPTZ NOT NULL,
    action_type TEXT NOT NULL CHECK (action_type IN ('check_in', 'check_out', 'break_start', 'break_end')),
    verification_method TEXT CHECK (verification_method IN ('fingerprint', 'face', 'rfid', 'pin')),
    is_successful BOOLEAN DEFAULT true,
    confidence_score DECIMAL(5,2), -- للتحقق البيومتري
    raw_data JSONB,
    processed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- تحديث جدول سجلات الحضور الحالي
CREATE TABLE IF NOT EXISTS employee_attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    schedule_id UUID REFERENCES employee_schedules(id),
    device_id UUID REFERENCES attendance_devices(id),
    
    -- أوقات الحضور والانصراف
    check_in_time TIMESTAMPTZ,
    check_out_time TIMESTAMPTZ,
    break_start_time TIMESTAMPTZ,
    break_end_time TIMESTAMPTZ,
    
    -- المواقع GPS
    check_in_location JSONB, -- {lat, lng, address, accuracy}
    check_out_location JSONB,
    
    -- الحسابات
    total_hours DECIMAL(5,2),
    break_hours DECIMAL(5,2) DEFAULT 0,
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    late_minutes INTEGER DEFAULT 0,
    early_leave_minutes INTEGER DEFAULT 0,
    
    -- الحالة والمصدر
    status attendance_status DEFAULT 'present',
    source_type TEXT CHECK (source_type IN ('device', 'gps', 'manual', 'system')),
    is_remote BOOLEAN DEFAULT false,
    
    -- الموافقات
    approved_by UUID,
    approved_at TIMESTAMPTZ,
    
    -- ملاحظات وبيانات إضافية
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(employee_id, attendance_date)
);

-- جدول المخالفات
CREATE TABLE IF NOT EXISTS attendance_violations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES boud_employees(id) ON DELETE CASCADE,
    attendance_record_id UUID REFERENCES employee_attendance_records(id) ON DELETE CASCADE,
    violation_date DATE NOT NULL,
    violation_type TEXT NOT NULL CHECK (violation_type IN ('late_arrival', 'early_departure', 'absence', 'missing_checkout', 'location_violation', 'device_malfunction')),
    severity TEXT DEFAULT 'minor' CHECK (severity IN ('minor', 'moderate', 'major', 'critical')),
    duration_minutes INTEGER,
    penalty_amount DECIMAL(10,2) DEFAULT 0,
    auto_generated BOOLEAN DEFAULT true,
    reviewed BOOLEAN DEFAULT false,
    reviewed_by UUID,
    reviewed_at TIMESTAMPTZ,
    action_taken TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول مواقع العمل المسموحة
CREATE TABLE IF NOT EXISTS work_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES boud_companies(id) ON DELETE CASCADE,
    location_name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    radius_meters INTEGER DEFAULT 100, -- نطاق السماح بالمتر
    is_active BOOLEAN DEFAULT true,
    work_hours JSONB, -- {start: "08:00", end: "17:00"}
    allowed_departments TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_attendance_records_employee_date ON employee_attendance_records(employee_id, attendance_date);
CREATE INDEX IF NOT EXISTS idx_attendance_records_date ON employee_attendance_records(attendance_date);
CREATE INDEX IF NOT EXISTS idx_device_logs_device_time ON device_attendance_logs(device_id, log_time);
CREATE INDEX IF NOT EXISTS idx_violations_employee_date ON attendance_violations(employee_id, violation_date);
CREATE INDEX IF NOT EXISTS idx_schedules_employee_date ON employee_schedules(employee_id, work_date);

-- إضافة تشغيل الـ triggers للتحديث التلقائي
CREATE OR REPLACE FUNCTION update_attendance_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_shifts_updated_at BEFORE UPDATE ON shifts FOR EACH ROW EXECUTE FUNCTION update_attendance_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON employee_schedules FOR EACH ROW EXECUTE FUNCTION update_attendance_updated_at_column();
CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON attendance_devices FOR EACH ROW EXECUTE FUNCTION update_attendance_updated_at_column();
CREATE TRIGGER update_records_updated_at BEFORE UPDATE ON employee_attendance_records FOR EACH ROW EXECUTE FUNCTION update_attendance_updated_at_column();
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON work_locations FOR EACH ROW EXECUTE FUNCTION update_attendance_updated_at_column();

-- إنشاء دالة لحساب المخالفات تلقائياً
CREATE OR REPLACE FUNCTION calculate_attendance_violations()
RETURNS TRIGGER AS $$
BEGIN
    -- حساب التأخير
    IF NEW.late_minutes > 0 THEN
        INSERT INTO attendance_violations (
            employee_id, attendance_record_id, violation_date, 
            violation_type, duration_minutes, severity
        ) VALUES (
            NEW.employee_id, NEW.id, NEW.attendance_date,
            'late_arrival', NEW.late_minutes,
            CASE 
                WHEN NEW.late_minutes > 60 THEN 'major'
                WHEN NEW.late_minutes > 30 THEN 'moderate'
                ELSE 'minor'
            END
        ) ON CONFLICT DO NOTHING;
    END IF;
    
    -- حساب الخروج المبكر
    IF NEW.early_leave_minutes > 0 THEN
        INSERT INTO attendance_violations (
            employee_id, attendance_record_id, violation_date, 
            violation_type, duration_minutes, severity
        ) VALUES (
            NEW.employee_id, NEW.id, NEW.attendance_date,
            'early_departure', NEW.early_leave_minutes,
            CASE 
                WHEN NEW.early_leave_minutes > 60 THEN 'major'
                WHEN NEW.early_leave_minutes > 30 THEN 'moderate'
                ELSE 'minor'
            END
        ) ON CONFLICT DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER attendance_violation_trigger 
    AFTER INSERT OR UPDATE ON employee_attendance_records 
    FOR EACH ROW EXECUTE FUNCTION calculate_attendance_violations();

-- إدراج بيانات تجريبية للشفتات
INSERT INTO shifts (company_id, shift_name, shift_name_ar, start_time, end_time, break_duration) VALUES
    ((SELECT id FROM boud_companies LIMIT 1), 'Morning Shift', 'الدوام الصباحي', '08:00', '17:00', 60),
    ((SELECT id FROM boud_companies LIMIT 1), 'Evening Shift', 'الدوام المسائي', '14:00', '23:00', 60),
    ((SELECT id FROM boud_companies LIMIT 1), 'Flexible Shift', 'الدوام المرن', '09:00', '18:00', 60)
ON CONFLICT DO NOTHING;

-- إدراج مواقع العمل التجريبية
INSERT INTO work_locations (company_id, location_name, address, latitude, longitude, radius_meters) VALUES
    ((SELECT id FROM boud_companies LIMIT 1), 'المقر الرئيسي', 'الرياض - حي العليا', 24.6877, 46.7219, 100),
    ((SELECT id FROM boud_companies LIMIT 1), 'فرع جدة', 'جدة - حي الزهراء', 21.4858, 39.1925, 150),
    ((SELECT id FROM boud_companies LIMIT 1), 'فرع الدمام', 'الدمام - حي الفيصلية', 26.4207, 50.0888, 200)
ON CONFLICT DO NOTHING;

-- إدراج أجهزة تجريبية
INSERT INTO attendance_devices (company_id, device_code, device_name, device_type, location, latitude, longitude) VALUES
    ((SELECT id FROM boud_companies LIMIT 1), 'FP001', 'جهاز البصمة - المدخل الرئيسي', 'fingerprint', 'المدخل الرئيسي - الطابق الأرضي', 24.6877, 46.7219),
    ((SELECT id FROM boud_companies LIMIT 1), 'FR001', 'جهاز التعرف على الوجه - قسم الموظفين', 'face_recognition', 'قسم الموارد البشرية - الطابق الثاني', 24.6878, 46.7220),
    ((SELECT id FROM boud_companies LIMIT 1), 'RFID001', 'بطاقة RFID - المكاتب التنفيذية', 'rfid', 'المكاتب التنفيذية - الطابق الثالث', 24.6879, 46.7221)
ON CONFLICT DO NOTHING;