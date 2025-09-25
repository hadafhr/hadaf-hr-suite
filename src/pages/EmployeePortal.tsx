import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  RotateCcw,
  Star
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { BoudLogo } from '@/components/BoudLogo';
import employeeAvatarImage from '@/assets/employee-avatar.jpg';
import GPSAttendanceSystem from '@/components/attendance/GPSAttendanceSystem';
import buodLogo from '@/assets/buod-logo-white.png';

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

  // Custody specific states
  const [selectedCustodyFilter, setSelectedCustodyFilter] = useState('all');
  const [selectedCustodyDetails, setSelectedCustodyDetails] = useState<any>(null);

  // Career Path specific states
  const [selectedCareerFilter, setSelectedCareerFilter] = useState('all');
  const [selectedCareerDetails, setSelectedCareerDetails] = useState<any>(null);

  // Payroll specific states
  const [selectedPayrollFilter, setSelectedPayrollFilter] = useState('all');
  const [selectedPayrollDetails, setSelectedPayrollDetails] = useState<any>(null);

  // Performance specific states
  const [selectedPerformanceFilter, setSelectedPerformanceFilter] = useState('all');
  const [selectedPerformanceDetails, setSelectedPerformanceDetails] = useState<any>(null);

  // Documents specific states
  const [selectedDocumentsFilter, setSelectedDocumentsFilter] = useState('all');
  const [selectedDocumentDetails, setSelectedDocumentDetails] = useState<any>(null);
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);

  // بيانات المستندات المحسنة
  const enhancedDocumentsData = {
    statistics: {
      totalDocuments: 24,
      activeDocuments: 18,
      expiringSoon: 3,
      pending: 2
    },
    categories: [
      {
        id: 'personal',
        name: 'المستندات الشخصية',
        count: 8,
        icon: User,
        color: 'blue'
      },
      {
        id: 'employment',
        name: 'مستندات العمل',
        count: 6,
        icon: Briefcase,
        color: 'green'
      },
      {
        id: 'financial',
        name: 'المستندات المالية',
        count: 5,
        icon: DollarSign,
        color: 'purple'
      },
      {
        id: 'certificates',
        name: 'الشهادات',
        count: 5,
        icon: Award,
        color: 'orange'
      }
    ],
    documents: [
      {
        id: 'DOC-2024-001',
        title: 'عقد العمل الحالي',
        category: 'employment',
        type: 'PDF',
        size: '2.4 MB',
        uploadDate: '2024-01-15',
        expiryDate: '2025-01-15',
        status: 'نشط',
        description: 'عقد العمل الموقع مع الشركة',
        downloadCount: 12,
        lastDownload: '2024-01-20',
        isConfidential: true
      },
      {
        id: 'DOC-2024-002',
        title: 'شهادة الراتب - يناير 2024',
        category: 'financial',
        type: 'PDF',
        size: '1.2 MB',
        uploadDate: '2024-01-31',
        expiryDate: null,
        status: 'نشط',
        description: 'شهادة راتب للشهر الحالي',
        downloadCount: 5,
        lastDownload: '2024-01-31',
        isConfidential: false
      },
      {
        id: 'DOC-2023-015',
        title: 'شهادة الخبرة',
        category: 'certificates',
        type: 'PDF',
        size: '1.8 MB',
        uploadDate: '2023-12-15',
        expiryDate: null,
        status: 'نشط',
        description: 'شهادة خبرة من الوظائف السابقة',
        downloadCount: 8,
        lastDownload: '2024-01-10',
        isConfidential: false
      },
      {
        id: 'DOC-2024-003',
        title: 'بطاقة التأمين الطبي',
        category: 'personal',
        type: 'PDF',
        size: '0.8 MB',
        uploadDate: '2024-01-10',
        expiryDate: '2024-12-31',
        status: 'ينتهي قريباً',
        description: 'بطاقة التأمين الطبي للسنة الحالية',
        downloadCount: 15,
        lastDownload: '2024-01-25',
        isConfidential: true
      },
      {
        id: 'DOC-2024-004',
        title: 'تقرير الأداء السنوي 2023',
        category: 'employment',
        type: 'PDF',
        size: '3.1 MB',
        uploadDate: '2024-01-05',
        expiryDate: null,
        status: 'نشط',
        description: 'تقييم الأداء للعام المنصرم',
        downloadCount: 3,
        lastDownload: '2024-01-15',
        isConfidential: true
      },
      {
        id: 'DOC-2023-012',
        title: 'شهادة التدريب - إدارة المشاريع',
        category: 'certificates',
        type: 'PDF',
        size: '1.5 MB',
        uploadDate: '2023-11-20',
        expiryDate: '2026-11-20',
        status: 'نشط',
        description: 'شهادة دورة إدارة المشاريع المتقدمة',
        downloadCount: 6,
        lastDownload: '2024-01-08',
        isConfidential: false
      }
    ]
  };

  // Documents handlers
  const handleViewDocumentDetails = (document: any) => {
    setSelectedDocumentDetails(document);
    setIsDocumentViewerOpen(true);
  };

  const handleDownloadDocument = (document: any) => {
    toast({
      title: 'تحميل المستند',
      description: `تم تحميل ${document.title} بنجاح`,
    });
  };

  const handleRequestDocument = () => {
    setRequestFormData({
      request_type: 'document_request',
      title: 'طلب مستند جديد',
      description: 'طلب الحصول على مستند إضافي'
    });
    setIsRequestDialogOpen(true);
  };

  const handleUploadDocument = () => {
    toast({
      title: 'رفع مستند',
      description: 'سيتم توجيهك لصفحة رفع المستندات',
    });
  };

  const handleShareDocument = (document: any) => {
    toast({
      title: 'مشاركة المستند',
      description: `تم إنشاء رابط مشاركة آمن لـ ${document.title}`,
    });
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'text-green-600 bg-green-100';
      case 'ينتهي قريباً': return 'text-orange-600 bg-orange-100';
      case 'منتهي الصلاحية': return 'text-red-600 bg-red-100';
      case 'قيد المراجعة': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // بيانات الأداء المحسنة
  const enhancedPerformanceData = {
    currentRating: {
      overall: 4.2,
      technical: 4.5,
      communication: 4.0,
      leadership: 3.8,
      problemSolving: 4.3,
      teamwork: 4.6,
      innovation: 4.1
    },
    goals: [
      {
        id: 'GOAL-2024-001',
        title: 'تطوير مهارات القيادة',
        description: 'حضور دورة تدريبية في القيادة وتطبيق المهارات المكتسبة',
        category: 'تطوير شخصي',
        targetDate: '2024-06-30',
        progress: 75,
        status: 'جاري',
        priority: 'عالية',
        measures: ['اجتياز الدورة التدريبية', 'قيادة مشروع فريق', 'تقييم 360 درجة']
      },
      {
        id: 'GOAL-2024-002',
        title: 'زيادة الإنتاجية بنسبة 20%',
        description: 'تحسين كفاءة العمل وتطوير العمليات لزيادة الإنتاجية',
        category: 'أداء',
        targetDate: '2024-03-31',
        progress: 90,
        status: 'جاري',
        priority: 'عالية',
        measures: ['تحليل العمليات الحالية', 'تطبيق أدوات أتمتة', 'قياس النتائج']
      },
      {
        id: 'GOAL-2024-003',
        title: 'إكمال شهادة تقنية',
        description: 'الحصول على شهادة AWS Solutions Architect',
        category: 'تقني',
        targetDate: '2024-08-31',
        progress: 45,
        status: 'جاري',
        priority: 'متوسطة',
        measures: ['دراسة المنهج', 'تطبيق عملي', 'اجتياز الامتحان']
      }
    ],
    reviews: [
      {
        id: 'REV-2024-Q1',
        period: 'الربع الأول 2024',
        reviewDate: '2024-01-15',
        reviewer: 'أحمد محمد - المدير التقني',
        overallScore: 4.2,
        strengths: [
          'مهارات تقنية ممتازة',
          'التزام بالمواعيد',
          'روح الفريق العالية',
          'قدرة على حل المشكلات'
        ],
        improvements: [
          'تطوير مهارات التواصل',
          'زيادة المبادرة في اقتراح الحلول',
          'المشاركة أكثر في الاجتماعات'
        ],
        feedback: 'أداء ممتاز بشكل عام، يُنصح بالتركيز على تطوير المهارات القيادية',
        nextReview: '2024-04-15'
      },
      {
        id: 'REV-2023-Q4',
        period: 'الربع الرابع 2023',
        reviewDate: '2023-10-15',
        reviewer: 'سارة أحمد - مدير المشاريع',
        overallScore: 4.0,
        strengths: [
          'الالتزام بالجودة',
          'سرعة في التنفيذ',
          'التعامل الإيجابي مع التحديات'
        ],
        improvements: [
          'تحسين مهارات العرض والتقديم',
          'المشاركة في المبادرات الجديدة'
        ],
        feedback: 'أداء جيد جداً مع إمكانيات واضحة للتطوير',
        nextReview: '2024-01-15'
      }
    ],
    achievements: [
      {
        id: 'ACH-2024-001',
        title: 'موظف الشهر',
        description: 'تم اختياره كموظف الشهر لشهر يناير 2024',
        date: '2024-01-31',
        category: 'تقدير',
        type: 'award',
        badge: 'gold',
        impact: 'عالي'
      },
      {
        id: 'ACH-2023-008',
        title: 'إكمال مشروع بنجاح',
        description: 'نجح في تسليم مشروع CRM في الموعد المحدد',
        date: '2023-12-15',
        category: 'مشروع',
        type: 'project',
        badge: 'silver',
        impact: 'متوسط'
      },
      {
        id: 'ACH-2023-006',
        title: 'شهادة تطوير مهني',
        description: 'حصل على شهادة في إدارة المشاريع الرشيقة',
        date: '2023-10-20',
        category: 'تدريب',
        type: 'certification',
        badge: 'bronze',
        impact: 'متوسط'
      }
    ],
    competencies: [
      {
        name: 'المهارات التقنية',
        score: 4.5,
        maxScore: 5,
        current: 4.5,
        target: 5,
        gap: 0.5,
        description: 'إتقان ممتاز للتقنيات المطلوبة',
        areas: ['JavaScript', 'React', 'Node.js', 'Database Design']
      },
      {
        name: 'مهارات التواصل',
        score: 4.0,
        maxScore: 5,
        current: 4.0,
        target: 4.5,
        gap: 0.5,
        description: 'قدرة جيدة على التواصل مع الفريق والعملاء',
        areas: ['الكتابة الفنية', 'العروض التقديمية', 'التفاوض']
      },
      {
        name: 'القيادة والإدارة',
        score: 3.8,
        maxScore: 5,
        current: 3.8,
        target: 4.5,
        gap: 0.7,
        description: 'إمكانيات قيادية واعدة تحتاج لمزيد من التطوير',
        areas: ['قيادة الفريق', 'اتخاذ القرارات', 'التخطيط الاستراتيجي']
      },
      {
        name: 'حل المشكلات',
        score: 4.3,
        maxScore: 5,
        current: 4.3,
        target: 4.8,
        gap: 0.5,
        description: 'قدرة ممتازة على تحليل وحل المشكلات المعقدة',
        areas: ['التحليل المنطقي', 'الإبداع في الحلول', 'التفكير النقدي']
      }
    ]
  };

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

  // Custody handlers
  const handleViewCustodyDetails = (item: any) => {
    setSelectedCustodyDetails(item);
  };

  const handleReportIssue = (itemId: string) => {
    toast({
      title: 'بلاغ عطل',
      description: `تم تسجيل بلاغ العطل للعهدة رقم ${itemId}`,
    });
  };

  const handleRequestMaintenance = (itemId: string) => {
    toast({
      title: 'طلب صيانة',
      description: `تم تسجيل طلب الصيانة للعهدة رقم ${itemId}`,
    });
  };

  const handleReturnAsset = (itemId: string) => {
    toast({
      title: 'إرجاع العهدة',
      description: `تم تسجيل طلب إرجاع العهدة رقم ${itemId}`,
    });
  };

  const handleRequestReplacement = (itemId: string) => {
    toast({
      title: 'طلب استبدال',
      description: `تم تسجيل طلب استبدال العهدة رقم ${itemId}`,
    });
  };

  // Career Path handlers
  const handleViewCareerDetails = (position: any) => {
    setSelectedCareerDetails(position);
  };

  const handleCareerPlanning = () => {
    toast({
      title: 'التخطيط المهني',
      description: 'عرض خطة التطوير المهني والمسار الوظيفي',
    });
  };

  const handleSkillGapAnalysis = () => {
    toast({
      title: 'تحليل الفجوات',
      description: 'تحليل المهارات المطلوبة للمنصب التالي',
    });
  };

  // Payroll handlers
  const handleViewPayrollDetails = (payroll: any) => {
    setSelectedPayrollDetails(payroll);
  };

  const handleDownloadPayslip = (payrollId: string) => {
    toast({
      title: 'تحميل كشف الراتب',
      description: `تم تحميل كشف الراتب رقم ${payrollId} بنجاح`,
    });
  };

  const handleTaxCalculator = () => {
    toast({
      title: 'حاسبة الضرائب',
      description: 'عرض تفاصيل حساب الضرائب والاستقطاعات',
    });
  };

  const handleBenefitsOverview = () => {
    toast({
      title: 'ملخص المزايا',
      description: 'عرض تفاصيل جميع المزايا والبدلات',
    });
  };

  const handleSalaryAdvance = () => {
    toast({
      title: 'طلب سلفة راتب',
      description: 'تم تسجيل طلب السلفة وسيتم مراجعته',
    });
  };

  // Performance handlers
  const handleViewPerformanceDetails = (performance: any) => {
    setSelectedPerformanceDetails(performance);
  };

  const handleRequestFeedback = () => {
    toast({
      title: 'طلب تقييم',
      description: 'تم إرسال طلب للحصول على تقييم إضافي من المدير',
    });
  };

  const handleSetGoal = () => {
    toast({
      title: 'وضع هدف جديد',
      description: 'تم إضافة هدف جديد لخطة التطوير الشخصية',
    });
  };

  const handlePerformanceReport = () => {
    toast({
      title: 'تقرير الأداء',
      description: 'تم تحميل تقرير الأداء الشامل',
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

  // بيانات العهدة المحسنة
  const enhancedCustody = [
    {
      id: 'AST-2024-001',
      item: 'لابتوب Dell Latitude 5520',
      category: 'تقنية',
      serialNumber: 'DL123456789',
      assignDate: '2023-01-15',
      returnDate: null,
      condition: 'جيد',
      status: 'نشط',
      location: 'المكتب الرئيسي - الدور الثالث',
      value: 4500,
      warrantyExpiry: '2025-01-15',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-07-10',
      responsible: 'محمد أحمد - مدير تقنية المعلومات',
      notes: 'يعمل بشكل ممتاز، تم تحديث نظام التشغيل مؤخراً',
      maintenanceHistory: [
        { date: '2024-01-10', type: 'صيانة دورية', description: 'تنظيف وتحديث البرامج' },
        { date: '2023-08-15', type: 'إصلاح', description: 'استبدال الشاحن' }
      ]
    },
    {
      id: 'AST-2024-002',
      item: 'هاتف iPhone 14 Pro',
      category: 'اتصالات',
      serialNumber: 'IP789012345',
      assignDate: '2023-06-01',
      returnDate: null,
      condition: 'ممتاز',
      status: 'نشط',
      location: 'متنقل',
      value: 3200,
      warrantyExpiry: '2024-06-01',
      lastMaintenance: null,
      nextMaintenance: null,
      responsible: 'سارة محمد - مدير الموارد البشرية',
      notes: 'هاتف شركة للاستخدام الرسمي والشخصي',
      maintenanceHistory: []
    },
    {
      id: 'AST-2024-003',
      item: 'مكتب تنفيذي + كرسي',
      category: 'أثاث',
      serialNumber: 'OFF001-DESK',
      assignDate: '2023-01-15',
      returnDate: null,
      condition: 'جيد',
      status: 'نشط',
      location: 'المكتب الرئيسي - غرفة 305',
      value: 2800,
      warrantyExpiry: '2028-01-15',
      lastMaintenance: '2023-12-01',
      nextMaintenance: '2024-06-01',
      responsible: 'أحمد علي - مدير الخدمات العامة',
      notes: 'مكتب خشبي مع كرسي جلدي، بحالة جيدة',
      maintenanceHistory: [
        { date: '2023-12-01', type: 'صيانة دورية', description: 'تنظيف وتلميع' }
      ]
    },
    {
      id: 'AST-2024-004',
      item: 'شاشة Samsung 27 بوصة',
      category: 'تقنية',
      serialNumber: 'SM270456789',
      assignDate: '2023-03-20',
      returnDate: null,
      condition: 'ممتاز',
      status: 'نشط',
      location: 'المكتب الرئيسي - الدور الثالث',
      value: 800,
      warrantyExpiry: '2026-03-20',
      lastMaintenance: null,
      nextMaintenance: '2024-09-20',
      responsible: 'محمد أحمد - مدير تقنية المعلومات',
      notes: 'شاشة إضافية لتحسين الإنتاجية',
      maintenanceHistory: []
    },
    {
      id: 'AST-2024-005',
      item: 'طابعة HP LaserJet',
      category: 'تقنية',
      serialNumber: 'HP789123456',
      assignDate: '2023-02-10',
      returnDate: '2024-01-15',
      condition: 'متوسط',
      status: 'مُرجع',
      location: 'المستودع',
      value: 1200,
      warrantyExpiry: '2024-02-10',
      lastMaintenance: '2023-11-20',
      nextMaintenance: null,
      responsible: 'خالد يوسف - فني الصيانة',
      notes: 'تم إرجاعها بسبب انتهاء الحاجة',
      maintenanceHistory: [
        { date: '2023-11-20', type: 'إصلاح', description: 'استبدال خرطوشة الحبر' },
        { date: '2023-08-10', type: 'صيانة دورية', description: 'تنظيف وفحص' }
      ]
    }
  ];

  // المسار الوظيفي
  const careerPath = [
    { position: 'مطور برمجيات مبتدئ', startDate: '2021-01-15', endDate: '2022-06-01', department: 'تقنية المعلومات' },
    { position: 'مطور برمجيات', startDate: '2022-06-01', endDate: '2023-06-01', department: 'تقنية المعلومات' },
    { position: 'مطور برمجيات أول', startDate: '2023-06-01', endDate: 'الآن', department: 'تقنية المعلومات' }
  ];

  // بيانات المسار الوظيفي المحسنة
  const enhancedCareerPath = [
    {
      id: 'CP-001',
      position: 'مطور برمجيات مبتدئ',
      level: 'المستوى الأول',
      department: 'تقنية المعلومات',
      startDate: '2021-01-15',
      endDate: '2022-06-01',
      duration: '1.4 سنة',
      salary: 8000,
      status: 'مكتمل',
      achievements: [
        'إكمال برنامج التدريب التأسيسي',
        'تطوير 3 مشاريع صغيرة',
        'الحصول على شهادة JavaScript'
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'React أساسيات'],
      manager: 'أحمد محمد - المدير التقني',
      promotion: {
        reason: 'أداء ممتاز وإتقان المهارات الأساسية',
        evaluation: 4.5
      }
    },
    {
      id: 'CP-002',
      position: 'مطور برمجيات',
      level: 'المستوى الثاني',
      department: 'تقنية المعلومات',
      startDate: '2022-06-01',
      endDate: '2023-06-01',
      duration: '1 سنة',
      salary: 12000,
      status: 'مكتمل',
      achievements: [
        'قيادة فريق من 2 مطورين',
        'تطوير نظام إدارة المخزون',
        'تحسين أداء التطبيقات بنسبة 40%',
        'الحصول على شهادة AWS Cloud Practitioner'
      ],
      skills: ['React متقدم', 'Node.js', 'MongoDB', 'AWS', 'Git'],
      manager: 'سارة أحمد - مدير المشاريع',
      promotion: {
        reason: 'قيادة فريق ناجحة وإنجاز مشاريع معقدة',
        evaluation: 4.7
      }
    },
    {
      id: 'CP-003',
      position: 'مطور برمجيات أول',
      level: 'المستوى الثالث',
      department: 'تقنية المعلومات',
      startDate: '2023-06-01',
      endDate: 'الآن',
      duration: '8 أشهر',
      salary: 18000,
      status: 'حالي',
      achievements: [
        'تصميم هيكلة النظام الجديد',
        'تدريب 5 مطورين جدد',
        'تطوير إطار عمل داخلي للشركة',
        'الحصول على شهادة Kubernetes'
      ],
      skills: ['System Design', 'Microservices', 'Docker', 'Kubernetes', 'Leadership'],
      manager: 'محمد علي - مدير التطوير',
      nextTarget: {
        position: 'مدير تطوير البرمجيات',
        timeline: '12-18 شهر',
        requirements: ['إدارة فريق أكبر', 'خبرة في التخطيط الاستراتيجي', 'مهارات المالية التقنية']
      }
    }
  ];

  // إحصائيات المسار الوظيفي
  const careerStats = {
    totalYears: 3.2,
    promotions: 2,
    averageStayPerRole: 1.1,
    salaryGrowth: 125, // بالنسبة المئوية
    skillsAcquired: 15,
    certificationsEarned: 3,
    projectsLed: 8,
    teamMembersManaged: 7
  };

  // بيانات الراتب المحسنة
  const enhancedPayrollData = {
    currentSalary: {
      basicSalary: 18000,
      housingAllowance: 7200,
      transportAllowance: 1500,
      otherAllowances: 2000,
      totalGross: 28700,
      socialInsurance: 2296, // 8% من الراتب الأساسي
      incomeTax: 2100,
      otherDeductions: 500,
      totalDeductions: 4896,
      netSalary: 23804
    },
    payrollHistory: [
      {
        id: 'PAY-2024-01',
        month: 'يناير 2024',
        basicSalary: 18000,
        allowances: 10700,
        grossSalary: 28700,
        deductions: 4896,
        netSalary: 23804,
        payDate: '2024-01-31',
        status: 'مدفوع',
        bonuses: 0,
        overtime: 0
      },
      {
        id: 'PAY-2023-12',
        month: 'ديسمبر 2023',
        basicSalary: 18000,
        allowances: 10700,
        grossSalary: 28700,
        deductions: 4896,
        netSalary: 23804,
        payDate: '2023-12-31',
        status: 'مدفوع',
        bonuses: 2000,
        overtime: 600
      },
      {
        id: 'PAY-2023-11',
        month: 'نوفمبر 2023',
        basicSalary: 18000,
        allowances: 10700,
        grossSalary: 28700,
        deductions: 4896,
        netSalary: 23804,
        payDate: '2023-11-30',
        status: 'مدفوع',
        bonuses: 0,
        overtime: 300
      },
      {
        id: 'PAY-2023-10',
        month: 'أكتوبر 2023',
        basicSalary: 18000,
        allowances: 10700,
        grossSalary: 28700,
        deductions: 4896,
        netSalary: 23804,
        payDate: '2023-10-31',
        status: 'مدفوع',
        bonuses: 1500,
        overtime: 450
      },
      {
        id: 'PAY-2023-09',
        month: 'سبتمبر 2023',
        basicSalary: 18000,
        allowances: 10700,
        grossSalary: 28700,
        deductions: 4896,
        netSalary: 23804,
        payDate: '2023-09-30',
        status: 'مدفوع',
        bonuses: 0,
        overtime: 0
      },
      {
        id: 'PAY-2023-08',
        month: 'أغسطس 2023',
        basicSalary: 18000,
        allowances: 10700,
        grossSalary: 28700,
        deductions: 4896,
        netSalary: 23804,
        payDate: '2023-08-31',
        status: 'مدفوع',
        bonuses: 0,
        overtime: 150
      }
    ],
    benefits: [
      { name: 'التأمين الطبي', value: 2400, type: 'سنوي', status: 'نشط' },
      { name: 'تأمين الحياة', value: 1200, type: 'سنوي', status: 'نشط' },
      { name: 'صندوق الادخار', value: 1800, type: 'سنوي', status: 'نشط' },
      { name: 'بدل الوجبات', value: 200, type: 'شهري', status: 'نشط' },
      { name: 'بدل الاتصالات', value: 300, type: 'شهري', status: 'نشط' }
    ],
    taxInfo: {
      annualIncome: 344400,
      taxableIncome: 319400,
      annualTax: 25200,
      monthlyTax: 2100,
      taxBracket: '20%',
      exemptions: 25000
    },
    performance: {
      lastRaise: '2023-06-01',
      raisePercentage: 15,
      nextReviewDate: '2024-06-01',
      performanceRating: 4.2
    }
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'جاري': return 'bg-blue-100 text-blue-800';
      case 'معلق': return 'bg-yellow-100 text-yellow-800';
      case 'ملغي': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  // Move this definition earlier in the component

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-arabic" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" 
                />
              </Link>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <User className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  بوابة الموظف
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  نظام الخدمة الذاتية للموظفين
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    حالة النظام
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      متصل
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                {/* Actions Row */}
                <div className="flex items-center justify-between space-x-2">
                  {/* Chat Buttons */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setChatType('manager')}
                        className="group relative bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105"
                      >
                        <MessageSquare className="h-4 w-4 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                        <span className="text-xs text-white group-hover:text-[#008C6A] transition-colors duration-300">مدير</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-gray-900/95 backdrop-blur-xl border border-[#008C6A]/30">
                      <DialogHeader>
                        <DialogTitle className="text-white">الدردشة مع المدير المباشر</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="h-64 overflow-y-auto border border-[#008C6A]/20 rounded p-2 space-y-2 bg-black/20">
                          {chatMessages.length === 0 ? (
                            <p className="text-gray-400 text-center">لا توجد رسائل</p>
                          ) : (
                            chatMessages.map((msg) => (
                              <div key={msg.id} className={`p-2 rounded ${msg.sender === 'أنت' ? 'bg-[#008C6A] text-white mr-auto max-w-[80%]' : 'bg-gray-700 text-white ml-auto max-w-[80%]'}`}>
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
                            className="bg-black/20 border border-[#008C6A]/30 text-white"
                          />
                          <Button onClick={sendMessage} size="sm" className="bg-[#008C6A] hover:bg-[#00694F]">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* HR Chat */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setChatType('hr')}
                        className="group relative bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105"
                      >
                        <Users className="h-4 w-4 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                        <span className="text-xs text-white group-hover:text-[#008C6A] transition-colors duration-300">HR</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-gray-900/95 backdrop-blur-xl border border-[#008C6A]/30">
                      <DialogHeader>
                        <DialogTitle className="text-white">الدردشة مع الموارد البشرية</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="h-64 overflow-y-auto border border-[#008C6A]/20 rounded p-2 space-y-2 bg-black/20">
                          {chatMessages.length === 0 ? (
                            <p className="text-gray-400 text-center">لا توجد رسائل</p>
                          ) : (
                            chatMessages.map((msg) => (
                              <div key={msg.id} className={`p-2 rounded ${msg.sender === 'أنت' ? 'bg-[#008C6A] text-white mr-auto max-w-[80%]' : 'bg-gray-700 text-white ml-auto max-w-[80%]'}`}>
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
                            className="bg-black/20 border border-[#008C6A]/30 text-white"
                          />
                          <Button onClick={sendMessage} size="sm" className="bg-[#008C6A] hover:bg-[#00694F]">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Settings and Logout */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group relative bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105"
                  >
                    <Bell className="h-4 w-4 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="group relative bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105"
                  >
                    <Settings className="h-4 w-4 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="group relative bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-3 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105"
                  >
                    <LogOut className="h-4 w-4 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                    <span className="text-xs text-white group-hover:text-[#008C6A] transition-colors duration-300">خروج</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-400">
              <Link to="/" className="hover:text-[#008C6A] transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-white">بوابة الموظف</span>
            </div>
          </div>
        </div>
        
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>

        {/* Enhanced Hero Section - Employee Info */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent blur-sm"></div>
          
          <Card className="max-w-6xl mx-auto bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20 relative overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
            </div>
            
            <CardContent className="p-0 overflow-hidden relative bg-gray-900/40">
              {/* خلفية متدرجة */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
              
              {/* المحتوى الرئيسي المحسن */}
              <div className="relative p-6">{/* ... keep existing code (all employee info content) */}
              {/* Header Top Section - Quick Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline" onClick={() => navigate('/')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    العودة للرئيسية
                  </Button>
                  <div className="h-8 w-px bg-border"></div>
                  <Badge variant="secondary" className="text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date().toLocaleDateString('ar-SA')}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => setIsChatOpen(true)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    دردشة سريعة
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast({ title: 'الإشعارات', description: 'لا توجد إشعارات جديدة' })}>
                    <Bell className="h-4 w-4" />
                    <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">3</Badge>
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Main Header Content */}
              <div className="flex items-start gap-8">
                {/* Enhanced Employee Avatar Section */}
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition duration-500"></div>
                  
                  <div className="relative">
                    <div className="relative">
                      <Avatar className="h-36 w-36 border-4 border-background shadow-2xl hover:shadow-primary/20 transition-all duration-500 group-hover:scale-105">
                        <AvatarImage 
                          src={employeeAvatarImage} 
                          alt={employeeDisplayData?.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold">
                          {employeeDisplayData?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      {/* Profile completion ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-conic from-primary via-primary/50 to-primary opacity-20"></div>
                    </div>
                    
                    {/* Status badge with animation */}
                    <div className="absolute -bottom-1 -right-1">
                      <div className="relative">
                        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg border-2 border-background px-3 py-1.5 rounded-full">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold">{employeeDisplayData?.status}</span>
                          </div>
                        </Badge>
                        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
                      </div>
                    </div>
                    
                    {/* Edit profile button */}
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="absolute -top-2 -left-2 h-8 w-8 p-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                      onClick={() => toast({ title: 'تعديل الملف الشخصي', description: 'سيتم توجيهك لصفحة تعديل الملف' })}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Employee Information Section */}
                <div className="flex-1 space-y-6">
                  {/* Name and Position */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {employeeDisplayData.name}
                      </h1>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                          <Star className="h-3 w-3 mr-1" />
                          موظف متميز
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Briefcase className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xl font-semibold text-primary">{employeeDisplayData.position}</p>
                          <p className="text-sm text-muted-foreground">{employeeDisplayData.department}</p>
                        </div>
                      </div>
                      
                      <div className="h-8 w-px bg-border"></div>
                      
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <Building className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{employeeDisplayData.jobCategory}</p>
                          <p className="text-xs text-muted-foreground">المستوى الخامس</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Stats - Professional Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-gray-900/60 backdrop-blur-xl shadow-lg border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-300">مدة الخدمة</p>
                            <p className="text-2xl font-bold text-white">3 سنوات</p>
                          </div>
                          <div className="w-12 h-12 rounded-lg bg-[#008C6A]/20 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-[#008C6A]" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-900/60 backdrop-blur-xl shadow-lg border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-300">نسبة الحضور</p>
                            <p className="text-2xl font-bold text-white">98%</p>
                          </div>
                          <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-900/60 backdrop-blur-xl shadow-lg border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-300">التقييم العام</p>
                            <p className="text-2xl font-bold text-white">4.8/5</p>
                          </div>
                          <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <Award className="w-6 h-6 text-purple-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-900/60 backdrop-blur-xl shadow-lg border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-300">المهام المكتملة</p>
                            <p className="text-2xl font-bold text-white">24/30</p>
                          </div>
                          <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                            <Target className="w-6 h-6 text-orange-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Employee Details - Professional Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge 
                      variant="outline" 
                      className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 transition-all duration-300 cursor-pointer px-4 py-2"
                      onClick={() => toast({ title: 'رقم الموظف', description: `رقم الموظف: ${employeeDisplayData.employeeNumber}` })}
                    >
                      <UserCheck className="h-4 w-4 text-[#008C6A] ml-2" />
                      #{employeeDisplayData.employeeNumber}
                    </Badge>
                    
                    <Badge 
                      variant="outline" 
                      className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 transition-all duration-300 cursor-pointer px-4 py-2"
                      onClick={() => toast({ title: 'الهوية الوطنية', description: `رقم الهوية: ${employeeDisplayData.nationalId}` })}
                    >
                      <FileCheck className="h-4 w-4 text-blue-400 ml-2" />
                      {employeeDisplayData.nationalId}
                    </Badge>
                    
                    <Badge 
                      variant="outline" 
                      className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 transition-all duration-300 cursor-pointer px-4 py-2"
                      onClick={() => toast({ title: 'التأمين الطبي', description: `رقم التأمين: ${employeeDisplayData.insuranceNumber}` })}
                    >
                      <Shield className="h-4 w-4 text-green-400 ml-2" />
                      {employeeDisplayData.insuranceNumber}
                    </Badge>
                  </div>
                </div>

                {/* Enhanced Contact Information Panel */}
                <div className="min-w-80">
                  <div className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 rounded-2xl p-6 space-y-5 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white flex items-center gap-2">
                        <Target className="h-5 w-5 text-[#008C6A]" />
                        معلومات الاتصال
                      </h3>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-[#008C6A]/20 transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-gray-300" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 group hover:bg-[#008C6A]/10 rounded-xl p-3 transition-all duration-300 cursor-pointer border border-transparent hover:border-[#008C6A]/30 bg-black/20">
                        <div className="p-2.5 bg-[#008C6A]/20 rounded-xl group-hover:bg-[#008C6A]/30 transition-colors group-hover:scale-110">
                          <Mail className="h-4 w-4 text-[#008C6A]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 font-medium">البريد الإلكتروني</p>
                          <p className="text-sm font-semibold truncate text-white">{employeeDisplayData.email}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-[#008C6A]/20">
                          <Send className="h-3 w-3 text-[#008C6A]" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 group hover:bg-green-500/10 rounded-xl p-3 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-500/30 bg-black/20">
                        <div className="p-2.5 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors group-hover:scale-110">
                          <Phone className="h-4 w-4 text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 font-medium">رقم الهاتف</p>
                          <p className="text-sm font-semibold text-white" dir="ltr">{employeeDisplayData.phone}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-green-500/20">
                          <Phone className="h-3 w-3 text-green-400" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 group hover:bg-blue-500/10 rounded-xl p-3 transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-500/30 bg-black/20">
                        <div className="p-2.5 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors group-hover:scale-110">
                          <MapPin className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 font-medium">العنوان</p>
                          <p className="text-sm font-semibold truncate text-white">{employeeDisplayData.address}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-blue-500/20">
                          <MapPin className="h-3 w-3 text-blue-400" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="pt-4 border-t border-[#008C6A]/20">
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs bg-gray-900/60 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50 transition-all duration-300" 
                          onClick={handleQuickLeaveRequest}
                        >
                          <Calendar className="h-3 w-3 ml-1 text-[#008C6A]" />
                          طلب إجازة
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs bg-gray-900/60 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50 transition-all duration-300" 
                          onClick={handleQuickSalaryCertificate}
                        >
                          <FileText className="h-3 w-3 ml-1 text-[#008C6A]" />
                          شهادة راتب
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Enhanced Dashboard Content with EarnWithBoad Design */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 rounded-2xl p-2 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-500 overflow-hidden">
            <TabsList className="flex w-full h-auto p-1 bg-transparent gap-1 overflow-x-auto scrollbar-hide">
              <TabsTrigger value="dashboard" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <User className="w-4 h-4 mb-1" />
                لوحة التحكم
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <CheckSquare className="w-4 h-4 mb-1" />
                المهام
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <GraduationCap className="w-4 h-4 mb-1" />
                الدورات
              </TabsTrigger>
              <TabsTrigger value="attendance" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <CalendarDays className="w-4 h-4 mb-1" />
                الدوام الشهري
              </TabsTrigger>
              <TabsTrigger value="gps-attendance" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <Satellite className="w-4 h-4 mb-1" />
                حضور GPS
              </TabsTrigger>
              <TabsTrigger value="insurance" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <Shield className="w-4 h-4 mb-1" />
                التأمين
              </TabsTrigger>
              <TabsTrigger value="job-category" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <Briefcase className="w-4 h-4 mb-1" />
                الفئة الوظيفية
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <FileText className="w-4 h-4 mb-1" />
                طلباتي
              </TabsTrigger>
              <TabsTrigger value="custody" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <Package className="w-4 h-4 mb-1" />
                العهدة
              </TabsTrigger>
              <TabsTrigger value="career-path" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <TrendingUp className="w-4 h-4 mb-1" />
                المسار الوظيفي
              </TabsTrigger>
              <TabsTrigger value="payroll" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <CreditCard className="w-4 h-4 mb-1" />
                الراتب
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <Award className="w-4 h-4 mb-1" />
                الأداء
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex-shrink-0 flex flex-col items-center justify-center text-xs py-2 px-3 min-w-[80px] data-[state=active]:bg-[#008C6A] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-[#008C6A]/20 whitespace-nowrap text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg">
                <FileText className="w-4 h-4 mb-1" />
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
                    <Card key={task.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-6 bg-gray-900/40 relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        
                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">{task.title}</h3>
                              <Badge variant="outline" className={`${getPriorityColor(task.priority)} bg-gray-900/60 border-[#008C6A]/30 text-white px-3 py-1`}>
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-gray-300 mb-3 leading-relaxed">{task.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-[#008C6A]/20">
                                <CalendarIcon className="h-4 w-4 text-[#008C6A]" />
                                <span className="font-medium text-gray-300">تاريخ الاستحقاق:</span>
                                <span className="text-white">{task.dueDate}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-green-500/20">
                                <UserIcon className="h-4 w-4 text-green-400" />
                                <span className="font-medium text-gray-300">المكلف من:</span>
                                <span className="text-white">{task.assignedBy}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-purple-500/20">
                                <Timer className="h-4 w-4 text-purple-400" />
                                <span className="font-medium text-gray-300">الساعات:</span>
                                <span className="text-white">{task.actualHours}/{task.estimatedHours}ساعة</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <Badge variant="outline" className={`${getTaskStatusColor(task.status)} bg-gray-900/60 border-[#008C6A]/30 text-white px-3 py-1 mb-2`}>
                              {task.status}
                            </Badge>
                            <div className="text-xs text-gray-400">{task.category}</div>
                          </div>
                        </div>

                        {/* شريط التقدم */}
                        <div className="mb-4 relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300">نسبة الإنجاز</span>
                            <span className="text-sm font-bold text-[#008C6A]">{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-[#008C6A] [&>div]:to-[#00694F]" />
                        </div>

                        {/* المرفقات إن وجدت */}
                        {task.attachments.length > 0 && (
                          <div className="mb-4 relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                              <FileIcon className="h-4 w-4 text-orange-400" />
                              <span className="text-sm font-medium text-gray-300">المرفقات ({task.attachments.length})</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {task.attachments.map((file, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-gray-900/60 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 cursor-pointer transition-all duration-300">
                                  📎 {file}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* أزرار التفاعل */}
                        <div className="flex gap-2 flex-wrap relative z-10">
                          <Button 
                            size="sm" 
                            onClick={() => handleViewTask(task)}
                            className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#008C6A]/20"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {task.status !== 'مكتمل' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleStartTask(task)}
                              className="bg-gray-900/60 border-green-400/30 text-white hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
                            >
                              <PlayCircle className="h-4 w-4 ml-2 text-green-400" />
                              بدء العمل
                            </Button>
                          )}
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-gray-900/60 border-blue-400/30 text-white hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                          >
                            <MessageSquareText className="h-4 w-4 ml-2 text-blue-400" />
                            التعليقات
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-gray-900/60 border-orange-400/30 text-white hover:bg-orange-500/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105"
                          >
                            <Upload className="h-4 w-4 ml-2 text-orange-400" />
                            رفع ملف
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب الدورات التدريبية */}
          <TabsContent value="courses" className="space-y-6">
            {/* Enhanced Training Courses with EarnWithBoad Design */}
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-center flex items-center justify-center gap-2 relative z-10">
                  <GraduationCap className="h-6 w-6 text-white" />
                  الدورات التدريبية
                </CardTitle>
                <CardDescription className="text-center text-gray-200 relative z-10">دوراتك التدريبية ومعدل التقدم</CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-gray-900/40">
                <div className="space-y-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-6 bg-gray-900/40 relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        
                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                              <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm p-2 rounded-lg border border-[#008C6A]/20">
                                <Clock className="h-4 w-4 text-[#008C6A]" />
                                <span>المدة: {course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm p-2 rounded-lg border border-green-500/20">
                                <Calendar className="h-4 w-4 text-green-400" />
                                <span>البداية: {course.startDate}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className={`${getCourseStatusColor(course.status)} bg-gray-900/60 border-[#008C6A]/30 text-white px-3 py-1`}>
                            {course.status}
                          </Badge>
                        </div>

                        {/* Enhanced Progress Bar */}
                        <div className="mb-4 relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300">نسبة الإنجاز</span>
                            <span className="text-sm font-bold text-[#008C6A]">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-[#008C6A] [&>div]:to-[#00694F]" />
                        </div>

                        {/* Enhanced Interactive Buttons */}
                        <div className="flex gap-2 flex-wrap relative z-10">
                          <Button 
                            size="sm" 
                            onClick={() => handleEnterCourse(course)}
                            className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#008C6A]/20"
                          >
                            <BookOpen className="h-4 w-4 ml-2" />
                            دخول الدورة
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleWatchCourse(course)}
                            className="bg-gray-900/60 border-green-400/30 text-white hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
                          >
                            <Eye className="h-4 w-4 ml-2 text-green-400" />
                            مشاهدة المحتوى
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleJoinClassroom(course)}
                            className="bg-gray-900/60 border-blue-400/30 text-white hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                          >
                            <Users className="h-4 w-4 ml-2 text-blue-400" />
                            القاعة التفاعلية
                          </Button>
                          
                          {course.progress > 0 && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="bg-gray-900/60 border-orange-400/30 text-white hover:bg-orange-500/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105"
                            >
                              <Download className="h-4 w-4 ml-2 text-orange-400" />
                              تحميل الشهادة
                            </Button>
                          )}
                        </div>

                        {/* Enhanced Active Course Info */}
                        {course.status === 'جاري' && (
                          <div className="mt-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/30 relative z-10">
                            <div className="flex items-center gap-2 text-[#008C6A]">
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

          {/* Enhanced Monthly Attendance Tab with EarnWithBoad Design */}
          <TabsContent value="attendance" className="space-y-6">
            {/* Enhanced Attendance Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300">
                    <CheckCircleIcon className="h-8 w-8 text-green-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{getAttendanceStats().present}</div>
                  <div className="text-sm text-gray-300">أيام الحضور</div>
                </CardContent>
              </Card>

              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-yellow-500/30 transition-all duration-300">
                    <ClockIcon className="h-8 w-8 text-yellow-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{getAttendanceStats().late}</div>
                  <div className="text-sm text-gray-300">أيام التأخير</div>
                </CardContent>
              </Card>

              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-red-500/30 transition-all duration-300">
                    <XCircle className="h-8 w-8 text-red-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{getAttendanceStats().absent}</div>
                  <div className="text-sm text-gray-300">أيام الغياب</div>
                </CardContent>
              </Card>

              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300">
                    <CalendarDays2 className="h-8 w-8 text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{getAttendanceStats().total}</div>
                  <div className="text-sm text-gray-300">إجمالي الأيام</div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Monthly Attendance Records */}
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarDays className="h-6 w-6" />
                      سجل الدوام الشهري
                    </CardTitle>
                    <CardDescription className="text-gray-200">تفاصيل دوامك اليومي مع إمكانية التفاعل والتصحيح</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
                      <SelectTrigger className="w-32 bg-black/20 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأيام</SelectItem>
                        <SelectItem value="present">حاضر</SelectItem>
                        <SelectItem value="late">متأخر</SelectItem>
                        <SelectItem value="absent">غائب</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={handleExportAttendance} size="sm" className="bg-black/20 border-white/20 text-white hover:bg-white/20">
                      <DownloadIcon className="h-4 w-4 ml-2" />
                      تصدير
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-gray-900/40">
                <div className="space-y-4">
                  {filteredAttendanceData.map((record, index) => (
                    <Card key={index} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-6 bg-gray-900/40 relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-6">
                            {/* تاريخ اليوم */}
                            <div className="text-center min-w-[80px] bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-[#008C6A]/20">
                              <div className="text-lg font-bold text-[#008C6A]">{record.date.split('/')[0]}</div>
                              <div className="text-xs text-gray-400">{record.date.split('/').slice(1).join('/')}</div>
                            </div>

                            {/* أوقات الدخول والخروج */}
                            <div className="flex gap-8">
                              <div className="text-center bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-green-500/20">
                                <div className="text-xs font-medium text-gray-300 mb-1">وقت الدخول</div>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${record.checkIn !== '--:--' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                  <span className={`font-mono text-sm ${record.checkIn !== '--:--' ? 'text-green-400' : 'text-red-400'}`}>
                                    {record.checkIn}
                                  </span>
                                </div>
                              </div>

                              <div className="text-center bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-blue-500/20">
                                <div className="text-xs font-medium text-gray-300 mb-1">وقت الخروج</div>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${record.checkOut !== '--:--' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                                  <span className={`font-mono text-sm ${record.checkOut !== '--:--' ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {record.checkOut}
                                  </span>
                                </div>
                              </div>

                              <div className="text-center bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-purple-500/20">
                                <div className="text-xs font-medium text-gray-300 mb-1">إجمالي الساعات</div>
                                <div className="flex items-center gap-2">
                                  <Timer className="h-3 w-3 text-purple-400" />
                                  <span className="font-mono text-sm text-purple-400">{record.hours}</span>
                                </div>
                              </div>
                            </div>

                            {/* حالة اليوم */}
                            <div className="text-center">
                              <Badge variant="outline" className={`${getAttendanceStatusColor(record.status)} bg-gray-900/60 border-[#008C6A]/30 px-3 py-1`}>
                                <div className="flex items-center gap-1 text-white">
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
                          <div className="flex gap-2 relative z-10">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewAttendanceDetails(record)}
                              className="bg-gray-900/60 border-blue-400/30 text-white hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                            >
                              <Eye className="h-4 w-4 text-blue-400" />
                            </Button>
                            
                            {(record.status === 'متأخر' || record.status === 'غائب') && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRequestCorrection(record.date)}
                                className="bg-gray-900/60 border-orange-400/30 text-white hover:bg-orange-500/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105"
                              >
                                <AlertCircle className="h-4 w-4 text-orange-400" />
                              </Button>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="bg-gray-900/60 border-gray-400/30 text-white hover:bg-gray-500/20 hover:border-gray-400/50 transition-all duration-300 hover:scale-105"
                            >
                              <MoreHorizontal className="h-4 w-4 text-gray-400" />
                            </Button>
                          </div>
                        </div>

                        {/* معلومات إضافية للحالات الخاصة */}
                        {record.status === 'متأخر' && (
                          <div className="mt-4 p-3 bg-black/20 backdrop-blur-sm rounded-lg border border-yellow-400/30 animate-fade-in relative z-10">
                            <div className="flex items-center gap-2 text-yellow-400 text-sm">
                              <AlertCircle className="h-4 w-4" />
                              <span>تأخير عن الموعد المحدد - يمكنك طلب تصحيح الحضور</span>
                            </div>
                          </div>
                        )}

                        {record.status === 'غائب' && (
                          <div className="mt-4 p-3 bg-black/20 backdrop-blur-sm rounded-lg border border-red-400/30 animate-fade-in relative z-10">
                            <div className="flex items-center gap-2 text-red-400 text-sm">
                              <XCircle className="h-4 w-4" />
                              <span>غياب غير مبرر - تواصل مع الموارد البشرية</span>
                            </div>
                          </div>
                        )}

                        {record.status === 'حاضر' && record.hours !== '0:00' && parseFloat(record.hours.replace(' ساعة', '')) > 8 && (
                          <div className="mt-4 p-3 bg-black/20 backdrop-blur-sm rounded-lg border border-green-400/30 animate-fade-in relative z-10">
                            <div className="flex items-center gap-2 text-green-400 text-sm">
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
                  <div className="text-center py-8 text-gray-400">
                    <CalendarDays className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>لا توجد سجلات دوام للفلتر المحدد</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Monthly Performance Summary */}
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-center flex items-center justify-center gap-2 relative z-10">
                  <BarChart3 className="h-6 w-6 text-white" />
                  ملخص الأداء الشهري
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gray-900/40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-green-500/20">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {getAttendanceStats().total > 0 ? ((getAttendanceStats().present / getAttendanceStats().total) * 100).toFixed(1) : '0'}%
                    </div>
                    <p className="text-sm text-gray-300">معدل الحضور</p>
                  </div>
                  
                  <div className="text-center bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {attendanceData.reduce((acc, record) => {
                        const hours = parseFloat(record.hours.replace(' ساعة', '')) || 0;
                        return acc + hours;
                      }, 0).toFixed(1)}
                    </div>
                    <p className="text-sm text-gray-300">إجمالي ساعات العمل</p>
                  </div>
                  
                  <div className="text-center bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {Math.max(0, attendanceData.reduce((acc, record) => {
                        const hours = parseFloat(record.hours.replace(' ساعة', '')) || 0;
                        return acc + Math.max(0, hours - 8);
                      }, 0)).toFixed(1)}
                    </div>
                    <p className="text-sm text-gray-300">الساعات الإضافية</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب التأمين */}
          <TabsContent value="insurance" className="space-y-6">
            {/* إحصائيات التأمين */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-green-500/30 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-green-400">مطالبات مقبولة</p>
                      <p className="text-2xl font-bold text-white">
                        {insuranceData.claims.filter(c => c.status === 'تم الموافقة').length}
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-yellow-500/30 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-yellow-400">قيد المراجعة</p>
                      <p className="text-2xl font-bold text-white">
                        {insuranceData.claims.filter(c => c.status === 'قيد المراجعة').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-red-500/30 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-red-400">مطالبات مرفوضة</p>
                      <p className="text-2xl font-bold text-white">
                        {insuranceData.claims.filter(c => c.status === 'مرفوض').length}
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-blue-500/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-blue-400">المبلغ المستخدم</p>
                      <p className="text-2xl font-bold text-white">
                        {Math.round((insuranceData.used / insuranceData.annualLimit) * 100)}%
                      </p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* معلومات البوليصة */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#008C6A]" />
                    <CardTitle className="text-white">معلومات البوليصة</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleDownloadInsuranceCard}
                      className="bg-gray-900/60 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50"
                    >
                      <Download className="h-4 w-4 ml-2" />
                      تحميل البطاقة
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSubmitInsuranceClaim}
                      className="bg-[#008C6A] hover:bg-[#00694F] text-white"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      مطالبة جديدة
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                    <Label className="text-sm text-gray-400">شركة التأمين</Label>
                    <p className="font-semibold text-white">{insuranceData.provider}</p>
                  </div>
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                    <Label className="text-sm text-gray-400">رقم البوليصة</Label>
                    <p className="font-semibold text-white">{insuranceData.policyNumber}</p>
                  </div>
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                    <Label className="text-sm text-gray-400">نوع التغطية</Label>
                    <p className="font-semibold text-white">{insuranceData.coverage}</p>
                  </div>
                </div>

                <div className="mt-4 relative z-10">
                  <Label className="text-sm text-gray-400">استخدام الحد السنوي</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={(insuranceData.used / insuranceData.annualLimit) * 100} className="flex-1 h-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-[#008C6A] [&>div]:to-[#00694F]" />
                    <span className="text-sm font-medium text-white">
                      {insuranceData.used.toLocaleString()} / {insuranceData.annualLimit.toLocaleString()} ريال
                    </span>
                  </div>
                </div>

                {/* الفوائد المشمولة */}
                <div className="mt-6 relative z-10">
                  <Label className="text-sm text-gray-400 mb-3 block">الفوائد المشمولة</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {insuranceData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-gray-700/30">
                        {benefit.covered ? (
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                        <span className={`text-sm ${benefit.covered ? 'text-green-400' : 'text-red-400'}`}>
                          {benefit.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* سجل المطالبات */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#008C6A]" />
                    <CardTitle className="text-white">سجل المطالبات</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedInsuranceFilter} onValueChange={setSelectedInsuranceFilter}>
                      <SelectTrigger className="w-40 bg-gray-900/60 border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                        <SelectItem value="all" className="text-white hover:bg-[#008C6A]/20">جميع المطالبات</SelectItem>
                        <SelectItem value="approved" className="text-white hover:bg-[#008C6A]/20">تم الموافقة</SelectItem>
                        <SelectItem value="pending" className="text-white hover:bg-[#008C6A]/20">قيد المراجعة</SelectItem>
                        <SelectItem value="rejected" className="text-white hover:bg-[#008C6A]/20">مرفوض</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleContactInsurance}
                      className="bg-gray-900/60 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50"
                    >
                      <Phone className="h-4 w-4 ml-2" />
                      اتصال
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-4 relative z-10">
                  {filteredInsuranceClaims.map((claim: any) => (
                    <Card key={claim.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-lg hover:shadow-[#008C6A]/20 transition-all duration-300 rounded-xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1 text-white">{claim.type}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-[#008C6A]" />
                                <span>التاريخ: {claim.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4 text-blue-400" />
                                <span>{claim.provider}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <span>{claim.amount} ريال</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400">
                              رقم المطالبة: {claim.claimNumber}
                            </p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${
                              claim.status === 'تم الموافقة' ? 'bg-green-900/60 text-green-400 border-green-500/30' :
                              claim.status === 'قيد المراجعة' ? 'bg-yellow-900/60 text-yellow-400 border-yellow-500/30' :
                              'bg-red-900/60 text-red-400 border-red-500/30'
                            } px-3 py-1`}
                          >
                            {claim.status}
                          </Badge>
                        </div>

                        <div className="flex gap-2 relative z-10">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewInsuranceDetails(claim)}
                            className="bg-gray-900/60 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {claim.status === 'تم الموافقة' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="bg-gray-900/60 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50"
                            >
                              <Download className="h-4 w-4 ml-2" />
                              تحميل الوثائق
                            </Button>
                          )}
                          
                          {claim.status === 'مرفوض' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="bg-gray-900/60 border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/50"
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
                <div className="mt-6 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 relative z-10">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                    <TrendingUp className="h-4 w-4 text-[#008C6A]" />
                    ملخص الشهر الحالي
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-gray-900/60 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                      <p className="text-gray-400">إجمالي المطالبات</p>
                      <p className="text-lg font-bold text-[#008C6A]">{insuranceData.claims.length}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/60 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                      <p className="text-gray-400">المبلغ المطالب به</p>
                      <p className="text-lg font-bold text-green-400">
                        {insuranceData.claims.reduce((sum, claim) => sum + claim.amount, 0).toLocaleString()} ريال
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/60 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                      <p className="text-gray-400">معدل القبول</p>
                      <p className="text-lg font-bold text-blue-400">
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
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-blue-400 mb-2">تقييم الأداء</p>
                      <p className="text-2xl font-bold text-white">
                        {jobCategoryData.performanceRating}/5
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-green-400 mb-2">أهداف مكتملة</p>
                      <p className="text-2xl font-bold text-white">
                        {jobCategoryData.goals.filter(g => g.status === 'مكتمل').length}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-purple-400 mb-2">متوسط المهارات</p>
                      <p className="text-2xl font-bold text-white">
                        {Math.round(jobCategoryData.skills.reduce((sum, skill) => sum + skill.level, 0) / jobCategoryData.skills.length)}%
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-orange-400 mb-2">سنوات الخبرة</p>
                      <p className="text-2xl font-bold text-white">
                        {jobCategoryData.yearsInPosition}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* معلومات المنصب */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/30 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-[#008C6A]" />
                    <CardTitle className="text-xl font-bold text-white">معلومات المنصب الحالي</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleSkillAssessment}
                      className="bg-black/20 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 transition-all duration-300"
                    >
                      <BarChart3 className="h-4 w-4 ml-2" />
                      تقييم المهارات
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleRequestPromotion}
                      className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white hover:from-[#00694F] hover:to-[#004D3A] shadow-lg hover:shadow-[#008C6A]/30 transition-all duration-300"
                    >
                      <TrendingUpIcon className="h-4 w-4 ml-2" />
                      طلب ترقية
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                    <Label className="text-sm text-gray-400 mb-2 block">المنصب الحالي</Label>
                    <p className="font-semibold text-white">{employeeDisplayData?.position}</p>
                  </div>
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                    <Label className="text-sm text-gray-400 mb-2 block">المستوى الوظيفي</Label>
                    <p className="font-semibold text-white">{jobCategoryData.currentLevel}</p>
                  </div>
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                    <Label className="text-sm text-gray-400 mb-2 block">الدرجة المالية</Label>
                    <p className="font-semibold text-white">{jobCategoryData.salaryGrade}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                    <Label className="text-sm text-gray-400 mb-2 block">القسم</Label>
                    <p className="font-semibold text-white">{employeeDisplayData?.department}</p>
                  </div>
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                    <Label className="text-sm text-gray-400 mb-2 block">المدير المباشر</Label>
                    <p className="font-semibold text-white">{employeeDisplayData?.directManager}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* تقييم المهارات */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/30 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-400" />
                    <CardTitle className="text-xl font-bold text-white">تقييم المهارات</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedJobCategoryFilter} onValueChange={setSelectedJobCategoryFilter}>
                      <SelectTrigger className="w-40 bg-black/20 backdrop-blur-sm border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="تصفية حسب الفئة" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
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
                      className="bg-black/20 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 transition-all duration-300"
                    >
                      <TrendingUpIcon className="h-4 w-4 ml-2" />
                      خطة التطوير
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-4 relative z-10">
                  {jobCategoryData.skills.filter(skill => 
                    selectedJobCategoryFilter === 'all' || skill.category === selectedJobCategoryFilter
                  ).map((skill, index) => (
                    <Card key={index} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-center justify-between mb-3 relative z-10">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1 text-white">{skill.name}</h4>
                            <Badge variant="outline" className="mb-2 bg-black/20 border-[#008C6A]/30 text-[#008C6A]">
                              {skill.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#008C6A]">{skill.level}%</p>
                          </div>
                        </div>
                        <Progress value={skill.level} className="h-3 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-[#008C6A] [&>div]:to-[#00694F] relative z-10" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* الأهداف والإنجازات */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/30 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"></div>
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <Target className="h-5 w-5 text-green-400" />
                  <CardTitle className="text-xl font-bold text-white">الأهداف والإنجازات</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-4 relative z-10">
                  {jobCategoryData.goals.map((goal) => (
                    <Card key={goal.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1 text-white">{goal.title}</h4>
                            <p className="text-sm text-gray-300 mb-2">{goal.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>الموعد النهائي: {goal.deadline}</span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  goal.priority === 'عالية' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                                  goal.priority === 'متوسطة' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                                  'border-green-500/30 text-green-400 bg-green-500/10'
                                }`}
                              >
                                {goal.priority}
                              </Badge>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${
                              goal.status === 'مكتمل' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                              goal.status === 'جاري' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                              'bg-gray-500/10 text-gray-400 border-gray-500/30'
                            } px-3 py-1`}
                          >
                            {goal.status}
                          </Badge>
                        </div>

                        <div className="mb-3 relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300">نسبة الإنجاز</span>
                            <span className="text-sm font-bold text-[#008C6A]">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-[#008C6A] [&>div]:to-[#00694F]" />
                        </div>

                        <div className="flex gap-2 relative z-10">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewJobCategoryDetails(goal)}
                            className="bg-black/20 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 transition-all duration-300"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {goal.status !== 'مكتمل' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="bg-black/20 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 transition-all duration-300"
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
                <div className="mt-6 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 relative z-10">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                    <BarChart3 className="h-4 w-4 text-[#008C6A]" />
                    ملخص الأداء الحالي
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                      <p className="text-gray-400">الكفاءات</p>
                      <p className="text-lg font-bold text-[#008C6A]">
                        {Math.round(jobCategoryData.competencies.reduce((sum, comp) => sum + comp.score, 0) / jobCategoryData.competencies.length * 10) / 10}/5
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-green-500/20">
                      <p className="text-gray-400">الأهداف المكتملة</p>
                      <p className="text-lg font-bold text-green-400">
                        {jobCategoryData.goals.filter(g => g.status === 'مكتمل').length}/{jobCategoryData.goals.length}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-blue-500/20">
                      <p className="text-gray-400">متوسط التقدم</p>
                      <p className="text-lg font-bold text-blue-400">
                        {Math.round(jobCategoryData.goals.reduce((sum, goal) => sum + goal.progress, 0) / jobCategoryData.goals.length)}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-purple-500/20">
                      <p className="text-gray-400">التقييم العام</p>
                      <p className="text-lg font-bold text-purple-400">ممتاز</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب العهدة */}
          <TabsContent value="custody" className="space-y-6">
            {/* إحصائيات العهدة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-blue-400 mb-2">عهدة نشطة</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedCustody.filter(c => c.status === 'نشط').length}
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-green-400 mb-2">حالة ممتازة</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedCustody.filter(c => c.condition === 'ممتاز').length}
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-purple-400 mb-2">القيمة الإجمالية</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedCustody.filter(c => c.status === 'نشط').reduce((sum, item) => sum + item.value, 0).toLocaleString()} ريال
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-orange-400 mb-2">يحتاج صيانة</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedCustody.filter(c => 
                          c.nextMaintenance && new Date(c.nextMaintenance) < new Date()
                        ).length}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* إدارة العهدة */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/30 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-[#008C6A]" />
                    <CardTitle className="text-xl font-bold text-white">العهدة والأصول</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedCustodyFilter} onValueChange={setSelectedCustodyFilter}>
                      <SelectTrigger className="w-40 bg-black/20 backdrop-blur-sm border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="تصفية حسب الفئة" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                        <SelectItem value="all">جميع العهدة</SelectItem>
                        <SelectItem value="تقنية">تقنية</SelectItem>
                        <SelectItem value="اتصالات">اتصالات</SelectItem>
                        <SelectItem value="أثاث">أثاث</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-black/20 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 transition-all duration-300"
                    >
                      <Download className="h-4 w-4 ml-2" />
                      تصدير التقرير
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-4 relative z-10">
                  {enhancedCustody.filter(item => 
                    selectedCustodyFilter === 'all' || item.category === selectedCustodyFilter
                  ).map((item) => (
                    <Card key={item.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1 text-white">{item.item}</h4>
                            <p className="text-sm text-gray-300 mb-2">الرقم التسلسلي: {item.serialNumber}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>تاريخ التسليم: {item.assignDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{item.value.toLocaleString()} ريال</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <Badge variant="outline" className="px-2 py-1 bg-black/20 border-[#008C6A]/30 text-[#008C6A]">
                                {item.category}
                              </Badge>
                              {item.warrantyExpiry && (
                                <span>الضمان: {item.warrantyExpiry}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge 
                              variant="outline" 
                              className={`${
                                item.status === 'نشط' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                'bg-gray-500/10 text-gray-400 border-gray-500/30'
                              } px-3 py-1`}
                            >
                              {item.status}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`${
                                item.condition === 'ممتاز' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                item.condition === 'جيد' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                              } px-2 py-1 text-xs`}
                            >
                              {item.condition}
                            </Badge>
                          </div>
                        </div>

                        {/* ملاحظات */}
                        {item.notes && (
                          <div className="mb-3 p-3 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 relative z-10">
                            <p className="text-sm font-medium text-gray-400 mb-1">ملاحظات:</p>
                            <p className="text-sm text-white">{item.notes}</p>
                          </div>
                        )}

                        {/* سجل الصيانة */}
                        {item.maintenanceHistory.length > 0 && (
                          <div className="mb-3 relative z-10">
                            <p className="text-sm font-medium text-gray-400 mb-2">آخر صيانة:</p>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>{item.maintenanceHistory[0].date}</span>
                              <span>•</span>
                              <span>{item.maintenanceHistory[0].type}</span>
                            </div>
                          </div>
                        )}

                        {/* تنبيه الصيانة */}
                        {item.nextMaintenance && new Date(item.nextMaintenance) < new Date() && (
                          <div className="mb-3 p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg relative z-10">
                            <div className="flex items-center gap-2 text-orange-400">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm font-medium">يحتاج صيانة دورية</span>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 flex-wrap relative z-10">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewCustodyDetails(item)}
                            className="bg-black/20 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 transition-all duration-300"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {item.status === 'نشط' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleReportIssue(item.id)}
                                className="bg-black/20 backdrop-blur-sm border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400 hover:text-red-300 transition-all duration-300"
                              >
                                <AlertTriangle className="h-4 w-4 ml-2" />
                                بلاغ عطل
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRequestMaintenance(item.id)}
                                className="bg-black/20 backdrop-blur-sm border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-300 transition-all duration-300"
                              >
                                <Settings className="h-4 w-4 ml-2" />
                                طلب صيانة
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleReturnAsset(item.id)}
                                className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-300 transition-all duration-300"
                              >
                                <RotateCcw className="h-4 w-4 ml-2" />
                                إرجاع العهدة
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* ملخص العهدة */}
                <div className="mt-6 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 relative z-10">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                    <BarChart3 className="h-4 w-4 text-[#008C6A]" />
                    ملخص العهدة
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-blue-500/20">
                      <p className="text-gray-400">إجمالي القيمة</p>
                      <p className="text-lg font-bold text-blue-400">
                        {enhancedCustody.reduce((sum, item) => sum + item.value, 0).toLocaleString()} ريال
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-green-500/20">
                      <p className="text-gray-400">متوسط العمر</p>
                      <p className="text-lg font-bold text-green-400">
                        {Math.round(enhancedCustody.filter(c => c.status === 'نشط').length > 0 ? 
                          enhancedCustody.filter(c => c.status === 'نشط').reduce((sum, item) => {
                            const years = (new Date().getTime() - new Date(item.assignDate).getTime()) / (1000 * 60 * 60 * 24 * 365);
                            return sum + years;
                          }, 0) / enhancedCustody.filter(c => c.status === 'نشط').length : 0
                        )} سنة
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-purple-500/20">
                      <p className="text-gray-400">الأكثر استخداماً</p>
                      <p className="text-lg font-bold text-purple-400">التقنية</p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-orange-500/20">
                      <p className="text-gray-400">معدل الصيانة</p>
                      <p className="text-lg font-bold text-orange-400">
                        {Math.round((enhancedCustody.filter(c => c.maintenanceHistory.length > 0).length / enhancedCustody.length) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب المسار الوظيفي */}
          <TabsContent value="career-path" className="space-y-6">
            {/* إحصائيات المسار الوظيفي */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-blue-400 mb-2">سنوات الخبرة</p>
                      <p className="text-2xl font-bold text-white">
                        {careerStats.totalYears}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-green-400 mb-2">الترقيات</p>
                      <p className="text-2xl font-bold text-white">
                        {careerStats.promotions}
                      </p>
                    </div>
                    <TrendingUpIcon className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-purple-400 mb-2">نمو الراتب</p>
                      <p className="text-2xl font-bold text-white">
                        {careerStats.salaryGrowth}%
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-orange-400 mb-2">المشاريع المنجزة</p>
                      <p className="text-2xl font-bold text-white">
                        {careerStats.projectsLed}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* الخط الزمني للمسار الوظيفي */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/30 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="h-5 w-5 text-[#008C6A]" />
                    <CardTitle className="text-xl font-bold text-white">الخط الزمني للمسار الوظيفي</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedCareerFilter} onValueChange={setSelectedCareerFilter}>
                      <SelectTrigger className="w-40 bg-black/20 backdrop-blur-sm border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                        <SelectItem value="all">جميع المناصب</SelectItem>
                        <SelectItem value="مكتمل">مكتمل</SelectItem>
                        <SelectItem value="حالي">حالي</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleCareerPlanning}
                      className="bg-black/20 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 transition-all duration-300"
                    >
                      <BarChart3 className="h-4 w-4 ml-2" />
                      خطة التطوير
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleRequestPromotion}
                      className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white hover:from-[#00694F] hover:to-[#004D3A] shadow-lg hover:shadow-[#008C6A]/30 transition-all duration-300"
                    >
                      <TrendingUpIcon className="h-4 w-4 ml-2" />
                      طلب ترقية
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-6 relative z-10">
                  {enhancedCareerPath.filter(position => 
                    selectedCareerFilter === 'all' || position.status === selectedCareerFilter
                  ).map((position, index) => (
                    <Card key={position.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-6 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-start gap-4 relative z-10">
                          {/* رقم المرحلة */}
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                              position.status === 'حالي' ? 'bg-gradient-to-r from-[#008C6A] to-[#00694F]' : 
                              'bg-gradient-to-r from-gray-700 to-gray-800'
                            }`}>
                              {index + 1}
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-bold mb-1 text-white">{position.position}</h3>
                                <p className="text-sm text-gray-300 mb-2">{position.level} • {position.department}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{position.startDate} - {position.endDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>المدة: {position.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    <span>{position.salary.toLocaleString()} ريال</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-400">المشرف: {position.manager}</p>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  position.status === 'حالي' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                  'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                } px-3 py-1`}
                              >
                                {position.status}
                              </Badge>
                            </div>

                            {/* الإنجازات */}
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2 flex items-center gap-1 text-white">
                                <Award className="h-4 w-4 text-[#008C6A]" />
                                الإنجازات الرئيسية:
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {position.achievements.map((achievement, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0" />
                                    <span className="text-gray-300">{achievement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* المهارات المكتسبة */}
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2 text-white">المهارات المكتسبة:</h4>
                              <div className="flex flex-wrap gap-2">
                                {position.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs bg-black/20 border-[#008C6A]/30 text-[#008C6A]">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* تقييم الترقية */}
                            {position.promotion && (
                              <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                                <h4 className="font-semibold mb-1 text-green-400">تقييم الترقية:</h4>
                                <p className="text-sm text-green-300 mb-1">{position.promotion.reason}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-green-400">التقييم:</span>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <CheckCircle2 key={i} className={`h-3 w-3 ${
                                        i < Math.floor(position.promotion.evaluation) ? 'text-green-400' : 'text-gray-600'
                                      }`} />
                                    ))}
                                    <span className="text-sm font-bold text-green-400 ml-1">
                                      {position.promotion.evaluation}/5
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* الهدف التالي */}
                            {position.nextTarget && (
                              <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                                <h4 className="font-semibold mb-1 text-blue-400">الهدف التالي:</h4>
                                <p className="text-sm text-blue-300 mb-2">
                                  <strong>{position.nextTarget.position}</strong> - خلال {position.nextTarget.timeline}
                                </p>
                                <div className="space-y-1">
                                  <p className="text-xs text-blue-400 font-medium">المتطلبات:</p>
                                  {position.nextTarget.requirements.map((req, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-blue-300">
                                      <Target className="h-3 w-3" />
                                      <span>{req}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* أزرار التفاعل */}
                            <div className="flex gap-2 flex-wrap">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleViewCareerDetails(position)}
                                className="bg-black/20 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 transition-all duration-300"
                              >
                                <Eye className="h-4 w-4 ml-2" />
                                عرض التفاصيل
                              </Button>
                              
                              {position.status === 'حالي' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={handleSkillGapAnalysis}
                                    className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-300 transition-all duration-300"
                                  >
                                    <BarChart3 className="h-4 w-4 ml-2" />
                                    تحليل المهارات
                                  </Button>
                                  
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="bg-black/20 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 transition-all duration-300"
                                  >
                                    <Download className="h-4 w-4 ml-2" />
                                    شهادة الخبرة
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* ملخص المسار الوظيفي */}
                <div className="mt-6 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 relative z-10">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                    <BarChart3 className="h-4 w-4 text-[#008C6A]" />
                    ملخص المسار الوظيفي
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-blue-500/20">
                      <p className="text-gray-400">متوسط البقاء في المنصب</p>
                      <p className="text-lg font-bold text-blue-400">
                        {careerStats.averageStayPerRole} سنة
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-green-500/20">
                      <p className="text-gray-400">الشهادات المحصلة</p>
                      <p className="text-lg font-bold text-green-400">
                        {careerStats.certificationsEarned}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-purple-500/20">
                      <p className="text-gray-400">المهارات المكتسبة</p>
                      <p className="text-lg font-bold text-purple-400">
                        {careerStats.skillsAcquired}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-orange-500/20">
                      <p className="text-gray-400">أعضاء الفريق المُدارين</p>
                      <p className="text-lg font-bold text-orange-400">
                        {careerStats.teamMembersManaged}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced GPS Attendance Tab with EarnWithBoad Design */}
          <TabsContent value="gps-attendance" className="space-y-6">
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-center flex items-center justify-center gap-2 relative z-10">
                  <Satellite className="h-6 w-6 text-white" />
                  نظام الحضور GPS
                </CardTitle>
                <CardDescription className="text-center text-gray-200 relative z-10">نظام حضور وانصراف متقدم مع تتبع الموقع الجغرافي</CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-gray-900/40">
                <div className="space-y-6">
                  {/* Enhanced GPS Attendance Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20 cursor-pointer" 
                          onClick={() => setSelectedGPSFilter('present')}>
                      <CardContent className="p-6 text-center bg-gray-900/40">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300">
                          <CheckCircleIcon className="h-8 w-8 text-green-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-2">{attendanceData.filter(r => r.status === 'حاضر').length}</div>
                        <div className="text-sm text-gray-300">أيام الحضور</div>
                      </CardContent>
                    </Card>

                    <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20 cursor-pointer"
                          onClick={() => setSelectedGPSFilter('late')}>
                      <CardContent className="p-6 text-center bg-gray-900/40">
                        <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-yellow-500/30 transition-all duration-300">
                          <ClockIcon className="h-8 w-8 text-yellow-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-2">{attendanceData.filter(r => r.status === 'متأخر').length}</div>
                        <div className="text-sm text-gray-300">أيام التأخير</div>
                      </CardContent>
                    </Card>

                    <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20 cursor-pointer"
                          onClick={() => setSelectedGPSFilter('absent')}>
                      <CardContent className="p-6 text-center bg-gray-900/40">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-red-500/30 transition-all duration-300">
                          <XCircle className="h-8 w-8 text-red-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-2">{attendanceData.filter(r => r.status === 'غائب').length}</div>
                        <div className="text-sm text-gray-300">أيام الغياب</div>
                      </CardContent>
                    </Card>

                    <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20 cursor-pointer"
                          onClick={() => setSelectedGPSFilter('all')}>
                      <CardContent className="p-6 text-center bg-gray-900/40">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300">
                          <Timer className="h-8 w-8 text-blue-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-2">
                          {attendanceData.reduce((total, record) => {
                            const hours = parseFloat(record.hours.replace(' ساعة', '')) || 0;
                            return total + hours;
                          }, 0).toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-300">إجمالي الساعات</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Filters */}
                  <div className="flex flex-wrap gap-2 items-center bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-[#008C6A]/20">
                    <span className="text-sm font-medium text-gray-300">تصفية بحسب:</span>
                    <Badge 
                      variant={selectedGPSFilter === 'all' ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${selectedGPSFilter === 'all' ? 'bg-[#008C6A] text-white' : 'bg-gray-900/60 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20'}`}
                      onClick={() => setSelectedGPSFilter('all')}
                    >
                      الكل
                    </Badge>
                    <Badge 
                      variant={selectedGPSFilter === 'present' ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${selectedGPSFilter === 'present' ? 'bg-[#008C6A] text-white' : 'bg-gray-900/60 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20'}`}
                      onClick={() => setSelectedGPSFilter('present')}
                    >
                      حاضر
                    </Badge>
                    <Badge 
                      variant={selectedGPSFilter === 'late' ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${selectedGPSFilter === 'late' ? 'bg-[#008C6A] text-white' : 'bg-gray-900/60 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20'}`}
                      onClick={() => setSelectedGPSFilter('late')}
                    >
                      متأخر
                    </Badge>
                    <Badge 
                      variant={selectedGPSFilter === 'absent' ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${selectedGPSFilter === 'absent' ? 'bg-[#008C6A] text-white' : 'bg-gray-900/60 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20'}`}
                      onClick={() => setSelectedGPSFilter('absent')}
                    >
                      غائب
                    </Badge>
                  </div>

                  {/* Enhanced GPS Attendance Records */}
                  <div className="space-y-4">
                    {filteredGPSAttendance.map((record, index) => (
                      <Card key={index} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                        <CardContent className="p-6 bg-gray-900/40 relative">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                          </div>
                          
                          <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-white">{record.date}</h3>
                                <Badge variant="outline" className={`${getAttendanceStatusColor(record.status)} bg-gray-900/60 border-[#008C6A]/30 text-white px-3 py-1`}>
                                  {record.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-green-500/20">
                                  <LogIn className="h-4 w-4 text-green-400" />
                                  <span className="font-medium text-gray-300">دخول:</span>
                                  <span className="text-white">{record.checkIn}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-red-500/20">
                                  <LogOut className="h-4 w-4 text-red-400" />
                                  <span className="font-medium text-gray-300">خروج:</span>
                                  <span className="text-white">{record.checkOut}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-blue-500/20">
                                  <Timer className="h-4 w-4 text-blue-400" />
                                  <span className="font-medium text-gray-300">ساعات العمل:</span>
                                  <span className="text-white">{record.hours}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-purple-500/20">
                                  <MapPin className="h-4 w-4 text-purple-400" />
                                  <span className="font-medium text-gray-300">الموقع:</span>
                                  <span className="text-white">مؤكد GPS</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Interactive Buttons */}
                          <div className="flex gap-2 flex-wrap relative z-10">
                            <Button 
                              size="sm" 
                              onClick={() => handleViewGPSDetails(record)}
                              className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#008C6A]/20"
                            >
                              <Eye className="h-4 w-4 ml-2" />
                              عرض الموقع
                            </Button>
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleExportGPSData(record)}
                              className="bg-gray-900/60 border-green-400/30 text-white hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
                            >
                              <Download className="h-4 w-4 ml-2 text-green-400" />
                              تصدير البيانات
                            </Button>
                            
                            <Button 
                              size="sm" 
                              variant="outline"  
                              onClick={() => handleRequestGPSCorrection(record)}
                              className="bg-gray-900/60 border-yellow-400/30 text-white hover:bg-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
                            >
                              <AlertCircle className="h-4 w-4 ml-2 text-yellow-400" />
                              طلب تصحيح
                            </Button>
                          </div>

                          {/* Enhanced Status Information */}
                          {record.status === 'متأخر' && (
                            <div className="mt-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-yellow-400/30 animate-fade-in relative z-10">
                              <div className="flex items-center gap-2 text-yellow-400">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                  تم تسجيل تأخير - يرجى مراجعة المسؤول المباشر
                                </span>
                              </div>
                            </div>
                          )}

                          {record.status === 'غائب' && (
                            <div className="mt-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-red-400/30 animate-fade-in relative z-10">
                              <div className="flex items-center gap-2 text-red-400">
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
                    <Card className="text-center py-8 bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30">
                      <CardContent className="bg-gray-900/40">
                        <Satellite className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">لا توجد سجلات حضور للفلتر المحدد</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Enhanced Monthly Performance Summary */}
                  <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <CardTitle className="text-center flex items-center justify-center gap-2 relative z-10">
                        <TrendingUp className="h-6 w-6 text-white" />
                        ملخص أداء الحضور GPS
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 bg-gray-900/40">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-green-500/20">
                          <div className="text-3xl font-bold text-green-400 mb-2">
                            {((attendanceData.filter(r => r.status === 'حاضر').length / attendanceData.length) * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-300">معدل الحضور</div>
                        </div>
                        <div className="text-center bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-blue-500/20">
                          <div className="text-3xl font-bold text-blue-400 mb-2">
                            {(attendanceData.reduce((total, record) => {
                              const hours = parseFloat(record.hours.replace(' ساعة', '')) || 0;
                              return total + hours;
                            }, 0) / attendanceData.length).toFixed(1)}
                          </div>
                          <div className="text-sm text-gray-300">متوسط الساعات يومياً</div>
                        </div>
                        <div className="text-center bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-yellow-500/20">
                          <div className="text-3xl font-bold text-yellow-400 mb-2">
                            {attendanceData.filter(r => r.status === 'متأخر').length}
                          </div>
                          <div className="text-sm text-gray-300">مرات التأخير</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced GPS Details Dialog */}
            <Dialog open={isGPSDetailsOpen} onOpenChange={setIsGPSDetailsOpen}>
              <DialogContent className="max-w-2xl bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-white">
                    <MapPin className="h-5 w-5 text-[#008C6A]" />
                    تفاصيل موقع الحضور GPS
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    معلومات تفصيلية عن موقع تسجيل الحضور والانصراف
                  </DialogDescription>
                </DialogHeader>
                
                {selectedGPSRecord && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-[#008C6A]/20">
                        <label className="text-sm font-medium text-gray-300">التاريخ</label>
                        <p className="text-lg font-semibold text-white">{selectedGPSRecord.date}</p>
                      </div>
                      <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-[#008C6A]/20">
                        <label className="text-sm font-medium text-gray-300">الحالة</label>
                        <Badge className={`${getAttendanceStatusColor(selectedGPSRecord.status)} bg-gray-900/60 border-[#008C6A]/30 text-white`}>
                          {selectedGPSRecord.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-green-500/20">
                        <label className="text-sm font-medium text-gray-300">وقت الدخول</label>
                        <p className="text-lg text-white">{selectedGPSRecord.checkIn}</p>
                      </div>
                      <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-red-500/20">
                        <label className="text-sm font-medium text-gray-300">وقت الخروج</label>
                        <p className="text-lg text-white">{selectedGPSRecord.checkOut}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">معلومات الموقع</label>
                      <Card className="p-4 bg-black/20 backdrop-blur-sm border border-[#008C6A]/30">
                        <div className="flex items-center gap-2 text-[#008C6A] mb-2">
                          <Satellite className="h-4 w-4" />
                          <span className="font-medium">الموقع مؤكد بواسطة GPS</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          تم تأكيد موقع تسجيل الحضور داخل النطاق المسموح للشركة
                        </p>
                      </Card>
                    </div>
                  </div>
                )}
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsGPSDetailsOpen(false)} className="bg-gray-900/60 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20">
                    إغلاق
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Enhanced Dashboard Stats Cards with EarnWithBoad Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40">
                  <div className="w-16 h-16 bg-[#008C6A]/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-[#008C6A]/30 transition-all duration-300">
                    <Calendar className="h-8 w-8 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">25</div>
                  <div className="text-sm text-gray-300">أيام إجازة متبقية</div>
                </CardContent>
              </Card>

              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40">
                  <div className="w-16 h-16 bg-[#008C6A]/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-[#008C6A]/30 transition-all duration-300">
                    <Clock className="h-8 w-8 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">96%</div>
                  <div className="text-sm text-gray-300">معدل الحضور</div>
                </CardContent>
              </Card>

              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40">
                  <div className="w-16 h-16 bg-[#008C6A]/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-[#008C6A]/30 transition-all duration-300">
                    <Award className="h-8 w-8 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">85%</div>
                  <div className="text-sm text-gray-300">تقييم الأداء</div>
                </CardContent>
              </Card>

              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40">
                  <div className="w-16 h-16 bg-[#008C6A]/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-[#008C6A]/30 transition-all duration-300">
                    <FileText className="h-8 w-8 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{activeRequests.length}</div>
                  <div className="text-sm text-gray-300">طلبات نشطة</div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Quick Actions Section */}
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-center flex items-center justify-center gap-2 relative z-10">
                  <TrendingUp className="h-6 w-6 text-white" />
                  الإجراءات السريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gray-900/40">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 text-white"
                    onClick={handleQuickLeaveRequest}
                  >
                    <Calendar className="h-6 w-6 text-[#008C6A]" />
                    طلب إجازة
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 text-white"
                    onClick={handleQuickSalaryCertificate}
                  >
                    <FileText className="h-6 w-6 text-[#008C6A]" />
                    شهادة راتب
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 text-white"
                    onClick={handleQuickResidentRequest}
                  >
                    <Satellite className="h-6 w-6 text-[#008C6A]" />
                    طلب مقيم
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col gap-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 text-white"
                        onClick={handleContactHR}
                      >
                        <MessageCircle className="h-6 w-6 text-[#008C6A]" />
                        تواصل مع HR
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30">
                      <DialogHeader>
                        <DialogTitle className="text-white">الدردشة مع الموارد البشرية</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="h-64 overflow-y-auto border border-[#008C6A]/30 rounded p-2 space-y-2 bg-black/20">
                          {chatMessages.length === 0 ? (
                            <p className="text-gray-400 text-center">لا توجد رسائل</p>
                          ) : (
                            chatMessages.map((msg) => (
                              <div key={msg.id} className={`p-2 rounded ${msg.sender === 'أنت' ? 'bg-[#008C6A] text-white mr-auto max-w-[80%]' : 'bg-gray-700 text-white ml-auto max-w-[80%]'}`}>
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
                            className="bg-black/20 border border-[#008C6A]/30 text-white"
                          />
                          <Button onClick={sendMessage} size="sm" className="bg-[#008C6A] hover:bg-[#00694F]">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 text-white"
                    onClick={handleDownloadDocuments}
                  >
                    <Download className="h-6 w-6 text-[#008C6A]" />
                    تحميل المستندات
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Recent Activity */}
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-center flex items-center justify-center gap-2 relative z-10">
                  <Clock className="h-6 w-6 text-white" />
                  النشاط الأخير
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gray-900/40">
                <div className="space-y-4">
                  {activeRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-300">
                      <div>
                        <p className="font-medium text-white">{request.type}</p>
                        <p className="text-sm text-gray-400">{request.details}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-400">{request.date}</p>
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            {/* Enhanced Request Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300">
                    <CheckCircle2 className="h-8 w-8 text-green-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {enhancedRequests.filter(r => r.status === 'تمت الموافقة' || r.status === 'مكتمل').length}
                  </div>
                  <div className="text-sm text-gray-300">طلبات مقبولة</div>
                </CardContent>
              </Card>

              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/5"></div>
                  </div>
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-yellow-500/30 transition-all duration-300 relative z-10">
                    <Clock className="h-8 w-8 text-yellow-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2 relative z-10">
                    {enhancedRequests.filter(r => r.status === 'قيد المراجعة').length}
                  </div>
                  <div className="text-sm text-gray-300 relative z-10">قيد المراجعة</div>
                </CardContent>
              </Card>

              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-500/5"></div>
                  </div>
                  <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-red-500/30 transition-all duration-300 relative z-10">
                    <XCircle className="h-8 w-8 text-red-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2 relative z-10">
                    {enhancedRequests.filter(r => r.status === 'مرفوض').length}
                  </div>
                  <div className="text-sm text-gray-300 relative z-10">طلبات مرفوضة</div>
                </CardContent>
              </Card>

              <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardContent className="p-6 text-center bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5"></div>
                  </div>
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300 relative z-10">
                    <FileText className="h-8 w-8 text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2 relative z-10">
                    {enhancedRequests.length}
                  </div>
                  <div className="text-sm text-gray-300 relative z-10">إجمالي الطلبات</div>
                </CardContent>
              </Card>
            </div>

            {/* إدارة الطلبات */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/30 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#008C6A]" />
                    <CardTitle className="text-xl font-bold text-white">طلباتي</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedRequestsFilter} onValueChange={setSelectedRequestsFilter}>
                      <SelectTrigger className="w-40 bg-black/20 backdrop-blur-sm border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
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
                      className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white hover:from-[#00694F] hover:to-[#004D3A] shadow-lg hover:shadow-[#008C6A]/30 transition-all duration-300"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      طلب جديد
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-4 relative z-10">
                  {enhancedRequests.filter(request => 
                    selectedRequestsFilter === 'all' || request.category === selectedRequestsFilter
                  ).map((request) => (
                    <Card key={request.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1 text-white">{request.title}</h4>
                            <p className="text-sm text-gray-300 mb-2">{request.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>تاريخ التقديم: {request.submittedDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>المدة: {request.duration}</span>
                              </div>
                              <Badge variant="outline" className="px-2 py-1 bg-black/20 border-[#008C6A]/30 text-[#008C6A]">
                                {request.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400">
                              رقم الطلب: {request.id} | المعتمد: {request.approver}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge 
                              variant="outline" 
                              className={`${
                                request.status === 'تمت الموافقة' || request.status === 'مكتمل' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                request.status === 'قيد المراجعة' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                                'bg-red-500/10 text-red-400 border-red-500/30'
                              } px-3 py-1`}
                            >
                              {request.status}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`${
                                request.priority === 'عالية' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                                request.priority === 'متوسطة' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                                'border-green-500/30 text-green-400 bg-green-500/10'
                              } px-2 py-1 text-xs`}
                            >
                              {request.priority}
                            </Badge>
                          </div>
                        </div>

                        {/* تعليقات المراجع */}
                        {request.comments && (
                          <div className="mb-3 p-3 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 relative z-10">
                            <p className="text-sm font-medium text-gray-400 mb-1">تعليقات المراجع:</p>
                            <p className="text-sm text-white">{request.comments}</p>
                          </div>
                        )}

                        {/* المرفقات */}
                        {request.documents.length > 0 && (
                          <div className="mb-3 relative z-10">
                            <p className="text-sm font-medium text-gray-400 mb-2">المرفقات:</p>
                            <div className="flex flex-wrap gap-2">
                              {request.documents.map((doc, index) => (
                                <div key={index} className="flex items-center gap-1 px-2 py-1 bg-black/20 backdrop-blur-sm rounded border border-[#008C6A]/20 text-xs text-white">
                                  <FileText className="h-3 w-3" />
                                  <span>{doc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 flex-wrap relative z-10">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewRequestDetails(request)}
                            className="bg-black/20 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 transition-all duration-300"
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
                                className="bg-black/20 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 transition-all duration-300"
                              >
                                <MessageCircle className="h-4 w-4 ml-2" />
                                متابعة
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCancelRequest(request.id)}
                                className="bg-black/20 backdrop-blur-sm border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400 hover:text-red-300 transition-all duration-300"
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
                              className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-300 transition-all duration-300"
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
                <div className="mt-6 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 relative z-10">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                    <BarChart3 className="h-4 w-4 text-[#008C6A]" />
                    ملخص الطلبات
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-green-500/20">
                      <p className="text-gray-400">معدل الموافقة</p>
                      <p className="text-lg font-bold text-green-400">
                        {Math.round((enhancedRequests.filter(r => r.status === 'تمت الموافقة' || r.status === 'مكتمل').length / enhancedRequests.length) * 100)}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-blue-500/20">
                      <p className="text-gray-400">متوسط وقت المراجعة</p>
                      <p className="text-lg font-bold text-blue-400">3 أيام</p>
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
            {/* إحصائيات الراتب */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-green-400 mb-2">الراتب الصافي</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedPayrollData.currentSalary.netSalary.toLocaleString()} ريال
                      </p>
                    </div>
                    <Banknote className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-blue-400 mb-2">الراتب الإجمالي</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedPayrollData.currentSalary.totalGross.toLocaleString()} ريال
                      </p>
                    </div>
                    <CreditCard className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-purple-400 mb-2">إجمالي البدلات</p>
                      <p className="text-2xl font-bold text-white">
                        {(enhancedPayrollData.currentSalary.housingAllowance + 
                          enhancedPayrollData.currentSalary.transportAllowance + 
                          enhancedPayrollData.currentSalary.otherAllowances).toLocaleString()} ريال
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-orange-400 mb-2">إجمالي الاستقطاعات</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedPayrollData.currentSalary.totalDeductions.toLocaleString()} ريال
                      </p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* تفاصيل الراتب الحالي */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/30 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#008C6A]" />
                    <CardTitle className="text-xl font-bold text-white">تفاصيل الراتب الحالي</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleTaxCalculator}
                      className="bg-black/20 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 transition-all duration-300"
                    >
                      <BarChart3 className="h-4 w-4 ml-2" />
                      حاسبة الضرائب
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleBenefitsOverview}
                      className="bg-black/20 backdrop-blur-sm border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-300 transition-all duration-300"
                    >
                      <Award className="h-4 w-4 ml-2" />
                      ملخص المزايا
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleDownloadPayslip('current')}
                      className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white hover:from-[#00694F] hover:to-[#004D3A] shadow-lg hover:shadow-[#008C6A]/30 transition-all duration-300"
                    >
                      <Download className="h-4 w-4 ml-2" />
                      تحميل كشف الراتب
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {/* الإيرادات */}
                  <div>
                    <h4 className="font-semibold mb-3 text-green-400 flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      الإيرادات
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <span className="text-sm font-medium text-white">الراتب الأساسي</span>
                        <span className="font-bold text-green-400">
                          {enhancedPayrollData.currentSalary.basicSalary.toLocaleString()} ريال
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <span className="text-sm font-medium text-white">بدل السكن</span>
                        <span className="font-bold text-green-400">
                          {enhancedPayrollData.currentSalary.housingAllowance.toLocaleString()} ريال
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <span className="text-sm font-medium text-white">بدل النقل</span>
                        <span className="font-bold text-green-400">
                          {enhancedPayrollData.currentSalary.transportAllowance.toLocaleString()} ريال
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <span className="text-sm font-medium text-white">بدلات أخرى</span>
                        <span className="font-bold text-green-400">
                          {enhancedPayrollData.currentSalary.otherAllowances.toLocaleString()} ريال
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-500/20 rounded-lg border-2 border-green-500/40">
                        <span className="text-sm font-bold text-white">إجمالي الإيرادات</span>
                        <span className="font-bold text-green-300 text-lg">
                          {enhancedPayrollData.currentSalary.totalGross.toLocaleString()} ريال
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* الاستقطاعات */}
                  <div>
                    <h4 className="font-semibold mb-3 text-red-400 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      الاستقطاعات
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                        <span className="text-sm font-medium text-white">التأمينات الاجتماعية</span>
                        <span className="font-bold text-red-400">
                          {enhancedPayrollData.currentSalary.socialInsurance.toLocaleString()} ريال
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                        <span className="text-sm font-medium text-white">ضريبة الدخل</span>
                        <span className="font-bold text-red-400">
                          {enhancedPayrollData.currentSalary.incomeTax.toLocaleString()} ريال
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                        <span className="text-sm font-medium text-white">استقطاعات أخرى</span>
                        <span className="font-bold text-red-400">
                          {enhancedPayrollData.currentSalary.otherDeductions.toLocaleString()} ريال
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-500/20 rounded-lg border-2 border-red-500/40">
                        <span className="text-sm font-bold text-white">إجمالي الاستقطاعات</span>
                        <span className="font-bold text-red-300 text-lg">
                          {enhancedPayrollData.currentSalary.totalDeductions.toLocaleString()} ريال
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-[#008C6A]/20 rounded-lg border-2 border-[#008C6A]/40 mt-4">
                        <span className="text-sm font-bold text-white">الراتب الصافي</span>
                        <span className="font-bold text-[#008C6A] text-xl">
                          {enhancedPayrollData.currentSalary.netSalary.toLocaleString()} ريال
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* سجل الرواتب */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/30 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#008C6A]" />
                    <CardTitle className="text-xl font-bold text-white">سجل الرواتب</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedPayrollFilter} onValueChange={setSelectedPayrollFilter}>
                      <SelectTrigger className="w-40 bg-black/20 backdrop-blur-sm border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="تصفية حسب السنة" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                        <SelectItem value="all">جميع السنوات</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleSalaryAdvance}
                      className="bg-black/20 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 transition-all duration-300"
                    >
                      <Banknote className="h-4 w-4 ml-2" />
                      طلب سلفة
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-4 relative z-10">
                  {enhancedPayrollData.payrollHistory.filter(payroll => 
                    selectedPayrollFilter === 'all' || payroll.id.includes(selectedPayrollFilter)
                  ).map((payroll) => (
                    <Card key={payroll.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1 text-white">{payroll.month}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-2">
                              <div className="flex items-center gap-1">
                                <Banknote className="h-4 w-4" />
                                <span>الأساسي: {payroll.basicSalary.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Plus className="h-4 w-4" />
                                <span>البدلات: {payroll.allowances.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                <span>المكافآت: {payroll.bonuses.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>الإضافي: {payroll.overtime.toLocaleString()}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400">
                              رقم الكشف: {payroll.id} | تاريخ الدفع: {payroll.payDate}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 px-3 py-1">
                              {payroll.status}
                            </Badge>
                            <div className="text-left">
                              <p className="text-xs text-gray-400">الصافي</p>
                              <p className="text-lg font-bold text-[#008C6A]">
                                {payroll.netSalary.toLocaleString()} ريال
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap relative z-10">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewPayrollDetails(payroll)}
                            className="bg-black/20 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 transition-all duration-300"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadPayslip(payroll.id)}
                            className="bg-black/20 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 transition-all duration-300"
                          >
                            <Download className="h-4 w-4 ml-2" />
                            تحميل الكشف
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* ملخص الرواتب */}
                <div className="mt-6 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 relative z-10">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-white">
                    <BarChart3 className="h-4 w-4 text-[#008C6A]" />
                    ملخص السنة المالية
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-blue-500/20">
                      <p className="text-gray-400">الدخل السنوي</p>
                      <p className="text-lg font-bold text-blue-400">
                        {(enhancedPayrollData.currentSalary.netSalary * 12).toLocaleString()} ريال
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-green-500/20">
                      <p className="text-gray-400">إجمالي المكافآت</p>
                      <p className="text-lg font-bold text-green-400">
                        {enhancedPayrollData.payrollHistory.reduce((sum, p) => sum + p.bonuses, 0).toLocaleString()} ريال
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-red-500/20">
                      <p className="text-gray-400">إجمالي الضرائب</p>
                      <p className="text-lg font-bold text-red-400">
                        {enhancedPayrollData.taxInfo.annualTax.toLocaleString()} ريال
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-purple-500/20">
                      <p className="text-gray-400">آخر زيادة</p>
                      <p className="text-lg font-bold text-purple-400">
                        {enhancedPayrollData.performance.raisePercentage}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* معلومات المزايا */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/30 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <Award className="h-5 w-5 text-[#008C6A]" />
                  <CardTitle className="text-xl font-bold text-white">المزايا والحوافز</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {enhancedPayrollData.benefits.map((benefit, index) => (
                    <Card key={index} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-center justify-between mb-2 relative z-10">
                          <h4 className="font-semibold text-white">{benefit.name}</h4>
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                            {benefit.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                          <span className="text-sm text-gray-400">{benefit.type}</span>
                          <span className="font-bold text-[#008C6A]">
                            {benefit.value.toLocaleString()} ريال
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            {/* إحصائيات الأداء */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-green-500/30 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-green-400">التقييم العام</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedPerformanceData.currentRating.overall}/5
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-blue-500/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-blue-400">الأهداف المكتملة</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedPerformanceData.goals.filter(g => g.progress === 100).length}/{enhancedPerformanceData.goals.length}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-purple-500/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-purple-400">الإنجازات</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedPerformanceData.achievements.length}
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-orange-500/30 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-orange-400">متوسط التقييمات</p>
                      <p className="text-2xl font-bold text-white">
                        {(enhancedPerformanceData.reviews.reduce((sum, r) => sum + r.overallScore, 0) / enhancedPerformanceData.reviews.length).toFixed(1)}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* تقييم الكفاءات */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#008C6A]" />
                    <CardTitle className="text-white">تقييم الكفاءات</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleRequestFeedback}
                      className="bg-gray-900/60 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50"
                    >
                      <MessageCircle className="h-4 w-4 ml-2" />
                      طلب تقييم
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handlePerformanceReport}
                      className="bg-[#008C6A] hover:bg-[#00694F] text-white"
                    >
                      <Download className="h-4 w-4 ml-2" />
                      تقرير الأداء
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-4 relative z-10">
                  {enhancedPerformanceData.competencies.map((competency, index) => (
                    <div key={index} className="p-4 bg-black/20 backdrop-blur-sm border border-[#008C6A]/20 rounded-lg hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{competency.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">الحالي:</span>
                          <span className="font-bold text-[#008C6A]">{competency.current}</span>
                          <span className="text-sm text-gray-400">الهدف:</span>
                          <span className="font-bold text-green-400">{competency.target}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">التقييم الحالي</span>
                          <span className="text-white">{competency.current}/5</span>
                        </div>
                        <Progress value={(competency.current / 5) * 100} className="h-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-[#008C6A] [&>div]:to-[#00694F]" />
                        {competency.gap > 0 && (
                          <div className="flex items-center gap-2 text-sm text-orange-400">
                            <AlertCircle className="h-4 w-4" />
                            <span>فجوة: {competency.gap} نقطة</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* الأهداф والخطة التطويرية */}
            <Card className="border-l-4 border-l-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    <CardTitle>الأهداف والخطة التطويرية</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedPerformanceFilter} onValueChange={setSelectedPerformanceFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأهداف</SelectItem>
                        <SelectItem value="جاري">جاري</SelectItem>
                        <SelectItem value="مكتمل">مكتمل</SelectItem>
                        <SelectItem value="متأخر">متأخر</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm"
                      onClick={handleSetGoal}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      هدف جديد
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enhancedPerformanceData.goals.filter(goal => 
                    selectedPerformanceFilter === 'all' || goal.status === selectedPerformanceFilter
                  ).map((goal) => (
                    <Card key={goal.id} className="border-l-4 border-l-primary/30 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">{goal.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>الموعد المستهدف: {goal.targetDate}</span>
                              </div>
                              <Badge variant="outline" className="px-2 py-1">
                                {goal.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge 
                              variant="outline" 
                              className={`${
                                goal.status === 'مكتمل' ? 'bg-green-50 text-green-700 border-green-200' :
                                goal.status === 'جاري' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                'bg-red-50 text-red-700 border-red-200'
                              } px-3 py-1`}
                            >
                              {goal.status}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`${
                                goal.priority === 'عالية' ? 'border-red-200 text-red-700 bg-red-50' :
                                goal.priority === 'متوسطة' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                                'border-green-200 text-green-700 bg-green-50'
                              } px-2 py-1 text-xs`}
                            >
                              {goal.priority}
                            </Badge>
                          </div>
                        </div>

                        {/* شريط التقدم */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">نسبة الإنجاز</span>
                            <span className="text-sm font-bold text-primary">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>

                        {/* معايير القياس */}
                        <div className="mb-3">
                          <h5 className="font-medium mb-2 text-sm">معايير القياس:</h5>
                          <div className="space-y-1">
                            {goal.measures.map((measure, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                <span>{measure}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewPerformanceDetails(goal)}
                            className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700"
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {goal.status === 'جاري' && (
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
              </CardContent>
            </Card>

            {/* سجل التقييمات */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <FileText className="h-5 w-5 text-[#008C6A]" />
                  <CardTitle className="text-white">سجل التقييمات</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-4 relative z-10">
                  {enhancedPerformanceData.reviews.map((review) => (
                    <Card key={review.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-lg hover:shadow-[#008C6A]/20 transition-all duration-300 rounded-xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-start justify-between mb-3 relative z-10">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1 text-white">{review.period}</h4>
                            <p className="text-sm text-gray-300 mb-2">المقيّم: {review.reviewer}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-[#008C6A]" />
                                <span>تاريخ التقييم: {review.reviewDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-blue-400" />
                                <span>التقييم القادم: {review.nextReview}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm text-gray-300">التقييم:</span>
                              <span className="text-2xl font-bold text-[#008C6A]">{review.overallScore}/5</span>
                            </div>
                          </div>
                        </div>

                        {/* نقاط القوة */}
                        <div className="mb-3 relative z-10">
                          <h5 className="font-medium mb-2 text-green-400 flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" />
                            نقاط القوة:
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {review.strengths.map((strength, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-green-400">
                                <Plus className="h-3 w-3" />
                                <span>{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* نقاط التحسين */}
                        <div className="mb-3 relative z-10">
                          <h5 className="font-medium mb-2 text-orange-400 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            نقاط التحسين:
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {review.improvements.map((improvement, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-orange-400">
                                <Target className="h-3 w-3" />
                                <span>{improvement}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* التعليقات */}
                        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 relative z-10">
                          <h5 className="font-medium mb-1 text-sm text-gray-300">تعليقات المقيّم:</h5>
                          <p className="text-sm text-gray-300">{review.feedback}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* الإنجازات والجوائز */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <Award className="h-5 w-5 text-[#008C6A]" />
                  <CardTitle className="text-white">الإنجازات والجوائز</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {enhancedPerformanceData.achievements.map((achievement) => (
                    <Card key={achievement.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-lg hover:shadow-[#008C6A]/20 transition-all duration-300 rounded-xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-start gap-3 relative z-10">
                          <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              achievement.type === 'تقدير' ? 'bg-yellow-900/60 backdrop-blur-sm' :
                              achievement.type === 'إنجاز' ? 'bg-green-900/60 backdrop-blur-sm' :
                              'bg-blue-900/60 backdrop-blur-sm'
                            }`}>
                              <Award className={`h-5 w-5 ${
                                achievement.type === 'تقدير' ? 'text-yellow-400' :
                                achievement.type === 'إنجاز' ? 'text-green-400' :
                                'text-blue-400'
                              }`} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1 text-white">{achievement.title}</h4>
                            <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
                            <div className="flex items-center justify-between text-xs">
                              <Badge variant="outline" className="bg-gray-900/60 border-[#008C6A]/30 text-white">{achievement.type}</Badge>
                              <span className="text-gray-400">{achievement.date}</span>
                            </div>
                            <div className="mt-2 p-2 bg-black/20 backdrop-blur-sm rounded text-xs border border-[#008C6A]/20">
                              <strong className="text-gray-300">التأثير:</strong> <span className="text-gray-300">{achievement.impact}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
            {/* إحصائيات المستندات */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-blue-500/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-blue-400">إجمالي المستندات</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedDocumentsData.statistics.totalDocuments}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-green-500/30 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-green-400">المستندات النشطة</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedDocumentsData.statistics.activeDocuments}
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-orange-500/30 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-orange-400">تنتهي قريباً</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedDocumentsData.statistics.expiringSoon}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-purple-500/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
                <CardContent className="p-6 bg-gray-900/40 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-sm font-medium text-purple-400">قيد المراجعة</p>
                      <p className="text-2xl font-bold text-white">
                        {enhancedDocumentsData.statistics.pending}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* فئات المستندات */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-[#008C6A]" />
                    <span className="text-white">فئات المستندات</span>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={handleUploadDocument} size="sm" variant="outline" className="bg-gray-900/60 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50">
                      <Upload className="h-4 w-4 mr-2" />
                      رفع مستند
                    </Button>
                    <Button onClick={handleRequestDocument} size="sm" className="bg-[#008C6A] hover:bg-[#00694F] text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      طلب مستند
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                  {enhancedDocumentsData.categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Card 
                        key={category.id} 
                        className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-lg hover:shadow-[#008C6A]/20 transition-all duration-300 cursor-pointer rounded-xl overflow-hidden"
                        onClick={() => setSelectedDocumentsFilter(category.id)}
                      >
                        <CardContent className="p-4 bg-gray-900/40 relative">
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                          </div>
                          <div className="flex items-center gap-3 relative z-10">
                            <div className={`p-2 rounded-lg bg-gray-900/60 backdrop-blur-sm border border-${category.color}-500/30`}>
                              <IconComponent className={`h-5 w-5 text-${category.color}-400`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{category.name}</h4>
                              <p className="text-sm text-gray-300">{category.count} مستند</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* قائمة المستندات */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <FileIcon className="h-6 w-6 text-[#008C6A]" />
                    <span className="text-white">المستندات المتوفرة</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={selectedDocumentsFilter} onValueChange={setSelectedDocumentsFilter}>
                      <SelectTrigger className="w-48 bg-gray-900/60 border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="تصفية حسب الفئة" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                        <SelectItem value="all" className="text-white hover:bg-[#008C6A]/20">جميع المستندات</SelectItem>
                        <SelectItem value="personal" className="text-white hover:bg-[#008C6A]/20">المستندات الشخصية</SelectItem>
                        <SelectItem value="employment" className="text-white hover:bg-[#008C6A]/20">مستندات العمل</SelectItem>
                        <SelectItem value="financial" className="text-white hover:bg-[#008C6A]/20">المستندات المالية</SelectItem>
                        <SelectItem value="certificates" className="text-white hover:bg-[#008C6A]/20">الشهادات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="space-y-4 relative z-10">
                  {enhancedDocumentsData.documents.filter(doc => 
                    selectedDocumentsFilter === 'all' || doc.category === selectedDocumentsFilter
                  ).map((document) => (
                    <Card key={document.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-lg hover:shadow-[#008C6A]/20 transition-all duration-300 rounded-xl overflow-hidden">
                      <CardContent className="p-4 bg-gray-900/40 relative">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                        </div>
                        <div className="flex items-start justify-between relative z-10">
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-gray-900/60 backdrop-blur-sm rounded-lg border border-[#008C6A]/20">
                                <FileText className="h-6 w-6 text-[#008C6A]" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-lg text-white">{document.title}</h4>
                                  {document.isConfidential && (
                                    <Badge variant="secondary" className="text-xs bg-gray-900/60 border-yellow-500/30 text-yellow-400">
                                      <Shield className="h-3 w-3 mr-1" />
                                      سري
                                    </Badge>
                                  )}
                                  <Badge className={getDocumentStatusColor(document.status)}>
                                    {document.status}
                                  </Badge>
                                </div>
                                
                                <p className="text-gray-300 mb-3">{document.description}</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium text-gray-400">النوع:</span>
                                    <p className="text-white">{document.type}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">الحجم:</span>
                                    <p className="text-white">{document.size}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">تاريخ الرفع:</span>
                                    <p className="text-white">{new Date(document.uploadDate).toLocaleDateString('ar-SA')}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">مرات التحميل:</span>
                                    <p className="text-white">{document.downloadCount}</p>
                                  </div>
                                </div>

                                {document.expiryDate && (
                                  <div className="mt-3 p-3 bg-orange-900/60 backdrop-blur-sm border border-orange-500/30 rounded-lg">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4 text-orange-400" />
                                      <span className="text-sm font-medium text-orange-400">
                                        تاريخ الانتهاء: {new Date(document.expiryDate).toLocaleDateString('ar-SA')}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleViewDocumentDetails(document)}
                              variant="outline"
                              className="bg-gray-900/60 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              عرض
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleDownloadDocument(document)}
                              className="bg-[#008C6A] hover:bg-[#00694F] text-white"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              تحميل
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleShareDocument(document)}
                              variant="secondary"
                              className="bg-gray-900/60 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/50"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              مشاركة
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {enhancedDocumentsData.documents.filter(doc => 
                  selectedDocumentsFilter === 'all' || doc.category === selectedDocumentsFilter
                ).length === 0 && (
                  <div className="text-center py-8 relative z-10">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-white">لا توجد مستندات</h3>
                    <p className="text-gray-300 mb-4">
                      لم يتم العثور على مستندات في هذه الفئة
                    </p>
                    <Button onClick={handleUploadDocument} className="bg-[#008C6A] hover:bg-[#00694F] text-white">
                      <Upload className="h-4 w-4 mr-2" />
                      رفع مستند جديد
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* إحصائيات الاستخدام */}
            <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
              <CardHeader className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <CardTitle className="flex items-center gap-2 relative z-10">
                  <BarChart3 className="h-6 w-6 text-[#008C6A]" />
                  <span className="text-white">إحصائيات المستندات</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-900/40 relative">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  <div className="text-center p-4 bg-blue-900/60 backdrop-blur-sm rounded-lg border border-blue-500/30">
                    <Download className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-400">إجمالي التحميلات</h4>
                    <p className="text-2xl font-bold text-white">
                      {enhancedDocumentsData.documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-900/60 backdrop-blur-sm rounded-lg border border-green-500/30">
                    <FileCheck className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-400">المستندات المفعلة</h4>
                    <p className="text-2xl font-bold text-white">
                      {enhancedDocumentsData.documents.filter(doc => doc.status === 'نشط').length}
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-900/60 backdrop-blur-sm rounded-lg border border-orange-500/30">
                    <AlertTriangle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-orange-400">تحتاج تجديد</h4>
                    <p className="text-2xl font-bold text-white">
                      {enhancedDocumentsData.documents.filter(doc => doc.status === 'ينتهي قريباً').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>

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
      </main>
    </div>
  );
};

export default EmployeePortal;