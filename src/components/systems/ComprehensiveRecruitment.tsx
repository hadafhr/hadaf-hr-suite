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
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Users, 
  Briefcase, 
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
  User
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface ComprehensiveRecruitmentProps {
  onBack: () => void;
}

interface RecruitmentCandidate {
  id: string;
  candidateNumber: string;
  name: string;
  position: string;
  department: 'IT' | 'HR' | 'Finance' | 'Marketing' | 'Operations' | 'Sales';
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager';
  experience: string;
  email: string;
  phone: string;
  appliedDate: string;
  source: string;
  resumeScore: number;
  interviewScore: number;
  yearsOfExperience: number;
  expectedSalary: number;
}

interface JobPosition {
  id: string;
  name: string;
  department: string;
  candidates: number;
  budget: number;
  performance: number;
  description: string;
}

interface RecruitmentMetric {
  id: string;
  metric: string;
  category: 'Applications' | 'Interviews' | 'Hiring' | 'Performance' | 'Quality';
  status: 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const ComprehensiveRecruitment: React.FC<ComprehensiveRecruitmentProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const recruitmentCandidates: RecruitmentCandidate[] = [
    {
      id: '1',
      candidateNumber: 'CAN-2024-001',
      name: 'أحمد محمد السعيد',
      position: 'مطور برمجيات أول',
      department: 'IT',
      status: 'Interview',
      level: 'Senior',
      experience: 'مطور برمجيات خبير',
      email: 'ahmed.saeed@company.com',
      phone: '+966501234567',
      appliedDate: '2024-01-15',
      source: 'موقع الشركة',
      resumeScore: 92,
      interviewScore: 88,
      yearsOfExperience: 5,
      expectedSalary: 12000
    },
    {
      id: '2',
      candidateNumber: 'CAN-2024-002',
      name: 'فاطمة عبدالله النور',
      position: 'محاسبة رئيسية',
      department: 'Finance',
      status: 'Offer',
      level: 'Mid',
      experience: 'محاسبة مؤهلة',
      email: 'fatima.noor@company.com',
      phone: '+966502345678',
      appliedDate: '2024-01-10',
      source: 'لينكد إن',
      resumeScore: 88,
      interviewScore: 95,
      yearsOfExperience: 3,
      expectedSalary: 10000
    }
  ];

  const jobPositions: JobPosition[] = [
    {
      id: '1',
      name: 'وظائف تقنية المعلومات',
      department: 'محمد أحمد الخالدي',
      candidates: 15,
      budget: 500000,
      performance: 92,
      description: 'مطورين ومهندسي أنظمة'
    },
    {
      id: '2',
      name: 'وظائف الموارد البشرية',
      department: 'نورا أحمد السالم',
      candidates: 8,
      budget: 200000,
      performance: 95,
      description: 'أخصائيي موارد بشرية وتوظيف'
    }
  ];

  const recruitmentMetrics: RecruitmentMetric[] = [
    {
      id: '1',
      metric: 'معدل جودة المرشحين',
      category: 'Quality',
      status: 'Excellent',
      value: 89,
      target: 85,
      trend: 'up',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      metric: 'معدل إنجاز التوظيف',
      category: 'Hiring',
      status: 'Good',
      value: 94,
      target: 95,
      trend: 'stable',
      lastUpdated: '2024-01-15'
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'يناير', applications: 85, interviews: 92, hired: 15 },
    { month: 'فبراير', applications: 87, interviews: 94, hired: 18 },
    { month: 'مارس', applications: 89, interviews: 96, hired: 20 },
    { month: 'أبريل', applications: 88, interviews: 93, hired: 17 },
    { month: 'مايو', applications: 91, interviews: 95, hired: 22 },
    { month: 'يونيو', applications: 93, interviews: 97, hired: 25 }
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
    totalCandidates: 127,
    activeCandidates: 85,
    positions: 12,
    avgPerformance: 89,
    avgQuality: 94,
    avgHiringTime: 21
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير التوظيف كملف PDF",
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
      case 'Applied': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Screening': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Interview': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Offer': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Hired': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'Applied': 'تقدم للوظيفة',
      'Screening': 'فحص أولي',
      'Interview': 'مقابلة شخصية',
      'Offer': 'عرض وظيفي',
      'Hired': 'تم التوظيف',
      'Rejected': 'مرفوض'
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
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  التوظيف والاستقطاب
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة عمليات التوظيف والمرشحين مع أدوات التحليل المتقدمة والتقارير التفصيلية
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
              مرشح جديد
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
                <p className="text-sm text-muted-foreground">إجمالي المرشحين</p>
                <p className="text-2xl font-bold text-primary">{stats.totalCandidates}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مرشحين نشطين</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activeCandidates}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الوظائف المفتوحة</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.positions}</p>
              </div>
              <Building className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الجودة</p>
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
                <p className="text-sm text-muted-foreground">معدل القبول</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgQuality}%</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط التوظيف (يوم)</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgHiringTime}</p>
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
              أداء التوظيف
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="interviews" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="hired" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
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
            رؤى الذكاء الاصطناعي للتوظيف والاستقطاب
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">جودة ممتازة</span>
              </div>
              <p className="text-sm text-emerald-700">
                تحسن ملحوظ في جودة المرشحين المتقدمين بنسبة 15%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحسين مطلوب</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بتحسين عملية الفحص الأولي لتسريع الوقت
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لتحقيق أهداف التوظيف بنسبة 105%
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
                  <p className="text-sm font-medium">مرشح جديد</p>
                  <p className="text-xs text-muted-foreground">سارة أحمد - أخصائية تسويق</p>
                </div>
                <span className="text-xs text-muted-foreground">منذ ساعتين</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-blue-100">
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تم قبول المرشح</p>
                  <p className="text-xs text-muted-foreground">محمد عبدالله - تم التوظيف</p>
                </div>
                <span className="text-xs text-muted-foreground">أمس</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-orange-100">
                  <Calendar className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">مقابلة مجدولة</p>
                  <p className="text-xs text-muted-foreground">فاطمة النور - مقابلة نهائية</p>
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
              أداء الوظائف
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobPositions.slice(0, 4).map((position) => (
                <div key={position.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Building className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{position.name}</p>
                      <p className="text-sm text-muted-foreground">{position.candidates} مرشح</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{position.performance}%</p>
                    <Progress value={position.performance} className="w-16 h-1 mt-1" />
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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/src/assets/boud-logo-centered.png" 
            alt="Boud Logo" 
            className="h-32 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">نظام التوظيف والتعيين</h1>
          <p className="text-gray-600">إدارة عمليات التوظيف والمرشحين</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b border-border">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="candidates">المرشحين</TabsTrigger>
              <TabsTrigger value="positions">الوظائف</TabsTrigger>
              <TabsTrigger value="interviews">المقابلات</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="candidates">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">إدارة المرشحين</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة مرشح
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>قائمة المرشحين</CardTitle>
                  <div className="flex gap-4 mt-4">
                    <Input
                      placeholder="البحث في المرشحين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="Applied">تقدم للوظيفة</SelectItem>
                        <SelectItem value="Screening">فحص أولي</SelectItem>
                        <SelectItem value="Interview">مقابلة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {recruitmentCandidates.map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate.position}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">{getDepartmentText(candidate.department)}</Badge>
                              <Badge className={getStatusColor(candidate.status)}>
                                {getStatusText(candidate.status)}
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

          <TabsContent value="positions">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إدارة الوظائف</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {jobPositions.map((position) => (
                  <Card key={position.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        {position.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{position.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">عدد المرشحين</p>
                            <p className="text-2xl font-bold">{position.candidates}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">الميزانية</p>
                            <p className="text-2xl font-bold text-green-600">{position.budget.toLocaleString()}</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-muted-foreground">الأداء</span>
                            <span className="text-sm font-medium">{position.performance}%</span>
                          </div>
                          <Progress value={position.performance} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interviews">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إدارة المقابلات</h2>
              <Card>
                <CardHeader>
                  <CardTitle>المقابلات المجدولة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">إدارة المقابلات</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">التقارير والإحصائيات</h2>
              <Card>
                <CardHeader>
                  <CardTitle>تقارير التوظيف</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">تقارير التوظيف</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إعدادات النظام</h2>
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات التوظيف</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">إعدادات النظام</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveRecruitment;