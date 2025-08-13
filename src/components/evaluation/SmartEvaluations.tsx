import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

export const SmartEvaluations = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('overview');
  const [isDraft, setIsDraft] = useState(false);

  // Global actions available on all tabs
  const globalActions = [
    { id: 'save', label: isRTL ? 'حفظ' : 'Save', icon: Save, variant: 'default' as const },
    { id: 'save-draft', label: isRTL ? 'حفظ كمسودة' : 'Save Draft', icon: Save, variant: 'outline' as const },
    { id: 'preview', label: isRTL ? 'معاينة' : 'Preview', icon: Eye, variant: 'outline' as const },
    { id: 'export-pdf', label: isRTL ? 'تصدير PDF' : 'Export PDF', icon: FileDown, variant: 'outline' as const },
    { id: 'export-excel', label: isRTL ? 'تصدير Excel' : 'Export Excel', icon: Download, variant: 'outline' as const },
    { id: 'import', label: isRTL ? 'استيراد' : 'Import CSV', icon: Upload, variant: 'outline' as const },
  ];

  const handleGlobalAction = (actionId: string) => {
    switch (actionId) {
      case 'save':
        console.log('Saving smart evaluations...');
        break;
      case 'save-draft':
        setIsDraft(true);
        console.log('Saving as draft...');
        break;
      case 'preview':
        console.log('Opening preview...');
        break;
      case 'export-pdf':
        console.log('Exporting to PDF...');
        break;
      case 'export-excel':
        console.log('Exporting to Excel...');
        break;
      case 'import':
        console.log('Opening import dialog...');
        break;
    }
  };

  const handleBack = () => {
    console.log('Navigating back to Performance Management...');
    // Navigate back to main Performance Management page
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="gap-2 hover:bg-accent/50"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {isRTL ? 'التقييمات الذكية' : 'Smart Evaluations'}
                </h1>
                <p className="text-muted-foreground">
                  {isRTL ? 'تقييمات مدعومة بالذكاء الاصطناعي مع رؤى ذكية' : 'AI-Powered Evaluations with Smart Insights'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Languages className="w-4 h-4" />
              {isRTL ? 'English' : 'العربية'}
            </Button>
            {isDraft && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {isRTL ? 'مسودة' : 'Draft'}
              </Badge>
            )}
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2 p-4 bg-card rounded-xl border shadow-sm">
          {globalActions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              size="sm"
              onClick={() => handleGlobalAction(action.id)}
              className="gap-2"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
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
  );
};