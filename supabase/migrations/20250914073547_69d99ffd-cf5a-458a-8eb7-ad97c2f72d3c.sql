-- إضافة سياسات RLS للجداول الجديدة لحل المشاكل الأمنية

-- سياسات التتبع المباشر
CREATE POLICY "Employees can insert their own live tracking" ON employee_live_tracking
    FOR INSERT WITH CHECK (
        employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    );

CREATE POLICY "Employees can view their own live tracking" ON employee_live_tracking
    FOR SELECT USING (
        employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    );

CREATE POLICY "HR can view company live tracking" ON employee_live_tracking
    FOR SELECT USING (
        employee_id IN (
            SELECT e.id FROM boud_employees e 
            WHERE e.company_id = boud_get_user_company_id(auth.uid())
            AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
        )
    );

-- سياسات الشفتات
CREATE POLICY "Company users can view work shifts" ON work_shifts
    FOR SELECT USING (company_id = boud_get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage work shifts" ON work_shifts
    FOR ALL USING (
        boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
        boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    );

-- سياسات جداول الموظفين
CREATE POLICY "Employees can view their own schedules" ON employee_schedules
    FOR SELECT USING (
        employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    );

CREATE POLICY "HR managers can manage employee schedules" ON employee_schedules
    FOR ALL USING (
        employee_id IN (
            SELECT e.id FROM boud_employees e 
            WHERE e.company_id = boud_get_user_company_id(auth.uid())
            AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
        )
    );

-- سياسات طلبات تعديل الحضور
CREATE POLICY "Employees can manage their own correction requests" ON attendance_correction_requests
    FOR ALL USING (
        employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    );

CREATE POLICY "HR can manage company correction requests" ON attendance_correction_requests
    FOR ALL USING (
        employee_id IN (
            SELECT e.id FROM boud_employees e 
            WHERE e.company_id = boud_get_user_company_id(auth.uid())
            AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
        )
    );

-- سياسات الساعات الإضافية
CREATE POLICY "Employees can view their own overtime records" ON overtime_records
    FOR SELECT USING (
        employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    );

CREATE POLICY "HR managers can manage overtime records" ON overtime_records
    FOR ALL USING (
        employee_id IN (
            SELECT e.id FROM boud_employees e 
            WHERE e.company_id = boud_get_user_company_id(auth.uid())
            AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
        )
    );

-- سياسات نقاط الحضور
CREATE POLICY "Employees can view their own attendance points" ON attendance_points
    FOR SELECT USING (
        employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid())
    );

CREATE POLICY "HR managers can manage attendance points" ON attendance_points
    FOR ALL USING (
        employee_id IN (
            SELECT e.id FROM boud_employees e 
            WHERE e.company_id = boud_get_user_company_id(auth.uid())
            AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
        )
    );

-- إدراج البيانات التجريبية الشاملة
-- إدراج جداول أسبوعية لعدة موظفين
WITH employee_data AS (
    SELECT 
        id as employee_id,
        ROW_NUMBER() OVER (ORDER BY id) as emp_num
    FROM boud_employees 
    WHERE is_active = true 
    LIMIT 5
),
shift_data AS (
    SELECT id as shift_id FROM work_shifts LIMIT 1
)
INSERT INTO employee_schedules (employee_id, shift_id, work_date, planned_start, planned_end, work_type, status)
SELECT 
    ed.employee_id,
    sd.shift_id,
    CURRENT_DATE + (generate_series(0, 30) * interval '1 day'),
    '08:00'::TIME,
    '17:00'::TIME,
    CASE 
        WHEN ed.emp_num = 1 THEN 'office'::work_type
        WHEN ed.emp_num = 2 THEN 'remote'::work_type
        WHEN ed.emp_num = 3 THEN 'hybrid'::work_type
        ELSE 'office'::work_type
    END,
    'approved'::approval_status
FROM employee_data ed, shift_data sd
ON CONFLICT (employee_id, work_date) DO NOTHING;

-- إدراج نقاط حضور تجريبية
WITH employee_data AS (
    SELECT id as employee_id FROM boud_employees WHERE is_active = true LIMIT 5
)
INSERT INTO attendance_points (employee_id, points_earned, points_deducted, month_year, accumulated_points, reason)
SELECT 
    employee_id,
    (5 + random() * 10)::INTEGER,
    (random() * 3)::INTEGER,
    DATE_TRUNC('month', CURRENT_DATE),
    (50 + random() * 100)::INTEGER,
    'نقاط الحضور الشهرية'
FROM employee_data;

-- إدراج بيانات ساعات إضافية تجريبية
WITH overtime_data AS (
    SELECT 
        ar.id as attendance_record_id,
        ar.employee_id,
        ar.attendance_date
    FROM attendance_records_new ar
    WHERE ar.attendance_date >= CURRENT_DATE - INTERVAL '30 days'
    AND random() < 0.3 -- 30% احتمالية وجود ساعات إضافية
    LIMIT 10
)
INSERT INTO overtime_records (employee_id, attendance_record_id, overtime_hours, reason, pre_approved, hourly_rate, total_amount)
SELECT 
    employee_id,
    attendance_record_id,
    (1 + random() * 4)::DECIMAL(4,2), -- من 1 إلى 5 ساعات
    'ساعات إضافية لإنهاء المشاريع العاجلة',
    random() < 0.7, -- 70% مُعتمدة مسبقاً
    50.00, -- 50 ريال للساعة
    ((1 + random() * 4) * 50)::DECIMAL(10,2)
FROM overtime_data;