import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User,
  FileText,
  Calendar,
  MessageCircle,
  Download,
  ArrowLeft,
  Bell,
  CreditCard,
  Clock,
  Award,
  AlertTriangle,
  Settings,
  LogOut,
  Mail,
  Phone,
  MapPin,
  CheckSquare,
  GraduationCap,
  CalendarDays,
  Shield,
  Briefcase,
  Package,
  TrendingUp,
  Users,
  MessageSquare,
  Send,
  FileCheck,
  UserCheck,
  BookOpen,
  Target
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { BoudLogo } from '@/components/BoudLogo';

const EmployeePortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, sender: string, message: string, timestamp: string}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatType, setChatType] = useState<'manager' | 'hr'>('manager');

  // بيانات الموظف (محسنة)
  const employee = {
    id: 'EMP001',
    name: 'أحمد محمد العلي',
    position: 'مطور برمجيات أول',
    department: 'تقنية المعلومات',
    email: 'ahmed.ali@company.com',
    phone: '+966501234567',
    address: 'الرياض، المملكة العربية السعودية',
    joinDate: '2023-01-15',
    employeeNumber: 'E-2023-001',
    directManager: 'محمد أحمد السالم',
    avatar: '/placeholder.svg',
    status: 'نشط',
    jobCategory: 'درجة 7 - متخصص',
    insuranceNumber: 'INS123456789',
    nationalId: '1234567890'
  };

  // المهام
  const tasks = [
    { id: 1, title: 'إنهاء مشروع النظام المصرفي', dueDate: '2024-01-15', status: 'قيد التنفيذ', priority: 'عالية' },
    { id: 2, title: 'مراجعة الكود البرمجي للفريق', dueDate: '2024-01-12', status: 'مكتمل', priority: 'متوسطة' },
    { id: 3, title: 'إعداد تقرير الأداء الشهري', dueDate: '2024-01-20', status: 'معلق', priority: 'منخفضة' }
  ];

  // الدورات التدريبية
  const courses = [
    { id: 1, title: 'أساسيات الأمن السيبراني', duration: '40 ساعة', progress: 75, status: 'جاري', startDate: '2024-01-01' },
    { id: 2, title: 'إدارة المشاريع الرقمية', duration: '30 ساعة', progress: 100, status: 'مكتمل', startDate: '2023-12-01' },
    { id: 3, title: 'البرمجة المتقدمة', duration: '50 ساعة', progress: 0, status: 'مسجل', startDate: '2024-01-25' }
  ];

  // جدول الدوام الشهري
  const attendanceData = [
    { date: '2024-01-01', checkIn: '08:00', checkOut: '17:00', status: 'حاضر', hours: '9:00' },
    { date: '2024-01-02', checkIn: '08:15', checkOut: '17:00', status: 'متأخر', hours: '8:45' },
    { date: '2024-01-03', checkIn: '-', checkOut: '-', status: 'إجازة', hours: '0:00' },
    { date: '2024-01-04', checkIn: '08:00', checkOut: '17:00', status: 'حاضر', hours: '9:00' },
    { date: '2024-01-05', checkIn: '08:00', checkOut: '17:00', status: 'حاضر', hours: '9:00' }
  ];

  // بيانات التأمين
  const insuranceData = {
    provider: 'شركة التأمين الطبي المتقدم',
    policyNumber: 'POL-2024-001234',
    coverage: 'شامل',
    familyMembers: 3,
    annualLimit: 100000,
    used: 15000
  };

  // العهدة
  const custody = [
    { id: 1, item: 'لابتوب Dell Latitude 5520', serialNumber: 'DL123456', assignDate: '2023-01-15', condition: 'جيد' },
    { id: 2, item: 'هاتف iPhone 14 Pro', serialNumber: 'IP789012', assignDate: '2023-06-01', condition: 'ممتاز' },
    { id: 3, item: 'مكتب وكرسي', serialNumber: 'OFF001', assignDate: '2023-01-15', condition: 'جيد' }
  ];

  // المسار الوظيفي
  const careerPath = [
    { position: 'مطور برمجيات مبتدئ', startDate: '2021-01-15', endDate: '2022-06-01', department: 'تقنية المعلومات' },
    { position: 'مطور برمجيات', startDate: '2022-06-01', endDate: '2023-06-01', department: 'تقنية المعلومات' },
    { position: 'مطور برمجيات أول', startDate: '2023-06-01', endDate: 'الآن', department: 'تقنية المعلومات' }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'أنت',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('ar-SA')
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
      
      // محاكاة رد تلقائي
      setTimeout(() => {
        const reply = {
          id: chatMessages.length + 2,
          sender: chatType === 'manager' ? 'المدير المباشر' : 'الموارد البشرية',
          message: 'تم استلام رسالتك وسيتم الرد عليها قريباً',
          timestamp: new Date().toLocaleTimeString('ar-SA')
        };
        setChatMessages(prev => [...prev, reply]);
      }, 2000);
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-500';
      case 'قيد التنفيذ': return 'bg-blue-500';
      case 'معلق': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية': return 'bg-red-500';
      case 'متوسطة': return 'bg-yellow-500';
      case 'منخفضة': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-500';
      case 'جاري': return 'bg-blue-500';
      case 'مسجل': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case 'حاضر': return 'text-green-600';
      case 'متأخر': return 'text-yellow-600';
      case 'إجازة': return 'text-blue-600';
      case 'غائب': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // الطلبات النشطة
  const activeRequests = [
    {
      id: 'REQ001',
      type: 'إجازة سنوية',
      date: '2024-01-15',
      status: 'قيد المراجعة',
      details: 'إجازة سنوية لمدة 5 أيام'
    },
    {
      id: 'REQ002',
      type: 'شهادة راتب',
      date: '2024-01-10',
      status: 'تمت الموافقة',
      details: 'شهادة راتب للبنك'
    }
  ];

  // السجل التأديبي
  const disciplinaryRecord = [
    {
      id: 'D001',
      type: 'تنبيه',
      reason: 'التأخير عن العمل',
      date: '2023-12-01',
      status: 'محفوظ في الملف'
    }
  ];

  // إحصائيات الأداء
  const performanceStats = {
    overallRating: 85,
    projectsCompleted: 12,
    trainingCompleted: 8,
    attendanceRate: 96
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'قيد المراجعة':
        return <Badge className="bg-blue-100 text-blue-800">قيد المراجعة</Badge>;
      case 'تمت الموافقة':
        return <Badge className="bg-green-100 text-green-800">تمت الموافقة</Badge>;
      case 'مرفوض':
        return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header المطور */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="ml-2"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <BoudLogo variant="icon" size="sm" />
          </div>
          
          <div className="flex items-center gap-2 mr-4">
            <User className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">بوابة الموظف</h1>
          </div>
          
          <div className="mr-auto flex items-center gap-4">
            {/* الدردشة مع المدير المباشر */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setChatType('manager')}>
                  <MessageSquare className="h-4 w-4 ml-2" />
                  دردشة مع المدير
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>الدردشة مع المدير المباشر</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto border rounded p-2 space-y-2">
                    {chatMessages.length === 0 ? (
                      <p className="text-muted-foreground text-center">لا توجد رسائل</p>
                    ) : (
                      chatMessages.map((msg) => (
                        <div key={msg.id} className={`p-2 rounded ${msg.sender === 'أنت' ? 'bg-primary text-primary-foreground mr-auto max-w-[80%]' : 'bg-muted ml-auto max-w-[80%]'}`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs opacity-70">{msg.timestamp}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="اكتب رسالتك..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* الدردشة مع الموارد البشرية */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setChatType('hr')}>
                  <Users className="h-4 w-4 ml-2" />
                  دردشة مع HR
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>الدردشة مع الموارد البشرية</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto border rounded p-2 space-y-2">
                    {chatMessages.length === 0 ? (
                      <p className="text-muted-foreground text-center">لا توجد رسائل</p>
                    ) : (
                      chatMessages.map((msg) => (
                        <div key={msg.id} className={`p-2 rounded ${msg.sender === 'أنت' ? 'bg-primary text-primary-foreground mr-auto max-w-[80%]' : 'bg-muted ml-auto max-w-[80%]'}`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs opacity-70">{msg.timestamp}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="اكتب رسالتك..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Employee Info Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                    {employee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-1 -right-1 bg-green-500 text-white">
                  {employee.status}
                </Badge>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{employee.name}</h2>
                <p className="text-lg text-primary font-medium">{employee.position}</p>
                <p className="text-sm text-muted-foreground">{employee.department}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-sm text-muted-foreground">رقم الموظف: {employee.employeeNumber}</span>
                  <span className="text-sm text-muted-foreground">الهوية الوطنية: {employee.nationalId}</span>
                </div>
              </div>
              <div className="text-left space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  {employee.phone}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  {employee.address}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  رقم التأمين: {employee.insuranceNumber}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-12 h-auto p-1">
            <TabsTrigger value="dashboard" className="text-xs">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">المهام</TabsTrigger>
            <TabsTrigger value="courses" className="text-xs">الدورات</TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs">الدوام الشهري</TabsTrigger>
            <TabsTrigger value="insurance" className="text-xs">التأمين</TabsTrigger>
            <TabsTrigger value="job-category" className="text-xs">الفئة الوظيفية</TabsTrigger>
            <TabsTrigger value="requests" className="text-xs">طلباتي</TabsTrigger>
            <TabsTrigger value="custody" className="text-xs">العهدة</TabsTrigger>
            <TabsTrigger value="career-path" className="text-xs">المسار الوظيفي</TabsTrigger>
            <TabsTrigger value="payroll" className="text-xs">الراتب</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">الأداء</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs">المستندات</TabsTrigger>
          </TabsList>

          {/* تبويب المهام */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5" />
                  المهام المكلف بها
                </CardTitle>
                <CardDescription>قائمة بجميع المهام والمشاريع المكلف بها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">تاريخ الاستحقاق: {task.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-white`}>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className={`${getTaskStatusColor(task.status)} text-white`}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب الدورات التدريبية */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  الدورات التدريبية
                </CardTitle>
                <CardDescription>دوراتك التدريبية ومعدل التقدم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{course.title}</h3>
                        <Badge variant="outline" className={`${getCourseStatusColor(course.status)} text-white`}>
                          {course.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">المدة: {course.duration}</p>
                      <p className="text-sm text-muted-foreground mb-2">تاريخ البداية: {course.startDate}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={course.progress} className="flex-1" />
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب جدول الدوام الشهري */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  جدول الدوام الشهري
                </CardTitle>
                <CardDescription>سجل الحضور والانصراف للشهر الحالي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-right">التاريخ</th>
                        <th className="p-2 text-right">وقت الحضور</th>
                        <th className="p-2 text-right">وقت الانصراف</th>
                        <th className="p-2 text-right">عدد الساعات</th>
                        <th className="p-2 text-right">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((record, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{record.date}</td>
                          <td className="p-2">{record.checkIn}</td>
                          <td className="p-2">{record.checkOut}</td>
                          <td className="p-2">{record.hours}</td>
                          <td className={`p-2 font-medium ${getAttendanceStatusColor(record.status)}`}>
                            {record.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب التأمين */}
          <TabsContent value="insurance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  التأمين الطبي
                </CardTitle>
                <CardDescription>تفاصيل بوليصة التأمين الطبي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>شركة التأمين</Label>
                    <p className="font-medium">{insuranceData.provider}</p>
                  </div>
                  <div>
                    <Label>رقم البوليصة</Label>
                    <p className="font-medium">{insuranceData.policyNumber}</p>
                  </div>
                  <div>
                    <Label>نوع التغطية</Label>
                    <p className="font-medium">{insuranceData.coverage}</p>
                  </div>
                  <div>
                    <Label>عدد أفراد العائلة</Label>
                    <p className="font-medium">{insuranceData.familyMembers}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Label>استخدام الحد السنوي</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={(insuranceData.used / insuranceData.annualLimit) * 100} className="flex-1" />
                    <span className="text-sm font-medium">
                      {insuranceData.used.toLocaleString()} / {insuranceData.annualLimit.toLocaleString()} ريال
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب الفئة الوظيفية */}
          <TabsContent value="job-category" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  الفئة الوظيفية
                </CardTitle>
                <CardDescription>تفاصيل المنصب والفئة الوظيفية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>المنصب الحالي</Label>
                    <p className="font-medium">{employee.position}</p>
                  </div>
                  <div>
                    <Label>القسم</Label>
                    <p className="font-medium">{employee.department}</p>
                  </div>
                  <div>
                    <Label>الفئة الوظيفية</Label>
                    <p className="font-medium">{employee.jobCategory}</p>
                  </div>
                  <div>
                    <Label>المدير المباشر</Label>
                    <p className="font-medium">{employee.directManager}</p>
                  </div>
                  <div>
                    <Label>تاريخ التوظيف</Label>
                    <p className="font-medium">{employee.joinDate}</p>
                  </div>
                  <div>
                    <Label>سنوات الخبرة</Label>
                    <p className="font-medium">3 سنوات</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب العهدة */}
          <TabsContent value="custody" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  العهدة والأصول
                </CardTitle>
                <CardDescription>قائمة بالعهدة والأصول المسلمة إليك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {custody.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.item}</h3>
                        <p className="text-sm text-muted-foreground">الرقم التسلسلي: {item.serialNumber}</p>
                        <p className="text-sm text-muted-foreground">تاريخ التسليم: {item.assignDate}</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {item.condition}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب المسار الوظيفي */}
          <TabsContent value="career-path" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  المسار الوظيفي
                </CardTitle>
                <CardDescription>تاريخ المناصب والترقيات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerPath.map((position, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{position.position}</h3>
                        <p className="text-sm text-muted-foreground">{position.department}</p>
                        <p className="text-sm text-muted-foreground">
                          {position.startDate} - {position.endDate}
                        </p>
                      </div>
                      {index === careerPath.length - 1 && (
                        <Badge className="bg-green-100 text-green-800">الحالي</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">25</div>
                      <div className="text-sm text-muted-foreground">أيام إجازة متبقية</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-green-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">96%</div>
                      <div className="text-sm text-muted-foreground">معدل الحضور</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-yellow-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">85%</div>
                      <div className="text-sm text-muted-foreground">تقييم الأداء</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{activeRequests.length}</div>
                      <div className="text-sm text-muted-foreground">طلبات نشطة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    طلب إجازة
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    شهادة راتب
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <MessageCircle className="h-6 w-6" />
                    تواصل مع HR
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    تحميل المستندات
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>النشاط الأخير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{request.type}</p>
                        <p className="text-sm text-muted-foreground">{request.details}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-muted-foreground">{request.date}</p>
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  طلباتي
                  <Button size="sm">
                    <FileText className="h-4 w-4 ml-2" />
                    طلب جديد
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{request.type}</h3>
                            <p className="text-sm text-muted-foreground">{request.details}</p>
                            <p className="text-sm text-muted-foreground">رقم الطلب: {request.id}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-sm text-muted-foreground mb-2">{request.date}</p>
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payroll Tab */}
          <TabsContent value="payroll" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  معلومات الراتب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>سيتم عرض تفاصيل الراتب والمزايا هنا</p>
                  <Button className="mt-4">تحميل كشف الراتب</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  تقييم الأداء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">التقييم العام</span>
                      <span className="font-bold">{performanceStats.overallRating}%</span>
                    </div>
                    <Progress value={performanceStats.overallRating} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{performanceStats.projectsCompleted}</div>
                      <div className="text-sm text-muted-foreground">مشاريع مكتملة</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{performanceStats.trainingCompleted}</div>
                      <div className="text-sm text-muted-foreground">دورات تدريبية</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{performanceStats.attendanceRate}%</div>
                      <div className="text-sm text-muted-foreground">معدل الحضور</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disciplinary Tab */}
          <TabsContent value="disciplinary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  السجل التأديبي
                </CardTitle>
              </CardHeader>
              <CardContent>
                {disciplinaryRecord.length > 0 ? (
                  <div className="space-y-4">
                    {disciplinaryRecord.map((record) => (
                      <Card key={record.id} className="border-l-4 border-l-red-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-red-600">{record.type}</h3>
                              <p className="text-sm text-muted-foreground">{record.reason}</p>
                            </div>
                            <div className="text-left">
                              <p className="text-sm text-muted-foreground">{record.date}</p>
                              <Badge variant="outline">{record.status}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Award className="h-16 w-16 mx-auto mb-4 text-green-500 opacity-50" />
                    <p>لا توجد سجلات تأديبية</p>
                    <p className="text-sm">أداء ممتاز!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  المستندات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    عقد العمل
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    شهادة الراتب
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    شهادة خبرة
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    بيانات التأمين
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    إجازات السنة
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقارير الأداء
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeePortal;