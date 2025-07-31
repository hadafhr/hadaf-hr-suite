import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { 
  BarChart3, 
  Download, 
  FileText, 
  Filter,
  Calendar as CalendarIcon,
  Users,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const attendanceData = [
  { month: 'يناير', attendance: 94, late: 6 },
  { month: 'فبراير', attendance: 96, late: 4 },
  { month: 'مارس', attendance: 92, late: 8 },
  { month: 'أبريل', attendance: 98, late: 2 },
  { month: 'مايو', attendance: 95, late: 5 },
  { month: 'يونيو', attendance: 97, late: 3 }
];

const departmentData = [
  { name: 'تقنية المعلومات', employees: 45, performance: 92 },
  { name: 'المبيعات', employees: 32, performance: 88 },
  { name: 'التسويق', employees: 28, performance: 90 },
  { name: 'الموارد البشرية', employees: 15, performance: 94 },
  { name: 'المالية', employees: 20, performance: 89 }
];

const performanceData = [
  { month: 'يناير', performance: 85 },
  { month: 'فبراير', performance: 88 },
  { month: 'مارس', performance: 92 },
  { month: 'أبريل', performance: 89 },
  { month: 'مايو', performance: 94 },
  { month: 'يونيو', performance: 91 }
];

const recentReports = [
  {
    id: 1,
    title: "تقرير الحضور الشهري",
    type: "حضور",
    period: "يونيو 2024",
    generatedBy: "أحمد السعد",
    date: "2024-07-01",
    status: "مكتمل",
    size: "2.3 MB"
  },
  {
    id: 2,
    title: "تقرير أداء الأقسام",
    type: "أداء",
    period: "الربع الثاني 2024",
    generatedBy: "فاطمة النور",
    date: "2024-06-30",
    status: "مكتمل",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "تقرير الرواتب",
    type: "مالي",
    period: "يونيو 2024",
    generatedBy: "محمد الشمري",
    date: "2024-06-28",
    status: "قيد المعالجة",
    size: "3.1 MB"
  }
];

export const Reports: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTab, setSelectedTab] = useState('attendance');
  const { toast } = useToast();

  const handleNewReport = () => {
    toast({
      title: "إنشاء تقرير جديد",
      description: "تم فتح نموذج إنشاء تقرير جديد",
    });
  };

  const handleExportReport = (reportType: string) => {
    toast({
      title: "تصدير التقرير",
      description: `جاري تصدير ${reportType}...`,
    });
  };

  const handleDownloadReport = (report: any) => {
    toast({
      title: "تحميل التقرير",
      description: `جاري تحميل ${report.title}...`,
    });
  };

  const handleViewReport = (report: any) => {
    toast({
      title: "عرض التقرير",
      description: `تم فتح ${report.title}`,
    });
  };

  const handleFilter = () => {
    toast({
      title: "فلتر التقارير",
      description: "تم فتح إعدادات الفلتر",
    });
  };

  const handleQuickReport = (reportName: string) => {
    toast({
      title: "تقرير سريع",
      description: `جاري إنشاء ${reportName}...`,
    });
  };

  const handleReportSettings = (setting: string) => {
    toast({
      title: "إعدادات التقارير",
      description: `تم فتح ${setting}`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              التقارير والتحليلات
            </h1>
            <p className="text-muted-foreground">
              تقارير شاملة وتحليلات متقدمة لأداء المنشأة والموظفين
            </p>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  تحديد التاريخ
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button className="btn-primary" onClick={handleNewReport}>
              <FileText className="h-4 w-4 mr-2" />
              إنشاء تقرير جديد
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التقارير المولدة</p>
                <p className="text-2xl font-bold text-primary">142</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معدل الحضور</p>
                <p className="text-2xl font-bold text-success">95.8%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط الأداء</p>
                <p className="text-2xl font-bold text-primary">89.2%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التقارير المعلقة</p>
                <p className="text-2xl font-bold text-warning">5</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="attendance">تقارير الحضور</TabsTrigger>
            <TabsTrigger value="departments">تقارير الأقسام</TabsTrigger>
            <TabsTrigger value="performance">تقارير الأداء</TabsTrigger>
            <TabsTrigger value="recent">التقارير الحديثة</TabsTrigger>
          </TabsList>

          {/* Attendance Reports */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">معدل الحضور الشهري</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportReport('تقرير الحضور الشهري')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="hsl(var(--primary))" name="الحضور %" />
                    <Bar dataKey="late" fill="hsl(var(--warning))" name="التأخير %" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="dashboard-card">
                <h3 className="text-lg font-semibold mb-4">إحصائيات الحضور</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">إجمالي أيام العمل</span>
                    <span className="font-medium">22 يوم</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">متوسط الحضور</span>
                    <span className="font-medium text-success">95.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">متوسط التأخير</span>
                    <span className="font-medium text-warning">4.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">الغياب بدون عذر</span>
                    <span className="font-medium text-destructive">1.5%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Department Reports */}
          <TabsContent value="departments" className="space-y-6">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">أداء الأقسام</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportReport('تقرير أداء الأقسام')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  تصدير
                </Button>
              </div>
              
              <div className="space-y-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Building2 className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">{dept.name}</h4>
                        <p className="text-sm text-muted-foreground">{dept.employees} موظف</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">{dept.performance}%</p>
                      <p className="text-sm text-muted-foreground">الأداء</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Performance Reports */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">تطور الأداء</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportReport('تقرير تطور الأداء')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  تصدير
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="الأداء %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Recent Reports */}
          <TabsContent value="recent" className="space-y-6">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">التقارير الحديثة</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleFilter}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    فلتر
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickReport('تحديث التقارير')}
                  >
                    تحديث
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.period}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">بواسطة: {report.generatedBy}</span>
                          <span className="text-xs text-muted-foreground">{report.date}</span>
                          <span className="text-xs text-muted-foreground">{report.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge variant={
                        report.status === 'مكتمل' ? 'default' : 'secondary'
                      }>
                        {report.status}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadReport(report)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">تقارير سريعة</h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickReport('تقرير الحضور اليومي')}
              >
                <Users className="h-4 w-4 mr-2" />
                تقرير الحضور اليومي
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickReport('تقرير الأقسام')}
              >
                <Building2 className="h-4 w-4 mr-2" />
                تقرير الأقسام
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickReport('تقرير الأداء الأسبوعي')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                تقرير الأداء الأسبوعي
              </Button>
            </div>
          </Card>

          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">التقارير المجدولة</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">تقرير شهري</span>
                <span className="text-xs text-muted-foreground">كل أول الشهر</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">تقرير أسبوعي</span>
                <span className="text-xs text-muted-foreground">كل أحد</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">تقرير ربعي</span>
                <span className="text-xs text-muted-foreground">نهاية كل ربع</span>
              </div>
            </div>
          </Card>

          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">إعدادات التقارير</h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleReportSettings('إعداد تقارير تلقائية')}
              >
                <Settings className="h-4 w-4 mr-2" />
                إعداد تقارير تلقائية
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleReportSettings('تخصيص قوالب التقارير')}
              >
                <FileText className="h-4 w-4 mr-2" />
                تخصيص قوالب التقارير
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleReportSettings('إدارة المستلمين')}
              >
                <Users className="h-4 w-4 mr-2" />
                إدارة المستلمين
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};