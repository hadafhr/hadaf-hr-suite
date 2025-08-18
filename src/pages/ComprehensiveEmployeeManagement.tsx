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
  Timer
} from 'lucide-react';
import TrainingDevelopment from '@/components/employee/TrainingDevelopment';
import SmartHire from '@/pages/SmartHire';
import { SmartEvaluations } from '@/components/evaluation/SmartEvaluations';

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
        <div className="flex h-16 items-center px-6">
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
          <TabsList className="grid w-full grid-cols-10 bg-white/70 backdrop-blur">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              الموظفين
            </TabsTrigger>
            <TabsTrigger value="attendance" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              الحضور
            </TabsTrigger>
            <TabsTrigger value="leaves" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              الإجازات
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              الأداء
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              التدريب
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              التوظيف
            </TabsTrigger>
            <TabsTrigger value="disciplinary" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              التأديبي
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              التقارير
            </TabsTrigger>
          </TabsList>

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

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث عن موظف (الاسم، المنصب، رقم الموظف)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-[#009F87]/20 focus:border-[#009F87]"
                    />
                  </div>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-full md:w-48 border-[#009F87]/20 focus:border-[#009F87]">
                      <SelectValue placeholder="تصفية حسب القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                    <Filter className="h-4 w-4 ml-2" />
                    تطبيق التصفية
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Employee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee, index) => (
                <Card 
                  key={employee.id} 
                  className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-xl transition-all duration-300 animate-fade-in hover:scale-105"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-[#009F87]/20">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback className="bg-[#009F87]/10 text-[#009F87]">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.id}</p>
                        </div>
                      </div>
                      {getStatusBadge(employee.status)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-[#009F87]" />
                        <span>{employee.position}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-[#009F87]" />
                        <span>{employee.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-[#009F87]" />
                        <span>{employee.manager}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-[#009F87]" />
                        <span>انضم في {employee.joinDate}</span>
                      </div>
                    </div>

                    {/* Performance indicator */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">تقييم الأداء</span>
                        <span className={`text-sm font-bold ${getPerformanceColor(employee.performance.currentRating)}`}>
                          {employee.performance.currentRating}/5
                        </span>
                      </div>
                      <Progress value={employee.performance.currentRating * 20} className="h-2" />
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="bg-[#009F87]/5 p-2 rounded text-center">
                        <div className="font-semibold text-[#009F87]">{employee.attendance.thisMonth.attendanceRate}%</div>
                        <div className="text-xs text-muted-foreground">معدل الحضور</div>
                      </div>
                      <div className="bg-[#009F87]/5 p-2 rounded text-center">
                        <div className="font-semibold text-[#009F87]">{employee.leaves.annual.remaining}</div>
                        <div className="text-xs text-muted-foreground">إجازة متبقية</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 hover:bg-[#009F87] hover:text-white transition-colors"
                        onClick={() => handleViewEmployee(employee)}
                      >
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <Edit className="h-4 w-4 ml-1" />
                        تحرير
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs will be implemented here... */}
          <TabsContent value="attendance" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Clock className="h-6 w-6" />
                  نظام إدارة الحضور والانصراف
                </CardTitle>
                <CardDescription>
                  متابعة شاملة لحضور الموظفين مع التكامل مع نظام تحديد المواقع
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Timer className="h-16 w-16 mx-auto mb-4 text-[#009F87] opacity-50" />
                  <p className="text-muted-foreground">سيتم تطوير نظام الحضور المتقدم هنا</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    يشمل: تسجيل الحضور بالموقع، جداول المناوبات، تتبع الوقت الإضافي، والتقارير التفصيلية
                  </p>
                </div>
              </CardContent>
            </Card>
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

          {/* Add other tab contents here... */}
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
