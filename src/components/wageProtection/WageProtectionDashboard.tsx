import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign,
  Calendar as CalendarIcon,
  FileText,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Building,
  CreditCard,
  Percent
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface WageProtectionReport {
  id: string;
  title: string;
  type: 'monthly' | 'quarterly' | 'annual' | 'compliance';
  period: string;
  summary: {
    totalEmployees: number;
    complianceRate: number;
    totalWages: number;
    onTimeSubmissions: number;
    violations: number;
  };
  details: any[];
  generatedAt: string;
}

const mockReports: WageProtectionReport[] = [
  {
    id: '1',
    title: 'تقرير الامتثال الشهري - يناير 2024',
    type: 'monthly',
    period: '2024-01',
    summary: {
      totalEmployees: 156,
      complianceRate: 95.5,
      totalWages: 1850000,
      onTimeSubmissions: 88,
      violations: 3
    },
    details: [],
    generatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'تقرير ربعي - الربع الأول 2024',
    type: 'quarterly',
    period: 'Q1-2024',
    summary: {
      totalEmployees: 156,
      complianceRate: 92.8,
      totalWages: 5550000,
      onTimeSubmissions: 85,
      violations: 8
    },
    details: [],
    generatedAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const complianceMetrics = {
  currentMonth: {
    rate: 95.5,
    trend: 'up',
    change: 2.3
  },
  avgProcessingTime: 2.5,
  dataAccuracy: 98.2,
  employeeCoverage: 100,
  onTimeSubmissions: 88
};

const wageAnalytics = {
  totalWages: 1850000,
  avgWage: 11858,
  wageGrowth: 5.2,
  highestDepartment: 'تقنية المعلومات',
  lowestDepartment: 'الخدمات العامة'
};

export const WageProtectionDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01');
  const [selectedReport, setSelectedReport] = useState<WageProtectionReport | null>(null);
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const generateCustomReport = () => {
    // Generate custom report logic
    console.log('Generating custom report...');
  };

  const downloadReport = (report: WageProtectionReport) => {
    // Download report logic
    console.log('Downloading report:', report.title);
  };

  if (selectedReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSelectedReport(null)}
          >
            العودة للتقارير
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => downloadReport(selectedReport)}
            >
              <Download className="h-4 w-4 mr-2" />
              تحميل
            </Button>
          </div>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              {selectedReport.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              تم إنشاؤه في {format(new Date(selectedReport.generatedAt), 'PPP', { locale: ar })}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{selectedReport.summary.totalEmployees}</div>
                  <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedReport.summary.complianceRate}%</div>
                  <div className="text-sm text-muted-foreground">معدل الامتثال</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedReport.summary.totalWages.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">إجمالي الرواتب</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{selectedReport.summary.onTimeSubmissions}%</div>
                  <div className="text-sm text-muted-foreground">الرفع في الوقت</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{selectedReport.summary.violations}</div>
                  <div className="text-sm text-muted-foreground">المخالفات</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Compliance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">تطور معدل الامتثال</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">{selectedReport.summary.complianceRate}%</div>
                      <div className="text-sm text-muted-foreground">معدل الامتثال الحالي</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">+2.3% من الشهر السابق</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Wage Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">توزيع الرواتب</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-center space-y-4">
                      <div className="text-2xl font-bold text-blue-600">{selectedReport.summary.totalWages.toLocaleString()} ريال</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm">متوسط الراتب</span>
                          <span className="font-medium">{Math.round(selectedReport.summary.totalWages / selectedReport.summary.totalEmployees).toLocaleString()} ريال</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm">أعلى قسم</span>
                          <span className="font-medium">تقنية المعلومات</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            لوحة التحكم والتقارير الشاملة
          </h2>
          <p className="text-muted-foreground">تحليلات متقدمة ومراقبة شاملة لحماية الأجور</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير البيانات
          </Button>
          <Button onClick={generateCustomReport}>
            <FileText className="h-4 w-4 mr-2" />
            تقرير مخصص
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">معدل الامتثال</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-green-800">{complianceMetrics.currentMonth.rate}%</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600">+{complianceMetrics.currentMonth.change}%</span>
                  </div>
                </div>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">إجمالي الرواتب</p>
                <p className="text-2xl font-bold text-blue-800">{wageAnalytics.totalWages.toLocaleString()}</p>
                <p className="text-xs text-blue-600">ريال سعودي</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">متوسط وقت المعالجة</p>
                <p className="text-2xl font-bold text-purple-800">{complianceMetrics.avgProcessingTime}</p>
                <p className="text-xs text-purple-600">يوم</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">دقة البيانات</p>
                <p className="text-2xl font-bold text-orange-800">{complianceMetrics.dataAccuracy}%</p>
                <p className="text-xs text-orange-600">معدل الدقة</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Report Generator */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            مولد التقارير المخصصة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-2 block">نوع التقرير</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع التقرير" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliance">تقرير الامتثال</SelectItem>
                  <SelectItem value="wages">تحليل الرواتب</SelectItem>
                  <SelectItem value="violations">تقرير المخالفات</SelectItem>
                  <SelectItem value="trends">تحليل الاتجاهات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">من تاريخ</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {dateFrom ? format(dateFrom, 'PPP', { locale: ar }) : 'اختر التاريخ'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">إلى تاريخ</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {dateTo ? format(dateTo, 'PPP', { locale: ar }) : 'اختر التاريخ'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button onClick={generateCustomReport} className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                إنشاء التقرير
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-600" />
              اتجاهات الامتثال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold text-blue-600">95.5%</div>
                <div className="text-sm text-muted-foreground">معدل الامتثال الحالي</div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">98%</div>
                    <div>ديسمبر</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">95%</div>
                    <div>يناير</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-orange-600">92%</div>
                    <div>فبراير</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              توزيع المخالفات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-muted-foreground">إجمالي المخالفات</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <span>تأخير في الرفع</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>أخطاء في البيانات</span>
                    <span className="font-semibold text-orange-600">1</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>مشاكل تقنية</span>
                    <span className="font-semibold text-gray-600">0</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports Section */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>التقارير المحفوظة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(report.generatedAt), 'PPP', { locale: ar })} • 
                      معدل الامتثال: {report.summary.complianceRate}% • 
                      {report.summary.totalEmployees} موظف
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={report.type === 'monthly' ? 'default' : 'secondary'}>
                    {report.type === 'monthly' ? 'شهري' : 
                     report.type === 'quarterly' ? 'ربعي' : 
                     report.type === 'annual' ? 'سنوي' : 'امتثال'}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => downloadReport(report)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg">مؤشرات الأداء</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">الرفع في الوقت المحدد</span>
                <span className="text-sm font-medium">{complianceMetrics.onTimeSubmissions}%</span>
              </div>
              <Progress value={complianceMetrics.onTimeSubmissions} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">تغطية الموظفين</span>
                <span className="text-sm font-medium">{complianceMetrics.employeeCoverage}%</span>
              </div>
              <Progress value={complianceMetrics.employeeCoverage} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">دقة البيانات</span>
                <span className="text-sm font-medium">{complianceMetrics.dataAccuracy}%</span>
              </div>
              <Progress value={complianceMetrics.dataAccuracy} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg">تحليل الرواتب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">متوسط الراتب</span>
              <span className="font-medium">{wageAnalytics.avgWage.toLocaleString()} ريال</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">نمو الرواتب</span>
              <span className="font-medium text-green-600">+{wageAnalytics.wageGrowth}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">أعلى قسم</span>
              <span className="font-medium">{wageAnalytics.highestDepartment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">أقل قسم</span>
              <span className="font-medium">{wageAnalytics.lowestDepartment}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg">التنبيهات والتوصيات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">مراجعة عاجلة مطلوبة</p>
                <p className="text-xs text-muted-foreground">3 موظفين بحاجة لتحديث البيانات</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">تحسن في الأداء</p>
                <p className="text-xs text-muted-foreground">معدل الامتثال ارتفع بنسبة 2.3%</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">موعد الرفع القادم</p>
                <p className="text-xs text-muted-foreground">25 فبراير 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};