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
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  Building,
  BookOpen,
  Shield,
  Briefcase,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Globe,
  Eye,
  Settings,
  Bell,
  CreditCard,
  UserCheck,
  Sparkles,
  Archive,
  Edit,
  Trash2,
  Share,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  UserPlus,
  Phone,
  Mail,
  Crown,
  Users2,
  Database,
  RefreshCw,
  Server,
  Star,
  MapPin,
  Laptop,
  GraduationCap,
  TrendingDown
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface TeamMembersProps {
  onBack: () => void;
}

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  nameEn: string;
  department: 'IT' | 'HR' | 'Finance' | 'Marketing' | 'Operations' | 'Sales';
  position: string;
  status: 'active' | 'inactive' | 'probation' | 'terminated';
  description: string;
  lastUpdate?: string;
  joinDate: string;
  performanceScore: number;
  attendanceRate: number;
  managerId?: string;
  email: string;
  phone: string;
  contractType: string;
  nationality: string;
  salary: number;
}

interface Department {
  id: string;
  name: string;
  head: string;
  employees: number;
  activeEmployees: number;
  performance: number;
  description: string;
}

interface TeamMetric {
  id: string;
  metric: string;
  category: 'Performance' | 'Attendance' | 'Employees' | 'Retention' | 'Satisfaction';
  status: 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const TeamMembers: React.FC<TeamMembersProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const employees: Employee[] = [
    {
      id: '1',
      employeeId: 'EMP-2024-001',
      name: 'أحمد محمد السعيد',
      nameEn: 'Ahmed Mohamed Alsaeed',
      department: 'IT',
      position: 'مطور برمجيات أول',
      status: 'active',
      description: 'مطور محترف مع خبرة 5 سنوات في تطوير التطبيقات',
      lastUpdate: '2024-01-20 09:30',
      joinDate: '2022-01-15',
      performanceScore: 92,
      attendanceRate: 96,
      managerId: 'MGR-001',
      email: 'ahmed.saeed@company.com',
      phone: '+966501234567',
      contractType: 'دائم',
      nationality: 'سعودي',
      salary: 12000
    },
    {
      id: '2',
      employeeId: 'EMP-2024-002',
      name: 'فاطمة عبدالله النور',
      nameEn: 'Fatima Abdullah Alnoor',
      department: 'Finance',
      position: 'محاسبة رئيسية',
      status: 'active',
      description: 'محاسبة معتمدة مع خبرة في إدارة الحسابات والميزانيات',
      lastUpdate: '2024-01-19 14:15',
      joinDate: '2021-03-10',
      performanceScore: 88,
      attendanceRate: 98,
      managerId: 'MGR-002',
      email: 'fatima.noor@company.com',
      phone: '+966502345678',
      contractType: 'دائم',
      nationality: 'سعودية',
      salary: 10000
    },
    {
      id: '3',
      employeeId: 'EMP-2024-003',
      name: 'محمد سالم الأحمد',
      nameEn: 'Mohamed Salem Alahmed',
      department: 'Marketing',
      position: 'مدير تسويق',
      status: 'probation',
      description: 'مدير تسويق جديد مع خبرة في التسويق الرقمي',
      lastUpdate: '2024-01-18 10:45',
      joinDate: '2023-12-01',
      performanceScore: 85,
      attendanceRate: 94,
      managerId: 'MGR-003',
      email: 'mohamed.ahmad@company.com',
      phone: '+966503456789',
      contractType: 'مؤقت',
      nationality: 'مصري',
      salary: 9500
    },
    {
      id: '4',
      employeeId: 'EMP-2024-004',
      name: 'نورا عبدالعزيز السالم',
      nameEn: 'Nora Abdulaziz Alsalem',
      department: 'HR',
      position: 'أخصائية موارد بشرية',
      status: 'active',
      description: 'أخصائية موارد بشرية مع شهادات مهنية في إدارة المواهب',
      lastUpdate: '2024-01-20 08:15',
      joinDate: '2020-05-20',
      performanceScore: 90,
      attendanceRate: 97,
      managerId: 'MGR-004',
      email: 'nora.salem@company.com',
      phone: '+966504567890',
      contractType: 'دائم',
      nationality: 'سعودية',
      salary: 11000
    }
  ];

