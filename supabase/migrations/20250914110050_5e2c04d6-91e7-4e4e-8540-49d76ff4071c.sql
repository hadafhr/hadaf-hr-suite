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