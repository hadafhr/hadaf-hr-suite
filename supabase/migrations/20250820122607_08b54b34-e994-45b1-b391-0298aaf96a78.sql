-- Add RLS policies for legal system tables (using existing roles only)

-- Legal Cases Policies
CREATE POLICY "HR and super admins can manage legal cases" ON public.legal_cases
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

CREATE POLICY "Employees can view their related legal cases" ON public.legal_cases
FOR SELECT USING (
    employee_id IN (
        SELECT id FROM public.boud_employees WHERE user_id = auth.uid()
    )
);

-- Legal Contracts Policies
CREATE POLICY "HR and super admins can manage contracts" ON public.legal_contracts
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

CREATE POLICY "Employees can view their contracts" ON public.legal_contracts
FOR SELECT USING (
    employee_id IN (
        SELECT id FROM public.boud_employees WHERE user_id = auth.uid()
    )
);

-- Legal Violations Policies
CREATE POLICY "HR and super admins can manage violations" ON public.legal_violations
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- Legal Correspondence Policies
CREATE POLICY "HR and super admins can manage correspondence" ON public.legal_correspondence
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- Court Sessions Policies
CREATE POLICY "HR and super admins can manage court sessions" ON public.court_sessions
FOR ALL USING (
    legal_case_id IN (
        SELECT id FROM public.legal_cases 
        WHERE boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
              boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    )
)
WITH CHECK (
    legal_case_id IN (
        SELECT id FROM public.legal_cases 
        WHERE boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
              boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    )
);

-- Legal Notifications Policies
CREATE POLICY "Users can view their notifications" ON public.legal_notifications
FOR SELECT USING (recipient_id = auth.uid());

CREATE POLICY "HR and super admins can manage notifications" ON public.legal_notifications
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- Legal Document Templates Policies
CREATE POLICY "HR and super admins can manage templates" ON public.legal_document_templates
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- Add sample data for testing (simplified)
DO $$
DECLARE
    sample_company_id UUID;
    sample_user_id UUID := auth.uid();
BEGIN
    -- Get the first company ID
    SELECT id INTO sample_company_id FROM public.boud_companies LIMIT 1;
    
    -- Only insert if company exists and user is authenticated
    IF sample_company_id IS NOT NULL AND sample_user_id IS NOT NULL THEN
        -- Insert sample legal cases
        INSERT INTO public.legal_cases (
            company_id, case_number, title, description, case_type, status,
            plaintiff_name, defendant_name, court_name, judge_name, lawyer_name,
            case_value, filing_date, hearing_date, priority_level, notes, created_by
        ) VALUES
        (
            sample_company_id,
            'LC-2024-001',
            'نزاع عمالي - إنهاء خدمة غير مبرر',
            'قضية إنهاء خدمة موظف دون مبرر قانوني مع المطالبة بالتعويض',
            'labor_dispute',
            'in_progress',
            'أحمد محمد الشهري',
            'شركة الخليج للتجارة المحدودة',
            'محكمة العمل بالرياض',
            'القاضي سعد العبدالله',
            'المحامي فهد الزهراني',
            50000.00,
            '2024-01-15',
            '2024-02-20',
            4,
            'قضية معقدة تتطلب متابعة دقيقة',
            sample_user_id
        ),
        (
            sample_company_id,
            'LC-2024-002',
            'مخالفة تنظيمية - عدم تطبيق لائحة السعودة',
            'مخالفة من وزارة الموارد البشرية بخصوص عدم الالتزام بنسب السعودة',
            'regulatory_violation',
            'pending',
            'وزارة الموارد البشرية والتنمية الاجتماعية',
            'شركة النور للخدمات',
            'اللجنة الإدارية',
            'رئيس اللجنة خالد المطيري',
            'المحامية سارة الفهد',
            25000.00,
            '2024-02-01',
            '2024-02-25',
            5,
            'يجب الاستعداد بالمستندات المطلوبة',
            sample_user_id
        );

        -- Insert sample legal contracts
        INSERT INTO public.legal_contracts (
            company_id, contract_number, title, description, contract_type, status,
            party_name, party_contact, start_date, end_date, contract_value,
            currency, auto_renewal, renewal_period, terms_conditions, created_by
        ) VALUES
        (
            sample_company_id,
            'CT-2024-001',
            'عقد خدمات استشارية قانونية',
            'عقد تقديم الخدمات الاستشارية القانونية للشركة',
            'consulting',
            'active',
            'مكتب الشهراني للمحاماة والاستشارات',
            'info@alshahrani-law.com',
            '2024-01-01',
            '2024-12-31',
            120000.00,
            'SAR',
            true,
            12,
            'يشمل العقد جميع الخدمات القانونية والاستشارية',
            sample_user_id
        );

        -- Insert sample document template
        INSERT INTO public.legal_document_templates (
            company_id, template_name, template_category, template_type,
            language_code, template_content, template_variables, is_active, is_official, created_by
        ) VALUES
        (
            sample_company_id,
            'خطاب إنذار موظف',
            'مراسلات إدارية',
            'إنذار',
            'ar',
            'بسم الله الرحمن الرحيم

السيد/ة {{employee_name}} المحترم/ة
{{employee_position}}

السلام عليكم ورحمة الله وبركاته،

نحيطكم علماً بأنه قد لوحظ {{violation_description}} بتاريخ {{violation_date}}.

وعليه، نحيطكم علماً بضرورة تجنب تكرار هذا السلوك، وإلا فإن الشركة ستضطر لاتخاذ الإجراءات التأديبية المناسبة.

مع تحياتنا،
إدارة الموارد البشرية
{{company_name}}',
            '["employee_name", "employee_position", "violation_description", "violation_date", "company_name"]'::jsonb,
            true,
            true,
            sample_user_id
        );
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        -- Ignore errors during sample data insertion
        NULL;
END $$;