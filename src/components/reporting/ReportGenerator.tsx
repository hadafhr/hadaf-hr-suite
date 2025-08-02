import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { DatabaseService } from '@/services/database';
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Loader2,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface ReportConfig {
  type: 'attendance' | 'payroll' | 'employees' | 'performance' | 'leaves' | 'compliance';
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface ReportData {
  id: string;
  type: string;
  title: string;
  data: any[];
  summary: any;
  generatedAt: string;
  generatedBy: string;
  filters?: any;
}

const reportConfigs: ReportConfig[] = [
  {
    type: 'attendance',
    title: 'تقرير الحضور والانصراف',
    description: 'تقرير شامل عن حضور الموظفين والغياب والتأخير',
    icon: Clock,
    color: 'text-blue-600'
  },
  {
    type: 'payroll',
    title: 'تقرير الرواتب والأجور',
    description: 'تقرير مفصل عن الرواتب والبدلات والاستقطاعات',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    type: 'employees',
    title: 'تقرير بيانات الموظفين',
    description: 'تقرير شامل عن بيانات الموظفين وحالاتهم',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    type: 'performance',
    title: 'تقرير الأداء والتقييمات',
    description: 'تقرير عن أداء الموظفين والتقييمات السنوية',
    icon: TrendingUp,
    color: 'text-orange-600'
  },
  {
    type: 'leaves',
    title: 'تقرير الإجازات والطلبات',
    description: 'تقرير عن الإجازات المستخدمة والمعلقة',
    icon: CalendarIcon,
    color: 'text-indigo-600'
  },
  {
    type: 'compliance',
    title: 'تقرير الامتثال والالتزام',
    description: 'تقرير عن مستوى الامتثال للأنظمة واللوائح',
    icon: BarChart3,
    color: 'text-red-600'
  }
];

// Mock departments data
const mockDepartments = [
  { id: '1', name: 'تقنية المعلومات' },
  { id: '2', name: 'الموارد البشرية' },
  { id: '3', name: 'المبيعات' },
  { id: '4', name: 'التسويق' },
  { id: '5', name: 'المالية' }
];

export const ReportGenerator: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [department, setDepartment] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [generatedReports, setGeneratedReports] = useState<ReportData[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadGeneratedReports();
  }, []);

  const loadGeneratedReports = () => {
    // Mock generated reports data
    const mockReports: ReportData[] = [
      {
        id: '1',
        type: 'attendance',
        title: 'تقرير الحضور والانصراف',
        data: [],
        summary: {
          totalRecords: 245,
          presentDays: 220,
          absentDays: 25,
          attendanceRate: '89.8%'
        },
        generatedAt: new Date().toISOString(),
        generatedBy: 'المدير العام',
        filters: { dateFrom: '2024-01-01', dateTo: '2024-01-31' }
      },
      {
        id: '2',
        type: 'payroll',
        title: 'تقرير الرواتب والأجور',
        data: [],
        summary: {
          totalEmployees: 156,
          totalGrossSalary: 1850000,
          totalNetSalary: 1650000,
          averageSalary: 10577
        },
        generatedAt: new Date(Date.now() - 86400000).toISOString(),
        generatedBy: 'مدير الموارد البشرية'
      },
      {
        id: '3',
        type: 'employees',
        title: 'تقرير بيانات الموظفين',
        data: [],
        summary: {
          totalEmployees: 156,
          activeEmployees: 145,
          inactiveEmployees: 11,
          departmentCount: 5
        },
        generatedAt: new Date(Date.now() - 172800000).toISOString(),
        generatedBy: 'مدير الموارد البشرية'
      }
    ];
    setGeneratedReports(mockReports);
  };

  const generateReport = async () => {
    if (!selectedReportType) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار نوع التقرير",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const reportConfig = reportConfigs.find(r => r.type === selectedReportType);
      const filters = {
        dateFrom: dateFrom?.toISOString(),
        dateTo: dateTo?.toISOString(),
        department: department !== 'all' ? department : null
      };

      // Generate report using DatabaseService
      const reportResult = await DatabaseService.generateReport(
        selectedReportType as 'employees' | 'attendance' | 'payroll' | 'compliance',
        filters
      );

      const newReport: ReportData = {
        id: Date.now().toString(),
        type: selectedReportType,
        title: reportConfig?.title || 'تقرير',
        data: reportResult.data,
        summary: calculateSummary(selectedReportType, reportResult.data),
        generatedAt: reportResult.generatedAt,
        generatedBy: 'المستخدم الحالي',
        filters
      };

      // Add to generated reports
      setGeneratedReports(prev => [newReport, ...prev]);

      toast({
        title: "تم إنشاء التقرير بنجاح",
        description: `تم إنشاء ${reportConfig?.title} وحفظه في النظام`,
      });

      // Reset form
      setSelectedReportType('');
      setDateFrom(undefined);
      setDateTo(undefined);
      setDepartment('all');

    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "خطأ في إنشاء التقرير",
        description: "حدث خطأ أثناء إنشاء التقرير، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (type: string, data: any[]) => {
    switch (type) {
      case 'attendance':
        return {
          totalRecords: data.length,
          presentDays: data.filter(r => r.status === 'present').length,
          absentDays: data.filter(r => r.status === 'absent').length,
          attendanceRate: data.length > 0 ? ((data.filter(r => r.status === 'present').length / data.length) * 100).toFixed(1) + '%' : '0%'
        };
      case 'payroll':
        return {
          totalEmployees: data.length,
          totalGrossSalary: data.reduce((sum, r) => sum + (r.baseSalary || 0), 0),
          totalNetSalary: data.reduce((sum, r) => sum + (r.netSalary || 0), 0),
          averageSalary: data.length > 0 ? Math.round(data.reduce((sum, r) => sum + (r.netSalary || 0), 0) / data.length) : 0
        };
      case 'employees':
        return {
          totalEmployees: data.length,
          activeEmployees: data.filter(e => e.status === 'على رأس العمل').length,
          inactiveEmployees: data.filter(e => e.status !== 'على رأس العمل').length,
          departmentCount: new Set(data.map(e => e.companyId)).size
        };
      case 'performance':
        return {
          totalReviews: data.length,
          averageScore: data.length > 0 ? (data.reduce((sum, r) => sum + (r.percentage || 0), 0) / data.length).toFixed(1) : 0,
          excellentPerformers: data.filter(r => r.percentage >= 90).length,
          goodPerformers: data.filter(r => r.percentage >= 75 && r.percentage < 90).length
        };
      case 'leaves':
        return {
          totalRequests: data.length,
          approvedRequests: data.filter(r => r.status === 'approved').length,
          pendingRequests: data.filter(r => r.status === 'pending').length,
          rejectedRequests: data.filter(r => r.status === 'rejected').length
        };
      default:
        return {};
    }
  };

  const downloadReport = (report: ReportData) => {
    try {
      // Create CSV content
      const csvData = [
        ['نوع التقرير', report.type],
        ['العنوان', report.title],
        ['تاريخ الإنشاء', format(new Date(report.generatedAt), 'PPP', { locale: ar })],
        ['أنشأه', report.generatedBy],
        [''],
        ['ملخص التقرير:'],
        ...Object.entries(report.summary).map(([key, value]) => [key, value.toString()]),
        [''],
        ['البيانات التفصيلية:'],
        ...report.data.map((item, index) => [`العنصر ${index + 1}`, JSON.stringify(item)])
      ];

      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${report.title}_${format(new Date(report.generatedAt), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "تم تحميل التقرير",
        description: "تم تحميل التقرير بصيغة CSV بنجاح",
      });
    } catch (error) {
      console.error('Error downloading report:', error);
      toast({
        title: "خطأ في التحميل",
        description: "حدث خطأ أثناء تحميل التقرير",
        variant: "destructive"
      });
    }
  };

  const viewReport = (report: ReportData) => {
    setSelectedReport(report);
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
            <CardTitle>{selectedReport.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              تم إنشاؤه في {format(new Date(selectedReport.generatedAt), 'PPP', { locale: ar })} بواسطة {selectedReport.generatedBy}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(selectedReport.summary).map(([key, value]) => (
                <Card key={key}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{value.toString()}</div>
                    <div className="text-sm text-muted-foreground">{key}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">البيانات التفصيلية:</h4>
              <div className="text-sm text-muted-foreground">
                {selectedReport.data.length > 0 ? (
                  <p>يحتوي التقرير على {selectedReport.data.length} عنصر من البيانات. يمكنك تحميل التقرير للاطلاع على التفاصيل الكاملة.</p>
                ) : (
                  <p>لا توجد بيانات تفصيلية متاحة لهذا التقرير.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Report Generator Form */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            مولد التقارير الشامل
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">نوع التقرير</label>
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع التقرير" />
                </SelectTrigger>
                <SelectContent>
                  {reportConfigs.map((config) => (
                    <SelectItem key={config.type} value={config.type}>
                      <div className="flex items-center gap-2">
                        <config.icon className={`h-4 w-4 ${config.color}`} />
                        {config.title}
                      </div>
                    </SelectItem>
                  ))}
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

            <div>
              <label className="text-sm font-medium mb-2 block">القسم</label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateReport} 
            disabled={loading}
            className="btn-primary w-full md:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                جاري إنشاء التقرير...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                إنشاء التقرير
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportConfigs.map((config) => (
          <Card 
            key={config.type} 
            className={`dashboard-card cursor-pointer transition-all hover:shadow-lg ${
              selectedReportType === config.type ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedReportType(config.type)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-base">
                <config.icon className={`h-6 w-6 ${config.color}`} />
                {config.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generated Reports */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>التقارير المُولدة مؤخراً</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {generatedReports.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                لا توجد تقارير مُولدة بعد
              </p>
            ) : (
              generatedReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        تم إنشاؤه في {format(new Date(report.generatedAt), 'PPP', { locale: ar })} بواسطة {report.generatedBy}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{report.type}</Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => viewReport(report)}
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};