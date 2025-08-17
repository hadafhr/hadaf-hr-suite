-- إنشاء enum لأنواع الدوام
CREATE TYPE work_schedule_type AS ENUM ('full_time', 'remote', 'part_time', 'hybrid');

-- إنشاء enum لحالة الحضور
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'early_leave', 'remote_work', 'sick_leave', 'vacation');

-- إنشاء enum لأيام الأسبوع
CREATE TYPE day_of_week AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

-- جدول إعدادات الحضور العامة
CREATE TABLE public.attendance_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID,
    work_days day_of_week[] NOT NULL DEFAULT '{sunday,monday,tuesday,wednesday,thursday}'::day_of_week[],
    default_start_time TIME NOT NULL DEFAULT '08:00:00',
    default_end_time TIME NOT NULL DEFAULT '17:00:00',
    break_duration INTEGER NOT NULL DEFAULT 60, -- بالدقائق
    late_threshold_minutes INTEGER NOT NULL DEFAULT 15,
    early_leave_threshold_minutes INTEGER NOT NULL DEFAULT 15,
    allow_remote_work BOOLEAN NOT NULL DEFAULT true,
    require_location_check BOOLEAN NOT NULL DEFAULT false,
    auto_clock_out BOOLEAN NOT NULL DEFAULT false,
    auto_clock_out_time TIME DEFAULT '18:00:00',
    overtime_threshold_hours DECIMAL(4,2) DEFAULT 8.00,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إعداد RLS
ALTER TABLE public.attendance_settings ENABLE ROW LEVEL SECURITY;

-- جدول جداول العمل والشفتات
CREATE TABLE public.work_schedules (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID,
    name TEXT NOT NULL,
    schedule_type work_schedule_type NOT NULL DEFAULT 'full_time',
    description TEXT,
    work_days day_of_week[] NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_start_time TIME,
    break_end_time TIME,
    total_hours_per_day DECIMAL(4,2) NOT NULL,
    total_hours_per_week DECIMAL(5,2) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إعداد RLS
ALTER TABLE public.work_schedules ENABLE ROW LEVEL SECURITY;

-- جدول ربط الموظفين بجداول العمل
CREATE TABLE public.employee_work_schedules (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL,
    schedule_id UUID NOT NULL REFERENCES public.work_schedules(id) ON DELETE CASCADE,
    effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إعداد RLS
ALTER TABLE public.employee_work_schedules ENABLE ROW LEVEL SECURITY;

-- جدول سجل الحضور اليومي
CREATE TABLE public.attendance_records (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL,
    attendance_date DATE NOT NULL DEFAULT CURRENT_DATE,
    schedule_id UUID REFERENCES public.work_schedules(id),
    clock_in_time TIMESTAMP WITH TIME ZONE,
    clock_out_time TIMESTAMP WITH TIME ZONE,
    break_start_time TIMESTAMP WITH TIME ZONE,
    break_end_time TIMESTAMP WITH TIME ZONE,
    total_hours DECIMAL(4,2),
    overtime_hours DECIMAL(4,2) DEFAULT 0,
    status attendance_status NOT NULL DEFAULT 'present',
    is_remote BOOLEAN NOT NULL DEFAULT false,
    location_check_in TEXT, -- إحداثيات الموقع عند الدخول
    location_check_out TEXT, -- إحداثيات الموقع عند الخروج
    notes TEXT,
    approved_by UUID,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    -- فهرس مركب لضمان عدم تكرار السجل لنفس الموظف في نفس اليوم
    UNIQUE(employee_id, attendance_date)
);

-- إعداد RLS
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- جدول طلبات تعديل الحضور
CREATE TABLE public.attendance_corrections (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL,
    attendance_record_id UUID NOT NULL REFERENCES public.attendance_records(id) ON DELETE CASCADE,
    correction_type TEXT NOT NULL, -- 'clock_in', 'clock_out', 'status', 'full_day'
    requested_value TEXT NOT NULL, -- القيمة المطلوب تصحيحها
    current_value TEXT, -- القيمة الحالية
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    reviewed_by UUID,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إعداد RLS
ALTER TABLE public.attendance_corrections ENABLE ROW LEVEL SECURITY;

-- جدول إعدادات الإجازات والأعياد
CREATE TABLE public.company_holidays (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID,
    name TEXT NOT NULL,
    holiday_date DATE NOT NULL,
    is_recurring BOOLEAN NOT NULL DEFAULT false, -- للأعياد التي تتكرر سنوياً
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إعداد RLS
ALTER TABLE public.company_holidays ENABLE ROW LEVEL SECURITY;

-- إنشاء فهارس للأداء
CREATE INDEX idx_attendance_records_employee_date ON public.attendance_records(employee_id, attendance_date);
CREATE INDEX idx_attendance_records_date ON public.attendance_records(attendance_date);
CREATE INDEX idx_work_schedules_company ON public.work_schedules(company_id);
CREATE INDEX idx_employee_work_schedules_employee ON public.employee_work_schedules(employee_id);
CREATE INDEX idx_attendance_settings_company ON public.attendance_settings(company_id);

-- إنشاء trigger لتحديث updated_at
CREATE TRIGGER update_attendance_settings_updated_at
    BEFORE UPDATE ON public.attendance_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_work_schedules_updated_at
    BEFORE UPDATE ON public.work_schedules
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employee_work_schedules_updated_at
    BEFORE UPDATE ON public.employee_work_schedules
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_attendance_records_updated_at
    BEFORE UPDATE ON public.attendance_records
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_attendance_corrections_updated_at
    BEFORE UPDATE ON public.attendance_corrections
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_holidays_updated_at
    BEFORE UPDATE ON public.company_holidays
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- إدراج بيانات تجريبية لإعدادات الحضور
INSERT INTO public.attendance_settings (
    company_id,
    work_days,
    default_start_time,
    default_end_time,
    break_duration,
    late_threshold_minutes,
    early_leave_threshold_minutes,
    allow_remote_work,
    require_location_check,
    auto_clock_out,
    auto_clock_out_time,
    overtime_threshold_hours
) VALUES (
    gen_random_uuid(),
    '{sunday,monday,tuesday,wednesday,thursday}'::day_of_week[],
    '08:00:00',
    '17:00:00',
    60,
    15,
    15,
    true,
    false,
    true,
    '18:00:00',
    8.00
);

-- إدراج جداول عمل تجريبية
INSERT INTO public.work_schedules (
    company_id,
    name,
    schedule_type,
    description,
    work_days,
    start_time,
    end_time,
    break_start_time,
    break_end_time,
    total_hours_per_day,
    total_hours_per_week
) VALUES 
(
    (SELECT company_id FROM public.attendance_settings LIMIT 1),
    'الدوام الكامل - الصباحي',
    'full_time',
    'دوام كامل من 8 صباحاً إلى 5 مساءً',
    '{sunday,monday,tuesday,wednesday,thursday}'::day_of_week[],
    '08:00:00',
    '17:00:00',
    '12:00:00',
    '13:00:00',
    8.00,
    40.00
),
(
    (SELECT company_id FROM public.attendance_settings LIMIT 1),
    'الدوام عن بُعد',
    'remote',
    'دوام كامل من المنزل مع مرونة في الأوقات',
    '{sunday,monday,tuesday,wednesday,thursday}'::day_of_week[],
    '09:00:00',
    '18:00:00',
    '13:00:00',
    '14:00:00',
    8.00,
    40.00
),
(
    (SELECT company_id FROM public.attendance_settings LIMIT 1),
    'الدوام الجزئي - الصباحي',
    'part_time',
    'دوام جزئي 4 ساعات صباحاً',
    '{sunday,monday,tuesday,wednesday,thursday}'::day_of_week[],
    '08:00:00',
    '12:00:00',
    NULL,
    NULL,
    4.00,
    20.00
),
(
    (SELECT company_id FROM public.attendance_settings LIMIT 1),
    'الدوام المختلط',
    'hybrid',
    'دوام مختلط - 3 أيام في المكتب، يومين عن بُعد',
    '{sunday,monday,tuesday,wednesday,thursday}'::day_of_week[],
    '08:30:00',
    '17:30:00',
    '12:30:00',
    '13:30:00',
    8.00,
    40.00
),
(
    (SELECT company_id FROM public.attendance_settings LIMIT 1),
    'الشفت المسائي',
    'full_time',
    'دوام مسائي من 2 ظهراً إلى 10 مساءً',
    '{sunday,monday,tuesday,wednesday,thursday}'::day_of_week[],
    '14:00:00',
    '22:00:00',
    '18:00:00',
    '19:00:00',
    7.00,
    35.00
);

-- إدراج أعياد تجريبية
INSERT INTO public.company_holidays (
    company_id,
    name,
    holiday_date,
    is_recurring
) VALUES 
(
    (SELECT company_id FROM public.attendance_settings LIMIT 1),
    'عيد الفطر',
    '2024-04-10',
    true
),
(
    (SELECT company_id FROM public.attendance_settings LIMIT 1),
    'عيد الأضحى',
    '2024-06-16',
    true
),
(
    (SELECT company_id FROM public.attendance_settings LIMIT 1),
    'اليوم الوطني',
    '2024-09-23',
    true
),
(
    (SELECT company_id FROM public.attendance_settings LIMIT 1),
    'يوم التأسيس',
    '2024-02-22',
    true
);

-- إدراج سجلات حضور تجريبية
INSERT INTO public.attendance_records (
    employee_id,
    attendance_date,
    schedule_id,
    clock_in_time,
    clock_out_time,
    total_hours,
    overtime_hours,
    status,
    is_remote
) VALUES 
(
    gen_random_uuid(),
    CURRENT_DATE,
    (SELECT id FROM public.work_schedules WHERE name = 'الدوام الكامل - الصباحي' LIMIT 1),
    CURRENT_DATE + INTERVAL '8 hours',
    CURRENT_DATE + INTERVAL '17 hours',
    8.00,
    0.00,
    'present',
    false
),
(
    gen_random_uuid(),
    CURRENT_DATE - INTERVAL '1 day',
    (SELECT id FROM public.work_schedules WHERE name = 'الدوام عن بُعد' LIMIT 1),
    CURRENT_DATE - INTERVAL '1 day' + INTERVAL '9 hours',
    CURRENT_DATE - INTERVAL '1 day' + INTERVAL '18 hours',
    8.00,
    0.00,
    'present',
    true
),
(
    gen_random_uuid(),
    CURRENT_DATE - INTERVAL '2 days',
    (SELECT id FROM public.work_schedules WHERE name = 'الدوام الجزئي - الصباحي' LIMIT 1),
    CURRENT_DATE - INTERVAL '2 days' + INTERVAL '8 hours 15 minutes',
    CURRENT_DATE - INTERVAL '2 days' + INTERVAL '12 hours 15 minutes',
    4.00,
    0.00,
    'late',
    false
);

-- RLS Policies
-- سياسات الأمان لجدول إعدادات الحضور
CREATE POLICY "Users can view attendance settings for their company" ON public.attendance_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage attendance settings" ON public.attendance_settings
    FOR ALL USING (true);

-- سياسات الأمان لجدول جداول العمل
CREATE POLICY "Users can view work schedules for their company" ON public.work_schedules
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage work schedules" ON public.work_schedules
    FOR ALL USING (true);

-- سياسات الأمان لجدول ربط الموظفين بجداول العمل
CREATE POLICY "Users can view employee work schedules" ON public.employee_work_schedules
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage employee work schedules" ON public.employee_work_schedules
    FOR ALL USING (true);

-- سياسات الأمان لجدول سجل الحضور
CREATE POLICY "Users can view attendance records" ON public.attendance_records
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own attendance records" ON public.attendance_records
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all attendance records" ON public.attendance_records
    FOR ALL USING (true);

-- سياسات الأمان لجدول طلبات تعديل الحضور
CREATE POLICY "Users can view attendance corrections" ON public.attendance_corrections
    FOR SELECT USING (true);

CREATE POLICY "Users can create attendance corrections" ON public.attendance_corrections
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage attendance corrections" ON public.attendance_corrections
    FOR ALL USING (true);

-- سياسات الأمان لجدول الأعياد
CREATE POLICY "Users can view company holidays" ON public.company_holidays
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage company holidays" ON public.company_holidays
    FOR ALL USING (true);