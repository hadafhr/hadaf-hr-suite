import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Award, Gift, Users, FileText, Calendar, DollarSign, 
  Eye, Save, Download, Share, Settings, BarChart, Clock, Search, Plus, User,
  AlertTriangle, CheckCircle, Building, Phone, Mail, Globe, CreditCard,
  TrendingUp, Activity, Bell, Zap, Target, Briefcase, Star, 
  PieChart, LineChart, Filter, RefreshCw, Upload, Edit, Trash2, Check,
  X, Calculator, Percent, Crown, Trophy, Medal, Coins, Heart, Flame,
  ChevronRight, Calendar as CalendarIcon, FileBarChart, Send, UserCheck,
  Brain, Sparkles, BarChart3, Lightbulb, Gauge, Layers, Shield,
  Smartphone, Calendar as CalendarDays, MapPin, Clock4, Users2, BookOpen
} from 'lucide-react';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar, RadialBarChart, RadialBar } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEligibilityCalculation } from '@/hooks/useEligibilityCalculation';

interface ComprehensiveRewardsIncentivesProps {
  onBack: () => void;
}

interface SmartReward {
  id: string;
  employee_id: string;
  employee_name: string;
  department: string;
  position: string;
  reward_type: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  reason: string;
  ai_score: number;
  eligibility_factors: {
    performance: number;
    attendance: number;
    projects: number;
    behavior: number;
  };
  created_at: string;
  performance_period_start: string;
  performance_period_end: string;
}

interface AIRecommendation {
  employee_id: string;
  employee_name: string;
  recommendation_type: string;
  priority: 'high' | 'medium' | 'low';
  suggested_amount: number;
  reasoning: string;
  confidence_score: number;
}

