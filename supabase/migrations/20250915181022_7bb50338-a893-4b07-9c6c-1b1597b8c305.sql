-- Create RLS policies to allow reading budget data
-- Allow all users to read budget categories
CREATE POLICY "Enable read access for budget categories" ON "public"."budget_categories"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Allow all users to read budget allocations  
CREATE POLICY "Enable read access for budget allocations" ON "public"."budget_allocations"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Allow all users to read budget expenses
CREATE POLICY "Enable read access for budget expenses" ON "public"."budget_expenses"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Allow all users to read budget forecasts
CREATE POLICY "Enable read access for budget forecasts" ON "public"."budget_forecasts"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Allow all users to read budget approvals
CREATE POLICY "Enable read access for budget approvals" ON "public"."budget_approvals"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Allow all users to read budget notifications
CREATE POLICY "Enable read access for budget notifications" ON "public"."budget_notifications"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Allow all users to read budget audit log
CREATE POLICY "Enable read access for budget audit log" ON "public"."budget_audit_log"
AS PERMISSIVE FOR SELECT
TO public
USING (true);