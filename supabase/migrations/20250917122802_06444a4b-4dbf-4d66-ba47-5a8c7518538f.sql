-- إنشاء جداول النظام الأساسية

-- جدول العملاء المحسن
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company_name TEXT,
    plan_type TEXT DEFAULT 'basic',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    subscription_start DATE,
    subscription_end DATE,
    total_employees INTEGER DEFAULT 0,
    monthly_payment DECIMAL(10,2) DEFAULT 0.00,
    contact_person TEXT,
    address TEXT,
    city TEXT,
    country TEXT DEFAULT 'السعودية'
);

-- تفعيل RLS على جدول العملاء
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان لجدول العملاء
CREATE POLICY "Admins can manage clients"
ON public.clients
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- جدول الاشتراكات
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    billing_cycle TEXT DEFAULT 'monthly', -- monthly, yearly
    status TEXT DEFAULT 'active', -- active, suspended, cancelled
    start_date DATE NOT NULL,
    end_date DATE,
    features JSONB DEFAULT '{}',
    max_employees INTEGER DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage subscriptions"
ON public.subscriptions
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- جدول طلبات الموظفين
CREATE TABLE IF NOT EXISTS public.employee_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    request_type TEXT NOT NULL, -- leave, certificate, document, etc.
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    documents JSONB DEFAULT '[]',
    requested_date DATE DEFAULT CURRENT_DATE,
    response_date DATE,
    response_by UUID REFERENCES public.boud_employees(id),
    response_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.employee_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can manage their requests"
ON public.employee_requests
FOR ALL
USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "HR can manage all requests"
ON public.employee_requests
FOR ALL
USING (employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
         OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
));

-- جدول الإشعارات للموظفين
CREATE TABLE IF NOT EXISTS public.employee_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    notification_type TEXT DEFAULT 'info', -- info, success, warning, error
    is_read BOOLEAN DEFAULT FALSE,
    action_type TEXT, -- salary_update, leave_approved, etc.
    related_id UUID,
    priority TEXT DEFAULT 'medium', -- low, medium, high
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.employee_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their notifications"
ON public.employee_notifications
FOR SELECT
USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "HR can manage notifications"
ON public.employee_notifications
FOR ALL
USING (employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
         OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
));

-- جدول الوثائق والشهادات
CREATE TABLE IF NOT EXISTS public.employee_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL, -- contract, certificate, id_copy, etc.
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

CREATE POLICY "Employees can view their documents"
ON public.employee_documents
FOR SELECT
USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "HR can manage documents"
ON public.employee_documents
FOR ALL
USING (employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
         OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
));

-- جدول كلمات المرور المؤقتة للموظفين الجدد
CREATE TABLE IF NOT EXISTS public.employee_temporary_passwords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
    temp_password TEXT NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.employee_temporary_passwords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "HR can manage temp passwords"
ON public.employee_temporary_passwords
FOR ALL
USING (employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
         OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
));

-- إنشاء الفهارس للأداء
CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_plan ON public.clients(plan_type);
CREATE INDEX IF NOT EXISTS idx_subscriptions_client ON public.subscriptions(client_id);
CREATE INDEX IF NOT EXISTS idx_employee_requests_status ON public.employee_requests(status);
CREATE INDEX IF NOT EXISTS idx_employee_notifications_read ON public.employee_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_employee_documents_type ON public.employee_documents(document_type);