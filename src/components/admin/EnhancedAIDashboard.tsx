import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  DollarSign, 
  Search,
  RefreshCw,
  Eye,
  Settings,
  BarChart3,
  Activity,
  Target,
  Zap,
  MessageSquare,
  Download,
  Filter,
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Bot,
  Sparkles,
  PieChart
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { toast } from 'sonner';

// البيانات التجريبية للذكاء الاصطناعي
const aiInsights = [
  {
    id: 1,
    type: 'prediction',
    title: 'توقع ترك الموظفين',
    description: 'تم اكتشاف 3 موظفين معرضين لخطر ترك العمل خلال الشهرين القادمين',
    severity: 'high',
    confidence: 87,
    category: 'hr',
    action: 'تحتاج متابعة فورية',
    date: new Date().toISOString(),
    status: 'active'
  },
  {
    id: 2,
    type: 'trend',
    title: 'اتجاه الأداء الإيجابي',
    description: 'متوسط الأداء ارتفع بنسبة 12% مقارنة بالشهر الماضي',
    severity: 'low',
    confidence: 94,
    category: 'performance',
    action: 'مراقبة مستمرة',
    date: new Date().toISOString(),
    status: 'monitored'
  },
  {
    id: 3,
    type: 'anomaly',
    title: 'زيادة غير طبيعية في الغياب',
    description: 'معدل الغياب في قسم التسويق زاد بنسبة 25% هذا الأسبوع',
    severity: 'medium',
    confidence: 76,
    category: 'attendance',
    action: 'تحقيق ومتابعة',
    date: new Date().toISOString(),
    status: 'investigating'
  },
  {
    id: 4,
    type: 'opportunity',
    title: 'فرصة تحسين الإنتاجية',
    description: 'يمكن تحسين الإنتاجية بنسبة 18% عبر إعادة تنظيم جداول العمل',
    severity: 'medium',
    confidence: 82,
    category: 'productivity',
    action: 'تطبيق التوصيات',
    date: new Date().toISOString(),
    status: 'pending'
  }
];

const aiMetrics = [
  { name: 'دقة التنبؤ', value: 94, change: '+5%', trend: 'up' },
  { name: 'الرضا الوظيفي', value: 87, change: '+3%', trend: 'up' },
  { name: 'معدل الاحتفاظ', value: 92, change: '-2%', trend: 'down' },
  { name: 'مؤشر الأداء', value: 89, change: '+7%', trend: 'up' }
];

