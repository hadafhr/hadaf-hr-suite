import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, Filter, BarChart3, PieChart, TrendingUp, Users, Clock, DollarSign, Target, FileText, Eye, Share2, Printer, Mail, Settings, ArrowLeft, Plus, Edit, Trash2, CheckCircle2, AlertTriangle, Brain, Sparkles, RefreshCw, Search } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';
interface Report {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  lastGenerated: string;
  status: 'ready' | 'generating' | 'scheduled';
  size: string;
  format: string[];
  permissions: string[];
  tags: string[];
}
interface ReportsProps {
  onBack: () => void;
}

// Report Generator Component
const ReportGenerator = () => {
  const {
    toast
  } = useToast();
  const [reportConfig, setReportConfig] = useState({
    name: '',
    type: 'custom',
    category: 'hr',
    description: '',
    dataSource: 'employees',
    dateRange: 'last_month',
    includeCharts: true,
    format: 'pdf',
    fields: [] as string[],
    filters: [] as any[]
  });
  const [availableFields, setAvailableFields] = useState([{
    id: 'employee_name',
    label: 'اسم الموظف',
    checked: false
  }, {
    id: 'department',
    label: 'القسم',
    checked: false
  }, {
    id: 'position',
    label: 'المنصب',
    checked: false
  }, {
    id: 'salary',
    label: 'الراتب',
    checked: false
  }, {
    id: 'attendance',
    label: 'الحضور',
    checked: false
  }, {
    id: 'performance',
    label: 'الأداء',
    checked: false
  }, {
    id: 'join_date',
    label: 'تاريخ الانضمام',
    checked: false
  }, {
    id: 'status',
    label: 'الحالة',
    checked: false
  }]);
  const [isGenerating, setIsGenerating] = useState(false);
  const handleFieldToggle = (fieldId: string) => {
    setAvailableFields(prev => prev.map(field => field.id === fieldId ? {
      ...field,
      checked: !field.checked
    } : field));
  };
  const handleGenerateReport = async () => {
    const selectedFields = availableFields.filter(field => field.checked).map(field => field.id);
    if (selectedFields.length === 0) {
      toast({
        title: 'يرجى اختيار حقل واحد على الأقل',
        variant: 'destructive'
      });
      return;
    }
    setIsGenerating(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast({
        title: 'تم إنشاء التقرير بنجاح',
        variant: 'default'
      });

      // Reset form
      setReportConfig({
        name: '',
        type: 'custom',
        category: 'hr',
        description: '',
        dataSource: 'employees',
        dateRange: 'last_month',
        includeCharts: true,
        format: 'pdf',
        fields: [],
        filters: []
      });
      setAvailableFields(prev => prev.map(field => ({
        ...field,
        checked: false
      })));
    } catch (error) {
      toast({
        title: 'حدث خطأ في إنشاء التقرير',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            منشئ التقارير المخصصة
          </CardTitle>
          <CardDescription>
            إنشاء تقارير مخصصة باستخدام البيانات المتاحة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="report-name">اسم التقرير</Label>
              <Input id="report-name" value={reportConfig.name} onChange={e => setReportConfig({
              ...reportConfig,
              name: e.target.value
            })} placeholder="مثال: تقرير الموظفين الشهري" />
            </div>
            
            <div>
              <Label htmlFor="report-category">الفئة</Label>
              <Select value={reportConfig.category} onValueChange={value => setReportConfig({
              ...reportConfig,
              category: value
            })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">الموارد البشرية</SelectItem>
                  <SelectItem value="financial">المالية</SelectItem>
                  <SelectItem value="performance">الأداء</SelectItem>
                  <SelectItem value="attendance">الحضور</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">وصف التقرير</Label>
            <Textarea id="description" value={reportConfig.description} onChange={e => setReportConfig({
            ...reportConfig,
            description: e.target.value
          })} placeholder="وصف مختصر لمحتوى وهدف التقرير" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>مصدر البيانات</Label>
              <Select value={reportConfig.dataSource} onValueChange={value => setReportConfig({
              ...reportConfig,
              dataSource: value
            })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employees">الموظفين</SelectItem>
                  <SelectItem value="attendance">سجلات الحضور</SelectItem>
                  <SelectItem value="payroll">كشف الرواتب</SelectItem>
                  <SelectItem value="performance">تقييمات الأداء</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>النطاق الزمني</Label>
              <Select value={reportConfig.dateRange} onValueChange={value => setReportConfig({
              ...reportConfig,
              dateRange: value
            })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_week">الأسبوع الماضي</SelectItem>
                  <SelectItem value="last_month">الشهر الماضي</SelectItem>
                  <SelectItem value="last_quarter">الربع الماضي</SelectItem>
                  <SelectItem value="last_year">السنة الماضية</SelectItem>
                  <SelectItem value="custom">نطاق مخصص</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>تنسيق الملف</Label>
              <Select value={reportConfig.format} onValueChange={value => setReportConfig({
              ...reportConfig,
              format: value
            })}>
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

          <div>
            <Label className="text-base font-medium">الحقول المطلوبة</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              {availableFields.map(field => <div key={field.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox id={field.id} checked={field.checked} onCheckedChange={() => handleFieldToggle(field.id)} />
                  <Label htmlFor={field.id} className="text-sm font-normal cursor-pointer">
                    {field.label}
                  </Label>
                </div>)}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox id="include-charts" checked={reportConfig.includeCharts} onCheckedChange={checked => setReportConfig({
              ...reportConfig,
              includeCharts: !!checked
            })} />
              <Label htmlFor="include-charts">تضمين الرسوم البيانية</Label>
            </div>
            
            <Button onClick={handleGenerateReport} disabled={isGenerating} className="mr-auto">
              {isGenerating ? <>
                  <RefreshCw className="h-4 w-4 animate-spin ml-2" />
                  جاري الإنشاء...
                </> : <>
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء التقرير
                </>}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};

// Smart Analytics Component
const SmartAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const [timeRange, setTimeRange] = useState('last_6_months');
  const performanceData = [{
    name: 'يناير',
    average: 78,
    department: 82,
    individual: 75
  }, {
    name: 'فبراير',
    average: 81,
    department: 85,
    individual: 78
  }, {
    name: 'مارس',
    average: 79,
    department: 83,
    individual: 76
  }, {
    name: 'أبريل',
    average: 84,
    department: 87,
    individual: 82
  }, {
    name: 'مايو',
    average: 86,
    department: 89,
    individual: 84
  }, {
    name: 'يونيو',
    average: 88,
    department: 91,
    individual: 86
  }];
  const departmentAnalytics = [{
    name: 'التسويق',
    value: 30,
    color: '#3b82f6'
  }, {
    name: 'المبيعات',
    value: 25,
    color: '#10b981'
  }, {
    name: 'التطوير',
    value: 20,
    color: '#f59e0b'
  }, {
    name: 'الموارد البشرية',
    value: 15,
    color: '#ef4444'
  }, {
    name: 'المالية',
    value: 10,
    color: '#8b5cf6'
  }];
  const insights = [{
    type: 'success',
    title: 'تحسن في الأداء العام',
    description: 'ارتفاع متوسط الأداء بنسبة 12% مقارنة بالربع السابق',
    impact: 'عالي',
    confidence: 94
  }, {
    type: 'warning',
    title: 'انخفاض في معدل الحضور',
    description: 'تراجع معدل الحضور في قسم التسويق بنسبة 3%',
    impact: 'متوسط',
    confidence: 87
  }, {
    type: 'info',
    title: 'فرصة للتطوير',
    description: '15 موظف مؤهل للترقية بناءً على تقييمات الأداء',
    impact: 'عالي',
    confidence: 91
  }];
  const predictions = [{
    title: 'الأداء المتوقع الشهر القادم',
    value: '89%',
    trend: 'up'
  }, {
    title: 'احتمالية الاحتفاظ بالموظفين',
    value: '92%',
    trend: 'up'
  }, {
    title: 'الحاجة للتدريب',
    value: '23 موظف',
    trend: 'neutral'
  }, {
    title: 'التوظيفات المطلوبة',
    value: '8 وظائف',
    trend: 'up'
  }];
  return <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            التحليلات الذكية والتنبؤات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">الأداء</SelectItem>
                <SelectItem value="attendance">الحضور</SelectItem>
                <SelectItem value="satisfaction">الرضا الوظيفي</SelectItem>
                <SelectItem value="productivity">الإنتاجية</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_3_months">آخر 3 شهور</SelectItem>
                <SelectItem value="last_6_months">آخر 6 شهور</SelectItem>
                <SelectItem value="last_year">السنة الماضية</SelectItem>
                <SelectItem value="custom">فترة مخصصة</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث البيانات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>اتجاه الأداء الزمني</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="average" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="department" stackId="2" stroke="#10b981" fill="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع الأداء حسب القسم</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie data={departmentAnalytics} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                  {departmentAnalytics.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {insights.map((insight, index) => <div key={index} className={`p-4 rounded-lg border-l-4 ${insight.type === 'success' ? 'bg-green-50 border-l-green-500' : insight.type === 'warning' ? 'bg-yellow-50 border-l-yellow-500' : 'bg-blue-50 border-l-blue-500'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <Badge variant="outline">التأثير: {insight.impact}</Badge>
                      <span className="text-muted-foreground">الثقة: {insight.confidence}%</span>
                    </div>
                  </div>
                  {insight.type === 'success' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  {insight.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                  {insight.type === 'info' && <Brain className="h-5 w-5 text-blue-600" />}
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            التنبؤات والتوقعات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {predictions.map((prediction, index) => <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">{prediction.title}</p>
                    <p className="text-2xl font-bold text-primary">{prediction.value}</p>
                    <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs ${prediction.trend === 'up' ? 'bg-green-100 text-green-700' : prediction.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                      <TrendingUp className={`w-3 h-3 ${prediction.trend === 'down' ? 'rotate-180' : ''}`} />
                      {prediction.trend === 'up' ? 'متزايد' : prediction.trend === 'down' ? 'متناقص' : 'مستقر'}
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </CardContent>
      </Card>
    </div>;
};

// Scheduled Reports Component
const ScheduledReports = () => {
  const {
    toast
  } = useToast();
  const [scheduledReports, setScheduledReports] = useState([{
    id: '1',
    name: 'تقرير الحضور الأسبوعي',
    frequency: 'weekly',
    nextRun: '2024-01-22 09:00',
    lastRun: '2024-01-15 09:00',
    recipients: ['hr@company.com', 'manager@company.com'],
    format: 'PDF',
    status: 'active',
    description: 'تقرير تلقائي للحضور والغياب'
  }, {
    id: '2',
    name: 'تحليل الأداء الشهري',
    frequency: 'monthly',
    nextRun: '2024-02-01 08:00',
    lastRun: '2024-01-01 08:00',
    recipients: ['ceo@company.com', 'hr@company.com'],
    format: 'Excel',
    status: 'active',
    description: 'تقرير شامل للأداء والإنتاجية'
  }, {
    id: '3',
    name: 'تقرير الرواتب الشهري',
    frequency: 'monthly',
    nextRun: '2024-01-28 10:00',
    lastRun: '2023-12-28 10:00',
    recipients: ['payroll@company.com'],
    format: 'PDF',
    status: 'paused',
    description: 'تقرير كشف الرواتب والمكافآت'
  }]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    reportType: 'attendance',
    frequency: 'weekly',
    time: '09:00',
    recipients: '',
    format: 'PDF',
    description: ''
  });
  const handleAddSchedule = () => {
    const schedule = {
      id: Date.now().toString(),
      name: newSchedule.name,
      frequency: newSchedule.frequency,
      nextRun: `2024-01-22 ${newSchedule.time}`,
      lastRun: '-',
      recipients: newSchedule.recipients.split(',').map(email => email.trim()),
      format: newSchedule.format,
      status: 'active' as const,
      description: newSchedule.description
    };
    setScheduledReports([...scheduledReports, schedule]);
    setNewSchedule({
      name: '',
      reportType: 'attendance',
      frequency: 'weekly',
      time: '09:00',
      recipients: '',
      format: 'PDF',
      description: ''
    });
    setShowAddDialog(false);
    toast({
      title: 'تم إضافة التقرير المجدول بنجاح',
      variant: 'default'
    });
  };
  const toggleReportStatus = (reportId: string) => {
    setScheduledReports(prev => prev.map(report => report.id === reportId ? {
      ...report,
      status: report.status === 'active' ? 'paused' : 'active'
    } : report));
  };
  const deleteScheduledReport = (reportId: string) => {
    setScheduledReports(prev => prev.filter(report => report.id !== reportId));
    toast({
      title: 'تم حذف التقرير المجدول',
      variant: 'default'
    });
  };
  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'يومي';
      case 'weekly':
        return 'أسبوعي';
      case 'monthly':
        return 'شهري';
      case 'quarterly':
        return 'ربع سنوي';
      default:
        return frequency;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">التقارير المجدولة</h2>
          <p className="text-muted-foreground">إدارة التقارير التلقائية والمجدولة</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              جدولة تقرير جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>جدولة تقرير جديد</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schedule-name">اسم التقرير</Label>
                  <Input id="schedule-name" value={newSchedule.name} onChange={e => setNewSchedule({
                  ...newSchedule,
                  name: e.target.value
                })} placeholder="مثال: تقرير الحضور الأسبوعي" />
                </div>
                <div>
                  <Label htmlFor="report-type">نوع التقرير</Label>
                  <Select value={newSchedule.reportType} onValueChange={value => setNewSchedule({
                  ...newSchedule,
                  reportType: value
                })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attendance">الحضور والغياب</SelectItem>
                      <SelectItem value="performance">الأداء</SelectItem>
                      <SelectItem value="payroll">الرواتب</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea id="description" value={newSchedule.description} onChange={e => setNewSchedule({
                ...newSchedule,
                description: e.target.value
              })} placeholder="وصف مختصر للتقرير" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="frequency">التكرار</Label>
                  <Select value={newSchedule.frequency} onValueChange={value => setNewSchedule({
                  ...newSchedule,
                  frequency: value
                })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">يومي</SelectItem>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                      <SelectItem value="monthly">شهري</SelectItem>
                      <SelectItem value="quarterly">ربع سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="time">الوقت</Label>
                  <Input id="time" type="time" value={newSchedule.time} onChange={e => setNewSchedule({
                  ...newSchedule,
                  time: e.target.value
                })} />
                </div>

                <div>
                  <Label htmlFor="format">التنسيق</Label>
                  <Select value={newSchedule.format} onValueChange={value => setNewSchedule({
                  ...newSchedule,
                  format: value
                })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Excel">Excel</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="recipients">المستلمون (فصل بفاصلة)</Label>
                <Input id="recipients" value={newSchedule.recipients} onChange={e => setNewSchedule({
                ...newSchedule,
                recipients: e.target.value
              })} placeholder="hr@company.com, manager@company.com" />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddSchedule}>
                  جدولة التقرير
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المجدولة</p>
                <p className="text-2xl font-bold text-primary">{scheduledReports.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">نشطة</p>
                <p className="text-2xl font-bold text-green-600">
                  {scheduledReports.filter(r => r.status === 'active').length}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوقفة</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {scheduledReports.filter(r => r.status === 'paused').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">التشغيل التالي</p>
                <p className="text-lg font-bold text-blue-600">اليوم</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Reports List */}
      <div className="grid gap-4">
        {scheduledReports.map(report => <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{report.name}</h3>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status === 'active' ? 'نشط' : 'متوقف'}
                    </Badge>
                    <Badge variant="outline">
                      {getFrequencyLabel(report.frequency)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">التشغيل التالي</Label>
                      <p className="font-medium">{report.nextRun}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">آخر تشغيل</Label>
                      <p className="font-medium">{report.lastRun}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">التنسيق</Label>
                      <p className="font-medium">{report.format}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">المستلمون</Label>
                      <p className="font-medium">{report.recipients.length} مستلم</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleReportStatus(report.id)}>
                    {report.status === 'active' ? 'إيقاف' : 'تشغيل'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteScheduledReport(report.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
};
const Reports = ({
  onBack
}: ReportsProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const reportCategories = [{
    id: 'all',
    name: 'جميع التقارير',
    count: 45
  }, {
    id: 'hr',
    name: 'الموارد البشرية',
    count: 12
  }, {
    id: 'financial',
    name: 'المالية والرواتب',
    count: 8
  }, {
    id: 'performance',
    name: 'الأداء والإنتاجية',
    count: 7
  }, {
    id: 'attendance',
    name: 'الحضور والغياب',
    count: 6
  }, {
    id: 'compliance',
    name: 'الامتثال والحوكمة',
    count: 5
  }, {
    id: 'analytics',
    name: 'التحليلات المتقدمة',
    count: 4
  }, {
    id: 'custom',
    name: 'التقارير المخصصة',
    count: 3
  }];
  const reports: Report[] = [{
    id: '1',
    name: 'تقرير الرواتب الشهري',
    type: 'financial',
    category: 'financial',
    description: 'تقرير شامل للرواتب والمكافآت والخصومات',
    lastGenerated: '2024-01-15',
    status: 'ready',
    size: '2.3 MB',
    format: ['PDF', 'Excel', 'CSV'],
    permissions: ['hr_manager', 'payroll_officer'],
    tags: ['شهري', 'رواتب', 'مالي']
  }, {
    id: '2',
    name: 'تحليل الحضور والغياب',
    type: 'attendance',
    category: 'attendance',
    description: 'تحليل مفصل لبيانات الحضور والغياب والتأخير',
    lastGenerated: '2024-01-14',
    status: 'ready',
    size: '1.8 MB',
    format: ['PDF', 'Excel'],
    permissions: ['hr_manager', 'supervisor'],
    tags: ['حضور', 'تحليل', 'يومي']
  }, {
    id: '3',
    name: 'تقرير الأداء السنوي',
    type: 'performance',
    category: 'performance',
    description: 'تقييم شامل للأداء الوظيفي والإنجازات',
    lastGenerated: '2024-01-10',
    status: 'generating',
    size: '4.1 MB',
    format: ['PDF', 'PowerPoint'],
    permissions: ['hr_manager', 'manager'],
    tags: ['أداء', 'سنوي', 'تقييم']
  }];
  const recentAnalytics = [{
    title: 'معدل الحضور الشهري',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up'
  }, {
    title: 'مؤشر الرضا الوظيفي',
    value: '8.6/10',
    change: '+0.3',
    trend: 'up'
  }, {
    title: 'معدل دوران الموظفين',
    value: '3.2%',
    change: '-0.8%',
    trend: 'down'
  }, {
    title: 'إنتاجية الفريق',
    value: '87%',
    change: '+5%',
    trend: 'up'
  }];
  const handleGenerateReport = async (reportId: string) => {
    setGeneratingReport(reportId);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratingReport(null);
  };
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) || report.description.toLowerCase().includes(searchTerm.toLowerCase()) || report.tags.some(tag => tag.includes(searchTerm));
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-primary/5 min-h-screen">
      <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
        <div className="flex items-center gap-6">
          <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
            <ArrowLeft className="h-4 w-4 ml-2" />
            رجوع
          </Button>
          <div className="h-8 w-px bg-gray-300"></div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              <div className="relative z-10 group-hover:scale-110 transition-transform text-white">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">قسم التقارير والتحليلات</h1>
              <p className="text-gray-600 text-lg">
                نظام شامل لإنتاج وإدارة التقارير والتحليلات الذكية
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
            <BarChart3 className="h-4 w-4 ml-2" />
            نظام متقدم
          </Badge>
          <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <FileText className="h-4 w-4 ml-2" />
            تقرير جديد
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentAnalytics.map((metric, index) => <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-primary">{metric.value}</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <TrendingUp className={`w-3 h-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">التقارير المتاحة</TabsTrigger>
          <TabsTrigger value="generator">منشئ التقارير</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات الذكية</TabsTrigger>
          <TabsTrigger value="scheduled">التقارير المجدولة</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="flex gap-4 items-center p-4 bg-card rounded-lg">
            <Input placeholder="البحث في التقارير..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-1" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportCategories.map(category => <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map(report => <Card key={report.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-primary">{report.name}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                    <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                      {report.status === 'ready' ? 'جاهز' : 'قيد الإنتاج'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">آخر إنتاج:</span>
                      <p className="font-medium">{report.lastGenerated}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">حجم الملف:</span>
                      <p className="font-medium">{report.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" disabled={report.status === 'generating' || generatingReport === report.id} onClick={() => handleGenerateReport(report.id)}>
                      {generatingReport === report.id ? 'جاري الإنتاج...' : 'إنتاج'}
                    </Button>
                    <Button size="sm" variant="outline">معاينة</Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        <TabsContent value="generator" className="space-y-6">
          <ReportGenerator />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <SmartAnalytics />
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <ScheduledReports />
        </TabsContent>
      </Tabs>
    </div>;
};
export default Reports;