-- إنشاء bucket للسير الذاتية
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'resumes', 
  'resumes', 
  false,  -- ليس عام لحماية خصوصية المتقدمين
  10485760, -- 10MB حد أقصى
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- سياسات الأمان للـ bucket
-- يمكن للجميع رفع السير الذاتية
CREATE POLICY "Anyone can upload resumes" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'resumes' AND
  -- التأكد من أن اسم الملف يحتوي على البريد الإلكتروني
  name ~ '^[^@]+@[^@]+\.[^@]+-[0-9]+\.(pdf|doc|docx)$'
);

-- يمكن للمسؤولين قراءة جميع السير الذاتية
CREATE POLICY "Admins can view all resumes" ON storage.objects
FOR SELECT USING (
  bucket_id = 'resumes' AND
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email LIKE '%@boudhr.com'
  )
);

-- المتقدمون يمكنهم قراءة سيرهم الذاتية فقط
CREATE POLICY "Applicants can view their own resumes" ON storage.objects
FOR SELECT USING (
  bucket_id = 'resumes' AND
  name ~ ('^' || COALESCE(auth.email(), 'no-email') || '-[0-9]+\.(pdf|doc|docx)$')
);

-- تحديث دالة increment_job_views لتعمل بشكل صحيح
DROP FUNCTION IF EXISTS increment_job_views();

-- إنشاء دالة محسنة لتسجيل مشاهدات الوظائف
CREATE OR REPLACE FUNCTION public.log_job_view(job_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- تحديث عداد المشاهدات
  UPDATE job_openings 
  SET views_count = views_count + 1 
  WHERE id = job_id AND is_active = true;
  
  -- يمكن إضافة تسجيل تفصيلي لاحقاً إذا لزم الأمر
END;
$$;

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_job_openings_department_active ON job_openings(department_id, is_active);
CREATE INDEX IF NOT EXISTS idx_job_openings_location ON job_openings(location) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_job_openings_job_type ON job_openings(job_type) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_job_openings_posted_at ON job_openings(posted_at DESC) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(applicant_email);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_opening_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);

-- تحديث الـ trigger للتطبيقات
CREATE OR REPLACE FUNCTION public.update_job_application_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE job_openings 
    SET applications_count = applications_count + 1 
    WHERE id = NEW.job_opening_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE job_openings 
    SET applications_count = GREATEST(applications_count - 1, 0)
    WHERE id = OLD.job_opening_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- إنشاء الـ triggers
DROP TRIGGER IF EXISTS trigger_update_job_application_count_insert ON job_applications;
DROP TRIGGER IF EXISTS trigger_update_job_application_count_delete ON job_applications;

CREATE TRIGGER trigger_update_job_application_count_insert
  AFTER INSERT ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_job_application_count();

CREATE TRIGGER trigger_update_job_application_count_delete
  AFTER DELETE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_job_application_count();