import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  Brain,
  BarChart3,
  Target,
  TrendingUp,
  Smile,
  Trophy,
  Users,
  FileText,
  Settings,
  Download,
  Upload,
  Save,
  Eye,
  FileDown,
  Languages,
  Zap,
  Package,
  Phone
} from 'lucide-react';
import { ImpactMeasurementDashboard } from './smart/ImpactMeasurementDashboard';
import { HappinessIndexIntegration } from './smart/HappinessIndexIntegration';
import { HappinessLeaderboard } from './smart/HappinessLeaderboard';
import { SelfServiceIntegration } from './smart/SelfServiceIntegration';
import { SmartInitiatives } from './smart/SmartInitiatives';
import { SmartRestructuring } from './smart/SmartRestructuring';
import { ChangeManagement } from './smart/ChangeManagement';
import { GovernanceCompliance } from './smart/GovernanceCompliance';
import { MaturityAssessment } from './smart/MaturityAssessment';
import { InstantReports } from './smart/InstantReports';
import { CallCenterManagement } from '../call-center/CallCenterManagement';

// Import hero image
import odSmartImage from '@/assets/od-smart.jpg';

export const OrganizationalDevelopmentSmart = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('impact');
  const [isDraft, setIsDraft] = useState(false);
  const { toast } = useToast();

  // Global actions available on all tabs
  const globalActions = [
    { id: 'instant-reports', label: isRTL ? 'التقارير الفورية' : 'Instant Reports', icon: Zap, variant: 'default' as const },
    { id: 'board-pack', label: isRTL ? 'حزمة مجلس الإدارة' : 'Board Pack', icon: Package, variant: 'default' as const },
    { id: 'save', label: isRTL ? 'حفظ' : 'Save', icon: Save, variant: 'outline' as const },
    { id: 'export-pdf', label: isRTL ? 'تصدير PDF' : 'Export PDF', icon: FileDown, variant: 'outline' as const },
    { id: 'export-excel', label: isRTL ? 'تصدير Excel' : 'Export Excel', icon: Download, variant: 'outline' as const },
    { id: 'import', label: isRTL ? 'استيراد' : 'Import', icon: Upload, variant: 'outline' as const }
  ];

  // Handle global actions
  const handleGlobalAction = (actionId: string) => {
    switch (actionId) {
      case 'instant-reports':
        setActiveTab('reports');
        toast({
          title: isRTL ? 'التقارير الفورية' : 'Instant Reports',
          description: isRTL ? 'تم فتح قسم التقارير الفورية' : 'Instant reports section opened'
        });
        break;
      case 'board-pack':
        setActiveTab('reports');
        // Trigger board pack generation
        toast({
          title: isRTL ? 'حزمة مجلس الإدارة' : 'Board Pack',
          description: isRTL ? 'جاري إنشاء حزمة التقرير التنفيذي' : 'Generating executive board pack'
        });
        break;
      case 'save':
        toast({
          title: isRTL ? 'تم الحفظ بنجاح' : 'Saved Successfully',
          description: isRTL ? 'تم حفظ التطوير المؤسسي' : 'Organizational development saved'
        });
        setIsDraft(false);
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
    { id: 'impact', label: isRTL ? 'قياس الأثر المؤسسي' : 'Impact Measurement', icon: TrendingUp },
    { id: 'happiness', label: isRTL ? 'مؤشر السعادة' : 'Happiness Index', icon: Smile },
    { id: 'leaderboard', label: isRTL ? 'لوحة الشرف' : 'Leaderboard', icon: Trophy },
    { id: 'initiatives', label: isRTL ? 'المبادرات الذكية' : 'Smart Initiatives', icon: Target },
    { id: 'restructuring', label: isRTL ? 'إعادة الهيكلة' : 'Restructuring', icon: BarChart3 },
    { id: 'change', label: isRTL ? 'إدارة التغيير' : 'Change Management', icon: Brain },
    { id: 'governance', label: isRTL ? 'الحوكمة' : 'Governance', icon: Settings },
    { id: 'maturity', label: isRTL ? 'قياس النضج' : 'Maturity Assessment', icon: Users },
    { id: 'integration', label: isRTL ? 'تكامل البوابة' : 'Portal Integration', icon: Users },
    { id: 'callcenter', label: isRTL ? 'الكول سنتر' : 'Call Center', icon: Phone },
    { id: 'reports', label: isRTL ? 'التقارير الذكية' : 'Smart Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            {isRTL ? 'نظام التطوير المؤسسي الذكي الشامل' : 'Smart Organizational Development System'}
          </h1>
          <p className="text-muted-foreground">
            {isRTL 
              ? 'منظومة تطوير متطورة تستخدم الذكاء الاصطناعي لقياس الأثر وتحليل السعادة الوظيفية'
              : 'Advanced AI-powered development system for impact measurement and workplace happiness analysis'
            }
          </p>
        </div>

        {/* Smart Organizational Development Content */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Brain className="w-5 h-5 text-primary" />
                  {isRTL ? 'نظام التطوير المؤسسي الذكي' : 'Smart Organizational Development System'}
                </CardTitle>
                <CardDescription>
                  {isRTL 
                    ? 'يجمع البيانات من جميع أنظمة التطوير والقياس لتوليد رؤى ذكية وتوصيات مبنية على الذكاء الاصطناعي'
                    : 'Combines data from all development and measurement systems to generate smart insights and AI-driven recommendations'
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
              <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11 mb-8 bg-muted/50">
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

              <TabsContent value="impact" className="mt-0">
                <ImpactMeasurementDashboard />
              </TabsContent>

              <TabsContent value="happiness" className="mt-0">
                <HappinessIndexIntegration />
              </TabsContent>

              <TabsContent value="leaderboard" className="mt-0">
                <HappinessLeaderboard />
              </TabsContent>

              <TabsContent value="initiatives" className="mt-0">
                <SmartInitiatives />
              </TabsContent>

              <TabsContent value="restructuring" className="mt-0">
                <SmartRestructuring />
              </TabsContent>

              <TabsContent value="change" className="mt-0">
                <ChangeManagement />
              </TabsContent>

              <TabsContent value="governance" className="mt-0">
                <GovernanceCompliance />
              </TabsContent>

              <TabsContent value="maturity" className="mt-0">
                <MaturityAssessment />
              </TabsContent>

              <TabsContent value="integration" className="mt-0">
                <SelfServiceIntegration />
              </TabsContent>

              <TabsContent value="callcenter" className="mt-0">
                <CallCenterManagement />
              </TabsContent>

              <TabsContent value="reports" className="mt-0">
                <InstantReports />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};