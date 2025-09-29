import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Shield,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Eye,
  Settings,
  CreditCard,
  Users,
  Receipt,
  User,
  Edit,
  Trash2,
  Share
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

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

export const ComprehensivePayrollSystem: React.FC<ComprehensivePayrollSystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollEmployee | null>(null);
  const [isEmployeeProfileOpen, setIsEmployeeProfileOpen] = useState(false);
  const [isAddDeductionOpen, setIsAddDeductionOpen] = useState(false);
  const [isAddBenefitOpen, setIsAddBenefitOpen] = useState(false);
  const [isPayrollSheetOpen, setIsPayrollSheetOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    employee_id: '',
    department: '',
    position: '',
    basic_salary: 0,
    housing_allowance: 0,
    transport_allowance: 0,
    other_allowances: 0
  });
  const [newDeduction, setNewDeduction] = useState({
    type: '',
    employee_id: '',
    amount: 0,
    description: '',
    frequency: 'monthly'
  });
  const [newBenefit, setNewBenefit] = useState({
    type: '',
    employee_id: '',
    amount: 0,
    description: '',
    frequency: 'monthly'
  });

  // Enhanced mock data with more employees
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
    },
    {
      id: '4',
      name: 'سارة علي الزهراني',
      employee_id: 'EMP004',
      department: 'التسويق',
      position: 'مدير تسويق',
      basic_salary: 15000,
      housing_allowance: 2500,
      transport_allowance: 1000,
      other_allowances: 800,
      total_deductions: 1500,
      net_salary: 17800,
      status: 'processed',
      last_processed: '2024-01-15'
    },
    {
      id: '5',
      name: 'عبدالله محمد القحطاني',
      employee_id: 'EMP005',
      department: 'المبيعات',
      position: 'مندوب مبيعات أول',
      basic_salary: 8500,
      housing_allowance: 1200,
      transport_allowance: 800,
      other_allowances: 1500,
      total_deductions: 850,
      net_salary: 11150,
      status: 'processed',
      last_processed: '2024-01-15'
    },
    {
      id: '6',
      name: 'نورا أحمد الغامدي',
      employee_id: 'EMP006',
      department: 'خدمة العملاء',
      position: 'أخصائي خدمة عملاء',
      basic_salary: 7000,
      housing_allowance: 1000,
      transport_allowance: 500,
      other_allowances: 200,
      total_deductions: 700,
      net_salary: 8000,
      status: 'pending',
      last_processed: '2024-01-10'
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
    }
  ];

  // Analytics data
  const salaryTrendData = [
    { month: 'يناير', total: 1890000, basic: 1400000, allowances: 490000, deductions: 189000 },
    { month: 'فبراير', total: 1920000, basic: 1420000, allowances: 500000, deductions: 192000 },
    { month: 'مارس', total: 1950000, basic: 1450000, allowances: 500000, deductions: 195000 },
    { month: 'أبريل', total: 1980000, basic: 1470000, allowances: 510000, deductions: 198000 }
  ];

  const departmentSalaryDistribution = [
    { name: 'تقنية المعلومات', value: 35, color: 'hsl(var(--primary))' },
    { name: 'الموارد البشرية', value: 20, color: 'hsl(var(--primary-glow))' },
    { name: 'المالية والمحاسبة', value: 18, color: 'hsl(var(--warning))' },
    { name: 'المبيعات والتسويق', value: 15, color: 'hsl(var(--success))' },
    { name: 'أقسام أخرى', value: 12, color: 'hsl(var(--muted-foreground))' }
  ];

  // Statistics calculations
  const stats = {
    totalPayrollCost: payrollEmployees.reduce((sum, emp) => sum + emp.net_salary, 0),
    processedSalaries: payrollEmployees.filter(emp => emp.status === 'processed').length,
    pendingApprovals: payrollEmployees.filter(emp => emp.status === 'pending').length,
    overduePayments: payrollEmployees.filter(emp => emp.status === 'rejected').length,
    avgSalary: Math.round(payrollEmployees.reduce((sum, emp) => sum + emp.net_salary, 0) / payrollEmployees.length),
    totalEmployees: payrollEmployees.length
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

  const handleAddEmployee = () => {
    const employee: PayrollEmployee = {
      id: Date.now().toString(),
      name: newEmployee.name,
      employee_id: newEmployee.employee_id,
      department: newEmployee.department,
      position: newEmployee.position,
      basic_salary: newEmployee.basic_salary,
      housing_allowance: newEmployee.housing_allowance,
      transport_allowance: newEmployee.transport_allowance,
      other_allowances: newEmployee.other_allowances,
      total_deductions: 0,
      net_salary: newEmployee.basic_salary + newEmployee.housing_allowance + newEmployee.transport_allowance + newEmployee.other_allowances,
      status: 'pending',
      last_processed: new Date().toISOString().split('T')[0]
    };
    
    toast({
      title: "تم إضافة الموظف",
      description: `تم إضافة ${employee.name} بنجاح`,
    });
    
    setIsAddDialogOpen(false);
    setNewEmployee({
      name: '',
      employee_id: '',
      department: '',
      position: '',
      basic_salary: 0,
      housing_allowance: 0,
      transport_allowance: 0,
      other_allowances: 0
    });
  };

  const handleAddDeduction = () => {
    toast({
      title: "تم إضافة الخصم",
      description: `تم إضافة خصم ${newDeduction.type} بقيمة ${newDeduction.amount} ريال`,
    });
    
    setIsAddDeductionOpen(false);
    setNewDeduction({
      type: '',
      employee_id: '',
      amount: 0,
      description: '',
      frequency: 'monthly'
    });
  };

  const handleAddBenefit = () => {
    toast({
      title: "تم إضافة المزية",
      description: `تم إضافة مزية ${newBenefit.type} بقيمة ${newBenefit.amount} ريال`,
    });
    
    setIsAddBenefitOpen(false);
    setNewBenefit({
      type: '',
      employee_id: '',
      amount: 0,
      description: '',
      frequency: 'monthly'
    });
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-12 p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 animate-fade-in">
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
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => setIsPayrollSheetOpen(true)}>
          <Receipt className="h-4 w-4 ml-2" />
          كشف الرواتب
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
              توزيع الرواتب حسب القسم
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
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentSalaryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Comprehensive Payroll Sheet Dialog
  const renderPayrollSheet = () => (
    <Dialog open={isPayrollSheetOpen} onOpenChange={setIsPayrollSheetOpen}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-6 w-6 text-primary" />
            كشف الرواتب التفصيلي - يناير 2024
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{payrollEmployees.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-success">
                  {payrollEmployees.reduce((sum, emp) => sum + emp.basic_salary + emp.housing_allowance + emp.transport_allowance + emp.other_allowances, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي الرواتب الإجمالية</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-destructive">
                  {payrollEmployees.reduce((sum, emp) => sum + emp.total_deductions, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي الخصومات</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">
                  {payrollEmployees.reduce((sum, emp) => sum + emp.net_salary, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">صافي الرواتب</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Payroll Table */}
          <Card>
            <CardHeader>
              <CardTitle>كشف الرواتب التفصيلي</CardTitle>
              <div className="flex gap-2">
                <Button onClick={() => handleExport('كشف الرواتب')}>
                  <Download className="h-4 w-4 ml-2" />
                  تصدير Excel
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <FileText className="h-4 w-4 ml-2" />
                  طباعة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-2 text-right">الرقم الوظيفي</th>
                      <th className="border border-border p-2 text-right">اسم الموظف</th>
                      <th className="border border-border p-2 text-right">القسم</th>
                      <th className="border border-border p-2 text-right">المنصب</th>
                      <th className="border border-border p-2 text-right">الراتب الأساسي</th>
                      <th className="border border-border p-2 text-right">بدل السكن</th>
                      <th className="border border-border p-2 text-right">بدل النقل</th>
                      <th className="border border-border p-2 text-right">بدلات أخرى</th>
                      <th className="border border-border p-2 text-right">إجمالي الراتب</th>
                      <th className="border border-border p-2 text-right">التأمينات</th>
                      <th className="border border-border p-2 text-right">خصومات أخرى</th>
                      <th className="border border-border p-2 text-right">إجمالي الخصم</th>
                      <th className="border border-border p-2 text-right">صافي الراتب</th>
                      <th className="border border-border p-2 text-right">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollEmployees.map((employee, index) => {
                      const grossSalary = employee.basic_salary + employee.housing_allowance + employee.transport_allowance + employee.other_allowances;
                      const gosiDeduction = Math.round(grossSalary * 0.10);
                      const otherDeductions = employee.total_deductions - gosiDeduction;
                      
                      return (
                        <tr key={employee.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                          <td className="border border-border p-2">{employee.employee_id}</td>
                          <td className="border border-border p-2 font-medium">{employee.name}</td>
                          <td className="border border-border p-2">{employee.department}</td>
                          <td className="border border-border p-2">{employee.position}</td>
                          <td className="border border-border p-2 text-right font-medium">{employee.basic_salary.toLocaleString()}</td>
                          <td className="border border-border p-2 text-right">{employee.housing_allowance.toLocaleString()}</td>
                          <td className="border border-border p-2 text-right">{employee.transport_allowance.toLocaleString()}</td>
                          <td className="border border-border p-2 text-right">{employee.other_allowances.toLocaleString()}</td>
                          <td className="border border-border p-2 text-right font-bold text-success">{grossSalary.toLocaleString()}</td>
                          <td className="border border-border p-2 text-right text-destructive">{gosiDeduction.toLocaleString()}</td>
                          <td className="border border-border p-2 text-right text-destructive">{otherDeductions.toLocaleString()}</td>
                          <td className="border border-border p-2 text-right font-medium text-destructive">{employee.total_deductions.toLocaleString()}</td>
                          <td className="border border-border p-2 text-right font-bold text-primary text-lg">{employee.net_salary.toLocaleString()}</td>
                          <td className="border border-border p-2">
                            <Badge className={getStatusColor(employee.status)}>
                              {getStatusText(employee.status)}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-primary/10 font-bold">
                      <td colSpan={4} className="border border-border p-2 text-right font-bold">المجموع الإجمالي:</td>
                      <td className="border border-border p-2 text-right font-bold">
                        {payrollEmployees.reduce((sum, emp) => sum + emp.basic_salary, 0).toLocaleString()}
                      </td>
                      <td className="border border-border p-2 text-right font-bold">
                        {payrollEmployees.reduce((sum, emp) => sum + emp.housing_allowance, 0).toLocaleString()}
                      </td>
                      <td className="border border-border p-2 text-right font-bold">
                        {payrollEmployees.reduce((sum, emp) => sum + emp.transport_allowance, 0).toLocaleString()}
                      </td>
                      <td className="border border-border p-2 text-right font-bold">
                        {payrollEmployees.reduce((sum, emp) => sum + emp.other_allowances, 0).toLocaleString()}
                      </td>
                      <td className="border border-border p-2 text-right font-bold text-success">
                        {payrollEmployees.reduce((sum, emp) => sum + emp.basic_salary + emp.housing_allowance + emp.transport_allowance + emp.other_allowances, 0).toLocaleString()}
                      </td>
                      <td className="border border-border p-2 text-right font-bold text-destructive">
                        {Math.round(payrollEmployees.reduce((sum, emp) => sum + (emp.basic_salary + emp.housing_allowance + emp.transport_allowance + emp.other_allowances) * 0.10, 0)).toLocaleString()}
                      </td>
                      <td className="border border-border p-2 text-right font-bold text-destructive">
                        {payrollEmployees.reduce((sum, emp) => sum + emp.total_deductions - Math.round((emp.basic_salary + emp.housing_allowance + emp.transport_allowance + emp.other_allowances) * 0.10), 0).toLocaleString()}
                      </td>
                      <td className="border border-border p-2 text-right font-bold text-destructive">
                        {payrollEmployees.reduce((sum, emp) => sum + emp.total_deductions, 0).toLocaleString()}
                      </td>
                      <td className="border border-border p-2 text-right font-bold text-primary text-lg">
                        {payrollEmployees.reduce((sum, emp) => sum + emp.net_salary, 0).toLocaleString()}
                      </td>
                      <td className="border border-border p-2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Add Employee Dialog
  const renderAddEmployeeDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>إضافة موظف جديد</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الموظف</Label>
              <Input
                id="name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                placeholder="أدخل اسم الموظف"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee_id">الرقم الوظيفي</Label>
              <Input
                id="employee_id"
                value={newEmployee.employee_id}
                onChange={(e) => setNewEmployee({ ...newEmployee, employee_id: e.target.value })}
                placeholder="EMP001"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">القسم</Label>
              <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                  <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                  <SelectItem value="المالية">المالية</SelectItem>
                  <SelectItem value="التسويق">التسويق</SelectItem>
                  <SelectItem value="المبيعات">المبيعات</SelectItem>
                  <SelectItem value="خدمة العملاء">خدمة العملاء</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">المنصب</Label>
              <Input
                id="position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                placeholder="أدخل المنصب الوظيفي"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basic_salary">الراتب الأساسي</Label>
              <Input
                id="basic_salary"
                type="number"
                value={newEmployee.basic_salary}
                onChange={(e) => setNewEmployee({ ...newEmployee, basic_salary: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="housing_allowance">بدل السكن</Label>
              <Input
                id="housing_allowance"
                type="number"
                value={newEmployee.housing_allowance}
                onChange={(e) => setNewEmployee({ ...newEmployee, housing_allowance: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transport_allowance">بدل النقل</Label>
              <Input
                id="transport_allowance"
                type="number"
                value={newEmployee.transport_allowance}
                onChange={(e) => setNewEmployee({ ...newEmployee, transport_allowance: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other_allowances">بدلات أخرى</Label>
              <Input
                id="other_allowances"
                type="number"
                value={newEmployee.other_allowances}
                onChange={(e) => setNewEmployee({ ...newEmployee, other_allowances: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
          </div>
          
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddEmployee}>
              إضافة الموظف
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-900/60 backdrop-blur-xl">
      {renderHeader()}
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 p-8">
          <div className="border-b border-border">
            <TabsList className="grid w-full grid-cols-8 bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-lg shadow-[#008C6A]/10 rounded-xl">
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
            <div className="space-y-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 p-8">
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
            <div className="space-y-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 p-8">
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
                    <CardContent className="space-y-4 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 p-8">
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
                <div className="flex gap-2">
                  <Button onClick={() => setIsAddDeductionOpen(true)} variant="outline">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة خصم
                  </Button>
                  <Button onClick={() => setIsAddBenefitOpen(true)}>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة مزية
                  </Button>
                </div>
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
                    {[
                      { employee: 'أحمد محمد العلي', type: 'خصم قرض', amount: 500, frequency: 'شهري' },
                      { employee: 'محمد خالد الخالدي', type: 'خصم غياب', amount: 200, frequency: 'لمرة واحدة' },
                      { employee: 'فاطمة أحمد السالم', type: 'خصم تأديبي', amount: 300, frequency: 'لمرة واحدة' }
                    ].map((deduction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                        <div>
                          <p className="font-medium">{deduction.type}</p>
                          <p className="text-sm text-muted-foreground">{deduction.employee}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">{deduction.amount} ريال</p>
                          <p className="text-xs text-muted-foreground">{deduction.frequency}</p>
                        </div>
                      </div>
                    ))}
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
                    {[
                      { employee: 'أحمد محمد العلي', type: 'مكافأة أداء', amount: 1000, frequency: 'ربع سنوي' },
                      { employee: 'فاطمة أحمد السالم', type: 'عمولة مبيعات', amount: 800, frequency: 'شهري' },
                      { employee: 'محمد خالد الخالدي', type: 'بدل إضافي', amount: 400, frequency: 'شهري' }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-green-200 rounded-lg bg-green-50">
                        <div>
                          <p className="font-medium">{benefit.type}</p>
                          <p className="text-sm text-muted-foreground">{benefit.employee}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{benefit.amount} ريال</p>
                          <p className="text-xs text-muted-foreground">{benefit.frequency}</p>
                        </div>
                      </div>
                    ))}
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
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">تقارير الرواتب</h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { title: 'سجل الرواتب', icon: FileText, desc: 'تقرير شامل بجميع بيانات رواتب الموظفين' },
                  { title: 'التكلفة حسب القسم', icon: BarChart3, desc: 'تحليل توزيع تكاليف الرواتب على الأقسام' },
                  { title: 'تقرير الإضافي', icon: Clock, desc: 'تفاصيل ساعات العمل الإضافية والمكافآت' },
                  { title: 'الاتجاهات التاريخية', icon: TrendingUp, desc: 'تحليل اتجاهات الرواتب عبر الفترات الزمنية' },
                  { title: 'تقرير الامتثال', icon: Shield, desc: 'حالة الامتثال للوائح والأنظمة' },
                  { title: 'الخصومات والمزايا', icon: AlertTriangle, desc: 'تقرير مفصل بالخصومات والمزايا' }
                ].map((report) => (
                  <Card key={report.title} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <report.icon className="h-5 w-5" />
                        {report.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{report.desc}</p>
                      <Button className="w-full" onClick={() => handleExport(report.title)}>
                        <Download className="h-4 w-4 ml-2" />
                        تحميل التقرير
                      </Button>
                    </CardContent>
                  </Card>
                ))}
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

      {/* Render all dialogs */}
      {renderPayrollSheet()}
      {renderAddEmployeeDialog()}
      
      {/* Add Deduction Dialog */}
      <Dialog open={isAddDeductionOpen} onOpenChange={setIsAddDeductionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة خصم جديد</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deduction_type">نوع الخصم</Label>
                <Select value={newDeduction.type} onValueChange={(value) => setNewDeduction({ ...newDeduction, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الخصم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="قرض">خصم قرض</SelectItem>
                    <SelectItem value="غياب">خصم غياب</SelectItem>
                    <SelectItem value="تأديبي">خصم تأديبي</SelectItem>
                    <SelectItem value="تأمين">خصم تأمين</SelectItem>
                    <SelectItem value="أخرى">خصومات أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deduction_employee">الموظف</Label>
                <Select value={newDeduction.employee_id} onValueChange={(value) => setNewDeduction({ ...newDeduction, employee_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    {payrollEmployees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} - {employee.employee_id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deduction_amount">المبلغ</Label>
                <Input
                  id="deduction_amount"
                  type="number"
                  value={newDeduction.amount}
                  onChange={(e) => setNewDeduction({ ...newDeduction, amount: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deduction_frequency">التكرار</Label>
                <Select value={newDeduction.frequency} onValueChange={(value) => setNewDeduction({ ...newDeduction, frequency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">شهري</SelectItem>
                    <SelectItem value="once">لمرة واحدة</SelectItem>
                    <SelectItem value="quarterly">ربع سنوي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deduction_description">الوصف</Label>
              <Textarea
                id="deduction_description"
                value={newDeduction.description}
                onChange={(e) => setNewDeduction({ ...newDeduction, description: e.target.value })}
                placeholder="أدخل وصف الخصم"
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsAddDeductionOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddDeduction}>
                إضافة الخصم
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Benefit Dialog */}
      <Dialog open={isAddBenefitOpen} onOpenChange={setIsAddBenefitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة مزية جديدة</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="benefit_type">نوع المزية</Label>
                <Select value={newBenefit.type} onValueChange={(value) => setNewBenefit({ ...newBenefit, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المزية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="أداء">مكافأة أداء</SelectItem>
                    <SelectItem value="مبيعات">عمولة مبيعات</SelectItem>
                    <SelectItem value="إضافي">بدل إضافي</SelectItem>
                    <SelectItem value="علاوة">علاوة سنوية</SelectItem>
                    <SelectItem value="أخرى">مزايا أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefit_employee">الموظف</Label>
                <Select value={newBenefit.employee_id} onValueChange={(value) => setNewBenefit({ ...newBenefit, employee_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    {payrollEmployees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} - {employee.employee_id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="benefit_amount">المبلغ</Label>
                <Input
                  id="benefit_amount"
                  type="number"
                  value={newBenefit.amount}
                  onChange={(e) => setNewBenefit({ ...newBenefit, amount: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefit_frequency">التكرار</Label>
                <Select value={newBenefit.frequency} onValueChange={(value) => setNewBenefit({ ...newBenefit, frequency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">شهري</SelectItem>
                    <SelectItem value="once">لمرة واحدة</SelectItem>
                    <SelectItem value="quarterly">ربع سنوي</SelectItem>
                    <SelectItem value="annual">سنوي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="benefit_description">الوصف</Label>
              <Textarea
                id="benefit_description"
                value={newBenefit.description}
                onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                placeholder="أدخل وصف المزية"
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsAddBenefitOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddBenefit}>
                إضافة المزية
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};