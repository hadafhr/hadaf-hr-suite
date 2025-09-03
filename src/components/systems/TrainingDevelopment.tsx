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
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  Building,
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
  Play,
  Video,
  ClipboardCheck,
  FileText,
  Brain
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface TrainingDevelopmentProps {
  onBack: () => void;
}

interface TrainingProgram {
  id: string;
  name: string;
  nameEn: string;
  category: 'leadership' | 'technical' | 'compliance' | 'soft-skills';
  status: 'active' | 'completed' | 'cancelled' | 'pending';
  description: string;
  lastUpdate?: string;
  duration: string;
  successRate: number;
  enrolledEmployees: number;
}

interface TrainingCategory {
  id: string;
  name: string;
  head: string;
  programs: number;
  active: number;
  performance: number;
  description: string;
}

interface TrainingMetric {
  id: string;
  metric: string;
  category: 'Performance' | 'Completion' | 'Programs' | 'Employees' | 'Satisfaction';
  status: 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const TrainingDevelopment: React.FC<TrainingDevelopmentProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const trainingPrograms: TrainingProgram[] = [
    {
      id: '1',
      name: 'برنامج تطوير القيادة',
      nameEn: 'Leadership Development',
      category: 'leadership',
      status: 'active',
      description: 'تطوير مهارات القيادة والإدارة للموظفين',
      lastUpdate: '2024-01-20 09:30',
      duration: '3 أشهر',
      successRate: 92,
      enrolledEmployees: 45
    },
    {
      id: '2',
      name: 'التدريب التقني المتقدم',
      nameEn: 'Advanced Technical Training',
      category: 'technical',
      status: 'active',
      description: 'تحديث المهارات التقنية والبرمجية',
      lastUpdate: '2024-01-19 14:15',
      duration: '6 أسابيع',
      successRate: 88,
      enrolledEmployees: 32
    },
    {
      id: '3',
      name: 'تدريب الامتثال والأمان',
      nameEn: 'Compliance & Safety Training',
      category: 'compliance',
      status: 'active',
      description: 'تدريب على قوانين الأمان والامتثال',
      lastUpdate: '2024-01-18 10:45',
      duration: '4 أسابيع',
      successRate: 96,
      enrolledEmployees: 78
    },
    {
      id: '4',
      name: 'مهارات التواصل الفعال',
      nameEn: 'Effective Communication Skills',
      category: 'soft-skills',
      status: 'completed',
      description: 'تطوير مهارات التواصل والعرض',
      lastUpdate: '2024-01-15 16:30',
      duration: '2 أسابيع',
      successRate: 94,
      enrolledEmployees: 56
    }
  ];

  const trainingCategories: TrainingCategory[] = [
    {
      id: '1',
      name: 'برامج القيادة',
      head: 'سارة أحمد المحمد',
      programs: 8,
      active: 6,
      performance: 92,
      description: 'تطوير المهارات القيادية والإدارية'
    },
    {
      id: '2',
      name: 'التدريب التقني',
      head: 'محمد عبدالله الشهري',
      programs: 12,
      active: 9,
      performance: 88,
      description: 'برامج التطوير التقني والمهني'
    },
    {
      id: '3',
      name: 'الامتثال والأمان',
      head: 'فاطمة سالم القحطاني',
      programs: 6,
      active: 5,
      performance: 96,
      description: 'تدريبات الأمان والامتثال المؤسسي'
    }
  ];

  const trainingMetrics: TrainingMetric[] = [
    {
      id: '1',
      metric: 'معدل إكمال التدريب',
      category: 'Performance',
      status: 'Excellent',
      value: 94,
      target: 90,
      trend: 'up',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      metric: 'رضا المتدربين',
      category: 'Satisfaction',
      status: 'Good',
      value: 87,
      target: 90,
      trend: 'stable',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      metric: 'عدد البرامج النشطة',
      category: 'Programs',
      status: 'Excellent',
      value: 26,
      target: 20,
      trend: 'up',
      lastUpdated: '2024-01-15'
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'يناير', completion: 85, satisfaction: 92, programs: 15 },
    { month: 'فبراير', completion: 87, satisfaction: 94, programs: 18 },
    { month: 'مارس', completion: 89, satisfaction: 96, programs: 20 },
    { month: 'أبريل', completion: 88, satisfaction: 93, programs: 17 },
    { month: 'مايو', completion: 91, satisfaction: 95, programs: 22 },
    { month: 'يونيو', completion: 93, satisfaction: 97, programs: 25 }
  ];

  const departmentDistribution = [
    { name: 'برامج القيادة', value: 35, color: '#3b82f6' },
    { name: 'التدريب التقني', value: 30, color: '#10b981' },
    { name: 'الامتثال والأمان', value: 20, color: '#f59e0b' },
    { name: 'المهارات الناعمة', value: 15, color: '#8b5cf6' }
  ];

