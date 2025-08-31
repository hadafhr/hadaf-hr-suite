import React, { useState } from 'react';
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
import { SystemHeader } from '@/components/shared/SystemHeader';
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
  Users2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
                <h2 className="text-2xl font-bold">إدارة الموظفين</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة موظف
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>قائمة الموظفين</CardTitle>
                  <div className="flex gap-4 mt-4">
                    <Input
                      placeholder="البحث في الموظفين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder="تصفية حسب القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأقسام</SelectItem>
                        <SelectItem value="IT">تقنية المعلومات</SelectItem>
                        <SelectItem value="HR">الموارد البشرية</SelectItem>
                        <SelectItem value="Finance">المالية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.position}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">{getDepartmentText(member.department)}</Badge>
                              <Badge className={getStatusColor(member.status)}>
                                {getStatusText(member.status)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
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
      </div>
    </div>
  );
};