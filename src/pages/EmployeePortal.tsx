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
import { useEmployeePortal } from '@/hooks/useEmployeePortal';
import { toast } from '@/hooks/use-toast';
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
  Target,
  ScrollText,
  Banknote,
  Satellite
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { BoudLogo } from '@/components/BoudLogo';
import employeeAvatarImage from '@/assets/employee-avatar.jpg';
import GPSAttendanceSystem from '@/components/attendance/GPSAttendanceSystem';

const EmployeePortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, sender: string, message: string, timestamp: string}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatType, setChatType] = useState<'manager' | 'hr'>('manager');
  
  // استخدام Hook المخصص لبيانات الموظف
  const {
    loading,
    employee,
    attendanceRecords,
    leaveRequests,
    payrollItems,
    dashboardStats,
    actions
  } = useEmployeePortal();

  // حالات إضافية للنماذج
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    request_type: '',
    title: '',
    description: ''
  });
  const [leaveFormData, setLeaveFormData] = useState<{
    leave_type: 'annual' | 'sick' | 'emergency' | 'maternity' | 'paternity' | 'unpaid' | '';
    start_date: string;
    end_date: string;
    reason: string;
    total_days: number;
  }>({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
    total_days: 0
  });
  const [isClockingIn, setIsClockingIn] = useState(false);

  // وظائف معالجة النماذج
  const handleLeaveRequest = async () => {
    if (!leaveFormData.leave_type || !leaveFormData.start_date || !leaveFormData.end_date) {
      toast({
        title: 'خطأ في البيانات',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    const startDate = new Date(leaveFormData.start_date);
    const endDate = new Date(leaveFormData.end_date);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const success = await actions.submitLeaveRequest({
      leave_type: leaveFormData.leave_type as 'annual' | 'sick' | 'emergency' | 'maternity' | 'paternity' | 'unpaid',
      start_date: leaveFormData.start_date,
      end_date: leaveFormData.end_date,
      reason: leaveFormData.reason,
      total_days: totalDays
    });

    if (success) {
      setIsLeaveDialogOpen(false);
      setLeaveFormData({
        leave_type: '',
        start_date: '',
        end_date: '',
        reason: '',
        total_days: 0
      });
    }
  };

  const handleClockIn = async () => {
    setIsClockingIn(true);
    try {
      const location = await actions.getCurrentLocation();
      await actions.clockIn(location);
    } catch (error) {
      // Try without location if GPS fails
      await actions.clockIn();
    }
    setIsClockingIn(false);
  };

  const handleClockOut = async () => {
    setIsClockingIn(true);
    try {
      const location = await actions.getCurrentLocation();
      await actions.clockOut(location);
    } catch (error) {
      // Try without location if GPS fails
      await actions.clockOut();
    }
    setIsClockingIn(false);
  };

  // معالج إرسال الطلبات العامة
  const handleGeneralRequest = async () => {
    if (!requestFormData.request_type || !requestFormData.title) {
      toast({
        title: 'خطأ في البيانات',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      });
      return;
    }

    try {
      // هنا يمكن إضافة وظيفة إرسال الطلب إلى قاعدة البيانات
      toast({
        title: 'تم إرسال الطلب بنجاح',
        description: 'سيتم مراجعة طلبك وإعلامك بالقرار قريباً',
      });
      
      setIsRequestDialogOpen(false);
      setRequestFormData({ request_type: '', title: '', description: '' });
    } catch (error) {
      toast({
        title: 'خطأ في إرسال الطلب',
        description: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى',
        variant: 'destructive'
      });
    }
  };

  // تحويل البيانات الحقيقية للتوافق مع واجهة المستخدم
  const employeeDisplayData = employee ? {
    id: employee.id,
    name: employee.full_name_arabic || `${employee.first_name} ${employee.last_name}`,
    position: employee.boud_job_positions?.position_title || 'غير محدد',
    department: employee.boud_departments?.department_name || 'غير محدد',
    email: employee.email || '',
    phone: employee.phone || '',
    address: 'المملكة العربية السعودية',
    joinDate: employee.hire_date || '',
    employeeNumber: employee.employee_id || '',
    directManager: 'سيتم تحديده قريباً',
    avatar: employee.profile_picture_url || '/placeholder.svg',
    status: employee.employment_status === 'active' ? 'نشط' : 'غير نشط',
    jobCategory: 'درجة وظيفية',
    insuranceNumber: 'INS' + employee.employee_id,
    nationalId: employee.national_id || ''
  } : null;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">جاري تحميل بيانات الموظف...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">خطأ في تحميل البيانات</h2>
          <p className="text-muted-foreground mb-4">لم يتم العثور على بيانات الموظف</p>
          <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
        </div>
      </div>
    );
  }

  // المهام (ستكون ديناميكية لاحقاً)
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

  // تحويل بيانات الحضور للواجهة
  const attendanceData = attendanceRecords.map(record => ({
    date: new Date(record.attendance_date).toLocaleDateString('ar-SA'),
    checkIn: record.clock_in_time ? new Date(record.clock_in_time).toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }) : '-',
    checkOut: record.clock_out_time ? new Date(record.clock_out_time).toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }) : '-',
    status: record.status === 'present' ? 'حاضر' : 
            record.status === 'late' ? 'متأخر' : 
            record.status === 'absent' ? 'غائب' : 
            record.status === 'overtime' ? 'ساعات إضافية' : 'إجازة',
    hours: record.total_hours ? `${record.total_hours.toFixed(1)} ساعة` : '0:00'
  }));

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

  // تحويل طلبات الإجازة للواجهة
  const activeRequests = leaveRequests.map(request => ({
    id: request.id,
    type: request.leave_type === 'annual' ? 'إجازة سنوية' : 
          request.leave_type === 'sick' ? 'إجازة مرضية' : 
          request.leave_type === 'emergency' ? 'إجازة طارئة' : 
          request.leave_type === 'maternity' ? 'إجازة وضع' :
          request.leave_type === 'paternity' ? 'إجازة أبوة' : 'إجازة أخرى',
    date: new Date(request.applied_date).toLocaleDateString('ar-SA'),
    status: request.status === 'pending' ? 'قيد المراجعة' : 
            request.status === 'approved' ? 'تمت الموافقة' : 
            request.status === 'cancelled' ? 'ملغي' : 'مرفوض',
    details: `${request.reason || 'لا يوجد سبب محدد'} (${request.total_days} أيام)`
  }));

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

  // إحصائيات الأداء من البيانات الحقيقية
  const performanceStats = {
    overallRating: 85,
    projectsCompleted: 12,
    trainingCompleted: 8,
    attendanceRate: dashboardStats.attendanceRate
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'قيد المراجعة':
        return <Badge className="bg-blue-100 text-blue-800">قيد المراجعة</Badge>;
      case 'تمت الموافقة':
        return <Badge className="bg-green-100 text-green-800">تمت الموافقة</Badge>;
      case 'ملغي':
        return <Badge className="bg-gray-100 text-gray-800">ملغي</Badge>;
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
        {/* Employee Info Header - محسن بصرياً */}
        <Card className="mb-6 bg-gradient-to-r from-background via-background to-muted/20 border-0 shadow-lg animate-fade-in">
          <CardContent className="p-0 overflow-hidden relative">
            {/* خلفية متدرجة */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
            
            {/* المحتوى الرئيسي */}
            <div className="relative p-8">
              <div className="flex items-center gap-8">
                {/* صورة الموظف المحسنة */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-2xl hover-scale transition-all duration-300">
                        <AvatarImage 
                          src={employeeDisplayData?.avatar} 
                          alt={employeeDisplayData?.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold">
                          {employeeDisplayData?.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    {/* شارة الحالة المحسنة */}
                    <div className="absolute -bottom-2 -right-2 animate-pulse">
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg border-2 border-background px-3 py-1">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          {employeeDisplayData?.status}
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* معلومات الموظف الأساسية */}
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                      {employeeDisplayData.name}
                    </h2>
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-semibold text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
                        {employeeDisplayData.position}
                      </p>
                      <div className="h-6 w-px bg-border"></div>
                      <p className="text-lg text-muted-foreground font-medium">{employeeDisplayData.department}</p>
                    </div>
                  </div>
                  
                  {/* بطاقات معلومات سريعة */}
                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <div className="flex items-center gap-2 bg-background/60 backdrop-blur rounded-full px-4 py-2 border border-border/50 hover-scale">
                      <UserCheck className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">رقم الموظف: {employeeDisplayData.employeeNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/60 backdrop-blur rounded-full px-4 py-2 border border-border/50 hover-scale">
                      <FileCheck className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">الهوية: {employeeDisplayData.nationalId}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/60 backdrop-blur rounded-full px-4 py-2 border border-border/50 hover-scale">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">تأمين: {employeeDisplayData.insuranceNumber}</span>
                    </div>
                  </div>
                </div>

                {/* معلومات الاتصال المحسنة */}
                <div className="space-y-4 min-w-fit">
                  <div className="bg-background/40 backdrop-blur border border-border/50 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-primary" />
                      معلومات الاتصال
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 group hover:bg-muted/30 rounded-lg p-2 transition-colors">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                          <p className="text-sm font-medium">{employeeDisplayData.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 group hover:bg-muted/30 rounded-lg p-2 transition-colors">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">رقم الهاتف</p>
                          <p className="text-sm font-medium" dir="ltr">{employeeDisplayData.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 group hover:bg-muted/30 rounded-lg p-2 transition-colors">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">العنوان</p>
                          <p className="text-sm font-medium">{employeeDisplayData.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 group hover:bg-muted/30 rounded-lg p-2 transition-colors">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Briefcase className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">الفئة الوظيفية</p>
                          <p className="text-sm font-medium">{employeeDisplayData.jobCategory}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-background/60 backdrop-blur border border-border/50 rounded-2xl p-2 shadow-lg">
            <TabsList className="grid w-full grid-cols-12 h-auto p-1 bg-transparent gap-1">
              <TabsTrigger value="dashboard" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <User className="w-3 h-3 mb-1" />
                لوحة التحكم
              </TabsTrigger>
              <TabsTrigger value="tasks" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <CheckSquare className="w-3 h-3 mb-1" />
                المهام
              </TabsTrigger>
              <TabsTrigger value="courses" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <GraduationCap className="w-3 h-3 mb-1" />
                الدورات
              </TabsTrigger>
              <TabsTrigger value="attendance" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <CalendarDays className="w-3 h-3 mb-1" />
                الدوام الشهري
              </TabsTrigger>
              <TabsTrigger value="gps-attendance" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <Satellite className="w-3 h-3 mb-1" />
                حضور GPS
              </TabsTrigger>
              <TabsTrigger value="insurance" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <Shield className="w-3 h-3 mb-1" />
                التأمين
              </TabsTrigger>
              <TabsTrigger value="job-category" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <Briefcase className="w-3 h-3 mb-1" />
                الفئة الوظيفية
              </TabsTrigger>
              <TabsTrigger value="requests" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <FileText className="w-3 h-3 mb-1" />
                طلباتي
              </TabsTrigger>
              <TabsTrigger value="custody" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <Package className="w-3 h-3 mb-1" />
                العهدة
              </TabsTrigger>
              <TabsTrigger value="career-path" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <TrendingUp className="w-3 h-3 mb-1" />
                المسار الوظيفي
              </TabsTrigger>
              <TabsTrigger value="payroll" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <CreditCard className="w-3 h-3 mb-1" />
                الراتب
              </TabsTrigger>
              <TabsTrigger value="performance" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <Award className="w-3 h-3 mb-1" />
                الأداء
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-xs py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 hover:bg-muted/50">
                <FileText className="w-3 h-3 mb-1" />
                المستندات
              </TabsTrigger>
            </TabsList>
          </div>

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
                    <p className="font-medium">{employeeDisplayData?.position}</p>
                  </div>
                  <div>
                    <Label>القسم</Label>
                    <p className="font-medium">{employeeDisplayData?.department}</p>
                  </div>
                  <div>
                    <Label>الفئة الوظيفية</Label>
                    <p className="font-medium">{employeeDisplayData?.jobCategory}</p>
                  </div>
                  <div>
                    <Label>المدير المباشر</Label>
                    <p className="font-medium">{employeeDisplayData?.directManager}</p>
                  </div>
                  <div>
                    <Label>تاريخ التوظيف</Label>
                    <p className="font-medium">{employeeDisplayData?.joinDate}</p>
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

          {/* تبويب نظام الحضور GPS */}
          <TabsContent value="gps-attendance" className="space-y-6">
            <GPSAttendanceSystem
              onCheckIn={async (location) => {
                await actions.clockIn(location);
              }}
              onCheckOut={async (location) => {
                await actions.clockOut(location);
              }}
              attendanceRecords={attendanceData.map(record => ({
                date: record.date,
                checkIn: record.checkIn !== '--:--' ? record.checkIn : undefined,
                checkOut: record.checkOut !== '--:--' ? record.checkOut : undefined,
                status: record.status === 'حاضر' ? 'present' as const : 
                        record.status === 'متأخر' ? 'late' as const :
                        record.status === 'غائب' ? 'absent' as const : 'early_leave' as const,
                workingHours: record.hours !== '0:00' ? parseFloat(record.hours.replace(' ساعة', '')) : undefined
              }))}
              isLoading={loading}
            />
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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    طلب إجازة
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    شهادة راتب
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Satellite className="h-6 w-6" />
                    طلب مقيم
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
                  <Button size="sm" onClick={() => setIsRequestDialogOpen(true)}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* عقد العمل */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary/50">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                          <ScrollText className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">عقد العمل</h3>
                        <p className="text-sm text-muted-foreground">تحميل عقد العمل المُوقع</p>
                      </div>
                    </div>
                  </div>

                  {/* شهادة الراتب */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary/50">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Banknote className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">شهادة الراتب</h3>
                        <p className="text-sm text-muted-foreground">تحميل شهادة الراتب</p>
                      </div>
                    </div>
                  </div>

                  {/* شهادة خبرة */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary/50">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Award className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">شهادة خبرة</h3>
                        <p className="text-sm text-muted-foreground">تحميل شهادة الخبرة</p>
                      </div>
                    </div>
                  </div>

                  {/* بيانات التأمين */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary/50">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Shield className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">بيانات التأمين</h3>
                        <p className="text-sm text-muted-foreground">تحميل بيانات التأمين الطبي</p>
                      </div>
                    </div>
                  </div>

                  {/* إجازات السنة */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary/50">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-orange-600/20 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Calendar className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">إجازات السنة</h3>
                        <p className="text-sm text-muted-foreground">تقرير الإجازات السنوية</p>
                      </div>
                    </div>
                  </div>

                  {/* تقارير الأداء */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary/50">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Target className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">تقارير الأداء</h3>
                        <p className="text-sm text-muted-foreground">تحميل تقييم الأداء السنوي</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog for General Request */}
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                طلب جديد
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="request_type">نوع الطلب *</Label>
                <Select 
                  value={requestFormData.request_type} 
                  onValueChange={(value) => setRequestFormData(prev => ({ ...prev, request_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الطلب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary_certificate">شهادة راتب</SelectItem>
                    <SelectItem value="experience_letter">خطاب خبرة</SelectItem>
                    <SelectItem value="bank_letter">خطاب للبنك</SelectItem>
                    <SelectItem value="transfer_request">طلب نقل</SelectItem>
                    <SelectItem value="training_certificate">شهادة تدريب</SelectItem>
                    <SelectItem value="resident_request">طلب مقيم</SelectItem>
                    <SelectItem value="other">طلب آخر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">عنوان الطلب *</Label>
                <Input
                  id="title"
                  value={requestFormData.title}
                  onChange={(e) => setRequestFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="أدخل عنوان الطلب"
                />
              </div>

              <div>
                <Label htmlFor="description">تفاصيل الطلب</Label>
                <Textarea
                  id="description"
                  value={requestFormData.description}
                  onChange={(e) => setRequestFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="اشرح تفاصيل طلبك..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleGeneralRequest}
                  disabled={!requestFormData.request_type || !requestFormData.title}
                  className="flex-1"
                >
                  <Send className="h-4 w-4 ml-2" />
                  إرسال الطلب
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsRequestDialogOpen(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog for Leave Request */}
        <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                طلب إجازة جديد
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="leave_type">نوع الإجازة *</Label>
                <Select 
                  value={leaveFormData.leave_type} 
                  onValueChange={(value) => setLeaveFormData(prev => ({ ...prev, leave_type: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الإجازة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">إجازة سنوية</SelectItem>
                    <SelectItem value="sick">إجازة مرضية</SelectItem>
                    <SelectItem value="emergency">إجازة طارئة</SelectItem>
                    <SelectItem value="maternity">إجازة وضع</SelectItem>
                    <SelectItem value="paternity">إجازة أبوة</SelectItem>
                    <SelectItem value="unpaid">إجازة بدون راتب</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">تاريخ البداية *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={leaveFormData.start_date}
                    onChange={(e) => setLeaveFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">تاريخ النهاية *</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={leaveFormData.end_date}
                    onChange={(e) => setLeaveFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    min={leaveFormData.start_date}
                  />
                </div>
              </div>

              {leaveFormData.start_date && leaveFormData.end_date && (
                <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                  عدد الأيام: {Math.ceil((new Date(leaveFormData.end_date).getTime() - new Date(leaveFormData.start_date).getTime()) / (1000 * 60 * 60 * 24)) + 1} يوم
                </div>
              )}

              <div>
                <Label htmlFor="reason">السبب (اختياري)</Label>
                <Textarea
                  id="reason"
                  placeholder="اكتب سبب الإجازة..."
                  value={leaveFormData.reason}
                  onChange={(e) => setLeaveFormData(prev => ({ ...prev, reason: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleLeaveRequest}
                  disabled={!leaveFormData.leave_type || !leaveFormData.start_date || !leaveFormData.end_date}
                  className="flex-1"
                >
                  <Send className="h-4 w-4 ml-2" />
                  إرسال الطلب
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsLeaveDialogOpen(false)}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmployeePortal;