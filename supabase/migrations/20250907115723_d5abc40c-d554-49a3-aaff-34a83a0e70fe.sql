-- إنشاء جداول النظام المتقدم للاجتماعات

-- جدول الأقسام والإدارات
CREATE TABLE departments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    department_code TEXT NOT NULL UNIQUE,
    parent_department_id UUID REFERENCES departments(id),
    manager_id UUID,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول المستندات
CREATE TABLE documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    uploaded_by UUID NOT NULL,
    uploader_name TEXT NOT NULL,
    meeting_id UUID REFERENCES meetings(id),
    document_type TEXT NOT NULL DEFAULT 'general',
    is_public BOOLEAN NOT NULL DEFAULT false,
    download_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول المهام
CREATE TABLE tasks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    assigned_to UUID NOT NULL,
    assignee_name TEXT NOT NULL,
    assigned_by UUID NOT NULL,
    assigner_name TEXT NOT NULL,
    meeting_id UUID REFERENCES meetings(id),
    priority TEXT NOT NULL DEFAULT 'medium',
    status TEXT NOT NULL DEFAULT 'pending',
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول رسائل الاجتماعات (الدردشة)
CREATE TABLE meeting_messages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    meeting_id UUID NOT NULL REFERENCES meetings(id),
    sender_id UUID NOT NULL,
    sender_name TEXT NOT NULL,
    message TEXT NOT NULL,
    message_type TEXT NOT NULL DEFAULT 'text',
    file_url TEXT,
    file_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول تحليلات الاجتماعات
CREATE TABLE meeting_analytics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    meeting_id UUID NOT NULL REFERENCES meetings(id) UNIQUE,
    total_duration INTEGER,
    attendees_count INTEGER,
    attendance_rate NUMERIC(5,2),
    engagement_score NUMERIC(5,2),
    chat_messages_count INTEGER NOT NULL DEFAULT 0,
    documents_shared INTEGER NOT NULL DEFAULT 0,
    recording_duration INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول المحاضر الذكية
CREATE TABLE meeting_transcripts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    meeting_id UUID NOT NULL REFERENCES meetings(id),
    speaker_id UUID,
    speaker_name TEXT,
    transcript_text TEXT NOT NULL,
    timestamp_start TIMESTAMP WITH TIME ZONE NOT NULL,
    timestamp_end TIMESTAMP WITH TIME ZONE,
    language TEXT NOT NULL DEFAULT 'ar',
    confidence_score NUMERIC(3,2),
    is_ai_generated BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول قرارات الاجتماعات
CREATE TABLE meeting_decisions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    meeting_id UUID NOT NULL REFERENCES meetings(id),
    decision_text TEXT NOT NULL,
    decision_type TEXT NOT NULL DEFAULT 'action_item',
    assigned_to UUID,
    assignee_name TEXT,
    due_date DATE,
    status TEXT NOT NULL DEFAULT 'pending',
    priority TEXT NOT NULL DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول تكامل التقويم
CREATE TABLE calendar_integrations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    meeting_id UUID NOT NULL REFERENCES meetings(id),
    calendar_type TEXT NOT NULL, -- 'outlook', 'google', 'ical'
    external_event_id TEXT,
    sync_status TEXT NOT NULL DEFAULT 'pending',
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء الفهارس للأداء
CREATE INDEX idx_documents_meeting_id ON documents(meeting_id);
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by);
CREATE INDEX idx_tasks_meeting_id ON tasks(meeting_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_meeting_messages_meeting_id ON meeting_messages(meeting_id);
CREATE INDEX idx_meeting_messages_sender_id ON meeting_messages(sender_id);
CREATE INDEX idx_meeting_transcripts_meeting_id ON meeting_transcripts(meeting_id);
CREATE INDEX idx_meeting_decisions_meeting_id ON meeting_decisions(meeting_id);
CREATE INDEX idx_calendar_integrations_meeting_id ON calendar_integrations(meeting_id);

-- إضافة سياسات الأمان (RLS)
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_integrations ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للأقسام
CREATE POLICY "Users can view departments" ON departments FOR SELECT USING (true);
CREATE POLICY "Authorized users can manage departments" ON departments FOR ALL USING (auth.uid() IS NOT NULL);

-- سياسات الأمان للمستندات
CREATE POLICY "Users can view public documents" ON documents FOR SELECT USING (is_public = true);
CREATE POLICY "Document uploaders can manage their documents" ON documents FOR ALL USING (auth.uid() IS NOT NULL);

-- سياسات الأمان للمهام
CREATE POLICY "Assigned users can view their tasks" ON tasks FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Task assigners can manage tasks" ON tasks FOR ALL USING (auth.uid() IS NOT NULL);

-- سياسات الأمان لرسائل الاجتماعات
CREATE POLICY "Meeting participants can view messages" ON meeting_messages FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Meeting participants can send messages" ON meeting_messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- سياسات الأمان لتحليلات الاجتماعات
CREATE POLICY "Authorized users can view analytics" ON meeting_analytics FOR ALL USING (auth.uid() IS NOT NULL);

-- سياسات الأمان للمحاضر
CREATE POLICY "Meeting participants can view transcripts" ON meeting_transcripts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "System can create transcripts" ON meeting_transcripts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- سياسات الأمان للقرارات
CREATE POLICY "Meeting participants can view decisions" ON meeting_decisions FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authorized users can manage decisions" ON meeting_decisions FOR ALL USING (auth.uid() IS NOT NULL);

-- سياسات الأمان لتكامل التقويم
CREATE POLICY "Users can manage their calendar integrations" ON calendar_integrations FOR ALL USING (auth.uid() IS NOT NULL);

-- إضافة triggers للتحديث التلقائي
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meeting_decisions_updated_at BEFORE UPDATE ON meeting_decisions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();