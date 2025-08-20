-- Create enum types for legal system (only if they don't exist)
DO $$ BEGIN
    CREATE TYPE legal_case_status AS ENUM ('pending', 'in_progress', 'resolved', 'appealed', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE legal_case_type AS ENUM ('labor_dispute', 'commercial_contract', 'administrative_dispute', 'disciplinary_action', 'compensation_claim', 'regulatory_violation');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE contract_status AS ENUM ('draft', 'active', 'expired', 'terminated', 'pending_renewal');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE contract_type AS ENUM ('employment', 'commercial', 'service', 'confidentiality', 'partnership', 'consulting');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE correspondence_type AS ENUM ('outgoing', 'incoming', 'internal');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE session_status AS ENUM ('scheduled', 'completed', 'postponed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Legal Cases Table
CREATE TABLE IF NOT EXISTS public.legal_cases (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID,
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
    employee_id UUID,
    assigned_lawyer_id UUID,
    priority_level INTEGER DEFAULT 3 CHECK (priority_level BETWEEN 1 AND 5),
    notes TEXT,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Legal Contracts Table
CREATE TABLE IF NOT EXISTS public.legal_contracts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID,
    contract_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    contract_type contract_type NOT NULL,
    status contract_status NOT NULL DEFAULT 'draft',
    employee_id UUID,
    party_name TEXT NOT NULL,
    party_contact TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    renewal_date DATE,
    contract_value DECIMAL(15,2),
    currency TEXT DEFAULT 'SAR',
    auto_renewal BOOLEAN DEFAULT false,
    renewal_period INTEGER,
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
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Legal Violations Table
CREATE TABLE IF NOT EXISTS public.legal_violations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID,
    employee_id UUID,
    disciplinary_action_id UUID,
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
    reviewed_by UUID,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Legal Correspondence Table
CREATE TABLE IF NOT EXISTS public.legal_correspondence (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID,
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
    related_case_id UUID,
    related_contract_id UUID,
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
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Court Sessions Table
CREATE TABLE IF NOT EXISTS public.court_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    legal_case_id UUID NOT NULL,
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
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Legal Notifications Table
CREATE TABLE IF NOT EXISTS public.legal_notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID,
    recipient_id UUID NOT NULL,
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
CREATE TABLE IF NOT EXISTS public.legal_document_templates (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID,
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
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance (only if they don't exist)
DO $$ BEGIN
    CREATE INDEX idx_legal_cases_company_status ON public.legal_cases(company_id, status);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_cases_case_number ON public.legal_cases(case_number);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_cases_employee ON public.legal_cases(employee_id);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_cases_filing_date ON public.legal_cases(filing_date);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_contracts_company_status ON public.legal_contracts(company_id, status);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_contracts_contract_number ON public.legal_contracts(contract_number);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_contracts_employee ON public.legal_contracts(employee_id);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_contracts_end_date ON public.legal_contracts(end_date);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_violations_company ON public.legal_violations(company_id);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_violations_employee ON public.legal_violations(employee_id);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_violations_date ON public.legal_violations(violation_date);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_correspondence_company ON public.legal_correspondence(company_id);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_correspondence_type ON public.legal_correspondence(correspondence_type);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_correspondence_status ON public.legal_correspondence(status);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_court_sessions_case ON public.court_sessions(legal_case_id);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_court_sessions_date ON public.court_sessions(session_date);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_notifications_recipient ON public.legal_notifications(recipient_id, is_read);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

DO $$ BEGIN
    CREATE INDEX idx_legal_notifications_scheduled ON public.legal_notifications(scheduled_for);
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

-- Enable Row Level Security
ALTER TABLE public.legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_correspondence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.court_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_document_templates ENABLE ROW LEVEL SECURITY;