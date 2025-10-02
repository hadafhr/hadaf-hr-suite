import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Target, TrendingUp, Search, Plus, Star, Award, Download, Upload, FileText, Eye, Save, Brain, BarChart3, Users, PieChart, Activity, Zap, Globe, Settings, Share } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Pie } from 'recharts';

interface PerformanceEvaluationProps {
  onBack: () => void;
}

interface Evaluation {
  id: string;
  employeeName: string;
  employeeId: string;
  evaluationType: 'annual' | 'quarterly' | 'probation';
  period: string;
  overallScore: number;
  status: 'pending' | 'completed' | 'reviewed';
  evaluator: string;
  department: string;
  createdDate: string;
  dueDate: string;
}

interface Goal {
  id: string;
  employeeName: string;
  employeeId: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: 'in_progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
}

export const PerformanceEvaluation: React.FC<PerformanceEvaluationProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeView, setActiveView] = useState('dashboard');

  // بيانات التحليلات المتقدمة
  const performanceAnalytics = [
    { month: 'يناير', performance: 85, target: 90, employees: 120 },
    { month: 'فبراير', performance: 88, target: 90, employees: 125 },
    { month: 'مارس', performance: 92, target: 90, employees: 130 },
    { month: 'أبريل', performance: 87, target: 90, employees: 128 },
    { month: 'مايو', performance: 95, target: 90, employees: 135 },
    { month: 'يونيو', performance: 90, target: 90, employees: 132 }
  ];

  const departmentPerformance = [
    { name: 'تقنية المعلومات', value: 95, count: 24 },
    { name: 'الموارد البشرية', value: 92, count: 18 },
    { name: 'المبيعات', value: 88, count: 32 },
    { name: 'المحاسبة', value: 90, count: 16 },
    { name: 'التسويق', value: 87, count: 20 }
  ];

  const aiInsights = [
    { category: 'الأداء المتميز', count: 45, percentage: 78, color: 'hsl(var(--success))' },
    { category: 'يحتاج تطوير', count: 12, percentage: 21, color: 'hsl(var(--warning))' },
    { category: 'أداء منخفض', count: 3, percentage: 5, color: 'hsl(var(--destructive))' },
    { category: 'موظفون جدد', count: 8, percentage: 14, color: 'hsl(var(--primary))' }
  ];

  const competencyData = [
    { skill: 'القيادة', current: 85, target: 90 },
    { skill: 'التواصل', current: 92, target: 95 },
    { skill: 'التقنية', current: 88, target: 90 },
    { skill: 'حل المشاكل', current: 90, target: 92 },
    { skill: 'العمل الجماعي', current: 87, target: 90 },
    { skill: 'الإبداع', current: 83, target: 88 }
  ];

  const BOUD_COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))', 'hsl(var(--secondary))'];

  const evaluations: Evaluation[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      evaluationType: 'annual',
      period: '2024',
      overallScore: 4.2,
      status: 'completed',
      evaluator: 'سارة أحمد - مدير الموارد البشرية',
      department: 'الموارد البشرية',
      createdDate: '2024-01-01',
      dueDate: '2024-01-31'
    },
    {
      id: '2',
      employeeName: 'فاطمة عبد الرحمن',
      employeeId: 'EMP002',
      evaluationType: 'quarterly',
      period: 'Q1 2024',
      overallScore: 3.8,
      status: 'pending',
      evaluator: 'محمد خالد - مدير القسم',
      department: 'المحاسبة',
      createdDate: '2024-01-15',
      dueDate: '2024-02-15'
    },
    {
      id: '3',
      employeeName: 'عبد الله سعد',
      employeeId: 'EMP003',
      evaluationType: 'probation',
      period: 'فترة التجربة',
      overallScore: 4.5,
      status: 'reviewed',
      evaluator: 'علي حسن - المدير العام',
      department: 'تقنية المعلومات',
      createdDate: '2024-01-20',
      dueDate: '2024-02-20'
    }
  ];

  const goals: Goal[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      title: 'تطوير نظام إدارة الأداء',
      description: 'تصميم وتطوير نظام شامل لإدارة أداء الموظفين',
      targetDate: '2024-06-30',
      progress: 75,
      status: 'in_progress',
      priority: 'high'
    },
    {
      id: '2',
      employeeName: 'فاطمة عبد الرحمن',
      employeeId: 'EMP002',
      title: 'أتمتة العمليات المحاسبية',
      description: 'تحسين كفاءة العمليات المحاسبية من خلال الأتمتة',
      targetDate: '2024-04-15',
      progress: 90,
      status: 'in_progress',
      priority: 'medium'
    },
    {
      id: '3',
      employeeName: 'عبد الله سعد',
      employeeId: 'EMP003',
      title: 'تدريب الفريق على التقنيات الحديثة',
      description: 'تقديم برنامج تدريبي شامل للفريق على أحدث التقنيات',
      targetDate: '2024-03-31',
      progress: 100,
      status: 'completed',
      priority: 'high'
    }
  ];

  const getEvaluationTypeBadge = (type: string) => {
    const typeConfig = {
      annual: { text: isRTL ? 'سنوي' : 'Annual', className: 'bg-blue-100 text-blue-800' },
      quarterly: { text: isRTL ? 'ربع سنوي' : 'Quarterly', className: 'bg-green-100 text-green-800' },
      probation: { text: isRTL ? 'فترة تجربة' : 'Probation', className: 'bg-orange-100 text-orange-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: isRTL ? 'في الانتظار' : 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      completed: { text: isRTL ? 'مكتمل' : 'Completed', className: 'bg-green-100 text-green-800' },
      reviewed: { text: isRTL ? 'تم المراجعة' : 'Reviewed', className: 'bg-blue-100 text-blue-800' },
      in_progress: { text: isRTL ? 'قيد التنفيذ' : 'In Progress', className: 'bg-blue-100 text-blue-800' },
      overdue: { text: isRTL ? 'متأخر' : 'Overdue', className: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { text: isRTL ? 'عالي' : 'High', className: 'bg-red-100 text-red-800' },
      medium: { text: isRTL ? 'متوسط' : 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      low: { text: isRTL ? 'منخفض' : 'Low', className: 'bg-green-100 text-green-800' }
    };
    return priorityConfig[priority as keyof typeof priorityConfig];
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || evaluation.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header with BOUD Branding */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-glow to-success p-8 mb-8 shadow-2xl">
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
                  {isRTL ? 'استيراد' : 'Import'}
                </Button>
                <Button className="bg-success/80 border-success/30 text-white hover:bg-success/90 backdrop-blur-sm">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير Excel' : 'Export Excel'}
                </Button>
                <Button className="bg-destructive/80 border-destructive/30 text-white hover:bg-destructive/90 backdrop-blur-sm">
                  <FileText className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير PDF' : 'Export PDF'}
                </Button>
                <Button className="bg-warning/80 border-warning/30 text-white hover:bg-warning/90 backdrop-blur-sm">
                  <Eye className="h-4 w-4 ml-2" />
                  {isRTL ? 'معاينة' : 'Preview'}
                </Button>
                <Button className="bg-secondary/80 border-secondary/30 text-white hover:bg-secondary/90 backdrop-blur-sm">
                  <Save className="h-4 w-4 ml-2" />
                  {isRTL ? 'حفظ كمسودة' : 'Save Draft'}
                </Button>
                <Button className="bg-primary border-primary text-white hover:bg-primary-glow shadow-lg">
                  <Save className="h-4 w-4 ml-2" />
                  {isRTL ? 'حفظ' : 'Save'}
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
                {isRTL ? 'التقييم الذكي بالذكاء الاصطناعي' : 'AI-Powered Smart Evaluation'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'منظومة تقييم متطورة تستخدم الذكاء الاصطناعي لتحليل الأداء وتقديم توصيات ذكية' : 'Advanced evaluation system using AI to analyze performance and provide intelligent recommendations'}
              </p>
            </div>
          </div>
        </div>

        {/* AI Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Analytics Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900 via-primary to-success text-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* World Map Visualization */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary-glow">
                      {isRTL ? 'التوزيع العالمي' : 'Global Distribution'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-primary/50 to-success/50 rounded-xl p-4 flex items-center justify-center">
                      <Globe className="h-32 w-32 text-primary-glow opacity-80" />
                      <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 rounded-full text-sm">
                        685 {isRTL ? 'موظف' : 'Employees'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-success/80 px-3 py-1 rounded-full text-sm">
                        15,625 {isRTL ? 'تقييم' : 'Evaluations'}
                      </div>
                    </div>
                  </div>

                  {/* AI Brain Visualization */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-success">
                      {isRTL ? 'تحليل الذكاء الاصطناعي' : 'AI Analysis'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-success/50 to-warning/50 rounded-xl p-4 flex items-center justify-center">
                      <Brain className="h-32 w-32 text-success opacity-80" />
                      <div className="absolute top-4 right-4 bg-success/80 px-3 py-1 rounded-full text-sm">
                        33% {isRTL ? 'تحسن' : 'Improvement'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-warning/80 px-3 py-1 rounded-full text-sm">
                        7,002 {isRTL ? 'توصية' : 'Insights'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={performanceAnalytics}>
                      <defs>
                        <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                      />
                      <Area type="monotone" dataKey="performance" stroke="hsl(var(--primary))" fill="url(#colorPerformance)" />
                      <Area type="monotone" dataKey="target" stroke="hsl(var(--success))" fill="url(#colorTarget)" />
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
                    {isRTL ? 'إحصائيات سريعة' : 'Quick Stats'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${insight.color}15` }}>
                      <div>
                        <p className="font-semibold text-gray-800">{insight.category}</p>
                        <p className="text-sm text-gray-600">{insight.count} {isRTL ? 'موظف' : 'employees'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: insight.color }}>{insight.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {isRTL ? 'توزيع الأقسام' : 'Department Distribution'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={departmentPerformance}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {departmentPerformance.map((entry, index) => (
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

        {/* Smart AI System Categories */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full shadow-lg">
              <Brain className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered System'}</span>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'نظام التقييم الذكي' : 'Smart Evaluation System'}
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                {isRTL ? 'يجمع البيانات من جميع أنظمة التقييمات والتقييمات لتوليد نتائج ذكية وتقوية قائمة على الذكاء الاصطناعي' : 'Collects data from all evaluation systems and assessments to generate intelligent results and AI-powered recommendations'}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: BarChart3, label: isRTL ? 'خبرة عملية' : 'Work Experience', color: 'bg-primary', count: 0 },
                  { icon: Users, label: isRTL ? 'نطاقات النتائج الذكية' : 'Smart Results', color: 'bg-warning', count: 2 },
                  { icon: Target, label: isRTL ? 'المخاطر' : 'Risks', color: 'bg-destructive', count: 2 },
                  { icon: Award, label: isRTL ? 'الرؤى والمخاطر' : 'Insights', color: 'bg-warning', count: 6 },
                  { icon: PieChart, label: isRTL ? 'التوصيات (IDP)' : 'Recommendations', color: 'bg-success', count: 3 },
                  { icon: Activity, label: isRTL ? 'مجلس هذا نو' : 'Analytics', color: 'bg-primary', count: 5 },
                  { icon: Zap, label: isRTL ? 'الإعدادات' : 'Settings', color: 'bg-secondary', count: 5 },
                  { icon: TrendingUp, label: isRTL ? 'التقارير' : 'Reports', color: 'bg-success', count: 0 }
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
                    <p className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'المعايير المعلقة' : 'Pending Standards'}</div>
                  <div className="text-xs text-gray-500 mt-1">{isRTL ? 'في انتظار المراجعة' : 'Under Review'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-warning/10 to-warning/20 rounded-xl border border-warning/20">
                  <div className="text-3xl font-bold text-warning mb-2">6</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'الموظفون عالي المخاطر' : 'High-Risk Employees'}</div>
                  <div className="text-xs text-gray-500 mt-1">{isRTL ? 'يحتاجون اهتمام' : 'Need Attention'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/20 rounded-xl border border-success/20">
                  <div className="text-3xl font-bold text-success mb-2">76</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'متوسط النتيجة الذكية' : 'Average Smart Score'}</div>
                  <div className="text-xs text-gray-500 mt-1">{isRTL ? 'من أصل 100' : 'Out of 100'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl border border-secondary/20">
                  <div className="text-3xl font-bold text-secondary mb-2">72%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'اكتمال التقييم' : 'Evaluation Completion'}</div>
                  <div className="text-xs text-gray-500 mt-1">{isRTL ? 'للربع الحالي' : 'Current Quarter'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="evaluations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="evaluations">{isRTL ? 'التقييمات' : 'Evaluations'}</TabsTrigger>
            <TabsTrigger value="goals">{isRTL ? 'الأهداف' : 'Goals & Objectives'}</TabsTrigger>
            <TabsTrigger value="reports">{isRTL ? 'التقارير' : 'Performance Reports'}</TabsTrigger>
          </TabsList>

          <TabsContent value="evaluations">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في التقييمات...' : 'Search evaluations...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Evaluations List */}
            <div className="space-y-6">
              {filteredEvaluations.map((evaluation) => {
                const typeBadge = getEvaluationTypeBadge(evaluation.evaluationType);
                const statusBadge = getStatusBadge(evaluation.status);
                
                return (
                  <Card key={evaluation.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{evaluation.employeeName}</CardTitle>
                          <p className="text-sm text-muted-foreground">{evaluation.employeeId} - {evaluation.department}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={typeBadge.className}>
                            {typeBadge.text}
                          </Badge>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{isRTL ? 'النتيجة الإجمالية' : 'Overall Score'}</p>
                            <p className={`text-2xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
                              {evaluation.overallScore}/5.0
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'الفترة:' : 'Period:'}</span>
                            <span className="text-sm font-medium">{evaluation.period}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'المقيِّم:' : 'Evaluator:'}</span>
                            <span className="text-sm">{evaluation.evaluator}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ الإنشاء:' : 'Created Date:'}</span>
                            <span className="text-sm font-medium">{evaluation.createdDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ الاستحقاق:' : 'Due Date:'}</span>
                            <span className="text-sm font-medium">{evaluation.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'تحرير' : 'Edit'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'طباعة' : 'Print'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => {
                const statusBadge = getStatusBadge(goal.status);
                const priorityBadge = getPriorityBadge(goal.priority);
                
                return (
                  <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <Badge className={priorityBadge.className}>
                            {priorityBadge.text}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{goal.employeeName} - {goal.employeeId}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">{goal.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{isRTL ? 'تاريخ الهدف:' : 'Target Date:'}</span>
                          <span className="font-medium">{goal.targetDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'تحديث' : 'Update'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'تقارير الأداء' : 'Performance Reports'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'تقارير مفصلة عن أداء الموظفين والاتجاهات' : 'Detailed reports on employee performance and trends'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};