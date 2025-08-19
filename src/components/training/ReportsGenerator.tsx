import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  BarChart3,
  Users,
  Award,
  TrendingUp,
  Filter,
  Mail,
  Printer,
  FileSpreadsheet,
  Eye
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'training-summary' | 'course-performance' | 'learner-progress' | 'instructor-analytics' | 'certificate-report';
  format: 'pdf' | 'excel' | 'csv';
  icon: React.ComponentType<any>;
}

export const ReportsGenerator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [filters, setFilters] = useState({
    department: '',
    instructor: '',
    course: '',
    status: 'all'
  });

  const reportTemplates: ReportTemplate[] = [
    {
      id: '1',
      name: isRTL ? 'تقرير ملخص التدريب' : 'Training Summary Report',
      description: isRTL ? 'تقرير شامل عن جميع أنشطة التدريب والإحصائيات' : 'Comprehensive report on all training activities and statistics',
      type: 'training-summary',
      format: 'pdf',
      icon: FileText
    },
    {
      id: '2',
      name: isRTL ? 'تقرير أداء الدورات' : 'Course Performance Report',
      description: isRTL ? 'تحليل مفصل لأداء الدورات ومعدلات الإكمال' : 'Detailed analysis of course performance and completion rates',
      type: 'course-performance',
      format: 'excel',
      icon: BarChart3
    },
    {
      id: '3',
      name: isRTL ? 'تقرير تقدم المتدربين' : 'Learner Progress Report',
      description: isRTL ? 'تتبع تقدم المتدربين الفردي والجماعي' : 'Track individual and group learner progress',
      type: 'learner-progress',
      format: 'pdf',
      icon: Users
    },
    {
      id: '4',
      name: isRTL ? 'تحليلات المدربين' : 'Instructor Analytics',
      description: isRTL ? 'تقييم أداء المدربين وفعالية التدريس' : 'Evaluate instructor performance and teaching effectiveness',
      type: 'instructor-analytics',
      format: 'excel',
      icon: TrendingUp
    },
    {
      id: '5',
      name: isRTL ? 'تقرير الشهادات' : 'Certificate Report',
      description: isRTL ? 'تقرير الشهادات المُصدرة والمعلقة' : 'Report on issued and pending certificates',
      type: 'certificate-report',
      format: 'pdf',
      icon: Award
    }
  ];

  const generateReport = () => {
    const reportData = {
      templateId: selectedTemplate,
      dateRange,
      filters,
      generatedAt: new Date(),
      requestedBy: 'Current User'
    };
    
    console.log('Generating report:', reportData);
    // Here you would typically call an API to generate the report
  };

  const scheduleReport = () => {
    console.log('Scheduling recurring report');
    // Implement report scheduling logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            {isRTL ? 'مولد التقارير المتقدم' : 'Advanced Reports Generator'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إنشاء تقارير شاملة ومفصلة عن أنشطة التدريب والأداء' : 'Generate comprehensive and detailed reports on training activities and performance'}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Template Selection */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                {isRTL ? 'اختيار نموذج التقرير' : 'Select Report Template'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {reportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <template.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{template.name}</h3>
                          <div className="flex gap-1">
                            <Badge variant="outline" className="text-xs">
                              {template.format.toUpperCase()}
                            </Badge>
                            {selectedTemplate === template.id && (
                              <Badge variant="default" className="text-xs">
                                {isRTL ? 'مُختار' : 'Selected'}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filters and Parameters */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                {isRTL ? 'المرشحات والمعايير' : 'Filters & Criteria'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{isRTL ? 'الفترة الزمنية' : 'Date Range'}</label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? dateRange.from.toLocaleDateString() : (isRTL ? 'من تاريخ' : 'From date')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? dateRange.to.toLocaleDateString() : (isRTL ? 'إلى تاريخ' : 'To date')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Other Filters */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{isRTL ? 'القسم' : 'Department'}</label>
                  <Select value={filters.department} onValueChange={(value) => setFilters({...filters, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'جميع الأقسام' : 'All Departments'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{isRTL ? 'جميع الأقسام' : 'All Departments'}</SelectItem>
                      <SelectItem value="hr">{isRTL ? 'الموارد البشرية' : 'Human Resources'}</SelectItem>
                      <SelectItem value="it">{isRTL ? 'تقنية المعلومات' : 'IT'}</SelectItem>
                      <SelectItem value="marketing">{isRTL ? 'التسويق' : 'Marketing'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{isRTL ? 'المدرب' : 'Instructor'}</label>
                  <Select value={filters.instructor} onValueChange={(value) => setFilters({...filters, instructor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'جميع المدربين' : 'All Instructors'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{isRTL ? 'جميع المدربين' : 'All Instructors'}</SelectItem>
                      <SelectItem value="ahmed">{isRTL ? 'د. محمد الأحمد' : 'Dr. Mohamed Ahmed'}</SelectItem>
                      <SelectItem value="sara">{isRTL ? 'أ. سارة المطيري' : 'Sarah Al-Mutairi'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{isRTL ? 'حالة التدريب' : 'Training Status'}</label>
                <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isRTL ? 'جميع الحالات' : 'All Status'}</SelectItem>
                    <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                    <SelectItem value="completed">{isRTL ? 'مكتمل' : 'Completed'}</SelectItem>
                    <SelectItem value="pending">{isRTL ? 'معلق' : 'Pending'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>{isRTL ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                onClick={generateReport}
                disabled={!selectedTemplate}
              >
                <Download className="h-4 w-4 mr-2" />
                {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
              </Button>
              
              <Button variant="outline" className="w-full" disabled={!selectedTemplate}>
                <Eye className="h-4 w-4 mr-2" />
                {isRTL ? 'معاينة' : 'Preview'}
              </Button>
              
              <Button variant="outline" className="w-full" onClick={scheduleReport}>
                <CalendarIcon className="h-4 w-4 mr-2" />
                {isRTL ? 'جدولة تلقائية' : 'Schedule'}
              </Button>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>{isRTL ? 'خيارات التصدير' : 'Export Options'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                {isRTL ? 'تصدير PDF' : 'Export as PDF'}
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                {isRTL ? 'تصدير Excel' : 'Export as Excel'}
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                {isRTL ? 'إرسال بالبريد' : 'Send via Email'}
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Printer className="h-4 w-4 mr-2" />
                {isRTL ? 'طباعة' : 'Print'}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>{isRTL ? 'التقارير الأخيرة' : 'Recent Reports'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="font-medium">{isRTL ? 'تقرير شهري' : 'Monthly Report'}</p>
                    <p className="text-xs text-muted-foreground">{isRTL ? 'منذ يومين' : '2 days ago'}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="font-medium">{isRTL ? 'تحليل الأداء' : 'Performance Analysis'}</p>
                    <p className="text-xs text-muted-foreground">{isRTL ? 'منذ أسبوع' : '1 week ago'}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
