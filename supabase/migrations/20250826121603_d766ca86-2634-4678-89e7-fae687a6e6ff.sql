-- إزالة البيانات التجريبية والافتراضية من قاعدة البيانات
-- حذف البيانات التجريبية من جدول الموظفين
DELETE FROM public.boud_employees WHERE employee_id LIKE 'EMP%' OR first_name IN ('John', 'Jane', 'أحمد', 'فاطمة', 'محمد');

-- حذف البيانات التجريبية من جدول الأقسام
DELETE FROM public.boud_departments WHERE department_code LIKE 'DEPT%' OR name_ar IN ('قسم تقنية المعلومات', 'قسم الموارد البشرية', 'إدارة المبيعات');

-- حذف البيانات التجريبية من جدول المناصب
DELETE FROM public.boud_positions WHERE position_code LIKE 'POS%' OR title_ar IN ('مطور برمجيات', 'مدير موارد بشرية', 'محاسب');

-- حذف البيانات التجريبية من جدول أنواع الإجازات الافتراضية
DELETE FROM public.leave_types WHERE name_ar IN ('إجازة سنوية', 'إجازة مرضية', 'إجازة طارئة', 'إجازة أمومة');

-- حذف البيانات التجريبية من جدول طلبات الإجازات
DELETE FROM public.leave_requests WHERE reason LIKE '%تجريبي%' OR reason LIKE '%demo%';

-- حذف البيانات التجريبية من جدول طلبات الموظفين
DELETE FROM public.employee_requests WHERE description LIKE '%تجريبي%' OR description LIKE '%demo%';

-- حذف البيانات التجريبية من جدول الحضور
DELETE FROM public.employee_attendance_records WHERE employee_id IN (
    SELECT id FROM public.boud_employees WHERE employee_id LIKE 'EMP%'
);

-- حذف البيانات التجريبية من جدول الرواتب
DELETE FROM public.boud_payroll_items WHERE employee_id IN (
    SELECT id FROM public.boud_employees WHERE employee_id LIKE 'EMP%'
);

-- حذف البيانات التجريبية من جدول البرامج التدريبية
DELETE FROM public.boud_training_programs WHERE program_name LIKE '%تجريبي%' OR program_code LIKE 'TR%';

-- حذف البيانات التجريبية من جدول الإجراءات التأديبية
DELETE FROM public.disciplinary_actions WHERE description LIKE '%تجريبي%' OR case_number LIKE 'DC-%';

-- حذف البيانات التجريبية من جدول المكافآت
DELETE FROM public.employee_rewards WHERE notes LIKE '%تجريبي%';

-- حذف البيانات التجريبية من جدول إعدادات الحضور
DELETE FROM public.attendance_settings WHERE company_id = 'demo-company';

-- حذف البيانات التجريبية من جدول الشركات الوهمية
DELETE FROM public.companies WHERE company_name LIKE '%Demo%' OR company_name LIKE '%تجريبي%';

-- حذف البيانات التجريبية من جدول المؤسسات التعليمية
DELETE FROM public.mosques WHERE name LIKE '%Demo%' OR name LIKE '%تجريبي%';

-- حذف البيانات التجريبية من جدول الموردين
DELETE FROM public.suppliers WHERE supplier_name LIKE '%Demo%' OR supplier_code LIKE 'SUP%';

-- حذف البيانات التجريبية من جدول الاجتماعات
DELETE FROM public.meetings WHERE title LIKE '%تجريبي%';

-- حذف البيانات التجريبية من جدول الفواتير
DELETE FROM public.invoices WHERE invoice_number LIKE '%DEMO%';

-- حذف البيانات التجريبية من جدول أوامر الشراء
DELETE FROM public.purchase_orders WHERE po_number LIKE '%DEMO%';

-- حذف البيانات التجريبية من جدول المعاملات المالية
DELETE FROM public.transactions WHERE description LIKE '%تجريبي%' OR description LIKE '%demo%';

-- حذف البيانات التجريبية من جدول الحسابات المالية
DELETE FROM public.financial_accounts WHERE account_name LIKE '%Demo%' OR account_code LIKE 'ACC%';

-- إعادة تعيين تسلسل المعرفات للجداول المهمة
ALTER SEQUENCE IF EXISTS boud_employees_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS boud_departments_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS boud_positions_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS leave_types_id_seq RESTART WITH 1;