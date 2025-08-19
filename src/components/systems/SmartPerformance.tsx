import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  ArrowLeft, Target, TrendingUp, Award, BarChart3, 
  Users, Star, Calendar, Eye, Edit, Plus, Search,
  CheckCircle2, AlertTriangle, Clock, Zap, Brain,
  PieChart, Activity, BookOpen, MessageSquare, Download
} from 'lucide-react';
import patternBg from '@/assets/boud-pattern-bg.jpg';
import gradientMesh from '@/assets/boud-gradient-mesh.jpg';
import circlesPattern from '@/assets/boud-circles-pattern.jpg';

interface PerformanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  reviewPeriod: string;
  overallScore: number;
  competencyScores: {
    technical: number;
    leadership: number;
    communication: number;
    problemSolving: number;
    teamwork: number;
  };
  goals: {
    id: string;
    title: string;
    progress: number;
    status: 'completed' | 'inProgress' | 'delayed' | 'notStarted';
    weight: number;
  }[];
  feedback: {
    strengths: string[];
    areasForImprovement: string[];
    managerComments: string;
    selfAssessment: string;
  };
  developmentPlan: {
    shortTerm: string[];
    longTerm: string[];
    trainingNeeds: string[];
  };
  status: 'draft' | 'inReview' | 'completed' | 'approved';
  reviewDate: string;
  nextReviewDate: string;
}

interface PerformanceProps {
  onBack: () => void;
}

export const SmartPerformance: React.FC<PerformanceProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<PerformanceRecord | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  // Mock comprehensive performance data
  const performanceData: PerformanceRecord[] = [
    {
      id: 'PERF001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      position: 'مطور أول',
      reviewPeriod: 'Q1 2024',
      overallScore: 87,
      competencyScores: {
        technical: 92,
        leadership: 78,
        communication: 85,
        problemSolving: 90,
        teamwork: 88
      },
      goals: [
        { id: 'G1', title: 'تطوير نظام إدارة العملاء', progress: 95, status: 'completed', weight: 40 },
        { id: 'G2', title: 'تحسين أداء قاعدة البيانات', progress: 75, status: 'inProgress', weight: 30 },
        { id: 'G3', title: 'تدريب الفريق الجديد', progress: 60, status: 'inProgress', weight: 30 }
      ],
      feedback: {
        strengths: ['خبرة تقنية ممتازة', 'قدرة على حل المشاكل المعقدة', 'التزام بالمواعيد'],
        areasForImprovement: ['مهارات القيادة', 'التواصل مع الفرق الأخرى'],
        managerComments: 'موظف متميز بأداء ممتاز في المجال التقني',
        selfAssessment: 'أشعر بالرضا عن إنجازاتي هذا الربع وأسعى للتطوير المستمر'
      },
      developmentPlan: {
        shortTerm: ['دورة في إدارة الفريق', 'ورشة مهارات التواصل'],
        longTerm: ['شهادة PMP', 'دورة في الذكاء الاصطناعي'],
        trainingNeeds: ['القيادة التقنية', 'إدارة المشاريع']
      },
      status: 'completed',
      reviewDate: '2024-03-15',
      nextReviewDate: '2024-06-15'
    },
    {
      id: 'PERF002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة أحمد سالم',
      department: 'الموارد البشرية',
      position: 'مدير الموارد البشرية',
      reviewPeriod: 'Q1 2024',
      overallScore: 93,
      competencyScores: {
        technical: 88,
        leadership: 95,
        communication: 98,
        problemSolving: 85,
        teamwork: 92
      },
      goals: [
        { id: 'G4', title: 'تطوير سياسات الموارد البشرية', progress: 100, status: 'completed', weight: 50 },
        { id: 'G5', title: 'برنامج تطوير المواهب', progress: 80, status: 'inProgress', weight: 35 },
        { id: 'G6', title: 'تحسين رضا الموظفين', progress: 70, status: 'inProgress', weight: 15 }
      ],
      feedback: {
        strengths: ['قيادة استثنائية', 'مهارات تواصل ممتازة', 'رؤية استراتيجية واضحة'],
        areasForImprovement: ['التركيز على التفاصيل التقنية'],
        managerComments: 'أداء متميز وقيادة ملهمة للفريق',
        selfAssessment: 'أفخر بالإنجازات المحققة وأتطلع لمواصلة التطوير'
      },
      developmentPlan: {
        shortTerm: ['برنامج القيادة التنفيذية'],
        longTerm: ['ماجستير في إدارة الأعمال', 'شهادة SHRM-SCP'],
        trainingNeeds: ['التحول الرقمي في الموارد البشرية', 'تحليل البيانات']
      },
      status: 'approved',
      reviewDate: '2024-03-10',
      nextReviewDate: '2024-06-10'
    }
  ];

  const performanceStats = {
    totalReviews: 245,
    completedReviews: 189,
    pendingReviews: 32,
    averageScore: 84.5,
    highPerformers: 58,
    improvementNeeded: 12,
    goalCompletionRate: 78.5,
    employeeSatisfaction: 89.2
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: 'ممتاز', className: 'bg-success/20 text-success border-success/30' };
    if (score >= 80) return { text: 'جيد جداً', className: 'bg-blue-100 text-blue-800 border-blue-200' };
    if (score >= 70) return { text: 'جيد', className: 'bg-warning/20 text-warning border-warning/30' };
    return { text: 'يحتاج تحسين', className: 'bg-destructive/20 text-destructive border-destructive/30' };
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { text: 'مسودة', className: 'bg-gray-100 text-gray-800 border-gray-200' },
      inReview: { text: 'قيد المراجعة', className: 'bg-warning/20 text-warning border-warning/30' },
      completed: { text: 'مكتمل', className: 'bg-success/20 text-success border-success/30' },
      approved: { text: 'معتمد', className: 'bg-primary/20 text-primary border-primary/30' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getGoalStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'inProgress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleCompleteReview = () => {
    toast.success('تم إكمال التقييم بنجاح', {
      description: 'تم حفظ التقييم وإرساله للاعتماد'
    });
    setIsReviewDialogOpen(false);
  };

  const filteredPerformance = performanceData.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${circlesPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${gradientMesh})`,
          backgroundSize: '600px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative p-6 backdrop-blur-sm">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="bg-white/90 backdrop-blur border-primary/20 hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 backdrop-blur rounded-xl border border-primary/30">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">نظام تقييم الأداء الذكي</h1>
                <p className="text-muted-foreground">تقييم شامل ومتطور لأداء الموظفين والأهداف</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  تقييم جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary">إنشاء تقييم أداء جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">الموظف</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الموظف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EMP001">أحمد محمد العلي</SelectItem>
                          <SelectItem value="EMP002">فاطمة أحمد سالم</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">فترة التقييم</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفترة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Q1-2024">الربع الأول 2024</SelectItem>
                          <SelectItem value="Q2-2024">الربع الثاني 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">تقييم الكفاءات</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">المهارات التقنية</label>
                        <Input type="number" min="0" max="100" placeholder="النتيجة من 100" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">القيادة</label>
                        <Input type="number" min="0" max="100" placeholder="النتيجة من 100" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">التواصل</label>
                        <Input type="number" min="0" max="100" placeholder="النتيجة من 100" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">حل المشاكل</label>
                        <Input type="number" min="0" max="100" placeholder="النتيجة من 100" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">الملاحظات والتطوير</h3>
                    <div>
                      <label className="text-sm font-medium mb-2 block">نقاط القوة</label>
                      <Textarea placeholder="اذكر نقاط القوة الرئيسية..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">مجالات التحسين</label>
                      <Textarea placeholder="اذكر المجالات التي تحتاج تطوير..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">تعليقات المدير</label>
                      <Textarea placeholder="تعليقات وملاحظات المدير المباشر..." />
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={handleCompleteReview} className="bg-primary hover:bg-primary/90">
                      حفظ التقييم
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقارير
            </Button>
          </div>
        </div>

        {/* Comprehensive Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">متوسط الأداء العام</p>
                  <p className="text-3xl font-bold text-primary">{performanceStats.averageScore}%</p>
                  <div className="flex items-center text-xs text-success mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +3.2% من الربع الماضي
                  </div>
                </div>
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur border-success/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">الموظفون المتميزون</p>
                  <p className="text-3xl font-bold text-success">{performanceStats.highPerformers}</p>
                  <div className="w-full bg-success/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(performanceStats.highPerformers / performanceStats.totalReviews) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-3 bg-success/20 rounded-lg">
                  <Award className="h-8 w-8 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">معدل إنجاز الأهداف</p>
                  <p className="text-3xl font-bold text-blue-600">{performanceStats.goalCompletionRate}%</p>
                  <p className="text-xs text-muted-foreground">من إجمالي الأهداف</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <CheckCircle2 className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-purple-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">رضا الموظفين</p>
                  <p className="text-3xl font-bold text-purple-600">{performanceStats.employeeSatisfaction}%</p>
                  <div className="flex items-center text-xs text-success mt-1">
                    <Star className="h-3 w-3 ml-1" />
                    تقييم ممتاز
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg border border-primary/20">
            <TabsList className="grid w-full grid-cols-5 bg-primary/10">
              <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                التقييمات
              </TabsTrigger>
              <TabsTrigger value="goals" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                الأهداف
              </TabsTrigger>
              <TabsTrigger value="competencies" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                الكفاءات
              </TabsTrigger>
              <TabsTrigger value="development" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                خطط التطوير
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                التحليلات
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="reviews" className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث عن موظف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/90 backdrop-blur border-primary/20"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-white/90 backdrop-blur border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="inReview">قيد المراجعة</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="approved">معتمد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Enhanced Performance Records */}
            <div className="space-y-6">
              {filteredPerformance.map((record) => {
                const statusBadge = getStatusBadge(record.status);
                const scoreBadge = getScoreBadge(record.overallScore);
                
                return (
                  <Card key={record.id} className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                        {/* Employee Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{record.employeeName}</h3>
                              <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                              <p className="text-xs text-primary font-medium">{record.department}</p>
                              <p className="text-xs text-muted-foreground">{record.position}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Badge className={statusBadge.className}>
                              {statusBadge.text}
                            </Badge>
                            <div className="text-xs text-muted-foreground">
                              فترة التقييم: {record.reviewPeriod}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              التقييم التالي: {record.nextReviewDate}
                            </div>
                          </div>
                        </div>

                        {/* Overall Score */}
                        <div className="text-center">
                          <div className="p-4 bg-primary/10 rounded-lg mb-3">
                            <div className="text-3xl font-bold text-primary mb-1">
                              {record.overallScore}%
                            </div>
                            <Badge className={scoreBadge.className}>
                              {scoreBadge.text}
                            </Badge>
                          </div>
                          <div className="relative w-20 h-20 mx-auto">
                            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                fill="none"
                                stroke="#e2e8f0"
                                strokeWidth="2"
                              />
                              <path
                                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2"
                                strokeDasharray={`${record.overallScore}, 100`}
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Competency Scores */}
                        <div className="lg:col-span-2 space-y-3">
                          <h4 className="font-medium text-sm text-muted-foreground mb-3">تقييم الكفاءات</h4>
                          {Object.entries(record.competencyScores).map(([key, score]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm">{
                                key === 'technical' ? 'تقني' :
                                key === 'leadership' ? 'قيادة' :
                                key === 'communication' ? 'تواصل' :
                                key === 'problemSolving' ? 'حل المشاكل' :
                                'فريق العمل'
                              }</span>
                              <div className="flex items-center gap-2 min-w-[80px]">
                                <div className="w-12 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${score}%` }}
                                  ></div>
                                </div>
                                <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                                  {score}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Goals Progress */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-muted-foreground mb-3">تقدم الأهداف</h4>
                          {record.goals.slice(0, 3).map((goal) => (
                            <div key={goal.id} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {getGoalStatusIcon(goal.status)}
                                  <span className="text-xs font-medium truncate max-w-[120px]" title={goal.title}>
                                    {goal.title}
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {goal.progress}%
                                </span>
                              </div>
                              <Progress value={goal.progress} className="h-1.5" />
                            </div>
                          ))}
                          {record.goals.length > 3 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{record.goals.length - 3} أهداف أخرى
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 justify-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => setSelectedEmployee(record)}
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض كامل
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-4 w-4 ml-2" />
                            تعديل
                          </Button>
                          {record.status === 'completed' && (
                            <Button size="sm" className="w-full bg-success hover:bg-success/90">
                              <CheckCircle2 className="h-4 w-4 ml-2" />
                              اعتماد
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-success" />
                    الأهداف المكتملة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success mb-2">156</div>
                    <p className="text-sm text-muted-foreground">هدف مكتمل هذا الربع</p>
                    <Progress value={78} className="mt-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    الأهداف قيد التنفيذ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">89</div>
                    <p className="text-sm text-muted-foreground">هدف في التقدم</p>
                    <Progress value={45} className="mt-4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    الأهداف المتأخرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-warning mb-2">23</div>
                    <p className="text-sm text-muted-foreground">هدف متأخر عن الجدولة</p>
                    <Progress value={12} className="mt-4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competencies">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle>متوسط تقييم الكفاءات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">المهارات التقنية</span>
                        <span className="text-2xl font-bold text-primary">87%</span>
                      </div>
                      <Progress value={87} className="h-3" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">القيادة والإدارة</span>
                        <span className="text-2xl font-bold text-success">82%</span>
                      </div>
                      <Progress value={82} className="h-3" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">التواصل والتفاعل</span>
                        <span className="text-2xl font-bold text-blue-600">91%</span>
                      </div>
                      <Progress value={91} className="h-3" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">حل المشاكل والابتكار</span>
                        <span className="text-2xl font-bold text-purple-600">85%</span>
                      </div>
                      <Progress value={85} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle>توزيع مستويات الأداء</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-success rounded-full"></div>
                        <span className="font-medium">ممتاز (90%+)</span>
                      </div>
                      <span className="text-2xl font-bold text-success">58</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                        <span className="font-medium">جيد جداً (80-89%)</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">98</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-warning rounded-full"></div>
                        <span className="font-medium">جيد (70-79%)</span>
                      </div>
                      <span className="text-2xl font-bold text-warning">67</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-destructive rounded-full"></div>
                        <span className="font-medium">يحتاج تحسين (<70%)</span>
                      </div>
                      <span className="text-2xl font-bold text-destructive">22</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="development">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">خطط التطوير الفردية</h3>
                  <p className="text-sm text-muted-foreground mb-4">189 خطة تطوير نشطة</p>
                  <div className="text-2xl font-bold text-primary">78%</div>
                  <p className="text-xs text-muted-foreground">معدل الإنجاز</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-success/20 rounded-full w-fit mx-auto mb-4">
                    <Brain className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold mb-2">برامج التدريب</h3>
                  <p className="text-sm text-muted-foreground mb-4">45 برنامج تدريبي متاح</p>
                  <div className="text-2xl font-bold text-success">245</div>
                  <p className="text-xs text-muted-foreground">موظف مسجل</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">المهارات المطلوبة</h3>
                  <p className="text-sm text-muted-foreground mb-4">تحليل احتياجات المهارات</p>
                  <div className="text-2xl font-bold text-blue-600">67</div>
                  <p className="text-xs text-muted-foreground">مهارة محددة</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    تحليل الأداء الشامل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 mx-auto text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">تحليلات متقدمة</h3>
                    <p className="text-muted-foreground mb-4">
                      رؤى عميقة حول أداء الفرق والموظفين
                    </p>
                    <Button className="bg-primary hover:bg-primary/90">
                      عرض التحليلات
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-success" />
                    تقارير مخصصة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 mx-auto text-success mb-4" />
                    <h3 className="text-lg font-semibold mb-2">تقارير ذكية</h3>
                    <p className="text-muted-foreground mb-4">
                      تقارير قابلة للتخصيص حسب الاحتياجات
                    </p>
                    <Button className="bg-success hover:bg-success/90">
                      إنشاء تقرير
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Employee Detail Dialog */}
        {selectedEmployee && (
          <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
            <DialogContent className="bg-white/95 backdrop-blur max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  تفاصيل تقييم الأداء - {selectedEmployee.employeeName}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Detailed view content would go here */}
                <div className="text-center py-8">
                  <Target className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">عرض تفصيلي للتقييم</h3>
                  <p className="text-muted-foreground">
                    عرض شامل لجميع تفاصيل تقييم الأداء والأهداف والتطوير
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};