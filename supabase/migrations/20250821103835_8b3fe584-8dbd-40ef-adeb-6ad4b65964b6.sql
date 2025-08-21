-- إنشاء bucket للفواتير في التخزين
INSERT INTO storage.buckets (id, name, public) 
VALUES ('invoices', 'invoices', false)
ON CONFLICT (id) DO NOTHING;

-- سياسات التخزين للفواتير
CREATE POLICY "Users can view their invoice files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'invoices' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "System can upload invoice files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'invoices');

CREATE POLICY "System can update invoice files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'invoices');