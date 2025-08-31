import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Brain, Bot, Sparkles, MessageCircle, BarChart3, Users, Target, Lightbulb, 
  TrendingUp, Zap, Eye, Save, Download, Share, Settings, Activity, Globe, Cpu, Database 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const aiFeatures = [
  {
    title: 'تحليل الأداء الذكي',
    description: 'تحليل شامل لأداء الموظفين باستخدام الذكاء الاصطناعي',
    icon: BarChart3,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/performance-evaluation'
  },
  {
    title: 'التنبؤ بالاحتياجات',
    description: 'توقع احتياجات الموارد البشرية المستقبلية',
    icon: TrendingUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/reports'
  },
  {
    title: 'توصيات التوظيف',
    description: 'اقتراحات ذكية لأفضل المرشحين للوظائف',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/smart-hire'
  },
  {
    title: 'تحسين الإنتاجية',
    description: 'استراتيجيات ذكية لتحسين الإنتاجية العامة',
    icon: Zap,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/employee-management'
  },
  {
    title: 'تخطيط الأهداف',
    description: 'وضع أهداف ذكية قابلة للقياس والتحقيق',
    icon: Target,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/dashboard'
  },
  {
    title: 'رؤى استراتيجية',
    description: 'تحليلات عميقة للقرارات الاستراتيجية',
    icon: Lightbulb,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    route: '/business-platform'
  }
];

interface ArtificialIntelligenceProps {
  onBack: () => void;
}

