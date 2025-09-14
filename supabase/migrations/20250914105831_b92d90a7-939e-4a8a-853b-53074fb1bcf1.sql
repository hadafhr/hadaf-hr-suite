-- إضافة بيانات تجريبية لسجلات الحضور والانصراف
INSERT INTO boud_attendance (
  employee_id, 
  attendance_date, 
  check_in_time, 
  check_out_time, 
  work_hours, 
  late_minutes, 
  overtime_hours, 
  status, 
  location, 
  notes
) VALUES 
-- سجلات الأسبوع الحالي
('22222222-2222-2222-2222-222222222222', CURRENT_DATE, CURRENT_DATE + TIME '08:00:00', CURRENT_DATE + TIME '17:00:00', 8.0, 0, 0, 'present', 'المكتب الرئيسي', 'حضور منتظم'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 1, (CURRENT_DATE - 1) + TIME '08:15:00', (CURRENT_DATE - 1) + TIME '17:30:00', 8.25, 15, 0.5, 'present', 'المكتب الرئيسي', 'تأخير 15 دقيقة'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 2, (CURRENT_DATE - 2) + TIME '07:45:00', (CURRENT_DATE - 2) + TIME '16:45:00', 8.0, 0, 0, 'present', 'العمل عن بُعد', 'عمل من المنزل'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 3, (CURRENT_DATE - 3) + TIME '08:00:00', (CURRENT_DATE - 3) + TIME '18:00:00', 9.0, 0, 1.0, 'present', 'المكتب الرئيسي', 'ساعة إضافية'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 4, NULL, NULL, 0, 0, 0, 'absent', NULL, 'إجازة مرضية'),
-- سجلات الأسبوع الماضي
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 7, (CURRENT_DATE - 7) + TIME '08:30:00', (CURRENT_DATE - 7) + TIME '17:15:00', 7.75, 30, 0, 'present', 'المكتب الرئيسي', 'تأخير 30 دقيقة، انصراف مبكر'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 8, (CURRENT_DATE - 8) + TIME '08:00:00', (CURRENT_DATE - 8) + TIME '17:00:00', 8.0, 0, 0, 'present', 'المكتب الرئيسي', 'حضور منتظم'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 9, (CURRENT_DATE - 9) + TIME '07:50:00', (CURRENT_DATE - 9) + TIME '17:00:00', 8.17, 0, 0, 'present', 'المكتب الرئيسي', 'حضور مبكر'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 10, (CURRENT_DATE - 10) + TIME '08:00:00', (CURRENT_DATE - 10) + TIME '17:00:00', 8.0, 0, 0, 'present', 'العمل عن بُعد', 'عمل من المنزل'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - 11, (CURRENT_DATE - 11) + TIME '08:00:00', (CURRENT_DATE - 11) + TIME '19:00:00', 10.0, 0, 2.0, 'present', 'المكتب الرئيسي', 'ساعتان إضافيتان');

-- إضافة طلبات الإجازات
INSERT INTO boud_leave_requests (
  employee_id,
  leave_type,
  start_date,
  end_date,
  total_days,
  reason,
  status,
  applied_date
) VALUES 
('22222222-2222-2222-2222-222222222222', 'annual', CURRENT_DATE + 15, CURRENT_DATE + 19, 5, 'إجازة سنوية للسفر مع العائلة', 'pending', CURRENT_DATE),
('22222222-2222-2222-2222-222222222222', 'sick', CURRENT_DATE - 4, CURRENT_DATE - 4, 1, 'إجازة مرضية - نزلة برد', 'approved', CURRENT_DATE - 5),
('22222222-2222-2222-2222-222222222222', 'annual', CURRENT_DATE - 30, CURRENT_DATE - 25, 6, 'إجازة سنوية - عيد الأضحى', 'approved', CURRENT_DATE - 35),
('22222222-2222-2222-2222-222222222222', 'emergency', CURRENT_DATE + 7, CURRENT_DATE + 7, 1, 'ظروف عائلية طارئة', 'pending', CURRENT_DATE - 1);