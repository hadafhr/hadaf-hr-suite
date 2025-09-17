-- إصلاح التحذيرات الأمنية

-- إضافة سياسة RLS مفقودة للجداول الجديدة
-- جدول الوثائق والشهادات
CREATE TABLE IF NOT EXISTS public.employee_documents (
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

CREATE POLICY IF NOT EXISTS "document_employee_view"
ON public.employee_documents
FOR SELECT
USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY IF NOT EXISTS "document_hr_manage"
ON public.employee_documents
FOR ALL
USING (employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
         OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
));

-- جدول كلمات المرور المؤقتة
CREATE TABLE IF NOT EXISTS public.employee_temporary_passwords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    temp_password TEXT NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.employee_temporary_passwords ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "temp_password_hr_manage"
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
        -- الموظف يمكنه رؤية طلباته فقط
        e.user_id = auth.uid()
        OR
        -- HR يمكنهم رؤية طلبات شركتهم
        (e.company_id = boud_get_user_company_id(auth.uid()) 
         AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
              OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)))
    );
END;
$$;

-- إضافة وظيفة للحصول على الإشعارات
CREATE OR REPLACE FUNCTION public.get_employee_notifications(p_employee_id UUID DEFAULT NULL)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    notification_type TEXT,
    is_read BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        en.id,
        en.title,
        en.description,
        en.notification_type,
        en.is_read,
        en.created_at
    FROM employee_notifications en
    JOIN boud_employees e ON en.employee_id = e.id
    WHERE (p_employee_id IS NULL OR en.employee_id = p_employee_id)
    AND e.user_id = auth.uid()
    ORDER BY en.created_at DESC;
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

CREATE OR REPLACE FUNCTION public.update_subscriptions_updated_at_column()
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

-- إنشاء triggers للجداول الجديدة
DROP TRIGGER IF EXISTS update_clients_updated_at ON public.clients;
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION public.update_clients_updated_at_column();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON public.subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_subscriptions_updated_at_column();

-- إضافة الفهارس المطلوبة
CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_plan ON public.clients(plan_type);
CREATE INDEX IF NOT EXISTS idx_subscriptions_client ON public.subscriptions(client_id);
CREATE INDEX IF NOT EXISTS idx_employee_requests_status ON public.employee_requests(status);
CREATE INDEX IF NOT EXISTS idx_employee_notifications_read ON public.employee_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_employee_documents_type ON public.employee_documents(document_type);