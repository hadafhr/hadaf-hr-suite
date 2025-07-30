import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, ArrowRight } from 'lucide-react';

interface DemoStep {
  id: number;
  title: string;
  description: string;
  action: string;
  screenshot?: string;
  tips?: string[];
  isCompleted?: boolean;
}

interface InteractiveDemoProps {
  title: string;
  steps: DemoStep[];
  platformUrl?: string;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ 
  title, 
  steps,
  platformUrl 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      markStepComplete(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const progress = (completedSteps.length / steps.length) * 100;
  const step = steps[currentStep];

  return (
    <Card className="border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <ArrowRight className="h-5 w-5 text-blue-600" />
          عرض تفاعلي - {title}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>الخطوة {currentStep + 1} من {steps.length}</span>
            <span>{Math.round(progress)}% مكتمل</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* عرض الخطوة الحالية */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={completedSteps.includes(currentStep) ? "default" : "secondary"}>
              {completedSteps.includes(currentStep) ? (
                <CheckCircle className="h-3 w-3 ml-1" />
              ) : null}
              خطوة {currentStep + 1}
            </Badge>
            <h3 className="text-lg font-semibold">{step.title}</h3>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-right leading-relaxed">{step.description}</p>
          </div>

          {/* إجراء مطلوب */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
              الإجراء المطلوب:
            </h4>
            <p className="text-green-700 dark:text-green-300 text-right">
              {step.action}
            </p>
          </div>

          {/* لقطة الشاشة المحاكاة */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="aspect-video bg-white dark:bg-gray-900 rounded border shadow-sm flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  محاكاة لواجهة {title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.title}
                </p>
              </div>
            </div>
          </div>

          {/* نصائح مفيدة */}
          {step.tips && step.tips.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                💡 نصائح مفيدة:
              </h4>
              <ul className="space-y-1 text-right">
                {step.tips.map((tip, index) => (
                  <li key={index} className="text-yellow-700 dark:text-yellow-300 text-sm">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              variant="outline"
              size="sm"
            >
              <ChevronRight className="h-4 w-4 ml-1" />
              السابق
            </Button>
            
            <Button
              onClick={resetDemo}
              variant="ghost"
              size="sm"
            >
              <RotateCcw className="h-4 w-4 ml-1" />
              إعادة تشغيل
            </Button>
          </div>

          <div className="flex gap-2">
            {currentStep === steps.length - 1 ? (
              <Button
                onClick={() => markStepComplete(currentStep)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 ml-1" />
                إنهاء العرض
              </Button>
            ) : (
              <Button onClick={handleNextStep}>
                التالي
                <ChevronLeft className="h-4 w-4 mr-1" />
              </Button>
            )}
          </div>
        </div>

        {/* رابط الانتقال للمنصة */}
        {platformUrl && (
          <div className="border-t pt-4">
            <Button
              onClick={() => window.open(platformUrl, '_blank')}
              variant="outline"
              className="w-full"
            >
              انتقل إلى المنصة الفعلية
              <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};