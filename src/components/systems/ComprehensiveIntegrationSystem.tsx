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
  Network, 
  Building2, 
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
  Users
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface ComprehensiveIntegrationSystemProps {
  onBack: () => void;
}

interface IntegrationPlatform {
  id: string;
  name: string;
  nameEn: string;
  category: 'government' | 'financial' | 'insurance' | 'complementary';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  description: string;
  lastSync?: string;
  syncFrequency: string;
  successRate: number;
  dailyOperations: number;
}

interface PlatformCategory {
  id: string;
  name: string;
  head: string;
  platforms: number;
  connections: number;
  performance: number;
  description: string;
}

interface IntegrationMetric {
  id: string;
  metric: string;
  category: 'Performance' | 'Sync' | 'Platforms' | 'Operations' | 'Compliance';
  status: 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const ComprehensiveIntegrationSystem: React.FC<ComprehensiveIntegrationSystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const integrationPlatforms: IntegrationPlatform[] = [
    {
      id: '1',
      name: 'مؤسسة التأمينات الاجتماعية',
      nameEn: 'GOSI',
      category: 'government',
      status: 'connected',
      description: 'التسجيل التلقائي للموظفين ومزامنة الرواتب',
      lastSync: '2024-01-20 09:30',
      syncFrequency: 'شهريًا',
      successRate: 98,
      dailyOperations: 156
    },
    {
      id: '2',
      name: 'منصة مدد',
      nameEn: 'Mudad',
      category: 'government',
      status: 'connected',
      description: 'حماية الأجور ورفع ملفات الرواتب',
      lastSync: '2024-01-19 14:15',
      syncFrequency: 'شهريًا',
      successRate: 100,
      dailyOperations: 89
    },
    {
      id: '3',
      name: 'نظام ساب SAP',
      nameEn: 'SAP System',
      category: 'financial',
      status: 'syncing',
      description: 'تكامل مع نظام الموارد البشرية والمالية',
      lastSync: '2024-01-18 10:45',
      syncFrequency: 'يوميًا',
      successRate: 95,
      dailyOperations: 234
    },
    {
      id: '4',
      name: 'بوابة أبشر',
      nameEn: 'Absher Portal',
      category: 'government',
      status: 'connected',
      description: 'خدمات الهوية الرقمية والتوثيق الإلكتروني',
      lastSync: '2024-01-20 08:15',
      syncFrequency: 'أسبوعيًا',
      successRate: 99,
      dailyOperations: 78
    }
  ];

  const platformCategories: PlatformCategory[] = [
    {
      id: '1',
      name: 'المنصات الحكومية',
      head: 'محمد أحمد الخالدي',
      platforms: 5,
      connections: 4,
      performance: 92,
      description: 'ربط مع الجهات الحكومية والمنصات الرسمية'
    },
    {
      id: '2',
      name: 'الأنظمة المالية',
      head: 'نورا أحمد السالم',
      platforms: 3,
      connections: 2,
      performance: 95,
      description: 'تكامل مع الأنظمة المالية والمحاسبية'
    },
    {
      id: '3',
      name: 'شركات التأمين',
      head: 'فاطمة محمد العبدالله',
      platforms: 2,
      connections: 1,
      performance: 88,
      description: 'ربط مع شركات التأمين الطبي والاجتماعي'
    }
  ];

  const integrationMetrics: IntegrationMetric[] = [
    {
      id: '1',
      metric: 'معدل نجاح التكامل',
      category: 'Performance',
      status: 'Excellent',
      value: 97,
      target: 95,
      trend: 'up',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      metric: 'معدل المزامنة',
      category: 'Sync',
      status: 'Good',
      value: 94,
      target: 95,
      trend: 'stable',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      metric: 'عدد المنصات المتصلة',
      category: 'Platforms',
      status: 'Excellent',
      value: 10,
      target: 8,
      trend: 'up',
      lastUpdated: '2024-01-15'
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'يناير', performance: 85, sync: 92, platforms: 15 },
    { month: 'فبراير', performance: 87, sync: 94, platforms: 18 },
    { month: 'مارس', performance: 89, sync: 96, platforms: 20 },
    { month: 'أبريل', performance: 88, sync: 93, platforms: 17 },
    { month: 'مايو', performance: 91, sync: 95, platforms: 22 },
    { month: 'يونيو', performance: 93, sync: 97, platforms: 25 }
  ];

