-- Insert sample meetings data for testing
-- First check if meetings table exists and has required columns
INSERT INTO meetings (
  title, 
  description, 
  start_time, 
  end_time, 
  location,
  meeting_type,
  status,
  priority,
  created_by
) VALUES
-- Meeting scheduled for today
(
  'اجتماع الفريق الأسبوعي',
  'مراجعة التقدم وتحديد المهام القادمة',
  CURRENT_DATE + INTERVAL '2 hours',
  CURRENT_DATE + INTERVAL '3 hours',
  'قاعة الاجتماعات الرئيسية',
  'team',
  'scheduled',
  'medium',
  COALESCE((SELECT auth.uid()), '00000000-0000-0000-0000-000000000000')
),
-- Meeting currently ongoing
(
  'اجتماع طارئ',
  'مناقشة التحديات الحالية والحلول',
  CURRENT_DATE + INTERVAL '30 minutes',
  CURRENT_DATE + INTERVAL '90 minutes',
  'قاعة الطوارئ',
  'executive',
  'ongoing',
  'high',
  COALESCE((SELECT auth.uid()), '00000000-0000-0000-0000-000000000000')
),
-- Completed meeting
(
  'مراجعة المشروع',
  'تقييم مرحلي للمشروع الجديد',
  CURRENT_DATE - INTERVAL '2 days',
  CURRENT_DATE - INTERVAL '2 days' + INTERVAL '1 hour',
  'عبر الإنترنت',
  'team',
  'completed',
  'medium',
  COALESCE((SELECT auth.uid()), '00000000-0000-0000-0000-000000000000')
),
-- Board meeting scheduled for next week
(
  'اجتماع مجلس الإدارة',
  'مناقشة الخطة الاستراتيجية للربع القادم',
  CURRENT_DATE + INTERVAL '3 days',
  CURRENT_DATE + INTERVAL '3 days' + INTERVAL '2 hours',
  'قاعة مجلس الإدارة',
  'board',
  'scheduled',
  'high',
  COALESCE((SELECT auth.uid()), '00000000-0000-0000-0000-000000000000')
)
ON CONFLICT DO NOTHING;

-- Insert sample meeting participants
INSERT INTO meeting_participants (
  meeting_id,
  user_id,
  participant_name,
  participant_email,
  status
)
SELECT 
  m.id,
  COALESCE((SELECT auth.uid()), '00000000-0000-0000-0000-000000000000'),
  'المستخدم الحالي',
  'user@example.com',
  'accepted'
FROM meetings m
LIMIT 3
ON CONFLICT DO NOTHING;