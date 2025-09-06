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
  DollarSign, 
  Calculator, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  Building,
  BookOpen,
  Shield,
  Briefcase,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Globe,
  Eye,
  Settings,
  Bell,
  CreditCard,
  UserCheck,
  Sparkles,
  Archive,
  Edit,
  Trash2,
  Share,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  UserPlus,
  Phone,
  Mail,
  Crown,
  Users2,
  Database,
  RefreshCw,
  Server,
  Users,
  Receipt,
  Banknote,
  Wallet,
  User
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface ComprehensivePayrollSystemProps {
  onBack: () => void;
}

interface PayrollEmployee {
  id: string;
  name: string;
  employee_id: string;
  department: string;
  position: string;
  basic_salary: number;
  housing_allowance: number;
  transport_allowance: number;
  other_allowances: number;
  total_deductions: number;
  net_salary: number;
  status: 'processed' | 'pending' | 'approved' | 'rejected';
  last_processed: string;
}

interface PayrollRun {
  id: string;
  period_name: string;
  start_date: string;
  end_date: string;
  total_employees: number;
  total_gross: number;
  total_deductions: number;
  total_net: number;
  status: 'draft' | 'processing' | 'approved' | 'completed' | 'cancelled';
  processed_by: string;
  created_date: string;
}

interface PayrollMetric {
  id: string;
  metric: string;
  category: 'Cost' | 'Processing' | 'Compliance' | 'Benefits' | 'Deductions';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  lastUpdated: string;
}

