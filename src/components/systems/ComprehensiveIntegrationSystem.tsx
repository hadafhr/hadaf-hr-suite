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
import { PatternBackground } from '@/components/PatternBackground';

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
    { month: 'يناير', syncs: 1200, successful: 1164, failed: 36, change: 8 },
    { month: 'فبراير', syncs: 1350, successful: 1309, failed: 41, change: 12 },
    { month: 'مارس', syncs: 1280, successful: 1242, failed: 38, change: -5 },
    { month: 'أبريل', syncs: 1450, successful: 1407, failed: 43, change: 13 },
    { month: 'مايو', syncs: 1320, successful: 1281, failed: 39, change: -9 },
    { month: 'يونيو', syncs: 1420, successful: 1378, failed: 42, change: 8 }
  ];

  // توزيع أنواع المنصات
  const platformDistribution = [
    { name: 'المنصات الحكومية', value: 42, count: categoryStats.government, color: 'hsl(var(--primary))' },
    { name: 'الأنظمة المالية', value: 25, count: categoryStats.financial, color: 'hsl(var(--secondary))' },
    { name: 'شركات التأمين', value: 17, count: categoryStats.insurance, color: 'hsl(var(--warning))' },
    { name: 'المنصات التكميلية', value: 16, count: categoryStats.complementary, color: 'hsl(var(--success))' }
  ];

  const filteredPlatforms = integrationPlatforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         platform.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // إحصائيات شاملة للتكامل
  const integrationStats = {
    totalPlatforms: categoryStats.total,
    connectedPlatforms: categoryStats.connected,
    governmentPlatforms: categoryStats.government,
    financialSystems: categoryStats.financial,
    successRate: 97,
    dailyOperations: 1247
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Enhanced Header with Pattern Background */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-glow to-secondary p-8 shadow-2xl">
          <PatternBackground />
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  رجوع
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleExport}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
                <Button 
                  onClick={handlePrint}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <FileText className="h-4 w-4 ml-2" />
                  طباعة
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة تكامل
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Network className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام التكامل والربط الشامل
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                منظومة متطورة لإدارة جميع التكاملات مع المنصات الحكومية والمالية مع أدوات المراقبة المتقدمة
              </p>
            </div>
          </div>
        </div>

        {/* KPI Cards - 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-white/90 backdrop-blur border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي المنصات</p>
                  <p className="text-2xl font-bold text-primary">{integrationStats.totalPlatforms}</p>
                  <p className="text-xs text-green-600">12 منصة نشطة</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Network className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المنصات المتصلة</p>
                  <p className="text-2xl font-bold text-secondary">{integrationStats.connectedPlatforms}</p>
                  <p className="text-xs text-green-600">+2 هذا الشهر</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-warning/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-warning">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المنصات الحكومية</p>
                  <p className="text-2xl font-bold text-warning">{integrationStats.governmentPlatforms}</p>
                  <p className="text-xs text-blue-600">جميعها متصلة</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-full">
                  <Building2 className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-success/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-success">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">الأنظمة المالية</p>
                  <p className="text-2xl font-bold text-success">{integrationStats.financialSystems}</p>
                  <p className="text-xs text-green-600">مزامنة يومية</p>
                </div>
                <div className="p-3 bg-success/10 rounded-full">
                  <Banknote className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">معدل النجاح</p>
                  <p className="text-2xl font-bold text-primary">{integrationStats.successRate}%</p>
                  <p className="text-xs text-green-600">+5% هذا الشهر</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">العمليات اليومية</p>
                  <p className="text-2xl font-bold text-secondary">{integrationStats.dailyOperations.toLocaleString()}</p>
                  <p className="text-xs text-green-600">أداء ممتاز</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-full">
                  <RefreshCw className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Sync Operations Chart */}
          <Card className="bg-white/90 backdrop-blur border border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                عمليات المزامنة الشهرية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlySyncData}>
                  <defs>
                    <linearGradient id="colorSyncs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid hsl(var(--primary))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="syncs" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#colorSyncs)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="successful" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Platform Distribution Pie Chart */}
          <Card className="bg-white/90 backdrop-blur border border-secondary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                توزيع المنصات حسب النوع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={platformDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value}%`, 'النسبة']} />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {platformDistribution.map((platform, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="text-muted-foreground">{platform.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Section */}
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-warning/5 border border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Brain className="h-6 w-6" />
              رؤى الذكاء الاصطناعي - التكامل والربط
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/60 rounded-lg border border-primary/10">
                <h4 className="font-semibold text-primary mb-2">استقرار عالي</h4>
                <p className="text-sm text-muted-foreground">
                  جميع المنصات الحكومية تعمل بكفاءة 100% بدون انقطاع، مع معدل نجاح 
                  يصل إلى 97% عبر جميع العمليات.
                </p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg border border-secondary/10">
                <h4 className="font-semibold text-secondary mb-2">تنبيه صيانة</h4>
                <p className="text-sm text-muted-foreground">
                  منصة SAP تحتاج إلى إعادة تكوين الاتصال قريباً لضمان استمرارية 
                  التكامل مع الأنظمة المالية.
                </p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg border border-warning/10">
                <h4 className="font-semibold text-warning mb-2">تحسن الأداء</h4>
                <p className="text-sm text-muted-foreground">
                  معدل نجاح المزامنة تحسن بنسبة 15% هذا الشهر، مع زيادة في كفاءة 
                  العمليات اليومية والاتصالات المتزامنة.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/90 backdrop-blur border border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              الإجراءات السريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 flex-col gap-2" variant="outline" onClick={() => handleSync('all')}>
                <RefreshCw className="h-5 w-5" />
                <span className="text-xs">مزامنة جميع المنصات</span>
              </Button>
              <Button className="h-16 flex-col gap-2" variant="outline" onClick={handleExport}>
                <Download className="h-5 w-5" />
                <span className="text-xs">تحميل تقرير المزامنة</span>
              </Button>
              <Button className="h-16 flex-col gap-2" variant="outline">
                <Settings className="h-5 w-5" />
                <span className="text-xs">إعدادات التكامل</span>
              </Button>
              <Button className="h-16 flex-col gap-2" variant="outline">
                <FileText className="h-5 w-5" />
                <span className="text-xs">عرض السجلات</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Integration Platforms List */}
        <Card className="bg-white/90 backdrop-blur border border-primary/20 shadow-lg">
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
    </div>
  );
}