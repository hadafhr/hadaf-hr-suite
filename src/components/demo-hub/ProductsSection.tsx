import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Shield, 
  Target, 
  BookOpen, 
  CreditCard,
  FileText,
  Clock,
  Award
} from 'lucide-react';

const products = [
  {
    slug: "employee-files",
    title: "إدارة ملفات الموظفين",
    icon: Users,
    description: "تنظيم شامل لملفات الموظفين وجميع بياناتهم في نظام واحد موحد ومؤمن"
  },
  {
    slug: "payroll",
    title: "مسير الرواتب",
    icon: DollarSign,
    description: "حساب الرواتب والخصومات بدقة وشفافية مع التوافق الكامل مع قوانين العمل"
  },
  {
    slug: "attendance",
    title: "الحضور والانصراف",
    icon: Calendar,
    description: "نظام متطور لتتبع أوقات العمل مع دعم البصمة والعمل عن بُعد"
  },
  {
    slug: "compliance",
    title: "الامتثال والقوانين",
    icon: Shield,
    description: "ضمان الامتثال لجميع قوانين العمل السعودية والتأمينات الاجتماعية"
  },
  {
    slug: "talent",
    title: "إدارة المواهب",
    icon: Target,
    description: "جذب واختيار أفضل المواهب مع نظام تقييم شامل للأداء"
  },
  {
    slug: "training",
    title: "التدريب والتطوير",
    icon: BookOpen,
    description: "برامج تدريبية متكاملة لتطوير مهارات الموظفين وقياس التقدم"
  },
  {
    slug: "expenses",
    title: "إدارة النفقات",
    icon: CreditCard,
    description: "تتبع وإدارة نفقات الموظفين والشركة بشفافية كاملة"
  },
  {
    slug: "reports",
    title: "التقارير والتحليلات",
    icon: FileText,
    description: "تقارير تفصيلية وتحليلات ذكية لاتخاذ قرارات مدروسة"
  },
  {
    slug: "self-service",
    title: "الخدمة الذاتية",
    icon: Clock,
    description: "بوابة للموظفين لإدارة طلباتهم وبياناتهم بأنفسهم"
  },
  {
    slug: "performance",
    title: "تقييم الأداء",
    icon: Award,
    description: "نظام تقييم شامل لقياس وتطوير أداء الموظفين بشكل مستمر"
  }
];

export const ProductsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              منتجاتنا
            </span>
            <span className="text-foreground"> ومميزاتنا</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            حلول شاملة ومتكاملة لجميع احتياجات الموارد البشرية في مكان واحد
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card 
              key={product.slug} 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/20 bg-background/80 backdrop-blur-sm"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary-glow/30 transition-colors">
                  <product.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};