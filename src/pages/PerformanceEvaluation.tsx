import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Target, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Clock,
  Plus,
  Download,
  Upload,
  FileText,
  Settings,
  Eye,
  Save,
  Send,
  Calendar,
  Brain,
  Zap,
  Activity,
  Award,
  Scale,
  AlertTriangle,
  PlayCircle
} from 'lucide-react';
import { SmartEvaluations } from '@/components/evaluation/SmartEvaluations';
import { MBOSystem } from '@/components/evaluation/MBOSystem';
import { KPISystem } from '@/components/evaluation/KPISystem';
import { AssessmentSuite } from '@/components/evaluation/AssessmentSuite';
import { System360 } from '@/components/evaluation/360System';
import { BSCSystem } from '@/components/evaluation/BSCSystem';
import { ContinuousSystem } from '@/components/evaluation/ContinuousSystem';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

export const PerformanceEvaluation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const isRTL = i18n.language === 'ar';

  // بيانات تجريبية للوحة القيادة
  const dashboardMetrics = [
    {
      title: isRTL ? 'نسبة إنجاز التقييمات' : 'Evaluation Completion',
      value: '72%',
      change: '+8%',
      period: isRTL ? 'هذا الربع' : 'This Quarter',
      icon: Target,
      color: 'text-primary'
    },
    {
      title: isRTL ? 'متوسط الأداء المؤسسي' : 'Overall Performance',
      value: '3.6/5',
      change: '+0.2',
      period: isRTL ? 'مقارنة بالربع السابق' : 'vs Last Quarter',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: isRTL ? 'أعلى إدارة التزاماً' : 'Top Department',
      value: isRTL ? 'المبيعات' : 'Sales',
      change: '91%',
      period: isRTL ? 'معدل الالتزام' : 'Compliance Rate',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: isRTL ? 'حالات متأخرة' : 'Overdue Cases',
      value: '23',
      change: '-5',
      period: isRTL ? 'تقييم' : 'evaluations',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  // بيانات تجريبية للأنظمة الخمسة
  const evaluationSystems = [
    {
      id: 'mbo',
      name: isRTL ? 'الإدارة بالأهداف (MBO)' : 'Management by Objectives (MBO)',
      description: isRTL ? 'تحديد الأهداف SMART ومتابعة تحقيقها' : 'Setting SMART objectives and tracking achievement',
      icon: Target,
      defaultWeights: isRTL ? 'مؤسسية 20% | قسمية 30% | فردية 50%' : 'Institutional 20% | Departmental 30% | Individual 50%',
      status: 'active'
    },
    {
      id: 'kpi',
      name: isRTL ? 'مؤشرات الأداء الرئيسية (KPI)' : 'Key Performance Indicators (KPI)',
      description: isRTL ? 'قياس الأداء من خلال مؤشرات كمية' : 'Performance measurement through quantitative indicators',
      icon: BarChart3,
      defaultWeights: isRTL ? 'حسب الوظيفة والإدارة' : 'By function and department',
      status: 'active'
    },
    {
      id: '360',
      name: isRTL ? 'التقييم 360 درجة' : '360-Degree Feedback',
      description: isRTL ? 'تقييم شامل من جميع الأطراف' : 'Comprehensive evaluation from all stakeholders',
      icon: Users,
      defaultWeights: isRTL ? 'مدير 40% | زملاء 25% | مرؤوسون 25% | عملاء 10%' : 'Manager 40% | Peers 25% | Subordinates 25% | Clients 10%',
      status: 'active'
    },
    {
      id: 'bsc',
      name: isRTL ? 'بطاقة الأداء المتوازن (BSC)' : 'Balanced Scorecard (BSC)',
      description: isRTL ? 'أربعة أبعاد متوازنة للأداء' : 'Four balanced performance perspectives',
      icon: BarChart3,
      defaultWeights: isRTL ? 'مالي، عملاء، عمليات، تعلم - 25% لكل بُعد' : 'Financial, Customer, Process, Learning - 25% each',
      status: 'active'
    },
    {
      id: 'continuous',
      name: isRTL ? 'الإدارة المستمرة للأداء' : 'Continuous Performance Management',
      description: isRTL ? 'تقييم مستمر ولقاءات دورية' : 'Continuous evaluation and regular meetings',
      icon: Clock,
      defaultWeights: isRTL ? 'اجتماعات شهرية وتغذية راجعة فورية' : 'Monthly meetings and instant feedback',
      status: 'active'
    }
  ];

  // بيانات تجريبية للاختبارات
  const assessmentSuite = [
    {
      id: 'work_sample',
      name: isRTL ? 'اختبارات الأداء العملي' : 'Work Sample Tests',
      description: isRTL ? 'محاكاة مهام عملية حقيقية' : 'Simulating real work tasks',
      defaultConfig: isRTL ? 'جودة 40% | سرعة 30% | التزام 30%' : 'Quality 40% | Speed 30% | Compliance 30%'
    },
    {
      id: 'birkman',
      name: isRTL ? 'اختبار بيركمان (Birkman Method)' : 'Birkman Method Assessment',
      description: isRTL ? 'تحليل الاهتمامات والسلوكيات والاحتياجات' : 'Analyzing interests, behaviors, and needs',
      defaultConfig: isRTL ? 'خطة تطوير 90 يوماً تلقائية' : 'Automatic 90-day development plan'
    },
    {
      id: 'disc',
      name: isRTL ? 'اختبار DISC' : 'DISC Assessment',
      description: isRTL ? 'تحليل أنماط السلوك والشخصية' : 'Behavioral and personality pattern analysis',
      defaultConfig: isRTL ? 'تقرير أسلوب التواصل والتعاون' : 'Communication and collaboration style report'
    },
    {
      id: 'mbti',
      name: isRTL ? 'اختبار MBTI' : 'MBTI Assessment',
      description: isRTL ? '16 نمط شخصية وتوصيات الفريق' : '16 personality types and team recommendations',
      defaultConfig: isRTL ? 'توصيات التعاون داخل الفريق' : 'Team collaboration recommendations'
    },
    {
      id: 'hogan',
      name: isRTL ? 'اختبارات هوجان (Hogan)' : 'Hogan Assessments',
      description: isRTL ? 'إمكانات القيادة ومخاطر السلوك' : 'Leadership potential and behavioral risks',
      defaultConfig: isRTL ? 'ملخصات إدارية مختصرة' : 'Executive summary reports'
    },
    {
      id: 'competency',
      name: isRTL ? 'اختبارات الكفاءة' : 'Competency-based Assessments',
      description: isRTL ? 'مصفوفة كفاءات حسب الدور' : 'Role-based competency matrix',
      defaultConfig: isRTL ? '5-7 كفاءات، 5 مستويات لكل واحدة' : '5-7 competencies, 5 levels each'
    }
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  const handleCreateEvaluation = () => {
    console.log('Creating new evaluation...');
  };

  const handleInviteToTest = () => {
    console.log('Inviting to assessment...');
  };

  const handleGenerateReport = () => {
    console.log('Generating quarterly report...');
  };

  const handleSave = () => {
    console.log('Saving...');
  };

  const handleSaveDraft = () => {
    console.log('Saving as draft...');
  };

  const handlePublish = () => {
    console.log('Publishing...');
  };

  const handlePreview = () => {
    console.log('Preview...');
  };

  const handleExportPDF = () => {
    console.log('Exporting to PDF...');
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
  };

  const handleImportCSV = () => {
    console.log('Importing CSV...');
  };

  const handleCancel = () => {
    console.log('Cancelling...');
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {isRTL ? 'العودة' : 'Back'}
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {isRTL ? 'نظام التقييمات الذكية' : 'Smart Performance Evaluation System'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'منصة بُعد BOUD HR المتكاملة' : 'BOUD HR Integrated Platform'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                {isRTL ? 'الإعدادات' : 'Settings'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-muted/30 p-1 rounded-2xl">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl">
              {isRTL ? 'لوحة القيادة' : 'Dashboard'}
            </TabsTrigger>
            <TabsTrigger value="smart" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl">
              <Brain className="w-4 h-4 ml-2" />
              {isRTL ? 'التقييم الذكي' : 'Smart Evaluations'}
            </TabsTrigger>
            <TabsTrigger value="evaluations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl">
              {isRTL ? 'التقييمات' : 'Appraisals'}
            </TabsTrigger>
            <TabsTrigger value="assessments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl">
              {isRTL ? 'الاختبارات' : 'Assessments'}
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl">
              {isRTL ? 'القوالب' : 'Templates'}
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl">
              {isRTL ? 'الإعدادات' : 'Settings'}
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl">
              {isRTL ? 'التقارير' : 'Reports'}
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardMetrics.map((metric, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {metric.title}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-2xl font-bold text-foreground">
                            {metric.value}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {metric.change}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {metric.period}
                        </p>
                      </div>
                      <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button onClick={handleCreateEvaluation} className="gap-2 h-12">
                    <Plus className="w-4 h-4" />
                    {isRTL ? 'إنشاء تقييم جديد' : 'Create New Evaluation'}
                  </Button>
                  <Button onClick={handleInviteToTest} variant="outline" className="gap-2 h-12">
                    <Send className="w-4 h-4" />
                    {isRTL ? 'دعوة لاختبار' : 'Invite to Assessment'}
                  </Button>
                  <Button onClick={handleGenerateReport} variant="outline" className="gap-2 h-12">
                    <FileText className="w-4 h-4" />
                    {isRTL ? 'تقرير ربع سنوي' : 'Quarterly Report'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'اتجاهات الأداء' : 'Performance Trends'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'متوسط الأداء على مدار آخر 12 شهراً' : 'Average performance over the last 12 months'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? 'الأداء العام' : 'Overall Performance'}
                    </span>
                    <span className="text-sm font-medium">3.6/5</span>
                  </div>
                  <Progress value={72} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? 'معدل الإنجاز' : 'Completion Rate'}
                    </span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? 'الالتزام بالمواعيد' : 'On-time Submission'}
                    </span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Evaluations Tab */}
          <TabsContent value="smart" className="space-y-6">
            <SmartEvaluations />
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations" className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                {isRTL ? 'حفظ' : 'Save'}
              </Button>
              <Button onClick={handleSaveDraft} variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                {isRTL ? 'حفظ كمسودة' : 'Save Draft'}
              </Button>
              <Button onClick={handlePublish} variant="outline" className="gap-2">
                <Send className="w-4 h-4" />
                {isRTL ? 'نشر/اعتماد' : 'Publish/Approve'}
              </Button>
              <Button onClick={handlePreview} variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                {isRTL ? 'معاينة' : 'Preview'}
              </Button>
              <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                {isRTL ? 'تصدير PDF' : 'Export PDF'}
              </Button>
              <Button onClick={handleExportExcel} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                {isRTL ? 'تصدير Excel' : 'Export Excel'}
              </Button>
              <Button onClick={handleImportCSV} variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                {isRTL ? 'استيراد CSV' : 'Import CSV'}
              </Button>
              <Button onClick={handleCancel} variant="ghost" className="gap-2">
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    {isRTL ? 'الأنظمة الخمسة لتقييم الأداء' : 'Five Performance Evaluation Systems'}
                  </CardTitle>
                  <CardDescription>
                    {isRTL ? 'اختر النظام المناسب لاحتياجاتك' : 'Choose the right system for your needs'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                     {evaluationSystems.map((system) => (
                       <Card key={system.id} className="hover:shadow-soft transition-all duration-300 cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary hover:bg-accent/20">
                         <CardContent className="p-6">
                           <div className="flex items-start justify-between">
                             <div className="flex items-start gap-4">
                               <div className="p-3 bg-primary/10 rounded-xl">
                                 <system.icon className="w-6 h-6 text-primary" />
                               </div>
                               <div className="flex-1">
                                 <h3 className="font-semibold text-foreground text-lg">{system.name}</h3>
                                 <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{system.description}</p>
                                <div className="mt-3 p-3 bg-accent/30 rounded-lg">
                                  <p className="text-xs text-primary font-medium">
                                    {isRTL ? 'الأوزان الافتراضية: ' : 'Default Weights: '}{system.defaultWeights}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Badge 
                                className={`${
                                  system.status === 'active' ? 'bg-success/20 text-success border-success/30' : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {system.status === 'active' ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'غير نشط' : 'Inactive')}
                              </Badge>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="gap-2 hover:bg-primary hover:text-primary-foreground"
                                onClick={() => {
                                  if (system.id === 'mbo') setActiveTab('mbo');
                                  else if (system.id === 'kpi') setActiveTab('kpi');
                                  else if (system.id === '360') setActiveTab('360');
                                  else if (system.id === 'bsc') setActiveTab('bsc');
                                  else if (system.id === 'continuous') setActiveTab('continuous');
                                  else console.log(`Opening ${system.id} system...`);
                                }}
                              >
                                <Settings className="w-4 h-4" />
                                {isRTL ? 'إعداد' : 'Configure'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MBO Tab */}
          <TabsContent value="mbo" className="space-y-6">
            <MBOSystem />
          </TabsContent>

          {/* KPI Tab */}
          <TabsContent value="kpi" className="space-y-6">
            <KPISystem />
          </TabsContent>

          {/* 360 Tab */}
          <TabsContent value="360" className="space-y-6">
            <System360 />
          </TabsContent>

          {/* BSC Tab */}
          <TabsContent value="bsc" className="space-y-6">
            <BSCSystem />
          </TabsContent>

          {/* Continuous Tab */}
          <TabsContent value="continuous" className="space-y-6">
            <ContinuousSystem />
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6">
            <AssessmentSuite />
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {isRTL ? 'حزمة الاختبارات والمقاييس' : 'Assessment Suite'}
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'اختبارات شاملة لقياس القدرات والأداء' : 'Comprehensive tests for measuring capabilities and performance'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {assessmentSuite.map((assessment, index) => (
                    <Card key={assessment.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {index + 1}
                              </Badge>
                              <h3 className="font-semibold text-foreground">{assessment.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{assessment.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              <span className="font-medium">
                                {isRTL ? 'الإعداد الافتراضي: ' : 'Default configuration: '}
                              </span>
                              {assessment.defaultConfig}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              {isRTL ? 'دعوة' : 'Invite'}
                            </Button>
                            <Button size="sm">
                              {isRTL ? 'إنشاء' : 'Create'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder tabs */}
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'الدورات التدريبية' : 'Training Courses'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'إدارة الدورات التدريبية والمسارات المهنية' : 'Manage training courses and career paths'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'ستكون هذه الواجهة جاهزة قريباً...' : 'This interface will be ready soon...'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'قوالب التقييم' : 'Evaluation Templates'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'إدارة وتخصيص قوالب التقييم' : 'Manage and customize evaluation templates'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'ستكون هذه الواجهة جاهزة قريباً...' : 'This interface will be ready soon...'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'إعدادات النظام' : 'System Settings'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'تكوين الأوزان والدورات والمعايير' : 'Configure weights, cycles, and criteria'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'ستكون هذه الواجهة جاهزة قريباً...' : 'This interface will be ready soon...'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'تقارير شاملة وتحليلات متقدمة' : 'Comprehensive reports and advanced analytics'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'ستكون هذه الواجهة جاهزة قريباً...' : 'This interface will be ready soon...'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};