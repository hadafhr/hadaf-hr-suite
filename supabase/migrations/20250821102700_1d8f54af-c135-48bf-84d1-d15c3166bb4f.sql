-- إنشاء جداول نظام الاشتراكات والفواتير لمنصة بُعد

-- جدول الباقات المتاحة
CREATE TABLE public.subscription_packages (
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

-- جدول الاشتراكات
CREATE TABLE public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id UUID REFERENCES subscription_packages(id),
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

-- جدول الفواتير
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES user_subscriptions(id),
  invoice_number TEXT NOT NULL UNIQUE,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax_rate NUMERIC NOT NULL DEFAULT 15.00,
  tax_amount NUMERIC NOT NULL DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'SAR',
  payment_method TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  paid_at TIMESTAMP WITH TIME ZONE,
  pdf_url TEXT,
  stripe_invoice_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول عناصر الفاتورة
CREATE TABLE public.invoice_line_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  line_total NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول تذكيرات التجديد
CREATE TABLE public.renewal_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID REFERENCES user_subscriptions(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL CHECK (reminder_type IN ('30_days', '7_days', '1_day')),
  sent_at TIMESTAMP WITH TIME ZONE,
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- تمكين RLS على جميع الجداول
ALTER TABLE public.subscription_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.renewal_reminders ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان لجدول الباقات (يمكن للجميع عرضها)
CREATE POLICY "Anyone can view active subscription packages" 
ON public.subscription_packages 
FOR SELECT 
USING (is_active = true);

-- سياسات الأمان للاشتراكات
CREATE POLICY "Users can view their own subscriptions" 
ON public.user_subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions" 
ON public.user_subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
ON public.user_subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- سياسات الأمان للفواتير
CREATE POLICY "Users can view their own invoices" 
ON public.invoices 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage invoices" 
ON public.invoices 
FOR ALL 
USING (true);

-- سياسات الأمان لعناصر الفواتير
CREATE POLICY "Users can view their invoice items" 
ON public.invoice_line_items 
FOR SELECT 
USING (invoice_id IN (SELECT id FROM invoices WHERE user_id = auth.uid()));

-- سياسات الأمان للتذكيرات
CREATE POLICY "Users can view their renewal reminders" 
ON public.renewal_reminders 
FOR SELECT 
USING (subscription_id IN (SELECT id FROM user_subscriptions WHERE user_id = auth.uid()));

-- إدراج الباقات الأساسية
INSERT INTO public.subscription_packages (package_name, package_name_en, description, price_monthly, price_yearly, max_employees, features) VALUES
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

-- دالة لتوليد رقم فاتورة تلقائي
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
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
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'INV-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM invoices
  WHERE invoice_number LIKE 'INV-' || current_year || '-%';
  
  invoice_number := 'INV-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN invoice_number;
END;
$$;

-- دالة لحساب المبلغ الإجمالي للفاتورة
CREATE OR REPLACE FUNCTION public.calculate_invoice_totals()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- حساب المبلغ الإجمالي لعناصر الفاتورة
  UPDATE invoices 
  SET 
    subtotal = (
      SELECT COALESCE(SUM(line_total), 0) 
      FROM invoice_line_items 
      WHERE invoice_id = NEW.invoice_id
    ),
    tax_amount = subtotal * (tax_rate / 100),
    total_amount = subtotal + (subtotal * (tax_rate / 100))
  WHERE id = NEW.invoice_id;
  
  RETURN NEW;
END;
$$;

-- إنشاء trigger لحساب المجاميع تلقائياً
CREATE TRIGGER calculate_invoice_totals_trigger
AFTER INSERT OR UPDATE OR DELETE ON invoice_line_items
FOR EACH ROW
EXECUTE FUNCTION calculate_invoice_totals();

-- دالة لتحديث timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- إضافة triggers للتحديث التلقائي
CREATE TRIGGER update_subscription_packages_timestamp
BEFORE UPDATE ON subscription_packages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_timestamp();

CREATE TRIGGER update_user_subscriptions_timestamp
BEFORE UPDATE ON user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_timestamp();

CREATE TRIGGER update_invoices_timestamp
BEFORE UPDATE ON invoices
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_timestamp();