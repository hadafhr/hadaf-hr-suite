import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
  Compass,
  Timer,
  BarChart3,
  FileText,
  UserCheck,
  MapPinned,
  Radar,
  Signal
} from 'lucide-react';

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

interface GeofenceZone {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number;
  type: 'work_site' | 'office' | 'restricted';
  employees: string[];
}

interface TrackingReport {
  employeeId: string;
  date: Date;
  totalFieldHours: number;
  totalMovements: number;
  visitedLocations: Array<{
    address: string;
    arrival: Date;
    departure: Date;
    duration: number;
  }>;
  geofenceViolations: number;
}

export const TrackingSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dateFilter, setDateFilter] = useState('today');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  
  // Mock data
  const [employees] = useState<Employee[]>([
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
      status: 'active'
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
      status: 'active'
    }
  ]);

  const [geofenceZones] = useState<GeofenceZone[]>([
    {
      id: '1',
      name: 'المكتب الرئيسي',
      center: { lat: 24.7136, lng: 46.6753 },
      radius: 100,
      type: 'office',
      employees: ['1', '2']
    },
    {
      id: '2',
      name: 'منطقة عمل الملز',
      center: { lat: 24.7200, lng: 46.6800 },
      radius: 500,
      type: 'work_site',
      employees: ['1']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'break': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط في الميدان';
      case 'inactive': return 'غير متصل';
      case 'break': return 'في استراحة';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#009F87]/10 rounded-lg">
              <MapPin className="h-6 w-6 text-[#009F87]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#009F87]">نظام التتبع الميداني</h1>
              <p className="text-muted-foreground">تتبع وإدارة الموظفين الميدانيين في الوقت الفعلي</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover:bg-[#009F87] hover:text-white">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقارير
          </Button>
          <Button className="bg-[#009F87] hover:bg-[#008072]">
            <Settings className="h-4 w-4 ml-2" />
            إعدادات التتبع
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-[#009F87]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الموظفين النشطين</p>
                <p className="text-2xl font-bold text-[#009F87]">
                  {employees.filter(emp => emp.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-[#009F87]/10 rounded-full">
                <UserCheck className="h-6 w-6 text-[#009F87]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي ساعات الميدان</p>
                <p className="text-2xl font-bold text-blue-600">
                  {employees.reduce((total, emp) => total + emp.fieldHours, 0).toFixed(1)}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المناطق الجغرافية</p>
                <p className="text-2xl font-bold text-orange-600">{geofenceZones.length}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <MapPinned className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التنبيهات النشطة</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            لوحة التتبع
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            الموظفين الميدانيين
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            التقارير الذكية
          </TabsTrigger>
          <TabsTrigger value="geofence" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            النطاقات الجغرافية
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            التنبيهات
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Map */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-[#009F87]" />
                  خريطة التتبع المباشر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-[#009F87] mx-auto mb-4" />
                    <p className="text-lg font-medium">خريطة التتبع التفاعلية</p>
                    <p className="text-muted-foreground">عرض مواقع الموظفين في الوقت الفعلي</p>
                  </div>
                  
                  {/* Mock location markers */}
                  <div className="absolute top-20 left-20 animate-pulse">
                    <div className="w-3 h-3 bg-[#009F87] rounded-full"></div>
                    <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">أحمد العلي</div>
                  </div>
                  <div className="absolute top-32 right-28 animate-pulse">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="text-xs bg-white px-2 py-1 rounded shadow mt-1">سارة المطيري</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Employees */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#009F87]" />
                  الموظفين النشطين الآن
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {employees.filter(emp => emp.status === 'active').map((employee) => (
                      <div key={employee.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.position}</p>
                          <p className="text-xs text-[#009F87] mt-1">
                            <MapPin className="h-3 w-3 inline ml-1" />
                            {employee.currentLocation.address}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 ml-1" />
                              {employee.fieldHours}ساعة
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Route className="h-3 w-3 ml-1" />
                              {employee.movements} تحرك
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Signal className="h-5 w-5 text-[#009F87]" />
                نشاط الموظفين الميدانيين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-r-4 border-r-green-500">
                    <div className="p-2 bg-green-100 rounded-full">
                      <UserCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">وصل أحمد العلي إلى موقع العمل</p>
                      <p className="text-xs text-muted-foreground">منذ 5 دقائق - الرياض، حي الملز</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-r-4 border-r-blue-500">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Navigation className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">بدأت سارة المطيري رحلة جديدة</p>
                      <p className="text-xs text-muted-foreground">منذ 12 دقيقة - متوجهة إلى حي النخيل</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border-r-4 border-r-yellow-500">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">تنبيه: موظف خارج النطاق المحدد</p>
                      <p className="text-xs text-muted-foreground">منذ 20 دقيقة - يتطلب مراجعة</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>التاريخ</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">اليوم</SelectItem>
                      <SelectItem value="week">هذا الأسبوع</SelectItem>
                      <SelectItem value="month">هذا الشهر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label>القسم</Label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      <SelectItem value="sales">المبيعات</SelectItem>
                      <SelectItem value="service">خدمة العملاء</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="mt-6 bg-[#009F87] hover:bg-[#008072]">
                  <Filter className="h-4 w-4 ml-2" />
                  تطبيق الفلتر
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Employees List */}
          <div className="grid gap-6">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                        <span className="font-medium text-[#009F87]">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{employee.name}</h3>
                          <Badge className={getStatusColor(employee.status)}>
                            {getStatusText(employee.status)}
                          </Badge>
                          <Badge variant="outline">
                            {employee.trackingEnabled ? 'التتبع مفعل' : 'التتبع معطل'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{employee.position} - {employee.department}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#009F87]" />
                            <div>
                              <p className="text-sm font-medium">الموقع الحالي</p>
                              <p className="text-xs text-muted-foreground">{employee.currentLocation.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">ساعات الميدان اليوم</p>
                              <p className="text-xs text-muted-foreground">{employee.fieldHours} ساعة</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Route className="h-4 w-4 text-orange-500" />
                            <div>
                              <p className="text-sm font-medium">عدد التحركات</p>
                              <p className="text-xs text-muted-foreground">{employee.movements} تحرك</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedEmployee(employee)}>
                        <Eye className="h-4 w-4 ml-1" />
                        عرض التفاصيل
                      </Button>
                      <Button variant="outline" size="sm">
                        <Radar className="h-4 w-4 ml-1" />
                        تتبع مباشر
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تقرير الأداء اليومي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>متوسط ساعات الميدان</span>
                    <span className="font-bold text-[#009F87]">5.35 ساعة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>المناطق المغطاة</span>
                    <span className="font-bold">12 منطقة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>معدل الالتزام</span>
                    <span className="font-bold text-green-600">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تقرير الانتهاكات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>خروج عن النطاق</span>
                    <span className="font-bold text-red-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>تأخير في الوصول</span>
                    <span className="font-bold text-yellow-600">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>توقف غير مبرر</span>
                    <span className="font-bold text-orange-600">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">إحصائيات الفريق</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>أفضل موظف ميداني</span>
                    <span className="font-bold text-[#009F87]">أحمد العلي</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>إجمالي المسافة</span>
                    <span className="font-bold">245 كم</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>كفاءة التتبع</span>
                    <span className="font-bold text-green-600">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تقارير تفصيلية</CardTitle>
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

        {/* Geofence Tab */}
        <TabsContent value="geofence" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">إدارة النطاقات الجغرافية</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#008072]">
                  <Target className="h-4 w-4 ml-2" />
                  إضافة نطاق جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>إضافة نطاق جغرافي جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>اسم النطاق</Label>
                    <Input placeholder="مثال: منطقة العمل الرئيسية" />
                  </div>
                  <div>
                    <Label>نوع النطاق</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع النطاق" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">مكتب</SelectItem>
                        <SelectItem value="work_site">موقع عمل</SelectItem>
                        <SelectItem value="restricted">منطقة محظورة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>نصف القطر (متر)</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                  <Button className="w-full">إضافة النطاق</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {geofenceZones.map((zone) => (
              <Card key={zone.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{zone.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant={zone.type === 'office' ? 'default' : zone.type === 'work_site' ? 'secondary' : 'destructive'}>
                          {zone.type === 'office' ? 'مكتب' : zone.type === 'work_site' ? 'موقع عمل' : 'محظور'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          نصف القطر: {zone.radius}م
                        </span>
                        <span className="text-sm text-muted-foreground">
                          الموظفين: {zone.employees.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">تعديل</Button>
                      <Button variant="outline" size="sm">حذف</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#009F87]" />
                التنبيهات النشطة
              </CardTitle>
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

                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-r-4 border-r-yellow-500">
                  <Clock className="h-5 w-5 text-yellow-500 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium">تأخير في الوصول</h4>
                    <p className="text-sm text-muted-foreground">سارة المطيري متأخرة عن موعد الوصول المحدد</p>
                    <p className="text-xs text-muted-foreground mt-1">منذ 5 دقائق</p>
                  </div>
                  <Button variant="outline" size="sm">إجراء</Button>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-r-4 border-r-orange-500">
                  <Timer className="h-5 w-5 text-orange-500 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium">توقف لفترة طويلة</h4>
                    <p className="text-sm text-muted-foreground">موظف في نفس المكان لأكثر من 30 دقيقة</p>
                    <p className="text-xs text-muted-foreground mt-1">منذ 35 دقيقة</p>
                  </div>
                  <Button variant="outline" size="sm">إجراء</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات التتبع العامة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">تفعيل التتبع التلقائي</h4>
                    <p className="text-sm text-muted-foreground">تشغيل التتبع تلقائياً في ساعات العمل</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">إرسال تنبيهات فورية</h4>
                    <p className="text-sm text-muted-foreground">إرسال إشعارات عند الانتهاكات</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">حفظ السجل التاريخي</h4>
                    <p className="text-sm text-muted-foreground">الاحتفاظ بسجل المواقع لمدة 6 أشهر</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات الخصوصية والأمان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">تشفير البيانات</h4>
                    <p className="text-sm text-muted-foreground">تشفير جميع بيانات المواقع</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">موافقة الموظف مطلوبة</h4>
                    <p className="text-sm text-muted-foreground">طلب موافقة صريحة قبل التتبع</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">وصول محدود للبيانات</h4>
                    <p className="text-sm text-muted-foreground">تحديد صلاحيات الوصول حسب الدور</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل تتبع {selectedEmployee.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>الموقع الحالي</Label>
                  <p className="text-sm">{selectedEmployee.currentLocation.address}</p>
                </div>
                <div>
                  <Label>آخر تحديث</Label>
                  <p className="text-sm">{selectedEmployee.currentLocation.timestamp.toLocaleTimeString('ar-SA')}</p>
                </div>
                <div>
                  <Label>ساعات العمل الميداني اليوم</Label>
                  <p className="text-sm font-medium">{selectedEmployee.fieldHours} ساعة</p>
                </div>
                <div>
                  <Label>عدد التحركات</Label>
                  <p className="text-sm font-medium">{selectedEmployee.movements} تحرك</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">سجل المواقع اليوم</h4>
                <ScrollArea className="h-40">
                  <div className="space-y-2">
                    <div className="text-sm p-2 bg-muted rounded">
                      <strong>08:30</strong> - وصل إلى المكتب الرئيسي
                    </div>
                    <div className="text-sm p-2 bg-muted rounded">
                      <strong>09:15</strong> - غادر إلى موقع العمل الأول
                    </div>
                    <div className="text-sm p-2 bg-muted rounded">
                      <strong>10:00</strong> - وصل إلى موقع العمل (حي الملز)
                    </div>
                    <div className="text-sm p-2 bg-muted rounded">
                      <strong>13:30</strong> - استراحة غداء
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};