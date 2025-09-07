import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  TrendingUp, 
  Activity, 
  BarChart3,
  Bell,
  CheckCircle
} from 'lucide-react';
import { meetingService, Meeting } from '@/services/meetingService';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalMeetings: number;
  todaysMeetings: number;
  ongoingMeetings: number;
  completedMeetings: number;
  averageAttendance: number;
  totalParticipants: number;
}

interface DashboardTabProps {
  onJoinMeeting: (meetingId: string) => void;
  onStartNewMeeting: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ 
  onJoinMeeting, 
  onStartNewMeeting 
}) => {
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalMeetings: 0,
    todaysMeetings: 0,
    ongoingMeetings: 0,
    completedMeetings: 0,
    averageAttendance: 0,
    totalParticipants: 0
  });
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    
    // Subscribe to real-time changes
    const subscription = meetingService.subscribeToMeetingChanges(() => {
      loadDashboardData();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load dashboard statistics
      const dashboardStats = await meetingService.getDashboardStats();
      setStats(dashboardStats);

      // Load all meetings and filter
      const allMeetings = await meetingService.getAllMeetings();
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];

      // Filter upcoming meetings (today and future)
      const upcoming = allMeetings.filter(meeting => 
        meeting.meeting_date >= todayStr && 
        (meeting.status === 'scheduled' || meeting.status === 'ongoing')
      ).slice(0, 5);

      // Filter recent completed meetings
      const recent = allMeetings.filter(meeting => 
        meeting.status === 'completed'
      ).slice(0, 5);

      setUpcomingMeetings(upcoming);
      setRecentMeetings(recent);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل بيانات لوحة التحكم",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getMeetingTypeBadge = (type: string) => {
    const configs = {
      board: { text: 'مجلس الإدارة', className: 'bg-purple-100 text-purple-800' },
      executive: { text: 'تنفيذي', className: 'bg-blue-100 text-blue-800' },
      team: { text: 'فريق', className: 'bg-green-100 text-green-800' },
      general: { text: 'عام', className: 'bg-gray-100 text-gray-800' },
      online: { text: 'إلكتروني', className: 'bg-indigo-100 text-indigo-800' },
      hybrid: { text: 'مدمج', className: 'bg-orange-100 text-orange-800' },
      in_person: { text: 'حضوري', className: 'bg-teal-100 text-teal-800' }
    };
    return configs[type as keyof typeof configs] || configs.general;
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      scheduled: { text: 'مجدول', className: 'bg-blue-100 text-blue-800' },
      ongoing: { text: 'جاري', className: 'bg-green-100 text-green-800' },
      completed: { text: 'مكتمل', className: 'bg-gray-100 text-gray-800' },
      cancelled: { text: 'ملغي', className: 'bg-red-100 text-red-800' }
    };
    return configs[status as keyof typeof configs] || configs.scheduled;
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الاجتماعات</p>
                <p className="text-2xl font-bold">{stats.totalMeetings}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">اجتماعات اليوم</p>
                <p className="text-2xl font-bold text-blue-600">{stats.todaysMeetings}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">جارية الآن</p>
                <p className="text-2xl font-bold text-green-600">{stats.ongoingMeetings}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">مكتملة</p>
                <p className="text-2xl font-bold text-gray-600">{stats.completedMeetings}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معدل الحضور</p>
                <p className="text-2xl font-bold text-purple-600">{stats.averageAttendance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المشاركون</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalParticipants}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onStartNewMeeting} className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              بدء اجتماع فوري
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              جدولة اجتماع
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              عرض التقارير
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              الإشعارات
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              الاجتماعات القادمة
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingMeetings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">لا توجد اجتماعات قادمة</p>
            ) : (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{meeting.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{formatDate(meeting.meeting_date)}</span>
                        <span>{formatTime(meeting.meeting_time)}</span>
                        <span>{meeting.duration} دقيقة</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getStatusBadge(meeting.status).className}>
                          {getStatusBadge(meeting.status).text}
                        </Badge>
                        <Badge className={getMeetingTypeBadge(meeting.meeting_type).className}>
                          {getMeetingTypeBadge(meeting.meeting_type).text}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => onJoinMeeting(meeting.id)}
                        disabled={meeting.status !== 'ongoing' && meeting.status !== 'scheduled'}
                      >
                        {meeting.status === 'ongoing' ? 'انضمام' : 'تفاصيل'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              الاجتماعات الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMeetings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">لا توجد اجتماعات مكتملة</p>
            ) : (
              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{meeting.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{formatDate(meeting.meeting_date)}</span>
                        <span>{meeting.duration} دقيقة</span>
                        <span>بواسطة: {meeting.organizer_name}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getStatusBadge(meeting.status).className}>
                          {getStatusBadge(meeting.status).text}
                        </Badge>
                        <Badge className={getMeetingTypeBadge(meeting.meeting_type).className}>
                          {getMeetingTypeBadge(meeting.meeting_type).text}
                        </Badge>
                        {meeting.recording_enabled && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            مسجل
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        عرض
                      </Button>
                      {meeting.recording_url && (
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};