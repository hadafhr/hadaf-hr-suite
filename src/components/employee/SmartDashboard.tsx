import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  RefreshCw,
  Shield,
  Users,
  Calendar,
  Award,
  Eye
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AIInsight {
  type: 'positive' | 'warning' | 'critical';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

interface AIRecommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  expectedImpact: string;
  timeframe: string;
}

interface RiskItem {
  risk: string;
  probability: string;
  impact: string;
  mitigation: string;
}

interface AIAnalysis {
  overview: {
    overallScore: string;
    status: string;
    summary: string;
  };
  insights: AIInsight[];
  recommendations: AIRecommendation[];
  riskAssessment: {
    overallRisk: string;
    risks: RiskItem[];
  };
  kpis: {
    employeeRetention: string;
    disciplinaryRate: string;
    attendanceRate: string;
    overallEfficiency: string;
  };
  trends: {
    disciplinaryTrend: string;
    attendanceTrend: string;
    prediction: string;
  };
}

const SmartDashboard = () => {
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample chart data
  const disciplinaryTrendData = [
    { month: 'يناير', cases: 5, resolved: 4 },
    { month: 'فبراير', cases: 3, resolved: 3 },
    { month: 'مارس', cases: 8, resolved: 6 },
    { month: 'أبريل', cases: 4, resolved: 4 },
    { month: 'مايو', cases: 6, resolved: 5 },
    { month: 'يونيو', cases: 7, resolved: 4 },
  ];

  const attendanceData = [
    { day: 'السبت', present: 145, late: 8, absent: 2 },
    { day: 'الأحد', present: 148, late: 5, absent: 1 },
    { day: 'الاثنين', present: 142, late: 10, absent: 3 },
    { day: 'الثلاثاء', present: 150, late: 3, absent: 2 },
    { day: 'الأربعاء', present: 147, late: 6, absent: 2 },
  ];

  const departmentData = [
    { name: 'تقنية المعلومات', value: 35, color: '#8B5CF6' },
    { name: 'المبيعات', value: 28, color: '#06B6D4' },
    { name: 'المالية', value: 20, color: '#10B981' },
    { name: 'الموارد البشرية', value: 12, color: '#F59E0B' },
    { name: 'التسويق', value: 15, color: '#EF4444' },
  ];

  const performanceData = [
    { category: 'الأداء العام', score: 85 },
    { category: 'الحضور والانصراف', score: 92 },
    { category: 'الانضباط', score: 78 },
    { category: 'التطوير المهني', score: 88 },
    { category: 'العمل الجماعي', score: 90 },
  ];

  const fetchAIInsights = async () => {
    setLoading(true);
    try {
      console.log('Fetching AI insights...');
      const { data, error } = await supabase.functions.invoke('hr-insights', {
        body: { analysisType: 'full' }
      });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        toast.error('حدث خطأ في جلب التحليل الذكي');
        // Set fallback data instead of returning
        setAiAnalysis(generateFallbackData());
        return;
      }

      if (data) {
        console.log('AI analysis received:', data);
        setAiAnalysis(data);
        toast.success('تم تحديث التحليل الذكي بنجاح');
      } else {
        console.warn('No data received from AI analysis');
        setAiAnalysis(generateFallbackData());
        toast.info('تم عرض بيانات تجريبية للتحليل الذكي');
      }
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      toast.error('حدث خطأ في الاتصال بالخدمة');
      setAiAnalysis(generateFallbackData());
    } finally {
      setLoading(false);
    }
  };

  // Generate fallback data when AI analysis is not available
  const generateFallbackData = (): AIAnalysis => {
    return {
      overview: {
        overallScore: "85",
        status: "جيد",
        summary: "النظام يعمل بكفاءة جيدة مع إمكانيات للتحسين في بعض المجالات"
      },
      insights: [
        {
          type: "positive",
          title: "معدل الحضور المتميز",
          description: "الموظفون يحافظون على معدل حضور ممتاز بنسبة 92%",
          impact: "medium",
          category: "attendance"
        },
        {
          type: "warning",
          title: "الحاجة لتطوير الأداء",
          description: "بعض الموظفين يحتاجون إلى برامج تطوير إضافية لتحسين الأداء",
          impact: "medium",
          category: "performance"
        },
        {
          type: "positive",
          title: "بيئة عمل إيجابية",
          description: "استطلاعات الرضا تظهر مستوى عالي من رضا الموظفين",
          impact: "high",
          category: "general"
        }
      ],
      recommendations: [
        {
          priority: "high",
          title: "تطوير برامج التدريب",
          description: "إنشاء برامج تدريب متخصصة لتطوير مهارات الموظفين",
          expectedImpact: "تحسين الإنتاجية بنسبة 20%",
          timeframe: "قصيرة المدى"
        },
        {
          priority: "medium",
          title: "تحسين نظام الحوافز",
          description: "مراجعة وتطوير نظام الحوافز والمكافآت للموظفين",
          expectedImpact: "زيادة الدافعية بنسبة 15%",
          timeframe: "متوسطة المدى"
        },
        {
          priority: "medium",
          title: "تعزيز التواصل الداخلي",
          description: "تطوير قنوات التواصل بين الإدارة والموظفين",
          expectedImpact: "تحسين بيئة العمل",
          timeframe: "فورية"
        }
      ],
      riskAssessment: {
        overallRisk: "متوسط",
        risks: [
          {
            risk: "تراجع محتمل في الإنتاجية",
            probability: "منخفضة",
            impact: "متوسط",
            mitigation: "تطبيق برامج التحفيز والمتابعة المستمرة"
          },
          {
            risk: "زيادة معدل ترك العمل",
            probability: "منخفضة",
            impact: "مرتفع",
            mitigation: "تحسين ظروف العمل وزيادة الرواتب"
          }
        ]
      },
      kpis: {
        employeeRetention: "88%",
        disciplinaryRate: "5%",
        attendanceRate: "92%",
        overallEfficiency: "85%"
      },
      trends: {
        disciplinaryTrend: "مستقر",
        attendanceTrend: "تحسن",
        prediction: "توقع تحسن مستمر في الأداء العام خلال الربع القادم"
      }
    };
  };

  useEffect(() => {
    // Initialize with fallback data first, then fetch AI insights
    setAiAnalysis(generateFallbackData());
    fetchAIInsights();
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'مرتفع': return 'text-destructive';
      case 'متوسط': return 'text-warning';
      case 'منخفض': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  if (loading && !aiAnalysis) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span>جاري تحليل البيانات بالذكاء الاصطناعي...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If no AI analysis is available, show a message
  if (!aiAnalysis) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-warning mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">التحليل الذكي غير متاح حالياً</h3>
              <p className="text-muted-foreground">يرجى المحاولة مرة أخرى</p>
            </div>
            <Button onClick={fetchAIInsights} disabled={loading}>
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin ml-2" />
              ) : (
                <RefreshCw className="h-4 w-4 ml-2" />
              )}
              إعادة المحاولة
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Overview Card */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  التحليل الذكي للموارد البشرية
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    النتيجة: {aiAnalysis.overview.overallScore}/100
                  </Badge>
                </CardTitle>
                <CardDescription>{aiAnalysis.overview.summary}</CardDescription>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchAIInsights}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin ml-2" />
              ) : (
                <RefreshCw className="h-4 w-4 ml-2" />
              )}
              تحديث التحليل
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-primary">{aiAnalysis.kpis.employeeRetention}</div>
              <div className="text-sm text-muted-foreground">معدل الاحتفاظ بالموظفين</div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-warning">{aiAnalysis.kpis.disciplinaryRate}</div>
              <div className="text-sm text-muted-foreground">معدل الإجراءات التأديبية</div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-success">{aiAnalysis.kpis.attendanceRate}</div>
              <div className="text-sm text-muted-foreground">معدل الحضور</div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-primary">{aiAnalysis.kpis.overallEfficiency}</div>
              <div className="text-sm text-muted-foreground">الكفاءة العامة</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Analytics */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="insights">الرؤى الذكية</TabsTrigger>
          <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
          <TabsTrigger value="risks">تقييم المخاطر</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Disciplinary Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  اتجاهات الإجراءات التأديبية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={disciplinaryTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cases" stroke="#EF4444" name="القضايا الجديدة" />
                    <Line type="monotone" dataKey="resolved" stroke="#10B981" name="القضايا المحلولة" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  توزيع الموظفين حسب القسم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Attendance Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  تحليل الحضور والغياب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" fill="#10B981" name="حاضر" />
                    <Bar dataKey="late" fill="#F59E0B" name="متأخر" />
                    <Bar dataKey="absent" fill="#EF4444" name="غائب" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  مؤشرات الأداء الرئيسية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.category}</span>
                      <span className="font-medium">{metric.score}%</span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {aiAnalysis.insights.map((insight, index) => (
            <Alert key={index} className={`border-l-4 ${
              insight.type === 'positive' ? 'border-l-success' :
              insight.type === 'warning' ? 'border-l-warning' : 'border-l-destructive'
            }`}>
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <Badge variant="outline">{insight.category}</Badge>
                    <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'secondary' : 'outline'}>
                      تأثير {insight.impact === 'high' ? 'عالي' : insight.impact === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                  <AlertDescription>{insight.description}</AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {aiAnalysis.recommendations.map((rec, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <Badge variant={getPriorityColor(rec.priority)}>
                        أولوية {rec.priority === 'high' ? 'عالية' : rec.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                      </Badge>
                      <Badge variant="outline">{rec.timeframe}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{rec.description}</p>
                    <div className="text-sm text-success font-medium">
                      الأثر المتوقع: {rec.expectedImpact}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>تقييم المخاطر العام</CardTitle>
                  <CardDescription>
                    مستوى المخاطر الإجمالي: 
                    <span className={`font-semibold mr-2 ${getRiskColor(aiAnalysis.riskAssessment.overallRisk)}`}>
                      {aiAnalysis.riskAssessment.overallRisk}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiAnalysis.riskAssessment.risks.map((risk, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold">{risk.risk}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        احتمالية: {risk.probability}
                      </Badge>
                      <Badge variant={risk.impact === 'مرتفع' ? 'destructive' : risk.impact === 'متوسط' ? 'secondary' : 'outline'}>
                        تأثير: {risk.impact}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>استراتيجية التخفيف:</strong> {risk.mitigation}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartDashboard;