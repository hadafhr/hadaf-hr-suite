-- ====================================
-- إضافة سياسات RLS لنظام التأمين والتأمينات
-- ====================================

-- تفعيل RLS على جميع الجداول
ALTER TABLE insurance_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_insurance_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gosi_integration ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_reports ENABLE ROW LEVEL SECURITY;

-- ====================================
-- سياسات جدول شركات التأمين
-- ====================================

-- HR managers can manage insurance providers
CREATE POLICY "HR managers can manage insurance providers" ON insurance_providers
FOR ALL USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- All employees can view active insurance providers
CREATE POLICY "Employees can view insurance providers" ON insurance_providers
FOR SELECT USING (
  company_id = boud_get_user_company_id(auth.uid()) AND is_active = true
);

-- ====================================
-- سياسات جدول وثائق التأمين
-- ====================================

-- HR managers can manage insurance policies
CREATE POLICY "HR managers can manage insurance policies" ON insurance_policies
FOR ALL USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- Employees can view active insurance policies in their company
CREATE POLICY "Employees can view insurance policies" ON insurance_policies
FOR SELECT USING (
  company_id = boud_get_user_company_id(auth.uid()) AND status = 'active'
);

-- ====================================
-- سياسات جدول اشتراكات الموظفين
-- ====================================

-- Employees can view their own subscriptions
CREATE POLICY "Employees can view their insurance subscriptions" ON employee_insurance_subscriptions
FOR SELECT USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

-- HR managers can manage all employee insurance subscriptions
CREATE POLICY "HR managers can manage employee insurance subscriptions" ON employee_insurance_subscriptions
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- ====================================
-- سياسات جدول المطالبات التأمينية
-- ====================================

-- Employees can view and create their own insurance claims
CREATE POLICY "Employees can manage their insurance claims" ON insurance_claims
FOR ALL USING (
  subscription_id IN (
    SELECT s.id FROM employee_insurance_subscriptions s
    JOIN boud_employees e ON s.employee_id = e.id
    WHERE e.user_id = auth.uid()
  )
)
WITH CHECK (
  subscription_id IN (
    SELECT s.id FROM employee_insurance_subscriptions s
    JOIN boud_employees e ON s.employee_id = e.id
    WHERE e.user_id = auth.uid()
  )
);

-- HR managers can manage all insurance claims in their company
CREATE POLICY "HR managers can manage insurance claims" ON insurance_claims
FOR ALL USING (
  subscription_id IN (
    SELECT s.id FROM employee_insurance_subscriptions s
    JOIN boud_employees e ON s.employee_id = e.id
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  subscription_id IN (
    SELECT s.id FROM employee_insurance_subscriptions s
    JOIN boud_employees e ON s.employee_id = e.id
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- ====================================
-- سياسات جدول دفعات التأمينات
-- ====================================

-- HR managers and finance officers can manage insurance payments
CREATE POLICY "HR and finance can manage insurance payments" ON insurance_payments
FOR ALL USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'payroll_officer'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
  boud_has_role(auth.uid(), company_id, 'payroll_officer'::user_role)
);

-- ====================================
-- سياسات جدول تكامل التأمينات الاجتماعية
-- ====================================

-- Employees can view their own GOSI data
CREATE POLICY "Employees can view their GOSI data" ON gosi_integration
FOR SELECT USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

-- HR managers can manage all GOSI data in their company
CREATE POLICY "HR managers can manage GOSI data" ON gosi_integration
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- ====================================
-- سياسات جدول إشعارات التأمين
-- ====================================

-- Users can view their own insurance notifications
CREATE POLICY "Users can view their insurance notifications" ON insurance_notifications
FOR SELECT USING (recipient_id = auth.uid());

-- Users can update their own notification read status
CREATE POLICY "Users can update their insurance notifications" ON insurance_notifications
FOR UPDATE USING (recipient_id = auth.uid())
WITH CHECK (recipient_id = auth.uid());

-- HR managers can create insurance notifications
CREATE POLICY "HR managers can create insurance notifications" ON insurance_notifications
FOR INSERT WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- ====================================
-- سياسات جدول تقارير التأمين
-- ====================================

-- HR managers can manage insurance reports
CREATE POLICY "HR managers can manage insurance reports" ON insurance_reports
FOR ALL USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- ====================================
-- إصلاح دوال البحث Path لتجنب التحذيرات الأمنية
-- ====================================

-- إصلاح دالة تحديث updated_at
CREATE OR REPLACE FUNCTION update_insurance_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- إصلاح دالة توليد أرقام المطالبات
CREATE OR REPLACE FUNCTION generate_claim_number()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    claim_number TEXT;
    current_year TEXT;
    sequence_num INTEGER;
BEGIN
    current_year := EXTRACT(YEAR FROM NOW())::TEXT;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(claim_number FROM 'CLM-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM insurance_claims
    WHERE claim_number LIKE 'CLM-' || current_year || '-%';
    
    claim_number := 'CLM-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
    
    RETURN claim_number;
END;
$$;

-- إصلاح دالة توليد أرقام الاشتراكات
CREATE OR REPLACE FUNCTION generate_subscription_number()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    sub_number TEXT;
    current_year TEXT;
    sequence_num INTEGER;
BEGIN
    current_year := EXTRACT(YEAR FROM NOW())::TEXT;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(subscription_number FROM 'SUB-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM employee_insurance_subscriptions
    WHERE subscription_number LIKE 'SUB-' || current_year || '-%';
    
    sub_number := 'SUB-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
    
    RETURN sub_number;
END;
$$;