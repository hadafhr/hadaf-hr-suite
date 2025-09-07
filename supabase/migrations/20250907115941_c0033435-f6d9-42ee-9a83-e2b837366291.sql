-- إضافة الجداول المتقدمة للاجتماعات (مع التحقق من عدم وجودها)

-- جدول الأقسام والإدارات
CREATE TABLE IF NOT EXISTS departments (
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
CREATE TABLE IF NOT EXISTS documents (
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

-- جدول رسائل الاجتماعات (الدردشة)
CREATE TABLE IF NOT EXISTS meeting_messages (
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
CREATE TABLE IF NOT EXISTS meeting_analytics (
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
CREATE TABLE IF NOT EXISTS meeting_transcripts (
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
CREATE TABLE IF NOT EXISTS meeting_decisions (
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
CREATE TABLE IF NOT EXISTS calendar_integrations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    meeting_id UUID NOT NULL REFERENCES meetings(id),
    calendar_type TEXT NOT NULL, -- 'outlook', 'google', 'ical'
    external_event_id TEXT,
    sync_status TEXT NOT NULL DEFAULT 'pending',
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول جلسات البث المباشر
CREATE TABLE IF NOT EXISTS meeting_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    meeting_id UUID NOT NULL REFERENCES meetings(id),
    session_token TEXT UNIQUE,
    host_id UUID NOT NULL,
    session_status TEXT NOT NULL DEFAULT 'waiting', -- waiting, active, ended
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    recording_url TEXT,
    participants_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول إدارة الملفات المرفوعة
CREATE TABLE IF NOT EXISTS meeting_file_uploads (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    meeting_id UUID NOT NULL REFERENCES meetings(id),
    uploader_id UUID NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    is_shared BOOLEAN NOT NULL DEFAULT false,
    shared_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء الفهارس للأداء
CREATE INDEX IF NOT EXISTS idx_departments_code ON departments(department_code);
CREATE INDEX IF NOT EXISTS idx_departments_manager ON departments(manager_id);
CREATE INDEX IF NOT EXISTS idx_documents_meeting_id ON documents(meeting_id);
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_by ON documents(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);
CREATE INDEX IF NOT EXISTS idx_meeting_messages_meeting_id ON meeting_messages(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_messages_sender_id ON meeting_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_meeting_analytics_meeting_id ON meeting_analytics(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_transcripts_meeting_id ON meeting_transcripts(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_transcripts_speaker ON meeting_transcripts(speaker_id);
CREATE INDEX IF NOT EXISTS idx_meeting_decisions_meeting_id ON meeting_decisions(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_decisions_assigned ON meeting_decisions(assigned_to);
CREATE INDEX IF NOT EXISTS idx_calendar_integrations_meeting_id ON calendar_integrations(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_sessions_meeting_id ON meeting_sessions(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_sessions_status ON meeting_sessions(session_status);
CREATE INDEX IF NOT EXISTS idx_meeting_file_uploads_meeting_id ON meeting_file_uploads(meeting_id);

-- إنشاء bucket التخزين للملفات
INSERT INTO storage.buckets (id, name, public) 
VALUES ('meeting-files', 'meeting-files', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('meeting-recordings', 'meeting-recordings', false)
ON CONFLICT (id) DO NOTHING;