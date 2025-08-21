import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, BarChart3, Clock, DollarSign, Award, Shield, Brain, Target, CheckCircle, Zap } from 'lucide-react';

const EmployeeManagementInfo: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "إدارة الموظفين المتقدمة",
      description: "نظام شامل لإدارة البيانات الأساسية والتنظيمية للموظفين مع إمكانية التتبع المفصل لرحلة كل موظف",
      icon: Users,
      benefits: ["قاعدة بيانات موحدة ومؤمنة", "تتبع تاريخ الموظف الكامل", "إدارة الوثائق الرقمية", "تقارير تفصيلية شاملة"]
    },
    {
      title: "نظام الحضور والانصراف الذكي",
      description: "تقنية متطورة لتتبع أوقات العمل مع إمكانية التكامل مع أجهزة البصمة والتعرف على الوجه",
      icon: Clock,
      benefits: ["تتبع دقيق للحضور والانصراف", "تكامل مع أجهزة البصمة", "تقارير الحضور التلقائية", "تنبيهات الغياب المتقدمة"]
    },
    {
      title: "نظام تقييم الأداء الشامل",
      description: "منهجية متطورة لتقييم الأداء تشمل KPIs، الأهداف الذكية، ومؤشرات الأداء المتقدمة",
      icon: BarChart3,
      benefits: ["تقييم 360 درجة", "تحديد الأهداف الذكية", "تتبع مؤشرات الأداء", "خطط التطوير المهني"]
    },
    {
      title: "إدارة الرواتب والمكافآت",
      description: "نظام متكامل لحساب الرواتب والمكافآت مع التكامل المباشر مع الأنظمة البنكية والحكومية",
      icon: DollarSign,
      benefits: ["حساب آلي للرواتب", "إدارة المكافآت والحوافز", "تكامل مع البنوك", "تقارير مالية مفصلة"]
    },
    {
      title: "نظام التدريب والتطوير",
      description: "منصة شاملة لإدارة البرامج التدريبية وتتبع تطور المهارات مع شهادات معتمدة",
      icon: Award,
      benefits: ["كتالوج البرامج التدريبية", "تتبع تقدم التدريب", "شهادات إلكترونية", "خطط التطوير الشخصية"]
    },
    {
      title: "نظام الأمان والصلاحيات",
      description: "حماية متقدمة للبيانات مع نظام صلاحيات مرن يضمن الوصول الآمن للمعلومات",
      icon: Shield,
      benefits: ["تشفير عالي الأمان", "صلاحيات متدرجة", "سجل العمليات", "النسخ الاحتياطي التلقائي"]
    }
  ];

  const advantages = [
    { text: "توفير 70% من الوقت المستغرق في العمليات اليدوية", icon: Zap },
    { text: "تحسين دقة البيانات بنسبة 95%", icon: Target },
    { text: "تكامل مباشر مع 15 جهة حكومية", icon: CheckCircle },
    { text: "ذكاء اصطناعي لتحليل البيانات وتقديم التوصيات", icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-background font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للرئيسية
            </Button>
            <BoudLogo variant="full" size="md" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              نظام إدارة الموظفين الشامل
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              الحل الأمثل لإدارة رأس المال البشري
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              حل متكامل وشامل يجمع 22 نظاماً فرعياً في منصة واحدة متطورة لإدارة دورة حياة الموظف بالكامل من التوظيف إلى التقاعد
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <advantage.icon className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{advantage.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              مكونات النظام الرئيسية
            </h2>
            <p className="text-lg text-muted-foreground">
              نظام شامل متكامل يغطي جميع جوانب إدارة الموارد البشرية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              أرقام تتحدث عن نفسها
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">شركة تستخدم النظام</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100K+</div>
              <div className="text-muted-foreground">موظف يستفيد من الخدمة</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">70%</div>
              <div className="text-muted-foreground">توفير في الوقت والجهد</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">معدل تشغيل النظام</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              جاهز لتطوير إدارة الموارد البشرية في شركتك؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              احصل على عرض توضيحي مجاني واكتشف كيف يمكن لنظام بُعد أن يحول عمليات الموارد البشرية في شركتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/demo-request')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              >
                اطلب العرض التوضيحي
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/contact')}
                className="px-8 py-3 text-lg"
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeManagementInfo;