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
  RefreshCw
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
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
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
      },
      {
        id: '3',
        category: 'التنفيذية',
        level: 'المستوى الثالث',
        basicSalary: 12000,
        housingAllowance: 3000,
        transportAllowance: 1200,
        totalSalary: 16200,
        isActive: true
      },
      {
        id: '4',
        category: 'العليا',
        level: 'المستوى الرابع',
        basicSalary: 18000,
        housingAllowance: 4500,
        transportAllowance: 1800,
        totalSalary: 24300,
        isActive: true
      }
    ]);

    // Initialize performance raises
    setPerformanceRaises([
      {
        employeeId: 'EMP001',
        employeeName: 'أحمد محمد العلي',
        currentSalary: 12000,
        performanceRating: 'ممتاز',
        raisePercentage: 7,
        newSalary: 12840,
        effectiveDate: '2024-01-01',
        status: 'معلق'
      },
      {
        employeeId: 'EMP002',
        employeeName: 'فاطمة أحمد السالم',
        currentSalary: 8000,
        performanceRating: 'جيد جدًا',
        raisePercentage: 5,
        newSalary: 8400,
        effectiveDate: '2024-01-01',
        status: 'معتمد'
      }
    ]);

    // Initialize promotions
    setPromotions([
      {
        employeeId: 'EMP003',
        employeeName: 'خالد محمد الأحمد',
        currentPosition: 'مطور برمجيات',
        newPosition: 'مطور برمجيات أول',
        currentSalary: 10000,
        newSalary: 13000,
        yearsInPosition: 2.5,
        qualificationStatus: 'مؤهل',
        status: 'معلق'
      }
    ]);

    // Initialize bonuses
    setBonuses([
      {
        id: '1',
        employeeId: 'EMP001',
        employeeName: 'أحمد محمد العلي',
        bonusType: 'مشاريع',
        amount: 3000,
        reason: 'إنجاز مشروع تطوير النظام الجديد',
        approvedBy: 'محمد السالم',
        status: 'معتمد',
        dateCreated: '2024-01-15'
      }
    ]);

    // Initialize assignments
    setAssignments([
      {
        employeeId: 'EMP004',
        employeeName: 'سارة علي الزهراني',
        locationType: 'خارج المدينة',
        dailyRate: 300,
        startDate: '2024-02-01',
        endDate: '2024-02-15',
        days: 14,
        totalAmount: 4200,
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
        title: 'اقتراح علاوة لموظفين متميزين',
        description: 'تم تحديد 5 موظفين مؤهلين للحصول على علاوة استثنائية بناءً على أدائهم المتميز',
        priority: 'عالي',
        action: 'مراجعة قائمة الموظفين واعتماد العلاوات',
        impact: 'تحسين معنويات الفريق وزيادة الإنتاجية',
        confidence: 92,
        createdAt: '2024-01-20'
      },
      {
        id: '2',
        type: 'تحذير مالي',
        title: 'تجاوز ميزانية المكافآت',
        description: 'ميزانية المكافآت وصلت إلى 85% من الحد الأقصى المسموح',
        priority: 'عالي',
        action: 'مراجعة صرف المكافآت وإعادة تقييم الميزانية',
        impact: 'تجنب تجاوز الميزانية المخصصة',
        confidence: 98,
        createdAt: '2024-01-18'
      }
    ]);
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
      'معلق': 'bg-yellow-100 text-yellow-800',
      'معتمد': 'bg-green-100 text-green-800',
      'مرفوض': 'bg-red-100 text-red-800',
      'مدفوع': 'bg-blue-100 text-blue-800',
      'نشط': 'bg-green-100 text-green-800',
      'منتهي': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}>
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">قسم الرواتب والأجور الذكي</h1>
              <p className="text-muted-foreground mt-1">
                إدارة شاملة ومتقدمة لنظام التعويضات والمزايا - منصة بُعد
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Bot className="w-4 h-4" />
              مساعد الذكاء الاصطناعي
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              تقرير شامل
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Settings className="w-4 h-4" />
              إعدادات النظام
            </Button>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-card to-accent/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold">{stats.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">استخدام الميزانية</p>
                  <p className="text-2xl font-bold">{stats.budgetUtilization}%</p>
                  <Progress value={stats.budgetUtilization} className="mt-1 h-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">علاوات معلقة</p>
                  <p className="text-2xl font-bold">{stats.pendingRaises}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">ترقيات معلقة</p>
                  <p className="text-2xl font-bold">{stats.pendingPromotions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">مكافآت نشطة</p>
                  <p className="text-2xl font-bold">{stats.activeBonuses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">انتدابات نشطة</p>
                  <p className="text-2xl font-bold">{stats.activeAssignments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-muted p-1 rounded-xl">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="salary-scale" className="gap-2">
              <Building2 className="w-4 h-4" />
              سلم الرواتب
            </TabsTrigger>
            <TabsTrigger value="raises" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              العلاوات السنوية
            </TabsTrigger>
            <TabsTrigger value="promotions" className="gap-2">
              <Crown className="w-4 h-4" />
              الترقيات
            </TabsTrigger>
            <TabsTrigger value="bonuses" className="gap-2">
              <Gift className="w-4 h-4" />
              المكافآت والحوافز
            </TabsTrigger>
            <TabsTrigger value="assignments" className="gap-2">
              <MapPin className="w-4 h-4" />
              بدل الانتداب
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="gap-2">
              <Bot className="w-4 h-4" />
              ذكاء اصطناعي
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Budget Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    نظرة عامة على الميزانية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">الميزانية الإجمالية</span>
                      <span className="font-bold">{(stats.totalBudget / 1000000).toFixed(1)}م ريال</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">المستخدم</span>
                      <span className="font-bold text-blue-600">{(stats.usedBudget / 1000000).toFixed(1)}م ريال</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">المتبقي</span>
                      <span className="font-bold text-green-600">
                        {((stats.totalBudget - stats.usedBudget) / 1000000).toFixed(1)}م ريال
                      </span>
                    </div>
                    <Progress value={stats.budgetUtilization} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    إجراءات سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                      onClick={handleProcessAnnualRaises}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <RefreshCw className="w-6 h-6 animate-spin" />
                      ) : (
                        <TrendingUp className="w-6 h-6" />
                      )}
                      <span className="text-sm">معالجة العلاوات</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Crown className="w-6 h-6" />
                      <span className="text-sm">مراجعة الترقيات</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Gift className="w-6 h-6" />
                      <span className="text-sm">إدارة المكافآت</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <FileText className="w-6 h-6" />
                      <span className="text-sm">تقارير شاملة</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  النشاطات الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bonuses.slice(0, 3).map((bonus) => (
                    <div key={bonus.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Gift className="w-5 h-5 text-yellow-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{bonus.employeeName}</p>
                        <p className="text-xs text-muted-foreground">
                          مكافأة {bonus.bonusType} - {bonus.amount.toLocaleString()} ريال
                        </p>
                      </div>
                      {getStatusBadge(bonus.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Salary Scale Tab */}
          <TabsContent value="salary-scale" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    سلم الرواتب الموحد
                  </div>
                  <Dialog open={isSalaryScaleDialogOpen} onOpenChange={setIsSalaryScaleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة مستوى جديد
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
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الفئة</TableHead>
                      <TableHead>المستوى</TableHead>
                      <TableHead>الراتب الأساسي</TableHead>
                      <TableHead>بدل السكن</TableHead>
                      <TableHead>بدل المواصلات</TableHead>
                      <TableHead>الإجمالي</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryScales.map((scale) => (
                      <TableRow key={scale.id}>
                        <TableCell>
                          <Badge variant="outline" className="whitespace-nowrap">
                            {scale.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{scale.level}</TableCell>
                        <TableCell>{scale.basicSalary.toLocaleString()} ريال</TableCell>
                        <TableCell>{scale.housingAllowance.toLocaleString()} ريال</TableCell>
                        <TableCell>{scale.transportAllowance.toLocaleString()} ريال</TableCell>
                        <TableCell className="font-medium">{scale.totalSalary.toLocaleString()} ريال</TableCell>
                        <TableCell>
                          <Badge className={scale.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {scale.isActive ? 'نشط' : 'معطل'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Raises Tab */}
          <TabsContent value="raises" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    العلاوات السنوية المرتبطة بالتقييم
                  </div>
                  <Button onClick={handleProcessAnnualRaises} disabled={isLoading} className="gap-2">
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    معالجة العلاوات
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
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

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الموظف</TableHead>
                      <TableHead>الراتب الحالي</TableHead>
                      <TableHead>تقييم الأداء</TableHead>
                      <TableHead>نسبة العلاوة</TableHead>
                      <TableHead>الراتب الجديد</TableHead>
                      <TableHead>تاريخ التفعيل</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceRaises.map((raise, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{raise.employeeName}</TableCell>
                        <TableCell>{raise.currentSalary.toLocaleString()} ريال</TableCell>
                        <TableCell>
                          <Badge className={
                            raise.performanceRating === 'ممتاز' ? 'bg-yellow-100 text-yellow-800' :
                            raise.performanceRating === 'جيد جدًا' ? 'bg-blue-100 text-blue-800' :
                            raise.performanceRating === 'جيد' ? 'bg-green-100 text-green-800' :
                            raise.performanceRating === 'مقبول' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {raise.performanceRating}
                          </Badge>
                        </TableCell>
                        <TableCell>{raise.raisePercentage}%</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {raise.newSalary.toLocaleString()} ريال
                        </TableCell>
                        <TableCell>{new Date(raise.effectiveDate).toLocaleDateString('ar-SA')}</TableCell>
                        <TableCell>{getStatusBadge(raise.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  إدارة الترقيات الوظيفية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>
                    يتم منح الترقية التلقائية بعد سنتين في نفس المستوى بشرط الحصول على تقييم "جيد جداً" أو أعلى في سنتين متتاليتين
                  </AlertDescription>
                </Alert>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الموظف</TableHead>
                      <TableHead>المنصب الحالي</TableHead>
                      <TableHead>المنصب الجديد</TableHead>
                      <TableHead>الراتب الحالي</TableHead>
                      <TableHead>الراتب الجديد</TableHead>
                      <TableHead>سنوات الخبرة</TableHead>
                      <TableHead>حالة التأهيل</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promotions.map((promotion, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{promotion.employeeName}</TableCell>
                        <TableCell>{promotion.currentPosition}</TableCell>
                        <TableCell className="font-medium text-blue-600">{promotion.newPosition}</TableCell>
                        <TableCell>{promotion.currentSalary.toLocaleString()} ريال</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {promotion.newSalary.toLocaleString()} ريال
                        </TableCell>
                        <TableCell>{promotion.yearsInPosition} سنة</TableCell>
                        <TableCell>
                          <Badge className={
                            promotion.qualificationStatus === 'مؤهل' ? 
                            'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                          }>
                            {promotion.qualificationStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(promotion.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bonuses Tab */}
          <TabsContent value="bonuses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    المكافآت والحوافز
                  </div>
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
                </CardTitle>
              </CardHeader>
              <CardContent>
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

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الموظف</TableHead>
                      <TableHead>نوع المكافأة</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>السبب</TableHead>
                      <TableHead>معتمد بواسطة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bonuses.map((bonus) => (
                      <TableRow key={bonus.id}>
                        <TableCell className="font-medium">{bonus.employeeName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{bonus.bonusType}</Badge>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          {bonus.amount.toLocaleString()} ريال
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={bonus.reason}>
                          {bonus.reason}
                        </TableCell>
                        <TableCell>{bonus.approvedBy}</TableCell>
                        <TableCell>{new Date(bonus.dateCreated).toLocaleDateString('ar-SA')}</TableCell>
                        <TableCell>{getStatusBadge(bonus.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    بدلات الانتداب اليومية
                  </div>
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
                </CardTitle>
              </CardHeader>
              <CardContent>
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

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الموظف</TableHead>
                      <TableHead>نوع الموقع</TableHead>
                      <TableHead>البدل اليومي</TableHead>
                      <TableHead>تاريخ البداية</TableHead>
                      <TableHead>تاريخ النهاية</TableHead>
                      <TableHead>عدد الأيام</TableHead>
                      <TableHead>الإجمالي</TableHead>
                      <TableHead>إضافات</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{assignment.employeeName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="whitespace-nowrap">
                            {assignment.locationType}
                          </Badge>
                        </TableCell>
                        <TableCell>{assignment.dailyRate} ريال</TableCell>
                        <TableCell>{new Date(assignment.startDate).toLocaleDateString('ar-SA')}</TableCell>
                        <TableCell>{new Date(assignment.endDate).toLocaleDateString('ar-SA')}</TableCell>
                        <TableCell>{assignment.days} يوم</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {assignment.totalAmount.toLocaleString()} ريال
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {assignment.includesAccommodation && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">سكن</Badge>
                            )}
                            {assignment.includesFlights && (
                              <Badge className="bg-green-100 text-green-800 text-xs">طيران</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="mt-6">
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
      </div>
    </div>
  );
};