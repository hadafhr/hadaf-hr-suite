import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssessmentCreator as AssessmentCreatorComponent } from './AssessmentCreator';
import { 
  FileText, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  BarChart3,
  Brain,
  Target,
  Award,
  Timer,
  Zap,
  MessageSquare,
  PieChart,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'assignment' | 'practical' | 'discussion';
  courseId: string;
  courseName: string;
  duration: number; // in minutes
  totalQuestions: number;
  passingScore: number;
  attempts: number;
  status: 'draft' | 'active' | 'completed' | 'archived';
  createdAt: Date;
  dueDate?: Date;
  participants: number;
  completions: number;
  averageScore: number;
  aiEnabled: boolean;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'essay' | 'practical';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  aiGenerated: boolean;
}

export const AssessmentManager: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('list');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Sample assessments data
  const assessments: Assessment[] = [
    {
      id: '1',
      title: 'اختبار أساسيات إدارة المشاريع',
      description: 'اختبار شامل يغطي المفاهيم الأساسية في إدارة المشاريع',
      type: 'quiz',
      courseId: '1',
      courseName: 'أساسيات إدارة المشاريع',
      duration: 60,
      totalQuestions: 20,
      passingScore: 70,
      attempts: 3,
      status: 'active',
      createdAt: new Date('2024-02-01'),
      dueDate: new Date('2024-02-28'),
      participants: 145,
      completions: 120,
      averageScore: 78.5,
      aiEnabled: true
    },
    {
      id: '2',
      title: 'مشروع تطبيقي: حملة تسويق رقمي',
      description: 'إنشاء حملة تسويق رقمي متكاملة مع عرض تقديمي',
      type: 'assignment',
      courseId: '2',
      courseName: 'التسويق الرقمي المتقدم',
      duration: 240,
      totalQuestions: 1,
      passingScore: 80,
      attempts: 2,
      status: 'active',
      createdAt: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
      participants: 89,
      completions: 67,
      averageScore: 85.2,
      aiEnabled: true
    },
    {
      id: '3',
      title: 'تطبيق React تفاعلي',
      description: 'بناء تطبيق React كامل مع إدارة الحالة والتوجيه',
      type: 'practical',
      courseId: '3',
      courseName: 'البرمجة بـ React',
      duration: 180,
      totalQuestions: 5,
      passingScore: 75,
      attempts: 2,
      status: 'active',
      createdAt: new Date('2024-02-10'),
      participants: 67,
      completions: 23,
      averageScore: 72.8,
      aiEnabled: false
    }
  ];

  // Sample questions for creating assessments
  const [questions, setQuestions] = useState<Question[]>([]);

  // Filter assessments based on search and filters
  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || assessment.type === filterType;
    const matchesStatus = filterStatus === 'all' || assessment.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <FileText className="h-4 w-4" />;
      case 'assignment': return <Target className="h-4 w-4" />;
      case 'practical': return <Zap className="h-4 w-4" />;
      case 'discussion': return <MessageSquare className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      quiz: { text: isRTL ? 'اختبار' : 'Quiz', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
      assignment: { text: isRTL ? 'مهمة' : 'Assignment', className: 'bg-green-500/10 text-green-500 border-green-500/20' },
      practical: { text: isRTL ? 'عملي' : 'Practical', className: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
      discussion: { text: isRTL ? 'نقاش' : 'Discussion', className: 'bg-orange-500/10 text-orange-500 border-orange-500/20' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { text: isRTL ? 'مسودة' : 'Draft', className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
      active: { text: isRTL ? 'نشط' : 'Active', className: 'bg-green-500/10 text-green-500 border-green-500/20' },
      completed: { text: isRTL ? 'مكتمل' : 'Completed', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
      archived: { text: isRTL ? 'مؤرشف' : 'Archived', className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const calculateCompletionRate = (assessment: Assessment) => {
    return assessment.participants > 0 ? (assessment.completions / assessment.participants) * 100 : 0;
  };

  const generateAIQuestions = () => {
    // Simulate AI question generation
    const sampleQuestions: Question[] = [
      {
        id: '1',
        type: 'multiple-choice',
        question: isRTL ? 'ما هو الهدف الرئيسي من إدارة المشاريع؟' : 'What is the main objective of project management?',
        options: isRTL 
          ? ['تحقيق أهداف المشروع في الوقت المحدد', 'زيادة الأرباح', 'توظيف المزيد من الأشخاص', 'شراء أدوات جديدة']
          : ['Achieve project goals on time', 'Increase profits', 'Hire more people', 'Buy new tools'],
        correctAnswer: 0,
        explanation: isRTL 
          ? 'إدارة المشاريع تهدف إلى تحقيق أهداف المشروع ضمن القيود المحددة مثل الوقت والميزانية والجودة.'
          : 'Project management aims to achieve project objectives within defined constraints such as time, budget, and quality.',
        points: 5,
        difficulty: 'easy',
        aiGenerated: true
      },
      {
        id: '2',
        type: 'true-false',
        question: isRTL ? 'يمكن أن يكون للمشروع أكثر من مدير مشروع واحد' : 'A project can have more than one project manager',
        correctAnswer: 0, // false
        explanation: isRTL 
          ? 'عادة ما يكون للمشروع مدير مشروع واحد مسؤول عن النتائج النهائية.'
          : 'Typically, a project should have one project manager responsible for the final outcomes.',
        points: 3,
        difficulty: 'medium',
        aiGenerated: true
      }
    ];

    setQuestions(sampleQuestions);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            {isRTL ? 'إدارة التقييمات والاختبارات' : 'Assessment & Quiz Management'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إنشاء وإدارة الاختبارات والمهام التفاعلية بالذكاء الاصطناعي' : 'Create and manage interactive assessments and quizzes with AI'}
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'إنشاء تقييم جديد' : 'Create New Assessment'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إنشاء تقييم جديد' : 'Create New Assessment'}</DialogTitle>
            </DialogHeader>
            <AssessmentCreatorComponent onClose={() => setShowCreateDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'إجمالي التقييمات' : 'Total Assessments'}
                </p>
                <p className="text-2xl font-bold text-foreground">47</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {isRTL ? '+8 هذا الشهر' : '+8 this month'}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'المشاركات النشطة' : 'Active Participants'}
                </p>
                <p className="text-2xl font-bold text-foreground">301</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRTL ? 'في 12 تقييم نشط' : 'In 12 active assessments'}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'معدل الإكمال' : 'Completion Rate'}
                </p>
                <p className="text-2xl font-bold text-green-500">87%</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {isRTL ? '+5% تحسن' : '+5% improvement'}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'المعدل العام' : 'Average Score'}
                </p>
                <p className="text-2xl font-bold text-foreground">78.8</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRTL ? 'من 100 درجة' : 'Out of 100'}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
          <TabsTrigger value="list">{isRTL ? 'قائمة التقييمات' : 'Assessment List'}</TabsTrigger>
          <TabsTrigger value="analytics">{isRTL ? 'التحليلات' : 'Analytics'}</TabsTrigger>
          <TabsTrigger value="ai-tools">{isRTL ? 'أدوات الذكاء الاصطناعي' : 'AI Tools'}</TabsTrigger>
          <TabsTrigger value="templates">{isRTL ? 'القوالب' : 'Templates'}</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={isRTL ? 'البحث في التقييمات...' : 'Search assessments...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-border bg-card"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32 border-border bg-card">
                  <SelectValue placeholder={isRTL ? 'النوع' : 'Type'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? 'جميع الأنواع' : 'All Types'}</SelectItem>
                  <SelectItem value="quiz">{isRTL ? 'اختبار' : 'Quiz'}</SelectItem>
                  <SelectItem value="assignment">{isRTL ? 'مهمة' : 'Assignment'}</SelectItem>
                  <SelectItem value="practical">{isRTL ? 'عملي' : 'Practical'}</SelectItem>
                  <SelectItem value="discussion">{isRTL ? 'نقاش' : 'Discussion'}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 border-border bg-card">
                  <SelectValue placeholder={isRTL ? 'الحالة' : 'Status'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? 'جميع الحالات' : 'All Status'}</SelectItem>
                  <SelectItem value="draft">{isRTL ? 'مسودة' : 'Draft'}</SelectItem>
                  <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                  <SelectItem value="completed">{isRTL ? 'مكتمل' : 'Completed'}</SelectItem>
                  <SelectItem value="archived">{isRTL ? 'مؤرشف' : 'Archived'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assessments Grid */}
          <div className="grid gap-6">
            {filteredAssessments.map((assessment) => {
              const typeBadge = getTypeBadge(assessment.type);
              const statusBadge = getStatusBadge(assessment.status);
              const completionRate = calculateCompletionRate(assessment);
              
              return (
                <Card key={assessment.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(assessment.type)}
                          <CardTitle className="text-lg">{assessment.title}</CardTitle>
                          {assessment.aiEnabled && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                              <Brain className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{assessment.description}</p>
                        <div className="flex gap-2">
                          <Badge className={`${typeBadge.className} text-xs`}>
                            {typeBadge.text}
                          </Badge>
                          <Badge className={`${statusBadge.className} text-xs`}>
                            {statusBadge.text}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Course and Basic Info */}
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'الدورة:' : 'Course:'}</span>
                          <span className="font-medium">{assessment.courseName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'المدة:' : 'Duration:'}</span>
                          <span>{assessment.duration} {isRTL ? 'دقيقة' : 'minutes'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'الأسئلة:' : 'Questions:'}</span>
                          <span>{assessment.totalQuestions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'درجة النجاح:' : 'Passing Score:'}</span>
                          <span>{assessment.passingScore}%</span>
                        </div>
                      </div>

                      {/* Statistics */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-500">{assessment.participants}</p>
                          <p className="text-xs text-muted-foreground">{isRTL ? 'مشارك' : 'Participants'}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-500">{assessment.completions}</p>
                          <p className="text-xs text-muted-foreground">{isRTL ? 'مكتمل' : 'Completed'}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-500">{assessment.averageScore}</p>
                          <p className="text-xs text-muted-foreground">{isRTL ? 'المعدل' : 'Avg Score'}</p>
                        </div>
                      </div>

                      {/* Completion Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'معدل الإكمال' : 'Completion Rate'}</span>
                          <span>{completionRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>

                      {/* Due Date */}
                      {assessment.dueDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {isRTL ? 'تاريخ الاستحقاق:' : 'Due Date:'} {assessment.dueDate.toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-accent">
                          <Eye className="h-3 w-3 mr-1" />
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-accent">
                          <Edit className="h-3 w-3 mr-1" />
                          {isRTL ? 'تحرير' : 'Edit'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-accent">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          {isRTL ? 'تقرير' : 'Report'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-6 border-border bg-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {isRTL ? 'تحليلات التقييمات المتقدمة' : 'Advanced Assessment Analytics'}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    {isRTL ? 'توزيع الدرجات' : 'Score Distribution'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{isRTL ? 'ممتاز (90-100)' : 'Excellent (90-100)'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-green-200 rounded-full">
                          <div className="w-3/5 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">23%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{isRTL ? 'جيد جداً (80-89)' : 'Very Good (80-89)'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-blue-200 rounded-full">
                          <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">34%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{isRTL ? 'جيد (70-79)' : 'Good (70-79)'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-yellow-200 rounded-full">
                          <div className="w-1/2 h-full bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{isRTL ? 'مقبول (60-69)' : 'Fair (60-69)'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-orange-200 rounded-full">
                          <div className="w-1/4 h-full bg-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">12%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{isRTL ? 'ضعيف (أقل من 60)' : 'Poor (Below 60)'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-red-200 rounded-full">
                          <div className="w-1/12 h-full bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">3%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    {isRTL ? 'الاتجاهات الشهرية' : 'Monthly Trends'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{isRTL ? 'معدل الإكمال' : 'Completion Rate'}</p>
                        <p className="text-sm text-muted-foreground">{isRTL ? 'هذا الشهر' : 'This month'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-500">87%</p>
                        <p className="text-sm text-green-500">+5% ↗</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{isRTL ? 'المعدل العام' : 'Average Score'}</p>
                        <p className="text-sm text-muted-foreground">{isRTL ? 'هذا الشهر' : 'This month'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-500">78.8</p>
                        <p className="text-sm text-blue-500">+2.3 ↗</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{isRTL ? 'وقت الإكمال' : 'Completion Time'}</p>
                        <p className="text-sm text-muted-foreground">{isRTL ? 'المتوسط' : 'Average'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-500">42{isRTL ? 'د' : 'm'}</p>
                        <p className="text-sm text-red-500">-3{isRTL ? 'د' : 'm'} ↘</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ai-tools">
          <Card className="p-6 border-border bg-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              {isRTL ? 'أدوات الذكاء الاصطناعي للتقييم' : 'AI-Powered Assessment Tools'}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Brain className="h-6 w-6 text-purple-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-purple-900 mb-2">
                        {isRTL ? 'توليد الأسئلة تلقائياً' : 'Auto-Generate Questions'}
                      </h4>
                      <p className="text-sm text-purple-800 mb-3">
                        {isRTL 
                          ? 'استخدم الذكاء الاصطناعي لإنشاء أسئلة متنوعة وذكية بناءً على محتوى الدورة.'
                          : 'Use AI to create diverse and intelligent questions based on course content.'
                        }
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={generateAIQuestions}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        {isRTL ? 'توليد أسئلة' : 'Generate Questions'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2">
                        {isRTL ? 'تحليل الصعوبة التكيفي' : 'Adaptive Difficulty Analysis'}
                      </h4>
                      <p className="text-sm text-blue-800 mb-3">
                        {isRTL 
                          ? 'تحليل ذكي لمستوى صعوبة الأسئلة وتكييفها حسب أداء المتدربين.'
                          : 'Intelligent analysis of question difficulty and adaptation based on learner performance.'
                        }
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Brain className="h-3 w-3 mr-1" />
                        {isRTL ? 'تفعيل التحليل' : 'Enable Analysis'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900 mb-2">
                        {isRTL ? 'التصحيح الآلي الذكي' : 'Smart Auto-Grading'}
                      </h4>
                      <p className="text-sm text-green-800 mb-3">
                        {isRTL 
                          ? 'تصحيح تلقائي للإجابات النصية والمقالية باستخدام معالجة اللغة الطبيعية.'
                          : 'Automatic grading of text and essay answers using natural language processing.'
                        }
                      </p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Zap className="h-3 w-3 mr-1" />
                        {isRTL ? 'تفعيل التصحيح' : 'Enable Grading'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-orange-900 mb-2">
                        {isRTL ? 'كشف الغش الذكي' : 'Smart Cheating Detection'}
                      </h4>
                      <p className="text-sm text-orange-800 mb-3">
                        {isRTL 
                          ? 'نظام ذكي لكشف محاولات الغش وضمان نزاهة التقييمات.'
                          : 'Intelligent system to detect cheating attempts and ensure assessment integrity.'
                        }
                      </p>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {isRTL ? 'تفعيل الحماية' : 'Enable Protection'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Generated Questions Preview */}
            {questions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  {isRTL ? 'الأسئلة المولدة بالذكاء الاصطناعي' : 'AI-Generated Questions'}
                </h4>
                <div className="space-y-3">
                  {questions.map((question, index) => (
                    <Card key={question.id} className="border-border bg-card/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-sm">
                            {isRTL ? `السؤال ${index + 1}:` : `Question ${index + 1}:`} {question.question}
                          </h5>
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                            AI Generated
                          </Badge>
                        </div>
                        {question.options && (
                          <div className="space-y-1 text-sm">
                            {question.options.map((option, optionIndex) => (
                              <div 
                                key={optionIndex} 
                                className={`p-2 rounded ${
                                  optionIndex === question.correctAnswer 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-gray-50 text-gray-700'
                                }`}
                              >
                                {optionIndex === question.correctAnswer && <CheckCircle className="h-3 w-3 inline mr-1" />}
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                        {question.explanation && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            {isRTL ? 'التفسير:' : 'Explanation:'} {question.explanation}
                          </p>
                        )}
                        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                          <span>{isRTL ? `النقاط: ${question.points}` : `Points: ${question.points}`}</span>
                          <span>{isRTL ? `الصعوبة: ${question.difficulty}` : `Difficulty: ${question.difficulty}`}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="p-6 border-border bg-card">
            <h3 className="text-lg font-semibold mb-4">
              {isRTL ? 'قوالب التقييمات الجاهزة' : 'Ready Assessment Templates'}
            </h3>
            <p className="text-muted-foreground">
              {isRTL ? 'قريباً - مجموعة من القوالب الجاهزة للتقييمات المختلفة' : 'Coming soon - Collection of ready-made templates for different types of assessments'}
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Assessment Creator Component (simplified version)
const AssessmentCreator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            {isRTL ? 'عنوان التقييم' : 'Assessment Title'}
          </label>
          <Input placeholder={isRTL ? 'أدخل عنوان التقييم' : 'Enter assessment title'} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            {isRTL ? 'نوع التقييم' : 'Assessment Type'}
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={isRTL ? 'اختر النوع' : 'Select type'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quiz">{isRTL ? 'اختبار' : 'Quiz'}</SelectItem>
              <SelectItem value="assignment">{isRTL ? 'مهمة' : 'Assignment'}</SelectItem>
              <SelectItem value="practical">{isRTL ? 'عملي' : 'Practical'}</SelectItem>
              <SelectItem value="discussion">{isRTL ? 'نقاش' : 'Discussion'}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          {isRTL ? 'وصف التقييم' : 'Assessment Description'}
        </label>
        <Textarea 
          placeholder={isRTL ? 'أدخل وصف التقييم' : 'Enter assessment description'} 
          rows={3}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            {isRTL ? 'المدة (بالدقائق)' : 'Duration (minutes)'}
          </label>
          <Input type="number" placeholder="60" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            {isRTL ? 'درجة النجاح (%)' : 'Passing Score (%)'}
          </label>
          <Input type="number" placeholder="70" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            {isRTL ? 'عدد المحاولات' : 'Number of Attempts'}
          </label>
          <Input type="number" placeholder="3" />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          {isRTL ? 'إلغاء' : 'Cancel'}
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          {isRTL ? 'إنشاء التقييم' : 'Create Assessment'}
        </Button>
      </div>
    </div>
  );
};