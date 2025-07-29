import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2, Users, Shield, Car, CreditCard, Bell, 
  BarChart3, Settings, MessageSquare, Calendar,
  AlertTriangle, CheckCircle, Clock, Globe,
  FileText, Database, Smartphone, RefreshCw,
  Eye, Edit, Download, Upload, Search,
  TrendingUp, Target, Zap, Brain
} from 'lucide-react';

// منصات الربط الحكومية
const governmentPlatforms = [
  {
    id: 'qiwa',
    name: 'منصة قوى',
    nameEn: 'Qiwa',
    description: 'إدارة العقود - حماية الأجور - نقل الخدمات - نطاقات المنشأة - رخص العمل',
    status: 'متصل',
    lastSync: '2024-01-20 14:30',
    icon: Users,
    color: 'text-success',
    services: ['إدارة العقود', 'حماية الأجور', 'نقل الخدمات', 'نطاقات المنشأة', 'رخص العمل'],
    alerts: 2,
    dataPoints: 156
  },
  {
    id: 'muqeem',
    name: 'منصة تقييم',
    nameEn: 'Muqeem',
    description: 'بيانات المقيمين - صلاحية الإقامة - تاريخ الدخول والخروج',
    status: 'متصل',
    lastSync: '2024-01-20 13:45',
    icon: Shield,
    color: 'text-success',
    services: ['بيانات المقيمين', 'صلاحية الإقامة', 'تاريخ الدخول والخروج'],
    alerts: 0,
    dataPoints: 89
  },
  {
    id: 'tamm',
    name: 'منصة تم',
    nameEn: 'Tamm',
    description: 'بيانات المركبات - نقل الملكيات - صلاحيات القيادة - التأمين',
    status: 'متصل',
    lastSync: '2024-01-20 14:15',
    icon: Car,
    color: 'text-success',
    services: ['بيانات المركبات', 'نقل الملكيات', 'صلاحيات القيادة', 'التأمين'],
    alerts: 1,
    dataPoints: 45
  },
  {
    id: 'gosi',
    name: 'التأمينات الاجتماعية',
    nameEn: 'GOSI',
    description: 'تسجيل الموظفين - تحديث الرواتب - إصدار الشهادات',
    status: 'متصل',
    lastSync: '2024-01-20 14:00',
    icon: CreditCard,
    color: 'text-success',
    services: ['تسجيل الموظفين', 'تحديث الرواتب', 'إصدار الشهادات'],
    alerts: 0,
    dataPoints: 124
  },
  {
    id: 'tameeni',
    name: 'منصة تأميني',
    nameEn: 'Tameeni',
    description: 'إدارة تأمين المركبات - مقارنة الأسعار - تتبع الوثائق المنتهية',
    status: 'متصل',
    lastSync: '2024-01-20 13:30',
    icon: Shield,
    color: 'text-success',
    services: ['إدارة تأمين المركبات', 'مقارنة الأسعار', 'تتبع الوثائق'],
    alerts: 3,
    dataPoints: 67
  }
];

// الإحصائيات الرئيسية
const mainStats = [
  { title: 'إجمالي الموظفين', value: '156', change: '+12', icon: Users, color: 'text-primary' },
  { title: 'العقود النشطة', value: '142', change: '+8', icon: FileText, color: 'text-success' },
  { title: 'التنبيهات المعلقة', value: '6', change: '-2', icon: AlertTriangle, color: 'text-warning' },
  { title: 'نسبة الامتثال', value: '94%', change: '+3%', icon: CheckCircle, color: 'text-success' }
];

// التنبيهات والتوصيات
const smartAlerts = [
  {
    id: 1,
    type: 'critical',
    title: 'انتهاء صلاحية وثيقة تأمين',
    description: 'وثيقة تأمين المركبة (ل م ن 123) ستنتهي خلال 7 أيام',
    platform: 'تأميني',
    action: 'تجديد التأمين',
    time: '2024-01-20 14:30',
    priority: 'عالي'
  },
  {
    id: 2,
    type: 'warning',
    title: 'عقد عمل غير موثق',
    description: 'الموظف أحمد محمد (ID: 456) لم يتم توثيق عقده في منصة قوى',
    platform: 'قوى',
    action: 'توثيق العقد',
    time: '2024-01-20 13:45',
    priority: 'متوسط'
  },
  {
    id: 3,
    type: 'info',
    title: 'تحديث راتب مطلوب',
    description: 'راتب الموظفة فاطمة علي يحتاج تحديث في التأمينات الاجتماعية',
    platform: 'GOSI',
    action: 'تحديث البيانات',
    time: '2024-01-20 12:30',
    priority: 'منخفض'
  }
];

