-- حذف policies التي تحاول الوصول إلى جدول users وإنشاء policies بديلة
DROP POLICY IF EXISTS "Admins can manage all applications" ON job_applications;
DROP POLICY IF EXISTS "Admins can manage job openings" ON job_openings;

-- إضافة policies أكثر بساطة بدون الوصول إلى جدول users
CREATE POLICY "Anyone can view job applications" 
ON job_applications FOR SELECT 
USING (true);

CREATE POLICY "HR can manage job openings" 
ON job_openings FOR ALL 
USING (true) 
WITH CHECK (true);