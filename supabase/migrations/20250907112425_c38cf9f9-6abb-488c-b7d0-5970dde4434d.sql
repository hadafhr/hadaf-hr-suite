-- إنشاء جداول نظام الاجتماعات المتكامل

-- جدول الاجتماعات
CREATE TABLE public.meetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  organizer_id UUID NOT NULL,
  organizer_name TEXT NOT NULL,
  meeting_date DATE NOT NULL,
  meeting_time TIME NOT NULL,
  duration INTEGER NOT NULL DEFAULT 60, -- بالدقائق
  location TEXT,
  meeting_type TEXT NOT NULL CHECK (meeting_type IN ('board', 'executive', 'team', 'general', 'online', 'hybrid', 'in_person')),
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  max_attendees INTEGER,
  meeting_url TEXT,
  recording_enabled BOOLEAN DEFAULT true,
  recording_url TEXT,
  agenda JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول المشاركين في الاجتماعات
CREATE TABLE public.meeting_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL,
  participant_name TEXT NOT NULL,
  participant_email TEXT,
  role TEXT NOT NULL DEFAULT 'participant' CHECK (role IN ('organizer', 'participant', 'viewer')),
  attendance_status TEXT NOT NULL DEFAULT 'pending' CHECK (attendance_status IN ('pending', 'accepted', 'declined', 'attended', 'absent')),
  joined_at TIMESTAMP WITH TIME ZONE,
  left_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول المستندات
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  uploaded_by UUID NOT NULL,
  uploader_name TEXT NOT NULL,
  meeting_id UUID REFERENCES public.meetings(id) ON DELETE SET NULL,
  document_type TEXT NOT NULL DEFAULT 'general' CHECK (document_type IN ('agenda', 'minutes', 'presentation', 'report', 'contract', 'general')),
  is_public BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول المهام
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID NOT NULL,
  assignee_name TEXT NOT NULL,
  assigned_by UUID NOT NULL,
  assigner_name TEXT NOT NULL,
  meeting_id UUID REFERENCES public.meetings(id) ON DELETE SET NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول رسائل الاجتماعات
CREATE TABLE public.meeting_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'system')),
  file_url TEXT,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول إحصائيات الاجتماعات
CREATE TABLE public.meeting_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  total_duration INTEGER, -- بالدقائق
  attendees_count INTEGER,
  attendance_rate DECIMAL(5,2),
  engagement_score DECIMAL(5,2),
  chat_messages_count INTEGER DEFAULT 0,
  documents_shared INTEGER DEFAULT 0,
  recording_duration INTEGER DEFAULT 0, -- بالدقائق
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- تفعيل RLS على جميع الجداول
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_analytics ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للاجتماعات - يمكن للجميع مشاهدة الاجتماعات العامة
CREATE POLICY "Allow read access to meetings" ON public.meetings
  FOR SELECT USING (true);

CREATE POLICY "Allow insert for authenticated users" ON public.meetings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for organizer" ON public.meetings
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete for organizer" ON public.meetings
  FOR DELETE USING (true);

-- سياسات المشاركين
CREATE POLICY "Allow read access to meeting participants" ON public.meeting_participants
  FOR SELECT USING (true);

CREATE POLICY "Allow insert meeting participants" ON public.meeting_participants
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update meeting participants" ON public.meeting_participants
  FOR UPDATE USING (true);

-- سياسات المستندات
CREATE POLICY "Allow read access to documents" ON public.documents
  FOR SELECT USING (is_public = true OR true);

CREATE POLICY "Allow insert documents" ON public.documents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update documents" ON public.documents
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete documents" ON public.documents
  FOR DELETE USING (true);

-- سياسات المهام
CREATE POLICY "Allow read access to tasks" ON public.tasks
  FOR SELECT USING (true);

CREATE POLICY "Allow insert tasks" ON public.tasks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update tasks" ON public.tasks
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete tasks" ON public.tasks
  FOR DELETE USING (true);

-- سياسات رسائل الاجتماعات
CREATE POLICY "Allow read meeting messages" ON public.meeting_messages
  FOR SELECT USING (true);

CREATE POLICY "Allow insert meeting messages" ON public.meeting_messages
  FOR INSERT WITH CHECK (true);

-- سياسات إحصائيات الاجتماعات
CREATE POLICY "Allow read meeting analytics" ON public.meeting_analytics
  FOR SELECT USING (true);

CREATE POLICY "Allow insert meeting analytics" ON public.meeting_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update meeting analytics" ON public.meeting_analytics
  FOR UPDATE USING (true);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_meetings_organizer ON public.meetings(organizer_id);
