-- تعديل جدول الشركات لجعل owner_id اختياري
ALTER TABLE public.companies ALTER COLUMN owner_id DROP NOT NULL;

-- إدراج شركة تجريبية بدون مرجع للمستخدم
INSERT INTO public.companies (
  company_name, company_code, commercial_register, vat_number, 
  address, phone, email, industry
) VALUES (
  'شركة بُعد للتقنية', 'BOUD-001', 'CR-2025-001', 'VAT-123456789',
  'الرياض، المملكة العربية السعودية', '+966501234567', 
  'info@boud.tech', 'تقنية المعلومات'
) ON CONFLICT (company_code) DO NOTHING;

-- إدراج وحدة تنظيمية
INSERT INTO public.org_units (
  company_id, unit_name, unit_code, cost_center, level
) 
SELECT 
  c.id, 'إدارة الموارد البشرية', 'HR-001', 'CC-HR', 1
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
ON CONFLICT DO NOTHING;

-- إدراج موظف تجريبي
INSERT INTO public.hr_employees (
  company_id, employee_id, full_name, email, phone, position, 
  job_title, basic_salary, housing_allowance, transport_allowance,
  leave_balances, status
)
SELECT 
  c.id, 'EMP-001', 'أحمد محمد السعيد', 'ahmed@boud.tech', 
  '+966501111111', 'موظف', 'مطور تطبيقات', 8000.00, 2000.00, 500.00,
  '{"annual": 30, "sick": 15, "emergency": 5}', 'active'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
ON CONFLICT (company_id, employee_id) DO NOTHING;

-- إدراج موظف إضافي
INSERT INTO public.hr_employees (
  company_id, employee_id, full_name, email, phone, position, 
  job_title, basic_salary, housing_allowance, transport_allowance,
  leave_balances, status
)
SELECT 
  c.id, 'EMP-002', 'فاطمة علي النمر', 'fatma@boud.tech', 
  '+966502222222', 'مدير', 'مدير الموارد البشرية', 12000.00, 3000.00, 800.00,
  '{"annual": 30, "sick": 15, "emergency": 5}', 'active'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
ON CONFLICT (company_id, employee_id) DO NOTHING;

-- إدراج قوالب سير العمل
INSERT INTO public.workflow_templates (
  company_id, workflow_key, workflow_name, entity_type, workflow_config
)
SELECT 
  c.id, 'leave_request_v1', 'طلب إجازة', 'leave_request',
  '{
    "steps": [
      {"order": 1, "role": "line_manager", "slaHours": 24, "fallbackRole": "hr_officer"},
      {"order": 2, "role": "hr_officer", "slaHours": 24, "fallbackRole": "hr_manager"}
    ],
    "onApprove": [
      {"action": "DEDUCT_LEAVE_BALANCE", "params": {"days": "$payload.days"}},
      {"action": "MARK_ATTENDANCE_ABSENCE", "params": {"from": "$payload.from", "to": "$payload.to"}},
      {"action": "EMIT_EVENT", "params": {"type": "LeaveApproved"}}
    ],
    "onReject": [{"action": "EMIT_EVENT", "params": {"type": "LeaveRejected"}}],
    "notifications": {"created": ["line_manager"], "approved": ["employeeId"], "rejected": ["employeeId"]}
  }'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id, 'loan_request_v1', 'طلب سلفة', 'loan_request',
  '{
    "steps": [
      {"order": 1, "role": "line_manager", "slaHours": 24},
      {"order": 2, "role": "hr_officer", "slaHours": 24},
      {"order": 3, "role": "finance", "slaHours": 24}
    ],
    "onApprove": [
      {"action": "CREATE_LOAN_SCHEDULE", "params": {"amount": "$payload.amount", "months": "$payload.months"}},
      {"action": "EMIT_EVENT", "params": {"type": "LoanApproved"}}
    ],
    "onReject": [{"action": "EMIT_EVENT", "params": {"type": "LoanRejected"}}]
  }'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id, 'salary_letter_v1', 'تعريف راتب', 'salary_letter',
  '{
    "steps": [],
    "auto": [
      {"action": "GENERATE_PDF_LETTER", "params": {"template": "salary_ar_en"}},
      {"action": "EMIT_EVENT", "params": {"type": "DocumentIssued", "docType": "SalaryLetter"}}
    ]
  }'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id, 'data_change_v1', 'تعديل بيانات', 'data_change',
  '{
    "steps": [{"order": 1, "role": "hr_officer", "slaHours": 24}],
    "onApprove": [{"action": "UPDATE_PROFILE", "params": {"fields": "$payload.changes"}}]
  }'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id, 'training_request_v1', 'طلب تدريب', 'training_request',
  '{
    "steps": [
      {"order": 1, "role": "line_manager", "slaHours": 24},
      {"order": 2, "role": "training_officer", "slaHours": 48}
    ],
    "onApprove": [{"action": "ASSIGN_TRAINING", "params": {"courseId": "$payload.courseId"}}]
  }'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
ON CONFLICT (company_id, workflow_key) DO NOTHING;