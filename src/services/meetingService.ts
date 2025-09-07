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
  priority: 'high' | 'medium' | 'low';
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
  participant_id: string;
  participant_name: string;
  participant_email?: string;
  role: 'organizer' | 'participant' | 'viewer';
  attendance_status: 'pending' | 'accepted' | 'declined' | 'attended' | 'absent';
  joined_at?: string;
  left_at?: string;
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
      .order('meeting_date', { ascending: false });
    
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
    status: MeetingParticipant['attendance_status'],
    joinedAt?: string,
    leftAt?: string
  ): Promise<void> {
    const updates: any = { attendance_status: status };
    if (joinedAt) updates.joined_at = joinedAt;
    if (leftAt) updates.left_at = leftAt;

    const { error } = await supabase
      .from('meeting_participants')
      .update(updates)
      .eq('id', participantId);
    
    if (error) throw error;
  }

  // Documents
  async getMeetingDocuments(meetingId?: string): Promise<Document[]> {
    let query = supabase.from('documents').select('*');
    
    if (meetingId) {
      query = query.eq('meeting_id', meetingId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
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
    const { error } = await supabase.rpc('increment_download_count', {
      document_id: documentId
    });
    
    if (error) {
      // Fallback if RPC doesn't exist
      const { data } = await supabase
        .from('documents')
        .select('download_count')
        .eq('id', documentId)
        .single();
      
      if (data) {
        await supabase
          .from('documents')
          .update({ download_count: (data.download_count || 0) + 1 })
          .eq('id', documentId);
      }
    }
  }

  // Tasks
  async getMeetingTasks(meetingId?: string): Promise<Task[]> {
    let query = supabase.from('tasks').select('*');
    
    if (meetingId) {
      query = query.eq('meeting_id', meetingId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateTaskStatus(taskId: string, status: Task['status'], completedAt?: string): Promise<void> {
    const updates: any = { status };
    if (completedAt && status === 'completed') {
      updates.completed_at = completedAt;
    }

    const { error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId);
    
    if (error) throw error;
  }

  // Meeting Messages (Chat)
  async getMeetingMessages(meetingId: string): Promise<MeetingMessage[]> {
    const { data, error } = await supabase
      .from('meeting_messages')
      .select('*')
      .eq('meeting_id', meetingId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
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

  // Analytics
  async getMeetingAnalytics(meetingId: string): Promise<MeetingAnalytics | null> {
    const { data, error } = await supabase
      .from('meeting_analytics')
      .select('*')
      .eq('meeting_id', meetingId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async updateMeetingAnalytics(
    meetingId: string, 
    analytics: Omit<MeetingAnalytics, 'id' | 'meeting_id' | 'created_at'>
  ): Promise<void> {
    const { error } = await supabase
      .from('meeting_analytics')
      .upsert([{ meeting_id: meetingId, ...analytics }]);
    
    if (error) throw error;
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
      supabase.from('meetings').select('*', { count: 'exact', head: true }).eq('meeting_date', today),
      supabase.from('meetings').select('*', { count: 'exact', head: true }).eq('status', 'ongoing'),
      supabase.from('meetings').select('*', { count: 'exact', head: true }).eq('status', 'completed')
    ]);

    // Calculate average attendance
    const { data: analyticsData } = await supabase
      .from('meeting_analytics')
      .select('attendance_rate')
      .not('attendance_rate', 'is', null);

    const averageAttendance = analyticsData && analyticsData.length > 0
      ? analyticsData.reduce((sum, item) => sum + (item.attendance_rate || 0), 0) / analyticsData.length
      : 0;

    // Get total unique participants
    const { count: totalParticipants } = await supabase
      .from('meeting_participants')
      .select('participant_id', { count: 'exact', head: true });

    return {
      totalMeetings: totalMeetings || 0,
      todaysMeetings: todaysMeetings || 0,
      ongoingMeetings: ongoingMeetings || 0,
      completedMeetings: completedMeetings || 0,
      averageAttendance: Math.round(averageAttendance),
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