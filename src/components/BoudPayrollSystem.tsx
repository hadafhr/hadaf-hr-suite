import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DollarSign, Calendar, Users, TrendingUp, Plus, Eye, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PayrollRun {
  id: string;
  company_id: string;
  payroll_month: number;
  payroll_year: number;
  payroll_period_start: string;
  payroll_period_end: string;
  total_gross_salary?: number;
  total_deductions?: number;
  total_net_salary?: number;
  status: string;
  approved_date?: string;
  created_at: string;
}

interface PayrollItem {
  id: string;
  employee_id: string;
  basic_salary?: number;
  housing_allowance?: number;
  transport_allowance?: number;
  other_allowances?: number;
  overtime_pay?: number;
  gross_salary?: number;
  total_deductions?: number;
  net_salary?: number;
  employee?: {
    first_name: string;
    last_name: string;
    employee_id: string;
  };
}

export const BoudPayrollSystem: React.FC = () => {
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRun | null>(null);
  const [payrollItems, setPayrollItems] = useState<PayrollItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewPayrollOpen, setIsNewPayrollOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(new Date().toISOString().substring(0, 7));
  const [stats, setStats] = useState({
    totalPayrollRuns: 0,
    currentMonthPayroll: 0,
    avgSalary: 0,
    totalEmployees: 0
  });
  const { toast } = useToast();

  const [newPayroll, setNewPayroll] = useState({
    payroll_month: new Date().getMonth() + 1,
    payroll_year: new Date().getFullYear(),
    payroll_period_start: '',
    payroll_period_end: ''
  });

  // Fetch payroll runs
  const fetchPayrollRuns = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('boud_payroll_runs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayrollRuns((data || []) as PayrollRun[]);
    } catch (error) {
      console.error('Error fetching payroll runs:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل بيانات الرواتب',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch payroll stats
  const fetchPayrollStats = async () => {
    try {
      const [payrollRunsResult, payrollItemsResult, employeesResult] = await Promise.all([
        supabase
          .from('boud_payroll_runs')
          .select('*', { count: 'exact' }),
        supabase
          .from('boud_payroll_items')
          .select('net_salary')
          .not('net_salary', 'is', null),
        supabase
          .from('boud_employees')
          .select('id', { count: 'exact' })
          .eq('is_active', true)
      ]);

      const totalPayrollRuns = payrollRunsResult.count || 0;
      const totalEmployees = employeesResult.count || 0;
      
      const allSalaries = payrollItemsResult.data || [];
      const totalSalaries = allSalaries.reduce((sum, item) => sum + (item.net_salary || 0), 0);
      const avgSalary = allSalaries.length > 0 ? totalSalaries / allSalaries.length : 0;

      // Get current month payroll
      const currentMonthNum = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const currentMonthPayrolls = payrollRuns.filter(run => 
        run.payroll_month === currentMonthNum && run.payroll_year === currentYear
      );
      const currentMonthPayroll = currentMonthPayrolls.reduce((sum, run) => 
        sum + (run.total_net_salary || 0), 0
      );

      setStats({
        totalPayrollRuns,
        currentMonthPayroll: Math.round(currentMonthPayroll),
        avgSalary: Math.round(avgSalary),
        totalEmployees
      });
    } catch (error) {
      console.error('Error fetching payroll stats:', error);
    }
  };

  // Fetch payroll items for selected payroll
  const fetchPayrollItems = async (payrollRunId: string) => {
    try {
      const { data, error } = await supabase
        .from('boud_payroll_items')
        .select(`
          *,
          employee:boud_employees(first_name, last_name, employee_id)
        `)
        .eq('payroll_run_id', payrollRunId);

      if (error) throw error;
      setPayrollItems(data || []);
    } catch (error) {
      console.error('Error fetching payroll items:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل تفاصيل الرواتب',
        variant: 'destructive'
      });
    }
  };

  // Create new payroll run
  const createPayrollRun = async () => {
    try {
      const { data, error } = await supabase
        .from('boud_payroll_runs')
        .insert([{
          ...newPayroll,
          company_id: '00000000-0000-0000-0000-000000000000', // This should be dynamic
          status: 'draft',
          total_gross_salary: 0,
          total_deductions: 0,
          total_net_salary: 0
        }])
        .select()
        .single();

      if (error) throw error;

      setPayrollRuns(prev => [data, ...prev]);
      setIsNewPayrollOpen(false);
      setNewPayroll({
        payroll_month: new Date().getMonth() + 1,
        payroll_year: new Date().getFullYear(),
        payroll_period_start: '',
        payroll_period_end: ''
      });
      
      toast({
        title: 'نجح',
        description: 'تم إنشاء دورة رواتب جديدة بنجاح'
      });
    } catch (error) {
      console.error('Error creating payroll run:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في إنشاء دورة الرواتب',
        variant: 'destructive'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: 'مسودة', variant: 'secondary' as const },
      processing: { label: 'قيد المعالجة', variant: 'default' as const },
      approved: { label: 'معتمد', variant: 'default' as const },
      paid: { label: 'مدفوع', variant: 'default' as const }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.draft;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return '0 ريال';
    return `${amount.toLocaleString()} ريال`;
  };

  const getPayrollPeriod = (run: PayrollRun) => {
    const monthNames = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    return `${monthNames[run.payroll_month - 1]} ${run.payroll_year}`;
  };

  useEffect(() => {
    fetchPayrollRuns();
  }, []);

  useEffect(() => {
    if (payrollRuns.length > 0) {
      fetchPayrollStats();
    }
  }, [payrollRuns]);

  const statsCards = [
    {
      title: 'إجمالي دورات الرواتب',
      value: stats.totalPayrollRuns,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'رواتب الشهر الحالي',
      value: formatCurrency(stats.currentMonthPayroll),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'متوسط الراتب',
      value: formatCurrency(stats.avgSalary),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'إجمالي الموظفين',
      value: stats.totalEmployees,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">نظام الرواتب</h2>
          <p className="text-muted-foreground">إدارة ومعالجة رواتب الموظفين</p>
        </div>
        <Dialog open={isNewPayrollOpen} onOpenChange={setIsNewPayrollOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              دورة رواتب جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إنشاء دورة رواتب جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payroll_month">الشهر</Label>
                  <Input
                    id="payroll_month"
                    type="number"
                    min="1"
                    max="12"
                    value={newPayroll.payroll_month}
                    onChange={(e) => setNewPayroll(prev => ({ ...prev, payroll_month: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="payroll_year">السنة</Label>
                  <Input
                    id="payroll_year"
                    type="number"
                    value={newPayroll.payroll_year}
                    onChange={(e) => setNewPayroll(prev => ({ ...prev, payroll_year: Number(e.target.value) }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="period_start">تاريخ البداية</Label>
                <Input
                  id="period_start"
                  type="date"
                  value={newPayroll.payroll_period_start}
                  onChange={(e) => setNewPayroll(prev => ({ ...prev, payroll_period_start: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="period_end">تاريخ النهاية</Label>
                <Input
                  id="period_end"
                  type="date"
                  value={newPayroll.payroll_period_end}
                  onChange={(e) => setNewPayroll(prev => ({ ...prev, payroll_period_end: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={createPayrollRun} className="flex-1">
                  إنشاء
                </Button>
                <Button variant="outline" onClick={() => setIsNewPayrollOpen(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {card.title}
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {card.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Payroll Runs */}
      <Card>
        <CardHeader>
          <CardTitle>دورات الرواتب</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : payrollRuns.length > 0 ? (
            <div className="space-y-4">
              {payrollRuns.map((payroll) => (
                <div key={payroll.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{getPayrollPeriod(payroll)}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{new Date(payroll.payroll_period_start).toLocaleDateString('ar-SA')} - {new Date(payroll.payroll_period_end).toLocaleDateString('ar-SA')}</span>
                        <span>إجمالي: {formatCurrency(payroll.total_net_salary)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(payroll.status)}
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedPayroll(payroll);
                          fetchPayrollItems(payroll.id);
                          setIsViewDetailsOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد دورات رواتب حتى الآن
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payroll Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              تفاصيل دورة الرواتب - {selectedPayroll ? getPayrollPeriod(selectedPayroll) : ''}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {payrollItems.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {payrollItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {item.employee?.first_name?.charAt(0)}{item.employee?.last_name?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">
                          {item.employee?.first_name} {item.employee?.last_name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.employee?.employee_id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium">الراتب الأساسي</p>
                        <p className="text-muted-foreground">{formatCurrency(item.basic_salary)}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">الإجمالي</p>
                        <p className="text-muted-foreground">{formatCurrency(item.gross_salary)}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">الصافي</p>
                        <p className="text-green-600 font-medium">{formatCurrency(item.net_salary)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد تفاصيل رواتب لهذه الدورة
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};