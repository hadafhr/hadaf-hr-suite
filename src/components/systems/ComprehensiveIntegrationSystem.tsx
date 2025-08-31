import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  CreditCard, 
  Shield, 
  Gift, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Settings,
  Plug,
  Zap,
  Eye,
  Download,
  Upload,
  Globe,
  Network,
  Database,
  Lock,
  Key,
  FileText,
  Bell,
  Calendar,
  Banknote,
  Bot,
  TrendingUp,
  Users,
  Clock,
  Server,
  Wifi,
  Heart,
  GraduationCap,
  BarChart3,
  Plus,
  Search,
  Filter,
  PieChart,
  LineChart,
  ArrowLeft,
  Brain
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface IntegrationPlatform {
  id: string;
  name: string;
  nameEn: string;
  category: 'government' | 'financial' | 'insurance' | 'complementary';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  description: string;
  icon: React.ReactNode;
  lastSync?: string;
  syncFrequency: string;
  features: string[];
  credentials?: {
    apiKey?: string;
    username?: string;
    endpoint?: string;
  };
  stats?: {
    totalRecords?: number;
    lastUpdate?: string;
    successRate?: number;
  };
}

const integrationPlatforms: IntegrationPlatform[] = [
  // منصات حكومية
  {
    id: 'gosi',
    name: 'مؤسسة التأمينات الاجتماعية',
    nameEn: 'GOSI',
    category: 'government',
    status: 'connected',
    description: 'التسجيل التلقائي للموظفين ومزامنة الرواتب',
    icon: <Building2 className="h-6 w-6" />,
    lastSync: '2024-01-20 09:30',
    syncFrequency: 'شهريًا',
    features: ['تسجيل الموظفين', 'مزامنة الرواتب', 'التنبيهات التلقائية'],
    stats: { totalRecords: 156, lastUpdate: '2024-01-20', successRate: 98 }
  },
  {
    id: 'mudad',
    name: 'منصة مدد',
    nameEn: 'Mudad',
    category: 'government',
    status: 'connected',
    description: 'حماية الأجور ورفع ملفات الرواتب',
    icon: <Shield className="h-6 w-6" />,
    lastSync: '2024-01-19 14:15',
    syncFrequency: 'شهريًا',
    features: ['حماية الأجور', 'رفع ملفات الرواتب', 'متابعة المطابقة'],
    stats: { totalRecords: 156, lastUpdate: '2024-01-19', successRate: 100 }
  },
  {
    id: 'qiwa',
    name: 'منصة قوى',
    nameEn: 'Qiwa',
    category: 'government',
    status: 'syncing',
    description: 'توثيق العقود ورفع بيانات الموظفين',
    icon: <Users className="h-6 w-6" />,
    lastSync: '2024-01-20 08:00',
    syncFrequency: 'أسبوعيًا',
    features: ['توثيق العقود', 'رفع البيانات', 'إشعارات التعارض'],
    stats: { totalRecords: 156, lastUpdate: '2024-01-20', successRate: 95 }
  },
  {
    id: 'absher',
    name: 'منصة أبشر',
    nameEn: 'Absher',
    category: 'government',
    status: 'connected',
    description: 'التحقق من صلاحية الهوية والإقامة',
    icon: <Lock className="h-6 w-6" />,
    lastSync: '2024-01-20 10:00',
    syncFrequency: 'يوميًا',
    features: ['التحقق من الهوية', 'متابعة الصلاحيات', 'التنبيهات'],
    stats: { totalRecords: 156, lastUpdate: '2024-01-20', successRate: 99 }
  },
  {
    id: 'mlsd',
    name: 'وزارة الموارد البشرية',
    nameEn: 'MLSD',
    category: 'government',
    status: 'connected',
    description: 'مزامنة معلومات المنشأة والمخالفات',
    icon: <Building2 className="h-6 w-6" />,
    lastSync: '2024-01-19 16:30',
    syncFrequency: 'أسبوعيًا',
    features: ['مزامنة المعلومات', 'إشعارات المخالفات', 'التقارير'],
    stats: { totalRecords: 1, lastUpdate: '2024-01-19', successRate: 100 }
  },
  
  // الأنظمة المالية
  {
    id: 'oracle',
    name: 'أوراكل',
    nameEn: 'Oracle ERP',
    category: 'financial',
    status: 'connected',
    description: 'نظام تخطيط موارد المؤسسة',
    icon: <Database className="h-6 w-6" />,
    lastSync: '2024-01-20 11:00',
    syncFrequency: 'يوميًا',
    features: ['ربط الرواتب', 'التقارير المالية', 'المزامنة التلقائية'],
    stats: { totalRecords: 156, lastUpdate: '2024-01-20', successRate: 97 }
  },
  {
    id: 'sap',
    name: 'ساب',
    nameEn: 'SAP',
    category: 'financial',
    status: 'disconnected',
    description: 'نظام إدارة الموارد المؤسسية',
    icon: <Server className="h-6 w-6" />,
    syncFrequency: 'يوميًا',
    features: ['إدارة الرواتب', 'التحليل المالي', 'التكامل الشامل']
  },
  {
    id: 'sadad',
    name: 'سداد',
    nameEn: 'Sadad',
    category: 'financial',
    status: 'connected',
    description: 'بوابة المدفوعات الحكومية',
    icon: <CreditCard className="h-6 w-6" />,
    lastSync: '2024-01-20 09:15',
    syncFrequency: 'فوريًا',
    features: ['الدفع المباشر', 'إشعارات المعاملات', 'سجل المدفوعات'],
    stats: { totalRecords: 89, lastUpdate: '2024-01-20', successRate: 100 }
  },
  
  // شركات التأمين
  {
    id: 'tameeni',
    name: 'تأميني',
    nameEn: 'Tameeni',
    category: 'insurance',
    status: 'connected',
    description: 'منصة التأمين الطبي الشاملة',
    icon: <Shield className="h-6 w-6" />,
    lastSync: '2024-01-19 15:45',
    syncFrequency: 'أسبوعيًا',
    features: ['تسجيل البوليصات', 'إدارة العائلة', 'متابعة الوثائق'],
    stats: { totalRecords: 156, lastUpdate: '2024-01-19', successRate: 96 }
  },
  {
    id: 'bupa',
    name: 'بوبا العربية',
    nameEn: 'Bupa Arabia',
    category: 'insurance',
    status: 'connected',
    description: 'شركة التأمين الطبي',
    icon: <Heart className="h-6 w-6" />,
    lastSync: '2024-01-18 14:20',
    syncFrequency: 'شهريًا',
    features: ['إدارة الوثائق', 'تحديث البيانات', 'الإشعارات'],
    stats: { totalRecords: 78, lastUpdate: '2024-01-18', successRate: 94 }
  },
  
  // المنصات التكميلية
  {
    id: 'hrdf',
    name: 'صندوق تنمية الموارد البشرية',
    nameEn: 'HRDF',
    category: 'complementary',
    status: 'connected',
    description: 'دعم التوظيف والتدريب',
    icon: <GraduationCap className="h-6 w-6" />,
    lastSync: '2024-01-17 13:00',
    syncFrequency: 'شهريًا',
    features: ['طلبات الدعم', 'متابعة الموافقات', 'الدفعات'],
    stats: { totalRecords: 12, lastUpdate: '2024-01-17', successRate: 100 }
  },
  {
    id: 'rewards',
    name: 'منصة المكافآت',
    nameEn: 'Rewards Platform',
    category: 'complementary',
    status: 'connected',
    description: 'إدارة مكافآت الأداء',
    icon: <Gift className="h-6 w-6" />,
    lastSync: '2024-01-20 12:30',
    syncFrequency: 'يوميًا',
    features: ['مكافآت الأداء', 'الإرسال التلقائي', 'التقارير'],
    stats: { totalRecords: 45, lastUpdate: '2024-01-20', successRate: 98 }
  }
];

