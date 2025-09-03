import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, Download, Eye, Printer, RefreshCw, Calendar, 
  TrendingUp, Users, DollarSign, Clock, Brain, BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const AIReportsInsights = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('insights');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const aiInsights = [
    {
      id: 1,
      title: isRTL ? 'تحليل معدل دوران الموظفين' : 'Employee Attrition Analysis',
      type: 'attrition',
      generated: '2024-06-15',
      confidence: 94,
      summary: isRTL 
        ? 'معدل دوران الموظفين في قسم المبيعات أعلى من المتوسط بنسبة 23%. العوامل الرئيسية: ضغط العمل، منافسة العروض، تأخير المكافآت.'
        : 'Employee attrition in Sales department is 23% above average. Key factors: work pressure, competitive offers, bonus delays.',
      recommendations: [
        isRTL ? 'مراجعة هيكل الحوافز' : 'Review incentive structure',
        isRTL ? 'تحسين التوازن بين العمل والحياة' : 'Improve work-life balance',
        isRTL ? 'برامج تطوير مهني' : 'Professional development programs'
      ],
      impact: 'High',
      department: 'Sales'
    },
    {
      id: 2,
      title: isRTL ? 'تحليل أنماط المهارات' : 'Skills Pattern Analysis',
      type: 'skills',
      generated: '2024-06-14',
      confidence: 91,
      summary: isRTL
        ? 'فجوة مهارات واضحة في التقنيات الحديثة. 65% من فريق التطوير يحتاج تدريب في Cloud Computing.'
        : 'Clear skills gap in modern technologies. 65% of development team needs Cloud Computing training.',
      recommendations: [
        isRTL ? 'برنامج تدريب Cloud Computing' : 'Cloud Computing training program',
        isRTL ? 'شراكة مع منصات التعلم' : 'Partnership with learning platforms',
        isRTL ? 'ميزانية للشهادات المهنية' : 'Budget for professional certifications'
      ],
      impact: 'Medium',
      department: 'IT'
    },
    {
      id: 3,
      title: isRTL ? 'تحليل الأداء الشامل' : 'Comprehensive Performance Analysis',
      type: 'performance',
      generated: '2024-06-13',
      confidence: 88,
      summary: isRTL
        ? 'الأداء العام ممتاز بنسبة 87%. انخفاض طفيف في فريق التسويق (-5%) يتطلب اهتمام.'
        : 'Overall performance excellent at 87%. Slight decline in Marketing team (-5%) requires attention.',
      recommendations: [
        isRTL ? 'مراجعة استراتيجية التسويق' : 'Review marketing strategy',
        isRTL ? 'تدريب إضافي لفريق التسويق' : 'Additional training for marketing team',
        isRTL ? 'تحسين أدوات العمل' : 'Improve work tools'
      ],
      impact: 'Medium',
      department: 'Marketing'
    }
  ];

  const reports = [
    {
      id: 1,
      name: isRTL ? 'تقرير الموارد البشرية الشامل' : 'Comprehensive HR Report',
      type: 'comprehensive',
      generatedBy: 'AI Analytics Engine',
      date: '2024-06-15',
      status: 'ready',
      size: '2.4 MB',
      pages: 24,
      sections: ['Employee Overview', 'Performance Metrics', 'Compensation Analysis', 'Training Needs']
    },
    {
      id: 2,
      name: isRTL ? 'تحليل معدل الدوران' : 'Attrition Analysis Report',
      type: 'attrition',
      generatedBy: 'Predictive AI Model',
      date: '2024-06-14',
      status: 'ready',
      size: '1.8 MB',
      pages: 16,
      sections: ['Risk Assessment', 'Department Analysis', 'Predictive Modeling', 'Recommendations']
    },
    {
      id: 3,
      name: isRTL ? 'تقرير المهارات والتدريب' : 'Skills & Training Report',
      type: 'skills',
      generatedBy: 'Skills Analytics AI',
      date: '2024-06-13',
      status: 'generating',
      size: '1.2 MB',
      pages: 12,
      sections: ['Skills Matrix', 'Gap Analysis', 'Training Recommendations', 'Budget Planning']
    }
  ];

  const dashboardData = [
    { month: 'Jan', employees: 245, performance: 87, satisfaction: 4.2 },
    { month: 'Feb', employees: 248, performance: 89, satisfaction: 4.3 },
    { month: 'Mar', employees: 252, performance: 85, satisfaction: 4.1 },
    { month: 'Apr', employees: 255, performance: 91, satisfaction: 4.4 },
    { month: 'May', employees: 258, performance: 88, satisfaction: 4.2 },
    { month: 'Jun', employees: 260, performance: 87, satisfaction: 4.3 }
  ];

  const departmentData = [
    { name: 'IT', value: 35, performance: 92 },
    { name: 'Sales', value: 28, performance: 85 },
    { name: 'Marketing', value: 22, performance: 87 },
    { name: 'HR', value: 15, performance: 89 }
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  const generateReport = (type) => {
    toast({
      title: isRTL ? 'جاري إنشاء التقرير' : 'Generating Report',
      description: isRTL ? 'سيتم إشعارك عند اكتمال التقرير' : 'You will be notified when the report is ready'
    });
  };

  const downloadReport = (reportId) => {
    toast({
      title: isRTL ? 'جاري تحميل التقرير' : 'Downloading Report',
      description: isRTL ? 'سيبدأ التحميل قريباً' : 'Download will start shortly'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {isRTL ? 'التقارير والرؤى الذكية' : 'AI Reports & Insights'}
            </CardTitle>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">{isRTL ? 'أسبوعي' : 'Weekly'}</SelectItem>
                  <SelectItem value="month">{isRTL ? 'شهري' : 'Monthly'}</SelectItem>
                  <SelectItem value="quarter">{isRTL ? 'ربع سنوي' : 'Quarterly'}</SelectItem>
                  <SelectItem value="year">{isRTL ? 'سنوي' : 'Yearly'}</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                {isRTL ? 'تحديث' : 'Refresh'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="insights">{isRTL ? 'الرؤى الذكية' : 'AI Insights'}</TabsTrigger>
              <TabsTrigger value="reports">{isRTL ? 'التقارير' : 'Reports'}</TabsTrigger>
              <TabsTrigger value="dashboard">{isRTL ? 'لوحة المعلومات' : 'Dashboard'}</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="mt-6">
              <div className="space-y-6">
                {aiInsights.map((insight) => (
                  <Card key={insight.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">{insight.department}</Badge>
                            <Badge variant={insight.impact === 'High' ? 'destructive' : 'secondary'}>
                              {insight.impact} Impact
                            </Badge>
                            <Badge variant="outline">
                              {insight.confidence}% {isRTL ? 'ثقة' : 'confidence'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {insight.generated}
                          </span>
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">{isRTL ? 'التحليل:' : 'Analysis:'}</h4>
                        <p className="text-sm text-muted-foreground">{insight.summary}</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium mb-2">{isRTL ? 'التوصيات:' : 'Recommendations:'}</h4>
                        <div className="space-y-2">
                          {insight.recommendations.map((rec, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              {rec}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          {isRTL ? 'تصدير' : 'Export'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Printer className="h-4 w-4 mr-2" />
                          {isRTL ? 'طباعة' : 'Print'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => generateReport('comprehensive')}
                  >
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">{isRTL ? 'تقرير شامل' : 'Comprehensive Report'}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => generateReport('attrition')}
                  >
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-sm">{isRTL ? 'تحليل الدوران' : 'Attrition Analysis'}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                    onClick={() => generateReport('performance')}
                  >
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">{isRTL ? 'تقرير الأداء' : 'Performance Report'}</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  {reports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{report.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{isRTL ? 'مولد بواسطة:' : 'Generated by:'} {report.generatedBy}</span>
                                <span>{report.date}</span>
                                <span>{report.pages} {isRTL ? 'صفحة' : 'pages'}</span>
                                <span>{report.size}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                              {report.status === 'ready' 
                                ? (isRTL ? 'جاهز' : 'Ready')
                                : (isRTL ? 'قيد الإنشاء' : 'Generating')
                              }
                            </Badge>
                            {report.status === 'ready' && (
                              <>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 mr-2" />
                                  {isRTL ? 'معاينة' : 'Preview'}
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => downloadReport(report.id)}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  {isRTL ? 'تحميل' : 'Download'}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dashboard" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trends Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? 'اتجاهات الموارد البشرية' : 'HR Trends'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dashboardData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="employees" 
                          stroke="hsl(var(--primary))" 
                          name={isRTL ? 'الموظفين' : 'Employees'}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="performance" 
                          stroke="hsl(var(--chart-2))" 
                          name={isRTL ? 'الأداء' : 'Performance'}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Department Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? 'توزيع الأقسام' : 'Department Distribution'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={departmentData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Performance by Department */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? 'الأداء حسب القسم' : 'Performance by Department'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={departmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="performance" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIReportsInsights;