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
  LineChart
} from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPlatforms = integrationPlatforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         platform.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryStats = {
    government: integrationPlatforms.filter(p => p.category === 'government').length,
    financial: integrationPlatforms.filter(p => p.category === 'financial').length,
    insurance: integrationPlatforms.filter(p => p.category === 'insurance').length,
    complementary: integrationPlatforms.filter(p => p.category === 'complementary').length,
    connected: integrationPlatforms.filter(p => p.status === 'connected').length,
    total: integrationPlatforms.length
  };

  const handleSync = async (platformId: string) => {
    const platform = integrationPlatforms.find(p => p.id === platformId);
    if (!platform) return;
    toast.success(`تمت مزامنة ${platform.name} بنجاح`);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">التكامل والربط</h1>
          <p className="text-muted-foreground">
            إدارة شاملة لجميع التكاملات مع المنصات الحكومية والمالية
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة تكامل
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي المنصات
            </CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.total}</div>
            <p className="text-xs text-muted-foreground">
              +2 منذ الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              المنصات المتصلة
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.connected}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((categoryStats.connected / categoryStats.total) * 100)}% معدل الاتصال
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              المنصات الحكومية
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.government}</div>
            <p className="text-xs text-muted-foreground">
              جميعها متصلة ونشطة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              الأنظمة المالية
            </CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.financial}</div>
            <p className="text-xs text-muted-foreground">
              تحديث كل 4 ساعات
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              معدل النجاح
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97%</div>
            <p className="text-xs text-muted-foreground">
              +2% من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              العمليات اليومية
            </CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +180 من أمس
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              عمليات المزامنة الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <LineChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>رسم بياني لعمليات المزامنة الشهرية</p>
                <p className="text-sm">معدل نجاح 97% خلال آخر 6 أشهر</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المنصات حسب النوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-4">
                <PieChart className="h-12 w-12 mx-auto opacity-50" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>منصات حكومية:</span>
                    <span className="font-medium">{categoryStats.government}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>أنظمة مالية:</span>
                    <span className="font-medium">{categoryStats.financial}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>شركات التأمين:</span>
                    <span className="font-medium">{categoryStats.insurance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>منصات تكميلية:</span>
                    <span className="font-medium">{categoryStats.complementary}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900 dark:text-blue-100">تحسن الأداء</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                معدل نجاح المزامنة تحسن بنسبة 15% هذا الشهر
              </p>
            </div>

            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-900 dark:text-orange-100">تنبيه</span>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                منصة SAP تحتاج إلى إعادة تكوين الاتصال
              </p>
            </div>

            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900 dark:text-green-100">استقرار عالي</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                جميع المنصات الحكومية تعمل بكفاءة 100%
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
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start gap-2" onClick={() => handleSync('all')}>
              <RefreshCw className="h-4 w-4" />
              مزامنة جميع المنصات
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Download className="h-4 w-4" />
              تحميل تقرير المزامنة
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Settings className="h-4 w-4" />
              إعدادات التكامل
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <FileText className="h-4 w-4" />
              عرض السجلات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Platforms List */}
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
    </div>
  );
}