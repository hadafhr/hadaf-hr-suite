import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  Activity, 
  Calendar,
  Clock,
  Users,
  Zap,
  Eye,
  BarChart3,
  RefreshCw,
  CheckCircle,
  XCircle,
  Award,
  ThumbsUp,
  ThumbsDown,
  Lightbulb
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AIInsight {
  employee_id: string;
  employee_name: string;
  punctuality_score: number;
  consistency_score: number;
  reliability_score: number;
  overall_score: number;
  trend: 'improving' | 'declining' | 'stable';
  risk_level: 'low' | 'medium' | 'high';
  predictions: any;
  recommendations: string[];
}

export const AIBehaviorAnalysis: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchAIInsights();
  }, []);

  const fetchAIInsights = async () => {
    try {
      const { data: employees, error } = await supabase
        .from('boud_employees')
        .select(`
          id, first_name, last_name,
          attendance_records_new!inner(
            attendance_date, status, late_minutes, 
            early_leave_minutes, attendance_points
          )
        `)
        .eq('is_active', true)
        .limit(10);

      if (error) throw error;

      // محاكاة تحليل الذكاء الاصطناعي
      const aiInsights: AIInsight[] = employees?.map(emp => {
        const records = emp.attendance_records_new || [];
        const totalRecords = records.length;
        const presentDays = records.filter(r => r.status === 'present').length;
        const lateDays = records.filter(r => r.status === 'late').length;
        const totalLateMinutes = records.reduce((sum, r) => sum + (r.late_minutes || 0), 0);
        const avgPoints = records.reduce((sum, r) => sum + (r.attendance_points || 0), 0) / totalRecords;

        // حساب النقاط
        const punctuality = Math.max(0, 100 - (totalLateMinutes / totalRecords));
        const consistency = (presentDays / totalRecords) * 100;
        const reliability = Math.min(100, avgPoints * 10);
        const overall = (punctuality + consistency + reliability) / 3;

        // تحديد الاتجاه
        const recentRecords = records.slice(-7);
        const recentScore = recentRecords.length > 0 ? 
          recentRecords.filter(r => r.status === 'present').length / recentRecords.length * 100 : 0;
        const trend = recentScore > consistency + 5 ? 'improving' : 
                    recentScore < consistency - 5 ? 'declining' : 'stable';

        // تحديد مستوى المخاطر
        const risk_level = overall >= 80 ? 'low' : overall >= 60 ? 'medium' : 'high';

        return {
          employee_id: emp.id,
          employee_name: `${emp.first_name} ${emp.last_name}`,
          punctuality_score: Math.round(punctuality),
          consistency_score: Math.round(consistency),
          reliability_score: Math.round(reliability),
          overall_score: Math.round(overall),
          trend,
          risk_level,
          predictions: {
            next_week_attendance_probability: Math.round(consistency + (Math.random() - 0.5) * 10),
            likely_late_days: Math.round(lateDays / 4 + Math.random() * 2),
            improvement_potential: Math.round((100 - overall) * 0.3)
          },
          recommendations: generateRecommendations(overall, punctuality, consistency, reliability)
        };
      }) || [];

      setInsights(aiInsights.sort((a, b) => b.overall_score - a.overall_score));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      toast.error('خطأ في تحميل تحليلات الذكاء الاصطناعي');
      setLoading(false);
    }
  };

  const generateRecommendations = (overall: number, punctuality: number, consistency: number, reliability: number): string[] => {
    const recommendations = [];
    
    if (punctuality < 70) {
      recommendations.push('يُنصح بتحسين الالتزام بمواعيد الحضور');
      recommendations.push('وضع تذكيرات صباحية للحضور في الوقت المناسب');
    }
    
    if (consistency < 80) {
      recommendations.push('تطوير روتين يومي ثابت للحضور');
      recommendations.push('مناقشة التحديات مع المدير المباشر');
    }
    
    if (reliability < 75) {
      recommendations.push('المشاركة في برامج تطوير الانضباط الوظيفي');
      recommendations.push('وضع أهداف شخصية لتحسين الأداء');
    }
    
    if (overall >= 85) {
      recommendations.push('أداء ممتاز! يمكن أن تكون قدوة للآخرين');
      recommendations.push('النظر في فرص القيادة والإرشاد');
    }
    
    return recommendations;
  };

  const runAIAnalysis = async () => {
    setAnalyzing(true);
    toast.info('جاري تشغيل تحليل الذكاء الاصطناعي...');
    
    // محاكاة وقت التحليل
    setTimeout(() => {
      fetchAIInsights();
      setAnalyzing(false);
      toast.success('تم إكمال التحليل بنجاح');
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  const getRiskBadge = (level: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      low: 'مخاطر منخفضة',
      medium: 'مخاطر متوسطة',
      high: 'مخاطر عالية'
    };

    return (
      <Badge className={colors[level as keyof typeof colors]}>
        {labels[level as keyof typeof labels]}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <Brain className="h-12 w-12 animate-pulse mx-auto mb-4 text-purple-600" />
            <p className="text-lg text-muted-foreground">جاري تحليل أنماط الحضور بالذكاء الاصطناعي...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              تحليلات الذكاء الاصطناعي لسلوك الحضور
            </h1>
            <p className="text-muted-foreground">
              تحليل متقدم لأنماط الحضور مع التنبؤ بالسلوك المستقبلي وتقديم التوصيات الذكية
            </p>
          </div>
          <Button 
            onClick={runAIAnalysis} 
            disabled={analyzing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {analyzing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Brain className="h-4 w-4 mr-2" />
            )}
            {analyzing ? 'جاري التحليل...' : 'تشغيل التحليل الذكي'}
          </Button>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">متوسط الأداء العام</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {Math.round(insights.reduce((sum, i) => sum + i.overall_score, 0) / insights.length)}%
                  </p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">أداء ممتاز</p>
                  <p className="text-2xl font-bold text-green-900">
                    {insights.filter(i => i.overall_score >= 85).length}
                  </p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-amber-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700">يحتاج تحسين</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {insights.filter(i => i.overall_score < 70).length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">اتجاه إيجابي</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {insights.filter(i => i.trend === 'improving').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Analysis Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Employee List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  تحليل الموظفين الفردي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
              {insights.map((insight) => (
                    <div 
                      key={insight.employee_id}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        selectedEmployee === insight.employee_id 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedEmployee(
                        selectedEmployee === insight.employee_id ? null : insight.employee_id
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            getScoreBgColor(insight.overall_score)
                          }`}>
                            <span className={`font-bold ${getScoreColor(insight.overall_score)}`}>
                              {insight.overall_score}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{insight.employee_name}</h4>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(insight.trend)}
                              <span className="text-sm text-muted-foreground capitalize">
                                {insight.trend === 'improving' ? 'تحسن مستمر' :
                                 insight.trend === 'declining' ? 'يحتاج انتباه' : 'مستقر'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getRiskBadge(insight.risk_level)}
                          {insight.overall_score >= 85 && <Award className="h-5 w-5 text-yellow-500" />}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getScoreColor(insight.punctuality_score)}`}>
                            {insight.punctuality_score}%
                          </div>
                          <div className="text-xs text-muted-foreground">الالتزام بالمواعيد</div>
                        </div>
                        
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getScoreColor(insight.consistency_score)}`}>
                            {insight.consistency_score}%
                          </div>
                          <div className="text-xs text-muted-foreground">الانتظام</div>
                        </div>
                        
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getScoreColor(insight.reliability_score)}`}>
                            {insight.reliability_score}%
                          </div>
                          <div className="text-xs text-muted-foreground">الموثوقية</div>
                        </div>
                      </div>

                      <Progress 
                        value={insight.overall_score} 
                        className="h-2"
                      />

                      {selectedEmployee === insight.employee_id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                          {/* Predictions */}
                          <div>
                            <h5 className="font-medium mb-2 flex items-center gap-2">
                              <Eye className="h-4 w-4 text-blue-600" />
                              التنبؤات الذكية
                            </h5>
                            <div className="bg-blue-50 p-3 rounded text-sm space-y-2">
                              <p>• احتمالية الحضور الأسبوع القادم: <strong>{insight.predictions.next_week_attendance_probability}%</strong></p>
                              <p>• الأيام المتوقعة للتأخير: <strong>{insight.predictions.likely_late_days} أيام</strong></p>
                              <p>• إمكانية التحسن: <strong>+{insight.predictions.improvement_potential}%</strong></p>
                            </div>
                          </div>

                          {/* Recommendations */}
                          <div>
                            <h5 className="font-medium mb-2 flex items-center gap-2">
                              <Lightbulb className="h-4 w-4 text-yellow-600" />
                              التوصيات الذكية
                            </h5>
                            <div className="space-y-2">
                              {insight.recommendations.map((rec, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                رؤى الذكاء الاصطناعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Performance Distribution */}
                <div>
                  <h4 className="font-medium mb-3">توزيع الأداء</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ممتاز (85%+)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(insights.filter(i => i.overall_score >= 85).length / insights.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {insights.filter(i => i.overall_score >= 85).length}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">جيد (70-84%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${(insights.filter(i => i.overall_score >= 70 && i.overall_score < 85).length / insights.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {insights.filter(i => i.overall_score >= 70 && i.overall_score < 85).length}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Needs Improvement (&lt;70%)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${(insights.filter(i => i.overall_score < 70).length / insights.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {insights.filter(i => i.overall_score < 70).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trends */}
                <div>
                  <h4 className="font-medium mb-3">الاتجاهات العامة</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-800">تحسن مستمر</div>
                        <div className="text-sm text-green-600">
                          {insights.filter(i => i.trend === 'improving').length} موظف
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <TrendingDown className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-medium text-red-800">يحتاج انتباه</div>
                        <div className="text-sm text-red-600">
                          {insights.filter(i => i.trend === 'declining').length} موظف
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-800">أداء مستقر</div>
                        <div className="text-sm text-blue-600">
                          {insights.filter(i => i.trend === 'stable').length} موظف
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div>
                  <h4 className="font-medium mb-3">توصيات عامة</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <ThumbsUp className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>تنفيذ برامج تحفيزية للموظفين المتميزين</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>وضع خطط تطوير شخصية للموظفين المتعثرين</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-purple-600 mt-0.5" />
                      <span>تطوير سياسات مرونة العمل</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};