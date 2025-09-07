import { supabase } from '@/integrations/supabase/client';

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  location?: string;
  meeting_type: 'department' | 'executive' | 'board' | 'team' | 'one_on_one';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  priority?: 'high' | 'medium' | 'low';
  max_participants?: number;
  meeting_link?: string;
  is_recorded?: boolean;
  recording_url?: string;
  agenda?: any;
  created_by: string;
  created_at: string;
  updated_at: string;
  access_level: 'employee' | 'admin' | 'executive' | 'manager';
}

export interface Department {
  id: string;
  name_ar: string;
  name_en: string;
  department_code: string;
  parent_department_id?: string;
  manager_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MeetingSession {
  id: string;
  meeting_id: string;
  session_token?: string;
  host_id: string;
  session_status: 'waiting' | 'active' | 'ended';
  start_time?: string;
  end_time?: string;
  recording_url?: string;
  participants_count: number;
  created_at: string;
}

export interface MeetingTranscript {
  id: string;
  meeting_id: string;
  speaker_id?: string;
  speaker_name?: string;
  transcript_text: string;
  timestamp_start: string;
  timestamp_end?: string;
  language: string;
  confidence_score?: number;
  is_ai_generated: boolean;
  created_at: string;
}

export interface MeetingDecision {
  id: string;
  meeting_id: string;
  decision_text: string;
  decision_type: string;
  assigned_to?: string;
  assignee_name?: string;
  due_date?: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

export interface CalendarIntegration {
  id: string;
  meeting_id: string;
  calendar_type: 'outlook' | 'google' | 'ical';
  external_event_id?: string;
  sync_status: string;
  last_sync?: string;
  created_at: string;
}

export interface MeetingParticipant {
  id: string;
  meeting_id: string;
  user_id: string;
  participant_role: 'organizer' | 'required' | 'optional' | 'presenter';
  invitation_status: string;
  joined_at?: string;
  left_at?: string;
  attendance_duration?: number;
  created_at: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  uploader_name: string;
  meeting_id?: string;
  document_type: 'agenda' | 'minutes' | 'presentation' | 'report' | 'contract' | 'general';
  is_public: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assigned_to: string;
  assignee_name: string;
  assigned_by: string;
  assigner_name: string;
  meeting_id?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MeetingMessage {
  id: string;
  meeting_id: string;
  sender_id: string;
  sender_name: string;
  message: string;
  message_type: 'text' | 'file' | 'system';
  file_url?: string;
  file_name?: string;
  created_at: string;
}

export interface MeetingAnalytics {
  id: string;
  meeting_id: string;
  total_duration?: number;
  attendees_count?: number;
  attendance_rate?: number;
  engagement_score?: number;
  chat_messages_count: number;
  documents_shared: number;
  recording_duration: number;
  created_at: string;
}

class MeetingService {
  // Meeting CRUD operations
  async getAllMeetings(): Promise<Meeting[]> {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async getMeetingById(id: string): Promise<Meeting | null> {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createMeeting(meeting: Omit<Meeting, 'id' | 'created_at' | 'updated_at'>): Promise<Meeting> {
    const { data, error } = await supabase
      .from('meetings')
      .insert([meeting])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateMeeting(id: string, updates: Partial<Meeting>): Promise<Meeting> {
    const { data, error } = await supabase
      .from('meetings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteMeeting(id: string): Promise<void> {
    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Meeting Participants
  async getMeetingParticipants(meetingId: string): Promise<MeetingParticipant[]> {
    const { data, error } = await supabase
      .from('meeting_participants')
      .select('*')
      .eq('meeting_id', meetingId);
    
    if (error) throw error;
    return data || [];
  }

  async addParticipant(participant: Omit<MeetingParticipant, 'id' | 'created_at'>): Promise<MeetingParticipant> {
    const { data, error } = await supabase
      .from('meeting_participants')
      .insert([participant])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateParticipantStatus(
    participantId: string, 
    status: string,
    joinedAt?: string,
    leftAt?: string
  ): Promise<void> {
    const updates: any = { invitation_status: status };
    if (joinedAt) updates.joined_at = joinedAt;
    if (leftAt) updates.left_at = leftAt;

    const { error } = await supabase
      .from('meeting_participants')
      .update(updates)
      .eq('id', participantId);
    
    if (error) throw error;
  }

  // الأقسام والإدارات (باستخدام جداول موجودة)
  async getDepartments(): Promise<Department[]> {
    // استخدام boud_departments أو إرجاع بيانات وهمية
    return [
      { 
        id: '1', 
        name_ar: 'الموارد البشرية', 
        name_en: 'Human Resources',
        department_code: 'HR',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }

  async createDepartment(department: Omit<Department, 'id' | 'created_at' | 'updated_at'>): Promise<Department> {
    // إرجاع قسم وهمي
    return {
      id: 'new-dept-id',
      ...department,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  // إدارة المستندات
  async getMeetingDocuments(meetingId?: string): Promise<Document[]> {
    try {
      let query = supabase.from('documents').select('*');
      
      if (meetingId) {
        query = query.eq('meeting_id', meetingId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  }

  async uploadDocument(document: Omit<Document, 'id' | 'created_at' | 'updated_at' | 'download_count'>): Promise<Document> {
    const { data, error } = await supabase
      .from('documents')
      .insert([{ ...document, download_count: 0 }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async incrementDownloadCount(documentId: string): Promise<void> {
    const { error } = await supabase
      .from('documents')
      .update({ download_count: supabase.sql`download_count + 1` })
      .eq('id', documentId);
    
    if (error) throw error;
  }

  // إدارة المهام من action_items
  async getMeetingTasks(meetingId?: string): Promise<Task[]> {
    try {
      let query = supabase.from('action_items').select('*');
      
      if (meetingId) {
        query = query.eq('related_meeting_id', meetingId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // تحويل البيانات من action_items إلى Task format
      return (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        assigned_to: item.assigned_to || item.user_id,
        assignee_name: 'مستخدم',
        assigned_by: item.created_by,
        assigner_name: 'مدير',
        meeting_id: item.related_meeting_id,
        priority: item.priority || 'medium',
        status: item.status === 'completed' ? 'completed' : item.status === 'in_progress' ? 'in_progress' : 'pending',
        due_date: item.due_date,
        completed_at: item.completion_date,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    const actionItem = {
      title: task.title,
      description: task.description,
      assigned_to: task.assigned_to,
      created_by: task.assigned_by,
      related_meeting_id: task.meeting_id,
      priority: task.priority,
      status: task.status === 'completed' ? 'completed' : task.status === 'in_progress' ? 'in_progress' : 'open',
      due_date: task.due_date,
      completion_date: task.completed_at,
      item_type: 'task'
    };

    const { data, error } = await supabase
      .from('action_items')
      .insert([actionItem])
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      assigned_to: data.assigned_to || data.user_id,
      assignee_name: task.assignee_name,
      assigned_by: data.created_by,
      assigner_name: task.assigner_name,
      meeting_id: data.related_meeting_id,
      priority: data.priority,
      status: data.status === 'completed' ? 'completed' : data.status === 'in_progress' ? 'in_progress' : 'pending',
      due_date: data.due_date,
      completed_at: data.completion_date,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  }

  async updateTaskStatus(taskId: string, status: Task['status'], completedAt?: string): Promise<void> {
    const actionStatus = status === 'completed' ? 'completed' : status === 'in_progress' ? 'in_progress' : 'open';
    
    const { error } = await supabase
      .from('action_items')
      .update({ 
        status: actionStatus, 
        completion_date: status === 'completed' ? (completedAt || new Date().toISOString()) : null 
      })
      .eq('id', taskId);
    
    if (error) throw error;
  }

  // رسائل الاجتماعات (الدردشة)
  async getMeetingMessages(meetingId: string): Promise<MeetingMessage[]> {
    try {
      const { data, error } = await supabase
        .from('meeting_messages')
        .select('*')
        .eq('meeting_id', meetingId)
        .order('created_at');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  async sendMessage(message: Omit<MeetingMessage, 'id' | 'created_at'>): Promise<MeetingMessage> {
    const { data, error } = await supabase
      .from('meeting_messages')
      .insert([message])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // جلسات البث المباشر
  async createMeetingSession(meetingId: string, hostId: string): Promise<MeetingSession> {
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const { data, error } = await supabase
      .from('meeting_sessions')
      .insert([{
        meeting_id: meetingId,
        host_id: hostId,
        session_token: sessionToken,
        session_status: 'waiting'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateSessionStatus(sessionId: string, status: MeetingSession['session_status']): Promise<void> {
    const updates: any = { session_status: status };
    
    if (status === 'active') {
      updates.start_time = new Date().toISOString();
    } else if (status === 'ended') {
      updates.end_time = new Date().toISOString();
    }

    const { error } = await supabase
      .from('meeting_sessions')
      .update(updates)
      .eq('id', sessionId);
    
    if (error) throw error;
  }

  // المحاضر الذكية
  async getMeetingTranscripts(meetingId: string): Promise<MeetingTranscript[]> {
    const { data, error } = await supabase
      .from('meeting_transcripts')
      .select('*')
      .eq('meeting_id', meetingId)
      .order('timestamp_start');
    
    if (error) throw error;
    return data || [];
  }

  async addTranscript(transcript: Omit<MeetingTranscript, 'id' | 'created_at'>): Promise<MeetingTranscript> {
    const { data, error } = await supabase
      .from('meeting_transcripts')
      .insert([transcript])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // قرارات الاجتماعات
  async getMeetingDecisions(meetingId: string): Promise<MeetingDecision[]> {
    const { data, error } = await supabase
      .from('meeting_decisions')
      .select('*')
      .eq('meeting_id', meetingId)
      .order('created_at');
    
    if (error) throw error;
    return data || [];
  }

  async createDecision(decision: Omit<MeetingDecision, 'id' | 'created_at' | 'updated_at'>): Promise<MeetingDecision> {
    const { data, error } = await supabase
      .from('meeting_decisions')
      .insert([decision])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // تكامل التقويم
  async syncWithCalendar(meetingId: string, calendarType: CalendarIntegration['calendar_type']): Promise<CalendarIntegration> {
    const { data, error } = await supabase
      .from('calendar_integrations')
      .insert([{
        meeting_id: meetingId,
        calendar_type: calendarType,
        sync_status: 'pending'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Analytics - Placeholder
  async getMeetingAnalytics(meetingId: string): Promise<MeetingAnalytics | null> {
    // Return null since meeting_analytics table doesn't exist yet
    return null;
  }

  async updateMeetingAnalytics(
    meetingId: string, 
    analytics: Omit<MeetingAnalytics, 'id' | 'meeting_id' | 'created_at'>
  ): Promise<void> {
    // Placeholder
  }

  // Dashboard Statistics
  async getDashboardStats(): Promise<{
    totalMeetings: number;
    todaysMeetings: number;
    ongoingMeetings: number;
    completedMeetings: number;
    averageAttendance: number;
    totalParticipants: number;
  }> {
    const today = new Date().toISOString().split('T')[0];
    
    const [
      { count: totalMeetings },
      { count: todaysMeetings },
      { count: ongoingMeetings },
      { count: completedMeetings }
    ] = await Promise.all([
      supabase.from('meetings').select('*', { count: 'exact', head: true }),
      supabase.from('meetings').select('*', { count: 'exact', head: true }).gte('start_time', today),
      supabase.from('meetings').select('*', { count: 'exact', head: true }).eq('status', 'ongoing'),
      supabase.from('meetings').select('*', { count: 'exact', head: true }).eq('status', 'completed')
    ]);

    // Get total unique participants
    const { count: totalParticipants } = await supabase
      .from('meeting_participants')
      .select('user_id', { count: 'exact', head: true });

    return {
      totalMeetings: totalMeetings || 0,
      todaysMeetings: todaysMeetings || 0,
      ongoingMeetings: ongoingMeetings || 0,
      completedMeetings: completedMeetings || 0,
      averageAttendance: 85, // Mock value
      totalParticipants: totalParticipants || 0
    };
  }

  // Real-time subscriptions
  subscribeToMeetingChanges(callback: (payload: any) => void) {
    return supabase
      .channel('meetings-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'meetings' }, 
        callback
      )
      .subscribe();
  }

  subscribeToMeetingMessages(meetingId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`meeting-messages-${meetingId}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'meeting_messages', filter: `meeting_id=eq.${meetingId}` }, 
        callback
      )
      .subscribe();
  }
}

export const meetingService = new MeetingService();