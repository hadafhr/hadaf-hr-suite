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
  ChevronRight, Calendar as CalendarIcon, FileBarChart, Send, UserCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RewardsIncentivesManagementProps {
  onBack: () => void;
}

interface IncentiveProgram {
  id: string;
  program_name: string;
  program_code: string;
  program_type: string;
  description: string;
  reward_percentage: number;
  fixed_amount: number;
  frequency: string;
  is_active: boolean;
  target_metric: string;
  eligibility_criteria: any;
  start_date: string;
  end_date?: string;
}

interface EmployeeReward {
  id: string;
  reward_number: string;
  reward_type: string;
  amount: number;
  status: string;
  reason: string;
  employee_id: string;
  program_id: string;
  eligibility_score: number;
  performance_period_start: string;
  performance_period_end: string;
  created_at: string;
}

export const RewardsIncentivesManagement: React.FC<RewardsIncentivesManagementProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';

  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [programs, setPrograms] = useState<IncentiveProgram[]>([]);
  const [rewards, setRewards] = useState<EmployeeReward[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Dialog states
  const [newProgramDialog, setNewProgramDialog] = useState(false);
  const [newRewardDialog, setNewRewardDialog] = useState(false);
  const [eligibilityDialog, setEligibilityDialog] = useState(false);

  // Form states
  const [newProgram, setNewProgram] = useState({
    program_name: '',
    program_code: '',
    program_type: 'annual_bonus' as const,
    description: '',
    reward_percentage: 0,
    fixed_amount: 0,
    frequency: 'annual' as const,
    target_metric: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: ''
  });

  const [newReward, setNewReward] = useState({
    employee_id: '',
    program_id: '',
    reward_type: 'annual_bonus' as const,
    amount: 0,
    reason: '',
    performance_period_start: '',
    performance_period_end: ''
  });

  // Fetch data functions
  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('incentive_programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_rewards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRewards(data || []);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  useEffect(() => {
    fetchPrograms();
    fetchRewards();
  }, []);

  // Analytics data
  const rewardsAnalytics = [
    { month: 'يناير', totalRewards: 145000, bonusRewards: 95000, performanceRewards: 50000 },
    { month: 'فبراير', totalRewards: 132000, bonusRewards: 85000, performanceRewards: 47000 },
    { month: 'مارس', totalRewards: 158000, bonusRewards: 108000, performanceRewards: 50000 },
    { month: 'أبريل', totalRewards: 142000, bonusRewards: 92000, performanceRewards: 50000 },
    { month: 'مايو', totalRewards: 165000, bonusRewards: 115000, performanceRewards: 50000 },
    { month: 'يونيو', totalRewards: 178000, bonusRewards: 125000, performanceRewards: 53000 }
  ];

  const rewardsByType = [
    { name: 'مكافآت الأداء', value: 42, count: 85, color: '#009F87' },
    { name: 'مكافآت سنوية', value: 28, count: 58, color: '#1e40af' },
    { name: 'حوافز المشاريع', value: 18, count: 36, color: '#f59e0b' },
    { name: 'حوافز الحضور', value: 12, count: 24, color: '#10b981' }
  ];

  const departmentRewards = [
    { department: 'تقنية المعلومات', rewards: 28, amount: 420000, avgReward: 15000 },
    { department: 'المبيعات', rewards: 22, amount: 330000, avgReward: 15000 },
    { department: 'التسويق', rewards: 18, amount: 270000, avgReward: 15000 },
    { department: 'المالية', rewards: 15, amount: 225000, avgReward: 15000 },
    { department: 'الموارد البشرية', rewards: 12, amount: 180000, avgReward: 15000 }
  ];

  const BOUD_COLORS = ['#009F87', '#1e40af', '#f59e0b', '#10b981', '#8b5cf6'];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'paid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'processing': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'approved': isRTL ? 'معتمد' : 'Approved',
      'pending': isRTL ? 'معلق' : 'Pending',
      'paid': isRTL ? 'مدفوع' : 'Paid',
      'rejected': isRTL ? 'مرفوض' : 'Rejected',
      'processing': isRTL ? 'قيد المعالجة' : 'Processing'
    };
    return statusMap[status] || status;
  };

  const getRewardTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'annual_bonus': isRTL ? 'مكافأة سنوية' : 'Annual Bonus',
      'performance_based': isRTL ? 'مكافأة أداء' : 'Performance Based',
      'team_achievement': isRTL ? 'إنجاز جماعي' : 'Team Achievement',
      'manager_recommendation': isRTL ? 'ترشيح المدير' : 'Manager Recommendation',
      'special_occasion': isRTL ? 'مناسبة خاصة' : 'Special Occasion',
      'semi_annual': isRTL ? 'نصف سنوية' : 'Semi Annual',
      'project_completion': isRTL ? 'إنهاء مشروع' : 'Project Completion',
      'kpi_achievement': isRTL ? 'تحقيق مؤشرات' : 'KPI Achievement',
      'attendance_excellence': isRTL ? 'امتياز حضور' : 'Attendance Excellence',
      'innovation': isRTL ? 'ابتكار' : 'Innovation'
    };
    return typeMap[type] || type;
  };

  const getFrequencyText = (frequency: string) => {
    const frequencyMap: { [key: string]: string } = {
      'monthly': isRTL ? 'شهري' : 'Monthly',
      'quarterly': isRTL ? 'ربع سنوي' : 'Quarterly',
      'semi_annual': isRTL ? 'نصف سنوي' : 'Semi Annual',
      'annual': isRTL ? 'سنوي' : 'Annual',
      'one_time': isRTL ? 'مرة واحدة' : 'One Time'
    };
    return frequencyMap[frequency] || frequency;
  };

  const createProgram = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('incentive_programs')
        .insert(newProgram);

      if (error) throw error;

      toast({
        title: isRTL ? 'تم إنشاء البرنامج بنجاح' : 'Program created successfully',
        description: isRTL ? 'تم إضافة برنامج حوافز جديد' : 'New incentive program has been added'
      });

      setNewProgramDialog(false);
      setNewProgram({
        program_name: '',
        program_code: '',
        program_type: 'annual_bonus' as const,
        description: '',
        reward_percentage: 0,
        fixed_amount: 0,
        frequency: 'annual' as const,
        target_metric: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: ''
      });
      fetchPrograms();
    } catch (error) {
      console.error('Error creating program:', error);
      toast({
        title: isRTL ? 'خطأ في إنشاء البرنامج' : 'Error creating program',
        description: isRTL ? 'حدث خطأ أثناء إنشاء البرنامج' : 'An error occurred while creating the program',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createReward = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('employee_rewards')
        .insert(newReward);

      if (error) throw error;

      toast({
        title: isRTL ? 'تم إنشاء المكافأة بنجاح' : 'Reward created successfully',
        description: isRTL ? 'تم إضافة مكافأة جديدة للموظف' : 'New reward has been added for employee'
      });

      setNewRewardDialog(false);
      setNewReward({
        employee_id: '',
        program_id: '',
        reward_type: 'annual_bonus' as const,
        amount: 0,
        reason: '',
        performance_period_start: '',
        performance_period_end: ''
      });
      fetchRewards();
    } catch (error) {
      console.error('Error creating reward:', error);
      toast({
        title: isRTL ? 'خطأ في إنشاء المكافأة' : 'Error creating reward',
        description: isRTL ? 'حدث خطأ أثناء إنشاء المكافأة' : 'An error occurred while creating the reward',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#009F87] via-[#008072] to-[#009F87] p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
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
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Calculator className="h-4 w-4 ml-2" />
                  {isRTL ? 'حساب الأهلية' : 'Calculate Eligibility'}
                </Button>
                <Button className="bg-[#009F87]/80 border-[#009F87]/30 text-white hover:bg-[#009F87]/90 backdrop-blur-sm">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير Excel' : 'Export Excel'}
                </Button>
                <Button className="bg-red-600/80 border-red-600/30 text-white hover:bg-red-600/90 backdrop-blur-sm">
                  <FileText className="h-4 w-4 ml-2" />
                  {isRTL ? 'تقرير PDF' : 'PDF Report'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Gift className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام إدارة المكافآت والحوافز الشامل' : 'Comprehensive Rewards & Incentives Management System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'إدارة متكاملة للمكافآت والحوافز مع ربط بأنظمة الأداء والحضور والمشاريع' : 'Integrated rewards and incentives management with performance, attendance, and project system integration'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Key Metrics Cards */}
          <Card className="bg-gradient-to-br from-[#009F87] to-[#008072] text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">{isRTL ? 'إجمالي المكافآت' : 'Total Rewards'}</p>
                  <p className="text-3xl font-bold">{rewards.length}</p>
                  <p className="text-green-200 text-xs mt-1">
                    <TrendingUp className="h-3 w-3 inline ml-1" />
                    {isRTL ? '+12% من الشهر الماضي' : '+12% from last month'}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Award className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">{isRTL ? 'البرامج النشطة' : 'Active Programs'}</p>
                  <p className="text-3xl font-bold">{programs.filter(p => p.is_active).length}</p>
                  <p className="text-blue-200 text-xs mt-1">
                    <Activity className="h-3 w-3 inline ml-1" />
                    {isRTL ? 'برامج تعمل حالياً' : 'Currently running'}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Target className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">{isRTL ? 'المبلغ الإجمالي' : 'Total Amount'}</p>
                  <p className="text-3xl font-bold">1.2M</p>
                  <p className="text-purple-200 text-xs mt-1">
                    <DollarSign className="h-3 w-3 inline ml-1" />
                    {isRTL ? 'ريال سعودي' : 'SAR'}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Coins className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">{isRTL ? 'متوسط المكافأة' : 'Average Reward'}</p>
                  <p className="text-3xl font-bold">15,000</p>
                  <p className="text-orange-200 text-xs mt-1">
                    <Star className="h-3 w-3 inline ml-1" />
                    {isRTL ? 'ريال للموظف' : 'SAR per employee'}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Trophy className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg p-4">
            <TabsList className="grid w-full grid-cols-6 bg-gray-100/50 rounded-lg p-1">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                <BarChart className="h-4 w-4 ml-2" />
                {isRTL ? 'لوحة التحكم' : 'Dashboard'}
              </TabsTrigger>
              <TabsTrigger value="programs" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                <Target className="h-4 w-4 ml-2" />
                {isRTL ? 'برامج الحوافز' : 'Programs'}
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                <Gift className="h-4 w-4 ml-2" />
                {isRTL ? 'المكافآت' : 'Rewards'}
              </TabsTrigger>
              <TabsTrigger value="approvals" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                <UserCheck className="h-4 w-4 ml-2" />
                {isRTL ? 'الموافقات' : 'Approvals'}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                <PieChart className="h-4 w-4 ml-2" />
                {isRTL ? 'التحليلات' : 'Analytics'}
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
                <Settings className="h-4 w-4 ml-2" />
                {isRTL ? 'الإعدادات' : 'Settings'}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Rewards Trend Chart */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-[#009F87] text-lg">
                    <LineChart className="h-5 w-5" />
                    {isRTL ? 'اتجاه المكافآت الشهرية' : 'Monthly Rewards Trend'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={rewardsAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          `${Number(value).toLocaleString()} ${isRTL ? 'ريال' : 'SAR'}`, 
                          isRTL ? 'المكافآت' : 'Rewards'
                        ]}
                        labelFormatter={(label) => `${isRTL ? 'شهر' : 'Month'}: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="totalRewards" 
                        stroke="#009F87" 
                        fill="url(#colorRewards)" 
                        strokeWidth={3}
                      />
                      <defs>
                        <linearGradient id="colorRewards" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#009F87" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#009F87" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Rewards by Type */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-[#009F87] text-lg">
                    <PieChart className="h-5 w-5" />
                    {isRTL ? 'المكافآت حسب النوع' : 'Rewards by Type'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={rewardsByType}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {rewardsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Department Performance */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-[#009F87] text-lg">
                  <Building className="h-5 w-5" />
                  {isRTL ? 'أداء الإدارات في المكافآت' : 'Department Rewards Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentRewards.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-[#009F87]/10 rounded-lg">
                          <Building className="h-5 w-5 text-[#009F87]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{dept.department}</h4>
                          <p className="text-sm text-gray-500">{dept.rewards} {isRTL ? 'مكافآت' : 'rewards'}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{dept.amount.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</p>
                        <p className="text-sm text-gray-500">{isRTL ? 'متوسط:' : 'Avg:'} {dept.avgReward.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#009F87]">{isRTL ? 'برامج الحوافز' : 'Incentive Programs'}</h2>
              <Dialog open={newProgramDialog} onOpenChange={setNewProgramDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-[#009F87] hover:bg-[#008072] shadow-lg">
                    <Plus className="h-4 w-4 ml-2" />
                    {isRTL ? 'إضافة برنامج جديد' : 'Add New Program'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{isRTL ? 'إضافة برنامج حوافز جديد' : 'Add New Incentive Program'}</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label>{isRTL ? 'اسم البرنامج' : 'Program Name'}</Label>
                      <Input
                        value={newProgram.program_name}
                        onChange={(e) => setNewProgram({...newProgram, program_name: e.target.value})}
                        placeholder={isRTL ? 'مثل: مكافأة الأداء السنوية' : 'e.g: Annual Performance Bonus'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'رمز البرنامج' : 'Program Code'}</Label>
                      <Input
                        value={newProgram.program_code}
                        onChange={(e) => setNewProgram({...newProgram, program_code: e.target.value})}
                        placeholder={isRTL ? 'مثل: ANN-PERF-2024' : 'e.g: ANN-PERF-2024'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'نوع البرنامج' : 'Program Type'}</Label>
                        <Select
                          value={newProgram.program_type}
                          onValueChange={(value: any) => setNewProgram({...newProgram, program_type: value})}
                        >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="annual_bonus">{isRTL ? 'مكافأة سنوية' : 'Annual Bonus'}</SelectItem>
                          <SelectItem value="performance_based">{isRTL ? 'مكافأة أداء' : 'Performance Based'}</SelectItem>
                          <SelectItem value="team_achievement">{isRTL ? 'إنجاز جماعي' : 'Team Achievement'}</SelectItem>
                          <SelectItem value="kpi_achievement">{isRTL ? 'تحقيق مؤشرات' : 'KPI Achievement'}</SelectItem>
                          <SelectItem value="attendance_excellence">{isRTL ? 'امتياز حضور' : 'Attendance Excellence'}</SelectItem>
                          <SelectItem value="innovation">{isRTL ? 'ابتكار' : 'Innovation'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'التكرار' : 'Frequency'}</Label>
                        <Select
                          value={newProgram.frequency}
                          onValueChange={(value: any) => setNewProgram({...newProgram, frequency: value})}
                        >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">{isRTL ? 'شهري' : 'Monthly'}</SelectItem>
                          <SelectItem value="quarterly">{isRTL ? 'ربع سنوي' : 'Quarterly'}</SelectItem>
                          <SelectItem value="semi_annual">{isRTL ? 'نصف سنوي' : 'Semi Annual'}</SelectItem>
                          <SelectItem value="annual">{isRTL ? 'سنوي' : 'Annual'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'نسبة المكافأة (%)' : 'Reward Percentage (%)'}</Label>
                      <Input
                        type="number"
                        value={newProgram.reward_percentage}
                        onChange={(e) => setNewProgram({...newProgram, reward_percentage: Number(e.target.value)})}
                        placeholder="15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'المبلغ الثابت' : 'Fixed Amount'}</Label>
                      <Input
                        type="number"
                        value={newProgram.fixed_amount}
                        onChange={(e) => setNewProgram({...newProgram, fixed_amount: Number(e.target.value)})}
                        placeholder="5000"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
                      <Textarea
                        value={newProgram.description}
                        onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                        placeholder={isRTL ? 'وصف البرنامج وأهدافه...' : 'Program description and objectives...'}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setNewProgramDialog(false)}>
                      {isRTL ? 'إلغاء' : 'Cancel'}
                    </Button>
                    <Button onClick={createProgram} disabled={isLoading}>
                      <Save className="h-4 w-4 ml-2" />
                      {isRTL ? 'حفظ البرنامج' : 'Save Program'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <Card key={program.id} className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={program.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {program.is_active ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'غير نشط' : 'Inactive')}
                      </Badge>
                      <div className="p-2 bg-[#009F87]/10 rounded-lg">
                        <Target className="h-5 w-5 text-[#009F87]" />
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-900">{program.program_name}</CardTitle>
                    <p className="text-sm text-gray-500">{program.program_code}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{isRTL ? 'النوع:' : 'Type:'}</span>
                        <Badge variant="outline">{getRewardTypeText(program.program_type)}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{isRTL ? 'التكرار:' : 'Frequency:'}</span>
                        <span className="text-sm font-medium">{getFrequencyText(program.frequency)}</span>
                      </div>
                      {program.reward_percentage > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{isRTL ? 'النسبة:' : 'Percentage:'}</span>
                          <span className="text-sm font-medium text-[#009F87]">{program.reward_percentage}%</span>
                        </div>
                      )}
                      {program.fixed_amount > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{isRTL ? 'المبلغ الثابت:' : 'Fixed Amount:'}</span>
                          <span className="text-sm font-medium text-[#009F87]">{program.fixed_amount.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">{program.description}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 ml-1" />
                        {isRTL ? 'عرض' : 'View'}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-3 w-3 ml-1" />
                        {isRTL ? 'تعديل' : 'Edit'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#009F87]">{isRTL ? 'مكافآت الموظفين' : 'Employee Rewards'}</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calculator className="h-4 w-4 ml-2" />
                  {isRTL ? 'حساب الأهلية' : 'Calculate Eligibility'}
                </Button>
                <Dialog open={newRewardDialog} onOpenChange={setNewRewardDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#009F87] hover:bg-[#008072] shadow-lg">
                      <Plus className="h-4 w-4 ml-2" />
                      {isRTL ? 'إضافة مكافأة' : 'Add Reward'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{isRTL ? 'إضافة مكافأة جديدة' : 'Add New Reward'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label>{isRTL ? 'الموظف' : 'Employee'}</Label>
                        <Input
                          value={newReward.employee_id}
                          onChange={(e) => setNewReward({...newReward, employee_id: e.target.value})}
                          placeholder={isRTL ? 'اختر الموظف' : 'Select employee'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{isRTL ? 'البرنامج' : 'Program'}</Label>
                        <Select
                          value={newReward.program_id}
                          onValueChange={(value) => setNewReward({...newReward, program_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={isRTL ? 'اختر البرنامج' : 'Select program'} />
                          </SelectTrigger>
                          <SelectContent>
                            {programs.map((program) => (
                              <SelectItem key={program.id} value={program.id}>
                                {program.program_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{isRTL ? 'نوع المكافأة' : 'Reward Type'}</Label>
                        <Select
                          value={newReward.reward_type}
                          onValueChange={(value: any) => setNewReward({...newReward, reward_type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="annual_bonus">{isRTL ? 'مكافأة سنوية' : 'Annual Bonus'}</SelectItem>
                            <SelectItem value="performance_based">{isRTL ? 'مكافأة أداء' : 'Performance Based'}</SelectItem>
                            <SelectItem value="team_achievement">{isRTL ? 'إنجاز جماعي' : 'Team Achievement'}</SelectItem>
                            <SelectItem value="kpi_achievement">{isRTL ? 'تحقيق مؤشرات' : 'KPI Achievement'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{isRTL ? 'المبلغ' : 'Amount'}</Label>
                        <Input
                          type="number"
                          value={newReward.amount}
                          onChange={(e) => setNewReward({...newReward, amount: Number(e.target.value)})}
                          placeholder="15000"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>{isRTL ? 'السبب' : 'Reason'}</Label>
                        <Textarea
                          value={newReward.reason}
                          onChange={(e) => setNewReward({...newReward, reason: e.target.value})}
                          placeholder={isRTL ? 'سبب المكافأة...' : 'Reason for reward...'}
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setNewRewardDialog(false)}>
                        {isRTL ? 'إلغاء' : 'Cancel'}
                      </Button>
                      <Button onClick={createReward} disabled={isLoading}>
                        <Save className="h-4 w-4 ml-2" />
                        {isRTL ? 'حفظ المكافأة' : 'Save Reward'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isRTL ? 'رقم المكافأة' : 'Reward Number'}</TableHead>
                      <TableHead>{isRTL ? 'النوع' : 'Type'}</TableHead>
                      <TableHead>{isRTL ? 'المبلغ' : 'Amount'}</TableHead>
                      <TableHead>{isRTL ? 'الحالة' : 'Status'}</TableHead>
                      <TableHead>{isRTL ? 'التاريخ' : 'Date'}</TableHead>
                      <TableHead className="text-center">{isRTL ? 'الإجراءات' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewards.map((reward) => (
                      <TableRow key={reward.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{reward.reward_number}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{getRewardTypeText(reward.reward_type)}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-[#009F87]">
                          {reward.amount.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(reward.status)}>
                            {getStatusText(reward.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(reward.created_at).toLocaleDateString(isRTL ? 'ar' : 'en')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                            {reward.status === 'pending' && (
                              <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700">
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <div className="text-center py-12">
              <UserCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {isRTL ? 'نظام الموافقات' : 'Approvals System'}
              </h3>
              <p className="text-gray-500 mb-6">
                {isRTL ? 'سيتم تطوير نظام الموافقات المتقدم قريباً' : 'Advanced approvals system coming soon'}
              </p>
              <Button variant="outline">
                <Settings className="h-4 w-4 ml-2" />
                {isRTL ? 'إعداد سير العمل' : 'Setup Workflow'}
              </Button>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance vs Rewards */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#009F87]">
                    <Activity className="h-5 w-5" />
                    {isRTL ? 'الأداء مقابل المكافآت' : 'Performance vs Rewards'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={departmentRewards}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#009F87" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Reward Distribution */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#009F87]">
                    <PieChart className="h-5 w-5" />
                    {isRTL ? 'توزيع المكافآت' : 'Reward Distribution'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rewardsByType.map((type, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: type.color }}
                          />
                          <span className="text-sm font-medium">{type.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold">{type.count}</span>
                          <span className="text-xs text-gray-500 ml-2">({type.value}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reward Satisfaction Survey */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Heart className="h-5 w-5" />
                  {isRTL ? 'استبيان رضا الموظفين عن المكافآت' : 'Employee Reward Satisfaction Survey'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#009F87] mb-2">4.6</div>
                    <div className="text-sm text-gray-600">{isRTL ? 'تقييم عام' : 'Overall Rating'}</div>
                    <div className="flex justify-center mt-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
                    <div className="text-sm text-gray-600">{isRTL ? 'معدل الرضا' : 'Satisfaction Rate'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
                    <div className="text-sm text-gray-600">{isRTL ? 'المشاركون' : 'Participants'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#009F87]">
                  <Settings className="h-5 w-5" />
                  {isRTL ? 'إعدادات النظام' : 'System Settings'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">{isRTL ? 'إعدادات المكافآت' : 'Reward Settings'}</h4>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'الحد الأقصى لنسبة المكافأة (%)' : 'Maximum Reward Percentage (%)'}</Label>
                      <Input type="number" placeholder="25" />
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'المبلغ الذي يتطلب موافقة الموارد البشرية' : 'Amount Requiring HR Approval'}</Label>
                      <Input type="number" placeholder="10000" />
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'المبلغ الذي يتطلب موافقة الإدارة التنفيذية' : 'Amount Requiring Executive Approval'}</Label>
                      <Input type="number" placeholder="50000" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">{isRTL ? 'إعدادات الإشعارات' : 'Notification Settings'}</h4>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'تفعيل الإشعارات' : 'Enable Notifications'}</Label>
                      <Select defaultValue="true">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">{isRTL ? 'مفعل' : 'Enabled'}</SelectItem>
                          <SelectItem value="false">{isRTL ? 'معطل' : 'Disabled'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'معدل خصم الضرائب (%)' : 'Tax Deduction Rate (%)'}</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'حساب المكافأة السنوية تلقائياً' : 'Auto Calculate Annual Bonus'}</Label>
                      <Select defaultValue="true">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">{isRTL ? 'مفعل' : 'Enabled'}</SelectItem>
                          <SelectItem value="false">{isRTL ? 'معطل' : 'Disabled'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline">
                    {isRTL ? 'إعادة تعيين' : 'Reset'}
                  </Button>
                  <Button className="bg-[#009F87] hover:bg-[#008072]">
                    <Save className="h-4 w-4 ml-2" />
                    {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
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