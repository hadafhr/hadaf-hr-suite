-- Create enum types for legal system
CREATE TYPE legal_case_status AS ENUM ('pending', 'in_progress', 'resolved', 'appealed', 'closed');
CREATE TYPE legal_case_type AS ENUM ('labor_dispute', 'commercial_contract', 'administrative_dispute', 'disciplinary_action', 'compensation_claim', 'regulatory_violation');
CREATE TYPE contract_status AS ENUM ('draft', 'active', 'expired', 'terminated', 'pending_renewal');
CREATE TYPE contract_type AS ENUM ('employment', 'commercial', 'service', 'confidentiality', 'partnership', 'consulting');
CREATE TYPE correspondence_type AS ENUM ('outgoing', 'incoming', 'internal');
CREATE TYPE violation_severity AS ENUM ('minor', 'moderate', 'major', 'critical');
CREATE TYPE session_status AS ENUM ('scheduled', 'completed', 'postponed', 'cancelled');

-- Legal Cases Table
CREATE TABLE public.legal_cases (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.boud_companies(id),
    case_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    case_type legal_case_type NOT NULL,
    status legal_case_status NOT NULL DEFAULT 'pending',
    plaintiff_name TEXT,
    defendant_name TEXT,
    court_name TEXT,
    judge_name TEXT,
    lawyer_name TEXT,
    case_value DECIMAL(15,2),
    filing_date DATE NOT NULL,
    hearing_date DATE,
    resolution_date DATE,
    employee_id UUID REFERENCES public.boud_employees(id),
    assigned_lawyer_id UUID,
    priority_level INTEGER DEFAULT 3 CHECK (priority_level BETWEEN 1 AND 5),
    notes TEXT,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Legal Contracts Table
CREATE TABLE public.legal_contracts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.boud_companies(id),
    contract_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    contract_type contract_type NOT NULL,
    status contract_status NOT NULL DEFAULT 'draft',
    employee_id UUID REFERENCES public.boud_employees(id),
    party_name TEXT NOT NULL,
    party_contact TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    renewal_date DATE,
    contract_value DECIMAL(15,2),
    currency TEXT DEFAULT 'SAR',
    auto_renewal BOOLEAN DEFAULT false,
    renewal_period INTEGER, -- in months
    terms_conditions TEXT,
    special_clauses TEXT,
    contract_file_url TEXT,
    signed_date DATE,
    signed_by TEXT,
    witness_name TEXT,
    digital_signature BOOLEAN DEFAULT false,
    e_signature_id TEXT,
    notes TEXT,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Legal Violations Table
CREATE TABLE public.legal_violations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.boud_companies(id),
    employee_id UUID REFERENCES public.boud_employees(id),
    disciplinary_action_id UUID REFERENCES public.disciplinary_actions(id),
    violation_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    violation_date DATE NOT NULL,
    severity violation_severity NOT NULL,
    category TEXT NOT NULL,
    legal_reference TEXT,
    penalty_amount DECIMAL(10,2) DEFAULT 0,
    penalty_description TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    resolution_date DATE,
    resolution_notes TEXT,
    repeat_violation BOOLEAN DEFAULT false,
    previous_violation_count INTEGER DEFAULT 0,
    legal_consequences TEXT,
    recommended_action TEXT,
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Legal Correspondence Table
CREATE TABLE public.legal_correspondence (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.boud_companies(id),
    reference_number TEXT NOT NULL UNIQUE,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    correspondence_type correspondence_type NOT NULL,
    sender_name TEXT,
    sender_title TEXT,
    sender_organization TEXT,
    sender_email TEXT,
    sender_phone TEXT,
    recipient_name TEXT,
    recipient_title TEXT,
    recipient_organization TEXT,
    recipient_email TEXT,
    recipient_phone TEXT,
    related_case_id UUID REFERENCES public.legal_cases(id),
    related_contract_id UUID REFERENCES public.legal_contracts(id),
    priority_level INTEGER DEFAULT 3 CHECK (priority_level BETWEEN 1 AND 5),
    due_date DATE,
    response_required BOOLEAN DEFAULT false,
    response_deadline DATE,
    response_received BOOLEAN DEFAULT false,
    response_date DATE,
    status TEXT NOT NULL DEFAULT 'pending',
    language_code TEXT DEFAULT 'ar',
    official_stamp BOOLEAN DEFAULT false,
    delivery_method TEXT DEFAULT 'email',
    tracking_number TEXT,
    delivery_status TEXT DEFAULT 'pending',
    delivered_at TIMESTAMP WITH TIME ZONE,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Court Sessions Table
CREATE TABLE public.court_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    legal_case_id UUID REFERENCES public.legal_cases(id) NOT NULL,
    session_number INTEGER NOT NULL,
    session_date DATE NOT NULL,
    session_time TIME,
    court_name TEXT NOT NULL,
    court_room TEXT,
    judge_name TEXT,
    session_type TEXT NOT NULL DEFAULT 'hearing',
    status session_status NOT NULL DEFAULT 'scheduled',
    duration_minutes INTEGER,
    attendees JSONB DEFAULT '[]'::jsonb,
    agenda TEXT,
    minutes TEXT,
    decisions TEXT,
    next_session_date DATE,
    postponement_reason TEXT,
    evidence_presented JSONB DEFAULT '[]'::jsonb,
    witness_testimonies TEXT,
    lawyer_notes TEXT,
    outcome TEXT,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Legal Notifications Table
CREATE TABLE public.legal_notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.boud_companies(id),
    recipient_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    notification_type TEXT NOT NULL,
    related_table TEXT,
    related_id UUID,
    priority_level INTEGER DEFAULT 3 CHECK (priority_level BETWEEN 1 AND 5),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    email_sent BOOLEAN DEFAULT false,
    sms_sent BOOLEAN DEFAULT false,
    push_sent BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Legal Document Templates Table
CREATE TABLE public.legal_document_templates (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES public.boud_companies(id),
    template_name TEXT NOT NULL,
    template_category TEXT NOT NULL,
    template_type TEXT NOT NULL,
    language_code TEXT NOT NULL DEFAULT 'ar',
    template_content TEXT NOT NULL,
    template_variables JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    is_official BOOLEAN DEFAULT false,
    approval_required BOOLEAN DEFAULT false,
    version_number INTEGER DEFAULT 1,
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_legal_cases_company_status ON public.legal_cases(company_id, status);
CREATE INDEX idx_legal_cases_case_number ON public.legal_cases(case_number);
CREATE INDEX idx_legal_cases_employee ON public.legal_cases(employee_id);
CREATE INDEX idx_legal_cases_filing_date ON public.legal_cases(filing_date);

CREATE INDEX idx_legal_contracts_company_status ON public.legal_contracts(company_id, status);
CREATE INDEX idx_legal_contracts_contract_number ON public.legal_contracts(contract_number);
CREATE INDEX idx_legal_contracts_employee ON public.legal_contracts(employee_id);
CREATE INDEX idx_legal_contracts_end_date ON public.legal_contracts(end_date);

CREATE INDEX idx_legal_violations_company ON public.legal_violations(company_id);
CREATE INDEX idx_legal_violations_employee ON public.legal_violations(employee_id);
CREATE INDEX idx_legal_violations_date ON public.legal_violations(violation_date);

CREATE INDEX idx_legal_correspondence_company ON public.legal_correspondence(company_id);
CREATE INDEX idx_legal_correspondence_type ON public.legal_correspondence(correspondence_type);
CREATE INDEX idx_legal_correspondence_status ON public.legal_correspondence(status);

CREATE INDEX idx_court_sessions_case ON public.court_sessions(legal_case_id);
CREATE INDEX idx_court_sessions_date ON public.court_sessions(session_date);

CREATE INDEX idx_legal_notifications_recipient ON public.legal_notifications(recipient_id, is_read);
CREATE INDEX idx_legal_notifications_scheduled ON public.legal_notifications(scheduled_for);

-- Enable Row Level Security
ALTER TABLE public.legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_correspondence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.court_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_document_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Legal Cases Policies
CREATE POLICY "HR and Legal managers can manage legal cases" ON public.legal_cases
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'legal_manager'::user_role)
);

CREATE POLICY "Employees can view their related legal cases" ON public.legal_cases
FOR SELECT USING (
    employee_id IN (
        SELECT id FROM public.boud_employees WHERE user_id = auth.uid()
    )
);

-- Legal Contracts Policies
CREATE POLICY "HR and Legal managers can manage contracts" ON public.legal_contracts
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'legal_manager'::user_role)
);

CREATE POLICY "Employees can view their contracts" ON public.legal_contracts
FOR SELECT USING (
    employee_id IN (
        SELECT id FROM public.boud_employees WHERE user_id = auth.uid()
    )
);

-- Legal Violations Policies
CREATE POLICY "HR and Legal managers can manage violations" ON public.legal_violations
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'legal_manager'::user_role)
);

-- Legal Correspondence Policies
CREATE POLICY "HR and Legal managers can manage correspondence" ON public.legal_correspondence
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'legal_manager'::user_role)
);

-- Court Sessions Policies
CREATE POLICY "HR and Legal managers can manage court sessions" ON public.court_sessions
FOR ALL USING (
    legal_case_id IN (
        SELECT id FROM public.legal_cases 
        WHERE boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
              boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
              boud_has_role(auth.uid(), company_id, 'legal_manager'::user_role)
    )
);

-- Legal Notifications Policies
CREATE POLICY "Users can view their notifications" ON public.legal_notifications
FOR SELECT USING (recipient_id = auth.uid());

CREATE POLICY "HR and Legal managers can manage notifications" ON public.legal_notifications
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'legal_manager'::user_role)
);

-- Legal Document Templates Policies
CREATE POLICY "HR and Legal managers can manage templates" ON public.legal_document_templates
FOR ALL USING (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role) OR
    boud_has_role(auth.uid(), company_id, 'legal_manager'::user_role)
);

-- Update timestamp triggers
CREATE TRIGGER update_legal_cases_updated_at
    BEFORE UPDATE ON public.legal_cases
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_contracts_updated_at
    BEFORE UPDATE ON public.legal_contracts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_violations_updated_at
    BEFORE UPDATE ON public.legal_violations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_correspondence_updated_at
    BEFORE UPDATE ON public.legal_correspondence
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_court_sessions_updated_at
    BEFORE UPDATE ON public.court_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_document_templates_updated_at
    BEFORE UPDATE ON public.legal_document_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();