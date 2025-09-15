-- Add sample budget notifications with correct column names
INSERT INTO budget_notifications (request_type, request_id, recipient_user_id, channel, message, status) VALUES
('budget_alert', '43429bb1-cea1-45b5-8472-66dbe6f1467a', (SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'email', 'تحذير: تم تجاوز 85% من ميزانية التدريب لهذا الشهر', 'unread'),
('approval_request', 'e3b74fde-8344-489c-9437-ce937569a223', (SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'in_app', 'يوجد طلب موافقة على ميزانية جودة الحياة', 'unread'),
('budget_alert', 'c344450a-cd2c-4c03-9c54-05b0e651a2fb', (SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'in_app', 'تم الموافقة على ميزانية الرواتب', 'read'),
('budget_report', null, (SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'email', 'تقرير الميزانية الشهري متاح الآن', 'unread')
ON CONFLICT DO NOTHING;