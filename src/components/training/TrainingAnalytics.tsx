import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  Clock,
  Star,
  Target,
  Brain,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { ReportsGenerator } from './ReportsGenerator';
import { useTrainingSystem } from '@/hooks/useTrainingSystem';

export const TrainingAnalytics: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { stats, courses, instructors } = useTrainingSystem();

  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('enrollments');

  // Analytics data
  const analyticsData = {
    enrollmentTrends: [
      { month: 'يناير', enrollments: 234, completions: 198, revenue: 45600 },
      { month: 'فبراير', enrollments: 287, completions: 245, revenue: 52300 },
      { month: 'مارس', enrollments: 324, completions: 289, revenue: 61200 },
      { month: 'أبريل', enrollments: 298, completions: 267, revenue: 58400 },
      { month: 'مايو', enrollments: 356, completions: 321, revenue: 67800 },
      { month: 'يونيو', enrollments: 389, completions: 341, revenue: 72300 }
    ],
    coursePerformance: courses.map(course => ({
      ...course,
      completionRate: Math.floor(Math.random() * 40) + 60,
      satisfaction: Math.floor(Math.random() * 20) + 80,
      dropout: Math.floor(Math.random() * 15) + 5,
      revenue: Math.floor(Math.random() * 50000) + 20000
    })),
    instructorStats: instructors.map(instructor => ({
      ...instructor,
      avgCompletion: Math.floor(Math.random() * 20) + 75,
      studentSatisfaction: Math.floor(Math.random() * 10) + 85,
      responseTime: Math.floor(Math.random() * 4) + 1,
      engagement: Math.floor(Math.random() * 15) + 80
    })),
    learningPaths: [
      { id: 1, name: 'مسار تطوير القيادة', enrollments: 145, completions: 89, avgTime: '45 يوم' },
      { id: 2, name: 'مسار التقنية والبرمجة', enrollments: 234, completions: 187, avgTime: '60 يوم' },
      { id: 3, name: 'مسار المالية والمحاسبة', enrollments: 98, completions: 76, avgTime: '38 يوم' }
    ],
    riskIndicators: [
      { type: 'high_dropout', courses: 3, description: 'معدل انسحاب عالي' },
      { type: 'low_engagement', courses: 2, description: 'مستوى تفاعل منخفض' },
      { type: 'poor_ratings', courses: 1, description: 'تقييمات منخفضة' }
    ]
  };

  const aiInsights = [
    {
      type: 'success',
      title: 'نمو ممتاز في التسجيلات',
      description: 'زيادة 23% في التسجيلات الشهرية مقارنة بالفترة السابقة',
      impact: 'إيجابي',
      recommendation: 'استمر في الاستراتيجية الحالية وركز على الدورات الأكثر طلباً'
    },
    {
      type: 'warning',
      title: 'انخفاض في معدل الإكمال',
      description: 'انخفاض 5% في معدل إكمال الدورات التقنية',
      impact: 'متوسط',
      recommendation: 'مراجعة محتوى الدورات التقنية وإضافة جلسات دعم إضافية'
    },
    {
      type: 'info',
      title: 'فرصة للنمو',
      description: 'الطلب على دورات التسويق الرقمي يتزايد بنسبة 35%',
      impact: 'إيجابي',
      recommendation: 'زيادة عدد الدورات المقدمة في مجال التسويق الرقمي'
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Target className="h-5 w-5 text-blue-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    const impacts = {
      'إيجابي': 'bg-green-500/10 text-green-500 border-green-500/20',
      'متوسط': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'سلبي': 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    return impacts[impact] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isRTL ? 'التحليلات والتقارير الذكية' : 'Smart Analytics & Reports'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'تحليلات متقدمة مدعومة بالذكاء الاصطناعي لتحسين الأداء' : 'Advanced AI-powered analytics for performance optimization'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">{isRTL ? 'أسبوع' : 'Week'}</SelectItem>
              <SelectItem value="month">{isRTL ? 'شهر' : 'Month'}</SelectItem>
              <SelectItem value="quarter">{isRTL ? 'ربع سنة' : 'Quarter'}</SelectItem>
              <SelectItem value="year">{isRTL ? 'سنة' : 'Year'}</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {isRTL ? 'تصدير التقرير' : 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي الإيرادات' : 'Total Revenue'}</p>
                <p className="text-2xl font-bold text-green-500">₺{stats.revenue?.toLocaleString() || '284,500'}</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'معدل الإكمال' : 'Completion Rate'}</p>
                <p className="text-2xl font-bold text-blue-500">{stats.completionRate}%</p>
                <p className="text-xs text-blue-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5%
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'متوسط التقييم' : 'Avg Rating'}</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.averageRating}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRTL ? 'من 5.0' : 'out of 5.0'}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي الساعات' : 'Total Hours'}</p>
                <p className="text-2xl font-bold text-purple-500">{stats.totalHours.toLocaleString()}</p>
                <p className="text-xs text-purple-500 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {isRTL ? 'هذا الشهر' : 'This month'}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'النمو الشهري' : 'Monthly Growth'}</p>
                <p className="text-2xl font-bold text-emerald-500">+23%</p>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {isRTL ? 'تحسن مستمر' : 'Consistent'}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">{isRTL ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
          <TabsTrigger value="courses">{isRTL ? 'أداء الدورات' : 'Course Performance'}</TabsTrigger>
          <TabsTrigger value="instructors">{isRTL ? 'أداء المدربين' : 'Instructor Performance'}</TabsTrigger>
          <TabsTrigger value="ai-insights">{isRTL ? 'الرؤى الذكية' : 'AI Insights'}</TabsTrigger>
          <TabsTrigger value="predictions">{isRTL ? 'التنبؤات' : 'Predictions'}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Enrollment Trends */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  {isRTL ? 'اتجاهات التسجيل' : 'Enrollment Trends'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.enrollmentTrends.slice(-3).map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{data.month}</p>
                        <p className="text-sm text-muted-foreground">{data.enrollments} {isRTL ? 'تسجيل' : 'enrollments'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-500">₺{data.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{Math.round((data.completions / data.enrollments) * 100)}% {isRTL ? 'إكمال' : 'completion'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Path Performance */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  {isRTL ? 'أداء المسارات التعليمية' : 'Learning Path Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.learningPaths.map((path) => (
                    <div key={path.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{path.name}</p>
                        <Badge variant="outline">
                          {Math.round((path.completions / path.enrollments) * 100)}%
                        </Badge>
                      </div>
                      <Progress 
                        value={(path.completions / path.enrollments) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{path.enrollments} {isRTL ? 'متدرب' : 'learners'}</span>
                        <span>{path.avgTime} {isRTL ? 'متوسط الوقت' : 'avg time'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Indicators */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                {isRTL ? 'مؤشرات المخاطر' : 'Risk Indicators'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {analyticsData.riskIndicators.map((risk, index) => (
                  <div key={index} className="p-4 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium text-sm">{risk.description}</span>
                    </div>
                    <p className="text-xl font-bold text-yellow-600">{risk.courses}</p>
                    <p className="text-xs text-muted-foreground">{isRTL ? 'دورة تحتاج مراجعة' : 'courses need review'}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Course Performance Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-6">
            {analyticsData.coursePerformance.map((course) => (
              <Card key={course.id} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    </div>
                    <Badge className={course.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}>
                      {course.status === 'active' ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'مكتمل' : 'Completed')}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{isRTL ? 'معدل الإكمال' : 'Completion Rate'}</span>
                        <span className="font-medium">{course.completionRate}%</span>
                      </div>
                      <Progress value={course.completionRate} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{isRTL ? 'الرضا' : 'Satisfaction'}</span>
                        <span className="font-medium">{course.satisfaction}%</span>
                      </div>
                      <Progress value={course.satisfaction} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{isRTL ? 'الانسحاب' : 'Dropout Rate'}</span>
                        <span className="font-medium text-red-500">{course.dropout}%</span>
                      </div>
                      <Progress value={course.dropout} className="h-2 bg-red-100 [&>div]:bg-red-500" />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">{isRTL ? 'الإيرادات' : 'Revenue'}</p>
                      <p className="text-lg font-bold text-green-500">₺{course.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="h-6 w-6 text-purple-500" />
              <h3 className="text-xl font-bold">
                {isRTL ? 'الرؤى المدعومة بالذكاء الاصطناعي' : 'AI-Powered Insights'}
              </h3>
            </div>

            {aiInsights.map((insight, index) => (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge className={getImpactBadge(insight.impact)}>
                          {insight.impact}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{insight.description}</p>
                      <div className="bg-accent/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">
                          {isRTL ? 'التوصية:' : 'Recommendation:'}
                        </p>
                        <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold">
                {isRTL ? 'التنبؤات الذكية' : 'Smart Predictions'}
              </h3>
            </div>
            <p className="text-muted-foreground">
              {isRTL ? 'سيتم عرض التنبؤات المستقبلية بناءً على البيانات التاريخية والذكاء الاصطناعي' : 'Future predictions based on historical data and AI analysis will be displayed here'}
            </p>
          </Card>
        </TabsContent>
        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <ReportsGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};