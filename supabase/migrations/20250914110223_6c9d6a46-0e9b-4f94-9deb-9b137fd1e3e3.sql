-- إضافة عناصر كشف الراتب (آخر 3 أشهر)
INSERT INTO boud_payroll_items (
  employee_id,
  payroll_run_id,
  basic_salary,
  housing_allowance,
  transport_allowance,
  other_allowances,
  overtime_pay,
  bonus,
  gosi_employee,
  income_tax,
  other_deductions,
  net_salary,
  working_days,
  actual_working_days,
  overtime_hours,
  created_at
) VALUES 
-- راتب الشهر الحالي
('22222222-2222-2222-2222-222222222222', gen_random_uuid(), 5000.00, 1500.00, 800.00, 200.00, 0.00, 300.00, 562.50, 0.00, 100.00, 7137.50, 22, 22, 0.0, NOW()),
-- راتب الشهر الماضي (مع ساعات إضافية)
('22222222-2222-2222-2222-222222222222', gen_random_uuid(), 5000.00, 1500.00, 800.00, 200.00, 400.00, 200.00, 577.50, 0.00, 100.00, 7422.50, 22, 22, 8.0, NOW() - INTERVAL '1 month'),
-- راتب ما قبل الماضي
('22222222-2222-2222-2222-222222222222', gen_random_uuid(), 5000.00, 1500.00, 800.00, 200.00, 0.00, 150.00, 562.50, 0.00, 150.00, 6937.50, 20, 20, 0.0, NOW() - INTERVAL '2 months');

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
('22222222-2222-2222-2222-222222222222', 'كشف راتب سبتمبر 2025', 'payslip', '/documents/payslip_sep2025_emp001.pdf', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '10 days', true),
('22222222-2222-2222-2222-222222222222', 'تقرير الأداء السنوي 2024', 'performance', '/documents/performance_2024_emp001.pdf', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '5 days', true);