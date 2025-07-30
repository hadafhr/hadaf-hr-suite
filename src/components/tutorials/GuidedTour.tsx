import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Navigation, 
  Target, 
  ArrowRight, 
  ArrowDown, 
  ArrowUp, 
  ArrowLeft,
  X,
  Play,
  SkipForward
} from 'lucide-react';

interface TourStep {
  id: number;
  target: string; // CSS selector for the target element
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: 'click' | 'hover' | 'input' | 'scroll';
  nextAction?: 'auto' | 'manual';
  highlight?: boolean;
}

interface GuidedTourProps {
  title: string;
  platformName: string;
  steps: TourStep[];
  onStart?: () => void;
  onComplete?: () => void;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({ 
  title, 
  platformName,
  steps,
  onStart,
  onComplete
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
    onStart?.();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    setIsActive(false);
    setCurrentStep(0);
    setHighlightedElement(null);
    onComplete?.();
  };

  const skipTour = () => {
    completeTour();
  };

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      setHighlightedElement(steps[currentStep].target);
    }
  }, [isActive, currentStep, steps]);

  const getArrowIcon = (position: string) => {
    switch (position) {
      case 'top': return <ArrowUp className="h-4 w-4" />;
      case 'bottom': return <ArrowDown className="h-4 w-4" />;
      case 'left': return <ArrowLeft className="h-4 w-4" />;
      case 'right': return <ArrowRight className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getActionText = (action?: string) => {
    switch (action) {
      case 'click': return 'اضغط هنا';
      case 'hover': return 'مرر الماوس هنا';
      case 'input': return 'أدخل البيانات هنا';
      case 'scroll': return 'اسحب لأسفل';
      default: return 'انظر هنا';
    }
  };

  if (!isActive) {
    return (
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <Navigation className="h-5 w-5 text-green-600" />
            جولة إرشادية - {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-green-700 border-green-300">
              {platformName}
            </Badge>
            
            <p className="text-muted-foreground leading-relaxed">
              ستأخذك هذه الجولة في رحلة تفاعلية لاستكشاف جميع ميزات منصة {platformName} 
              خطوة بخطوة مع إرشادات مباشرة على العناصر الفعلية.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                ما ستتعلمه في هذه الجولة:
              </h4>
              <ul className="text-right space-y-1 text-green-700 dark:text-green-300 text-sm">
                {steps.slice(0, 4).map((step, index) => (
                  <li key={step.id} className="flex items-center gap-2">
                    <Target className="h-3 w-3 flex-shrink-0" />
                    {step.title}
                  </li>
                ))}
                {steps.length > 4 && (
                  <li className="text-green-600 dark:text-green-400 font-medium">
                    + {steps.length - 4} خطوات إضافية
                  </li>
                )}
              </ul>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={startTour} size="lg" className="bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 ml-2" />
                ابدأ الجولة
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              المدة المتوقعة: {Math.ceil(steps.length * 0.5)} دقائق
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* خلفية التعتيم */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* نافذة الإرشاد */}
      <div className="fixed z-50" style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Card className="w-96 border-green-500 shadow-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-right">
                {currentStepData.title}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={skipTour}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {currentStep + 1} من {steps.length}
              </Badge>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* وصف الخطوة */}
            <div className="text-right space-y-2">
              <p className="leading-relaxed text-sm">
                {currentStepData.description}
              </p>
              
              {currentStepData.action && (
                <div className="flex items-center gap-2 justify-end">
                  {getArrowIcon(currentStepData.position)}
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {getActionText(currentStepData.action)}
                  </span>
                </div>
              )}
            </div>

            {/* محاكاة تمييز العنصر المستهدف */}
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                <Target className="h-4 w-4" />
                <span>العنصر المستهدف: {currentStepData.target}</span>
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-2">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                  size="sm"
                >
                  السابق
                </Button>
                
                <Button
                  onClick={skipTour}
                  variant="ghost"
                  size="sm"
                >
                  <SkipForward className="h-4 w-4 ml-1" />
                  تخطي
                </Button>
              </div>

              <Button
                onClick={nextStep}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                {currentStep === steps.length - 1 ? 'إنهاء' : 'التالي'}
                <ArrowLeft className="h-4 w-4 mr-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تمييز العنصر المستهدف (محاكاة) */}
      {highlightedElement && (
        <div className="fixed inset-0 pointer-events-none z-45">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-20 border-4 border-green-400 border-dashed rounded-lg bg-green-400/20 animate-pulse flex items-center justify-center">
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};