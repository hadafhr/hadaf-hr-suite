-- إصلاح مشاكل الأمان وإضافة RLS policies

-- تفعيل RLS على الجداول الجديدة
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_locations ENABLE ROW LEVEL SECURITY;

-- إصلاح دالة التحديث بإضافة search_path
CREATE OR REPLACE FUNCTION update_attendance_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- إصلاح دالة حساب المخالفات بإضافة search_path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- إنشاء RLS policies للشفتات
CREATE POLICY "Company users can view shifts" ON shifts
    FOR SELECT USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage shifts" ON shifts
    FOR ALL USING (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role));

-- إنشاء RLS policies للجداول المجدولة
CREATE POLICY "Employees can view their schedules" ON employee_schedules
    FOR SELECT USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "HR managers can manage schedules" ON employee_schedules
    FOR ALL USING (employee_id IN (
        SELECT e.id FROM boud_employees e 
        WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
        AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
    ));

CREATE POLICY "Employees can create their schedules" ON employee_schedules
    FOR INSERT WITH CHECK (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

-- إنشاء RLS policies للأجهزة
CREATE POLICY "Company users can view devices" ON attendance_devices
    FOR SELECT USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage devices" ON attendance_devices
    FOR ALL USING (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role));

-- إنشاء RLS policies لسجلات الأجهزة
CREATE POLICY "HR can view device logs" ON device_attendance_logs
    FOR SELECT USING (
        device_id IN (
            SELECT d.id FROM attendance_devices d 
            WHERE boud_has_role(auth.uid(), d.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), d.company_id, 'hr_manager'::user_role)
        )
    );

CREATE POLICY "System can create device logs" ON device_attendance_logs
    FOR INSERT WITH CHECK (true);

-- إنشاء RLS policies لسجلات الحضور
CREATE POLICY "Employees can view their attendance" ON employee_attendance_records
    FOR SELECT USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "Employees can create their attendance" ON employee_attendance_records
    FOR INSERT WITH CHECK (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "HR managers can manage attendance records" ON employee_attendance_records
    FOR ALL USING (employee_id IN (
        SELECT e.id FROM boud_employees e 
        WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
        AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
    ));

-- إنشاء RLS policies للمخالفات
CREATE POLICY "Employees can view their violations" ON attendance_violations
    FOR SELECT USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "HR managers can manage violations" ON attendance_violations
    FOR ALL USING (employee_id IN (
        SELECT e.id FROM boud_employees e 
        WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
        AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
    ));

-- إنشاء RLS policies لمواقع العمل
CREATE POLICY "Company users can view work locations" ON work_locations
    FOR SELECT USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage work locations" ON work_locations
    FOR ALL USING (boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role));