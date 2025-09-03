import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Brain, Bot, MessageCircle, BarChart3, Lightbulb, 
  TrendingUp, Zap, FileText, Settings, Sparkles, Database, 
  Share, Download, Globe, Activity, Eye, Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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
      component: AIDashboard,
      description: isRTL ? 'رؤى الذكاء الاصطناعي والتنبيهات' : 'AI insights and alerts'
    },
    {
      id: 'assistant',
      label: isRTL ? 'المساعد الذكي' : 'AI Assistant',
      icon: Bot,
      component: AIAssistantChat,
      description: isRTL ? 'دردشة ذكية بالنص والصوت' : 'Smart text & voice chat'
    },
    {
      id: 'analytics',
      label: isRTL ? 'التحليلات التنبؤية' : 'Predictive Analytics',
      icon: TrendingUp,
      component: PredictiveAnalytics,
      description: isRTL ? 'توقع المخاطر والاتجاهات' : 'Predict risks and trends'
    },
    {
      id: 'recommendations',
      label: isRTL ? 'التوصيات الذكية' : 'Smart Recommendations',
      icon: Lightbulb,
      component: SmartRecommendations,
      description: isRTL ? 'توصيات التدريب والترقية' : 'Training & promotion suggestions'
    },
    {
      id: 'automation',
      label: isRTL ? 'الأتمتة والسير' : 'Automation & Workflows',
      icon: Zap,
      component: AutomationWorkflows,
      description: isRTL ? 'أتمتة المهام المتكررة' : 'Automate repetitive tasks'
    },
    {
      id: 'reports',
      label: isRTL ? 'التقارير والرؤى' : 'Reports & Insights',
      icon: FileText,
      component: AIReportsInsights,
      description: isRTL ? 'تقارير ذكية قابلة للتصدير' : 'Smart exportable reports'
    },
    {
      id: 'settings',
      label: isRTL ? 'الإعدادات' : 'Settings',
      icon: Settings,
      component: AISettings,
      description: isRTL ? 'إعدادات الذكاء الاصطناعي' : 'AI configuration settings'
    }
  ];

  // AI Performance Data
  const aiPerformanceData = [
    { month: 'Jan', predictions: 245, accuracy: 94, insights: 156 },
    { month: 'Feb', predictions: 268, accuracy: 96, insights: 178 },
    { month: 'Mar', predictions: 289, accuracy: 95, insights: 195 },
    { month: 'Apr', predictions: 312, accuracy: 97, insights: 223 },
    { month: 'May', predictions: 334, accuracy: 98, insights: 248 },
    { month: 'Jun', predictions: 356, accuracy: 99, insights: 267 }
  ];

  const aiMetrics = [
    { name: 'Smart Predictions', value: 356, color: 'hsl(var(--primary))' },
    { name: 'Generated Insights', value: 267, color: 'hsl(var(--chart-2))' },
    { name: 'Active Recommendations', value: 189, color: 'hsl(var(--chart-3))' },
    { name: 'Trained Models', value: 45, color: 'hsl(var(--chart-4))' }
  ];

  const aiFeatures = [
    { icon: Brain, label: isRTL ? 'النماذج الذكية' : 'Smart Models', count: 8, color: 'bg-gradient-to-r from-blue-500 to-purple-600' },
    { icon: Bot, label: isRTL ? 'المساعد الذكي' : 'AI Assistant', count: 5, color: 'bg-gradient-to-r from-green-500 to-teal-600' },
    { icon: BarChart3, label: isRTL ? 'التحليلات المتقدمة' : 'Advanced Analytics', count: 12, color: 'bg-gradient-to-r from-orange-500 to-red-600' },
    { icon: Lightbulb, label: isRTL ? 'الرؤى الذكية' : 'Smart Insights', count: 267, color: 'bg-gradient-to-r from-yellow-500 to-orange-600' },
    { icon: TrendingUp, label: isRTL ? 'التنبؤ بالاتجاهات' : 'Trend Prediction', count: 15, color: 'bg-gradient-to-r from-indigo-500 to-blue-600' },
    { icon: Zap, label: isRTL ? 'الأتمتة الذكية' : 'Smart Automation', count: 23, color: 'bg-gradient-to-r from-purple-500 to-pink-600' }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Advanced Header with Gradient Background */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-chart-2/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="relative z-10">
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {isRTL ? 'نظام متقدم' : 'Advanced System'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
                  <Share className="h-4 w-4 mr-2" />
                  {isRTL ? 'استيراد نماذج' : 'Import Models'}
                </Button>
                <Button className="bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300">
                  <Download className="h-4 w-4 mr-2" />
                  {isRTL ? 'تصدير تقارير' : 'Export Reports'}
                </Button>
                <Button className="bg-gradient-to-r from-chart-2 to-chart-3 hover:from-chart-2/90 hover:to-chart-3/90 text-white shadow-lg transition-all duration-300">
                  <Database className="h-4 w-4 mr-2" />
                  {isRTL ? 'تدريب نماذج' : 'Train Models'}
                </Button>
              </div>
            </div>
            
            {/* Main Header Content */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg">
                  <Brain className="h-16 w-16 text-white" />
                </div>
                <div className="hidden md:flex items-center gap-4">
                  {aiFeatures.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                      <feature.icon className="h-8 w-8 text-white/80" />
                    </div>
                  ))}
                </div>
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                {isRTL ? 'مركز الذكاء الاصطناعي المتقدم' : 'Advanced AI Intelligence Center'}
              </h1>
              <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
                {isRTL 
                  ? 'منظومة ذكية شاملة لتحليل البيانات والتنبؤ بالاتجاهات وتقديم توصيات ذكية لاتخاذ قرارات مدروسة باستخدام أحدث تقنيات الذكاء الاصطناعي'
                  : 'Comprehensive intelligent system for data analysis, trend prediction, and smart recommendations using cutting-edge AI technologies for informed decision making'
                }
              </p>
              
              {/* Performance Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-white/80 text-sm">{isRTL ? 'دقة التنبؤ' : 'Prediction Accuracy'}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">356</div>
                  <div className="text-white/80 text-sm">{isRTL ? 'تنبؤ ذكي' : 'Smart Predictions'}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">267</div>
                  <div className="text-white/80 text-sm">{isRTL ? 'رؤية مولدة' : 'Generated Insights'}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-white/80 text-sm">{isRTL ? 'مراقبة مستمرة' : 'Continuous Monitoring'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Performance Dashboard Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Performance Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-white to-blue-50 shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Activity className="h-6 w-6" />
                  {isRTL ? 'أداء الذكاء الاصطناعي المباشر' : 'Live AI Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={aiPerformanceData}>
                    <defs>
                      <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorInsights" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="predictions" 
                      stroke="hsl(var(--primary))" 
                      fill="url(#colorPredictions)"
                      strokeWidth={3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="insights" 
                      stroke="hsl(var(--chart-2))" 
                      fill="url(#colorInsights)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* AI Metrics Pie Chart */}
          <Card className="bg-gradient-to-br from-white to-indigo-50 shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white">
              <CardTitle className="flex items-center gap-3">
                <Sparkles className="h-6 w-6" />
                {isRTL ? 'مؤشرات الذكاء الاصطناعي' : 'AI Metrics'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={aiMetrics}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${value}`}
                  >
                    {aiMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {aiMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }}></div>
                      <span>{metric.name}</span>
                    </div>
                    <span className="font-semibold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Features Grid */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-3 rounded-2xl shadow-lg">
              <Brain className="h-6 w-6" />
              <span className="font-bold text-lg">{isRTL ? 'المحرك الذكي المتقدم' : 'Advanced AI Engine'}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <feature.icon className="h-10 w-10 text-white relative z-10" />
                  {feature.count > 0 && (
                    <div className="absolute -top-2 -right-2 bg-white text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                      {feature.count}
                    </div>
                  )}
                </div>
                <p className="text-center font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Tabs Content */}
        <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white to-slate-50">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Advanced Tab Navigation */}
              <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-6">
                <TabsList className="bg-transparent border-none p-0 h-auto space-x-2 w-full justify-start overflow-x-auto">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex-shrink-0 bg-white/10 border border-white/20 text-white hover:bg-white/20 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 rounded-xl px-6 py-3 text-sm font-medium backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white/10 rounded-lg">
                          <tab.icon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{tab.label}</div>
                          <div className="text-xs text-white/70">{tab.description}</div>
                        </div>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {tabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">
                    <div className="animate-fade-in">
                      <tab.component />
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer Information */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <Globe className="h-4 w-4" />
            <span>
              {isRTL 
                ? 'نظام الذكاء الاصطناعي - مدعوم بأحدث التقنيات'
                : 'AI System - Powered by Latest Technologies'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtificialIntelligence;