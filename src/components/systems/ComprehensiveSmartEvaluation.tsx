import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { NewEvaluationProgramForm } from './NewEvaluationProgramForm';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { BoudLogo } from '@/components/BoudLogo';
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
  Lightbulb,
  ChartLine,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Calculator,
  Database,
  PenTool,
  Shield,
  TrendingDown,
  RotateCcw,
  Save,
  Send,
  Signature,
  UserCheck,
  Activity,
  PieChart,
  Layers,
  Gauge
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ComprehensiveSmartEvaluationProps {
  onBack: () => void;
}

interface PerformanceIndicator {
  id: string;
  code: string;
  name: string;
  type: 'KPI' | 'KRI' | 'KSI' | 'KQI' | 'KVI' | 'KCI';
  category: string;
  description: string;
  targetValue: number;
  actualValue: number;
  weight: number;
  autoCalculation: boolean;
  linkedSystem: string;
  calculatedScore: number;
}

interface EvaluationProgram {
  id: string;
  name: string;
  type: 'annual' | 'semi_annual' | 'quarterly' | 'monthly' | 'custom';
  startDate: string;
  endDate: string;
  targetDepartments: string[];
  raterTypes: string[];
  isActive: boolean;
  status: 'draft' | 'active' | 'completed' | 'archived';
}

interface Evaluation {
  id: string;
  employeeId: string;
  employeeName: string;
  programId: string;
  status: 'draft' | 'in_progress' | 'completed' | 'approved';
  selfScore: number;
  managerScore: number;
  hrScore: number;
  finalScore: number;
  purpose: string;
  duration: string;
  employeeComments: string;
  managerComments: string;
  managerRecommendation: string;
  createdAt: string;
}

interface AutomatedDecision {
  id: string;
  evaluationId: string;
  type: 'promotion' | 'bonus' | 'warning' | 'salary_freeze';
  scoreThreshold: number;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'executed';
  hrApprovalBy?: string;
  hrApprovalNotes?: string;
}

