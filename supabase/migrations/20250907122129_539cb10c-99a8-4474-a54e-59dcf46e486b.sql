-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view meetings they have access to" ON meetings;
DROP POLICY IF EXISTS "Users can create meetings" ON meetings;
DROP POLICY IF EXISTS "Meeting creators can update their meetings" ON meetings;
DROP POLICY IF EXISTS "Meeting creators can delete their meetings" ON meetings;
DROP POLICY IF EXISTS "Users can view meeting participants for accessible meetings" ON meeting_participants;
DROP POLICY IF EXISTS "Meeting creators can manage participants" ON meeting_participants;
DROP POLICY IF EXISTS "Users can view meeting documents for accessible meetings" ON meeting_documents;
DROP POLICY IF EXISTS "Users can upload documents to meetings they have access to" ON meeting_documents;

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