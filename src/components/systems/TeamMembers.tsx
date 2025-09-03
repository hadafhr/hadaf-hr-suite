import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Users, 
  User, 
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
  Bot,
  ClipboardList,
  Printer,
  
  MessageSquare,
  Camera,
  Upload,
  Save,
  X,
  MapPin,
  DollarSign,
  UserX,
  UserMinus,
  MoreHorizontal,
  Grid,
  List,
  ChevronDown,
  Home,
  Briefcase as BriefcaseIcon,
  Heart,
  GraduationCap,
  Star,
  CheckSquare
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

interface TeamMembersProps {
  onBack: () => void;
}

interface TeamMember {
  id: string;
  employeeNumber: string;
  name: string;
  position: string;
  department: 'IT' | 'HR' | 'Finance' | 'Marketing' | 'Operations' | 'Sales';
  status: 'Active' | 'On Leave' | 'Inactive' | 'Terminated';
  level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager';
  manager: string;
  email: string;
  phone: string;
  startDate: string;
  contractType: string;
  performanceScore: number;
  attendanceRate: number;
  yearsOfExperience: number;
  salary: number;
}

interface Department {
  id: string;
  name: string;
  head: string;
  members: number;
  budget: number;
  performance: number;
  description: string;
}

interface PerformanceMetric {
  id: string;
  metric: string;
  category: 'Performance' | 'Attendance' | 'Projects' | 'Training' | 'Compliance';
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
  const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: 'IT',
    email: '',
    phone: '',
    contractType: 'دائم',
    salary: 0
  });
  const [tasks, setTasks] = useState([
    { id: '1', title: 'مراجعة التقييمات الشهرية', assignee: 'أحمد محمد السعيد', dueDate: '2024-01-20', status: 'في انتظار' },
    { id: '2', title: 'تحضير تقرير الأداء', assignee: 'فاطمة عبدالله النور', dueDate: '2024-01-25', status: 'مكتمل' }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data for demonstration
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      employeeNumber: 'EMP-2024-001',
      name: 'أحمد محمد السعيد',
      position: 'مطور برمجيات أول',
      department: 'IT',
      status: 'Active',
      level: 'Senior',
      manager: 'محمد أحمد الخالدي',
      email: 'ahmed.saeed@company.com',
      phone: '+966501234567',
      startDate: '2022-01-15',
      contractType: 'دائم',
      performanceScore: 92,
      attendanceRate: 96,
      yearsOfExperience: 5,
      salary: 12000
    },
    {
      id: '2',
      employeeNumber: 'EMP-2024-002',
      name: 'فاطمة عبدالله النور',
      position: 'محاسبة رئيسية',
      department: 'Finance',
      status: 'Active',
      level: 'Mid',
      manager: 'عبدالرحمن محمد الأحمد',
      email: 'fatima.noor@company.com',
      phone: '+966502345678',
      startDate: '2021-03-10',
      contractType: 'دائم',
      performanceScore: 88,
      attendanceRate: 98,
      yearsOfExperience: 3,
      salary: 10000
    }
  ];

  const departments: Department[] = [
    {
      id: '1',
      name: 'تقنية المعلومات',
      head: 'محمد أحمد الخالدي',
      members: 15,
      budget: 500000,
      performance: 92,
      description: 'قسم تطوير وصيانة الأنظمة التقنية'
    },
    {
      id: '2',
      name: 'الموارد البشرية',
      head: 'نورا أحمد السالم',
      members: 8,
      budget: 200000,
      performance: 95,
      description: 'قسم إدارة الموظفين والتوظيف والتطوير'
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
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
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'يناير', performance: 85, attendance: 92, projects: 15 },
    { month: 'فبراير', performance: 87, attendance: 94, projects: 18 },
    { month: 'مارس', performance: 89, attendance: 96, projects: 20 },
    { month: 'أبريل', performance: 88, attendance: 93, projects: 17 },
    { month: 'مايو', performance: 91, attendance: 95, projects: 22 },
    { month: 'يونيو', performance: 93, attendance: 97, projects: 25 }
  ];

  const departmentDistribution = [
    { name: 'تقنية المعلومات', value: 35, color: '#3b82f6' },
    { name: 'الموارد البشرية', value: 20, color: '#10b981' },
    { name: 'المالية', value: 15, color: '#f59e0b' },
    { name: 'التسويق', value: 18, color: '#8b5cf6' },
    { name: 'العمليات', value: 12, color: '#ef4444' }
  ];

  // Calculate statistics
  const stats = {
    totalMembers: 127,
    activeMembers: 115,
    departments: 8,
    avgPerformance: 89,
    avgAttendance: 94,
    avgExperience: 4.2
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
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Terminated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'Active': 'نشط',
      'On Leave': 'في إجازة',
      'Inactive': 'غير نشط',
      'Terminated': 'منتهي الخدمة'
    };
    return statusMap[status] || status;
  };

  const getDepartmentText = (dept: string) => {
    const deptMap: { [key: string]: string } = {
      'IT': 'تقنية المعلومات',
      'HR': 'الموارد البشرية',
      'Finance': 'المالية',
      'Marketing': 'التسويق',
      'Operations': 'العمليات',
      'Sales': 'المبيعات'
    };
    return deptMap[dept] || dept;
  };

  const getLevelText = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'Junior': 'مبتدئ',
      'Mid': 'متوسط',
      'Senior': 'أول',
      'Lead': 'رئيس',
      'Manager': 'مدير'
    };
    return levelMap[level] || level;
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
                <p className="text-2xl font-bold text-primary">{stats.totalMembers}</p>
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
                <p className="text-2xl font-bold text-orange-600">{stats.activeMembers}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الأقسام</p>
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

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الخبرة (سنة)</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgExperience}</p>
              </div>
              <Award className="h-8 w-8 text-green-500/60" />
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
              أداء الفريق
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
                <Area type="monotone" dataKey="projects" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الأقسام
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
                تحسن ملحوظ في مؤشرات الأداء العامة للفريق بنسبة 15%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">احتياج تدريب</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بتدريب إضافي في مهارات التواصل لـ 3 أعضاء في الفريق
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لتحقيق أهداف الربع بنسبة 105%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
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
                  <p className="text-sm font-medium">انضمام موظف جديد</p>
                  <p className="text-xs text-muted-foreground">سارة أحمد - أخصائية تسويق</p>
                </div>
                <span className="text-xs text-muted-foreground">منذ ساعتين</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-blue-100">
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تقييم أداء</p>
                  <p className="text-xs text-muted-foreground">محمد عبدالله - تقييم ممتاز</p>
                </div>
                <span className="text-xs text-muted-foreground">أمس</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-orange-100">
                  <Calendar className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">طلب إجازة</p>
                  <p className="text-xs text-muted-foreground">فاطمة النور - إجازة سنوية</p>
                </div>
                <span className="text-xs text-muted-foreground">منذ 3 أيام</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              أداء الأقسام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.slice(0, 4).map((dept) => (
                <div key={dept.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Building className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{dept.name}</p>
                      <p className="text-sm text-muted-foreground">{dept.members} موظف</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{dept.performance}%</p>
                    <Progress value={dept.performance} className="w-16 h-1 mt-1" />
                  </div>
                </div>
              ))}
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="members">الموظفين</TabsTrigger>
              <TabsTrigger value="departments">الأقسام</TabsTrigger>
              <TabsTrigger value="performance">الأداء</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="members">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">دليل الموظفين</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  >
                    {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة موظف
                  </Button>
                </div>
              </div>

              {/* Search and Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-64">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="البحث في الموظفين (الاسم، المنصب، القسم)..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="تصفية حسب القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأقسام</SelectItem>
                        <SelectItem value="IT">تقنية المعلومات</SelectItem>
                        <SelectItem value="HR">الموارد البشرية</SelectItem>
                        <SelectItem value="Finance">المالية</SelectItem>
                        <SelectItem value="Marketing">التسويق</SelectItem>
                        <SelectItem value="Operations">العمليات</SelectItem>
                        <SelectItem value="Sales">المبيعات</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="leave">في إجازة</SelectItem>
                        <SelectItem value="inactive">غير نشط</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 ml-2" />
                      فلاتر متقدمة
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Employee Directory */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>قائمة الموظفين ({teamMembers.length} موظف)</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download className="h-4 w-4 ml-2" />
                        تصدير
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 ml-2" />
                        طباعة
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {viewMode === 'grid' ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {teamMembers.map((member) => (
                        <Card key={member.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {member.name.split(' ')[0][0]}{member.name.split(' ')[1]?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold truncate">{member.name}</h3>
                                <p className="text-sm text-muted-foreground truncate">{member.position}</p>
                                <div className="flex gap-1 mt-2 flex-wrap">
                                  <Badge variant="outline" className="text-xs">
                                    {getDepartmentText(member.department)}
                                  </Badge>
                                  <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                                    {getStatusText(member.status)}
                                  </Badge>
                                </div>
                                <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                                  <span>الأداء: {member.performanceScore}%</span>
                                  <span>الحضور: {member.attendanceRate}%</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => setSelectedEmployee(member)}
                              >
                                <Eye className="h-4 w-4 ml-2" />
                                عرض الملف
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>الموظف</TableHead>
                            <TableHead>المنصب</TableHead>
                            <TableHead>القسم</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead>الأداء</TableHead>
                            <TableHead>الحضور</TableHead>
                            <TableHead>الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {teamMembers.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                      {member.name.split(' ')[0][0]}{member.name.split(' ')[1]?.[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.employeeNumber}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{member.position}</TableCell>
                              <TableCell>{getDepartmentText(member.department)}</TableCell>
                              <TableCell>
                                <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                                  {getStatusText(member.status)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{member.performanceScore}%</span>
                                  <Progress value={member.performanceScore} className="w-16 h-2" />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{member.attendanceRate}%</span>
                                  <Progress value={member.attendanceRate} className="w-16 h-2" />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setSelectedEmployee(member)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إدارة الأقسام</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {departments.map((dept) => (
                  <Card key={dept.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        {dept.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">رئيس القسم:</span>
                          <p className="font-medium">{dept.head}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">عدد الأعضاء:</span>
                          <p className="font-medium">{dept.members} موظف</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">الميزانية:</span>
                          <p className="font-medium">{dept.budget.toLocaleString()} ريال</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">الأداء:</span>
                          <p className="font-medium">{dept.performance}%</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                      <Progress value={dept.performance} className="w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">مؤشرات الأداء</h2>
              
              <div className="grid gap-4">
                {performanceMetrics.map((metric) => (
                  <Card key={metric.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{metric.metric}</h3>
                          <p className="text-sm text-muted-foreground">{metric.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{metric.value}%</p>
                          <p className="text-sm text-muted-foreground">الهدف: {metric.target}%</p>
                        </div>
                      </div>
                      <Progress value={metric.value} className="mt-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">التقارير</h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      تقرير الموظفين
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      تقرير شامل بجميع بيانات الموظفين والأداء
                    </p>
                    <Button className="w-full" onClick={handleExport}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل التقرير
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      تقرير الأداء
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      تحليل مفصل لمؤشرات الأداء الرئيسية
                    </p>
                    <Button className="w-full" onClick={handleExport}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل التقرير
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      تقرير الحضور
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      ملخص الحضور والغياب لجميع الموظفين
                    </p>
                    <Button className="w-full" onClick={handleExport}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل التقرير
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">الإعدادات</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات عامة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>اسم الشركة</Label>
                    <Input defaultValue="شركة بود التقنية" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>عدد ساعات العمل اليومية</Label>
                    <Input type="number" defaultValue="8" />
                  </div>

                  <div className="space-y-2">
                    <Label>أيام العمل في الأسبوع</Label>
                    <Input type="number" defaultValue="5" />
                  </div>

                  <Button>حفظ الإعدادات</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Employee Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                إضافة موظف جديد
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
                  <TabsTrigger value="job">البيانات الوظيفية</TabsTrigger>
                  <TabsTrigger value="financial">البيانات المالية</TabsTrigger>
                  <TabsTrigger value="documents">المرفقات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input 
                        id="name" 
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                        placeholder="محمد أحمد السعيد"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationalId">رقم الهوية/الإقامة *</Label>
                      <Input id="nationalId" placeholder="1234567890" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">الجنسية</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الجنسية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saudi">سعودي</SelectItem>
                          <SelectItem value="egyptian">مصري</SelectItem>
                          <SelectItem value="jordanian">أردني</SelectItem>
                          <SelectItem value="other">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">الجنس</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الجنس" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">ذكر</SelectItem>
                          <SelectItem value="female">أنثى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                      <Input id="birthDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maritalStatus">الحالة الاجتماعية</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="الحالة الاجتماعية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">أعزب</SelectItem>
                          <SelectItem value="married">متزوج</SelectItem>
                          <SelectItem value="divorced">مطلق</SelectItem>
                          <SelectItem value="widowed">أرمل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                        placeholder="ahmed@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الجوال *</Label>
                      <Input 
                        id="phone"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                        placeholder="+966501234567"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان</Label>
                    <Textarea id="address" placeholder="الرياض، المملكة العربية السعودية" />
                  </div>
                </TabsContent>
                
                <TabsContent value="job" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">المنصب *</Label>
                      <Input 
                        id="position"
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                        placeholder="مطور برمجيات أول"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">القسم *</Label>
                      <Select 
                        value={newEmployee.department}
                        onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القسم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IT">تقنية المعلومات</SelectItem>
                          <SelectItem value="HR">الموارد البشرية</SelectItem>
                          <SelectItem value="Finance">المالية</SelectItem>
                          <SelectItem value="Marketing">التسويق</SelectItem>
                          <SelectItem value="Operations">العمليات</SelectItem>
                          <SelectItem value="Sales">المبيعات</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">المدير المباشر</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدير المباشر" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager1">محمد أحمد الخالدي</SelectItem>
                          <SelectItem value="manager2">نورا أحمد السالم</SelectItem>
                          <SelectItem value="manager3">عبدالرحمن محمد الأحمد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">المستوى الوظيفي</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المستوى" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Junior">مبتدئ</SelectItem>
                          <SelectItem value="Mid">متوسط</SelectItem>
                          <SelectItem value="Senior">أول</SelectItem>
                          <SelectItem value="Lead">رئيس</SelectItem>
                          <SelectItem value="Manager">مدير</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hireDate">تاريخ التوظيف *</Label>
                      <Input id="hireDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contractType">نوع العقد</Label>
                      <Select 
                        value={newEmployee.contractType}
                        onValueChange={(value) => setNewEmployee({...newEmployee, contractType: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="نوع العقد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="دائم">دائم</SelectItem>
                          <SelectItem value="مؤقت">مؤقت</SelectItem>
                          <SelectItem value="تجريبي">تجريبي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workLocation">مكان العمل</Label>
                    <Input id="workLocation" placeholder="المكتب الرئيسي - الرياض" />
                  </div>
                </TabsContent>
                
                <TabsContent value="financial" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="basicSalary">الراتب الأساسي *</Label>
                      <Input 
                        id="basicSalary"
                        type="number"
                        value={newEmployee.salary}
                        onChange={(e) => setNewEmployee({...newEmployee, salary: parseInt(e.target.value)})}
                        placeholder="12000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="housingAllowance">بدل سكن</Label>
                      <Input id="housingAllowance" type="number" placeholder="2000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transportAllowance">بدل مواصلات</Label>
                      <Input id="transportAllowance" type="number" placeholder="800" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otherAllowance">بدلات أخرى</Label>
                      <Input id="otherAllowance" type="number" placeholder="500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">اسم البنك</Label>
                      <Input id="bankName" placeholder="البنك الأهلي السعودي" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">رقم الحساب</Label>
                      <Input id="accountNumber" placeholder="123456789" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iban">رقم الآيبان</Label>
                    <Input id="iban" placeholder="SA1234567890123456789012" />
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>صورة شخصية</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">اضغط لرفع الصورة الشخصية</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 ml-2" />
                          رفع صورة
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>نسخة من الهوية/الإقامة</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">اضغط لرفع صورة الهوية</p>
                        <Button type="button" variant="outline" size="sm" className="mt-2">
                          <Upload className="h-4 w-4 ml-2" />
                          رفع مستند
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>العقد الوظيفي</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">اضغط لرفع العقد</p>
                        <Button type="button" variant="outline" size="sm" className="mt-2">
                          <Upload className="h-4 w-4 ml-2" />
                          رفع عقد
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>الشهادات العلمية</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <GraduationCap className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">اضغط لرفع الشهادات</p>
                        <Button type="button" variant="outline" size="sm" className="mt-2">
                          <Upload className="h-4 w-4 ml-2" />
                          رفع شهادة
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  <X className="h-4 w-4 ml-2" />
                  إلغاء
                </Button>
                <Button 
                  onClick={() => {
                    toast({
                      title: "تم إضافة الموظف بنجاح",
                      description: `تم إضافة ${newEmployee.name} إلى النظام`,
                    });
                    setIsAddDialogOpen(false);
                  }}
                >
                  <Save className="h-4 w-4 ml-2" />
                  حفظ الموظف
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Employee Profile Dialog */}
        {selectedEmployee && (
          <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  ملف الموظف: {selectedEmployee.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-primary/5 to-background rounded-lg border">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {selectedEmployee.name.split(' ')[0][0]}{selectedEmployee.name.split(' ')[1]?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
                    <p className="text-lg text-muted-foreground">{selectedEmployee.position}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{getDepartmentText(selectedEmployee.department)}</Badge>
                      <Badge className={getStatusColor(selectedEmployee.status)}>
                        {getStatusText(selectedEmployee.status)}
                      </Badge>
                      <Badge variant="secondary">{getLevelText(selectedEmployee.level)}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">رقم الموظف:</span>
                        <p className="font-medium">{selectedEmployee.employeeNumber}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">تاريخ التوظيف:</span>
                        <p className="font-medium">{selectedEmployee.startDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">سنوات الخبرة:</span>
                        <p className="font-medium">{selectedEmployee.yearsOfExperience} سنوات</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                      <Printer className="h-4 w-4 ml-2" />
                      طباعة
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download className="h-4 w-4 ml-2" />
                      تصدير
                    </Button>
                  </div>
                </div>

                {/* Profile Tabs */}
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-7">
                    <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
                    <TabsTrigger value="job">الوظيفية</TabsTrigger>
                    <TabsTrigger value="financial">المالية</TabsTrigger>
                    <TabsTrigger value="attendance">الحضور والإجازات</TabsTrigger>
                    <TabsTrigger value="performance">الأداء</TabsTrigger>
                    <TabsTrigger value="documents">المستندات</TabsTrigger>
                    <TabsTrigger value="history">السجل</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">المعلومات الأساسية</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الاسم الكامل:</span>
                            <span className="font-medium">{selectedEmployee.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">رقم الهوية:</span>
                            <span className="font-medium">1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الجنسية:</span>
                            <span className="font-medium">سعودي</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الجنس:</span>
                            <span className="font-medium">ذكر</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">تاريخ الميلاد:</span>
                            <span className="font-medium">15/01/1985</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الحالة الاجتماعية:</span>
                            <span className="font-medium">متزوج</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">معلومات التواصل</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">البريد الإلكتروني:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{selectedEmployee.email}</span>
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">رقم الجوال:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{selectedEmployee.phone}</span>
                              <Button variant="ghost" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">العنوان:</span>
                            <span className="font-medium">الرياض، المملكة العربية السعودية</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">الموقع:</span>
                            <Button variant="ghost" size="sm">
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="job" className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">المعلومات الوظيفية</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">المنصب:</span>
                            <span className="font-medium">{selectedEmployee.position}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">القسم:</span>
                            <span className="font-medium">{getDepartmentText(selectedEmployee.department)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">المدير المباشر:</span>
                            <span className="font-medium">{selectedEmployee.manager}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">المستوى:</span>
                            <span className="font-medium">{getLevelText(selectedEmployee.level)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">تاريخ التوظيف:</span>
                            <span className="font-medium">{selectedEmployee.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">نوع العقد:</span>
                            <span className="font-medium">{selectedEmployee.contractType}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">إحصائيات الأداء</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-muted-foreground">تقييم الأداء:</span>
                              <span className="font-medium">{selectedEmployee.performanceScore}%</span>
                            </div>
                            <Progress value={selectedEmployee.performanceScore} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-muted-foreground">معدل الحضور:</span>
                              <span className="font-medium">{selectedEmployee.attendanceRate}%</span>
                            </div>
                            <Progress value={selectedEmployee.attendanceRate} className="h-2" />
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">سنوات الخبرة:</span>
                            <span className="font-medium">{selectedEmployee.yearsOfExperience} سنوات</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="financial" className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            تفاصيل الراتب
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الراتب الأساسي:</span>
                            <span className="font-medium">{selectedEmployee.salary.toLocaleString()} ريال</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">بدل السكن:</span>
                            <span className="font-medium">2,000 ريال</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">بدل المواصلات:</span>
                            <span className="font-medium">800 ريال</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">بدلات أخرى:</span>
                            <span className="font-medium">500 ريال</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>إجمالي الراتب:</span>
                            <span className="text-primary">{(selectedEmployee.salary + 3300).toLocaleString()} ريال</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">البيانات المصرفية</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">اسم البنك:</span>
                            <span className="font-medium">البنك الأهلي السعودي</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">رقم الحساب:</span>
                            <span className="font-medium">****789</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">رقم الآيبان:</span>
                            <span className="font-medium">SA**************789</span>
                          </div>
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm text-yellow-800">البيانات المصرفية محمية ومشفرة</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="attendance" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
                          <p className="text-2xl font-bold">{selectedEmployee.attendanceRate}%</p>
                          <p className="text-sm text-muted-foreground">معدل الحضور</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Calendar className="h-8 w-8 mx-auto text-green-600 mb-2" />
                          <p className="text-2xl font-bold">28</p>
                          <p className="text-sm text-muted-foreground">أيام الإجازة المتبقية</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <AlertTriangle className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                          <p className="text-2xl font-bold">2</p>
                          <p className="text-sm text-muted-foreground">التأخيرات هذا الشهر</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>سجل الحضور الأخير</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {[1,2,3,4,5].map((day) => (
                            <div key={day} className="flex items-center justify-between p-2 rounded border">
                              <span className="text-sm">2024-01-{20-day}</span>
                              <div className="flex gap-4 text-sm">
                                <span className="text-green-600">دخول: 08:00</span>
                                <span className="text-red-600">خروج: 17:00</span>
                                <Badge variant="outline" className="text-xs">9 ساعات</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="performance" className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">التقييمات الحديثة</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <p className="font-medium">التقييم السنوي 2024</p>
                              <p className="text-sm text-muted-foreground">يناير 2024</p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-100 text-green-800">ممتاز</Badge>
                              <p className="text-sm text-muted-foreground">{selectedEmployee.performanceScore}%</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <p className="font-medium">تقييم المشاريع</p>
                              <p className="text-sm text-muted-foreground">ديسمبر 2023</p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-blue-100 text-blue-800">جيد جداً</Badge>
                              <p className="text-sm text-muted-foreground">87%</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">الأهداف والإنجازات</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2">
                            <CheckSquare className="h-4 w-4 text-green-600" />
                            <span className="text-sm">إكمال 5 مشاريع تقنية</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckSquare className="h-4 w-4 text-green-600" />
                            <span className="text-sm">تدريب 3 موظفين جدد</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">حضور دورة في الأمن السيبراني</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">قيادة فريق المشروع الجديد</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: 'نسخة الهوية', type: 'PDF', date: '2024-01-15', icon: FileText },
                        { name: 'العقد الوظيفي', type: 'PDF', date: '2022-01-15', icon: FileText },
                        { name: 'الشهادة الجامعية', type: 'PDF', date: '2022-01-10', icon: GraduationCap },
                        { name: 'شهادة الخبرة', type: 'PDF', date: '2022-01-10', icon: Award },
                        { name: 'التقرير الطبي', type: 'PDF', date: '2024-01-01', icon: Heart },
                        { name: 'صورة شخصية', type: 'JPG', date: '2022-01-15', icon: Camera }
                      ].map((doc, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4 text-center">
                            <doc.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                            <p className="font-medium text-sm mb-1">{doc.name}</p>
                            <p className="text-xs text-muted-foreground mb-2">{doc.type} • {doc.date}</p>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>سجل التغييرات والأنشطة</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { action: 'تحديث البيانات الشخصية', date: '2024-01-15 10:30', user: 'أحمد محمد' },
                            { action: 'زيادة الراتب الأساسي', date: '2024-01-01 09:00', user: 'إدارة الموارد البشرية' },
                            { action: 'تقييم الأداء السنوي', date: '2023-12-30 14:00', user: 'محمد الخالدي' },
                            { action: 'طلب إجازة سنوية', date: '2023-12-15 11:00', user: 'أحمد محمد' },
                            { action: 'حضور دورة تدريبية', date: '2023-11-20 08:00', user: 'قسم التدريب' }
                          ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 border rounded">
                              <div className="p-2 bg-primary/10 rounded-full">
                                <Activity className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{activity.action}</p>
                                <p className="text-sm text-muted-foreground">بواسطة: {activity.user}</p>
                              </div>
                              <span className="text-sm text-muted-foreground">{activity.date}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Tasks & Notes Section (rendered when activeTab is 'tasks') */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden">
          <TabsContent value="tasks">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">المهام والملاحظات</h2>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة مهمة
                </Button>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      المهام المعلقة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <Checkbox />
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-sm text-muted-foreground">مُسند إلى: {task.assignee}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={task.status === 'مكتمل' ? 'default' : 'secondary'}>
                              {task.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{task.dueDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      ملاحظات HR
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-yellow-800">
                          موظف متميز، يُنصح بترقيته للمستوى الأعلى
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">15 يناير 2024</p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-sm text-blue-800">
                          حضر دورة تدريبية في الأمن السيبراني
                        </p>
                        <p className="text-xs text-blue-600 mt-1">10 يناير 2024</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm text-green-800">
                          أكمل مشروع التطوير بنجاح قبل الموعد المحدد
                        </p>
                        <p className="text-xs text-green-600 mt-1">5 يناير 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة ملاحظة
                    </Button>
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