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
  Area
} from 'recharts';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Download,
  Users,
  Clock,
  DollarSign,
  Calendar,
  Building2,
  Target,
  Award,
  FileText,
  Filter,
  RefreshCw,
  Eye,
  Printer,
  Share
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// بيانات وهمية للتقارير
const employeeData = [
  { month: 'يناير', total: 245, active: 235, onLeave: 10, new: 15, terminated: 5 },
  { month: 'فبراير', total: 250, active: 240, onLeave: 10, new: 8, terminated: 3 },
  { month: 'مارس', total: 248, active: 238, onLeave: 10, new: 5, terminated: 7 },
  { month: 'أبريل', total: 253, active: 243, onLeave: 10, new: 10, terminated: 5 },
  { month: 'مايو', total: 255, active: 245, onLeave: 10, new: 7, terminated: 5 },
  { month: 'يونيو', total: 260, active: 250, onLeave: 10, new: 12, terminated: 7 }
];

const attendanceData = [
  { day: 'السبت', present: 235, late: 8, absent: 12, overtime: 25 },
  { day: 'الأحد', present: 240, late: 5, absent: 7, overtime: 30 },
  { day: 'الاثنين', present: 238, late: 6, absent: 9, overtime: 28 },
  { day: 'الثلاثاء', present: 242, late: 3, absent: 5, overtime: 32 },
  { day: 'الأربعاء', present: 245, late: 4, absent: 2, overtime: 35 },
  { day: 'الخميس', present: 241, late: 7, absent: 6, overtime: 20 }
];

const performanceData = [
  { department: 'تقنية المعلومات', score: 92, projects: 15, efficiency: 88 },
  { department: 'المبيعات', score: 85, projects: 12, efficiency: 90 },
  { department: 'التسويق', score: 88, projects: 10, efficiency: 85 },
  { department: 'الموارد البشرية', score: 90, projects: 8, efficiency: 92 },
  { department: 'المالية', score: 87, projects: 6, efficiency: 89 },
  { department: 'العمليات', score: 83, projects: 11, efficiency: 86 }
];

const salaryData = [
  { month: 'يناير', total: 2450000, average: 10000, bonuses: 125000, deductions: 45000 },
  { month: 'فبراير', total: 2500000, average: 10200, bonuses: 135000, deductions: 42000 },
  { month: 'مارس', total: 2480000, average: 10000, bonuses: 120000, deductions: 48000 },
  { month: 'أبريل', total: 2530000, average: 10300, bonuses: 140000, deductions: 40000 },
  { month: 'مايو', total: 2550000, average: 10400, bonuses: 150000, deductions: 38000 },
  { month: 'يونيو', total: 2600000, average: 10600, bonuses: 160000, deductions: 35000 }
];

const leaveData = [
  { type: 'إجازة سنوية', count: 45, approved: 38, pending: 7, rejected: 0 },
  { type: 'إجازة مرضية', count: 23, approved: 20, pending: 2, rejected: 1 },
  { type: 'إجازة طارئة', count: 12, approved: 10, pending: 2, rejected: 0 },
  { type: 'إجازة أمومة', count: 8, approved: 8, pending: 0, rejected: 0 },
  { type: 'إجازة حج', count: 5, approved: 5, pending: 0, rejected: 0 }
];

const departmentColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const ReportsAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('شهر');
  const [refreshing, setRefreshing] = useState(false);

  const handleExport = (type: string) => {
    toast({
      title: "تصدير التقرير",
      description: `تم تصدير تقرير ${type} بنجاح`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "طباعة التقرير",
      description: "تم إرسال التقرير للطباعة",
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "تحديث البيانات",
        description: "تم تحديث البيانات بنجاح",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            <h1 className="text-xl font-semibold">التقارير والتحليلات</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                التقارير والتحليلات التفصيلية
              </h1>
              <p className="text-muted-foreground">
                تقارير شاملة عن الموظفين والأداء والإحصائيات المتقدمة
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <select 
                  value={selectedPeriod} 
                  onChange={(e) => setSelectedPeriod(e.target.value)}
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
                تحديث
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                طباعة
              </Button>
            </div>
          </div>

          {/* الإحصائيات السريعة */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي التقارير</p>
                  <p className="text-2xl font-bold text-primary">127</p>
                  <p className="text-sm text-success">+15% هذا الشهر</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">معدل الحضور</p>
                  <p className="text-2xl font-bold text-primary">94.2%</p>
                  <p className="text-sm text-success">+2.1% من الشهر الماضي</p>
                </div>
                <Clock className="h-8 w-8 text-success" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">متوسط الأداء</p>
                  <p className="text-2xl font-bold text-primary">87.5%</p>
                  <p className="text-sm text-success">+3.2% من الشهر الماضي</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">الرواتب الشهرية</p>
                  <p className="text-2xl font-bold text-primary">2.6M</p>
                  <p className="text-sm text-success">ريال سعودي</p>
                </div>
                <DollarSign className="h-8 w-8 text-warning" />
              </div>
            </Card>
          </div>

          {/* التقارير المفصلة */}
          <Tabs defaultValue="employees" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="employees">الموظفين</TabsTrigger>
              <TabsTrigger value="attendance">الحضور</TabsTrigger>
              <TabsTrigger value="performance">الأداء</TabsTrigger>
              <TabsTrigger value="finance">المالية</TabsTrigger>
              <TabsTrigger value="leaves">الإجازات</TabsTrigger>
            </TabsList>

            <TabsContent value="employees" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">تطور عدد الموظفين</h3>
                    <Button variant="outline" size="sm" onClick={() => handleExport('الموظفين')}>
                      <Download className="h-4 w-4 mr-2" />
                      تصدير
                    </Button>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={employeeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="total" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        name="إجمالي الموظفين"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="active" 
                        stroke="hsl(var(--chart-1))" 
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.3}
                        name="الموظفين النشطين"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="dashboard-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">حركة التوظيف الشهرية</h3>
                    <Badge variant="secondary">آخر 6 أشهر</Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={employeeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="new" fill="hsl(var(--chart-1))" name="توظيف جديد" />
                      <Bar dataKey="terminated" fill="hsl(var(--chart-3))" name="إنهاء خدمة" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">إحصائيات الحضور الأسبوعية</h3>
                    <Button variant="outline" size="sm" onClick={() => handleExport('الحضور')}>
                      <Download className="h-4 w-4 mr-2" />
                      تصدير
                    </Button>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">ساعات العمل الإضافية</h3>
                    <Badge variant="secondary">أسبوعي</Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="overtime" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        name="ساعات إضافية"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">تقييم الأداء حسب القسم</h3>
                  <Button variant="outline" size="sm" onClick={() => handleExport('الأداء')}>
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={performanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="department" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--primary))" name="نقاط الأداء" />
                    <Bar dataKey="efficiency" fill="hsl(var(--chart-2))" name="الكفاءة %" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="finance" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">تطور الرواتب الشهرية</h3>
                    <Button variant="outline" size="sm" onClick={() => handleExport('المالية')}>
                      <Download className="h-4 w-4 mr-2" />
                      تصدير
                    </Button>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={salaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="total" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        name="إجمالي الرواتب"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="dashboard-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">المكافآت والخصومات</h3>
                    <Badge variant="secondary">شهري</Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={salaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bonuses" fill="hsl(var(--chart-1))" name="مكافآت" />
                      <Bar dataKey="deductions" fill="hsl(var(--chart-3))" name="خصومات" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="leaves" className="space-y-6">
              <Card className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">إحصائيات الإجازات</h3>
                  <Button variant="outline" size="sm" onClick={() => handleExport('الإجازات')}>
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-3 px-4">نوع الإجازة</th>
                        <th className="text-right py-3 px-4">إجمالي الطلبات</th>
                        <th className="text-right py-3 px-4">موافق عليها</th>
                        <th className="text-right py-3 px-4">في الانتظار</th>
                        <th className="text-right py-3 px-4">مرفوضة</th>
                        <th className="text-right py-3 px-4">معدل الموافقة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveData.map((leave, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{leave.type}</td>
                          <td className="py-3 px-4">{leave.count}</td>
                          <td className="py-3 px-4 text-green-600">{leave.approved}</td>
                          <td className="py-3 px-4 text-yellow-600">{leave.pending}</td>
                          <td className="py-3 px-4 text-red-600">{leave.rejected}</td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">
                              {Math.round((leave.approved / leave.count) * 100)}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* تقارير سريعة */}
          <Card className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">تقارير سريعة</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  مشاركة
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  معاينة
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="p-4 h-auto flex-col"
                onClick={() => handleExport('تقرير شامل')}
              >
                <FileText className="h-6 w-6 mb-2" />
                <span>تقرير شامل شهري</span>
              </Button>
              <Button 
                variant="outline" 
                className="p-4 h-auto flex-col"
                onClick={() => handleExport('تقرير الحضور')}
              >
                <Clock className="h-6 w-6 mb-2" />
                <span>تقرير الحضور والانصراف</span>
              </Button>
              <Button 
                variant="outline" 
                className="p-4 h-auto flex-col"
                onClick={() => handleExport('تقرير الأداء')}
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>تقرير تقييم الأداء</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;