import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Brain, Bot, MessageSquare, Search, Plus, TrendingUp, Zap } from 'lucide-react';

interface ArtificialIntelligenceProps {
  onBack: () => void;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'performance' | 'attendance' | 'recruitment' | 'prediction';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  recommendation: string;
  generatedDate: string;
}

interface ChatBot {
  id: string;
  name: string;
  purpose: string;
  status: 'active' | 'training' | 'inactive';
  interactions: number;
  accuracy: number;
  lastUpdated: string;
}

export const ArtificialIntelligence: React.FC<ArtificialIntelligenceProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const aiInsights: AIInsight[] = [
    {
      id: '1',
      title: 'انخفاض في أداء فريق التطوير',
      description: 'تم اكتشاف انخفاض بنسبة 15% في إنتاجية فريق التطوير خلال الشهر الماضي',
      type: 'performance',
      confidence: 92,
      impact: 'high',
      recommendation: 'يُنصح بإجراء اجتماع مع الفريق لمناقشة التحديات وتوفير الدعم اللازم',
      generatedDate: '2024-02-10'
    },
    {
      id: '2',
      title: 'نمط تأخير متكرر في قسم المبيعات',
      description: 'الذكاء الاصطناعي اكتشف نمطاً متكرراً في التأخير لدى 3 موظفين في قسم المبيعات',
      type: 'attendance',
      confidence: 87,
      impact: 'medium',
      recommendation: 'مراجعة جداول العمل وتطبيق سياسة مرونة أوقات العمل',
      generatedDate: '2024-02-08'
    },
    {
      id: '3',
      title: 'توقع زيادة في الطلب على التوظيف',
      description: 'التحليل التنبؤي يشير إلى زيادة متوقعة بنسبة 25% في احتياجات التوظيف خلال الربع القادم',
      type: 'prediction',
      confidence: 78,
      impact: 'high',
      recommendation: 'البدء في إعداد خطة التوظيف وتحديث قاعدة بيانات المرشحين',
      generatedDate: '2024-02-05'
    }
  ];

  const chatBots: ChatBot[] = [
    {
      id: '1',
      name: 'مساعد الموارد البشرية',
      purpose: 'الإجابة على استفسارات الموظفين حول السياسات والإجراءات',
      status: 'active',
      interactions: 1247,
      accuracy: 94.5,
      lastUpdated: '2024-02-10'
    },
    {
      id: '2',
      name: 'مساعد التوظيف الذكي',
      purpose: 'مساعدة المرشحين في عملية التقديم وتقييم السير الذاتية',
      status: 'active',
      interactions: 892,
      accuracy: 89.2,
      lastUpdated: '2024-02-08'
    },
    {
      id: '3',
      name: 'محلل الأداء الذكي',
      purpose: 'تحليل بيانات الأداء وتقديم توصيات للتحسين',
      status: 'training',
      interactions: 0,
      accuracy: 0,
      lastUpdated: '2024-02-01'
    }
  ];

  const getInsightTypeBadge = (type: string) => {
    const typeConfig = {
      performance: { text: isRTL ? 'الأداء' : 'Performance', className: 'bg-blue-100 text-blue-800' },
      attendance: { text: isRTL ? 'الحضور' : 'Attendance', className: 'bg-green-100 text-green-800' },
      recruitment: { text: isRTL ? 'التوظيف' : 'Recruitment', className: 'bg-purple-100 text-purple-800' },
      prediction: { text: isRTL ? 'التنبؤ' : 'Prediction', className: 'bg-orange-100 text-orange-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getImpactBadge = (impact: string) => {
    const impactConfig = {
      high: { text: isRTL ? 'عالي' : 'High', className: 'bg-red-100 text-red-800' },
      medium: { text: isRTL ? 'متوسط' : 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      low: { text: isRTL ? 'منخفض' : 'Low', className: 'bg-green-100 text-green-800' }
    };
    return impactConfig[impact as keyof typeof impactConfig];
  };

  const getBotStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: isRTL ? 'نشط' : 'Active', className: 'bg-green-100 text-green-800' },
      training: { text: isRTL ? 'تدريب' : 'Training', className: 'bg-yellow-100 text-yellow-800' },
      inactive: { text: isRTL ? 'غير نشط' : 'Inactive', className: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredInsights = aiInsights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insight.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || insight.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'الذكاء الاصطناعي' : 'Artificial Intelligence'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'أدوات وتحليلات الذكاء الاصطناعي للموارد البشرية' : 'AI-powered tools and analytics for HR management'}
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {isRTL ? 'نموذج جديد' : 'New AI Model'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'التحليلات النشطة' : 'Active Insights'}
                  </p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'المساعدات الآلية' : 'AI Assistants'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">3</p>
                </div>
                <Bot className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'التفاعلات اليومية' : 'Daily Interactions'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">156</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'دقة التنبؤات' : 'Prediction Accuracy'}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">91%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList>
            <TabsTrigger value="insights">{isRTL ? 'الرؤى الذكية' : 'AI Insights'}</TabsTrigger>
            <TabsTrigger value="assistants">{isRTL ? 'المساعدات الآلية' : 'AI Assistants'}</TabsTrigger>
            <TabsTrigger value="automation">{isRTL ? 'الأتمتة' : 'Automation'}</TabsTrigger>
          </TabsList>

          <TabsContent value="insights">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في الرؤى الذكية...' : 'Search AI insights...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* AI Insights List */}
            <div className="space-y-6">
              {filteredInsights.map((insight) => {
                const typeBadge = getInsightTypeBadge(insight.type);
                const impactBadge = getImpactBadge(insight.impact);
                
                return (
                  <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <CardTitle className="text-lg">{insight.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={typeBadge.className}>
                            {typeBadge.text}
                          </Badge>
                          <Badge className={impactBadge.className}>
                            {impactBadge.text}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{isRTL ? 'مستوى الثقة' : 'Confidence'}</p>
                            <p className={`text-2xl font-bold ${getConfidenceColor(insight.confidence)}`}>
                              {insight.confidence}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">
                            {isRTL ? 'التوصية' : 'Recommendation'}
                          </h4>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">{insight.recommendation}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{isRTL ? 'تاريخ الإنشاء:' : 'Generated:'}</span>
                          <span className="font-medium">{insight.generatedDate}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'تطبيق التوصية' : 'Apply Recommendation'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'تجاهل' : 'Dismiss'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="assistants">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chatBots.map((bot) => {
                const statusBadge = getBotStatusBadge(bot.status);
                
                return (
                  <Card key={bot.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{bot.name}</CardTitle>
                        <Badge className={statusBadge.className}>
                          {statusBadge.text}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{bot.purpose}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">{isRTL ? 'التفاعلات' : 'Interactions'}</p>
                            <p className="text-2xl font-bold text-primary">{bot.interactions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">{isRTL ? 'الدقة' : 'Accuracy'}</p>
                            <p className={`text-2xl font-bold ${getConfidenceColor(bot.accuracy)}`}>
                              {bot.accuracy}%
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{isRTL ? 'آخر تحديث:' : 'Last Updated:'}</span>
                          <span className="font-medium">{bot.lastUpdated}</span>
                        </div>

                        {bot.accuracy > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{isRTL ? 'مستوى الأداء' : 'Performance Level'}</span>
                              <span>{bot.accuracy}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all" 
                                style={{ width: `${bot.accuracy}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'تفاعل' : 'Interact'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'إعدادات' : 'Configure'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="automation">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  {isRTL ? 'أتمتة العمليات' : 'Process Automation'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'إعداد وإدارة العمليات الآلية للموارد البشرية' : 'Set up and manage automated HR processes'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};