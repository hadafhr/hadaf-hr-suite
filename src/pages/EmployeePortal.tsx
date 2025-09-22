import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEmployeePortal } from '@/hooks/useEmployeePortal';
import { useEmployeeServices } from '@/hooks/useEmployeeServices';
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
  LogIn,
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
  Satellite,
  Mic,
  Eye,
  Play,
  Video,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  Upload,
  MessageSquareText,
  Timer,
  Calendar as CalendarIcon,
  User as UserIcon,
  FileIcon,
  BarChart3,
  TrendingDown,
  TrendingUp as TrendingUpIcon,
  Calendar as CalendarDays2,
  Filter,
  Download as DownloadIcon,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2 as CheckCircleIcon,
  XCircle,
  Clock as ClockIcon,
  Plus,
  Building,
  DollarSign,
  RotateCcw
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

  // استخدام Hook للطلبات والخدمات
  const {
    submitEmployeeRequest,
    loading: servicesLoading
  } = useEmployeeServices();

  // حالات إضافية للنماذج
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isCourseViewerOpen, setIsCourseViewerOpen] = useState(false);
  const [isClassroomOpen, setIsClassroomOpen] = useState(false);
  const [classroomMessages, setClassroomMessages] = useState<Array<{id: number, sender: string, message: string, timestamp: string}>>([]);
  const [newClassroomMessage, setNewClassroomMessage] = useState('');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isTaskViewerOpen, setIsTaskViewerOpen] = useState(false);
  const [taskComments, setTaskComments] = useState<Array<{id: number, author: string, comment: string, timestamp: string}>>([]);
  const [newTaskComment, setNewTaskComment] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState<any>(null);
  const [isAttendanceViewerOpen, setIsAttendanceViewerOpen] = useState(false);
  const [attendanceFilter, setAttendanceFilter] = useState('all'); // all, present, late, absent
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
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
  
  // GPS Attendance specific states
  const [selectedGPSFilter, setSelectedGPSFilter] = useState('all');
  const [isGPSDetailsOpen, setIsGPSDetailsOpen] = useState(false);
  const [selectedGPSRecord, setSelectedGPSRecord] = useState<any>(null);

  // Insurance specific states
  const [selectedInsuranceFilter, setSelectedInsuranceFilter] = useState('all');
  const [selectedInsuranceDetails, setSelectedInsuranceDetails] = useState<any>(null);

  // Job Category specific states
  const [selectedJobCategoryFilter, setSelectedJobCategoryFilter] = useState('all');
  const [selectedJobCategoryDetails, setSelectedJobCategoryDetails] = useState<any>(null);

  // Requests specific states
  const [selectedRequestsFilter, setSelectedRequestsFilter] = useState('all');
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<any>(null);

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

    if (!employee?.id) {
      toast({
        title: 'خطأ',
        description: 'لم يتم العثور على بيانات الموظف',
        variant: 'destructive'
      });
      return;
    }

    try {
      await submitEmployeeRequest({
        employee_id: employee.id,
        request_type: requestFormData.request_type,
        title: requestFormData.title,
        description: requestFormData.description,
        priority: 'medium',
        status: 'pending',
        documents: []
      });
      
      setIsRequestDialogOpen(false);
      setRequestFormData({ request_type: '', title: '', description: '' });
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  // معالجات الإجراءات السريعة
  const handleQuickLeaveRequest = () => {
    setLeaveFormData({
      leave_type: '',
      start_date: '',
      end_date: '',
      reason: '',
      total_days: 0
    });
    setIsLeaveDialogOpen(true);
  };

  const handleQuickSalaryCertificate = () => {
    setRequestFormData({
      request_type: 'salary_certificate',
      title: 'طلب شهادة راتب',
      description: 'أحتاج إلى شهادة راتب للغرض الشخصي'
    });
    setIsRequestDialogOpen(true);
  };

  const handleQuickResidentRequest = () => {
    setRequestFormData({
      request_type: 'resident_request',
      title: 'طلب مقيم',
      description: 'طلب إضافة مقيم جديد'
    });
    setIsRequestDialogOpen(true);
  };

  const handleContactHR = () => {
    setChatType('hr');
    // سيتم فتح نافذة الدردشة من خلال الزر الموجود بالهيدر
  };

  const handleDownloadDocuments = () => {
    setActiveTab('documents');
  };

  // معالجات الدورات التدريبية
  const handleEnterCourse = (course: any) => {
    setSelectedCourse(course);
    setIsCourseViewerOpen(true);
  };

  const handleJoinClassroom = (course: any) => {
    setSelectedCourse(course);
    setIsClassroomOpen(true);
    // إضافة رسائل وهمية للتفاعل
    setClassroomMessages([
      { id: 1, sender: 'د. أحمد محمد - المدرب', message: 'أهلاً وسهلاً بكم في الدورة التدريبية', timestamp: '10:00' },
      { id: 2, sender: 'سارة أحمد', message: 'شكراً لكم على هذه الدورة المفيدة', timestamp: '10:05' },
      { id: 3, sender: 'محمد علي', message: 'هل يمكن إعادة شرح النقطة الأخيرة؟', timestamp: '10:08' }
    ]);
  };

  const sendClassroomMessage = () => {
    if (newClassroomMessage.trim()) {
      const message = {
        id: classroomMessages.length + 1,
        sender: employeeDisplayData.name,
        message: newClassroomMessage,
        timestamp: new Date().toLocaleTimeString('ar-SA', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setClassroomMessages([...classroomMessages, message]);
      setNewClassroomMessage('');
    }
  };

  const handleWatchCourse = (course: any) => {
    toast({
      title: 'بدء مشاهدة الدورة',
      description: `تم بدء مشاهدة دورة: ${course.title}`,
    });
    // هنا يمكن إضافة منطق تشغيل الفيديو
  };

  // معالجات المهام
  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setIsTaskViewerOpen(true);
    // إضافة تعليقات وهمية للمهمة
    setTaskComments([
      { id: 1, author: 'أحمد محمد', comment: 'يرجى التركيز على الأمان في هذا المشروع', timestamp: '2024-01-10 09:30' },
      { id: 2, author: 'سارة أحمد', comment: 'تم رفع التصميم الأولي للمراجعة', timestamp: '2024-01-11 14:20' },
    ]);
  };

  const handleUpdateTaskStatus = (taskId: number, newStatus: string) => {
    toast({
      title: 'تم تحديث حالة المهمة',
      description: `تم تغيير حالة المهمة إلى: ${newStatus}`,
    });
  };

  const addTaskComment = () => {
    if (newTaskComment.trim()) {
      const comment = {
        id: taskComments.length + 1,
        author: employeeDisplayData.name,
        comment: newTaskComment,
        timestamp: new Date().toLocaleString('ar-SA')
      };
      setTaskComments([...taskComments, comment]);
      setNewTaskComment('');
    }
  };

  const handleStartTask = (task: any) => {
    toast({
      title: 'بدء العمل على المهمة',
      description: `تم بدء العمل على: ${task.title}`,
    });
  };

  // معالجات الدوام
  const handleViewAttendanceDetails = (attendance: any) => {
    setSelectedAttendance(attendance);
    setIsAttendanceViewerOpen(true);
  };

  const handleRequestCorrection = (attendance: any) => {
    toast({
      title: 'طلب تصحيح',
      description: `تم إرسال طلب تصحيح للحضور في يوم ${attendance.date}`,
    });
  };

  const handleExportAttendance = () => {
    toast({
      title: 'تصدير البيانات',
      description: 'تم تصدير بيانات الحضور بنجاح',
    });
  };

  // GPS Attendance handlers
  const handleViewGPSDetails = (record: any) => {
    setSelectedGPSRecord(record);
    setIsGPSDetailsOpen(true);
  };

  const handleExportGPSData = (record: any) => {
    toast({
      title: 'تصدير بيانات GPS',
      description: `تم تصدير بيانات الحضور GPS ليوم ${record.date}`,
    });
  };

  // Insurance handlers
  const handleViewInsuranceDetails = (claim: any) => {
    setSelectedInsuranceDetails(claim);
  };

  const handleSubmitInsuranceClaim = () => {
    toast({
      title: 'مطالبة جديدة',
      description: 'تم تسجيل مطالبة تأمين جديدة بنجاح',
    });
  };

  const handleDownloadInsuranceCard = () => {
    toast({
      title: 'تحميل البطاقة',
      description: 'تم تحميل بطاقة التأمين بنجاح',
    });
  };

  const handleContactInsurance = () => {
    toast({
      title: 'اتصال بشركة التأمين',
      description: 'سيتم توصيلك بممثل شركة التأمين',
    });
  };

  // Job Category handlers
  const handleViewJobCategoryDetails = (item: any) => {
    setSelectedJobCategoryDetails(item);
  };

  const handleRequestPromotion = () => {
    toast({
      title: 'طلب ترقية',
      description: 'تم تسجيل طلب الترقية بنجاح وسيتم مراجعته',
    });
  };

  const handleSkillAssessment = () => {
    toast({
      title: 'تقييم المهارات',
      description: 'سيتم توجيهك لصفحة تقييم المهارات',
    });
  };

  const handleCareerDevelopment = () => {
    toast({
      title: 'التطوير المهني',
      description: 'مشاهدة خطة التطوير المهني',
    });
  };

  // Requests handlers
  const handleViewRequestDetails = (request: any) => {
    setSelectedRequestDetails(request);
  };

  const handleSubmitNewRequest = () => {
    toast({
      title: 'طلب جديد',
      description: 'تم تسجيل الطلب بنجاح وسيتم مراجعته',
    });
    setIsRequestDialogOpen(false);
  };

  const handleCancelRequest = (requestId: string) => {
    toast({
      title: 'إلغاء الطلب',
      description: `تم إلغاء الطلب رقم ${requestId} بنجاح`,
    });
  };

  const handleFollowUpRequest = (requestId: string) => {
    toast({
      title: 'متابعة الطلب',
      description: `تم إرسال استفسار حول الطلب رقم ${requestId}`,
    });
  };

  const handleRequestGPSCorrection = (record: any) => {
    toast({
      title: 'طلب تصحيح GPS',
      description: `تم إرسال طلب تصحيح للحضور GPS في يوم ${record.date}`,
     });
   };

  // تحويل بيانات الحضور للواجهة
  const attendanceData = attendanceRecords.map(record => ({
    date: new Date(record.attendance_date).toLocaleDateString('ar-SA'),
    checkIn: record.clock_in_time ? new Date(record.clock_in_time).toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }) : '--:--',
    checkOut: record.clock_out_time ? new Date(record.clock_out_time).toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }) : '--:--',
    status: record.status === 'present' ? 'حاضر' : 
            record.status === 'late' ? 'متأخر' : 
            record.status === 'absent' ? 'غائب' : 
            record.status === 'overtime' ? 'ساعات إضافية' : 'إجازة',
    hours: record.total_hours ? `${record.total_hours.toFixed(1)} ساعة` : '0:00'
  }));

  const getAttendanceStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(record => record.status === 'حاضر').length;
    const late = attendanceData.filter(record => record.status === 'متأخر').length;
    const absent = attendanceData.filter(record => record.status === 'غائب').length;
    const leaves = attendanceData.filter(record => record.status === 'إجازة').length;

    return { total, present, late, absent, leaves };
  };

  const filteredAttendanceData = attendanceData.filter(record => {
    if (attendanceFilter === 'all') return true;
    if (attendanceFilter === 'present') return record.status === 'حاضر';
    if (attendanceFilter === 'late') return record.status === 'متأخر';
    if (attendanceFilter === 'absent') return record.status === 'غائب';
    return true;
  });

  // GPS Attendance filtered data with safety check
  const filteredGPSAttendance = (attendanceData || []).filter(record => {
    if (selectedGPSFilter === 'all') return true;
    if (selectedGPSFilter === 'present') return record.status === 'حاضر';
    if (selectedGPSFilter === 'late') return record.status === 'متأخر';
    if (selectedGPSFilter === 'absent') return record.status === 'غائب';
    return true;
  });

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
    { 
      id: 1, 
      title: 'إنهاء مشروع النظام المصرفي', 
      description: 'تطوير وتنفيذ النظام المصرفي الجديد مع جميع الوحدات المطلوبة',
      dueDate: '2024-01-15', 
      status: 'قيد التنفيذ', 
      priority: 'عالية',
      progress: 75,
      assignedBy: 'أحمد محمد - مدير المشروع',
      category: 'تطوير',
      estimatedHours: 120,
      actualHours: 90,
      attachments: ['متطلبات_النظام.pdf', 'التصميم_الأولي.png']
    },
    { 
      id: 2, 
      title: 'مراجعة الكود البرمجي للفريق', 
      description: 'مراجعة شاملة للكود البرمجي المكتوب من قبل أعضاء الفريق وتقديم الملاحظات',
      dueDate: '2024-01-12', 
      status: 'مكتمل', 
      priority: 'متوسطة',
      progress: 100,
      assignedBy: 'سارة أحمد - كبير المطورين',
      category: 'مراجعة',
      estimatedHours: 16,
      actualHours: 14,
      attachments: ['تقرير_المراجعة.docx']
    },
    { 
      id: 3, 
      title: 'إعداد تقرير الأداء الشهري', 
      description: 'تجميع وتحليل بيانات الأداء الشهري وإعداد التقرير النهائي',
      dueDate: '2024-01-20', 
      status: 'معلق', 
      priority: 'منخفضة',
      progress: 25,
      assignedBy: 'محمد علي - مدير الأداء',
      category: 'تقارير',
      estimatedHours: 8,
      actualHours: 2,
      attachments: []
    }
  ];

  // الدورات التدريبية
  const courses = [
    { id: 1, title: 'أساسيات الأمن السيبراني', duration: '40 ساعة', progress: 75, status: 'جاري', startDate: '2024-01-01' },
    { id: 2, title: 'إدارة المشاريع الرقمية', duration: '30 ساعة', progress: 100, status: 'مكتمل', startDate: '2023-12-01' },
    { id: 3, title: 'البرمجة المتقدمة', duration: '50 ساعة', progress: 0, status: 'مسجل', startDate: '2024-01-25' }
  ];

  // بيانات التأمين
  const insuranceData = {
    provider: 'شركة التأمين الطبي المتقدم',
    policyNumber: 'POL-2024-001234',
    coverage: 'شامل',
    familyMembers: 3,
    annualLimit: 100000,
    used: 15000,
    claims: [
      {
        id: 1,
        date: '2024-01-15',
        type: 'زيارة طبيب',
        provider: 'مستشفى الملك فيصل',
        amount: 450,
        status: 'تم الموافقة',
        claimNumber: 'CLM-2024-001'
      },
      {
        id: 2,
        date: '2024-01-28',
        type: 'تحاليل طبية',
        provider: 'مختبر الفا الطبي',
        amount: 280,
        status: 'قيد المراجعة',
        claimNumber: 'CLM-2024-002'
      },
      {
        id: 3,
        date: '2024-02-10',
        type: 'أشعة سينية',
        provider: 'مركز الإشعاع التشخيصي',
        amount: 320,
        status: 'تم الموافقة',
        claimNumber: 'CLM-2024-003'
      },
      {
        id: 4,
        date: '2024-02-22',
        type: 'علاج طبيعي',
        provider: 'مركز العلاج الطبيعي',
        amount: 600,
        status: 'مرفوض',
        claimNumber: 'CLM-2024-004'
      }
    ],
    benefits: [
      { name: 'تغطية طبية شاملة', covered: true },
      { name: 'تغطية الأسنان', covered: true },
      { name: 'تغطية العيون', covered: true },
      { name: 'تغطية الولادة', covered: true },
      { name: 'الطوارئ 24/7', covered: true },
      { name: 'العلاج النفسي', covered: false }
    ]
  };

  // Insurance filtered data - defined after insuranceData declaration
  const filteredInsuranceClaims = (insuranceData.claims || []).filter((claim: any) => {
    if (selectedInsuranceFilter === 'all') return true;
    if (selectedInsuranceFilter === 'approved') return claim.status === 'تم الموافقة';
    if (selectedInsuranceFilter === 'pending') return claim.status === 'قيد المراجعة';
    if (selectedInsuranceFilter === 'rejected') return claim.status === 'مرفوض';
    return true;
  });

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

  // بيانات الفئة الوظيفية المحسنة
  const jobCategoryData = {
    currentLevel: 'المستوى الخامس',
    salaryGrade: 'الدرجة 12',
    nextPromotion: '2024-06-01',
    yearsInPosition: 1.5,
    performanceRating: 4.2,
    skills: [
      { name: 'البرمجة', level: 85, category: 'تقنية' },
      { name: 'إدارة المشاريع', level: 70, category: 'إدارية' },
      { name: 'التواصل', level: 90, category: 'شخصية' },
      { name: 'القيادة', level: 65, category: 'قيادية' },
      { name: 'حل المشكلات', level: 80, category: 'تحليلية' },
      { name: 'العمل الجماعي', level: 95, category: 'اجتماعية' }
    ],
    competencies: [
      { name: 'الكفاءة المهنية', score: 4.5, maxScore: 5, status: 'ممتاز' },
      { name: 'الالتزام والانضباط', score: 4.8, maxScore: 5, status: 'ممتاز' },
      { name: 'التطوير المستمر', score: 4.0, maxScore: 5, status: 'جيد جداً' },
      { name: 'التعاون والفريق', score: 4.7, maxScore: 5, status: 'ممتاز' }
    ],
    goals: [
      {
        id: 1,
        title: 'تطوير نظام إدارة المحتوى',
        description: 'قيادة فريق تطوير نظام CMS جديد',
        progress: 75,
        deadline: '2024-03-31',
        status: 'جاري',
        priority: 'عالية'
      },
      {
        id: 2,
        title: 'إكمال دورة القيادة',
        description: 'اجتياز برنامج تطوير القيادة',
        progress: 60,
        deadline: '2024-02-28',
        status: 'جاري',
        priority: 'متوسطة'
      },
      {
        id: 3,
        title: 'تحسين الأداء الفني',
        description: 'رفع مستوى الكفاءة التقنية بنسبة 15%',
        progress: 100,
        deadline: '2024-01-31',
        status: 'مكتمل',
        priority: 'عالية'
      }
    ]
  };

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

  // بيانات الطلبات المحسنة
  const enhancedRequests = [
    {
      id: 'REQ-2024-001',
      type: 'إجازة سنوية',
      category: 'إجازات',
      title: 'طلب إجازة سنوية',
      description: 'إجازة سنوية لمدة 10 أيام للسفر مع العائلة',
      submittedDate: '2024-01-10',
      requestedDate: '2024-02-15',
      duration: '10 أيام',
      status: 'تمت الموافقة',
      priority: 'عادية',
      approver: 'أحمد محمد - مدير القسم',
      documents: ['إجازة-سنوية.pdf'],
      comments: 'تم الموافقة على الطلب، يرجى التنسيق مع الفريق'
    },
    {
      id: 'REQ-2024-002',
      type: 'طلب تدريب',
      category: 'تطوير',
      title: 'دورة تطوير الويب المتقدمة',
      description: 'التسجيل في دورة React و Node.js المتقدمة',
      submittedDate: '2024-01-15',
      requestedDate: '2024-03-01',
      duration: '40 ساعة',
      status: 'قيد المراجعة',
      priority: 'متوسطة',
      approver: 'سارة أحمد - مدير الموارد البشرية',
      documents: ['خطة-التدريب.pdf'],
      comments: 'في انتظار الموافقة على الميزانية'
    },
    {
      id: 'REQ-2024-003',
      type: 'تعديل بيانات',
      category: 'إدارية',
      title: 'تحديث رقم الهاتف',
      description: 'تحديث رقم الهاتف في السجلات الرسمية',
      submittedDate: '2024-01-20',
      requestedDate: '2024-01-20',
      duration: 'فوري',
      status: 'مكتمل',
      priority: 'عادية',
      approver: 'فاطمة علي - موظفة الموارد البشرية',
      documents: [],
      comments: 'تم التحديث بنجاح'
    },
    {
      id: 'REQ-2024-004',
      type: 'طلب معدات',
      category: 'تقنية',
      title: 'شاشة إضافية للعمل',
      description: 'طلب شاشة إضافية 27 بوصة لتحسين الإنتاجية',
      submittedDate: '2024-01-25',
      requestedDate: '2024-02-01',
      duration: '-',
      status: 'مرفوض',
      priority: 'منخفضة',
      approver: 'خالد يوسف - مدير تقنية المعلومات',
      documents: ['مواصفات-الشاشة.pdf'],
      comments: 'تم رفض الطلب بسبب قيود الميزانية'
    },
    {
      id: 'REQ-2024-005',
      type: 'شهادة خبرة',
      category: 'وثائق',
      title: 'طلب شهادة خبرة',
      description: 'شهادة خبرة للتقديم على وظيفة خارجية',
      submittedDate: '2024-01-28',
      requestedDate: '2024-02-05',
      duration: '3 أيام عمل',
      status: 'قيد المراجعة',
      priority: 'عالية',
      approver: 'نورا حسن - مدير الموارد البشرية',
      documents: [],
      comments: 'في مرحلة الإعداد والمراجعة'
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
                <CardDescription>قائمة بجميع المهام والمشاريع المكلف بها مع إمكانية التفاعل والمتابعة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tasks.map((task) => (
                    <Card key={task.id} className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{task.title}</h3>
                              <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-white px-3 py-1`}>
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3 leading-relaxed">{task.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <CalendarIcon className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">تاريخ الاستحقاق:</span>
                                <span>{task.dueDate}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <UserIcon className="h-4 w-4 text-green-500" />
                                <span className="font-medium">المكلف من:</span>
                                <span>{task.assignedBy}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Timer className="h-4 w-4 text-purple-500" />
                                <span className="font-medium">الساعات:</span>
                                <span>{task.actualHours}/{task.estimatedHours}ساعة</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <Badge variant="outline" className={`${getTaskStatusColor(task.status)} text-white px-3 py-1 mb-2`}>
                              {task.status}
                            </Badge>
                            <div className="text-xs text-muted-foreground">{task.category}</div>
                          </div>
                        </div>

                        {/* شريط التقدم */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">نسبة الإنجاز</span>
                            <span className="text-sm font-bold text-primary">{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>

                        {/* المرفقات إن وجدت */}
                        {task.attachments.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <FileIcon className="h-4 w-4 text-orange-500" />
                              <span className="text-sm font-medium">المرفقات ({task.attachments.length})</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {task.attachments.map((file, index) => (
                                <Badge key={index} variant="outline" className="text-xs hover:bg-muted cursor-pointer">
                                  📎 {file}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* أزرار التفاعل */}
                        <div className="flex gap-2 flex-wrap">
                          <Button 
                            size="sm" 
                            onClick={() => handleViewTask(task)}
                            className="bg-primary hover:bg-primary/90 hover-scale"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {task.status !== 'مكتمل' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleStartTask(task)}
                              className="hover:bg-green-50 hover:border-green-500 hover:text-green-700 hover-scale"
                            >
                              <PlayCircle className="h-4 w-4 ml-2" />
                              بدء العمل
                            </Button>
                          )}
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 hover-scale"
                          >
                            <MessageSquareText className="h-4 w-4 ml-2" />
                            التعليقات
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="hover:bg-orange-50 hover:border-orange-500 hover:text-orange-700 hover-scale"
                          >
                            <Upload className="h-4 w-4 ml-2" />
                            رفع ملف
                          </Button>

                          {task.status === 'مكتمل' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-purple-50 hover:border-purple-500 hover:text-purple-700 hover-scale"
                            >
                              <CheckCircleIcon className="h-4 w-4 ml-2" />
                              تم الإنجاز
                            </Button>
                          )}
                        </div>

                        {/* معلومات إضافية للمهام النشطة */}
                        {task.status === 'قيد التنفيذ' && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in">
                            <div className="flex items-center gap-2 text-blue-700">
                              <Timer className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                المهمة نشطة - متبقي {task.estimatedHours - task.actualHours} ساعة للإنجاز
                              </span>
                            </div>
                          </div>
                        )}

                        {task.status === 'معلق' && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200 animate-fade-in">
                            <div className="flex items-center gap-2 text-yellow-700">
                              <PauseCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">المهمة معلقة - يرجى المتابعة مع المسؤول</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
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
                <div className="space-y-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>المدة: {course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>البداية: {course.startDate}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className={`${getCourseStatusColor(course.status)} text-white px-3 py-1`}>
                            {course.status}
                          </Badge>
                        </div>

                        {/* شريط التقدم */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">نسبة الإنجاز</span>
                            <span className="text-sm font-bold text-primary">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        {/* أزرار التفاعل */}
                        <div className="flex gap-2 flex-wrap">
                          <Button 
                            size="sm" 
                            onClick={() => handleEnterCourse(course)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <BookOpen className="h-4 w-4 ml-2" />
                            دخول الدورة
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleWatchCourse(course)}
                            className="hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            مشاهدة المحتوى
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleJoinClassroom(course)}
                            className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700"
                          >
                            <Users className="h-4 w-4 ml-2" />
                            القاعة التفاعلية
                          </Button>
                          
                          {course.progress > 0 && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-orange-50 hover:border-orange-500 hover:text-orange-700"
                            >
                              <Download className="h-4 w-4 ml-2" />
                              تحميل الشهادة
                            </Button>
                          )}
                        </div>

                        {/* معلومات إضافية للدورات النشطة */}
                        {course.status === 'جاري' && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 text-blue-700">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm font-medium">الدرس القادم: غداً في الساعة 10:00 صباحاً</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب جدول الدوام الشهري */}
          <TabsContent value="attendance" className="space-y-6">
            {/* إحصائيات الدوام */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">أيام الحضور</p>
                      <p className="text-2xl font-bold text-green-700">{getAttendanceStats().present}</p>
                    </div>
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">أيام التأخير</p>
                      <p className="text-2xl font-bold text-yellow-700">{getAttendanceStats().late}</p>
                    </div>
                    <ClockIcon className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">أيام الغياب</p>
                      <p className="text-2xl font-bold text-red-700">{getAttendanceStats().absent}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">إجمالي الأيام</p>
                      <p className="text-2xl font-bold text-blue-700">{getAttendanceStats().total}</p>
                    </div>
                    <CalendarDays2 className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5" />
                      سجل الدوام الشهري
                    </CardTitle>
                    <CardDescription>تفاصيل دوامك اليومي مع إمكانية التفاعل والتصحيح</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأيام</SelectItem>
                        <SelectItem value="present">حاضر</SelectItem>
                        <SelectItem value="late">متأخر</SelectItem>
                        <SelectItem value="absent">غائب</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={handleExportAttendance} size="sm">
                      <DownloadIcon className="h-4 w-4 ml-2" />
                      تصدير
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAttendanceData.map((record, index) => (
                    <Card key={index} className="border-l-4 border-l-primary/20 hover:shadow-lg transition-all duration-300 animate-fade-in">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            {/* تاريخ اليوم */}
                            <div className="text-center min-w-[80px]">
                              <div className="text-lg font-bold text-primary">{record.date.split('/')[0]}</div>
                              <div className="text-xs text-muted-foreground">{record.date.split('/').slice(1).join('/')}</div>
                            </div>

                            {/* أوقات الدخول والخروج */}
                            <div className="flex gap-8">
                              <div className="text-center">
                                <div className="text-xs font-medium text-muted-foreground mb-1">وقت الدخول</div>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${record.checkIn !== '--:--' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                  <span className={`font-mono text-sm ${record.checkIn !== '--:--' ? 'text-green-700' : 'text-red-700'}`}>
                                    {record.checkIn}
                                  </span>
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-xs font-medium text-muted-foreground mb-1">وقت الخروج</div>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${record.checkOut !== '--:--' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                  <span className={`font-mono text-sm ${record.checkOut !== '--:--' ? 'text-green-700' : 'text-yellow-700'}`}>
                                    {record.checkOut}
                                  </span>
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-xs font-medium text-muted-foreground mb-1">إجمالي الساعات</div>
                                <div className="flex items-center gap-2">
                                  <Timer className="h-3 w-3 text-blue-500" />
                                  <span className="font-mono text-sm text-blue-700">{record.hours}</span>
                                </div>
                              </div>
                            </div>

                            {/* حالة اليوم */}
                            <div className="text-center">
                              <Badge variant="outline" className={`${getAttendanceStatusColor(record.status)} border-0 px-3 py-1`}>
                                <div className="flex items-center gap-1">
                                  {record.status === 'حاضر' && <CheckCircleIcon className="h-3 w-3" />}
                                  {record.status === 'متأخر' && <ClockIcon className="h-3 w-3" />}
                                  {record.status === 'غائب' && <XCircle className="h-3 w-3" />}
                                  {record.status === 'إجازة' && <CalendarDays2 className="h-3 w-3" />}
                                  {record.status}
                                </div>
                              </Badge>
                            </div>
                          </div>

                          {/* أزرار التفاعل */}
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewAttendanceDetails(record)}
                              className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 hover-scale"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            {(record.status === 'متأخر' || record.status === 'غائب') && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRequestCorrection(record.date)}
                                className="hover:bg-orange-50 hover:border-orange-500 hover:text-orange-700 hover-scale"
                              >
                                <AlertCircle className="h-4 w-4" />
                              </Button>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-gray-50 hover:border-gray-500 hover:text-gray-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* معلومات إضافية للحالات الخاصة */}
                        {record.status === 'متأخر' && (
                          <div className="mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200 animate-fade-in">
                            <div className="flex items-center gap-2 text-yellow-700 text-sm">
                              <AlertCircle className="h-4 w-4" />
                              <span>تأخير عن الموعد المحدد - يمكنك طلب تصحيح الحضور</span>
                            </div>
                          </div>
                        )}

                        {record.status === 'غائب' && (
                          <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200 animate-fade-in">
                            <div className="flex items-center gap-2 text-red-700 text-sm">
                              <XCircle className="h-4 w-4" />
                              <span>غياب غير مبرر - تواصل مع الموارد البشرية</span>
                            </div>
                          </div>
                        )}

                        {record.status === 'حاضر' && record.hours !== '0:00' && parseFloat(record.hours.replace(' ساعة', '')) > 8 && (
                          <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
                            <div className="flex items-center gap-2 text-green-700 text-sm">
                              <TrendingUpIcon className="h-4 w-4" />
                              <span>ساعات إضافية: {(parseFloat(record.hours.replace(' ساعة', '')) - 8).toFixed(1)} ساعة</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredAttendanceData.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarDays className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>لا توجد سجلات دوام للفلتر المحدد</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ملخص الأداء */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  ملخص الأداء الشهري
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {getAttendanceStats().total > 0 ? ((getAttendanceStats().present / getAttendanceStats().total) * 100).toFixed(1) : '0'}%
                    </div>
                    <p className="text-sm text-muted-foreground">معدل الحضور</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {attendanceData.reduce((acc, record) => {
                        const hours = parseFloat(record.hours.replace(' ساعة', '')) || 0;
                        return acc + hours;
                      }, 0).toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">إجمالي ساعات العمل</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {Math.max(0, attendanceData.reduce((acc, record) => {
                        const hours = parseFloat(record.hours.replace(' ساعة', '')) || 0;
                        return acc + Math.max(0, hours - 8);
                      }, 0)).toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">الساعات الإضافية</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب التأمين */}
          <TabsContent value="insurance" className="space-y-6">
            {/* إحصائيات التأمين */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">مطالبات مقبولة</p>
                      <p className="text-2xl font-bold text-green-700">
                        {insuranceData.claims.filter(c => c.status === 'تم الموافقة').length}
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">قيد المراجعة</p>
                      <p className="text-2xl font-bold text-yellow-700">
                        {insuranceData.claims.filter(c => c.status === 'قيد المراجعة').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">مطالبات مرفوضة</p>
                      <p className="text-2xl font-bold text-red-700">
                        {insuranceData.claims.filter(c => c.status === 'مرفوض').length}
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">المبلغ المستخدم</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {Math.round((insuranceData.used / insuranceData.annualLimit) * 100)}%
                      </p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* معلومات البوليصة */}
            <Card className="border-l-4 border-l-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <CardTitle>معلومات البوليصة</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleDownloadInsuranceCard}
                      className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700"
                    >
                      <Download className="h-4 w-4 ml-2" />
                      تحميل البطاقة
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSubmitInsuranceClaim}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      مطالبة جديدة
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm text-muted-foreground">شركة التأمين</Label>
                    <p className="font-semibold">{insuranceData.provider}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm text-muted-foreground">رقم البوليصة</Label>
                    <p className="font-semibold">{insuranceData.policyNumber}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm text-muted-foreground">نوع التغطية</Label>
                    <p className="font-semibold">{insuranceData.coverage}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Label className="text-sm text-muted-foreground">استخدام الحد السنوي</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={(insuranceData.used / insuranceData.annualLimit) * 100} className="flex-1" />
                    <span className="text-sm font-medium">
                      {insuranceData.used.toLocaleString()} / {insuranceData.annualLimit.toLocaleString()} ريال
                    </span>
                  </div>
                </div>

                {/* الفوائد المشمولة */}
                <div className="mt-6">
                  <Label className="text-sm text-muted-foreground mb-3 block">الفوائد المشمولة</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {insuranceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20">
                        {benefit.covered ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm ${benefit.covered ? 'text-green-700' : 'text-red-700'}`}>
                          {benefit.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* سجل المطالبات */}
            <Card className="border-l-4 border-l-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <CardTitle>سجل المطالبات</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedInsuranceFilter} onValueChange={setSelectedInsuranceFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المطالبات</SelectItem>
                        <SelectItem value="approved">تم الموافقة</SelectItem>
                        <SelectItem value="pending">قيد المراجعة</SelectItem>
                        <SelectItem value="rejected">مرفوض</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleContactInsurance}
                      className="hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                    >
                      <Phone className="h-4 w-4 ml-2" />
                      اتصال
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInsuranceClaims.map((claim: any) => (
                    <Card key={claim.id} className="border-l-4 border-l-primary/30 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">{claim.type}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>التاريخ: {claim.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                <span>{claim.provider}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{claim.amount} ريال</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              رقم المطالبة: {claim.claimNumber}
                            </p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${
                              claim.status === 'تم الموافقة' ? 'bg-green-50 text-green-700 border-green-200' :
                              claim.status === 'قيد المراجعة' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-red-50 text-red-700 border-red-200'
                            } px-3 py-1`}
                          >
                            {claim.status}
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewInsuranceDetails(claim)}
                            className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {claim.status === 'تم الموافقة' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                            >
                              <Download className="h-4 w-4 ml-2" />
                              تحميل الوثائق
                            </Button>
                          )}
                          
                          {claim.status === 'مرفوض' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-orange-50 hover:border-orange-500 hover:text-orange-700"
                            >
                              <RotateCcw className="h-4 w-4 ml-2" />
                              إعادة تقديم
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* ملخص الشهر */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    ملخص الشهر الحالي
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">إجمالي المطالبات</p>
                      <p className="text-lg font-bold text-primary">{insuranceData.claims.length}</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">المبلغ المطالب به</p>
                      <p className="text-lg font-bold text-green-600">
                        {insuranceData.claims.reduce((sum, claim) => sum + claim.amount, 0).toLocaleString()} ريال
                      </p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">معدل القبول</p>
                      <p className="text-lg font-bold text-blue-600">
                        {Math.round((insuranceData.claims.filter(c => c.status === 'تم الموافقة').length / insuranceData.claims.length) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب الفئة الوظيفية */}
          <TabsContent value="job-category" className="space-y-6">
            {/* إحصائيات الفئة الوظيفية */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">تقييم الأداء</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {jobCategoryData.performanceRating}/5
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">أهداف مكتملة</p>
                      <p className="text-2xl font-bold text-green-700">
                        {jobCategoryData.goals.filter(g => g.status === 'مكتمل').length}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">متوسط المهارات</p>
                      <p className="text-2xl font-bold text-purple-700">
                        {Math.round(jobCategoryData.skills.reduce((sum, skill) => sum + skill.level, 0) / jobCategoryData.skills.length)}%
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">سنوات الخبرة</p>
                      <p className="text-2xl font-bold text-orange-700">
                        {jobCategoryData.yearsInPosition}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* معلومات المنصب */}
            <Card className="border-l-4 border-l-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <CardTitle>معلومات المنصب الحالي</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleSkillAssessment}
                      className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700"
                    >
                      <BarChart3 className="h-4 w-4 ml-2" />
                      تقييم المهارات
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleRequestPromotion}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <TrendingUpIcon className="h-4 w-4 ml-2" />
                      طلب ترقية
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm text-muted-foreground">المنصب الحالي</Label>
                    <p className="font-semibold">{employeeDisplayData?.position}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm text-muted-foreground">المستوى الوظيفي</Label>
                    <p className="font-semibold">{jobCategoryData.currentLevel}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm text-muted-foreground">الدرجة المالية</Label>
                    <p className="font-semibold">{jobCategoryData.salaryGrade}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm text-muted-foreground">القسم</Label>
                    <p className="font-semibold">{employeeDisplayData?.department}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm text-muted-foreground">المدير المباشر</Label>
                    <p className="font-semibold">{employeeDisplayData?.directManager}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* تقييم المهارات */}
            <Card className="border-l-4 border-l-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    <CardTitle>تقييم المهارات</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedJobCategoryFilter} onValueChange={setSelectedJobCategoryFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="تصفية حسب الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المهارات</SelectItem>
                        <SelectItem value="تقنية">تقنية</SelectItem>
                        <SelectItem value="إدارية">إدارية</SelectItem>
                        <SelectItem value="شخصية">شخصية</SelectItem>
                        <SelectItem value="قيادية">قيادية</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleCareerDevelopment}
                      className="hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                    >
                      <TrendingUpIcon className="h-4 w-4 ml-2" />
                      خطة التطوير
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobCategoryData.skills.filter(skill => 
                    selectedJobCategoryFilter === 'all' || skill.category === selectedJobCategoryFilter
                  ).map((skill, index) => (
                    <Card key={index} className="border-l-4 border-l-primary/30 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">{skill.name}</h4>
                            <Badge variant="outline" className="mb-2">
                              {skill.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{skill.level}%</p>
                          </div>
                        </div>
                        <Progress value={skill.level} className="h-3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* الأهداف والإنجازات */}
            <Card className="border-l-4 border-l-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  <CardTitle>الأهداف والإنجازات</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobCategoryData.goals.map((goal) => (
                    <Card key={goal.id} className="border-l-4 border-l-primary/30 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">{goal.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>الموعد النهائي: {goal.deadline}</span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  goal.priority === 'عالية' ? 'border-red-200 text-red-700 bg-red-50' :
                                  goal.priority === 'متوسطة' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                                  'border-green-200 text-green-700 bg-green-50'
                                }`}
                              >
                                {goal.priority}
                              </Badge>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${
                              goal.status === 'مكتمل' ? 'bg-green-50 text-green-700 border-green-200' :
                              goal.status === 'جاري' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-gray-50 text-gray-700 border-gray-200'
                            } px-3 py-1`}
                          >
                            {goal.status}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">نسبة الإنجاز</span>
                            <span className="text-sm font-bold text-primary">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewJobCategoryDetails(goal)}
                            className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {goal.status !== 'مكتمل' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                            >
                              <CheckSquare className="h-4 w-4 ml-2" />
                              تحديث التقدم
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* ملخص الأداء */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    ملخص الأداء الحالي
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">الكفاءات</p>
                      <p className="text-lg font-bold text-primary">
                        {Math.round(jobCategoryData.competencies.reduce((sum, comp) => sum + comp.score, 0) / jobCategoryData.competencies.length * 10) / 10}/5
                      </p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">الأهداف المكتملة</p>
                      <p className="text-lg font-bold text-green-600">
                        {jobCategoryData.goals.filter(g => g.status === 'مكتمل').length}/{jobCategoryData.goals.length}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">متوسط التقدم</p>
                      <p className="text-lg font-bold text-blue-600">
                        {Math.round(jobCategoryData.goals.reduce((sum, goal) => sum + goal.progress, 0) / jobCategoryData.goals.length)}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">التقييم العام</p>
                      <p className="text-lg font-bold text-purple-600">ممتاز</p>
                    </div>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Satellite className="h-5 w-5" />
                  نظام الحضور GPS
                </CardTitle>
                <CardDescription>نظام حضور وانصراف متقدم مع تتبع الموقع الجغرافي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* إحصائيات الحضور */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover-scale cursor-pointer" 
                          onClick={() => setSelectedGPSFilter('present')}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white/80 text-sm">أيام الحضور</p>
                            <p className="text-2xl font-bold">{attendanceData.filter(r => r.status === 'حاضر').length}</p>
                          </div>
                          <CheckCircleIcon className="h-8 w-8 text-white/80" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover-scale cursor-pointer"
                          onClick={() => setSelectedGPSFilter('late')}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white/80 text-sm">أيام التأخير</p>
                            <p className="text-2xl font-bold">{attendanceData.filter(r => r.status === 'متأخر').length}</p>
                          </div>
                          <ClockIcon className="h-8 w-8 text-white/80" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white hover-scale cursor-pointer"
                          onClick={() => setSelectedGPSFilter('absent')}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white/80 text-sm">أيام الغياب</p>
                            <p className="text-2xl font-bold">{attendanceData.filter(r => r.status === 'غائب').length}</p>
                          </div>
                          <XCircle className="h-8 w-8 text-white/80" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover-scale cursor-pointer"
                          onClick={() => setSelectedGPSFilter('all')}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white/80 text-sm">إجمالي الساعات</p>
                            <p className="text-2xl font-bold">
                              {attendanceData.reduce((total, record) => {
                                const hours = parseFloat(record.hours.replace(' ساعة', '')) || 0;
                                return total + hours;
                              }, 0).toFixed(1)}
                            </p>
                          </div>
                          <Timer className="h-8 w-8 text-white/80" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* فلاتر الحضور */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium">تصفية بحسب:</span>
                    <Badge 
                      variant={selectedGPSFilter === 'all' ? 'default' : 'outline'}
                      className="cursor-pointer hover-scale"
                      onClick={() => setSelectedGPSFilter('all')}
                    >
                      الكل
                    </Badge>
                    <Badge 
                      variant={selectedGPSFilter === 'present' ? 'default' : 'outline'}
                      className="cursor-pointer hover-scale"
                      onClick={() => setSelectedGPSFilter('present')}
                    >
                      حاضر
                    </Badge>
                    <Badge 
                      variant={selectedGPSFilter === 'late' ? 'default' : 'outline'}
                      className="cursor-pointer hover-scale"
                      onClick={() => setSelectedGPSFilter('late')}
                    >
                      متأخر
                    </Badge>
                    <Badge 
                      variant={selectedGPSFilter === 'absent' ? 'default' : 'outline'}
                      className="cursor-pointer hover-scale"
                      onClick={() => setSelectedGPSFilter('absent')}
                    >
                      غائب
                    </Badge>
                  </div>

                  {/* سجلات الحضور GPS */}
                  <div className="space-y-4">
                    {filteredGPSAttendance.map((record, index) => (
                      <Card key={index} className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold">{record.date}</h3>
                                <Badge variant="outline" className={`${getAttendanceStatusColor(record.status)} text-white px-3 py-1`}>
                                  {record.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                  <LogIn className="h-4 w-4 text-green-500" />
                                  <span className="font-medium">دخول:</span>
                                  <span>{record.checkIn}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <LogOut className="h-4 w-4 text-red-500" />
                                  <span className="font-medium">خروج:</span>
                                  <span>{record.checkOut}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Timer className="h-4 w-4 text-blue-500" />
                                  <span className="font-medium">ساعات العمل:</span>
                                  <span>{record.hours}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="h-4 w-4 text-purple-500" />
                                  <span className="font-medium">الموقع:</span>
                                  <span>مؤكد GPS</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* أزرار التفاعل */}
                          <div className="flex gap-2 flex-wrap">
                            <Button 
                              size="sm" 
                              onClick={() => handleViewGPSDetails(record)}
                              className="bg-primary hover:bg-primary/90 hover-scale"
                            >
                              <Eye className="h-4 w-4 ml-2" />
                              عرض الموقع
                            </Button>
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleExportGPSData(record)}
                              className="hover:bg-green-50 hover:border-green-500 hover:text-green-700 hover-scale"
                            >
                              <Download className="h-4 w-4 ml-2" />
                              تصدير البيانات
                            </Button>
                            
                            <Button 
                              size="sm" 
                              variant="outline"  
                              onClick={() => handleRequestGPSCorrection(record)}
                              className="hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-700 hover-scale"
                            >
                              <AlertCircle className="h-4 w-4 ml-2" />
                              طلب تصحيح
                            </Button>
                          </div>

                          {/* معلومات إضافية حسب الحالة */}
                          {record.status === 'متأخر' && (
                            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200 animate-fade-in">
                              <div className="flex items-center gap-2 text-yellow-700">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                  تم تسجيل تأخير - يرجى مراجعة المسؤول المباشر
                                </span>
                              </div>
                            </div>
                          )}

                          {record.status === 'غائب' && (
                            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200 animate-fade-in">
                              <div className="flex items-center gap-2 text-red-700">
                                <XCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                  يوم غياب - سيتم خصم من الراتب حسب اللوائح
                                </span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredGPSAttendance.length === 0 && (
                    <Card className="text-center py-8">
                      <CardContent>
                        <Satellite className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">لا توجد سجلات حضور للفلتر المحدد</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* ملخص الأداء الشهري */}
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <TrendingUp className="h-5 w-5" />
                        ملخص أداء الحضور GPS
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-green-600">
                            {((attendanceData.filter(r => r.status === 'حاضر').length / attendanceData.length) * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-muted-foreground">معدل الحضور</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-blue-600">
                            {(attendanceData.reduce((total, record) => {
                              const hours = parseFloat(record.hours.replace(' ساعة', '')) || 0;
                              return total + hours;
                            }, 0) / attendanceData.length).toFixed(1)}
                          </div>
                          <div className="text-sm text-muted-foreground">متوسط الساعات يومياً</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                          <div className="text-2xl font-bold text-yellow-600">
                            {attendanceData.filter(r => r.status === 'متأخر').length}
                          </div>
                          <div className="text-sm text-muted-foreground">مرات التأخير</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* نافذة تفاصيل الموقع GPS */}
            <Dialog open={isGPSDetailsOpen} onOpenChange={setIsGPSDetailsOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    تفاصيل موقع الحضور GPS
                  </DialogTitle>
                  <DialogDescription>
                    معلومات تفصيلية عن موقع تسجيل الحضور والانصراف
                  </DialogDescription>
                </DialogHeader>
                
                {selectedGPSRecord && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">التاريخ</label>
                        <p className="text-lg font-semibold">{selectedGPSRecord.date}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">الحالة</label>
                        <Badge className={`${getAttendanceStatusColor(selectedGPSRecord.status)} text-white`}>
                          {selectedGPSRecord.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">وقت الدخول</label>
                        <p className="text-lg">{selectedGPSRecord.checkIn}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">وقت الخروج</label>
                        <p className="text-lg">{selectedGPSRecord.checkOut}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">معلومات الموقع</label>
                      <Card className="p-4 bg-blue-50">
                        <div className="flex items-center gap-2 text-blue-700 mb-2">
                          <Satellite className="h-4 w-4" />
                          <span className="font-medium">الموقع مؤكد بواسطة GPS</span>
                        </div>
                        <p className="text-sm text-blue-600">
                          تم تأكيد موقع تسجيل الحضور داخل النطاق المسموح للشركة
                        </p>
                      </Card>
                    </div>
                  </div>
                )}
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsGPSDetailsOpen(false)}>
                    إغلاق
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                    onClick={handleQuickLeaveRequest}
                  >
                    <Calendar className="h-6 w-6" />
                    طلب إجازة
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                    onClick={handleQuickSalaryCertificate}
                  >
                    <FileText className="h-6 w-6" />
                    شهادة راتب
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                    onClick={handleQuickResidentRequest}
                  >
                    <Satellite className="h-6 w-6" />
                    طلب مقيم
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col gap-2 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                        onClick={handleContactHR}
                      >
                        <MessageCircle className="h-6 w-6" />
                        تواصل مع HR
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
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                    onClick={handleDownloadDocuments}
                  >
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
            {/* إحصائيات الطلبات */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">طلبات مقبولة</p>
                      <p className="text-2xl font-bold text-green-700">
                        {enhancedRequests.filter(r => r.status === 'تمت الموافقة' || r.status === 'مكتمل').length}
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">قيد المراجعة</p>
                      <p className="text-2xl font-bold text-yellow-700">
                        {enhancedRequests.filter(r => r.status === 'قيد المراجعة').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">طلبات مرفوضة</p>
                      <p className="text-2xl font-bold text-red-700">
                        {enhancedRequests.filter(r => r.status === 'مرفوض').length}
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">إجمالي الطلبات</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {enhancedRequests.length}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* إدارة الطلبات */}
            <Card className="border-l-4 border-l-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <CardTitle>طلباتي</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedRequestsFilter} onValueChange={setSelectedRequestsFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الطلبات</SelectItem>
                        <SelectItem value="إجازات">إجازات</SelectItem>
                        <SelectItem value="تطوير">تطوير</SelectItem>
                        <SelectItem value="إدارية">إدارية</SelectItem>
                        <SelectItem value="تقنية">تقنية</SelectItem>
                        <SelectItem value="وثائق">وثائق</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm"
                      onClick={handleSubmitNewRequest}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      طلب جديد
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enhancedRequests.filter(request => 
                    selectedRequestsFilter === 'all' || request.category === selectedRequestsFilter
                  ).map((request) => (
                    <Card key={request.id} className="border-l-4 border-l-primary/30 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">{request.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>تاريخ التقديم: {request.submittedDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>المدة: {request.duration}</span>
                              </div>
                              <Badge variant="outline" className="px-2 py-1">
                                {request.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              رقم الطلب: {request.id} | المعتمد: {request.approver}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge 
                              variant="outline" 
                              className={`${
                                request.status === 'تمت الموافقة' || request.status === 'مكتمل' ? 'bg-green-50 text-green-700 border-green-200' :
                                request.status === 'قيد المراجعة' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                'bg-red-50 text-red-700 border-red-200'
                              } px-3 py-1`}
                            >
                              {request.status}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`${
                                request.priority === 'عالية' ? 'border-red-200 text-red-700 bg-red-50' :
                                request.priority === 'متوسطة' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                                'border-green-200 text-green-700 bg-green-50'
                              } px-2 py-1 text-xs`}
                            >
                              {request.priority}
                            </Badge>
                          </div>
                        </div>

                        {/* تعليقات المراجع */}
                        {request.comments && (
                          <div className="mb-3 p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">تعليقات المراجع:</p>
                            <p className="text-sm">{request.comments}</p>
                          </div>
                        )}

                        {/* المرفقات */}
                        {request.documents.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-muted-foreground mb-2">المرفقات:</p>
                            <div className="flex flex-wrap gap-2">
                              {request.documents.map((doc, index) => (
                                <div key={index} className="flex items-center gap-1 px-2 py-1 bg-muted/20 rounded text-xs">
                                  <FileText className="h-3 w-3" />
                                  <span>{doc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 flex-wrap">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewRequestDetails(request)}
                            className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {request.status === 'قيد المراجعة' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleFollowUpRequest(request.id)}
                                className="hover:bg-green-50 hover:border-green-500 hover:text-green-700"
                              >
                                <MessageCircle className="h-4 w-4 ml-2" />
                                متابعة
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCancelRequest(request.id)}
                                className="hover:bg-red-50 hover:border-red-500 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4 ml-2" />
                                إلغاء الطلب
                              </Button>
                            </>
                          )}
                          
                          {(request.status === 'تمت الموافقة' || request.status === 'مكتمل') && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-purple-50 hover:border-purple-500 hover:text-purple-700"
                            >
                              <Download className="h-4 w-4 ml-2" />
                              تحميل الوثائق
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* ملخص الطلبات */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    ملخص الطلبات
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">معدل الموافقة</p>
                      <p className="text-lg font-bold text-green-600">
                        {Math.round((enhancedRequests.filter(r => r.status === 'تمت الموافقة' || r.status === 'مكتمل').length / enhancedRequests.length) * 100)}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">متوسط وقت المراجعة</p>
                      <p className="text-lg font-bold text-blue-600">3 أيام</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">الأكثر طلباً</p>
                      <p className="text-lg font-bold text-purple-600">الإجازات</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-muted-foreground">طلبات هذا الشهر</p>
                      <p className="text-lg font-bold text-orange-600">
                        {enhancedRequests.filter(r => r.submittedDate.includes('2024-01')).length}
                      </p>
                    </div>
                  </div>
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

        {/* Dialog لعارض تفاصيل الدوام */}
        <Dialog open={isAttendanceViewerOpen} onOpenChange={setIsAttendanceViewerOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                تفاصيل دوام يوم {selectedAttendance?.date}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* معلومات اليوم */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="h-4 w-4 text-green-500" />
                      <span className="font-medium">وقت الدخول</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{selectedAttendance?.checkIn}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ClockIcon className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">وقت الخروج</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{selectedAttendance?.checkOut}</p>
                  </CardContent>
                </Card>
              </div>

              {/* ملخص الأداء */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ملخص اليوم</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">{selectedAttendance?.hours}</div>
                      <p className="text-sm text-muted-foreground">ساعات العمل</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {selectedAttendance?.status === 'متأخر' ? '15 دقيقة' : '0 دقيقة'}
                      </div>
                      <p className="text-sm text-muted-foreground">التأخير</p>
                    </div>
                    <div>
                      <Badge className={`${getAttendanceStatusColor(selectedAttendance?.status)} text-white`}>
                        {selectedAttendance?.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* معلومات إضافية */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">معلومات إضافية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">الموقع:</span>
                      <span className="font-medium">المكتب الرئيسي</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">طريقة التسجيل:</span>
                      <span className="font-medium">بصمة + GPS</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">الاستراحة:</span>
                      <span className="font-medium">60 دقيقة</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">الساعات الإضافية:</span>
                      <span className="font-medium text-green-600">
                        {selectedAttendance?.hours && parseFloat(selectedAttendance.hours.replace(' ساعة', '')) > 8 
                          ? `${(parseFloat(selectedAttendance.hours.replace(' ساعة', '')) - 8).toFixed(1)} ساعة`
                          : '0 ساعة'
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* أزرار الإجراءات */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  <AlertCircle className="h-4 w-4 ml-2" />
                  طلب تصحيح
                </Button>
                <Button variant="outline">
                  <DownloadIcon className="h-4 w-4 ml-2" />
                  طباعة التفاصيل
                </Button>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 ml-2" />
                  إضافة ملاحظة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog لعارض المهام */}
        <Dialog open={isTaskViewerOpen} onOpenChange={setIsTaskViewerOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-primary" />
                تفاصيل المهمة: {selectedTask?.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* معلومات المهمة */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Timer className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">التقدم</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{selectedTask?.progress}%</p>
                    <Progress value={selectedTask?.progress} className="h-1 mt-2" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon className="h-4 w-4 text-green-500" />
                      <span className="font-medium">الموعد النهائي</span>
                    </div>
                    <p className="text-sm font-medium">{selectedTask?.dueDate}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">الأولوية</span>
                    </div>
                    <Badge className={getPriorityColor(selectedTask?.priority)}>
                      {selectedTask?.priority}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">الساعات</span>
                    </div>
                    <p className="text-sm">{selectedTask?.actualHours}/{selectedTask?.estimatedHours} ساعة</p>
                  </CardContent>
                </Card>
              </div>

              {/* وصف المهمة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    وصف المهمة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{selectedTask?.description}</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">المكلف من: </span>
                      <span className="text-primary">{selectedTask?.assignedBy}</span>
                    </div>
                    <div>
                      <span className="font-medium">التصنيف: </span>
                      <Badge variant="outline">{selectedTask?.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* المرفقات */}
              {selectedTask?.attachments?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileIcon className="h-5 w-5" />
                      المرفقات ({selectedTask.attachments.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedTask.attachments.map((file: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                          <FileIcon className="h-4 w-4 text-blue-500" />
                          <span className="flex-1 text-sm">{file}</span>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* التعليقات */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquareText className="h-5 w-5" />
                    التعليقات والملاحظات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                    {taskComments.map((comment) => (
                      <div key={comment.id} className="border-l-2 border-primary/20 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-primary">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="أضف تعليق أو ملاحظة..."
                      value={newTaskComment}
                      onChange={(e) => setNewTaskComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTaskComment()}
                    />
                    <Button onClick={addTaskComment} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* أزرار الإجراءات */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  <PlayCircle className="h-4 w-4 ml-2" />
                  متابعة العمل
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 ml-2" />
                  رفع ملف
                </Button>
                <Button variant="outline">
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                  تحديث الحالة
                </Button>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 ml-2" />
                  طلب مساعدة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog لعارض الدورة */}
        <Dialog open={isCourseViewerOpen} onOpenChange={setIsCourseViewerOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                {selectedCourse?.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* معلومات الدورة */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">المدة</span>
                    </div>
                    <p className="text-sm">{selectedCourse?.duration}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-green-500" />
                      <span className="font-medium">التقدم</span>
                    </div>
                    <p className="text-sm">{selectedCourse?.progress}%</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">الحالة</span>
                    </div>
                    <Badge className={getCourseStatusColor(selectedCourse?.status)}>
                      {selectedCourse?.status}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* محتوى الدورة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    محتوى الدورة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Play className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">الدرس الأول: مقدمة</h4>
                          <p className="text-sm text-muted-foreground">15 دقيقة</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">مكتمل</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 bg-primary/5">
                      <div className="flex items-center gap-3">
                        <Play className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">الدرس الثاني: الأساسيات</h4>
                          <p className="text-sm text-muted-foreground">25 دقيقة</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">حالي</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 opacity-60">
                      <div className="flex items-center gap-3">
                        <Play className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">الدرس الثالث: التطبيق العملي</h4>
                          <p className="text-sm text-muted-foreground">30 دقيقة</p>
                        </div>
                      </div>
                      <Badge variant="outline">مقفل</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* أزرار التفاعل */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Play className="h-4 w-4 ml-2" />
                  متابعة المشاهدة
                </Button>
                <Button variant="outline" onClick={() => handleJoinClassroom(selectedCourse)}>
                  <Users className="h-4 w-4 ml-2" />
                  انضم للقاعة
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل المواد
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog للقاعة التفاعلية */}
        <Dialog open={isClassroomOpen} onOpenChange={setIsClassroomOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                القاعة التفاعلية - {selectedCourse?.title}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px]">
              {/* منطقة الفيديو */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardContent className="p-0 h-full">
                    <div className="bg-black rounded-lg h-full flex items-center justify-center relative">
                      <div className="text-white text-center">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-2">البث المباشر للدورة</p>
                        <p className="text-sm opacity-75">د. أحمد محمد - مدرب معتمد</p>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Mic className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* منطقة الدردشة */}
              <div className="flex flex-col">
                <Card className="flex-1">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">الدردشة المباشرة</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 flex-1">
                    <div className="space-y-3 h-80 overflow-y-auto mb-3">
                      {classroomMessages.map((msg) => (
                        <div key={msg.id} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-primary">{msg.sender}</span>
                            <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                          </div>
                          <p className="text-sm bg-muted/50 p-2 rounded-lg">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        placeholder="اكتب رسالتك..."
                        value={newClassroomMessage}
                        onChange={(e) => setNewClassroomMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendClassroomMessage()}
                        className="text-sm"
                      />
                      <Button onClick={sendClassroomMessage} size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* المشاركون */}
                <Card className="mt-3">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">المشاركون (15)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>د. أحمد محمد (مدرب)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{employeeDisplayData.name} (أنت)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>سارة أحمد</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>محمد علي</span>
                      </div>
                      <div className="text-xs text-muted-foreground">+11 آخرين</div>
                    </div>
                  </CardContent>
                </Card>
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