-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  employees INTEGER DEFAULT 0,
  plan TEXT NOT NULL DEFAULT 'basic' CHECK (plan IN ('basic', 'professional', 'enterprise', 'enterprise+')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'suspended', 'pending', 'trial')),
  industry TEXT,
  monthly_revenue DECIMAL(10,2) DEFAULT 0.00,
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access only
CREATE POLICY "Admins can view all clients" 
ON public.clients 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can insert clients" 
ON public.clients 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can update clients" 
ON public.clients 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

CREATE POLICY "Admins can delete clients" 
ON public.clients 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_clients_email ON public.clients(email);
CREATE INDEX idx_clients_status ON public.clients(status);
CREATE INDEX idx_clients_plan ON public.clients(plan);
CREATE INDEX idx_clients_created_at ON public.clients(created_at);

-- Insert sample data
INSERT INTO public.clients (name, contact_person, email, phone, employees, plan, status, industry, monthly_revenue, join_date, last_login) VALUES
('شركة الراجحي للتقنية', 'أحمد الراجحي', 'ahmed@alrajhi-tech.com', '+966501234567', 2500, 'enterprise+', 'active', 'تقنية المعلومات', 25000.00, '2023-01-15', '2024-01-10 10:30:00+00'),
('مؤسسة النور التجارية', 'فاطمة النور', 'fatima@alnoor.com.sa', '+966507654321', 150, 'professional', 'active', 'التجارة', 5500.00, '2023-03-20', '2024-01-09 14:20:00+00'),
('شركة المستقبل للاستشارات', 'محمد المستقبل', 'mohammed@future-consulting.sa', '+966509876543', 75, 'basic', 'trial', 'استشارات', 0.00, '2024-01-05', '2024-01-08 09:15:00+00'),
('مجموعة الأمل الطبية', 'سارة الأحمد', 'sara@alamal-medical.sa', '+966505555555', 300, 'enterprise', 'active', 'الرعاية الصحية', 12000.00, '2023-06-10', '2024-01-11 16:45:00+00'),
('شركة البناء المتطور', 'عبدالله البناء', 'abdullah@advanced-construction.sa', '+966504444444', 500, 'professional', 'pending', 'البناء والتشييد', 8500.00, '2023-09-12', '2024-01-07 11:30:00+00');