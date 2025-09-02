import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Settings, Users2, Megaphone, MessageSquare, FileText, 
  Calendar, PieChart, Bell, Send, Plus, Search, Filter, Download,
  Eye, ThumbsUp, Share2, BarChart3, TrendingUp, Clock, CheckCircle,
  AlertCircle, Star, Upload, Play, Pause, Volume2, VolumeX,
  Zap, Bot, Globe, Target, Heart, Award, Coffee, Gift
} from 'lucide-react';

interface InternalCommunicationProps {
  onBack?: () => void;
}

export const InternalCommunication: React.FC<InternalCommunicationProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = (action: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم بنجاح",
        description: `تم تنفيذ ${action} بنجاح`,
      });
    }, 1500);
  };

  const announcements = [
    {
      id: 1,
      title: "إعلان هام: تحديث السياسات الداخلية",
      content: "تم تحديث سياسات العمل عن بُعد وأوقات العمل المرنة...",
      department: "الموارد البشرية",
      date: "2024-01-15",
      views: 245,
      likes: 32,
      priority: "عالي",
      status: "منشور"
    },
    {
      id: 2,
      title: "افتتاح مكتب جديد في الرياض",
      content: "نتشرف بإعلان افتتاح مكتبنا الجديد في مدينة الرياض...",
      department: "الإدارة العليا",
      date: "2024-01-12",
      views: 187,
      likes: 28,
      priority: "متوسط",
      status: "منشور"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "أحمد محمد",
      subject: "تقرير المشروع الشهري",
      preview: "أرفق لكم تقرير المشروع للشهر الحالي...",
      time: "منذ ساعتين",
      read: false,
      hasAttachment: true
    },
    {
      id: 2,
      sender: "فاطمة الزهراء",
      subject: "اجتماع الفريق غداً",
      preview: "تذكير بموعد اجتماع الفريق المقرر غداً...",
      time: "منذ 4 ساعات",
      read: true,
      hasAttachment: false
    }
  ];

  const events = [
    {
      id: 1,
      title: "ورشة تدريبية: مهارات القيادة",
      date: "2024-01-20",
      time: "10:00 صباحاً",
      location: "قاعة المؤتمرات",
      attendees: 45,
      capacity: 60,
      status: "مفتوح للتسجيل"
    },
    {
      id: 2,
      title: "احتفالية نهاية العام",
      date: "2024-01-25",
      time: "6:00 مساءً",
      location: "الحديقة الخارجية",
      attendees: 120,
      capacity: 150,
      status: "مؤكد"
    }
  ];

  const surveys = [
    {
      id: 1,
      title: "استطلاع رضا الموظفين للربع الأول",
      description: "نود معرفة آرائكم حول بيئة العمل والخدمات المقدمة",
      responses: 78,
      target: 120,
      endDate: "2024-01-30",
      status: "نشط"
    },
    {
      id: 2,
      title: "تقييم برامج التدريب",
      description: "ما رأيكم في البرامج التدريبية المقدمة؟",
      responses: 92,
      target: 100,
      endDate: "2024-01-28",
      status: "مكتمل"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="hover:bg-[#009F87]/10 border-[#009F87]/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Users2 className="h-8 w-8 text-[#009F87]" />
              التواصل الداخلي
            </h1>
            <p className="text-gray-600 mt-1">نظام ذكي ومؤتمت لتعزيز الاتصال بين الموظفين والإدارة</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => handleAction('إنشاء مساعد ذكي')}>
            <Bot className="h-4 w-4" />
            المساعد الذكي
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur border border-gray-200 rounded-xl p-1 h-auto">
          <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">لوحة التحكم</span>
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex flex-col gap-1 py-3 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Megaphone className="h-4 w-4" />
            <span className="text-xs">الإعلانات</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex flex-col gap-1 py-3 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">الرسائل</span>
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex flex-col gap-1 py-3 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <FileText className="h-4 w-4" />
            <span className="text-xs">المواد التوعوية</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex flex-col gap-1 py-3 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">الفعاليات</span>
          </TabsTrigger>
          <TabsTrigger value="surveys" className="flex flex-col gap-1 py-3 data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <PieChart className="h-4 w-4" />
            <span className="text-xs">الاستطلاعات</span>
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">الرسائل المرسلة</p>
                    <p className="text-3xl font-bold">1,247</p>
                  </div>
                  <Send className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">معدل القراءة</p>
                    <p className="text-3xl font-bold">87%</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">التفاعل النشط</p>
                    <p className="text-3xl font-bold">456</p>
                  </div>
                  <ThumbsUp className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">الاستطلاعات النشطة</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <PieChart className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#009F87]" />
                  إحصائيات التفاعل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>معدل قراءة الإعلانات</span>
                    <span className="font-bold">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>مشاركة المحتوى</span>
                    <span className="font-bold">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span>الحضور في الفعاليات</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#009F87]" />
                  آخر الأنشطة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Megaphone className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">إعلان جديد تم نشره</p>
                      <p className="text-xs text-gray-500">منذ 15 دقيقة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">فعالية جديدة تم إضافتها</p>
                      <p className="text-xs text-gray-500">منذ ساعة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <PieChart className="h-4 w-4 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">استطلاع جديد تم إطلاقه</p>
                      <p className="text-xs text-gray-500">منذ 3 ساعات</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">الإعلانات الداخلية</h2>
            <div className="flex gap-2">
              <Button onClick={() => handleAction('إنشاء إعلان جديد')} className="bg-[#009F87] hover:bg-[#009F87]/90">
                <Plus className="h-4 w-4 mr-2" />
                إعلان جديد
              </Button>
              <Button variant="outline" onClick={() => handleAction('تصدير البيانات')}>
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input placeholder="البحث في الإعلانات..." className="w-full" />
            </div>
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{announcement.title}</CardTitle>
                      <p className="text-gray-600 mb-3">{announcement.content}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>القسم: {announcement.department}</span>
                        <span>التاريخ: {announcement.date}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={announcement.priority === 'عالي' ? 'destructive' : 'secondary'}
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {announcement.views} مشاهدة
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {announcement.likes} إعجاب
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleAction('مشاركة الإعلان')}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAction('تعديل الإعلان')}>
                        تعديل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">الرسائل الداخلية</h2>
            <Button onClick={() => handleAction('إنشاء رسالة جديدة')} className="bg-[#009F87] hover:bg-[#009F87]/90">
              <Plus className="h-4 w-4 mr-2" />
              رسالة جديدة
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>صندوق الرسائل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        message.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-[#009F87]'
                      }`}
                      onClick={() => handleAction('فتح الرسالة')}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm font-medium mb-1">{message.subject}</p>
                      <p className="text-xs text-gray-600">{message.preview}</p>
                      {message.hasAttachment && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          مرفق
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>إنشاء رسالة جديدة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">المستقبل</label>
                  <Input placeholder="اختر المستقبل..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">الموضوع</label>
                  <Input placeholder="موضوع الرسالة..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">المحتوى</label>
                  <Textarea placeholder="اكتب رسالتك هنا..." rows={8} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleAction('إرسال الرسالة')} className="bg-[#009F87] hover:bg-[#009F87]/90">
                    <Send className="h-4 w-4 mr-2" />
                    إرسال
                  </Button>
                  <Button variant="outline" onClick={() => handleAction('إرفاق ملف')}>
                    <Upload className="h-4 w-4 mr-2" />
                    إرفاق ملف
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">النشرات والمواد التوعوية</h2>
            <Button onClick={() => handleAction('رفع مادة جديدة')} className="bg-[#009F87] hover:bg-[#009F87]/90">
              <Plus className="h-4 w-4 mr-2" />
              رفع مادة جديدة
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-red-500" />
                  <div>
                    <CardTitle className="text-lg">دليل الموظف الجديد</CardTitle>
                    <p className="text-sm text-gray-500">PDF - 2.5 MB</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">نشرة</Badge>
                  <span className="text-sm text-gray-500">245 مشاهدة</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction('عرض المادة')}>
                    <Eye className="h-4 w-4 mr-1" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction('تحميل المادة')}>
                    <Download className="h-4 w-4 mr-1" />
                    تحميل
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Play className="h-8 w-8 text-green-500" />
                  <div>
                    <CardTitle className="text-lg">فيديو السلامة المهنية</CardTitle>
                    <p className="text-sm text-gray-500">MP4 - 15 دقيقة</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">فيديو</Badge>
                  <span className="text-sm text-gray-500">187 مشاهدة</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction('تشغيل الفيديو')}>
                    <Play className="h-4 w-4 mr-1" />
                    تشغيل
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction('مشاركة الفيديو')}>
                    <Share2 className="h-4 w-4 mr-1" />
                    مشاركة
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <CardTitle className="text-lg">عرض تقديمي - الأهداف الاستراتيجية</CardTitle>
                    <p className="text-sm text-gray-500">PPTX - 5.2 MB</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">عرض تقديمي</Badge>
                  <span className="text-sm text-gray-500">98 مشاهدة</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction('عرض التقديم')}>
                    <Eye className="h-4 w-4 mr-1" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction('تحميل التقديم')}>
                    <Download className="h-4 w-4 mr-1" />
                    تحميل
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">الفعاليات والمناسبات</h2>
            <Button onClick={() => handleAction('إنشاء فعالية جديدة')} className="bg-[#009F87] hover:bg-[#009F87]/90">
              <Plus className="h-4 w-4 mr-2" />
              فعالية جديدة
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {event.date} - {event.time}
                        </span>
                        <span>المكان: {event.location}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={event.status === 'مفتوح للتسجيل' ? 'default' : 'secondary'}
                    >
                      {event.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>الحضور المسجل</span>
                        <span>{event.attendees}/{event.capacity}</span>
                      </div>
                      <Progress value={(event.attendees / event.capacity) * 100} className="h-2" />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAction('التسجيل في الفعالية')}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        تسجيل
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAction('مشاركة الفعالية')}>
                        <Share2 className="h-4 w-4 mr-1" />
                        مشاركة
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAction('تفاصيل الفعالية')}>
                        <Eye className="h-4 w-4 mr-1" />
                        تفاصيل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Surveys Tab */}
        <TabsContent value="surveys" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">استطلاعات الرأي</h2>
            <Button onClick={() => handleAction('إنشاء استطلاع جديد')} className="bg-[#009F87] hover:bg-[#009F87]/90">
              <Plus className="h-4 w-4 mr-2" />
              استطلاع جديد
            </Button>
          </div>

          <div className="grid gap-6">
            {surveys.map((survey) => (
              <Card key={survey.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{survey.title}</CardTitle>
                      <p className="text-gray-600 mb-3">{survey.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>ينتهي في: {survey.endDate}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={survey.status === 'نشط' ? 'default' : 'secondary'}
                    >
                      {survey.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>الردود المستلمة</span>
                        <span>{survey.responses}/{survey.target}</span>
                      </div>
                      <Progress value={(survey.responses / survey.target) * 100} className="h-2" />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAction('المشاركة في الاستطلاع')}>
                        <PieChart className="h-4 w-4 mr-1" />
                        شارك
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAction('عرض النتائج')}>
                        <BarChart3 className="h-4 w-4 mr-1" />
                        النتائج
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAction('تحليل الاستطلاع')}>
                        <Zap className="h-4 w-4 mr-1" />
                        تحليل ذكي
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Analysis Section */}
          <Card className="border-2 border-dashed border-[#009F87]/30 bg-gradient-to-r from-[#009F87]/5 to-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#009F87]" />
                التحليل الذكي للاستطلاعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="font-medium">مستوى الرضا العام</p>
                  <p className="text-2xl font-bold text-[#009F87]">82%</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium">التحسن عن الفترة السابقة</p>
                  <p className="text-2xl font-bold text-green-600">+15%</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="font-medium">النقاط التي تحتاج تحسين</p>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};