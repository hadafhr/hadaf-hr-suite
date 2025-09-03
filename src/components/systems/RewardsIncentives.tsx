import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Award, 
  Trophy, 
  Star, 
  Users, 
  TrendingUp, 
  Calendar, 
  Gift, 
  Target, 
  FileText, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  Crown,
  Zap,
  Heart,
  Sparkles,
  Activity,
  Building2,
  UserCheck,
  BarChart3,
  PieChart,
  Network,
  ThumbsUp,
  Bell,
  CreditCard,
  RefreshCw,
  Share,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  UserPlus,
  Phone,
  Mail,
  Users2,
  Database,
  Server,
  Building,
  Archive
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface RewardsIncentivesProps {
  onBack: () => void;
}

interface Reward {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'أداء متميز' | 'انجاز مشروع' | 'حضور منتظم' | 'ابتكار' | 'خدمة عملاء';
  amount: number;
  description: string;
  awardDate: string;
  status: 'معتمد' | 'معلق' | 'مدفوع';
  approvedBy: string;
  referenceNumber: string;
}

interface RewardProgram {
  id: string;
  name: string;
  nameEn: string;
  type: 'شهري' | 'ربع سنوي' | 'سنوي' | 'حسب الهدف';
  status: 'نشط' | 'معلق' | 'منتهي';
  description: string;
  criteria: string;
  targetEmployees: number;
  budgetAmount: number;
  spentAmount: number;
  startDate: string;
  endDate: string;
  lastUpdate?: string;
}

interface IncentiveMetric {
  id: string;
  metric: string;
  category: 'Financial' | 'Non-Financial' | 'Recognition' | 'Performance' | 'Engagement';
  status: 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const RewardsIncentives: React.FC<RewardsIncentivesProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const rewardPrograms: RewardProgram[] = [
    {
      id: '1',
      name: 'برنامج الموظف المثالي',
      nameEn: 'Employee of the Month',
      type: 'شهري',
      status: 'نشط',
      description: 'مكافأة شهرية للموظف الأكثر تميزاً في الأداء',
      criteria: 'تقييم الأداء + رضا العملاء + الانضباط',
      targetEmployees: 245,
      budgetAmount: 120000,
      spentAmount: 85000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      lastUpdate: '2024-01-20 09:30'
    },
    {
      id: '2',
      name: 'برنامج الابتكار والإبداع',
      nameEn: 'Innovation Program',
      type: 'حسب الهدف',
      status: 'نشط',
      description: 'مكافآت للأفكار والحلول الإبداعية المطبقة',
      criteria: 'قيمة الفكرة المقترحة + إمكانية التطبيق',
      targetEmployees: 180,
      budgetAmount: 200000,
      spentAmount: 125000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      lastUpdate: '2024-01-19 14:15'
    },
    {
      id: '3',
      name: 'مكافأة إنجاز المشاريع',
      nameEn: 'Project Completion Bonus',
      type: 'ربع سنوي',
      status: 'نشط',
      description: 'مكافآت لإنجاز المشاريع في المواعيد المحددة',
      criteria: 'نسبة إنجاز المشاريع في الوقت المحدد',
      targetEmployees: 150,
      budgetAmount: 180000,
      spentAmount: 95000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      lastUpdate: '2024-01-18 10:45'
    },
    {
      id: '4',
      name: 'برنامج التميز في خدمة العملاء',
      nameEn: 'Customer Service Excellence',
      type: 'شهري',
      status: 'نشط',
      description: 'تقدير الموظفين المتميزين في خدمة العملاء',
      criteria: 'تقييم رضا العملاء + معدل الاستجابة',
      targetEmployees: 89,
      budgetAmount: 100000,
      spentAmount: 67000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      lastUpdate: '2024-01-20 08:15'
    }
  ];

