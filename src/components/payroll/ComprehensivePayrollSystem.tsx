import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  DollarSign, 
  TrendingUp, 
  Award, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  Calendar, 
  MapPin, 
  Bot, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  Edit, 
  Plus, 
  Save, 
  Target, 
  Zap, 
  Crown, 
  Gift, 
  Calculator, 
  Building2, 
  Plane, 
  Home, 
  Star,
  Clock,
  BookOpen,
  Shield,
  Archive,
  PieChart,
  Lightbulb,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  CreditCard
} from 'lucide-react';

interface SalaryScale {
  id: string;
  category: 'الدنيا' | 'الإشرافية' | 'التنفيذية' | 'العليا';
  level: string;
  basicSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  totalSalary: number;
  isActive: boolean;
}

interface PerformanceRaise {
  employeeId: string;
  employeeName: string;
  currentSalary: number;
  performanceRating: 'ممتاز' | 'جيد جدًا' | 'جيد' | 'مقبول' | 'ضعيف';
  raisePercentage: number;
  newSalary: number;
  effectiveDate: string;
  status: 'معلق' | 'معتمد' | 'مرفوض';
}

interface Promotion {
  employeeId: string;
  employeeName: string;
  currentPosition: string;
  newPosition: string;
  currentSalary: number;
  newSalary: number;
  yearsInPosition: number;
  qualificationStatus: 'مؤهل' | 'غير مؤهل';
  status: 'معلق' | 'معتمد' | 'مرفوض';
}

interface Bonus {
  id: string;
  employeeId: string;
  employeeName: string;
  bonusType: 'سنوية' | 'أهداف' | 'مشاريع' | 'أخرى';
  amount: number;
  reason: string;
  approvedBy: string;
  status: 'معلق' | 'معتمد' | 'مدفوع';
  dateCreated: string;
}

interface AssignmentAllowance {
  employeeId: string;
  employeeName: string;
  locationType: 'داخل المدينة' | 'خارج المدينة' | 'خارج المملكة';
  dailyRate: number;
  startDate: string;
  endDate: string;
  days: number;
  totalAmount: number;
  includesAccommodation: boolean;
  includesFlights: boolean;
  status: 'نشط' | 'منتهي' | 'معلق';
}

interface AIRecommendation {
  id: string;
  type: 'علاوة' | 'ترقية' | 'مكافأة' | 'تحذير مالي';
  title: string;
  description: string;
  priority: 'عالي' | 'متوسط' | 'منخفض';
  action: string;
  impact: string;
  confidence: number;
  createdAt: string;
}

