import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  CalendarClock,
  Video,
  Users,
  Clock,
  MapPin,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  Play,
  Pause,
  Square,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share,
  MessageSquare,
  Bell,
  Calendar as CalendarIcon,
  Zap,
  Star,
  TrendingUp,
  Globe,
  Shield,
  Smartphone
} from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'in_person' | 'hybrid';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'postponed';
  startTime: string;
  endTime: string;
  duration: number;
  organizer: string;
  participants: Participant[];
  location?: string;
  meetingRoom?: string;
  agenda: string[];
  notes?: string;
  recording?: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  department: string;
  category: 'team' | 'project' | 'client' | 'training' | 'board' | 'one_on_one';
  attachments: string[];
  actionItems: ActionItem[];
}

interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'presenter' | 'attendee' | 'optional';
  status: 'accepted' | 'declined' | 'pending' | 'tentative';
  joinedAt?: string;
  leftAt?: string;
}

interface ActionItem {
  id: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

interface SmartMeetingManagementProps {
  onBack: () => void;
}

export const SmartMeetingManagement: React.FC<SmartMeetingManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('meetings');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Mock meetings data
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 'MTG001',
      title: 'اجتماع مراجعة المشروع الشهرية',
      description: 'مراجعة تقدم المشروع ومناقشة التحديات والخطوات القادمة',
      type: 'video',
      status: 'scheduled',
      startTime: '2024-12-26 10:00',
      endTime: '2024-12-26 11:30',
      duration: 90,
      organizer: 'أحمد محمد العلي',
      participants: [
        { id: 'P1', name: 'سارة أحمد', email: 'sara@company.com', role: 'presenter', status: 'accepted' },
        { id: 'P2', name: 'محمد خالد', email: 'mohamed@company.com', role: 'attendee', status: 'accepted' },
        { id: 'P3', name: 'فاطمة علي', email: 'fatima@company.com', role: 'attendee', status: 'pending' }
      ],
      agenda: ['مراجعة الإنجازات', 'مناقشة التحديات', 'الخطة القادمة', 'توزيع المهام'],
      recording: true,
      priority: 'high',
      department: 'تقنية المعلومات',
      category: 'project',
      attachments: ['project_report.pdf', 'timeline.xlsx'],
      actionItems: [
        {
          id: 'AI1',
          description: 'إعداد تقرير الحالة الأسبوعي',
          assignee: 'سارة أحمد',
          dueDate: '2024-12-30',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'MTG002',
      title: 'جلسة العصف الذهني للمنتج الجديد',
      description: 'جلسة إبداعية لطرح أفكار المنتج الجديد',
      type: 'hybrid',
      status: 'ongoing',
      startTime: '2024-12-25 14:00',
      endTime: '2024-12-25 16:00',
      duration: 120,
      organizer: 'ليلى سالم',
      participants: [
        { id: 'P4', name: 'عبدالله محمد', email: 'abdullah@company.com', role: 'attendee', status: 'accepted', joinedAt: '14:05' },
        { id: 'P5', name: 'نورا عبدالرحمن', email: 'nora@company.com', role: 'attendee', status: 'accepted', joinedAt: '14:02' }
      ],
      meetingRoom: 'قاعة الابتكار - الطابق الثالث',
      agenda: ['مراجعة السوق', 'الأفكار الأولية', 'تحليل المنافسين', 'الخطة التنفيذية'],
      recording: true,
      priority: 'medium',
      department: 'التطوير',
      category: 'team',
      attachments: ['market_research.pdf'],
      actionItems: []
    },
    {
      id: 'MTG003',
      title: 'لقاء تقييم الأداء الفردي',
      description: 'جلسة تقييم أداء فردية مع الموظف',
      type: 'in_person',
      status: 'completed',
      startTime: '2024-12-24 09:00',
      endTime: '2024-12-24 10:00',
      duration: 60,
      organizer: 'هند عبدالله',
      participants: [
        { id: 'P6', name: 'خالد أحمد', email: 'khalid@company.com', role: 'attendee', status: 'accepted' }
      ],
      location: 'مكتب الموارد البشرية',
      agenda: ['مراجعة الأهداف', 'تقييم الإنجازات', 'التطوير المهني', 'الأهداف القادمة'],
      notes: 'أداء ممتاز خلال الربع، يحتاج تطوير مهارات القيادة',
      priority: 'medium',
      department: 'الموارد البشرية',
      category: 'one_on_one',
      attachments: ['performance_report.pdf'],
      actionItems: [
        {
          id: 'AI2',
          description: 'التسجيل في دورة القيادة',
          assignee: 'خالد أحمد',
          dueDate: '2025-01-15',
          status: 'pending',
          priority: 'medium'
        }
      ]
    }
  ]);

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || meeting.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: 'مجدول', class: 'bg-blue-100 text-blue-800 border-blue-200', icon: CalendarIcon },
      ongoing: { label: 'جاري', class: 'bg-green-100 text-green-800 border-green-200', icon: Play },
      completed: { label: 'مكتمل', class: 'bg-gray-100 text-gray-800 border-gray-200', icon: CheckCircle2 },
      cancelled: { label: 'ملغي', class: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
      postponed: { label: 'مؤجل', class: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.class}>
        <IconComponent className="h-3 w-3 ml-1" />
        {config.label}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      video: Video,
      audio: Mic,
      in_person: Users,
      hybrid: Globe
    };
    return icons[type as keyof typeof icons] || Video;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'منخفض', class: 'bg-gray-100 text-gray-800' },
      medium: { label: 'متوسط', class: 'bg-blue-100 text-blue-800' },
      high: { label: 'عالي', class: 'bg-orange-100 text-orange-800' },
      urgent: { label: 'عاجل', class: 'bg-red-100 text-red-800' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Badge className={config.class} variant="outline">
        {config.label}
      </Badge>
    );
  };

  const handleJoinMeeting = (meetingId: string) => {
    toast({
      title: "الانضمام للاجتماع",
      description: "جاري فتح رابط الاجتماع..."
    });
  };

  const handleCancelMeeting = (meetingId: string) => {
    setMeetings(prev => prev.map(meeting => 
      meeting.id === meetingId ? { ...meeting, status: 'cancelled' as const } : meeting
    ));
    toast({
      title: "تم إلغاء الاجتماع",
      description: "سيتم إشعار جميع المشاركين بالإلغاء"
    });
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 to-background">
      {/* Professional Header */}
      <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-[#009F87]/10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-[#009F87]/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#009F87]/10 rounded-lg">
                <CalendarClock className="h-6 w-6 text-[#009F87]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#009F87]">إدارة الاجتماعات الذكية</h1>
                <p className="text-muted-foreground">نظام شامل لجدولة وإدارة الاجتماعات والمؤتمرات</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 ml-2" />
              الإحصائيات
            </Button>
            <Button size="sm" className="bg-[#009F87] hover:bg-[#008072]">
              <Plus className="h-4 w-4 ml-2" />
              اجتماع جديد
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6">
          <Card className="border-[#009F87]/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#009F87]">
                {meetings.length}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي الاجتماعات</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {meetings.filter(m => m.status === 'scheduled').length}
              </div>
              <div className="text-sm text-muted-foreground">مجدولة</div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {meetings.filter(m => m.status === 'ongoing').length}
              </div>
              <div className="text-sm text-muted-foreground">جارية</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {meetings.filter(m => m.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">مكتملة</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(meetings.reduce((avg, m) => avg + m.duration, 0) / meetings.length)}
              </div>
              <div className="text-sm text-muted-foreground">متوسط المدة (دقيقة)</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-white/90 backdrop-blur">
          <TabsTrigger value="meetings" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <CalendarClock className="h-4 w-4 ml-2" />
            الاجتماعات
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <CalendarIcon className="h-4 w-4 ml-2" />
            التقويم
          </TabsTrigger>
          <TabsTrigger value="rooms" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <MapPin className="h-4 w-4 ml-2" />
            القاعات
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 ml-2" />
            التحليلات
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Settings className="h-4 w-4 ml-2" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meetings" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="البحث في الاجتماعات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="h-4 w-4 ml-2" />
                    <SelectValue placeholder="حالة الاجتماع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="scheduled">مجدولة</SelectItem>
                    <SelectItem value="ongoing">جارية</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                    <SelectItem value="cancelled">ملغية</SelectItem>
                    <SelectItem value="postponed">مؤجلة</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Upload className="h-4 w-4 ml-2" />
                  استيراد
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Meetings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeetings.map((meeting) => {
              const TypeIcon = getTypeIcon(meeting.type);
              return (
                <Card key={meeting.id} className="bg-white/90 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#009F87]/10 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-[#009F87]" />
                        </div>
                        <div>
                          <CardTitle className="text-lg line-clamp-1">{meeting.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{meeting.organizer}</p>
                        </div>
                      </div>
                      {getStatusBadge(meeting.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{meeting.description}</p>
                    
                    {/* Meeting Time */}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{meeting.startTime} - {meeting.endTime}</span>
                    </div>

                    {/* Location/Room */}
                    {(meeting.location || meeting.meetingRoom) && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="line-clamp-1">{meeting.location || meeting.meetingRoom}</span>
                      </div>
                    )}

                    {/* Participants */}
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{meeting.participants.length} مشارك</span>
                      {getPriorityBadge(meeting.priority)}
                    </div>

                    {/* Department and Category */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium text-[#009F87]">{meeting.department}</div>
                        <div className="text-muted-foreground">القسم</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium text-purple-600">{meeting.duration} دقيقة</div>
                        <div className="text-muted-foreground">المدة</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {meeting.status === 'scheduled' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleJoinMeeting(meeting.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <Video className="h-4 w-4 ml-2" />
                            انضمام
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelMeeting(meeting.id)}
                            className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 ml-2" />
                            إلغاء
                          </Button>
                        </>
                      )}
                      {meeting.status === 'ongoing' && (
                        <Button
                          size="sm"
                          onClick={() => handleJoinMeeting(meeting.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="h-4 w-4 ml-2" />
                          انضمام الآن
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedMeeting(meeting);
                          setShowMeetingDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4 ml-2" />
                        التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          {/* Calendar View */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-[#009F87]" />
                تقويم الاجتماعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Calendar
                    mode="single"
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">اجتماعات اليوم</h3>
                  <div className="space-y-3">
                    {meetings.filter(m => m.status === 'scheduled').slice(0, 3).map((meeting) => (
                      <div key={meeting.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-sm">{meeting.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {meeting.startTime} - {meeting.participants.length} مشارك
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-6">
          {/* Meeting Rooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'قاعة الابتكار', capacity: 12, status: 'available', equipment: ['بروجكتر', 'لوح ذكي', 'نظام صوتي'] },
              { name: 'قاعة المؤتمرات الكبرى', capacity: 50, status: 'occupied', equipment: ['نظام فيديو', 'ميكروفونات', 'كاميرات'] },
              { name: 'غرفة الاجتماعات التنفيذية', capacity: 8, status: 'maintenance', equipment: ['شاشة تفاعلية', 'نظام صوتي'] },
              { name: 'قاعة التدريب', capacity: 25, status: 'available', equipment: ['بروجكتر', 'أجهزة كمبيوتر', 'نظام صوتي'] }
            ].map((room, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur border-[#009F87]/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-[#009F87]" />
                      {room.name}
                    </CardTitle>
                    <Badge className={`${
                      room.status === 'available' ? 'bg-green-100 text-green-800' :
                      room.status === 'occupied' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {room.status === 'available' ? 'متاحة' :
                       room.status === 'occupied' ? 'مشغولة' : 'صيانة'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>سعة {room.capacity} شخص</span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">المعدات المتاحة:</h4>
                    <div className="flex flex-wrap gap-1">
                      {room.equipment.map((item, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full"
                    disabled={room.status !== 'available'}
                  >
                    {room.status === 'available' ? 'حجز القاعة' : 'غير متاحة'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#009F87]" />
                  توزيع الاجتماعات حسب النوع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'فيديو', count: 12, color: 'bg-blue-500' },
                    { type: 'صوتي', count: 8, color: 'bg-green-500' },
                    { type: 'حضوري', count: 6, color: 'bg-purple-500' },
                    { type: 'مختلط', count: 4, color: 'bg-orange-500' }
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${item.color}`}></div>
                        <span className="text-sm">{item.type}</span>
                      </div>
                      <span className="font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#009F87]" />
                  معدل الحضور حسب القسم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { dept: 'تقنية المعلومات', rate: 95 },
                    { dept: 'التطوير', rate: 88 },
                    { dept: 'الموارد البشرية', rate: 92 },
                    { dept: 'المبيعات', rate: 85 },
                    { dept: 'خدمة العملاء', rate: 90 }
                  ].map((item) => (
                    <div key={item.dept} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.dept}</span>
                        <span>{item.rate}%</span>
                      </div>
                      <Progress value={item.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#009F87]" />
                مؤشرات الأداء الرئيسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#009F87]">94%</div>
                  <div className="text-sm text-muted-foreground">معدل الحضور</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +3% من الشهر الماضي
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">87</div>
                  <div className="text-sm text-muted-foreground">متوسط المدة (دقيقة)</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    -8 دقائق تحسن
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-purple-600">4.7</div>
                  <div className="text-sm text-muted-foreground">تقييم الجودة</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <Star className="h-3 w-3" />
                    +0.2 تحسن
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-orange-600">156</div>
                  <div className="text-sm text-muted-foreground">اجتماعات هذا الشهر</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% زيادة
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Settings */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#009F87]" />
                إعدادات نظام الاجتماعات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">إعدادات عامة</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>مدة الاجتماع الافتراضية (دقيقة)</Label>
                      <Input defaultValue="60" type="number" />
                    </div>
                    <div>
                      <Label>تذكير قبل الاجتماع (دقيقة)</Label>
                      <Input defaultValue="15" type="number" />
                    </div>
                    <div>
                      <Label>حد أقصى للمشاركين</Label>
                      <Input defaultValue="50" type="number" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">إعدادات التسجيل</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>تفعيل التسجيل التلقائي</Label>
                      <Select defaultValue="optional">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="always">دائماً</SelectItem>
                          <SelectItem value="optional">اختياري</SelectItem>
                          <SelectItem value="never">أبداً</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>مدة حفظ التسجيلات (يوم)</Label>
                      <Input defaultValue="30" type="number" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Meeting Details Dialog */}
      <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-[#009F87]">
              <CalendarClock className="h-6 w-6" />
              تفاصيل الاجتماع
            </DialogTitle>
          </DialogHeader>
          {selectedMeeting && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#009F87]/10 rounded-lg">
                  <Video className="h-8 w-8 text-[#009F87]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedMeeting.title}</h3>
                  <p className="text-muted-foreground">{selectedMeeting.organizer} - {selectedMeeting.department}</p>
                  {getStatusBadge(selectedMeeting.status)}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات الاجتماع</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">وقت البدء:</span>
                        <span className="font-medium">{selectedMeeting.startTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">وقت الانتهاء:</span>
                        <span className="font-medium">{selectedMeeting.endTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المدة:</span>
                        <span className="font-medium">{selectedMeeting.duration} دقيقة</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">النوع:</span>
                        <span className="font-medium">{selectedMeeting.type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>المشاركون ({selectedMeeting.participants.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedMeeting.participants.map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{participant.name}</div>
                            <div className="text-xs text-muted-foreground">{participant.role}</div>
                          </div>
                          <Badge className={`${
                            participant.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            participant.status === 'declined' ? 'bg-red-100 text-red-800' :
                            participant.status === 'tentative' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`} variant="outline">
                            {participant.status === 'accepted' ? 'مقبول' :
                             participant.status === 'declined' ? 'مرفوض' :
                             participant.status === 'tentative' ? 'مؤقت' : 'في الانتظار'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>جدول الأعمال</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedMeeting.agenda.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#009F87]/10 rounded-full flex items-center justify-center text-xs font-medium text-[#009F87]">
                          {index + 1}
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedMeeting.actionItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>عناصر العمل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedMeeting.actionItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium text-sm">{item.description}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.assignee} - استحقاق: {item.dueDate}
                            </div>
                          </div>
                          <Badge className={`${
                            item.status === 'completed' ? 'bg-green-100 text-green-800' :
                            item.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`} variant="outline">
                            {item.status === 'completed' ? 'مكتمل' :
                             item.status === 'in_progress' ? 'قيد التنفيذ' : 'في الانتظار'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};