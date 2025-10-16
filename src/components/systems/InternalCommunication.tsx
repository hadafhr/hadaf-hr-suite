import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MessageSquare, Users, TrendingUp, Download, Plus, Search, Filter, Calendar, Building, Award, Target, BarChart3, PieChart, Activity, Zap, Eye, Settings, Bell, UserCheck, Sparkles, Archive, Edit, Trash2, Share, Lock, Unlock, AlertCircle, Info, UserPlus, Phone, Mail, Users2, Database, RefreshCw, Server, FileText, BookOpen, GraduationCap, Star, CheckCircle2, AlertTriangle, Clock, Upload, Camera, User, Briefcase, MapPin, Calendar as CalendarIcon, ThumbsUp, Percent, TrendingDown, Code, Heart, Lightbulb, Shield, Zap as ZapIcon, Cpu, Palette, Globe, BarChart, Route, GitBranch, Layers, Network, Compass, Map, ArrowUp, ArrowRight, ChevronRight, Trophy, Medal, Video, Monitor, Crosshair, Focus, Radar, Telescope, Binoculars, Gem, Diamond, Rocket, PlayCircle, Save, Megaphone, Newspaper, Send, Calendar as CalendarIcon2, Vote, MessageCircle, Paperclip, Image, Mic, CheckCircle, XCircle, ClockIcon, Bookmark, Tag, Hash } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar, LineChart, Line } from 'recharts';
interface InternalCommunicationProps {
  onBack: () => void;
}
export const InternalCommunication: React.FC<InternalCommunicationProps> = ({
  onBack
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير التواصل الداخلي كملف PDF"
    });
  };
  const handlePrint = () => {
    toast({
      title: "تم الإرسال للطباعة",
      description: "تم إرسال التقرير للطباعة بنجاح"
    });
  };
  const handleSave = () => {
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ البيانات بنجاح"
    });
  };
  const handleUpload = () => {
    toast({
      title: "تم الرفع بنجاح",
      description: "تم رفع الملفات بنجاح"
    });
  };
  const handleDownload = () => {
    toast({
      title: "تم التحميل بنجاح",
      description: "تم تحميل الملفات بنجاح"
    });
  };
  const handleSendMessage = () => {
    toast({
      title: "تم الإرسال بنجاح",
      description: "تم إرسال الرسالة بنجاح"
    });
  };

  // Mock data
  const dashboardKPIs = [{
    title: "الإعلانات النشطة",
    value: "24",
    change: "+5%",
    icon: Megaphone,
    color: "text-primary"
  }, {
    title: "معدل القراءة",
    value: "87%",
    change: "+12%",
    icon: Eye,
    color: "text-success"
  }, {
    title: "الاستطلاعات الجارية",
    value: "8",
    change: "+2",
    icon: Vote,
    color: "text-warning"
  }, {
    title: "الرسائل المرسلة",
    value: "1,247",
    change: "+18%",
    icon: Send,
    color: "text-info"
  }];
  const announcements = [{
    id: 1,
    title: "تحديث سياسة العمل من المنزل",
    content: "نود إعلامكم بتحديث سياسة العمل من المنزل للعام الجديد...",
    author: "إدارة الموارد البشرية",
    date: "2024-01-15",
    readCount: 156,
    totalEmployees: 200,
    priority: "عالي",
    department: "جميع الأقسام"
  }, {
    id: 2,
    title: "برنامج التدريب الصيفي",
    content: "سيتم إطلاق برنامج التدريب الصيفي للموظفين الجدد...",
    author: "قسم التطوير",
    date: "2024-01-10",
    readCount: 98,
    totalEmployees: 200,
    priority: "متوسط",
    department: "التطوير"
  }, {
    id: 3,
    title: "اجتماع الفريق الشهري",
    content: "يسرنا دعوتكم لحضور اجتماع الفريق الشهري...",
    author: "الإدارة العليا",
    date: "2024-01-08",
    readCount: 143,
    totalEmployees: 200,
    priority: "منخفض",
    department: "جميع الأقسام"
  }];
  const messages = [{
    id: 1,
    sender: "أحمد محمد",
    receiver: "فاطمة علي",
    subject: "تحديث المشروع",
    content: "السلام عليكم، أريد مناقشة آخر التحديثات على المشروع...",
    timestamp: "منذ 5 دقائق",
    status: "غير مقروء",
    hasAttachment: true
  }, {
    id: 2,
    sender: "سارة أحمد",
    receiver: "محمد خالد",
    subject: "موعد الاجتماع",
    content: "مرحباً، هل يمكننا تأجيل اجتماع الغد إلى الأسبوع القادم؟",
    timestamp: "منذ 15 دقيقة",
    status: "مقروء",
    hasAttachment: false
  }, {
    id: 3,
    sender: "نورا عبدالله",
    receiver: "فريق المبيعات",
    subject: "تقرير المبيعات الشهري",
    content: "إليكم تقرير المبيعات لهذا الشهر مع التحليلات...",
    timestamp: "منذ ساعة",
    status: "مقروء",
    hasAttachment: true
  }];
  const events = [{
    id: 1,
    title: "ورشة عمل الابتكار",
    description: "ورشة عمل تفاعلية حول الابتكار في مكان العمل",
    date: "2024-01-25",
    time: "10:00 ص",
    location: "قاعة المؤتمرات الرئيسية",
    attendees: 45,
    maxAttendees: 50,
    status: "مؤكد"
  }, {
    id: 2,
    title: "احتفالية إنجازات العام",
    description: "حفل سنوي لتكريم الموظفين المتميزين",
    date: "2024-02-01",
    time: "6:00 م",
    location: "فندق الريتز كارلتون",
    attendees: 180,
    maxAttendees: 200,
    status: "مؤكد"
  }, {
    id: 3,
    title: "دورة تدريبية - إدارة الوقت",
    description: "دورة متخصصة في تقنيات إدارة الوقت والإنتاجية",
    date: "2024-01-30",
    time: "2:00 م",
    location: "قاعة التدريب A",
    attendees: 28,
    maxAttendees: 30,
    status: "في الانتظار"
  }];
  const surveys = [{
    id: 1,
    title: "استطلاع رضا الموظفين 2024",
    description: "استطلاع شامل لقياس مستوى رضا الموظفين",
    responses: 145,
    targetResponses: 200,
    endDate: "2024-01-31",
    status: "نشط",
    avgRating: 4.2
  }, {
    id: 2,
    title: "تقييم بيئة العمل",
    description: "استطلاع حول جودة بيئة العمل والمرافق",
    responses: 89,
    targetResponses: 150,
    endDate: "2024-02-05",
    status: "نشط",
    avgRating: 3.8
  }, {
    id: 3,
    title: "اقتراحات التطوير",
    description: "جمع اقتراحات الموظفين لتطوير العمليات",
    responses: 67,
    targetResponses: 100,
    endDate: "2024-01-28",
    status: "مكتمل",
    avgRating: 4.5
  }];
  const newsletters = [{
    id: 1,
    title: "نشرة الشركة - يناير 2024",
    type: "PDF",
    size: "2.3 MB",
    views: 234,
    downloads: 156,
    publishDate: "2024-01-01"
  }, {
    id: 2,
    title: "تحديثات السياسات الجديدة",
    type: "Video",
    size: "45.2 MB",
    views: 189,
    downloads: 0,
    publishDate: "2024-01-05"
  }, {
    id: 3,
    title: "إنجازات الربع الأخير",
    type: "Presentation",
    size: "8.7 MB",
    views: 167,
    downloads: 89,
    publishDate: "2024-01-10"
  }];
  const communicationChartData = [{
    name: 'يناير',
    announcements: 12,
    messages: 456,
    surveys: 3,
    events: 5
  }, {
    name: 'فبراير',
    announcements: 15,
    messages: 523,
    surveys: 4,
    events: 7
  }, {
    name: 'مارس',
    announcements: 18,
    messages: 612,
    surveys: 2,
    events: 6
  }, {
    name: 'أبريل',
    announcements: 14,
    messages: 578,
    surveys: 5,
    events: 8
  }, {
    name: 'مايو',
    announcements: 20,
    messages: 689,
    surveys: 3,
    events: 9
  }, {
    name: 'يونيو',
    announcements: 24,
    messages: 734,
    surveys: 6,
    events: 11
  }];
  const engagementData = [{
    name: 'قراءة الإعلانات',
    value: 87,
    color: '#22c55e'
  }, {
    name: 'المشاركة في الاستطلاع',
    value: 73,
    color: '#3b82f6'
  }, {
    name: 'حضور الفعاليات',
    value: 65,
    color: '#f59e0b'
  }, {
    name: 'التفاعل مع المحتوى',
    value: 58,
    color: '#ef4444'
  }];
  const renderHeader = () => <div className="space-y-6">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">قسم التواصل الداخلي </h1>
        <p className="text-muted-foreground">منظومة شاملة للتواصل الداخلي والإعلانات مع إدارة المحتوى والرسائل</p>
      </div>
    </div>;
  const renderDashboard = () => <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardKPIs.map((kpi, index) => <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="text-success bg-success/10">
                      {kpi.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-primary/10 ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              إحصائيات التواصل الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={communicationChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="announcements" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                <Area type="monotone" dataKey="messages" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="surveys" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                <Area type="monotone" dataKey="events" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              معدلات المشاركة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie data={engagementData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
                  {engagementData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('announcements')}>
          <CardContent className="p-6 text-center">
            <Megaphone className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">الإعلانات</h3>
            <p className="text-muted-foreground text-sm">إدارة الإعلانات والأخبار</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('messaging')}>
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">الرسائل</h3>
            <p className="text-muted-foreground text-sm">التراسل الداخلي</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('events')}>
          <CardContent className="p-6 text-center">
            <CalendarIcon2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">الفعاليات</h3>
            <p className="text-muted-foreground text-sm">إدارة الأحداث والفعاليات</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('surveys')}>
          <CardContent className="p-6 text-center">
            <Vote className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">الاستطلاعات</h3>
            <p className="text-muted-foreground text-sm">جمع آراء الموظفين</p>
          </CardContent>
        </Card>
      </div>
    </div>;
  const renderAnnouncements = () => <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">الإعلانات والأخبار</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إعلان جديد
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {announcements.map(announcement => <Card key={announcement.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Megaphone className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{announcement.title}</h3>
                    <Badge variant={announcement.priority === 'عالي' ? 'destructive' : announcement.priority === 'متوسط' ? 'default' : 'secondary'}>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {announcement.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {announcement.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {announcement.department}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(announcement.readCount / announcement.totalEmployees * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">معدل القراءة</div>
                    <Progress value={announcement.readCount / announcement.totalEmployees * 100} className="w-20 mt-1" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowEditDialog(true)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
  const renderMessaging = () => <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">الرسائل الداخلية</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button size="sm" onClick={handleSendMessage}>
            <Plus className="h-4 w-4 ml-2" />
            رسالة جديدة
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map(message => <Card key={message.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{message.subject}</h3>
                      <Badge variant={message.status === 'غير مقروء' ? 'destructive' : 'secondary'}>
                        {message.status}
                      </Badge>
                      {message.hasAttachment && <Badge variant="outline">
                          <Paperclip className="h-3 w-3 ml-1" />
                          مرفق
                        </Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{message.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>من: {message.sender}</span>
                      <span>إلى: {message.receiver}</span>
                      <span>{message.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
  const renderNewsletters = () => <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">النشرات والمحتوى التوعوي</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            نشرة جديدة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsletters.map(newsletter => <Card key={newsletter.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {newsletter.type === 'PDF' && <FileText className="h-8 w-8 text-red-500" />}
                {newsletter.type === 'Video' && <Video className="h-8 w-8 text-blue-500" />}
                {newsletter.type === 'Presentation' && <Monitor className="h-8 w-8 text-green-500" />}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{newsletter.title}</h3>
                  <p className="text-sm text-muted-foreground">{newsletter.type} • {newsletter.size}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المشاهدات:</span>
                  <span className="font-medium">{newsletter.views}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">التحميلات:</span>
                  <span className="font-medium">{newsletter.downloads}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">تاريخ النشر:</span>
                  <span className="font-medium">{newsletter.publishDate}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3 w-3 ml-1" />
                  عرض
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={handleDownload}>
                  <Download className="h-3 w-3 ml-1" />
                  تحميل
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
  const renderEvents = () => <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">الفعاليات والأنشطة</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            فعالية جديدة
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {events.map(event => <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <CalendarIcon2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                      <Badge variant={event.status === 'مؤكد' ? 'default' : 'secondary'}>
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{event.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {event.date} - {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {event.attendees}/{event.maxAttendees}
                    </div>
                    <div className="text-xs text-muted-foreground">المشاركون</div>
                    <Progress value={event.attendees / event.maxAttendees * 100} className="w-20 mt-1" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
  const renderSurveys = () => <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">الاستطلاعات والملاحظات</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير النتائج
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            استطلاع جديد
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {surveys.map(survey => <Card key={survey.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Vote className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{survey.title}</h3>
                      <Badge variant={survey.status === 'نشط' ? 'default' : 'secondary'}>
                        {survey.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{survey.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {survey.responses}/{survey.targetResponses} إجابة
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        ينتهي في {survey.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {survey.avgRating}/5.0
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(survey.responses / survey.targetResponses * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">معدل الاستجابة</div>
                    <Progress value={survey.responses / survey.targetResponses * 100} className="w-20 mt-1" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
  const renderSettings = () => <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">إعدادات التواصل الداخلي</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع إعدادات
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل إعدادات
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Settings className="h-4 w-4 ml-2" />
            حفظ الإعدادات
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>صلاحيات النشر</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>تحديد من يمكنه نشر الإعلانات وإنشاء الاستطلاعات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[{
            role: "مدير الموارد البشرية",
            permissions: ["إعلانات", "استطلاعات", "فعاليات", "رسائل"]
          }, {
            role: "مدير الأقسام",
            permissions: ["إعلانات القسم", "رسائل"]
          }, {
            role: "الموظف",
            permissions: ["رسائل", "استطلاعات"]
          }].map((permission, index) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{permission.role}</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {permission.permissions.map((perm, idx) => <Badge key={idx} variant="outline" className="text-xs">
                        {perm}
                      </Badge>)}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>قوالب الإشعارات</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>إدارة قوالب الإعلانات والنشرات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="template-type">نوع القالب</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">إعلان</SelectItem>
                    <SelectItem value="newsletter">نشرة</SelectItem>
                    <SelectItem value="survey">استطلاع</SelectItem>
                    <SelectItem value="event">فعالية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="template-name">اسم القالب</Label>
                <Input id="template-name" placeholder="أدخل اسم القالب" />
              </div>
            </div>
            <div>
              <Label htmlFor="template-content">محتوى القالب</Label>
              <Textarea id="template-content" placeholder="أدخل محتوى القالب" className="h-32" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>تكوين إعدادات الإشعارات والتنبيهات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>إشعارات البريد الإلكتروني</span>
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>الإشعارات الفورية</span>
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>إشعارات الموبايل</span>
                <Button variant="outline" size="sm">
                  <XCircle className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>التذكيرات التلقائية</span>
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;

  // Add Dialog
  const renderAddDialog = () => <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>إضافة عنصر جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">العنوان</Label>
              <Input id="title" placeholder="أدخل العنوان" />
            </div>
            <div>
              <Label htmlFor="type">النوع</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">إعلان</SelectItem>
                  <SelectItem value="message">رسالة</SelectItem>
                  <SelectItem value="event">فعالية</SelectItem>
                  <SelectItem value="survey">استطلاع</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">الأولوية</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">عالي</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">القسم المستهدف</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  <SelectItem value="hr">الموارد البشرية</SelectItem>
                  <SelectItem value="it">تكنولوجيا المعلومات</SelectItem>
                  <SelectItem value="finance">المالية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="content">المحتوى</Label>
            <Textarea id="content" placeholder="أدخل المحتوى" className="h-32" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => {
            handleSave();
            setShowAddDialog(false);
          }}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
  return <div className="min-h-screen bg-background">
      {renderHeader()}
      <div className="container mx-auto px-6 py-8 bg-card backdrop-blur-xl rounded-3xl shadow-2xl border border-border hover:border-accent animate-fade-in transition-all duration-300">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-muted backdrop-blur-xl rounded-3xl shadow-2xl border border-border hover:border-accent animate-fade-in transition-all duration-300 p-1 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex flex-col gap-1 py-3">
              <Megaphone className="h-4 w-4" />
              <span className="text-xs">الإعلانات</span>
            </TabsTrigger>
            <TabsTrigger value="messaging" className="flex flex-col gap-1 py-3">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">الرسائل</span>
            </TabsTrigger>
            <TabsTrigger value="newsletters" className="flex flex-col gap-1 py-3">
              <Newspaper className="h-4 w-4" />
              <span className="text-xs">النشرات</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex flex-col gap-1 py-3">
              <CalendarIcon2 className="h-4 w-4" />
              <span className="text-xs">الفعاليات</span>
            </TabsTrigger>
            <TabsTrigger value="surveys" className="flex flex-col gap-1 py-3">
              <Vote className="h-4 w-4" />
              <span className="text-xs">الاستطلاعات</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col gap-1 py-3">
              <Settings className="h-4 w-4" />
              <span className="text-xs">الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
          <TabsContent value="announcements">{renderAnnouncements()}</TabsContent>
          <TabsContent value="messaging">{renderMessaging()}</TabsContent>
          <TabsContent value="newsletters">{renderNewsletters()}</TabsContent>
          <TabsContent value="events">{renderEvents()}</TabsContent>
          <TabsContent value="surveys">{renderSurveys()}</TabsContent>
          <TabsContent value="settings">{renderSettings()}</TabsContent>
        </Tabs>
      </div>

      {renderAddDialog()}
    </div>;
};