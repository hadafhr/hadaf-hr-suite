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
                <Network className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  التكامل والربط
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لربط وتكامل الأنظمة مع المنصات الحكومية والخارجية مع أدوات التحليل المتقدمة والتقارير التفصيلية
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
              تكامل جديد
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="platforms">المنصات</TabsTrigger>
              <TabsTrigger value="categories">الفئات</TabsTrigger>
              <TabsTrigger value="performance">الأداء</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="platforms">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">إدارة المنصات</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة منصة
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>قائمة المنصات</CardTitle>
                  <div className="flex gap-4 mt-4">
                    <Input
                      placeholder="البحث في المنصات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder="تصفية حسب الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الفئات</SelectItem>
                        <SelectItem value="government">المنصات الحكومية</SelectItem>
                        <SelectItem value="financial">الأنظمة المالية</SelectItem>
                        <SelectItem value="insurance">شركات التأمين</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {integrationPlatforms.map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Network className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{platform.name}</h3>
                            <p className="text-sm text-muted-foreground">{platform.nameEn}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">{getCategoryText(platform.category)}</Badge>
                              <Badge className={getStatusColor(platform.status)}>
                                {getStatusText(platform.status)}
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

          <TabsContent value="categories">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إدارة الفئات</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {platformCategories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">رئيس القسم:</span>
                          <p className="font-medium">{category.head}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">عدد المنصات:</span>
                          <p className="font-medium">{category.platforms} منصة</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">الاتصالات النشطة:</span>
                          <p className="font-medium">{category.connections}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">الأداء:</span>
                          <p className="font-medium">{category.performance}%</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <Progress value={category.performance} className="w-full" />
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
                {integrationMetrics.map((metric) => (
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