export const ComprehensivePayrollSystem: React.FC<ComprehensivePayrollSystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollEmployee | null>(null);
  const [isEmployeeProfileOpen, setIsEmployeeProfileOpen] = useState(false);

  // Mock data for demonstration
  const payrollEmployees: PayrollEmployee[] = [
    {
      id: '1',
      name: 'أحمد محمد العلي',
      employee_id: 'EMP001',
      department: 'تقنية المعلومات',
      position: 'مطور برمجيات أول',
      basic_salary: 12000,
      housing_allowance: 2000,
      transport_allowance: 800,
      other_allowances: 500,
      total_deductions: 1200,
      net_salary: 14100,
      status: 'processed',
      last_processed: '2024-01-15'
    },
    {
      id: '2',
      name: 'فاطمة أحمد السالم',
      employee_id: 'EMP002',
      department: 'الموارد البشرية',
      position: 'أخصائي موارد بشرية',
      basic_salary: 9500,
      housing_allowance: 1500,
      transport_allowance: 600,
      other_allowances: 300,
      total_deductions: 950,
      net_salary: 10950,
      status: 'pending',
      last_processed: '2024-01-10'
    },
    {
      id: '3',
      name: 'محمد خالد الخالدي',
      employee_id: 'EMP003',
      department: 'المالية',
      position: 'محاسب أول',
      basic_salary: 11000,
      housing_allowance: 1800,
      transport_allowance: 700,
      other_allowances: 400,
      total_deductions: 1100,
      net_salary: 12800,
      status: 'approved',
      last_processed: '2024-01-12'
    }
  ];

  const payrollRuns: PayrollRun[] = [
    {
      id: '1',
      period_name: 'يناير 2024',
      start_date: '2024-01-01',
      end_date: '2024-01-31',
      total_employees: 156,
      total_gross: 1890000,
      total_deductions: 189000,
      total_net: 1701000,
      status: 'completed',
      processed_by: 'نورا أحمد السالم',
      created_date: '2024-01-15'
    },
    {
      id: '2',
      period_name: 'فبراير 2024',
      start_date: '2024-02-01',
      end_date: '2024-02-28',
      total_employees: 158,
      total_gross: 1920000,
      total_deductions: 192000,
      total_net: 1728000,
      status: 'processing',
      processed_by: 'محمد أحمد الخالدي',
      created_date: '2024-02-15'
    },
    {
      id: '3',
      period_name: 'مارس 2024',
      start_date: '2024-03-01',
      end_date: '2024-03-31',
      total_employees: 160,
      total_gross: 0,
      total_deductions: 0,
      total_net: 0,
      status: 'draft',
      processed_by: '',
      created_date: '2024-03-01'
    }
  ];

  const payrollMetrics: PayrollMetric[] = [
    {
      id: '1',
      metric: 'إجمالي تكلفة الرواتب',
      category: 'Cost',
      value: 1920000,
      target: 2000000,
      trend: 'stable',
      unit: 'ريال',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      metric: 'الرواتب المعالجة',
      category: 'Processing',
      value: 156,
      target: 160,
      trend: 'up',
      unit: 'موظف',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      metric: 'معدل الامتثال',
      category: 'Compliance',
      value: 98,
      target: 100,
      trend: 'up',
      unit: '%',
      lastUpdated: '2024-01-15'
    }
  ];

  // Analytics data
  const salaryTrendData = [
    { month: 'يناير', total: 1890000, basic: 1400000, allowances: 490000, deductions: 189000 },
    { month: 'فبراير', total: 1920000, basic: 1420000, allowances: 500000, deductions: 192000 },
    { month: 'مارس', total: 1950000, basic: 1450000, allowances: 500000, deductions: 195000 },
    { month: 'أبريل', total: 1980000, basic: 1470000, allowances: 510000, deductions: 198000 },
    { month: 'مايو', total: 2010000, basic: 1490000, allowances: 520000, deductions: 201000 },
    { month: 'يونيو', total: 2040000, basic: 1510000, allowances: 530000, deductions: 204000 }
  ];

  const departmentSalaryDistribution = [
    { name: 'تقنية المعلومات', value: 35, color: 'hsl(var(--primary))' },
    { name: 'الموارد البشرية', value: 20, color: 'hsl(var(--primary-glow))' },
    { name: 'المالية والمحاسبة', value: 18, color: 'hsl(var(--warning))' },
    { name: 'المبيعات والتسويق', value: 15, color: 'hsl(var(--success))' },
    { name: 'أقسام أخرى', value: 12, color: 'hsl(var(--muted-foreground))' }
  ];

  // Calculate statistics
  const stats = {
    totalPayrollCost: 1920000,
    processedSalaries: 156,
    pendingApprovals: 12,
    overduePayments: 3,
    avgSalary: 12308,
    totalEmployees: 160
  };

  const handleExport = (type: string) => {
    toast({
      title: "تم التصدير بنجاح",
      description: `تم تصدير تقرير ${type} كملف PDF`,
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const handleProcessPayroll = () => {
    toast({
      title: "بدء معالجة الرواتب",
      description: "تم بدء معالجة رواتب الشهر الحالي بنجاح",
    });
  };

  const handleGeneratePayslips = () => {
    toast({
      title: "إنشاء قسائم الراتب",
      description: "تم إنشاء قسائم الراتب لجميع الموظفين بنجاح",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
      case 'completed':
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'processing':
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'draft': return 'bg-muted text-muted-foreground border-border';
      case 'rejected':
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'processed': 'تم المعالجة',
      'pending': 'في الانتظار',
      'approved': 'معتمد',
      'rejected': 'مرفوض',
      'completed': 'مكتمل',
      'processing': 'جاري المعالجة',
      'draft': 'مسودة',
      'cancelled': 'ملغي'
    };
    return statusMap[status] || status;
  };

  const openEmployeeProfile = (employee: PayrollEmployee) => {
    setSelectedEmployee(employee);
    setIsEmployeeProfileOpen(true);
  };

  const renderHeader = () => (
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
            <DollarSign className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام الرواتب والأجور المتطور
            </h1>
            <p className="text-gray-600 text-lg">
              نظام شامل لإدارة ومعالجة رواتب الموظفين مع التحليل المتقدم
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <DollarSign className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300" onClick={handleProcessPayroll}>
          <Calculator className="h-4 w-4 ml-2" />
          معالجة الرواتب
        </Button>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي تكلفة الرواتب</p>
                <p className="text-2xl font-bold text-primary">{stats.totalPayrollCost.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">ريال سعودي</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الرواتب المعالجة</p>
                <p className="text-2xl font-bold text-warning">{stats.processedSalaries}</p>
                <p className="text-xs text-muted-foreground">موظف</p>
              </div>
              <Calculator className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">موافقات معلقة</p>
                <p className="text-2xl font-bold text-success">{stats.pendingApprovals}</p>
                <p className="text-xs text-muted-foreground">طلب</p>
              </div>
              <Clock className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مدفوعات متأخرة</p>
                <p className="text-2xl font-bold text-primary">{stats.overduePayments}</p>
                <p className="text-xs text-muted-foreground">دفعة</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الراتب</p>
                <p className="text-2xl font-bold text-primary">{stats.avgSalary.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">ريال</p>
              </div>
              <Target className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-success">{stats.totalEmployees}</p>
                <p className="text-xs text-muted-foreground">موظف</p>
              </div>
              <Users className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="h-5 w-5 text-primary" />
              اتجاه الرواتب الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salaryTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  formatter={(value) => [`${Number(value).toLocaleString()} ريال`, '']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="total" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
                <Area type="monotone" dataKey="basic" stackId="2" stroke="hsl(var(--success))" fill="hsl(var(--success))" />
                <Area type="monotone" dataKey="allowances" stackId="3" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <PieChart className="h-5 w-5 text-primary" />
              توزيع الرواتب حسب الأقسام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentSalaryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {departmentSalaryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
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
            رؤى الذكاء الاصطناعي للرواتب
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">معالجة ممتازة</span>
              </div>
              <p className="text-sm text-emerald-700">
                تم معالجة 98% من الرواتب بدون أخطاء هذا الشهر
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحذير ميزانية</span>
              </div>
              <p className="text-sm text-orange-700">
                تكلفة الرواتب تتجه لتجاوز الميزانية بنسبة 5%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية ذكية</span>
              </div>
              <p className="text-sm text-blue-700">
                يُنصح بمراجعة هيكل العلاوات في قسم التقنية
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities & Quick Actions */}
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
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-green-100">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تم معالجة رواتب يناير</p>
                  <p className="text-xs text-muted-foreground">156 موظف - منذ ساعتين</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-blue-100">
                  <Receipt className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">إنشاء قسائم الراتب</p>
                  <p className="text-xs text-muted-foreground">جميع الموظفين - منذ 4 ساعات</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-yellow-100">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">موافقة معلقة على العلاوات</p>
                  <p className="text-xs text-muted-foreground">12 طلب - منذ يوم</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col gap-2" onClick={handleProcessPayroll}>
                <Calculator className="h-5 w-5" />
                <span className="text-xs">معالجة الرواتب</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2" onClick={handleGeneratePayslips}>
                <Receipt className="h-5 w-5" />
                <span className="text-xs">إنشاء قسائم الراتب</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => handleExport('WPS')}>
                <Download className="h-5 w-5" />
                <span className="text-xs">تصدير ملف WPS</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2" onClick={() => handleExport('التقارير')}>
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">تقارير الرواتب</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEmployeeProfile = () => {
    if (!selectedEmployee) return null;

    return (
      <Dialog open={isEmployeeProfileOpen} onOpenChange={setIsEmployeeProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              الملف الشخصي للرواتب - {selectedEmployee.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأساسية</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <Label>الاسم</Label>
                  <p className="font-medium">{selectedEmployee.name}</p>
                </div>
                <div>
                  <Label>الرقم الوظيفي</Label>
                  <p className="font-medium">{selectedEmployee.employee_id}</p>
                </div>
                <div>
                  <Label>القسم</Label>
                  <p className="font-medium">{selectedEmployee.department}</p>
                </div>
                <div>
                  <Label>المنصب</Label>
                  <p className="font-medium">{selectedEmployee.position}</p>
                </div>
              </CardContent>
            </Card>

            {/* Salary Details */}
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل الراتب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">الراتب الأساسي</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedEmployee.basic_salary.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">بدل السكن</p>
                    <p className="text-2xl font-bold text-green-600">{selectedEmployee.housing_allowance.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">بدل النقل</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedEmployee.transport_allowance.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">بدلات أخرى</p>
                    <p className="text-2xl font-bold text-purple-600">{selectedEmployee.other_allowances.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">إجمالي الخصومات</p>
                      <p className="text-2xl font-bold text-red-600">{selectedEmployee.total_deductions.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">صافي الراتب</p>
                      <p className="text-3xl font-bold text-emerald-600">{selectedEmployee.net_salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Salary History */}
            <Card>
              <CardHeader>
                <CardTitle>تاريخ الرواتب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1,2,3].map((month) => (
                    <div key={month} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{month === 1 ? 'يناير 2024' : month === 2 ? 'ديسمبر 2023' : 'نوفمبر 2023'}</p>
                        <p className="text-sm text-muted-foreground">آخر معالجة: {selectedEmployee.last_processed}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{selectedEmployee.net_salary.toLocaleString()} ريال</p>
                        <Badge className={getStatusColor(selectedEmployee.status)}>
                          {getStatusText(selectedEmployee.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => handleExport('قسيمة الراتب')}>
                <Download className="h-4 w-4 ml-2" />
                تحميل قسيمة الراتب
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 ml-2" />
                تعديل الراتب
              </Button>
              <Button variant="outline">
                <Calculator className="h-4 w-4 ml-2" />
                حساب العلاوة
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b border-border">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="employee-records">سجلات الموظفين</TabsTrigger>
              <TabsTrigger value="salary-processing">معالجة الرواتب</TabsTrigger>
              <TabsTrigger value="deductions-benefits">الخصومات والمزايا</TabsTrigger>
              <TabsTrigger value="payslips">قسائم الرواتب</TabsTrigger>
              <TabsTrigger value="compliance-wps">الامتثال و WPS</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="employee-records">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">سجلات رواتب الموظفين</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة موظف جديد
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>قائمة الموظفين</CardTitle>
                  <div className="flex gap-4 mt-4">
                    <Input
                      placeholder="البحث في الموظفين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="processed">تم المعالجة</SelectItem>
                        <SelectItem value="pending">في الانتظار</SelectItem>
                        <SelectItem value="approved">معتمد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {payrollEmployees.map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{employee.name}</h3>
                            <p className="text-sm text-muted-foreground">{employee.employee_id} - {employee.department}</p>
                            <p className="text-sm text-muted-foreground">{employee.position}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{employee.net_salary.toLocaleString()} ريال</p>
                          <p className="text-sm text-muted-foreground">صافي الراتب</p>
                          <Badge className={getStatusColor(employee.status)}>
                            {getStatusText(employee.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEmployeeProfile(employee)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleExport('قسيمة الراتب')}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="salary-processing">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">معالجة الرواتب</h2>
                <Button onClick={handleProcessPayroll}>
                  <Calculator className="h-4 w-4 ml-2" />
                  بدء معالجة جديدة
                </Button>
              </div>

              <div className="grid gap-6">
                {payrollRuns.map((run) => (
                  <Card key={run.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {run.period_name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{run.total_employees}</p>
                          <p className="text-sm text-muted-foreground">عدد الموظفين</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{run.total_gross.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">إجمالي الرواتب</p>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">{run.total_deductions.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">إجمالي الخصومات</p>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded-lg">
                          <p className="text-2xl font-bold text-emerald-600">{run.total_net.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">صافي الرواتب</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-t pt-4">
                        <div>
                          <Badge className={getStatusColor(run.status)}>
                            {getStatusText(run.status)}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {run.processed_by ? `معالج بواسطة: ${run.processed_by}` : 'لم تتم المعالجة بعد'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleExport('WPS')}>
                            <Download className="h-4 w-4 ml-2" />
                            تصدير WPS
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calculator className="h-4 w-4 ml-2" />
                            إعادة المعالجة
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deductions-benefits">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">إدارة الخصومات والمزايا</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة خصم/مزية
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Deductions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      الخصومات
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                      <div>
                        <p className="font-medium">خصم قرض</p>
                        <p className="text-sm text-muted-foreground">أحمد محمد العلي</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">500 ريال</p>
                        <p className="text-xs text-muted-foreground">شهري</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                      <div>
                        <p className="font-medium">خصم غياب</p>
                        <p className="text-sm text-muted-foreground">محمد خالد الخالدي</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">200 ريال</p>
                        <p className="text-xs text-muted-foreground">لمرة واحدة</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                      <div>
                        <p className="font-medium">خصم تأديبي</p>
                        <p className="text-sm text-muted-foreground">فاطمة أحمد السالم</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">300 ريال</p>
                        <p className="text-xs text-muted-foreground">لمرة واحدة</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة خصم جديد
                    </Button>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Award className="h-5 w-5" />
                      المزايا والمكافآت
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-green-200 rounded-lg bg-green-50">
                      <div>
                        <p className="font-medium">مكافأة أداء</p>
                        <p className="text-sm text-muted-foreground">أحمد محمد العلي</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">1000 ريال</p>
                        <p className="text-xs text-muted-foreground">ربع سنوي</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-green-200 rounded-lg bg-green-50">
                      <div>
                        <p className="font-medium">عمولة مبيعات</p>
                        <p className="text-sm text-muted-foreground">فاطمة أحمد السالم</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">800 ريال</p>
                        <p className="text-xs text-muted-foreground">شهري</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-green-200 rounded-lg bg-green-50">
                      <div>
                        <p className="font-medium">بدل إضافي</p>
                        <p className="text-sm text-muted-foreground">محمد خالد الخالدي</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">400 ريال</p>
                        <p className="text-xs text-muted-foreground">شهري</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة مزية جديدة
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payslips">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">قسائم الرواتب</h2>
                <Button onClick={handleGeneratePayslips}>
                  <Receipt className="h-4 w-4 ml-2" />
                  إنشاء قسائم الراتب
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>قسائم الراتب الحديثة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {payrollEmployees.map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Receipt className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{employee.name}</h3>
                            <p className="text-sm text-muted-foreground">{employee.employee_id}</p>
                            <p className="text-sm text-muted-foreground">يناير 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{employee.net_salary.toLocaleString()} ريال</p>
                          <p className="text-sm text-muted-foreground">صافي الراتب</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleExport('قسيمة الراتب')}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance-wps">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">الامتثال ونظام حماية الأجور</h2>
                <Button onClick={() => handleExport('WPS')}>
                  <Download className="h-4 w-4 ml-2" />
                  تصدير ملف WPS
                </Button>
              </div>

              <div className="grid gap-6">
                {/* WPS Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      حالة نظام حماية الأجور
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">98%</p>
                        <p className="text-sm text-muted-foreground">معدل الامتثال</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">156</p>
                        <p className="text-sm text-muted-foreground">ملفات مرفوعة</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">3</p>
                        <p className="text-sm text-muted-foreground">أخطاء معلقة</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">15</p>
                        <p className="text-sm text-muted-foreground">يوم متبقي</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* GOSI Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      التكامل مع التأمينات الاجتماعية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-green-100">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">مساهمات التأمينات</h3>
                          <p className="text-sm text-muted-foreground">يناير 2024 - تم الرفع بنجاح</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">189,000 ريال</p>
                        <p className="text-sm text-muted-foreground">إجمالي المساهمات</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-yellow-100">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">مساهمات فبراير</h3>
                          <p className="text-sm text-muted-foreground">قيد المعالجة</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">192,000 ريال</p>
                        <p className="text-sm text-muted-foreground">متوقع</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      تنبيهات الامتثال
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">موعد رفع ملف WPS يقترب</p>
                          <p className="text-xs text-muted-foreground">يجب رفع ملف فبراير خلال 15 يوم</p>
                        </div>
                        <Button variant="outline" size="sm">
                          رفع الملف
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">خطأ في بيانات 3 موظفين</p>
                          <p className="text-xs text-muted-foreground">يجب تصحيح البيانات قبل الرفع</p>
                        </div>
                        <Button variant="outline" size="sm">
                          إصلاح الأخطاء
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">تم رفع ملف يناير بنجاح</p>
                          <p className="text-xs text-muted-foreground">جميع البيانات صحيحة ومقبولة</p>
                        </div>
                        <Button variant="outline" size="sm">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">تقارير الرواتب</h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      سجل الرواتب
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      تقرير شامل بجميع بيانات رواتب الموظفين
                    </p>
                    <Button className="w-full" onClick={() => handleExport('سجل الرواتب')}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل التقرير
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      التكلفة حسب القسم
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      تحليل توزيع تكاليف الرواتب على الأقسام
                    </p>
                    <Button className="w-full" onClick={() => handleExport('التكلفة حسب القسم')}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل التقرير
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      تقرير الإضافي
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      تفاصيل ساعات العمل الإضافية والمكافآت
                    </p>
                    <Button className="w-full" onClick={() => handleExport('تقرير الإضافي')}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل التقرير
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      الاتجاهات التاريخية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      تحليل اتجاهات الرواتب عبر الفترات الزمنية
                    </p>
                    <Button className="w-full" onClick={() => handleExport('الاتجاهات التاريخية')}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل التقرير
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      تقرير الامتثال
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      حالة الامتثال للوائح والأنظمة
                    </p>
                    <Button className="w-full" onClick={() => handleExport('تقرير الامتثال')}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل التقرير
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      الخصومات والمزايا
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      تقرير مفصل بالخصومات والمزايا
                    </p>
                    <Button className="w-full" onClick={() => handleExport('الخصومات والمزايا')}>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل التقرير
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إعدادات الرواتب</h2>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>دورات الرواتب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>دورة الرواتب الافتراضية</Label>
                        <Select defaultValue="monthly">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">أسبوعية</SelectItem>
                            <SelectItem value="bi-weekly">كل أسبوعين</SelectItem>
                            <SelectItem value="monthly">شهرية</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>يوم صرف الراتب</Label>
                        <Select defaultValue="25">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 من كل شهر</SelectItem>
                            <SelectItem value="25">25 من كل شهر</SelectItem>
                            <SelectItem value="30">آخر يوم في الشهر</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>العملة</Label>
                      <Select defaultValue="SAR">
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAR">الريال السعودي</SelectItem>
                          <SelectItem value="USD">الدولار الأمريكي</SelectItem>
                          <SelectItem value="EUR">اليورو</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>هيكل الرواتب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>نسبة بدل السكن (%)</Label>
                        <Input type="number" defaultValue="25" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>نسبة بدل النقل (%)</Label>
                        <Input type="number" defaultValue="10" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>نسبة التأمينات الاجتماعية (%)</Label>
                        <Input type="number" defaultValue="10" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>حد الإعفاء الضريبي</Label>
                        <Input type="number" defaultValue="0" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>صلاحيات الرواتب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">مدراء الموارد البشرية</p>
                          <p className="text-sm text-muted-foreground">إدارة كاملة للرواتب</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">نشط</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">موظفو الرواتب</p>
                          <p className="text-sm text-muted-foreground">معالجة وإدخال البيانات</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">نشط</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">المدراء المباشرون</p>
                          <p className="text-sm text-muted-foreground">عرض رواتب الفريق فقط</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">محدود</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button>حفظ الإعدادات</Button>
                  <Button variant="outline">استعادة الافتراضية</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {renderEmployeeProfile()}
    </div>
  );
};