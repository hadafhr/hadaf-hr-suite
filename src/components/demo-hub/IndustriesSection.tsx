import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  GraduationCap, 
  ShoppingBag, 
  Stethoscope, 
  Hotel,
  Factory,
  Truck,
  Banknote
} from 'lucide-react';

const industries = [
  {
    name: "تقنية المعلومات",
    icon: Building2,
    description: "حلول متخصصة لشركات التقنية والتطوير",
    companies: "100+"
  },
  {
    name: "التعليم",
    icon: GraduationCap,
    description: "أدوات مصممة للمؤسسات التعليمية",
    companies: "50+"
  },
  {
    name: "التجزئة",
    icon: ShoppingBag,
    description: "إدارة موارد بشرية لقطاع التجارة",
    companies: "80+"
  },
  {
    name: "الرعاية الصحية",
    icon: Stethoscope,
    description: "حلول متوافقة مع معايير القطاع الصحي",
    companies: "40+"
  },
  {
    name: "الضيافة والفندقة",
    icon: Hotel,
    description: "إدارة الموظفين في قطاع الضيافة",
    companies: "60+"
  },
  {
    name: "التصنيع",
    icon: Factory,
    description: "أدوات مخصصة للشركات الصناعية",
    companies: "70+"
  },
  {
    name: "النقل واللوجستيات",
    icon: Truck,
    description: "حلول لشركات النقل والخدمات اللوجستية",
    companies: "30+"
  },
  {
    name: "البنوك والمالية",
    icon: Banknote,
    description: "أدوات متوافقة مع المعايير المصرفية",
    companies: "25+"
  }
];

const companyTypes = [
  {
    type: "المنشآت الصغيرة",
    range: "1-50 موظف",
    features: ["إعداد سريع", "أسعار مناسبة", "دعم كامل"],
    popular: false
  },
  {
    type: "الشركات المتوسطة",
    range: "51-500 موظف",
    features: ["مميزات متقدمة", "تخصيص مرن", "تقارير تفصيلية"],
    popular: true
  },
  {
    type: "المؤسسات الكبرى",
    range: "500+ موظف",
    features: ["حلول مؤسسية", "تكامل متقدم", "دعم مخصص"],
    popular: false
  }
];

export const IndustriesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Industries */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              <span className="text-foreground">نخدم جميع </span>
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                القطاعات
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              حلول مُخصصة ومرنة تناسب احتياجات كل قطاع وحجم شركة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card 
                key={industry.name} 
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/30"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl flex items-center justify-center mx-auto group-hover:from-primary/20 group-hover:to-primary-glow/20 transition-colors">
                    <industry.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {industry.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {industry.companies} شركة
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Types */}
          <div className="space-y-8 pt-12 border-t border-border/50">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                مناسب لجميع أحجام الشركات
              </h3>
              <p className="text-muted-foreground">
                من الشركات الناشئة إلى المؤسسات الكبرى
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {companyTypes.map((company, index) => (
                <Card 
                  key={company.type} 
                  className={`relative transition-all duration-300 hover:scale-105 ${
                    company.popular 
                      ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                >
                  {company.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white">الأكثر شيوعاً</Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{company.type}</h3>
                      <p className="text-primary font-medium">{company.range}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {company.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          ✓ {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};