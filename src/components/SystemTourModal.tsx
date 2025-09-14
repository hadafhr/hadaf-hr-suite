import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Users, 
  Calculator, 
  Clock, 
  Shield, 
  Award, 
  BookOpen, 
  CreditCard, 
  BarChart3,
  FileText,
  Settings
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  benefits: string[];
}

interface SystemTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourSteps: TourStep[] = [
  {
    id: 'employee-management',
    title: 'إدارة ملفات الموظفين',
    description: 'نظام شامل لإدارة جميع معلومات وبيانات الموظفين في مكان واحد مع أعلى معايير الأمان والخصوصية.',
    icon: <Users className="w-8 h-8" />,
    features: [
      'ملفات شخصية كاملة للموظفين',
      'إدارة الوثائق والمرفقات',
      'تتبع تاريخ التوظيف والترقيات',
      'إدارة معلومات الاتصال والعناوين',
      'نظام صلاحيات متقدم'
    ],
    benefits: [
      'توفير الوقت في البحث عن البيانات',
      'ضمان دقة المعلومات',
      'سهولة الوصول للمعلومات المطلوبة',
      'الامتثال لمعايير حماية البيانات'
    ]
  },
  {
    id: 'payroll-management',
    title: 'نظام الرواتب والمزايا',
    description: 'حساب الرواتب بدقة عالية مع إدارة البدلات والخصومات والضرائب وفقاً للقوانين المحلية.',
    icon: <Calculator className="w-8 h-8" />,
    features: [
      'حساب الراتب الأساسي والبدلات',
      'إدارة الخصومات والضرائب',
      'حساب مكافأة نهاية الخدمة',
      'تقارير مفصلة للرواتب',
      'تكامل مع البنوك للتحويل'
    ],
    benefits: [
      'دقة 100% في حساب الرواتب',
      'توفير ساعات العمل الإداري',
      'الامتثال للقوانين الضريبية',
      'شفافية كاملة في العمليات المالية'
    ]
  },
  {
    id: 'attendance-tracking',
    title: 'تتبع الحضور والانصراف',
    description: 'نظام متطور لتتبع أوقات العمل والإجازات والغياب مع تقارير تفصيلية للإنتاجية.',
    icon: <Clock className="w-8 h-8" />,
    features: [
      'تسجيل الدخول والخروج الإلكتروني',
      'حساب ساعات العمل الإضافية',
      'إدارة أنواع الإجازات المختلفة',
      'تتبع التأخير والانصراف المبكر',
      'تقارير الحضور الشهرية'
    ],
    benefits: [
      'مراقبة دقيقة لأوقات العمل',
      'تحسين الإنتاجية والالتزام',
      'تبسيط عمليات طلب الإجازات',
      'تقليل النزاعات حول الحضور'
    ]
  },
  {
    id: 'compliance-security',
    title: 'الامتثال والأمان',
    description: 'ضمان الامتثال للقوانين المحلية والدولية مع أعلى معايير الأمان وحماية البيانات.',
    icon: <Shield className="w-8 h-8" />,
    features: [
      'الامتثال لقانون العمل السعودي',
      'تشفير البيانات الحساسة',
      'نسخ احتياطية آمنة',
      'سجل كامل للعمليات',
      'التحقق من الهوية المتعدد'
    ],
    benefits: [
      'حماية كاملة للبيانات الحساسة',
      'تجنب المخالفات القانونية',
      'ثقة أكبر من الموظفين',
      'سمعة متميزة للشركة'
    ]
  },
  {
    id: 'performance-management',
    title: 'إدارة الأداء والمواهب',
    description: 'نظام شامل لتقييم الأداء وتطوير المواهب وإدارة المسارات المهنية للموظفين.',
    icon: <Award className="w-8 h-8" />,
    features: [
      'تقييمات الأداء الدورية',
      'وضع الأهداف ومتابعتها',
      'خطط التطوير الوظيفي',
      'برامج التدريب والتطوير',
      'تقارير الأداء التفصيلية'
    ],
    benefits: [
      'تحسين أداء الموظفين',
      'زيادة معدل الاحتفاظ بالمواهب',
      'وضوح في المسارات المهنية',
      'ثقافة عمل إيجابية ومحفزة'
    ]
  },
  {
    id: 'analytics-reports',
    title: 'التحليلات والتقارير',
    description: 'لوحة تحكم ذكية مع تقارير شاملة وتحليلات متقدمة لاتخاذ قرارات مبنية على البيانات.',
    icon: <BarChart3 className="w-8 h-8" />,
    features: [
      'لوحة تحكم تفاعلية',
      'تقارير مالية مفصلة',
      'تحليلات الموارد البشرية',
      'مؤشرات الأداء الرئيسية',
      'تصدير التقارير بصيغ متعددة'
    ],
    benefits: [
      'فهم أعمق لبيانات الشركة',
      'اتخاذ قرارات مبنية على الحقائق',
      'تحسين الكفاءة التشغيلية',
      'توفير الوقت في إعداد التقارير'
    ]
  }
];

export const SystemTourModal: React.FC<SystemTourModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const progress = ((currentStep + 1) / tourSteps.length) * 100;
  const currentTourStep = tourSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {currentTourStep.icon}
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-right">
                    جولة تفاعلية في منصة بُعد
                  </DialogTitle>
                  <p className="text-muted-foreground text-sm text-right mt-1">
                    اكتشف قوة وسهولة إدارة الموارد البشرية
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Progress */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>الخطوة {currentStep + 1} من {tourSteps.length}</span>
                <span>{Math.round(progress)}% مكتمل</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Content */}
              <div className="space-y-6 order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {currentTourStep.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-right">
                      {currentTourStep.title}
                    </h2>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-right">
                    {currentTourStep.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-right flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    المميزات الرئيسية
                  </h3>
                  <div className="grid gap-2">
                    {currentTourStep.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <Badge variant="secondary" className="min-w-fit">
                          {index + 1}
                        </Badge>
                        <span className="text-right flex-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-right flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    الفوائد المحققة
                  </h3>
                  <div className="grid gap-2">
                    {currentTourStep.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/20"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                        <span className="text-right flex-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Visual */}
              <div className="order-1 lg:order-2">
                <div className="relative aspect-video bg-gradient-to-br from-primary/5 to-primary-glow/5 rounded-2xl border border-primary/20 p-6">
                  <div className="space-y-4 h-full">
                    {/* Mock Interface */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="text-xs text-muted-foreground">منصة بُعد HR</div>
                    </div>
                    
                    {/* Dynamic Content Based on Step */}
                    <div className="space-y-3 h-full">
                      {currentStep === 0 && (
                        <>
                          <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            <Users className="w-6 h-6 text-primary" />
                            <div className="space-y-1 flex-1">
                              <div className="h-3 bg-primary/30 rounded w-32"></div>
                              <div className="h-2 bg-muted rounded w-24"></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="h-12 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-lg"></div>
                            <div className="h-12 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg"></div>
                          </div>
                        </>
                      )}
                      
                      {currentStep === 1 && (
                        <>
                          <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            <Calculator className="w-6 h-6 text-primary" />
                            <div className="space-y-1 flex-1">
                              <div className="h-3 bg-primary/30 rounded w-40"></div>
                              <div className="h-2 bg-muted rounded w-20"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-8 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg"></div>
                            <div className="h-6 bg-muted/50 rounded-lg"></div>
                          </div>
                        </>
                      )}
                      
                      {currentStep === 2 && (
                        <>
                          <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            <Clock className="w-6 h-6 text-primary" />
                            <div className="space-y-1 flex-1">
                              <div className="h-3 bg-primary/30 rounded w-36"></div>
                              <div className="h-2 bg-muted rounded w-28"></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-10 bg-blue-500/20 rounded-lg"></div>
                            <div className="h-10 bg-yellow-500/20 rounded-lg"></div>
                            <div className="h-10 bg-red-500/20 rounded-lg"></div>
                          </div>
                        </>
                      )}
                      
                      {(currentStep === 3 || currentStep === 4 || currentStep === 5) && (
                        <>
                          <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            {currentTourStep.icon}
                            <div className="space-y-1 flex-1">
                              <div className="h-3 bg-primary/30 rounded w-44"></div>
                              <div className="h-2 bg-muted rounded w-32"></div>
                            </div>
                          </div>
                          <div className="h-16 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg"></div>
                        </>
                      )}
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary-glow rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-muted-foreground"
                >
                  إغلاق الجولة
                </Button>
              </div>

              <div className="flex gap-2">
                {currentStep < tourSteps.length - 1 ? (
                  <Button onClick={nextStep} className="flex items-center gap-2">
                    التالي
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={onClose}
                    className="bg-primary hover:bg-primary-glow text-white flex items-center gap-2"
                  >
                    إنهاء الجولة
                    <Award className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};