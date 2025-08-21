-- إضافة الجداول والحقول المفقودة لنظام الاشتراكات والفواتير

-- إضافة جدول باقات الاشتراك الجديد إذا لم يكن موجوداً
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'boud_subscription_packages') THEN
    CREATE TABLE public.boud_subscription_packages (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      package_name TEXT NOT NULL,
      package_name_en TEXT,
      description TEXT,
      price_monthly NUMERIC NOT NULL DEFAULT 0,
      price_yearly NUMERIC NOT NULL DEFAULT 0,
      max_employees INTEGER NOT NULL DEFAULT 0,
      features JSONB DEFAULT '[]'::jsonb,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );
    
    ALTER TABLE public.boud_subscription_packages ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Anyone can view active packages" 
    ON public.boud_subscription_packages 
    FOR SELECT 
    USING (is_active = true);
    
    -- إدراج الباقات الأساسية
    INSERT INTO public.boud_subscription_packages (package_name, package_name_en, description, price_monthly, price_yearly, max_employees, features) VALUES
    ('الباقة الأساسية', 'Starter Package', 'باقة مثالية للشركات الصغيرة والناشئة', 299.00, 3000.00, 25, '[
      "إدارة الموظفين الأساسية",
      "نظام الحضور والانصراف",
      "إدارة الإجازات",
      "التقارير الأساسية",
      "دعم فني عبر البريد الإلكتروني"
    ]'::jsonb),
    ('الباقة الاحترافية', 'Professional Package', 'باقة شاملة للشركات المتوسطة', 599.00, 6000.00, 100, '[
      "جميع ميزات الباقة الأساسية",
      "نظام كشف الرواتب المتقدم",
      "إدارة الأداء والتقييمات",
      "نظام التوظيف الذكي",
      "التقارير المتقدمة والتحليلات",
      "دعم فني على مدار الساعة",
      "التكامل مع الأنظمة الخارجية"
    ]'::jsonb),
    ('الباقة الشاملة', 'Enterprise Package', 'باقة متكاملة للمؤسسات الكبيرة', 999.00, 10000.00, 500, '[
      "جميع ميزات الباقة الاحترافية",
      "مساعد الذكاء الاصطناعي المتقدم",
      "نظام إدارة المشاريع",
      "تقارير الذكاء الاصطناعي",
      "التخصيص الكامل للنظام",
      "مدير حساب مخصص",
      "تدريب مخصص للفريق",
      "النسخ الاحتياطي المتقدم",
      "الامتثال والحوكمة"
    ]'::jsonb);
  END IF;
END $$;

-- إضافة جدول اشتراكات المستخدمين
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'boud_user_subscriptions') THEN
    CREATE TABLE public.boud_user_subscriptions (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      package_id UUID REFERENCES boud_subscription_packages(id),
      company_name TEXT NOT NULL,
      contact_email TEXT NOT NULL,
      employee_count INTEGER NOT NULL DEFAULT 1,
      billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
      subscription_start DATE NOT NULL DEFAULT CURRENT_DATE,
      subscription_end DATE NOT NULL,
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'pending')),
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      auto_renew BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );
    
    ALTER TABLE public.boud_user_subscriptions ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can view own subscriptions" 
    ON public.boud_user_subscriptions 
    FOR SELECT 
    USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can create own subscriptions" 
    ON public.boud_user_subscriptions 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can update own subscriptions" 
    ON public.boud_user_subscriptions 
    FOR UPDATE 
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- تحديث جدول الفواتير الموجود بإضافة حقول مفقودة
DO $$
BEGIN
  -- إضافة subscription_id إذا لم يكن موجوداً
  IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'subscription_id') THEN
    ALTER TABLE public.invoices ADD COLUMN subscription_id UUID REFERENCES boud_user_subscriptions(id);
  END IF;
  
  -- إضافة pdf_url إذا لم يكن موجوداً
  IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'pdf_url') THEN
    ALTER TABLE public.invoices ADD COLUMN pdf_url TEXT;
  END IF;
  
  -- إضافة stripe_invoice_id إذا لم يكن موجوداً
  IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'stripe_invoice_id') THEN
    ALTER TABLE public.invoices ADD COLUMN stripe_invoice_id TEXT;
  END IF;
  
  -- إضافة paid_at إذا لم يكن موجوداً
  IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'paid_at') THEN
    ALTER TABLE public.invoices ADD COLUMN paid_at TIMESTAMP WITH TIME ZONE;
  END IF;
  
  -- إضافة payment_method إذا لم يكن موجوداً
  IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'payment_method') THEN
    ALTER TABLE public.invoices ADD COLUMN payment_method TEXT;
  END IF;
  
  -- إضافة currency إذا لم يكن موجوداً
  IF NOT EXISTS (SELECT column_name FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'currency') THEN
    ALTER TABLE public.invoices ADD COLUMN currency TEXT DEFAULT 'SAR';
  END IF;
END $$;

-- إضافة جدول تذكيرات التجديد
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'renewal_reminders') THEN
    CREATE TABLE public.renewal_reminders (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      subscription_id UUID REFERENCES boud_user_subscriptions(id) ON DELETE CASCADE,
      reminder_type TEXT NOT NULL CHECK (reminder_type IN ('30_days', '7_days', '1_day')),
      sent_at TIMESTAMP WITH TIME ZONE,
      email_sent BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );
    
    ALTER TABLE public.renewal_reminders ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can view own reminders" 
    ON public.renewal_reminders 
    FOR SELECT 
    USING (subscription_id IN (SELECT id FROM boud_user_subscriptions WHERE user_id = auth.uid()));
  END IF;
END $$;

-- دوال مساعدة لتوليد أرقام الفواتير
CREATE OR REPLACE FUNCTION public.generate_boud_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  invoice_number TEXT;
  current_year TEXT;
  sequence_num INTEGER;
BEGIN
  current_year := EXTRACT(YEAR FROM NOW())::TEXT;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'BOUD-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM invoices
  WHERE invoice_number LIKE 'BOUD-' || current_year || '-%';
  
  invoice_number := 'BOUD-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN invoice_number;
END;
$$;