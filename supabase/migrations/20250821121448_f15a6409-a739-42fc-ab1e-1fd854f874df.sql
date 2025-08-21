-- إصلاح التحذيرات الأمنية من الـ linter

-- إضافة search_path للدوال الموجودة لحل مشكلة Function Search Path Mutable
CREATE OR REPLACE FUNCTION generate_temp_password()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$;

CREATE OR REPLACE FUNCTION create_employee_notification(
  p_employee_id UUID,
  p_title TEXT,
  p_description TEXT,
  p_notification_type TEXT DEFAULT 'info',
  p_action_type TEXT DEFAULT NULL,
  p_related_id UUID DEFAULT NULL,
  p_priority TEXT DEFAULT 'medium'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  notification_id UUID;
BEGIN
  -- إنشاء الإشعار
  INSERT INTO employee_notifications (
    employee_id, title, description, 
    notification_type, action_type, related_id, priority
  ) VALUES (
    p_employee_id, p_title, p_description,
    p_notification_type, p_action_type, p_related_id, p_priority
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- إنشاء triggers لإرسال إشعارات تلقائية عند تحديث بيانات الموظف
CREATE OR REPLACE FUNCTION notify_employee_on_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- عند تحديث الراتب الأساسي
  IF OLD.basic_salary IS DISTINCT FROM NEW.basic_salary THEN
    PERFORM create_employee_notification(
      NEW.id,
      'تحديث الراتب الأساسي',
      'تم تحديث راتبك الأساسي من ' || COALESCE(OLD.basic_salary::TEXT, '0') || ' إلى ' || NEW.basic_salary::TEXT || ' ريال',
      'success',
      'salary_update'
    );
  END IF;
  
  -- عند تحديث المنصب
  IF OLD.position_id IS DISTINCT FROM NEW.position_id THEN
    PERFORM create_employee_notification(
      NEW.id,
      'تحديث المنصب',
      'تم تحديث منصبك الوظيفي',
      'info',
      'position_update'
    );
  END IF;
  
  -- عند تحديث حالة التوظيف
  IF OLD.employment_status IS DISTINCT FROM NEW.employment_status THEN
    PERFORM create_employee_notification(
      NEW.id,
      'تحديث حالة التوظيف',
      'تم تحديث حالة توظيفك إلى: ' || NEW.employment_status::TEXT,
      CASE 
        WHEN NEW.employment_status = 'active' THEN 'success'
        WHEN NEW.employment_status IN ('terminated', 'suspended') THEN 'warning'
        ELSE 'info'
      END,
      'employment_status_update'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- trigger للإشعار عند إضافة موظف جديد
CREATE OR REPLACE FUNCTION notify_new_employee()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  temp_password TEXT;
BEGIN
  -- إنشاء كلمة مرور مؤقتة
  temp_password := generate_temp_password();
  
  -- حفظ كلمة المرور المؤقتة
  INSERT INTO employee_temporary_passwords (employee_id, temp_password)
  VALUES (NEW.id, temp_password);
  
  -- إنشاء إشعار ترحيبي
  PERFORM create_employee_notification(
    NEW.id,
    'مرحباً بك في منصة بُعد HR',
    'تم إنشاء حسابك بنجاح. رقمك الوظيفي: ' || NEW.employee_id || '. تحقق من بريدك الإلكتروني للحصول على بيانات الدخول.',
    'success',
    'welcome',
    NEW.id,
    'high'
  );
  
  RETURN NEW;
END;
$$;

-- ربط الـ triggers بجدول الموظفين
DROP TRIGGER IF EXISTS employee_update_notification ON boud_employees;
CREATE TRIGGER employee_update_notification
  AFTER UPDATE ON boud_employees
  FOR EACH ROW
  EXECUTE FUNCTION notify_employee_on_update();

DROP TRIGGER IF EXISTS new_employee_notification ON boud_employees;
CREATE TRIGGER new_employee_notification
  AFTER INSERT ON boud_employees
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_employee();

-- إضافة search_path لدالة تحديث الموقع الجغرافي
CREATE OR REPLACE FUNCTION update_attendance_location(
  p_attendance_id UUID,
  p_location JSONB,
  p_is_check_out BOOLEAN DEFAULT FALSE
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_is_check_out THEN
    UPDATE employee_attendance_records 
    SET check_out_location = p_location,
        check_out_time = NOW(),
        updated_at = NOW()
    WHERE id = p_attendance_id;
  ELSE
    UPDATE employee_attendance_records 
    SET check_in_location = p_location,
        check_in_time = NOW(),
        updated_at = NOW()
    WHERE id = p_attendance_id;
  END IF;
  
  RETURN TRUE;
END;
$$;