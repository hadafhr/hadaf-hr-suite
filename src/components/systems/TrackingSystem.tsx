import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Download,
  Filter,
  Settings,
  Eye,
  Activity,
  Calendar,
  Route,
  Target,
  Shield,
  Bell,
  Map,
  UserCheck,
  MapPinned,
  Signal,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Zap,
  Brain,
  TrendingDown,
  BarChart3,
  FileText
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
    timestamp: Date;
  };
  trackingEnabled: boolean;
  workingHours: {
    start: string;
    end: string;
  };
  fieldHours: number;
  movements: number;
  status: 'active' | 'inactive' | 'break';
}

interface TrackingSystemProps {
  onBack: () => void;
}

export const TrackingSystem = ({ onBack }: TrackingSystemProps) => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const isRTL = i18n.language === 'ar';

  // Mock tracking data
  const trackingTrends = [
    { month: 'يناير', activeEmployees: 45, fieldHours: 2800, violations: 3 },
    { month: 'فبراير', activeEmployees: 52, fieldHours: 3200, violations: 2 },
    { month: 'مارس', activeEmployees: 48, fieldHours: 3000, violations: 4 },
    { month: 'أبريل', activeEmployees: 55, fieldHours: 3400, violations: 1 },
    { month: 'مايو', activeEmployees: 60, fieldHours: 3800, violations: 2 },
    { month: 'يونيو', activeEmployees: 58, fieldHours: 3600, violations: 1 },
  ];

  const trackingDistribution = [
    { name: 'المبيعات الميدانية', value: 35, color: '#009F87' },
    { name: 'خدمة العملاء', value: 25, color: '#3B82F6' },
    { name: 'التوصيل', value: 20, color: '#F59E0B' },
    { name: 'الصيانة', value: 15, color: '#EF4444' },
    { name: 'أخرى', value: 5, color: '#8B5CF6' },
  ];

  const employees = [
    {
      id: '1',
      name: 'أحمد محمد العلي',
      department: 'المبيعات',
      position: 'مندوب مبيعات',
      currentLocation: {
        lat: 24.7136,
        lng: 46.6753,
        address: 'الرياض - حي الملز',
        timestamp: new Date()
      },
      trackingEnabled: true,
      workingHours: { start: '08:00', end: '17:00' },
      fieldHours: 6.5,
      movements: 12,
      status: 'active' as const
    },
    {
      id: '2',
      name: 'سارة أحمد المطيري',
      department: 'خدمة العملاء',
      position: 'أخصائي خدمة عملاء ميداني',
      currentLocation: {
        lat: 24.6877,
        lng: 46.7219,
        address: 'الرياض - حي النخيل',
        timestamp: new Date()
      },
      trackingEnabled: true,
      workingHours: { start: '09:00', end: '18:00' },
      fieldHours: 4.2,
      movements: 8,
      status: 'active' as const
    }
  ];

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-background via-background to-background/80 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              نظام التتبع الميداني
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              تتبع وإدارة الموظفين الميدانيين في الوقت الفعلي مع تحليلات ذكية شاملة
            </p>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              <Download className="ml-2 h-5 w-5" />
              تصدير التقارير
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-primary/5 border-primary/20">
              <Settings className="ml-2 h-5 w-5" />
              الإعدادات المتقدمة
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-primary/5 border-primary/20">
              <Plus className="ml-2 h-5 w-5" />
              إضافة موظف
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/10 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">الموظفين النشطين</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary">
                      {employees.filter(emp => emp.status === 'active').length}
                    </span>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="text-sm font-medium">+12%</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">إجمالي ساعات الميدان</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {employees.reduce((total, emp) => total + emp.fieldHours, 0).toFixed(1)}
                    </span>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="text-sm font-medium">+8%</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">المناطق المغطاة</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-orange-600">24</span>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="text-sm font-medium">+3</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <MapPinned className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">التنبيهات النشطة</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-red-600">3</span>
                    <div className="flex items-center text-red-600">
                      <ArrowDownRight className="h-4 w-4" />
                      <span className="text-sm font-medium">-2</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="h-4 w-4" />
              لوحة القيادة
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Users className="h-4 w-4" />
              الموظفين
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Map className="h-4 w-4" />
              التتبع المباشر
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Bell className="h-4 w-4" />
              التنبيهات
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Panel */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Tracking Trends Chart */}
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        اتجاهات التتبع الميداني
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={trackingTrends}>
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis 
                              dataKey="month" 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: '#666' }}
                            />
                            <YAxis 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: '#666' }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="activeEmployees"
                              stroke="hsl(var(--primary))"
                              fill="hsl(var(--primary))"
                              fillOpacity={0.1}
                              strokeWidth={2}
                            />
                            <Area
                              type="monotone"
                              dataKey="fieldHours"
                              stroke="#3B82F6"
                              fill="#3B82F6"
                              fillOpacity={0.1}
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Distribution Chart */}
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        توزيع الموظفين الميدانيين
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={trackingDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={120}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {trackingDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Side Statistics */}
              <div className="space-y-6">
                {/* Tracking Metrics */}
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      مؤشرات التتبع
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">معدل الحضور الميداني</span>
                        <span className="text-sm font-bold text-green-600">94%</span>
                      </div>
                      <Progress value={94} className="h-2 bg-green-100" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">دقة التتبع</span>
                        <span className="text-sm font-bold text-blue-600">98%</span>
                      </div>
                      <Progress value={98} className="h-2 bg-blue-100" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">الالتزام بالمناطق</span>
                        <span className="text-sm font-bold text-orange-600">87%</span>
                      </div>
                      <Progress value={87} className="h-2 bg-orange-100" />
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      رؤى ذكية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-green-700">أداء ممتاز</p>
                          <p className="text-xs text-green-600 mt-1">زيادة 15% في كفاءة التتبع هذا الشهر</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-100 rounded-full">
                          <Zap className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-orange-700">توصية</p>
                          <p className="text-xs text-orange-600 mt-1">تحسين مسارات منطقة الشمال لزيادة الكفاءة</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Activities */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Signal className="h-5 w-5 text-primary" />
                  النشاطات الميدانية الحديثة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="p-2 bg-green-100 rounded-full">
                      <UserCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">وصل أحمد العلي إلى موقع العمل</p>
                      <p className="text-xs text-muted-foreground">منذ 5 دقائق - الرياض، حي الملز</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-green-200">
                      <Clock className="h-3 w-3 ml-1" />
                      في الوقت المحدد
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Navigation className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">بدأت سارة المطيري رحلة جديدة</p>
                      <p className="text-xs text-muted-foreground">منذ 12 دقيقة - متوجهة إلى حي النخيل</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-blue-200">
                      <Route className="h-3 w-3 ml-1" />
                      تحرك نشط
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">تنبيه: موظف خارج النطاق المحدد</p>
                      <p className="text-xs text-muted-foreground">منذ 20 دقيقة - يتطلب مراجعة</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-yellow-200">
                      <Shield className="h-3 w-3 ml-1" />
                      يحتاج متابعة
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/20">
                    <Map className="h-6 w-6 text-primary" />
                    خريطة مباشرة
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/20">
                    <FileText className="h-6 w-6 text-primary" />
                    تقرير يومي
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/20">
                    <Target className="h-6 w-6 text-primary" />
                    إضافة نطاق
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/20">
                    <Download className="h-6 w-6 text-primary" />
                    تصدير البيانات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>الموظفين الميدانيين</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث عن موظف..."
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة موظف
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-medium text-primary">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.position} - {employee.department}</p>
                        <p className="text-xs text-muted-foreground">{employee.currentLocation.address}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{employee.fieldHours} ساعة</p>
                        <p className="text-xs text-muted-foreground">ساعات الميدان</p>
                      </div>
                      <Badge className={employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {employee.status === 'active' ? 'نشط' : 'غير نشط'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>خريطة التتبع المباشر</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium">خريطة التتبع التفاعلية</p>
                    <p className="text-muted-foreground">عرض مواقع الموظفين في الوقت الفعلي</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير الذكية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير يومي
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    تقرير أسبوعي
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <BarChart3 className="h-6 w-6" />
                    تقرير شهري
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Download className="h-6 w-6" />
                    تصدير Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التنبيهات النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-r-4 border-r-red-500">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium">موظف خارج النطاق المحدد</h4>
                      <p className="text-sm text-muted-foreground">أحمد العلي خارج منطقة العمل لأكثر من 15 دقيقة</p>
                      <p className="text-xs text-muted-foreground mt-1">منذ 20 دقيقة</p>
                    </div>
                    <Button variant="outline" size="sm">إجراء</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">تفعيل التتبع التلقائي</h4>
                      <p className="text-sm text-muted-foreground">تشغيل التتبع تلقائياً في ساعات العمل</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};