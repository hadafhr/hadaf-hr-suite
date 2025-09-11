-- Update the dummy employee to match a real user ID
-- First let's see what users exist in the auth.users table
UPDATE boud_employees 
SET user_id = (SELECT id FROM auth.users LIMIT 1)
WHERE employee_id = 'EMP001';