export const ComprehensiveSmartEvaluation: React.FC<ComprehensiveSmartEvaluationProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [indicators, setIndicators] = useState<PerformanceIndicator[]>([]);
  const [evaluationPrograms, setEvaluationPrograms] = useState<EvaluationProgram[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [automatedDecisions, setAutomatedDecisions] = useState<AutomatedDecision[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [selectedScores, setSelectedScores] = useState<{[key: string]: number}>({});
  const [selectedIndicator, setSelectedIndicator] = useState<PerformanceIndicator | null>(null);
  const [isIndicatorDialogOpen, setIsIndicatorDialogOpen] = useState(false);
  const [isEditIndicatorDialogOpen, setIsEditIndicatorDialogOpen] = useState(false);
  const [editingIndicator, setEditingIndicator] = useState<PerformanceIndicator | null>(null);
  const [isNewProgramDialogOpen, setIsNewProgramDialogOpen] = useState(false);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false);
  const [evaluationPrograms, setEvaluationPrograms] = useState<EvaluationProgram[]>([]);

  // Fetch evaluation programs
  const fetchEvaluationPrograms = async () => {
    setIsLoadingPrograms(true);
    try {
      const { data, error } = await supabase
        .from('evaluation_programs') 
        .select('*');
      
      if (error) throw error;
      
      const programs: EvaluationProgram[] = data?.map((item: any) => ({
        id: item.id,
        name: item.title,
        type: item.evaluation_type,
        startDate: item.start_date,
        endDate: item.end_date,
        targetDepartments: [],
        raterTypes: [],
        isActive: item.status === 'active',
        status: item.status
      })) || [];
      
      setEvaluationPrograms(programs);
    } catch (error) {
      console.error('Error fetching evaluation programs:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل برامج التقييم",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPrograms(false);
    }
  };

  useEffect(() => {
    fetchEvaluationPrograms();
  }, []);

  // بيانات وهمية للعرض التوضيحي
  const mockIndicators: PerformanceIndicator[] = [
    {
      id: '1',
      code: 'KPI001',
      name: 'الإنتاجية',
      type: 'KPI',
      category: 'الأداء',
      description: 'قياس مستوى الإنتاجية الشهرية',
      targetValue: 100,
      actualValue: 92,
      weight: 25,
      autoCalculation: true,
      linkedSystem: 'نظام المهام',
      calculatedScore: 23
    },
    {
      id: '2',
      code: 'KPI002',
      name: 'الانضباط',
      type: 'KPI',
      category: 'السلوك',
      description: 'معدل الحضور والالتزام بالمواعيد',
      targetValue: 95,
      actualValue: 98,
      weight: 20,
      autoCalculation: true,
      linkedSystem: 'نظام الحضور',
      calculatedScore: 20
    },
    {
      id: '3',
      code: 'KRI001',
      name: 'إنذارات الأداء',
      type: 'KRI',
      category: 'المخاطر',
      description: 'عدد الإنذارات المتعلقة بالأداء',
      targetValue: 0,
      actualValue: 1,
      weight: 15,
      autoCalculation: true,
      linkedSystem: 'نظام الجزاءات',
      calculatedScore: 10
    },
    {
      id: '4',
      code: 'KSI001',
      name: 'إنجاز الأهداف',
      type: 'KSI',
      category: 'النجاح',
      description: 'نسبة إنجاز الأهداف المحددة',
      targetValue: 100,
      actualValue: 88,
      weight: 20,
      autoCalculation: false,
      linkedSystem: 'إدارة الأهداف',
      calculatedScore: 17
    },
    {
      id: '5',
      code: 'KQI001',
      name: 'رضا العملاء',
      type: 'KQI',
      category: 'الجودة',
      description: 'تقييم العملاء للخدمة المقدمة',
      targetValue: 90,
      actualValue: 94,
      weight: 15,
      autoCalculation: false,
      linkedSystem: 'نظام خدمة العملاء',
      calculatedScore: 15
    },
    {
      id: '6',
      code: 'KVI001',
      name: 'العائد من التدريب',
      type: 'KVI',
      category: 'القيمة',
      description: 'العائد المحقق من الاستثمار في التدريب',
      targetValue: 150,
      actualValue: 180,
      weight: 10,
      autoCalculation: true,
      linkedSystem: 'نظام التدريب',
      calculatedScore: 12
    },
    {
      id: '7',
      code: 'KCI001',
      name: 'المهارات الفنية',
      type: 'KCI',
      category: 'القدرات',
      description: 'مستوى المهارات التقنية',
      targetValue: 85,
      actualValue: 90,
      weight: 15,
      autoCalculation: false,
      linkedSystem: 'نظام التقييمات',
      calculatedScore: 15
    }
  ];

  const mockEvaluations: Evaluation[] = [
    {
      id: '1',
      employeeId: 'emp1',
      employeeName: 'أحمد محمد علي',
      programId: 'prog1',
      status: 'completed',
      selfScore: 88,
      managerScore: 92,
      hrScore: 90,
      finalScore: 90,
      purpose: 'تقييم سنوي',
      duration: '12 شهر',
      employeeComments: 'أعتقد أنني حققت معظم الأهداف المطلوبة وأسعى للتطوير المستمر',
      managerComments: 'أداء ممتاز مع إمكانيات عالية للنمو والتطوير',
      managerRecommendation: 'ترقية',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      employeeId: 'emp2',
      employeeName: 'فاطمة السالم',
      programId: 'prog1',
      status: 'in_progress',
      selfScore: 85,
      managerScore: 0,
      hrScore: 0,
      finalScore: 0,
      purpose: 'تقييم نصف سنوي',
      duration: '6 أشهر',
      employeeComments: 'أعمل على تحسين مهاراتي في التحليل',
      managerComments: '',
      managerRecommendation: '',
      createdAt: '2024-02-01'
    }
  ];

  const mockDecisions: AutomatedDecision[] = [
    {
      id: '1',
      evaluationId: '1',
      type: 'promotion',
      scoreThreshold: 90,
      amount: 0,
      status: 'pending',
      hrApprovalBy: undefined,
      hrApprovalNotes: undefined
    },
    {
      id: '2',
      evaluationId: '1',
      type: 'bonus',
      scoreThreshold: 90,
      amount: 5000,
      status: 'pending',
      hrApprovalBy: undefined,
      hrApprovalNotes: undefined
    }
  ];

  useEffect(() => {
    setIndicators(mockIndicators);
    setEvaluations(mockEvaluations);
    setAutomatedDecisions(mockDecisions);
  }, []);

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-primary/10 to-blue-50 rounded-3xl border border-primary/20">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-primary/30 hover:bg-primary/5">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="flex items-center gap-4">
          <BoudLogo size="lg" />
          <div>
            <h1 className="text-3xl font-bold text-primary">
              نظام تقييم الأداء المتكامل
            </h1>
            <p className="text-gray-600 text-lg">
              إدارة شاملة للمؤشرات والتقييمات المتعددة مع القرارات التلقائية
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-4 py-2">
          <Brain className="h-4 w-4 ml-2" />
          نظام ذكي متكامل
        </Badge>
      </div>
    </div>
  );

  const renderIndicatorsEngine = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Target className="h-6 w-6" />
          محرك المؤشرات الذكي
        </h2>
        <div className="flex gap-2">
          <Button 
            className="bg-primary"
            onClick={() => {
              toast({
                title: "إضافة مؤشر جديد",
                description: "سيتم فتح نموذج إضافة مؤشر أداء جديد",
              });
            }}
          >
            <Plus className="h-4 w-4 ml-2" />
            مؤشر جديد
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              toast({
                title: "جاري التحديث",
                description: "تم تحديث المؤشرات تلقائياً من أنظمة الشركة",
              });
            }}
          >
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث تلقائي
          </Button>
        </div>
      </div>

      {/* جدول المؤشرات */}
      <div className="grid gap-6">
        {['KPI', 'KRI', 'KSI', 'KQI', 'KVI', 'KCI'].map((type) => {
          const typeIndicators = indicators.filter(ind => ind.type === type);
          const typeColors = {
            KPI: 'from-blue-500 to-blue-600',
            KRI: 'from-red-500 to-red-600',
            KSI: 'from-green-500 to-green-600',
            KQI: 'from-purple-500 to-purple-600',
            KVI: 'from-yellow-500 to-yellow-600',
            KCI: 'from-indigo-500 to-indigo-600'
          };
          
          const typeNames = {
            KPI: 'مؤشرات الأداء الرئيسية',
            KRI: 'مؤشرات المخاطر الرئيسية',
            KSI: 'مؤشرات النجاح الرئيسية',
            KQI: 'مؤشرات الجودة الرئيسية',
            KVI: 'مؤشرات القيمة الرئيسية',
            KCI: 'مؤشرات القدرات الرئيسية'
          };

          return (
            <Card key={type} className="overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${typeColors[type]} text-white`}>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5" />
                    {type} - {typeNames[type]}
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {typeIndicators.length} مؤشر
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {typeIndicators.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-3 text-right text-sm font-semibold text-gray-900">الرمز</th>
                          <th className="p-3 text-right text-sm font-semibold text-gray-900">اسم المؤشر</th>
                          <th className="p-3 text-right text-sm font-semibold text-gray-900">الهدف</th>
                          <th className="p-3 text-right text-sm font-semibold text-gray-900">الفعلي</th>
                          <th className="p-3 text-right text-sm font-semibold text-gray-900">النسبة</th>
                          <th className="p-3 text-right text-sm font-semibold text-gray-900">الوزن</th>
                          <th className="p-3 text-right text-sm font-semibold text-gray-900">النتيجة</th>
                          <th className="p-3 text-right text-sm font-semibold text-gray-900">النظام المرتبط</th>
                          <th className="p-3 text-center text-sm font-semibold text-gray-900">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {typeIndicators.map((indicator) => {
                          const percentage = (indicator.actualValue / indicator.targetValue) * 100;
                          const isGood = percentage >= 90;
                          const isWarning = percentage >= 70 && percentage < 90;
                          const isDanger = percentage < 70;
                          
                          return (
                            <tr key={indicator.id} className="hover:bg-gray-50">
                              <td className="p-3 text-sm font-medium text-gray-900">{indicator.code}</td>
                              <td className="p-3 text-sm text-gray-900">{indicator.name}</td>
                              <td className="p-3 text-sm text-gray-900">{indicator.targetValue}</td>
                              <td className="p-3 text-sm text-gray-900">{indicator.actualValue}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Progress 
                                    value={Math.min(percentage, 100)} 
                                    className={`w-20 h-2 ${
                                      isGood ? 'bg-green-100' : 
                                      isWarning ? 'bg-yellow-100' : 'bg-red-100'
                                    }`}
                                  />
                                  <span className={`text-sm font-medium ${
                                    isGood ? 'text-green-600' : 
                                    isWarning ? 'text-yellow-600' : 'text-red-600'
                                  }`}>
                                    {percentage.toFixed(1)}%
                                  </span>
                                </div>
                              </td>
                              <td className="p-3 text-sm text-gray-900">{indicator.weight}%</td>
                              <td className="p-3">
                                <Badge 
                                  variant={isGood ? "default" : isWarning ? "secondary" : "destructive"}
                                >
                                  {indicator.calculatedScore}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Database className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{indicator.linkedSystem}</span>
                                  {indicator.autoCalculation && (
                                    <Badge variant="outline" className="text-xs">تلقائي</Badge>
                                  )}
                                </div>
                              </td>
                               <td className="p-3">
                                 <div className="flex items-center justify-center gap-1">
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => {
                                        setEditingIndicator(indicator);
                                        setIsEditIndicatorDialogOpen(true);
                                      }}
                                    >
                                     <Edit className="h-3 w-3" />
                                   </Button>
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => {
                                        setSelectedIndicator(indicator);
                                        setIsIndicatorDialogOpen(true);
                                      }}
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                   <Button 
                                     size="sm" 
                                     variant="ghost"
                                     onClick={() => {
                                       setLoading(true);
                                       setTimeout(() => {
                                         setLoading(false);
                                         toast({
                                           title: "تم تحديث المؤشر",
                                           description: `تم تحديث بيانات المؤشر: ${indicator.name} من ${indicator.linkedSystem}`,
                                         });
                                       }, 1500);
                                     }}
                                   >
                                     <RefreshCw className="h-3 w-3" />
                                   </Button>
                                 </div>
                               </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    لا توجد مؤشرات من نوع {type} حالياً
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderEvaluationPrograms = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          برامج التقييم
        </h2>
        <Button 
          className="bg-primary"
          onClick={() => setIsNewProgramDialogOpen(true)}
        >
          <Plus className="h-4 w-4 ml-2" />
          برنامج جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingPrograms ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">جاري تحميل برامج التقييم...</p>
          </div>
        ) : evaluationPrograms.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground mb-2">لا توجد برامج تقييم</p>
            <p className="text-sm text-muted-foreground">انقر على "برنامج جديد" لإنشاء برنامج تقييم جديد</p>
          </div>
        ) : evaluationPrograms.map((program, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{program.name}</span>
                <Badge 
                  variant={
                    program.status === 'نشط' ? 'default' : 
                    program.status === 'قيد التنفيذ' ? 'secondary' : 'outline'
                  }
                >
                  {program.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                {program.startDate} - {program.endDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                جميع الموظفين
              </div>
               <div className="flex gap-2">
                 <Button 
                   size="sm" 
                   variant="outline" 
                   className="flex-1"
                   onClick={() => {
                     toast({
                       title: "تعديل برنامج التقييم",
                       description: `سيتم فتح نموذج تعديل برنامج: ${program.name}`,
                     });
                   }}
                 >
                   <Edit className="h-3 w-3 ml-1" />
                   تعديل
                 </Button>
                 <Button 
                   size="sm" 
                   variant="outline" 
                   className="flex-1"
                   onClick={() => {
                     toast({
                       title: "عرض تفاصيل البرنامج",
                       description: `البرنامج: ${program.name}\nالفترة: ${program.startDate} إلى ${program.endDate}\nالحالة: ${program.status}`,
                     });
                   }}
                 >
                   <Eye className="h-3 w-3 ml-1" />
                   عرض
                 </Button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderEvaluationForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <FileText className="h-6 w-6" />
          نموذج التقييم الشامل
        </h2>
        <div className="flex gap-2">
          <Button 
            className="bg-primary"
            onClick={() => {
              toast({
                title: "تم حفظ النموذج",
                description: "تم حفظ نموذج التقييم بنجاح",
              });
            }}
          >
            <Save className="h-4 w-4 ml-2" />
            حفظ النموذج
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              toast({
                title: "معاينة النموذج",
                description: "سيتم عرض معاينة للنموذج",
              });
            }}
          >
            <Eye className="h-4 w-4 ml-2" />
            معاينة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* عوامل التقييم الرئيسية */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>عوامل التقييم الرئيسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'الأداء الوظيفي', weight: 30, description: 'جودة وكمية العمل المنجز' },
              { name: 'الانضباط', weight: 20, description: 'الالتزام بالمواعيد والقوانين' },
              { name: 'جودة العمل', weight: 25, description: 'مستوى الدقة والإتقان' },
              { name: 'التعاون', weight: 15, description: 'العمل ضمن الفريق والتواصل' },
              { name: 'تطوير المهارات', weight: 10, description: 'التعلم والنمو المهني' }
            ].map((factor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{factor.name}</h3>
                  <Badge variant="outline">{factor.weight}%</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{factor.description}</p>
                 <div className="grid grid-cols-5 gap-2">
                   {[1, 2, 3, 4, 5].map((score) => (
                     <div key={score} className="text-center">
                       <div 
                         className={`w-8 h-8 rounded-full border-2 mx-auto mb-1 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                           selectedScores[`${factor.name}-${index}`] === score 
                             ? 'border-primary bg-primary text-white shadow-md' 
                             : 'border-gray-300 hover:border-primary hover:bg-primary/10'
                         }`}
                         onClick={() => {
                           setSelectedScores(prev => ({
                             ...prev,
                             [`${factor.name}-${index}`]: score
                           }));
                           toast({
                             title: "تم تحديد التقييم",
                             description: `تم تقييم "${factor.name}" بدرجة ${score} من 5`,
                           });
                         }}
                       >
                         {score}
                       </div>
                       <div className="text-xs text-gray-500">
                         {score === 1 ? 'ضعيف' : score === 2 ? 'مقبول' : score === 3 ? 'جيد' : score === 4 ? 'جيد جداً' : 'ممتاز'}
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* المؤشرات المختارة */}
        <Card>
          <CardHeader>
            <CardTitle>المؤشرات المحددة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {indicators.slice(0, 5).map((indicator) => (
                <div key={indicator.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium text-sm">{indicator.name}</div>
                    <div className="text-xs text-gray-500">{indicator.code}</div>
                  </div>
                   <Switch 
                     defaultChecked 
                     onCheckedChange={(checked) => {
                       toast({
                         title: checked ? "تم تفعيل المؤشر" : "تم إلغاء تفعيل المؤشر",
                         description: `المؤشر: ${indicator.name}`,
                       });
                     }}
                   />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMultiRaterEvaluation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Users className="h-6 w-6" />
          التقييمات المتعددة
        </h2>
      </div>

      {evaluations.map((evaluation) => (
        <Card key={evaluation.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3>{evaluation.employeeName}</h3>
                  <p className="text-sm text-gray-500">{evaluation.purpose} - {evaluation.duration}</p>
                </div>
              </div>
              <Badge 
                variant={
                  evaluation.status === 'completed' ? 'default' :
                  evaluation.status === 'in_progress' ? 'secondary' :
                  evaluation.status === 'approved' ? 'outline' : 'destructive'
                }
              >
                {evaluation.status === 'completed' ? 'مكتمل' :
                 evaluation.status === 'in_progress' ? 'قيد التنفيذ' :
                 evaluation.status === 'approved' ? 'معتمد' : 'مسودة'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* التقييم الذاتي */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <PenTool className="h-4 w-4 text-blue-500" />
                    التقييم الذاتي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{evaluation.selfScore}</div>
                    <div className="text-sm text-gray-500">من 100</div>
                    <Progress value={evaluation.selfScore} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              {/* تقييم المدير */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    تقييم المدير
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {evaluation.managerScore || '-'}
                    </div>
                    <div className="text-sm text-gray-500">من 100</div>
                    <Progress value={evaluation.managerScore || 0} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              {/* مراجعة HR */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-500" />
                    مراجعة HR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {evaluation.hrScore || '-'}
                    </div>
                    <div className="text-sm text-gray-500">من 100</div>
                    <Progress value={evaluation.hrScore || 0} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              {/* النتيجة النهائية */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Target className="h-4 w-4 text-orange-500" />
                    النتيجة النهائية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {evaluation.finalScore || '-'}
                    </div>
                    <div className="text-sm text-gray-500">من 100</div>
                    <Progress value={evaluation.finalScore || 0} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* الملاحظات والتوصيات */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">ملاحظات الموظف</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {evaluation.employeeComments || 'لا توجد ملاحظات'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">ملاحظات المدير</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {evaluation.managerComments || 'لا توجد ملاحظات'}
                  </p>
                  {evaluation.managerRecommendation && (
                    <div className="mt-2">
                      <Badge variant="outline">
                        توصية: {evaluation.managerRecommendation}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* أزرار العمل */}
            <div className="mt-6 flex justify-end gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "إضافة تعليق",
                    description: "سيتم فتح نموذج إضافة تعليق",
                  });
                }}
              >
                <MessageSquare className="h-3 w-3 ml-1" />
                تعليق
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "تعديل التقييم",
                    description: "سيتم فتح نموذج تعديل التقييم",
                  });
                }}
              >
                <Edit className="h-3 w-3 ml-1" />
                تعديل
              </Button>
              <Button 
                size="sm" 
                className="bg-primary"
                onClick={() => {
                  toast({
                    title: "تم اعتماد التقييم",
                    description: "تم اعتماد التقييم بنجاح",
                  });
                }}
              >
                <CheckCircle2 className="h-3 w-3 ml-1" />
                اعتماد
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAutomatedDecisions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Zap className="h-6 w-6" />
          القرارات التلقائية وربطها بالرواتب
        </h2>
        <Button 
          className="bg-primary"
          onClick={() => {
            toast({
              title: "إعدادات القرارات التلقائية",
              description: "سيتم فتح إعدادات القرارات التلقائية",
            });
          }}
        >
          <Settings className="h-4 w-4 ml-2" />
          إعدادات القرارات
        </Button>
      </div>

      {/* قواعد القرارات التلقائية */}
      <Card>
        <CardHeader>
          <CardTitle>قواعد القرارات التلقائية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">≥ 90 نقطة</span>
                </div>
                <div className="space-y-1 text-sm text-green-700">
                  <p>• ترقية تلقائية</p>
                  <p>• علاوة سنوية 10%</p>
                  <p>• تضاف في الرواتب</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">75-89 نقطة</span>
                </div>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>• مكافأة تلقائية</p>
                  <p>• علاوة سنوية 5%</p>
                  <p>• تضاف في الرواتب</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-red-800">≤ 60 نقطة</span>
                </div>
                <div className="space-y-1 text-sm text-red-700">
                  <p>• إنذار تلقائي</p>
                  <p>• تجميد العلاوة</p>
                  <p>• خطة تطوير إلزامية</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* القرارات المعلقة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>القرارات المعلقة - تحتاج موافقة HR</span>
            <Badge variant="secondary">
              {automatedDecisions.filter(d => d.status === 'pending').length} قرار معلق
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automatedDecisions.map((decision) => {
              const evaluation = evaluations.find(e => e.id === decision.evaluationId);
              return (
                <Card key={decision.id} className="border-2 border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          {decision.type === 'promotion' ? <TrendingUp className="h-6 w-6 text-green-600" /> :
                           decision.type === 'bonus' ? <Award className="h-6 w-6 text-blue-600" /> :
                           <AlertTriangle className="h-6 w-6 text-red-600" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{evaluation?.employeeName}</h3>
                          <p className="text-sm text-gray-600">
                            {decision.type === 'promotion' ? 'ترقية تلقائية' :
                             decision.type === 'bonus' ? `مكافأة ${decision.amount} ريال` :
                             decision.type === 'warning' ? 'إنذار تأديبي' : 'تجميد الراتب'}
                          </p>
                          <p className="text-xs text-gray-500">
                            النتيجة النهائية: {evaluation?.finalScore} / حد القرار: {decision.scoreThreshold}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            toast({
                              title: "تم اعتماد القرار",
                              description: "سيتم تنفيذ القرار وربطه بنظام الرواتب تلقائياً",
                            });
                          }}
                        >
                          <CheckCircle2 className="h-3 w-3 ml-1" />
                          اعتماد
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => {
                            toast({
                              title: "تم رفض القرار",
                              description: "يرجى توضيح سبب الرفض في الملاحظات",
                              variant: "destructive"
                            });
                          }}
                        >
                          <ThumbsDown className="h-3 w-3 ml-1" />
                          رفض
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderElectronicSignatures = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Signature className="h-6 w-6" />
          التوقيع الإلكتروني الإلزامي
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>حالة التوقيعات للتقييمات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evaluations.map((evaluation) => (
              <Card key={evaluation.id} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{evaluation.employeeName}</h3>
                      <p className="text-sm text-gray-500">{evaluation.purpose}</p>
                    </div>
                    <Badge variant={evaluation.status === 'approved' ? 'default' : 'secondary'}>
                      {evaluation.status === 'approved' ? 'معتمد بالكامل' : 'في انتظار التوقيعات'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* توقيع الموظف */}
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <PenTool className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">توقيع الموظف</div>
                        <div className="flex items-center gap-2 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">تم التوقيع</span>
                        </div>
                      </div>
                    </div>

                    {/* توقيع المدير */}
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">توقيع المدير</div>
                        <div className="flex items-center gap-2 mt-1">
                          {evaluation.status === 'completed' ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-green-600">تم التوقيع</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-orange-500" />
                              <span className="text-sm text-orange-600">في انتظار التوقيع</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* توقيع HR */}
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">توقيع HR</div>
                        <div className="flex items-center gap-2 mt-1">
                          {evaluation.status === 'approved' ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-green-600">تم التوقيع</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-orange-500" />
                              <span className="text-sm text-orange-600">في انتظار التوقيع</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {evaluation.status !== 'approved' && (
                    <div className="mt-4 flex justify-end">
                      <Button 
                        className="bg-primary"
                        onClick={() => {
                          toast({
                            title: "تم إرسال تذكير",
                            description: "تم إرسال تذكير للأطراف المعنية لإكمال التوقيعات",
                          });
                        }}
                      >
                        <Send className="h-4 w-4 ml-2" />
                        إرسال تذكير
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          التحليلات التفاعلية - Power BI
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => {
              toast({
                title: "تحديث البيانات",
                description: "جاري تحديث بيانات التحليلات من قاعدة البيانات",
              });
            }}
          >
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث البيانات
          </Button>
          <Button 
            className="bg-primary"
            onClick={() => {
              toast({
                title: "تصدير التقرير",
                description: "سيتم تصدير التقرير بصيغة PDF",
              });
            }}
          >
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الأداء حسب الإدارات */}
        <Card>
          <CardHeader>
            <CardTitle>الأداء حسب الإدارات</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { dept: 'تقنية المعلومات', score: 92 },
                { dept: 'الموارد البشرية', score: 88 },
                { dept: 'المالية', score: 85 },
                { dept: 'العمليات', score: 90 },
                { dept: 'المبيعات', score: 87 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3CB593" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* نسب المؤشرات حسب النوع */}
        <Card>
          <CardHeader>
            <CardTitle>نسب المؤشرات حسب النوع</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={[
                    { name: 'KPI', value: 30, color: '#3b82f6' },
                    { name: 'KRI', value: 15, color: '#ef4444' },
                    { name: 'KSI', value: 20, color: '#10b981' },
                    { name: 'KQI', value: 15, color: '#8b5cf6' },
                    { name: 'KVI', value: 10, color: '#f59e0b' },
                    { name: 'KCI', value: 10, color: '#6366f1' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {[
                    { name: 'KPI', value: 30, color: '#3b82f6' },
                    { name: 'KRI', value: 15, color: '#ef4444' },
                    { name: 'KSI', value: 20, color: '#10b981' },
                    { name: 'KQI', value: 15, color: '#8b5cf6' },
                    { name: 'KVI', value: 10, color: '#f59e0b' },
                    { name: 'KCI', value: 10, color: '#6366f1' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* توزيع الدرجات النهائية */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع الدرجات النهائية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                { month: 'يناير', avg: 85 },
                { month: 'فبراير', avg: 87 },
                { month: 'مارس', avg: 89 },
                { month: 'أبريل', avg: 91 },
                { month: 'مايو', avg: 88 },
                { month: 'يونيو', avg: 93 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="avg" stroke="#3CB593" fill="#3CB593" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* تتبع الأداء الزمني */}
        <Card>
          <CardHeader>
            <CardTitle>تتبع الأداء الزمني للموظف</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={[
                { indicator: 'الإنتاجية', value: 92 },
                { indicator: 'الانضباط', value: 98 },
                { indicator: 'الجودة', value: 94 },
                { indicator: 'التعاون', value: 88 },
                { indicator: 'الابتكار', value: 85 },
                { indicator: 'القيادة', value: 90 }
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="indicator" />
                <PolarRadiusAxis angle={0} domain={[0, 100]} />
                <Radar
                  name="الأداء"
                  dataKey="value"
                  stroke="#3CB593"
                  fill="#3CB593"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">92%</div>
            <div className="text-sm text-gray-600">متوسط الأداء العام</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">28</div>
            <div className="text-sm text-gray-600">موظف متميز</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">145</div>
            <div className="text-sm text-gray-600">تقييم مكتمل</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">33</div>
            <div className="text-sm text-gray-600">تقييم معلق</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      {renderHeader()}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="indicators">المؤشرات</TabsTrigger>
          <TabsTrigger value="programs">برامج التقييم</TabsTrigger>
          <TabsTrigger value="forms">نموذج التقييم</TabsTrigger>
          <TabsTrigger value="evaluations">التقييمات المتعددة</TabsTrigger>
          <TabsTrigger value="decisions">القرارات التلقائية</TabsTrigger>
          <TabsTrigger value="signatures">التوقيع الإلكتروني</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderAnalytics()}
        </TabsContent>

        <TabsContent value="indicators">
          {renderIndicatorsEngine()}
        </TabsContent>

        <TabsContent value="programs">
          {renderEvaluationPrograms()}
        </TabsContent>

        <TabsContent value="forms">
          {renderEvaluationForm()}
        </TabsContent>

        <TabsContent value="evaluations">
          {renderMultiRaterEvaluation()}
        </TabsContent>

        <TabsContent value="decisions">
          {renderAutomatedDecisions()}
        </TabsContent>

        <TabsContent value="signatures">
          {renderElectronicSignatures()}
        </TabsContent>
      </Tabs>

      {/* نافذة تفاصيل المؤشر */}
      <Dialog open={isIndicatorDialogOpen} onOpenChange={setIsIndicatorDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              تفاصيل المؤشر: {selectedIndicator?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedIndicator && (
            <div className="space-y-6">
              {/* معلومات أساسية */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">رمز المؤشر</Label>
                  <div className="p-2 bg-gray-50 rounded border">
                    {selectedIndicator.code}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">نوع المؤشر</Label>
                  <div className="p-2 bg-gray-50 rounded border">
                    <Badge variant="outline">{selectedIndicator.type}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">الفئة</Label>
                  <div className="p-2 bg-gray-50 rounded border">
                    {selectedIndicator.category}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">الوزن</Label>
                  <div className="p-2 bg-gray-50 rounded border">
                    {selectedIndicator.weight}%
                  </div>
                </div>
              </div>

              {/* القيم والنتائج */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">القيم والنتائج</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedIndicator.targetValue}
                      </div>
                      <div className="text-sm text-blue-800">القيمة المستهدفة</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedIndicator.actualValue}
                      </div>
                      <div className="text-sm text-green-800">القيمة الفعلية</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedIndicator.calculatedScore}
                      </div>
                      <div className="text-sm text-orange-800">النتيجة المحسوبة</div>
                    </div>
                  </div>
                  
                  {/* شريط التقدم */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">نسبة الإنجاز</span>
                      <span className="text-sm text-gray-600">
                        {((selectedIndicator.actualValue / selectedIndicator.targetValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.min((selectedIndicator.actualValue / selectedIndicator.targetValue) * 100, 100)} 
                      className="h-3"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* النظام المرتبط */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">معلومات النظام</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">النظام المرتبط</Label>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                        <Database className="h-4 w-4 text-gray-500" />
                        {selectedIndicator.linkedSystem}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">الحساب التلقائي</Label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {selectedIndicator.autoCalculation ? (
                          <Badge variant="default" className="bg-green-500">
                            <CheckCircle2 className="h-3 w-3 ml-1" />
                            مفعل
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 ml-1" />
                            يدوي
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* إجراءات */}
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: "تعديل المؤشر",
                      description: `سيتم فتح نموذج تعديل المؤشر: ${selectedIndicator.name}`,
                    });
                    setIsIndicatorDialogOpen(false);
                  }}
                >
                  <Edit className="h-4 w-4 ml-2" />
                  تعديل المؤشر
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      toast({
                        title: "تم تحديث المؤشر",
                        description: `تم تحديث بيانات المؤشر: ${selectedIndicator.name} من ${selectedIndicator.linkedSystem}`,
                      });
                    }, 1500);
                    setIsIndicatorDialogOpen(false);
                  }}
                >
                  <RefreshCw className="h-4 w-4 ml-2" />
                  تحديث البيانات
                </Button>
                <Button 
                  className="bg-primary"
                  onClick={() => setIsIndicatorDialogOpen(false)}
                >
                  إغلاق
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog تعديل المؤشر */}
      <Dialog open={isEditIndicatorDialogOpen} onOpenChange={setIsEditIndicatorDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              تعديل المؤشر: {editingIndicator?.name}
            </DialogTitle>
          </DialogHeader>
          {editingIndicator && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="indicatorCode">رمز المؤشر</Label>
                  <Input
                    id="indicatorCode"
                    value={editingIndicator.code}
                    onChange={(e) => setEditingIndicator({
                      ...editingIndicator,
                      code: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indicatorName">اسم المؤشر</Label>
                  <Input
                    id="indicatorName"
                    value={editingIndicator.name}
                    onChange={(e) => setEditingIndicator({
                      ...editingIndicator,
                      name: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="indicatorType">نوع المؤشر</Label>
                  <Select
                    value={editingIndicator.type}
                    onValueChange={(value: any) => setEditingIndicator({
                      ...editingIndicator,
                      type: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KPI">KPI - مؤشرات الأداء الرئيسية</SelectItem>
                      <SelectItem value="KRI">KRI - مؤشرات المخاطر الرئيسية</SelectItem>
                      <SelectItem value="KSI">KSI - مؤشرات النجاح الرئيسية</SelectItem>
                      <SelectItem value="KQI">KQI - مؤشرات الجودة الرئيسية</SelectItem>
                      <SelectItem value="KVI">KVI - مؤشرات القيمة الرئيسية</SelectItem>
                      <SelectItem value="KCI">KCI - مؤشرات القدرات الرئيسية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indicatorCategory">الفئة</Label>
                  <Input
                    id="indicatorCategory"
                    value={editingIndicator.category}
                    onChange={(e) => setEditingIndicator({
                      ...editingIndicator,
                      category: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="indicatorDescription">الوصف</Label>
                <Textarea
                  id="indicatorDescription"
                  value={editingIndicator.description}
                  onChange={(e) => setEditingIndicator({
                    ...editingIndicator,
                    description: e.target.value
                  })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetValue">القيمة المستهدفة</Label>
                  <Input
                    id="targetValue"
                    type="number"
                    value={editingIndicator.targetValue}
                    onChange={(e) => setEditingIndicator({
                      ...editingIndicator,
                      targetValue: Number(e.target.value)
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actualValue">القيمة الفعلية</Label>
                  <Input
                    id="actualValue"
                    type="number"
                    value={editingIndicator.actualValue}
                    onChange={(e) => setEditingIndicator({
                      ...editingIndicator,
                      actualValue: Number(e.target.value)
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">الوزن (%)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="0"
                    max="100"
                    value={editingIndicator.weight}
                    onChange={(e) => setEditingIndicator({
                      ...editingIndicator,
                      weight: Number(e.target.value)
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedSystem">النظام المرتبط</Label>
                  <Select
                    value={editingIndicator.linkedSystem}
                    onValueChange={(value) => setEditingIndicator({
                      ...editingIndicator,
                      linkedSystem: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نظام المهام">نظام المهام</SelectItem>
                      <SelectItem value="نظام الحضور">نظام الحضور</SelectItem>
                      <SelectItem value="نظام الجزاءات">نظام الجزاءات</SelectItem>
                      <SelectItem value="إدارة الأهداف">إدارة الأهداف</SelectItem>
                      <SelectItem value="نظام خدمة العملاء">نظام خدمة العملاء</SelectItem>
                      <SelectItem value="نظام التدريب">نظام التدريب</SelectItem>
                      <SelectItem value="نظام التقييمات">نظام التقييمات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="autoCalculation"
                    checked={editingIndicator.autoCalculation}
                    onCheckedChange={(checked) => setEditingIndicator({
                      ...editingIndicator,
                      autoCalculation: checked
                    })}
                  />
                  <Label htmlFor="autoCalculation">حساب تلقائي</Label>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsEditIndicatorDialogOpen(false)}
                >
                  إلغاء
                </Button>
                <Button 
                  className="bg-primary flex-1"
                  onClick={() => {
                    // تحديث المؤشر في القائمة
                    const updatedIndicators = indicators.map(ind => 
                      ind.id === editingIndicator.id ? {
                        ...editingIndicator,
                        calculatedScore: Math.round((editingIndicator.actualValue / editingIndicator.targetValue) * editingIndicator.weight)
                      } : ind
                    );
                    setIndicators(updatedIndicators);
                    
                    toast({
                      title: "تم حفظ التعديلات",
                      description: `تم تحديث المؤشر: ${editingIndicator.name} بنجاح`,
                    });
                    
                    setIsEditIndicatorDialogOpen(false);
                    setEditingIndicator(null);
                  }}
                >
                  <Save className="h-4 w-4 ml-2" />
                  حفظ التعديلات
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Evaluation Program Dialog */}
      <Dialog open={isNewProgramDialogOpen} onOpenChange={setIsNewProgramDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              إنشاء برنامج تقييم جديد
            </DialogTitle>
            <DialogDescription>
              قم بإنشاء برنامج تقييم جديد للموظفين
            </DialogDescription>
          </DialogHeader>
          <NewEvaluationProgramForm 
            onSuccess={() => {
              setIsNewProgramDialogOpen(false);
              fetchEvaluationPrograms();
            }}
            onCancel={() => setIsNewProgramDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};