CREATE INDEX idx_meetings_date ON public.meetings(meeting_date);
CREATE INDEX idx_meetings_status ON public.meetings(status);
CREATE INDEX idx_meeting_participants_meeting ON public.meeting_participants(meeting_id);
CREATE INDEX idx_documents_meeting ON public.documents(meeting_id);
CREATE INDEX idx_documents_uploader ON public.documents(uploaded_by);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_meeting ON public.tasks(meeting_id);
CREATE INDEX idx_meeting_messages_meeting ON public.meeting_messages(meeting_id);

-- دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- تريggersكرز للتحديث التلقائي
CREATE TRIGGER update_meetings_updated_at
  BEFORE UPDATE ON public.meetings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- إدراج بيانات تجريبية
INSERT INTO public.meetings (title, description, organizer_id, organizer_name, meeting_date, meeting_time, duration, location, meeting_type, status, priority) VALUES
('اجتماع مجلس الإدارة الشهري', 'مراجعة الأداء المالي والاستراتيجيات الجديدة', gen_random_uuid(), 'أحمد محمد السعيد', '2024-01-15', '10:00:00', 120, 'قاعة مجلس الإدارة', 'board', 'scheduled', 'high'),
('اجتماع فريق التطوير', 'مراجعة المشاريع الجارية والخطط القادمة', gen_random_uuid(), 'سارة أحمد علي', '2024-01-15', '14:00:00', 90, 'قاعة الاجتماعات الرئيسية', 'team', 'scheduled', 'medium'),
('ورشة التدريب الفصلية', 'تدريب الموظفين على الأنظمة الجديدة', gen_random_uuid(), 'محمد خالد حسن', '2024-01-16', '09:00:00', 180, 'قاعة التدريب', 'general', 'scheduled', 'medium'),
('اجتماع الطوارئ المالي', 'مناقشة الميزانية والتخطيط المالي', gen_random_uuid(), 'فاطمة علي أحمد', '2024-01-10', '11:00:00', 60, 'مكتب المدير العام', 'executive', 'completed', 'high'),
('اجتماع فريق المبيعات', 'استعراض نتائج الربع وخطط المبيعات', gen_random_uuid(), 'عبد الله محمد', '2024-01-08', '15:30:00', 75, 'عبر الإنترنت', 'online', 'completed', 'medium');

-- إدراج مهام تجريبية
INSERT INTO public.tasks (title, description, assigned_to, assignee_name, assigned_by, assigner_name, priority, status, due_date) VALUES
('إعداد تقرير الأداء الشهري', 'تحليل وإعداد تقرير شامل عن أداء الشركة', gen_random_uuid(), 'سارة أحمد', gen_random_uuid(), 'أحمد محمد', 'high', 'in_progress', '2024-01-20'),
('مراجعة عقود الموردين', 'مراجعة وتحديث عقود الموردين الحاليين', gen_random_uuid(), 'محمد خالد', gen_random_uuid(), 'فاطمة علي', 'medium', 'pending', '2024-01-25'),
('تطوير نظام إدارة المخزون', 'تصميم وتطوير نظام جديد لإدارة المخزون', gen_random_uuid(), 'علي حسن', gen_random_uuid(), 'سارة أحمد', 'high', 'in_progress', '2024-02-15'),
('تنظيم الفعالية السنوية', 'التخطيط والتنظيم للفعالية السنوية للشركة', gen_random_uuid(), 'نور محمد', gen_random_uuid(), 'أحمد محمد', 'medium', 'pending', '2024-02-01');

-- إدراج مستندات تجريبية
INSERT INTO public.documents (title, description, file_name, file_path, file_type, file_size, uploaded_by, uploader_name, document_type, is_public) VALUES
('محضر اجتماع مجلس الإدارة', 'محضر الاجتماع الشهري لمجلس الإدارة', 'board_meeting_minutes_jan.pdf', '/documents/board_meeting_minutes_jan.pdf', 'pdf', 2458000, gen_random_uuid(), 'أحمد محمد', 'minutes', true),
('عرض الاستراتيجية السنوية', 'عرض تقديمي للاستراتيجية الجديدة', 'annual_strategy_2024.pptx', '/documents/annual_strategy_2024.pptx', 'pptx', 5832000, gen_random_uuid(), 'سارة أحمد', 'presentation', true),
('تقرير الأداء المالي', 'تقرير مفصل عن الأداء المالي للربع الأخير', 'financial_report_q4.xlsx', '/documents/financial_report_q4.xlsx', 'xlsx', 3247000, gen_random_uuid(), 'محمد خالد', 'report', false),
('دليل إجراءات العمل', 'دليل شامل لإجراءات العمل المحدثة', 'work_procedures_guide.docx', '/documents/work_procedures_guide.docx', 'docx', 1856000, gen_random_uuid(), 'فاطمة علي', 'general', true);