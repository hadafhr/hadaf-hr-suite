import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Lightbulb,
  ZoomIn,
  Download
} from 'lucide-react';

interface GuideStep {
  id: number;
  title: string;
  description: string;
  screenshot: string;
  annotations?: {
    x: number;
    y: number;
    text: string;
    type: 'click' | 'input' | 'info' | 'warning';
  }[];
  tips?: string[];
  warnings?: string[];
}

interface VisualGuideProps {
  title: string;
  category: string;
  steps: GuideStep[];
}

export const VisualGuide: React.FC<VisualGuideProps> = ({ 
  title, 
  category,
  steps 
}) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const currentStep = steps[selectedStep];

  const getAnnotationColor = (type: string) => {
    switch (type) {
      case 'click': return 'bg-blue-500 border-blue-600';
      case 'input': return 'bg-green-500 border-green-600';
      case 'info': return 'bg-purple-500 border-purple-600';
      case 'warning': return 'bg-red-500 border-red-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getAnnotationIcon = (type: string) => {
    switch (type) {
      case 'click': return '👆';
      case 'input': return '✏️';
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      default: return '📍';
    }
  };

  return (
    <Card className="border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <Camera className="h-5 w-5 text-purple-600" />
          دليل مصور - {title}
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          {category}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={selectedStep.toString()} onValueChange={(value) => setSelectedStep(parseInt(value))}>
          {/* قائمة الخطوات */}
          <TabsList className="grid w-full grid-cols-4 h-auto gap-2 bg-transparent">
            {steps.map((step, index) => (
              <TabsTrigger
                key={step.id}
                value={index.toString()}
                className="flex flex-col p-3 h-auto data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30"
              >
                <span className="text-xs font-medium">خطوة {index + 1}</span>
                <span className="text-xs opacity-75 text-center">{step.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* محتوى كل خطوة */}
          {steps.map((step, index) => (
            <TabsContent key={step.id} value={index.toString()} className="mt-6 space-y-4">
              {/* عنوان الخطوة */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* لقطة الشاشة مع التعليقات التوضيحية */}
              <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="relative aspect-video bg-white dark:bg-gray-900 rounded border shadow-sm overflow-hidden">
                  {/* محاكاة لقطة الشاشة */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center relative">
                    <div className="text-center space-y-2">
                      <Camera className="h-16 w-16 text-purple-400 mx-auto" />
                      <p className="text-lg font-medium text-purple-700 dark:text-purple-300">
                        لقطة شاشة - {step.title}
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        سيتم إضافة الصور الفعلية هنا
                      </p>
                    </div>

                    {/* التعليقات التوضيحية */}
                    {step.annotations?.map((annotation, idx) => (
                      <div
                        key={idx}
                        className={`absolute w-8 h-8 rounded-full ${getAnnotationColor(annotation.type)} 
                          border-2 flex items-center justify-center text-white text-xs font-bold
                          cursor-pointer hover:scale-110 transition-transform`}
                        style={{
                          left: `${annotation.x}%`,
                          top: `${annotation.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        title={annotation.text}
                      >
                        {getAnnotationIcon(annotation.type)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* أزرار التحكم في الصورة */}
                <div className="flex justify-between items-center mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoomedImage(step.screenshot)}
                  >
                    <ZoomIn className="h-4 w-4 ml-1" />
                    تكبير
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 ml-1" />
                    تحميل
                  </Button>
                </div>
              </div>

              {/* قائمة التعليقات التوضيحية */}
              {step.annotations && step.annotations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    التعليقات التوضيحية:
                  </h4>
                  <div className="grid gap-2">
                    {step.annotations.map((annotation, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border-r-4 bg-muted/30`}
                        style={{
                          borderRightColor: annotation.type === 'click' ? '#3b82f6' :
                                          annotation.type === 'input' ? '#10b981' :
                                          annotation.type === 'info' ? '#8b5cf6' : '#ef4444'
                        }}
                      >
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-lg">{getAnnotationIcon(annotation.type)}</span>
                          <span>{annotation.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* نصائح مفيدة */}
              {step.tips && step.tips.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium flex items-center gap-2 text-blue-800 dark:text-blue-200 mb-2">
                    <Lightbulb className="h-4 w-4" />
                    نصائح مفيدة:
                  </h4>
                  <ul className="space-y-1 text-right">
                    {step.tips.map((tip, idx) => (
                      <li key={idx} className="text-blue-700 dark:text-blue-300 text-sm flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* تحذيرات مهمة */}
              {step.warnings && step.warnings.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-medium flex items-center gap-2 text-red-800 dark:text-red-200 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    تحذيرات مهمة:
                  </h4>
                  <ul className="space-y-1 text-right">
                    {step.warnings.map((warning, idx) => (
                      <li key={idx} className="text-red-700 dark:text-red-300 text-sm flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 mt-1 flex-shrink-0" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* نافذة تكبير الصورة */}
        {zoomedImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setZoomedImage(null)}
          >
            <div className="max-w-4xl max-h-full bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  صورة مكبرة - {currentStep.title}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};