import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, Lightbulb, TrendingUp, DollarSign, Shield, 
  AlertTriangle, CheckCircle, Clock, Target, Sparkles,
  ThumbsUp, ThumbsDown, MoreHorizontal, RefreshCw
} from 'lucide-react';

const AIInsuranceRecommendations = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [refreshing, setRefreshing] = useState(false);

  const recommendations = [
    {
      id: 1,
      type: 'cost_optimization',
      priority: 'high',
      title: isRTL ? 'تحسين تكلفة التأمين الصحي - فرع الرياض' : 'Health Insurance Cost Optimization - Riyadh Branch',
      description: isRTL ? 'يمكن توفير 45,000 ريال سنوياً بالتبديل إلى مزود بديل مع نفس مستوى التغطية' : 'Save 45,000 SAR annually by switching to alternative provider with same coverage level',
      potentialSavings: 45000,
      confidence: 94,
      impact: 'high',
      timeframe: isRTL ? '30 يوم' : '30 days',
      category: 'health',
      reasons: [
        isRTL ? 'تحليل مقارن للأسعار يظهر توفر خيارات أفضل' : 'Comparative pricing analysis shows better options available',
        isRTL ? 'تاريخ مطالبات ممتاز للفرع' : 'Excellent claims history for this branch',
        isRTL ? 'التغطية المقترحة تفوق المتطلبات الدنيا بـ 15%' : 'Proposed coverage exceeds minimum requirements by 15%'
      ],
      risks: [
        isRTL ? 'فترة انتظار 60 يوم للحالات الموجودة مسبقاً' : '60-day waiting period for pre-existing conditions'
      ],
      status: 'pending',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      type: 'coverage_enhancement',
      priority: 'medium',
      title: isRTL ? 'تحسين تغطية تأمين الأسطول - المنطقة الشرقية' : 'Fleet Insurance Coverage Enhancement - Eastern Region',
      description: isRTL ? 'إضافة تغطية شاملة للكوارث الطبيعية مع زيادة قسط محدودة' : 'Add comprehensive natural disaster coverage with limited premium increase',
      potentialSavings: -12000,
      confidence: 87,
      impact: 'medium',
      timeframe: isRTL ? '45 يوم' : '45 days',
      category: 'fleet',
      reasons: [
        isRTL ? 'زيادة الأحداث المناخية الطارئة في المنطقة' : 'Increased extreme weather events in the region',
        isRTL ? 'الغطاء الحالي لا يشمل أضرار الفيضانات' : 'Current coverage excludes flood damage',
        isRTL ? 'تحليل المخاطر يظهر احتمالية عالية للأضرار' : 'Risk analysis shows high probability of damages'
      ],
      risks: [
        isRTL ? 'زيادة القسط السنوي بـ 12,000 ريال' : 'Annual premium increase of 12,000 SAR'
      ],
      status: 'approved',
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      type: 'policy_consolidation',
      priority: 'high',
      title: isRTL ? 'دمج وثائق تأمين الأصول - جميع الفروع' : 'Asset Insurance Policy Consolidation - All Branches',
      description: isRTL ? 'دمج 12 وثيقة منفصلة في وثيقة شاملة واحدة للحصول على خصومات الكمية' : 'Consolidate 12 separate policies into one comprehensive policy for volume discounts',
      potentialSavings: 78000,
      confidence: 91,
      impact: 'high',
      timeframe: isRTL ? '60 يوم' : '60 days',
      category: 'assets',
      reasons: [
        isRTL ? 'خصومات الكمية تصل إلى 18% من إجمالي الأقساط' : 'Volume discounts up to 18% of total premiums',
        isRTL ? 'تبسيط عمليات المطالبات والإدارة' : 'Simplified claims and administration processes',
        isRTL ? 'تغطية موحدة تقلل من الثغرات التأمينية' : 'Unified coverage reduces insurance gaps'
      ],
      risks: [
        isRTL ? 'تعقيد عملية الانتقال' : 'Complex transition process',
        isRTL ? 'حاجة لمراجعة جميع الأصول' : 'Need to review all assets'
      ],
      status: 'implementing',
      createdAt: '2024-01-10'
    },
    {
      id: 4,
      type: 'risk_mitigation',
      priority: 'medium',
      title: isRTL ? 'تحسين برنامج السلامة لتقليل مطالبات إصابات العمل' : 'Safety Program Enhancement to Reduce Work Injury Claims',
      description: isRTL ? 'استثمار في برامج السلامة لتقليل أقساط تأمين إصابات العمل' : 'Invest in safety programs to reduce work injury insurance premiums',
      potentialSavings: 32000,
      confidence: 82,
      impact: 'medium',
      timeframe: isRTL ? '90 يوم' : '90 days',
      category: 'safety',
      reasons: [
        isRTL ? 'ارتفاع معدل إصابات العمل بنسبة 15% العام الماضي' : '15% increase in work injury rate last year',
        isRTL ? 'برامج السلامة تقلل المطالبات بنسبة 40%' : 'Safety programs reduce claims by 40%',
        isRTL ? 'خصومات على الأقساط للشركات ذات السجل الجيد' : 'Premium discounts for companies with good safety records'
      ],
      risks: [
        isRTL ? 'تكلفة استثمار أولية في البرامج' : 'Initial investment cost in programs'
      ],
      status: 'pending',
      createdAt: '2024-01-08'
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: <Badge className="bg-yellow-100 text-yellow-800">⏳ قيد المراجعة</Badge>,
      approved: <Badge className="bg-green-100 text-green-800">✅ مُعتمد</Badge>,
      implementing: <Badge className="bg-blue-100 text-blue-800">🔄 قيد التنفيذ</Badge>,
      rejected: <Badge className="bg-red-100 text-red-800">❌ مرفوض</Badge>
    };
    return badges[status] || badges.pending;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: <Badge className="bg-red-100 text-red-800">🔴 عالية</Badge>,
      medium: <Badge className="bg-yellow-100 text-yellow-800">🟡 متوسطة</Badge>,
      low: <Badge className="bg-green-100 text-green-800">🟢 منخفضة</Badge>
    };
    return badges[priority] || badges.medium;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      health: '🏥',
      fleet: '🚗',
      assets: '🏢',
      safety: '⛑️'
    };
    return icons[category] || '📋';
  };

  const refreshRecommendations = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      {/* Header */}
      <Card className="border-0 shadow-lg bg-white/95">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3CB593] to-[#2da574] rounded-2xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  {isRTL ? 'توصيات الذكاء الاصطناعي' : 'AI Insurance Recommendations'}
                </h3>
                <p className="text-gray-600">
                  {isRTL ? 'توصيات ذكية لتحسين التأمينات وتقليل التكاليف' : 'Smart recommendations to optimize insurance and reduce costs'}
                </p>
              </div>
            </div>
            
            <Button 
              onClick={refreshRecommendations}
              disabled={refreshing}
              className="bg-gradient-to-r from-[#3CB593] to-[#2da574]"
            >
              <RefreshCw className={`h-4 w-4 ml-2 ${refreshing ? 'animate-spin' : ''}`} />
              {isRTL ? 'تحديث التوصيات' : 'Refresh Recommendations'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <Lightbulb className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-blue-800">{recommendations.length}</p>
            <p className="text-sm text-blue-600">{isRTL ? 'توصيات نشطة' : 'Active Recommendations'}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-green-800">143K</p>
            <p className="text-sm text-green-600">{isRTL ? 'وفورات محتملة' : 'Potential Savings'}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-purple-800">89%</p>
            <p className="text-sm text-purple-600">{isRTL ? 'متوسط الثقة' : 'Average Confidence'}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-orange-800">2</p>
            <p className="text-sm text-orange-600">{isRTL ? 'قيد التنفيذ' : 'Being Implemented'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations List */}
      <div className="space-y-6">
        {recommendations.map((recommendation) => (
          <Card key={recommendation.id} className="border-0 shadow-lg bg-white/95 hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">{getCategoryIcon(recommendation.category)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg text-black">{recommendation.title}</CardTitle>
                      {getPriorityBadge(recommendation.priority)}
                      {getStatusBadge(recommendation.status)}
                    </div>
                    <p className="text-gray-600 mb-3">{recommendation.description}</p>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className={`font-semibold ${
                          recommendation.potentialSavings >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {recommendation.potentialSavings >= 0 ? '+' : ''}{(recommendation.potentialSavings / 1000).toFixed(0)}K SAR
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          {isRTL ? 'الثقة:' : 'Confidence:'} {recommendation.confidence}%
                        </span>
                        <Progress value={recommendation.confidence} className="w-16 h-2" />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-gray-600">{recommendation.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Reasons */}
                <div>
                  <h5 className="font-semibold text-black mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {isRTL ? 'الأسباب والفوائد:' : 'Reasons & Benefits:'}
                  </h5>
                  <ul className="space-y-2">
                    {recommendation.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Risks */}
                <div>
                  <h5 className="font-semibold text-black mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    {isRTL ? 'المخاطر والاعتبارات:' : 'Risks & Considerations:'}
                  </h5>
                  <ul className="space-y-2">
                    {recommendation.risks.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></span>
                        <span className="text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  {isRTL ? 'تاريخ الإنشاء:' : 'Created:'} {recommendation.createdAt}
                </div>
                
                <div className="flex items-center gap-3">
                  {recommendation.status === 'pending' && (
                    <>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        <ThumbsDown className="h-4 w-4 ml-1" />
                        {isRTL ? 'رفض' : 'Reject'}
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <ThumbsUp className="h-4 w-4 ml-1" />
                        {isRTL ? 'موافقة' : 'Approve'}
                      </Button>
                    </>
                  )}
                  
                  {recommendation.status === 'approved' && (
                    <Button size="sm" className="bg-[#3CB593] hover:bg-[#2da574]">
                      <Sparkles className="h-4 w-4 ml-1" />
                      {isRTL ? 'بدء التنفيذ' : 'Start Implementation'}
                    </Button>
                  )}
                  
                  {recommendation.status === 'implementing' && (
                    <Button size="sm" variant="outline">
                      <Clock className="h-4 w-4 ml-1" />
                      {isRTL ? 'متابعة التقدم' : 'Track Progress'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIInsuranceRecommendations;