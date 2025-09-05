import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  ArrowLeft, 
  Languages, 
  Save, 
  Eye, 
  Download,
  BarChart3,
  FileText,
  Gavel,
  MessageSquare,
  Shield,
  AlertTriangle,
  FileBarChart
} from 'lucide-react';
import { toast } from 'sonner';

// Import Smart Components
import { LegalDashboard } from './smart/LegalDashboard';
import { ContractsRegulations } from './smart/ContractsRegulations';
import { LaborCases } from './smart/LaborCases';
import { LegalConsultations } from './smart/LegalConsultations';
import { DisciplinaryActions } from './smart/DisciplinaryActions';
import { ComplianceAudit } from './smart/ComplianceAudit';
import { LegalReports } from './smart/LegalReports';

export const SmartLegalAffairs: React.FC = () => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDraft, setIsDraft] = useState(false);

  // Global Actions Configuration
  const globalActions = [
    { id: 'save', label: 'حفظ', icon: Save, variant: 'default' as const },
    { id: 'preview', label: 'معاينة', icon: Eye, variant: 'outline' as const },
    { id: 'export', label: 'تصدير', icon: Download, variant: 'outline' as const }
  ];

  const handleGlobalAction = (actionId: string) => {
    switch (actionId) {
      case 'save':
        setIsDraft(false);
        toast.success('تم حفظ البيانات بنجاح');
        break;
      case 'preview':
        toast.info('فتح معاينة البيانات');
        break;
      case 'export':
        toast.info('جاري تصدير البيانات...');
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const tabsConfig = [
    {
      id: 'dashboard',
      label: 'لوحة التحكم',
      icon: BarChart3,
      component: <LegalDashboard />
    },
    {
      id: 'contracts',
      label: 'العقود واللوائح',
      icon: FileText,
      component: <ContractsRegulations />
    },
    {
      id: 'cases',
      label: 'القضايا العمالية',
      icon: Gavel,
      component: <LaborCases />
    },
    {
      id: 'consultations',
      label: 'الاستشارات القانونية',
      icon: MessageSquare,
      component: <LegalConsultations />
    },
    {
      id: 'disciplinary',
      label: 'الإجراءات التأديبية',
      icon: AlertTriangle,
      component: <DisciplinaryActions />
    },
    {
      id: 'compliance',
      label: 'الامتثال والتدقيق',
      icon: Shield,
      component: <ComplianceAudit />
    },
    {
      id: 'reports',
      label: 'التقارير',
      icon: FileBarChart,
      component: <LegalReports />
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8" dir="rtl">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20"></div>
        <div className="relative z-10">
          {/* Navigation Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="text-white hover:bg-white/20 border border-white/20"
              >
                <ArrowLeft className="ml-2 h-4 w-4" />
                رجوع
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleLanguage}
                className="text-white hover:bg-white/20 border border-white/20"
              >
                <Languages className="ml-2 h-4 w-4" />
                {i18n.language === 'ar' ? 'English' : 'العربية'}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {isDraft && (
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-200 border-yellow-400/30">
                  مسودة
                </Badge>
              )}
              {globalActions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.variant}
                  size="sm"
                  onClick={() => handleGlobalAction(action.id)}
                  className={action.variant === 'default' 
                    ? 'bg-white text-slate-900 hover:bg-white/90' 
                    : 'text-white border-white/20 hover:bg-white/20'
                  }
                >
                  <action.icon className="ml-2 h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Scale className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">نظام إدارة الشؤون القانونية الذكي</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              منظومة متطورة لإدارة الشؤون القانونية تستخدم الذكاء الاصطناعي لمراجعة العقود وإدارة القضايا مع التقارير الفورية والامتثال
            </p>
          </div>
        </div>
      </div>

      {/* Smart Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 rounded-xl bg-muted p-1 h-auto">
          {tabsConfig.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col items-center gap-2 py-4 px-6 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Contents */}
        {tabsConfig.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            <div className="bg-background rounded-xl border shadow-sm p-6">
              {tab.component}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};