import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MeetingHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isInMeeting, setIsInMeeting] = useState(false);

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

  const stats = [
    { title: 'الاجتماعات هذا الشهر', value: '24', icon: Calendar, color: 'text-blue-600' },
    { title: 'ساعات الاجتماعات', value: '45.5', icon: Clock, color: 'text-green-600' },
    { title: 'المهام المكلفة', value: '18', icon: CheckSquare, color: 'text-orange-600' },
    { title: 'المستندات المحفوظة', value: '156', icon: FileText, color: 'text-purple-600' }
  ];

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
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                نظام الاجتماعات الذكي
              </h1>
              <p className="text-muted-foreground text-lg">
                منصة متكاملة لإدارة اجتماعات الشركة والتعاون الفعال
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => navigate('/meeting-hub/subscription')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                إدارة الاشتراك
              </Button>
              <Button 
                onClick={() => setIsInMeeting(true)}
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                <Video className="h-4 w-4" />
                بدء اجتماع جديد
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
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
                            <Button size="sm" variant="outline">
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
                          <Button size="sm" variant="outline">
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
                  <Button className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    بدء اجتماع فوري
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    جدولة اجتماع
                  </Button>
                  <div className="flex items-center gap-2 mr-auto">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="البحث في الاجتماعات..."
                      className="px-3 py-2 border rounded-md w-64"
                    />
                    <Button size="sm" variant="outline">
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
                        >
                          إنهاء الاجتماع
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Video Area */}
                        <div className="lg:col-span-3">
                          <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
                            <div className="text-white text-center">
                              <Video className="h-12 w-12 mx-auto mb-2" />
                              <p>منطقة الفيديو المباشر</p>
                            </div>
                          </div>
                          
                          {/* Meeting Controls */}
                          <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
                            <Button size="sm" variant="outline">
                              <Video className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Monitor className="h-4 w-4" />
                              مشاركة الشاشة
                            </Button>
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4" />
                              تسجيل
                            </Button>
                            <Button size="sm" variant="outline">
                              <Upload className="h-4 w-4" />
                              رفع مستند
                            </Button>
                          </div>
                        </div>

                        {/* Chat & Participants */}
                        <div className="space-y-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">المشاركون (8)</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                أحمد محمد (مديرالاجتماع)
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                سارة أحمد
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                محمد علي
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">المحادثة</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2 h-32 overflow-y-auto mb-2">
                                <div className="text-xs">
                                  <strong>أحمد:</strong> مرحباً بالجميع
                                </div>
                                <div className="text-xs">
                                  <strong>سارة:</strong> أهلاً وسهلاً
                                </div>
                              </div>
                              <input 
                                type="text" 
                                placeholder="اكتب رسالة..."
                                className="w-full px-2 py-1 text-xs border rounded"
                              />
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
                          <Button size="sm" variant="outline">
                            تعديل
                          </Button>
                          <Button size="sm">
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
                  <Button className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    رفع مستند جديد
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    إنشاء محضر اجتماع
                  </Button>
                  <div className="flex items-center gap-2 mr-auto">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="البحث في المستندات..."
                      className="px-3 py-2 border rounded-md w-64"
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
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            تحميل
                          </Button>
                          <Button size="sm" variant="outline">
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
                  <Button className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4" />
                    إضافة مهمة جديدة
                  </Button>
                  <div className="flex items-center gap-2 mr-auto">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="البحث في المهام..."
                      className="px-3 py-2 border rounded-md w-64"
                    />
                    <Button size="sm" variant="outline">
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
                        <Button size="sm" variant="outline">
                          تفاصيل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تقارير وإحصائيات</CardTitle>
                <CardDescription>
                  تحليل شامل لأداء الاجتماعات والمشاركة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-foreground mb-2">معدل الحضور</h3>
                        <div className="text-3xl font-bold text-primary mb-1">87%</div>
                        <p className="text-sm text-muted-foreground">متوسط حضور الاجتماعات</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-foreground mb-2">إنجاز المهام</h3>
                        <div className="text-3xl font-bold text-green-600 mb-1">92%</div>
                        <p className="text-sm text-muted-foreground">معدل إنجاز المهام في الوقت</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-foreground mb-2">المدة المتوسطة</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-1">45</div>
                        <p className="text-sm text-muted-foreground">دقيقة لكل اجتماع</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">الاجتماعات حسب النوع</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-medium">مجلس الإدارة</h4>
                      <p className="text-2xl font-bold text-purple-600">8</p>
                      <p className="text-sm text-muted-foreground">اجتماعات هذا الشهر</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-medium">الإدارة التنفيذية</h4>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-sm text-muted-foreground">اجتماعات هذا الشهر</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-medium">فرق العمل</h4>
                      <p className="text-2xl font-bold text-green-600">24</p>
                      <p className="text-sm text-muted-foreground">اجتماعات هذا الشهر</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}