-- Step 1: Add encrypted columns to hr_employees table  
ALTER TABLE public.hr_employees 
ADD COLUMN IF NOT EXISTS national_id_encrypted TEXT,
ADD COLUMN IF NOT EXISTS passport_number_encrypted TEXT,
ADD COLUMN IF NOT EXISTS phone_encrypted TEXT,
ADD COLUMN IF NOT EXISTS email_encrypted TEXT,
ADD COLUMN IF NOT EXISTS iban_encrypted TEXT;