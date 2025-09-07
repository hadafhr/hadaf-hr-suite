import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  Zap,
  BarChart3,
  Users,
  DollarSign,
  Activity,
  RefreshCw,
  Lightbulb,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionRequired: boolean;
  createdAt: Date;
}

interface PredictionData {
  month: string;
  clients: number;
  revenue: number;
  predicted_clients: number;
  predicted_revenue: number;
}

export const AIInsightsDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);

  // Mock AI insights data
  useEffect(() => {
    const mockInsights: AIInsight[] = [
      {
        id: '1',
        type: 'prediction',
        title: isArabic ? 'توقع نمو العملاء' : 'Client Growth Prediction',
        description: isArabic ? 'متوقع زيادة بنسبة 23% في العملاء خلال الشهرين القادمين' : 'Predicted 23% increase in clients over next 2 months',
        confidence: 87,
        impact: 'high',
        category: 'Growth',
        actionRequired: false,
        createdAt: new Date()
      },
      {
        id: '2',
        type: 'alert',
        title: isArabic ? 'تحذير من انخفاض الأداء' : 'Performance Decline Alert',
        description: isArabic ? 'انخفاض في معدل رضا العملاء بنسبة 12%' : '12% drop in client satisfaction detected',
        confidence: 94,
        impact: 'high',
        category: 'Performance',
        actionRequired: true,
        createdAt: new Date()
      },
      {
        id: '3',
        type: 'optimization',
        title: isArabic ? 'تحسين الموارد' : 'Resource Optimization',
        description: isArabic ? 'يمكن توفير 15% من التكاليف عبر إعادة توزيع الموارد' : 'Potential 15% cost savings through resource redistribution',
        confidence: 78,
        impact: 'medium',
        category: 'Efficiency',
        actionRequired: false,
        createdAt: new Date()
      },
      {
        id: '4',
        type: 'recommendation',
        title: isArabic ? 'توصية للتوسع' : 'Expansion Recommendation',
        description: isArabic ? 'الوقت المناسب للتوسع في السوق الجنوبي' : 'Optimal timing for southern market expansion',
        confidence: 82,
        impact: 'high',
        category: 'Strategy',
        actionRequired: false,
        createdAt: new Date()
      }
    ];
    setInsights(mockInsights);
  }, [isArabic]);

  const predictionData: PredictionData[] = [
    { month: 'يناير', clients: 156, revenue: 2400000, predicted_clients: 162, predicted_revenue: 2520000 },
    { month: 'فبراير', clients: 168, revenue: 2640000, predicted_clients: 175, predicted_revenue: 2750000 },
    { month: 'مارس', clients: 172, revenue: 2680000, predicted_clients: 185, predicted_revenue: 2900000 },
    { month: 'أبريل', clients: 0, revenue: 0, predicted_clients: 195, predicted_revenue: 3100000 },
    { month: 'مايو', clients: 0, revenue: 0, predicted_clients: 205, predicted_revenue: 3250000 },
    { month: 'يونيو', clients: 0, revenue: 0, predicted_clients: 215, predicted_revenue: 3400000 }
  ];

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction': return TrendingUp;
      case 'alert': return AlertTriangle;
      case 'optimization': return Zap;
      case 'recommendation': return Lightbulb;
      default: return Brain;
    }
  };

  const getImpactColor = (impact: AIInsight['impact']) => {
    switch (impact) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const refreshInsights = async () => {
    setLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {isArabic ? 'لوحة الذكاء الاصطناعي' : 'AI Intelligence Dashboard'}
            </h2>
            <p className="text-muted-foreground">
              {isArabic ? 'تحليلات ذكية وتنبؤات مدعومة بالذكاء الاصطناعي' : 'AI-powered insights and predictive analytics'}
            </p>
          </div>
        </div>
        <Button onClick={refreshInsights} disabled={loading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {isArabic ? 'تحديث التحليلات' : 'Refresh Insights'}
        </Button>
      </div>

      {/* AI Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {isArabic ? 'دقة التنبؤ' : 'Prediction Accuracy'}
              </p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">94.2%</p>
            </div>
            <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                {isArabic ? 'التحسينات المطبقة' : 'Optimizations Applied'}
              </p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">12</p>
            </div>
            <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {isArabic ? 'الوفورات المحققة' : 'Cost Savings'}
              </p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">₺340K</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                {isArabic ? 'مؤشر الأداء' : 'Performance Index'}
              </p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">8.7/10</p>
            </div>
            <Activity className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              {isArabic ? 'تحليلات ذكية' : 'AI Insights'}
            </h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {insights.length} {isArabic ? 'تحليل جديد' : 'New Insights'}
            </Badge>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {insights.map((insight) => {
              const IconComponent = getInsightIcon(insight.type);
              return (
                <div key={insight.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className={`p-2 rounded-lg ${insight.actionRequired ? 'bg-red-100 dark:bg-red-900' : 'bg-primary/10'}`}>
                      <IconComponent className={`h-4 w-4 ${insight.actionRequired ? 'text-red-600 dark:text-red-400' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{insight.title}</h4>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Badge variant="outline" className={getImpactColor(insight.impact)}>
                            {insight.impact}
                          </Badge>
                          {insight.actionRequired && (
                            <Badge variant="destructive" className="text-xs">
                              {isArabic ? 'يتطلب إجراء' : 'Action Required'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-xs text-muted-foreground">
                            {isArabic ? 'الثقة:' : 'Confidence:'}
                          </span>
                          <Progress value={insight.confidence} className="w-20 h-2" />
                          <span className="text-xs font-medium">{insight.confidence}%</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{isArabic ? 'منذ ساعة' : '1h ago'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Predictive Analytics Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              {isArabic ? 'التنبؤات الذكية' : 'Predictive Analytics'}
            </h3>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              {isArabic ? 'تفاصيل' : 'Details'}
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                value?.toLocaleString(),
                name === 'clients' ? (isArabic ? 'العملاء الحاليون' : 'Current Clients') :
                name === 'predicted_clients' ? (isArabic ? 'العملاء المتوقعون' : 'Predicted Clients') :
                name === 'revenue' ? (isArabic ? 'الإيرادات الحالية' : 'Current Revenue') :
                (isArabic ? 'الإيرادات المتوقعة' : 'Predicted Revenue')
              ]} />
              <Area
                type="monotone"
                dataKey="clients"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
                name="clients"
              />
              <Area
                type="monotone"
                dataKey="predicted_clients"
                stackId="2"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.4}
                strokeDasharray="5 5"
                name="predicted_clients"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
        <div className="flex items-center space-x-3 space-x-reverse mb-4">
          <Lightbulb className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {isArabic ? 'توصيات ذكية' : 'AI Recommendations'}
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-background/50 rounded-lg border border-border/50">
            <h4 className="font-medium text-foreground mb-2">
              {isArabic ? 'تحسين العمليات' : 'Process Optimization'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {isArabic ? 'يمكن تحسين كفاءة العمليات بنسبة 18% من خلال أتمتة المهام المتكررة' : 'Improve operational efficiency by 18% through automation of repetitive tasks'}
            </p>
          </div>
          <div className="p-4 bg-background/50 rounded-lg border border-border/50">
            <h4 className="font-medium text-foreground mb-2">
              {isArabic ? 'توسيع الخدمات' : 'Service Expansion'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {isArabic ? 'إضافة خدمات الاستشارات المالية قد تزيد الإيرادات بنسبة 25%' : 'Adding financial consulting services could increase revenue by 25%'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};