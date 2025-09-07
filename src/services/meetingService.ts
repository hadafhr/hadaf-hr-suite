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

  // إدارة المستندات - استخدام جدول action_items مؤقتاً
  async getMeetingDocuments(meetingId?: string): Promise<Document[]> {
    try {
      // إرجاع مستندات وهمية للآن
      return [
        {
          id: '1',
          title: 'جدول أعمال الاجتماع',
          description: 'جدول الأعمال الرئيسي',
          file_name: 'agenda.pdf',
          file_path: '/documents/agenda.pdf',
          file_type: 'pdf',
          file_size: 1024,
          uploaded_by: 'user-id',
          uploader_name: 'مدير الموارد البشرية',
          meeting_id: meetingId,
          document_type: 'agenda',
          is_public: true,
          download_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  }

  async uploadDocument(document: Omit<Document, 'id' | 'created_at' | 'updated_at' | 'download_count'>): Promise<Document> {
    // إرجاع مستند وهمي
    return {
      id: 'new-doc-id',
      ...document,
      download_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async incrementDownloadCount(documentId: string): Promise<void> {
    // وظيفة وهمية للآن
    console.log('Incrementing download count for document:', documentId);
  }

  // إدارة المهام من action_items
  async getMeetingTasks(meetingId?: string): Promise<Task[]> {
    try {
      // إرجاع مهام وهمية للآن
      return [
        {
          id: '1',
          title: 'مراجعة التقرير المالي',
          description: 'مراجعة التقرير المالي الشهري',
          assigned_to: 'user-1',
          assignee_name: 'أحمد محمد',
          assigned_by: 'user-2',
          assigner_name: 'مدير الموارد البشرية',
          meeting_id: meetingId || 'meeting-1',
          priority: 'high' as const,
          status: 'pending' as const,
          due_date: '2024-01-15',
          completed_at: undefined,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    // إرجاع مهمة وهمية
    return {
      id: 'new-task-id',
      ...task,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async updateTaskStatus(taskId: string, status: Task['status'], completedAt?: string): Promise<void> {
    // وظيفة وهمية للآن
    console.log('Updating task status:', taskId, status, completedAt);
  }

  // رسائل الاجتماعات (الدردشة) - Mock implementation
  async getMeetingMessages(meetingId: string): Promise<MeetingMessage[]> {
    try {
      // إرجاع رسائل وهمية
      return [
        {
          id: '1',
          meeting_id: meetingId,
          sender_id: 'user-1',
          sender_name: 'أحمد محمد',
          message: 'مرحباً بالجميع في الاجتماع',
          message_type: 'text',
          created_at: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  async sendMessage(message: Omit<MeetingMessage, 'id' | 'created_at'>): Promise<MeetingMessage> {
    // إرجاع رسالة وهمية
    return {
      id: 'new-message-id',
      ...message,
      created_at: new Date().toISOString()
    };
  }

  // جلسات البث المباشر - Mock implementation
  async createMeetingSession(meetingId: string, hostId: string): Promise<MeetingSession> {
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // إرجاع جلسة وهمية
    return {
      id: 'new-session-id',
      meeting_id: meetingId,
      session_token: sessionToken,
      host_id: hostId,
      session_status: 'waiting',
      participants_count: 0,
      created_at: new Date().toISOString()
    };
  }

  async updateSessionStatus(sessionId: string, status: MeetingSession['session_status']): Promise<void> {
    // وظيفة وهمية
    console.log('Updating session status:', sessionId, status);
  }

  // المحاضر الذكية - Mock implementation
  async getMeetingTranscripts(meetingId: string): Promise<MeetingTranscript[]> {
    // إرجاع محاضر وهمية
    return [
      {
        id: '1',
        meeting_id: meetingId,
        speaker_id: 'user-1',
        speaker_name: 'أحمد محمد',
        transcript_text: 'مرحباً بكم في اجتماع اليوم، سنناقش التقرير المالي',
        timestamp_start: new Date().toISOString(),
        language: 'ar',
        is_ai_generated: true,
        created_at: new Date().toISOString()
      }
    ];
  }

  async addTranscript(transcript: Omit<MeetingTranscript, 'id' | 'created_at'>): Promise<MeetingTranscript> {
    // إرجاع محضر وهمي
    return {
      id: 'new-transcript-id',
      ...transcript,
      created_at: new Date().toISOString()
    };
  }

  // قرارات الاجتماعات - Mock implementation
  async getMeetingDecisions(meetingId: string): Promise<MeetingDecision[]> {
    // إرجاع قرارات وهمية
    return [
      {
        id: '1',
        meeting_id: meetingId,
        decision_text: 'تم اتخاذ قرار بتطوير النظام الجديد',
        decision_type: 'strategic',
        assigned_to: 'user-1',
        assignee_name: 'أحمد محمد',
        due_date: '2024-01-15',
        status: 'pending',
        priority: 'high',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }

  async createDecision(decision: Omit<MeetingDecision, 'id' | 'created_at' | 'updated_at'>): Promise<MeetingDecision> {
    // إرجاع قرار وهمي
    return {
      id: 'new-decision-id',
      ...decision,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  // تكامل التقويم - Mock implementation
  async syncWithCalendar(meetingId: string, calendarType: CalendarIntegration['calendar_type']): Promise<CalendarIntegration> {
    // إرجاع تكامل وهمي
    return {
      id: 'new-integration-id',
      meeting_id: meetingId,
      calendar_type: calendarType,
      sync_status: 'pending',
      created_at: new Date().toISOString()
    };
  }

  // Analytics - Mock implementation
  async getMeetingAnalytics(meetingId: string): Promise<MeetingAnalytics | null> {
    // إرجاع تحليلات وهمية
    return {
      id: '1',
      meeting_id: meetingId,
      total_duration: 60,
      attendees_count: 5,
      attendance_rate: 85,
      engagement_score: 4.2,
      chat_messages_count: 15,
      documents_shared: 3,
      recording_duration: 55,
      created_at: new Date().toISOString()
    };
  }

  async updateMeetingAnalytics(
    meetingId: string, 
    analytics: Omit<MeetingAnalytics, 'id' | 'meeting_id' | 'created_at'>
  ): Promise<void> {
    // وظيفة وهمية
    console.log('Updating meeting analytics:', meetingId, analytics);
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