-- Add sample budget notifications with correct enum values
INSERT INTO budget_notifications (request_type, request_id, recipient_user_id, channel, message, status) VALUES
('allocation', '43429bb1-cea1-45b5-8472-66dbe6f1467a', (SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'email', 'تم إنشاء طلب موافقة على مخصص التدريب', 'unread'),
('expense', '11111111-eeee-eeee-eeee-111111111111', (SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'in_app', 'تم إضافة مصروف جديد للرواتب', 'unread'),
('update', 'c344450a-cd2c-4c03-9c54-05b0e651a2fb', (SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000')), 'in_app', 'تم تحديث ميزانية الرواتب', 'read')
ON CONFLICT DO NOTHING;