import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  DollarSign,
  Users,
  Calculator,
  Download,
  Upload,
  FileText,
  CreditCard,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  PieChart,
  BarChart3,
  Calendar,
  Plus,
  Edit,
  Eye,
  Settings,
  Banknote,
  Percent,
  Target,
  Award
} from 'lucide-react';

interface PayrollRun {
  id: string;
  period: string;
  status: 'draft' | 'processing' | 'approved' | 'paid' | 'closed';
  totalEmployees: number;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  createdDate: string;
  processedBy: string;
  paymentDate?: string;
}

interface EmployeePayroll {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  basicSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  otherAllowances: number;
  overtimeHours: number;
  overtimePay: number;
  grossSalary: number;
  gosiEmployee: number;
  gosiEmployer: number;
  incomeTax: number;
  otherDeductions: number;
  totalDeductions: number;
  netSalary: number;
  bankAccount: string;
  iban: string;
}

interface SalaryStructure {
  id: string;
  grade: string;
  minSalary: number;
  maxSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  medicalInsurance: number;
  performanceBonus: number;
  isActive: boolean;
}

const PayrollCompensation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-03');

  // Mock payroll runs
  const [payrollRuns] = useState<PayrollRun[]>([
    {
      id: 'PR001',
      period: '2024-03',
      status: 'paid',
      totalEmployees: 245,
      totalGross: 3675000,
      totalDeductions: 551250,
      totalNet: 3123750,
      createdDate: '2024-03-25',
      processedBy: 'سارة أحمد المالي',
      paymentDate: '2024-03-30'
    },
    {
      id: 'PR002',
      period: '2024-04',
      status: 'processing',
      totalEmployees: 248,
      totalGross: 3720000,
      totalDeductions: 558000,
      totalNet: 3162000,
      createdDate: '2024-04-25',
      processedBy: 'محمد علي الحسن'
    }
  ]);

  // Mock employee payroll data
  const [employeePayrolls] = useState<EmployeePayroll[]>([
    {
      id: 'EP001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      basicSalary: 15000,
      housingAllowance: 2500,
      transportAllowance: 800,
      otherAllowances: 500,
      overtimeHours: 8,
      overtimePay: 600,
      grossSalary: 19400,
      gosiEmployee: 970,
      gosiEmployer: 970,
      incomeTax: 0,
      otherDeductions: 200,
      totalDeductions: 1170,
      netSalary: 18230,
      bankAccount: 'البنك الأهلي السعودي',
      iban: 'SA0310000012345678901'
    },
    {
      id: 'EP002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة سعد الأحمد',
      department: 'المالية',
      basicSalary: 12000,
      housingAllowance: 2000,
      transportAllowance: 800,
      otherAllowances: 300,
      overtimeHours: 4,
      overtimePay: 300,
      grossSalary: 15400,
      gosiEmployee: 770,
      gosiEmployer: 770,
      incomeTax: 0,
      otherDeductions: 150,
      totalDeductions: 920,
      netSalary: 14480,
      bankAccount: 'بنك الرياض',
      iban: 'SA0320000012345678901'
    }
  ]);

  // Mock salary structures
  const [salaryStructures] = useState<SalaryStructure[]>([
    {
      id: 'SS001',
      grade: 'مدير أول',
      minSalary: 25000,
      maxSalary: 35000,
      housingAllowance: 4000,
      transportAllowance: 1200,
      medicalInsurance: 800,
      performanceBonus: 15,
      isActive: true
    },
    {
      id: 'SS002',
      grade: 'أخصائي أول',
      minSalary: 15000,
      maxSalary: 22000,
      housingAllowance: 2500,
      transportAllowance: 800,
      medicalInsurance: 600,
      performanceBonus: 10,
      isActive: true
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'draft': { color: 'bg-gray-100 text-gray-800', text: 'مسودة', icon: FileText },
      'processing': { color: 'bg-blue-100 text-blue-800', text: 'قيد المعالجة', icon: Clock },
      'approved': { color: 'bg-green-100 text-green-800', text: 'معتمد', icon: CheckCircle },
      'paid': { color: 'bg-emerald-100 text-emerald-800', text: 'تم الدفع', icon: CreditCard },
      'closed': { color: 'bg-purple-100 text-purple-800', text: 'مغلق', icon: Shield }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const calculateStats = () => {
    const currentRun = payrollRuns.find(run => run.period === selectedPeriod);
    return {
      totalEmployees: currentRun?.totalEmployees || 0,
      totalGross: currentRun?.totalGross || 0,
      totalDeductions: currentRun?.totalDeductions || 0,
      totalNet: currentRun?.totalNet || 0,
      averageSalary: currentRun ? Math.round(currentRun.totalNet / currentRun.totalEmployees) : 0,
      gosiTotal: employeePayrolls.reduce((sum, emp) => sum + emp.gosiEmployee + emp.gosiEmployer, 0)
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#009F87]/10 rounded-lg">
            <DollarSign className="h-8 w-8 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">نظام الرواتب والتعويضات</h1>
            <p className="text-muted-foreground">إدارة شاملة للرواتب والمزايا والتأمينات</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 border-[#009F87]/20 focus:border-[#009F87]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-03">مارس 2024</SelectItem>
              <SelectItem value="2024-04">أبريل 2024</SelectItem>
              <SelectItem value="2024-05">مايو 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="hover:bg-[#009F87] hover:text-white">
            <Download className="h-4 w-4 ml-2" />
            تصدير كشوف الراتب
          </Button>
          <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
            <Plus className="h-4 w-4 ml-2" />
            دورة رواتب جديدة
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="relative grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87]">{stats.totalEmployees.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{(stats.totalGross / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-muted-foreground">إجمالي الراتب الأساسي</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-red-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Percent className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{(stats.totalDeductions / 1000).toFixed(0)}K</div>
            <div className="text-sm text-muted-foreground">إجمالي الخصومات</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-purple-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Banknote className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{(stats.totalNet / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-muted-foreground">صافي الراتب</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-blue-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.averageSalary.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">متوسط الراتب</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-orange-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.5s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{(stats.gosiTotal / 1000).toFixed(0)}K</div>
            <div className="text-sm text-muted-foreground">تأمينات اجتماعية</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="relative">
        <div className="flex space-x-1 bg-white/70 backdrop-blur rounded-lg p-1">
          {[
            { id: 'dashboard', label: 'لوحة التحكم', icon: BarChart3 },
            { id: 'payroll-runs', label: 'دورات الرواتب', icon: Calculator },
            { id: 'employee-payroll', label: 'كشوف الراتب', icon: FileText },
            { id: 'salary-structure', label: 'هيكل الرواتب', icon: Building2 },
            { id: 'benefits', label: 'المزايا والتأمينات', icon: Shield },
            { id: 'reports', label: 'التقارير', icon: PieChart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#009F87] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'dashboard' && (
        <div className="relative space-y-6">
          {/* Payroll Process Status */}
          <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#009F87]">
                <Calculator className="h-6 w-6" />
                حالة معالجة الرواتب - {selectedPeriod}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">جمع بيانات الحضور والإجازات</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <Progress value={100} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">حساب الرواتب والمزايا</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <Progress value={100} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">حساب الخصومات والتأمينات</span>
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <Progress value={75} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">مراجعة ومطابقة البيانات</span>
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <Progress value={45} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">التحويل إلى البنوك</span>
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Payroll Activity */}
          <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 animate-slide-in-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#009F87]">
                <Clock className="h-6 w-6" />
                النشاطات الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'تم إنشاء دورة رواتب جديدة لشهر أبريل 2024', time: 'منذ ساعتين', icon: Plus, color: 'text-green-600' },
                  { action: 'تم اعتماد كشوف رواتب قسم المالية', time: 'منذ 4 ساعات', icon: CheckCircle, color: 'text-blue-600' },
                  { action: 'تحديث بيانات التأمينات الاجتماعية', time: 'منذ 6 ساعات', icon: Shield, color: 'text-purple-600' },
                  { action: 'تم تحويل الرواتب إلى البنوك', time: 'أمس', icon: CreditCard, color: 'text-emerald-600' }
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#009F87]/5 transition-colors">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'payroll-runs' && (
        <div className="relative space-y-4">
          {payrollRuns.map((run, index) => (
            <Card 
              key={run.id}
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#009F87]">دورة رواتب {run.period}</h3>
                      {getStatusBadge(run.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">عدد الموظفين:</span>
                        <p className="font-semibold">{run.totalEmployees.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">إجمالي الراتب الأساسي:</span>
                        <p className="font-semibold text-green-600">{run.totalGross.toLocaleString()} ريال</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">إجمالي الخصومات:</span>
                        <p className="font-semibold text-red-600">{run.totalDeductions.toLocaleString()} ريال</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">صافي الراتب:</span>
                        <p className="font-semibold text-[#009F87]">{run.totalNet.toLocaleString()} ريال</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span>تم إنشاؤها: {run.createdDate}</span>
                      <span>بواسطة: {run.processedBy}</span>
                      {run.paymentDate && <span>تاريخ الدفع: {run.paymentDate}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Download className="h-4 w-4 ml-2" />
                      تصدير كشوف الراتب
                    </Button>
                    {run.status === 'approved' && (
                      <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                        <CreditCard className="h-4 w-4 ml-2" />
                        تحويل إلى البنوك
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'employee-payroll' && (
        <div className="relative space-y-4">
          {employeePayrolls.map((payroll, index) => (
            <Card 
              key={payroll.id}
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-[#009F87]">
                        {payroll.employeeName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{payroll.employeeName}</h3>
                      <p className="text-sm text-muted-foreground">{payroll.employeeId} • {payroll.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#009F87]">{payroll.netSalary.toLocaleString()} ريال</div>
                    <div className="text-sm text-muted-foreground">صافي الراتب</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800">المكونات الأساسية</div>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between">
                        <span>الراتب الأساسي:</span>
                        <span className="font-semibold">{payroll.basicSalary.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>بدل السكن:</span>
                        <span className="font-semibold">{payroll.housingAllowance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>بدل النقل:</span>
                        <span className="font-semibold">{payroll.transportAllowance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800">الإضافات</div>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between">
                        <span>بدلات أخرى:</span>
                        <span className="font-semibold">{payroll.otherAllowances.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ساعات إضافية:</span>
                        <span className="font-semibold">{payroll.overtimeHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>أجر إضافي:</span>
                        <span className="font-semibold">{payroll.overtimePay.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-medium text-red-800">الخصومات</div>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between">
                        <span>تأمينات (موظف):</span>
                        <span className="font-semibold">{payroll.gosiEmployee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ضريبة الدخل:</span>
                        <span className="font-semibold">{payroll.incomeTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>خصومات أخرى:</span>
                        <span className="font-semibold">{payroll.otherDeductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-800">المعلومات البنكية</div>
                    <div className="space-y-1 mt-1">
                      <div className="text-xs">
                        <span>البنك:</span>
                        <p className="font-medium">{payroll.bankAccount}</p>
                      </div>
                      <div className="text-xs">
                        <span>IBAN:</span>
                        <p className="font-mono font-medium">{payroll.iban}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل كشف الراتب
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                    <Edit className="h-4 w-4 ml-2" />
                    تعديل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'salary-structure' && (
        <div className="relative space-y-4">
          <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#009F87]">
                <Building2 className="h-6 w-6" />
                هيكل الرواتب والدرجات الوظيفية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salaryStructures.map((structure, index) => (
                  <Card 
                    key={structure.id}
                    className="hover:shadow-md transition-all animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-[#009F87]">{structure.grade}</h3>
                            <Badge className={structure.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {structure.isActive ? 'نشط' : 'غير نشط'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-muted-foreground">النطاق الراتبي:</span>
                              <p className="font-semibold">{structure.minSalary.toLocaleString()} - {structure.maxSalary.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">بدل السكن:</span>
                              <p className="font-semibold">{structure.housingAllowance.toLocaleString()} ريال</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">بدل النقل:</span>
                              <p className="font-semibold">{structure.transportAllowance.toLocaleString()} ريال</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">التأمين الطبي:</span>
                              <p className="font-semibold">{structure.medicalInsurance.toLocaleString()} ريال</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">مكافأة الأداء:</span>
                              <p className="font-semibold">{structure.performanceBonus}%</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                            <Edit className="h-4 w-4 ml-2" />
                            تحرير
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PayrollCompensation;