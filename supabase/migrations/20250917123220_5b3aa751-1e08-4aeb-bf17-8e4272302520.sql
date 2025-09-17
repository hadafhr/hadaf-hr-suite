-- إنشاء جداول النظام الأساسية (مع إصلاح السياسات)

-- إنشاء جدول العملاء إذا لم يكن موجوداً
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'clients') THEN
        CREATE TABLE public.clients (
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
        
        ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- إنشاء جدول الاشتراكات إذا لم يكن موجوداً
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'subscriptions') THEN
        CREATE TABLE public.subscriptions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
            plan_name TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            billing_cycle TEXT DEFAULT 'monthly',
            status TEXT DEFAULT 'active',
            start_date DATE NOT NULL,
            end_date DATE,
            features JSONB DEFAULT '{}',
            max_employees INTEGER DEFAULT 50,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- حذف السياسات الموجودة وإعادة إنشائها للجداول الجديدة
DROP POLICY IF EXISTS "Admins can manage clients" ON public.clients;
DROP POLICY IF EXISTS "Admins can manage subscriptions" ON public.subscriptions;

-- إنشاء السياسات الجديدة
CREATE POLICY "client_admin_access"
ON public.clients
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "subscription_admin_access"
ON public.subscriptions
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- إنشاء جدول طلبات الموظفين إذا لم يكن موجوداً
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'employee_requests') THEN
        CREATE TABLE public.employee_requests (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
            request_type TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending',
            documents JSONB DEFAULT '[]',
            requested_date DATE DEFAULT CURRENT_DATE,
            response_date DATE,
            response_by UUID REFERENCES public.boud_employees(id),
            response_notes TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        ALTER TABLE public.employee_requests ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- حذف السياسات الموجودة لطلبات الموظفين
DROP POLICY IF EXISTS "Employees can manage their requests" ON public.employee_requests;
DROP POLICY IF EXISTS "HR can manage all requests" ON public.employee_requests;

-- إنشاء سياسات جديدة لطلبات الموظفين
CREATE POLICY "employee_request_self_access"
ON public.employee_requests
FOR ALL
USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

CREATE POLICY "employee_request_hr_access"
ON public.employee_requests
FOR ALL
USING (employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
    AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
         OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
));

-- إنشاء باقي الجداول
-- جدول الإشعارات للموظفين
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'employee_notifications') THEN
        CREATE TABLE public.employee_notifications (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            employee_id UUID REFERENCES public.boud_employees(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            notification_type TEXT DEFAULT 'info',
            is_read BOOLEAN DEFAULT FALSE,
            action_type TEXT,
            related_id UUID,
            priority TEXT DEFAULT 'medium',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        ALTER TABLE public.employee_notifications ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "notification_employee_view"
        ON public.employee_notifications
        FOR SELECT
        USING (employee_id IN (SELECT id FROM boud_employees WHERE user_id = auth.uid()));

        CREATE POLICY "notification_hr_manage"
        ON public.employee_notifications
        FOR ALL
        USING (employee_id IN (
            SELECT e.id FROM boud_employees e 
            WHERE e.company_id = boud_get_user_company_id(auth.uid()) 
            AND (boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) 
                 OR boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role))
        ));
    END IF;
END $$;