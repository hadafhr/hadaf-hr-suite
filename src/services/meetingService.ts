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
  priority?: 'high' | 'medium' | 'low'; // Make it optional
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

  // Documents - Using action_items table as placeholder
  async getMeetingDocuments(meetingId?: string): Promise<Document[]> {
    // Return empty array since documents table doesn't exist yet
    return [];
  }

  async uploadDocument(document: Omit<Document, 'id' | 'created_at' | 'updated_at' | 'download_count'>): Promise<Document> {
    // Placeholder - return mock document
    return {
      id: 'temp-id',
      title: document.title,
      description: document.description,
      file_name: document.file_name,
      file_path: document.file_path,
      file_type: document.file_type,
      file_size: document.file_size,
      uploaded_by: document.uploaded_by,
      uploader_name: document.uploader_name,
      meeting_id: document.meeting_id,
      document_type: document.document_type,
      is_public: document.is_public,
      download_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async incrementDownloadCount(documentId: string): Promise<void> {
    // Placeholder
  }

  // Tasks - Using action_items table as reference
  async getMeetingTasks(meetingId?: string): Promise<Task[]> {
    // Return empty array since tasks table doesn't exist yet
    return [];
  }

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    // Placeholder - return mock task
    return {
      id: 'temp-id',
      title: task.title,
      description: task.description,
      assigned_to: task.assigned_to,
      assignee_name: task.assignee_name,
      assigned_by: task.assigned_by,
      assigner_name: task.assigner_name,
      meeting_id: task.meeting_id,
      priority: task.priority,
      status: task.status,
      due_date: task.due_date,
      completed_at: task.completed_at,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async updateTaskStatus(taskId: string, status: Task['status'], completedAt?: string): Promise<void> {
    // Placeholder
  }

  // Meeting Messages (Chat) - Placeholder
  async getMeetingMessages(meetingId: string): Promise<MeetingMessage[]> {
    // Return empty array since meeting_messages table doesn't exist yet
    return [];
  }

  async sendMessage(message: Omit<MeetingMessage, 'id' | 'created_at'>): Promise<MeetingMessage> {
    // Placeholder - return mock message
    return {
      id: 'temp-id',
      meeting_id: message.meeting_id,
      sender_id: message.sender_id,
      sender_name: message.sender_name,
      message: message.message,
      message_type: message.message_type,
      file_url: message.file_url,
      file_name: message.file_name,
      created_at: new Date().toISOString()
    };
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