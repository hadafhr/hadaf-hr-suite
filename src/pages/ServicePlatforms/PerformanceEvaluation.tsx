import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { AIAssistant } from '@/components/AIAssistant';
import { SmartEvaluations } from '@/components/evaluation/SmartEvaluations';
import { MBOSystem } from '@/components/evaluation/MBOSystem';
import { KPISystem } from '@/components/evaluation/KPISystem';
import { System360 } from '@/components/evaluation/360System';
import { BSCSystem } from '@/components/evaluation/BSCSystem';
import { ContinuousSystem } from '@/components/evaluation/ContinuousSystem';
import { AssessmentSuite } from '@/components/evaluation/AssessmentSuite';
import { 
  Award, 
  TrendingUp, 
  Target, 
  Calendar,
  Users,
  BarChart3,
  Star,
  CheckCircle,
  Plus,
  Edit,
  Eye,
  Download,
  Brain,
  X,
  ArrowLeft,
  Languages
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const performanceData = [
  { month: 'يناير', performance: 85, goal: 90 },
  { month: 'فبراير', performance: 92, goal: 90 },
  { month: 'مارس', performance: 88, goal: 90 },
  { month: 'أبريل', performance: 95, goal: 90 },
  { month: 'مايو', performance: 89, goal: 90 },
  { month: 'يونيو', performance: 94, goal: 90 }
];

const skillsData = [
  { skill: 'الاتصال', score: 85, fullMark: 100 },
  { skill: 'القيادة', score: 78, fullMark: 100 },
  { skill: 'التقنية', score: 92, fullMark: 100 },
  { skill: 'حل المشاكل', score: 88, fullMark: 100 },
  { skill: 'العمل الجماعي', score: 90, fullMark: 100 },
  { skill: 'إدارة الوقت', score: 82, fullMark: 100 }
];

const employees = [
  {
    id: 1,
    name: "أحمد محمد السعد",
    position: "مطور برمجيات أول",
    department: "تقنية المعلومات",
    overallScore: 92,
    lastEvaluation: "2024-01-15",
    status: "مكتمل",
    goals: [
      { title: "تطوير 3 مشاريع جديدة", progress: 85, status: "جاري" },
      { title: "تدريب فريق المطورين", progress: 100, status: "مكتمل" },
      { title: "تحسين الأداء بنسبة 20%", progress: 60, status: "جاري" }
    ]
  },
  {
    id: 2,
    name: "فاطمة عبدالله النور",
    position: "محاسبة مالية",
    department: "المالية",
    overallScore: 88,
    lastEvaluation: "2024-01-10",
    status: "مكتمل",
    goals: [
      { title: "تطبيق نظام محاسبي جديد", progress: 90, status: "جاري" },
      { title: "تقليل الأخطاء المحاسبية", progress: 100, status: "مكتمل" },
      { title: "إعداد التقارير الشهرية", progress: 95, status: "جاري" }
    ]
  },
  {
    id: 3,
    name: "محمد عبدالرحمن الشمري",
    position: "مسؤول مبيعات",
    department: "المبيعات",
    overallScore: 78,
    lastEvaluation: "2023-12-20",
    status: "مطلوب",
    goals: [
      { title: "زيادة المبيعات بنسبة 15%", progress: 45, status: "جاري" },
      { title: "اكتساب 20 عميل جديد", progress: 70, status: "جاري" },
      { title: "تحسين رضا العملاء", progress: 30, status: "جاري" }
    ]
  },
  {
    id: 4,
    name: "سارة أحمد الغامدي",
    position: "مديرة موارد بشرية",
    department: "الموارد البشرية",
    overallScore: 94,
    lastEvaluation: "2024-01-20",
    status: "مكتمل",
    goals: [
      { title: "تطوير سياسات الموارد البشرية", progress: 95, status: "جاري" },
      { title: "تحسين بيئة العمل", progress: 100, status: "مكتمل" },
      { title: "برامج تدريب الموظفين", progress: 80, status: "جاري" }
    ]
  },
  {
    id: 5,
    name: "خالد عبدالعزيز العتيبي",
    position: "مهندس أنظمة",
    department: "تقنية المعلومات",
    overallScore: 89,
    lastEvaluation: "2024-01-18",
    status: "مكتمل",
    goals: [
      { title: "ترقية البنية التحتية", progress: 75, status: "جاري" },
      { title: "تحسين الأمان السيبراني", progress: 90, status: "جاري" },
      { title: "تطوير النسخ الاحتياطية", progress: 100, status: "مكتمل" }
    ]
  },
  {
    id: 6,
    name: "نورا سلطان المطيري",
    position: "مصممة جرافيك",
    department: "التسويق",
    overallScore: 91,
    lastEvaluation: "2024-01-12",
    status: "مكتمل",
    goals: [
      { title: "تصميم هوية بصرية جديدة", progress: 85, status: "جاري" },
      { title: "إنشاء محتوى إبداعي", progress: 95, status: "جاري" },
      { title: "تطوير قوالب التسويق", progress: 100, status: "مكتمل" }
    ]
  },
  {
    id: 7,
    name: "عبدالرحمن محمد الحربي",
    position: "محلل مالي",
    department: "المالية",
    overallScore: 86,
    lastEvaluation: "2024-01-14",
    status: "مكتمل",
    goals: [
      { title: "تحليل الأداء المالي", progress: 80, status: "جاري" },
      { title: "إعداد الميزانيات", progress: 90, status: "جاري" },
      { title: "تطوير النماذج المالية", progress: 75, status: "جاري" }
    ]
  },
  {
    id: 8,
    name: "ريم عبدالله القحطاني",
    position: "منسقة مشاريع",
    department: "إدارة المشاريع",
    overallScore: 87,
    lastEvaluation: "2024-01-16",
    status: "مكتمل",
    goals: [
      { title: "إدارة 5 مشاريع متزامنة", progress: 85, status: "جاري" },
      { title: "تحسين عمليات التسليم", progress: 90, status: "جاري" },
      { title: "تدريب فرق العمل", progress: 70, status: "جاري" }
    ]
  },
  {
    id: 9,
    name: "فهد سعد الدوسري",
    position: "أخصائي أمن معلومات",
    department: "الأمن السيبراني",
    overallScore: 93,
    lastEvaluation: "2024-01-22",
    status: "مكتمل",
    goals: [
      { title: "تطبيق بروتوكولات أمنية جديدة", progress: 95, status: "جاري" },
      { title: "إجراء اختبارات الاختراق", progress: 100, status: "مكتمل" },
      { title: "تدريب الموظفين على الأمان", progress: 80, status: "جاري" }
    ]
  },
  {
    id: 10,
    name: "هنا أحمد الشهري",
    position: "مطورة تطبيقات",
    department: "تقنية المعلومات",
    overallScore: 90,
    lastEvaluation: "2024-01-25",
    status: "مكتمل",
    goals: [
      { title: "تطوير تطبيق الجوال الجديد", progress: 80, status: "جاري" },
      { title: "تحسين أداء التطبيقات", progress: 95, status: "جاري" },
      { title: "إجراء اختبارات الجودة", progress: 85, status: "جاري" }
    ]
  },
  {
    id: 11,
    name: "طلال عبدالكريم النعيمي",
    position: "مدير خدمة العملاء",
    department: "خدمة العملاء",
    overallScore: 85,
    lastEvaluation: "2024-01-28",
    status: "مكتمل",
    goals: [
      { title: "تحسين رضا العملاء إلى 95%", progress: 70, status: "جاري" },
      { title: "تقليل زمن الاستجابة", progress: 85, status: "جاري" },
      { title: "تدريب فريق الدعم", progress: 100, status: "مكتمل" }
    ]
  },
  {
    id: 12,
    name: "لينا محمد الزهراني",
    position: "محررة محتوى",
    department: "التسويق",
    overallScore: 88,
    lastEvaluation: "2024-01-30",
    status: "مكتمل",
    goals: [
      { title: "إنتاج 50 مقال شهرياً", progress: 90, status: "جاري" },
      { title: "تحسين SEO للمحتوى", progress: 85, status: "جاري" },
      { title: "تطوير استراتيجية المحتوى", progress: 75, status: "جاري" }
    ]
  },
  {
    id: 13,
    name: "بدر علي الشمراني",
    position: "مندوب مبيعات",
    department: "المبيعات",
    overallScore: 82,
    lastEvaluation: "2024-02-01",
    status: "مكتمل",
    goals: [
      { title: "تحقيق مبيعات 500 ألف ريال", progress: 65, status: "جاري" },
      { title: "إضافة 15 عميل جديد", progress: 80, status: "جاري" },
      { title: "تطوير العلاقات التجارية", progress: 70, status: "جاري" }
    ]
  },
  {
    id: 14,
    name: "منى فهد البقمي",
    position: "أخصائية تطوير أعمال",
    department: "التطوير",
    overallScore: 91,
    lastEvaluation: "2024-02-03",
    status: "مكتمل",
    goals: [
      { title: "دراسة 10 فرص استثمارية", progress: 85, status: "جاري" },
      { title: "تطوير شراكات جديدة", progress: 90, status: "جاري" },
      { title: "إعداد خطط النمو", progress: 95, status: "جاري" }
    ]
  },
  {
    id: 15,
    name: "يوسف سالم القرني",
    position: "مهندس شبكات",
    department: "تقنية المعلومات",
    overallScore: 87,
    lastEvaluation: "2024-02-05",
    status: "مكتمل",
    goals: [
      { title: "ترقية شبكة الشركة", progress: 75, status: "جاري" },
      { title: "تحسين سرعة الاتصال", progress: 90, status: "جاري" },
      { title: "صيانة معدات الشبكة", progress: 100, status: "مكتمل" }
    ]
  },
  {
    id: 16,
    name: "جود خالد الخثعمي",
    position: "منسقة فعاليات",
    department: "التسويق",
    overallScore: 89,
    lastEvaluation: "2024-02-07",
    status: "مكتمل",
    goals: [
      { title: "تنظيم 8 فعاليات كبرى", progress: 80, status: "جاري" },
      { title: "زيادة حضور الفعاليات 30%", progress: 85, status: "جاري" },
      { title: "تطوير برامج الفعاليات", progress: 75, status: "جاري" }
    ]
  },
  {
    id: 17,
    name: "سلطان أحمد الرشيد",
    position: "محاسب تكاليف",
    department: "المالية",
    overallScore: 84,
    lastEvaluation: "2024-02-10",
    status: "مكتمل",
    goals: [
      { title: "تطوير نظام حساب التكاليف", progress: 70, status: "جاري" },
      { title: "تقليل المصروفات 15%", progress: 80, status: "جاري" },
      { title: "تحسين دقة التقارير", progress: 90, status: "جاري" }
    ]
  },
  {
    id: 18,
    name: "رهف عبدالله الأحمدي",
    position: "أخصائية تدريب",
    department: "الموارد البشرية",
    overallScore: 92,
    lastEvaluation: "2024-02-12",
    status: "مكتمل",
    goals: [
      { title: "تصميم 15 برنامج تدريبي", progress: 85, status: "جاري" },
      { title: "تدريب 200 موظف", progress: 90, status: "جاري" },
      { title: "قياس فعالية التدريب", progress: 95, status: "جاري" }
    ]
  },
  {
    id: 19,
    name: "عبدالعزيز محمد الباحص",
    position: "مطور ويب",
    department: "تقنية المعلومات",
    overallScore: 88,
    lastEvaluation: "2024-02-14",
    status: "مكتمل",
    goals: [
      { title: "تطوير موقع الشركة الجديد", progress: 80, status: "جاري" },
      { title: "تحسين سرعة التحميل 40%", progress: 85, status: "جاري" },
      { title: "تطبيق معايير الأمان", progress: 90, status: "جاري" }
    ]
  },
  {
    id: 20,
    name: "شهد فيصل العسيري",
    position: "مديرة علاقات عامة",
    department: "التسويق",
    overallScore: 90,
    lastEvaluation: "2024-02-16",
    status: "مكتمل",
    goals: [
      { title: "بناء شراكات إعلامية", progress: 85, status: "جاري" },
      { title: "تحسين صورة الشركة", progress: 95, status: "جاري" },
      { title: "إدارة أزمات التواصل", progress: 80, status: "جاري" }
    ]
  }
];

export const PerformanceEvaluation: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(employees[0]);
  const [showKPIForm, setShowKPIForm] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isArabic, setIsArabic] = useState(true);
  const [kpiFormData, setKpiFormData] = useState({
    employeeName: '',
    evaluationType: '',
    period: '',
    goals: '',
    achievements: '',
    rating: '',
    feedback: ''
  });
  const { toast } = useToast();

  const handleNewEvaluation = () => {
    setShowKPIForm(true);
  };

  const handleSubmitKPI = () => {
    toast({
      title: "تم حفظ التقييم بنجاح",
      description: `تم حفظ تقييم ${kpiFormData.employeeName}`,
    });
    setShowKPIForm(false);
    setKpiFormData({
      employeeName: '',
      evaluationType: '',
      period: '',
      goals: '',
      achievements: '',
      rating: '',
      feedback: ''
    });
  };

  const handleExportReports = () => {
    toast({
      title: "تصدير التقارير",
      description: "جاري تصدير تقارير الأداء...",
    });
  };

  const handleGroupReview = () => {
    toast({
      title: "مراجعة جماعية",
      description: "تم فتح أداة المراجعة الجماعية",
    });
  };

  const handleAIAnalysis = () => {
    toast({
      title: "تحليل ذكي",
      description: "جاري تحليل الأداء باستخدام الذكاء الاصطناعي...",
    });
  };

  const handleBack = () => {
    // Navigate back to previous view
    window.history.back();
  };

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  return (
    <div className="min-h-screen bg-background p-6" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
              {isArabic ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                {isArabic ? 'إدارة الأداء' : 'Performance Management'}
              </h1>
              <p className="text-muted-foreground">
                {isArabic ? 'أنظمة متطورة لقياس وتقييم الأداء باستخدام الذكاء الاصطناعي' : 'Advanced AI-powered performance evaluation systems'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={toggleLanguage}>
              <Languages className="h-4 w-4 mr-2" />
              {isArabic ? 'EN' : 'عربي'}
            </Button>
            <Button variant="outline" onClick={handleAIAnalysis}>
              <Brain className="h-4 w-4 mr-2" />
              {isArabic ? 'تحليل ذكي' : 'AI Analysis'}
            </Button>
          </div>
        </div>

        {/* Performance Management Tabs */}
        <Card className="dashboard-card">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="dashboard">{isArabic ? 'لوحة التحكم' : 'Dashboard'}</TabsTrigger>
              <TabsTrigger value="smart">{isArabic ? 'التقييم الذكي' : 'Smart Evaluations'}</TabsTrigger>
              <TabsTrigger value="mbo">{isArabic ? 'الإدارة بالأهداف' : 'MBO'}</TabsTrigger>
              <TabsTrigger value="kpi">{isArabic ? 'مؤشرات الأداء' : 'KPI'}</TabsTrigger>
              <TabsTrigger value="360">{isArabic ? 'تقييم 360' : '360 Review'}</TabsTrigger>
              <TabsTrigger value="bsc">{isArabic ? 'بطاقة الأداء' : 'BSC'}</TabsTrigger>
              <TabsTrigger value="continuous">{isArabic ? 'التقييم المستمر' : 'Continuous'}</TabsTrigger>
              <TabsTrigger value="assessments">{isArabic ? 'الاختبارات' : 'Assessments'}</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="dashboard-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{isArabic ? 'متوسط الأداء العام' : 'Overall Performance'}</p>
                      <p className="text-2xl font-bold text-primary">86%</p>
                    </div>
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </Card>
                
                <Card className="dashboard-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{isArabic ? 'الأهداف المحققة' : 'Goals Achieved'}</p>
                      <p className="text-2xl font-bold text-success">78%</p>
                    </div>
                    <Target className="h-8 w-8 text-success" />
                  </div>
                </Card>

                <Card className="dashboard-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{isArabic ? 'التقييمات المكتملة' : 'Completed Reviews'}</p>
                      <p className="text-2xl font-bold text-primary">185</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                </Card>

                <Card className="dashboard-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{isArabic ? 'التقييمات المعلقة' : 'Pending Reviews'}</p>
                      <p className="text-2xl font-bold text-warning">12</p>
                    </div>
                    <Calendar className="h-8 w-8 text-warning" />
                  </div>
                </Card>
              </div>

              {/* Main Content */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Employee List */}
                <Card className="dashboard-card">
                  <h3 className="text-lg font-semibold mb-4">{isArabic ? 'الموظفين' : 'Employees'}</h3>
                  <div className="space-y-3">
                    {employees.map((employee) => (
                      <div 
                        key={employee.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedEmployee?.id === employee.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:bg-accent/50'
                        }`}
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-sm">{employee.name}</h4>
                          <Badge variant={
                            employee.status === 'مكتمل' ? 'default' : 
                            employee.status === 'مطلوب' ? 'destructive' : 'secondary'
                          }>
                            {employee.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{employee.position}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{isArabic ? 'الأداء العام' : 'Overall Score'}</span>
                          <span className="text-sm font-medium">{employee.overallScore}%</span>
                        </div>
                        <Progress value={employee.overallScore} className="h-2 mt-1" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Performance Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Employee Overview */}
                  <Card className="dashboard-card">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-lg font-semibold">{selectedEmployee.name}</h3>
                        <p className="text-muted-foreground">{selectedEmployee.position}</p>
                        <p className="text-sm text-muted-foreground">{selectedEmployee.department}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{selectedEmployee.overallScore}%</div>
                        <p className="text-sm text-muted-foreground">{isArabic ? 'الأداء العام' : 'Overall Score'}</p>
                      </div>
                    </div>

                    <Tabs defaultValue="overview" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">{isArabic ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                        <TabsTrigger value="goals">{isArabic ? 'الأهداف' : 'Goals'}</TabsTrigger>
                        <TabsTrigger value="skills">{isArabic ? 'المهارات' : 'Skills'}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="performance" fill="hsl(var(--primary))" name={isArabic ? "الأداء الفعلي" : "Actual Performance"} />
                              <Bar dataKey="goal" fill="hsl(var(--muted))" name={isArabic ? "الهدف" : "Target"} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>

                      <TabsContent value="goals" className="space-y-4">
                        {selectedEmployee.goals.map((goal: any, index: number) => (
                          <div key={index} className="p-4 border border-border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">{goal.title}</h4>
                              <Badge variant={
                                goal.status === 'مكتمل' ? 'default' : 'secondary'
                              }>
                                {goal.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">{isArabic ? 'التقدم' : 'Progress'}</span>
                              <span className="text-sm font-medium">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="skills" className="space-y-4">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={skillsData}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="skill" />
                              <PolarRadiusAxis angle={90} domain={[0, 100]} />
                              <Radar
                                name={isArabic ? "المهارات" : "Skills"}
                                dataKey="score"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.3}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="smart">
              <SmartEvaluations />
            </TabsContent>

            <TabsContent value="mbo">
              <MBOSystem />
            </TabsContent>

            <TabsContent value="kpi">
              <KPISystem />
            </TabsContent>

            <TabsContent value="360">
              <System360 />
            </TabsContent>

            <TabsContent value="bsc">
              <BSCSystem />
            </TabsContent>

            <TabsContent value="continuous">
              <ContinuousSystem />
            </TabsContent>

            <TabsContent value="assessments">
              <AssessmentSuite />
            </TabsContent>
          </Tabs>
        </Card>

        {/* AI Assistant - only show on dashboard */}
        {activeTab === 'dashboard' && (
          <>
            <Card className="dashboard-card">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{isArabic ? 'المساعد الذكي لتقييم الأداء' : 'AI Performance Assistant'}</h3>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{isArabic ? 'نصيحة ذكية للموظف المحدد' : 'Smart Recommendation'}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isArabic 
                    ? `بناءً على تحليل البيانات، يُنصح بالتركيز على تطوير مهارات ${selectedEmployee.name} في مجال القيادة لتحسين الأداء العام بنسبة 15%.`
                    : `Based on data analysis, we recommend focusing on developing ${selectedEmployee.name}'s leadership skills to improve overall performance by 15%.`
                  }
                </p>
              </div>

              <AIAssistant />
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="dashboard-card">
                <h3 className="font-semibold mb-4">{isArabic ? 'إجراءات سريعة' : 'Quick Actions'}</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleNewEvaluation}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    {isArabic ? 'إنشاء تقييم جديد' : 'New Evaluation'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleExportReports}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    {isArabic ? 'تصدير التقارير' : 'Export Reports'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleGroupReview}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {isArabic ? 'مراجعة جماعية' : 'Group Review'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleAIAnalysis}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    {isArabic ? 'تحليل ذكي بالـ AI' : 'AI Analysis'}
                  </Button>
                </div>
              </Card>

              <Card className="dashboard-card">
                <h3 className="font-semibold mb-4">{isArabic ? 'التقييمات القادمة' : 'Upcoming Reviews'}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">أحمد السعد</span>
                    <span className="text-xs text-muted-foreground">15 فبراير</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">سارة المطيري</span>
                    <span className="text-xs text-muted-foreground">20 فبراير</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">خالد العتيبي</span>
                    <span className="text-xs text-muted-foreground">25 فبراير</span>
                  </div>
                </div>
              </Card>

              <Card className="dashboard-card">
                <h3 className="font-semibold mb-4">{isArabic ? 'الإحصائيات' : 'Statistics'}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{isArabic ? 'أعلى أداء' : 'Highest Score'}</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{isArabic ? 'أقل أداء' : 'Lowest Score'}</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{isArabic ? 'معدل تحقيق الأهداف' : 'Goal Achievement Rate'}</span>
                    <span className="font-medium">78%</span>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* KPI Evaluation Form Dialog */}
        <Dialog open={showKPIForm} onOpenChange={setShowKPIForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">تقييم أداء جديد - KPIs</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-name">اسم الموظف</Label>
                  <Select value={kpiFormData.employeeName} onValueChange={(value) => setKpiFormData({...kpiFormData, employeeName: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الموظف" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(emp => (
                        <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="evaluation-type">نوع التقييم</Label>
                  <Select value={kpiFormData.evaluationType} onValueChange={(value) => setKpiFormData({...kpiFormData, evaluationType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع التقييم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarterly">تقييم ربع سنوي</SelectItem>
                      <SelectItem value="annual">تقييم سنوي</SelectItem>
                      <SelectItem value="probation">تقييم فترة التجربة</SelectItem>
                      <SelectItem value="promotion">تقييم للترقية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="evaluation-period">فترة التقييم</Label>
                  <Input
                    id="evaluation-period"
                    value={kpiFormData.period}
                    onChange={(e) => setKpiFormData({...kpiFormData, period: e.target.value})}
                    placeholder="يناير - مارس 2024"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="performance-rating">التقييم العام</Label>
                  <Select value={kpiFormData.rating} onValueChange={(value) => setKpiFormData({...kpiFormData, rating: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التقييم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">ممتاز (90-100%)</SelectItem>
                      <SelectItem value="very_good">جيد جداً (80-89%)</SelectItem>
                      <SelectItem value="good">جيد (70-79%)</SelectItem>
                      <SelectItem value="satisfactory">مرضي (60-69%)</SelectItem>
                      <SelectItem value="needs_improvement">يحتاج تطوير (أقل من 60%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">الأهداف والمؤشرات (KPIs)</Label>
                <Textarea
                  id="goals"
                  value={kpiFormData.goals}
                  onChange={(e) => setKpiFormData({...kpiFormData, goals: e.target.value})}
                  placeholder="اذكر الأهداف المحددة ومؤشرات الأداء الرئيسية..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">الإنجازات المحققة</Label>
                <Textarea
                  id="achievements"
                  value={kpiFormData.achievements}
                  onChange={(e) => setKpiFormData({...kpiFormData, achievements: e.target.value})}
                  placeholder="اذكر الإنجازات والنتائج المحققة خلال فترة التقييم..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">التوصيات والتطوير</Label>
                <Textarea
                  id="feedback"
                  value={kpiFormData.feedback}
                  onChange={(e) => setKpiFormData({...kpiFormData, feedback: e.target.value})}
                  placeholder="اكتب توصيات للتطوير والتحسين..."
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="btn-primary flex-1" onClick={handleSubmitKPI}>
                  <Target className="h-4 w-4 mr-2" />
                  حفظ التقييم
                </Button>
                <Button variant="outline" onClick={() => setShowKPIForm(false)}>
                  <X className="h-4 w-4 mr-2" />
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};