  // Calculate statistics
  const stats = {
    totalPrograms: trainingPrograms.length,
    activePrograms: trainingPrograms.filter(p => p.status === 'active').length,
    categories: trainingCategories.length,
    avgCompletion: 94,
    avgSatisfaction: 87,
    totalEmployees: 2847
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير التدريب والتطوير كملف PDF",
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
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'نشط',
      'pending': 'في الانتظار',
      'completed': 'مكتمل',
      'cancelled': 'ملغى'
    };
    return statusMap[status] || status;
  };

  const getCategoryText = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'leadership': 'قيادة',
      'technical': 'تقني',
      'compliance': 'امتثال',
      'soft-skills': 'مهارات ناعمة'
    };
    return categoryMap[category] || category;
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
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  التدريب والتطوير
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة برامج التدريب وتطوير المهارات مع أدوات التحليل المتقدمة والتقارير التفصيلية
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
              برنامج جديد
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
                <p className="text-sm text-muted-foreground">إجمالي البرامج</p>
                <p className="text-2xl font-bold text-primary">{stats.totalPrograms}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">برامج نشطة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activePrograms}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الفئات</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.categories}</p>
              </div>
              <Building className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الإكمال</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgCompletion}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الرضا</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgSatisfaction}%</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-green-500/60" />
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
              أداء التدريب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="completion" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="satisfaction" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="programs" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع البرامج
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
            رؤى الذكاء الاصطناعي للتدريب والتطوير
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
                تحسن ملحوظ في معدلات إكمال التدريب بنسبة 12% هذا الشهر
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحديث مطلوب</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بتحديث محتوى برامج التدريب التقني لمواكبة التطورات
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لزيادة رضا المتدربين إلى 95% في الربع القادم
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
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تم إنشاء برنامج جديد</p>
                  <p className="text-xs text-muted-foreground">برنامج تطوير القيادة - منذ ساعتين</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-blue-100">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تسجيل موظفين جدد</p>
                  <p className="text-xs text-muted-foreground">15 موظف في برنامج الامتثال - منذ 4 ساعات</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-yellow-100">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">شهادة تنتهي قريباً</p>
                  <p className="text-xs text-muted-foreground">شهادة الأمان - خلال أسبوع</p>
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
                <Plus className="h-5 w-5" />
                <span className="text-xs">إضافة برنامج</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Users className="h-5 w-5" />
                <span className="text-xs">تسجيل موظفين</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Award className="h-5 w-5" />
                <span className="text-xs">إصدار شهادات</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">تقرير التقدم</span>
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
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="programs">برامج التدريب</TabsTrigger>
              <TabsTrigger value="records">سجلات الموظفين</TabsTrigger>
              <TabsTrigger value="paths">مسارات التعلم</TabsTrigger>
              <TabsTrigger value="elearning">التعلم الإلكتروني</TabsTrigger>
              <TabsTrigger value="assessments">التقييمات</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="programs">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">برامج التدريب</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة برنامج جديد
                </Button>
              </div>

              <div className="grid gap-6">
                {trainingPrograms.map((program) => (
                  <Card key={program.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        {program.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">الحالة: {getStatusText(program.status)}</p>
                          <p className="text-sm text-muted-foreground">آخر تحديث: {program.lastUpdate}</p>
                        </div>
                        <Badge className={getStatusColor(program.status)}>{getStatusText(program.status)}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{program.enrolledEmployees}</p>
                          <p className="text-sm text-muted-foreground">موظف مسجل</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{program.successRate}%</p>
                          <p className="text-sm text-muted-foreground">معدل النجاح</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{program.duration}</p>
                          <p className="text-sm text-muted-foreground">المدة</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-orange-600">{getCategoryText(program.category)}</p>
                          <p className="text-sm text-muted-foreground">الفئة</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 ml-2" />
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 ml-2" />
                          إدارة المتدربين
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 ml-2" />
                          تحميل التقرير
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="records">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">سجلات تدريب الموظفين</h2>
                <Button>
                  <Users className="h-4 w-4 ml-2" />
                  إضافة موظف للتدريب
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">سيتم تطوير واجهة سجلات التدريب هنا...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="paths">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">مسارات التعلم</h2>
                <Button>
                  <Target className="h-4 w-4 ml-2" />
                  إنشاء مسار جديد
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">سيتم تطوير واجهة مسارات التعلم هنا...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="elearning">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">منصات التعلم الإلكتروني</h2>
                <Button>
                  <Video className="h-4 w-4 ml-2" />
                  ربط منصة جديدة
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">سيتم تطوير واجهة التعلم الإلكتروني هنا...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assessments">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">التقييمات والتقييم</h2>
                <Button>
                  <ClipboardCheck className="h-4 w-4 ml-2" />
                  إنشاء تقييم جديد
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">سيتم تطوير واجهة التقييمات هنا...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">تقارير التدريب</h2>
                <Button>
                  <FileText className="h-4 w-4 ml-2" />
                  إنشاء تقرير مخصص
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">سيتم تطوير واجهة التقارير هنا...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">إعدادات التدريب</h2>
                <Button>
                  <Settings className="h-4 w-4 ml-2" />
                  إعدادات متقدمة
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">سيتم تطوير واجهة الإعدادات هنا...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrainingDevelopment;