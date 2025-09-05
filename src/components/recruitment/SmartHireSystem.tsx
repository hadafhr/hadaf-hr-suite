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
  Bot,
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
  Languages,
  MessageSquare,
  Vote,
  UserCheck
} from 'lucide-react';
import { RecruitmentChatbot } from './smart/RecruitmentChatbot';
import { AIScreeningPredictions } from './smart/AIScreeningPredictions';
import { PanelReview } from './smart/PanelReview';
import { FinalVote } from './smart/FinalVote';
import { ExecutiveReports } from './smart/ExecutiveReports';
import { RecruitmentSettings } from './smart/RecruitmentSettings';
import { RecruitmentOverview } from './smart/RecruitmentOverview';
import { BoardPack } from './smart/BoardPack';

// Import the hero image
import smartHireImage from '@/assets/smart-hire.jpg';

export const SmartHireSystem = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('overview');
  const [isDraft, setIsDraft] = useState(false);
  const { toast } = useToast();

  // Global actions available on all tabs
  const globalActions = [
    { id: 'save', label: isRTL ? 'حفظ' : 'Save', icon: Save, variant: 'default' as const },
    { id: 'instant-report', label: isRTL ? 'تقرير فوري' : 'Instant Report', icon: TrendingUp, variant: 'default' as const },
    { id: 'preview', label: isRTL ? 'معاينة' : 'Preview', icon: Eye, variant: 'outline' as const },
    { id: 'export-pdf', label: isRTL ? 'تصدير PDF' : 'Export PDF', icon: FileDown, variant: 'outline' as const },
    { id: 'export-excel', label: isRTL ? 'تصدير Excel' : 'Export Excel', icon: Download, variant: 'outline' as const },
    { id: 'board-pack', label: isRTL ? 'حزمة مجلس الإدارة' : 'Board Pack', icon: Award, variant: 'outline' as const }
  ];

  // Handle global actions
  const handleGlobalAction = (actionId: string) => {
    switch (actionId) {
      case 'save':
        toast({
          title: isRTL ? 'تم الحفظ بنجاح' : 'Saved Successfully',
          description: isRTL ? 'تم حفظ بيانات التوظيف الذكي' : 'Smart recruitment data saved'
        });
        setIsDraft(false);
        break;
      case 'instant-report':
        toast({
          title: isRTL ? 'تقرير فوري' : 'Instant Report',
          description: isRTL ? 'جاري إنشاء التقرير الفوري' : 'Generating instant report'
        });
        break;
      case 'preview':
        toast({
          title: isRTL ? 'معاينة النظام' : 'Preview Mode',
          description: isRTL ? 'جاري فتح المعاينة' : 'Opening preview'
        });
        break;
      case 'export-pdf':
        toast({
          title: isRTL ? 'تصدير PDF' : 'Exporting PDF',
          description: isRTL ? 'جاري إنشاء ملف PDF بهوية بُعد' : 'Generating PDF with Boud identity'
        });
        break;
      case 'export-excel':
        toast({
          title: isRTL ? 'تصدير Excel' : 'Exporting Excel',
          description: isRTL ? 'جاري إنشاء ملف Excel' : 'Generating Excel file'
        });
        break;
      case 'board-pack':
        toast({
          title: isRTL ? 'حزمة مجلس الإدارة' : 'Board Pack',
          description: isRTL ? 'جاري إنشاء حزمة مجلس الإدارة' : 'Generating Board Pack'
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
    { id: 'overview', label: isRTL ? 'نظرة عامة' : 'Overview', icon: TrendingUp },
    { id: 'chatbot', label: isRTL ? 'الشات بوت التوظيفي' : 'Recruitment Chatbot', icon: Bot },
    { id: 'ai-screening', label: isRTL ? 'الفحص الذكي والتنبؤات' : 'AI Screening & Predictions', icon: Brain },
    { id: 'panel-review', label: isRTL ? 'مراجعة اللجنة' : 'Panel Review', icon: Users },
    { id: 'final-vote', label: isRTL ? 'التصويت النهائي' : 'Final Vote', icon: Vote },
    { id: 'executive', label: isRTL ? 'التقارير التنفيذية' : 'Executive Reports', icon: FileText },
    { id: 'board-pack', label: isRTL ? 'حزمة مجلس الإدارة' : 'Board Pack', icon: Award },
    { id: 'settings', label: isRTL ? 'الإعدادات' : 'Settings', icon: Settings },
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
                <div className="flex items-center gap-3">
                  <Bot className="h-8 w-8 text-primary" />
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                {isRTL ? 'منصة التوظيف الذكي SmartHire' : 'SmartHire Intelligent Recruitment Platform'}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {isRTL 
                  ? 'أتمتة كامل دورة التوظيف من الإعلان حتى التعيين مع الذكاء الاصطناعي والتقارير التنفيذية'
                  : 'Complete recruitment automation from posting to hiring with AI and executive reporting'
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
              <div className="w-96 h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg shadow-lg hover-scale flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Bot className="h-16 w-16 text-primary" />
                    <Brain className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-primary">SmartHire</p>
                  <p className="text-sm text-muted-foreground">AI-Powered Recruitment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Hire Content */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Bot className="w-5 h-5 text-primary" />
                  <Brain className="w-5 h-5 text-primary" />
                  {isRTL ? 'منصة التوظيف الذكي' : 'Smart Recruitment Platform'}
                </CardTitle>
                <CardDescription>
                  {isRTL 
                    ? 'نظام توظيف متكامل يستخدم الذكاء الاصطناعي للفحص والتقييم مع لجنة المراجعة والتقارير التنفيذية'
                    : 'Comprehensive recruitment system using AI for screening and evaluation with panel review and executive reporting'
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
                    <span className="hidden lg:block text-center">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <RecruitmentOverview />
              </TabsContent>

              <TabsContent value="chatbot" className="mt-0">
                <RecruitmentChatbot />
              </TabsContent>

              <TabsContent value="ai-screening" className="mt-0">
                <AIScreeningPredictions />
              </TabsContent>

              <TabsContent value="panel-review" className="mt-0">
                <PanelReview />
              </TabsContent>

              <TabsContent value="final-vote" className="mt-0">
                <FinalVote />
              </TabsContent>

              <TabsContent value="executive" className="mt-0">
                <ExecutiveReports />
              </TabsContent>

              <TabsContent value="board-pack" className="mt-0">
                <BoardPack />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <RecruitmentSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};