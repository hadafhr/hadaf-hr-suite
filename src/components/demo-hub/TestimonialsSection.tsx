import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "شركة الرؤية التقنية",
    quote: "بُعد HR غيّر طريقة إدارتنا للموارد البشرية بالكامل. وفر علينا ساعات كثيرة من العمل اليدوي وحسّن من دقة البيانات بشكل ملحوظ.",
    industry: "تقنية المعلومات",
    employees: "250 موظف",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center"
  },
  {
    name: "مجموعة النماء التجارية", 
    quote: "النظام سهل الاستخدام ومتوافق تماماً مع قوانين العمل السعودية. فريق الدعم متجاوب جداً ويقدم المساعدة في أي وقت.",
    industry: "التجارة والتجزئة",
    employees: "400 موظف", 
    rating: 5,
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center"
  },
  {
    name: "مستشفى الملك فهد التخصصي",
    quote: "إدارة الموظفين أصبحت أكثر تنظيماً وكفاءة. التقارير التفصيلية ساعدتنا كثيراً في اتخاذ قرارات مدروسة حول الموارد البشرية.",
    industry: "الرعاية الصحية",
    employees: "800 موظف",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center"
  },
  {
    name: "شركة البناء المتطور",
    quote: "التكامل مع أنظمة البصمة كان سلساً جداً. الآن نستطيع تتبع الحضور والانصراف بدقة وحساب الإضافي تلقائياً.",
    industry: "الإنشاءات والتطوير", 
    employees: "150 موظف",
    rating: 4,
    logo: "https://images.unsplash.com/photo-1541976590-713941681591?w=100&h=100&fit=crop&crop=center"
  },
  {
    name: "معهد التميز التعليمي",
    quote: "كونه مصمم خصيصاً للمنطقة العربية يُشعرنا بالثقة. الواجهة العربية واضحة والنظام يفهم احتياجاتنا المحلية.",
    industry: "التعليم",
    employees: "120 موظف",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&h=100&fit=crop&crop=center"
  },
  {
    name: "فندق الضيافة الذهبي",
    quote: "إدارة الورديات أصبحت أسهل بكثير. النظام مرن ويتكيف مع طبيعة عملنا في قطاع الضيافة والعمل على مدار الساعة.",
    industry: "الضيافة والفندقة",
    employees: "200 موظف", 
    rating: 4,
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop&crop=center"
  }
];

export const TestimonialsSection = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            <span className="text-foreground">ما يقوله </span>
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              عملاؤنا
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            شهادات حقيقية من شركات تثق في بُعد HR لإدارة مواردها البشرية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name} 
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/20 bg-background/80 backdrop-blur-sm"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                    <img 
                      src={testimonial.logo} 
                      alt={`شعار ${testimonial.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{testimonial.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -right-2 w-8 h-8 text-primary/20" />
                  <p className="text-sm text-muted-foreground leading-relaxed italic pr-6">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Badge variant="outline" className="text-xs">
                    {testimonial.industry}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {testimonial.employees}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">شركة راضية</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">4.9/5</div>
            <div className="text-sm text-muted-foreground">متوسط التقييم</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">99%</div>
            <div className="text-sm text-muted-foreground">معدل الرضا</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">دعم فني</div>
          </div>
        </div>
      </div>
    </section>
  );
};