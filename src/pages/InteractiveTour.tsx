import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Home, 
  CheckCircle, 
  MousePointer, 
  Eye,
  Users,
  Calendar,
  BarChart3,
  Settings,
  FileText,
  ArrowRight,
  ArrowLeft,
  Star,
  Zap
} from 'lucide-react';

interface TourStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  content: string;
  duration: number;
  highlight: string;
  tips: string[];
}

const InteractiveTour = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const tourSteps: TourStep[] = [
    {
      id: 1,
      title: "مرحباً بك في بُعد HR",
      description: "اكتشف منصة الموارد البشرية الأكثر تطوراً في المنطقة",
      icon: Star,
      content: "منصة بُعد HR هي الحل الشامل لإدارة الموارد البشرية، مصممة خصيصاً للشركات في المملكة العربية السعودية والمنطقة العربية. نوفر أدوات متطورة لإدارة الموظفين، الحضور والانصراف، الرواتب، والمزيد.",
      duration: 30,
      highlight: "منصة شاملة ومتطورة",
      tips: ["تصميم عربي أولاً", "متوافقة مع قوانين العمل السعودية", "واجهة سهلة الاستخدام"]
    },
    {
      id: 2,
      title: "إدارة الموظفين",
      description: "نظام متكامل لإدارة بيانات الموظفين وملفاتهم الشخصية",
      icon: Users,
      content: "إدارة شاملة لجميع بيانات الموظفين من التوظيف إلى إنهاء الخدمة. تتضمن إدارة الملفات الشخصية، المؤهلات، تاريخ العمل، وتقييمات الأداء. كل ذلك في مكان واحد مع حماية عالية للبيانات.",
      duration: 45,
      highlight: "إدارة شاملة ومؤمنة",
      tips: ["ملفات رقمية كاملة", "تتبع تاريخ الموظف", "تقارير تفصيلية"]
    },
    {
      id: 3,
      title: "نظام الحضور والانصراف",
      description: "تتبع دقيق لأوقات العمل مع التكامل مع أجهزة البصمة",
      icon: Calendar,
      content: "نظام متطور لتسجيل الحضور والانصراف يدعم طرق متعددة: البصمة، كروت الوصول، التطبيق المحمول، والتسجيل عن بُعد. مع تقارير تفصيلية ومراقبة الإضافي والتأخير.",
      duration: 40,
      highlight: "مرونة في التسجيل",
      tips: ["دعم العمل عن بُعد", "تقارير فورية", "تنبيهات ذكية"]
    },
    {
      id: 4,
      title: "نظام الرواتب المتطور",
      description: "حساب آلي للرواتب مع التوافق الكامل مع قوانين العمل",
      icon: BarChart3,
      content: "نظام رواتب ذكي يحسب تلقائياً جميع الاستحقاقات والخصومات وفقاً لقانون العمل السعودي. يشمل التأمينات الاجتماعية، ضريبة القيمة المضافة، بدل الإسكان، والمزيد.",
      duration: 50,
      highlight: "توافق كامل مع القوانين",
      tips: ["حسابات دقيقة", "تقارير ضريبية", "تكامل بنكي"]
    },
    {
      id: 5,
      title: "التقارير والتحليلات",
      description: "رؤى عميقة لاتخاذ قرارات مدروسة في إدارة الموارد البشرية",
      icon: FileText,
      content: "مجموعة شاملة من التقارير والتحليلات التي تساعدك في فهم أداء فريقك واتخاذ قرارات مدروسة. من تقارير الحضور إلى تحليلات الأداء ومؤشرات الرضا الوظيفي.",
      duration: 35,
      highlight: "قرارات مبنية على البيانات",
      tips: ["تقارير تفاعلية", "تصدير متعدد الصيغ", "جدولة تلقائية"]
    },
    {
      id: 6,
      title: "إعدادات مخصصة",
      description: "تخصيص النظام ليناسب احتياجات شركتك بالضبط",
      icon: Settings,
      content: "مرونة كاملة في تخصيص النظام ليناسب طبيعة عملك. من إعداد هيكل الشركة إلى تخصيص دورات العمل والموافقات، وتكوين السياسات والقواعد الخاصة بشركتك.",
      duration: 30,
      highlight: "مرونة كاملة في التخصيص",
      tips: ["واجهات قابلة للتخصيص", "سياسات مرنة", "تكامل مع الأنظمة الأخرى"]
    }
  ];

  const totalSteps = tourSteps.length;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep <= totalSteps) {
      const currentTourStep = tourSteps[currentStep - 1];
      const stepDuration = currentTourStep.duration * 1000; // Convert to milliseconds
      
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (stepDuration / 100));
          if (newProgress >= 100) {
            handleNextStep();
            return 0;
          }
          return newProgress;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
      setProgress(0);
    } else {
      setIsPlaying(false);
      setCompletedSteps(prev => [...prev, currentStep]);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setProgress(0);
      setCompletedSteps(prev => prev.filter(step => step !== currentStep));
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
    setProgress(0);
    setIsPlaying(false);
  };

  const currentTourStep = tourSteps[currentStep - 1];
  const isCompleted = currentStep > totalSteps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">ب</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  جولة تفاعلية
                </h1>
                <p className="text-xs text-muted-foreground">اكتشف إمكانيات بُعد HR</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tour Steps Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  خطوات الجولة
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {completedSteps.length} من {totalSteps} مكتملة
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tourSteps.map((step) => {
                    const isCurrentStep = step.id === currentStep;
                    const isStepCompleted = completedSteps.includes(step.id);
                    
                    return (
                      <div
                        key={step.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          isCurrentStep 
                            ? 'border-primary bg-primary/5' 
                            : isStepCompleted 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleStepClick(step.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCurrentStep 
                              ? 'bg-primary text-white' 
                              : isStepCompleted 
                              ? 'bg-green-500 text-white' 
                              : 'bg-muted'
                          }`}>
                            {isStepCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <step.icon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{step.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {step.duration} ثانية
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {!isCompleted ? (
              <Card className="min-h-[600px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <currentTourStep.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{currentTourStep.title}</CardTitle>
                        <p className="text-muted-foreground">{currentTourStep.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {currentStep} / {totalSteps}
                    </Badge>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>التقدم</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Highlight */}
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 text-primary font-medium mb-2">
                      <Zap className="w-4 h-4" />
                      النقطة المميزة
                    </div>
                    <p>{currentTourStep.highlight}</p>
                  </div>

                  {/* Main Content */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-lg leading-relaxed">{currentTourStep.content}</p>
                  </div>

                  {/* Tips */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MousePointer className="w-4 h-4" />
                      نصائح مهمة
                    </h3>
                    <div className="grid gap-2">
                      {currentTourStep.tips.map((tip, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevStep}
                        disabled={currentStep === 1}
                      >
                        <ArrowRight className="w-4 h-4 mr-1" />
                        السابق
                      </Button>
                      
                      <Button
                        onClick={handlePlay}
                        size="sm"
                        className="bg-primary hover:bg-primary-glow"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 mr-1" />
                            إيقاف
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            تشغيل
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextStep}
                        disabled={currentStep === totalSteps}
                      >
                        التالي
                        <ArrowLeft className="w-4 h-4 ml-1" />
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      المدة المتبقية: {currentTourStep.duration} ثانية
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Completion Screen
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">تهانينا! 🎉</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    لقد أكملت الجولة التفاعلية لمنصة بُعد HR بنجاح. أنت الآن جاهز لاستكشاف جميع إمكانيات المنصة المتطورة.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg"
                      className="bg-primary hover:bg-primary-glow"
                      onClick={() => navigate('/careers')}
                    >
                      انضم لفريقنا
                      <ArrowLeft className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => navigate('/')}
                    >
                      العودة للرئيسية
                      <Home className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="lg"
                      onClick={() => {
                        setCurrentStep(1);
                        setProgress(0);
                        setCompletedSteps([]);
                        setIsPlaying(false);
                      }}
                    >
                      إعادة الجولة
                      <SkipBack className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTour;