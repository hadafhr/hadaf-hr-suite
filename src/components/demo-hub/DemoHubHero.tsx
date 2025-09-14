import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DemoRequestModal } from '@/components/DemoRequestModal';
import { Play, ArrowLeft, Star, Users, BarChart3 } from 'lucide-react';

export const DemoHubHero = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/20" />
        
        {/* Background Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 text-primary/10">
            <Users className="w-24 h-24" />
          </div>
          <div className="absolute bottom-20 left-20 text-primary/10">
            <BarChart3 className="w-20 h-20" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/5">
            <Star className="w-32 h-32" />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    جرب بُعد
                  </span>
                  <br />
                  <span className="text-foreground">
                    بنفسك
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  استكشف كيف تُبسّط بُعد إدارة الموارد البشرية والرواتب من خلال منصة شاملة ومتطورة. 
                  أدوات قوية وسهلة الاستخدام مصممة خصيصًا للشركات في المنطقة العربية.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowDemoModal(true)}
                  className="bg-primary hover:bg-primary-glow text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  اطلب عرضًا توضيحيًا
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium px-8 py-4 rounded-xl transition-all duration-300"
                >
                  <Play className="w-5 h-5 ml-2" />
                  جولة تفاعلية داخل بُعد
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">شركة تثق ببُعد</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">موظف يستخدم المنصة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">99%</div>
                  <div className="text-sm text-muted-foreground">معدل الرضا</div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-3xl p-8 backdrop-blur-sm border border-primary/20 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-background to-muted/50 rounded-2xl border shadow-inner p-6">
                  {/* Mock Dashboard Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg"></div>
                      <div className="space-y-1">
                        <div className="h-3 bg-primary/30 rounded w-32"></div>
                        <div className="h-2 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-16 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-xl"></div>
                      <div className="h-16 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-xl"></div>
                    </div>
                    <div className="h-24 bg-muted/50 rounded-xl"></div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-glow rounded-full animate-pulse delay-300"></div>
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