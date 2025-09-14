-- إضافة policy للسماح بعرض تتبع الطلبات
DROP POLICY IF EXISTS "Allow viewing application tracking" ON application_tracking;
CREATE POLICY "Allow viewing application tracking" 
ON application_tracking FOR SELECT 
USING (true);