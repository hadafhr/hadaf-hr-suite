-- Create a test user in auth.users table (This will be handled by Supabase Auth)
-- We'll create a test employee in the boud_employees table

-- First, let's check if we have a company
INSERT INTO boud_companies (id, company_name, company_code, email, is_active)
VALUES (
  gen_random_uuid(),
  'شركة بُعد التجريبية',
  'BOUD001',
  'info@boud-test.com',
  true
)
ON CONFLICT (company_code) DO NOTHING;

-- Create a test employee record with a known user_id
-- We'll use a fixed UUID for the user_id to match with Supabase Auth
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
  total_salary,
  hire_date,
  employment_status,
  is_active
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid, -- Fixed UUID for testing
  (SELECT id FROM boud_companies WHERE company_code = 'BOUD001' LIMIT 1),
  'EMP001',
  'محمد',
  'أحمد',
  'employee@boud.com',
  '+966501234567',
  5000.00,
  5000.00,
  CURRENT_DATE - INTERVAL '1 year',
  'active'::employee_status,
  true
)
ON CONFLICT (email) DO NOTHING;

-- Create a user role for the test employee
INSERT INTO boud_user_roles (
  id,
  user_id,
  company_id,
  role,
  is_active
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  (SELECT id FROM boud_companies WHERE company_code = 'BOUD001' LIMIT 1),
  'employee'::user_role,
  true
)
ON CONFLICT (user_id, company_id) DO NOTHING;