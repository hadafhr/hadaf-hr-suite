import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText,
  Download,
  Printer,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Filter,
  Search,
  Eye,
  Share2,
  Users,
  DollarSign,
  Heart,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from 'recharts';

export const SocialServicesReports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showGenerateReport, setShowGenerateReport] = useState(false);

  const reportTabs = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'programs', name: 'تقارير البرامج', icon: Heart },
    { id: 'employees', name: 'تقارير الموظفين', icon: Users },
    { id: 'financial', name: 'التقارير المالية', icon: DollarSign }
  ];

  const quickReports = [
    {
      id: 1,
      title: 'تقرير شامل - الربع الأول 2024',
      description: 'تقرير شامل عن جميع الأنشطة والبرامج الاجتماعية',
      generatedDate: '2024-01-31',
      pages: 45,
      type: 'comprehensive',
      status: 'ready'
    },
    {
      id: 2,
      title: 'تقرير المساعدات الطبية',
      description: 'تفاصيل المساعدات الطبية المقدمة للموظفين',
      generatedDate: '2024-01-25',
      pages: 12,
      type: 'medical',
      status: 'ready'
    },
    {
      id: 3,
      title: 'تقرير البرامج التطوعية',
      description: 'إحصائيات ونتائج البرامج التطوعية والمجتمعية',
      generatedDate: '2024-01-20',
      pages: 18,
      type: 'volunteering',
      status: 'ready'
    }
  ];

  const kpiData = [
    { name: 'يناير', requests: 45, approved: 38, budget: 150000 },
    { name: 'فبراير', requests: 52, approved: 47, budget: 180000 },
    { name: 'مارس', requests: 48, approved: 41, budget: 165000 },
    { name: 'أبريل', requests: 61, approved: 55, budget: 220000 },
    { name: 'مايو', requests: 58, approved: 52, budget: 195000 },
    { name: 'يونيو', requests: 67, approved: 62, budget: 245000 }
  ];

  const programDistribution = [
    { name: 'مساعدات طبية', value: 145, color: '#ef4444' },
    { name: 'دعم تعليمي', value: 89, color: '#3b82f6' },
    { name: 'إعانة زواج', value: 67, color: '#10b981' },
    { name: 'مساعدة طوارئ', value: 41, color: '#f59e0b' },
    { name: 'برامج أخرى', value: 23, color: '#8b5cf6' }
  ];

  const departmentStats = [
    { department: 'تقنية المعلومات', beneficiaries: 45, amount: 125000 },
    { department: 'المحاسبة', beneficiaries: 38, amount: 98000 },
    { department: 'الموارد البشرية', beneficiaries: 32, amount: 87000 },
    { department: 'المبيعات', beneficiaries: 28, amount: 76000 },
    { department: 'التسويق', beneficiaries: 22, amount: 65000 }
  ];

  const getReportTypeBadge = (type: string) => {
    const colors = {
      comprehensive: 'bg-blue-100 text-blue-800',
      medical: 'bg-red-100 text-red-800',
      volunteering: 'bg-green-100 text-green-800',
      financial: 'bg-purple-100 text-purple-800'
    };
    
    const names = {
      comprehensive: 'شامل',
      medical: 'طبي',
      volunteering: 'تطوعي',
      financial: 'مالي'
    };

    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {names[type as keyof typeof names] || type}
      </Badge>
    );
  };

  const GenerateReportForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="reportType">نوع التقرير</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع التقرير" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comprehensive">تقرير شامل</SelectItem>
              <SelectItem value="programs">تقرير البرامج</SelectItem>
              <SelectItem value="employees">تقرير الموظفين</SelectItem>
              <SelectItem value="financial">تقرير مالي</SelectItem>
              <SelectItem value="volunteering">تقرير التطوع</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="period">الفترة الزمنية</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">الشهر الحالي</SelectItem>
              <SelectItem value="last_month">الشهر الماضي</SelectItem>
              <SelectItem value="quarter">الربع الحالي</SelectItem>
              <SelectItem value="year">السنة الحالية</SelectItem>
              <SelectItem value="custom">فترة مخصصة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">تاريخ البداية</Label>
          <Input id="startDate" type="date" />
        </div>
        <div>
          <Label htmlFor="endDate">تاريخ النهاية</Label>
          <Input id="endDate" type="date" />
        </div>
      </div>

      <div>
        <Label>المحتوى المطلوب</Label>
        <div className="mt-2 space-y-2">
          <label className="flex items-center space-x-2 rtl:space-x-reverse">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">الإحصائيات العامة</span>
          </label>
          <label className="flex items-center space-x-2 rtl:space-x-reverse">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">تفاصيل البرامج</span>
          </label>
          <label className="flex items-center space-x-2 rtl:space-x-reverse">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">قائمة المستفيدين</span>
          </label>
          <label className="flex items-center space-x-2 rtl:space-x-reverse">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">التحليل المالي</span>
          </label>
        </div>
      </div>

      <div>
        <Label htmlFor="format">تنسيق التقرير</Label>
        <Select defaultValue="pdf">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="excel">Excel</SelectItem>
            <SelectItem value="word">Word</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
        <Button variant="outline" onClick={() => setShowGenerateReport(false)}>
          إلغاء
        </Button>
        <Button onClick={() => setShowGenerateReport(false)}>
          إنشاء التقرير
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">التقارير والإحصائيات</h2>
          <p className="text-muted-foreground mt-1">
            تقارير شاملة عن الأنشطة والبرامج الاجتماعية
          </p>
        </div>
        <Dialog open={showGenerateReport} onOpenChange={setShowGenerateReport}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <FileText className="h-4 w-4 mr-2" />
              إنشاء تقرير
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إنشاء تقرير جديد</DialogTitle>
            </DialogHeader>
            <GenerateReportForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {reportTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">إجمالي المستفيدين</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">البرامج النشطة</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">₪2.8M</div>
                <div className="text-sm text-muted-foreground">إجمالي المصروف</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-muted-foreground">معدل الموافقة</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>الاتجاهات الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={kpiData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="requests" stroke="#3b82f6" name="الطلبات" />
                      <Line type="monotone" dataKey="approved" stroke="#10b981" name="الموافق عليه" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>توزيع البرامج</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={programDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {programDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Analysis */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>تحليل المستفيدين حسب القسم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">{dept.department}</h4>
                      <p className="text-sm text-muted-foreground">{dept.beneficiaries} مستفيد</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">₪{dept.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">إجمالي المبلغ</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports List Tab */}
        <TabsContent value="programs" className="space-y-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="البحث في التقارير..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              تصفية
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {quickReports.map((report) => (
              <Card key={report.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                        {getReportTypeBadge(report.type)}
                        <Badge className="bg-green-100 text-green-800">جاهز</Badge>
                      </div>
                    </div>
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{report.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{report.generatedDate}</span>
                    </div>
                    <span className="text-muted-foreground">{report.pages} صفحة</span>
                  </div>

                  <div className="flex justify-between space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      معاينة
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      تحميل
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Printer className="h-4 w-4 mr-2" />
                      طباعة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Employee Reports Tab */}
        <TabsContent value="employees" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>تقارير الموظفين المستفيدين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">تقارير مفصلة قريباً</h3>
                <p className="text-muted-foreground mb-4">
                  سيتم إضافة تقارير مفصلة عن الموظفين المستفيدين من البرامج الاجتماعية
                </p>
                <Button>
                  إنشاء تقرير موظفين
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Reports Tab */}
        <TabsContent value="financial" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>التحليل المالي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kpiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="budget" fill="#3b82f6" name="الميزانية المصروفة" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">₪1.2M</div>
                <div className="text-sm text-muted-foreground">الميزانية المتبقية</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">₪2.8M</div>
                <div className="text-sm text-muted-foreground">إجمالي المصروف</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">70%</div>
                <div className="text-sm text-muted-foreground">معدل الاستخدام</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};