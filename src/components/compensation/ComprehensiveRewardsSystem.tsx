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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Gift, 
  Award, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  Settings, 
  Download, 
  Upload,
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Eye, 
  FileText, 
  Star, 
  Crown, 
  Target, 
  PieChart, 
  BarChart3, 
  Sparkles,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  Building,
  UserCheck,
  Briefcase,
  Search,
  Filter,
  Share,
  BookOpen,
  RefreshCw,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface ComprehensiveRewardsSystemProps {
  onBack: () => void;
}

interface RewardProgram {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  type: 'monthly' | 'quarterly' | 'annual' | 'project' | 'achievement';
  eligibilityCriteria: {
    performanceRating: number;
    attendancePercentage: number;
    department?: string;
    position?: string;
  };
  rewardValue: {
    type: 'fixed' | 'percentage';
    amount: number;
    currency: 'SAR' | 'USD';
  };
  budget: number;
  usedBudget: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdBy: string;
  approvedBy?: string;
}

interface Incentive {
  id: string;
  referenceNumber: string;
  employeeId: string;
  employeeName: string;
  programId: string;
  programName: string;
  type: 'financial' | 'non-financial';
  subType: 'bonus' | 'allowance' | 'commission' | 'certificate' | 'voucher' | 'leave' | 'recognition';
  amount?: number;
  description: string;
  status: 'pending' | 'manager-approved' | 'hr-approved' | 'rejected' | 'paid';
  submittedBy: string;
  submissionDate: string;
  approvalFlow: {
    managerId?: string;
    managerApproval?: {
      approved: boolean;
      date: string;
      comments?: string;
    };
    hrId?: string;
    hrApproval?: {
      approved: boolean;
      date: string;
      comments?: string;
    };
    adminId?: string;
    adminApproval?: {
      approved: boolean;
      date: string;
      comments?: string;
    };
  };
  payrollIntegration?: {
    synced: boolean;
    payrollPeriod: string;
    syncDate?: string;
  };
}

interface Recognition {
  id: string;
  referenceNumber: string;
  nominatedEmployeeId: string;
  nominatedEmployeeName: string;
  nominatedBy: string;
  nominatorName: string;
  type: 'peer-to-peer' | 'manager-nomination' | 'customer-feedback' | 'innovation' | 'leadership';
  category: string;
  description: string;
  evidence: string[];
  impact: string;
  status: 'pending' | 'approved' | 'rejected' | 'published';
  submissionDate: string;
  approvedBy?: string;
  approvalDate?: string;
  publicRecognition: boolean;
  rewardValue?: number;
}

export const ComprehensiveRewardsSystem: React.FC<ComprehensiveRewardsSystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<RewardProgram | null>(null);
  const [selectedIncentive, setSelectedIncentive] = useState<Incentive | null>(null);

  // Mock data for demonstration
  const rewardPrograms: RewardProgram[] = [
    {
      id: '1',
      name: 'برنامج التميز الشهري',
      nameEn: 'Monthly Excellence Program',
      description: 'برنامج لمكافأة الموظفين المتميزين شهرياً',
      type: 'monthly',
      eligibilityCriteria: {
        performanceRating: 4.0,
        attendancePercentage: 95,
      },
      rewardValue: {
        type: 'fixed',
        amount: 2000,
        currency: 'SAR'
      },
      budget: 50000,
      usedBudget: 24000,
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      createdBy: 'مدير الموارد البشرية',
      approvedBy: 'المدير العام'
    },
    {
      id: '2',
      name: 'حوافز المبيعات التنافسية',
      nameEn: 'Competitive Sales Incentives',
      description: 'حوافز للموظفين الذين يحققون أهداف المبيعات',
      type: 'quarterly',
      eligibilityCriteria: {
        performanceRating: 3.5,
        attendancePercentage: 90,
        department: 'المبيعات'
      },
      rewardValue: {
        type: 'percentage',
        amount: 10,
        currency: 'SAR'
      },
      budget: 100000,
      usedBudget: 45000,
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      createdBy: 'مدير المبيعات',
      approvedBy: 'المدير العام'
    }
  ];

  const incentives: Incentive[] = [
    {
      id: '1',
      referenceNumber: 'RWD-2024-000001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      programId: '1',
      programName: 'برنامج التميز الشهري',
      type: 'financial',
      subType: 'bonus',
      amount: 2000,
      description: 'تحقيق أهداف المبيعات بنسبة 150%',
      status: 'hr-approved',
      submittedBy: 'مدير المبيعات',
      submissionDate: '2024-01-15',
      approvalFlow: {
        managerId: 'MGR001',
        managerApproval: {
          approved: true,
          date: '2024-01-16',
          comments: 'موافقة على المكافأة لتحقيق الأهداف'
        },
        hrId: 'HR001',
        hrApproval: {
          approved: true,
          date: '2024-01-17',
          comments: 'تمت الموافقة من قبل الموارد البشرية'
        }
      },
      payrollIntegration: {
        synced: false,
        payrollPeriod: 'Jan-2024'
      }
    },
    {
      id: '2',
      referenceNumber: 'RWD-2024-000002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة سعد المطيري',
      programId: '2',
      programName: 'حوافز المبيعات التنافسية',
      type: 'non-financial',
      subType: 'certificate',
      description: 'شهادة تقدير لتحقيق أعلى نسبة رضا عملاء',
      status: 'pending',
      submittedBy: 'مدير خدمة العملاء',
      submissionDate: '2024-01-20',
      approvalFlow: {
        managerId: 'MGR002'
      }
    }
  ];

  const recognitions: Recognition[] = [
    {
      id: '1',
      referenceNumber: 'REC-2024-000001',
      nominatedEmployeeId: 'EMP003',
      nominatedEmployeeName: 'خالد عبدالله الزهراني',
      nominatedBy: 'EMP004',
      nominatorName: 'نورا سالم القحطاني',
      type: 'peer-to-peer',
      category: 'التعاون والعمل الجماعي',
      description: 'مساعدة الزملاء في إنجاز المشاريع بوقت قياسي',
      evidence: ['تقرير المشروع', 'شهادات الزملاء'],
      impact: 'تحسين كفاءة الفريق بنسبة 25%',
      status: 'approved',
      submissionDate: '2024-01-18',
      approvedBy: 'مدير الموارد البشرية',
      approvalDate: '2024-01-19',
      publicRecognition: true,
      rewardValue: 500
    }
  ];

  // Analytics data
  const rewardsAnalytics = {
    totalRewards: incentives.length + recognitions.length,
    totalAmount: incentives.filter(i => i.amount).reduce((sum, i) => sum + (i.amount || 0), 0),
    pendingApprovals: incentives.filter(i => i.status === 'pending').length,
    thisMonthRewards: 12,
    departmentBreakdown: [
      { name: 'المبيعات', value: 35, color: '#10B981' },
      { name: 'التقنية', value: 25, color: '#3B82F6' },
      { name: 'الموارد البشرية', value: 20, color: '#8B5CF6' },
      { name: 'المالية', value: 15, color: '#F59E0B' },
      { name: 'أخرى', value: 5, color: '#EF4444' }
    ],
    monthlyTrend: [
      { month: 'يناير', financial: 45000, nonFinancial: 15 },
      { month: 'فبراير', financial: 52000, nonFinancial: 22 },
      { month: 'مارس', financial: 38000, nonFinancial: 18 },
      { month: 'أبريل', financial: 65000, nonFinancial: 28 },
      { month: 'مايو', financial: 58000, nonFinancial: 24 },
      { month: 'يونيو', financial: 72000, nonFinancial: 31 }
    ]
  };

  const handleApproveIncentive = (incentiveId: string, level: 'manager' | 'hr' | 'admin') => {
    toast({
      title: "تم اعتماد الحافز",
      description: `تم اعتماد الحافز من قبل ${level === 'manager' ? 'المدير المباشر' : level === 'hr' ? 'الموارد البشرية' : 'الإدارة العليا'}`,
    });
  };

  const handleRejectIncentive = (incentiveId: string, reason: string) => {
    toast({
      title: "تم رفض الحافز",
      description: `السبب: ${reason}`,
      variant: "destructive"
    });
  };

  const handleSyncWithPayroll = (incentiveId: string) => {
    toast({
      title: "تمت المزامنة مع كشف الراتب",
      description: "تم إضافة الحافز إلى كشف راتب الموظف للشهر الحالي",
    });
  };

  const exportReports = (format: 'pdf' | 'excel') => {
    toast({
      title: `تم تصدير التقرير`,
      description: `تم تصدير تقرير المكافآت والحوافز بصيغة ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Professional Header matching ComprehensiveFieldTracking */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/boud-pattern-bg.jpg')] opacity-5"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-primary/10 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">
                    النظام الشامل للمكافآت والحوافز
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    نظام متقدم لإدارة المكافآت والتحفيز والتقدير
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                <Activity className="h-4 w-4 ml-1" />
                نشط
              </Badge>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              برامج المكافآت
            </TabsTrigger>
            <TabsTrigger value="incentives" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              إدارة الحوافز
            </TabsTrigger>
            <TabsTrigger value="recognition" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              التقدير
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              سير الاعتماد
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي المكافآت</p>
                      <p className="text-2xl font-bold">{rewardsAnalytics.totalRewards}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي المبلغ</p>
                      <p className="text-2xl font-bold">{rewardsAnalytics.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">معلقة الاعتماد</p>
                      <p className="text-2xl font-bold">{rewardsAnalytics.pendingApprovals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">هذا الشهر</p>
                      <p className="text-2xl font-bold">{rewardsAnalytics.thisMonthRewards}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>توزيع المكافآت حسب الأقسام</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={rewardsAnalytics.departmentBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {rewardsAnalytics.departmentBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Monthly Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>اتجاه المكافآت الشهري</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={rewardsAnalytics.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="financial"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        name="مالية"
                      />
                      <Area
                        type="monotone"
                        dataKey="nonFinancial"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        name="غير مالية"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  رؤى الذكاء الاصطناعي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-900">توقع الأداء</h4>
                        <p className="text-sm text-blue-700">قسم المبيعات يحقق نمواً بنسبة 15% ويستحق حوافز إضافية</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-yellow-900">تنبيه الميزانية</h4>
                        <p className="text-sm text-yellow-700">قسم التقنية تجاوز 80% من ميزانية المكافآت المخصصة</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-green-900">فرص التحفيز</h4>
                        <p className="text-sm text-green-700">15 موظف مؤهل لبرنامج التميز الشهري</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reward Programs Tab */}
          <TabsContent value="programs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">برامج المكافآت</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة برنامج جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>إضافة برنامج مكافآت جديد</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>اسم البرنامج</Label>
                      <Input placeholder="مثل: برنامج التميز الشهري" />
                    </div>
                    <div>
                      <Label>النوع</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">شهري</SelectItem>
                          <SelectItem value="quarterly">ربع سنوي</SelectItem>
                          <SelectItem value="annual">سنوي</SelectItem>
                          <SelectItem value="project">مشروع</SelectItem>
                          <SelectItem value="achievement">إنجاز</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>الحد الأدنى لتقييم الأداء</Label>
                      <Input type="number" step="0.1" min="0" max="5" placeholder="4.0" />
                    </div>
                    <div>
                      <Label>الحد الأدنى لنسبة الحضور (%)</Label>
                      <Input type="number" min="0" max="100" placeholder="95" />
                    </div>
                    <div>
                      <Label>نوع المكافأة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="ثابتة أم نسبة مئوية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">مبلغ ثابت</SelectItem>
                          <SelectItem value="percentage">نسبة مئوية من الراتب</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>قيمة المكافأة</Label>
                      <Input type="number" placeholder="2000" />
                    </div>
                    <div className="md:col-span-2">
                      <Label>الميزانية الإجمالية</Label>
                      <Input type="number" placeholder="50000" />
                    </div>
                    <div className="md:col-span-2">
                      <Label>الوصف</Label>
                      <Textarea placeholder="وصف البرنامج ومعاييره" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline">إلغاء</Button>
                    <Button>إنشاء البرنامج</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewardPrograms.map((program) => (
                <Card key={program.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge variant={program.isActive ? "default" : "secondary"}>
                        {program.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>الميزانية المستخدمة:</span>
                        <span>{program.usedBudget.toLocaleString()} / {program.budget.toLocaleString()} ريال</span>
                      </div>
                      <Progress value={(program.usedBudget / program.budget) * 100} />
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">تقييم الأداء:</span>
                          <span className="block font-medium">{program.eligibilityCriteria.performanceRating}/5</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">نسبة الحضور:</span>
                          <span className="block font-medium">{program.eligibilityCriteria.attendancePercentage}%</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-bold text-green-600">
                          {program.rewardValue.type === 'fixed' 
                            ? `${program.rewardValue.amount} ريال`
                            : `${program.rewardValue.amount}% من الراتب`
                          }
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Incentives Management Tab */}
          <TabsContent value="incentives" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">إدارة الحوافز</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4 ml-2" />
                  رفع ملف
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة حافز
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>إضافة حافز جديد</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>الموظف</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الموظف" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emp1">أحمد محمد العلي</SelectItem>
                            <SelectItem value="emp2">فاطمة سعد المطيري</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>البرنامج</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر البرنامج" />
                          </SelectTrigger>
                          <SelectContent>
                            {rewardPrograms.map((program) => (
                              <SelectItem key={program.id} value={program.id}>
                                {program.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>نوع الحافز</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر النوع" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="financial">مالي</SelectItem>
                            <SelectItem value="non-financial">غير مالي</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>النوع الفرعي</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر النوع الفرعي" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bonus">مكافأة</SelectItem>
                            <SelectItem value="allowance">بدل</SelectItem>
                            <SelectItem value="certificate">شهادة تقدير</SelectItem>
                            <SelectItem value="voucher">قسيمة شراء</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>المبلغ (إن وجد)</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label>رقم المرجع</Label>
                        <Input value="RWD-2024-000003" disabled />
                      </div>
                      <div className="md:col-span-2">
                        <Label>الوصف</Label>
                        <Textarea placeholder="وصف سبب الحافز والإنجاز المحقق" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline">إلغاء</Button>
                      <Button>إضافة الحافز</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>قائمة الحوافز</CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="بحث..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">الكل</SelectItem>
                        <SelectItem value="pending">معلق</SelectItem>
                        <SelectItem value="approved">معتمد</SelectItem>
                        <SelectItem value="paid">مدفوع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم المرجع</TableHead>
                      <TableHead>الموظف</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>تاريخ التقديم</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incentives.map((incentive) => (
                      <TableRow key={incentive.id}>
                        <TableCell className="font-medium">{incentive.referenceNumber}</TableCell>
                        <TableCell>{incentive.employeeName}</TableCell>
                        <TableCell>
                          <Badge variant={incentive.type === 'financial' ? 'default' : 'secondary'}>
                            {incentive.type === 'financial' ? 'مالي' : 'غير مالي'}
                          </Badge>
                        </TableCell>
                        <TableCell>{incentive.amount ? `${incentive.amount.toLocaleString()} ريال` : '-'}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              incentive.status === 'pending' ? 'outline' :
                              incentive.status === 'hr-approved' ? 'default' :
                              incentive.status === 'paid' ? 'secondary' : 'destructive'
                            }
                          >
                            {incentive.status === 'pending' ? 'معلق' :
                             incentive.status === 'manager-approved' ? 'موافقة المدير' :
                             incentive.status === 'hr-approved' ? 'موافقة الموارد البشرية' :
                             incentive.status === 'paid' ? 'تم الصرف' : 'مرفوض'}
                          </Badge>
                        </TableCell>
                        <TableCell>{incentive.submissionDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {incentive.status === 'hr-approved' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleSyncWithPayroll(incentive.id)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <RefreshCw className="h-4 w-4" />
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

          {/* Employee Recognition Tab */}
          <TabsContent value="recognition" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">تقدير الموظفين</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    ترشيح موظف
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>ترشيح موظف للتقدير</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>الموظف المرشح</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الموظف" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emp1">خالد عبدالله الزهراني</SelectItem>
                            <SelectItem value="emp2">نورا سالم القحطاني</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>نوع الترشيح</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر النوع" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="peer-to-peer">ترشيح زملاء</SelectItem>
                            <SelectItem value="manager-nomination">ترشيح مدير</SelectItem>
                            <SelectItem value="customer-feedback">تقييم عملاء</SelectItem>
                            <SelectItem value="innovation">الابتكار</SelectItem>
                            <SelectItem value="leadership">القيادة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>فئة التقدير</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="teamwork">التعاون والعمل الجماعي</SelectItem>
                          <SelectItem value="innovation">الابتكار والإبداع</SelectItem>
                          <SelectItem value="customer-service">خدمة العملاء</SelectItem>
                          <SelectItem value="leadership">القيادة</SelectItem>
                          <SelectItem value="excellence">التميز في الأداء</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>وصف الإنجاز</Label>
                      <Textarea placeholder="اكتب وصفاً مفصلاً للإنجاز أو السلوك المستحق للتقدير" />
                    </div>
                    <div>
                      <Label>الأثر المحقق</Label>
                      <Textarea placeholder="اشرح الأثر الإيجابي للإنجاز على الفريق أو المؤسسة" />
                    </div>
                    <div>
                      <Label>الأدلة والمرفقات</Label>
                      <Input type="file" multiple />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="public-recognition" />
                      <Label htmlFor="public-recognition">تقدير علني (يتم نشره للجميع)</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline">إلغاء</Button>
                    <Button>تقديم الترشيح</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recognitions.map((recognition) => (
                <Card key={recognition.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={recognition.status === 'approved' ? 'default' : 'outline'}>
                        {recognition.status === 'approved' ? 'معتمد' : 'معلق'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{recognition.referenceNumber}</span>
                    </div>
                    <CardTitle className="text-lg">{recognition.nominatedEmployeeName}</CardTitle>
                    <CardDescription>{recognition.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium">المرشح من قبل:</span>
                        <p className="text-sm text-muted-foreground">{recognition.nominatorName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">الإنجاز:</span>
                        <p className="text-sm text-muted-foreground">{recognition.description}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">الأثر:</span>
                        <p className="text-sm text-muted-foreground">{recognition.impact}</p>
                      </div>
                      {recognition.rewardValue && (
                        <div className="p-2 bg-green-50 rounded-lg border border-green-200">
                          <span className="text-sm font-medium text-green-800">
                            المكافأة: {recognition.rewardValue} ريال
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-muted-foreground">{recognition.submissionDate}</span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {recognition.status === 'pending' && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600">
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Approval Workflow Tab */}
          <TabsContent value="workflow" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">سير الاعتماد</h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  <Clock className="h-4 w-4 ml-1" />
                  {incentives.filter(i => i.status === 'pending').length} في الانتظار
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle2 className="h-4 w-4 ml-1" />
                  {incentives.filter(i => i.status === 'hr-approved').length} معتمد
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {incentives.map((incentive) => (
                <Card key={incentive.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Gift className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{incentive.employeeName}</CardTitle>
                          <CardDescription>{incentive.referenceNumber}</CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          incentive.status === 'pending' ? 'outline' :
                          incentive.status === 'hr-approved' ? 'default' : 'secondary'
                        }
                      >
                        {incentive.status === 'pending' ? 'معلق' :
                         incentive.status === 'manager-approved' ? 'موافقة المدير' :
                         incentive.status === 'hr-approved' ? 'موافقة الموارد البشرية' : 'مرفوض'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">تفاصيل الحافز</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">النوع:</span> {incentive.type === 'financial' ? 'مالي' : 'غير مالي'}</p>
                          <p><span className="font-medium">البرنامج:</span> {incentive.programName}</p>
                          {incentive.amount && <p><span className="font-medium">المبلغ:</span> {incentive.amount.toLocaleString()} ريال</p>}
                          <p><span className="font-medium">الوصف:</span> {incentive.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">سير الاعتماد</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${incentive.approvalFlow.managerApproval?.approved ? 'bg-green-500' : incentive.approvalFlow.managerId ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                            <span className="text-sm">اعتماد المدير المباشر</span>
                            {incentive.approvalFlow.managerApproval?.approved && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${incentive.approvalFlow.hrApproval?.approved ? 'bg-green-500' : incentive.approvalFlow.hrId ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                            <span className="text-sm">اعتماد الموارد البشرية</span>
                            {incentive.approvalFlow.hrApproval?.approved && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${incentive.approvalFlow.adminApproval?.approved ? 'bg-green-500' : incentive.approvalFlow.adminId ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                            <span className="text-sm">اعتماد الإدارة العليا</span>
                            {incentive.approvalFlow.adminApproval?.approved && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">الإجراءات</h4>
                        <div className="space-y-2">
                          {incentive.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleApproveIncentive(incentive.id, 'manager')}>
                                <Check className="h-4 w-4 ml-1" />
                                اعتماد
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleRejectIncentive(incentive.id, 'لا يستوفي المعايير')}>
                                <X className="h-4 w-4 ml-1" />
                                رفض
                              </Button>
                            </div>
                          )}
                          {incentive.status === 'hr-approved' && !incentive.payrollIntegration?.synced && (
                            <Button size="sm" onClick={() => handleSyncWithPayroll(incentive.id)} className="bg-blue-600 hover:bg-blue-700 text-white">
                              <RefreshCw className="h-4 w-4 ml-1" />
                              مزامنة مع الراتب
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-1" />
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">التقارير والإحصائيات</h2>
              <div className="flex gap-2">
                <Button onClick={() => exportReports('pdf')} variant="outline">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير PDF
                </Button>
                <Button onClick={() => exportReports('excel')}>
                  <Download className="h-4 w-4 ml-2" />
                  تصدير Excel
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي الإنفاق</p>
                      <p className="text-2xl font-bold">285,750 ريال</p>
                      <p className="text-sm text-green-600">+12% من الشهر الماضي</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">موظفين حصلوا على مكافآت</p>
                      <p className="text-2xl font-bold">148</p>
                      <p className="text-sm text-blue-600">68% من إجمالي الموظفين</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تقديرات الموظفين</p>
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-sm text-purple-600">+8 هذا الشهر</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">متوسط المكافأة</p>
                      <p className="text-2xl font-bold">1,930 ريال</p>
                      <p className="text-sm text-orange-600">+5% من الشهر الماضي</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>تطور المكافآت الشهري</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={rewardsAnalytics.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="financial" fill="#10B981" name="مالية" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>أداء برامج المكافآت</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rewardPrograms.map((program) => (
                      <div key={program.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{program.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {((program.usedBudget / program.budget) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={(program.usedBudget / program.budget) * 100} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{program.usedBudget.toLocaleString()} ريال</span>
                          <span>{program.budget.toLocaleString()} ريال</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>تقرير مفصل حسب القسم</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>القسم</TableHead>
                      <TableHead>عدد المكافآت</TableHead>
                      <TableHead>إجمالي المبلغ</TableHead>
                      <TableHead>متوسط المكافأة</TableHead>
                      <TableHead>نسبة الموظفين المكافئين</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">المبيعات</TableCell>
                      <TableCell>52</TableCell>
                      <TableCell>98,500 ريال</TableCell>
                      <TableCell>1,894 ريال</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="flex-1" />
                          <span className="text-sm">85%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">التقنية</TableCell>
                      <TableCell>38</TableCell>
                      <TableCell>76,200 ريال</TableCell>
                      <TableCell>2,005 ريال</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={72} className="flex-1" />
                          <span className="text-sm">72%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">الموارد البشرية</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>48,750 ريال</TableCell>
                      <TableCell>1,950 ريال</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={68} className="flex-1" />
                          <span className="text-sm">68%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">المالية</TableCell>
                      <TableCell>20</TableCell>
                      <TableCell>41,000 ريال</TableCell>
                      <TableCell>2,050 ريال</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={65} className="flex-1" />
                          <span className="text-sm">65%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">إعدادات نظام المكافآت</h2>
              <Button>
                <Settings className="h-4 w-4 ml-2" />
                حفظ الإعدادات
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>فئات المكافآت</CardTitle>
                  <CardDescription>إدارة أنواع وفئات المكافآت المختلفة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">مكافآت الأداء</h4>
                        <p className="text-sm text-muted-foreground">للموظفين المتميزين في الأداء</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">حوافز المبيعات</h4>
                        <p className="text-sm text-muted-foreground">للمبيعات المتميزة</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة فئة جديدة
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>سلسلة الاعتماد</CardTitle>
                  <CardDescription>تحديد مستويات الاعتماد للمكافآت</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>المكافآت تحت 1000 ريال</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر مستوى الاعتماد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">المدير المباشر فقط</SelectItem>
                          <SelectItem value="hr">الموارد البشرية فقط</SelectItem>
                          <SelectItem value="both">المدير + الموارد البشرية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>المكافآت من 1000-5000 ريال</Label>
                      <Select defaultValue="both">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">المدير المباشر فقط</SelectItem>
                          <SelectItem value="hr">الموارد البشرية فقط</SelectItem>
                          <SelectItem value="both">المدير + الموارد البشرية</SelectItem>
                          <SelectItem value="all">جميع المستويات</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>المكافآت أكثر من 5000 ريال</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="both">المدير + الموارد البشرية</SelectItem>
                          <SelectItem value="all">جميع المستويات + الإدارة العليا</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ميزانيات الأقسام</CardTitle>
                  <CardDescription>تحديد ميزانية المكافآت لكل قسم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>المبيعات</Label>
                        <Input type="number" defaultValue="100000" placeholder="الميزانية بالريال" />
                      </div>
                      <div>
                        <Label>التقنية</Label>
                        <Input type="number" defaultValue="80000" placeholder="الميزانية بالريال" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>الموارد البشرية</Label>
                        <Input type="number" defaultValue="60000" placeholder="الميزانية بالريال" />
                      </div>
                      <div>
                        <Label>المالية</Label>
                        <Input type="number" defaultValue="50000" placeholder="الميزانية بالريال" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إعدادات المزامنة</CardTitle>
                  <CardDescription>إعدادات المزامنة مع كشف الراتب والأنظمة الأخرى</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>المزامنة التلقائية مع كشف الراتب</Label>
                        <p className="text-sm text-muted-foreground">مزامنة المكافآت المالية تلقائياً</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>إشعارات الاعتماد</Label>
                        <p className="text-sm text-muted-foreground">إرسال إشعارات عند الحاجة للاعتماد</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>التقارير الدورية</Label>
                        <p className="text-sm text-muted-foreground">إرسال تقارير شهرية للإدارة</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div>
                      <Label>فترة اعتماد المكافآت (بالأيام)</Label>
                      <Input type="number" defaultValue="7" />
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

export default ComprehensiveRewardsSystem;