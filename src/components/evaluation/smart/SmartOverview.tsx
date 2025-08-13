import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp,
  Users,
  AlertTriangle,
  Award,
  Target,
  Brain,
  PlayCircle,
  FileBarChart,
  Eye,
  Zap
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const SmartOverview = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Demo data for charts
  const trendData = [
    { quarter: 'Q1', score: 72 },
    { quarter: 'Q2', score: 75 },
    { quarter: 'Q3', score: 78 },
    { quarter: 'Q4', score: 76 },
  ];

  const distributionData = [
    { range: '90-100', count: 12, percentage: 12 },
    { range: '80-89', count: 28, percentage: 28 },
    { range: '70-79', count: 35, percentage: 35 },
    { range: '60-69', count: 18, percentage: 18 },
    { range: '50-59', count: 7, percentage: 7 },
  ];

  const competencyGapData = [
    { competency: 'Leadership', gap: 15 },
    { competency: 'Communication', gap: 8 },
    { competency: 'Technical', gap: 22 },
    { competency: 'Teamwork', gap: 5 },
    { competency: 'Innovation', gap: 18 },
  ];

  const strengthsData = [
    { name: 'Problem Solving', value: 35, color: '#10b981' },
    { name: 'Customer Focus', value: 28, color: '#3b82f6' },
    { name: 'Adaptability', value: 22, color: '#8b5cf6' },
    { name: 'Quality', value: 15, color: '#f59e0b' },
  ];

  // KPI Cards data
  const kpiCards = [
    {
      title: isRTL ? 'اكتمال التقييم' : 'Evaluation Completion',
      value: '72%',
      change: '+5%',
      trend: 'up',
      icon: Target,
      description: isRTL ? 'للربع الحالي' : 'Current Quarter',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: isRTL ? 'متوسط النتيجة الذكية' : 'Avg Smart Score',
      value: '76',
      change: '+3',
      trend: 'up',
      icon: Award,
      description: isRTL ? 'من أصل 100' : 'Out of 100',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: isRTL ? 'الموظفون عالي المخاطر' : 'High-Risk Employees',
      value: '6',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      description: isRTL ? 'يحتاجون اهتمام' : 'Need Attention',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: isRTL ? 'المعايرات المعلقة' : 'Pending Calibrations',
      value: '3',
      change: '0',
      trend: 'neutral',
      icon: Users,
      description: isRTL ? 'في انتظار المراجعة' : 'Awaiting Review',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    }
  ];

  const quickActions = [
    {
      id: 'calibration',
      title: isRTL ? 'فتح المعايرة' : 'Open Calibration',
      description: isRTL ? 'بدء جلسة معايرة جديدة' : 'Start a new calibration session',
      icon: Target,
      color: 'bg-primary'
    },
    {
      id: 'generate-idp',
      title: isRTL ? 'إنتاج خطط التطوير' : 'Generate IDPs',
      description: isRTL ? 'إنشاء خطط تطوير فردية' : 'Create individual development plans',
      icon: TrendingUp,
      color: 'bg-blue-600'
    },
    {
      id: 'bias-check',
      title: isRTL ? 'فحص التحيز' : 'Run Bias Check',
      description: isRTL ? 'تحليل أنماط التحيز' : 'Analyze bias patterns',
      icon: Eye,
      color: 'bg-purple-600'
    },
    {
      id: 'what-if',
      title: isRTL ? 'تشغيل ماذا لو' : 'Launch What-If',
      description: isRTL ? 'محاكاة سيناريوهات مختلفة' : 'Simulate different scenarios',
      icon: PlayCircle,
      color: 'bg-green-600'
    }
  ];

  const handleQuickAction = (actionId: string) => {
    console.log(`Executing quick action: ${actionId}`);
    // Implementation for each quick action
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <Badge variant={kpi.trend === 'up' ? 'default' : kpi.trend === 'down' ? 'destructive' : 'secondary'}>
                  {kpi.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Smart Score Trend */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {isRTL ? 'اتجاه النتيجة الذكية' : 'Smart Score Trend'}
            </CardTitle>
            <CardDescription>
              {isRTL ? 'اتجاه النتائج عبر الأرباع' : 'Score trends across quarters'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-primary" />
              {isRTL ? 'توزيع النتائج' : 'Score Distribution'}
            </CardTitle>
            <CardDescription>
              {isRTL ? 'توزيع الموظفين حسب النتيجة الذكية' : 'Employee distribution by Smart Score'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Competency Gaps */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {isRTL ? 'فجوات الكفاءات' : 'Competency Gaps'}
            </CardTitle>
            <CardDescription>
              {isRTL ? 'أكبر فجوات الكفاءات في المنظمة' : 'Largest competency gaps in organization'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competencyGapData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.competency}</span>
                    <span className="text-sm text-muted-foreground">{item.gap}% gap</span>
                  </div>
                  <Progress value={item.gap} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Strengths */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              {isRTL ? 'أهم نقاط القوة' : 'Top Strengths'}
            </CardTitle>
            <CardDescription>
              {isRTL ? 'أقوى الكفاءات في المنظمة' : 'Strongest competencies in organization'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={strengthsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {strengthsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {strengthsData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            {isRTL ? 'الإجراءات السريعة' : 'Quick Actions'}
          </CardTitle>
          <CardDescription>
            {isRTL ? 'إجراءات شائعة الاستخدام' : 'Commonly used actions'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-accent/50 border-2 hover:border-primary/20"
                onClick={() => handleQuickAction(action.id)}
              >
                <div className={`p-3 rounded-xl ${action.color} text-white`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};