export const ComprehensiveRewardsIncentives: React.FC<ComprehensiveRewardsIncentivesProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';
  const { 
    isCalculating, 
    eligibilityResults, 
    calculateAllEligibility, 
    calculateAttendanceEligibility, 
    calculatePerformanceEligibility 
  } = useEligibilityCalculation();

  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [smartRewards, setSmartRewards] = useState<SmartReward[]>([]);
  const [aiRecommendations, setAIRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Dialog states
  const [newRewardDialog, setNewRewardDialog] = useState(false);
  const [aiAnalysisDialog, setAIAnalysisDialog] = useState(false);
  const [eligibilityDialog, setEligibilityDialog] = useState(false);

  // Form states
  const [newReward, setNewReward] = useState({
    employee_id: '',
    reward_type: 'performance_bonus' as const,
    amount: 0,
    reason: '',
    performance_period_start: '',
    performance_period_end: ''
  });

  const [analysisType, setAnalysisType] = useState('eligibility');
  const [aiAnalysis, setAIAnalysis] = useState<string>('');

  // Mock data for demonstration
  useEffect(() => {
    const mockSmartRewards: SmartReward[] = [
      {
        id: '1',
        employee_id: 'emp_1',
        employee_name: 'أحمد محمد العلي',
        department: 'تقنية المعلومات',
        position: 'مطور برمجيات أول',
        reward_type: 'performance_bonus',
        amount: 8000,
        status: 'approved',
        reason: 'تفوق في مشروع تطوير النظام الجديد',
        ai_score: 92,
        eligibility_factors: {
          performance: 95,
          attendance: 88,
          projects: 94,
          behavior: 90
        },
        created_at: '2024-01-15T10:30:00Z',
        performance_period_start: '2024-01-01',
        performance_period_end: '2024-01-31'
      },
      {
        id: '2',
        employee_id: 'emp_2',
        employee_name: 'فاطمة أحمد السالم',
        department: 'المبيعات',
        position: 'مديرة مبيعات',
        reward_type: 'achievement_bonus',
        amount: 6500,
        status: 'pending',
        reason: 'تحقيق 120% من أهداف المبيعات',
        ai_score: 88,
        eligibility_factors: {
          performance: 92,
          attendance: 95,
          projects: 85,
          behavior: 88
        },
        created_at: '2024-01-20T14:15:00Z',
        performance_period_start: '2024-01-01',
        performance_period_end: '2024-01-31'
      },
      {
        id: '3',
        employee_id: 'emp_3',
        employee_name: 'خالد عبدالله المطيري',
        department: 'التسويق',
        position: 'أخصائي تسويق رقمي',
        reward_type: 'innovation_bonus',
        amount: 4500,
        status: 'paid',
        reason: 'ابتكار استراتيجية تسويقية جديدة',
        ai_score: 85,
        eligibility_factors: {
          performance: 88,
          attendance: 92,
          projects: 80,
          behavior: 85
        },
        created_at: '2024-01-10T09:45:00Z',
        performance_period_start: '2023-12-01',
        performance_period_end: '2023-12-31'
      }
    ];

    const mockAIRecommendations: AIRecommendation[] = [
      {
        employee_id: 'emp_4',
        employee_name: 'سارة محمد الأحمد',
        recommendation_type: 'quarterly_excellence',
        priority: 'high',
        suggested_amount: 7500,
        reasoning: 'تفوق مستمر في الأداء مع حضور مثالي ومساهمة فعالة في المشاريع',
        confidence_score: 94
      },
      {
        employee_id: 'emp_5',
        employee_name: 'عمر سعد البراك',
        recommendation_type: 'team_leadership',
        priority: 'medium',
        suggested_amount: 5000,
        reasoning: 'قيادة فريق بنجاح وتحقيق أهداف المشروع في الوقت المحدد',
        confidence_score: 87
      }
    ];

    setSmartRewards(mockSmartRewards);
    setAIRecommendations(mockAIRecommendations);
  }, []);

  // Analytics data
  const rewardsAnalytics = [
    { month: 'يناير', totalRewards: 145000, performance: 95000, achievement: 30000, innovation: 20000 },
    { month: 'فبراير', totalRewards: 132000, performance: 85000, achievement: 27000, innovation: 20000 },
    { month: 'مارس', totalRewards: 158000, performance: 108000, achievement: 32000, innovation: 18000 },
    { month: 'أبريل', totalRewards: 142000, performance: 92000, achievement: 30000, innovation: 20000 },
    { month: 'مايو', totalRewards: 165000, performance: 115000, achievement: 35000, innovation: 15000 },
    { month: 'يونيو', totalRewards: 178000, performance: 125000, achievement: 38000, innovation: 15000 }
  ];

  const performanceMetrics = [
    { name: 'الأداء العام', value: 88, target: 85, color: '#009F87' },
    { name: 'الحضور والانتظام', value: 92, target: 90, color: '#1e40af' },
    { name: 'إنجاز المشاريع', value: 85, target: 80, color: '#f59e0b' },
    { name: 'السلوك المهني', value: 90, target: 85, color: '#10b981' }
  ];

  const departmentRewards = [
    { department: 'تقنية المعلومات', rewards: 28, amount: 420000, avgReward: 15000, efficiency: 94 },
    { department: 'المبيعات', rewards: 22, amount: 330000, avgReward: 15000, efficiency: 88 },
    { department: 'التسويق', rewards: 18, amount: 270000, avgReward: 15000, efficiency: 85 },
    { department: 'المالية', rewards: 15, amount: 225000, avgReward: 15000, efficiency: 90 },
    { department: 'الموارد البشرية', rewards: 12, amount: 180000, avgReward: 15000, efficiency: 87 }
  ];

  const BOUD_COLORS = ['#009F87', '#1e40af', '#f59e0b', '#10b981', '#8b5cf6'];

  // AI Analysis function
  const runAIAnalysis = async (employeeId: string, type: string) => {
    if (!employeeId) {
      toast({
        title: 'خطأ',
        description: 'يرجى اختيار موظف أولاً',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('comprehensive-rewards-ai', {
        body: {
          employeeId,
          analysisType: type,
          timeframe: '90_days'
        }
      });

      if (error) throw error;

      setAIAnalysis(data.analysis);
      setAIAnalysisDialog(true);
      
      toast({
        title: 'تم إجراء التحليل بنجاح',
        description: 'تم إنشاء تحليل ذكي للمكافآت'
      });

    } catch (error) {
      console.error('Error running AI analysis:', error);
      toast({
        title: 'خطأ في التحليل',
        description: 'حدث خطأ أثناء إجراء التحليل الذكي',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'paid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'approved': 'معتمد',
      'pending': 'معلق',
      'paid': 'مدفوع',
      'rejected': 'مرفوض'
    };
    return statusMap[status] || status;
  };

  const getRewardTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'performance_bonus': 'مكافأة أداء',
      'achievement_bonus': 'مكافأة إنجاز',
      'innovation_bonus': 'مكافأة ابتكار',
      'attendance_bonus': 'مكافأة حضور',
      'team_bonus': 'مكافأة جماعية',
      'quarterly_excellence': 'تميز ربع سنوي',
      'team_leadership': 'قيادة الفريق'
    };
    return typeMap[type] || type;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">نظام إدارة المكافآت والحوافز الذكي</h1>
          <p className="text-muted-foreground">نظام ذكي متطور لإدارة المكافآت والحوافز مع نظام النقاط والتكامل مع المتاجر الخارجية</p>
        </div>

        {/* Main Content */}
        <div className="rounded-xl border border-border p-6 bg-card">

        {/* AI-Powered Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Enhanced Metrics Cards with AI Insights */}
          <Card className="bg-gradient-to-br from-primary to-primary-glow text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">المكافآت الذكية</p>
                  <p className="text-3xl font-bold">{smartRewards.length}</p>
                  <p className="text-green-200 text-xs mt-1">
                    <TrendingUp className="h-3 w-3 inline ml-1" />
                    +18% بالذكاء الاصطناعي
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Brain className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">توصيات AI</p>
                  <p className="text-3xl font-bold">{aiRecommendations.length}</p>
                  <p className="text-blue-200 text-xs mt-1">
                    <Lightbulb className="h-3 w-3 inline ml-1" />
                    جاهزة للمراجعة
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Sparkles className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">دقة النظام</p>
                  <p className="text-3xl font-bold">94%</p>
                  <p className="text-purple-200 text-xs mt-1">
                    <Target className="h-3 w-3 inline ml-1" />
                    معدل الدقة
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Gauge className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">الأداء العام</p>
                  <p className="text-3xl font-bold">88%</p>
                  <p className="text-orange-200 text-xs mt-1">
                    <BarChart3 className="h-3 w-3 inline ml-1" />
                    متوسط الفريق
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Users className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">التوفير بـ AI</p>
                  <p className="text-3xl font-bold">32%</p>
                  <p className="text-green-200 text-xs mt-1">
                    <Shield className="h-3 w-3 inline ml-1" />
                    كفاءة التوزيع
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Activity className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8 h-12 bg-white/50 backdrop-blur-sm border shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-sm font-medium">
              <BarChart3 className="h-4 w-4" />
              لوحة القيادة
            </TabsTrigger>
            <TabsTrigger value="rewards-types" className="flex items-center gap-2 text-sm font-medium">
              <Gift className="h-4 w-4" />
              أنواع المكافآت
            </TabsTrigger>
            <TabsTrigger value="loyalty-points" className="flex items-center gap-2 text-sm font-medium">
              <Crown className="h-4 w-4" />
              نظام النقاط
            </TabsTrigger>
            <TabsTrigger value="points-store" className="flex items-center gap-2 text-sm font-medium">
              <Smartphone className="h-4 w-4" />
              متجر النقاط
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex items-center gap-2 text-sm font-medium">
              <Layers className="h-4 w-4" />
              إدارة البرامج
            </TabsTrigger>
            <TabsTrigger value="disbursement" className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="h-4 w-4" />
              الصرف المالي
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 text-sm font-medium">
              <PieChart className="h-4 w-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 text-sm font-medium">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Performance Overview Chart */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    <LineChart className="h-5 w-5 text-primary" />
                    تطور المكافآت والنقاط الشهرية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={rewardsAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        tickFormatter={(value) => `${value.toLocaleString()}`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        formatter={(value: any, name: any) => [`${value.toLocaleString()} ريال`, name]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="totalRewards" 
                        stroke="#009F87" 
                        fill="url(#colorTotalRewards)" 
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="colorTotalRewards" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#009F87" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#009F87" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gamification Leaderboard */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-yellow-100">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    لوحة الشرف - أعلى الموظفين نقاطاً
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'أحمد محمد العلي', points: 2850, department: 'تقنية المعلومات', rank: 1 },
                    { name: 'فاطمة أحمد السالم', points: 2640, department: 'المبيعات', rank: 2 },
                    { name: 'خالد عبدالله المطيري', points: 2420, department: 'التسويق', rank: 3 },
                    { name: 'سارة محمد الأحمد', points: 2180, department: 'الموارد البشرية', rank: 4 },
                    { name: 'عمر سعد البراك', points: 1950, department: 'المالية', rank: 5 }
                  ].map((employee, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        employee.rank === 1 ? 'bg-yellow-500 text-white' :
                        employee.rank === 2 ? 'bg-gray-400 text-white' :
                        employee.rank === 3 ? 'bg-amber-600 text-white' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {employee.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{employee.name}</p>
                        <p className="text-xs text-gray-600">{employee.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">{employee.points.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">نقطة</p>
                      </div>
                      {employee.rank <= 3 && (
                        <Crown className={`h-4 w-4 ${
                          employee.rank === 1 ? 'text-yellow-500' :
                          employee.rank === 2 ? 'text-gray-400' :
                          'text-amber-600'
                        }`} />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">المكافآت المصروفة</p>
                      <p className="text-2xl font-bold">142</p>
                      <p className="text-green-200 text-xs mt-1">هذا الشهر</p>
                    </div>
                    <Gift className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">النقاط الموزعة</p>
                      <p className="text-2xl font-bold">28,450</p>
                      <p className="text-blue-200 text-xs mt-1">نقطة ولاء</p>
                    </div>
                    <Coins className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white border-0 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100 text-sm">أعلى الموظفين</p>
                      <p className="text-xl font-bold">أحمد العلي</p>
                      <p className="text-yellow-200 text-xs mt-1">2,850 نقطة</p>
                    </div>
                    <Medal className="h-8 w-8 text-yellow-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">التكلفة الشهرية</p>
                      <p className="text-2xl font-bold">185K</p>
                      <p className="text-purple-200 text-xs mt-1">ريال سعودي</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm">المتاجر المتكاملة</p>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-red-200 text-xs mt-1">متجر خارجي</p>
                    </div>
                    <Smartphone className="h-8 w-8 text-red-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rewards Types Tab */}
          <TabsContent value="rewards-types" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">أنواع المكافآت والحوافز</h3>
                <p className="text-gray-600">إدارة شاملة لجميع أنواع المكافآت المالية وغير المالية</p>
              </div>
              <Button onClick={() => setNewRewardDialog(true)}>
                <Plus className="h-4 w-4 ml-2" />
                نوع مكافأة جديد
              </Button>
            </div>

            {/* Reward Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'مكافآت الأداء',
                  description: 'مكافآت مبنية على تقييم الأداء السنوي',
                  icon: <Target className="h-6 w-6" />,
                  color: 'from-blue-500 to-blue-600',
                  count: 45,
                  amount: '225,000 ريال'
                },
                {
                  title: 'مكافآت الانضباط',
                  description: 'مكافآت للحضور والانتظام المثالي',
                  icon: <Clock4 className="h-6 w-6" />,
                  color: 'from-green-500 to-green-600',
                  count: 28,
                  amount: '84,000 ريال'
                },
                {
                  title: 'مكافآت المبيعات',
                  description: 'عمولات وحوافز تحقيق أهداف المبيعات',
                  icon: <TrendingUp className="h-6 w-6" />,
                  color: 'from-purple-500 to-purple-600',
                  count: 32,
                  amount: '160,000 ريال'
                },
                {
                  title: 'مكافآت الابتكار',
                  description: 'تقدير الأفكار والحلول الإبداعية',
                  icon: <Lightbulb className="h-6 w-6" />,
                  color: 'from-orange-500 to-orange-600',
                  count: 15,
                  amount: '75,000 ريال'
                },
                {
                  title: 'المكافآت الفورية',
                  description: 'مكافآت سريعة للإنجازات المميزة',
                  icon: <Zap className="h-6 w-6" />,
                  color: 'from-red-500 to-red-600',
                  count: 22,
                  amount: '55,000 ريال'
                },
                {
                  title: 'الحوافز غير المالية',
                  description: 'شهادات تقدير وقسائم ومزايا أخرى',
                  icon: <Heart className="h-6 w-6" />,
                  color: 'from-pink-500 to-pink-600',
                  count: 67,
                  amount: 'غير مالية'
                }
              ].map((type, index) => (
                <Card key={index} className={`border-0 shadow-lg bg-gradient-to-br ${type.color} text-white cursor-pointer hover:shadow-xl transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        {type.icon}
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30">
                        {type.count} مكافأة
                      </Badge>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{type.title}</h4>
                    <p className="text-white/90 text-sm mb-4">{type.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{type.amount}</span>
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Loyalty Points System Tab */}
          <TabsContent value="loyalty-points" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">نظام نقاط الولاء (Gamification)</h3>
                <p className="text-gray-600">نظام تفاعلي لتحفيز الموظفين من خلال النقاط والإنجازات</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير النقاط
                </Button>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة نقاط
                </Button>
              </div>
            </div>

            {/* Points Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Coins className="h-8 w-8" />
                    <div>
                      <p className="text-yellow-100 text-sm">إجمالي النقاط</p>
                      <p className="text-2xl font-bold">156,420</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users2 className="h-8 w-8" />
                    <div>
                      <p className="text-green-100 text-sm">الموظفون النشطون</p>
                      <p className="text-2xl font-bold">248</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8" />
                    <div>
                      <p className="text-blue-100 text-sm">متوسط النقاط</p>
                      <p className="text-2xl font-bold">630</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Flame className="h-8 w-8" />
                    <div>
                      <p className="text-purple-100 text-sm">أعلى المحققين</p>
                      <p className="text-xl font-bold">أحمد العلي</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Points Rules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    قواعد كسب النقاط
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: 'الحضور في الوقت المحدد', points: 10, icon: <Clock4 className="h-4 w-4 text-green-500" /> },
                    { action: 'تحقيق KPI شهري', points: 100, icon: <Target className="h-4 w-4 text-blue-500" /> },
                    { action: 'إنجاز مشروع قبل الموعد', points: 200, icon: <CheckCircle className="h-4 w-4 text-purple-500" /> },
                    { action: 'المشاركة بأفكار تطويرية', points: 50, icon: <Lightbulb className="h-4 w-4 text-orange-500" /> },
                    { action: 'مساعدة الزملاء', points: 25, icon: <Heart className="h-4 w-4 text-pink-500" /> },
                    { action: 'التدريب والتطوير', points: 75, icon: <BookOpen className="h-4 w-4 text-indigo-500" /> }
                  ].map((rule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {rule.icon}
                        <span className="font-medium">{rule.action}</span>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        +{rule.points} نقطة
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Department Competition */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    منافسة الأقسام
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { department: 'تقنية المعلومات', points: 4250, employees: 28, avgPoints: 152, rank: 1 },
                    { department: 'المبيعات', points: 3890, employees: 22, avgPoints: 177, rank: 2 },
                    { department: 'التسويق', points: 3640, employees: 18, avgPoints: 202, rank: 3 },
                    { department: 'الموارد البشرية', points: 2980, employees: 15, avgPoints: 199, rank: 4 },
                    { department: 'المالية', points: 2750, employees: 12, avgPoints: 229, rank: 5 }
                  ].map((dept, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        dept.rank === 1 ? 'bg-yellow-500 text-white' :
                        dept.rank === 2 ? 'bg-gray-400 text-white' :
                        dept.rank === 3 ? 'bg-amber-600 text-white' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {dept.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{dept.department}</p>
                        <p className="text-xs text-gray-600">{dept.employees} موظف • متوسط {dept.avgPoints} نقطة</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{dept.points.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">نقطة</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Points Store Tab */}
          <TabsContent value="points-store" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">متجر النقاط والتكامل مع المتاجر الخارجية</h3>
                <p className="text-gray-600">استبدال النقاط بمكافآت داخلية أو قسائم من متاجر خارجية</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Settings className="h-4 w-4 ml-2" />
                  إدارة المتاجر
                </Button>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة منتج
                </Button>
              </div>
            </div>

            {/* External Stores Integration */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Globe className="h-5 w-5" />
                  المتاجر الخارجية المتكاملة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {[
                    { name: 'Amazon', logo: '🛒', status: 'active', conversion: '1 نقطة = 0.1 ريال' },
                    { name: 'Noon', logo: '🌙', status: 'active', conversion: '1 نقطة = 0.08 ريال' },
                    { name: 'Jarir', logo: '📚', status: 'active', conversion: '1 نقطة = 0.12 ريال' },
                    { name: 'STC Pay', logo: '💳', status: 'active', conversion: '1 نقطة = 0.1 ريال' },
                    { name: 'Extra', logo: '🛍️', status: 'pending', conversion: 'قريباً' },
                    { name: 'Carrefour', logo: '🛒', status: 'active', conversion: '1 نقطة = 0.09 ريال' },
                    { name: 'IKEA', logo: '🏠', status: 'pending', conversion: 'قريباً' },
                    { name: 'H&M', logo: '👕', status: 'active', conversion: '1 نقطة = 0.11 ريال' }
                  ].map((store, index) => (
                    <Card key={index} className={`text-center p-4 ${store.status === 'active' ? 'bg-white border-green-200' : 'bg-gray-50 border-gray-200'} cursor-pointer hover:shadow-md transition-shadow`}>
                      <div className="text-3xl mb-2">{store.logo}</div>
                      <h4 className="font-semibold text-sm mb-1">{store.name}</h4>
                      <Badge variant={store.status === 'active' ? 'default' : 'secondary'} className="text-xs mb-2">
                        {store.status === 'active' ? 'نشط' : 'قريباً'}
                      </Badge>
                      <p className="text-xs text-gray-600">{store.conversion}</p>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Store Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Internal Rewards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-green-600" />
                    المكافآت الداخلية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { item: 'إجازة إضافية يوم واحد', points: 500, icon: <CalendarDays className="h-4 w-4 text-blue-500" /> },
                    { item: 'قسيمة طعام 50 ريال', points: 250, icon: <Gift className="h-4 w-4 text-orange-500" /> },
                    { item: 'بطاقة شكر رسمية', points: 100, icon: <Star className="h-4 w-4 text-yellow-500" /> },
                    { item: 'موقف سيارة مميز لشهر', points: 300, icon: <MapPin className="h-4 w-4 text-purple-500" /> },
                    { item: 'تدريب مجاني', points: 800, icon: <BookOpen className="h-4 w-4 text-green-500" /> }
                  ].map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        {reward.icon}
                        <span className="font-medium text-sm">{reward.item}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {reward.points} نقطة
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Amazon Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-orange-600">🛒</span>
                    Amazon
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { item: 'قسيمة Amazon 100 ريال', points: 1000, category: 'قسيمة رقمية' },
                    { item: 'سماعات لاسلكية', points: 800, category: 'إلكترونيات' },
                    { item: 'كتب متنوعة', points: 300, category: 'كتب ومراجع' },
                    { item: 'اكسسوارات مكتبية', points: 200, category: 'مكتب ومنزل' },
                    { item: 'ملابس رياضية', points: 600, category: 'رياضة وترفيه' }
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
                      <div>
                        <p className="font-medium text-sm">{product.item}</p>
                        <p className="text-xs text-gray-600">{product.category}</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        {product.points} نقطة
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Exchanges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    الأكثر استبدالاً
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { item: 'قسائم STC Pay', exchanges: 156, trend: '+23%' },
                    { item: 'إجازات إضافية', exchanges: 142, trend: '+18%' },
                    { item: 'قسائم Noon', exchanges: 98, trend: '+12%' },
                    { item: 'كتب من Jarir', exchanges: 67, trend: '+8%' },
                    { item: 'منتجات Amazon', exchanges: 45, trend: '+5%' }
                  ].map((popular, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{popular.item}</p>
                        <p className="text-xs text-gray-600">{popular.exchanges} استبدال</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        {popular.trend}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Programs Management Tab */}
          <TabsContent value="programs" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">إدارة برامج المكافآت والحوافز</h3>
                <p className="text-gray-600">إنشاء وإدارة البرامج التحفيزية مع تحديد الميزانية والمعايير</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                برنامج جديد
              </Button>
            </div>

            {/* Programs Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Layers className="h-8 w-8" />
                    <div>
                      <p className="text-emerald-100 text-sm">البرامج النشطة</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8" />
                    <div>
                      <p className="text-blue-100 text-sm">إجمالي الميزانية</p>
                      <p className="text-2xl font-bold">2.5M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Activity className="h-8 w-8" />
                    <div>
                      <p className="text-orange-100 text-sm">المصروف الحالي</p>
                      <p className="text-2xl font-bold">1.2M</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8" />
                    <div>
                      <p className="text-purple-100 text-sm">المستفيدون</p>
                      <p className="text-2xl font-bold">248</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Programs Table */}
            <Card>
              <CardHeader>
                <CardTitle>البرامج الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">اسم البرنامج</TableHead>
                      <TableHead className="text-center">النوع</TableHead>
                      <TableHead className="text-center">الميزانية</TableHead>
                      <TableHead className="text-center">المصروف</TableHead>
                      <TableHead className="text-center">المستفيدون</TableHead>
                      <TableHead className="text-center">الحالة</TableHead>
                      <TableHead className="text-center">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'برنامج التميز الشهري', type: 'شهري', budget: 500000, spent: 320000, beneficiaries: 45, status: 'active' },
                      { name: 'حوافز المبيعات الربعية', type: 'ربع سنوي', budget: 800000, spent: 560000, beneficiaries: 22, status: 'active' },
                      { name: 'مكافآت الابتكار السنوية', type: 'سنوي', budget: 300000, spent: 125000, beneficiaries: 15, status: 'active' },
                      { name: 'برنامج الحضور المثالي', type: 'شهري', budget: 200000, spent: 180000, beneficiaries: 89, status: 'ending' },
                      { name: 'مكافآت إنجاز المشاريع', type: 'حسب المشروع', budget: 600000, spent: 240000, beneficiaries: 34, status: 'active' }
                    ].map((program, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{program.name}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{program.type}</Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                          {program.budget.toLocaleString()} ريال
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-sm font-medium">{program.spent.toLocaleString()} ريال</span>
                            <Progress value={(program.spent / program.budget) * 100} className="w-16 h-1" />
                            <span className="text-xs text-gray-500">
                              {Math.round((program.spent / program.budget) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-blue-100 text-blue-800">
                            {program.beneficiaries} موظف
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={program.status === 'active' ? 'default' : program.status === 'ending' ? 'destructive' : 'secondary'}>
                            {program.status === 'active' ? 'نشط' : program.status === 'ending' ? 'قارب على الانتهاء' : 'معلق'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex gap-1 justify-center">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3" />
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

          {/* Disbursement Tab */}
          <TabsContent value="disbursement" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">الصرف المالي والربط مع نظام الرواتب</h3>
                <p className="text-gray-600">إدارة صرف المكافآت وربطها مع كشوف الرواتب</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4 ml-2" />
                  تحميل ملف البنك
                </Button>
                <Button>
                  <Send className="h-4 w-4 ml-2" />
                  إرسال للصرف
                </Button>
              </div>
            </div>

            {/* Payroll Integration Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8" />
                    <div>
                      <p className="text-green-100 text-sm">جاهز للصرف</p>
                      <p className="text-2xl font-bold">45</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8" />
                    <div>
                      <p className="text-yellow-100 text-sm">قيد المراجعة</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Send className="h-8 w-8" />
                    <div>
                      <p className="text-blue-100 text-sm">تم الصرف</p>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8" />
                    <div>
                      <p className="text-purple-100 text-sm">إجمالي المبلغ</p>
                      <p className="text-2xl font-bold">485K</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Disbursement Queue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileBarChart className="h-5 w-5 text-primary" />
                  قائمة الصرف الحالية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الموظف</TableHead>
                      <TableHead className="text-center">نوع المكافأة</TableHead>
                      <TableHead className="text-center">المبلغ</TableHead>
                      <TableHead className="text-center">تاريخ الاستحقاق</TableHead>
                      <TableHead className="text-center">حالة الربط مع الراتب</TableHead>
                      <TableHead className="text-center">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { employee: 'أحمد محمد العلي', type: 'مكافأة أداء', amount: 8000, date: '2024-02-01', status: 'linked', payrollPeriod: 'فبراير 2024' },
                      { employee: 'فاطمة أحمد السالم', type: 'مكافأة مبيعات', amount: 6500, date: '2024-02-01', status: 'pending', payrollPeriod: '' },
                      { employee: 'خالد عبدالله المطيري', type: 'مكافأة ابتكار', amount: 4500, date: '2024-01-25', status: 'paid', payrollPeriod: 'يناير 2024' },
                      { employee: 'سارة محمد الأحمد', type: 'مكافأة حضور', amount: 2000, date: '2024-02-01', status: 'linked', payrollPeriod: 'فبراير 2024' },
                      { employee: 'عمر سعد البراك', type: 'مكافأة قيادة', amount: 5000, date: '2024-01-30', status: 'review', payrollPeriod: '' }
                    ].map((disbursement, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{disbursement.employee}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{disbursement.type}</Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-green-600">
                          {disbursement.amount.toLocaleString()} ريال
                        </TableCell>
                        <TableCell className="text-center">{disbursement.date}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={
                            disbursement.status === 'linked' ? 'default' :
                            disbursement.status === 'paid' ? 'secondary' :
                            disbursement.status === 'pending' ? 'outline' : 'destructive'
                          }>
                            {disbursement.status === 'linked' ? 'مربوط بالراتب' :
                             disbursement.status === 'paid' ? 'تم الدفع' :
                             disbursement.status === 'pending' ? 'معلق' : 'قيد المراجعة'}
                          </Badge>
                          {disbursement.payrollPeriod && (
                            <p className="text-xs text-gray-500 mt-1">{disbursement.payrollPeriod}</p>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex gap-1 justify-center">
                            {disbursement.status === 'pending' && (
                              <Button size="sm" variant="outline">
                                <Send className="h-3 w-3 ml-1" />
                                ربط
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">التقارير والتحليلات الذكية</h3>
                <p className="text-gray-600">تحليلات شاملة لأداء نظام المكافآت والحوافز</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير Excel
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 ml-2" />
                  تصدير PDF
                </Button>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">إجمالي المكافآت</p>
                      <p className="text-2xl font-bold">2,450,000</p>
                      <p className="text-green-200 text-xs">ريال سعودي</p>
                    </div>
                    <Gift className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">النقاط الموزعة</p>
                      <p className="text-2xl font-bold">156,420</p>
                      <p className="text-blue-200 text-xs">نقطة ولاء</p>
                    </div>
                    <Coins className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">أكثر المتاجر</p>
                      <p className="text-xl font-bold">Amazon</p>
                      <p className="text-purple-200 text-xs">45% من الاستبدال</p>
                    </div>
                    <Smartphone className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">تأثير على الولاء</p>
                      <p className="text-2xl font-bold">+32%</p>
                      <p className="text-orange-200 text-xs">تحسن الأداء</p>
                    </div>
                    <Heart className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>توزيع المكافآت حسب النوع</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: 'مكافآت الأداء', value: 45, fill: '#10B981' },
                          { name: 'مكافآت المبيعات', value: 25, fill: '#3B82F6' },
                          { name: 'مكافآت الابتكار', value: 15, fill: '#8B5CF6' },
                          { name: 'مكافآت الحضور', value: 10, fill: '#F59E0B' },
                          { name: 'أخرى', value: 5, fill: '#EF4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      />
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>اللغات الأكثر استخداماً في الترجمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { language: 'العربية', percentage: 65, count: '1,245 مكافأة' },
                      { language: 'الإنجليزية', percentage: 25, count: '480 مكافأة' },
                      { language: 'الهندية', percentage: 5, count: '96 مكافأة' },
                      { language: 'الأوردو', percentage: 3, count: '58 مكافأة' },
                      { language: 'الفلبينية', percentage: 2, count: '38 مكافأة' }
                    ].map((lang, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{lang.language}</span>
                          <div className="text-right">
                            <span className="text-sm font-semibold">{lang.percentage}%</span>
                            <p className="text-xs text-gray-500">{lang.count}</p>
                          </div>
                        </div>
                        <Progress value={lang.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics Table */}
            <Card>
              <CardHeader>
                <CardTitle>تحليل مستوى التفاعل لكل قسم</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">القسم</TableHead>
                      <TableHead className="text-center">عدد الموظفين</TableHead>
                      <TableHead className="text-center">المكافآت المستلمة</TableHead>
                      <TableHead className="text-center">النقاط المكتسبة</TableHead>
                      <TableHead className="text-center">معدل التفاعل</TableHead>
                      <TableHead className="text-center">تحسن الأداء</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { department: 'تقنية المعلومات', employees: 28, rewards: 45, points: 4250, engagement: 94, improvement: '+18%' },
                      { department: 'المبيعات', employees: 22, rewards: 38, points: 3890, engagement: 89, improvement: '+25%' },
                      { department: 'التسويق', employees: 18, rewards: 28, points: 3640, engagement: 85, improvement: '+15%' },
                      { department: 'الموارد البشرية', employees: 15, rewards: 22, points: 2980, engagement: 88, improvement: '+12%' },
                      { department: 'المالية', employees: 12, rewards: 18, points: 2750, engagement: 91, improvement: '+20%' }
                    ].map((dept, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{dept.department}</TableCell>
                        <TableCell className="text-center">{dept.employees}</TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-green-100 text-green-800">
                            {dept.rewards}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold text-primary">
                          {dept.points.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Progress value={dept.engagement} className="w-16 h-2" />
                            <span className="text-sm font-medium">{dept.engagement}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-blue-100 text-blue-800">
                            {dept.improvement}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">إعدادات النظام والتكامل</h3>
                <p className="text-gray-600">إدارة إعدادات النظام والتكامل مع الأنظمة الأخرى</p>
              </div>
              <Button>
                <Save className="h-4 w-4 ml-2" />
                حفظ الإعدادات
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    الإعدادات العامة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">العملة الأساسية</Label>
                    <Select defaultValue="SAR">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العملة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                        <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                        <SelectItem value="EUR">يورو (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fiscal-year">السنة المالية</Label>
                    <Select defaultValue="2024">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر السنة المالية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-frequency">تكرار الإشعارات</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التكرار" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">فوري</SelectItem>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Integration Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    إعدادات التكامل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">نظام تقييم الأداء</p>
                      <p className="text-sm text-gray-600">ربط تلقائي مع النتائج</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">متصل</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">نظام الحضور والانصراف</p>
                      <p className="text-sm text-gray-600">نقاط للمواظبة</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">متصل</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">نظام الرواتب</p>
                      <p className="text-sm text-gray-600">إضافة مباشرة للكشف</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">متصل</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium">التواصل الداخلي</p>
                      <p className="text-sm text-gray-600">إشعارات الحوافز</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">قيد الإعداد</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* AI Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    إعدادات الذكاء الاصطناعي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>مستوى التحليل الذكي</Label>
                    <Select defaultValue="advanced">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">أساسي</SelectItem>
                        <SelectItem value="advanced">متقدم</SelectItem>
                        <SelectItem value="expert">خبير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>عتبة الثقة للتوصيات</Label>
                    <div className="px-3 py-2 bg-gray-50 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">85%</span>
                        <span className="text-sm text-gray-500">دقة عالية</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>تحديث التحليلات</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                        <SelectItem value="monthly">شهري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* External Stores API */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    APIs المتاجر الخارجية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { store: 'Amazon', status: 'connected', lastSync: '2024-01-15 10:30' },
                    { store: 'Noon', status: 'connected', lastSync: '2024-01-15 09:15' },
                    { store: 'Jarir', status: 'connected', lastSync: '2024-01-15 08:45' },
                    { store: 'STC Pay', status: 'error', lastSync: '2024-01-14 16:20' }
                  ].map((api, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{api.store}</p>
                        <p className="text-sm text-gray-600">آخر مزامنة: {api.lastSync}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={api.status === 'connected' ? 'default' : 'destructive'}>
                          {api.status === 'connected' ? 'متصل' : 'خطأ'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
};