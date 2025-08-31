import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Scale, AlertTriangle, CheckCircle, FileCheck, Gavel, Users, FileText, 
  Eye, Save, Download, Share, Settings, Bot, Brain, Zap, TrendingUp, Shield,
  Bell, Calendar, Target, Lightbulb, BarChart3, PieChart, Activity, Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, LineChart, Line, BarChart, Bar } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface ComprehensiveGovernanceComplianceProps {
  onBack: () => void;
  onCalculateEligibility?: () => void;  
  onExportExcel?: () => void;
  onExportPDF?: () => void;
}

export const ComprehensiveGovernanceCompliance: React.FC<ComprehensiveGovernanceComplianceProps> = ({ 
  onBack, 
  onCalculateEligibility,
  onExportExcel,
  onExportPDF 
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Enhanced compliance data with AI predictions
  const complianceData = [
    { month: 'يناير', compliance: 95, violations: 5, predicted: 97, risk_score: 15 },
    { month: 'فبراير', compliance: 97, violations: 3, predicted: 98, risk_score: 12 },
    { month: 'مارس', compliance: 94, violations: 6, predicted: 96, risk_score: 18 },
    { month: 'أبريل', compliance: 98, violations: 2, predicted: 99, risk_score: 8 },
    { month: 'مايو', compliance: 96, violations: 4, predicted: 98, risk_score: 14 },
    { month: 'يونيو', compliance: 99, violations: 1, predicted: 99, risk_score: 5 }
  ];

  const governanceMetrics = [
    { category: 'الامتثال الكامل', count: 340, percentage: 92, color: 'hsl(var(--success))', trend: '+5%' },
    { category: 'تحت المراجعة', count: 28, percentage: 7.5, color: 'hsl(var(--warning))', trend: '-2%' },
    { category: 'مخالفات قيد المعالجة', count: 8, percentage: 2, color: 'hsl(var(--destructive))', trend: '-8%' },
    { category: 'تدقيقات مكتملة', count: 95, percentage: 98, color: 'hsl(var(--primary))', trend: '+12%' }
  ];

  const riskAssessment = [
    { level: 'مخاطر منخفضة', value: 70, count: 280, color: 'hsl(var(--success))' },
    { level: 'مخاطر متوسطة', value: 25, count: 100, color: 'hsl(var(--warning))' },
    { level: 'مخاطر عالية', value: 5, count: 20, color: 'hsl(var(--destructive))' }
  ];

  const aiRecommendations = [
    {
      id: 1,
      priority: 'عالية',
      title: 'تحديث سياسة الأمان السيبراني',
      description: 'يوصي الذكاء الاصطناعي بتحديث سياسات الأمان بناءً على التهديدات الحديثة',
      impact: 'عالي',
      confidence: 95,
      category: 'security'
    },
    {
      id: 2,
      priority: 'متوسطة',
      title: 'مراجعة إجراءات الخصوصية',
      description: 'تحليل شامل لإجراءات حماية البيانات الشخصية وفقاً للوائح الجديدة',
      impact: 'متوسط',
      confidence: 87,
      category: 'privacy'
    },
    {
      id: 3,
      priority: 'منخفضة',
      title: 'تحسين عمليات التوثيق',
      description: 'اقتراحات لتطوير نظام التوثيق والأرشفة الرقمية',
      impact: 'منخفض',
      confidence: 92,
      category: 'documentation'
    }
  ];

  const complianceAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'انتهاء صلاحية ترخيص قريب',
      description: 'ترخيص العمل التجاري سينتهي خلال 30 يوم',
      date: '2024-09-15',
      priority: 'عالية'
    },
    {
      id: 2,
      type: 'info',
      title: 'تحديث في اللوائح',
      description: 'صدرت لوائح جديدة في قانون العمل السعودي',
      date: '2024-08-25',
      priority: 'متوسطة'
    }
  ];

  // Simulate AI analysis
  const performAIAnalysis = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAiInsights({
        overallScore: 94,
        riskLevel: 'منخفضة',
        recommendations: aiRecommendations.length,
        predictedCompliance: 98,
        keyFindings: [
          'معدل الامتثال محسّن بنسبة 5% هذا الشهر',
          'انخفاض المخالفات بنسبة 8% مقارنة بالشهر الماضي',
          'توقع وصول معدل الامتثال إلى 99% الشهر القادم'
        ]
      });

      toast({
        title: "تم إكمال التحليل بالذكاء الاصطناعي",
        description: "تم تحليل بيانات الحوكمة والامتثال بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في التحليل",
        description: "حدث خطأ أثناء تحليل البيانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateEligibility = () => {
    if (onCalculateEligibility) {
      onCalculateEligibility();
    } else {
      toast({
        title: "حساب الامتثال",
        description: "جاري تقييم مستوى الامتثال الذكي...",
      });
    }
  };

  const handleExportExcel = () => {
    if (onExportExcel) {
      onExportExcel();
    } else {
      toast({
        title: "تصدير Excel",
        description: "جاري تحضير تقرير Excel الشامل...",
      });
    }
  };

  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF();
    } else {
      toast({
        title: "تصدير PDF",
        description: "جاري إنشاء تقرير PDF مفصل...",
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-glow to-secondary p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30"></div>
          <div className="absolute inset-0 bg-white/5 opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleCalculateEligibility}
                  className="bg-secondary/90 border-secondary/30 text-white hover:bg-secondary backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <Target className="h-4 w-4 ml-2" />
                  {isRTL ? 'تقييم الامتثال' : 'Evaluate Compliance'}
                </Button>
                <Button 
                  onClick={handleExportExcel}
                  className="bg-success/90 border-success/30 text-white hover:bg-success backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير Excel' : 'Export Excel'}
                </Button>
                <Button 
                  onClick={handleExportPDF}
                  className="bg-destructive/90 border-destructive/30 text-white hover:bg-destructive backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <FileText className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير PDF' : 'Export PDF'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Scale className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام الحوكمة والامتثال الذكي' : 'Smart Governance & Compliance System'}
              </h1>
              <p className="text-white/90 text-lg max-w-3xl mx-auto">
                {isRTL ? 'منظومة متطورة مدعومة بالذكاء الاصطناعي لإدارة الحوكمة المؤسسية وضمان الامتثال الشامل للقوانين واللوائح' : 'Advanced AI-powered system for corporate governance management and comprehensive regulatory compliance'}
              </p>
            </div>
          </div>
        </div>

        {/* AI Insights Summary */}
        {aiInsights && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/20">
              <CardContent className="p-6 text-center">
                <Bot className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">{aiInsights.overallScore}%</div>
                <div className="text-sm text-gray-600">{isRTL ? 'النتيجة الإجمالية' : 'Overall Score'}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-success/10 to-success/20 border-success/20">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-success mx-auto mb-3" />
                <div className="text-2xl font-bold text-success mb-1">{aiInsights.riskLevel}</div>
                <div className="text-sm text-gray-600">{isRTL ? 'مستوى المخاطر' : 'Risk Level'}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-warning/10 to-warning/20 border-warning/20">
              <CardContent className="p-6 text-center">
                <Lightbulb className="h-8 w-8 text-warning mx-auto mb-3" />
                <div className="text-2xl font-bold text-warning mb-1">{aiInsights.recommendations}</div>
                <div className="text-sm text-gray-600">{isRTL ? 'التوصيات الذكية' : 'Smart Recommendations'}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/20 border-secondary/20">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-secondary mx-auto mb-3" />
                <div className="text-2xl font-bold text-secondary mb-1">{aiInsights.predictedCompliance}%</div>
                <div className="text-sm text-gray-600">{isRTL ? 'التوقع المستقبلي' : 'Future Prediction'}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white rounded-xl shadow-lg border p-2">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4" />
              {isRTL ? 'النظرة العامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <CheckCircle className="h-4 w-4" />
              {isRTL ? 'الامتثال' : 'Compliance'}
            </TabsTrigger>
            <TabsTrigger value="governance" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Scale className="h-4 w-4" />
              {isRTL ? 'الحوكمة' : 'Governance'}
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <AlertTriangle className="h-4 w-4" />
              {isRTL ? 'المخاطر' : 'Risks'}
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Brain className="h-4 w-4" />
              {isRTL ? 'الذكاء الاصطناعي' : 'AI Insights'}
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <FileText className="h-4 w-4" />
              {isRTL ? 'التقارير' : 'Reports'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Analytics Panel */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-to-br from-slate-900 via-primary to-secondary text-white shadow-2xl rounded-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Governance Framework */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary-glow flex items-center gap-2">
                          <Scale className="h-6 w-6" />
                          {isRTL ? 'إطار الحوكمة الذكي' : 'Smart Governance Framework'}
                        </h3>
                        <div className="relative h-48 bg-gradient-to-br from-primary/50 to-secondary/50 rounded-xl p-4 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl"></div>
                          <Scale className="h-32 w-32 text-primary-glow opacity-80 relative z-10" />
                          <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 rounded-full text-sm">
                            340 {isRTL ? 'إجراء ملتزم' : 'Compliant'}
                          </div>
                          <div className="absolute bottom-4 left-4 bg-secondary/80 px-3 py-1 rounded-full text-sm">
                            92% {isRTL ? 'معدل الامتثال' : 'Compliance Rate'}
                          </div>
                        </div>
                      </div>

                      {/* AI Risk Assessment */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-warning flex items-center gap-2">
                          <Brain className="h-6 w-6" />
                          {isRTL ? 'تقييم المخاطر الذكي' : 'AI Risk Assessment'}
                        </h3>
                        <div className="relative h-48 bg-gradient-to-br from-warning/50 to-destructive/50 rounded-xl p-4 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-warning/30 to-destructive/30 rounded-xl"></div>
                          <AlertTriangle className="h-32 w-32 text-warning opacity-80 relative z-10" />
                          <div className="absolute top-4 right-4 bg-warning/80 px-3 py-1 rounded-full text-sm">
                            20 {isRTL ? 'مخاطر عالية' : 'High Risk'}
                          </div>
                          <div className="absolute bottom-4 left-4 bg-destructive/80 px-3 py-1 rounded-full text-sm">
                            95 {isRTL ? 'تدقيق مكتمل' : 'Audits Done'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Compliance Trends Chart */}
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        {isRTL ? 'اتجاهات الامتثال والتوقعات الذكية' : 'Compliance Trends & Smart Predictions'}
                      </h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={complianceData}>
                          <defs>
                            <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="month" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                            labelStyle={{ color: '#F3F4F6' }}
                          />
                          <Area type="monotone" dataKey="compliance" stroke="hsl(var(--primary))" fill="url(#colorCompliance)" />
                          <Area type="monotone" dataKey="predicted" stroke="hsl(var(--secondary))" fill="url(#colorPredicted)" strokeDasharray="5 5" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Side Statistics */}
              <div className="space-y-6">
                <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        {isRTL ? 'مؤشرات الحوكمة الذكية' : 'Smart Governance Metrics'}
                      </h3>
                      <Settings className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                      {governanceMetrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                          <div>
                            <p className="font-semibold text-gray-800">{metric.category}</p>
                            <p className="text-sm text-gray-600">{metric.count} {isRTL ? 'عنصر' : 'items'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold" style={{ color: metric.color }}>{metric.percentage}%</p>
                            <Badge variant="secondary" className="text-xs">{metric.trend}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      {isRTL ? 'توزيع المخاطر الذكي' : 'Smart Risk Distribution'}
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsPieChart>
                        <Pie
                          data={riskAssessment}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {riskAssessment.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {riskAssessment.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span>{item.level}</span>
                          </div>
                          <span className="font-semibold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Control Panel */}
              <Card className="bg-gradient-to-br from-primary via-secondary to-primary-glow text-white shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="p-4 bg-white/20 rounded-full inline-flex items-center justify-center mb-4">
                      <Brain className="h-12 w-12" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{isRTL ? 'مركز التحكم الذكي' : 'AI Control Center'}</h2>
                    <p className="text-white/80">{isRTL ? 'تحليل متقدم بالذكاء الاصطناعي' : 'Advanced AI-Powered Analysis'}</p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={performAIAnalysis}
                      disabled={loading}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                          {isRTL ? 'جاري التحليل...' : 'Analyzing...'}
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5 mr-2" />
                          {isRTL ? 'بدء التحليل الذكي' : 'Start AI Analysis'}
                        </>
                      )}
                    </Button>

                    {aiInsights && (
                      <div className="space-y-3 mt-6">
                        <h3 className="font-bold text-lg">{isRTL ? 'النتائج الرئيسية:' : 'Key Findings:'}</h3>
                        {aiInsights.keyFindings?.map((finding: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                            <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{finding}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-warning" />
                    {isRTL ? 'التوصيات الذكية' : 'AI Recommendations'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiRecommendations.map((rec) => (
                    <div key={rec.id} className="p-4 rounded-lg border bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge 
                            variant={rec.priority === 'عالية' ? 'destructive' : rec.priority === 'متوسطة' ? 'default' : 'secondary'}
                            className="mb-2"
                          >
                            {rec.priority}
                          </Badge>
                          <h4 className="font-bold text-gray-800">{rec.title}</h4>
                        </div>
                        <div className="text-sm text-gray-500">
                          {rec.confidence}% {isRTL ? 'دقة' : 'confidence'}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{isRTL ? 'التأثير:' : 'Impact:'} {rec.impact}</Badge>
                        <Progress value={rec.confidence} className="flex-1 h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Compliance Alerts */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-6 w-6 text-warning" />
                    {isRTL ? 'تنبيهات الامتثال الذكية' : 'Smart Compliance Alerts'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {complianceAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'warning' ? 'border-warning bg-warning/5' : 'border-primary bg-primary/5'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-800">{alert.title}</h4>
                        <Badge variant={alert.priority === 'عالية' ? 'destructive' : 'secondary'}>
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{alert.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {alert.date}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Compliance Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">{isRTL ? 'نقاط الامتثال' : 'Compliance Score'}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="2"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        strokeDasharray="94, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">94%</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{isRTL ? 'معدل ممتاز' : 'Excellent Rating'}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs with placeholder content */}
          <TabsContent value="governance">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'إدارة الحوكمة' : 'Governance Management'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{isRTL ? 'جاري تطوير وحدة إدارة الحوكمة المتقدمة...' : 'Advanced governance management module coming soon...'}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'إدارة المخاطر' : 'Risk Management'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{isRTL ? 'جاري تطوير وحدة إدارة المخاطر الذكية...' : 'Smart risk management module coming soon...'}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{isRTL ? 'جاري تطوير وحدة التقارير المتقدمة...' : 'Advanced reporting module coming soon...'}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
