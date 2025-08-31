import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  BarChart3,
  PieChart,
  TrendingUp,
  Filter,
  Search,
  Plus,
  DollarSign,
  Users,
  Building
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

interface FinancialReport {
  id: string;
  title: string;
  type: 'monthly' | 'annual' | 'quarterly' | 'custom';
  period: string;
  totalAmount: number;
  employeesCount: number;
  department?: string;
  generatedBy: string;
  generatedAt: string;
  status: 'generated' | 'reviewed' | 'approved';
}

export const FinancialReportsManager: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [reportType, setReportType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [reports, setReports] = useState<FinancialReport[]>([
    {
      id: '1',
      title: 'تقرير رواتب يناير 2024',
      type: 'monthly',
      period: 'يناير 2024',
      totalAmount: 450000,
      employeesCount: 150,
      department: 'جميع الأقسام',
      generatedBy: 'أحمد محمد',
      generatedAt: '2024-01-31',
      status: 'approved'
    },
    {
      id: '2',
      title: 'تقرير التعويضات السنوي 2023',
      type: 'annual',
      period: '2023',
      totalAmount: 5400000,
      employeesCount: 152,
      department: 'جميع الأقسام',
      generatedBy: 'سارة أحمد',
      generatedAt: '2024-01-15',
      status: 'reviewed'
    },
    {
      id: '3',
      title: 'تقرير مكافآت الربع الأول',
      type: 'quarterly',
      period: 'الربع الأول 2024',
      totalAmount: 85000,
      employeesCount: 45,
      department: 'المبيعات',
      generatedBy: 'محمد علي',
      generatedAt: '2024-03-31',
      status: 'generated'
    }
  ]);

  const statusColors = {
    generated: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    generated: 'تم الإنشاء',
    reviewed: 'قيد المراجعة',
    approved: 'معتمد'
  };

  const reportTypeLabels = {
    monthly: 'شهري',
    quarterly: 'ربع سنوي',
    annual: 'سنوي',
    custom: 'مخصص'
  };

  const handleGenerateReport = () => {
    toast({
      title: "جاري الإنشاء",
      description: "سيتم إنشاء التقرير وإشعارك عند الانتهاء"
    });
  };

  const handleExportReport = (reportId: string) => {
    toast({
      title: "جاري التصدير",
      description: "سيتم تحميل التقرير خلال ثوانٍ"
    });
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.period.includes(searchTerm);
    const matchesType = reportType === 'all' || report.type === reportType;
    return matchesSearch && matchesType;
  });

  const stats = {
    totalReports: reports.length,
    approvedReports: reports.filter(r => r.status === 'approved').length,
    totalAmount: reports.reduce((sum, report) => sum + report.totalAmount, 0),
    averageAmount: Math.round(reports.reduce((sum, report) => sum + report.totalAmount, 0) / reports.length)
  };

  const quickReportTemplates = [
    {
      title: 'تقرير الرواتب الشهري',
      description: 'تقرير شامل لرواتب الموظفين للشهر الحالي',
      icon: CalendarIcon,
      color: 'text-blue-600'
    },
    {
      title: 'تقرير المكافآت والحوافز',
      description: 'ملخص المكافآت والحوافز المدفوعة',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'تقرير التكاليف حسب القسم',
      description: 'تحليل تكاليف الرواتب موزعة على الأقسام',
      icon: Building,
      color: 'text-purple-600'
    },
    {
      title: 'تقرير الاستقطاعات',
      description: 'تفاصيل الاستقطاعات والضرائب',
      icon: PieChart,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-green-900">التقارير المالية</CardTitle>
              <p className="text-green-700 mt-2">نظام شامل لإنشاء وإدارة التقارير المالية والرواتب</p>
            </div>
            <FileText className="h-12 w-12 text-green-600" />
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي التقارير</p>
                <p className="text-2xl font-bold">{stats.totalReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">التقارير المعتمدة</p>
                <p className="text-2xl font-bold">{stats.approvedReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المبالغ</p>
                <p className="text-2xl font-bold">{stats.totalAmount.toLocaleString()} ر.س</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">متوسط المبلغ</p>
                <p className="text-2xl font-bold">{stats.averageAmount.toLocaleString()} ر.س</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="space-y-6">
            {/* Quick Report Generation */}
            <Card>
              <CardHeader>
                <CardTitle>إنشاء تقرير سريع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickReportTemplates.map((template, index) => {
                    const Icon = template.icon;
                    return (
                      <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                          <Icon className={`h-12 w-12 mx-auto mb-3 ${template.color}`} />
                          <h3 className="font-semibold mb-2">{template.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                          <Button size="sm" onClick={handleGenerateReport} className="w-full">
                            إنشاء التقرير
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>التقارير الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-sm text-muted-foreground">{report.period}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge className={statusColors[report.status]}>
                          {statusLabels[report.status]}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => handleExportReport(report.id)}>
                          <Download className="h-4 w-4 ml-2" />
                          تحميل
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>جميع التقارير المالية</CardTitle>
                <Button onClick={handleGenerateReport}>
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء تقرير جديد
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse mt-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث في التقارير..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="نوع التقرير" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="monthly">شهري</SelectItem>
                    <SelectItem value="quarterly">ربع سنوي</SelectItem>
                    <SelectItem value="annual">سنوي</SelectItem>
                    <SelectItem value="custom">مخصص</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">عنوان التقرير</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">الفترة</TableHead>
                    <TableHead className="text-right">إجمالي المبلغ</TableHead>
                    <TableHead className="text-right">عدد الموظفين</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{reportTypeLabels[report.type]}</Badge>
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{report.totalAmount.toLocaleString()} ر.س</TableCell>
                      <TableCell>{report.employeesCount}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[report.status]}>
                          {statusLabels[report.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.generatedAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button variant="outline" size="sm">
                            عرض
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleExportReport(report.id)}>
                            تحميل
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>قوالب التقارير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickReportTemplates.map((template, index) => {
                  const Icon = template.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <Icon className={`h-16 w-16 mx-auto mb-4 ${template.color}`} />
                          <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                          <div className="space-y-2">
                            <Button className="w-full" onClick={handleGenerateReport}>
                              استخدام القالب
                            </Button>
                            <Button variant="outline" className="w-full">
                              تخصيص القالب
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات التقارير المالية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>تردد التقارير التلقائية</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                      <SelectItem value="monthly">شهري</SelectItem>
                      <SelectItem value="quarterly">ربع سنوي</SelectItem>
                      <SelectItem value="annual">سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>العملة الافتراضية</Label>
                  <Select defaultValue="SAR">
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">ريال سعودي (ر.س)</SelectItem>
                      <SelectItem value="USD">دولار أمريكي ($)</SelectItem>
                      <SelectItem value="EUR">يورو (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>تنسيق التاريخ</Label>
                  <Select defaultValue="DD/MM/YYYY">
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  حفظ الإعدادات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};