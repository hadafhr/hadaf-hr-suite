import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Bot, 
  Sparkles, 
  MessageCircle,
  BarChart3, 
  Users, 
  Target, 
  Lightbulb,
  TrendingUp,
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

interface ArtificialIntelligenceProps {
  onBack: () => void;
}

const ArtificialIntelligence = ({ onBack }: ArtificialIntelligenceProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gradient">
              مركز الذكاء الاصطناعي
            </h1>
          </div>
        </div>
        <Button className="gap-2">
          <Brain className="w-4 h-4" />
          نموذج جديد
        </Button>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-muted-foreground max-w-2xl mx-auto">
          استخدم قوة الذكاء الاصطناعي لتحسين إدارة الموارد البشرية واتخاذ قرارات أكثر ذكاءً
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="features">الميزات الذكية</TabsTrigger>
          <TabsTrigger value="insights">الرؤى الذكية</TabsTrigger>
          <TabsTrigger value="statistics">الإحصائيات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>النماذج الذكية النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <p>حلول ذكية لأتمتة العمليات وتحليل البيانات المتقدم. يوفر مركز الذكاء الاصطناعي أدوات متطورة لتحسين إدارة الموارد البشرية وصنع القرار المبني على البيانات.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
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
        </TabsContent>

        <TabsContent value="insights">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>الرؤى الذكية</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>إحصائيات الذكاء الاصطناعي</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtificialIntelligence;