-- إنشاء جداول نظام الوظائف والتقديم

-- جدول الأقسام للوظائف
CREATE TABLE career_departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول الوظائف المتاحة
CREATE TABLE job_openings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_en TEXT,
  department_id UUID REFERENCES career_departments(id),
  location TEXT NOT NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('full_time', 'part_time', 'contract', 'internship')),
  description TEXT NOT NULL,
  requirements JSONB DEFAULT '[]',
  benefits JSONB DEFAULT '[]',
  salary_range_min NUMERIC,
  salary_range_max NUMERIC,
  salary_note TEXT DEFAULT 'حسب الخبرة',
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول طلبات التوظيف
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_opening_id UUID REFERENCES job_openings(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interview_scheduled', 'interview_completed', 'accepted', 'rejected')),
  notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول متابعة حالة الطلبات للمتقدمين
CREATE TABLE application_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  message TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إدراج بيانات تجريبية للأقسام
INSERT INTO career_departments (name, name_en, description) VALUES
('تكنولوجيا المعلومات', 'Information Technology', 'قسم تطوير وصيانة الأنظمة التقنية'),
('الموارد البشرية', 'Human Resources', 'قسم إدارة شؤون الموظفين والتوظيف'),
('المبيعات والتسويق', 'Sales & Marketing', 'قسم المبيعات والتسويق الرقمي'),
('العمليات والإدارة', 'Operations & Management', 'قسم العمليات التشغيلية والإدارة'),
('المالية والمحاسبة', 'Finance & Accounting', 'قسم المالية والمحاسبة'),
('خدمة العملاء', 'Customer Service', 'قسم خدمة ودعم العملاء'),
('البحث والتطوير', 'Research & Development', 'قسم البحث والتطوير والابتكار');

-- إدراج وظائف تجريبية
INSERT INTO job_openings (title, title_en, department_id, location, job_type, description, requirements, benefits, salary_range_min, salary_range_max) 
SELECT 
  'مطور واجهة أمامية',
  'Frontend Developer',
  d.id,
  'الرياض / عن بُعد',
  'full_time',
  'نبحث عن مطور واجهة أمامية متمرس للانضمام إلى فريقنا التقني لتطوير منصة بُعد HR وتحسين تجربة المستخدم.',
  '["خبرة 3+ سنوات في تطوير الويب", "إتقان React.js و Next.js", "خبرة في TypeScript", "معرفة بـ Tailwind CSS", "فهم مبادئ UX/UI", "إجادة اللغة العربية والإنجليزية"]'::jsonb,
  '["تأمين صحي شامل", "إجازات سنوية 30 يوماً", "دورات تدريبية مدفوعة", "بيئة عمل مرنة", "فرص ترقية سريعة", "مكافآت أداء"]'::jsonb,
  8000,
  15000
FROM career_departments d WHERE d.name = 'تكنولوجيا المعلومات';

INSERT INTO job_openings (title, title_en, department_id, location, job_type, description, requirements, benefits, salary_range_min, salary_range_max) 
SELECT 
  'مطور خلفية (Backend)',
  'Backend Developer',
  d.id,
  'جدة / الرياض',
  'full_time',
  'مطلوب مطور خلفية لتطوير وصيانة APIs ونظام قاعدة البيانات لمنصة بُعد HR.',
  '["خبرة 4+ سنوات في تطوير الخلفية", "إتقان Node.js أو Python", "خبرة مع PostgreSQL", "معرفة بـ REST APIs", "خبرة في Docker", "فهم مبادئ الأمان"]'::jsonb,
  '["تأمين صحي شامل", "إجازات سنوية 30 يوماً", "دورات تدريبية", "بدل مواصلات", "وجبات مجانية"]'::jsonb,
  10000,
  18000
FROM career_departments d WHERE d.name = 'تكنولوجيا المعلومات';

INSERT INTO job_openings (title, title_en, department_id, location, job_type, description, requirements, benefits) 
SELECT 
  'أخصائي موارد بشرية',
  'HR Specialist',
  d.id,
  'الرياض',
  'full_time',
  'نبحث عن أخصائي موارد بشرية للانضمام إلى فريقنا وإدارة عمليات التوظيف والتطوير المهني.',
  '["شهادة بكالوريوس في الموارد البشرية", "خبرة سنتين في مجال HR", "معرفة بقوانين العمل السعودية", "مهارات تواصل ممتازة", "إجادة برامج Office"]'::jsonb,
  '["تأمين صحي", "إجازات سنوية", "دورات تطوير مهني", "بيئة عمل داعمة"]'::jsonb
FROM career_departments d WHERE d.name = 'الموارد البشرية';

INSERT INTO job_openings (title, title_en, department_id, location, job_type, description, requirements, benefits) 
SELECT 
  'مختص تسويق رقمي',
  'Digital Marketing Specialist',
  d.id,
  'جدة / عن بُعد',
  'full_time',
  'مطلوب مختص تسويق رقمي لإدارة الحملات التسويقية وتعزيز الحضور الرقمي لمنصة بُعد HR.',
  '["خبرة 2+ سنوات في التسويق الرقمي", "إتقان Google Ads و Facebook Ads", "معرفة بـ SEO و SEM", "مهارات في تحليل البيانات", "إبداع في المحتوى"]'::jsonb,
  '["تأمين صحي", "مرونة في العمل", "حوافز على الأداء", "دورات تدريبية"]'::jsonb
FROM career_departments d WHERE d.name = 'المبيعات والتسويق';

-- تفعيل Row Level Security
ALTER TABLE career_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_tracking ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للأقسام (قراءة عامة)
CREATE POLICY "Anyone can view career departments" ON career_departments FOR SELECT USING (is_active = true);

-- سياسات الأمان للوظائف (قراءة عامة للوظائف النشطة)
CREATE POLICY "Anyone can view active job openings" ON job_openings FOR SELECT USING (is_active = true);

-- سياسات إدارة الوظائف (للمسؤولين فقط)
CREATE POLICY "Admins can manage job openings" ON job_openings FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email LIKE '%@boudhr.com'
  )
);

-- سياسات طلبات التوظيف
CREATE POLICY "Anyone can submit job applications" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Applicants can view their own applications" ON job_applications FOR SELECT USING (applicant_email = auth.email());
CREATE POLICY "Admins can manage all applications" ON job_applications FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email LIKE '%@boudhr.com'
  )
);

-- سياسات متابعة الطلبات
CREATE POLICY "Applicants can view their application tracking" ON application_tracking FOR SELECT USING (
  application_id IN (
    SELECT id FROM job_applications WHERE applicant_email = auth.email()
  )
);

CREATE POLICY "Admins can manage application tracking" ON application_tracking FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email LIKE '%@boudhr.com'
  )
);

-- إضافة triggers للتحديث التلقائي
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_career_departments_updated_at BEFORE UPDATE ON career_departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_openings_updated_at BEFORE UPDATE ON job_openings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- دالة لتحديث عداد المشاهدات
CREATE OR REPLACE FUNCTION increment_job_views()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE job_openings SET views_count = views_count + 1 WHERE id = NEW.job_opening_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;