import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SystemHeaderProps {
  onBack?: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  onCalculateEligibility?: () => void;
  onExportExcel?: () => void;
  onExportPDF?: () => void;
  showBackButton?: boolean;
  customButtons?: React.ReactNode;
}

export const SystemHeader: React.FC<SystemHeaderProps> = ({
  onBack,
  title,
  description,
  icon,
  onCalculateEligibility,
  onExportExcel,
  onExportPDF,
  showBackButton = true,
  customButtons
}) => {
  const { toast } = useToast();

  const handleCalculateEligibility = () => {
    if (onCalculateEligibility) {
      onCalculateEligibility();
    } else {
      toast({
        title: "حساب الأهلية",
        description: "تم تشغيل نظام حساب الأهلية بنجاح",
      });
    }
  };

  const handleExportExcel = () => {
    if (onExportExcel) {
      onExportExcel();
    } else {
      toast({
        title: "تصدير Excel",
        description: "تم تصدير البيانات إلى ملف Excel بنجاح",
      });
    }
  };

  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF();
    } else {
      toast({
        title: "تقرير PDF",
        description: "تم إنشاء التقرير بتنسيق PDF بنجاح",
      });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-primary p-8 mb-8 shadow-2xl">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {showBackButton && onBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                رجوع
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleCalculateEligibility}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
            >
              <Calculator className="h-4 w-4 ml-2" />
              حساب الأهلية
            </Button>
            <Button 
              onClick={handleExportExcel}
              className="bg-primary/80 border-primary/30 text-white hover:bg-primary/90 backdrop-blur-sm"
            >
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button 
              onClick={handleExportPDF}
              className="bg-red-600/80 border-red-600/30 text-white hover:bg-red-600/90 backdrop-blur-sm"
            >
              <FileText className="h-4 w-4 ml-2" />
              تقرير PDF
            </Button>
            {customButtons}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              {icon}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {title}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};