  const rewards: Reward[] = [
    {
      id: 'RWD001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      type: 'أداء متميز',
      amount: 5000,
      description: 'تحقيق أهداف المشروع قبل الموعد المحدد',
      awardDate: '2024-03-15',
      status: 'مدفوع',
      approvedBy: 'مدير الموارد البشرية',
      referenceNumber: 'REW-2024-001'
    },
    {
      id: 'RWD002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة أحمد السالم',
      type: 'ابتكار',
      amount: 7500,
      description: 'اقتراح حل تقني جديد وفر 30% من الوقت',
      awardDate: '2024-03-20',
      status: 'معتمد',
      approvedBy: 'المدير التنفيذي',
      referenceNumber: 'REW-2024-002'
    },
    {
      id: 'RWD003',
      employeeId: 'EMP003',
      employeeName: 'محمد سعد الخالد',
      type: 'حضور منتظم',
      amount: 2000,
      description: 'حضور منتظم لمدة 6 أشهر متتالية',
      awardDate: '2024-03-25',
      status: 'معلق',
      approvedBy: 'مدير الموارد البشرية',
      referenceNumber: 'REW-2024-003'
    }
  ];

  const incentiveMetrics: IncentiveMetric[] = [
    {
      id: '1',
      metric: 'معدل الرضا عن المكافآت',
      category: 'Performance',
      status: 'Excellent',
      value: 94,
      target: 90,
      trend: 'up',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      metric: 'نسبة المشاركة في البرامج',
      category: 'Engagement',
      status: 'Good',
      value: 87,
      target: 85,
      trend: 'stable',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      metric: 'عدد البرامج النشطة',
      category: 'Recognition',
      status: 'Excellent',
      value: 8,
      target: 6,
      trend: 'up',
      lastUpdated: '2024-01-15'
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'يناير', rewards: 85, programs: 6, budget: 95000, satisfaction: 92 },
    { month: 'فبراير', rewards: 92, programs: 7, budget: 105000, satisfaction: 94 },
    { month: 'مارس', rewards: 88, programs: 8, budget: 98000, satisfaction: 96 },
    { month: 'أبريل', rewards: 95, programs: 8, budget: 110000, satisfaction: 93 },
    { month: 'مايو', rewards: 103, programs: 9, budget: 125000, satisfaction: 95 },
    { month: 'يونيو', rewards: 97, programs: 8, budget: 115000, satisfaction: 97 }
  ];

  const rewardDistribution = [
    { name: 'مكافآت الأداء', value: 35, color: '#3b82f6' },
    { name: 'برامج الابتكار', value: 25, color: '#10b981' },
    { name: 'مكافآت الحضور', value: 15, color: '#f59e0b' },
    { name: 'تميز خدمة العملاء', value: 15, color: '#8b5cf6' },
    { name: 'مكافآت أخرى', value: 10, color: '#ef4444' }
  ];

