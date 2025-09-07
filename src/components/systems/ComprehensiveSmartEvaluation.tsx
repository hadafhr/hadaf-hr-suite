import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowLeft, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Target, 
  Award,
  BarChart3,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Settings,
  Eye,
  Edit,
  Share,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Star,
  Zap,
  BookOpen,
  PieChart,
  Activity,
  TrendingDown,
  UserCheck,
  Shield,
  Lightbulb,
  ChartLine,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ComprehensiveSmartEvaluationProps {
  onBack: () => void;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar: string;
  performanceScore: number;
  lastEvaluation: string;
  nextEvaluation: string;
  manager: string;
  joinDate: string;
  skills: string[];
  goals: Goal[];
  competencies: Competency[];
}

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: 'On Track' | 'At Risk' | 'Behind' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
}

interface Competency {
  id: string;
  name: string;
  category: 'Technical' | 'Behavioral' | 'Leadership' | 'Communication';
  currentLevel: number;
  targetLevel: number;
  importance: 'Critical' | 'Important' | 'Moderate';
}

interface AIAnalysis {
  summary: string;
  fullAnalysis: string;
  recommendations: string[];
  rating: number | null;
  keyPoints: string[];
  timestamp: string;
}

export const ComprehensiveSmartEvaluation: React.FC<ComprehensiveSmartEvaluationProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Mock data for demonstration
  const employees: Employee[] = [
    {
      id: '1',
      name: 'أحمد محمد علي',
      position: 'مطور أول',
      department: 'تقنية المعلومات',
      avatar: '/lovable-uploads/employee-1.jpg',
      performanceScore: 92,
      lastEvaluation: '2024-01-15',
      nextEvaluation: '2024-04-15',
      manager: 'سعد الأحمد',
      joinDate: '2021-03-10',
      skills: ['React', 'Node.js', 'TypeScript', 'Leadership'],
      goals: [
        {
          id: 'g1',
          title: 'تطوير نظام إدارة المشاريع',
          description: 'بناء نظام شامل لإدارة المشاريع',
          progress: 75,
          dueDate: '2024-03-30',
          status: 'On Track',
          priority: 'High'
        }
      ],
      competencies: [
        {
          id: 'c1',
          name: 'البرمجة',
          category: 'Technical',
          currentLevel: 4,
          targetLevel: 5,
          importance: 'Critical'
        },
        {
          id: 'c2',
          name: 'القيادة',
          category: 'Leadership',
          currentLevel: 3,
          targetLevel: 4,
          importance: 'Important'
        }
      ]
    },
    {
      id: '2',
      name: 'فاطمة السالم',
      position: 'محلل أعمال',
      department: 'العمليات',
      avatar: '/lovable-uploads/employee-2.jpg',
      performanceScore: 88,
      lastEvaluation: '2024-01-20',
      nextEvaluation: '2024-04-20',
      manager: 'نورا الكندري',
      joinDate: '2021-06-15',
      skills: ['Analysis', 'Project Management', 'Communication'],
      goals: [
        {
          id: 'g2',
          title: 'تحسين عمليات الشركة',
          description: 'تحليل وتحسين العمليات الحالية',
          progress: 60,
          dueDate: '2024-04-15',
          status: 'On Track',
          priority: 'Medium'
        }
      ],
      competencies: [
        {
          id: 'c3',
          name: 'التحليل',
          category: 'Technical',
          currentLevel: 5,
          targetLevel: 5,
          importance: 'Critical'
        }
      ]
    }
  ];

  const performanceData = [
    { month: 'يناير', individual: 88, team: 85, department: 82 },
    { month: 'فبراير', individual: 90, team: 87, department: 84 },
    { month: 'مارس', individual: 92, team: 89, department: 86 },
    { month: 'أبريل', individual: 89, team: 88, department: 85 },
    { month: 'مايو', individual: 94, team: 91, department: 88 },
    { month: 'يونيو', individual: 96, team: 93, department: 90 }
  ];

  const competencyRadarData = [
    { competency: 'التقنية', current: 85, target: 90 },
    { competency: 'القيادة', current: 70, target: 85 },
    { competency: 'التواصل', current: 80, target: 85 },
    { competency: 'الابتكار', current: 75, target: 80 },
    { competency: 'العمل الجماعي', current: 90, target: 95 },
    { competency: 'حل المشاكل', current: 88, target: 90 }
  ];

  const performanceDistribution = [
    { range: 'ممتاز (90-100)', count: 15, color: '#10b981' },
    { range: 'جيد جداً (80-89)', count: 25, color: '#3b82f6' },
    { range: 'جيد (70-79)', count: 18, color: '#f59e0b' },
    { range: 'مقبول (60-69)', count: 8, color: '#ef4444' },
    { range: 'ضعيف (أقل من 60)', count: 2, color: '#6b7280' }
  ];

  const getDashboardStats = () => {
    return {
      totalEmployees: employees.length,
      avgPerformance: employees.reduce((acc, emp) => acc + emp.performanceScore, 0) / employees.length,
      completedEvaluations: employees.filter(emp => new Date(emp.lastEvaluation) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)).length,
      upcomingEvaluations: employees.filter(emp => new Date(emp.nextEvaluation) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length,
      highPerformers: employees.filter(emp => emp.performanceScore >= 90).length,
      improvementNeeded: employees.filter(emp => emp.performanceScore < 70).length
    };
  };

  const stats = getDashboardStats();

  const generateAIAnalysis = async (employee: Employee, analysisType: string) => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-performance-analysis', {
        body: {
          employeeData: {
            name: employee.name,
            position: employee.position,
            department: employee.department,
            performanceScore: employee.performanceScore,
            skills: employee.skills,
            goals: employee.goals,
            competencies: employee.competencies,
            joinDate: employee.joinDate,
            lastEvaluation: employee.lastEvaluation
          },
          analysisType,
          context: `تقييم للموظف ${employee.name} في منصب ${employee.position}`
        }
      });

      if (error) throw error;

      setAiAnalysis(data);
      toast({
        title: "تم إنتاج التحليل بنجاح",
        description: "تم تحليل بيانات الموظف باستخدام الذكاء الاصطناعي",
      });
    } catch (error) {
      console.error('Error generating AI analysis:', error);
      toast({
        title: "خطأ في التحليل",
        description: "حدث خطأ أثناء تحليل البيانات",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'On Track': 'default',
      'At Risk': 'secondary',
      'Behind': 'destructive',
      'Completed': 'outline'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'High': 'destructive',
      'Medium': 'secondary',
      'Low': 'outline'
    };
    return <Badge variant={variants[priority] || 'default'}>{priority}</Badge>;
  };

  const renderProfessionalHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <div className="relative z-10 group-hover:scale-110 transition-transform text-white">
              <Brain className="h-12 w-12" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              التقييم الذكي بالذكاء الاصطناعي
            </h1>
            <p className="text-gray-600 text-lg">
              منظومة تقييم متطورة تستخدم الذكاء الاصطناعي لتحليل الأداء وتقديم توصيات ذكية
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <Brain className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button 
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download className="h-4 w-4 ml-2" />
          تصدير التقرير
        </Button>
        <Button 
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FileText className="h-4 w-4 ml-2" />
          طباعة
        </Button>
        <Button 
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 ml-2" />
          تقييم جديد
        </Button>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الأداء</p>
                <p className="text-2xl font-bold text-emerald-600">{Math.round(stats.avgPerformance)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تقييمات مكتملة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completedEvaluations}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تقييمات قادمة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.upcomingEvaluations}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">أداء عالي</p>
                <p className="text-2xl font-bold text-green-600">{stats.highPerformers}</p>
              </div>
              <Star className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">يحتاج تحسين</p>
                <p className="text-2xl font-bold text-red-600">{stats.improvementNeeded}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              تطور الأداء الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="individual" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="team" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="department" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع مستويات الأداء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">تحسن ملحوظ</span>
              </div>
              <p className="text-sm text-emerald-700">
                ارتفاع متوسط الأداء بنسبة 12% مقارنة بالربع الماضي
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تنبيه</span>
              </div>
              <p className="text-sm text-orange-700">
                3 موظفين يحتاجون لخطط تطوير عاجلة لتحسين الأداء
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية</span>
              </div>
              <p className="text-sm text-blue-700">
                تطبيق برامج تدريب متخصصة لرفع مستوى 5 مهارات أساسية
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSmartAnalysis = () => (
    <div className="space-y-6">
      {/* Employee Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            التحليل الذكي للموظفين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Select onValueChange={(value) => setSelectedEmployee(employees.find(emp => emp.id === value) || null)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر موظف للتحليل" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name} - {employee.position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button 
                onClick={() => selectedEmployee && generateAIAnalysis(selectedEmployee, 'performance_analysis')}
                disabled={!selectedEmployee || isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? <RefreshCw className="h-4 w-4 animate-spin ml-2" /> : <Brain className="h-4 w-4 ml-2" />}
                تحليل الأداء
              </Button>
              <Button 
                variant="outline"
                onClick={() => selectedEmployee && generateAIAnalysis(selectedEmployee, 'competency_assessment')}
                disabled={!selectedEmployee || isAnalyzing}
              >
                تقييم الكفاءات
              </Button>
            </div>
          </div>

          {/* AI Analysis Results */}
          {aiAnalysis && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">تحليل الذكاء الاصطناعي</h3>
                  {aiAnalysis.rating && (
                    <Badge variant="outline" className="ml-auto">
                      التقييم: {aiAnalysis.rating}/100
                    </Badge>
                  )}
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">الملخص:</h4>
                  <p className="text-sm text-muted-foreground">{aiAnalysis.summary}</p>
                </div>

                {aiAnalysis.keyPoints.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">النقاط الرئيسية:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {aiAnalysis.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiAnalysis.recommendations.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">التوصيات:</h4>
                    <div className="grid gap-2">
                      {aiAnalysis.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded bg-emerald-50 border border-emerald-200">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>تم إنتاج التحليل في: {new Date(aiAnalysis.timestamp).toLocaleString('ar-SA')}</span>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 ml-2" />
                    مشاركة
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Competency Radar Chart */}
      {selectedEmployee && (
        <Card>
          <CardHeader>
            <CardTitle>خريطة الكفاءات الذكية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={competencyRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="competency" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="المستوى الحالي" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                <Radar name="المستوى المستهدف" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderEmployeeEvaluations = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في الموظفين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="تصفية حسب..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الموظفين</SelectItem>
            <SelectItem value="high-performers">أداء عالي</SelectItem>
            <SelectItem value="needs-improvement">يحتاج تحسين</SelectItem>
            <SelectItem value="due-evaluation">تقييم مستحق</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          تقييم جديد
        </Button>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">{employee.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                    <p className="text-xs text-muted-foreground">{employee.department}</p>
                  </div>
                </div>
                <Badge variant={employee.performanceScore >= 90 ? 'default' : employee.performanceScore >= 80 ? 'secondary' : 'destructive'}>
                  {employee.performanceScore}%
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>الأداء العام</span>
                    <span>{employee.performanceScore}%</span>
                  </div>
                  <Progress value={employee.performanceScore} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-xs text-muted-foreground">آخر تقييم</Label>
                    <p className="font-medium">{employee.lastEvaluation}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">التقييم القادم</Label>
                    <p className="font-medium">{employee.nextEvaluation}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">المهارات الرئيسية</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {employee.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {employee.skills.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{employee.skills.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedEmployee(employee);
                    generateAIAnalysis(employee, 'performance_analysis');
                  }}
                >
                  <Brain className="h-4 w-4 ml-2" />
                  تحليل ذكي
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  عرض
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 ml-2" />
                  تحرير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {renderProfessionalHeader()}
      
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة المعلومات
            </TabsTrigger>
            <TabsTrigger value="smart-analysis" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              التحليل الذكي
            </TabsTrigger>
            <TabsTrigger value="evaluations" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              تقييمات الموظفين
            </TabsTrigger>
            <TabsTrigger value="competencies" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              إدارة الكفاءات
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="smart-analysis" className="space-y-6">
            {renderSmartAnalysis()}
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-6">
            {renderEmployeeEvaluations()}
          </TabsContent>

          <TabsContent value="competencies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الكفاءات والمهارات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">قريباً: نظام شامل لإدارة وتقييم الكفاءات والمهارات</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير والتحليلات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Brain className="h-6 w-6 mb-2" />
                    تقرير التحليل الذكي
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    تقرير الأداء الشامل
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Target className="h-6 w-6 mb-2" />
                    تقرير الكفاءات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};