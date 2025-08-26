import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  MessageCircle, 
  Sparkles, 
  Brain,
  Zap,
  Search,
  FileText,
  Calculator,
  AlertTriangle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface AIAssistantPreviewProps {
  language?: 'ar' | 'en';
  onStartConversation?: () => void;
  onQuestionClick?: (question: string) => void;
}

export const AIAssistantPreview: React.FC<AIAssistantPreviewProps> = ({ 
  language = 'ar',
  onStartConversation,
  onQuestionClick
}) => {
  const isRTL = language === 'ar';

  const features = isRTL ? [
    {
      icon: MessageCircle,
      title: 'الرد الفوري',
      description: 'إجابات سريعة ودقيقة على جميع استفساراتك'
    },
    {
      icon: Search,
      title: 'البحث الذكي',
      description: 'العثور على المعلومات في النظام بسرعة'
    },
    {
      icon: Calculator,
      title: 'العمليات الحسابية',
      description: 'حساب الرواتب والمستحقات تلقائياً'
    },
    {
      icon: FileText,
      title: 'توليد التقارير',
      description: 'إنشاء تقارير مخصصة حسب احتياجاتك'
    },
    {
      icon: AlertTriangle,
      title: 'التنبيهات الذكية',
      description: 'تنبيهات للمواعيد المهمة والالتزامات'
    },
    {
      icon: TrendingUp,
      title: 'التحليلات المتقدمة',
      description: 'تحليل البيانات واقتراحات التحسين'
    }
  ] : [
    {
      icon: MessageCircle,
      title: 'Instant Response',
      description: 'Quick and accurate answers to all your inquiries'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find information in the system quickly'
    },
    {
      icon: Calculator,
      title: 'Calculations',
      description: 'Automatic salary and benefits calculations'
    },
    {
      icon: FileText,
      title: 'Report Generation',
      description: 'Create custom reports based on your needs'
    },
    {
      icon: AlertTriangle,
      title: 'Smart Alerts',
      description: 'Alerts for important dates and obligations'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Data analysis and improvement suggestions'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <img 
                src="/lovable-uploads/2d27423b-8bca-468b-802c-9a3666f5fe90.png" 
                alt="BOUD HR Assistant" 
                className="w-16 h-16"
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full animate-pulse border-2 border-background" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-primary mb-2">
                {isRTL ? 'مساعد بُعد HR الذكي' : 'BOUD HR AI Assistant'}
              </h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">
                  {isRTL ? 'مدعوم بالذكاء الاصطناعي المتقدم' : 'Powered by Advanced AI'}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isRTL 
              ? 'مساعدك الذكي المتاح 24/7 للإجابة على جميع استفساراتك في الموارد البشرية، وإرشادك خطوة بخطوة، وتقديم الحلول الذكية لجميع احتياجاتك الإدارية'
              : 'Your 24/7 AI assistant ready to answer all your HR inquiries, guide you step-by-step, and provide smart solutions for all your administrative needs'
            }
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 via-muted/10 to-primary/5 border-primary/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <Brain className="w-8 h-8 text-primary" />
              {isRTL ? 'جرب المساعد الذكي الآن' : 'Try the AI Assistant Now'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4 mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {(isRTL ? [
                  'كيف أحسب راتب الموظف؟',
                  'ما هو الجزاء المناسب للتأخير؟',
                  'كيف أقدم طلب إجازة؟',
                  'شرح نظام تقييم الأداء'
                ] : [
                  'How to calculate employee salary?',
                  'What penalty for tardiness?',
                  'How to submit leave request?',
                  'Explain performance evaluation'
                ]).map((question, index) => (
                  <div
                    key={index}
                    onClick={() => onQuestionClick?.(question)}
                    className="px-4 py-2 bg-background/80 rounded-full text-sm text-muted-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    "{question}"
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {isRTL ? 'متاح 24/7 | رد فوري | بدقة عالية' : 'Available 24/7 | Instant Response | High Accuracy'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="gap-2" onClick={onStartConversation}>
                <MessageCircle className="w-5 h-5" />
                {isRTL ? 'ابدأ المحادثة' : 'Start Conversation'}
              </Button>
              <p className="text-sm text-muted-foreground">
                {isRTL 
                  ? 'انقر على أيقونة المساعد الذكي في أسفل الصفحة'
                  : 'Click the AI assistant icon at the bottom of the page'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIAssistantPreview;