-- إصلاح التحذيرات الأمنية (إصدار صحيح)

-- إنشاء جدول الوثائق والشهادات إذا لم يكن موجوداً
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'employee_documents') THEN
        CREATE TABLE public.employee_documents (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
            document_type TEXT NOT NULL,
            document_name TEXT NOT NULL,
            file_path TEXT NOT NULL,
            file_size INTEGER,
            mime_type TEXT,
            is_verified BOOLEAN DEFAULT FALSE,
            verified_by UUID REFERENCES public.boud_employees(id),
            verified_at TIMESTAMP WITH TIME ZONE,
            expiry_date DATE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        ALTER TABLE public.employee_documents ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- إنشاء جدول كلمات المرور المؤقتة إذا لم يكن موجوداً
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'employee_temporary_passwords') THEN
        CREATE TABLE public.employee_temporary_passwords (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
            temp_password TEXT NOT NULL,
            is_used BOOLEAN DEFAULT FALSE,
            expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        ALTER TABLE public.employee_temporary_passwords ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- حذف السياسات الموجودة وإعادة إنشائها للجداول الجديدة
DROP POLICY IF EXISTS "document_employee_view" ON public.employee_documents;
DROP POLICY IF EXISTS "document_hr_manage" ON public.employee_documents;
DROP POLICY IF EXISTS "temp_password_hr_manage" ON public.employee_temporary_passwords;

-- إنشاء السياسات الجديدة
CREATE POLICY "document_employee_view"
ON public.employee_documents
FOR SELECT
USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "document_hr_manage"
ON public.employee_documents
FOR ALL
USING (employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
         OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
));

CREATE POLICY "temp_password_hr_manage"
ON public.employee_temporary_passwords
FOR ALL
USING (employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
         OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
));

-- إضافة وظائف مساعدة مع إعداد search_path الآمن
CREATE OR REPLACE FUNCTION public.get_employee_requests(p_employee_id UUID DEFAULT NULL)
RETURNS TABLE (
    id UUID,
    request_type TEXT,
    title TEXT,
    description TEXT,
    status TEXT,
    requested_date DATE,
    employee_name TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        er.id,
        er.request_type,
        er.title,
        er.description,
        er.status,
        er.requested_date,
        CONCAT(e.first_name, ' ', e.last_name) as employee_name
    FROM employee_requests er
    JOIN boud_employees e ON er.employee_id = e.id
    WHERE (p_employee_id IS NULL OR er.employee_id = p_employee_id)
    AND (
        e.user_id = auth.uid()
        OR
        (e.company_id = boud_get_user_company_id(auth.uid()) 
         AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
              OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)))
    );
END;
$$;

-- إضافة trigger لتحديث updated_at
CREATE OR REPLACE FUNCTION public.update_clients_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- إنشاء trigger للعملاء
DROP TRIGGER IF EXISTS update_clients_updated_at ON public.clients;
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION public.update_clients_updated_at_column();