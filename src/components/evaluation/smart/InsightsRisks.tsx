import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle,
  Brain,
  TrendingDown,
  Users,
  Eye,
  CheckCircle,
  Clock,
  Zap,
  FileText,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'anomaly' | 'risk' | 'bias' | 'trend';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affected: string[];
  rootCause: string;
  recommendation: string;
  status: 'new' | 'reviewed' | 'addressed';
  detectedAt: string;
  confidence: number;
}

export const InsightsRisks = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [filter, setFilter] = useState<'all' | 'anomaly' | 'risk' | 'bias' | 'trend'>('all');

  // Demo insights data
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      type: 'anomaly',
      severity: 'high',
      title: isRTL ? 'تباين في النتائج - أحمد محمد' : 'Score Variance - Ahmed Mohammed',
      description: isRTL ? 'نتيجة KPI عالية (88) لكن نتيجة 360 منخفضة (65)' : 'High KPI score (88) but low 360 score (65)',
      affected: ['Ahmed Mohammed'],
      rootCause: isRTL ? 'قد يشير إلى مشاكل في التعاون أو التواصل رغم الأداء التقني الجيد' : 'May indicate collaboration or communication issues despite strong technical performance',
      recommendation: isRTL ? 'مراجعة مع المدير وتحسين مهارات التواصل' : 'Manager review and communication skills development',
      status: 'new',
      detectedAt: '2024-01-15T10:30:00Z',
      confidence: 85
    },
    {
      id: '2',
      type: 'risk',
      severity: 'critical',
      title: isRTL ? 'خطر ترك العمل - قسم المبيعات' : 'Attrition Risk - Sales Department',
      description: isRTL ? '3 موظفين يظهرون علامات خطر ترك العمل' : '3 employees showing attrition risk indicators',
      affected: ['Khalid Salem', 'Nora Ali', 'Omar Hassan'],
      rootCause: isRTL ? 'انخفاض في النتائج، قلة التفاعل في الاجتماعات، وتراجع في الإنجاز' : 'Declining scores, reduced meeting participation, and performance volatility',
      recommendation: isRTL ? 'جلسات فردية عاجلة وخطة احتفاظ' : 'Immediate 1:1 sessions and retention planning',
      status: 'new',
      detectedAt: '2024-01-14T15:45:00Z',
      confidence: 92
    },
    {
      id: '3',
      type: 'bias',
      severity: 'medium',
      title: isRTL ? 'تضخم تقييمات - فريق التطوير' : 'Rating Inflation - Development Team',
      description: isRTL ? 'متوسط تقييمات أعلى من المعدل بنسبة 15%' : 'Average ratings 15% higher than organizational norm',
      affected: ['Development Team'],
      rootCause: isRTL ? 'قد يكون بسبب تساهل المدير أو ضغط الفريق' : 'Potential manager leniency or team pressure effects',
      recommendation: isRTL ? 'معايرة التقييمات مع فرق أخرى' : 'Calibration session with other teams',
      status: 'reviewed',
      detectedAt: '2024-01-13T09:15:00Z',
      confidence: 78
    },
    {
      id: '4',
      type: 'trend',
      severity: 'low',
      title: isRTL ? 'تحسن عام في الكفاءات' : 'Overall Competency Improvement',
      description: isRTL ? 'تحسن 8% في متوسط نتائج الكفاءات' : '8% improvement in average competency scores',
      affected: ['All Departments'],
      rootCause: isRTL ? 'برامج التدريب الجديدة تظهر نتائج إيجابية' : 'New training programs showing positive impact',
      recommendation: isRTL ? 'مواصلة البرامج الحالية وتوسيعها' : 'Continue current programs and expand coverage',
      status: 'addressed',
      detectedAt: '2024-01-12T14:20:00Z',
      confidence: 95
    }
  ]);

  const handleRunInsights = () => {
    console.log('Running AI insights analysis...');
    // Simulate new insights discovery
  };

  const handleMarkReviewed = (insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId 
        ? { ...insight, status: 'reviewed' }
        : insight
    ));
  };

  const handleExportFindings = () => {
    console.log('Exporting insights and findings...');
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'anomaly': return AlertTriangle;
      case 'risk': return TrendingDown;
      case 'bias': return Eye;
      case 'trend': return TrendingDown;
      default: return Brain;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return { variant: 'destructive' as const, label: isRTL ? 'جديد' : 'New' };
      case 'reviewed': return { variant: 'secondary' as const, label: isRTL ? 'تمت المراجعة' : 'Reviewed' };
      case 'addressed': return { variant: 'default' as const, label: isRTL ? 'تم العلاج' : 'Addressed' };
      default: return { variant: 'outline' as const, label: isRTL ? 'غير محدد' : 'Unknown' };
    }
  };

  const filteredInsights = filter === 'all' ? insights : insights.filter(insight => insight.type === filter);

  const insightCounts = {
    total: insights.length,
    new: insights.filter(i => i.status === 'new').length,
    high: insights.filter(i => i.severity === 'high' || i.severity === 'critical').length,
    risks: insights.filter(i => i.type === 'risk').length
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isRTL ? 'الرؤى والمخاطر' : 'Insights & Risks'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'رؤى مدعومة بالذكاء الاصطناعي وكشف المخاطر' : 'AI-powered insights and risk detection'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={handleRunInsights} className="gap-2">
            <Brain className="w-4 h-4" />
            {isRTL ? 'تشغيل الرؤى' : 'Run Insights'}
          </Button>
          <Button variant="outline" onClick={handleExportFindings} className="gap-2">
            <FileText className="w-4 h-4" />
            {isRTL ? 'تصدير النتائج' : 'Export Findings'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <Badge className="bg-primary/10 text-primary">{insightCounts.total}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{isRTL ? 'إجمالي الرؤى' : 'Total Insights'}</p>
            <p className="text-3xl font-bold text-foreground">{insightCounts.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <Badge variant="destructive">{insightCounts.new}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{isRTL ? 'رؤى جديدة' : 'New Insights'}</p>
            <p className="text-3xl font-bold text-foreground">{insightCounts.new}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <Badge className="bg-orange-100 text-orange-800">{insightCounts.high}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{isRTL ? 'عالية الأولوية' : 'High Priority'}</p>
            <p className="text-3xl font-bold text-foreground">{insightCounts.high}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <TrendingDown className="w-6 h-6 text-amber-600" />
              </div>
              <Badge className="bg-amber-100 text-amber-800">{insightCounts.risks}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{isRTL ? 'مخاطر محددة' : 'Risk Alerts'}</p>
            <p className="text-3xl font-bold text-foreground">{insightCounts.risks}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'anomaly', 'risk', 'bias', 'trend'].map((type) => (
              <Button
                key={type}
                variant={filter === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(type as any)}
                className="capitalize"
              >
                {type === 'all' ? (isRTL ? 'الكل' : 'All') :
                 type === 'anomaly' ? (isRTL ? 'شذوذ' : 'Anomaly') :
                 type === 'risk' ? (isRTL ? 'مخاطر' : 'Risk') :
                 type === 'bias' ? (isRTL ? 'تحيز' : 'Bias') :
                 type === 'trend' ? (isRTL ? 'اتجاه' : 'Trend') : type}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const statusBadge = getStatusBadge(insight.status);
          
          return (
            <Card 
              key={insight.id} 
              className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedInsight(insight)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${getSeverityColor(insight.severity)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{insight.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(insight.severity)}>
                          {insight.severity === 'critical' ? (isRTL ? 'حرج' : 'Critical') :
                           insight.severity === 'high' ? (isRTL ? 'عالي' : 'High') :
                           insight.severity === 'medium' ? (isRTL ? 'متوسط' : 'Medium') :
                           isRTL ? 'منخفض' : 'Low'}
                        </Badge>
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{insight.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-sm text-foreground mb-1">
                          {isRTL ? 'السبب الجذري' : 'Root Cause'}
                        </h4>
                        <p className="text-sm text-muted-foreground">{insight.rootCause}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-foreground mb-1">
                          {isRTL ? 'التوصية' : 'Recommendation'}
                        </h4>
                        <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {insight.affected.length} {isRTL ? 'متأثر' : 'affected'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {insight.confidence}% {isRTL ? 'ثقة' : 'confidence'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(insight.detectedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      {insight.status === 'new' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkReviewed(insight.id);
                          }}
                          className="gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          {isRTL ? 'تمت المراجعة' : 'Mark Reviewed'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-0 shadow-2xl">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(getInsightIcon(selectedInsight.type), { className: "w-5 h-5 text-primary" })}
                  {selectedInsight.title}
                </CardTitle>
                <Button variant="outline" onClick={() => setSelectedInsight(null)}>
                  {isRTL ? 'إغلاق' : 'Close'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">{isRTL ? 'الوصف' : 'Description'}</h3>
                <p className="text-muted-foreground">{selectedInsight.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{isRTL ? 'الموظفون المتأثرون' : 'Affected Employees'}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedInsight.affected.map((name, index) => (
                    <Badge key={index} variant="outline">{name}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{isRTL ? 'التحليل الجذري' : 'Root Cause Analysis'}</h3>
                <p className="text-muted-foreground">{selectedInsight.rootCause}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{isRTL ? 'الإجراءات الموصى بها' : 'Recommended Actions'}</h3>
                <p className="text-muted-foreground">{selectedInsight.recommendation}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-1">{isRTL ? 'مستوى الثقة' : 'Confidence Level'}</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedInsight.confidence} className="flex-1" />
                    <span className="text-sm font-medium">{selectedInsight.confidence}%</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{isRTL ? 'تاريخ الاكتشاف' : 'Detected At'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedInsight.detectedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};