import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Award, Shield, Zap, Globe, Heart, Target, CheckCircle, Star } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  const features = [
    {
      icon: Building2,
      title: "خبرة عريقة",
      description: "أكثر من 5 سنوات من الخبرة في تطوير حلول الموارد البشرية المتطورة",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "فريق متخصص",
      description: "فريق من أفضل الخبراء والمطورين في مجال تقنية المعلومات",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Award,
      title: "جودة معتمدة",
      description: "حاصلون على شهادات الجودة العالمية والمحلية في تطوير البرمجيات",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "أمان متقدم",
      description: "نضمن أعلى معايير الأمان والحماية لبيانات عملائنا",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Zap,
      title: "تقنيات حديثة",
      description: "نستخدم أحدث التقنيات والأدوات في تطوير منتجاتنا",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "رؤية عالمية",
      description: "نطمح للوصول إلى الأسواق العالمية بحلولنا المبتكرة",
      color: "from-teal-500 to-cyan-600"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "الشغف",
      description: "نحب ما نفعله ونسعى للتميز في كل مشروع"
    },
    {
      icon: Target,
      title: "التركيز",
      description: "نركز على تحقيق أهداف عملائنا وتجاوز توقعاتهم"
    },
    {
      icon: CheckCircle,
      title: "الجودة",
      description: "نلتزم بأعلى معايير الجودة في جميع خدماتنا"
    },
    {
      icon: Star,
      title: "التميز",
      description: "نسعى للتميز والابتكار في كل ما نقدمه"
    }
  ];

  return (
    <section id="who-we-are" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-8 mb-20">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
            <Badge className="relative bg-gradient-to-r from-primary/15 to-primary/10 text-primary border-primary/30 px-6 py-3 text-base font-semibold backdrop-blur-sm shadow-lg">
              <Building2 className="w-5 h-5 mr-2" />
              من نحن
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in">
              شركة رائدة في 
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-scale-in">
                حلول الموارد البشرية
              </span>
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full opacity-80"></div>
          </div>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            نجمع بين الخبرة العريقة والتقنيات المتطورة لنقدم أفضل الحلول
            <br />
            <span className="text-primary font-semibold">التي تلبي احتياجاتكم وتحقق أهدافكم الاستراتيجية</span>
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">قصتنا</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              بدأت رحلتنا في عام 2020 برؤية واضحة: تحويل طريقة إدارة الموارد البشرية في المملكة العربية السعودية. منذ ذلك الحين، نجحنا في تطوير منصة شاملة تجمع بين الابتكار التقني والفهم العميق لاحتياجات السوق المحلي.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              اليوم، نفخر بخدمة أكثر من 1000 شركة وإدارة شؤون أكثر من 100,000 موظف، مما يجعلنا واحدة من أسرع الشركات نمواً في هذا القطاع.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              تعرف على خدماتنا
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
                alt="فريق العمل" 
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6">
              <div className="text-2xl font-bold text-primary">5+</div>
              <div className="text-sm text-gray-600">سنوات خبرة</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center space-y-6 mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl blur-xl opacity-30"></div>
              <h3 className="relative text-3xl lg:text-4xl font-bold text-foreground">
                قيمنا <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">الأساسية</span>
              </h3>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full"></div>
            <p className="text-lg text-muted-foreground">المبادئ التي نؤمن بها ونطبقها في كل ما نقدمه</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">هل تريد الانضمام إلى رحلتنا؟</h3>
            <p className="text-xl mb-8 opacity-90">اكتشف كيف يمكن لحلولنا أن تحدث فرقاً في مؤسستك</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                طلب عرض توضيحي
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                تحدث مع خبير
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};