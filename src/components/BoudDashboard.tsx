import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  Users,
  Building,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  UserX
} from 'lucide-react';
import { useBoudDashboard } from '@/hooks/useBoudDashboard';

const BoudDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { data, loading } = useBoudDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Sample data for charts - في التطبيق الحقيقي ستأتي من البيانات الفعلية
  const monthlyData = [
    { month: 'يناير', employees: 120, payroll: 450000, attendance: 95 },
    { month: 'فبراير', employees: 125, payroll: 470000, attendance: 93 },
    { month: 'مارس', employees: 130, payroll: 485000, attendance: 97 },
    { month: 'أبريل', employees: 128, payroll: 476000, attendance: 96 },
    { month: 'مايو', employees: 135, payroll: 502000, attendance: 94 },
    { month: 'يونيو', employees: 140, payroll: 521000, attendance: 98 }
  ];

  const departmentData = [
    { name: 'الموارد البشرية', employees: 25, color: 'hsl(var(--primary))' },
    { name: 'التقنية', employees: 45, color: 'hsl(var(--secondary))' },
    { name: 'المبيعات', employees: 35, color: 'hsl(var(--accent))' },
    { name: 'المالية', employees: 20, color: 'hsl(var(--muted))' },
    { name: 'التسويق', employees: 15, color: 'hsl(var(--destructive))' }
  ];

  const attendanceData = [
    { day: 'السبت', present: 135, absent: 5, late: 8 },
    { day: 'الأحد', present: 138, absent: 2, late: 5 },
    { day: 'الاثنين', present: 140, absent: 0, late: 3 },
    { day: 'الثلاثاء', present: 137, absent: 3, late: 6 },
    { day: 'الأربعاء', present: 139, absent: 1, late: 4 },
    { day: 'الخميس', present: 136, absent: 4, late: 7 }
  ];

  const performanceData = [
    { category: 'ممتاز', count: 45, percentage: 32 },
    { category: 'جيد جداً', count: 58, percentage: 41 },
    { category: 'جيد', count: 28, percentage: 20 },
    { category: 'مقبول', count: 9, percentage: 7 }
  ];

  const kpiCards = [
    {
      title: 'إجمالي الموظفين',
      value: '140',
      change: '+5',
      changePercent: '3.7%',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'الراتب الشهري',
      value: '521,000',
      change: '+19,000',
      changePercent: '3.8%',
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'معدل الحضور',
      value: '98%',
      change: '+2%',
      changePercent: '2.1%',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'الشركات النشطة',
      value: '12',
      change: '+2',
      changePercent: '20%',
      icon: Building,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6 p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
          <p className="text-muted-foreground">نظرة شاملة على أداء الشركة</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {new Date().toLocaleDateString('ar-SA')}
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {kpi.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-success ml-1" />
                    <span className="text-sm text-success font-medium">
                      {kpi.change} ({kpi.changePercent})
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="employees">الموظفين</TabsTrigger>
          <TabsTrigger value="attendance">الحضور</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  الاتجاهات الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="employees"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.6}
                      name="عدد الموظفين"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  توزيع الأقسام
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="employees"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Payroll Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                اتجاهات الرواتب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), 'ريال سعودي']} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="payroll"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    name="إجمالي الرواتب"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>نمو عدد الموظفين</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="employees" fill="hsl(var(--primary))" name="عدد الموظفين" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الموظفين</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>الموظفين الجدد هذا الشهر</span>
                  <Badge variant="secondary">+8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>الموظفين المغادرين</span>
                  <Badge variant="destructive">-3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>معدل الاحتفاظ</span>
                  <Badge variant="default">97.8%</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>متوسط سنوات الخبرة</span>
                    <span>4.2 سنة</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                تقرير الحضور الأسبوعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="hsl(var(--primary))" name="حاضر" />
                  <Bar dataKey="late" fill="hsl(var(--destructive))" name="متأخر" />
                  <Bar dataKey="absent" fill="hsl(var(--muted))" name="غائب" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-foreground">98.5%</h3>
                <p className="text-muted-foreground">معدل الحضور</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-foreground">2.1%</h3>
                <p className="text-muted-foreground">معدل التأخير</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <UserX className="h-12 w-12 text-red-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-foreground">1.4%</h3>
                <p className="text-muted-foreground">معدل الغياب</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>تقييم الأداء</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${120 + index * 30}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>مؤشرات الأداء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{item.category}</span>
                      <span>{item.count} موظف ({item.percentage}%)</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>الإنجازات والأهداف</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">الأهداف الشهرية</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>هدف الإنتاجية</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>هدف رضا العملاء</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>هدف التدريب</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">الإنجازات الأخيرة</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">تحسين معدل الحضور بنسبة 5%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">إكمال برنامج التدريب السنوي</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">زيادة رضا الموظفين إلى 94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BoudDashboard;