  const departmentDistribution = [
    { name: 'المنصات الحكومية', value: 35, color: '#3b82f6' },
    { name: 'الأنظمة المالية', value: 20, color: '#10b981' },
    { name: 'شركات التأمين', value: 15, color: '#f59e0b' },
    { name: 'المنصات التكميلية', value: 18, color: '#8b5cf6' },
    { name: 'أنظمة أخرى', value: 12, color: '#ef4444' }
  ];

  // Calculate statistics
  const stats = {
    totalPlatforms: integrationPlatforms.length,
    connectedPlatforms: integrationPlatforms.filter(p => p.status === 'connected').length,
    categories: platformCategories.length,
    avgPerformance: 97,
    avgSync: 94,
    avgOperations: 1247
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير التكامل والربط كملف PDF",
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
      case 'connected': return 'bg-green-100 text-green-800 border-green-200';
      case 'syncing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'disconnected': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'connected': 'متصل',
      'syncing': 'يتم المزامنة',
      'disconnected': 'غير متصل',
      'error': 'خطأ في الاتصال'
    };
    return statusMap[status] || status;
  };

  const getCategoryText = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'government': 'حكومية',
      'financial': 'مالية',
      'insurance': 'تأمين',
      'complementary': 'تكميلية'
    };
    return categoryMap[category] || category;
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <Network className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام التكامل والربط المتطور
            </h1>
            <p className="text-gray-600 text-lg">
              منظومة شاملة لربط وتكامل الأنظمة مع المنصات الحكومية والخارجية
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <Network className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4 ml-2" />
          تكامل جديد
        </Button>
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
                <p className="text-sm text-muted-foreground">إجمالي المنصات</p>
                <p className="text-2xl font-bold text-primary">{stats.totalPlatforms}</p>
              </div>
              <Network className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">منصات متصلة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.connectedPlatforms}</p>
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
                <p className="text-sm text-muted-foreground">متوسط المزامنة</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgSync}%</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">العمليات اليومية</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgOperations}</p>
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
              أداء التكامل
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
                <Area type="monotone" dataKey="sync" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="platforms" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المنصات
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
            رؤى الذكاء الاصطناعي للتكامل والربط
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">تكامل ممتاز</span>
              </div>
              <p className="text-sm text-emerald-700">
                تحسن ملحوظ في مؤشرات التكامل العامة للمنصات بنسبة 15%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحديث مطلوب</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بتحديث بيانات الاتصال لنظام SAP لتحسين الأداء
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لزيادة كفاءة المزامنة إلى 99%
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
                  <p className="text-sm font-medium">تم ربط منصة جديدة</p>
                  <p className="text-xs text-muted-foreground">منصة أبشر - منذ ساعتين</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-blue-100">
                  <RefreshCw className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">مزامنة البيانات</p>
                  <p className="text-xs text-muted-foreground">GOSI - منذ 4 ساعات</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-yellow-100">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تحديث مطلوب</p>
                  <p className="text-xs text-muted-foreground">منصة مدد - منذ يوم</p>
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
                <span className="text-xs">إضافة منصة</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <RefreshCw className="h-5 w-5" />
                <span className="text-xs">مزامنة البيانات</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Settings className="h-5 w-5" />
                <span className="text-xs">إعدادات التكامل</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">تقرير الأداء</span>
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
              <TabsTrigger value="hr-systems">تكامل أنظمة الموارد البشرية</TabsTrigger>
              <TabsTrigger value="financial-systems">تكامل الأنظمة المالية</TabsTrigger>
              <TabsTrigger value="external-services">ربط الخدمات الخارجية</TabsTrigger>
              <TabsTrigger value="custom-api">إدارة واجهات برمجة التطبيقات</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="hr-systems">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">تكامل أنظمة الموارد البشرية</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة تكامل جديد
                </Button>
              </div>

              <div className="grid gap-6">
                {/* QIWA Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      منصة قوى (QIWA)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">الحالة: متصل</p>
                        <p className="text-sm text-muted-foreground">آخر مزامنة: اليوم 09:30 ص</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">156</p>
                        <p className="text-sm text-muted-foreground">عقود مرفوعة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">98%</p>
                        <p className="text-sm text-muted-foreground">معدل النجاح</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">12</p>
                        <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">3</p>
                        <p className="text-sm text-muted-foreground">تحديثات مطلوبة</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 ml-2" />
                        مزامنة الآن
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 ml-2" />
                        إعدادات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل السجلات
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* MUDAD Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      منصة مدد (MUDAD)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">الحالة: متصل</p>
                        <p className="text-sm text-muted-foreground">آخر مزامنة: أمس 14:15</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">89</p>
                        <p className="text-sm text-muted-foreground">ملفات رواتب</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">100%</p>
                        <p className="text-sm text-muted-foreground">معدل النجاح</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">0</p>
                        <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">1</p>
                        <p className="text-sm text-muted-foreground">تحديثات مطلوبة</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 ml-2" />
                        مزامنة الآن
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 ml-2" />
                        إعدادات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل السجلات
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* GOSI Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      مؤسسة التأمينات الاجتماعية (GOSI)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">الحالة: يتم المزامنة</p>
                        <p className="text-sm text-muted-foreground">آخر مزامنة: منذ ساعتين</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">جاري المزامنة</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">234</p>
                        <p className="text-sm text-muted-foreground">موظفين مسجلين</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">95%</p>
                        <p className="text-sm text-muted-foreground">معدل النجاح</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">5</p>
                        <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">2</p>
                        <p className="text-sm text-muted-foreground">تحديثات مطلوبة</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 ml-2" />
                        مزامنة الآن
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 ml-2" />
                        إعدادات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل السجلات
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* TAM Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      منصة طاقات (TAM)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">الحالة: متصل</p>
                        <p className="text-sm text-muted-foreground">آخر مزامنة: اليوم 08:15 ص</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">78</p>
                        <p className="text-sm text-muted-foreground">بيانات حضور</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">99%</p>
                        <p className="text-sm text-muted-foreground">معدل النجاح</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">1</p>
                        <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">0</p>
                        <p className="text-sm text-muted-foreground">تحديثات مطلوبة</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 ml-2" />
                        مزامنة الآن
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 ml-2" />
                        إعدادات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل السجلات
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial-systems">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">تكامل الأنظمة المالية</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة نظام مالي
                </Button>
              </div>

              <div className="grid gap-6">
                {/* SAP Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      نظام ساب (SAP)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">الحالة: متصل</p>
                        <p className="text-sm text-muted-foreground">آخر مزامنة: اليوم 10:45 ص</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">1,247</p>
                        <p className="text-sm text-muted-foreground">معاملات الرواتب</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">97%</p>
                        <p className="text-sm text-muted-foreground">معدل النجاح</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">15</p>
                        <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">2</p>
                        <p className="text-sm text-muted-foreground">أخطاء بسيطة</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 ml-2" />
                        مزامنة الآن
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 ml-2" />
                        إعدادات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        تصدير البيانات
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Banking Systems */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      الأنظمة المصرفية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">البنك الأهلي التجاري</h3>
                            <p className="text-sm text-muted-foreground">تحويلات الرواتب التلقائية</p>
                            <Badge className="bg-green-100 text-green-800 mt-1">متصل</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">بنك الرياض</h3>
                            <p className="text-sm text-muted-foreground">خدمات التحويل والدفع</p>
                            <Badge className="bg-green-100 text-green-800 mt-1">متصل</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">البنك السعودي للاستثمار</h3>
                            <p className="text-sm text-muted-foreground">إدارة الحسابات المالية</p>
                            <Badge className="bg-yellow-100 text-yellow-800 mt-1">قيد الإعداد</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Accounting Systems */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      أنظمة المحاسبة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">الحالة: متصل</p>
                        <p className="text-sm text-muted-foreground">آخر مزامنة: منذ ساعة</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">456</p>
                        <p className="text-sm text-muted-foreground">قيود محاسبية</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">99%</p>
                        <p className="text-sm text-muted-foreground">دقة البيانات</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">23</p>
                        <p className="text-sm text-muted-foreground">تقارير مالية</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">0</p>
                        <p className="text-sm text-muted-foreground">تناقضات</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 ml-2" />
                        مزامنة الآن
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 ml-2" />
                        إعدادات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        تصدير التقارير
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="external-services">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">ربط الخدمات الخارجية</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة خدمة خارجية
                </Button>
              </div>

              <div className="grid gap-6">
                {/* Tameeni Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      شركات التأمين الطبي (تأمينى)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">الحالة: متصل</p>
                        <p className="text-sm text-muted-foreground">آخر مزامنة: اليوم 11:20 ص</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">234</p>
                        <p className="text-sm text-muted-foreground">موظفين مؤمنين</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">88%</p>
                        <p className="text-sm text-muted-foreground">معدل الموافقة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">12</p>
                        <p className="text-sm text-muted-foreground">طلبات جديدة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">3</p>
                        <p className="text-sm text-muted-foreground">مطالبات معلقة</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 ml-2" />
                        مزامنة الآن
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 ml-2" />
                        إعدادات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        تقرير المطالبات
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Management Systems */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      أنظمة إدارة المركبات
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">الحالة: متصل</p>
                        <p className="text-sm text-muted-foreground">آخر مزامنة: منذ 30 دقيقة</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">45</p>
                        <p className="text-sm text-muted-foreground">مركبات مسجلة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">92%</p>
                        <p className="text-sm text-muted-foreground">معدل التتبع</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">156</p>
                        <p className="text-sm text-muted-foreground">رحلات اليوم</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">2</p>
                        <p className="text-sm text-muted-foreground">تنبيهات</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 ml-2" />
                        مزامنة الآن
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 ml-2" />
                        إعدادات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        تقرير الرحلات
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Government e-Services */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      الخدمات الحكومية الإلكترونية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">بوابة أبشر</h3>
                            <p className="text-sm text-muted-foreground">خدمات الهوية الرقمية</p>
                            <Badge className="bg-green-100 text-green-800 mt-1">متصل</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">منصة مقيم</h3>
                            <p className="text-sm text-muted-foreground">خدمات الإقامة والعمالة</p>
                            <Badge className="bg-green-100 text-green-800 mt-1">متصل</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">منصة بلدي</h3>
                            <p className="text-sm text-muted-foreground">خدمات الرخص التجارية</p>
                            <Badge className="bg-yellow-100 text-yellow-800 mt-1">قيد الإعداد</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom-api">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">إدارة واجهات برمجة التطبيقات المخصصة</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة API مخصص
                </Button>
              </div>

              <div className="grid gap-6">
                {/* API Connections List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      الاتصالات المخصصة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Database className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">نظام CRM الداخلي</h3>
                            <p className="text-sm text-muted-foreground">https://api.company-crm.com/v1</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">OAuth 2.0</Badge>
                              <Badge className="bg-green-100 text-green-800">متصل</Badge>
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
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">نظام إدارة المشاريع</h3>
                            <p className="text-sm text-muted-foreground">https://api.project-mgmt.com/v2</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">API Key</Badge>
                              <Badge className="bg-green-100 text-green-800">متصل</Badge>
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
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">خدمة الرسائل الإلكترونية</h3>
                            <p className="text-sm text-muted-foreground">https://api.email-service.com/v1</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">Bearer Token</Badge>
                              <Badge className="bg-yellow-100 text-yellow-800">خطأ في الاتصال</Badge>
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
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* API Logs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      سجل الطلبات والاستجابات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-100 text-green-800">200</Badge>
                          <span className="text-sm font-medium">GET /api/employees</span>
                          <span className="text-xs text-muted-foreground">نظام CRM الداخلي</span>
                        </div>
                        <span className="text-xs text-muted-foreground">منذ دقيقتين</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-100 text-green-800">201</Badge>
                          <span className="text-sm font-medium">POST /api/projects</span>
                          <span className="text-xs text-muted-foreground">نظام إدارة المشاريع</span>
                        </div>
                        <span className="text-xs text-muted-foreground">منذ 5 دقائق</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-red-100 text-red-800">500</Badge>
                          <span className="text-sm font-medium">POST /api/send-email</span>
                          <span className="text-xs text-muted-foreground">خدمة الرسائل الإلكترونية</span>
                        </div>
                        <span className="text-xs text-muted-foreground">منذ 10 دقائق</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-100 text-green-800">200</Badge>
                          <span className="text-sm font-medium">GET /api/sync-status</span>
                          <span className="text-xs text-muted-foreground">نظام CRM الداخلي</span>
                        </div>
                        <span className="text-xs text-muted-foreground">منذ 15 دقيقة</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض جميع السجلات
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* API Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      إحصائيات الاستخدام
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">1,247</p>
                        <p className="text-sm text-muted-foreground">طلبات اليوم</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">97%</p>
                        <p className="text-sm text-muted-foreground">معدل النجاح</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">156ms</p>
                        <p className="text-sm text-muted-foreground">متوسط الاستجابة</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">12</p>
                        <p className="text-sm text-muted-foreground">أخطاء اليوم</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                      تقرير المنصات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      تقرير شامل بجميع بيانات المنصات والتكامل
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
                      تقرير المزامنة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      ملخص المزامنة والاتصال لجميع المنصات
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
                    <Label>مدة انتظار الاتصال (ثواني)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>عدد محاولات إعادة الاتصال</Label>
                    <Input type="number" defaultValue="3" />
                  </div>

                  <div className="space-y-2">
                    <Label>تردد المزامنة التلقائية</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">كل ساعة</SelectItem>
                        <SelectItem value="daily">يومياً</SelectItem>
                        <SelectItem value="weekly">أسبوعياً</SelectItem>
                        <SelectItem value="monthly">شهرياً</SelectItem>
                      </SelectContent>
                    </Select>
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