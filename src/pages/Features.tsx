import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Users, 
  BarChart3, 
  UserCheck, 
  Award, 
  Brain, 
  Shield,
  Clock,
  Zap,
  Globe,
  CheckCircle,
  Star
} from 'lucide-react';

const Features: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      id: 'employee-management',
      icon: Users,
      title: 'إدارة الموظفين الشاملة',
      description: 'نظام متكامل لإدارة دورة حياة الموظف من التوظيف حتى التقاعد',
      benefits: [
        'قاعدة بيانات مركزية للموظفين',
        'تتبع المؤهلات والشهادات',
        'إدارة الملفات والوثائق',
        'تقارير شاملة عن بيانات الموظفين'
      ],
      status: 'متاح',
      popularity: 95
    },
    {
      id: 'payroll',
      icon: BarChart3,
      title: 'نظام الرواتب المتقدم',
      description: 'معالجة آلية للرواتب مع الامتثال الكامل لقانون العمل السعودي',
      benefits: [
        'حساب آلي للرواتب والبدلات',
        'إدارة الخصومات والمكافآت',
        'تكامل مع أنظمة البنوك',
        'تقارير مالية مفصلة'
      ],
      status: 'متاح',
      popularity: 92
    },
    {
      id: 'attendance',
      icon: UserCheck,
      title: 'إدارة الحضور والانصراف',
      description: 'تتبع ذكي للحضور مع تكامل أجهزة البصمة والتقنيات الحديثة',
      benefits: [
        'تتبع الحضور بالوقت الفعلي',
        'تكامل مع أجهزة البصمة',
        'إدارة أوقات العمل المرنة',
        'تقارير الحضور والغياب'
      ],
      status: 'متاح',
      popularity: 89
    },
    {
      id: 'performance',
      icon: Award,
      title: 'تقييم الأداء الذكي',
      description: 'نظام تقييم شامل 360 درجة مع رؤى مدعومة بالذكاء الاصطناعي',
      benefits: [
        'تقييم شامل متعدد المصادر',
        'أهداف قابلة للقياس',
        'خطط التطوير المهني',
        'تحليلات الأداء المتقدمة'
      ],
      status: 'متاح',
      popularity: 87
    },
    {
      id: 'recruitment',
      icon: Brain,
      title: 'التوظيف الذكي',
      description: 'منصة توظيف مدعومة بالذكاء الاصطناعي مع الفحص الآلي للسير الذاتية',
      benefits: [
        'نشر الوظائف على منصات متعددة',
        'فحص آلي للسير الذاتية',
        'إدارة عملية المقابلات',
        'تقييم المرشحين بالذكاء الاصطناعي'
      ],
      status: 'متاح',
      popularity: 85
    },
    {
      id: 'compliance',
      icon: Shield,
      title: 'الامتثال القانوني',
      description: 'ضمان الامتثال الكامل للقوانين السعودية واللوائح الحكومية',
      benefits: [
        'تطبيق قانون العمل السعودي',
        'إدارة التأمينات الاجتماعية',
        'تقارير الامتثال الحكومية',
        'تنبيهات التحديثات القانونية'
      ],
      status: 'متاح',
      popularity: 94
    },
    {
      id: 'self-service',
      icon: Clock,
      title: 'الخدمة الذاتية للموظفين',
      description: 'تمكين الموظفين من إدارة طلباتهم والوصول لمعلوماتهم بسهولة',
      benefits: [
        'طلبات الإجازات الإلكترونية',
        'عرض كشوف الرواتب',
        'تحديث البيانات الشخصية',
        'تتبع حالة الطلبات'
      ],
      status: 'متاح',
      popularity: 91
    },
    {
      id: 'analytics',
      icon: Zap,
      title: 'تحليلات الموارد البشرية',
      description: 'رؤى مدفوعة بالبيانات لاتخاذ قرارات استراتيجية مدروسة',
      benefits: [
        'لوحات معلومات تفاعلية',
        'تحليل اتجاهات الموظفين',
        'مؤشرات الأداء الرئيسية',
        'توقعات مدعومة بالذكاء الاصطناعي'
      ],
      status: 'متاح',
      popularity: 83
    },
    {
      id: 'integration',
      icon: Globe,
      title: 'تكامل الأنظمة',
      description: 'تكامل سلس مع الأنظمة الحكومية والمصرفية والخارجية',
      benefits: [
        'تكامل مع التأمينات الاجتماعية',
        'ربط مع الأنظمة المصرفية',
        'تكامل مع الأنظمة الحكومية',
        'واجهات برمجية مفتوحة'
      ],
      status: 'متاح',
      popularity: 88
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    navigate(`/features/${featureId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            {t('btn.back')}
          </Button>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {t('features.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('features.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 hover:-translate-y-1"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {feature.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{feature.popularity}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-primary mb-3">المميزات الرئيسية:</h4>
                    <ul className="space-y-2">
                      {feature.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                      {feature.benefits.length > 3 && (
                        <li className="text-sm text-primary font-medium">
                          +{feature.benefits.length - 3} مميزة أخرى
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">شعبية الميزة</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                            style={{ width: `${feature.popularity}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{feature.popularity}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            مستعد لتجربة هذه المميزات؟
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            ابدأ تجربتك المجانية اليوم واستكشف جميع المميزات
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 px-8"
              onClick={() => navigate('/schedule')}
            >
              احجز اجتماع مع خبرائنا
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8"
              onClick={() => navigate('/pricing')}
            >
              اختر باقتك المناسبة
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;