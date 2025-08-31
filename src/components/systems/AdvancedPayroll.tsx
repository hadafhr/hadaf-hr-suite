import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  ArrowLeft, DollarSign, Calculator, CreditCard, FileText, 
  Users, TrendingUp, PieChart, BarChart3, Download, Plus, 
  Search, Filter, Eye, Edit, Check, AlertCircle, Banknote
} from 'lucide-react';
import patternBg from '@/assets/boud-pattern-bg.jpg';
import gradientMesh from '@/assets/boud-gradient-mesh.jpg';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  period: string;
  basicSalary: number;
  allowances: {
    housing: number;
    transport: number;
    communication: number;
    other: number;
  };
  overtime: number;
  bonus: number;
  deductions: {
    gosi: number;
    tax: number;
    loans: number;
    penalties: number;
    other: number;
  };
  grossSalary: number;
  netSalary: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  paymentDate?: string;
  bankAccount: string;
}

interface PayrollProps {
  onBack: () => void;
}

export const AdvancedPayroll: React.FC<PayrollProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-03');
  const [isPayrollDialogOpen, setIsPayrollDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollRecord | null>(null);

  // Mock comprehensive payroll data
  const payrollData: PayrollRecord[] = [
    {
      id: 'PAY001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      position: 'مطور أول',
      period: '2024-03',
      basicSalary: 12000,
      allowances: {
        housing: 3000,
        transport: 800,
        communication: 300,
        other: 500
      },
      overtime: 1200,
      bonus: 2000,
      deductions: {
        gosi: 1080,
        tax: 0,
        loans: 500,
        penalties: 0,
        other: 100
      },
      grossSalary: 19800,
      netSalary: 18120,
      status: 'approved',
      paymentDate: '2024-03-30',
      bankAccount: '****-****-****-1234'
    },
    {
      id: 'PAY002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة أحمد سالم',
      department: 'الموارد البشرية',
      position: 'مدير الموارد البشرية',
      period: '2024-03',
      basicSalary: 15000,
      allowances: {
        housing: 4000,
        transport: 1000,
        communication: 400,
        other: 600
      },
      overtime: 0,
      bonus: 3000,
      deductions: {
        gosi: 1350,
        tax: 0,
        loans: 0,
        penalties: 0,
        other: 0
      },
      grossSalary: 24000,
      netSalary: 22650,
      status: 'paid',
      paymentDate: '2024-03-28',
      bankAccount: '****-****-****-5678'
    },
    {
      id: 'PAY003',
      employeeId: 'EMP003',
      employeeName: 'عبدالله يوسف خالد',
      department: 'المالية',
      position: 'محاسب مالي',
      period: '2024-03',
      basicSalary: 8000,
      allowances: {
        housing: 2000,
        transport: 600,
        communication: 200,
        other: 300
      },
      overtime: 600,
      bonus: 1000,
      deductions: {
        gosi: 720,
        tax: 0,
        loans: 300,
        penalties: 100,
        other: 50
      },
      grossSalary: 12700,
      netSalary: 11530,
      status: 'pending',
      bankAccount: '****-****-****-9012'
    }
  ];

  const payrollStats = {
    totalEmployees: 245,
    processedPayrolls: 189,
    pendingPayrolls: 32,
    totalPayroll: 2845000,
    averageSalary: 11800,
    totalAllowances: 890000,
    totalDeductions: 420000,
    payrollCompliance: 98.5
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: 'قيد المراجعة', className: 'bg-warning/20 text-warning border-warning/30' },
      approved: { text: 'معتمد', className: 'bg-success/20 text-success border-success/30' },
      paid: { text: 'مدفوع', className: 'bg-primary/20 text-primary border-primary/30' },
      rejected: { text: 'مرفوض', className: 'bg-destructive/20 text-destructive border-destructive/30' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const handleProcessPayroll = () => {
    toast.success('تم معالجة الرواتب بنجاح', {
      description: 'تم إرسال الرواتب للموظفين المعتمدين'
    });
  };

  const handleApprovePayroll = (id: string) => {
    toast.success('تم اعتماد الراتب', {
      description: 'تم اعتماد راتب الموظف بنجاح'
    });
  };

  const calculateTotalAllowances = (allowances: PayrollRecord['allowances']) => {
    return Object.values(allowances).reduce((sum, amount) => sum + amount, 0);
  };

  const calculateTotalDeductions = (deductions: PayrollRecord['deductions']) => {
    return Object.values(deductions).reduce((sum, amount) => sum + amount, 0);
  };

  const filteredPayroll = payrollData.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${gradientMesh})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative p-6 backdrop-blur-sm">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl">
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
                  رجوع
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm" onClick={handleProcessPayroll}>
                  <CreditCard className="h-4 w-4 ml-2" />
                  معالجة الرواتب
                </Button>
                <Dialog open={isPayrollDialogOpen} onOpenChange={setIsPayrollDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة راتب
                    </Button>
                  </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-primary">إضافة راتب جديد</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">الموظف</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الموظف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EMP001">أحمد محمد العلي</SelectItem>
                          <SelectItem value="EMP002">فاطمة أحمد سالم</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">الراتب الأساسي</label>
                      <Input placeholder="0.00" type="number" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">بدل السكن</label>
                      <Input placeholder="0.00" type="number" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">بدل النقل</label>
                      <Input placeholder="0.00" type="number" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">المكافآت</label>
                      <Input placeholder="0.00" type="number" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">العمل الإضافي</label>
                      <Input placeholder="0.00" type="number" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">التأمينات الاجتماعية</label>
                      <Input placeholder="0.00" type="number" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">استقطاعات أخرى</label>
                      <Input placeholder="0.00" type="number" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-end mt-6">
                  <Button variant="outline" onClick={() => setIsPayrollDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    حفظ الراتب
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <DollarSign className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام الرواتب والمكافآت المتقدم
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                منظومة ذكية شاملة لإدارة ومعالجة رواتب الموظفين مع أنظمة المكافآت والاستقطاعات المتطورة
              </p>
            </div>
          </div>
        </div>

        {/* Comprehensive Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي الرواتب</p>
                  <p className="text-3xl font-bold text-primary">
                    {payrollStats.totalPayroll.toLocaleString()} ر.س
                  </p>
                  <p className="text-xs text-muted-foreground">هذا الشهر</p>
                </div>
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Banknote className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur border-success/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">الرواتب المعالجة</p>
                  <p className="text-3xl font-bold text-success">{payrollStats.processedPayrolls}</p>
                  <Progress value={77} className="mt-2 h-2" />
                </div>
                <div className="p-3 bg-success/20 rounded-lg">
                  <Check className="h-8 w-8 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-warning/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">في انتظار المراجعة</p>
                  <p className="text-3xl font-bold text-warning">{payrollStats.pendingPayrolls}</p>
                  <p className="text-xs text-muted-foreground">راتب معلق</p>
                </div>
                <div className="p-3 bg-warning/20 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">متوسط الراتب</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {payrollStats.averageSalary.toLocaleString()} ر.س
                  </p>
                  <div className="flex items-center text-xs text-success mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +8.5% من الشهر الماضي
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs defaultValue="payroll" className="space-y-6">
          <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg border border-primary/20">
            <TabsList className="grid w-full grid-cols-4 bg-primary/10">
              <TabsTrigger value="payroll" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                كشوف الرواتب
              </TabsTrigger>
              <TabsTrigger value="allowances" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                البدلات والمكافآت
              </TabsTrigger>
              <TabsTrigger value="deductions" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                الاستقطاعات
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                التقارير المالية
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="payroll" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث عن موظف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/90 backdrop-blur border-primary/20"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40 bg-white/90 backdrop-blur border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-03">مارس 2024</SelectItem>
                    <SelectItem value="2024-02">فبراير 2024</SelectItem>
                    <SelectItem value="2024-01">يناير 2024</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-white/90 backdrop-blur border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">معلق</SelectItem>
                    <SelectItem value="approved">معتمد</SelectItem>
                    <SelectItem value="paid">مدفوع</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur border-primary/20">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </div>

            {/* Enhanced Payroll Records */}
            <div className="space-y-4">
              {filteredPayroll.map((record) => {
                const statusBadge = getStatusBadge(record.status);
                const totalAllowances = calculateTotalAllowances(record.allowances);
                const totalDeductions = calculateTotalDeductions(record.deductions);
                
                return (
                  <Card key={record.id} className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Employee Info */}
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/20 rounded-lg">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{record.employeeName}</h3>
                            <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                            <p className="text-xs text-primary font-medium">{record.department}</p>
                            <p className="text-xs text-muted-foreground">{record.position}</p>
                          </div>
                        </div>

                        {/* Salary Breakdown */}
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">الراتب الأساسي:</span>
                            <span className="font-medium float-left">{record.basicSalary.toLocaleString()} ر.س</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">البدلات:</span>
                            <span className="font-medium float-left text-success">+{totalAllowances.toLocaleString()} ر.س</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">العمل الإضافي:</span>
                            <span className="font-medium float-left text-blue-600">+{record.overtime.toLocaleString()} ر.س</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">المكافآت:</span>
                            <span className="font-medium float-left text-purple-600">+{record.bonus.toLocaleString()} ر.س</span>
                          </div>
                        </div>

                        {/* Deductions */}
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">التأمينات:</span>
                            <span className="font-medium float-left text-destructive">-{record.deductions.gosi.toLocaleString()} ر.س</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">القروض:</span>
                            <span className="font-medium float-left text-destructive">-{record.deductions.loans.toLocaleString()} ر.س</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">الجزاءات:</span>
                            <span className="font-medium float-left text-destructive">-{record.deductions.penalties.toLocaleString()} ر.س</span>
                          </div>
                          <div className="text-sm font-semibold border-t pt-2">
                            <span className="text-muted-foreground">إجمالي الاستقطاعات:</span>
                            <span className="float-left text-destructive">-{totalDeductions.toLocaleString()} ر.س</span>
                          </div>
                        </div>

                        {/* Net Salary & Status */}
                        <div className="space-y-3">
                          <div className="text-center p-4 bg-primary/10 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">الصافي</p>
                            <p className="text-2xl font-bold text-primary">
                              {record.netSalary.toLocaleString()} ر.س
                            </p>
                          </div>
                          <Badge className={statusBadge.className + ' w-full justify-center'}>
                            {statusBadge.text}
                          </Badge>
                          {record.paymentDate && (
                            <p className="text-xs text-center text-muted-foreground">
                              تاريخ الدفع: {record.paymentDate}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 justify-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => setSelectedEmployee(record)}
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          {record.status === 'pending' && (
                            <Button 
                              size="sm" 
                              className="w-full bg-success hover:bg-success/90"
                              onClick={() => handleApprovePayroll(record.id)}
                            >
                              <Check className="h-4 w-4 ml-2" />
                              اعتماد
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-4 w-4 ml-2" />
                            تعديل
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                        <div className="flex justify-between">
                          <span>رقم الحساب:</span>
                          <span className="font-medium">{record.bankAccount}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="allowances">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    بدلات السكن
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success mb-2">
                    {(payrollStats.totalAllowances * 0.4).toLocaleString()} ر.س
                  </div>
                  <p className="text-sm text-muted-foreground">45% من إجمالي البدلات</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    بدلات النقل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {(payrollStats.totalAllowances * 0.25).toLocaleString()} ر.س
                  </div>
                  <p className="text-sm text-muted-foreground">25% من إجمالي البدلات</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    بدلات أخرى
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {(payrollStats.totalAllowances * 0.35).toLocaleString()} ر.س
                  </div>
                  <p className="text-sm text-muted-foreground">30% من إجمالي البدلات</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deductions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle>توزيع الاستقطاعات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>التأمينات الاجتماعية</span>
                      <span className="font-bold text-destructive">
                        {(payrollStats.totalDeductions * 0.6).toLocaleString()} ر.س
                      </span>
                    </div>
                    <Progress value={60} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>القروض والسلف</span>
                      <span className="font-bold text-destructive">
                        {(payrollStats.totalDeductions * 0.25).toLocaleString()} ر.س
                      </span>
                    </div>
                    <Progress value={25} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>الجزاءات والغرامات</span>
                      <span className="font-bold text-destructive">
                        {(payrollStats.totalDeductions * 0.15).toLocaleString()} ر.س
                      </span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle>إحصائيات الاستقطاعات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-destructive mb-2">
                      {payrollStats.totalDeductions.toLocaleString()} ر.س
                    </div>
                    <p className="text-muted-foreground mb-4">إجمالي الاستقطاعات الشهرية</p>
                    <div className="text-sm text-muted-foreground">
                      متوسط الاستقطاع للموظف: {Math.round(payrollStats.totalDeductions / payrollStats.totalEmployees).toLocaleString()} ر.س
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">تقرير الرواتب الشامل</h3>
                  <p className="text-sm text-muted-foreground">تحليل مفصل لجميع الرواتب والبدلات</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-success/20 rounded-full w-fit mx-auto mb-4">
                    <PieChart className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold mb-2">تقرير التكاليف</h3>
                  <p className="text-sm text-muted-foreground">توزيع تكاليف الموارد البشرية</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">تقرير الامتثال</h3>
                  <p className="text-sm text-muted-foreground">تقرير الامتثال للأنظمة الحكومية</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};