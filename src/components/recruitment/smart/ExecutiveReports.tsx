import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { DatePicker } from '@/components/ui/date-picker';
import { 
  FileText, 
  Download, 
  Send, 
  Calendar,
  TrendingUp,
  Users,
  Award,
  Target,
  BarChart3,
  PieChart,
  Clock,
  DollarSign,
  Eye,
  Mail,
  Printer,
  Share,
  Settings,
  Filter,
  RefreshCw
} from 'lucide-react';

export const ExecutiveReports = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [selectedPeriod, setSelectedPeriod] = useState('current-week');
  const [reportFormat, setReportFormat] = useState('pdf');

  const weeklyData = {
    period: 'الأسبوع الحالي (20-26 يناير 2024)',
    summary: {
      totalCandidates: 42,
      aiProcessed: 38,
      panelReviewed: 28,
      finalVotes: 15,
      approved: 8,
      rejected: 5,
      pending: 2,
      avgTimeToHire: 12,
      costPerHire: 4500,
      qualityScore: 4.2
    },
    hiringCommitteeDecisions: [
      {
        candidate: 'أحمد محمد العتيبي',
        position: 'مطور Full Stack',
        decision: 'موافقة',
        panelScore: 4.5,
        aiScore: 92,
        reasons: ['مهارات تقنية ممتازة', 'خبرة مناسبة', 'تواصل جيد']
      },
      {
        candidate: 'فاطمة سالم القحطاني',
        position: 'محاسب أول',
        decision: 'موافقة',
        panelScore: 4.7,
        aiScore: 88,
        reasons: ['خبرة واسعة', 'شهادات مهنية', 'مهارات قيادية']
      },
      {
        candidate: 'خالد عبدالله المطيري',
        position: 'مدير مشروع',
        decision: 'رفض',
        panelScore: 3.8,
        aiScore: 75,
        reasons: ['توقعات راتب عالية', 'عدم توافق ثقافي', 'تاريخ تنقل وظيفي']
      }
    ],
    aiRecommendations: [
      {
        type: 'process_improvement',
        title: 'تحسين عملية الفحص الأولي',
        description: 'يمكن تقليل وقت الفحص الأولي بنسبة 25% عبر تحسين أسئلة الشات بوت',
        impact: 'عالي',
        timeline: '2-3 أسابيع'
      },
      {
        type: 'bias_alert',
        title: 'تحذير من التحيز في التقييم',
        description: 'لوحظ تحيز محتمل ضد المرشحين من خارج المدينة',
        impact: 'متوسط',
        timeline: 'فوري'
      },
      {
        type: 'quality_optimization',
        title: 'تحسين جودة المرشحين',
        description: 'يُنصح بتعديل معايير الفحص لرفع جودة المرشحين المقبولين',
        impact: 'عالي',
        timeline: '1-2 أسابيع'
      }
    ]
  };

  const monthlyData = {
    period: 'شهر يناير 2024',
    summary: {
      totalCandidates: 186,
      aiProcessed: 170,
      panelReviewed: 98,
      finalVotes: 55,
      approved: 32,
      rejected: 18,
      pending: 5,
      avgTimeToHire: 15,
      costPerHire: 4200,
      qualityScore: 4.1
    },
    trends: {
      applicationTrend: '+23%',
      qualityTrend: '+8%',
      speedTrend: '-12%',
      costTrend: '-5%'
    },
    topPerformingPositions: [
      { position: 'مطور Full Stack', applications: 45, success: 28, rate: 62 },
      { position: 'محاسب أول', applications: 32, success: 18, rate: 56 },
      { position: 'مدير مشروع', applications: 28, success: 12, rate: 43 }
    ]
  };

  const boardPackData = {
    executiveSummary: `
تقرير شامل عن أداء نظام التوظيف الذكي لشهر يناير 2024:

• نجح النظام في معالجة 186 طلب توظيف بمعدل دقة 94%
• تم توظيف 32 مرشحاً بمتوسط جودة 4.1/5
• تقليل تكلفة التوظيف بنسبة 5% مقارنة بالشهر الماضي
• تحسن وقت التوظيف بنسبة 12% مع الحفاظ على الجودة

التوصيات الرئيسية:
1. الاستثمار في تطوير نظام الفحص الأولي
2. مراجعة معايير التقييم لرفع جودة المرشحين
3. تدريب اللجنة على تجنب التحيز غير الواعي
    `
  };

  const generateReport = async (type: string, format: string) => {
    console.log(`Generating ${type} report in ${format} format...`);
    // Simulate report generation
    setTimeout(() => {
      alert(`تم إنشاء تقرير ${type} بصيغة ${format} بنجاح!`);
    }, 1500);
  };

  const scheduleReport = () => {
    alert('تم جدولة التقرير بنجاح! سيتم إرساله أسبوعياً.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            التقارير التنفيذية
          </h2>
          <p className="text-muted-foreground">تقارير شاملة للإدارة التنفيذية ومجلس الإدارة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            جدولة التقارير
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            تقرير فوري
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            إعدادات التقرير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>الفترة الزمنية</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-week">الأسبوع الحالي</SelectItem>
                  <SelectItem value="last-week">الأسبوع الماضي</SelectItem>
                  <SelectItem value="current-month">الشهر الحالي</SelectItem>
                  <SelectItem value="last-month">الشهر الماضي</SelectItem>
                  <SelectItem value="quarter">الربع الحالي</SelectItem>
                  <SelectItem value="custom">فترة مخصصة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>صيغة التقرير</Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="pptx">PowerPoint</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                فلترة
              </Button>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                تحديث البيانات
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="weekly">التقرير الأسبوعي</TabsTrigger>
          <TabsTrigger value="monthly">التقرير الشهري</TabsTrigger>
          <TabsTrigger value="board-pack">حزمة مجلس الإدارة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات المتقدمة</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="mt-6">
          <div className="space-y-6">
            {/* Period Header */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-xl">{weeklyData.period}</CardTitle>
                <CardDescription>ملخص أداء نظام التوظيف الذكي</CardDescription>
              </CardHeader>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-2xl font-bold">{weeklyData.summary.totalCandidates}</p>
                  <p className="text-sm text-muted-foreground">إجمالي المرشحين</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold">{weeklyData.summary.approved}</p>
                  <p className="text-sm text-muted-foreground">تم قبولهم</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto text-orange-600 mb-2" />
                  <p className="text-2xl font-bold">{weeklyData.summary.avgTimeToHire}</p>
                  <p className="text-sm text-muted-foreground">يوم متوسط التوظيف</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <p className="text-2xl font-bold">{weeklyData.summary.costPerHire.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">ريال تكلفة التوظيف</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 mx-auto text-red-600 mb-2" />
                  <p className="text-2xl font-bold">{weeklyData.summary.qualityScore}/5</p>
                  <p className="text-sm text-muted-foreground">جودة التوظيف</p>
                </CardContent>
              </Card>
            </div>

            {/* Committee Decisions */}
            <Card>
              <CardHeader>
                <CardTitle>قرارات لجنة التوظيف</CardTitle>
                <CardDescription>ملخص القرارات والتصويتات النهائية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.hiringCommitteeDecisions.map((decision, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{decision.candidate}</h4>
                          <p className="text-sm text-muted-foreground">{decision.position}</p>
                        </div>
                        <Badge className={
                          decision.decision === 'موافقة' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }>
                          {decision.decision}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">درجة اللجنة</p>
                          <p className="font-semibold text-purple-600">{decision.panelScore}/5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">درجة الذكاء الاصطناعي</p>
                          <p className="font-semibold text-blue-600">{decision.aiScore}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">أسباب القرار</p>
                          <p className="font-semibold">{decision.reasons.length}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">أهم 3 أسباب:</p>
                        <ul className="text-sm text-muted-foreground">
                          {decision.reasons.slice(0, 3).map((reason, idx) => (
                            <li key={idx}>• {reason}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>توصيات الذكاء الاصطناعي</CardTitle>
                <CardDescription>اقتراحات ذكية لتحسين عملية التوظيف</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.aiRecommendations.map((recommendation, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{recommendation.title}</h4>
                        <Badge variant={
                          recommendation.impact === 'عالي' ? 'destructive' :
                          recommendation.impact === 'متوسط' ? 'default' : 'secondary'
                        }>
                          {recommendation.impact} التأثير
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{recommendation.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>الإطار الزمني: {recommendation.timeline}</span>
                        <span>النوع: {recommendation.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button onClick={() => generateReport('أسبوعي', reportFormat)}>
                <Download className="w-4 h-4 mr-2" />
                تحميل التقرير الأسبوعي
              </Button>
              <Button variant="outline" onClick={scheduleReport}>
                <Calendar className="w-4 h-4 mr-2" />
                جدولة أسبوعية
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                إرسال بالبريد
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="mt-6">
          <div className="space-y-6">
            {/* Monthly Overview */}
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <CardHeader>
                <CardTitle className="text-xl">{monthlyData.period}</CardTitle>
                <CardDescription>تقرير شهري شامل لأداء التوظيف</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{monthlyData.summary.totalCandidates}</p>
                    <p className="text-sm text-muted-foreground">إجمالي المرشحين</p>
                    <Badge variant="outline" className="text-green-600 mt-1">
                      {monthlyData.trends.applicationTrend}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{monthlyData.summary.approved}</p>
                    <p className="text-sm text-muted-foreground">تم توظيفهم</p>
                    <Badge variant="outline" className="text-green-600 mt-1">
                      {monthlyData.trends.qualityTrend}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{monthlyData.summary.avgTimeToHire}</p>
                    <p className="text-sm text-muted-foreground">يوم متوسط</p>
                    <Badge variant="outline" className="text-red-600 mt-1">
                      {monthlyData.trends.speedTrend}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{monthlyData.summary.qualityScore}/5</p>
                    <p className="text-sm text-muted-foreground">جودة إجمالية</p>
                    <Badge variant="outline" className="text-green-600 mt-1">
                      {monthlyData.trends.costTrend}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Positions */}
            <Card>
              <CardHeader>
                <CardTitle>أفضل المناصب أداءً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyData.topPerformingPositions.map((position, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{position.position}</p>
                        <p className="text-sm text-muted-foreground">{position.applications} طلب</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{position.success} نجح</p>
                        <p className="text-sm text-muted-foreground">{position.rate}% معدل النجاح</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button onClick={() => generateReport('شهري', reportFormat)}>
                <Download className="w-4 h-4 mr-2" />
                تحميل التقرير الشهري
              </Button>
              <Button variant="outline">
                <Send className="w-4 h-4 mr-2" />
                إرسال للإدارة
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="board-pack" className="mt-6">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
              <CardHeader>
                <CardTitle className="text-xl">حزمة مجلس الإدارة</CardTitle>
                <CardDescription>تقرير تنفيذي مخصص لمجلس الإدارة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-3">الملخص التنفيذي</h3>
                  <div className="bg-muted/30 p-4 rounded-lg whitespace-pre-line text-sm">
                    {boardPackData.executiveSummary}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Charts Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    توزيع نتائج التصويت
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">مخطط دائري (سيتم تطويره)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    اتجاه الأداء الشهري
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">مخطط بياني (سيتم تطويره)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button onClick={() => generateReport('مجلس الإدارة', 'pptx')}>
                <Download className="w-4 h-4 mr-2" />
                تحميل عرض تقديمي
              </Button>
              <Button variant="outline" onClick={() => generateReport('مجلس الإدارة', 'pdf')}>
                <Printer className="w-4 h-4 mr-2" />
                طباعة PDF
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                مشاركة آمنة
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معدل التحويل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>طلب → فحص ذكي</span>
                    <span className="font-semibold">91%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>فحص ذكي → مراجعة لجنة</span>
                    <span className="font-semibold">73%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مراجعة لجنة → تصويت نهائي</span>
                    <span className="font-semibold">54%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تصويت نهائي → توظيف</span>
                    <span className="font-semibold">53%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">مقاييس الجودة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>دقة الذكاء الاصطناعي</span>
                    <span className="font-semibold text-green-600">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>توافق اللجنة مع الذكاء الاصطناعي</span>
                    <span className="font-semibold text-blue-600">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رضا المرشحين</span>
                    <span className="font-semibold text-purple-600">4.6/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رضا المدراء التنفيذيين</span>
                    <span className="font-semibold text-orange-600">4.2/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">التحسينات المقترحة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="font-medium text-blue-800">تحسين السرعة</p>
                    <p className="text-blue-700">تقليل وقت المراجعة بنسبة 15%</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <p className="font-medium text-green-800">رفع الجودة</p>
                    <p className="text-green-700">تحسين معايير الفحص الأولي</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <p className="font-medium text-purple-800">تقليل التكلفة</p>
                    <p className="text-purple-700">أتمتة المهام الإدارية أكثر</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};