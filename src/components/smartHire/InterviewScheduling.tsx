import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar,
  Clock,
  Video,
  MapPin,
  Users,
  Plus,
  Edit,
  CheckCircle,
  XCircle,
  Phone
} from 'lucide-react';

interface Interview {
  id: string;
  applicantId: string;
  applicantName: string;
  position: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'in-person' | 'video' | 'phone';
  location?: string;
  meetingLink?: string;
  interviewer: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  rating?: number;
}

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
  interviewer?: string;
}

export const InterviewScheduling: React.FC = () => {
  const [interviews, setInterviews] = React.useState<Interview[]>([
    {
      id: '1',
      applicantId: '1',
      applicantName: 'أحمد محمد العتيبي',
      position: 'مطور Full Stack',
      date: '2024-01-25',
      time: '10:00',
      duration: 60,
      type: 'video',
      meetingLink: 'https://zoom.us/j/123456789',
      interviewer: 'سارة أحمد - مدير التقنية',
      status: 'confirmed',
      notes: 'مرشح ممتاز، خبرة قوية في React و Node.js'
    },
    {
      id: '2',
      applicantId: '2',
      applicantName: 'فاطمة سالم القحطاني',
      position: 'محاسب أول',
      date: '2024-01-24',
      time: '14:30',
      duration: 45,
      type: 'in-person',
      location: 'مكتب الرياض - الطابق الثالث',
      interviewer: 'محمد علي - مدير المالية',
      status: 'scheduled'
    },
    {
      id: '3',
      applicantId: '3',
      applicantName: 'خالد ناصر المطيري',
      position: 'مختص تسويق رقمي',
      date: '2024-01-26',
      time: '11:30',
      duration: 30,
      type: 'phone',
      interviewer: 'نورا حسن - مدير التسويق',
      status: 'scheduled'
    }
  ]);

  const [availableSlots, setAvailableSlots] = React.useState<TimeSlot[]>([
    { date: '2024-01-24', time: '09:00', available: true, interviewer: 'سارة أحمد' },
    { date: '2024-01-24', time: '11:00', available: true, interviewer: 'محمد علي' },
    { date: '2024-01-25', time: '13:00', available: true, interviewer: 'نورا حسن' },
    { date: '2024-01-26', time: '15:00', available: true, interviewer: 'سارة أحمد' }
  ]);

  const [newInterviewDialog, setNewInterviewDialog] = React.useState(false);
  const [interviewForm, setInterviewForm] = React.useState({
    applicantName: '',
    position: '',
    date: '',
    time: '',
    duration: 60,
    type: 'video' as Interview['type'],
    location: '',
    meetingLink: '',
    interviewer: '',
    notes: ''
  });

  const handleScheduleInterview = () => {
    const newInterview: Interview = {
      id: Date.now().toString(),
      applicantId: Date.now().toString(),
      applicantName: interviewForm.applicantName,
      position: interviewForm.position,
      date: interviewForm.date,
      time: interviewForm.time,
      duration: interviewForm.duration,
      type: interviewForm.type,
      location: interviewForm.location,
      meetingLink: interviewForm.meetingLink,
      interviewer: interviewForm.interviewer,
      status: 'scheduled',
      notes: interviewForm.notes
    };

    setInterviews(prev => [newInterview, ...prev]);
    setNewInterviewDialog(false);
    setInterviewForm({
      applicantName: '',
      position: '',
      date: '',
      time: '',
      duration: 60,
      type: 'video',
      location: '',
      meetingLink: '',
      interviewer: '',
      notes: ''
    });
  };

  const getStatusColor = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'confirmed': return 'bg-green-500';
      case 'completed': return 'bg-purple-500';
      case 'cancelled': return 'bg-red-500';
      case 'rescheduled': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled': return 'مجدولة';
      case 'confirmed': return 'مؤكدة';
      case 'completed': return 'مكتملة';
      case 'cancelled': return 'ملغية';
      case 'rescheduled': return 'معاد جدولتها';
      default: return status;
    }
  };

  const getTypeIcon = (type: Interview['type']) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: Interview['type']) => {
    switch (type) {
      case 'video': return 'فيديو';
      case 'in-person': return 'حضوري';
      case 'phone': return 'هاتفي';
      default: return type;
    }
  };

  const todayInterviews = interviews.filter(i => i.date === new Date().toISOString().split('T')[0]);
  const upcomingInterviews = interviews.filter(i => new Date(i.date) > new Date());

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">إدارة المقابلات</h2>
          <p className="text-slate-600 dark:text-slate-300">جدولة وإدارة مقابلات التوظيف</p>
        </div>
        <Dialog open={newInterviewDialog} onOpenChange={setNewInterviewDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              جدولة مقابلة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" dir="rtl">
            <DialogHeader>
              <DialogTitle>جدولة مقابلة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicant-name">اسم المتقدم</Label>
                  <Input
                    id="applicant-name"
                    value={interviewForm.applicantName}
                    onChange={(e) => setInterviewForm(prev => ({ ...prev, applicantName: e.target.value }))}
                    placeholder="اسم المتقدم"
                  />
                </div>
                <div>
                  <Label htmlFor="position">المنصب</Label>
                  <Input
                    id="position"
                    value={interviewForm.position}
                    onChange={(e) => setInterviewForm(prev => ({ ...prev, position: e.target.value }))}
                    placeholder="المنصب المتقدم له"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="interview-date">التاريخ</Label>
                  <Input
                    id="interview-date"
                    type="date"
                    value={interviewForm.date}
                    onChange={(e) => setInterviewForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="interview-time">الوقت</Label>
                  <Input
                    id="interview-time"
                    type="time"
                    value={interviewForm.time}
                    onChange={(e) => setInterviewForm(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">المدة (دقيقة)</Label>
                  <Select value={interviewForm.duration.toString()} onValueChange={(value) => setInterviewForm(prev => ({ ...prev, duration: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 دقيقة</SelectItem>
                      <SelectItem value="45">45 دقيقة</SelectItem>
                      <SelectItem value="60">60 دقيقة</SelectItem>
                      <SelectItem value="90">90 دقيقة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interview-type">نوع المقابلة</Label>
                  <Select value={interviewForm.type} onValueChange={(value: any) => setInterviewForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">فيديو</SelectItem>
                      <SelectItem value="in-person">حضوري</SelectItem>
                      <SelectItem value="phone">هاتفي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interviewer">المُقابِل</Label>
                  <Input
                    id="interviewer"
                    value={interviewForm.interviewer}
                    onChange={(e) => setInterviewForm(prev => ({ ...prev, interviewer: e.target.value }))}
                    placeholder="اسم المُقابِل ومنصبه"
                  />
                </div>
              </div>

              {interviewForm.type === 'video' && (
                <div>
                  <Label htmlFor="meeting-link">رابط الاجتماع</Label>
                  <Input
                    id="meeting-link"
                    value={interviewForm.meetingLink}
                    onChange={(e) => setInterviewForm(prev => ({ ...prev, meetingLink: e.target.value }))}
                    placeholder="https://zoom.us/j/..."
                  />
                </div>
              )}

              {interviewForm.type === 'in-person' && (
                <div>
                  <Label htmlFor="location">الموقع</Label>
                  <Input
                    id="location"
                    value={interviewForm.location}
                    onChange={(e) => setInterviewForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="عنوان المقابلة"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  value={interviewForm.notes}
                  onChange={(e) => setInterviewForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="ملاحظات إضافية"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewInterviewDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleScheduleInterview}>
                  جدولة المقابلة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">مقابلات اليوم</p>
              <p className="text-2xl font-bold text-blue-600">{todayInterviews.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">المقابلات القادمة</p>
              <p className="text-2xl font-bold text-green-600">{upcomingInterviews.length}</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">مقابلات مؤكدة</p>
              <p className="text-2xl font-bold text-purple-600">
                {interviews.filter(i => i.status === 'confirmed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">مقابلات مكتملة</p>
              <p className="text-2xl font-bold text-orange-600">
                {interviews.filter(i => i.status === 'completed').length}
              </p>
            </div>
            <Users className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Interviews */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">مقابلات اليوم</h3>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            {todayInterviews.map((interview) => (
              <div key={interview.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{interview.applicantName}</h4>
                  <Badge className={`${getStatusColor(interview.status)} text-white`}>
                    {getStatusLabel(interview.status)}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {interview.position}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {interview.time}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      {getTypeIcon(interview.type)}
                      {getTypeLabel(interview.type)}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {todayInterviews.length === 0 && (
              <p className="text-center text-slate-500 py-8">لا توجد مقابلات مجدولة لليوم</p>
            )}
          </div>
        </Card>

        {/* Upcoming Interviews */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">المقابلات القادمة</h3>
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-3">
            {upcomingInterviews.slice(0, 5).map((interview) => (
              <div key={interview.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{interview.applicantName}</h4>
                  <Badge className={`${getStatusColor(interview.status)} text-white`}>
                    {getStatusLabel(interview.status)}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {interview.position}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {interview.date}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {interview.time}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {upcomingInterviews.length === 0 && (
              <p className="text-center text-slate-500 py-8">لا توجد مقابلات قادمة</p>
            )}
          </div>
        </Card>
      </div>

      {/* Available Time Slots */}
      <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">الأوقات المتاحة</h3>
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {availableSlots.map((slot, index) => (
            <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">{slot.date}</span>
                <span className="text-sm text-green-600 dark:text-green-400">{slot.time}</span>
              </div>
              <p className="text-xs text-green-700 dark:text-green-300">{slot.interviewer}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};