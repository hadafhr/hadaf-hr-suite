import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Download, 
  Send, 
  Eye,
  TrendingUp,
  Users,
  Target,
  Clock,
  DollarSign,
  BarChart3,
  PieChart,
  FileText,
  Presentation,
  Shield,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Printer,
  Share2,
  Mail
} from 'lucide-react';

export const BoardPack = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1-2024');
  const [activeTab, setActiveTab] = useState('summary');

  const boardPackData = {
    period: 'الربع الأول 2024',
    executiveSummary: {
      totalInvestment: 450000,
      roiPercentage: 23,
      costSavings: 125000,
      timeReduction: 35,
      qualityImprovement: 18,
      hires: 89,
      averageTimeToHire: 14,
      employeeRetention: 92
    },
    strategicMetrics: [
      {
        metric: 'عائد الاستثمار (ROI)',
        value: '23%',
        target: '20%',
        status: 'متجاوز',
        trend: '+5%',
        icon: TrendingUp
      },
      {
        metric: 'تقليل التكلفة',
        value: '125,000 ريال',
        target: '100,000 ريال',
        status: 'متجاوز',
        trend: '+25%',
        icon: DollarSign
      },
      {
        metric: 'جودة التوظيف',
        value: '4.3/5',
        target: '4.0/5',
        status: 'متجاوز',
        trend: '+7.5%',
        icon: Award
      },
      {
        metric: 'سرعة التوظيف',
        value: '14 يوم',
        target: '21 يوم',
        status: 'متجاوز',
        trend: '-33%',
        icon: Clock
      }
    ],
    keyAchievements: [
      'نجح النظام الذكي في تقليل وقت التوظيف بنسبة 35%',
      'تحسين جودة المرشحين المختارين بنسبة 18%',
      'تقليل تكاليف التوظيف بمقدار 125,000 ريال',
      'تحقيق معدل رضا 92% من المدراء الجدد المعينين',
      'خفض التحيز في عملية التوظيف بنسبة 40%',
      'زيادة تنوع المرشحين المقبولين بنسبة 28%'
    ],
    riskMitigation: [
      {
        risk: 'التحيز في الخوارزميات',
        status: 'مُدار',
        mitigation: 'مراجعة دورية كل شهر + تدقيق مستقل',
        impact: 'منخفض'
      },
      {
        risk: 'مقاومة التغيير من الموظفين',
        status: 'مُدار',
        mitigation: 'برنامج تدريب شامل + ورش عمل',
        impact: 'متوسط'
      },
      {
        risk: 'اعتمادية تقنية عالية',
        status: 'مراقب',
        mitigation: 'خطة احتياطية + نسخ احتياطية',
        impact: 'متوسط'
      }
    ],
    financialImpact: {
      costBefore: 875000,
      costAfter: 750000,
      savings: 125000,
      roi: 23,
      paybackPeriod: 8,
      npv: 340000
    },
    futureRoadmap: [
      {
        phase: 'المرحلة الثانية',
        timeline: 'Q2 2024',
        objectives: ['توسيع النظام لشمل التوظيف الدولي', 'إضافة تحليلات متقدمة', 'تطوير التكامل مع أنظمة HR'],
        budget: 180000,
        expectedRoi: 28
      },
      {
        phase: 'المرحلة الثالثة',
        timeline: 'Q3-Q4 2024',
        objectives: ['ذكاء اصطناعي متقدم للتنبؤ', 'أتمتة كاملة للعمليات', 'تحليلات تنبؤية'],
        budget: 250000,
        expectedRoi: 35
      }
    ]
  };

  const generateBoardPack = (format: string) => {
    console.log(`Generating Board Pack in ${format}...`);
    setTimeout(() => {
      alert(`تم إنشاء حزمة مجلس الإدارة بصيغة ${format} بنجاح!`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            حزمة مجلس الإدارة
          </h2>
          <p className="text-muted-foreground">تقرير تنفيذي شامل لمجلس الإدارة حول أداء التوظيف الذكي</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            جدولة ربعية
          </Button>
          <Button className="flex items-center gap-2" onClick={() => generateBoardPack('pptx')}>
            <Presentation className="w-4 h-4" />
            إنشاء العرض التقديمي
          </Button>
        </div>
      </div>

      {/* Period Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Label className="font-semibold">الفترة المحددة:</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q1-2024">الربع الأول 2024</SelectItem>
                <SelectItem value="Q4-2023">الربع الرابع 2023</SelectItem>
                <SelectItem value="H1-2024">النصف الأول 2024</SelectItem>
                <SelectItem value="2023">السنة المالية 2023</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="text-primary">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">الملخص التنفيذي</TabsTrigger>
          <TabsTrigger value="metrics">المقاييس الاستراتيجية</TabsTrigger>
          <TabsTrigger value="financial">التأثير المالي</TabsTrigger>
          <TabsTrigger value="risks">إدارة المخاطر</TabsTrigger>
          <TabsTrigger value="roadmap">خريطة المستقبل</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <div className="space-y-6">
            {/* Executive Summary Header */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{boardPackData.period}</CardTitle>
                <CardDescription className="text-lg">تقرير أداء نظام التوظيف الذكي SmartHire</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{boardPackData.executiveSummary.roiPercentage}%</p>
                    <p className="text-sm text-muted-foreground">عائد الاستثمار</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{boardPackData.executiveSummary.costSavings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">ريال وفورات</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{boardPackData.executiveSummary.hires}</p>
                    <p className="text-sm text-muted-foreground">موظف جديد</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">{boardPackData.executiveSummary.employeeRetention}%</p>
                    <p className="text-sm text-muted-foreground">معدل البقاء</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  الإنجازات الرئيسية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {boardPackData.keyAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <p className="text-sm">{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Visual Performance Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    الأداء مقارنة بالأهداف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">عائد الاستثمار</span>
                        <span className="text-sm font-semibold">23% / 20%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '115%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">جودة التوظيف</span>
                        <span className="text-sm font-semibold">4.3 / 4.0</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '107.5%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">سرعة التوظيف</span>
                        <span className="text-sm font-semibold">14 / 21 يوم</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '133%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    توزيع الاستثمار
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      مخطط دائري يوضح توزيع الاستثمار:<br />
                      • التطوير التقني: 40%<br />
                      • التدريب: 25%<br />
                      • البنية التحتية: 20%<br />
                      • العمليات: 15%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boardPackData.strategicMetrics.map((metric, index) => (
                <Card key={index} className="relative">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <metric.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{metric.metric}</h3>
                          <p className="text-2xl font-bold text-primary">{metric.value}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="mt-4 flex justify-between text-sm">
                      <span className="text-muted-foreground">الهدف: {metric.target}</span>
                      <span className="text-green-600 font-semibold">{metric.trend}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  التأثير المالي الإجمالي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">التكلفة قبل التطبيق</p>
                    <p className="text-2xl font-bold text-red-600">
                      {boardPackData.financialImpact.costBefore.toLocaleString()} ريال
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">التكلفة بعد التطبيق</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {boardPackData.financialImpact.costAfter.toLocaleString()} ريال
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">الوفورات السنوية</p>
                    <p className="text-2xl font-bold text-green-600">
                      {boardPackData.financialImpact.savings.toLocaleString()} ريال
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">عائد الاستثمار</p>
                    <p className="text-xl font-bold text-primary">{boardPackData.financialImpact.roi}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">فترة الاسترداد</p>
                    <p className="text-xl font-bold text-blue-600">{boardPackData.financialImpact.paybackPeriod} أشهر</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">القيمة الحالية الصافية</p>
                    <p className="text-xl font-bold text-green-600">{boardPackData.financialImpact.npv.toLocaleString()} ريال</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                إدارة المخاطر والحوكمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {boardPackData.riskMitigation.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold">{risk.risk}</h4>
                      <Badge className={
                        risk.status === 'مُدار' ? 'bg-green-500 text-white' :
                        risk.status === 'مراقب' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                      }>
                        {risk.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">إجراءات التخفيف:</p>
                        <p>{risk.mitigation}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">مستوى التأثير:</p>
                        <Badge variant={
                          risk.impact === 'منخفض' ? 'default' :
                          risk.impact === 'متوسط' ? 'secondary' : 'destructive'
                        }>
                          {risk.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="mt-6">
          <div className="space-y-6">
            {boardPackData.futureRoadmap.map((phase, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{phase.phase}</span>
                    <Badge variant="outline">{phase.timeline}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-3">الأهداف الرئيسية:</h5>
                      <ul className="space-y-2">
                        {phase.objectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">الميزانية المطلوبة:</span>
                        <span className="font-semibold">{phase.budget.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">العائد المتوقع:</span>
                        <span className="font-semibold text-green-600">{phase.expectedRoi}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={() => generateBoardPack('pptx')} className="flex items-center gap-2">
              <Presentation className="w-4 h-4" />
              عرض تقديمي (PowerPoint)
            </Button>
            <Button onClick={() => generateBoardPack('pdf')} variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              تقرير PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              طباعة تنفيذية
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              إرسال آمن
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              مشاركة محدودة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};