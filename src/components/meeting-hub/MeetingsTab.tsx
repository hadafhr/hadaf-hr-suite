import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Plus, 
  Video, 
  Calendar as CalendarIcon, 
  Filter,
  MapPin,
  Clock,
  Users,
  Edit,
  Trash2,
  Play,
  Eye
} from 'lucide-react';
import { meetingService, Meeting } from '@/services/meetingService';
import { useToast } from '@/hooks/use-toast';

interface MeetingsTabProps {
  onJoinMeeting: (meetingId: string) => void;
}

export const MeetingsTab: React.FC<MeetingsTabProps> = ({ onJoinMeeting }) => {
  const { toast } = useToast();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    meeting_date: '',
    meeting_time: '',
    duration: 60,
    location: '',
    meeting_type: 'online' as Meeting['meeting_type'],
    priority: 'medium' as Meeting['priority'],
    organizer_name: 'المستخدم الحالي', // This should come from auth context
    organizer_id: 'current-user-id' // This should come from auth context
  });

  useEffect(() => {
    loadMeetings();
    
    // Subscribe to real-time changes
    const subscription = meetingService.subscribeToMeetingChanges(() => {
      loadMeetings();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    filterMeetings();
  }, [meetings, searchTerm, statusFilter, typeFilter]);

  const loadMeetings = async () => {
    try {
      setLoading(true);
      const data = await meetingService.getAllMeetings();
      setMeetings(data);
    } catch (error) {
      console.error('Error loading meetings:', error);
      toast({
        title: "خطأ في تحميل الاجتماعات",
        description: "حدث خطأ أثناء تحميل قائمة الاجتماعات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterMeetings = () => {
    let filtered = meetings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(meeting => 
        meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.organizer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(meeting => meeting.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(meeting => meeting.meeting_type === typeFilter);
    }

    setFilteredMeetings(filtered);
  };

  const handleCreateMeeting = async () => {
    try {
      if (!newMeeting.title || !newMeeting.meeting_date || !newMeeting.meeting_time) {
        toast({
          title: "بيانات ناقصة",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive"
        });
        return;
      }

      await meetingService.createMeeting({
        ...newMeeting,
        recording_enabled: true,
        status: 'scheduled'
      });

      setShowCreateDialog(false);
      setNewMeeting({
        title: '',
        description: '',
        meeting_date: '',
        meeting_time: '',
        duration: 60,
        location: '',
        meeting_type: 'online',
        priority: 'medium',
        organizer_name: 'المستخدم الحالي',
        organizer_id: 'current-user-id'
      });

      toast({
        title: "تم إنشاء الاجتماع",
        description: "تم إنشاء الاجتماع بنجاح وإرسال الدعوات",
      });

      loadMeetings();
    } catch (error) {
      console.error('Error creating meeting:', error);
      toast({
        title: "خطأ في إنشاء الاجتماع",
        description: "حدث خطأ أثناء إنشاء الاجتماع",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMeeting = async (meetingId: string) => {
    try {
      await meetingService.deleteMeeting(meetingId);
      toast({
        title: "تم حذف الاجتماع",
        description: "تم حذف الاجتماع بنجاح",
      });
      loadMeetings();
    } catch (error) {
      console.error('Error deleting meeting:', error);
      toast({
        title: "خطأ في حذف الاجتماع",
        description: "حدث خطأ أثناء حذف الاجتماع",
        variant: "destructive"
      });
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

  const getPriorityBadge = (priority: string) => {
    const configs = {
      high: { text: 'عالي', className: 'bg-red-100 text-red-800' },
      medium: { text: 'متوسط', className: 'bg-yellow-100 text-yellow-800' },
      low: { text: 'منخفض', className: 'bg-green-100 text-green-800' }
    };
    return configs[priority as keyof typeof configs] || configs.medium;
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
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>إدارة الاجتماعات</CardTitle>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  إنشاء اجتماع جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>إنشاء اجتماع جديد</DialogTitle>
                  <DialogDescription>
                    أدخل تفاصيل الاجتماع الجديد
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">عنوان الاجتماع *</Label>
                    <Input
                      id="title"
                      value={newMeeting.title}
                      onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                      placeholder="أدخل عنوان الاجتماع"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">الوصف</Label>
                    <Textarea
                      id="description"
                      value={newMeeting.description}
                      onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                      placeholder="أدخل وصف الاجتماع"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">التاريخ *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newMeeting.meeting_date}
                        onChange={(e) => setNewMeeting({...newMeeting, meeting_date: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">الوقت *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newMeeting.meeting_time}
                        onChange={(e) => setNewMeeting({...newMeeting, meeting_time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="duration">المدة (دقيقة)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newMeeting.duration}
                        onChange={(e) => setNewMeeting({...newMeeting, duration: parseInt(e.target.value) || 60})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">نوع الاجتماع</Label>
                      <Select value={newMeeting.meeting_type} onValueChange={(value: any) => setNewMeeting({...newMeeting, meeting_type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">إلكتروني</SelectItem>
                          <SelectItem value="in_person">حضوري</SelectItem>
                          <SelectItem value="hybrid">مدمج</SelectItem>
                          <SelectItem value="team">فريق</SelectItem>
                          <SelectItem value="board">مجلس إدارة</SelectItem>
                          <SelectItem value="executive">تنفيذي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">الموقع</Label>
                    <Input
                      id="location"
                      value={newMeeting.location}
                      onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
                      placeholder="أدخل موقع الاجتماع أو الرابط"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleCreateMeeting}>
                    إنشاء الاجتماع
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 min-w-64">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في الاجتماعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="scheduled">مجدول</SelectItem>
                <SelectItem value="ongoing">جاري</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="online">إلكتروني</SelectItem>
                <SelectItem value="in_person">حضوري</SelectItem>
                <SelectItem value="hybrid">مدمج</SelectItem>
                <SelectItem value="team">فريق</SelectItem>
                <SelectItem value="board">مجلس إدارة</SelectItem>
                <SelectItem value="executive">تنفيذي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">لا توجد اجتماعات</h3>
              <p className="text-gray-500">لم يتم العثور على اجتماعات تطابق المعايير المحددة</p>
            </CardContent>
          </Card>
        ) : (
          filteredMeetings.map((meeting) => (
            <Card key={meeting.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{meeting.title}</h3>
                      <Badge className={getStatusBadge(meeting.status).className}>
                        {getStatusBadge(meeting.status).text}
                      </Badge>
                      <Badge className={getMeetingTypeBadge(meeting.meeting_type).className}>
                        {getMeetingTypeBadge(meeting.meeting_type).text}
                      </Badge>
                      <Badge className={getPriorityBadge(meeting.priority).className}>
                        {getPriorityBadge(meeting.priority).text}
                      </Badge>
                    </div>
                    
                    {meeting.description && (
                      <p className="text-muted-foreground mb-3">{meeting.description}</p>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(meeting.meeting_date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatTime(meeting.meeting_time)} ({meeting.duration} دقيقة)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{meeting.location || 'غير محدد'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>منظم بواسطة: {meeting.organizer_name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {meeting.status === 'ongoing' && (
                      <Button onClick={() => onJoinMeeting(meeting.id)}>
                        <Video className="h-4 w-4 mr-2" />
                        انضمام
                      </Button>
                    )}
                    {meeting.status === 'scheduled' && (
                      <Button variant="outline" onClick={() => onJoinMeeting(meeting.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        تفاصيل
                      </Button>
                    )}
                    {meeting.status === 'completed' && meeting.recording_url && (
                      <Button variant="outline">
                        <Play className="h-4 w-4 mr-2" />
                        مشاهدة التسجيل
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteMeeting(meeting.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};