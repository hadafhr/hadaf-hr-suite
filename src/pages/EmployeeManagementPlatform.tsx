import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, Users, Brain, BarChart3, Settings, 
  UserPlus, FileText, Calendar, DollarSign, 
  Shield, AlertTriangle, CheckCircle, Clock,
  TrendingUp, Target, Zap, Database, Globe,
  Search, Filter, Eye, Edit, Trash2, Download,
  MessageSquare, Bell, RefreshCw, Plus, Award,
  Activity, PieChart, LineChart, Mail, Phone
} from 'lucide-react';

// استيراد الـ hooks والخدمات الجديدة
import { 
  useCompanies, useEmployees, useAiAlerts, 
  useDashboardMetrics, useExternalApis 
} from '@/hooks/useDatabase';

// بيانات المنشآت النموذجية
const establishments = [
  {
    id: 1,
    name: 'شركة التقنية المتقدمة المحدودة',
    commercialRecord: '1010123456',
    unifiedNumber: '700123456700003',
    status: 'نشط',
    sector: 'تقنية المعلومات',
    employees: 156,
    licenses: {
      qiwa: 'نشط',
      municipal: 'نشط', 
      gosi: 'نشط'
    },
    range: 'أخضر',
    compliance: 94,
    lastUpdate: '2024-01-20'
  },
  {
    id: 2,
    name: 'مؤسسة الخدمات التجارية',
    commercialRecord: '2010987654',
    unifiedNumber: '700987654700003',
    status: 'نشط',
    sector: 'تجارة وخدمات',
    employees: 89,
    licenses: {
      qiwa: 'نشط',
      municipal: 'انتهى',
      gosi: 'نشط'
    },
    range: 'أصفر',
    compliance: 76,
    lastUpdate: '2024-01-19'
  }
];

// بيانات الموظفين النموذجية
const employees = [
  {
    id: 1,
    name: 'أحمد محمد العلي',
    position: 'مطور أول',
    department: 'تقنية المعلومات',
    nationalId: '1234567890',
    iqamaId: 'A123456789',
    status: 'على رأس العمل',
    hireDate: '2023-01-15',
    salary: 12000,
    performance: 'ممتاز',
    leaves: 5,
    warnings: 0,
    gosiRegistered: true,
    selfServiceAccess: true
  },
  {
    id: 2,
    name: 'فاطمة أحمد السالم',
    position: 'محاسبة رئيسية',
    department: 'المالية',
    nationalId: '9876543210',
    iqamaId: null,
    status: 'على رأس العمل',
    hireDate: '2022-06-10',
    salary: 10000,
    performance: 'جيد جداً',
    leaves: 8,
    warnings: 1,
    gosiRegistered: true,
    selfServiceAccess: true
  }
];

// الإحصائيات الرئيسية
const dashboardStats = [
  { title: 'إجمالي الموظفين', value: '245', change: '+8', icon: Users, color: 'text-primary' },
  { title: 'المنشآت النشطة', value: '12', change: '+2', icon: Building2, color: 'text-success' },
  { title: 'نسبة الحضور اليوم', value: '92%', change: '+3%', icon: Activity, color: 'text-info' },
  { title: 'التنبيهات المعلقة', value: '7', change: '-2', icon: AlertTriangle, color: 'text-warning' }
];

// التنبيهات الذكية
const aiAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'تحذير من هبوط النطاق',
    description: 'منشأة شركة التقنية المتقدمة معرضة لهبوط النطاق خلال 30 يوم بسبب نسبة السعودة',
    priority: 'عالي',
    action: 'مراجعة خطة السعودة',
    establishment: 'شركة التقنية المتقدمة',
    aiConfidence: 89
  },
  {
    id: 2,
    type: 'info',
    title: 'زيادة في طلبات الإجازات',
    description: 'ازدادت طلبات الإجازات بنسبة 25% هذا الشهر مقارنة بالشهر السابق',
    priority: 'متوسط',
    action: 'تحليل أسباب الزيادة',
    establishment: 'جميع المنشآت',
    aiConfidence: 76
  },
  {
    id: 3,
    type: 'critical',
    title: 'موظف يحتاج مراجعة تأديبية',
    description: 'الموظف أحمد سالم تجاوز 3 إنذارات ويحتاج مراجعة تأديبية عاجلة',
    priority: 'عالي',
    action: 'مراجعة تأديبية فورية',
    establishment: 'مؤسسة الخدمات التجارية',
    aiConfidence: 95
  }
];

// التكاملات الحكومية
const governmentIntegrations = [
  {
    platform: 'منصة قوى',
    status: 'متصل',
    lastSync: '2024-01-20 14:30',
    dataPoints: 245,
    services: ['العقود', 'الرخص', 'النطاقات', 'نقل الخدمات']
  },
  {
    platform: 'منصة تقييم', 
    status: 'متصل',
    lastSync: '2024-01-20 13:45',
    dataPoints: 89,
    services: ['بيانات الإقامة', 'الدخول والخروج']
  },
  {
    platform: 'التأمينات الاجتماعية',
    status: 'متصل', 
    lastSync: '2024-01-20 14:15',
    dataPoints: 245,
    services: ['التسجيل', 'الأجور', 'الاشتراكات']
  },
  {
    platform: 'منصة تم',
    status: 'متصل',
    lastSync: '2024-01-20 12:30',
    dataPoints: 45,
    services: ['بيانات المركبات', 'التأمين']
  }
];

export const EmployeeManagementPlatform: React.FC = () => {
  const [selectedEstablishment, setSelectedEstablishment] = useState<string>('');
  const [aiQuery, setAiQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // استخدام الـ hooks الجديدة
  const { companies, loading: companiesLoading } = useCompanies();
  const { employees: employeesData, loading: employeesLoading, searchEmployees } = useEmployees(selectedEstablishment);
  const { alerts, unreadCount, markAsRead } = useAiAlerts(selectedEstablishment);
  const { metrics, loading: metricsLoading } = useDashboardMetrics(selectedEstablishment);
  const { integrations, syncPlatform } = useExternalApis(selectedEstablishment);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': case 'على رأس العمل': case 'متصل': return 'bg-success/20 text-success border-success';
      case 'موقوف': case 'انتهى': return 'bg-warning/20 text-warning border-warning';
      case 'مستقيل': case 'غير متصل': return 'bg-destructive/20 text-destructive border-destructive';
      default: return 'bg-muted/20 text-muted-foreground border-muted';
    }
  };

  const getRangeColor = (range: string) => {
    switch (range) {
      case 'أخضر': return 'bg-success text-success-foreground';
      case 'أصفر': return 'bg-warning text-warning-foreground';
      case 'أحمر': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-destructive bg-destructive/10';
      case 'warning': return 'border-warning bg-warning/10';
      case 'info': return 'border-info bg-info/10';
      default: return 'border-muted bg-muted/10';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            منصة إدارة المنشآت والموظفين الذكية
          </h1>
          <p className="text-muted-foreground mt-2">
            إدارة شاملة مع التكامل الحكومي والذكاء الاصطناعي
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير التقرير
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            مزامنة البيانات
          </Button>
          <Button className="bg-primary text-primary-foreground">
            <UserPlus className="h-4 w-4 mr-2" />
            إضافة موظف جديد
          </Button>
        </div>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
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
        {/* المستشار الذكي */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                المستشار الذكي لإدارة الموظفين
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                  AI مدعوم
                </Badge>
              </CardTitle>
              <CardDescription>
                اطرح أسئلتك حول إدارة الموظفين والامتثال والتحليلات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-4">
                <Input
                  placeholder="مثال: كم موظف على رأس العمل اليوم؟ ما عدد الغياب؟ ما التكاليف المتوقعة؟"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="flex-1 text-right"
                />
                <Button>
                  <Brain className="h-4 w-4 mr-2" />
                  اسأل المستشار
                </Button>
              </div>
              
              {/* أمثلة للأسئلة */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">أسئلة شائعة:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'عدد الموظفين الحاضرين اليوم',
                    'متوسط الرواتب للقسم التقني',
                    'نسبة السعودة الحالية',
                    'الموظفين المستحقين للترقية',
                    'التنبؤ بتكاليف الأجور'
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
        </div>

        {/* التنبيهات الذكية */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                التنبيهات الذكية
                <Badge variant="destructive" className="text-xs">
                  {aiAlerts.length} جديد
                </Badge>
              </CardTitle>
              <CardDescription>
                تنبيهات تنبؤية من الذكاء الاصطناعي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiAlerts.map((alert) => (
                <Alert key={alert.id} className={getAlertTypeColor(alert.type)}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="text-sm">{alert.title}</AlertTitle>
                  <AlertDescription className="text-xs">
                    <p className="mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground text-xs">
                        الثقة: {alert.aiConfidence}%
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {alert.priority}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs h-6">
                      {alert.action}
                    </Button>
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* التكاملات الحكومية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            التكامل مع المنصات الحكومية
          </CardTitle>
          <CardDescription>
            حالة الاتصال والمزامنة مع الأنظمة الحكومية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {governmentIntegrations.map((integration, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{integration.platform}</h4>
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>آخر مزامنة: {integration.lastSync}</p>
                  <p>نقاط البيانات: {integration.dataPoints}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {integration.services.slice(0, 2).map((service, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {integration.services.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{integration.services.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* التفاصيل والإدارة */}
      <Tabs defaultValue="establishments" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="establishments">المنشآت</TabsTrigger>
          <TabsTrigger value="employees">الموظفين</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="establishments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>إدارة المنشآت</span>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة منشأة
                </Button>
              </CardTitle>
              <CardDescription>
                معلومات المنشآت والتراخيص والامتثال
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {establishments.map((establishment) => (
                  <div key={establishment.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{establishment.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          السجل التجاري: {establishment.commercialRecord} | الرقم الموحد: {establishment.unifiedNumber}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(establishment.status)}>
                          {establishment.status}
                        </Badge>
                        <Badge className={getRangeColor(establishment.range)}>
                          نطاق {establishment.range}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">القطاع</p>
                        <p className="text-sm text-muted-foreground">{establishment.sector}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">عدد الموظفين</p>
                        <p className="text-sm text-muted-foreground">{establishment.employees} موظف</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">نسبة الامتثال</p>
                        <div className="flex items-center gap-2">
                          <Progress value={establishment.compliance} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{establishment.compliance}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">آخر تحديث</p>
                        <p className="text-sm text-muted-foreground">{establishment.lastUpdate}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">حالة التراخيص:</p>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(establishment.licenses.qiwa)}>
                          قوى: {establishment.licenses.qiwa}
                        </Badge>
                        <Badge className={getStatusColor(establishment.licenses.municipal)}>
                          بلدي: {establishment.licenses.municipal}
                        </Badge>
                        <Badge className={getStatusColor(establishment.licenses.gosi)}>
                          GOSI: {establishment.licenses.gosi}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        عرض التفاصيل
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        تحديث البيانات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        إدارة الموظفين
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>إدارة الموظفين</span>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="اختر المنشأة" />
                    </SelectTrigger>
                    <SelectContent>
                      {establishments.map((est) => (
                        <SelectItem key={est.id} value={est.id.toString()}>
                          {est.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    إضافة موظف
                  </Button>
                </div>
              </CardTitle>
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
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    تصفية
                  </Button>
                </div>

                <div className="space-y-3">
                  {employees.map((employee) => (
                    <div key={employee.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {employee.position} - {employee.department}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                          {employee.selfServiceAccess && (
                            <Badge variant="outline" className="bg-info/10 text-info border-info">
                              خدمة ذاتية
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium">الهوية/الإقامة</p>
                          <p className="text-muted-foreground">
                            {employee.nationalId || employee.iqamaId}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">تاريخ التوظيف</p>
                          <p className="text-muted-foreground">{employee.hireDate}</p>
                        </div>
                        <div>
                          <p className="font-medium">الراتب</p>
                          <p className="text-muted-foreground">{employee.salary.toLocaleString()} ريال</p>
                        </div>
                        <div>
                          <p className="font-medium">الأداء</p>
                          <p className="text-muted-foreground">{employee.performance}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>الإجازات: {employee.leaves}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          <span>الإنذارات: {employee.warnings}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4" />
                          <span>GOSI: {employee.gosiRegistered ? 'مسجل' : 'غير مسجل'}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          عرض الملف
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          تعديل البيانات
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          العقود
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          التواصل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                التحليلات والمؤشرات
              </CardTitle>
              <CardDescription>
                تحليلات تفصيلية لأداء المنشآت والموظفين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">توزيع الموظفين</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>مخطط دائري لتوزيع الموظفين</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">تطور الرواتب</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>مخطط خطي لتطور الرواتب</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">معدل الحضور</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>مخطط أعمدة لمعدل الحضور</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>التقارير التشغيلية</CardTitle>
              <CardDescription>
                تقارير شاملة جاهزة للطباعة والإرسال
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'تقرير الحضور والغياب الشهري',
                  'تقرير كشف الرواتب',
                  'تقرير الامتثال والالتزام',
                  'تقرير أداء الموظفين',
                  'تقرير نسب السعودة',
                  'تقرير التنبؤات المالية'
                ].map((report, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{report}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          تحميل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                إعدادات النظام
              </CardTitle>
              <CardDescription>
                إعدادات المنصة والصلاحيات والتكاملات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>إعدادات النظام ستكون متاحة قريباً</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};