  // Calculate statistics
  const stats = {
    totalRewards: rewards.length,
    totalAmount: rewards.reduce((sum, reward) => sum + reward.amount, 0),
    activePrograms: rewardPrograms.filter(p => p.status === 'نشط').length,
    avgSatisfaction: 94,
    participationRate: 87,
    budgetUtilization: 78
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير المكافآت والحوافز كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800 border-green-200';
      case 'معلق': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'منتهي': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'معتمد': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'مدفوع': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'نشط': 'نشط',
      'معلق': 'معلق',
      'منتهي': 'منتهي',
      'معتمد': 'معتمد',
      'مدفوع': 'مدفوع'
    };
    return statusMap[status] || status;
  };

  const getTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'شهري': 'شهري',
      'ربع سنوي': 'ربع سنوي',
      'سنوي': 'سنوي',
      'حسب الهدف': 'حسب الهدف'
    };
    return typeMap[type] || type;
  };

  const renderHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/boud-pattern-bg.jpg')] opacity-5"></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  المكافآت والحوافز
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة برامج المكافآت والحوافز مع أنظمة التقييم والموافقات المتقدمة والتقارير التفصيلية
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <FileText className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              مكافأة جديدة
            </Button>
          </div>
        </div>
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
                <p className="text-sm text-muted-foreground">إجمالي المكافآت</p>
                <p className="text-2xl font-bold text-primary">{stats.totalRewards}</p>
              </div>
              <Gift className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المبلغ الإجمالي</p>
                <p className="text-2xl font-bold text-orange-600">{(stats.totalAmount / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">البرامج النشطة</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.activePrograms}</p>
              </div>
              <Trophy className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الرضا</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgSatisfaction}%</p>
              </div>
              <Heart className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل المشاركة</p>
                <p className="text-2xl font-bold text-purple-600">{stats.participationRate}%</p>
              </div>
              <Users className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">استغلال الميزانية</p>
                <p className="text-2xl font-bold text-green-600">{stats.budgetUtilization}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500/60" />
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
              أداء المكافآت والحوافز
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="rewards" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="programs" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="satisfaction" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المكافآت
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={rewardDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {rewardDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي للمكافآت والحوافز
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">أداء متميز</span>
              </div>
              <p className="text-sm text-emerald-700">
                تحسن ملحوظ في مؤشرات رضا الموظفين عن برامج المكافآت بنسبة 12%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">مراجعة مطلوبة</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بمراجعة معايير برنامج الابتكار لزيادة معدل المشاركة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية ذكية</span>
              </div>
              <p className="text-sm text-blue-700">
                اقتراح إضافة برنامج جديد لمكافآت التطوير المهني المستمر
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              النشاطات الحديثة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "تم اعتماد مكافأة الأداء المتميز",
                  employee: "أحمد محمد العلي",
                  amount: "5,000 ر.س",
                  time: "منذ ساعتين"
                },
                {
                  action: "تم إنشاء برنامج مكافآت جديد",
                  employee: "إدارة الموارد البشرية",
                  amount: "100,000 ر.س",
                  time: "منذ 4 ساعات"
                },
                {
                  action: "تم دفع مكافأة الابتكار",
                  employee: "فاطمة أحمد السالم",
                  amount: "7,500 ر.س",
                  time: "أمس"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Gift className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.employee}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{activity.amount}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              الإجراءات السريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                <Plus className="h-5 w-5" />
                <span className="text-xs">مكافأة جديدة</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                <Trophy className="h-5 w-5" />
                <span className="text-xs">برنامج جديد</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-xs">الموافقات المعلقة</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">تقارير المكافآت</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard">لوحة المعلومات</TabsTrigger>
            <TabsTrigger value="programs">برامج المكافآت</TabsTrigger>
            <TabsTrigger value="incentives">إدارة الحوافز</TabsTrigger>
            <TabsTrigger value="recognition">تقدير الموظفين</TabsTrigger>
            <TabsTrigger value="approval">سير الموافقات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    برامج المكافآت
                  </CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="البحث في البرامج..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button>
                      <Plus className="h-4 w-4 ml-2" />
                      برنامج جديد
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewardPrograms.map((program) => (
                    <Card key={program.id} className="border border-border/50 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Star className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{program.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{getTypeText(program.type)}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(program.status)}>
                            {getStatusText(program.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{program.description}</p>
                        
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">معايير التقييم</p>
                          <p className="text-sm text-muted-foreground">{program.criteria}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="text-lg font-bold text-primary">
                              {(program.budgetAmount / 1000).toFixed(0)}K
                            </p>
                            <p className="text-xs text-muted-foreground">ميزانية البرنامج</p>
                          </div>
                          <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <p className="text-lg font-bold text-emerald-600">{program.targetEmployees}</p>
                            <p className="text-xs text-muted-foreground">موظف مستهدف</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 ml-2" />
                            عرض
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 ml-2" />
                            تعديل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incentives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  إدارة الحوافز
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">الحوافز المالية</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div>
                          <p className="font-medium">مكافآت الأداء</p>
                          <p className="text-sm text-muted-foreground">نسبة مئوية من الراتب</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">نشط</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div>
                          <p className="font-medium">علاوة الإنجاز</p>
                          <p className="text-sm text-muted-foreground">مبلغ ثابت حسب المشروع</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">نشط</Badge>
                      </div>
                      <Button className="w-full" variant="outline">
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة حافز مالي
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-lg">الحوافز غير المالية</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div>
                          <p className="font-medium">شهادات التقدير</p>
                          <p className="text-sm text-muted-foreground">شهادات رسمية للتميز</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">نشط</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div>
                          <p className="font-medium">أيام إجازة إضافية</p>
                          <p className="text-sm text-muted-foreground">إجازات مدفوعة إضافية</p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">نشط</Badge>
                      </div>
                      <Button className="w-full" variant="outline">
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة حافز غير مالي
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recognition" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  تقدير الموظفين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border border-yellow-200 bg-yellow-50">
                      <CardContent className="p-4 text-center">
                        <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <p className="font-bold text-lg text-yellow-800">15</p>
                        <p className="text-sm text-yellow-700">ترشيحات جديدة</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-green-200 bg-green-50">
                      <CardContent className="p-4 text-center">
                        <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="font-bold text-lg text-green-800">42</p>
                        <p className="text-sm text-green-700">تم اعتمادها</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-blue-200 bg-blue-50">
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-bold text-lg text-blue-800">127</p>
                        <p className="text-sm text-blue-700">موظف متميز</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">الترشيحات الأخيرة</h3>
                      <Button>
                        <Plus className="h-4 w-4 ml-2" />
                        ترشيح موظف
                      </Button>
                    </div>
                    
                    {[
                      {
                        nominee: "سارة أحمد المطيري",
                        nominator: "محمد عبدالله السعد",
                        reason: "تميز في إدارة المشاريع وتحقيق النتائج",
                        date: "2024-01-20",
                        status: "معلق"
                      },
                      {
                        nominee: "عبدالرحمن يوسف الغامدي",
                        nominator: "فاطمة محمد النصر",
                        reason: "ابتكار في حلول التكنولوجيا المالية",
                        date: "2024-01-19",
                        status: "معتمد"
                      }
                    ].map((nomination, index) => (
                      <Card key={index} className="border border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-full">
                                <UserCheck className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{nomination.nominee}</p>
                                <p className="text-sm text-muted-foreground">رشحه: {nomination.nominator}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(nomination.status)}>
                              {nomination.status}
                            </Badge>
                          </div>
                          <p className="text-sm mb-3">{nomination.reason}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{nomination.date}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">عرض</Button>
                              <Button variant="outline" size="sm" className="text-green-600">اعتماد</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approval" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  سير الموافقات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border border-yellow-200">
                      <CardContent className="p-4 text-center">
                        <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                        <p className="font-bold text-lg">8</p>
                        <p className="text-sm text-muted-foreground">في الانتظار</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-blue-200">
                      <CardContent className="p-4 text-center">
                        <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="font-bold text-lg">12</p>
                        <p className="text-sm text-muted-foreground">قيد المراجعة</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-green-200">
                      <CardContent className="p-4 text-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="font-bold text-lg">45</p>
                        <p className="text-sm text-muted-foreground">معتمدة</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-red-200">
                      <CardContent className="p-4 text-center">
                        <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                        <p className="font-bold text-lg">3</p>
                        <p className="text-sm text-muted-foreground">مرفوضة</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">طلبات الموافقة المعلقة</h3>
                    {[
                      {
                        id: "REW-2024-004",
                        employee: "أحمد محمد الزهراني",
                        type: "مكافأة أداء متميز",
                        amount: "8,500 ر.س",
                        submittedBy: "مدير التسويق",
                        date: "2024-01-20",
                        priority: "عالية"
                      },
                      {
                        id: "REW-2024-005",
                        employee: "نورا سعد العتيبي",
                        type: "مكافأة ابتكار",
                        amount: "12,000 ر.س",
                        submittedBy: "مدير تقنية المعلومات",
                        date: "2024-01-19",
                        priority: "متوسطة"
                      }
                    ].map((request, index) => (
                      <Card key={index} className="border border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-full">
                                <Gift className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{request.employee}</p>
                                <p className="text-sm text-muted-foreground">{request.type}</p>
                              </div>
                            </div>
                            <Badge className={
                              request.priority === 'عالية' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }>
                              {request.priority}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">المرجع</p>
                              <p className="font-medium">{request.id}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">المبلغ</p>
                              <p className="font-medium text-primary">{request.amount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">مقدم الطلب</p>
                              <p className="font-medium">{request.submittedBy}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">التاريخ</p>
                              <p className="font-medium">{request.date}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle2 className="h-4 w-4 ml-2" />
                              اعتماد
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                              <AlertCircle className="h-4 w-4 ml-2" />
                              رفض
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 ml-2" />
                              عرض التفاصيل
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  التقارير والتحليلات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "تقرير تكلفة المكافآت",
                      description: "تحليل شامل لتكاليف برامج المكافآت والحوافز",
                      icon: DollarSign,
                      color: "text-green-600",
                      bgColor: "bg-green-50",
                      borderColor: "border-green-200"
                    },
                    {
                      title: "معدلات الإكمال",
                      description: "نسب إنجاز وإكمال برامج المكافآت المختلفة",
                      icon: Target,
                      color: "text-blue-600",
                      bgColor: "bg-blue-50",
                      borderColor: "border-blue-200"
                    },
                    {
                      title: "تطوير المهارات",
                      description: "تقييم تأثير المكافآت على تحسن مهارات الموظفين",
                      icon: TrendingUp,
                      color: "text-purple-600",
                      bgColor: "bg-purple-50",
                      borderColor: "border-purple-200"
                    },
                    {
                      title: "تقرير الأداء الشهري",
                      description: "تحليل أداء برامج المكافآت على أساس شهري",
                      icon: Calendar,
                      color: "text-orange-600",
                      bgColor: "bg-orange-50",
                      borderColor: "border-orange-200"
                    },
                    {
                      title: "تحليل رضا الموظفين",
                      description: "مؤشرات رضا الموظفين عن برامج التحفيز",
                      icon: Heart,
                      color: "text-pink-600",
                      bgColor: "bg-pink-50",
                      borderColor: "border-pink-200"
                    },
                    {
                      title: "التوزيع حسب الأقسام",
                      description: "توزيع المكافآت والحوافز على مختلف الأقسام",
                      icon: Building,
                      color: "text-indigo-600",
                      bgColor: "bg-indigo-50",
                      borderColor: "border-indigo-200"
                    }
                  ].map((report, index) => (
                    <Card key={index} className={`${report.borderColor} ${report.bgColor} hover:shadow-md transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${report.bgColor} border ${report.borderColor}`}>
                            <report.icon className={`h-6 w-6 ${report.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{report.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 ml-2" />
                                عرض
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 ml-2" />
                                تحميل PDF
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    إعدادات عامة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reward-categories">فئات المكافآت</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر فئة المكافأة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">أداء متميز</SelectItem>
                        <SelectItem value="innovation">ابتكار</SelectItem>
                        <SelectItem value="attendance">حضور منتظم</SelectItem>
                        <SelectItem value="customer">خدمة عملاء</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget-allocation">تخصيص الميزانية السنوية</Label>
                    <Input id="budget-allocation" placeholder="500,000 ر.س" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="approval-threshold">حد الموافقة التلقائية</Label>
                    <Input id="approval-threshold" placeholder="5,000 ر.س" />
                  </div>

                  <Button className="w-full">
                    حفظ الإعدادات العامة
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    سلسلة الموافقات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { level: "المستوى الأول", amount: "أقل من 5,000 ر.س", approver: "المدير المباشر" },
                      { level: "المستوى الثاني", amount: "5,000 - 15,000 ر.س", approver: "مدير الموارد البشرية" },
                      { level: "المستوى الثالث", amount: "أكثر من 15,000 ر.س", approver: "المدير العام" }
                    ].map((level, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{level.level}</span>
                          <Badge variant="outline">{level.amount}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">المعتمد: {level.approver}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    تعديل سلسلة الموافقات
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    إعدادات الإشعارات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "إشعار المكافآت الجديدة", description: "عند إضافة مكافأة جديدة" },
                    { title: "إشعار الموافقات المعلقة", description: "تذكير يومي بالموافقات المعلقة" },
                    { title: "إشعار دفع المكافآت", description: "عند دفع المكافآت للموظفين" },
                    { title: "إشعار انتهاء البرامج", description: "قبل انتهاء برامج المكافآت بأسبوع" }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        تفعيل
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    إدارة البيانات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 ml-2" />
                      تصدير جميع بيانات المكافآت
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <RefreshCw className="h-4 w-4 ml-2" />
                      مزامنة مع كشوف المرتبات
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Archive className="h-4 w-4 ml-2" />
                      أرشفة البرامج المنتهية
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 ml-2" />
                      إنشاء نسخة احتياطية
                    </Button>
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