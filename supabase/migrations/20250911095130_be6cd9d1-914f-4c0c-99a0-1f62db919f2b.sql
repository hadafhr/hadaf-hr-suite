-- إنشاء شركة تجريبية
INSERT INTO boud_companies (company_name, company_name_arabic, commercial_registration, tax_number, establishment_date, company_type, industry_type, subscription_type)
VALUES ('شركة بُعد التقنية', 'شركة بُعد التقنية للموارد البشرية', '1234567890123', '123456789012345', '2020-01-01', 'limited_liability', 'technology', 'premium')
ON CONFLICT (commercial_registration) DO NOTHING;

-- إنشاء قسم تقنية المعلومات
INSERT INTO boud_departments (company_id, department_name, department_name_arabic, department_code, description, is_active)
SELECT c.id, 'IT Department', 'قسم تقنية المعلومات', 'IT001', 'قسم تقنية المعلومات والبرمجة', true
FROM boud_companies c 
WHERE c.commercial_registration = '1234567890123'
ON CONFLICT (company_id, department_code) DO NOTHING;

-- إنشاء منصب وظيفي
INSERT INTO boud_job_positions (company_id, department_id, position_title, position_title_arabic, position_code, job_level, min_salary, max_salary, is_active)
SELECT c.id, d.id, 'Software Developer', 'مطور برمجيات', 'DEV001', 'mid', 8000.00, 15000.00, true
FROM boud_companies c
JOIN boud_departments d ON d.company_id = c.id
WHERE c.commercial_registration = '1234567890123' AND d.department_code = 'IT001'
ON CONFLICT (company_id, position_code) DO NOTHING;

-- إنشاء موظف للمستخدم الأول الموجود في auth.users
INSERT INTO boud_employees (
  user_id, company_id, department_id, position_id, 
  employee_id, first_name, last_name, full_name_arabic,
  email, phone, national_id, hire_date, 
  basic_salary, employment_status, contract_type
)
SELECT 
  'b4c14eda-e20a-4ba6-a5db-d1393492ec10'::uuid,
  c.id,
  d.id,
  p.id,
  'EMP002',
  'أحمد',
  'محمد',
  'أحمد محمد السعيد',
  'admn@boud.com',
  '+966501234567',
  '1234567890',
  '2024-01-15',
  12000.00,
  'active',
  'full_time'
FROM boud_companies c
JOIN boud_departments d ON d.company_id = c.id
JOIN boud_job_positions p ON p.company_id = c.id AND p.department_id = d.id
WHERE c.commercial_registration = '1234567890123' 
  AND d.department_code = 'IT001' 
  AND p.position_code = 'DEV001'
ON CONFLICT (employee_id) DO NOTHING;

-- منح صلاحيات المستخدم
INSERT INTO boud_user_roles (user_id, company_id, role, is_active)
SELECT 'b4c14eda-e20a-4ba6-a5db-d1393492ec10'::uuid, c.id, 'employee'::user_role, true
FROM boud_companies c
WHERE c.commercial_registration = '1234567890123'
ON CONFLICT (user_id, company_id, role) DO NOTHING;