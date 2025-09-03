import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText,
  Download,
  Eye,
  Calendar,
  Users,
  Building,
  BarChart3,
  PieChart,
  TrendingUp,
  Filter,
  Search,
  Printer,
  Mail,
  RefreshCw
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const TeamReports: React.FC = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState('employee-list');
  const [dateRange, setDateRange] = useState('current-month');
  const [department, setDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for reports
  const headcountData = [
    { month: 'يناير', employees: 120, hired: 8, left: 3 },
    { month: 'فبراير', employees: 125, hired: 7, left: 2 },
    { month: 'مارس', employees: 128, hired: 5, left: 2 },
    { month: 'أبريل', employees: 130, hired: 4, left: 2 },
    { month: 'مايو', employees: 127, hired: 2, left: 5 },
    { month: 'يونيو', employees: 132, hired: 8, left: 3 }
  ];

  const departmentDistribution = [
    { name: 'تقنية المعلومات', value: 35, color: '#3b82f6' },
    { name: 'الموارد البشرية', value: 20, color: '#10b981' },
    { name: 'المالية', value: 15, color: '#f59e0b' },
    { name: 'التسويق', value: 18, color: '#8b5cf6' },
    { name: 'العمليات', value: 12, color: '#ef4444' }
  ];

  const reportTypes = [
    {
      id: 'employee-list',
      name: 'قائمة الموظفين',
      description: 'قائمة شاملة بجميع الموظفين مع البيانات الأساسية',
      icon: Users
    },
    {
      id: 'headcount-analysis',
      name: 'تحليل القوى العاملة',
      description: 'تحليل عدد الموظفين والتوزيع حسب الأقسام والمناصب',
      icon: BarChart3
    },
    {
      id: 'turnover-report',
      name: 'تقرير معدل الدوران',
      description: 'معدل دوران الموظفين والأسباب والتوجهات',
      icon: TrendingUp
    },
    {
      id: 'probation-report',
      name: 'تقرير فترة التجربة',
      description: 'الموظفين في فترة التجربة وحالة التقييم',
      icon: Calendar
    },
    {
      id: 'performance-summary',
      name: 'ملخص الأداء',
      description: 'ملخص أداء الفرق والموظفين حسب المعايير',
      icon: PieChart
    },
    {
      id: 'nationality-report',
      name: 'تقرير الجنسيات',
      description: 'توزيع الموظفين حسب الجنسية ومتطلبات السعودة',
      icon: Building
    }
  ];

  const sampleEmployees = [
    { id: 'EMP-001', name: 'أحمد محمد السعيد', department: 'IT', position: 'مطور برمجيات أول', status: 'نشط', hireDate: '2022-01-15' },
    { id: 'EMP-002', name: 'فاطمة عبدالله النور', department: 'Finance', position: 'محاسبة رئيسية', status: 'نشط', hireDate: '2021-03-10' },
    { id: 'EMP-003', name: 'محمد علي الأحمد', department: 'HR', position: 'أخصائي موارد بشرية', status: 'نشط', hireDate: '2023-06-20' },
    { id: 'EMP-004', name: 'نورا سالم المطيري', department: 'Marketing', position: 'منسقة تسويق', status: 'إجازة', hireDate: '2022-09-05' }
  ];

  const handleExportReport = (format: 'pdf' | 'excel') => {
    toast({
      title: "تم تصدير التقرير بنجاح",
      description: `تم تصدير التقرير بصيغة ${format.toUpperCase()}`,
    });
  };

  const handlePrintReport = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const handleEmailReport = () => {
    toast({
      title: "تم إرسال التقرير",
      description: "تم إرسال التقرير عبر البريد الإلكتروني",
    });
  };

  const renderReportFilters = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          فلاتر التقرير
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>نوع التقرير</Label>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((report) => (
                  <SelectItem key={report.id} value={report.id}>
                    {report.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>الفترة الزمنية</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">الشهر الحالي</SelectItem>
                <SelectItem value="last-month">الشهر الماضي</SelectItem>
                <SelectItem value="current-quarter">الربع الحالي</SelectItem>
                <SelectItem value="current-year">السنة الحالية</SelectItem>
                <SelectItem value="custom">فترة مخصصة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>القسم</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الأقسام</SelectItem>
                <SelectItem value="IT">تقنية المعلومات</SelectItem>
                <SelectItem value="HR">الموارد البشرية</SelectItem>
                <SelectItem value="Finance">المالية</SelectItem>
                <SelectItem value="Marketing">التسويق</SelectItem>
                <SelectItem value="Operations">العمليات</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>البحث</Label>
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderReportActions = () => (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => handleExportReport('pdf')}>
            <Download className="h-4 w-4 ml-2" />
            تصدير PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport('excel')}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير Excel
          </Button>
          <Button variant="outline" onClick={handlePrintReport}>
            <Printer className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button variant="outline" onClick={handleEmailReport}>
            <Mail className="h-4 w-4 ml-2" />
            إرسال بالبريد
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث البيانات
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderReportPreview = () => {
    const selectedReportData = reportTypes.find(r => r.id === selectedReport);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            معاينة التقرير: {selectedReportData?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedReport === 'employee-list' && renderEmployeeListReport()}
          {selectedReport === 'headcount-analysis' && renderHeadcountAnalysisReport()}
          {selectedReport === 'turnover-report' && renderTurnoverReport()}
          {selectedReport === 'probation-report' && renderProbationReport()}
          {selectedReport === 'performance-summary' && renderPerformanceSummaryReport()}
          {selectedReport === 'nationality-report' && renderNationalityReport()}
        </CardContent>
      </Card>
    );
  };

  const renderEmployeeListReport = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 text-right">رقم الموظف</th>
              <th className="border border-gray-300 p-2 text-right">الاسم</th>
              <th className="border border-gray-300 p-2 text-right">القسم</th>
              <th className="border border-gray-300 p-2 text-right">المنصب</th>
              <th className="border border-gray-300 p-2 text-right">الحالة</th>
              <th className="border border-gray-300 p-2 text-right">تاريخ التوظيف</th>
            </tr>
          </thead>
          <tbody>
            {sampleEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{employee.id}</td>
                <td className="border border-gray-300 p-2">{employee.name}</td>
                <td className="border border-gray-300 p-2">{employee.department}</td>
                <td className="border border-gray-300 p-2">{employee.position}</td>
                <td className="border border-gray-300 p-2">
                  <Badge className={employee.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {employee.status}
                  </Badge>
                </td>
                <td className="border border-gray-300 p-2">{employee.hireDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderHeadcountAnalysisReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">127</p>
            <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">15</p>
            <p className="text-sm text-muted-foreground">موظفين جدد</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">5</p>
            <p className="text-sm text-muted-foreground">مغادرين</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">8</p>
            <p className="text-sm text-muted-foreground">في فترة التجربة</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>تطور عدد الموظفين</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={headcountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="employees" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>توزيع الأقسام</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTurnoverReport = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-red-600">3.2%</p>
            <p className="text-sm text-muted-foreground">معدل الدوران الشهري</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-yellow-600">15.8%</p>
            <p className="text-sm text-muted-foreground">معدل الدوران السنوي</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-blue-600">2.1 سنة</p>
            <p className="text-sm text-muted-foreground">متوسط مدة الخدمة</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">أسباب المغادرة الرئيسية:</h4>
        <ul className="space-y-1 text-sm">
          <li>• فرص وظيفية أفضل (40%)</li>
          <li>• عدم الرضا عن الراتب (25%)</li>
          <li>• ظروف شخصية (20%)</li>
          <li>• عدم الرضا عن بيئة العمل (15%)</li>
        </ul>
      </div>
    </div>
  );

  const renderProbationReport = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 text-right">الموظف</th>
              <th className="border border-gray-300 p-2 text-right">القسم</th>
              <th className="border border-gray-300 p-2 text-right">تاريخ البدء</th>
              <th className="border border-gray-300 p-2 text-right">تاريخ الانتهاء</th>
              <th className="border border-gray-300 p-2 text-right">الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">سارة أحمد المطيري</td>
              <td className="border border-gray-300 p-2">التسويق</td>
              <td className="border border-gray-300 p-2">2024-01-01</td>
              <td className="border border-gray-300 p-2">2024-03-31</td>
              <td className="border border-gray-300 p-2">
                <Badge className="bg-yellow-100 text-yellow-800">جاري التقييم</Badge>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">خالد محمد العمري</td>
              <td className="border border-gray-300 p-2">تقنية المعلومات</td>
              <td className="border border-gray-300 p-2">2024-02-01</td>
              <td className="border border-gray-300 p-2">2024-04-30</td>
              <td className="border border-gray-300 p-2">
                <Badge className="bg-green-100 text-green-800">مُوصى بالتثبيت</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPerformanceSummaryReport = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-600">89%</p>
            <p className="text-sm text-muted-foreground">متوسط الأداء العام</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-blue-600">15</p>
            <p className="text-sm text-muted-foreground">موظفين متميزين</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-yellow-600">8</p>
            <p className="text-sm text-muted-foreground">بحاجة لتحسين</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-purple-600">95%</p>
            <p className="text-sm text-muted-foreground">معدل إكمال الأهداف</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderNationalityReport = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-600">78%</p>
            <p className="text-sm text-muted-foreground">نسبة السعودة</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-blue-600">99</p>
            <p className="text-sm text-muted-foreground">موظفين سعوديين</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-purple-600">28</p>
            <p className="text-sm text-muted-foreground">موظفين غير سعوديين</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">توزيع الجنسيات الأخرى:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div>مصريين: 8</div>
          <div>أردنيين: 5</div>
          <div>سوريين: 4</div>
          <div>لبنانيين: 3</div>
          <div>فلسطينيين: 3</div>
          <div>يمنيين: 2</div>
          <div>هنود: 2</div>
          <div>باكستانيين: 1</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderReportFilters()}
      {renderReportActions()}
      {renderReportPreview()}
    </div>
  );
};

export default TeamReports;