export const ComprehensivePayrollSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // States for different data
  const [salaryScales, setSalaryScales] = useState<SalaryScale[]>([]);
  const [performanceRaises, setPerformanceRaises] = useState<PerformanceRaise[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [assignments, setAssignments] = useState<AssignmentAllowance[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);

  // Dialog states
  const [isSalaryScaleDialogOpen, setIsSalaryScaleDialogOpen] = useState(false);
  const [isRaiseDialogOpen, setIsRaiseDialogOpen] = useState(false);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const [isBonusDialogOpen, setIsBonusDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);

  // Form states
  const [newSalaryScale, setNewSalaryScale] = useState<Partial<SalaryScale>>({
    category: 'الدنيا',
    level: '',
    basicSalary: 0,
    isActive: true
  });

  const [newBonus, setNewBonus] = useState<Partial<Bonus>>({
    bonusType: 'سنوية',
    amount: 0,
    reason: '',
    status: 'معلق'
  });

  const [newAssignment, setNewAssignment] = useState<Partial<AssignmentAllowance>>({
    locationType: 'داخل المدينة',
    startDate: '',
    endDate: '',
    includesAccommodation: false,
    includesFlights: false,
    status: 'نشط'
  });

  // Mock data initialization
  useEffect(() => {
    initializeMockData();
  }, []);

  const initializeMockData = () => {
    // Initialize salary scales
    setSalaryScales([
      {
        id: '1',
        category: 'الدنيا',
        level: 'المستوى الأول',
        basicSalary: 4000,
        housingAllowance: 1000,
        transportAllowance: 400,
        totalSalary: 5400,
        isActive: true
      },
      {
        id: '2',
        category: 'الإشرافية',
        level: 'المستوى الثاني',
        basicSalary: 8000,
        housingAllowance: 2000,
        transportAllowance: 800,
        totalSalary: 10800,
        isActive: true
      }
    ]);

    // Initialize performance raises
    setPerformanceRaises([
      {
        employeeId: '001',
        employeeName: 'أحمد محمد علي',
        currentSalary: 8000,
        performanceRating: 'ممتاز',
        raisePercentage: 7,
        newSalary: 8560,
        effectiveDate: '2024-01-01',
        status: 'معلق'
      },
      {
        employeeId: '002',
        employeeName: 'فاطمة أحمد',
        currentSalary: 7500,
        performanceRating: 'جيد جدًا',
        raisePercentage: 5,
        newSalary: 7875,
        effectiveDate: '2024-01-01',
        status: 'معتمد'
      }
    ]);

    // Initialize promotions
    setPromotions([
      {
        employeeId: '001',
        employeeName: 'أحمد محمد علي',
        currentPosition: 'موظف أول',
        newPosition: 'مشرف',
        currentSalary: 8000,
        newSalary: 10000,
        yearsInPosition: 3,
        qualificationStatus: 'مؤهل',
        status: 'معلق'
      }
    ]);

    // Initialize bonuses
    setBonuses([
      {
        id: '1',
        employeeId: '001',
        employeeName: 'أحمد محمد علي',
        bonusType: 'سنوية',
        amount: 5000,
        reason: 'تميز في الأداء',
        approvedBy: 'مدير الموارد البشرية',
        status: 'معتمد',
        dateCreated: '2024-01-15'
      }
    ]);

    // Initialize assignments
    setAssignments([
      {
        employeeId: '001',
        employeeName: 'أحمد محمد علي',
        locationType: 'خارج المدينة',
        dailyRate: 300,
        startDate: '2024-01-01',
        endDate: '2024-01-15',
        days: 15,
        totalAmount: 4500,
        includesAccommodation: true,
        includesFlights: false,
        status: 'نشط'
      }
    ]);

    // Initialize AI recommendations
    setAiRecommendations([
      {
        id: '1',
        type: 'علاوة',
        title: 'توصية بعلاوة استثنائية',
        description: 'الموظف أحمد محمد يستحق علاوة استثنائية بناءً على أدائه المتميز',
        priority: 'عالي',
        action: 'منح علاوة 10% إضافية',
        impact: 'تحسين الرضا الوظيفي وزيادة الإنتاجية',
        confidence: 85,
        createdAt: '2024-01-15'
      }
    ]);
  };

  const handleSystemAction = (action: string) => {
    switch (action) {
      case 'ai-assistant':
        toast.info('فتح مساعد الذكاء الاصطناعي للرواتب والأجور');
        break;
      case 'comprehensive-report':
        toast.info('إنتاج تقرير شامل لنظام الرواتب');
        break;
      case 'system-settings':
        toast.info('فتح إعدادات النظام المتقدمة');
        break;
      default:
        toast.info(`تنفيذ إجراء: ${action}`);
    }
  };

  // Calculation functions
  const calculateAllowances = (basicSalary: number) => {
    const housingAllowance = basicSalary * 0.25;
    const transportAllowance = basicSalary * 0.10;
    const totalSalary = basicSalary + housingAllowance + transportAllowance;
    return { housingAllowance, transportAllowance, totalSalary };
  };

  const calculateRaiseAmount = (rating: string): number => {
    const rateMap = {
      'ممتاز': 7,
      'جيد جدًا': 5,
      'جيد': 3,
      'مقبول': 1,
      'ضعيف': 0
    };
    return rateMap[rating as keyof typeof rateMap] || 0;
  };

  const getAssignmentRate = (locationType: string): number => {
    const rates = {
      'داخل المدينة': 150,
      'خارج المدينة': 300,
      'خارج المملكة': 600
    };
    return rates[locationType as keyof typeof rates] || 150;
  };

  // Handler functions
  const handleAddSalaryScale = () => {
    if (!newSalaryScale.basicSalary || !newSalaryScale.level) {
      toast.error('يرجى إدخال جميع البيانات المطلوبة');
      return;
    }

    const { housingAllowance, transportAllowance, totalSalary } = calculateAllowances(newSalaryScale.basicSalary);
    
    const salaryScale: SalaryScale = {
      id: Date.now().toString(),
      category: newSalaryScale.category!,
      level: newSalaryScale.level!,
      basicSalary: newSalaryScale.basicSalary!,
      housingAllowance,
      transportAllowance,
      totalSalary,
      isActive: true
    };

    setSalaryScales([...salaryScales, salaryScale]);
    setNewSalaryScale({
      category: 'الدنيا',
      level: '',
      basicSalary: 0,
      isActive: true
    });
    setIsSalaryScaleDialogOpen(false);
    toast.success('تم إضافة السلم الوظيفي بنجاح');
  };

  const handleAddBonus = () => {
    if (!newBonus.employeeId || !newBonus.amount || !newBonus.reason) {
      toast.error('يرجى إدخال جميع البيانات المطلوبة');
      return;
    }

    const bonus: Bonus = {
      id: Date.now().toString(),
      employeeId: newBonus.employeeId!,
      employeeName: `موظف ${newBonus.employeeId}`,
      bonusType: newBonus.bonusType!,
      amount: newBonus.amount!,
      reason: newBonus.reason!,
      approvedBy: 'النظام',
      status: 'معلق',
      dateCreated: new Date().toISOString().split('T')[0]
    };

    setBonuses([...bonuses, bonus]);
    setNewBonus({
      bonusType: 'سنوية',
      amount: 0,
      reason: '',
      status: 'معلق'
    });
    setIsBonusDialogOpen(false);
    toast.success('تم إضافة المكافأة بنجاح');
  };

  const handleProcessAnnualRaises = async () => {
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      const processedRaises = performanceRaises.map(raise => ({
        ...raise,
        status: 'معتمد' as const
      }));
      setPerformanceRaises(processedRaises);
      setIsLoading(false);
      toast.success('تم معالجة العلاوات السنوية بنجاح');
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'معلق': 'bg-yellow-500/20 text-yellow-700 border-yellow-200',
      'معتمد': 'bg-green-500/20 text-green-700 border-green-200',
      'مرفوض': 'bg-red-500/20 text-red-700 border-red-200',
      'مدفوع': 'bg-blue-500/20 text-blue-700 border-blue-200',
      'نشط': 'bg-green-500/20 text-green-700 border-green-200',
      'منتهي': 'bg-gray-500/20 text-gray-700 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-500/20 text-gray-700'}>
        {status}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالي': return 'text-red-600';
      case 'متوسط': return 'text-yellow-600';
      case 'منخفض': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  // Statistics calculations
  const stats = {
    totalEmployees: 248,
    totalBudget: 3200000,
    usedBudget: 2450000,
    budgetUtilization: Math.round((2450000 / 3200000) * 100),
    pendingRaises: performanceRaises.filter(r => r.status === 'معلق').length,
    pendingPromotions: promotions.filter(p => p.status === 'معلق').length,
    activeBonuses: bonuses.filter(b => b.status === 'معتمد').length,
    activeAssignments: assignments.filter(a => a.status === 'نشط').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-foreground rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-white/20 backdrop-blur rounded-2xl shadow-xl">
                  <DollarSign className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">نظام الرواتب والأجور الشامل</h1>
                  <p className="text-white/90 text-lg">
                    إدارة متكاملة وذكية للتعويضات والمزايا مع تقنيات الذكاء الاصطناعي
                  </p>
                  <div className="flex gap-4 mt-3">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">نظام متقدم</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">ذكي ومتكامل</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">متوافق مع اللوائح</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur"
                  onClick={() => handleSystemAction('ai-assistant')}
                >
                  <Bot className="w-5 h-5" />
                  مساعد الذكاء الاصطناعي
                </Button>
                <Button 
                  className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur"
                  onClick={() => handleSystemAction('comprehensive-report')}
                >
                  <FileText className="w-5 h-5" />
                  تقرير شامل
                </Button>
                <Button 
                  className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur"
                  onClick={() => handleSystemAction('system-settings')}
                >
                  <Settings className="w-5 h-5" />
                  إعدادات النظام
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">إجمالي الموظفين</p>
                  <p className="text-3xl font-bold">{stats.totalEmployees}</p>
                  <p className="text-white/70 text-xs mt-1">+12% من الشهر الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">استخدام الميزانية</p>
                  <p className="text-3xl font-bold">{stats.budgetUtilization}%</p>
                  <Progress value={stats.budgetUtilization} className="mt-2 h-2 bg-white/20" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">علاوات معلقة</p>
                  <p className="text-3xl font-bold">{stats.pendingRaises}</p>
                  <p className="text-white/70 text-xs mt-1">تحتاج مراجعة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">ترقيات معلقة</p>
                  <p className="text-3xl font-bold">{stats.pendingPromotions}</p>
                  <p className="text-white/70 text-xs mt-1">في انتظار الاعتماد</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">مكافآت نشطة</p>
                  <p className="text-3xl font-bold">{stats.activeBonuses}</p>
                  <p className="text-white/70 text-xs mt-1">هذا الشهر</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">انتدابات نشطة</p>
                  <p className="text-3xl font-bold">{stats.activeAssignments}</p>
                  <p className="text-white/70 text-xs mt-1">قيد التنفيذ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-3">
              <PieChart className="w-7 h-7" />
              نظرة عامة على النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {[
                { icon: Calculator, label: 'حاسبة الرواتب', color: 'text-blue-600', bg: 'bg-blue-100', action: 'salary-calculator' },
                { icon: TrendingUp, label: 'العلاوات السنوية', color: 'text-green-600', bg: 'bg-green-100', action: 'annual-raises' },
                { icon: Crown, label: 'نظام الترقيات', color: 'text-purple-600', bg: 'bg-purple-100', action: 'promotions' },
                { icon: Gift, label: 'المكافآت والحوافز', color: 'text-yellow-600', bg: 'bg-yellow-100', action: 'bonuses' },
                { icon: Building2, label: 'سلم الرواتب', color: 'text-indigo-600', bg: 'bg-indigo-100', action: 'salary-scale' },
                { icon: MapPin, label: 'بدل الانتداب', color: 'text-red-600', bg: 'bg-red-100', action: 'assignments' },
                { icon: Shield, label: 'التأمينات', color: 'text-emerald-600', bg: 'bg-emerald-100', action: 'insurance' },
                { icon: FileText, label: 'التقارير المالية', color: 'text-orange-600', bg: 'bg-orange-100', action: 'financial-reports' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-primary/30"
                  onClick={() => handleSystemAction(item.action)}
                >
                  <div className={`p-3 rounded-xl ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium mt-2 text-center text-gray-700 group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Navigation Tabs */}
        <Card className="bg-white/90 backdrop-blur shadow-xl border-0">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-7 bg-gradient-to-r from-primary/10 to-primary/5 p-2 rounded-none h-auto border-b">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">لوحة التحكم</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="salary-scale" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">سلم الرواتب</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="raises" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">العلاوات السنوية</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="promotions" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Crown className="w-5 h-5" />
                  <span className="font-medium">الترقيات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="bonuses" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Gift className="w-5 h-5" />
                  <span className="font-medium">المكافآت والحوافز</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="assignments" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">بدل الانتداب</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="ai-insights" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Bot className="w-5 h-5" />
                  <span className="font-medium">رؤى ذكية</span>
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Budget Overview */}
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <PieChart className="w-5 h-5" />
                        نظرة عامة على الميزانية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">الميزانية الإجمالية</span>
                          <span className="font-bold text-lg">{(stats.totalBudget / 1000000).toFixed(1)}م ريال</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">المستخدم</span>
                          <span className="font-bold text-blue-600">{(stats.usedBudget / 1000000).toFixed(1)}م ريال</span>
                        </div>
                        <Progress value={stats.budgetUtilization} className="h-3" />
                        <div className="text-center">
                          <span className="text-lg font-bold text-blue-700">{stats.budgetUtilization}%</span>
                          <p className="text-sm text-gray-500">من الميزانية المستخدمة</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <Clock className="w-5 h-5" />
                        النشاط الأخير
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">تم اعتماد علاوة سنوية</p>
                            <p className="text-sm text-gray-500">فاطمة أحمد - منذ ساعتين</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium">علاوة في انتظار الاعتماد</p>
                            <p className="text-sm text-gray-500">أحمد محمد - منذ 4 ساعات</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Gift className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">تم صرف مكافأة</p>
                            <p className="text-sm text-gray-500">محمد سعد - أمس</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Salary Scale Tab */}
              <TabsContent value="salary-scale" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">سلم الرواتب</h3>
                  <Dialog open={isSalaryScaleDialogOpen} onOpenChange={setIsSalaryScaleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة سلم جديد
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>إضافة مستوى راتب جديد</DialogTitle>
                        <DialogDescription>
                          أدخل تفاصيل المستوى الوظيفي الجديد
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="category">الفئة الوظيفية</Label>
                          <Select 
                            value={newSalaryScale.category} 
                            onValueChange={(value) => setNewSalaryScale({...newSalaryScale, category: value as any})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="الدنيا">الفئة الدنيا</SelectItem>
                              <SelectItem value="الإشرافية">الإشرافية</SelectItem>
                              <SelectItem value="التنفيذية">التنفيذية</SelectItem>
                              <SelectItem value="العليا">العليا</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="level">المستوى</Label>
                          <Input 
                            id="level"
                            value={newSalaryScale.level || ''}
                            onChange={(e) => setNewSalaryScale({...newSalaryScale, level: e.target.value})}
                            placeholder="مثال: المستوى الأول"
                          />
                        </div>
                        <div>
                          <Label htmlFor="basicSalary">الراتب الأساسي</Label>
                          <Input 
                            id="basicSalary"
                            type="number"
                            value={newSalaryScale.basicSalary || ''}
                            onChange={(e) => setNewSalaryScale({...newSalaryScale, basicSalary: parseFloat(e.target.value) || 0})}
                            placeholder="0"
                          />
                        </div>
                        {newSalaryScale.basicSalary && newSalaryScale.basicSalary > 0 && (
                          <div className="p-3 bg-muted rounded-lg space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>بدل السكن (25%)</span>
                              <span>{(newSalaryScale.basicSalary * 0.25).toLocaleString()} ريال</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>بدل المواصلات (10%)</span>
                              <span>{(newSalaryScale.basicSalary * 0.10).toLocaleString()} ريال</span>
                            </div>
                            <div className="flex justify-between font-medium border-t pt-2">
                              <span>إجمالي الراتب</span>
                              <span>{(newSalaryScale.basicSalary * 1.35).toLocaleString()} ريال</span>
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button onClick={handleAddSalaryScale} className="flex-1">
                            <Save className="w-4 h-4 ml-2" />
                            حفظ
                          </Button>
                          <Button variant="outline" onClick={() => setIsSalaryScaleDialogOpen(false)}>
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {salaryScales.map((scale) => (
                    <Card key={scale.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-bold text-lg">{scale.category} - {scale.level}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">الراتب الأساسي:</span>
                                <p className="font-medium">{scale.basicSalary.toLocaleString()} ريال</p>
                              </div>
                              <div>
                                <span className="text-gray-500">بدل السكن:</span>
                                <p className="font-medium">{scale.housingAllowance.toLocaleString()} ريال</p>
                              </div>
                              <div>
                                <span className="text-gray-500">بدل النقل:</span>
                                <p className="font-medium">{scale.transportAllowance.toLocaleString()} ريال</p>
                              </div>
                              <div>
                                <span className="text-gray-500">الإجمالي:</span>
                                <p className="font-bold text-primary">{scale.totalSalary.toLocaleString()} ريال</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {getStatusBadge(scale.isActive ? 'نشط' : 'غير نشط')}
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Annual Raises Tab */}
              <TabsContent value="raises" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">العلاوات السنوية</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      استيراد
                    </Button>
                    <Button className="gap-2" onClick={handleProcessAnnualRaises} disabled={isLoading}>
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      معالجة العلاوات
                    </Button>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">معايير العلاوات السنوية:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>ممتاز: 7%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-500" />
                      <span>جيد جداً: 5%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-500" />
                      <span>جيد: 3%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-orange-500" />
                      <span>مقبول: 1%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-red-500" />
                      <span>ضعيف: 0%</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {performanceRaises.map((raise, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-lg">{raise.employeeName}</h4>
                              {getStatusBadge(raise.status)}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">الراتب الحالي:</span>
                                <p className="font-medium">{raise.currentSalary.toLocaleString()} ريال</p>
                              </div>
                              <div>
                                <span className="text-gray-500">تقييم الأداء:</span>
                                <p className="font-medium">{raise.performanceRating}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">نسبة العلاوة:</span>
                                <p className="font-medium text-green-600">{raise.raisePercentage}%</p>
                              </div>
                              <div>
                                <span className="text-gray-500">الراتب الجديد:</span>
                                <p className="font-bold text-primary">{raise.newSalary.toLocaleString()} ريال</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Promotions Tab */}
              <TabsContent value="promotions" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">إدارة الترقيات الوظيفية</h3>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة ترقية
                  </Button>
                </div>

                <Alert>
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>
                    يتم منح الترقية التلقائية بعد سنتين في نفس المستوى بشرط الحصول على تقييم "جيد جداً" أو أعلى في سنتين متتاليتين
                  </AlertDescription>
                </Alert>

                <div className="grid gap-4">
                  {promotions.map((promotion, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-lg">{promotion.employeeName}</h4>
                              {getStatusBadge(promotion.status)}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">المنصب الحالي:</span>
                                <p className="font-medium">{promotion.currentPosition}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">المنصب الجديد:</span>
                                <p className="font-medium text-blue-600">{promotion.newPosition}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">الراتب الحالي:</span>
                                <p className="font-medium">{promotion.currentSalary.toLocaleString()} ريال</p>
                              </div>
                              <div>
                                <span className="text-gray-500">الراتب الجديد:</span>
                                <p className="font-bold text-green-600">{promotion.newSalary.toLocaleString()} ريال</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-500">سنوات الخبرة: {promotion.yearsInPosition} سنة</span>
                              <Badge className={
                                promotion.qualificationStatus === 'مؤهل' ? 
                                'bg-green-500/20 text-green-700 border-green-200' : 
                                'bg-red-500/20 text-red-700 border-red-200'
                              }>
                                {promotion.qualificationStatus}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Bonuses Tab */}
              <TabsContent value="bonuses" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">المكافآت والحوافز</h3>
                  <Dialog open={isBonusDialogOpen} onOpenChange={setIsBonusDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة مكافأة جديدة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>إضافة مكافأة جديدة</DialogTitle>
                        <DialogDescription>
                          أدخل تفاصيل المكافأة أو الحافز
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="employeeId">رقم الموظف</Label>
                          <Input 
                            id="employeeId"
                            value={newBonus.employeeId || ''}
                            onChange={(e) => setNewBonus({...newBonus, employeeId: e.target.value})}
                            placeholder="EMP001"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bonusType">نوع المكافأة</Label>
                          <Select 
                            value={newBonus.bonusType} 
                            onValueChange={(value) => setNewBonus({...newBonus, bonusType: value as any})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="سنوية">مكافأة سنوية</SelectItem>
                              <SelectItem value="أهداف">حافز تحقيق الأهداف</SelectItem>
                              <SelectItem value="مشاريع">مكافأة المشاريع</SelectItem>
                              <SelectItem value="أخرى">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="amount">المبلغ (ريال)</Label>
                          <Input 
                            id="amount"
                            type="number"
                            value={newBonus.amount || ''}
                            onChange={(e) => setNewBonus({...newBonus, amount: parseFloat(e.target.value) || 0})}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reason">السبب</Label>
                          <Textarea 
                            id="reason"
                            value={newBonus.reason || ''}
                            onChange={(e) => setNewBonus({...newBonus, reason: e.target.value})}
                            placeholder="وصف سبب المكافأة..."
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleAddBonus} className="flex-1">
                            <Save className="w-4 h-4 ml-2" />
                            حفظ
                          </Button>
                          <Button variant="outline" onClick={() => setIsBonusDialogOpen(false)}>
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="text-center">
                      <h3 className="font-medium text-sm text-muted-foreground">مكافآت سنوية</h3>
                      <p className="text-lg font-bold">1,000 - 5,000 ريال</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <h3 className="font-medium text-sm text-muted-foreground">حوافز الأهداف</h3>
                      <p className="text-lg font-bold">5% - 15% من الأساسي</p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <h3 className="font-medium text-sm text-muted-foreground">مكافآت المشاريع</h3>
                      <p className="text-lg font-bold">حسب الإنجاز</p>
                    </div>
                  </Card>
                </div>

                <div className="grid gap-4">
                  {bonuses.map((bonus) => (
                    <Card key={bonus.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-lg">{bonus.employeeName}</h4>
                              {getStatusBadge(bonus.status)}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">نوع المكافأة:</span>
                                <p className="font-medium">{bonus.bonusType}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">المبلغ:</span>
                                <p className="font-bold text-green-600">{bonus.amount.toLocaleString()} ريال</p>
                              </div>
                              <div>
                                <span className="text-gray-500">معتمد بواسطة:</span>
                                <p className="font-medium">{bonus.approvedBy}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">التاريخ:</span>
                                <p className="font-medium">{new Date(bonus.dateCreated).toLocaleDateString('ar-SA')}</p>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500 text-sm">السبب:</span>
                              <p className="text-sm">{bonus.reason}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Assignments Tab */}
              <TabsContent value="assignments" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">بدلات الانتداب اليومية</h3>
                  <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة انتداب جديد
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>إضافة انتداب جديد</DialogTitle>
                        <DialogDescription>
                          أدخل تفاصيل الانتداب وبدل الإقامة
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="employeeId">رقم الموظف</Label>
                          <Input 
                            id="employeeId"
                            value={newAssignment.employeeId || ''}
                            onChange={(e) => setNewAssignment({...newAssignment, employeeId: e.target.value})}
                            placeholder="EMP001"
                          />
                        </div>
                        <div>
                          <Label htmlFor="locationType">نوع الموقع</Label>
                          <Select 
                            value={newAssignment.locationType} 
                            onValueChange={(value) => setNewAssignment({...newAssignment, locationType: value as any})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="داخل المدينة">داخل المدينة (150 ريال/يوم)</SelectItem>
                              <SelectItem value="خارج المدينة">خارج المدينة (300 ريال/يوم)</SelectItem>
                              <SelectItem value="خارج المملكة">خارج المملكة (600 ريال/يوم)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="startDate">تاريخ البداية</Label>
                            <Input 
                              id="startDate"
                              type="date"
                              value={newAssignment.startDate || ''}
                              onChange={(e) => setNewAssignment({...newAssignment, startDate: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="endDate">تاريخ النهاية</Label>
                            <Input 
                              id="endDate"
                              type="date"
                              value={newAssignment.endDate || ''}
                              onChange={(e) => setNewAssignment({...newAssignment, endDate: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="accommodation"
                            checked={newAssignment.includesAccommodation}
                            onCheckedChange={(checked) => setNewAssignment({...newAssignment, includesAccommodation: checked})}
                          />
                          <Label htmlFor="accommodation">يشمل السكن</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="flights"
                            checked={newAssignment.includesFlights}
                            onCheckedChange={(checked) => setNewAssignment({...newAssignment, includesFlights: checked})}
                          />
                          <Label htmlFor="flights">يشمل تذاكر الطيران</Label>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1">
                            <Save className="w-4 h-4 ml-2" />
                            حفظ
                          </Button>
                          <Button variant="outline" onClick={() => setIsAssignmentDialogOpen(false)}>
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-card to-blue-50">
                    <div className="flex items-center gap-3">
                      <Home className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium">داخل المدينة</h3>
                        <p className="text-2xl font-bold text-blue-600">150 ريال/يوم</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-card to-orange-50">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-8 h-8 text-orange-600" />
                      <div>
                        <h3 className="font-medium">خارج المدينة</h3>
                        <p className="text-2xl font-bold text-orange-600">300 ريال/يوم</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-card to-green-50">
                    <div className="flex items-center gap-3">
                      <Plane className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="font-medium">خارج المملكة</h3>
                        <p className="text-2xl font-bold text-green-600">600 ريال/يوم + إضافات</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid gap-4">
                  {assignments.map((assignment, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-lg">{assignment.employeeName}</h4>
                              {getStatusBadge(assignment.status)}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">نوع الموقع:</span>
                                <p className="font-medium">{assignment.locationType}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">البدل اليومي:</span>
                                <p className="font-medium">{assignment.dailyRate} ريال</p>
                              </div>
                              <div>
                                <span className="text-gray-500">عدد الأيام:</span>
                                <p className="font-medium">{assignment.days} يوم</p>
                              </div>
                              <div>
                                <span className="text-gray-500">الإجمالي:</span>
                                <p className="font-bold text-green-600">{assignment.totalAmount.toLocaleString()} ريال</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-500">
                                من {new Date(assignment.startDate).toLocaleDateString('ar-SA')} 
                                إلى {new Date(assignment.endDate).toLocaleDateString('ar-SA')}
                              </span>
                              <div className="flex gap-1">
                                {assignment.includesAccommodation && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">سكن</Badge>
                                )}
                                {assignment.includesFlights && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">طيران</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* AI Insights Tab */}
              <TabsContent value="ai-insights" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="w-5 h-5" />
                        توصيات الذكاء الاصطناعي
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {aiRecommendations.map((recommendation) => (
                          <div key={recommendation.id} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-medium">{recommendation.title}</h3>
                              <Badge className={
                                recommendation.priority === 'عالي' ? 'bg-red-100 text-red-800' :
                                recommendation.priority === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }>
                                {recommendation.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {recommendation.description}
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">الإجراء المقترح:</p>
                                  <p className="text-sm text-muted-foreground">{recommendation.action}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">التأثير المتوقع:</p>
                                  <p className="text-sm text-muted-foreground">{recommendation.impact}</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">مستوى الثقة:</span>
                                  <Progress value={recommendation.confidence} className="w-20 h-2" />
                                  <span className="text-xs font-medium">{recommendation.confidence}%</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(recommendation.createdAt).toLocaleDateString('ar-SA')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        تحليلات ذكية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Salary Analysis */}
                        <div>
                          <h3 className="font-medium mb-3">تحليل الرواتب</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">متوسط الراتب الإجمالي</span>
                              <span className="font-medium">12,500 ريال</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">نمو الرواتب السنوي</span>
                              <span className="font-medium text-green-600">+5.2%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">تكلفة الموظف الواحد</span>
                              <span className="font-medium">15,200 ريال</span>
                            </div>
                          </div>
                        </div>

                        {/* Performance Insights */}
                        <div>
                          <h3 className="font-medium mb-3">رؤى الأداء</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">معدل الموظفين المتميزين</span>
                              <span className="font-medium">28%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">الموظفين المؤهلين للترقية</span>
                              <span className="font-medium text-blue-600">15 موظف</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">متوسط الرضا الوظيفي</span>
                              <span className="font-medium">4.2/5</span>
                            </div>
                          </div>
                        </div>

                        {/* Budget Predictions */}
                        <div>
                          <h3 className="font-medium mb-3">توقعات الميزانية</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">توقع التكلفة الشهرية</span>
                              <span className="font-medium">2.8م ريال</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">توفير متوقع</span>
                              <span className="font-medium text-green-600">120,000 ريال</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">العائد على الاستثمار</span>
                              <span className="font-medium">+18%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
