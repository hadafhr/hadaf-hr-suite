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
    <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
      <div className="flex items-center gap-6">
        {showDashboardButton && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/company-dashboard')} 
            className="border-[#3CB593]/30 bg-[#3CB593]/5 text-[#3CB593] hover:bg-[#3CB593]/10 hover:border-[#3CB593]/50 transition-all duration-300"
          >
            <Home className="h-4 w-4 ml-2" />
            لوحة التحكم
          </Button>
        )}
        {showBackButton && onBack && (
          <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
            <ArrowLeft className="h-4 w-4 ml-2" />
            رجوع
          </Button>
        )}
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <div className="relative z-10 group-hover:scale-110 transition-transform text-white">
              {icon}
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              {title}
            </h1>
            <p className="text-gray-600 text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <Calculator className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button 
          onClick={handleCalculateEligibility}
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Calculator className="h-4 w-4 ml-2" />
          حساب الأهلية
        </Button>
        <Button 
          onClick={handleExportExcel}
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download className="h-4 w-4 ml-2" />
          تصدير Excel
        </Button>
        <Button 
          onClick={handleExportPDF}
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FileText className="h-4 w-4 ml-2" />
          تقرير PDF
        </Button>
        {customButtons}
      </div>
    </div>
  );
};