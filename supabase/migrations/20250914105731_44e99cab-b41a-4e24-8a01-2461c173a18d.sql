-- إضافة بيانات تجريبية لسجلات الحضور والانصراف
INSERT INTO boud_attendance (
  employee_id, 
  attendance_date, 
  check_in_time, 
  check_out_time, 
  work_hours, 
  late_minutes, 
  overtime_hours, 
  status, 
  location, 
  notes
) VALUES 
-- سجلات الأسبوع الحالي
('22222222-2222-2222-2222-222222222222', CURRENT_DATE, '08:00:00'::time, '17:00:00'::time, 8.0, 0, 0, 'present', 'المكتب الرئيسي', 'حضور منتظم'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 1, '08:15:00'::time, '17:30:00'::time, 8.25, 15, 0.5, 'present', 'المكتب الرئيسي', 'تأخير 15 دقيقة'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 2, '07:45:00'::time, '16:45:00'::time, 8.0, 0, 0, 'present', 'العمل عن بُعد', 'عمل من المنزل'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 3, '08:00:00'::time, '18:00:00'::time, 9.0, 0, 1.0, 'present', 'المكتب الرئيسي', 'ساعة إضافية'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 4, NULL, NULL, 0, 0, 0, 'absent', NULL, 'إجازة مرضية'),
-- سجلات الأسبوع الماضي
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 7, '08:30:00'::time, '17:15:00'::time, 7.75, 30, 0, 'present', 'المكتب الرئيسي', 'تأخير 30 دقيقة، انصراف مبكر'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 8, '08:00:00'::time, '17:00:00'::time, 8.0, 0, 0, 'present', 'المكتب الرئيسي', 'حضور منتظم'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 9, '07:50:00'::time, '17:00:00'::time, 8.17, 0, 0, 'present', 'المكتب الرئيسي', 'حضور مبكر'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 10, '08:00:00'::time, '17:00:00'::time, 8.0, 0, 0, 'present', 'العمل عن بُعد', 'عمل من المنزل'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 11, '08:00:00'::time, '19:00:00'::time, 10.0, 0, 2.0, 'present', 'المكتب الرئيسي', 'ساعتان إضافيتان');

-- إضافة طلبات الإجازات
INSERT INTO boud_leave_requests (
  employee_id,
  leave_type,
  start_date,
  end_date,
  total_days,
  reason,
  status,
  applied_date
) VALUES 
('22222222-2222-2222-2222-222222222222', 'annual', CURRENT_DATE + 15, CURRENT_DATE + 19, 5, 'إجازة سنوية للسفر مع العائلة', 'pending', CURRENT_DATE),
('22222222-2222-2222-2222-222222222222', 'sick', CURRENT_DATE - 4, CURRENT_DATE - 4, 1, 'إجازة مرضية - نزلة برد', 'approved', CURRENT_DATE - 5),
('22222222-2222-2222-2222-222222222222', 'annual', CURRENT_DATE - 30, CURRENT_DATE - 25, 6, 'إجازة سنوية - عيد الأضحى', 'approved', CURRENT_DATE - 35),
('22222222-2222-2222-2222-222222222222', 'emergency', CURRENT_DATE + 7, CURRENT_DATE + 7, 1, 'ظروف عائلية طارئة', 'pending', CURRENT_DATE - 1);

-- إضافة عناصر كشف الراتب (آخر 3 أشهر)
INSERT INTO boud_payroll_items (
  employee_id,
  payroll_run_id,
  basic_salary,
  housing_allowance,
  transport_allowance,
  other_allowances,
  gross_salary,
  gosi_employee,
  gosi_employer,
  tax_deduction,
  other_deductions,
  net_salary,
  payment_date,
  created_at
) VALUES 
-- راتب الشهر الحالي
('22222222-2222-2222-2222-222222222222', gen_random_uuid(), 5000.00, 1500.00, 800.00, 200.00, 7500.00, 562.50, 1125.00, 0.00, 100.00, 6837.50, CURRENT_DATE, NOW()),
-- راتب الشهر الماضي (مع ساعات إضافية)
('22222222-2222-2222-2222-222222222222', gen_random_uuid(), 5000.00, 1500.00, 800.00, 400.00, 7700.00, 577.50, 1155.00, 0.00, 100.00, 7022.50, CURRENT_DATE - INTERVAL '1 month', NOW() - INTERVAL '1 month'),
-- راتب ما قبل الماضي
('22222222-2222-2222-2222-222222222222', gen_random_uuid(), 5000.00, 1500.00, 800.00, 200.00, 7500.00, 562.50, 1125.00, 0.00, 150.00, 6787.50, CURRENT_DATE - INTERVAL '2 months', NOW() - INTERVAL '2 months');

-- إضافة إشعارات للموظف
INSERT INTO employee_notifications (
  employee_id,
  title,
  description,
  notification_type,
  priority,
  is_read,
  created_at
) VALUES 
('22222222-2222-2222-2222-222222222222', 'مرحباً بك في نظام بُعد HR', 'تم تفعيل حسابك بنجاح. يمكنك الآن الوصول لجميع الخدمات المتاحة.', 'info', 'medium', false, NOW()),
('22222222-2222-2222-2222-222222222222', 'تم اعتماد طلب الإجازة المرضية', 'تم اعتماد طلب إجازتك المرضية ليوم أمس بنجاح.', 'success', 'medium', false, NOW() - INTERVAL '1 day'),
('22222222-2222-2222-2222-222222222222', 'تذكير: تحديث البيانات الشخصية', 'يرجى مراجعة وتحديث بياناتك الشخصية في ملفك الشخصي.', 'warning', 'low', true, NOW() - INTERVAL '3 days'),
('22222222-2222-2222-2222-222222222222', 'كشف راتب الشهر الحالي متاح', 'يمكنك الآن الاطلاع على كشف راتب هذا الشهر من قسم الرواتب.', 'info', 'medium', false, NOW() - INTERVAL '2 days');

-- إضافة مستندات الموظف
INSERT INTO employee_documents (
  employee_id,
  document_name,
  document_type,
  file_url,
  uploaded_by,
  uploaded_at,
  is_verified
) VALUES 
('22222222-2222-2222-2222-222222222222', 'العقد الأساسي', 'contract', '/documents/contract_emp001.pdf', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '30 days', true),
('22222222-2222-2222-2222-222222222222', 'شهادة الخبرة السابقة', 'certificate', '/documents/experience_cert_emp001.pdf', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '25 days', true),
('22222222-2222-2222-2222-222222222222', 'كشف راتب سبتمبر 2025', 'payslip', '/documents/payslip_sep2025_emp001.pdf', 'system', NOW() - INTERVAL '10 days', true),
('22222222-2222-2222-2222-222222222222', 'تقرير الأداء السنوي 2024', 'performance', '/documents/performance_2024_emp001.pdf', 'manager', NOW() - INTERVAL '5 days', true);