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
  GraduationCap
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
  const [selectedPlatform, setSelectedPlatform] = useState<IntegrationPlatform | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [configDialog, setConfigDialog] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, timestamp: '2024-01-20 10:30', platform: 'GOSI', action: 'تم تحديث بيانات 5 موظفين', status: 'success' },
    { id: 2, timestamp: '2024-01-20 09:15', platform: 'Mudad', action: 'رفع ملف الرواتب الشهري', status: 'success' },
    { id: 3, timestamp: '2024-01-20 08:45', platform: 'Qiwa', action: 'خطأ في مزامنة عقد الموظف أحمد محمد', status: 'error' },
    { id: 4, timestamp: '2024-01-19 16:20', platform: 'Tameeni', action: 'تحديث وثائق التأمين لـ 12 موظف', status: 'success' }
  ]);

  const filteredPlatforms = integrationPlatforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         platform.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-success text-success-foreground">متصل</Badge>;
      case 'disconnected':
        return <Badge variant="destructive">غير متصل</Badge>;
      case 'error':
        return <Badge variant="destructive">خطأ</Badge>;
      case 'syncing':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">يتم المزامنة</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'government':
        return <Building2 className="h-4 w-4" />;
      case 'financial':
        return <Banknote className="h-4 w-4" />;
      case 'insurance':
        return <Shield className="h-4 w-4" />;
      case 'complementary':
        return <Gift className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const handleSync = async (platformId: string) => {
    const platform = integrationPlatforms.find(p => p.id === platformId);
    if (!platform) return;

    platform.status = 'syncing';
    toast.info(`بدء مزامنة ${platform.name}...`);

    // محاكاة عملية المزامنة
    setTimeout(() => {
      platform.status = 'connected';
      platform.lastSync = new Date().toLocaleString('ar-SA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toLocaleString('ar-SA'),
        platform: platform.nameEn,
        action: `تمت المزامنة بنجاح`,
        status: 'success'
      };
      setLogs(prev => [newLog, ...prev]);
      
      toast.success(`تمت مزامنة ${platform.name} بنجاح`);
    }, 3000);
  };

  const categoryStats = {
    government: integrationPlatforms.filter(p => p.category === 'government').length,
    financial: integrationPlatforms.filter(p => p.category === 'financial').length,
    insurance: integrationPlatforms.filter(p => p.category === 'insurance').length,
    complementary: integrationPlatforms.filter(p => p.category === 'complementary').length,
    connected: integrationPlatforms.filter(p => p.status === 'connected').length,
    total: integrationPlatforms.length
  };

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">نظام التكامل والربط الحكومي والمالي</h1>
          <p className="text-muted-foreground">إدارة شاملة لجميع التكاملات مع المنصات الحكومية والمالية</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleSync('all')} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            مزامنة الكل
          </Button>
          <Button variant="outline" onClick={() => setConfigDialog(true)} className="gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Network className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المنصات</p>
                <p className="text-2xl font-bold">{categoryStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المنصات المتصلة</p>
                <p className="text-2xl font-bold">{categoryStats.connected}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المنصات الحكومية</p>
                <p className="text-2xl font-bold">{categoryStats.government}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Activity className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">معدل النجاح</p>
                <p className="text-2xl font-bold">97%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="platforms" className="gap-2">
            <Plug className="h-4 w-4" />
            المنصات
          </TabsTrigger>
          <TabsTrigger value="logs" className="gap-2">
            <FileText className="h-4 w-4" />
            سجل العمليات
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            التقارير
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          {/* أدوات البحث والتصفية */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="البحث في المنصات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
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

          {/* قائمة المنصات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    {getStatusBadge(platform.status)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {getCategoryIcon(platform.category)}
                    <span>
                      {platform.category === 'government' && 'حكومي'}
                      {platform.category === 'financial' && 'مالي'}
                      {platform.category === 'insurance' && 'تأمين'}
                      {platform.category === 'complementary' && 'تكميلي'}
                    </span>
                    <span>•</span>
                    <span>{platform.syncFrequency}</span>
                  </div>

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
                      onClick={() => setSelectedPlatform(platform)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      عرض
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>سجل العمليات</CardTitle>
              <CardDescription>تتبع جميع عمليات المزامنة والتحديثات</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className={`p-1 rounded-full ${log.status === 'success' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        {log.status === 'success' ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{log.platform}</span>
                          <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{log.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات التكامل العامة</CardTitle>
              <CardDescription>تخصيص إعدادات المزامنة والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">المزامنة التلقائية</Label>
                    <p className="text-sm text-muted-foreground">تشغيل المزامنة التلقائية لجميع المنصات</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">إشعارات الأخطاء</Label>
                    <p className="text-sm text-muted-foreground">إرسال تنبيهات عند حدوث أخطاء في المزامنة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>فترة الاحتفاظ بالسجلات (أيام)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 أيام</SelectItem>
                      <SelectItem value="30">30 يوم</SelectItem>
                      <SelectItem value="90">90 يوم</SelectItem>
                      <SelectItem value="365">سنة كاملة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>تقرير حالة المنصات</CardTitle>
                <CardDescription>نظرة عامة على جميع التكاملات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>منصات متصلة</span>
                    <span className="font-medium">{categoryStats.connected}/{categoryStats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل النجاح العام</span>
                    <span className="font-medium">97%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>آخر مزامنة كاملة</span>
                    <span className="font-medium">2024-01-20</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  تحميل التقرير
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تقرير الأداء الشهري</CardTitle>
                <CardDescription>إحصائيات المزامنة لهذا الشهر</CardDescription>
      </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>عمليات مزامنة ناجحة</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>عمليات فاشلة</span>
                    <span className="font-medium text-destructive">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>السجلات المزامنة</span>
                    <span className="font-medium">15,678</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  تقرير مفصل
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* نافذة تفاصيل المنصة */}
      {selectedPlatform && (
        <Dialog open={!!selectedPlatform} onOpenChange={() => setSelectedPlatform(null)}>
          <DialogContent className="max-w-2xl" dir="rtl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {selectedPlatform.icon}
                </div>
                <div>
                  <DialogTitle>{selectedPlatform.name}</DialogTitle>
                  <DialogDescription>{selectedPlatform.nameEn}</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">الوصف</h4>
                <p className="text-sm text-muted-foreground">{selectedPlatform.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">الميزات المتاحة</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlatform.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </div>

              {selectedPlatform.stats && (
                <div>
                  <h4 className="font-medium mb-2">الإحصائيات</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">إجمالي السجلات</p>
                      <p className="text-lg font-medium">{selectedPlatform.stats.totalRecords}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">معدل النجاح</p>
                      <p className="text-lg font-medium">{selectedPlatform.stats.successRate}%</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => handleSync(selectedPlatform.id)}
                  disabled={selectedPlatform.status === 'syncing'}
                  className="gap-2"
                >
                  {selectedPlatform.status === 'syncing' ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  مزامنة الآن
                </Button>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  إعدادات المنصة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}