const ArtificialIntelligence = ({ onBack }: ArtificialIntelligenceProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // بيانات الذكاء الاصطناعي
  const aiData = [
    { month: 'يناير', predictions: 245, accuracy: 94, insights: 156 },
    { month: 'فبراير', predictions: 268, accuracy: 96, insights: 178 },
    { month: 'مارس', predictions: 289, accuracy: 95, insights: 195 },
    { month: 'أبريل', predictions: 312, accuracy: 97, insights: 223 },
    { month: 'مايو', predictions: 334, accuracy: 98, insights: 248 },
    { month: 'يونيو', predictions: 356, accuracy: 99, insights: 267 }
  ];

  const aiMetrics = [
    { category: 'التنبؤات الذكية', count: 356, percentage: 99, color: 'hsl(var(--primary))' },
    { category: 'الرؤى المولدة', count: 267, percentage: 95, color: 'hsl(var(--success))' },
    { category: 'التوصيات النشطة', count: 189, percentage: 87, color: 'hsl(var(--warning))' },
    { category: 'النماذج المدربة', count: 45, percentage: 100, color: 'hsl(var(--secondary))' }
  ];

  const aiApplications = [
    { app: 'تحليل الأداء', value: 35, count: 89 },
    { app: 'التنبؤ بالاحتياجات', value: 28, count: 72 },
    { app: 'توصيات التوظيف', value: 22, count: 56 },
    { app: 'تحسين العمليات', value: 15, count: 38 }
  ];

  const BOUD_COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--secondary))'];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Share className="h-4 w-4 ml-2" />
                  {isRTL ? 'استيراد نماذج' : 'Import Models'}
                </Button>
                <Button className="bg-primary/80 border-primary/30 text-white hover:bg-primary/90 backdrop-blur-sm">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير تقارير' : 'Export Reports'}
                </Button>
                <Button className="bg-destructive/80 border-destructive/30 text-white hover:bg-destructive/90 backdrop-blur-sm">
                  <Database className="h-4 w-4 ml-2" />
                  {isRTL ? 'تدريب نماذج' : 'Train Models'}
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Brain className="h-4 w-4 ml-2" />
                  {isRTL ? 'نموذج جديد' : 'New Model'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Brain className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'مركز الذكاء الاصطناعي المتقدم' : 'Advanced AI Intelligence Center'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'منظومة ذكية شاملة لتحليل البيانات والتنبؤ بالاتجاهات وتقديم توصيات ذكية لاتخاذ قرارات مدروسة' : 'Comprehensive intelligent system for data analysis, trend prediction, and smart recommendations for informed decision making'}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Analytics Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900 via-primary to-secondary text-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* AI Processing */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary-glow">
                      {isRTL ? 'المعالجة الذكية' : 'AI Processing'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-primary/50 to-secondary/50 rounded-xl p-4 flex items-center justify-center">
                      <Brain className="h-32 w-32 text-primary-glow opacity-80" />
                      <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 rounded-full text-sm">
                        356 {isRTL ? 'تنبؤ ذكي' : 'Smart Predictions'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-secondary/80 px-3 py-1 rounded-full text-sm">
                        99% {isRTL ? 'دقة' : 'Accuracy'}
                      </div>
                    </div>
                  </div>

                  {/* Insights Generation */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-success">
                      {isRTL ? 'توليد الرؤى' : 'Insights Generation'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-success/50 to-warning/50 rounded-xl p-4 flex items-center justify-center">
                      <Lightbulb className="h-32 w-32 text-success opacity-80" />
                      <div className="absolute top-4 right-4 bg-success/80 px-3 py-1 rounded-full text-sm">
                        267 {isRTL ? 'رؤية مولدة' : 'Generated Insights'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-warning/80 px-3 py-1 rounded-full text-sm">
                        189 {isRTL ? 'توصية نشطة' : 'Active Recommendations'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Performance Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={aiData}>
                      <defs>
                        <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorInsights" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Area type="monotone" dataKey="predictions" stroke="hsl(var(--primary))" fill="url(#colorPredictions)" />
                      <Area type="monotone" dataKey="insights" stroke="hsl(var(--success))" fill="url(#colorInsights)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {isRTL ? 'مؤشرات الذكاء الاصطناعي' : 'AI Metrics'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {aiMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                      <div>
                        <p className="font-semibold text-gray-800">{metric.category}</p>
                        <p className="text-sm text-gray-600">{metric.count} {isRTL ? 'عنصر' : 'items'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: metric.color }}>{metric.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {isRTL ? 'تطبيقات الذكاء الاصطناعي' : 'AI Applications'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={aiApplications}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {aiApplications.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={BOUD_COLORS[index % BOUD_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-2 rounded-full shadow-lg">
              <Brain className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'الميزات الذكية' : 'Smart Features'}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {aiFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white shadow-xl rounded-2xl overflow-hidden"
                onClick={() => navigate(feature.route)}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(feature.route);
                    }}
                  >
                    {isRTL ? 'استخدم الآن' : 'Use Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Intelligence System */}
        <div className="mb-8">
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'مركز الذكاء الاصطناعي المتقدم' : 'Advanced AI Intelligence Center'}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: Brain, label: isRTL ? 'النماذج الذكية' : 'Smart Models', color: 'bg-primary', count: 8 },
                  { icon: Bot, label: isRTL ? 'المساعد الذكي' : 'AI Assistant', color: 'bg-secondary', count: 5 },
                  { icon: BarChart3, label: isRTL ? 'التحليلات المتقدمة' : 'Advanced Analytics', color: 'bg-success', count: 12 },
                  { icon: Lightbulb, label: isRTL ? 'الرؤى الذكية' : 'Smart Insights', color: 'bg-warning', count: 267 },
                  { icon: TrendingUp, label: isRTL ? 'التنبؤ بالاتجاهات' : 'Trend Prediction', color: 'bg-primary', count: 15 },
                  { icon: Zap, label: isRTL ? 'الأتمتة الذكية' : 'Smart Automation', color: 'bg-destructive', count: 23 },
                  { icon: Globe, label: isRTL ? 'التعلم العميق' : 'Deep Learning', color: 'bg-success', count: 6 },
                  { icon: Settings, label: isRTL ? 'إعدادات الذكاء الاصطناعي' : 'AI Settings', color: 'bg-secondary', count: 0 }
                ].map((item, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform relative`}>
                      <item.icon className="h-8 w-8 text-white" />
                      {item.count > 0 && (
                        <div className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {item.count}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">99%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'دقة التنبؤات' : 'Prediction Accuracy'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/20 rounded-xl border border-success/20">
                  <div className="text-3xl font-bold text-success mb-2">267</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'رؤى مولدة' : 'Generated Insights'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-warning/10 to-warning/20 rounded-xl border border-warning/20">
                  <div className="text-3xl font-bold text-warning mb-2">23h</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'وقت موفر' : 'Time Saved'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl border border-secondary/20">
                  <div className="text-3xl font-bold text-secondary mb-2">45</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'نماذج مدربة' : 'Trained Models'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArtificialIntelligence;