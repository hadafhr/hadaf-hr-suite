-- Create storage bucket for employee avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('employee-avatars', 'employee-avatars', true);

-- Create RLS policies for employee avatars
CREATE POLICY "Employee avatars are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'employee-avatars');

CREATE POLICY "Authenticated users can upload employee avatars" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'employee-avatars' AND auth.role() = 'authenticated');

CREATE POLICY "HR can update employee avatars" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'employee-avatars' AND auth.role() = 'authenticated');

CREATE POLICY "HR can delete employee avatars" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'employee-avatars' AND auth.role() = 'authenticated');