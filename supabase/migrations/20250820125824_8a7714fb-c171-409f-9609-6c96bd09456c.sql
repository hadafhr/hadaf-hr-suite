-- ====================================
-- إضافة سياسات RLS لنظام المكافآت والحوافز
-- ====================================

-- تفعيل RLS على جميع الجداول الجديدة
ALTER TABLE incentive_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_eligibility_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_reports ENABLE ROW LEVEL SECURITY;

-- ====================================
-- سياسات جدول برامج الحوافز
-- ====================================

-- HR managers can manage incentive programs
CREATE POLICY "HR managers can manage incentive programs" ON incentive_programs
FOR ALL USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- All employees can view active incentive programs in their company
CREATE POLICY "Employees can view incentive programs" ON incentive_programs
FOR SELECT USING (
  company_id = boud_get_user_company_id(auth.uid()) AND is_active = true
);

-- ====================================
-- سياسات جدول مكافآت الموظفين
-- ====================================

-- Employees can view their own rewards
CREATE POLICY "Employees can view their rewards" ON employee_rewards
FOR SELECT USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

-- HR managers can manage all employee rewards in their company
CREATE POLICY "HR managers can manage employee rewards" ON employee_rewards
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- Managers can create rewards for their direct reports
CREATE POLICY "Managers can create rewards for direct reports" ON employee_rewards
FOR INSERT WITH CHECK (
  employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.manager_id IN (
      SELECT id FROM boud_employees WHERE user_id = auth.uid()
    )
  )
);

-- ====================================
-- سياسات جدول موافقات المكافآت
-- ====================================

-- Approvers can manage their assigned approvals
CREATE POLICY "Approvers can manage their reward approvals" ON reward_approvals
FOR ALL USING (approver_id = auth.uid())
WITH CHECK (approver_id = auth.uid());

-- HR managers can view all reward approvals in their company
CREATE POLICY "HR managers can view reward approvals" ON reward_approvals
FOR SELECT USING (
  reward_id IN (
    SELECT r.id FROM employee_rewards r
    JOIN boud_employees e ON r.employee_id = e.id
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- ====================================
-- سياسات جدول فحص الأهلية
-- ====================================

-- Employees can view their own eligibility checks
CREATE POLICY "Employees can view their eligibility checks" ON reward_eligibility_checks
FOR SELECT USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

-- HR managers can manage eligibility checks for their company
CREATE POLICY "HR managers can manage eligibility checks" ON reward_eligibility_checks
FOR ALL USING (
  employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
)
WITH CHECK (
  employee_id IN (
    SELECT e.id FROM boud_employees e 
    WHERE e.company_id = boud_get_user_company_id(auth.uid()) AND (
      boud_has_role(auth.uid(), e.company_id, 'super_admin'::user_role) OR 
      boud_has_role(auth.uid(), e.company_id, 'hr_manager'::user_role)
    )
  )
);

-- ====================================
-- سياسات جدول تاريخ المكافآت
-- ====================================

-- Employees can view their own reward history
CREATE POLICY "Employees can view their reward history" ON reward_history
FOR SELECT USING (
  employee_id IN (
    SELECT id FROM boud_employees WHERE user_id = auth.uid()
  )
);

-- HR managers can view all reward history in their company
CREATE POLICY "HR managers can view reward history" ON reward_history
FOR SELECT USING (
  company_id = boud_get_user_company_id(auth.uid()) AND (
    boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
    boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
  )
);

-- System can insert reward history
CREATE POLICY "System can insert reward history" ON reward_history
FOR INSERT WITH CHECK (true);

-- ====================================
-- سياسات جدول إعدادات النظام
-- ====================================

-- HR managers can manage reward system settings
CREATE POLICY "HR managers can manage reward settings" ON reward_system_settings
FOR ALL USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- ====================================
-- سياسات جدول إشعارات المكافآت
-- ====================================

-- Users can view their own reward notifications
CREATE POLICY "Users can view their reward notifications" ON reward_notifications
FOR SELECT USING (recipient_id = auth.uid());

-- Users can update their own notification read status
CREATE POLICY "Users can update their reward notifications" ON reward_notifications
FOR UPDATE USING (recipient_id = auth.uid())
WITH CHECK (recipient_id = auth.uid());

-- HR managers can create reward notifications
CREATE POLICY "HR managers can create reward notifications" ON reward_notifications
FOR INSERT WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);

-- ====================================
-- سياسات جدول التقارير
-- ====================================

-- HR managers can manage reward reports
CREATE POLICY "HR managers can manage reward reports" ON reward_reports
FOR ALL USING (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
)
WITH CHECK (
  boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
  boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
);