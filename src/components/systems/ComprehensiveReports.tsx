import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  FileBarChart, 
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Filter,
  Calendar,
  FileText,
  Users,
  Clock,
  DollarSign,
  Target,
  RefreshCw,
  Search,
  Eye,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { useToast } from "@/hooks/use-toast";

interface ComprehensiveReportsProps {
  onBack: () => void;
}

const ComprehensiveReports = ({ onBack }: ComprehensiveReportsProps) => {
  const [activeTab, setActiveTab] = useState('reports-dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const { toast } = useToast();

  // Mock Reports Data
  const reportCategories = [
    {
      id: 'hr',
      name: 'تقارير الموارد البشرية',
      icon: Users,
      count: 24,
      reports: [
        'تقرير الحضور والانصراف',
        'تقرير الإجازات',
        'تقرير الرواتب',
        'تقرير التقييمات',
        'تقرير التدريب'
      ]
    },
    {
      id: 'finance',
      name: 'التقارير المالية',
      icon: DollarSign,
      count: 18,
      reports: [
        'تقرير كشف الرواتب',
        'تقرير المكافآت',
        'تقرير التأمين',
        'تقرير المصروفات'
      ]
    },
    {
      id: 'performance',
      name: 'تقارير الأداء',
      icon: Target,
      count: 15,
      reports: [
        'تقرير أداء الموظفين',
        'تقرير الأهداف',
        'تقرير الإنجازات',
        'تقرير التحسينات'
      ]
    },
    {
      id: 'operational',
      name: 'التقارير التشغيلية',
      icon: BarChart3,
      count: 32,
      reports: [
        'تقرير المهام',
        'تقرير المشاريع',
        'تقرير الاجتماعات',
        'تقرير الطلبات'
      ]
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'تقرير الحضور الشهري',
      type: 'حضور وانصراف',
      date: '2024-01-15',
      size: '2.4 MB',
      downloads: 156,
      status: 'مكتمل'
    },
    {
      id: 2,
      name: 'تقرير الرواتب ديسمبر',
      type: 'مالي',
      date: '2024-01-10',
      size: '1.8 MB',
      downloads: 89,
      status: 'مكتمل'
    },
    {
      id: 3,
      name: 'تقرير أداء الفريق',
      type: 'أداء',
      date: '2024-01-08',
      size: '3.2 MB',
      downloads: 201,
      status: 'قيد المعالجة'
    }
  ];

  const reportMetrics = [
    { name: 'إجمالي التقارير', value: 89, trend: '+12%', color: '#3CB593' },
    { name: 'التقارير المجدولة', value: 34, trend: '+8%', color: '#8884d8' },
    { name: 'معدل التحديث', value: 96, trend: '+5%', color: '#82ca9d' },
    { name: 'رضا المستخدمين', value: 94, trend: '+3%', color: '#ffc658' }
  ];

  const monthlyReportsData = [
    { month: 'يناير', hr: 24, finance: 18, performance: 15, operational: 32 },
    { month: 'فبراير', hr: 28, finance: 22, performance: 18, operational: 35 },
    { month: 'مارس', hr: 32, finance: 20, performance: 22, operational: 38 },
    { month: 'أبريل', hr: 29, finance: 25, performance: 20, operational: 41 },
    { month: 'مايو', hr: 35, finance: 28, performance: 25, operational: 44 }
  ];

  const departmentReportsData = [
    { name: 'الموارد البشرية', value: 45, color: '#3CB593' },
    { name: 'المالية', value: 25, color: '#8884d8' },
    { name: 'تقنية المعلومات', value: 20, color: '#82ca9d' },
    { name: 'التسويق', value: 10, color: '#ffc658' }
  ];

  const handleGenerateReport = () => {
    toast({
      title: "تم بدء إنشاء التقرير",
      description: "جاري إعداد التقرير المخصص...",
    });
  };

  const handleExportReport = (format: string) => {
    toast({
      title: `تم تصدير التقرير`,
      description: `تم تصدير التقرير بصيغة ${format}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft border border-border/20">
        <div className="flex items-center gap-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="border-muted-foreground/20 text-foreground hover:bg-primary/5"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            رجوع
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow">
              <FileBarChart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                التقارير الشاملة
              </h1>
              <p className="text-muted-foreground text-lg">
                نظام التقارير المتقدم والتحليلات التفاعلية
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="this-week">هذا الأسبوع</SelectItem>
              <SelectItem value="this-month">هذا الشهر</SelectItem>
              <SelectItem value="last-month">الشهر الماضي</SelectItem>
              <SelectItem value="this-year">هذا العام</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleGenerateReport}
            className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white"
          >
            <FileText className="h-4 w-4 ml-2" />
            إنشاء تقرير جديد
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur p-1 rounded-xl border">
          <TabsTrigger value="reports-dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التقارير
          </TabsTrigger>
          <TabsTrigger value="hr-reports" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            تقارير الموارد البشرية
          </TabsTrigger>
          <TabsTrigger value="executive-reports" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            التقارير التنفيذية
          </TabsTrigger>
          <TabsTrigger value="analytics-center" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            مركز التحليلات
          </TabsTrigger>
          <TabsTrigger value="reports-settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            إعدادات التقارير
          </TabsTrigger>
        </TabsList>

        {/* Reports Dashboard */}
        <TabsContent value="reports-dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur border-border/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</span>
                    <Badge variant="secondary" className="text-green-600 bg-green-100">
                      {metric.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-white/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  إحصائيات التقارير الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyReportsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hr" fill="#3CB593" name="الموارد البشرية" />
                    <Bar dataKey="finance" fill="#8884d8" name="المالية" />
                    <Bar dataKey="performance" fill="#82ca9d" name="الأداء" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  توزيع التقارير حسب القسم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Tooltip />
                    <RechartsPieChart data={departmentReportsData}>
                      {departmentReportsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  فئات التقارير
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportCategories.map((category) => (
                    <div key={category.id} className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <category.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">{category.count} تقرير متاح</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 ml-2" />
                          عرض
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  التقارير الحديثة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{report.name}</h4>
                        <Badge variant={report.status === 'مكتمل' ? 'secondary' : 'default'}>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{report.type}</span>
                        <span>{report.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{report.size}</span>
                          <span>•</span>
                          <span>{report.downloads} تحميل</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => handleExportReport('PDF')}>
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* HR Reports */}
        <TabsContent value="hr-reports" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                تقارير الموارد البشرية الشاملة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportCategories[0].reports.map((report, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">{report}</h4>
                        <p className="text-sm text-muted-foreground">تحديث يومي</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleExportReport('Excel')}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                          إنشاء
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Executive Reports */}
        <TabsContent value="executive-reports" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                التقارير التنفيذية للإدارة العليا
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">المؤشرات الاستراتيجية</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>معدل الدوران الوظيفي</span>
                        <span className="font-semibold">8.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>رضا الموظفين</span>
                        <span className="font-semibold">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الالتزام بالميزانية</span>
                        <span className="font-semibold">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>نسبة السعودة</span>
                        <span className="font-semibold">72%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-muted/20 to-muted/10 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">المخاطر والفرص</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm">مخاطر الاستقالات في IT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">تحسين الأداء في التسويق</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">فرص توسع الفريق</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    <FileText className="h-4 w-4 ml-2" />
                    تقرير تنفيذي شامل
                  </Button>
                  <Button variant="outline" onClick={() => handleExportReport('PowerPoint')}>
                    <Download className="h-4 w-4 ml-2" />
                    تصدير عرض تقديمي
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Center */}
        <TabsContent value="analytics-center" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                مركز التحليلات المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">اتجاهات الأداء</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={monthlyReportsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="hr" stroke="#3CB593" name="الموارد البشرية" />
                      <Line type="monotone" dataKey="performance" stroke="#8884d8" name="الأداء" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">المقارنات التحليلية</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">مقارنة الأقسام</h4>
                      <p className="text-sm text-muted-foreground mb-3">أداء الأقسام خلال الربع الأخير</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>تقنية المعلومات</span>
                          <span className="text-green-600 font-semibold">+15%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>التسويق</span>
                          <span className="text-red-600 font-semibold">-5%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>المالية</span>
                          <span className="text-green-600 font-semibold">+8%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">التوقعات المستقبلية</h4>
                      <p className="text-sm text-muted-foreground">بناءً على البيانات التاريخية</p>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>النمو المتوقع</span>
                          <span className="text-green-600 font-semibold">12%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>تحسن الإنتاجية</span>
                          <span className="text-blue-600 font-semibold">18%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Settings */}
        <TabsContent value="reports-settings" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                إعدادات نظام التقارير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">إعدادات الإنشاء التلقائي</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">تكرار التقارير الدورية</label>
                        <Select defaultValue="weekly">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">يومياً</SelectItem>
                            <SelectItem value="weekly">أسبوعياً</SelectItem>
                            <SelectItem value="monthly">شهرياً</SelectItem>
                            <SelectItem value="quarterly">ربع سنوي</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">صيغة التصدير الافتراضية</label>
                        <Select defaultValue="excel">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="powerpoint">PowerPoint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">إعدادات الإشعارات</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">إشعار اكتمال التقرير</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">تنبيهات التقارير المجدولة</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">ملخص التقارير الأسبوعي</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">قوالب التقارير المخصصة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">قالب الإدارة العليا</h4>
                      <p className="text-sm text-muted-foreground mb-3">ملخص تنفيذي شامل</p>
                      <Button size="sm" variant="outline">تعديل القالب</Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">قالب مدراء الأقسام</h4>
                      <p className="text-sm text-muted-foreground mb-3">تقارير تفصيلية للأقسام</p>
                      <Button size="sm" variant="outline">تعديل القالب</Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">قالب الموارد البشرية</h4>
                      <p className="text-sm text-muted-foreground mb-3">تقارير شؤون الموظفين</p>
                      <Button size="sm" variant="outline">تعديل القالب</Button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    <RefreshCw className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 ml-2" />
                    تصدير الإعدادات
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveReports;