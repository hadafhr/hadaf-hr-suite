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
  CreditCard,
  Clock,
  TrendingUp,
  HelpCircle,
  Package,
  Users
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
      icon: HelpCircle,
      title: 'استفسارات النظام',
      description: 'إجابات شاملة عن ميزات وخصائص أنظمة بُعد HR'
    },
    {
      icon: Package,
      title: 'معلومات الباقات',
      description: 'تفاصيل كاملة عن جميع باقات الاشتراك والأسعار'
    },
    {
      icon: Calculator,
      title: 'حساب التكلفة',
      description: 'حساب تكلفة الاشتراك المناسب لعدد موظفيك'
    },
    {
      icon: FileText,
      title: 'شرح الميزات',
      description: 'توضيح مفصل لجميع ميزات النظام وكيفية استخدامها'
    },
    {
      icon: Zap,
      title: 'مقارنة الخطط',
      description: 'مقارنة شاملة بين الباقات لاختيار الأنسب'
    },
    {
      icon: CreditCard,
      title: 'طرق الاشتراك',
      description: 'معلومات عن طرق الدفع وآلية الاشتراك'
    }
  ] : [
    {
      icon: HelpCircle,
      title: 'System Inquiries',
      description: 'Comprehensive answers about BOUD HR system features'
    },
    {
      icon: Package,
      title: 'Package Information',
      description: 'Complete details about all subscription packages and pricing'
    },
    {
      icon: Calculator,
      title: 'Cost Calculation',
      description: 'Calculate suitable subscription cost for your employee count'
    },
    {
      icon: FileText,
      title: 'Feature Explanation',
      description: 'Detailed explanation of all system features and usage'
    },
    {
      icon: Zap,
      title: 'Plan Comparison',
      description: 'Comprehensive comparison between packages to choose best fit'
    },
    {
      icon: CreditCard,
      title: 'Subscription Methods',
      description: 'Information about payment methods and subscription process'
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
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full animate-pulse border-2 border-background" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-primary mb-2">
                {isRTL ? 'مساعد بُعد HR للاستفسارات' : 'BOUD HR Inquiry Assistant'}
              </h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">
                  {isRTL ? 'متخصص في النظام والباقات والاشتراك' : 'Specialized in System, Packages & Subscriptions'}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isRTL 
              ? 'مساعدك المتخصص للإجابة على جميع استفساراتك حول أنظمة بُعد HR، الباقات المتاحة، الأسعار، الميزات، وطرق الاشتراك. احصل على معلومات دقيقة ومساعدة فورية لاختيار الحل المناسب لشركتك'
              : 'Your specialized assistant to answer all inquiries about BOUD HR systems, available packages, pricing, features, and subscription methods. Get accurate information and instant help to choose the right solution for your company'
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
              {isRTL ? 'اسأل عن أي شيء متعلق بالنظام' : 'Ask Anything About The System'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4 mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {(isRTL ? [
                  'ما هي الباقات المتاحة وأسعارها؟',
                  'كم تكلفة النظام لـ 50 موظف؟',
                  'ما الفرق بين الباقة الأساسية والمتقدمة؟',
                  'كيف يمكنني الاشتراك في النظام؟',
                  'ما هي ميزات نظام إدارة الحضور؟',
                  'هل يوجد فترة تجريبية مجانية؟'
                ] : [
                  'What packages are available and their prices?',
                  'How much does the system cost for 50 employees?',
                  'What\'s the difference between basic and advanced?',
                  'How can I subscribe to the system?',
                  'What are the attendance management features?',
                  'Is there a free trial period?'
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
              
              <div className="flex items-center justify-center gap-2 text-success">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {isRTL ? 'متاح 24/7 | معلومات دقيقة | إرشاد متخصص' : 'Available 24/7 | Accurate Information | Expert Guidance'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="gap-2" onClick={onStartConversation}>
                <MessageCircle className="w-5 h-5" />
                {isRTL ? 'ابدأ الاستفسار' : 'Start Inquiry'}
              </Button>
              <p className="text-sm text-muted-foreground">
                {isRTL 
                  ? 'انقر على أيقونة المساعد للحصول على معلومات مفصلة'
                  : 'Click the assistant icon for detailed information'
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