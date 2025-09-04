import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Clock, 
  Target, 
  Download, 
  RefreshCw,
  Filter,
  Calendar,
  FileText,
  PieChart,
  Activity,
  Zap,
  Eye,
  Settings,
  Search
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area } from 'recharts';
import { useToast } from "@/hooks/use-toast";

interface ComprehensiveAIReportsProps {
  onBack: () => void;
}

const ComprehensiveAIReports = ({ onBack }: ComprehensiveAIReportsProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const { toast } = useToast();

  // Mock data for KPIs and analytics
  const kpiData = {
    turnoverRate: 8.5,
    attendanceRate: 94.2,
    performanceScore: 87.3,
    trainingCompletion: 76.8,
    employeeCount: 245,
    newHires: 12,
    activeProjects: 28,
    budgetUtilization: 82.4
  };

  // Mock data for charts
  const performanceTrend = [
    { month: 'يناير', performance: 85, attendance: 92, satisfaction: 78 },
    { month: 'فبراير', performance: 87, attendance: 94, satisfaction: 81 },
    { month: 'مارس', performance: 89, attendance: 93, satisfaction: 84 },
    { month: 'أبريل', performance: 86, attendance: 95, satisfaction: 82 },
    { month: 'مايو', performance: 88, attendance: 96, satisfaction: 86 },
    { month: 'يونيو', performance: 91, attendance: 94, satisfaction: 88 }
  ];

  const departmentData = [
    { department: 'تقنية المعلومات', employees: 45, performance: 92, turnover: 5.2 },
    { department: 'الموارد البشرية', employees: 28, performance: 89, turnover: 3.1 },
    { department: 'المالية', employees: 35, performance: 88, turnover: 4.8 },
    { department: 'التسويق', employees: 40, performance: 85, turnover: 7.2 },
    { department: 'العمليات', employees: 52, performance: 87, turnover: 6.5 },
    { department: 'المبيعات', employees: 45, performance: 84, turnover: 8.9 }
  ];

  const predictiveInsights = [
    {
      id: 1,
      type: 'تنبؤ بالاستقالة',
      risk: 'عالي',
      employee: 'أحمد محمد',
      department: 'تقنية المعلومات',
      probability: 78,
      reason: 'عدم الرضا الوظيفي وضغط العمل',
      recommendation: 'مراجعة الحمل الوظيفي وتوفير دعم إضافي'
    },
    {
      id: 2,
      type: 'انخفاض الأداء',
      risk: 'متوسط',
      employee: 'سارة أحمد',
      department: 'المبيعات',
      probability: 65,
      reason: 'قلة التدريب في مهارات جديدة',
      recommendation: 'تسجيل في برنامج تدريبي متخصص'
    },
    {
      id: 3,
      type: 'غياب متكرر',
      risk: 'متوسط',
      employee: 'محمد علي',
      department: 'العمليات',
      probability: 58,
      reason: 'مشاكل صحية متكررة',
      recommendation: 'توفير مرونة في العمل والدعم الصحي'
    }
  ];

  const aiRecommendations = [
    {
      id: 1,
      category: 'التوظيف',
      title: 'توظيف مطور واجهات أمامية',
      priority: 'عالية',
      impact: 'مرتفع',
      description: 'يُنصح بتوظيف مطور واجهات أمامية لتقوية فريق تقنية المعلومات',
      action: 'نشر إعلان وظيفي جديد',
      department: 'تقنية المعلومات'
    },
    {
      id: 2,
      category: 'التدريب',
      title: 'برنامج تدريبي في إدارة المشاريع',
      priority: 'متوسطة',
      impact: 'متوسط',
      description: 'تنظيم برنامج تدريبي في إدارة المشاريع لفريق العمليات',
      action: 'التنسيق مع مقدم التدريب',
      department: 'العمليات'
    },
    {
      id: 3,
      category: 'التطوير',
      title: 'برنامج الإرشاد المهني',
      priority: 'عالية',
      impact: 'مرتفع',
      description: 'تفعيل برنامج إرشاد مهني للموظفين الجدد لتحسين الاندماج',
      action: 'اختيار مرشدين وتنظيم البرنامج',
      department: 'الموارد البشرية'
    }
  ];

  const executiveReports = [
    {
      id: 1,
      title: 'تقرير الأداء الاستراتيجي الشهري',
      type: 'شهري',
      status: 'جاهز',
      lastGenerated: '2024-01-15',
      format: 'PDF',
      pages: 24
    },
    {
      id: 2,
      title: 'تحليل الموارد البشرية ربع السنوي',
      type: 'ربع سنوي',
      status: 'قيد التحضير',
      lastGenerated: '2023-12-30',
      format: 'Excel',
      pages: 18
    },
    {
      id: 3,
      title: 'مؤشرات المخاطر والفرص',
      type: 'أسبوعي',
      status: 'جاهز',
      lastGenerated: '2024-01-12',
      format: 'Dashboard',
      pages: 8
    }
  ];

  const analyticsMetrics = [
    { name: 'معدل الدوران', current: 8.5, previous: 9.2, trend: 'down', target: 7.0 },
    { name: 'الرضا الوظيفي', current: 86, previous: 84, trend: 'up', target: 90 },
    { name: 'الإنتاجية', current: 92, previous: 89, trend: 'up', target: 95 },
    { name: 'التدريب المكتمل', current: 76, previous: 72, trend: 'up', target: 85 },
    { name: 'الغياب', current: 5.8, previous: 6.2, trend: 'down', target: 4.0 },
    { name: 'الترقيات الداخلية', current: 68, previous: 65, trend: 'up', target: 75 }
  ];

  const generateReport = (reportType: string) => {
    toast({
      title: "تم إنشاء التقرير",
      description: `جاري تحضير تقرير ${reportType}...`,
    });
  };

  const exportData = (format: string) => {
    toast({
      title: "تصدير البيانات",
      description: `جاري تصدير البيانات بصيغة ${format}...`,
    });
  };

  const refreshData = () => {
    toast({
      title: "تحديث البيانات",
      description: "تم تحديث البيانات بنجاح",
    });
  };

  const COLORS = ['#3CB593', '#2563eb', '#dc2626', '#ea580c', '#7c3aed', '#059669'];

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="hover:bg-muted">
            ←
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/20">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">الذكاء الاصطناعي والتقارير الشاملة</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">هذا الأسبوع</SelectItem>
              <SelectItem value="this-month">هذا الشهر</SelectItem>
              <SelectItem value="this-quarter">هذا الربع</SelectItem>
              <SelectItem value="this-year">هذا العام</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={refreshData} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="dashboard" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            لوحة القيادة
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileText className="w-4 h-4" />
            التقارير
          </TabsTrigger>
          <TabsTrigger value="predictive" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            التحليلات التنبؤية
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="gap-2">
            <Zap className="w-4 h-4" />
            التوصيات الذكية
          </TabsTrigger>
          <TabsTrigger value="executive" className="gap-2">
            <Eye className="w-4 h-4" />
            تقارير تنفيذية
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <Activity className="w-4 h-4" />
            مركز التحليلات
          </TabsTrigger>
        </TabsList>

        {/* Smart Dashboard */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">معدل الدوران</p>
                    <p className="text-2xl font-bold text-foreground">{kpiData.turnoverRate}%</p>
                    <p className="text-xs text-green-600">↓ 0.7% عن الشهر السابق</p>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-gradient-to-br from-background to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">نسبة الحضور</p>
                    <p className="text-2xl font-bold text-foreground">{kpiData.attendanceRate}%</p>
                    <p className="text-xs text-green-600">↑ 1.2% عن الشهر السابق</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-background to-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">درجة الأداء</p>
                    <p className="text-2xl font-bold text-foreground">{kpiData.performanceScore}%</p>
                    <p className="text-xs text-green-600">↑ 2.1% عن الشهر السابق</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 bg-gradient-to-br from-background to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">عدد الموظفين</p>
                    <p className="text-2xl font-bold text-foreground">{kpiData.employeeCount}</p>
                    <p className="text-xs text-green-600">↑ {kpiData.newHires} موظف جديد</p>
                  </div>
                  <div className="p-3 rounded-full bg-orange-100">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  اتجاهات الأداء الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="performance" stroke="#3CB593" strokeWidth={2} name="الأداء" />
                    <Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={2} name="الحضور" />
                    <Line type="monotone" dataKey="satisfaction" stroke="#dc2626" strokeWidth={2} name="الرضا" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  توزيع الموظفين حسب الأقسام
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Tooltip />
                    <Legend />
                    <RechartsPieChart data={departmentData}>
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>أداء الأقسام</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <div>
                        <p className="font-medium text-foreground">{dept.department}</p>
                        <p className="text-sm text-muted-foreground">{dept.employees} موظف</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">الأداء</p>
                        <p className="font-bold text-foreground">{dept.performance}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">معدل الدوران</p>
                        <p className="font-bold text-foreground">{dept.turnover}%</p>
                      </div>
                      <Badge variant={dept.performance >= 90 ? "default" : dept.performance >= 80 ? "secondary" : "destructive"}>
                        {dept.performance >= 90 ? "ممتاز" : dept.performance >= 80 ? "جيد" : "يحتاج تحسين"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HR Reports */}
        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input placeholder="البحث في التقارير..." className="w-64" />
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  <SelectItem value="it">تقنية المعلومات</SelectItem>
                  <SelectItem value="hr">الموارد البشرية</SelectItem>
                  <SelectItem value="finance">المالية</SelectItem>
                  <SelectItem value="marketing">التسويق</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => exportData('Excel')} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Excel
              </Button>
              <Button onClick={() => exportData('PDF')} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'تقرير الحضور الشهري', category: 'حضور وانصراف', icon: Clock, status: 'جاهز' },
              { title: 'تقرير الرواتب', category: 'مالية', icon: Target, status: 'قيد التحضير' },
              { title: 'تقرير الإجازات', category: 'إجازات', icon: Calendar, status: 'جاهز' },
              { title: 'تقرير التقييمات', category: 'أداء', icon: BarChart3, status: 'جاهز' },
              { title: 'تقرير التدريب', category: 'تطوير', icon: Brain, status: 'جاهز' },
              { title: 'تقرير التوظيف', category: 'موارد بشرية', icon: Users, status: 'قيد التحضير' }
            ].map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <report.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{report.category}</p>
                      </div>
                    </div>
                    <Badge variant={report.status === 'جاهز' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => generateReport(report.title)} 
                      className="flex-1 gap-2"
                      disabled={report.status !== 'جاهز'}
                    >
                      <FileText className="w-4 h-4" />
                      إنشاء التقرير
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>التقارير الحديثة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'تقرير الحضور - يناير 2024', date: '2024-01-15', size: '2.4 MB', format: 'PDF' },
                  { name: 'تحليل الأداء الربعي', date: '2024-01-10', size: '1.8 MB', format: 'Excel' },
                  { name: 'تقرير التدريب السنوي', date: '2024-01-05', size: '3.1 MB', format: 'PDF' },
                  { name: 'إحصائيات الرواتب', date: '2023-12-30', size: '1.2 MB', format: 'Excel' }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.date} • {report.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{report.format}</Badge>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="w-3 h-3" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictive Analytics */}
        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    التنبؤات عالية الخطورة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {predictiveInsights.map((insight) => (
                      <div key={insight.id} className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={insight.risk === 'عالي' ? 'destructive' : 'secondary'}>
                                {insight.risk}
                              </Badge>
                              <h4 className="font-medium text-foreground">{insight.type}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{insight.employee} - {insight.department}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-foreground">{insight.probability}%</p>
                            <p className="text-xs text-muted-foreground">احتمالية</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">السبب:</p>
                            <p className="text-sm text-foreground">{insight.reason}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">التوصية:</p>
                            <p className="text-sm text-foreground">{insight.recommendation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            عرض التفاصيل
                          </Button>
                          <Button size="sm">
                            اتخاذ إجراء
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات التنبؤات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-2xl font-bold text-red-600">3</p>
                      <p className="text-sm text-red-600">حالات عالية الخطورة</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-200">
                      <p className="text-2xl font-bold text-orange-600">7</p>
                      <p className="text-sm text-orange-600">حالات متوسطة الخطورة</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-2xl font-bold text-green-600">85%</p>
                      <p className="text-sm text-green-600">دقة التنبؤات</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>أهم المؤشرات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">خطر الاستقالة</span>
                      <span className="font-medium text-red-600">متوسط</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">مستوى الرضا</span>
                      <span className="font-medium text-green-600">جيد</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">كفاءة الفرق</span>
                      <span className="font-medium text-blue-600">ممتاز</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* AI Recommendations */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {aiRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={recommendation.priority === 'عالية' ? 'destructive' : 'secondary'}>
                      {recommendation.priority}
                    </Badge>
                    <Badge variant="outline">{recommendation.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{recommendation.department}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-foreground">{recommendation.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">التأثير المتوقع:</span>
                      <Badge variant={recommendation.impact === 'مرتفع' ? 'default' : 'secondary'}>
                        {recommendation.impact}
                      </Badge>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium text-muted-foreground mb-1">الإجراء المطلوب:</p>
                      <p className="text-sm text-foreground">{recommendation.action}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="flex-1">
                        تنفيذ التوصية
                      </Button>
                      <Button size="sm" variant="outline">
                        تفاصيل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insights Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                ملخص الرؤى الذكية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                  <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-blue-600">توصيات نشطة</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-sm text-green-600">توصيات مطبقة</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/15">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">92%</p>
                  <p className="text-sm text-primary">نسبة الدقة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Executive Reports */}
        <TabsContent value="executive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير التنفيذية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {executiveReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{report.title}</p>
                          <p className="text-sm text-muted-foreground">{report.type} • آخر تحديث: {report.lastGenerated}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.status === 'جاهز' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          عرض
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المؤشرات الاستراتيجية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <h4 className="font-medium text-red-800">مخاطر</h4>
                    </div>
                    <p className="text-sm text-red-700">ارتفاع معدل الدوران في قسم التسويق</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <h4 className="font-medium text-green-800">فرص</h4>
                    </div>
                    <p className="text-sm text-green-700">تحسن ملحوظ في رضا موظفي تقنية المعلومات</p>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <h4 className="font-medium text-blue-800">اتجاهات</h4>
                    </div>
                    <p className="text-sm text-blue-700">زيادة الطلب على برامج التدريب التقني</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Executive Summary Chart */}
          <Card>
            <CardHeader>
              <CardTitle>ملخص الأداء التنفيذي</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="performance" stackId="1" stroke="#3CB593" fill="#3CB593" fillOpacity={0.6} name="الأداء" />
                  <Area type="monotone" dataKey="satisfaction" stackId="2" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} name="الرضا" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Center */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">مركز التحليلات المتقدمة</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                تصفية
              </Button>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                تصدير التحليل
              </Button>
            </div>
          </div>

          {/* Analytics Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyticsMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-foreground">{metric.name}</h3>
                    <Badge variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'destructive' : 'secondary'}>
                      {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">الحالي</span>
                      <span className="text-xl font-bold text-foreground">{metric.current}{metric.name.includes('معدل') || metric.name.includes('نسبة') ? '%' : ''}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">السابق</span>
                      <span className="text-sm text-muted-foreground">{metric.previous}{metric.name.includes('معدل') || metric.name.includes('نسبة') ? '%' : ''}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">المستهدف</span>
                      <span className="text-sm font-medium text-primary">{metric.target}{metric.name.includes('معدل') || metric.name.includes('نسبة') ? '%' : ''}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(metric.current / metric.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Advanced Analytics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>تحليل الارتباطات</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="performance" fill="#3CB593" name="الأداء" />
                  <Bar dataKey="employees" fill="#2563eb" name="عدد الموظفين" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Correlation Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>تحليل العلاقات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">علاقات إيجابية قوية</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                      <span className="text-sm text-green-800">التدريب ↔ الأداء</span>
                      <Badge variant="default">0.87</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                      <span className="text-sm text-green-800">الرضا ↔ الحضور</span>
                      <Badge variant="default">0.82</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">علاقات سلبية</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                      <span className="text-sm text-red-800">الإجهاد ↔ الأداء</span>
                      <Badge variant="destructive">-0.73</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                      <span className="text-sm text-red-800">الساعات الإضافية ↔ الرضا</span>
                      <Badge variant="destructive">-0.68</Badge>
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

export default ComprehensiveAIReports;