export const BusinessPlatform: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuery, setAiQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متصل': return 'bg-success/20 text-success border-success';
      case 'غير متصل': return 'bg-destructive/20 text-destructive border-destructive';
      case 'قيد الاتصال': return 'bg-warning/20 text-warning border-warning';
      default: return 'bg-muted/20 text-muted-foreground border-muted';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-destructive bg-destructive/10';
      case 'warning': return 'border-warning bg-warning/10';
      case 'info': return 'border-info bg-info/10';
      default: return 'border-muted bg-muted/10';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالي': return 'bg-destructive text-destructive-foreground';
      case 'متوسط': return 'bg-warning text-warning-foreground';
      case 'منخفض': return 'bg-info text-info-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            منصة أصحاب الأعمال الموحدة
          </h1>
          <p className="text-muted-foreground mt-2">
            لوحة تحكم ذكية متكاملة مع المنصات الحكومية السعودية
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير التقرير
          </Button>
          <Button className="bg-primary text-primary-foreground">
            <RefreshCw className="h-4 w-4 mr-2" />
            مزامنة البيانات
          </Button>
        </div>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-success mt-1">
                {stat.change} من الشهر الماضي
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* المنصات المتصلة */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                المنصات الحكومية المتصلة
              </CardTitle>
              <CardDescription>
                حالة الاتصال ومزامنة البيانات مع المنصات الحكومية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {governmentPlatforms.map((platform) => (
                <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                      <platform.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{platform.name}</h4>
                        <Badge className={getStatusColor(platform.status)}>
                          {platform.status}
                        </Badge>
                        {platform.alerts > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {platform.alerts} تنبيه
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{platform.description}</p>
                      <p className="text-xs text-muted-foreground">
                        آخر مزامنة: {platform.lastSync} | {platform.dataPoints} نقطة بيانات
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* التنبيهات الذكية */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                التنبيهات الذكية
                <Badge variant="destructive" className="text-xs">
                  {smartAlerts.length} جديد
                </Badge>
              </CardTitle>
              <CardDescription>
                تنبيهات وتوصيات من Bwoer AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {smartAlerts.map((alert) => (
                <Alert key={alert.id} className={getAlertColor(alert.type)}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center justify-between">
                    <span className="text-sm">{alert.title}</span>
                    <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                      {alert.priority}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    <p className="mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        المنصة: {alert.platform}
                      </span>
                      <Button size="sm" variant="outline" className="text-xs h-6">
                        {alert.action}
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
              
              <Button variant="ghost" className="w-full text-sm">
                عرض جميع التنبيهات
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* مساعد الذكاء الاصطناعي */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            مساعد Bwoer AI الذكي
          </CardTitle>
          <CardDescription>
            اطرح أسئلتك حول الأنظمة السعودية والمنصات الحكومية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="مثال: ما هي متطلبات توثيق العقود في منصة قوى؟"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="text-right"
              />
            </div>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              اسأل الذكاء الاصطناعي
            </Button>
          </div>
          
          {/* أمثلة للأسئلة */}
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">أسئلة شائعة:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'متطلبات السعودة الجديدة',
                'إجراءات تجديد التأمين',
                'توثيق العقود',
                'تحديث رواتب الموظفين',
                'متطلبات حماية الأجور'
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setAiQuery(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التفاصيل والتقارير */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="employees">الموظفين</TabsTrigger>
          <TabsTrigger value="contracts">العقود</TabsTrigger>
          <TabsTrigger value="vehicles">المركبات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>مؤشرات الأداء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>نسبة السعودة</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>الامتثال للأنظمة</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>تحديث البيانات</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الإجراءات المطلوبة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'تجديد 3 وثائق تأمين', priority: 'عالي', deadline: '7 أيام' },
                    { action: 'توثيق 2 عقد عمل', priority: 'متوسط', deadline: '14 يوم' },
                    { action: 'تحديث بيانات راتب', priority: 'منخفض', deadline: '30 يوم' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.action}</p>
                        <p className="text-xs text-muted-foreground">خلال {item.deadline}</p>
                      </div>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الموظفين</CardTitle>
              <CardDescription>
                بيانات مدمجة من منصة قوى والتأمينات الاجتماعية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="البحث في الموظفين..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    بحث
                  </Button>
                </div>
                
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>سيتم عرض بيانات الموظفين المدمجة من المنصات الحكومية هنا</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>إدارة العقود</CardTitle>
              <CardDescription>
                عقود العمل المسجلة في منصة قوى
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>سيتم عرض بيانات العقود من منصة قوى هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <CardTitle>إدارة المركبات</CardTitle>
              <CardDescription>
                بيانات المركبات والتأمين من منصة تم وتأميني
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>سيتم عرض بيانات المركبات والتأمين هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>التقارير والتحليلات</CardTitle>
              <CardDescription>
                تقارير شاملة مدعومة بالذكاء الاصطناعي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>سيتم عرض التقارير والمؤشرات التحليلية هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};