import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDownloadPrint } from '@/hooks/useDownloadPrint';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
  Timer,
  CreditCard,
  GraduationCap,
  Briefcase,
  UserX,
  UserCheck,
  TrendingDown,
  Calculator,
  ClipboardList,
  FileCheck,
  MessageSquare,
  Shield,
  Heart,
  Camera,
  Gift,
  PenTool
} from 'lucide-react';

// Import comprehensive components
import AttendanceManagement from '@/components/employee/AttendanceManagement';
import LeaveManagement from '@/components/employee/LeaveManagement';
import PayrollCompensation from '@/components/employee/PayrollCompensation';
import PerformanceManagement from '@/components/employee/PerformanceManagement';
import TrainingDevelopment from '@/components/employee/TrainingDevelopment';
import OffboardingSystem from '@/components/employee/OffboardingSystem';
import RecruitmentOnboarding from '@/components/employee/RecruitmentOnboarding';
import InsuranceManagement from '@/components/employee/InsuranceManagement';
import BenefitsRewards from '@/components/employee/BenefitsRewards';
import DisciplinarySystem from '@/components/employee/DisciplinarySystem';
import SmartDashboard from '@/components/employee/SmartDashboard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const EmployeeManagementSystem = () => {
  const navigate = useNavigate();
  const { downloadFile, printData } = useDownloadPrint();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    salary: '',
    nationalId: '',
    address: ''
  });

  // بيانات وهمية للموظفين
  const [employees, setEmployees] = useState([
    {
      id: '001',
      name: 'أحمد محمد العلي',
      position: 'مطور برمجيات',
      department: 'تقنية المعلومات',
      status: 'نشط',
      joinDate: '2023-01-15',
      disciplinaryRecord: 0,
      avatar: '/placeholder.svg',
      email: 'ahmed.ali@company.com',
      phone: '+966501234567',
      salary: 12000,
      nationalId: '1234567890',
      address: 'الرياض، المملكة العربية السعودية',
      performance: 95,
      yearsOfService: 1.2,
      lastPromotion: '2023-06-15',
      manager: 'محمد السالم',
      totalLeaves: 15,
      usedLeaves: 5,
      emergencyContact: 'سارة العلي - +966509876543'
    },
    {
      id: '002',
      name: 'فاطمة سعد الأحمد',
      position: 'محاسبة',
      department: 'المالية',
      status: 'نشط',
      joinDate: '2022-08-10',
      disciplinaryRecord: 1,
      avatar: '/placeholder.svg',
      email: 'fatima.ahmed@company.com',
      phone: '+966502345678',
      salary: 9500,
      nationalId: '2345678901',
      address: 'جدة، المملكة العربية السعودية',
      performance: 88,
      yearsOfService: 1.6,
      lastPromotion: '2023-01-10',
      manager: 'خالد المطيري',
      totalLeaves: 15,
      usedLeaves: 8,
      emergencyContact: 'أحمد الأحمد - +966508765432'
    },
    {
      id: '003',
      name: 'خالد يوسف النمر',
      position: 'مدير مبيعات',
      department: 'المبيعات',
      status: 'في إجازة',
      joinDate: '2021-03-20',
      disciplinaryRecord: 0,
      avatar: '/placeholder.svg',
      email: 'khalid.alnamir@company.com',
      phone: '+966503456789',
      salary: 15000,
      nationalId: '3456789012',
      address: 'الدمام، المملكة العربية السعودية',
      performance: 92,
      yearsOfService: 2.8,
      lastPromotion: '2022-12-01',
      manager: 'سعد العتيبي',
      totalLeaves: 20,
      usedLeaves: 12,
      emergencyContact: 'نورا النمر - +966507654321'
    },
    {
      id: '004',
      name: 'نورا محمد السعد',
      position: 'مصممة جرافيك',
      department: 'التسويق',
      status: 'نشط',
      joinDate: '2023-02-01',
      disciplinaryRecord: 0,
      avatar: '/placeholder.svg',
      email: 'nora.alsaad@company.com',
      phone: '+966504567890',
      salary: 8500,
      nationalId: '4567890123',
      address: 'مكة المكرمة، المملكة العربية السعودية',
      performance: 90,
      yearsOfService: 1.0,
      lastPromotion: null,
      manager: 'عبدالله القحطاني',
      totalLeaves: 15,
      usedLeaves: 3,
      emergencyContact: 'محمد السعد - +966506543210'
    },
    {
      id: '005',
      name: 'سامي علي الزهراني',
      position: 'مطور واجهات المستخدم',
      department: 'تقنية المعلومات',
      status: 'نشط',
      joinDate: '2022-11-15',
      disciplinaryRecord: 0,
      avatar: '/placeholder.svg',
      email: 'sami.alzahrani@company.com',
      phone: '+966505678901',
      salary: 11000,
      nationalId: '5678901234',
      address: 'الطائف، المملكة العربية السعودية',
      performance: 87,
      yearsOfService: 1.3,
      lastPromotion: '2023-08-01',
      manager: 'محمد السالم',
      totalLeaves: 15,
      usedLeaves: 7,
      emergencyContact: 'علي الزهراني - +966505432109'
    }
  ]);

  // بيانات طلبات الموظفين
  const [employeeRequests, setEmployeeRequests] = useState([
    {
      id: 1,
      employeeName: 'أحمد محمد السعيد',
      department: 'تقنية المعلومات',
      requestType: 'إجازة سنوية',
      description: 'طلب إجازة سنوية لمدة أسبوعين للسفر مع العائلة',
      startDate: '2024-08-15',
      endDate: '2024-08-29',
      submitDate: '2024-08-01',
      status: 'pending',
      priority: 'medium',
      email: 'ahmed.mohammed@company.com',
      phone: '+966501234567'
    },
    {
      id: 2,
      employeeName: 'فاطمة أحمد علي',
      department: 'المبيعات',
      requestType: 'إجازة مرضية',
      description: 'طلب إجازة مرضية لمدة 3 أيام بسبب حالة صحية طارئة',
      startDate: '2024-08-05',
      endDate: '2024-08-07',
      submitDate: '2024-08-04',
      status: 'approved',
      priority: 'high',
      email: 'fatima.ahmed@company.com',
      phone: '+966502345678'
    },
    {
      id: 3,
      employeeName: 'محمد علي حسن',
      department: 'التسويق',
      requestType: 'تغيير ساعات العمل',
      description: 'طلب تغيير ساعات العمل لتتناسب مع ظروف شخصية',
      startDate: '2024-08-10',
      endDate: '',
      submitDate: '2024-08-03',
      status: 'rejected',
      priority: 'low',
      email: 'mohammed.ali@company.com',
      phone: '+966503456789'
    },
    {
      id: 4,
      employeeName: 'سارة محمود طه',
      department: 'الموارد البشرية',
      requestType: 'إجازة أمومة',
      description: 'طلب إجازة أمومة لمدة 10 أسابيع',
      startDate: '2024-09-01',
      endDate: '2024-11-10',
      submitDate: '2024-08-02',
      status: 'pending',
      priority: 'high',
      email: 'sara.mahmoud@company.com',
      phone: '+966504567890'
    },
    {
      id: 5,
      employeeName: 'خالد سعد الدين',
      department: 'المالية',
      requestType: 'تدريب خارجي',
      description: 'طلب حضور دورة تدريبية في إدارة المخاطر المالية',
      startDate: '2024-08-20',
      endDate: '2024-08-22',
      submitDate: '2024-08-01',
      status: 'approved',
      priority: 'medium',
      email: 'khalid.saad@company.com',
      phone: '+966505678901'
    }
  ]);

  // إحصائيات النظام
  const stats = {
    totalEmployees: 152,
    activeEmployees: 145,
    onLeave: 7,
    pendingDisciplinary: 3,
    newRequests: 12
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'في إجازة':
        return <Badge className="bg-yellow-100 text-yellow-800">في إجازة</Badge>;
      case 'متوقف':
        return <Badge className="bg-red-100 text-red-800">متوقف</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRequestStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">في انتظار الموافقة</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">موافق عليه</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">مرفوض</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const getRequestPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">عالي</Badge>;
      case 'medium':
        return <Badge variant="secondary">متوسط</Badge>;
      case 'low':
        return <Badge variant="outline">منخفض</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  // وظائف المعالجة التفاعلية
  const handleAddEmployee = () => {
    setIsAddEmployeeOpen(true);
    toast.success('فتح نموذج إضافة موظف جديد');
  };

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsViewEmployeeOpen(true);
    toast.info(`عرض تفاصيل الموظف: ${employee.name}`);
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditEmployeeOpen(true);
    toast.info(`تحرير بيانات الموظف: ${employee.name}`);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      toast.success(`تم حذف الموظف: ${employee.name}`);
    }
  };

  const handleDisciplinaryAction = (type: string) => {
    toast.info(`تم تطبيق إجراء: ${type}`);
  };

  // Handle request type selection
  const handleRequestClick = (requestType: string) => {
    setSelectedRequestType(requestType);
    setShowRequestDialog(true);
    toast.info(`فتح نموذج ${getRequestTitle(requestType)}`);
  };

  // Get request title based on type
  const getRequestTitle = (type: string) => {
    const titles = {
      leave: 'طلب إجازة',
      salary_certificate: 'طلب شهادة راتب',
      financial_advance: 'طلب سلفة مالية',
      resignation: 'طلب استقالة',
      attendance_correction: 'طلب تعديل حضور',
      business_trip: 'طلب رحلة عمل',
      equipment: 'طلب معدات',
      custom: 'طلب مخصص'
    };
    return titles[type as keyof typeof titles] || 'طلب جديد';
  };

  // Handle request submission
  const handleSubmitRequest = () => {
    toast.success('تم تقديم الطلب بنجاح!');
    setShowRequestDialog(false);
    setSelectedRequestType('');
  };

  const handleExportData = () => {
    downloadFile({ data: employees, filename: 'بيانات_الموظفين', format: 'excel' });
    toast.success('تم تصدير البيانات بنجاح');
  };

  const handlePrintReport = () => {
    printData(employees, 'قائمة الموظفين');
    toast.success('تم إعداد التقرير للطباعة');
  };

  const handleRefreshData = () => {
    toast.success('تم تحديث البيانات');
  };

  const saveNewEmployee = () => {
    if (newEmployee.name && newEmployee.position) {
      const id = (employees.length + 1).toString().padStart(3, '0');
      const employee = {
        ...newEmployee,
        id,
        status: 'نشط',
        joinDate: new Date().toISOString().split('T')[0],
        disciplinaryRecord: 0,
        avatar: '/placeholder.svg',
        performance: 85,
        yearsOfService: 0,
        lastPromotion: null,
        manager: 'غير محدد',
        totalLeaves: 15,
        usedLeaves: 0,
        emergencyContact: 'غير محدد',
        salary: parseInt(newEmployee.salary) || 0
      };
      setEmployees([...employees, employee]);
      setNewEmployee({
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        salary: '',
        nationalId: '',
        address: ''
      });
      setIsAddEmployeeOpen(false);
      toast.success(`تم إضافة الموظف: ${employee.name}`);
    } else {
      toast.error('يرجى ملء الحقول المطلوبة');
    }
  };

  const handleApproveRequest = (requestId: number) => {
    setEmployeeRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
    toast.success('تم الموافقة على الطلب بنجاح وإرسال إشعار للموظف');
  };

  const handleRejectRequest = (requestId: number) => {
    setEmployeeRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
    toast.error('تم رفض الطلب وإرسال إشعار للموظف');
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">نظام إدارة الموظفين</h1>
          </div>
          <div className="mr-auto flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefreshData}
            >
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث البيانات
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportData}
            >
              <Download className="h-4 w-4 ml-2" />
              تصدير البيانات
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrintReport}
            >
              <Upload className="h-4 w-4 ml-2" />
              طباعة التقرير
            </Button>
            <Button 
              size="sm"
              onClick={handleAddEmployee}
            >
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة موظف جديد
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-12 text-xs">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="employees">الموظفين</TabsTrigger>
            <TabsTrigger value="attendance">الحضور</TabsTrigger>
            <TabsTrigger value="disciplinary">الجزاءات</TabsTrigger>
            <TabsTrigger value="leaves">الإجازات</TabsTrigger>
            <TabsTrigger value="payroll">الرواتب</TabsTrigger>
            <TabsTrigger value="performance">الأداء</TabsTrigger>
            <TabsTrigger value="training">التدريب</TabsTrigger>
            <TabsTrigger value="recruitment">التوظيف</TabsTrigger>
            <TabsTrigger value="insurance">التأمينات</TabsTrigger>
            <TabsTrigger value="benefits">المزايا والحوافز</TabsTrigger>
            <TabsTrigger value="esignature">التوقيع الإلكتروني</TabsTrigger>
            <TabsTrigger value="requests">الطلبات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.totalEmployees}</div>
                      <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.activeEmployees}</div>
                      <div className="text-sm text-muted-foreground">موظف نشط</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-yellow-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.onLeave}</div>
                      <div className="text-sm text-muted-foreground">في إجازة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.pendingDisciplinary}</div>
                      <div className="text-sm text-muted-foreground">إجراءات تأديبية معلقة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Bell className="h-8 w-8 text-blue-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.newRequests}</div>
                      <div className="text-sm text-muted-foreground">طلبات جديدة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
                <CardDescription>الوصول السريع للمهام الأساسية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-primary/10 transition-colors"
                    onClick={handleAddEmployee}
                  >
                    <UserPlus className="h-6 w-6" />
                    إضافة موظف
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-destructive/10 transition-colors"
                    onClick={() => handleDisciplinaryAction('إجراء تأديبي')}
                  >
                    <Gavel className="h-6 w-6" />
                    إجراء تأديبي
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-secondary/10 transition-colors"
                    onClick={() => setActiveTab('requests')}
                  >
                    <FileText className="h-6 w-6" />
                    طلب موظف
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-success/10 transition-colors"
                    onClick={() => setActiveTab('reports')}
                  >
                    <Award className="h-6 w-6" />
                    تقييم أداء
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Smart Dashboard with AI Insights */}
            <SmartDashboard />
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث عن موظف..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="فلترة حسب القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                      <SelectItem value="المالية">المالية</SelectItem>
                      <SelectItem value="المبيعات">المبيعات</SelectItem>
                      <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Employees List */}
            <div className="grid gap-4">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                          <p className="text-sm text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">تاريخ التوظيف</div>
                          <div className="text-sm text-muted-foreground">{employee.joinDate}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">الحالة</div>
                          {getStatusBadge(employee.status)}
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">الإجراءات التأديبية</div>
                          <Badge variant={employee.disciplinaryRecord > 0 ? "destructive" : "secondary"}>
                            {employee.disciplinaryRecord}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewEmployee(employee)}
                          >
                            <Eye className="h-4 w-4 ml-1" />
                            عرض
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditEmployee(employee)}
                          >
                            <Edit className="h-4 w-4 ml-1" />
                            تحرير
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Disciplinary Tab */}
          <TabsContent value="disciplinary" className="space-y-6">
            <DisciplinarySystem />
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            {/* Request Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="dashboard-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">إجمالي الطلبات</p>
                    <p className="text-2xl font-bold text-primary">{employeeRequests.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </Card>

              <Card className="dashboard-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">في الانتظار</p>
                    <p className="text-2xl font-bold text-warning">{employeeRequests.filter(r => r.status === 'pending').length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-warning" />
                </div>
              </Card>

              <Card className="dashboard-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">موافق عليها</p>
                    <p className="text-2xl font-bold text-success">{employeeRequests.filter(r => r.status === 'approved').length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </Card>

              <Card className="dashboard-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">مرفوضة</p>
                    <p className="text-2xl font-bold text-destructive">{employeeRequests.filter(r => r.status === 'rejected').length}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-destructive" />
                </div>
              </Card>
            </div>

            {/* Request Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  طلبات الموظفين
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      تصفية
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      طلب جديد
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>إدارة جميع طلبات الموظفين والموافقات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employeeRequests.map((request) => (
                    <Card key={request.id} className="dashboard-card">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold">{request.employeeName}</h3>
                            {getRequestStatusBadge(request.status)}
                            {getRequestPriorityBadge(request.priority)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              {request.department}
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              {request.requestType}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {request.submitDate}
                            </div>
                          </div>
                          <p className="text-sm mt-2">{request.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            عرض
                          </Button>
                          {request.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-success hover:bg-success hover:text-white"
                                onClick={() => handleApproveRequest(request.id)}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                موافقة
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-destructive hover:bg-destructive hover:text-white"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                رفض
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Request Types */}
            <Card>
              <CardHeader>
                <CardTitle>أنواع الطلبات المتاحة</CardTitle>
                <CardDescription>الطلبات التي يمكن للموظفين تقديمها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="text-center p-4 h-auto flex flex-col items-center hover:bg-blue-50 hover:border-blue-200"
                    onClick={() => handleRequestClick('leave')}
                  >
                    <Calendar className="h-8 w-8 mb-2 text-blue-600" />
                    <h3 className="font-medium">طلبات الإجازات</h3>
                    <p className="text-sm text-muted-foreground">إجازة سنوية، مرضية، طارئة</p>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-center p-4 h-auto flex flex-col items-center hover:bg-green-50 hover:border-green-200"
                    onClick={() => handleRequestClick('salary_certificate')}
                  >
                    <FileText className="h-8 w-8 mb-2 text-green-600" />
                    <h3 className="font-medium">شهادات الراتب</h3>
                    <p className="text-sm text-muted-foreground">تعريف بالراتب للبنوك</p>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-center p-4 h-auto flex flex-col items-center hover:bg-yellow-50 hover:border-yellow-200"
                    onClick={() => handleRequestClick('financial_advance')}
                  >
                    <DollarSign className="h-8 w-8 mb-2 text-yellow-600" />
                    <h3 className="font-medium">السلف المالية</h3>
                    <p className="text-sm text-muted-foreground">سلف على الراتب</p>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-center p-4 h-auto flex flex-col items-center hover:bg-purple-50 hover:border-purple-200"
                    onClick={() => handleRequestClick('resignation')}
                  >
                    <User className="h-8 w-8 mb-2 text-purple-600" />
                    <h3 className="font-medium">طلبات الاستقالة</h3>
                    <p className="text-sm text-muted-foreground">إجراءات إنهاء الخدمة</p>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-center p-4 h-auto flex flex-col items-center hover:bg-orange-50 hover:border-orange-200"
                    onClick={() => handleRequestClick('attendance_correction')}
                  >
                    <Clock className="h-8 w-8 mb-2 text-orange-600" />
                    <h3 className="font-medium">تعديل الحضور</h3>
                    <p className="text-sm text-muted-foreground">تصحيح بيانات الحضور</p>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-center p-4 h-auto flex flex-col items-center hover:bg-red-50 hover:border-red-200"
                    onClick={() => handleRequestClick('business_trip')}
                  >
                    <MapPin className="h-8 w-8 mb-2 text-red-600" />
                    <h3 className="font-medium">رحلات العمل</h3>
                    <p className="text-sm text-muted-foreground">تنقلات رسمية</p>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-center p-4 h-auto flex flex-col items-center hover:bg-indigo-50 hover:border-indigo-200"
                    onClick={() => handleRequestClick('equipment')}
                  >
                    <Laptop className="h-8 w-8 mb-2 text-indigo-600" />
                    <h3 className="font-medium">طلب معدات</h3>
                    <p className="text-sm text-muted-foreground">أجهزة ومعدات العمل</p>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-center p-4 h-auto flex flex-col items-center hover:bg-gray-50 hover:border-gray-300"
                    onClick={() => handleRequestClick('custom')}
                  >
                    <Settings className="h-8 w-8 mb-2 text-gray-600" />
                    <h3 className="font-medium">طلبات مخصصة</h3>
                    <p className="text-sm text-muted-foreground">طلبات أخرى حسب الحاجة</p>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Request Submission Dialog */}
            <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-right">
                    {getRequestTitle(selectedRequestType)}
                  </DialogTitle>
                  <DialogDescription className="text-right">
                    قم بملء البيانات المطلوبة لتقديم الطلب
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 text-right" dir="rtl">
                  {selectedRequestType && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">عنوان الطلب</label>
                        <Input placeholder="أدخل عنوان الطلب..." />
                      </div>
                      
                      {(selectedRequestType === 'financial_advance') && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">المبلغ المطلوب (ريال سعودي)</label>
                          <Input type="number" placeholder="0" />
                        </div>
                      )}
                      
                      {(selectedRequestType === 'leave' || selectedRequestType === 'business_trip') && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">تاريخ البداية</label>
                              <Input type="date" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">تاريخ النهاية</label>
                              <Input type="date" />
                            </div>
                          </div>
                        </>
                      )}
                      
                      {selectedRequestType === 'equipment' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">نوع المعدات المطلوبة</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر نوع المعدات" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="laptop">جهاز لابتوب</SelectItem>
                              <SelectItem value="desktop">جهاز كمبيوتر مكتبي</SelectItem>
                              <SelectItem value="phone">هاتف محمول</SelectItem>
                              <SelectItem value="printer">طابعة</SelectItem>
                              <SelectItem value="other">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">تفاصيل الطلب</label>
                        <textarea 
                          className="w-full p-3 border rounded-md resize-none h-24"
                          placeholder="أدخل تفاصيل الطلب..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">الأولوية</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر أولوية الطلب" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">منخفضة</SelectItem>
                            <SelectItem value="medium">متوسطة</SelectItem>
                            <SelectItem value="high">عالية</SelectItem>
                            <SelectItem value="urgent">عاجلة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">المرفقات (اختياري)</label>
                        <Input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <Button 
                          onClick={() => handleSubmitRequest()}
                          className="flex-1"
                        >
                          تقديم الطلب
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowRequestDialog(false)}
                          className="flex-1"
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <AttendanceManagement />
          </TabsContent>

          {/* Leaves Tab */}
          <TabsContent value="leaves" className="space-y-6">
            <LeaveManagement />
          </TabsContent>

          {/* Payroll Tab */}
          <TabsContent value="payroll" className="space-y-6">
            <PayrollCompensation />
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <PerformanceManagement />
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <TrainingDevelopment />
          </TabsContent>

          {/* Recruitment Tab */}
          <TabsContent value="recruitment" className="space-y-6">
            <RecruitmentOnboarding />
          </TabsContent>

          {/* Insurance Management Tab */}
          <TabsContent value="insurance" className="space-y-6">
            <InsuranceManagement />
          </TabsContent>

          {/* Benefits & Rewards Tab */}
          <TabsContent value="benefits" className="space-y-6">
            <BenefitsRewards />
          </TabsContent>

          {/* Electronic Signature Tab */}
          <TabsContent value="esignature" className="space-y-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    نظام التوقيع الإلكتروني الآمن
                  </h2>
                  <p className="text-muted-foreground">
                    نظام توقيع إلكتروني آمن ومتوافق مع نفاذ الوطني الموحد ولوائح المملكة العربية السعودية
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    متوافق مع نفاذ
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    شهادة معتمدة
                  </Badge>
                </div>
              </div>

              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">إجمالي المستندات</CardTitle>
                    <FileText className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <p className="text-xs text-muted-foreground">+23% هذا الشهر</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">المستندات الموقعة</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">98</div>
                    <p className="text-xs text-muted-foreground">62.8% من الإجمالي</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">45</div>
                    <p className="text-xs text-muted-foreground">متوسط الوقت: 2.4 أيام</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">المرفوضة</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">13</div>
                    <p className="text-xs text-muted-foreground">8.3% من الإجمالي</p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Features */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Documents Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      إدارة المستندات
                    </CardTitle>
                    <CardDescription>
                      رفع وإدارة المستندات المطلوب توقيعها
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.pdf,.doc,.docx';
                        input.onchange = () => toast.success('تم رفع المستند بنجاح!');
                        input.click();
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      رفع مستند جديد
                    </Button>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-primary" />
                          <div>
                            <p className="font-medium">عقد عمل - أحمد محمد</p>
                            <p className="text-sm text-muted-foreground">في الانتظار</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-green-600" />
                          <div>
                            <p className="font-medium">سياسة العمل الجديدة</p>
                            <p className="text-sm text-green-600">مكتمل</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Signature Creation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PenTool className="w-5 h-5" />
                      إنشاء التوقيعات
                    </CardTitle>
                    <CardDescription>
                      إنشاء وإدارة التوقيعات الإلكترونية المعتمدة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full" 
                      onClick={() => toast.success('فتح أداة إنشاء التوقيع')}
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      إنشاء توقيع جديد
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => toast.info('جاري توجيهك إلى نفاذ الوطني الموحد...')}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      التحقق عبر نفاذ
                    </Button>
                  </CardContent>
                </Card>

                {/* Compliance & Security */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      الامتثال والأمان
                    </CardTitle>
                    <CardDescription>
                      ضمان الامتثال للقوانين والأنظمة السعودية
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">متوافق مع نفاذ الوطني الموحد</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">شهادات رقمية معتمدة</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">تخزين آمن في السحابة</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">تتبع كامل لدورة حياة المستند</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      إجراءات سريعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => navigate('/e-signature')}
                    >
                      <FileCheck className="w-4 h-4 mr-2" />
                      النظام الكامل للتوقيع الإلكتروني
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => toast.success('تم تصدير تقرير التوقيعات')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      تصدير تقرير التوقيعات
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => toast.info('فتح إعدادات النظام')}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      إعدادات النظام
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            {/* HR Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">معدل الحضور</p>
                      <p className="text-3xl font-bold">94.5%</p>
                    </div>
                    <Timer className="h-10 w-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">متوسط الأداء</p>
                      <p className="text-3xl font-bold">87.2%</p>
                    </div>
                    <TrendingUp className="h-10 w-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">معدل الاستبقاء</p>
                      <p className="text-3xl font-bold">92.8%</p>
                    </div>
                    <Shield className="h-10 w-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">رضا الموظفين</p>
                      <p className="text-3xl font-bold">4.2/5</p>
                    </div>
                    <Heart className="h-10 w-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Generation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6" />
                    تقارير الحضور والانصراف
                  </CardTitle>
                  <CardDescription>تقارير مفصلة عن حضور الموظفين</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير الحضور الشهري');
                      handleExportData();
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    تقرير الحضور الشهري
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير المتأخرين');
                      handleExportData();
                    }}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    تقرير المتأخرين
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير الإجازات');
                      handleExportData();
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    تقرير الإجازات المستخدمة
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    تقارير الأداء والتطوير
                  </CardTitle>
                  <CardDescription>تحليلات أداء الموظفين والتدريب</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير الأداء الربعي');
                      handleExportData();
                    }}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    تقرير الأداء الربعي
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير التدريب');
                      handleExportData();
                    }}
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    تقرير التدريب والتطوير
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير الترقيات');
                      handleExportData();
                    }}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    تقرير الترقيات والزيادات
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6" />
                    التقارير المالية
                  </CardTitle>
                  <CardDescription>تقارير الرواتب والمزايا</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير الرواتب الشهري');
                      handleExportData();
                    }}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    تقرير الرواتب الشهري
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير المزايا');
                      handleExportData();
                    }}
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    تقرير المزايا والبدلات
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير التكاليف');
                      handleExportData();
                    }}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    تقرير التكاليف الإجمالية
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-6 w-6" />
                    التقارير الإدارية
                  </CardTitle>
                  <CardDescription>تقارير إدارية ونماذج حكومية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير التأمينات الاجتماعية');
                      handleExportData();
                    }}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    تقرير التأمينات الاجتماعية
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير ضريبة القيمة المضافة');
                      handleExportData();
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    تقرير ضريبة القيمة المضافة
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toast.success('تم إنشاء تقرير الموارد البشرية');
                      handleExportData();
                    }}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    تقرير إحصائيات الموارد البشرية
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Export Actions */}
            <Card>
              <CardHeader>
                <CardTitle>تصدير التقارير</CardTitle>
                <CardDescription>تصدير جميع البيانات بصيغ مختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleExportData();
                      toast.success('تم تصدير البيانات بصيغة Excel');
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تصدير Excel
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handlePrintReport();
                      toast.success('تم إعداد التقرير للطباعة');
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    طباعة التقرير
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast.success('تم إرسال التقرير بالبريد الإلكتروني');
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    إرسال بالبريد
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast.success('تم جدولة التقرير التلقائي');
                    }}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    جدولة تلقائية
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog لإضافة موظف جديد */}
      <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-6 w-6" />
              إضافة موظف جديد
            </DialogTitle>
            <DialogDescription>
              ملء جميع البيانات المطلوبة لإضافة الموظف
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">الاسم الكامل *</Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  placeholder="الاسم الكامل"
                />
              </div>
              <div>
                <Label htmlFor="position">المنصب *</Label>
                <Input
                  id="position"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                  placeholder="المنصب الوظيفي"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">القسم</Label>
                <Select 
                  value={newEmployee.department} 
                  onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                    <SelectItem value="المالية">المالية</SelectItem>
                    <SelectItem value="المبيعات">المبيعات</SelectItem>
                    <SelectItem value="التسويق">التسويق</SelectItem>
                    <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salary">الراتب</Label>
                <Input
                  id="salary"
                  type="number"
                  value={newEmployee.salary}
                  onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                  placeholder="الراتب الشهري"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  placeholder="example@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                  placeholder="+966501234567"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="nationalId">رقم الهوية</Label>
              <Input
                id="nationalId"
                value={newEmployee.nationalId}
                onChange={(e) => setNewEmployee({...newEmployee, nationalId: e.target.value})}
                placeholder="رقم الهوية الوطنية"
              />
            </div>
            <div>
              <Label htmlFor="address">العنوان</Label>
              <Textarea
                id="address"
                value={newEmployee.address}
                onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                placeholder="العنوان الكامل"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={saveNewEmployee}>
                <Save className="h-4 w-4 mr-2" />
                حفظ الموظف
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog لعرض تفاصيل الموظف */}
      <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6" />
              تفاصيل الموظف: {selectedEmployee?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              {/* المعلومات الأساسية */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    المعلومات الأساسية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={selectedEmployee.avatar} />
                          <AvatarFallback className="text-lg">{selectedEmployee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{selectedEmployee.name}</h3>
                          <p className="text-muted-foreground">{selectedEmployee.position}</p>
                          {getStatusBadge(selectedEmployee.status)}
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">القسم: {selectedEmployee.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">تاريخ التوظيف: {selectedEmployee.joinDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">سنوات الخدمة: {selectedEmployee.yearsOfService}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">معلومات الاتصال</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedEmployee.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedEmployee.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedEmployee.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* الأداء والإحصائيات */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="h-8 w-8 text-yellow-500" />
                      </div>
                      <div className="text-2xl font-bold">{selectedEmployee.performance}%</div>
                      <div className="text-sm text-muted-foreground">تقييم الأداء</div>
                      <Progress value={selectedEmployee.performance} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold">{selectedEmployee.salary.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">الراتب الشهري (ريال)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold">{selectedEmployee.usedLeaves}/{selectedEmployee.totalLeaves}</div>
                      <div className="text-sm text-muted-foreground">الإجازات المستخدمة</div>
                      <Progress value={(selectedEmployee.usedLeaves / selectedEmployee.totalLeaves) * 100} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* معلومات إضافية */}
              <Card>
                <CardHeader>
                  <CardTitle>معلومات إضافية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>رقم الهوية الوطنية</Label>
                      <p className="text-sm mt-1">{selectedEmployee.nationalId}</p>
                    </div>
                    <div>
                      <Label>المدير المباشر</Label>
                      <p className="text-sm mt-1">{selectedEmployee.manager}</p>
                    </div>
                    <div>
                      <Label>آخر ترقية</Label>
                      <p className="text-sm mt-1">{selectedEmployee.lastPromotion || 'لا يوجد'}</p>
                    </div>
                    <div>
                      <Label>جهة الاتصال في حالات الطوارئ</Label>
                      <p className="text-sm mt-1">{selectedEmployee.emergencyContact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsViewEmployeeOpen(false)}>
                  إغلاق
                </Button>
                <Button onClick={() => {
                  setIsViewEmployeeOpen(false);
                  handleEditEmployee(selectedEmployee);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  تحرير البيانات
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeManagementSystem;