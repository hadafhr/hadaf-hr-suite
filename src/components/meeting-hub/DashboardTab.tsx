import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Video, Calendar, Users, Clock, FileText, CheckCircle2, TrendingUp, Play, Plus, Timer, MessageSquare, Award, Target, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardTabProps {
  onJoinMeeting: (meetingId: string) => void;
  onStartNewMeeting: () => void;
}

export const DashboardTab = ({ onJoinMeeting, onStartNewMeeting }: DashboardTabProps) => {
  const [stats] = useState({
    totalMeetings: 45,
    upcomingMeetings: 8,
    totalParticipants: 156,
    avgDuration: 42,
    completedTasks: 23,
    pendingTasks: 7,
    documentsShared: 34,
    meetingHours: 187
  });

  const [upcomingMeetings] = useState([
    {
      id: '1',
      title: 'اجتماع فريق التطوير الأسبوعي',
      time: '10:00 AM',
      date: 'اليوم',
      participants: 8,
      duration: 60,
      type: 'team',
      status: 'scheduled',
      host: 'أحمد محمد'
    },
    {
      id: '2',
      title: 'مراجعة المشروع الربع سنوي',
      time: '2:30 PM',
      date: 'اليوم',
      participants: 12,
      duration: 90,
      type: 'review',
      status: 'scheduled',
      host: 'سارة أحمد'
    }
  ]);

  const [meetingTrends] = useState([
    { month: 'يناير', meetings: 12, participants: 45 },
    { month: 'فبراير', meetings: 15, participants: 52 },
    { month: 'مارس', meetings: 18, participants: 61 },
    { month: 'أبريل', meetings: 14, participants: 48 },
    { month: 'مايو', meetings: 20, participants: 73 },
    { month: 'يونيو', meetings: 22, participants: 81 }
  ]);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الاجتماعات</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalMeetings}</p>
              </div>
              <Video className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الاجتماعات القادمة</p>
                <p className="text-2xl font-bold text-green-600">{stats.upcomingMeetings}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المشاركين</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalParticipants}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط المدة (دقيقة)</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgDuration}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            الاجتماعات القادمة
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onStartNewMeeting}>
            <Plus className="h-4 w-4 ml-2" />
            اجتماع جديد
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{meeting.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{meeting.date} - {meeting.time}</span>
                  <span>{meeting.participants} مشارك</span>
                  <span>{meeting.duration} دقيقة</span>
                </div>
              </div>
              <Button size="sm" onClick={() => onJoinMeeting(meeting.id)}>
                <Play className="h-4 w-4 ml-2" />
                انضمام
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Meeting Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            اتجاهات الاجتماعات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={meetingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="meetings" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
              <Area type="monotone" dataKey="participants" stackId="2" stroke="#10b981" fill="#10b981" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};