const performanceData = [
  { month: 'يناير', predictions: 85, insights: 92, accuracy: 88 },
  { month: 'فبراير', predictions: 88, insights: 94, accuracy: 91 },
  { month: 'مارس', predictions: 92, insights: 96, accuracy: 94 },
  { month: 'أبريل', predictions: 89, insights: 93, accuracy: 92 },
  { month: 'مايو', predictions: 94, insights: 97, accuracy: 95 },
  { month: 'يونيو', predictions: 96, insights: 98, accuracy: 97 }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

interface EnhancedAIDashboardProps {
  className?: string;
}

export const EnhancedAIDashboard: React.FC<EnhancedAIDashboardProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);

  // تحديث البيانات
  const handleRefresh = async () => {
    setIsLoading(true);
    // محاكاة تحديث البيانات
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast.success(isArabic ? 'تم تحديث البيانات بنجاح' : 'Data updated successfully');
  };

  // عرض تفاصيل البصيرة
  const handleViewInsight = (id: number) => {
    setSelectedInsight(id);
    toast.info(isArabic ? `عرض تفاصيل البصيرة ${id}` : `Viewing insight ${id} details`);
  };

  // تصدير التقارير
  const handleExport = () => {
    toast.success(isArabic ? 'جاري تصدير التقرير...' : 'Exporting report...');
  };

  // فلترة البصائر
  const filteredInsights = aiInsights.filter(insight =>
    insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return isArabic ? 'عالي' : 'High';
      case 'medium': return isArabic ? 'متوسط' : 'Medium';
      case 'low': return isArabic ? 'منخفض' : 'Low';
      default: return severity;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* الهيدر */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {isArabic ? 'لوحة الذكاء الاصطناعي' : 'AI Dashboard'}
            </h2>
            <p className="text-muted-foreground">
              {isArabic ? 'تحليلات ذكية وتنبؤات مدعومة بالذكاء الاصطناعي' : 'Smart analytics and AI-powered predictions'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            {isArabic ? 'تصدير' : 'Export'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isArabic ? 'تحديث' : 'Refresh'}
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            {isArabic ? 'الإعدادات' : 'Settings'}
          </Button>
        </div>
      </div>

      {/* مؤشرات الأداء الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiMetrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-to-r from-background to-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <div className="flex items-center gap-2">
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'}>
                  {metric.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}%</div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            {isArabic ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="insights">
            {isArabic ? 'البصائر الذكية' : 'Smart Insights'}
          </TabsTrigger>
          <TabsTrigger value="predictions">
            {isArabic ? 'التنبؤات' : 'Predictions'}
          </TabsTrigger>
          <TabsTrigger value="assistant">
            {isArabic ? 'المساعد الذكي' : 'AI Assistant'}
          </TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* رسم بياني للأداء */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {isArabic ? 'أداء الذكاء الاصطناعي' : 'AI Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="accuracy" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="insights" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="predictions" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* إحصائيات سريعة */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {isArabic ? 'الإحصائيات السريعة' : 'Quick Stats'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>{isArabic ? 'التنبيهات النشطة' : 'Active Alerts'}</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>{isArabic ? 'البصائر الجديدة' : 'New Insights'}</span>
                  <Badge variant="default">7</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>{isArabic ? 'التوقعات الدقيقة' : 'Accurate Predictions'}</span>
                  <Badge variant="secondary">94%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>{isArabic ? 'التوصيات المطبقة' : 'Applied Recommendations'}</span>
                  <Badge variant="outline">12</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* البصائر الذكية */}
        <TabsContent value="insights" className="space-y-6">
          {/* شريط البحث والفلاتر */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isArabic ? 'البحث في البصائر...' : 'Search insights...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {isArabic ? 'فلتر' : 'Filter'}
            </Button>
          </div>

          {/* قائمة البصائر */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInsights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(insight.severity)}`} />
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{insight.category}</Badge>
                          <span>{getSeverityLabel(insight.severity)}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleViewInsight(insight.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">{isArabic ? 'الثقة:' : 'Confidence:'} {insight.confidence}%</span>
                    </div>
                    <Badge variant={insight.status === 'active' ? 'destructive' : 'secondary'}>
                      {insight.status}
                    </Badge>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-primary">{insight.action}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* التنبؤات */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {isArabic ? 'توقعات الأداء' : 'Performance Predictions'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="predictions" stroke="#8884d8" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {isArabic ? 'تنبيهات عاجلة' : 'Urgent Alerts'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">{isArabic ? 'خطر ترك العمل' : 'Turnover Risk'}</p>
                    <p className="text-xs text-muted-foreground">{isArabic ? '3 موظفين معرضين للخطر' : '3 employees at risk'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">{isArabic ? 'انخفاض الإنتاجية' : 'Productivity Drop'}</p>
                    <p className="text-xs text-muted-foreground">{isArabic ? 'في قسم التطوير' : 'In Development Dept'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">{isArabic ? 'تحسن الأداء' : 'Performance Improvement'}</p>
                    <p className="text-xs text-muted-foreground">{isArabic ? 'زيادة 12%' : '12% increase'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* المساعد الذكي */}
        <TabsContent value="assistant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                {isArabic ? 'المساعد الذكي بُعد' : 'Boud AI Assistant'}
              </CardTitle>
              <CardDescription>
                {isArabic ? 'اسأل المساعد الذكي عن أي موضوع متعلق بالموارد البشرية' : 'Ask the AI assistant about any HR-related topic'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-sm">
                  {isArabic ? 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟' : 'Hello! I\'m your AI assistant. How can I help you today?'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <MessageSquare className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">
                    {isArabic ? 'تحليل بيانات الموظفين' : 'Analyze Employee Data'}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {isArabic ? 'احصل على رؤى حول أداء الفريق' : 'Get insights about team performance'}
                  </span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Users className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">
                    {isArabic ? 'توصيات التوظيف' : 'Hiring Recommendations'}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {isArabic ? 'اقتراحات لتحسين عملية التوظيف' : 'Suggestions to improve hiring process'}
                  </span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <DollarSign className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">
                    {isArabic ? 'تحليل الرواتب' : 'Salary Analysis'}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {isArabic ? 'مراجعة هيكل الرواتب والمكافآت' : 'Review salary structure and benefits'}
                  </span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Zap className="h-5 w-5 mb-2" />
                  <span className="text-sm font-medium">
                    {isArabic ? 'تحسين الإنتاجية' : 'Productivity Optimization'}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {isArabic ? 'استراتيجيات لزيادة الكفاءة' : 'Strategies to increase efficiency'}
                  </span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  placeholder={isArabic ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
                  className="flex-1"
                />
                <Button>
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};