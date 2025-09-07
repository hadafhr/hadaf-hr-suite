-- Create meetings table
CREATE TABLE IF NOT EXISTS public.meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  meeting_link TEXT,
  meeting_type TEXT NOT NULL DEFAULT 'team',
  status TEXT NOT NULL DEFAULT 'scheduled',
  priority TEXT NOT NULL DEFAULT 'medium',
  max_participants INTEGER,
  is_recorded BOOLEAN DEFAULT false,
  recording_url TEXT,
  agenda JSONB DEFAULT '[]',
  created_by UUID NOT NULL,
  access_level TEXT DEFAULT 'employee',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create meeting participants table
CREATE TABLE IF NOT EXISTS public.meeting_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  participant_name TEXT NOT NULL,
  participant_email TEXT,
  status TEXT DEFAULT 'invited',
  joined_at TIMESTAMP WITH TIME ZONE,
  left_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create meeting documents table  
CREATE TABLE IF NOT EXISTS public.meeting_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER DEFAULT 0,
  document_type TEXT DEFAULT 'general',
  version INTEGER DEFAULT 1,
  uploaded_by UUID NOT NULL,
  access_level TEXT DEFAULT 'employee',
  is_active BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create meeting tasks table (using action_items table structure)
-- Update action_items to include meeting-related fields if not exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'action_items' AND column_name = 'meeting_id') THEN
    ALTER TABLE action_items ADD COLUMN meeting_id UUID;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_participants ENABLE ROW LEVEL SECURITY;  
ALTER TABLE meeting_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for meetings
CREATE POLICY "Users can view meetings they have access to"
ON meetings FOR SELECT
USING (
  access_level = 'employee' OR 
  created_by = auth.uid() OR
  id IN (SELECT meeting_id FROM meeting_participants WHERE user_id = auth.uid())
);

CREATE POLICY "Users can create meetings"
ON meetings FOR INSERT
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Meeting creators can update their meetings"
ON meetings FOR UPDATE
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Meeting creators can delete their meetings"
ON meetings FOR DELETE
USING (created_by = auth.uid());

-- RLS Policies for meeting_participants
CREATE POLICY "Users can view meeting participants for accessible meetings"
ON meeting_participants FOR SELECT
USING (
  meeting_id IN (SELECT id FROM meetings WHERE 
    access_level = 'employee' OR 
    created_by = auth.uid() OR
    id IN (SELECT meeting_id FROM meeting_participants WHERE user_id = auth.uid())
  )
);

CREATE POLICY "Meeting creators can manage participants"
ON meeting_participants FOR ALL
USING (
  meeting_id IN (SELECT id FROM meetings WHERE created_by = auth.uid())
)
WITH CHECK (
  meeting_id IN (SELECT id FROM meetings WHERE created_by = auth.uid())
);

-- RLS Policies for meeting_documents
CREATE POLICY "Users can view meeting documents for accessible meetings"
ON meeting_documents FOR SELECT
USING (
  is_public = true OR
  uploaded_by = auth.uid() OR
  meeting_id IN (SELECT id FROM meetings WHERE 
    access_level = 'employee' OR 
    created_by = auth.uid() OR
    id IN (SELECT meeting_id FROM meeting_participants WHERE user_id = auth.uid())
  )
);

CREATE POLICY "Users can upload documents to meetings they have access to"
ON meeting_documents FOR INSERT
WITH CHECK (
  uploaded_by = auth.uid() AND
  meeting_id IN (SELECT id FROM meetings WHERE 
    created_by = auth.uid() OR
    id IN (SELECT meeting_id FROM meeting_participants WHERE user_id = auth.uid())
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meetings_created_by ON meetings(created_by);
CREATE INDEX IF NOT EXISTS idx_meetings_start_time ON meetings(start_time);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meeting_participants_meeting_id ON meeting_participants(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_participants_user_id ON meeting_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_meeting_documents_meeting_id ON meeting_documents(meeting_id);

-- Insert sample data for testing
INSERT INTO meetings (title, description, start_time, end_time, location, meeting_type, status, priority, created_by, access_level) VALUES
('اجتماع الفريق الأسبوعي', 'مراجعة التقدم وتحديد المهام القادمة', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day' + INTERVAL '1 hour', 'قاعة الاجتماعات الرئيسية', 'team', 'scheduled', 'medium', (SELECT auth.uid()), 'employee'),
('اجتماع مجلس الإدارة', 'مناقشة الخطة الاستراتيجية للربع القادم', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days' + INTERVAL '2 hours', 'قاعة مجلس الإدارة', 'board', 'scheduled', 'high', (SELECT auth.uid()), 'executive'),
('مراجعة المشروع', 'تقييم مرحلي للمشروع الجديد', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '1 hour', 'عبر الإنترنت', 'online', 'completed', 'medium', (SELECT auth.uid()), 'employee'),
('اجتماع طارئ', 'مناقشة التحديات الحالية', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '3 hours', 'قاعة الطوارئ', 'executive', 'scheduled', 'high', (SELECT auth.uid()), 'manager');

-- Add some sample participants and documents
INSERT INTO meeting_participants (meeting_id, user_id, participant_name, participant_email, status)
SELECT id, (SELECT auth.uid()), 'المستخدم الحالي', 'user@example.com', 'accepted'
FROM meetings 
WHERE created_by = (SELECT auth.uid())
LIMIT 2;