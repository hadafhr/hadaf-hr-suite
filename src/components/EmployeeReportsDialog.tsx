import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDownloadPrint } from '@/hooks/useDownloadPrint';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Award,
  Target,
  CheckCircle
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  status: string;
}

interface EmployeeReportsDialogProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmployeeReportsDialog: React.FC<EmployeeReportsDialogProps> = ({
  employee,
  isOpen,
  onClose
}) => {
  const { downloadFile, printData } = useDownloadPrint();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  if (!employee) return null;

  // بيانات تقارير تجريبية
  const attendanceReport = {
    employeeId: employee.id,
    employeeName: employee.name,
    month: 'نوفمبر 2024',
    totalWorkingDays: 22,
    presentDays: 20,
    absentDays: 2,
    lateDays: 3,
    overtimeHours: 15,
    attendanceRate: '91%',
    details: [
      { date: '2024-11-01', status: 'حاضر', checkIn: '08:00', checkOut: '17:00' },
      { date: '2024-11-02', status: 'حاضر', checkIn: '08:15', checkOut: '17:00' },
      { date: '2024-11-03', status: 'غائب', checkIn: '-', checkOut: '-' },
      { date: '2024-11-04', status: 'حاضر', checkIn: '08:00', checkOut: '18:00' },
      { date: '2024-11-05', status: 'حاضر', checkIn: '08:30', checkOut: '17:00' }
    ]
  };

  const performanceReport = {
    employeeId: employee.id,
    employeeName: employee.name,
    evaluationPeriod: 'الربع الرابع 2024',
    overallScore: 4.2,
    maxScore: 5.0,
    categories: [
      { name: 'جودة العمل', score: 4.5, maxScore: 5.0 },
      { name: 'الالتزام بالمواعيد', score: 3.8, maxScore: 5.0 },
      { name: 'التعاون مع الفريق', score: 4.3, maxScore: 5.0 },
      { name: 'المبادرة والإبداع', score: 4.1, maxScore: 5.0 },
      { name: 'التطوير المهني', score: 4.0, maxScore: 5.0 }
    ],
    achievements: [
      'إكمال مشروع تطوير النظام في الموعد المحدد',
      'قيادة فريق التطوير بنجاح',
      'تحسين كفاءة العمليات بنسبة 15%'
    ],
    improvementAreas: [
      'تحسين مهارات التواصل',
      'المشاركة أكثر في الاجتماعات',
      'تطوير مهارات القيادة'
    ]
  };

  const leaveReport = {
    employeeId: employee.id,
    employeeName: employee.name,
    year: '2024',
    totalLeaveBalance: 30,
    usedLeave: 18,
    remainingLeave: 12,
    leaveHistory: [
      { type: 'إجازة سنوية', startDate: '2024-01-15', endDate: '2024-01-22', days: 7, status: 'موافق عليها' },
      { type: 'إجازة مرضية', startDate: '2024-03-10', endDate: '2024-03-12', days: 3, status: 'موافق عليها' },
      { type: 'إجازة اضطرارية', startDate: '2024-06-05', endDate: '2024-06-07', days: 2, status: 'موافق عليها' },
      { type: 'إجازة سنوية', startDate: '2024-08-20', endDate: '2024-08-26', days: 6, status: 'موافق عليها' }
    ]
  };

  const payrollReport = {
    employeeId: employee.id,
    employeeName: employee.name,
    month: 'نوفمبر 2024',
    basicSalary: 8000,
    allowances: {
      housing: 2000,
      transportation: 500,
      medical: 300
    },
    deductions: {
      insurance: 400,
      tax: 200,
      other: 100
    },
    overtime: 750,
    totalGross: 11550,
    totalDeductions: 700,
    netSalary: 10850
  };

  const reports = [
    {
      id: 'attendance',
      title: 'تقرير الحضور والانصراف',
      description: 'تفاصيل حضور الموظف خلال الشهر الحالي',
      icon: Clock,
      data: attendanceReport,
      color: 'text-blue-600'
    },
    {
      id: 'performance',
      title: 'تقرير الأداء',
      description: 'تقييم أداء الموظف والإنجازات',
      icon: TrendingUp,
      data: performanceReport,
      color: 'text-green-600'
    },
    {
      id: 'leave',
      title: 'تقرير الإجازات',
      description: 'رصيد الإجازات والتاريخ التفصيلي',
      icon: Calendar,
      data: leaveReport,
      color: 'text-purple-600'
    },
    {
      id: 'payroll',
      title: 'تقرير الراتب',
      description: 'تفاصيل الراتب والاستقطاعات',
      icon: Award,
      data: payrollReport,
      color: 'text-orange-600'
    }
  ];

  const handleDownload = (format: 'pdf' | 'excel' | 'csv') => {
    const report = reports.find(r => r.id === selectedReport);
    if (report) {
      downloadFile({
        data: report.data,
        filename: `${report.title}_${employee.name}_${new Date().toISOString().split('T')[0]}`,
        format
      });
    }
  };

  const handlePrint = () => {
    const report = reports.find(r => r.id === selectedReport);
    if (report) {
      printData(report.data, `${report.title} - ${employee.name}`);
    }
  };

  const renderReportDetails = () => {
    const report = reports.find(r => r.id === selectedReport);
    if (!report) return null;

    switch (selectedReport) {
      case 'attendance':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{attendanceReport.presentDays}</div>
                  <div className="text-sm text-muted-foreground">أيام الحضور</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{attendanceReport.absentDays}</div>
                  <div className="text-sm text-muted-foreground">أيام الغياب</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{attendanceReport.lateDays}</div>
                  <div className="text-sm text-muted-foreground">أيام التأخير</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{attendanceReport.overtimeHours}</div>
                  <div className="text-sm text-muted-foreground">ساعات إضافية</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">تفاصيل الحضور:</h4>
              {attendanceReport.details.map((day, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <div className="text-sm">{day.date}</div>
                  <Badge variant={day.status === 'حاضر' ? 'default' : 'destructive'}>
                    {day.status}
                  </Badge>
                  <div className="text-sm">{day.checkIn} - {day.checkOut}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{performanceReport.overallScore}/{performanceReport.maxScore}</div>
                <div className="text-sm text-muted-foreground">التقييم العام</div>
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <h4 className="font-semibold">تفاصيل التقييم:</h4>
              {performanceReport.categories.map((category, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <div>{category.name}</div>
                  <div className="text-sm font-medium">{category.score}/{category.maxScore}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    الإنجازات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {performanceReport.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm">• {achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    مجالات التطوير
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {performanceReport.improvementAreas.map((area, index) => (
                      <li key={index} className="text-sm">• {area}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'leave':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{leaveReport.totalLeaveBalance}</div>
                  <div className="text-sm text-muted-foreground">إجمالي الرصيد</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{leaveReport.usedLeave}</div>
                  <div className="text-sm text-muted-foreground">المستخدم</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{leaveReport.remainingLeave}</div>
                  <div className="text-sm text-muted-foreground">المتبقي</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">تاريخ الإجازات:</h4>
              {leaveReport.leaveHistory.map((leave, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <div className="font-medium">{leave.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {leave.startDate} إلى {leave.endDate}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{leave.days} أيام</div>
                    <Badge variant="default">{leave.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payroll':
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">الراتب والبدلات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>الراتب الأساسي</span>
                    <span className="font-medium">{payrollReport.basicSalary.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>بدل سكن</span>
                    <span className="font-medium">{payrollReport.allowances.housing.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>بدل مواصلات</span>
                    <span className="font-medium">{payrollReport.allowances.transportation.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>بدل طبي</span>
                    <span className="font-medium">{payrollReport.allowances.medical.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ساعات إضافية</span>
                    <span className="font-medium">{payrollReport.overtime.toLocaleString()} ريال</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">الاستقطاعات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>التأمينات الاجتماعية</span>
                    <span className="font-medium">{payrollReport.deductions.insurance.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ضريبة الدخل</span>
                    <span className="font-medium">{payrollReport.deductions.tax.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>استقطاعات أخرى</span>
                    <span className="font-medium">{payrollReport.deductions.other.toLocaleString()} ريال</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">صافي الراتب</span>
                  <span className="text-2xl font-bold text-primary">{payrollReport.netSalary.toLocaleString()} ريال</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">
            تقارير الموظف: {employee.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedReport ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report) => (
                <Card 
                  key={report.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedReport(report.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <report.icon className={`w-6 h-6 ${report.color}`} />
                      <span>{report.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{report.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
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
                    size="sm"
                    onClick={handlePrint}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    طباعة
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload('excel')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload('pdf')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {reports.find(r => r.id === selectedReport)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderReportDetails()}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};