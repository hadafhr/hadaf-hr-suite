import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Users, Building2, Monitor, ArrowLeft, CheckCircle, TrendingUp, Shield, Clock } from 'lucide-react';
import { DemoRequestModal } from '@/components/DemoRequestModal';
import { useNavigate } from 'react-router-dom';

export const ITSolutionsHero: React.FC = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const navigate = useNavigate();

  // بيانات وهمية للإحصائيات
  const stats = {
    customers_count: 800,
    employees_count: 30000,
    connected_devices: 1500
  };

  const features = [
    { icon: CheckCircle, text: 'إدارة حضور متقدمة' },
    { icon: Users, text: 'ملفات موظفين شاملة' },
    { icon: TrendingUp, text: 'تقارير تحليلية' },
    { icon: Shield, text: 'واجهة آمنة ومرنة' }
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* خلفية متدرجة مع تأثيرات */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        {/* عناصر ديكورية متحركة */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full animate-blob opacity-60" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-secondary/10 rounded-full animate-blob animation-delay-2000 opacity-60" />
        <div className="absolute top-40 left-1/4 w-16 h-16 bg-accent/10 rounded-full animate-float opacity-40" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* المحتوى النصي */}
            <div className="text-center lg:text-right space-y-8 animate-fade-in">
              
              {/* العنوان الرئيسي */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gradient bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                    بُعد HR
                  </span>
                  <br />
                  <span className="text-foreground">
                    بيئة عمل أكثر إنتاجية ومرونة
                  </span>
                </h1>
                
                {/* الوصف التمهيدي */}
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  قدّم أفضل تجربة للموظفين مع نظام موارد بشرية متكامل يحمي حقوقك، يسرّع إنجازك، ويوفر مرونة التطوير لمنشأتك.
                </p>
              </div>

              {/* المميزات السريعة */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 space-x-reverse p-3 bg-background/50 rounded-lg border border-border/30 backdrop-blur-sm animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* أزرار الحث على اتخاذ إجراء */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={() => setShowDemoModal(true)}
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  شاهد العرض التوضيحي
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/subscription-packages')}
                  className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  اطلب نسختك الآن
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* الإحصائيات البارزة */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/30">
                <div className="text-center animate-bounce-gentle">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stats.employees_count.toLocaleString()}+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">موظف نشط</div>
                </div>
                
                <div className="text-center animate-bounce-gentle" style={{ animationDelay: '200ms' }}>
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stats.customers_count.toLocaleString()}+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">منشأة</div>
                </div>
                
                <div className="text-center animate-bounce-gentle" style={{ animationDelay: '400ms' }}>
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stats.connected_devices.toLocaleString()}+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">جهاز مرتبط</div>
                </div>
              </div>
            </div>

            {/* الجانب البصري - لقطات الشاشة والواجهات */}
            <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
              
              {/* الواجهة الرئيسية */}
              <div className="relative">
                
                {/* لوحة التحكم الرئيسية */}
                <div className="bg-background/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/20 p-6 mb-6 hover:shadow-3xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">لوحة تحكم بُعد HR</div>
                  </div>
                  
                  {/* محتوى لوحة التحكم */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="font-medium">إدارة الموظفين</span>
                      </div>
                      <span className="text-2xl font-bold text-primary">1,250</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Clock className="h-5 w-5 text-secondary" />
                        <span className="font-medium">نسبة الحضور</span>
                      </div>
                      <span className="text-2xl font-bold text-secondary">96.8%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <TrendingUp className="h-5 w-5 text-accent" />
                        <span className="font-medium">الأداء العام</span>
                      </div>
                      <span className="text-2xl font-bold text-accent">ممتاز</span>
                    </div>
                  </div>
                </div>

                {/* كروت إضافية صغيرة */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20 hover:scale-105 transition-transform duration-300">
                    <Monitor className="h-8 w-8 text-primary mb-2" />
                    <div className="text-sm font-medium text-foreground">واجهة سهلة</div>
                    <div className="text-xs text-muted-foreground">تصميم بديهي</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 backdrop-blur-sm rounded-xl p-4 border border-secondary/20 hover:scale-105 transition-transform duration-300">
                    <Building2 className="h-8 w-8 text-secondary mb-2" />
                    <div className="text-sm font-medium text-foreground">تقارير شاملة</div>
                    <div className="text-xs text-muted-foreground">بيانات دقيقة</div>
                  </div>
                </div>

                {/* عناصر ديكورية للواجهة */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full animate-pulse"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <DemoRequestModal 
        isOpen={showDemoModal} 
        onClose={() => setShowDemoModal(false)} 
      />
    </>
  );
};