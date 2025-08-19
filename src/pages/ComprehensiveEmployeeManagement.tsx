import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Users, 
  UserPlus, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  Award,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Bell,
  BookOpen,
  Gavel,
  Eye,
  Edit,
  Trash2,
  Plus,
  Star,
  TrendingUp,
  BarChart3,
  PieChart,
  RefreshCw,
  CheckCircle2,
  Clock,
  DollarSign,
  Building2,
  Mail,
  Phone,
  MapPin,
  Save,
  X,
  Zap,
  Target,
  Activity,
  CheckCircle,
  XCircle,
  Check,
  User,
  Laptop,
  Shield,
  Heart,
  Camera,
  FileImage,
  Briefcase,
  GraduationCap,
  MessageSquare,
  ClipboardList,
  Calendar as CalendarIcon,
  Timer,
  PenTool,
  Video,
  FileBarChart,
  CalendarClock,
  Gift,
  Building,
  Globe,
  Network,
  Banknote,
  Scale,
  Bot,
  CheckSquare,
  Megaphone
} from 'lucide-react';
import { DepartmentsManagement } from '@/components/departments/DepartmentsManagement';
import TrainingDevelopment from '@/components/employee/TrainingDevelopment';
import SmartHire from '@/pages/SmartHire';
import { SmartEvaluations } from '@/components/evaluation/SmartEvaluations';
import MeetingHub from '@/pages/MeetingHub';
import AttendanceDashboard from '@/components/attendance/AttendanceDashboard';
import AttendanceRealTimeClock from '@/components/attendance/AttendanceRealTimeClock';
import AttendanceCalendar from '@/components/attendance/AttendanceCalendar';
import ShiftManagement from '@/components/attendance/ShiftManagement';
import AttendanceReports from '@/components/attendance/AttendanceReports';
import { GovernmentIntegration } from '@/components/systems/GovernmentIntegration';
import { OrganizationalStructure } from '@/components/systems/OrganizationalStructure';
import { WageProtectionSystem } from '@/components/systems/WageProtectionSystem';
import { LegalAffairs } from '@/components/systems/LegalAffairs';
import { InsuranceManagement } from '@/components/systems/InsuranceManagement';
import { RewardsIncentives } from '@/components/systems/RewardsIncentives';
import { ElectronicSignature } from '@/components/systems/ElectronicSignature';
import { TasksTracking } from '@/components/systems/TasksTracking';
import TeamMembers from '@/components/systems/TeamMembers';

const ComprehensiveEmployeeManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);

  // Mock data for comprehensive employee management
  const [employees, setEmployees] = useState([
    {
      id: 'EMP001',
      name: 'أحمد محمد العلي',
      position: 'مطور برمجيات أول',
      department: 'تقنية المعلومات',
      status: 'نشط',
      joinDate: '2023-01-15',
      contractType: 'دوام كامل',
      workLocation: 'المكتب الرئيسي',
      manager: 'محمد السالم',
      directReports: 2,
      avatar: '/placeholder.svg',
      email: 'ahmed.ali@company.com',
      phone: '+966501234567',
      emergencyContact: 'سارة العلي - +966509876543',
      nationalId: '1234567890',
      iqamaNumber: 'A123456789',
      passportNumber: 'P123456789',
      nationality: 'سعودي',
      dateOfBirth: '1990-05-15',
      address: 'الرياض، حي النرجس، شارع الملك فهد',
      maritalStatus: 'متزوج',
      education: 'بكالوريوس علوم الحاسب',
      university: 'جامعة الملك سعود',
      graduationYear: '2015',
      previousExperience: '5 سنوات',
      salary: {
        basic: 12000,
        housing: 2000,
        transport: 800,
        other: 500,
        total: 15300
      },
      benefits: {
        medicalInsurance: true,
        lifeInsurance: true,
        endOfServiceBenefit: true,
        annualLeave: 30,
        sickLeave: 30
      },
      performance: {
        currentRating: 4.5,
        lastReviewDate: '2024-06-15',
        goals: 8,
        goalsCompleted: 6,
        strengths: ['القيادة', 'حل المشاكل', 'التعلم السريع'],
        areasForImprovement: ['إدارة الوقت', 'التواصل مع العملاء']
      },
      attendance: {
        thisMonth: {
          present: 20,
          absent: 1,
          late: 2,
          earlyLeave: 0,
          attendanceRate: 95
        },
        thisYear: {
          totalWorkDays: 240,
          present: 230,
          absent: 5,
          late: 8,
          attendanceRate: 96
        }
      },
      leaves: {
        annual: { total: 30, used: 12, remaining: 18 },
        sick: { total: 30, used: 3, remaining: 27 },
        emergency: { total: 5, used: 1, remaining: 4 },
        maternity: { total: 0, used: 0, remaining: 0 }
      },
      disciplinary: {
        totalViolations: 0,
        warnings: 0,
        lastIncidentDate: null,
        status: 'نظيف'
      },
      training: {
        completedCourses: 8,
        requiredCourses: 2,
        certifications: ['AWS Solutions Architect', 'PMP'],
        nextTraining: 'DevOps Fundamentals - 2024-04-15'
      },
      documents: {
        contract: true,
        nationalId: true,
        passport: true,
        medicalCertificate: true,
        educationCertificate: true,
        experienceLetter: true
      }
    }
    // Add more employees...
  ]);

  // Employee requests data
  const [employeeRequests, setEmployeeRequests] = useState([
    {
      id: 'REQ001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      requestType: 'إجازة سنوية',
      startDate: '2024-04-15',
      endDate: '2024-04-20',
      days: 5,
      reason: 'سفر عائلي',
      status: 'في انتظار الموافقة',
      priority: 'متوسط',
      submittedDate: '2024-03-20',
      managerComments: '',
      documents: []
    }
    // Add more requests...
  ]);

  // System statistics
  const stats = {
    totalEmployees: 245,
    activeEmployees: 238,
    newHires: 12,
    onLeave: 7,
    pendingRequests: 15,
    disciplinaryCases: 2,
    trainingProgress: 78,
    attendanceRate: 94.5
  };

  const departments = [
    'تقنية المعلومات',
    'المالية',
    'الموارد البشرية',
    'المبيعات',
    'التسويق',
    'العمليات',
    'خدمة العملاء'
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsViewEmployeeOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'نشط': 'bg-green-100 text-green-800 border-green-200',
      'في إجازة': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'متوقف': 'bg-red-100 text-red-800 border-red-200',
      'منتهي الخدمة': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-[#009F87]/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <div className="relative border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-20 items-center px-6">
          {/* BOUD Logo */}
          <div className="flex items-center gap-4 ml-4">
            <img 
              src="/lovable-uploads/2d27423b-8bca-468b-802c-9a3666f5fe90.png" 
              alt="شعار بُعد BOUD HR" 
              className="h-12 w-auto"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4 hover:bg-[#009F87]/10"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#009F87]/10 rounded-lg">
              <Users className="h-6 w-6 text-[#009F87]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#009F87]">نظام إدارة الموظفين الشامل</h1>
              <p className="text-sm text-muted-foreground">إدارة احترافية لدورة حياة الموظف الكاملة</p>
            </div>
          </div>
          <div className="mr-auto flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-[#009F87] hover:text-white transition-colors"
            >
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث البيانات
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-[#009F87] hover:text-white transition-colors"
            >
              <Download className="h-4 w-4 ml-2" />
              تصدير التقارير
            </Button>
            <Button 
              size="sm"
              className="bg-[#009F87] hover:bg-[#008072] text-white shadow-lg hover:shadow-xl transition-all"
            >
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة موظف جديد
            </Button>
          </div>
        </div>
      </div>

      <div className="relative p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Professional Horizontal Navigation - Optimized for 22 Icons */}
          <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg p-4 mb-6">
            <div className="horizontal-icon-nav overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#009F87 transparent' }}>
              <TabsList className="flex w-max gap-3 bg-transparent p-0 h-auto min-w-max">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <BarChart3 className="h-4 w-4 ml-2 flex-shrink-0" />
                  لوحة التحكم
                </TabsTrigger>
                <TabsTrigger 
                  value="employees" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Users className="h-4 w-4 ml-2 flex-shrink-0" />
                  فريق العمل
                </TabsTrigger>
                <TabsTrigger 
                  value="departments" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Building className="h-4 w-4 ml-2 flex-shrink-0" />
                  الإدارات والاقسام
                </TabsTrigger>
                <TabsTrigger 
                  value="attendance" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Clock className="h-4 w-4 ml-2 flex-shrink-0" />
                  الحضور والانصراف
                </TabsTrigger>
                <TabsTrigger 
                  value="disciplinary" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <AlertTriangle className="h-4 w-4 ml-2 flex-shrink-0" />
                  الجزاءات والعقوبات
                </TabsTrigger>
                <TabsTrigger 
                  value="leaves" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
                  الإجازات والعطلات
                </TabsTrigger>
                <TabsTrigger 
                  value="payroll" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <DollarSign className="h-4 w-4 ml-2 flex-shrink-0" />
                  الرواتب والأجور
                </TabsTrigger>
                <TabsTrigger 
                  value="government" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Globe className="h-4 w-4 ml-2 flex-shrink-0" />
                  التكامل الحكومي
                </TabsTrigger>
                <TabsTrigger 
                  value="organization" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Network className="h-4 w-4 ml-2 flex-shrink-0" />
                  التنظيم المؤسسي
                </TabsTrigger>
                <TabsTrigger 
                  value="wageprotection" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Banknote className="h-4 w-4 ml-2 flex-shrink-0" />
                  حماية الأجور
                </TabsTrigger>
                <TabsTrigger 
                  value="legal" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Scale className="h-4 w-4 ml-2 flex-shrink-0" />
                  الشؤون القانونية
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Target className="h-4 w-4 ml-2 flex-shrink-0" />
                  تقييم الأداء
                </TabsTrigger>
                <TabsTrigger 
                  value="training" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <GraduationCap className="h-4 w-4 ml-2 flex-shrink-0" />
                  التدريب والتطوير
                </TabsTrigger>
                <TabsTrigger 
                  value="recruitment" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <UserPlus className="h-4 w-4 ml-2 flex-shrink-0" />
                  التوظيف والتعين
                </TabsTrigger>
                <TabsTrigger 
                  value="insurance" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Shield className="h-4 w-4 ml-2 flex-shrink-0" />
                  التأمين
                </TabsTrigger>
                <TabsTrigger 
                  value="benefits" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Gift className="h-4 w-4 ml-2 flex-shrink-0" />
                  المكافآت والحوافز
                </TabsTrigger>
                <TabsTrigger 
                  value="meetings" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <CalendarClock className="h-4 w-4 ml-2 flex-shrink-0" />
                  الاجتماعات
                </TabsTrigger>
                <TabsTrigger 
                  value="signature" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <PenTool className="h-4 w-4 ml-2 flex-shrink-0" />
                  التوقيع الإلكتروني
                </TabsTrigger>
                <TabsTrigger 
                  value="tasks" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <CheckSquare className="h-4 w-4 ml-2 flex-shrink-0" />
                  المهام والمتابعة
                </TabsTrigger>
                <TabsTrigger 
                  value="requests" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Megaphone className="h-4 w-4 ml-2 flex-shrink-0" />
                  الطلبات والاشعارات
                </TabsTrigger>
                <TabsTrigger 
                  value="ai" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Bot className="h-4 w-4 ml-2 flex-shrink-0" />
                  الذكاء الاصطناعي
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <FileBarChart className="h-4 w-4 ml-2 flex-shrink-0" />
                  التقارير
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Navigation Helper */}
            <div className="flex justify-center mt-2">
              <p className="text-xs text-muted-foreground">اسحب لليمين أو اليسار لعرض جميع الأنظمة (22 نظام)</p>
            </div>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-[#009F87]" />
                  </div>
                  <div className="text-2xl font-bold text-[#009F87]">{stats.totalEmployees}</div>
                  <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-green-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.1s'}}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{stats.activeEmployees}</div>
                  <div className="text-sm text-muted-foreground">الموظفين النشطين</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-blue-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <UserPlus className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{stats.newHires}</div>
                  <div className="text-sm text-muted-foreground">موظفين جدد</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-yellow-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.3s'}}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">{stats.onLeave}</div>
                  <div className="text-sm text-muted-foreground">في إجازة</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-orange-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.4s'}}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Bell className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</div>
                  <div className="text-sm text-muted-foreground">طلبات معلقة</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-red-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.5s'}}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-600">{stats.disciplinaryCases}</div>
                  <div className="text-sm text-muted-foreground">حالات تأديبية</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-purple-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.6s'}}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{stats.trainingProgress}%</div>
                  <div className="text-sm text-muted-foreground">تقدم التدريب</div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-teal-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.7s'}}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-teal-600">{stats.attendanceRate}%</div>
                  <div className="text-sm text-muted-foreground">معدل الحضور</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 animate-slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Zap className="h-6 w-6" />
                  الإجراءات السريعة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-[#009F87] hover:text-white transition-all hover:scale-105"
                    onClick={() => setActiveTab('employees')}
                  >
                    <UserPlus className="h-6 w-6" />
                    إضافة موظف
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-[#009F87] hover:text-white transition-all hover:scale-105"
                    onClick={() => setActiveTab('attendance')}
                  >
                    <Clock className="h-6 w-6" />
                    إدارة الحضور
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-[#009F87] hover:text-white transition-all hover:scale-105"
                    onClick={() => setActiveTab('requests')}
                  >
                    <FileText className="h-6 w-6" />
                    مراجعة الطلبات
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-[#009F87] hover:text-white transition-all hover:scale-105"
                    onClick={() => setActiveTab('reports')}
                  >
                    <BarChart3 className="h-6 w-6" />
                    التقارير
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 animate-slide-in-left">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#009F87]">
                    <Activity className="h-6 w-6" />
                    الأنشطة الأخيرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">تم توظيف موظف جديد</p>
                        <p className="text-sm text-muted-foreground">سارة أحمد - قسم المالية</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">طلب إجازة جديد</p>
                        <p className="text-sm text-muted-foreground">أحمد محمد - إجازة سنوية</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">تقييم أداء مستحق</p>
                        <p className="text-sm text-muted-foreground">5 موظفين - مراجعة ربع سنوية</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 animate-slide-in-right">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#009F87]">
                    <TrendingUp className="h-6 w-6" />
                    مؤشرات الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">معدل الحضور الشهري</span>
                        <span className="text-sm text-muted-foreground">94.5%</span>
                      </div>
                      <Progress value={94.5} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">رضا الموظفين</span>
                        <span className="text-sm text-muted-foreground">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">اكتمال التدريب</span>
                        <span className="text-sm text-muted-foreground">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">معدل دوران الموظفين</span>
                        <span className="text-sm text-muted-foreground">3.2%</span>
                      </div>
                      <Progress value={3.2} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Employees Tab - Team Members */}
          <TabsContent value="employees" className="space-y-6">
            <TeamMembers />
          </TabsContent>

          {/* Other tabs will be implemented here... */}
          <TabsContent value="attendance" className="space-y-6">
            {/* Attendance Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">موجود اليوم</p>
                      <p className="text-3xl font-bold text-green-700">238</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">متأخرين</p>
                      <p className="text-3xl font-bold text-yellow-700">12</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-600 text-sm font-medium">غائب</p>
                      <p className="text-3xl font-bold text-red-700">7</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">في إجازة</p>
                      <p className="text-3xl font-bold text-blue-700">15</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Management Tabs */}
            <Tabs defaultValue="real-time" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur">
                <TabsTrigger value="real-time" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                  ساعة الحضور
                </TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                  التقويم
                </TabsTrigger>
                <TabsTrigger value="shifts" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                  إدارة المناوبات
                </TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                  التقارير
                </TabsTrigger>
              </TabsList>

              {/* Real-Time Clock Tab */}
              <TabsContent value="real-time" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#009F87]">
                      <Timer className="h-6 w-6" />
                      ساعة الحضور والانصراف الذكية
                    </CardTitle>
                    <CardDescription>
                      تسجيل الحضور في الوقت الفعلي مع التحقق من الموقع الجغرافي
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AttendanceRealTimeClock 
                      employeeId="EMP001"
                      onCheckIn={(data) => {
                        console.log('Check In:', data);
                        toast.success('تم تسجيل الحضور بنجاح');
                      }}
                      onCheckOut={(data) => {
                        console.log('Check Out:', data);
                        toast.success('تم تسجيل الانصراف بنجاح');
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Calendar Tab */}
              <TabsContent value="calendar" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#009F87]">
                      <CalendarIcon className="h-6 w-6" />
                      تقويم الحضور (هجري وميلادي)
                    </CardTitle>
                    <CardDescription>
                      عرض تقويم شامل للحضور والانصراف مع إمكانية التبديل بين التقويم الهجري والميلادي
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AttendanceCalendar />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Shifts Management Tab */}
              <TabsContent value="shifts" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#009F87]">
                      <Users className="h-6 w-6" />
                      إدارة المناوبات وأنواع الدوام
                    </CardTitle>
                    <CardDescription>
                      إنشاء وإدارة جداول المناوبات المختلفة (ثابت، متناوب، مرن، عن بُعد)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ShiftManagement />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#009F87]">
                      <FileBarChart className="h-6 w-6" />
                      تقارير الحضور والانصراف
                    </CardTitle>
                    <CardDescription>
                      تقارير شاملة ومفصلة عن حضور الموظفين مع إمكانية التصدير
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AttendanceReports />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <TrainingDevelopment />
          </TabsContent>

          {/* Recruitment Tab */}
          <TabsContent value="recruitment" className="space-y-6">
            <SmartHire />
          </TabsContent>

          {/* Performance Tab - Smart Evaluations System */}
          <TabsContent value="performance" className="space-y-6">
            <SmartEvaluations />
          </TabsContent>

          {/* Electronic Signature Tab */}
          <TabsContent value="signature" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <PenTool className="h-6 w-6" />
                  نظام التوقيع الإلكتروني
                </CardTitle>
                <CardDescription>
                  توقيع وإدارة المستندات إلكترونياً بأمان عالي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <PenTool className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام التوقيع الإلكتروني هنا</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    يشمل: توقيع المستندات، إدارة العقود، تتبع التوقيعات، والمصادقة الرقمية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meetings Tab - Smart Meetings System */}
          <TabsContent value="meetings" className="space-y-6">
            <MeetingHub />
          </TabsContent>

          {/* Disciplinary Tab */}
          <TabsContent value="disciplinary" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <AlertTriangle className="h-6 w-6" />
                  نظام الجزاءات والتأديب
                </CardTitle>
                <CardDescription>
                  إدارة المخالفات والإجراءات التأديبية للموظفين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام الجزاءات والتأديب هنا</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    يشمل: تسجيل المخالفات، الإنذارات، الخصومات، والتقارير التأديبية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payroll Tab */}
          <TabsContent value="payroll" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <DollarSign className="h-6 w-6" />
                  نظام إدارة الرواتب والمستحقات
                </CardTitle>
                <CardDescription>
                  إدارة شاملة للرواتب والمستحقات المالية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام الرواتب هنا</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    يشمل: حساب الرواتب، البدلات، الخصومات، وكشوف المرتبات الشهرية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Shield className="h-6 w-6" />
                  نظام إدارة التأمينات
                </CardTitle>
                <CardDescription>
                  إدارة التأمين الطبي والاجتماعي للموظفين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام التأمينات هنا</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    يشمل: التأمين الطبي، التأمين الاجتماعي، والمطالبات التأمينية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Benefits Tab */}
          <TabsContent value="benefits" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Gift className="h-6 w-6" />
                  نظام المزايا والحوافز
                </CardTitle>
                <CardDescription>
                  إدارة المكافآت والحوافز والمزايا الإضافية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Gift className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام المزايا والحوافز هنا</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    يشمل: المكافآت، الحوافز، البدلات الإضافية، وبرامج المزايا
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <FileText className="h-6 w-6" />
                  نظام إدارة الطلبات
                </CardTitle>
                <CardDescription>
                  إدارة جميع طلبات الموظفين والموافقات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام إدارة الطلبات هنا</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    يشمل: طلبات الإجازات، الشهادات، التنقلات، والموافقات الإدارية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <FileBarChart className="h-6 w-6" />
                  نظام التقارير والتحليلات
                </CardTitle>
                <CardDescription>
                  تقارير شاملة وتحليلات متقدمة لبيانات الموارد البشرية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileBarChart className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام التقارير هنا</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    يشمل: تقارير الحضور، الأداء، الرواتب، والتحليلات الإحصائية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaves Tab */}
          <TabsContent value="leaves" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Calendar className="h-6 w-6" />
                  نظام إدارة الإجازات
                </CardTitle>
                <CardDescription>
                  إدارة شاملة لجميع أنواع الإجازات والغيابات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام إدارة الإجازات هنا</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    يشمل: الإجازات السنوية، المرضية، الطارئة، والموافقات التلقائية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Building className="h-6 w-6" />
                  إدارة الإدارات والأقسام
                </CardTitle>
                <CardDescription>
                  تنظيم وإدارة هيكل الشركة والأقسام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DepartmentsManagement onBack={() => setActiveTab('dashboard')} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Government Integration Tab */}
          <TabsContent value="government" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Globe className="h-6 w-6" />
                  التكامل الحكومي
                </CardTitle>
                <CardDescription>
                  ربط مع الأنظمة الحكومية والجهات الرسمية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Globe className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام التكامل الحكومي هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organization Tab */}
          <TabsContent value="organization" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Network className="h-6 w-6" />
                  التنظيم المؤسسي
                </CardTitle>
                <CardDescription>
                  هيكلة وتنظيم المؤسسة والعمليات الإدارية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Network className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام التنظيم المؤسسي هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wage Protection Tab */}
          <TabsContent value="wageprotection" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Banknote className="h-6 w-6" />
                  حماية الأجور
                </CardTitle>
                <CardDescription>
                  نظام حماية الأجور والامتثال للقوانين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Banknote className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام حماية الأجور هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Legal Tab */}
          <TabsContent value="legal" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Scale className="h-6 w-6" />
                  الشؤون القانونية
                </CardTitle>
                <CardDescription>
                  إدارة الشؤون القانونية والقضايا العمالية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Scale className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام الشؤون القانونية هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <CheckSquare className="h-6 w-6" />
                  المهام والمتابعة
                </CardTitle>
                <CardDescription>
                  إدارة المهام ومتابعة التقدم والإنجازات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CheckSquare className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام إدارة المهام هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <img 
                    src="/lovable-uploads/2d27423b-8bca-468b-802c-9a3666f5fe90.png" 
                    alt="شعار بُعد BOUD HR" 
                    className="h-6 w-auto"
                  />
                  الذكاء الاصطناعي
                </CardTitle>
                <CardDescription>
                  مساعد ذكي وتحليلات متقدمة بالذكاء الاصطناعي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <img 
                    src="/lovable-uploads/2d27423b-8bca-468b-802c-9a3666f5fe90.png" 
                    alt="شعار بُعد BOUD HR" 
                    className="h-16 w-auto mx-auto mb-4 opacity-50"
                  />
                  <p className="text-muted-foreground">سيتم تطوير نظام الذكاء الاصطناعي هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Employee Details Dialog */}
        <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-[#009F87]">
                <User className="h-6 w-6" />
                ملف الموظف الشامل
              </DialogTitle>
              <DialogDescription>
                عرض تفصيلي لجميع معلومات الموظف وسجل أدائه
              </DialogDescription>
            </DialogHeader>
            
            {selectedEmployee && (
              <div className="space-y-6">
                {/* Employee Header */}
                <div className="flex items-center gap-4 p-4 bg-[#009F87]/5 rounded-lg">
                  <Avatar className="h-20 w-20 border-4 border-[#009F87]/20">
                    <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
                    <AvatarFallback className="bg-[#009F87]/10 text-[#009F87] text-xl">
                      {selectedEmployee.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#009F87]">{selectedEmployee.name}</h2>
                    <p className="text-lg text-muted-foreground">{selectedEmployee.position}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="bg-[#009F87]/10 text-[#009F87]">{selectedEmployee.id}</Badge>
                      {getStatusBadge(selectedEmployee.status)}
                      <Badge variant="outline">{selectedEmployee.department}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">تاريخ الانضمام</div>
                    <div className="font-semibold">{selectedEmployee.joinDate}</div>
                    <div className="text-sm text-muted-foreground mt-1">سنوات الخدمة</div>
                    <div className="font-semibold">{(new Date().getFullYear() - new Date(selectedEmployee.joinDate).getFullYear())} سنة</div>
                  </div>
                </div>

                {/* Detailed Information Tabs */}
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="personal">شخصية</TabsTrigger>
                    <TabsTrigger value="job">وظيفية</TabsTrigger>
                    <TabsTrigger value="performance">الأداء</TabsTrigger>
                    <TabsTrigger value="attendance">الحضور</TabsTrigger>
                    <TabsTrigger value="leaves">الإجازات</TabsTrigger>
                    <TabsTrigger value="documents">المستندات</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">المعلومات الشخصية</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الهوية الوطنية:</span>
                            <span className="font-medium">{selectedEmployee.nationalId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">تاريخ الميلاد:</span>
                            <span className="font-medium">{selectedEmployee.dateOfBirth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الجنسية:</span>
                            <span className="font-medium">{selectedEmployee.nationality}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الحالة الاجتماعية:</span>
                            <span className="font-medium">{selectedEmployee.maritalStatus}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">معلومات الاتصال</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">البريد الإلكتروني:</span>
                            <span className="font-medium">{selectedEmployee.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الهاتف:</span>
                            <span className="font-medium">{selectedEmployee.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">جهة الاتصال الطارئ:</span>
                            <span className="font-medium text-sm">{selectedEmployee.emergencyContact}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">العنوان:</span>
                            <p className="font-medium text-sm mt-1">{selectedEmployee.address}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="job" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">معلومات الوظيفة</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">المنصب:</span>
                            <span className="font-medium">{selectedEmployee.position}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">القسم:</span>
                            <span className="font-medium">{selectedEmployee.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">المدير المباشر:</span>
                            <span className="font-medium">{selectedEmployee.manager}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">نوع العقد:</span>
                            <span className="font-medium">{selectedEmployee.contractType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">مكان العمل:</span>
                            <span className="font-medium">{selectedEmployee.workLocation}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">الراتب والمزايا</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الراتب الأساسي:</span>
                            <span className="font-medium">{selectedEmployee.salary.basic.toLocaleString()} ريال</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">بدل السكن:</span>
                            <span className="font-medium">{selectedEmployee.salary.housing.toLocaleString()} ريال</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">بدل المواصلات:</span>
                            <span className="font-medium">{selectedEmployee.salary.transport.toLocaleString()} ريال</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-muted-foreground font-semibold">إجمالي الراتب:</span>
                            <span className="font-bold text-[#009F87]">{selectedEmployee.salary.total.toLocaleString()} ريال</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="performance" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-[#009F87]" />
                          تقييم الأداء الذكي
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#009F87]">{selectedEmployee.performance.currentRating}/5</div>
                            <div className="text-sm text-muted-foreground">التقييم الحالي</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{selectedEmployee.performance.goalsCompleted}/{selectedEmployee.performance.goals}</div>
                            <div className="text-sm text-muted-foreground">الأهداف المنجزة</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{selectedEmployee.performance.lastReviewDate}</div>
                            <div className="text-sm text-muted-foreground">آخر مراجعة</div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">نقاط القوة:</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedEmployee.performance.strengths.map((strength, index) => (
                                <Badge key={index} className="bg-green-100 text-green-800">{strength}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">مجالات التحسين:</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedEmployee.performance.areasForImprovement.map((area, index) => (
                                <Badge key={index} className="bg-orange-100 text-orange-800">{area}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Add more tab contents... */}
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};

export default ComprehensiveEmployeeManagement;
