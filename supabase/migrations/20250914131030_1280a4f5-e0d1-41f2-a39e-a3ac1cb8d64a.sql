-- إضافة policy للسماح بعرض تتبع الطلبات
CREATE POLICY IF NOT EXISTS "Allow viewing application tracking" 
ON application_tracking FOR SELECT 
USING (true);