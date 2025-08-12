-- إنشاء دالة لفحص دور المستخدم
CREATE OR REPLACE FUNCTION public.hr_has_role(_user_id uuid, _company_id uuid, _role hr_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.hr_user_roles
    WHERE user_id = _user_id 
      AND company_id = _company_id 
      AND role = _role 
      AND is_active = true
  )
$$;

-- إنشاء دالة للحصول على معرف الشركة للمستخدم
CREATE OR REPLACE FUNCTION public.get_user_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT e.company_id
  FROM public.hr_employees e
  WHERE e.user_id = _user_id
  LIMIT 1
$$;

-- سياسات الأمان للشركات
CREATE POLICY "Users can view their own companies" ON companies
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can create companies" ON companies
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Company owners can update companies" ON companies
  FOR UPDATE USING (auth.uid() = owner_id);

-- سياسات الأمان للوحدات التنظيمية
CREATE POLICY "Users can view org units in their company" ON org_units
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "HR officers can manage org units" ON org_units
  FOR ALL USING (
    hr_has_role(auth.uid(), company_id, 'hr_officer') OR
    hr_has_role(auth.uid(), company_id, 'hr_manager') OR
    hr_has_role(auth.uid(), company_id, 'owner')
  );

-- سياسات الأمان للموظفين
CREATE POLICY "Users can view employees in their company" ON hr_employees
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "HR staff can manage employees" ON hr_employees
  FOR ALL USING (
    hr_has_role(auth.uid(), company_id, 'hr_officer') OR
    hr_has_role(auth.uid(), company_id, 'hr_manager') OR
    hr_has_role(auth.uid(), company_id, 'owner')
  );

-- سياسات الأمان لأدوار المستخدمين
CREATE POLICY "Users can view roles in their company" ON hr_user_roles
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "HR managers can manage user roles" ON hr_user_roles
  FOR ALL USING (
    hr_has_role(auth.uid(), company_id, 'hr_manager') OR
    hr_has_role(auth.uid(), company_id, 'owner')
  );

-- سياسات الأمان لقوالب سير العمل
CREATE POLICY "Users can view workflow templates in their company" ON workflow_templates
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "HR officers can manage workflow templates" ON workflow_templates
  FOR ALL USING (
    hr_has_role(auth.uid(), company_id, 'hr_officer') OR
    hr_has_role(auth.uid(), company_id, 'hr_manager') OR
    hr_has_role(auth.uid(), company_id, 'owner')
  );

-- سياسات الأمان للطلبات
CREATE POLICY "Users can view requests in their company" ON hr_requests
  FOR SELECT USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Employees can create their own requests" ON hr_requests
  FOR INSERT WITH CHECK (
    employee_id IN (
      SELECT id FROM hr_employees 
      WHERE user_id = auth.uid() AND company_id = get_user_company_id(auth.uid())
    )
  );

CREATE POLICY "HR staff can update requests" ON hr_requests
  FOR UPDATE USING (
    hr_has_role(auth.uid(), company_id, 'hr_officer') OR
    hr_has_role(auth.uid(), company_id, 'hr_manager') OR
    hr_has_role(auth.uid(), company_id, 'line_manager') OR
    hr_has_role(auth.uid(), company_id, 'owner')
  );

-- سياسات الأمان للموافقات
CREATE POLICY "Users can view approvals in their company" ON hr_approvals
  FOR SELECT USING (
    request_id IN (
      SELECT id FROM hr_requests 
      WHERE company_id = get_user_company_id(auth.uid())
    )
  );

CREATE POLICY "Approvers can manage approvals" ON hr_approvals
  FOR ALL USING (
    request_id IN (
      SELECT id FROM hr_requests 
      WHERE company_id = get_user_company_id(auth.uid())
    )
  );