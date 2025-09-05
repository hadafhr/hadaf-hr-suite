import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  FileBarChart, 
  Download, 
  Calendar as CalendarIcon,
  Eye,
  Filter,
  FileText,
  PieChart,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { toast } from 'sonner';

export const LegalReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('all');
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  // Mock data for reports
  const reportTemplates = [
    {
      id: 1,
      name: 'تقرير الامتثال الشهري',
      category: 'الامتثال',
      description: 'تقرير شامل عن حالة الامتثال للقوانين واللوائح',
      frequency: 'شهري',
      lastGenerated: '2024-01-20',
      status: 'متاح',
      format: 'PDF',
      size: '2.3 MB',
      recipients: ['الإدارة العليا', 'المدير القانوني']
    },
    {
      id: 2,
      name: 'تقرير القضايا العمالية',
      category: 'القضايا',
      description: 'ملخص القضايا العمالية المفتوحة والمغلقة',
      frequency: 'أسبوعي',
      lastGenerated: '2024-01-18',
      status: 'متاح',
      format: 'PDF',
      size: '1.8 MB',
      recipients: ['قسم الموارد البشرية', 'الإدارة القانونية']
    },
    {
      id: 3,
      name: 'تقرير مراجعة العقود',
      category: 'العقود',
      description: 'تقرير حول العقود المراجعة والمنتهية الصلاحية',
      frequency: 'شهري',
      lastGenerated: '2024-01-15',
      status: 'قيد الإنتاج',
      format: 'PDF',
      size: '-',
      recipients: ['الإدارة القانونية', 'الموارد البشرية']
    },
    {
      id: 4,
      name: 'تقرير الاستشارات القانونية',
      category: 'الاستشارات',
      description: 'إحصائيات الاستشارات القانونية وأوقات الاستجابة',
      frequency: 'شهري',
      lastGenerated: '2024-01-12',
      status: 'متاح',
      format: 'Excel',
      size: '890 KB',
      recipients: ['المستشار القانوني الأول']
    },
    {
      id: 5,
      name: 'تقرير المخاطر القانونية',
      category: 'المخاطر',
      description: 'تحليل المخاطر القانونية والتوصيات الوقائية',
      frequency: 'ربع سنوي',
      lastGenerated: '2024-01-01',
      status: 'متاح',
      format: 'PDF',
      size: '3.1 MB',
      recipients: ['الإدارة العليا', 'لجنة المخاطر']
    },
    {
      id: 6,
      name: 'تقرير الإجراءات التأديبية',
      category: 'الإجراءات',
      description: 'تقرير شامل عن الإجراءات التأديبية والامتثال',
      frequency: 'شهري',
      lastGenerated: '2024-01-10',
      status: 'متاح',
      format: 'PDF',
      size: '2.7 MB',
      recipients: ['الموارد البشرية', 'الإدارة العليا']
    }
  ];

  const quickStats = [
    {
      title: 'التقارير المولدة هذا الشهر',
      value: '24',
      change: '+6',
      icon: FileBarChart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'التقارير المجدولة',
      value: '12',
      change: '+2',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'التقارير المكتملة',
      value: '98%',
      change: '+2%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'متوسط وقت الإنتاج',
      value: '2.3 ساعة',
      change: '-30 دقيقة',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'تقرير الامتثال - يناير 2024',
      type: 'تقرير امتثال',
      generatedDate: '2024-01-20 14:30',
      size: '2.3 MB',
      status: 'مكتمل',
      downloadCount: 15
    },
    {
      id: 2,
      name: 'تقرير القضايا الأسبوعي - الأسبوع 3',
      type: 'تقرير قضايا',
      generatedDate: '2024-01-18 09:15',
      size: '1.8 MB',
      status: 'مكتمل',
      downloadCount: 8
    },
    {
      id: 3,
      name: 'تقرير العقود - ديسمبر 2023',
      type: 'تقرير عقود',
      generatedDate: '2024-01-15 16:45',
      size: '2.1 MB',
      status: 'مكتمل',
      downloadCount: 12
    },
    {
      id: 4,
      name: 'تقرير الاستشارات - يناير 2024',
      type: 'تقرير استشارات',
      generatedDate: '2024-01-12 11:20',
      size: '890 KB',
      status: 'مكتمل',
      downloadCount: 5
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'متاح': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'قيد الإنتاج': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'مخطط': { color: 'bg-blue-100 text-blue-800', icon: CalendarIcon },
      'مكتمل': { color: 'bg-green-100 text-green-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['متاح'];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      'الامتثال': 'bg-blue-100 text-blue-800',
      'القضايا': 'bg-red-100 text-red-800',
      'العقود': 'bg-green-100 text-green-800',
      'الاستشارات': 'bg-purple-100 text-purple-800',
      'المخاطر': 'bg-orange-100 text-orange-800',
      'الإجراءات': 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge className={categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
        {category}
      </Badge>
    );
  };

  const handleGenerateReport = (reportId: number) => {
    toast.success('تم بدء إنتاج التقرير بنجاح');
  };

  const handleDownloadReport = (reportId: number) => {
    toast.success('تم تحميل التقرير بنجاح');
  };

  const handleScheduleReport = () => {
    toast.success('تم جدولة التقرير بنجاح');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">التقارير القانونية</h2>
          <p className="text-gray-600 mt-2">إنتاج وإدارة التقارير القانونية والإحصائيات</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="ml-2 h-4 w-4" />
            تصفية متقدمة
          </Button>
          <Button>
            <FileBarChart className="ml-2 h-4 w-4" />
            تقرير مخصص
          </Button>
        </div>
      </div>

      {/* Quick Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600">{stat.change}</span>
                    <span className="text-sm text-gray-600 mr-1">هذا الشهر</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle>فلاتر التقارير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">نوع التقرير</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع التقرير" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التقارير</SelectItem>
                  <SelectItem value="compliance">تقارير الامتثال</SelectItem>
                  <SelectItem value="cases">تقارير القضايا</SelectItem>
                  <SelectItem value="contracts">تقارير العقود</SelectItem>
                  <SelectItem value="consultations">تقارير الاستشارات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">الفترة الزمنية</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">يومي</SelectItem>
                  <SelectItem value="weekly">أسبوعي</SelectItem>
                  <SelectItem value="monthly">شهري</SelectItem>
                  <SelectItem value="quarterly">ربع سنوي</SelectItem>
                  <SelectItem value="yearly">سنوي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">من تاريخ</label>
              <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP', { locale: ar }) : 'اختر التاريخ'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date || new Date());
                      setIsStartDateOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">إلى تاريخ</label>
              <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP', { locale: ar }) : 'اختر التاريخ'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => {
                      setEndDate(date || new Date());
                      setIsEndDateOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>قوالب التقارير المتاحة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getCategoryBadge(template.category)}
                        {getStatusBadge(template.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleGenerateReport(template.id)}>
                        <FileBarChart className="h-4 w-4" />
                      </Button>
                      {template.status === 'متاح' && (
                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport(template.id)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">التكرار: </span>
                      {template.frequency}
                    </div>
                    <div>
                      <span className="font-medium">آخر إنتاج: </span>
                      {template.lastGenerated}
                    </div>
                    <div>
                      <span className="font-medium">الصيغة: </span>
                      {template.format}
                    </div>
                    <div>
                      <span className="font-medium">الحجم: </span>
                      {template.size}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    <span className="font-medium">المستلمين: </span>
                    {template.recipients.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>التقارير الحديثة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                      <p className="text-sm text-gray-600">{report.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(report.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">تاريخ الإنتاج: </span>
                      {report.generatedDate}
                    </div>
                    <div>
                      <span className="font-medium">الحجم: </span>
                      {report.size}
                    </div>
                    <div>
                      <span className="font-medium">مرات التحميل: </span>
                      {report.downloadCount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                عرض جميع التقارير
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>إنتاج سريع للتقارير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary transition-colors">
              <PieChart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">تقرير الامتثال السريع</h3>
              <p className="text-sm text-gray-600 mb-4">إنتاج فوري لتقرير الامتثال الحالي</p>
              <Button size="sm" onClick={() => handleGenerateReport(1)}>
                إنتاج الآن
              </Button>
            </div>

            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary transition-colors">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">إحصائيات القضايا</h3>
              <p className="text-sm text-gray-600 mb-4">تقرير سريع عن حالة القضايا الحالية</p>
              <Button size="sm" onClick={() => handleGenerateReport(2)}>
                إنتاج الآن
              </Button>
            </div>

            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary transition-colors">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">ملخص شهري</h3>
              <p className="text-sm text-gray-600 mb-4">ملخص شامل لجميع الأنشطة القانونية</p>
              <Button size="sm" onClick={() => handleGenerateReport(3)}>
                إنتاج الآن
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};