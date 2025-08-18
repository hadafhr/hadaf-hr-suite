import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Target,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Download,
  ArrowLeft,
  UserCheck,
  UserX,
  Briefcase,
  DollarSign,
  Award,
  FileText,
  Settings,
  MapPin,
  TrendingDown,
  Activity,
  Eye,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Star,
  ChevronUp,
  ChevronDown,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const performanceData = [
  { month: 'يناير', employees: 65, satisfaction: 85, productivity: 78, attendance: 92 },
  { month: 'فبراير', employees: 72, satisfaction: 88, productivity: 82, attendance: 94 },
  { month: 'مارس', employees: 68, satisfaction: 92, productivity: 85, attendance: 91 },
  { month: 'أبريل', employees: 75, satisfaction: 89, productivity: 88, attendance: 93 },
  { month: 'مايو', employees: 80, satisfaction: 94, productivity: 90, attendance: 95 },
  { month: 'يونيو', employees: 85, satisfaction: 91, productivity: 87, attendance: 94 }
];

const departmentData = [
  { name: 'تقنية المعلومات', value: 45, employees: 30, color: '#22c55e' },
  { name: 'المبيعات', value: 35, employees: 25, color: '#eab308' },
  { name: 'التسويق', value: 28, employees: 20, color: '#3b82f6' },
  { name: 'الموارد البشرية', value: 22, employees: 15, color: '#f59e0b' },
  { name: 'المالية', value: 18, employees: 12, color: '#ef4444' },
  { name: 'العمليات', value: 25, employees: 18, color: '#8b5cf6' }
];

const attendanceData = [
  { day: 'السبت', present: 235, absent: 12, late: 8 },
  { day: 'الأحد', present: 240, absent: 7, late: 5 },
  { day: 'الاثنين', present: 238, absent: 9, late: 6 },
  { day: 'الثلاثاء', present: 242, absent: 5, late: 3 },
  { day: 'الأربعاء', present: 245, absent: 2, late: 4 },
  { day: 'الخميس', present: 241, absent: 6, late: 7 }
];

const salaryData = [
  { department: 'تقنية المعلومات', averageSalary: 15000, totalPayroll: 450000 },
  { department: 'المبيعات', averageSalary: 12000, totalPayroll: 300000 },
  { department: 'التسويق', averageSalary: 11000, totalPayroll: 220000 },
  { department: 'الموارد البشرية', averageSalary: 10000, totalPayroll: 150000 },
  { department: 'المالية', averageSalary: 13000, totalPayroll: 156000 },
  { department: 'العمليات', averageSalary: 9000, totalPayroll: 162000 }
];

const leaveData = [
  { type: 'إجازة سنوية', count: 45, approved: 38, pending: 7, rejected: 0 },
  { type: 'إجازة مرضية', count: 23, approved: 20, pending: 2, rejected: 1 },
  { type: 'إجازة طارئة', count: 12, approved: 10, pending: 2, rejected: 0 },
  { type: 'إجازة أمومة', count: 8, approved: 8, pending: 0, rejected: 0 },
  { type: 'إجازة حج', count: 5, approved: 5, pending: 0, rejected: 0 }
];

const recentActivities = [
  { id: 1, type: 'تعيين موظف جديد', description: 'تم تعيين أحمد محمد في قسم تقنية المعلومات', time: 'منذ ساعتين', icon: UserCheck, color: 'text-green-500' },
  { id: 2, type: 'طلب إجازة', description: 'فاطمة أحمد تطلب إجازة سنوية لمدة أسبوع', time: 'منذ 3 ساعات', icon: Calendar, color: 'text-blue-500' },
  { id: 3, type: 'تحديث راتب', description: 'تم تحديث راتب محمد علي بناءً على الترقية', time: 'منذ 5 ساعات', icon: DollarSign, color: 'text-yellow-500' },
  { id: 4, type: 'إنهاء خدمة', description: 'تم إنهاء خدمة سارة محمود من قسم المبيعات', time: 'منذ يوم', icon: UserX, color: 'text-red-500' },
  { id: 5, type: 'تقييم أداء', description: 'اكتمال تقييمات الأداء لشهر يونيو', time: 'منذ يومين', icon: Star, color: 'text-purple-500' }
];

