-- Add sample budget notifications for current user
INSERT INTO budget_notifications (user_id, title, message, notification_type, related_category_id, is_read) VALUES
((SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'تحذير من تجاوز الميزانية', 'تم تجاوز 85% من ميزانية الرواتب لهذا الشهر', 'warning', '14408f38-2c14-43c2-9a2c-46bdc9eb2f94', false),
((SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'موافقة مطلوبة', 'يوجد طلب موافقة على مصاريف التدريب', 'approval_required', '934e1f9b-09da-4f16-bb1e-99a2bc02eb85', false),
((SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'تم الموافقة', 'تم الموافقة على ميزانية التوظيف', 'approved', '7bee0038-f094-46bc-a179-ba711294a662', true),
((SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'تقرير شهري', 'تقرير الميزانية لشهر فبراير متاح الآن', 'info', null, false)
ON CONFLICT DO NOTHING;

-- Add sample budget approvals
INSERT INTO budget_approvals (allocation_id, requested_by, approval_level, status, notes) VALUES
('43429bb1-cea1-45b5-8472-66dbe6f1467a', (SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'manager', 'pending', 'يحتاج موافقة على برامج التدريب الجديدة'),
('e3b74fde-8344-489c-9437-ce937569a223', (SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'finance', 'approved', 'تم الموافقة على برامج جودة الحياة')
ON CONFLICT DO NOTHING;