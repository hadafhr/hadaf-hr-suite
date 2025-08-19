import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  Building2,
  Target,
  DollarSign,
  ArrowRight,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'optimization' | 'efficiency' | 'performance' | 'risk' | 'opportunity';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  recommendation: string;
  impact: string;
  confidence: number;
  metrics?: {
    currentValue: number;
    projectedValue: number;
    improvement: number;
    unit: string;
  };
}

interface AIInsightsProps {
  insights: AIInsight[];
  onApplyRecommendation: (insightId: string) => void;
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights, onApplyRecommendation }) => {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return Building2;
      case 'efficiency': return TrendingUp;
      case 'performance': return Target;
      case 'risk': return AlertTriangle;
      case 'opportunity': return Sparkles;
      default: return Lightbulb;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'efficiency': return 'text-green-600 bg-green-50 border-green-200';
      case 'performance': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'risk': return 'text-red-600 bg-red-50 border-red-200';
      case 'opportunity': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return 'غير محدد';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'optimization': return 'تحسين';
      case 'efficiency': return 'كفاءة';
      case 'performance': return 'أداء';
      case 'risk': return 'خطر';
      case 'opportunity': return 'فرصة';
      default: return 'رؤية';
    }
  };

  // Mock insights if none provided
  const mockInsights: AIInsight[] = [
    {
      id: '1',
      type: 'optimization',
      title: 'تحسين الهيكل التنظيمي',
      description: 'تم اكتشاف تداخل في مهام قسمي التسويق والمبيعات مما يؤدي إلى تضارب في الأولويات وازدواجية العمل',
      priority: 'high',
      recommendation: 'دمج الأقسام تحت إدارة واحدة أو إعادة توزيع المهام بوضوح أكبر',
      impact: 'توفير 15% من التكاليف التشغيلية',
      confidence: 87,
      metrics: {
        currentValue: 100,
        projectedValue: 85,
        improvement: 15,
        unit: '% تكلفة'
      }
    },
    {
      id: '2',
      type: 'efficiency',
      title: 'نسبة الموظفين إلى المدير',
      description: 'قسم تقنية المعلومات يحتوي على 25 موظف تحت مدير واحد، مما يتجاوز النسبة المثلى',
      priority: 'medium',
      recommendation: 'تعيين مدير فرعي أو تقسيم القسم إلى فرق متخصصة',
      impact: 'تحسين الكفاءة بنسبة 20%',
      confidence: 78,
      metrics: {
        currentValue: 25,
        projectedValue: 12,
        improvement: 52,
        unit: 'موظف/مدير'
      }
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'فرصة للنمو في قسم المبيعات',
      description: 'أداء قسم المبيعات متميز ويمكن زيادة العائد من خلال التوسع',
      priority: 'medium',
      recommendation: 'إضافة فريق مبيعات إقليمي جديد',
      impact: 'زيادة العائد بنسبة 30%',
      confidence: 72,
      metrics: {
        currentValue: 1000000,
        projectedValue: 1300000,
        improvement: 30,
        unit: 'ريال'
      }
    },
    {
      id: '4',
      type: 'risk',
      title: 'خطر في قسم الموارد البشرية',
      description: 'نقص في عدد المتخصصين قد يؤثر على العمليات الحيوية',
      priority: 'high',
      recommendation: 'توظيف أخصائي موارد بشرية إضافي',
      impact: 'تجنب تأخير العمليات الحيوية',
      confidence: 92,
    },
    {
      id: '5',
      type: 'performance',
      title: 'أداء متميز - قسم المالية',
      description: 'قسم المالية يحقق أداءً ممتازاً في جميع المؤشرات',
      priority: 'low',
      recommendation: 'برنامج حوافز للفريق والاستفادة من خبراتهم',
      impact: 'الحفاظ على مستوى الأداء العالي',
      confidence: 95,
    }
  ];

  const displayInsights = insights.length > 0 ? insights : mockInsights;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">رؤى نشطة</p>
              <p className="text-lg font-bold">{displayInsights.length}</p>
            </div>
            <Lightbulb className="h-5 w-5 text-blue-500" />
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">أولوية عالية</p>
              <p className="text-lg font-bold text-red-600">
                {displayInsights.filter(i => i.priority === 'high').length}
              </p>
            </div>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Insights List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayInsights.map((insight) => {
          const TypeIcon = getTypeIcon(insight.type);
          const isExpanded = expandedInsight === insight.id;
          
          return (
            <Card 
              key={insight.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${getTypeColor(insight.type)}`}
            >
              <CardContent className="p-4">
                <div 
                  className="space-y-3"
                  onClick={() => setExpandedInsight(isExpanded ? null : insight.id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <TypeIcon className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold truncate">
                          {insight.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${getPriorityColor(insight.priority)}`}>
                            {getPriorityText(insight.priority)}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {getTypeText(insight.type)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <BarChart3 className="h-3 w-3" />
                        <span>{insight.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <Progress 
                    value={insight.confidence} 
                    className="h-1"
                  />

                  {/* Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {insight.description}
                  </p>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="space-y-3 pt-2 border-t border-border/50">
                      {/* Metrics */}
                      {insight.metrics && (
                        <div className="bg-white/50 rounded-lg p-3">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-xs text-muted-foreground">الحالي</p>
                              <p className="text-sm font-semibold">
                                {insight.metrics.currentValue.toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {insight.metrics.unit}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">المتوقع</p>
                              <p className="text-sm font-semibold text-green-600">
                                {insight.metrics.projectedValue.toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {insight.metrics.unit}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">التحسن</p>
                              <p className="text-sm font-semibold text-blue-600">
                                {insight.metrics.improvement > 0 ? '+' : ''}{insight.metrics.improvement}%
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Recommendation */}
                      <div className="bg-white/50 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-green-600 mb-1">
                              التوصية
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {insight.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Impact */}
                      <div className="bg-white/50 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-blue-600 mb-1">
                              التأثير المتوقع
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {insight.impact}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1 text-xs h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            onApplyRecommendation(insight.id);
                          }}
                        >
                          تطبيق التوصية
                          <ArrowRight className="h-3 w-3 mr-1" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          تفاصيل
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {displayInsights.length === 0 && (
        <div className="text-center py-8">
          <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            لا توجد رؤى حالياً
          </h3>
          <p className="text-xs text-muted-foreground">
            سيتم إنشاء رؤى ذكية عند توفر البيانات الكافية
          </p>
        </div>
      )}
    </div>
  );
};

export default AIInsights;