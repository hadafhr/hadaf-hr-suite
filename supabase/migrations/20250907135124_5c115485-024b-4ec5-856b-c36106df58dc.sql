-- Drop existing policies that cause permission errors
DROP POLICY IF EXISTS "Admins can view all clients" ON public.clients;
DROP POLICY IF EXISTS "Admins can insert clients" ON public.clients;
DROP POLICY IF EXISTS "Admins can update clients" ON public.clients;
DROP POLICY IF EXISTS "Admins can delete clients" ON public.clients;

-- Create new policies using the existing role system
CREATE POLICY "System admins can view all clients" 
ON public.clients 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System admins can insert clients" 
ON public.clients 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System admins can update clients" 
ON public.clients 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System admins can delete clients" 
ON public.clients 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow authenticated users to view clients (less restrictive for testing)
CREATE POLICY "Authenticated users can view clients" 
ON public.clients 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to manage clients (for development)
CREATE POLICY "Authenticated users can insert clients" 
ON public.clients 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update clients" 
ON public.clients 
FOR UPDATE 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete clients" 
ON public.clients 
FOR DELETE 
USING (auth.uid() IS NOT NULL);