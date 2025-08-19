import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import {
  FileText,
  Download,
  Send,
  Calendar,
  Filter,
  Eye,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Home,
  Building2,
  Printer,
  Mail,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';

interface ReportFilter {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  employees: string[];
  departments: string[];
  reportType: string;
  format: string;
  includeCharts: boolean;
  includeSummary: boolean;
  groupBy: string;
}

const AttendanceReports: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilter>({
    dateRange: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end: new Date()
    },
    employees: [],
    departments: [],
    reportType: 'daily-summary',
    format: 'pdf',
    includeCharts: true,
    includeSummary: true,
    groupBy: 'employee'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: 'daily-summary', label: 'تقرير يومي مفصل', icon: Calendar },
    { value: 'monthly-summary', label: 'ملخص شهري', icon: BarChart3 },
    { value: 'punctuality-ranking', label: 'ترتيب الالتزام بالمواعيد', icon: TrendingUp },
    { value: 'absence-analysis', label: 'تحليل الغياب والإجازات', icon: XCircle },
    { value: 'overtime-report', label: 'تقرير العمل الإضافي', icon: Clock },
    { value: 'department-comparison', label: 'مقارنة الأقسام', icon: Building2 },
    { value: 'remote-work-analysis', label: 'تحليل العمل عن بعد', icon: Home },
    { value: 'violations-report', label: 'تقرير المخالفات', icon: AlertTriangle }
  ];

  const exportFormats = [
    { value: 'pdf', label: 'PDF', icon: FileText },
    { value: 'excel', label: 'Excel', icon: FileSpreadsheet },
    { value: 'csv', label: 'CSV', icon: FileText },
    { value: 'png', label: 'صورة PNG', icon: FileImage }
  ];

  const employees = [
    { id: 'EMP001', name: 'أحمد محمد العلي', department: 'تقنية المعلومات' },
    { id: 'EMP002', name: 'فاطمة عبدالله', department: 'الموارد البشرية' },
    { id: 'EMP003', name: 'محمد خالد السالم', department: 'المبيعات' },
    { id: 'EMP004', name: 'نورا عبدالرحمن', department: 'التسويق' },
    { id: 'EMP005', name: 'سارة أحمد المطيري', department: 'المالية' }
  ];

  const departments = [
    'تقنية المعلومات',
    'الموارد البشرية',
    'المبيعات',
    'التسويق',
    'المالية',
    'خدمة العملاء',
    'العمليات'
  ];

  // Sample generated reports
  const recentReports = [
    {
      id: 1,
      name: 'تقرير الحضور الشهري - يناير 2024',
      type: 'monthly-summary',
      format: 'pdf',
      createdAt: '2024-01-31T14:30:00',
      size: '2.5 MB',
      status: 'completed'
    },
    {
      id: 2,
      name: 'ترتيب الالتزام بالمواعيد - الأسبوع الأول',
      type: 'punctuality-ranking',
      format: 'excel',
      createdAt: '2024-01-28T09:15:00',
      size: '1.8 MB',
      status: 'completed'
    },
    {
      id: 3,
      name: 'تحليل الغياب - قسم تقنية المعلومات',
      type: 'absence-analysis',
      format: 'pdf',
      createdAt: '2024-01-25T11:20:00',
      size: '3.1 MB',
      status: 'completed'
    },
    {
      id: 4,
      name: 'تقرير العمل الإضافي - يناير',
      type: 'overtime-report',
      format: 'csv',
      createdAt: '2024-01-24T16:45:00',
      size: '856 KB',
      status: 'completed'
    }
  ];

  // Sample report preview data
  const reportPreview = {
    summary: {
      totalEmployees: 156,
      totalWorkingDays: 22,
      totalPresentDays: 3289,
      totalAbsentDays: 143,
      attendanceRate: 95.8,
      punctualityRate: 89.2,
      avgWorkingHours: 8.2,
      totalOvertimeHours: 245.5
    },
    topStats: [
      { label: 'أعلى معدل حضور', value: '98.5%', employee: 'فاطمة عبدالله' },
      { label: 'أعلى عدد ساعات عمل', value: '185ساعة', employee: 'أحمد العلي' },
      { label: 'أقل تأخير', value: '2 مرة', employee: 'سارة المطيري' },
      { label: 'أكثر عمل إضافي', value: '25ساعة', employee: 'محمد السالم' }
    ],
    departmentRanking: [
      { department: 'المالية', rate: 97.2, employees: 14 },
      { department: 'الموارد البشرية', rate: 96.8, employees: 16 },
      { department: 'التسويق', rate: 95.5, employees: 20 },
      { department: 'تقنية المعلومات', rate: 94.1, employees: 32 },
      { department: 'المبيعات', rate: 93.7, employees: 28 }
    ]
  };

  const handleGenerateReport = async () => {
    if (!filters.dateRange.start || !filters.dateRange.end) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى تحديد فترة زمنية للتقرير",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "تم إنشاء التقرير بنجاح",
        description: "سيتم تنزيل التقرير تلقائياً خلال ثوانٍ"
      });
    }, 3000);
  };

  const handleScheduleReport = () => {
    toast({
      title: "تم جدولة التقرير",
      description: "سيتم إرسال التقرير تلقائياً حسب الجدولة المحددة"
    });
  };

  const getReportIcon = (type: string) => {
    const reportType = reportTypes.find(rt => rt.value === type);
    const IconComponent = reportType?.icon || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  const getFormatIcon = (format: string) => {
    const formatType = exportFormats.find(ef => ef.value === format);
    const IconComponent = formatType?.icon || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#009F87]" />
            التقارير والتصدير - نظام الحضور والانصراف
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-[#009F87]" />
                إعدادات التقرير
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Report Type */}
              <div className="space-y-2">
                <Label>نوع التقرير</Label>
                <Select 
                  value={filters.reportType} 
                  onValueChange={(value) => setFilters({ ...filters, reportType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>من تاريخ</Label>
                <Calendar
                  mode="single"
                  selected={filters.dateRange.start || undefined}
                  onSelect={(date) => setFilters({ 
                    ...filters, 
                    dateRange: { ...filters.dateRange, start: date || null } 
                  })}
                />
                </div>
                <div className="space-y-2">
                  <Label>إلى تاريخ</Label>
                <Calendar
                  mode="single"
                  selected={filters.dateRange.end || undefined}
                  onSelect={(date) => setFilters({ 
                    ...filters, 
                    dateRange: { ...filters.dateRange, end: date || null } 
                  })}
                />
                </div>
              </div>

              {/* Departments Filter */}
              <div className="space-y-2">
                <Label>الأقسام</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {departments.map(dept => (
                    <label key={dept} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.departments.includes(dept)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters({ 
                              ...filters, 
                              departments: [...filters.departments, dept] 
                            });
                          } else {
                            setFilters({ 
                              ...filters, 
                              departments: filters.departments.filter(d => d !== dept) 
                            });
                          }
                        }}
                      />
                      <span className="text-sm">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Export Format */}
              <div className="space-y-2">
                <Label>تنسيق التصدير</Label>
                <Select 
                  value={filters.format} 
                  onValueChange={(value) => setFilters({ ...filters, format: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exportFormats.map(format => (
                      <SelectItem key={format.value} value={format.value}>
                        <div className="flex items-center gap-2">
                          <format.icon className="h-4 w-4" />
                          {format.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>تضمين الرسوم البيانية</Label>
                  <Checkbox
                    checked={filters.includeCharts}
                    onCheckedChange={(checked) => setFilters({ ...filters, includeCharts: !!checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>تضمين الملخص التنفيذي</Label>
                  <Checkbox
                    checked={filters.includeSummary}
                    onCheckedChange={(checked) => setFilters({ ...filters, includeSummary: !!checked })}
                  />
                </div>
              </div>

              {/* Group By */}
              <div className="space-y-2">
                <Label>تجميع البيانات حسب</Label>
                <Select 
                  value={filters.groupBy} 
                  onValueChange={(value) => setFilters({ ...filters, groupBy: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">الموظف</SelectItem>
                    <SelectItem value="department">القسم</SelectItem>
                    <SelectItem value="date">التاريخ</SelectItem>
                    <SelectItem value="shift">نوع الدوام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <Button 
                  onClick={handleGenerateReport} 
                  disabled={isGenerating}
                  className="w-full bg-[#009F87] hover:bg-[#008072] text-white"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 ml-2" />
                      إنشاء وتنزيل التقرير
                    </>
                  )}
                </Button>

                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 ml-2" />
                  معاينة التقرير
                </Button>

                <Button variant="outline" onClick={handleScheduleReport} className="w-full">
                  <Send className="h-4 w-4 ml-2" />
                  جدولة التقرير
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview">معاينة التقرير</TabsTrigger>
              <TabsTrigger value="recent">التقارير السابقة</TabsTrigger>
              <TabsTrigger value="scheduled">التقارير المجدولة</TabsTrigger>
            </TabsList>

            {/* Report Preview */}
            <TabsContent value="preview" className="space-y-4">
              <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-[#009F87]" />
                    معاينة التقرير المحدد
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-[#009F87]">{reportPreview.summary.totalEmployees}</div>
                      <div className="text-sm text-gray-600">إجمالي الموظفين</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{reportPreview.summary.attendanceRate}%</div>
                      <div className="text-sm text-gray-600">معدل الحضور</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{reportPreview.summary.punctualityRate}%</div>
                      <div className="text-sm text-gray-600">معدل الالتزام</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{reportPreview.summary.avgWorkingHours}</div>
                      <div className="text-sm text-gray-600">متوسط ساعات العمل</div>
                    </div>
                  </div>

                  {/* Top Performers */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">أبرز الإحصائيات</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reportPreview.topStats.map((stat, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{stat.label}</div>
                            <div className="text-sm text-gray-600">{stat.employee}</div>
                          </div>
                          <div className="text-lg font-bold text-[#009F87]">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Department Ranking */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">ترتيب الأقسام</h3>
                    <div className="space-y-3">
                      {reportPreview.departmentRanking.map((dept, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-[#009F87] text-white flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{dept.department}</div>
                            <div className="text-sm text-gray-600">{dept.employees} موظف</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-[#009F87]">{dept.rate}%</div>
                            <Progress value={dept.rate} className="w-20 h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Reports */}
            <TabsContent value="recent" className="space-y-4">
              <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#009F87]" />
                    التقارير المنشأة مؤخراً
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentReports.map(report => (
                      <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getReportIcon(report.type)}
                          </div>
                          <div>
                            <div className="font-medium">{report.name}</div>
                            <div className="text-sm text-gray-600">
                              {new Date(report.createdAt).toLocaleDateString('ar-SA')} - {report.size}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle2 className="h-3 w-3 ml-1" />
                            مكتمل
                          </Badge>
                          
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scheduled Reports */}
            <TabsContent value="scheduled" className="space-y-4">
              <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#009F87]" />
                      التقارير المجدولة
                    </div>
                    <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                      <Calendar className="h-4 w-4 ml-2" />
                      جدولة تقرير جديد
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>لا توجد تقارير مجدولة حالياً</p>
                    <p className="text-sm mt-2">يمكنك جدولة تقارير تلقائية لترسل إليك دورياً</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;