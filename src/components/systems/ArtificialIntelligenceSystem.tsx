import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Bot,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Users,
  AlertTriangle,
  Eye,
  Settings,
  Search,
  RefreshCw,
  Download,
  Activity,
  ArrowLeft
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useToast } from "@/hooks/use-toast";

interface ArtificialIntelligenceSystemProps {
  onBack: () => void;
}

const ArtificialIntelligenceSystem = ({ onBack }: ArtificialIntelligenceSystemProps) => {
  const [activeTab, setActiveTab] = useState('ai-dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const { toast } = useToast();

  // Mock AI Data
  const aiInsights = [
    {
      type: 'prediction',
      title: 'توقع استقالات محتملة',
      description: 'يُتوقع استقالة 3 موظفين في القسم المالي خلال الشهرين القادمين',
      confidence: 87,
      risk: 'عالي',
      action: 'مراجعة الرواتب والحوافز'
    },
    {
      type: 'recommendation',
      title: 'توصية تدريبية',
      description: 'يُنصح بتدريب 15 موظف في قسم تقنية المعلومات على الذكاء الاصطناعي',
      confidence: 92,
      risk: 'منخفض',
      action: 'إعداد برنامج تدريبي'
    },
    {
      type: 'alert',
      title: 'تنبيه أداء',
      description: 'انخفاض ملحوظ في الأداء بقسم التسويق بنسبة 15%',
      confidence: 78,
      risk: 'متوسط',
      action: 'مراجعة الأهداف والمهام'
    }
  ];

  const aiMetrics = [
    { name: 'الدقة التنبؤية', value: 89, trend: '+5%' },
    { name: 'توصيات مطبقة', value: 67, trend: '+12%' },
    { name: 'مشاكل محلولة', value: 24, trend: '+8%' },
    { name: 'رضا المستخدمين', value: 94, trend: '+3%' }
  ];

  const performanceTrends = [
    { month: 'يناير', accuracy: 85, recommendations: 45, alerts: 12 },
    { month: 'فبراير', accuracy: 87, recommendations: 52, alerts: 8 },
    { month: 'مارس', accuracy: 89, recommendations: 67, alerts: 15 },
    { month: 'أبريل', accuracy: 91, recommendations: 71, alerts: 6 },
    { month: 'مايو', accuracy: 89, recommendations: 58, alerts: 11 }
  ];

  const handleRunAnalysis = () => {
    toast({
      title: "تم بدء التحليل",
      description: "جاري تشغيل تحليل الذكاء الاصطناعي...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft border border-border/20">
        <div className="flex items-center gap-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="border-muted-foreground/20 text-foreground hover:bg-primary/5"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            رجوع
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                نظام الذكاء الاصطناعي
              </h1>
              <p className="text-muted-foreground text-lg">
                التحليلات الذكية والتوصيات التنبؤية المتقدمة
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
            <Sparkles className="h-4 w-4 ml-2" />
            AI مدعوم
          </Badge>
          <Button 
            onClick={handleRunAnalysis}
            className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white"
          >
            <Zap className="h-4 w-4 ml-2" />
            تشغيل تحليل جديد
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur p-1 rounded-xl border">
          <TabsTrigger value="ai-dashboard" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            لوحة الذكاء الاصطناعي
          </TabsTrigger>
          <TabsTrigger value="ai-recommendations" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            التوصيات الذكية
          </TabsTrigger>
          <TabsTrigger value="predictive-analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            التحليلات التنبؤية
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            الرؤى الذكية
          </TabsTrigger>
          <TabsTrigger value="ai-settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            إعدادات الذكاء الاصطناعي
          </TabsTrigger>
        </TabsList>

        {/* AI Dashboard */}
        <TabsContent value="ai-dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur border-border/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{metric.value}%</span>
                    <Badge variant="secondary" className="text-green-600 bg-green-100">
                      {metric.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  أداء النظام الذكي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="accuracy" stroke="#3CB593" name="دقة التوقعات" />
                    <Line type="monotone" dataKey="recommendations" stroke="#8884d8" name="التوصيات" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  الرؤى الذكية الحديثة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.slice(0, 3).map((insight, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={insight.risk === 'عالي' ? 'destructive' : insight.risk === 'متوسط' ? 'default' : 'secondary'}>
                          {insight.risk}
                        </Badge>
                        <span className="text-sm text-muted-foreground">دقة: {insight.confidence}%</span>
                      </div>
                      <h4 className="font-semibold mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <p className="text-xs text-primary">الإجراء المقترح: {insight.action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Recommendations */}
        <TabsContent value="ai-recommendations" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                التوصيات الذكية المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-muted/20 to-muted/10 rounded-lg border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant={insight.type === 'prediction' ? 'default' : insight.type === 'recommendation' ? 'secondary' : 'outline'}>
                            {insight.type === 'prediction' ? 'توقع' : insight.type === 'recommendation' ? 'توصية' : 'تنبيه'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">دقة {insight.confidence}%</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                        <p className="text-muted-foreground mb-3">{insight.description}</p>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium">الإجراء المطلوب: {insight.action}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 ml-2" />
                          تفاصيل
                        </Button>
                        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                          تطبيق
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictive Analytics */}
        <TabsContent value="predictive-analytics" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                التحليلات التنبؤية المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">توقعات الأداء</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={performanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="accuracy" fill="#3CB593" name="دقة التوقعات" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">مؤشرات المخاطر</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="font-semibold text-red-700">مخاطر عالية</span>
                      </div>
                      <p className="text-sm text-red-600">احتمالية استقالة 3 موظفين (87%)</p>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-yellow-700">مخاطر متوسطة</span>
                      </div>
                      <p className="text-sm text-yellow-600">انخفاض الأداء في التسويق (78%)</p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-green-700">فرص تحسين</span>
                      </div>
                      <p className="text-sm text-green-600">إمكانية تدريب الذكاء الاصطناعي (92%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="ai-insights" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                الرؤى الذكية والتحليلات المعمقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">أنماط الأداء المكتشفة</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50">
                      <h4 className="font-semibold mb-2">نمط الإنتاجية الأسبوعي</h4>
                      <p className="text-sm text-muted-foreground">ذروة الإنتاجية يومي الثلاثاء والأربعاء، انخفاض يوم الجمعة بنسبة 20%</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-green-100/50">
                      <h4 className="font-semibold mb-2">تأثير التدريب</h4>
                      <p className="text-sm text-muted-foreground">الموظفون المدربون حديثاً يحققون إنتاجية أعلى بـ 35% خلال أول 3 أشهر</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">توصيات استراتيجية</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        تحسين الجدولة
                      </h4>
                      <p className="text-sm text-muted-foreground">إعادة ترتيب المهام الصعبة في بداية الأسبوع لزيادة الفعالية</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        تطوير الفرق
                      </h4>
                      <p className="text-sm text-muted-foreground">تكوين فرق متعددة الخبرات لتحسين التعاون والنتائج</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai-settings" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                إعدادات نظام الذكاء الاصطناعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">إعدادات التحليل</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">تردد التحليل التلقائي</label>
                        <Select defaultValue="daily">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">كل ساعة</SelectItem>
                            <SelectItem value="daily">يومياً</SelectItem>
                            <SelectItem value="weekly">أسبوعياً</SelectItem>
                            <SelectItem value="monthly">شهرياً</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">مستوى الحساسية</label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">منخفض</SelectItem>
                            <SelectItem value="medium">متوسط</SelectItem>
                            <SelectItem value="high">عالي</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">إعدادات التنبيهات</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">تنبيهات المخاطر العالية</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">توصيات التحسين</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">تقارير الأداء الدورية</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    <RefreshCw className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 ml-2" />
                    تصدير الإعدادات
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtificialIntelligenceSystem;