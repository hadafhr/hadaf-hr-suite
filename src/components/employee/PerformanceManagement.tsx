import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
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
  MessageSquare,
  Zap,
  Trophy,
  User,
  Activity
} from 'lucide-react';

interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  reviewPeriod: string;
  reviewType: 'annual' | 'mid-year' | 'quarterly' | 'probation';
  status: 'draft' | 'self-evaluation' | 'manager-review' | 'hr-review' | 'completed';
  overallRating: number;
  competencyRatings: {
    technical: number;
    communication: number;
    leadership: number;
    problemSolving: number;
    teamwork: number;
  };
  goals: Goal[];
  strengths: string[];
  areasForImprovement: string[];
  developmentPlan: string;
  managerComments: string;
  employeeComments: string;
  hrComments: string;
  completedDate?: string;
  nextReviewDate: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'development' | 'behavioral' | 'project';
  targetDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
  progress: number;
  measurement: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

interface KPI {
  id: string;
  name: string;
  category: string;
  target: number;
  actual: number;
  unit: string;
  period: string;
  status: 'above-target' | 'on-track' | 'below-target' | 'critical';
}

const PerformanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  // Mock performance reviews
  const [performanceReviews] = useState<PerformanceReview[]>([
    {
      id: 'PR001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      reviewPeriod: '2024',
      reviewType: 'annual',
      status: 'completed',
      overallRating: 4.2,
      competencyRatings: {
        technical: 4.5,
        communication: 4.0,
        leadership: 4.2,
        problemSolving: 4.3,
        teamwork: 4.1
      },
      goals: [
        {
          id: 'G001',
          title: 'تطوير نظام إدارة المشاريع',
          description: 'بناء نظام شامل لإدارة المشاريع الداخلية',
          category: 'project',
          targetDate: '2024-12-31',
          status: 'in-progress',
          progress: 75,
          measurement: 'اكتمال المشروع',
          importance: 'high'
        },
        {
          id: 'G002', 
          title: 'حضور دورة React المتقدمة',
          description: 'تطوير مهارات React وNext.js',
          category: 'development',
          targetDate: '2024-06-30',
          status: 'completed',
          progress: 100,
          measurement: 'إتمام الدورة والحصول على الشهادة',
          importance: 'medium'
        }
      ],
      strengths: ['مهارات تقنية ممتازة', 'سرعة في التعلم', 'قدرة على حل المشاكل'],
      areasForImprovement: ['التواصل مع العملاء', 'إدارة الوقت', 'العروض التقديمية'],
      developmentPlan: 'التركيز على تطوير مهارات التواصل والقيادة',
      managerComments: 'موظف متميز يحتاج لتطوير مهارات الإدارة',
      employeeComments: 'أرغب في المزيد من المسؤوليات القيادية',
      hrComments: 'مرشح قوي للترقية مع التدريب المناسب',
      completedDate: '2024-03-15',
      nextReviewDate: '2024-09-15'
    }
  ]);

  // Mock KPIs
  const [kpis] = useState<KPI[]>([
    {
      id: 'KPI001',
      name: 'معدل إنجاز المهام',
      category: 'الأداء',
      target: 95,
      actual: 92,
      unit: '%',
      period: 'شهري',
      status: 'on-track'
    },
    {
      id: 'KPI002',
      name: 'رضا العملاء',
      category: 'الجودة',
      target: 4.5,
      actual: 4.7,
      unit: '/5',
      period: 'ربعي',
      status: 'above-target'
    },
    {
      id: 'KPI003',
      name: 'الالتزام بالمواعيد',
      category: 'الانضباط',
      target: 98,
      actual: 85,
      unit: '%',
      period: 'شهري',
      status: 'below-target'
    }
  ]);

  const getStatusBadge = (status: string, type: 'review' | 'goal' | 'kpi' = 'review') => {
    const configs = {
      review: {
        'draft': { color: 'bg-gray-100 text-gray-800', text: 'مسودة' },
        'self-evaluation': { color: 'bg-blue-100 text-blue-800', text: 'تقييم ذاتي' },
        'manager-review': { color: 'bg-orange-100 text-orange-800', text: 'مراجعة المدير' },
        'hr-review': { color: 'bg-purple-100 text-purple-800', text: 'مراجعة الموارد البشرية' },
        'completed': { color: 'bg-green-100 text-green-800', text: 'مكتمل' }
      },
      goal: {
        'not-started': { color: 'bg-gray-100 text-gray-800', text: 'لم يبدأ' },
        'in-progress': { color: 'bg-blue-100 text-blue-800', text: 'قيد التنفيذ' },
        'completed': { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
        'overdue': { color: 'bg-red-100 text-red-800', text: 'متأخر' }
      },
      kpi: {
        'above-target': { color: 'bg-green-100 text-green-800', text: 'فوق المستهدف' },
        'on-track': { color: 'bg-blue-100 text-blue-800', text: 'على المسار الصحيح' },
        'below-target': { color: 'bg-orange-100 text-orange-800', text: 'أقل من المستهدف' },
        'critical': { color: 'bg-red-100 text-red-800', text: 'حرج' }
      }
    } as const;

    const typeConfig = configs[type];
    const config = (typeConfig as any)[status] || { color: 'bg-gray-100 text-gray-800', text: status };
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const getRatingStars = (rating: number) => {
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

  const calculateStats = () => {
    return {
      totalReviews: performanceReviews.length,
      completedReviews: performanceReviews.filter(r => r.status === 'completed').length,
      averageRating: performanceReviews.reduce((sum, r) => sum + r.overallRating, 0) / performanceReviews.length,
      overdueTasks: performanceReviews.reduce((sum, r) => sum + r.goals.filter(g => g.status === 'overdue').length, 0),
      highPerformers: performanceReviews.filter(r => r.overallRating >= 4.0).length,
      needsImprovement: performanceReviews.filter(r => r.overallRating < 3.0).length
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#009F87]/10 rounded-lg">
            <Award className="h-8 w-8 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">نظام إدارة الأداء</h1>
            <p className="text-muted-foreground">تقييم الأداء والأهداف والتطوير المهني</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hover:bg-[#009F87] hover:text-white">
            <FileText className="h-4 w-4 ml-2" />
            تقرير الأداء
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                <Plus className="h-4 w-4 ml-2" />
                تقييم جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white/95 backdrop-blur">
              <DialogHeader>
                <DialogTitle className="text-[#009F87]">إنشاء تقييم أداء جديد</DialogTitle>
                <DialogDescription>اختر الموظف ونوع التقييم</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>الموظف</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMP001">أحمد محمد العلي</SelectItem>
                        <SelectItem value="EMP002">فاطمة سعد الأحمد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>نوع التقييم</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">تقييم سنوي</SelectItem>
                        <SelectItem value="mid-year">تقييم نصف سنوي</SelectItem>
                        <SelectItem value="quarterly">تقييم ربعي</SelectItem>
                        <SelectItem value="probation">تقييم فترة تجريبية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">إلغاء</Button>
                  <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                    إنشاء التقييم
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="relative grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87]">{stats.totalReviews}</div>
            <div className="text-sm text-muted-foreground">إجمالي التقييمات</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.completedReviews}</div>
            <div className="text-sm text-muted-foreground">تقييمات مكتملة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-yellow-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">متوسط التقييم</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-red-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.overdueTasks}</div>
            <div className="text-sm text-muted-foreground">مهام متأخرة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-emerald-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">{stats.highPerformers}</div>
            <div className="text-sm text-muted-foreground">أداء متميز</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-orange-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.5s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.needsImprovement}</div>
            <div className="text-sm text-muted-foreground">يحتاج تحسين</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="relative">
        <div className="flex space-x-1 bg-white/70 backdrop-blur rounded-lg p-1">
          {[
            { id: 'dashboard', label: 'لوحة التحكم', icon: BarChart3 },
            { id: 'reviews', label: 'التقييمات', icon: Award },
            { id: 'goals', label: 'الأهداف', icon: Target },
            { id: 'kpis', label: 'مؤشرات الأداء', icon: Activity },
            { id: 'development', label: 'خطط التطوير', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#009F87] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'reviews' && (
        <div className="relative space-y-4">
          {performanceReviews.map((review, index) => (
            <Card 
              key={review.id}
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-[#009F87]">
                        {review.employeeName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{review.employeeName}</h3>
                        {getStatusBadge(review.status, 'review')}
                        <Badge variant="outline">{review.department}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>فترة التقييم: {review.reviewPeriod}</span>
                        <span>نوع التقييم: {review.reviewType}</span>
                        {review.completedDate && <span>تاريخ الإكمال: {review.completedDate}</span>}
                      </div>
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">التقييم الإجمالي:</span>
                          {getRatingStars(review.overallRating)}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">الأهداف المكتملة:</span>
                          <span className="font-semibold ml-1">
                            {review.goals.filter(g => g.status === 'completed').length}/{review.goals.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Edit className="h-4 w-4 ml-2" />
                      تحرير
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <MessageSquare className="h-4 w-4 ml-2" />
                      تعليقات
                    </Button>
                  </div>
                </div>
                
                {/* Competency Ratings */}
                <div className="mt-4 p-4 bg-[#009F87]/5 rounded-lg">
                  <h4 className="font-medium mb-3">تقييم الكفاءات</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">المهارات التقنية</div>
                      {getRatingStars(review.competencyRatings.technical)}
                    </div>
                    <div className="text-center">
                      <div className="font-medium">التواصل</div>
                      {getRatingStars(review.competencyRatings.communication)}
                    </div>
                    <div className="text-center">
                      <div className="font-medium">القيادة</div>
                      {getRatingStars(review.competencyRatings.leadership)}
                    </div>
                    <div className="text-center">
                      <div className="font-medium">حل المشاكل</div>
                      {getRatingStars(review.competencyRatings.problemSolving)}
                    </div>
                    <div className="text-center">
                      <div className="font-medium">العمل الجماعي</div>
                      {getRatingStars(review.competencyRatings.teamwork)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="relative space-y-4">
          <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#009F87]">
                <Target className="h-6 w-6" />
                إدارة الأهداف
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceReviews.flatMap(review => review.goals).map((goal, index) => (
                  <Card 
                    key={goal.id}
                    className="hover:shadow-md transition-all animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{goal.title}</h3>
                            {getStatusBadge(goal.status, 'goal')}
                            <Badge variant="outline">{goal.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                          <div className="flex items-center gap-6 text-sm">
                            <span><strong>الموعد المستهدف:</strong> {goal.targetDate}</span>
                            <span><strong>الأهمية:</strong> {goal.importance}</span>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>التقدم</span>
                              <span>{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 ml-2" />
                            تحديث
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
      )}

      {activeTab === 'kpis' && (
        <div className="relative space-y-4">
          <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#009F87]">
                <Activity className="h-6 w-6" />
                مؤشرات الأداء الرئيسية (KPIs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kpis.map((kpi, index) => (
                  <Card 
                    key={kpi.id}
                    className="hover:shadow-md transition-all animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{kpi.name}</h3>
                            {getStatusBadge(kpi.status, 'kpi')}
                            <Badge variant="outline">{kpi.category}</Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-muted-foreground">المستهدف:</span>
                              <p className="font-semibold">{kpi.target}{kpi.unit}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">الفعلي:</span>
                              <p className={`font-semibold ${
                                kpi.actual >= kpi.target ? 'text-green-600' : 'text-red-600'
                              }`}>{kpi.actual}{kpi.unit}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">الانحراف:</span>
                              <p className={`font-semibold ${
                                kpi.actual >= kpi.target ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {((kpi.actual - kpi.target) / kpi.target * 100).toFixed(1)}%
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">الفترة:</span>
                              <p className="font-semibold">{kpi.period}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Progress 
                              value={Math.min((kpi.actual / kpi.target) * 100, 100)} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PerformanceManagement;