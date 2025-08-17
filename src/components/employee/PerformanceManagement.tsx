import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { usePerformanceManagement } from '@/hooks/usePerformanceManagement';
import { 
  Award,
  Target,
  TrendingUp,
  Users,
  Star,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Plus,
  Edit,
  Eye,
  Calendar,
  Activity,
  Trophy,
  Zap,
  Rocket,
  BookOpen,
  Brain,
  LineChart
} from 'lucide-react';

const PerformanceManagement: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const { 
    isLoading, 
    goals, 
    reviews, 
    kpis, 
    measurements, 
    developmentPlans, 
    competencies,
    getPerformanceStats 
  } = usePerformanceManagement();

  const stats = getPerformanceStats();

  const getStatusBadge = (status: string, type: 'goal' | 'review' | 'plan' = 'goal') => {
    const configs = {
      goal: {
        'active': { color: 'bg-blue-100 text-blue-800', text: 'نشط' },
        'completed': { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
        'paused': { color: 'bg-yellow-100 text-yellow-800', text: 'متوقف' },
        'cancelled': { color: 'bg-red-100 text-red-800', text: 'ملغي' }
      },
      review: {
        'draft': { color: 'bg-gray-100 text-gray-800', text: 'مسودة' },
        'in_progress': { color: 'bg-blue-100 text-blue-800', text: 'قيد التنفيذ' },
        'pending_approval': { color: 'bg-yellow-100 text-yellow-800', text: 'في انتظار الموافقة' },
        'completed': { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
        'cancelled': { color: 'bg-red-100 text-red-800', text: 'ملغي' }
      },
      plan: {
        'draft': { color: 'bg-gray-100 text-gray-800', text: 'مسودة' },
        'active': { color: 'bg-blue-100 text-blue-800', text: 'نشط' },
        'completed': { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
        'on_hold': { color: 'bg-yellow-100 text-yellow-800', text: 'معلق' },
        'cancelled': { color: 'bg-red-100 text-red-800', text: 'ملغي' }
      }
    };

    const config = (configs[type] as any)[status] || { color: 'bg-gray-100 text-gray-800', text: status };
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const configs = {
      'low': { color: 'bg-gray-100 text-gray-800', text: 'منخفض' },
      'medium': { color: 'bg-blue-100 text-blue-800', text: 'متوسط' },
      'high': { color: 'bg-orange-100 text-orange-800', text: 'عالي' },
      'critical': { color: 'bg-red-100 text-red-800', text: 'حرج' }
    };
    
    const config = (configs as any)[priority] || { color: 'bg-gray-100 text-gray-800', text: priority };
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const getRatingStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-primary/5 via-background to-primary/10 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">نظام إدارة الأداء</h1>
            <p className="text-muted-foreground">تقييم الأداء والأهداف والتطوير المهني</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hover:bg-primary hover:text-white">
            <FileText className="h-4 w-4 ml-2" />
            تقرير الأداء
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-4 w-4 ml-2" />
            إضافة جديد
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-white/80 backdrop-blur border-primary/20 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{stats.totalGoals}</div>
            <div className="text-sm text-muted-foreground">إجمالي الأهداف</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-200 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.completedGoals}</div>
            <div className="text-sm text-muted-foreground">أهداف مكتملة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-blue-200 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.activeGoals}</div>
            <div className="text-sm text-muted-foreground">أهداف نشطة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-yellow-200 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.averageRating || 0}</div>
            <div className="text-sm text-muted-foreground">متوسط التقييم</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-purple-200 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.activePlans}</div>
            <div className="text-sm text-muted-foreground">خطط تطوير نشطة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-orange-200 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.averageGoalProgress}%</div>
            <div className="text-sm text-muted-foreground">متوسط التقدم</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/70 backdrop-blur">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            التقييمات
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            الأهداف
          </TabsTrigger>
          <TabsTrigger value="kpis" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            مؤشرات الأداء
          </TabsTrigger>
          <TabsTrigger value="development" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            خطط التطوير
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Goals Overview */}
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  نظرة عامة على الأهداف
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goals.slice(0, 5).map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{goal.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(goal.status, 'goal')}
                          {getPriorityBadge(goal.priority)}
                        </div>
                        <Progress value={goal.current_value} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  التقييمات الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(review.status, 'review')}
                          {getRatingStars(review.overall_rating)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {review.review_period_start} - {review.review_period_end}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Development Plans Overview */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                خطط التطوير المهني
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {developmentPlans.slice(0, 6).map((plan) => (
                  <div key={plan.id} className="p-4 bg-muted/20 rounded-lg border">
                    <h4 className="font-medium mb-2">{plan.title}</h4>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusBadge(plan.status, 'plan')}
                    </div>
                    <Progress value={plan.progress_percentage} className="mb-2" />
                    <div className="text-sm text-muted-foreground">
                      التقدم: {plan.progress_percentage}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      الهدف: {new Date(plan.target_completion_date).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">تقييمات الأداء</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              تقييم جديد
            </Button>
          </div>
          
          <div className="grid gap-4">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-white/90 backdrop-blur hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">تقييم أداء</h3>
                        {getStatusBadge(review.status, 'review')}
                        {getRatingStars(review.overall_rating)}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                        <div>فترة التقييم: {review.review_period_start} - {review.review_period_end}</div>
                        <div>درجة الأهداف: {review.goal_achievement_score}%</div>
                      </div>

                      {review.strengths && (
                        <div className="mb-3">
                          <h4 className="font-medium text-green-700 mb-1">نقاط القوة:</h4>
                          <p className="text-sm text-muted-foreground">{review.strengths}</p>
                        </div>
                      )}

                      {review.areas_for_improvement && (
                        <div className="mb-3">
                          <h4 className="font-medium text-orange-700 mb-1">مجالات التحسين:</h4>
                          <p className="text-sm text-muted-foreground">{review.areas_for_improvement}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">الأهداف</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              هدف جديد
            </Button>
          </div>
          
          <div className="grid gap-4">
            {goals.map((goal) => (
              <Card key={goal.id} className="bg-white/90 backdrop-blur hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">{goal.title}</h3>
                        {getStatusBadge(goal.status, 'goal')}
                        {getPriorityBadge(goal.priority)}
                      </div>
                      
                      {goal.description && (
                        <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                      )}

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-sm">
                          <span className="font-medium">التقدم:</span>
                          <Progress value={goal.current_value} className="mt-1" />
                          <span className="text-xs text-muted-foreground">{goal.current_value}%</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">الفئة:</span>
                          <Badge variant="outline" className="ml-2">{goal.category}</Badge>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">الموعد المستهدف:</span>
                          <div className="text-muted-foreground">{new Date(goal.target_date).toLocaleDateString('ar-SA')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* KPIs Tab */}
        <TabsContent value="kpis" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">مؤشرات الأداء الرئيسية</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              مؤشر جديد
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi) => (
              <Card key={kpi.id} className="bg-white/90 backdrop-blur hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{kpi.name}</h3>
                      <div className="text-sm text-muted-foreground mt-1">{kpi.category}</div>
                    </div>
                    <Badge variant={kpi.is_active ? "default" : "secondary"}>
                      {kpi.is_active ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                  
                  {kpi.description && (
                    <p className="text-sm text-muted-foreground mb-4">{kpi.description}</p>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>الوحدة:</span>
                      <span className="font-medium">{kpi.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>التكرار:</span>
                      <span className="font-medium">{kpi.frequency}</span>
                    </div>
                    {kpi.target_value && (
                      <div className="flex justify-between">
                        <span>الهدف:</span>
                        <span className="font-medium">{kpi.target_value}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Development Plans Tab */}
        <TabsContent value="development" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">خطط التطوير المهني</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              خطة جديدة
            </Button>
          </div>
          
          <div className="grid gap-4">
            {developmentPlans.map((plan) => (
              <Card key={plan.id} className="bg-white/90 backdrop-blur hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">{plan.title}</h3>
                        {getStatusBadge(plan.status, 'plan')}
                      </div>
                      
                      {plan.description && (
                        <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                      )}

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium mb-2">التقدم:</h4>
                          <Progress value={plan.progress_percentage} className="mb-1" />
                          <div className="text-sm text-muted-foreground">{plan.progress_percentage}% مكتمل</div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">المهارات المستهدفة:</h4>
                          <div className="flex flex-wrap gap-1">
                            {plan.skills_to_develop.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {plan.skills_to_develop.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{plan.skills_to_develop.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">تاريخ البداية:</span>
                          <div className="text-muted-foreground">{new Date(plan.start_date).toLocaleDateString('ar-SA')}</div>
                        </div>
                        <div>
                          <span className="font-medium">الموعد المستهدف:</span>
                          <div className="text-muted-foreground">{new Date(plan.target_completion_date).toLocaleDateString('ar-SA')}</div>
                        </div>
                        <div>
                          <span className="font-medium">الميزانية المخصصة:</span>
                          <div className="text-muted-foreground">{plan.budget_allocated.toLocaleString()} ريال</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceManagement;