import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Lightbulb, Rocket, Globe, Crown } from 'lucide-react';

export const VisionSection: React.FC = () => {
  const visionCards = [
    {
      icon: Target,
      title: "رؤيتنا",
      description: "أن نكون الشريك التقني الأول في المملكة العربية السعودية لحلول إدارة الموارد البشرية المتطورة والمبتكرة",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Eye,
      title: "رسالتنا", 
      description: "نسعى لتمكين المؤسسات من تحقيق أهدافها الاستراتيجية من خلال حلول تقنية متقدمة تعزز كفاءة إدارة رأس المال البشري",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: Crown,
      title: "قيمنا",
      description: "الابتكار والجودة والشفافية والاحترافية في تقديم أفضل الحلول التقنية التي تلبي احتياجات عملائنا وتتجاوز توقعاتهم",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const goals = [
    {
      icon: Rocket,
      title: "الريادة التقنية",
      description: "قيادة السوق في مجال حلول الموارد البشرية الرقمية"
    },
    {
      icon: Globe,
      title: "التوسع الاستراتيجي", 
      description: "التوسع في الأسواق الإقليمية والعالمية"
    },
    {
      icon: Lightbulb,
      title: "الابتكار المستمر",
      description: "تطوير حلول مبتكرة تواكب المستقبل الرقمي"
    }
  ];

  return (
    <section id="vision" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-8 mb-20">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
            <Badge className="relative bg-gradient-to-r from-primary/15 to-primary/10 text-primary border-primary/30 px-6 py-3 text-base font-semibold backdrop-blur-sm shadow-lg">
              <Target className="w-5 h-5 mr-2" />
              رؤيتنا ورسالتنا
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in">
              نؤمن بقوة التكنولوجيا في 
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-scale-in">
                تحويل مستقبل الموارد البشرية
              </span>
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full opacity-80"></div>
          </div>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            نسعى لخلق بيئة عمل أكثر كفاءة وإنتاجية من خلال حلول مبتكرة
            <br />
            <span className="text-primary font-semibold">تعزز الأداء التنظيمي وتحقق التميز المؤسسي</span>
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {visionCards.map((card, index) => (
            <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <CardContent className="p-8 relative">
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-xl mb-6 shadow-lg`}>
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Goals Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center space-y-6 mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl blur-xl opacity-30"></div>
              <h3 className="relative text-3xl lg:text-4xl font-bold text-foreground">
                أهدافنا <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">الاستراتيجية</span>
              </h3>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full"></div>
            <p className="text-lg text-muted-foreground">نسعى لتحقيق أهداف طموحة تعكس التزامنا بالتميز والابتكار</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <goal.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{goal.title}</h4>
                <p className="text-gray-600">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {[
            { number: "2020", label: "تاريخ التأسيس" },
            { number: "1000+", label: "عميل راضٍ" },
            { number: "50+", label: "خبير تقني" },
            { number: "99.9%", label: "موثوقية النظام" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};