-- تفعيل Row Level Security على الجداول الجديدة
ALTER TABLE evaluation_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_template_factors ENABLE ROW LEVEL SECURITY;