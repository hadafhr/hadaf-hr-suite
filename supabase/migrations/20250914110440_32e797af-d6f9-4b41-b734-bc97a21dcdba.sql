-- إنشاء payroll run أولاً
INSERT INTO boud_payroll_runs (id, run_date, company_id, status, created_by, created_at)
VALUES 
(gen_random_uuid(), CURRENT_DATE, '11111111-1111-1111-1111-111111111111', 'completed', '00064bb7-df65-48fa-a51b-d01d76ee5d58', NOW()),
(gen_random_uuid(), CURRENT_DATE - INTERVAL '1 month', '11111111-1111-1111-1111-111111111111', 'completed', '00064bb7-df65-48fa-a51b-d01d76ee5d58', NOW() - INTERVAL '1 month'),
(gen_random_uuid(), CURRENT_DATE - INTERVAL '2 months', '11111111-1111-1111-1111-111111111111', 'completed', '00064bb7-df65-48fa-a51b-d01d76ee5d58', NOW() - INTERVAL '2 months');

-- الحصول على IDs للـ payroll runs المُنشأة حديثاً واستخدامها في payroll items
WITH recent_runs AS (
  SELECT id, row_number() over (order by run_date desc) as rn 
  FROM boud_payroll_runs 
  WHERE company_id = '11111111-1111-1111-1111-111111111111'
)
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
  commission,
  gosi_employee,
  income_tax,
  advance_deduction,
  loan_deduction,
  disciplinary_deduction,
  absence_deduction,
  other_deductions,
  working_days,
  actual_working_days,
  overtime_hours,
  absence_days,
  late_hours,
  created_at
)
SELECT 
  '22222222-2222-2222-2222-222222222222'::uuid,
  r.id,
  CASE r.rn WHEN 1 THEN 5000.00 WHEN 2 THEN 5000.00 ELSE 5000.00 END,
  CASE r.rn WHEN 1 THEN 1500.00 WHEN 2 THEN 1500.00 ELSE 1500.00 END,
  CASE r.rn WHEN 1 THEN 800.00 WHEN 2 THEN 800.00 ELSE 800.00 END,
  CASE r.rn WHEN 1 THEN 200.00 WHEN 2 THEN 200.00 ELSE 200.00 END,
  CASE r.rn WHEN 1 THEN 0.00 WHEN 2 THEN 400.00 ELSE 0.00 END,
  CASE r.rn WHEN 1 THEN 300.00 WHEN 2 THEN 200.00 ELSE 150.00 END,
  0.00,
  CASE r.rn WHEN 1 THEN 562.50 WHEN 2 THEN 577.50 ELSE 562.50 END,
  0.00, 0.00, 0.00, 0.00,
  CASE r.rn WHEN 1 THEN 0.00 WHEN 2 THEN 0.00 ELSE 2.00 END,
  CASE r.rn WHEN 1 THEN 100.00 WHEN 2 THEN 100.00 ELSE 150.00 END,
  CASE r.rn WHEN 1 THEN 22 WHEN 2 THEN 22 ELSE 20 END,
  CASE r.rn WHEN 1 THEN 22 WHEN 2 THEN 22 ELSE 20 END,
  CASE r.rn WHEN 1 THEN 0.0 WHEN 2 THEN 8.0 ELSE 0.0 END,
  CASE r.rn WHEN 1 THEN 0 WHEN 2 THEN 0 ELSE 2 END,
  CASE r.rn WHEN 1 THEN 0.0 WHEN 2 THEN 0.0 ELSE 0.5 END,
  CASE r.rn WHEN 1 THEN NOW() WHEN 2 THEN NOW() - INTERVAL '1 month' ELSE NOW() - INTERVAL '2 months' END
FROM recent_runs r
WHERE r.rn <= 3;