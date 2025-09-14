-- تفعيل RLS على الجداول
ALTER TABLE career_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;

-- إضافة policies للقراءة العامة للأقسام الوظيفية
CREATE POLICY "Anyone can view active career departments" 
ON career_departments FOR SELECT 
USING (is_active = true);

-- إضافة policies للقراءة العامة للوظائف المتاحة
CREATE POLICY "Anyone can view active job openings" 
ON job_openings FOR SELECT 
USING (is_active = true);

-- إضافة policy للتقديم على الوظائف (للمستخدمين المسجلين)
CREATE POLICY "Anyone can submit job applications" 
ON job_applications FOR INSERT 
WITH CHECK (true);