import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, AlertTriangle, Shield, TrendingUp, Activity, 
  Brain, PieChart, BarChart3, FileText, Settings, Plus,
  Eye, Edit, Trash2, CheckCircle2, Clock, Target,
  Download, RefreshCw, Search, Filter, Calendar,
  Users, Building, DollarSign, Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, LineChart, Line, BarChart, Bar } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface RiskManagementProps {
  onBack: () => void;
}

export const RiskManagement: React.FC<RiskManagementProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Risk data
  const riskTrends = [
    { month: 'يناير', high: 12, medium: 25, low: 35, total: 72 },
    { month: 'فبراير', high: 8, medium: 28, low: 40, total: 76 },
    { month: 'مارس', high: 15, medium: 22, low: 38, total: 75 },
    { month: 'أبريل', high: 6, medium: 30, low: 42, total: 78 },
    { month: 'مايو', high: 10, medium: 26, low: 45, total: 81 },
    { month: 'يونيو', high: 4, medium: 24, low: 50, total: 78 }
  ];

  const riskCategories = [
    { name: 'مخاطر مالية', value: 35, count: 28, color: '#ef4444' },
    { name: 'مخاطر تشغيلية', value: 28, count: 22, color: '#f59e0b' },
    { name: 'مخاطر الامتثال', value: 20, count: 16, color: '#eab308' },
    { name: 'مخاطر استراتيجية', value: 17, count: 14, color: '#06b6d4' }
  ];

  const activeRisks = [
    {
      id: 1,
      title: 'تأخير الرواتب - قسم المالية',
      category: 'مالية',
      severity: 'عالية',
      probability: 85,
      impact: 'عالي',
      status: 'مفتوح',
      assignee: 'أحمد المحمد',
      dueDate: '2024-09-15',
      description: 'خطر تأخير صرف الرواتب بسبب مشاكل في النظام المصرفي'
    },
    {
      id: 2,
      title: 'انتهاك بيانات الموظفين',
      category: 'أمنية',
      severity: 'عالية',
      probability: 65,
      impact: 'عالي جداً',
      status: 'قيد المراجعة',
      assignee: 'سارة أحمد',
      dueDate: '2024-09-10',
      description: 'مخاطر أمنية تتعلق بحماية بيانات الموظفين الشخصية'
    },
    {
      id: 3,
      title: 'نقص في الكوادر المتخصصة',
      category: 'موارد بشرية',
      severity: 'متوسطة',
      probability: 75,
      impact: 'متوسط',
      status: 'قيد المعالجة',
      assignee: 'محمد علي',
      dueDate: '2024-09-20',
      description: 'خطر فقدان الموظفين المهرة وصعوبة استبدالهم'
    }
  ];

  const mitigationActions = [
    {
      id: 1,
      riskId: 1,
      action: 'تنفيذ نظام احتياطي للدفع',
      status: 'مكتمل',
      assignee: 'قسم تقنية المعلومات',
      completionRate: 100,
      dueDate: '2024-09-01'
    },
    {
      id: 2,
      riskId: 2,
      action: 'تطبيق بروتوكولات الأمان الإضافية',
      status: 'جاري التنفيذ',
      assignee: 'قسم الأمن السيبراني',
      completionRate: 70,
      dueDate: '2024-09-12'
    },
    {
      id: 3,
      riskId: 3,
      action: 'إطلاق برنامج التوظيف السريع',
      status: 'مخطط',
      assignee: 'قسم الموارد البشرية',
      completionRate: 25,
      dueDate: '2024-09-25'
    }
  ];

  const riskMetrics = {
    totalRisks: 78,
    highRisks: 12,
    mediumRisks: 28,
    lowRisks: 38,
    closedRisks: 156,
    mitigatedRisks: 89,
    averageResolutionTime: 12
  };

  // Functions
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'عالية': return 'bg-red-100 text-red-800 border-red-200';
      case 'متوسطة': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'منخفضة': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مفتوح': return 'bg-red-100 text-red-800';
      case 'قيد المراجعة': return 'bg-yellow-100 text-yellow-800';
      case 'قيد المعالجة': return 'bg-blue-100 text-blue-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateRisk = () => {
    toast({
      title: "إنشاء مخاطرة جديدة",
      description: "سيتم توجيهك لنموذج إنشاء مخاطرة جديدة",
    });
  };

  const handleAnalyzeRisks = () => {
    toast({
      title: "تحليل المخاطر بالذكاء الاصطناعي",
      description: "جاري تحليل المخاطر باستخدام الذكاء الاصطناعي...",
    });
  };

  const handleExportReport = () => {
    toast({
      title: "تصدير التقرير",
      description: "جاري تحضير تقرير المخاطر الشامل...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header - Exact Team Design */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/boud-pattern-bg.jpg')] opacity-5"></div>
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={onBack}
                  className="hover:bg-primary/10"
                >
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة
                </Button>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <AlertTriangle className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      إدارة المخاطر الذكية
                    </h1>
                    <p className="text-muted-foreground text-lg mt-1">
                      منظومة شاملة لتحديد وتقييم ومعالجة المخاطر المؤسسية مع أدوات التحليل المتقدمة والذكاء الاصطناعي
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportReport}>
                  <Download className="h-4 w-4 ml-2" />
                  تصدير تقرير
                </Button>
                <Button variant="outline" size="sm" onClick={handleAnalyzeRisks}>
                  <Brain className="h-4 w-4 ml-2" />
                  تحليل ذكي
                </Button>
                <Button size="sm" onClick={handleCreateRisk}>
                  <Plus className="h-4 w-4 ml-2" />
                  مخاطرة جديدة
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white rounded-xl shadow-lg border p-2">
              <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <BarChart3 className="h-4 w-4" />
                نظرة عامة
              </TabsTrigger>
              <TabsTrigger value="risks" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <AlertTriangle className="h-4 w-4" />
                المخاطر النشطة
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Target className="h-4 w-4" />
                تقييم المخاطر
              </TabsTrigger>
              <TabsTrigger value="mitigation" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Shield className="h-4 w-4" />
                خطط المعالجة
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Brain className="h-4 w-4" />
                التحليلات الذكية
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <FileText className="h-4 w-4" />
                التقارير
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Performance Indicators - Exact Team Design */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">إجمالي المخاطر</p>
                        <p className="text-2xl font-bold text-primary">{riskMetrics.totalRisks}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-primary/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">مخاطر عالية</p>
                        <p className="text-2xl font-bold text-red-600">{riskMetrics.highRisks}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-red-500/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">مخاطر متوسطة</p>
                        <p className="text-2xl font-bold text-orange-600">{riskMetrics.mediumRisks}</p>
                      </div>
                      <Activity className="h-8 w-8 text-orange-500/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-emerald-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">مخاطر منخفضة</p>
                        <p className="text-2xl font-bold text-emerald-600">{riskMetrics.lowRisks}</p>
                      </div>
                      <Shield className="h-8 w-8 text-emerald-500/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">المخاطر المُعالجة</p>
                        <p className="text-2xl font-bold text-blue-600">{riskMetrics.mitigatedRisks}</p>
                      </div>
                      <CheckCircle2 className="h-8 w-8 text-blue-500/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">متوسط وقت الحل</p>
                        <p className="text-2xl font-bold text-purple-600">{riskMetrics.averageResolutionTime} يوم</p>
                      </div>
                      <Clock className="h-8 w-8 text-purple-500/60" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section - Exact Team Design */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      اتجاهات المخاطر الشهرية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={riskTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="high" stackId="1" stroke="#ef4444" fill="#ef4444" />
                        <Area type="monotone" dataKey="medium" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                        <Area type="monotone" dataKey="low" stackId="1" stroke="#10b981" fill="#10b981" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      توزيع المخاطر حسب الفئة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={riskCategories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {riskCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights - Exact Team Design */}
              <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    رؤى الذكاء الاصطناعي لإدارة المخاطر
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-800">تحسن في إدارة المخاطر</span>
                      </div>
                      <p className="text-sm text-emerald-700">
                        انخفاض المخاطر عالية الأولوية بنسبة 25% هذا الشهر مع تحسن كبير في أوقات الاستجابة
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-semibold text-amber-800">تنبيه مبكر</span>
                      </div>
                      <p className="text-sm text-amber-700">
                        توقع زيادة في المخاطر المالية خلال الشهر القادم، يُنصح بتعزيز الإجراءات الوقائية
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-800">توصية ذكية</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        تطبيق نظام الإنذار المبكر للمخاطر التشغيلية لتقليل وقت الاستجابة بنسبة 40%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions - Exact Team Design */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    الإجراءات السريعة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleCreateRisk}>
                      <Plus className="h-6 w-6" />
                      إنشاء مخاطرة جديدة
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleAnalyzeRisks}>
                      <Brain className="h-6 w-6" />
                      تحليل ذكي للمخاطر
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2" onClick={handleExportReport}>
                      <Download className="h-6 w-6" />
                      تصدير تقرير شامل
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <RefreshCw className="h-6 w-6" />
                      تحديث البيانات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Active Risks Tab */}
            <TabsContent value="risks" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">المخاطر النشطة</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 ml-2" />
                    تصفية
                  </Button>
                  <Button size="sm" onClick={handleCreateRisk}>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة مخاطرة
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {activeRisks.map((risk) => (
                  <Card key={risk.id} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{risk.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge className={getSeverityColor(risk.severity)}>{risk.severity}</Badge>
                          <Badge className={getStatusColor(risk.status)}>{risk.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">الفئة</p>
                          <p className="font-semibold">{risk.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">احتمالية الحدوث</p>
                          <p className="font-semibold">{risk.probability}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">المسؤول</p>
                          <p className="font-semibold">{risk.assignee}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">تاريخ الاستحقاق</p>
                          <p className="font-semibold">{risk.dueDate}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{risk.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 ml-2" />
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 ml-2" />
                          تحرير
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-4 w-4 ml-2" />
                          خطة المعالجة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Assessment Tab */}
            <TabsContent value="assessment" className="space-y-6">
              <div className="text-center py-12">
                <Target className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">تقييم المخاطر</h3>
                <p className="text-muted-foreground">جاري تطوير أدوات تقييم المخاطر المتقدمة...</p>
              </div>
            </TabsContent>

            {/* Mitigation Tab */}
            <TabsContent value="mitigation" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">خطط المعالجة والتخفيف</h2>
                <Button size="sm">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة خطة جديدة
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mitigationActions.map((action) => (
                  <Card key={action.id}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        {action.action}
                        <Badge className={getStatusColor(action.status)}>{action.status}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">المسؤول</p>
                          <p className="font-semibold">{action.assignee}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">نسبة الإكمال</p>
                          <p className="font-semibold">{action.completionRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">تاريخ الاستحقاق</p>
                          <p className="font-semibold">{action.dueDate}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${action.completionRate}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="text-center py-12">
                <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">التحليلات الذكية</h3>
                <p className="text-muted-foreground">جاري تطوير محرك التحليلات المدعوم بالذكاء الاصطناعي...</p>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">التقارير المتقدمة</h3>
                <p className="text-muted-foreground">جاري تطوير نظام التقارير الشامل...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};