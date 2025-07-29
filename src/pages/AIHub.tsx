import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIAssistant } from '@/components/AIAssistant';
import { 
  Brain, 
  BarChart3, 
  Users, 
  Target, 
  Lightbulb,
  TrendingUp,
  MessageSquare,
  Zap
} from 'lucide-react';

const aiFeatures = [
  {
    title: 'تحليل الأداء الذكي',
    description: 'تحليل شامل لأداء الموظفين باستخدام الذكاء الاصطناعي',
    icon: BarChart3,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/performance-evaluation'
  },
  {
    title: 'التنبؤ بالاحتياجات',
    description: 'توقع احتياجات الموارد البشرية المستقبلية',
    icon: TrendingUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/reports'
  },
  {
    title: 'توصيات التوظيف',
    description: 'اقتراحات ذكية لأفضل المرشحين للوظائف',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/smart-hire'
  },
  {
    title: 'تحسين الإنتاجية',
    description: 'استراتيجيات ذكية لتحسين الإنتاجية العامة',
    icon: Zap,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/employee-management'
  },
  {
    title: 'تخطيط الأهداف',
    description: 'وضع أهداف ذكية قابلة للقياس والتحقيق',
    icon: Target,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/dashboard'
  },
  {
    title: 'رؤى استراتيجية',
    description: 'تحليلات عميقة للقرارات الاستراتيجية',
    icon: Lightbulb,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/business-platform'
  }
];

export const AIHub: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gradient">
              مركز الذكاء الاصطناعي
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            استخدم قوة الذكاء الاصطناعي لتحسين إدارة الموارد البشرية واتخاذ قرارات أكثر ذكاءً
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="dashboard-card group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate(feature.route)}
            >
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(feature.route);
                  }}
                >
                  استخدم الآن
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Assistant */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">مساعدك الذكي</h2>
            <p className="text-muted-foreground">
              تحدث مع المساعد الذكي للحصول على إرشادات وتوصيات مخصصة
            </p>
          </div>
          
          <AIAssistant />
        </div>

        {/* AI Insights */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">الرؤى الذكية</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">تحسن في الأداء</h4>
                    <p className="text-sm text-blue-700">ارتفع متوسط الأداء بنسبة 12% هذا الشهر</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Users className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">توصية توظيف</h4>
                    <p className="text-sm text-green-700">يُنصح بتوظيف مطور إضافي في قسم التقنية</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Target className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900">تحديث الأهداف</h4>
                    <p className="text-sm text-orange-700">3 موظفين حققوا أهدافهم مبكراً، يحتاجون أهداف جديدة</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">إحصائيات الذكاء الاصطناعي</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">94%</div>
                  <div className="text-sm text-muted-foreground">دقة التنبؤات</div>
                </div>
                
                <div className="text-center p-4 bg-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success">156</div>
                  <div className="text-sm text-muted-foreground">توصية ذكية</div>
                </div>
                
                <div className="text-center p-4 bg-warning/5 rounded-lg">
                  <div className="text-2xl font-bold text-warning">23h</div>
                  <div className="text-sm text-muted-foreground">وقت موفر</div>
                </div>
                
                <div className="text-center p-4 bg-info/5 rounded-lg">
                  <div className="text-2xl font-bold text-info">87%</div>
                  <div className="text-sm text-muted-foreground">رضا المستخدمين</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};