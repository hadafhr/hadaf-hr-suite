-- إنشاء جداول النظام القانوني الذكي

-- جدول قوالب العقود
CREATE TABLE legal_contract_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  template_name_en TEXT,
  category TEXT NOT NULL, -- Employment, Supply, Consulting, Partnership
  description TEXT,
  template_content JSONB NOT NULL, -- AI-generated template structure
  clauses JSONB, -- Standard clauses
  variables JSONB, -- Template variables
  language TEXT DEFAULT 'ar',
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول العقود الذكية
CREATE TABLE legal_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number TEXT UNIQUE NOT NULL,
  contract_title TEXT NOT NULL,
  template_id UUID REFERENCES legal_contract_templates(id),
  contract_type TEXT NOT NULL,
  party_a JSONB NOT NULL, -- Company details
  party_b JSONB NOT NULL, -- Employee/Supplier details
  contract_content JSONB NOT NULL, -- Generated content
  terms_and_conditions JSONB,
  financial_terms JSONB, -- Salary, amount, etc.
  start_date DATE,
  end_date DATE,
  auto_renewal BOOLEAN DEFAULT false,
  renewal_period INTEGER, -- in months
  status TEXT DEFAULT 'draft', -- draft, active, expired, terminated
  department_id UUID,
  employee_id UUID,
  project_id UUID,
  ai_review_score NUMERIC(3,2), -- AI compliance score
  ai_risk_assessment JSONB, -- AI risk analysis
  expiry_alerts_sent INTEGER DEFAULT 0,
  e_signature_status TEXT DEFAULT 'pending', -- pending, signed, rejected
  signed_by JSONB, -- Digital signature details
  signed_at TIMESTAMP WITH TIME ZONE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول الامتثال التلقائي
CREATE TABLE legal_compliance_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_name TEXT NOT NULL,
  regulation_source TEXT NOT NULL, -- Saudi Labor Law, GOSI, Mudad, etc.
  rule_category TEXT NOT NULL,
  rule_content JSONB NOT NULL,
  compliance_criteria JSONB NOT NULL,
  auto_check_enabled BOOLEAN DEFAULT true,
  priority_level TEXT DEFAULT 'medium', -- low, medium, high, critical
  last_updated_from_source TIMESTAMP WITH TIME ZONE,
  next_check_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول مراقبة الامتثال
CREATE TABLE legal_compliance_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id UUID REFERENCES legal_compliance_rules(id),
  entity_type TEXT NOT NULL, -- contract, employee, policy
  entity_id UUID NOT NULL,
  compliance_status TEXT DEFAULT 'pending', -- compliant, non_compliant, pending
  compliance_score NUMERIC(5,2),
  violations_found JSONB,
  ai_recommendations JSONB,
  risk_level TEXT DEFAULT 'low',
  check_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  next_check_date TIMESTAMP WITH TIME ZONE,
  auto_resolved BOOLEAN DEFAULT false,
  assigned_to UUID,
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول القضايا والنزاعات
CREATE TABLE legal_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number TEXT UNIQUE NOT NULL,
  case_title TEXT NOT NULL,
  case_type TEXT NOT NULL, -- labor_dispute, termination, contract_violation
  case_category TEXT NOT NULL, -- internal, external, court_case
  employee_id UUID,
  department_id UUID,
  description TEXT NOT NULL,
  case_status TEXT DEFAULT 'open', -- open, in_progress, resolved, closed
  priority_level TEXT DEFAULT 'medium',
  internal_external TEXT DEFAULT 'internal',
  legal_representative TEXT,
  court_details JSONB, -- Court info if external
  case_documents JSONB, -- Document IDs and metadata
  communications_log JSONB, -- All communications
  deadlines JSONB, -- Important dates and deadlines
  financial_impact JSONB, -- Estimated costs, settlements
  ai_strategy_recommendations JSONB, -- AI defense/settlement suggestions
  ai_outcome_prediction JSONB, -- AI prediction analysis
  ai_cost_estimate JSONB, -- AI cost estimation
  assigned_lawyer UUID,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول المهل والمواعيد القانونية
CREATE TABLE legal_deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  deadline_type TEXT NOT NULL, -- contract_expiry, court_hearing, filing_deadline
  related_entity_type TEXT, -- contract, case, compliance_rule
  related_entity_id UUID,
  due_date DATE NOT NULL,
  reminder_dates JSONB, -- Notification schedule
  priority_level TEXT DEFAULT 'medium',
  assigned_to UUID,
  status TEXT DEFAULT 'pending', -- pending, completed, overdue
  notifications_sent INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول التوقيعات الإلكترونية
CREATE TABLE legal_e_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL, -- Contract or document ID
  document_type TEXT NOT NULL, -- contract, agreement, policy
  signer_details JSONB NOT NULL, -- Name, ID, position
  signature_hash TEXT NOT NULL, -- Encrypted signature
  signature_metadata JSONB, -- IP, device, timestamp details
  signature_status TEXT DEFAULT 'pending', -- pending, signed, rejected, expired
  verification_code TEXT,
  signature_image_url TEXT,
  signed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  saudi_platform_integration JSONB, -- Integration with Saudi e-signature platforms
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول التحليلات والتقارير التنبؤية
CREATE TABLE legal_ai_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_type TEXT NOT NULL, -- risk_assessment, cost_prediction, trend_analysis
  analysis_scope TEXT NOT NULL, -- company_wide, department, specific_case
  scope_id UUID, -- Department ID or case ID
  ai_model_version TEXT DEFAULT '1.0',
  analysis_data JSONB NOT NULL, -- Input data for analysis
  analysis_results JSONB NOT NULL, -- AI analysis results
  risk_indicators JSONB, -- Risk flags and indicators
  predictions JSONB, -- Future predictions
  recommendations JSONB, -- AI recommendations
  confidence_score NUMERIC(3,2), -- AI confidence level
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول انتهاكات الموظفين المتكاملة
CREATE TABLE legal_employee_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  violation_type TEXT NOT NULL,
  violation_details JSONB NOT NULL,
  saudi_labor_law_article TEXT, -- المادة المنتهكة
  recommended_penalty TEXT,
  ai_penalty_recommendation JSONB, -- AI analysis for appropriate penalty
  penalty_applied TEXT,
  penalty_amount NUMERIC(10,2),
  compliance_check_passed BOOLEAN DEFAULT false,
  legal_review_required BOOLEAN DEFAULT true,
  created_by UUID,
  reviewed_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إنشاء الفهارس للأداء
CREATE INDEX idx_legal_contracts_status ON legal_contracts(status);
CREATE INDEX idx_legal_contracts_end_date ON legal_contracts(end_date);
CREATE INDEX idx_legal_contracts_employee_id ON legal_contracts(employee_id);
CREATE INDEX idx_legal_cases_status ON legal_cases(case_status);
CREATE INDEX idx_legal_cases_employee_id ON legal_cases(employee_id);
CREATE INDEX idx_legal_deadlines_due_date ON legal_deadlines(due_date);
CREATE INDEX idx_legal_compliance_monitoring_status ON legal_compliance_monitoring(compliance_status);

-- إنشاء RLS policies
ALTER TABLE legal_contract_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_compliance_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_compliance_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_e_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_ai_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_employee_violations ENABLE ROW LEVEL SECURITY;

-- Policies للوصول المتقدم
CREATE POLICY "HR can manage legal contracts" ON legal_contracts
FOR ALL USING (true); -- سنحدد صلاحيات أكثر تفصيلاً لاحقاً

CREATE POLICY "HR can manage legal cases" ON legal_cases
FOR ALL USING (true);

CREATE POLICY "HR can view legal analytics" ON legal_ai_analytics
FOR SELECT USING (true);

-- وظائف المساعدة
CREATE OR REPLACE FUNCTION generate_legal_contract_number()
RETURNS TEXT AS $$
DECLARE
  contract_number TEXT;
  current_year TEXT;
  sequence_num INTEGER;
BEGIN
  current_year := EXTRACT(YEAR FROM NOW())::TEXT;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(contract_number FROM 'LC-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM legal_contracts
  WHERE contract_number LIKE 'LC-' || current_year || '-%';
  
  contract_number := 'LC-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN contract_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION generate_legal_case_number()
RETURNS TEXT AS $$
DECLARE
  case_number TEXT;
  current_year TEXT;
  sequence_num INTEGER;
BEGIN
  current_year := EXTRACT(YEAR FROM NOW())::TEXT;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(case_number FROM 'CASE-' || current_year || '-(.*)') AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM legal_cases
  WHERE case_number LIKE 'CASE-' || current_year || '-%';
  
  case_number := 'CASE-' || current_year || '-' || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN case_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger لتحديث timestamps
CREATE OR REPLACE FUNCTION update_legal_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_legal_contracts_updated_at BEFORE UPDATE ON legal_contracts FOR EACH ROW EXECUTE FUNCTION update_legal_updated_at_column();
CREATE TRIGGER update_legal_cases_updated_at BEFORE UPDATE ON legal_cases FOR EACH ROW EXECUTE FUNCTION update_legal_updated_at_column();
CREATE TRIGGER update_legal_compliance_monitoring_updated_at BEFORE UPDATE ON legal_compliance_monitoring FOR EACH ROW EXECUTE FUNCTION update_legal_updated_at_column();