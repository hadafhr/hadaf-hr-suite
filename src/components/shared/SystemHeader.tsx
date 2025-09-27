import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calculator, Download, FileText, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface SystemHeaderProps {
  onBack?: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  onCalculateEligibility?: () => void;
  onExportExcel?: () => void;
  onExportPDF?: () => void;
  showBackButton?: boolean;
  showDashboardButton?: boolean;
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
  showDashboardButton = true,
  customButtons
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
    <div className="flex items-center justify-between mb-12 p-6 backdrop-blur-xl bg-black/20 border border-[#008C6A]/20 shadow-2xl shadow-[#008C6A]/10 rounded-3xl animate-fade-in">
      <div className="flex items-center gap-6">
        {showDashboardButton && (
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => navigate('/company-dashboard')} 
            className="bg-black/30 border-[#008C6A]/30 text-gray-300 hover:bg-teal-600/20 hover:text-white hover:border-teal-400 transition-all duration-300"
          >
            <Home className="h-4 w-4 ml-2" />
            لوحة التحكم
          </Button>
        )}
        {showBackButton && onBack && (
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onBack} 
            className="bg-black/30 border-[#008C6A]/30 text-gray-300 hover:bg-teal-600/20 hover:text-white hover:border-teal-400 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            رجوع
          </Button>
        )}
        <div className="h-8 w-px bg-[#008C6A]/30"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <div className="relative z-10 group-hover:scale-110 transition-transform text-white">
              {icon}
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {title}
            </h1>
            <p className="text-gray-400 text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="bg-teal-900/20 border-teal-400/30 text-teal-300 px-4 py-2 text-sm font-medium">
          <Calculator className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button 
          variant="default"
          onClick={handleCalculateEligibility}
          className="bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Calculator className="h-4 w-4 ml-2" />
          حساب الأهلية
        </Button>
        <Button 
          variant="default"
          onClick={handleExportExcel}
          className="bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download className="h-4 w-4 ml-2" />
          تصدير Excel
        </Button>
        <Button 
          variant="default"
          onClick={handleExportPDF}
          className="bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FileText className="h-4 w-4 ml-2" />
          تقرير PDF
        </Button>
        {customButtons}
      </div>
    </div>
  );
};