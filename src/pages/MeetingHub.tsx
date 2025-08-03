import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Video, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  Play, 
  Pause, 
  Monitor, 
  MessageSquare,
  Clock,
  CheckSquare,
  Upload,
  Download,
  Search,
  Filter,
  BarChart3,
  UserCheck,
  Crown,
  Shield,
  ArrowLeft,
  Mic,
  MicOff,
  VideoOff,
  MoreVertical,
  Share2,
  PhoneOff,
  Maximize,
  Send,
  Paperclip,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar as CalendarIcon,
  AlertCircle,
  TrendingUp,
  Activity,
  Zap,
  Target,
  Award,
  User,
  Building2,
  PieChart,
  BarChart,
  LineChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function MeetingHub() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'أحمد محمد', message: 'مرحباً بالجميع في الاجتماع', time: '10:05' },
    { id: 2, sender: 'سارة أحمد', message: 'أهلاً وسهلاً، جاهزون للبدء', time: '10:06' }
  ]);

  // Mock data for demonstration
  const upcomingMeetings = [
    {
      id: 1,
      title: 'اجتماع مجلس الإدارة الشهري',
      type: 'board',
      date: '2024-01-15',
      time: '10:00',
      attendees: 8,
      status: 'scheduled',
      priority: 'high'
    },
    {
      id: 2,
      title: 'اجتماع فريق التطوير',
      type: 'team',
      date: '2024-01-15',
      time: '14:00',
      attendees: 12,
      status: 'scheduled',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'مراجعة الأداء الربع سنوي',
      type: 'executive',
      date: '2024-01-16',
      time: '09:00',
      attendees: 5,
      status: 'scheduled',
      priority: 'high'
    }
  ];

  const recentMeetings = [
    {
      id: 1,
      title: 'اجتماع الطوارئ - قرارات مالية',
      date: '2024-01-10',
      duration: '45 دقيقة',
      recording: true,
      documents: 3,
      tasks: 5
    },
    {
      id: 2,
      title: 'اجتماع فريق المبيعات',
      date: '2024-01-08',
      duration: '30 دقيقة',
      recording: true,
      documents: 2,
      tasks: 3
    }
  ];

  // Advanced dashboard metrics
  const dashboardMetrics = [
    { 
      title: 'الاجتماعات اليوم', 
      value: '12', 
      icon: Calendar, 
      color: 'text-blue-600',
      change: '+15%',
      trend: 'up'
    },
    { 
      title: 'المشاركون النشطون', 
      value: '145', 
      icon: Users, 
      color: 'text-green-600',
      change: '+8%',
      trend: 'up'
    },
    { 
      title: 'ساعات الاجتماعات', 
      value: '45.5', 
      icon: Clock, 
      color: 'text-orange-600',
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'معدل الحضور', 
      value: '94%', 
      icon: BarChart3, 
      color: 'text-purple-600',
      change: '+3%',
      trend: 'up'
    }
  ];

  // Function handlers for all icons and interactions
  const handleJoinMeeting = (meetingId: number) => {
    toast({
      title: "انضمام للاجتماع",
      description: `تم الانضمام لاجتماع رقم ${meetingId} بنجاح`,
    });
    setIsInMeeting(true);
  };

  const handleStartNewMeeting = () => {
    toast({
      title: "بدء اجتماع جديد",
      description: "تم إنشاء اجتماع جديد بنجاح",
    });
    setIsInMeeting(true);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "تم إلغاء كتم الصوت" : "تم كتم الصوت",
      description: isMuted ? "الميكروفون مفعل الآن" : "الميكروفون مكتوم الآن",
    });
  };

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "تم إيقاف الفيديو" : "تم تشغيل الفيديو",
      description: isVideoOn ? "الكاميرا متوقفة الآن" : "الكاميرا تعمل الآن",
    });
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      title: isScreenSharing ? "تم إيقاف مشاركة الشاشة" : "تم بدء مشاركة الشاشة",
      description: isScreenSharing ? "توقفت مشاركة الشاشة" : "تم بدء مشاركة الشاشة بنجاح",
    });
  };

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "تم إيقاف التسجيل" : "تم بدء التسجيل",
      description: isRecording ? "توقف تسجيل الاجتماع" : "بدء تسجيل الاجتماع",
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'أنت',
        message: newMessage,
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
      toast({
        title: "تم إرسال الرسالة",
        description: "تم إرسال رسالتك بنجاح",
      });
    }
  };

  const handleDocumentUpload = () => {
    toast({
      title: "رفع المستند",
      description: "تم رفع المستند بنجاح",
    });
  };

  const handleScheduleMeeting = () => {
    toast({
      title: "جدولة اجتماع",
      description: "تم فتح نافذة جدولة اجتماع جديد",
    });
  };

  const handleViewDocument = (docName: string) => {
    toast({
      title: "عرض المستند",
      description: `تم فتح ${docName} للعرض`,
    });
  };

  const handleDownloadDocument = (docName: string) => {
    toast({
      title: "تحميل المستند",
      description: `تم بدء تحميل ${docName}`,
    });
  };

  const handleTaskDetails = (taskTitle: string) => {
    toast({
      title: "تفاصيل المهمة",
      description: `عرض تفاصيل: ${taskTitle}`,
    });
  };

  const handleCreateTask = () => {
    toast({
      title: "إنشاء مهمة جديدة",
      description: "تم فتح نافذة إنشاء مهمة جديدة",
    });
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'board': return Crown;
      case 'executive': return Shield;
      case 'team': return Users;
      default: return Users;
    }
  };

  const getMeetingTypeBadge = (type: string) => {
    switch (type) {
      case 'board': return <Badge className="bg-purple-100 text-purple-800">مجلس الإدارة</Badge>;
      case 'executive': return <Badge className="bg-blue-100 text-blue-800">الإدارة التنفيذية</Badge>;
      case 'team': return <Badge className="bg-green-100 text-green-800">فريق العمل</Badge>;
      default: return <Badge>عام</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
                العودة للرئيسية
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  نظام الاجتماعات الذكي
                </h1>
                <p className="text-muted-foreground text-lg">
                  منصة متكاملة لإدارة اجتماعات الشركة والتعاون الفعال
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => navigate('/meeting-hub/subscription')}
                variant="outline"
                className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
              >
                <Settings className="h-4 w-4" />
                إدارة الاشتراك
              </Button>
              <Button 
                onClick={handleStartNewMeeting}
                className="bg-primary hover:bg-primary/90 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Video className="h-4 w-4" />
                بدء اجتماع جديد
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {metric.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold text-foreground">
                        {metric.value}
                      </p>
                      <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <TrendingUp className="h-3 w-3" />
                        {metric.change}
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 group-hover:scale-110 transition-transform`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              الاجتماعات
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              المستندات
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              المهام
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Meetings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    الاجتماعات القادمة
                  </CardTitle>
                  <CardDescription>
                    الاجتماعات المجدولة للأيام القادمة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMeetings.map((meeting) => {
                      const TypeIcon = getMeetingTypeIcon(meeting.type);
                      return (
                        <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <TypeIcon className="h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium text-foreground">{meeting.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span>{meeting.date} - {meeting.time}</span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {meeting.attendees}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getMeetingTypeBadge(meeting.type)}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleJoinMeeting(meeting.id)}
                              className="hover:bg-primary hover:text-white transition-colors"
                            >
                              انضمام
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Meetings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    الاجتماعات الأخيرة
                  </CardTitle>
                  <CardDescription>
                    سجل الاجتماعات المنتهية مؤخراً
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMeetings.map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <h4 className="font-medium text-foreground">{meeting.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{meeting.date}</span>
                            <span>{meeting.duration}</span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {meeting.documents} مستندات
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckSquare className="h-3 w-3" />
                              {meeting.tasks} مهام
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {meeting.recording && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              مسجل
                            </Badge>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDocument(meeting.title)}
                            className="hover:bg-primary hover:text-white transition-colors"
                          >
                            عرض
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الاجتماعات</CardTitle>
                <CardDescription>
                  عرض وإدارة جميع الاجتماعات المجدولة والجارية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Button 
                    onClick={handleStartNewMeeting}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Video className="h-4 w-4" />
                    بدء اجتماع فوري
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleScheduleMeeting}
                    className="flex items-center gap-2 hover:bg-primary/10"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    جدولة اجتماع
                  </Button>
                  <div className="flex items-center gap-2 mr-auto">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="البحث في الاجتماعات..."
                      className="w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toast({ title: "فلترة", description: "تم تطبيق الفلاتر" })}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Live Meeting Interface */}
                {isInMeeting && (
                  <Card className="mb-6 border-primary">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <CardTitle className="text-lg">اجتماع مباشر</CardTitle>
                        </div>
                        <Button 
                          onClick={() => setIsInMeeting(false)}
                          variant="destructive"
                          size="sm"
                          className="hover:bg-red-600 transition-colors"
                        >
                          <PhoneOff className="h-4 w-4 mr-2" />
                          إنهاء الاجتماع
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Video Area */}
                        <div className="lg:col-span-3">
                          <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4 relative overflow-hidden">
                            <div className="text-white text-center">
                              {isVideoOn ? (
                                <div className="relative">
                                  <Video className="h-16 w-16 mx-auto mb-4 text-green-400" />
                                  <p className="text-lg">الفيديو المباشر</p>
                                  {isRecording && (
                                    <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-600 px-2 py-1 rounded text-sm">
                                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                      REC
                                    </div>
                                  )}
                                  {isScreenSharing && (
                                    <div className="absolute top-2 left-2 bg-blue-600 px-2 py-1 rounded text-sm">
                                      مشاركة الشاشة
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  <VideoOff className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                                  <p className="text-lg">الكاميرا متوقفة</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Meeting Controls - Enhanced */}
                          <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
                            <Button 
                              size="sm" 
                              variant={isMuted ? "destructive" : "outline"}
                              onClick={handleToggleMute}
                              className="flex items-center gap-2 transition-all hover:scale-105"
                            >
                              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                              {isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant={isVideoOn ? "outline" : "destructive"}
                              onClick={handleToggleVideo}
                              className="flex items-center gap-2 transition-all hover:scale-105"
                            >
                              {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                              {isVideoOn ? 'إيقاف الفيديو' : 'تشغيل الفيديو'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant={isScreenSharing ? "default" : "outline"}
                              onClick={handleScreenShare}
                              className="flex items-center gap-2 transition-all hover:scale-105"
                            >
                              <Monitor className="h-4 w-4" />
                              {isScreenSharing ? 'إيقاف المشاركة' : 'مشاركة الشاشة'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant={isRecording ? "destructive" : "outline"}
                              onClick={handleStartRecording}
                              className="flex items-center gap-2 transition-all hover:scale-105"
                            >
                              {isRecording ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              {isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={handleDocumentUpload}
                              className="flex items-center gap-2 transition-all hover:scale-105"
                            >
                              <Upload className="h-4 w-4" />
                              رفع مستند
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toast({ title: "ملء الشاشة", description: "تم تفعيل وضع ملء الشاشة" })}
                              className="flex items-center gap-2 transition-all hover:scale-105"
                            >
                              <Maximize className="h-4 w-4" />
                              ملء الشاشة
                            </Button>
                          </div>
                        </div>

                        {/* Chat & Participants */}
                        <div className="space-y-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                المشاركون (8)
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-muted transition-colors">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <User className="h-3 w-3" />
                                أحمد محمد (مدير الاجتماع)
                              </div>
                              <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-muted transition-colors">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <User className="h-3 w-3" />
                                سارة أحمد
                              </div>
                              <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-muted transition-colors">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <User className="h-3 w-3" />
                                محمد علي
                              </div>
                              <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-muted transition-colors">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <User className="h-3 w-3" />
                                فاطمة حسن
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                المحادثة المباشرة
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2 h-32 overflow-y-auto mb-3 p-2 border rounded">
                                {messages.map((msg) => (
                                  <div key={msg.id} className="text-xs p-2 bg-muted/50 rounded">
                                    <div className="flex items-center justify-between mb-1">
                                      <strong className="text-primary">{msg.sender}</strong>
                                      <span className="text-muted-foreground">{msg.time}</span>
                                    </div>
                                    <p>{msg.message}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Input 
                                  type="text" 
                                  placeholder="اكتب رسالة..."
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                  className="flex-1 text-sm"
                                />
                                <Button 
                                  size="sm"
                                  onClick={handleSendMessage}
                                  className="px-3"
                                >
                                  <Send className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Meetings List */}
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => {
                    const TypeIcon = getMeetingTypeIcon(meeting.type);
                    return (
                      <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <TypeIcon className="h-6 w-6 text-primary" />
                          <div>
                            <h4 className="font-medium text-foreground">{meeting.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{meeting.date} - {meeting.time}</span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {meeting.attendees} مشارك
                              </span>
                              {getMeetingTypeBadge(meeting.type)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toast({ title: "تعديل الاجتماع", description: `تم فتح نافذة تعديل ${meeting.title}` })}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            تعديل
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleJoinMeeting(meeting.id)}
                          >
                            انضمام
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المستندات</CardTitle>
                <CardDescription>
                  رفع وإدارة مستندات الاجتماعات والعروض التقديمية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handleDocumentUpload}
                  >
                    <Upload className="h-4 w-4" />
                    رفع مستند جديد
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => toast({ title: "إنشاء محضر", description: "تم إنشاء محضر اجتماع جديد" })}
                  >
                    <FileText className="h-4 w-4" />
                    إنشاء محضر اجتماع
                  </Button>
                  <div className="flex items-center gap-2 mr-auto">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="البحث في المستندات..."
                      className="w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'محضر اجتماع مجلس الإدارة.pdf', type: 'PDF', size: '2.4 MB', date: '2024-01-10' },
                    { name: 'عرض استراتيجية 2024.pptx', type: 'PowerPoint', size: '5.8 MB', date: '2024-01-08' },
                    { name: 'تقرير الأداء المالي.xlsx', type: 'Excel', size: '1.2 MB', date: '2024-01-05' },
                    { name: 'خطة التطوير.docx', type: 'Word', size: '890 KB', date: '2024-01-03' },
                  ].map((doc, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <Badge variant="outline">{doc.type}</Badge>
                        </div>
                        <h4 className="font-medium text-sm mb-2 line-clamp-2">{doc.name}</h4>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>الحجم: {doc.size}</p>
                          <p>التاريخ: {doc.date}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleDownloadDocument(doc.name)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            تحميل
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDocument(doc.name)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            عرض
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المهام</CardTitle>
                <CardDescription>
                  تتبع المهام المكلفة من الاجتماعات ومتابعة تنفيذها
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handleCreateTask}
                  >
                    <Plus className="h-4 w-4" />
                    إضافة مهمة جديدة
                  </Button>
                  <div className="flex items-center gap-2 mr-auto">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="البحث في المهام..."
                      className="w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toast({ title: "فلترة المهام", description: "تم تطبيق فلاتر المهام" })}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      title: 'إعداد تقرير المبيعات الشهري', 
                      assignee: 'أحمد محمد', 
                      dueDate: '2024-01-20', 
                      status: 'في التقدم',
                      priority: 'عالية',
                      meeting: 'اجتماع مجلس الإدارة'
                    },
                    { 
                      title: 'مراجعة سياسات الموارد البشرية', 
                      assignee: 'سارة أحمد', 
                      dueDate: '2024-01-25', 
                      status: 'جديدة',
                      priority: 'متوسطة',
                      meeting: 'اجتماع الإدارة التنفيذية'
                    },
                    { 
                      title: 'تحديث نظام إدارة المشاريع', 
                      assignee: 'محمد علي', 
                      dueDate: '2024-01-18', 
                      status: 'مكتملة',
                      priority: 'عالية',
                      meeting: 'اجتماع فريق التطوير'
                    },
                  ].map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <CheckSquare className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium text-foreground">{task.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>المكلف: {task.assignee}</span>
                            <span>التاريخ: {task.dueDate}</span>
                            <span>من: {task.meeting}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={task.status === 'مكتملة' ? 'default' : task.status === 'في التقدم' ? 'secondary' : 'outline'}
                          className={
                            task.status === 'مكتملة' ? 'bg-green-100 text-green-800' :
                            task.status === 'في التقدم' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {task.status}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={task.priority === 'عالية' ? 'border-red-300 text-red-700' : 'border-orange-300 text-orange-700'}
                        >
                          {task.priority}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleTaskDetails(task.title)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          تفاصيل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab - Enhanced Dashboard */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    تقارير وإحصائيات شاملة
                  </CardTitle>
                  <CardDescription>
                    تحليل متطور لأداء الاجتماعات والمشاركة والإنتاجية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-foreground mb-1">معدل الحضور</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-1">94%</div>
                      <p className="text-sm text-muted-foreground">متوسط حضور الاجتماعات</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-foreground mb-1">إنجاز المهام</h3>
                      <div className="text-3xl font-bold text-green-600 mb-1">92%</div>
                      <p className="text-sm text-muted-foreground">معدل إنجاز المهام في الوقت</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                      <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-foreground mb-1">المدة المتوسطة</h3>
                      <div className="text-3xl font-bold text-orange-600 mb-1">45</div>
                      <p className="text-sm text-muted-foreground">دقيقة لكل اجتماع</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="text-lg font-semibold text-foreground mb-1">تقييم الجودة</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-1">4.8</div>
                      <p className="text-sm text-muted-foreground">من 5 نجوم</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    توزيع الاجتماعات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Crown className="h-6 w-6 text-purple-600" />
                        <div>
                          <h4 className="font-medium">مجلس الإدارة</h4>
                          <p className="text-sm text-muted-foreground">اجتماعات استراتيجية</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">8</p>
                        <p className="text-sm text-muted-foreground">هذا الشهر</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <div>
                          <h4 className="font-medium">الإدارة التنفيذية</h4>
                          <p className="text-sm text-muted-foreground">اجتماعات تنفيذية</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">15</p>
                        <p className="text-sm text-muted-foreground">هذا الشهر</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="h-6 w-6 text-green-600" />
                        <div>
                          <h4 className="font-medium">فرق العمل</h4>
                          <p className="text-sm text-muted-foreground">اجتماعات تشغيلية</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">28</p>
                        <p className="text-sm text-muted-foreground">هذا الشهر</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  تحليلات متقدمة ومؤشرات الأداء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-medium mb-2">معدل الإنتاجية</h4>
                    <p className="text-3xl font-bold text-yellow-600">87%</p>
                    <p className="text-sm text-muted-foreground mt-1">تحسن بنسبة 12%</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <Building2 className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
                    <h4 className="font-medium mb-2">رضا المشاركين</h4>
                    <p className="text-3xl font-bold text-cyan-600">96%</p>
                    <p className="text-sm text-muted-foreground mt-1">تقييم إيجابي</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <BarChart className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <h4 className="font-medium mb-2">توفير الوقت</h4>
                    <p className="text-3xl font-bold text-indigo-600">65%</p>
                    <p className="text-sm text-muted-foreground mt-1">مقارنة بالطرق التقليدية</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => toast({ title: "تصدير التقرير", description: "تم تصدير التقرير الشامل بصيغة PDF" })}
                  >
                    <Download className="h-4 w-4" />
                    تصدير التقرير الشامل
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => toast({ title: "تحديث البيانات", description: "تم تحديث جميع البيانات والإحصائيات" })}
                  >
                    <Activity className="h-4 w-4" />
                    تحديث البيانات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}