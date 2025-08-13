import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  Brain,
  BarChart3,
  Scale,
  AlertTriangle,
  Target,
  PlayCircle,
  Settings,
  FileText,
  TrendingUp,
  Users,
  Activity,
  Award,
  Download,
  Upload,
  Save,
  Eye,
  FileDown,
  Languages
} from 'lucide-react';
import { SmartOverview } from './smart/SmartOverview';
import { SmartScorecards } from './smart/SmartScorecards';
import { CalibrationWorkspace } from './smart/CalibrationWorkspace';
import { InsightsRisks } from './smart/InsightsRisks';
import { RecommendationsIDP } from './smart/RecommendationsIDP';
import { WhatIfSimulator } from './smart/WhatIfSimulator';
import { SmartSettings } from './smart/SmartSettings';
import { SmartReports } from './smart/SmartReports';

// Import the hero image
import smartEvaluationsImage from '@/assets/smart-evaluations.jpg';

export const SmartEvaluations = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('overview');
  const [isDraft, setIsDraft] = useState(false);
  const { toast } = useToast();

  // Global actions available on all tabs
  const globalActions = [
    { id: 'save', label: isRTL ? 'حفظ' : 'Save', icon: Save, variant: 'default' as const },
    { id: 'save-draft', label: isRTL ? 'حفظ كمسودة' : 'Save Draft', icon: Save, variant: 'outline' as const },
    { id: 'preview', label: isRTL ? 'معاينة' : 'Preview', icon: Eye, variant: 'outline' as const },
    { id: 'export-pdf', label: isRTL ? 'تصدير PDF' : 'Export PDF', icon: FileDown, variant: 'outline' as const },
    { id: 'export-excel', label: isRTL ? 'تصدير Excel' : 'Export Excel', icon: Download, variant: 'outline' as const },
    { id: 'import', label: isRTL ? 'استيراد' : 'Import', icon: Upload, variant: 'outline' as const }
  ];

  // Handle global actions
  const handleGlobalAction = (actionId: string) => {
    switch (actionId) {
      case 'save':
        toast({
          title: isRTL ? 'تم الحفظ بنجاح' : 'Saved Successfully',
          description: isRTL ? 'تم حفظ التقييم الذكي' : 'Smart evaluation saved'
        });
        setIsDraft(false);
        break;
      case 'save-draft':
        toast({
          title: isRTL ? 'تم حفظ المسودة' : 'Draft Saved',
          description: isRTL ? 'تم حفظ المسودة بنجاح' : 'Draft saved successfully'
        });
        setIsDraft(true);
        break;
      case 'preview':
        toast({
          title: isRTL ? 'معاينة التقييم' : 'Preview Mode',
          description: isRTL ? 'جاري فتح المعاينة' : 'Opening preview'
        });
        break;
      case 'export-pdf':
        toast({
          title: isRTL ? 'تصدير PDF' : 'Exporting PDF',
          description: isRTL ? 'جاري إنشاء ملف PDF' : 'Generating PDF file'
        });
        break;
      case 'export-excel':
        toast({
          title: isRTL ? 'تصدير Excel' : 'Exporting Excel',
          description: isRTL ? 'جاري إنشاء ملف Excel' : 'Generating Excel file'
        });
        break;
      case 'import':
        toast({
          title: isRTL ? 'استيراد البيانات' : 'Import Data',
          description: isRTL ? 'جاري استيراد البيانات' : 'Importing data'
        });
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  const tabs = [
    { id: 'overview', label: isRTL ? 'نظرة عامة' : 'Overview', icon: BarChart3 },
    { id: 'scorecards', label: isRTL ? 'بطاقات النتائج الذكية' : 'Smart Scorecards', icon: Award },
    { id: 'calibration', label: isRTL ? 'المعايرة' : 'Calibration', icon: Scale },
    { id: 'insights', label: isRTL ? 'الرؤى والمخاطر' : 'Insights & Risks', icon: AlertTriangle },
    { id: 'recommendations', label: isRTL ? 'التوصيات (IDP)' : 'Recommendations (IDP)', icon: Target },
    { id: 'simulator', label: isRTL ? 'محاكي ماذا لو' : 'What-If Simulator', icon: PlayCircle },
    { id: 'settings', label: isRTL ? 'الإعدادات' : 'Settings', icon: Settings },
    { id: 'reports', label: isRTL ? 'التقارير' : 'Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
          <div className="relative z-10 flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Button variant="outline" size="sm" onClick={handleBack} className="hover-scale">
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
                <Button variant="outline" size="sm" onClick={toggleLanguage} className="hover-scale">
                  <Languages className="h-4 w-4 mr-2" />
                  {isRTL ? 'EN' : 'عربي'}
                </Button>
              </div>
              
              <h1 className="text-4xl font-bold text-gradient mb-4">
                <Brain className="inline h-8 w-8 mr-3 text-primary" />
                {isRTL ? 'التقييم الذكي بالذكاء الاصطناعي' : 'AI-Powered Smart Evaluations'}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {isRTL 
                  ? 'منظومة تقييم متطورة تستخدم الذكاء الاصطناعي لتحليل الأداء وتقديم توصيات ذكية'
                  : 'Advanced AI-powered evaluation system for intelligent performance analysis and recommendations'
                }
              </p>
              
              <div className="flex flex-wrap gap-3">
                {globalActions.map((action) => (
                  <Button
                    key={action.id}
                    variant={action.variant}
                    size="sm"
                    onClick={() => handleGlobalAction(action.id)}
                    className="hover-scale"
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src={smartEvaluationsImage} 
                alt="Smart Evaluations" 
                className="w-96 h-48 object-cover rounded-lg shadow-lg hover-scale"
              />
            </div>
          </div>
        </div>

        {/* Smart Evaluations Content */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Brain className="w-5 h-5 text-primary" />
                  {isRTL ? 'نظام التقييم الذكي' : 'Smart Evaluation System'}
                </CardTitle>
                <CardDescription>
                  {isRTL 
                    ? 'يجمع البيانات من جميع أنظمة التقييم والتقييمات لتوليد نتائج ذكية ورؤى قائمة على الذكاء الاصطناعي'
                    : 'Combines data from all appraisal systems and assessments to generate smart scores and AI-driven insights'
                  }
                </CardDescription>
              </div>
              <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                {isRTL ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8 bg-muted/50">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex flex-col gap-1 h-16 text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden lg:block">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <SmartOverview />
              </TabsContent>

              <TabsContent value="scorecards" className="mt-0">
                <SmartScorecards />
              </TabsContent>

              <TabsContent value="calibration" className="mt-0">
                <CalibrationWorkspace />
              </TabsContent>

              <TabsContent value="insights" className="mt-0">
                <InsightsRisks />
              </TabsContent>

              <TabsContent value="recommendations" className="mt-0">
                <RecommendationsIDP />
              </TabsContent>

              <TabsContent value="simulator" className="mt-0">
                <WhatIfSimulator />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <SmartSettings />
              </TabsContent>

              <TabsContent value="reports" className="mt-0">
                <SmartReports />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};