const topPerformers = [
  { name: 'أحمد محمد', department: 'تقنية المعلومات', score: 98, projects: 12 },
  { name: 'فاطمة أحمد', department: 'المبيعات', score: 96, projects: 8 },
  { name: 'محمد علي', department: 'التسويق', score: 94, projects: 10 },
  { name: 'سارة محمود', department: 'الموارد البشرية', score: 92, projects: 6 },
  { name: 'خالد سعد', department: 'المالية', score: 90, projects: 7 }
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTimeRange, setSelectedTimeRange] = useState('شهر');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">لوحة التحكم</h1>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                لوحة التحكم التنفيذية
              </h1>
              <p className="text-muted-foreground">
                نظرة شاملة على أداء المؤسسة وإحصائيات الموارد البشرية المتقدمة
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <select 
                  value={selectedTimeRange} 
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="bg-background border border-border rounded-md px-3 py-1 text-sm"
                >
                  <option value="أسبوع">آخر أسبوع</option>
                  <option value="شهر">آخر شهر</option>
                  <option value="ربع">آخر ربع</option>
                  <option value="سنة">آخر سنة</option>
                </select>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                تحديث البيانات
              </Button>
            </div>
          </div>

        {/* بطاقات الإحصائيات السريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            className="dashboard-card cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => {
              console.log("Total employees card clicked - navigating to employee-management-system");
              navigate('/employee-management-system');
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">247</p>
                <p className="text-sm text-success">+12% من الشهر الماضي</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card 
            className="dashboard-card cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => {
              console.log("Active employees card clicked - navigating to employee-management-system");
              navigate('/employee-management-system');
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">موظف نشط</p>
                <p className="text-2xl font-bold text-primary">234</p>
                <p className="text-sm text-success">اليوم</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card 
            className="dashboard-card cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => {
              console.log("On leave card clicked - navigating to employee-management-system");
              navigate('/employee-management-system');
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">في إجازة</p>
                <p className="text-2xl font-bold text-primary">13</p>
                <p className="text-sm text-muted-foreground">موظف حالياً</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </Card>

          <Card 
            className="dashboard-card cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => {
              console.log("Disciplinary actions card clicked - navigating to disciplinary-system");
              navigate('/disciplinary-system');
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجراءات تأديبية معلقة</p>
                <p className="text-2xl font-bold text-warning">3</p>
                <p className="text-sm text-muted-foreground">تحتاج للمراجعة</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </Card>
        </div>

        {/* بطاقات إضافية للخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            className="dashboard-card cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => {
              console.log("New requests card clicked - navigating to employee-requests");
              navigate('/employee-requests');
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">طلبات جديدة</p>
                <p className="text-2xl font-bold text-primary">8</p>
                <p className="text-sm text-muted-foreground">في انتظار الموافقة</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card 
            className="dashboard-card cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => {
              console.log("Disciplinary system card clicked - navigating to disciplinary-system");
              navigate('/disciplinary-system');
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">نظام الإجراءات التأديبية</p>
                <p className="text-2xl font-bold text-primary">نشط</p>
                <p className="text-sm text-muted-foreground">إدارة شاملة</p>
              </div>
              <Target className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card 
            className="dashboard-card cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => {
              console.log("GPS tracking card clicked - showing toast");
              toast({
                title: "تتبع الموقع",
                description: "سيتم تطوير نظام تتبع الموقع قريباً",
              });
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">تتبع الموظفين</p>
                <p className="text-2xl font-bold text-primary">GPS</p>
                <p className="text-sm text-muted-foreground">تتبع الموقع</p>
              </div>
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
          </Card>
        </div>

        {/* الرسوم البيانية التفصيلية */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="attendance">الحضور</TabsTrigger>
            <TabsTrigger value="performance">الأداء</TabsTrigger>
            <TabsTrigger value="finance">المالية</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">الأداء الشهري المفصل</h3>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="satisfaction" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.6}
                      name="رضا الموظفين (%)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="productivity" 
                      stackId="2"
                      stroke="hsl(var(--chart-2))" 
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.6}
                      name="الإنتاجية (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">توزيع الموظفين حسب القسم</h3>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    عرض التفاصيل
                  </Button>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [
                      `${value} موظف`, 
                      props.payload.name
                    ]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: dept.color }}
                      />
                      <span>{dept.name}: {dept.employees}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">إحصائيات الحضور الأسبوعية</h3>
                  <Badge variant="secondary">آخر أسبوع</Badge>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="present" fill="hsl(var(--chart-1))" name="حاضر" />
                    <Bar dataKey="late" fill="hsl(var(--chart-2))" name="متأخر" />
                    <Bar dataKey="absent" fill="hsl(var(--chart-3))" name="غائب" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="dashboard-card">
                <h3 className="text-lg font-semibold mb-4">طلبات الإجازات</h3>
                <div className="space-y-3">
                  {leaveData.map((leave, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{leave.type}</p>
                        <p className="text-sm text-muted-foreground">
                          إجمالي: {leave.count} | موافق: {leave.approved} | معلق: {leave.pending}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={leave.pending > 0 ? "destructive" : "default"}>
                          {leave.pending > 0 ? `${leave.pending} معلق` : 'مكتمل'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <h3 className="text-lg font-semibold mb-4">أفضل الموظفين أداءً</h3>
                <div className="space-y-3">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-sm text-muted-foreground">{performer.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{performer.score}%</p>
                        <p className="text-sm text-muted-foreground">{performer.projects} مشروع</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="dashboard-card">
                <h3 className="text-lg font-semibold mb-4">النشاطات الأخيرة</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {recentActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                        <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.type}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="finance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">الرواتب حسب القسم</h3>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    تقرير مفصل
                  </Button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salaryData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="department" type="category" width={100} />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} ريال`, 'إجمالي الرواتب']} />
                    <Bar dataKey="totalPayroll" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="dashboard-card">
                <h3 className="text-lg font-semibold mb-4">ملخص الرواتب الشهرية</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">إجمالي الرواتب</p>
                      <p className="text-2xl font-bold">1,438,000 ريال</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">متوسط الراتب</p>
                      <p className="text-2xl font-bold">11,984 ريال</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {salaryData.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-2">
                        <span className="text-sm">{dept.department}</span>
                        <span className="font-medium">{dept.averageSalary.toLocaleString()} ريال</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="dashboard-card cursor-pointer hover:shadow-lg transition-all" 
                    onClick={() => alert('سيتم تطوير تقرير الحضور المفصل قريباً')}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">تقرير الحضور المفصل</h3>
                    <p className="text-sm text-muted-foreground">تحليل شامل للحضور والانصراف</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  إنشاء التقرير
                </Button>
              </Card>

              <Card className="dashboard-card cursor-pointer hover:shadow-lg transition-all" 
                    onClick={() => alert('سيتم تطوير تقرير الأداء قريباً')}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">تقرير الأداء</h3>
                    <p className="text-sm text-muted-foreground">تقييمات ومؤشرات الأداء</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  عرض التحليلات
                </Button>
              </Card>

              <Card className="dashboard-card cursor-pointer hover:shadow-lg transition-all" 
                    onClick={() => alert('سيتم تطوير التقرير المالي قريباً')}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <DollarSign className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">التقرير المالي</h3>
                    <p className="text-sm text-muted-foreground">الرواتب والمكافآت والخصومات</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير البيانات
                </Button>
              </Card>

              <Card className="dashboard-card cursor-pointer hover:shadow-lg transition-all" 
                    onClick={() => navigate('/employee-management')}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">تقرير الموظفين</h3>
                    <p className="text-sm text-muted-foreground">بيانات شاملة عن الموظفين</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
              </Card>

              <Card className="dashboard-card cursor-pointer hover:shadow-lg transition-all" 
                    onClick={() => alert('سيتم تطوير تقرير الإجازات قريباً')}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    <Clock className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">تقرير الإجازات</h3>
                    <p className="text-sm text-muted-foreground">إحصائيات وتحليل الإجازات</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  إنشاء التقرير
                </Button>
              </Card>

              <Card className="dashboard-card cursor-pointer hover:shadow-lg transition-all" 
                    onClick={() => alert('سيتم تطوير التقرير التنفيذي قريباً')}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-indigo-500/10 rounded-lg">
                    <Award className="h-6 w-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">التقرير التنفيذي</h3>
                    <p className="text-sm text-muted-foreground">ملخص شامل للإدارة العليا</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Briefcase className="h-4 w-4 mr-2" />
                  إنشاء تقرير تنفيذي
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* منصات سريعة للوصول */}
        <Card className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">الوصول السريع للأنظمة</h3>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              إضافة اختصار
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col hover:bg-primary/10 transition-colors group"
              onClick={() => navigate('/employee-management-system')}
            >
              <Users className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
              <span>إدارة الموظفين</span>
              <Badge variant="secondary" className="mt-1">247 موظف</Badge>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col hover:bg-primary/10 transition-colors group"
              onClick={() => navigate('/disciplinary-system')}
            >
              <AlertCircle className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
              <span>النظام التأديبي</span>
              <Badge variant="destructive" className="mt-1">3 معلق</Badge>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col hover:bg-primary/10 transition-colors group"
              onClick={() => navigate('/employee-requests')}
            >
              <FileText className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
              <span>طلبات الموظفين</span>
              <Badge variant="secondary" className="mt-1">8 جديد</Badge>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col hover:bg-primary/10 transition-colors group"
              onClick={() => {
                toast({
                  title: "تتبع الموقع",
                  description: "سيتم تطوير نظام تتبع الموقع قريباً",
                });
              }}
            >
              <MapPin className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
              <span>تتبع الموقع</span>
              <Badge variant="outline" className="mt-1">GPS نشط</Badge>
            </Button>
          </div>
        </Card>

        {/* التقارير السريعة والإجراءات */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <h3 className="text-lg font-semibold mb-4">التقارير السريعة</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-primary/10 transition-colors" 
                onClick={() => navigate('/reports-analytics')}
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span>تقرير الحضور</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-primary/10 transition-colors" 
                onClick={() => navigate('/reports-analytics')}
              >
                <Building2 className="h-6 w-6 mb-2" />
                <span>تقرير الأقسام</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-primary/10 transition-colors" 
                onClick={() => navigate('/reports-analytics')}
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>تقرير الأداء</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-primary/10 transition-colors" 
                onClick={() => {
                  console.log("Employee report button clicked - navigating to reports-analytics");
                  navigate('/reports-analytics');
                }}
              >
                <Users className="h-6 w-6 mb-2" />
                <span>تقرير الموظفين</span>
              </Button>
            </div>
          </Card>

          <Card className="dashboard-card">
            <h3 className="text-lg font-semibold mb-4">الإجراءات السريعة</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-primary/10 transition-colors" 
                onClick={() => {
                  console.log("Add employee button clicked - navigating to employee-management-system");
                  navigate('/employee-management-system');
                }}
              >
                <Users className="h-6 w-6 mb-2" />
                <span>إضافة موظف</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-primary/10 transition-colors" 
                onClick={() => {
                  console.log("Employee requests button clicked - navigating to employee-requests");
                  navigate('/employee-requests');
                }}
              >
                <Building2 className="h-6 w-6 mb-2" />
                <span>طلبات الموظفين</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-primary/10 transition-colors" 
                onClick={() => {
                  console.log("Admin configuration button clicked - navigating to admin-configuration");
                  navigate('/admin-configuration');
                }}
              >
                <Settings className="h-6 w-6 mb-2" />
                <span>إعدادات النظام</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-primary/10 transition-colors" 
                onClick={() => {
                  console.log("Edit data button clicked - navigating to employee-management-system");
                  navigate('/employee-management-system');
                }}
              >
                <CheckCircle className="h-6 w-6 mb-2" />
                <span>تحرير البيانات</span>
              </Button>
            </div>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
};