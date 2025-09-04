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
  Smartphone, Calendar as CalendarDays, MapPin, Clock4, Users2
} from 'lucide-react';
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
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header with AI Branding */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-glow to-secondary p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30"></div>
          <div className="absolute inset-0 bg-white/5 opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  رجوع
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                  onClick={calculateAllEligibility}
                  disabled={isCalculating}
                >
                  <Calculator className="h-4 w-4 ml-2" />
                  {isCalculating ? 'جاري الحساب...' : 'حساب الأهلية'}
                </Button>
                <Button className="bg-primary/80 border-primary/30 text-white hover:bg-primary/90 backdrop-blur-sm">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير التقرير
                </Button>
                <Button className="bg-red-600/80 border-red-600/30 text-white hover:bg-red-600/90 backdrop-blur-sm">
                  <Settings className="h-4 w-4 ml-2" />
                  إعدادات النظام
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام إدارة المكافآت والحوافز الذكي
              </h1>
              <p className="text-white/90 text-lg max-w-3xl mx-auto">
                نظام ذكي متطور لإدارة المكافآت والحوافز مع الذكاء الاصطناعي وربط شامل بأنظمة الأداء والحضور والمشاريع
              </p>
            </div>
          </div>
        </div>

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
                  <Trophy className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">التوفير المحقق</p>
                  <p className="text-3xl font-bold">156K</p>
                  <p className="text-green-200 text-xs mt-1">
                    <DollarSign className="h-3 w-3 inline ml-1" />
                    ريال سعودي
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Coins className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-4">
            <TabsList className="grid w-full grid-cols-7 bg-gray-100/50 rounded-lg p-1">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <BarChart className="h-4 w-4 ml-2" />
                لوحة التحكم
              </TabsTrigger>
              <TabsTrigger value="smart-rewards" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Brain className="h-4 w-4 ml-2" />
                المكافآت الذكية
              </TabsTrigger>
              <TabsTrigger value="ai-recommendations" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Sparkles className="h-4 w-4 ml-2" />
                توصيات AI
              </TabsTrigger>
              <TabsTrigger value="performance-link" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Layers className="h-4 w-4 ml-2" />
                ربط الأنظمة
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <BarChart3 className="h-4 w-4 ml-2" />
                التحليلات
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <FileBarChart className="h-4 w-4 ml-2" />
                التقارير
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Settings className="h-4 w-4 ml-2" />
                الإعدادات
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Rewards Trend Chart */}
              <Card className="shadow-lg border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    اتجاهات المكافآت الشهرية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={rewardsAnalytics}>
                      <defs>
                        <linearGradient id="totalRewards" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#009F87" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#009F87" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="totalRewards" stroke="#009F87" fill="url(#totalRewards)" strokeWidth={2} />
                      <Area type="monotone" dataKey="performance" stroke="#1e40af" fill="#1e40af" fillOpacity={0.2} />
                      <Area type="monotone" dataKey="achievement" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Metrics Radial Chart */}
              <Card className="shadow-lg border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-primary" />
                    مؤشرات الأداء الرئيسية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={performanceMetrics}>
                      <RadialBar 
                        dataKey="value" 
                        cornerRadius={10} 
                        label={{ position: 'insideStart', fill: '#fff' }}
                      />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold" style={{color: metric.color}}>
                          {metric.value}%
                        </div>
                        <div className="text-sm text-gray-600">{metric.name}</div>
                        <div className="text-xs text-gray-400">الهدف: {metric.target}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department Performance Overview */}
            <Card className="shadow-lg border-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  أداء الأقسام والمكافآت
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {departmentRewards.map((dept, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-800 mb-2">{dept.department}</h3>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-primary">{dept.rewards}</div>
                          <div className="text-xs text-gray-600">مكافأة</div>
                          <div className="text-lg font-semibold text-green-600">{dept.amount.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">ريال</div>
                          <Progress value={dept.efficiency} className="w-full h-2" />
                          <div className="text-xs text-gray-500">كفاءة {dept.efficiency}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Rewards Tab */}
          <TabsContent value="smart-rewards" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">المكافآت الذكية المدعومة بالذكاء الاصطناعي</h2>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setNewRewardDialog(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة مكافأة جديدة
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => runAIAnalysis('all', 'recommendation')}
                  disabled={isLoading}
                >
                  <Brain className="h-4 w-4 ml-2" />
                  تحليل شامل للجميع
                </Button>
              </div>
            </div>

            <Card className="shadow-lg border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  قائمة المكافآت الذكية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الموظف</TableHead>
                      <TableHead>القسم</TableHead>
                      <TableHead>نوع المكافأة</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>درجة AI</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>العوامل</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {smartRewards.map((reward) => (
                      <TableRow key={reward.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold">{reward.employee_name}</div>
                            <div className="text-sm text-gray-600">{reward.position}</div>
                          </div>
                        </TableCell>
                        <TableCell>{reward.department}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">
                            {getRewardTypeText(reward.reward_type)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {reward.amount.toLocaleString()} ريال
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold text-primary">{reward.ai_score}%</div>
                            <div className="w-16 h-2 bg-gray-200 rounded">
                              <div 
                                className="h-full bg-primary rounded" 
                                style={{ width: `${reward.ai_score}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(reward.status)}>
                            {getStatusText(reward.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                              أداء {reward.eligibility_factors.performance}%
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              حضور {reward.eligibility_factors.attendance}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => runAIAnalysis(reward.employee_id, 'eligibility')}
                            >
                              <Brain className="h-3 w-3" />
                            </Button>
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

          {/* AI Recommendations Tab */}
          <TabsContent value="ai-recommendations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                التوصيات الذكية المدعومة بالذكاء الاصطناعي
              </h2>
              <Button 
                onClick={() => runAIAnalysis('all', 'recommendation')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={isLoading}
              >
                <Sparkles className="h-4 w-4 ml-2" />
                {isLoading ? 'جاري التحليل...' : 'إنشاء توصيات جديدة'}
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiRecommendations.map((rec, index) => (
                <Card key={index} className="shadow-lg border-l-4 border-l-primary bg-gradient-to-r from-white to-blue-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        {rec.employee_name}
                      </CardTitle>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority === 'high' ? 'عالي' : rec.priority === 'medium' ? 'متوسط' : 'منخفض'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">نوع التوصية</h4>
                      <p className="text-gray-700">{getRewardTypeText(rec.recommendation_type)}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">المبلغ المقترح</h4>
                      <p className="text-2xl font-bold text-green-600">{rec.suggested_amount.toLocaleString()} ريال</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-2">المبرر والتحليل</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{rec.reasoning}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">درجة الثقة: {rec.confidence_score}%</span>
                        <Progress value={rec.confidence_score} className="w-16 h-2" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="h-3 w-3" />
                          موافقة
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                          تفاصيل
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Link Tab */}
          <TabsContent value="performance-link" className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" />
              ربط أنظمة الأداء والحضور والمشاريع
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Performance System Integration */}
              <Card className="shadow-lg border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    نظام إدارة الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">تقييمات مكتملة</span>
                      <Badge className="bg-green-100 text-green-800">245</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">متوسط النقاط</span>
                      <Badge className="bg-blue-100 text-blue-800">88.5</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">مكافآت مرتبطة</span>
                      <Badge className="bg-purple-100 text-purple-800">156</Badge>
                    </div>
                  </div>
                  <Progress value={85} className="w-full" />
                  <p className="text-xs text-gray-600">معدل ربط المكافآت بالأداء: 85%</p>
                </CardContent>
              </Card>

              {/* Attendance System Integration */}
              <Card className="shadow-lg border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Clock4 className="h-5 w-5 text-green-600" />
                    نظام الحضور والانصراف
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">معدل الحضور</span>
                      <Badge className="bg-green-100 text-green-800">94.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">حضور مثالي</span>
                      <Badge className="bg-blue-100 text-blue-800">42 موظف</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">مكافآت حضور</span>
                      <Badge className="bg-purple-100 text-purple-800">28</Badge>
                    </div>
                  </div>
                  <Progress value={94} className="w-full" />
                  <p className="text-xs text-gray-600">مؤهلون لمكافأة الحضور: 68%</p>
                </CardContent>
              </Card>

              {/* Projects System Integration */}
              <Card className="shadow-lg border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                    نظام إدارة المشاريع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">مشاريع مكتملة</span>
                      <Badge className="bg-green-100 text-green-800">18</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">في الوقت المحدد</span>
                      <Badge className="bg-blue-100 text-blue-800">15</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">مكافآت مشاريع</span>
                      <Badge className="bg-purple-100 text-purple-800">24</Badge>
                    </div>
                  </div>
                  <Progress value={83} className="w-full" />
                  <p className="text-xs text-gray-600">معدل نجاح المشاريع: 83%</p>
                </CardContent>
              </Card>
            </div>

            {/* Integration Status */}
            <Card className="shadow-lg border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  حالة تكامل الأنظمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800">نظام الأداء</h3>
                    <p className="text-sm text-green-600">متصل بنجاح</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800">نظام الحضور</h3>
                    <p className="text-sm text-green-600">متصل بنجاح</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800">نظام المشاريع</h3>
                    <p className="text-sm text-green-600">متصل بنجاح</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800">الذكاء الاصطناعي</h3>
                    <p className="text-sm text-blue-600">نشط ومحدث</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              التحليلات المتقدمة والإحصائيات الذكية
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Rewards Distribution */}
              <Card className="shadow-lg border-primary/10">
                <CardHeader>
                  <CardTitle>توزيع المكافآت حسب النوع</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: 'مكافآت الأداء', value: 42, color: '#009F87' },
                          { name: 'مكافآت الإنجاز', value: 28, color: '#1e40af' },
                          { name: 'مكافآت الابتكار', value: 18, color: '#f59e0b' },
                          { name: 'مكافآت الحضور', value: 12, color: '#10b981' }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {BOUD_COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Monthly Trends */}
              <Card className="shadow-lg border-primary/10">
                <CardHeader>
                  <CardTitle>الاتجاهات الشهرية للمكافآت</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={rewardsAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="performance" fill="#009F87" name="أداء" />
                      <Bar dataKey="achievement" fill="#1e40af" name="إنجاز" />
                      <Bar dataKey="innovation" fill="#f59e0b" name="ابتكار" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold">التقارير الشاملة والتصدير</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg border-primary/10 hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    تقرير المكافآت الشهري
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">تقرير شامل بجميع المكافآت المصروفة خلال الشهر</p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-primary/10 hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    تقرير الأداء والمكافآت
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">ربط مؤشرات الأداء بالمكافآت المستحقة</p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل Excel
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-primary/10 hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    تقرير التوصيات الذكية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">تحليل ذكي للمكافآت المقترحة والتوصيات</p>
                  <Button className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل AI Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">إعدادات النظام المتقدمة</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-primary/10">
                <CardHeader>
                  <CardTitle>إعدادات الذكاء الاصطناعي</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>مستوى دقة التوصيات</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">عالي (90%+)</SelectItem>
                        <SelectItem value="medium">متوسط (75%+)</SelectItem>
                        <SelectItem value="low">منخفض (60%+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>تكرار التحليل التلقائي</Label>
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

              <Card className="shadow-lg border-primary/10">
                <CardHeader>
                  <CardTitle>إعدادات المكافآت</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>الحد الأدنى للمكافأة</Label>
                    <Input type="number" placeholder="1000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>الحد الأقصى للمكافأة</Label>
                    <Input type="number" placeholder="50000" />
                  </div>

                  <div className="space-y-2">
                    <Label>نسبة ربط الأداء</Label>
                    <Input type="number" placeholder="70" />
                    <p className="text-xs text-gray-600">النسبة المئوية لتأثير الأداء على المكافأة</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}

        {/* New Reward Dialog */}
        <Dialog open={newRewardDialog} onOpenChange={setNewRewardDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة مكافأة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الموظف</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الموظف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emp_1">أحمد محمد العلي</SelectItem>
                      <SelectItem value="emp_2">فاطمة أحمد السالم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>نوع المكافأة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance_bonus">مكافأة أداء</SelectItem>
                      <SelectItem value="achievement_bonus">مكافأة إنجاز</SelectItem>
                      <SelectItem value="innovation_bonus">مكافأة ابتكار</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>المبلغ (ريال سعودي)</Label>
                <Input type="number" placeholder="5000" />
              </div>
              
              <div className="space-y-2">
                <Label>سبب المكافأة</Label>
                <Textarea placeholder="أدخل سبب استحقاق المكافأة..." rows={3} />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setNewRewardDialog(false)}>
                  إلغاء
                </Button>
                <Button>
                  إضافة المكافأة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* AI Analysis Dialog */}
        <Dialog open={aiAnalysisDialog} onOpenChange={setAIAnalysisDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                التحليل الذكي للمكافآت
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {aiAnalysis && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-primary/20">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                    {aiAnalysis}
                  </pre>
                </div>
              )}
              <div className="flex justify-end">
                <Button onClick={() => setAIAnalysisDialog(false)}>
                  إغلاق
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};