  const departments: Department[] = [
    {
      id: '1',
      name: 'تقنية المعلومات',
      head: 'محمد أحمد الخالدي',
      employees: 45,
      activeEmployees: 42,
      performance: 92,
      description: 'قسم تطوير وصيانة الأنظمة التقنية'
    },
    {
      id: '2',
      name: 'الموارد البشرية',
      head: 'نورا أحمد السالم',
      employees: 12,
      activeEmployees: 11,
      performance: 95,
      description: 'إدارة وتطوير العنصر البشري في المؤسسة'
    },
    {
      id: '3',
      name: 'المالية والمحاسبة',
      head: 'فاطمة محمد العبدالله',
      employees: 18,
      activeEmployees: 16,
      performance: 88,
      description: 'إدارة الحسابات والميزانيات والتخطيط المالي'
    }
  ];

  const teamMetrics: TeamMetric[] = [
    {
      id: '1',
      metric: 'معدل الأداء العام',
      category: 'Performance',
      status: 'Excellent',
      value: 89,
      target: 85,
      trend: 'up',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      metric: 'معدل الحضور',
      category: 'Attendance',
      status: 'Good',
      value: 94,
      target: 95,
      trend: 'stable',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      metric: 'عدد الموظفين النشطين',
      category: 'Employees',
      status: 'Excellent',
      value: 127,
      target: 120,
      trend: 'up',
      lastUpdated: '2024-01-15'
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'يناير', performance: 85, attendance: 92, employees: 115 },
    { month: 'فبراير', performance: 87, attendance: 94, employees: 118 },
    { month: 'مارس', performance: 89, attendance: 96, employees: 120 },
    { month: 'أبريل', performance: 88, attendance: 93, employees: 117 },
    { month: 'مايو', performance: 91, attendance: 95, employees: 122 },
    { month: 'يونيو', performance: 93, attendance: 97, employees: 127 }
  ];

  const departmentDistribution = [
    { name: 'تقنية المعلومات', value: 35, color: '#3b82f6' },
    { name: 'الموارد البشرية', value: 10, color: '#10b981' },
    { name: 'المالية', value: 15, color: '#f59e0b' },
    { name: 'التسويق', value: 18, color: '#8b5cf6' },
    { name: 'العمليات', value: 22, color: '#ef4444' }
  ];

  // Calculate statistics
  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === 'active').length,
    departments: departments.length,
    avgPerformance: 89,
    avgAttendance: 94,
    probationEmployees: employees.filter(e => e.status === 'probation').length
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير فريق العمل كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'probation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'terminated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'نشط',
      'probation': 'تحت التجربة',
      'inactive': 'غير نشط',
      'terminated': 'منتهي الخدمة'
    };
    return statusMap[status] || status;
  };

  const getDepartmentText = (department: string) => {
    const departmentMap: { [key: string]: string } = {
      'IT': 'تقنية المعلومات',
      'HR': 'الموارد البشرية',
      'Finance': 'المالية',
      'Marketing': 'التسويق',
      'Operations': 'العمليات',
      'Sales': 'المبيعات'
    };
    return departmentMap[department] || department;
  };

  const renderHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/boud-pattern-bg.jpg')] opacity-5"></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  فريق العمل
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة جميع أعضاء الفريق مع أدوات التحليل المتقدمة والتقارير التفصيلية
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <FileText className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              موظف جديد
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">موظفين نشطين</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activeEmployees}</p>
              </div>
              <UserCheck className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الإدارات</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.departments}</p>
              </div>
              <Building className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الأداء</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgPerformance}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الحضور</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgAttendance}%</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تحت التجربة</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.probationEmployees}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              أداء الفريق والحضور
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="performance" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="attendance" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="employees" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الإدارات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي لفريق العمل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">أداء ممتاز</span>
              </div>
              <p className="text-sm text-emerald-700">
                تحسن ملحوظ في مؤشرات الأداء العامة للفريق بنسبة 12%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تنبيه مهم</span>
              </div>
              <p className="text-sm text-orange-700">
                3 موظفين تحت التجربة يحتاجون متابعة إضافية لتحسين الأداء
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لزيادة معدل الحضور إلى 96%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              النشاطات الحديثة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-green-100">
                  <UserPlus className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تم إضافة موظف جديد</p>
                  <p className="text-xs text-muted-foreground">أحمد محمد السعيد - منذ ساعتين</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-blue-100">
                  <Star className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تقييم أداء</p>
                  <p className="text-xs text-muted-foreground">فاطمة النور - منذ 4 ساعات</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-yellow-100">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">انتهاء فترة تجربة</p>
                  <p className="text-xs text-muted-foreground">محمد الأحمد - منذ يوم</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col gap-2">
                <UserPlus className="h-5 w-5" />
                <span className="text-xs">إضافة موظف</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Star className="h-5 w-5" />
                <span className="text-xs">تقييم الأداء</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">تقرير الحضور</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Settings className="h-5 w-5" />
                <span className="text-xs">إعدادات الفريق</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b border-border">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="directory">دليل الموظفين</TabsTrigger>
              <TabsTrigger value="profile">ملف الموظف الكامل</TabsTrigger>
              <TabsTrigger value="add">إضافة موظف جديد</TabsTrigger>
              <TabsTrigger value="tasks">المهام والملاحظات</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="directory">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">دليل الموظفين</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة موظف جديد
                </Button>
              </div>

              <div className="grid gap-6">
                {employees.map((employee) => (
                  <Card key={employee.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5" />
                        {employee.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">الحالة: {getStatusText(employee.status)}</p>
                          <p className="text-sm text-muted-foreground">آخر تحديث: {employee.lastUpdate}</p>
                        </div>
                        <Badge className={getStatusColor(employee.status)}>
                          {getStatusText(employee.status)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{employee.performanceScore}%</p>
                          <p className="text-sm text-muted-foreground">الأداء</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{employee.attendanceRate}%</p>
                          <p className="text-sm text-muted-foreground">الحضور</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{getDepartmentText(employee.department)}</p>
                          <p className="text-sm text-muted-foreground">القسم</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-orange-600">{employee.salary.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">الراتب</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 ml-2" />
                          عرض الملف
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 ml-2" />
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 ml-2" />
                          تحميل البيانات
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">ملف الموظف الكامل</h2>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  طباعة الملف
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>بيانات الموظف التفصيلية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground">
                      اختر موظفًا من دليل الموظفين لعرض ملفه الكامل
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">إضافة موظف جديد</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>استمارة إضافة موظف</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">الاسم الكامل</Label>
                      <Input id="fullname" placeholder="أدخل الاسم الكامل" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeid">رقم الموظف</Label>
                      <Input id="employeeid" placeholder="سيتم إنشاؤه تلقائيًا" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">المسمى الوظيفي</Label>
                      <Input id="position" placeholder="أدخل المسمى الوظيفي" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">القسم</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القسم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IT">تقنية المعلومات</SelectItem>
                          <SelectItem value="HR">الموارد البشرية</SelectItem>
                          <SelectItem value="Finance">المالية</SelectItem>
                          <SelectItem value="Marketing">التسويق</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" placeholder="example@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الجوال</Label>
                      <Input id="phone" placeholder="+966501234567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">الراتب الأساسي</Label>
                      <Input id="salary" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joindate">تاريخ التعيين</Label>
                      <Input id="joindate" type="date" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button className="flex-1">
                      <UserPlus className="h-4 w-4 ml-2" />
                      حفظ الموظف
                    </Button>
                    <Button variant="outline" className="flex-1">
                      إلغاء
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">المهام والملاحظات</h2>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة مهمة
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>إدارة المهام والملاحظات الإدارية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground">
                      قم بإسناد المهام وإضافة الملاحظات للموظفين
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">التقارير</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 ml-2" />
                    تصدير PDF
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 ml-2" />
                    تصدير Excel
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      التوزيع الوظيفي
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">تقرير توزيع الموظفين حسب الأقسام</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      فترة التجربة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">تقرير الموظفين تحت التجربة</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5" />
                      الدوران الوظيفي
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">تقرير معدل دوران الموظفين</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">الإعدادات</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      إدارة الصلاحيات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">تحديد الصلاحيات لكل مستخدم</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      الحقول الإلزامية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">تحديد الحقول المطلوبة عند إضافة موظف</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      تفعيل التبويبات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">تحديد التبويبات المرئية في ملف الموظف</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      إشعارات النظام
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">إعدادات التنبيهات والإشعارات</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};