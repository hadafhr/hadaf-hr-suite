import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Handshake, Award, Globe, Target, Users, Building, Crown, Star, CheckCircle, Zap, Heart, Shield } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const strategicPartners = [
    {
      name: "وزارة الموارد البشرية والتنمية الاجتماعية",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=200&q=80",
      description: "شراكة استراتيجية لتطوير حلول متوافقة مع رؤية المملكة 2030",
      type: "حكومي",
      color: "from-blue-500 to-blue-600",
      benefits: ["التكامل مع الأنظمة الحكومية", "الامتثال للوائح", "الدعم الرسمي"]
    },
    {
      name: "المؤسسة العامة للتأمينات الاجتماعية",
      logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=200&q=80", 
      description: "تكامل مباشر مع نظام التأمينات الاجتماعية وحماية الأجور",
      type: "حكومي",
      color: "from-emerald-500 to-emerald-600",
      benefits: ["الربط المباشر", "التحديث التلقائي", "الامتثال الكامل"]
    },
    {
      name: "Microsoft Azure",
      logo: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&w=200&q=80",
      description: "شريك تقني في الحوسبة السحابية والذكاء الاصطناعي",
      type: "تقني",
      color: "from-purple-500 to-indigo-600",
      benefits: ["البنية التحتية السحابية", "أدوات الذكاء الاصطناعي", "الأمان المتقدم"]
    },
    {
      name: "SAP Arabia",
      logo: "https://images.unsplash.com/photo-1558655146-364adde7eb38?auto=format&fit=crop&w=200&q=80",
      description: "تكامل مع حلول إدارة الأعمال والموارد المؤسسية",
      type: "تقني", 
      color: "from-orange-500 to-red-500",
      benefits: ["تكامل ERP", "تبادل البيانات", "الأتمتة الشاملة"]
    }
  ];

  const clientPartners = [
    {
      name: "أرامكو السعودية",
      industry: "النفط والغاز",
      employees: "70,000+",
      relationship: "عميل استراتيجي منذ 2021"
    },
    {
      name: "الخطوط السعودية",
      industry: "الطيران", 
      employees: "15,000+",
      relationship: "شريك في التحول الرقمي"
    },
    {
      name: "مجموعة سامبا المالية",
      industry: "البنوك والمالية",
      employees: "8,000+", 
      relationship: "تطوير حلول مخصصة"
    },
    {
      name: "شركة المراعي",
      industry: "الأغذية والمشروبات",
      employees: "12,000+",
      relationship: "عميل متميز منذ 2020"
    }
  ];

  const partnershipPrograms = [
    {
      icon: Crown,
      title: "برنامج الشراكة الذهبية",
      description: "للشركات الكبرى التي تبحث عن حلول مخصصة وشاملة",
      features: ["دعم مخصص 24/7", "تطوير ميزات حسب الطلب", "تدريب متقدم", "أولوية الدعم"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Star,
      title: "برنامج الشراكة الفضية", 
      description: "للشركات المتوسطة التي تريد الاستفادة من جميع المزايا",
      features: ["دعم تقني متميز", "تدريب شامل", "تكامل محدود", "تقارير متقدمة"],
      color: "from-gray-400 to-gray-600"
    },
    {
      icon: Award,
      title: "برنامج الشراكة البرونزية",
      description: "للشركات الناشئة والصغيرة بحلول ميسورة التكلفة", 
      features: ["دعم تقني أساسي", "تدريب أساسي", "موارد تعليمية", "مجتمع المستخدمين"],
      color: "from-amber-600 to-yellow-700"
    }
  ];

  const partnershipBenefits = [
    {
      icon: Zap,
      title: "نمو مشترك",
      description: "نساعد شركاءنا على تحقيق النمو والتوسع في أسواق جديدة"
    },
    {
      icon: Shield,
      title: "دعم متخصص",
      description: "فريق دعم مخصص لكل شريك لضمان النجاح المشترك"
    },
    {
      icon: Target,
      title: "أهداف مشتركة",
      description: "نعمل معاً لتحقيق أهداف استراتيجية طويلة المدى"
    },
    {
      icon: Heart,
      title: "علاقات طويلة الأمد",
      description: "نبني شراكات قائمة على الثقة والاحترام المتبادل"
    }
  ];

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-6">
            <Handshake className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            شركاؤنا في النجاح
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            نفخر بشراكاتنا الاستراتيجية مع كبرى المؤسسات والشركات التي تشاركنا رؤيتنا في تطوير قطاع الموارد البشرية وتحقيق التحول الرقمي
          </p>
        </div>

        {/* Strategic Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">الشركاء الاستراتيجيون</h3>
            <p className="text-lg text-gray-600">مؤسسات رائدة نتعاون معها لتقديم أفضل الحلول والخدمات</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {strategicPartners.map((partner, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mr-4 overflow-hidden">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{partner.name}</h4>
                      <Badge className={`bg-gradient-to-r ${partner.color} text-white`}>
                        {partner.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{partner.description}</p>
                  
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700 mb-3">مزايا الشراكة:</p>
                    {partner.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">عملاؤنا المتميزون</h3>
            <p className="text-lg text-gray-600">شركات رائدة تثق بحلولنا وتشاركنا قصص النجاح</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientPartners.map((client, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{client.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{client.industry}</p>
                  <p className="text-xs text-primary font-semibold mb-2">{client.employees} موظف</p>
                  <p className="text-xs text-gray-500">{client.relationship}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Programs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">برامج الشراكة</h3>
            <p className="text-lg text-gray-600">اختر برنامج الشراكة المناسب لاحتياجات مؤسستك</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnershipPrograms.map((program, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color}`} />
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${program.color} rounded-xl mb-6`}>
                    <program.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h4>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  
                  <div className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                    اطلب الشراكة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">لماذا نحن الشريك المناسب؟</h3>
            <p className="text-lg text-gray-600">القيم والمبادئ التي تجعل شراكتنا قوية ومثمرة</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { number: "100+", label: "شريك استراتيجي" },
            { number: "1000+", label: "عميل راضٍ" },
            { number: "5", label: "سنوات خبرة" },
            { number: "99.9%", label: "معدل رضا الشركاء" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">هل تريد أن تصبح شريكاً لنا؟</h3>
            <p className="text-xl mb-8 opacity-90">انضم إلى شبكة شركائنا المتميزين واستفد من فرص النمو والتطوير</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                اطلب شراكة
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                تحدث مع مستشار
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};