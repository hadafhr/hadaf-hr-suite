-- إنشاء جدول عوامل التقييم الأساسية
CREATE TABLE evaluation_factors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES boud_companies(id) ON DELETE CASCADE,
  factor_code TEXT NOT NULL,
  factor_name TEXT NOT NULL,
  factor_name_en TEXT,
  description TEXT,
  weight_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  category TEXT NOT NULL DEFAULT 'performance',
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_mandatory BOOLEAN NOT NULL DEFAULT false,
  evaluation_method TEXT NOT NULL DEFAULT 'scale', -- scale, checklist, text, numeric
  min_score NUMERIC(3,1) DEFAULT 1.0,
  max_score NUMERIC(3,1) DEFAULT 5.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- إنشاء جدول معايير التقييم التفصيلية
CREATE TABLE evaluation_criteria (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  factor_id UUID REFERENCES evaluation_factors(id) ON DELETE CASCADE,
  criteria_code TEXT NOT NULL,
  criteria_name TEXT NOT NULL,
  criteria_name_en TEXT,
  description TEXT,
  weight_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  evaluation_levels JSONB NOT NULL DEFAULT '[]', -- مستويات التقييم والدرجات
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء جدول قوالب التقييم
CREATE TABLE evaluation_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES boud_companies(id) ON DELETE CASCADE,
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL DEFAULT 'annual', -- annual, semi_annual, quarterly, probation
  description TEXT,
  total_weight NUMERIC(5,2) NOT NULL DEFAULT 100.00,
  passing_score NUMERIC(5,2) NOT NULL DEFAULT 60.00,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- إنشاء جدول ربط القوالب بالعوامل
CREATE TABLE evaluation_template_factors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID REFERENCES evaluation_templates(id) ON DELETE CASCADE,
  factor_id UUID REFERENCES evaluation_factors(id) ON DELETE CASCADE,
  weight_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  is_required BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إدراج عوامل التقييم الأساسية
INSERT INTO evaluation_factors (company_id, factor_code, factor_name, description, weight_percentage, category, evaluation_method, min_score, max_score) VALUES
-- عوامل الأداء الوظيفي (40%)
(NULL, 'JOB_001', 'جودة العمل', 'مستوى الدقة والإتقان في أداء المهام المطلوبة', 15.00, 'job_performance', 'scale', 1.0, 5.0),
(NULL, 'JOB_002', 'كمية العمل', 'مقدار الإنتاجية وحجم العمل المنجز', 10.00, 'job_performance', 'scale', 1.0, 5.0),
(NULL, 'JOB_003', 'المعرفة المهنية', 'مستوى الخبرة والمعرفة في مجال التخصص', 10.00, 'job_performance', 'scale', 1.0, 5.0),
(NULL, 'JOB_004', 'الالتزام بالمواعيد النهائية', 'قدرة على إنجاز المهام في الوقت المحدد', 5.00, 'job_performance', 'scale', 1.0, 5.0),

-- عوامل السلوكيات والانضباط (25%)
(NULL, 'BEH_001', 'الانضباط في الحضور', 'الالتزام بمواعيد الحضور والانصراف', 8.00, 'behavior', 'scale', 1.0, 5.0),
(NULL, 'BEH_002', 'اتباع السياسات والإجراءات', 'الالتزام بقوانين وسياسات الشركة', 7.00, 'behavior', 'scale', 1.0, 5.0),
(NULL, 'BEH_003', 'الأمانة والنزاهة', 'مستوى الصدق والأمانة في العمل', 5.00, 'behavior', 'scale', 1.0, 5.0),
(NULL, 'BEH_004', 'احترام الزملاء والعملاء', 'مستوى التعامل الإيجابي مع الآخرين', 5.00, 'behavior', 'scale', 1.0, 5.0),

-- عوامل التواصل والعمل الجماعي (20%)
(NULL, 'COM_001', 'التواصل الفعال', 'قدرة على التواصل بوضوح وفعالية', 8.00, 'communication', 'scale', 1.0, 5.0),
(NULL, 'COM_002', 'العمل ضمن الفريق', 'قدرة على التعاون والعمل مع الآخرين', 7.00, 'communication', 'scale', 1.0, 5.0),
(NULL, 'COM_003', 'القيادة والتأثير', 'قدرة على قيادة الآخرين والتأثير الإيجابي', 5.00, 'communication', 'scale', 1.0, 5.0),

-- عوامل التطوير والابتكار (10%)
(NULL, 'DEV_001', 'التعلم والتطوير', 'رغبة في التعلم واكتساب مهارات جديدة', 5.00, 'development', 'scale', 1.0, 5.0),
(NULL, 'DEV_002', 'الابتكار وحل المشكلات', 'قدرة على إيجاد حلول إبداعية', 3.00, 'development', 'scale', 1.0, 5.0),
(NULL, 'DEV_003', 'المبادرة الشخصية', 'قدرة على اتخاذ المبادرات وتحمل المسؤولية', 2.00, 'development', 'scale', 1.0, 5.0),

-- عوامل خاصة بالمناصب القيادية (5%)
(NULL, 'LEAD_001', 'إدارة الفريق', 'قدرة على إدارة وتوجيه الفريق بفعالية', 3.00, 'leadership', 'scale', 1.0, 5.0),
(NULL, 'LEAD_002', 'اتخاذ القرارات', 'قدرة على اتخاذ قرارات صحيحة وفي الوقت المناسب', 2.00, 'leadership', 'scale', 1.0, 5.0);

-- إدراج معايير التقييم التفصيلية
INSERT INTO evaluation_criteria (factor_id, criteria_code, criteria_name, description, weight_percentage, evaluation_levels) 
SELECT 
  ef.id,
  'CRIT_' || ef.factor_code || '_001',
  'الإتقان والدقة',
  'مستوى الإتقان والدقة في تنفيذ المهام',
  40.00,
  '[
    {"level": 1, "name": "ضعيف جداً", "description": "أخطاء كثيرة ونوعية العمل ضعيفة", "score": 1},
    {"level": 2, "name": "ضعيف", "description": "أخطاء متكررة ونوعية العمل دون المستوى", "score": 2},
    {"level": 3, "name": "مقبول", "description": "نوعية عمل مقبولة مع بعض الأخطاء", "score": 3},
    {"level": 4, "name": "جيد", "description": "نوعية عمل جيدة مع أخطاء قليلة", "score": 4},
    {"level": 5, "name": "ممتاز", "description": "نوعية عمل ممتازة خالية من الأخطاء", "score": 5}
  ]'
FROM evaluation_factors ef WHERE ef.factor_code = 'JOB_001';

-- إنشاء قالب تقييم افتراضي
INSERT INTO evaluation_templates (company_id, template_name, template_type, description, total_weight, passing_score, is_default) VALUES
(NULL, 'قالب التقييم السنوي الشامل', 'annual', 'قالب شامل لتقييم الأداء السنوي يغطي جميع جوانب الأداء', 100.00, 60.00, true);

-- ربط العوامل بالقالب الافتراضي
INSERT INTO evaluation_template_factors (template_id, factor_id, weight_percentage, display_order)
SELECT 
  et.id,
  ef.id,
  ef.weight_percentage,
  ROW_NUMBER() OVER (ORDER BY ef.factor_code)
FROM evaluation_templates et
CROSS JOIN evaluation_factors ef
WHERE et.template_name = 'قالب التقييم السنوي الشامل';

-- إنشاء فهارس للأداء
CREATE INDEX idx_evaluation_factors_company_id ON evaluation_factors(company_id);
CREATE INDEX idx_evaluation_factors_category ON evaluation_factors(category);
CREATE INDEX idx_evaluation_criteria_factor_id ON evaluation_criteria(factor_id);
CREATE INDEX idx_evaluation_template_factors_template_id ON evaluation_template_factors(template_id);

-- إنشاء تريجرز لتحديث التواريخ
CREATE TRIGGER update_evaluation_factors_updated_at
  BEFORE UPDATE ON evaluation_factors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evaluation_criteria_updated_at
  BEFORE UPDATE ON evaluation_criteria
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evaluation_templates_updated_at
  BEFORE UPDATE ON evaluation_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();