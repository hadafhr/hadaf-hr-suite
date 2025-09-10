-- Create a test company first
INSERT INTO boud_companies (id, company_name, company_code, email, is_active)
VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'شركة بُعد التجريبية',
  'BOUD001',
  'info@boud-test.com',
  true
)
ON CONFLICT (company_code) DO NOTHING;

-- Create a test employee record (without total_salary since it's computed)
INSERT INTO boud_employees (
  id,
  user_id,
  company_id,
  employee_id,
  first_name,
  last_name,
  email,
  phone,
  basic_salary,
  housing_allowance,
  transport_allowance,
  other_allowances,
  hire_date,
  employment_status,
  is_active,
  nationality,
  gender
)
VALUES (
  '22222222-2222-2222-2222-222222222222'::uuid,
  '00000000-0000-0000-0000-000000000001'::uuid, -- Fixed UUID for testing
  '11111111-1111-1111-1111-111111111111'::uuid,
  'EMP001',
  'محمد',
  'أحمد',
  'employee@boud.com',
  '+966501234567',
  5000.00,
  1500.00,
  800.00,
  200.00,
  CURRENT_DATE - INTERVAL '1 year',
  'active'::employee_status,
  true,
  'سعودي',
  'male'
)
ON CONFLICT (email) DO NOTHING;