export function ComprehensiveIntegrationSystem() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  // حساب الإحصائيات أولاً
  const categoryStats = {
    government: integrationPlatforms.filter(p => p.category === 'government').length,
    financial: integrationPlatforms.filter(p => p.category === 'financial').length,
    insurance: integrationPlatforms.filter(p => p.category === 'insurance').length,
    complementary: integrationPlatforms.filter(p => p.category === 'complementary').length,
    connected: integrationPlatforms.filter(p => p.status === 'connected').length,
    total: integrationPlatforms.length
  };

  // بيانات المزامنة الشهرية
  const monthlySyncData = [
    { month: 'يناير', syncs: 1200, successful: 1164, failed: 36 },
    { month: 'فبراير', syncs: 1350, successful: 1309, failed: 41 },
    { month: 'مارس', syncs: 1280, successful: 1242, failed: 38 },
    { month: 'أبريل', syncs: 1450, successful: 1407, failed: 43 },
    { month: 'مايو', syncs: 1320, successful: 1281, failed: 39 },
    { month: 'يونيو', syncs: 1420, successful: 1378, failed: 42 }
  ];

  // توزيع أنواع المنصات
  const platformDistribution = [
    { name: 'المنصات الحكومية', value: 42, color: '#3b82f6' },
    { name: 'الأنظمة المالية', value: 25, color: '#10b981' },
    { name: 'شركات التأمين', value: 17, color: '#f59e0b' },
    { name: 'المنصات التكميلية', value: 16, color: '#ef4444' }
  ];

  // إحصائيات شاملة للتكامل
  const integrationStats = {
    totalPlatforms: categoryStats.total,
    connectedPlatforms: categoryStats.connected,
    governmentPlatforms: categoryStats.government,
    financialSystems: categoryStats.financial,
    successRate: 97,
    dailyOperations: 1247
  };

  const filteredPlatforms = integrationPlatforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         platform.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSync = async (platformId: string) => {
    const platform = integrationPlatforms.find(p => p.id === platformId);
    if (!platform) return;
    toast({
      title: "تمت المزامنة بنجاح",
      description: `تم مزامنة ${platform.name} بنجاح`,
    });
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير التكامل كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
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
                  منظومة متطورة لإدارة جميع التكاملات مع المنصات الحكومية والمالية مع أدوات المراقبة المتقدمة
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
              إضافة تكامل جديد
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
                <p className="text-2xl font-bold text-primary">{integrationStats.totalPlatforms}</p>
              </div>
              <Network className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المنصات المتصلة</p>
                <p className="text-2xl font-bold text-blue-600">{integrationStats.connectedPlatforms}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المنصات الحكومية</p>
                <p className="text-2xl font-bold text-orange-600">{integrationStats.governmentPlatforms}</p>
              </div>
              <Building2 className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الأنظمة المالية</p>
                <p className="text-2xl font-bold text-green-600">{integrationStats.financialSystems}</p>
              </div>
              <Database className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل النجاح (%)</p>
                <p className="text-2xl font-bold text-purple-600">{integrationStats.successRate}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">العمليات اليومية</p>
                <p className="text-2xl font-bold text-indigo-600">{integrationStats.dailyOperations}</p>
              </div>
              <Zap className="h-8 w-8 text-indigo-500/60" />
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
              عمليات المزامنة الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlySyncData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="successful" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="failed" stackId="2" stroke="#ef4444" fill="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع أنواع المنصات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={platformDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformDistribution.map((entry, index) => (
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
            <Brain className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي للتكامل والربط
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">اتصال مستقر</span>
              </div>
              <p className="text-sm text-emerald-700">
                جميع المنصات الحكومية متصلة بنجاح مع معدل استقرار 99.2%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحديث مطلوب</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بتحديث واجهات برمجة التطبيقات لنظام SAP قريباً
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">أداء متزايد</span>
              </div>
              <p className="text-sm text-blue-700">
                زيادة بنسبة 15% في عمليات المزامنة التلقائية هذا الشهر
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Plug className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">إضافة تكامل</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <RefreshCw className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">مزامنة شاملة</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Eye className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">مراقبة الحالة</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Key className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">إدارة المفاتيح</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Settings className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">إعدادات النظام</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Bell className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">التنبيهات</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {renderHeader()}
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="platforms">المنصات</TabsTrigger>
              <TabsTrigger value="monitoring">المراقبة</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              {renderAnalyticsDashboard()}
            </TabsContent>

            <TabsContent value="platforms">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    قائمة المنصات
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في المنصات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="تصفية حسب الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الفئات</SelectItem>
                        <SelectItem value="government">المنصات الحكومية</SelectItem>
                        <SelectItem value="financial">الأنظمة المالية</SelectItem>
                        <SelectItem value="insurance">شركات التأمين</SelectItem>
                        <SelectItem value="complementary">المنصات التكميلية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPlatforms.map((platform) => (
                      <Card key={platform.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                {platform.icon}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{platform.name}</CardTitle>
                                <CardDescription className="text-sm">{platform.nameEn}</CardDescription>
                              </div>
                            </div>
                            <Badge 
                              variant={platform.status === 'connected' ? 'default' : 'destructive'}
                              className={platform.status === 'connected' ? 'bg-success text-success-foreground' : ''}
                            >
                              {platform.status === 'connected' ? 'متصل' : 
                               platform.status === 'syncing' ? 'يتم المزامنة' : 'غير متصل'}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">{platform.description}</p>
                          
                          {platform.lastSync && (
                            <div className="text-xs text-muted-foreground">
                              آخر مزامنة: {platform.lastSync}
                            </div>
                          )}

                          {platform.stats && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>{platform.stats.totalRecords} سجل</span>
                                <span>{platform.stats.successRate}% معدل النجاح</span>
                              </div>
                              <Progress value={platform.stats.successRate} className="h-2" />
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSync(platform.id)}
                              disabled={platform.status === 'syncing'}
                              className="flex-1 gap-2"
                            >
                              {platform.status === 'syncing' ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <RefreshCw className="h-4 w-4" />
                              )}
                              مزامنة
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <Settings className="h-4 w-4" />
                              إعدادات
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring">
              <Card>
                <CardHeader>
                  <CardTitle>مراقبة النظام</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">مراقبة النظام</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>التقارير</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">التقارير</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}