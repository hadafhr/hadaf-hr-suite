import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Brain, Bot, MessageCircle, BarChart3, Lightbulb, 
  TrendingUp, Zap, FileText, Settings 
} from 'lucide-react';
import AIDashboard from './ai/AIDashboard';
import AIAssistantChat from './ai/AIAssistantChat';
import PredictiveAnalytics from './ai/PredictiveAnalytics';
import SmartRecommendations from './ai/SmartRecommendations';
import AutomationWorkflows from './ai/AutomationWorkflows';
import AIReportsInsights from './ai/AIReportsInsights';
import AISettings from './ai/AISettings';

interface ArtificialIntelligenceProps {
  onBack: () => void;
}

const ArtificialIntelligence = ({ onBack }: ArtificialIntelligenceProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: isRTL ? 'لوحة التحكم' : 'Dashboard',
      icon: BarChart3,
      component: AIDashboard
    },
    {
      id: 'assistant',
      label: isRTL ? 'المساعد الذكي' : 'AI Assistant',
      icon: Bot,
      component: AIAssistantChat
    },
    {
      id: 'analytics',
      label: isRTL ? 'التحليلات التنبؤية' : 'Predictive Analytics',
      icon: TrendingUp,
      component: PredictiveAnalytics
    },
    {
      id: 'recommendations',
      label: isRTL ? 'التوصيات الذكية' : 'Smart Recommendations',
      icon: Lightbulb,
      component: SmartRecommendations
    },
    {
      id: 'automation',
      label: isRTL ? 'الأتمتة والسير' : 'Automation & Workflows',
      icon: Zap,
      component: AutomationWorkflows
    },
    {
      id: 'reports',
      label: isRTL ? 'التقارير والرؤى' : 'Reports & Insights',
      icon: FileText,
      component: AIReportsInsights
    },
    {
      id: 'settings',
      label: isRTL ? 'الإعدادات' : 'Settings',
      icon: Settings,
      component: AISettings
    }
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-card rounded-2xl p-6 mb-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isRTL ? 'مركز الذكاء الاصطناعي' : 'Artificial Intelligence Center'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'منظومة ذكية شاملة لتحليل البيانات والتنبؤ بالاتجاهات وتقديم توصيات ذكية لاتخاذ قرارات مدروسة'
                : 'Comprehensive intelligent system for data analysis, trend prediction, and smart recommendations for informed decision making'
              }
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-6">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <tab.component />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArtificialIntelligence;