import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, DollarSign, TrendingUp, Search, Plus, Download } from 'lucide-react';

interface SalariesWagesProps {
  onBack: () => void;
}

interface PayrollRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  basicSalary: number;
  allowances: number;
  overtime: number;
  deductions: number;
  netSalary: number;
  payPeriod: string;
  status: 'processed' | 'pending' | 'approved';
  department: string;
}

interface SalaryScale {
  id: string;
  position: string;
  level: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
  department: string;
  experience: string;
}

export const SalariesWages: React.FC<SalariesWagesProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const payrollRecords: PayrollRecord[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      basicSalary: 8000,
      allowances: 1500,
      overtime: 800,
      deductions: 320,
      netSalary: 9980,
      payPeriod: '2024-01',
      status: 'processed',
      department: 'الموارد البشرية'
    },
    {
      id: '2',
      employeeName: 'فاطمة عبد الرحمن',
      employeeId: 'EMP002',
      basicSalary: 6500,
      allowances: 1200,
      overtime: 400,
      deductions: 260,
      netSalary: 7840,
      payPeriod: '2024-01',
      status: 'approved',
      department: 'المحاسبة'
    },
    {
      id: '3',
      employeeName: 'عبد الله سعد',
      employeeId: 'EMP003',
      basicSalary: 7000,
      allowances: 1000,
      overtime: 600,
      deductions: 280,
      netSalary: 8320,
      payPeriod: '2024-01',
      status: 'pending',
      department: 'تقنية المعلومات'
    }
  ];

  const salaryScales: SalaryScale[] = [
    {
      id: '1',
      position: 'مدير الموارد البشرية',
      level: 'المستوى 5',
      minSalary: 12000,
      maxSalary: 18000,
      currency: 'SAR',
      department: 'الموارد البشرية',
      experience: '5-10 سنوات'
    },
    {
      id: '2',
      position: 'محاسب أول',
      level: 'المستوى 4',
      minSalary: 8000,
      maxSalary: 12000,
      currency: 'SAR',
      department: 'المحاسبة',
      experience: '3-7 سنوات'
    },
    {
      id: '3',
      position: 'مطور برمجيات',
      level: 'المستوى 4',
      minSalary: 9000,
      maxSalary: 15000,
      currency: 'SAR',
      department: 'تقنية المعلومات',
      experience: '2-5 سنوات'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processed: { text: isRTL ? 'مُعالج' : 'Processed', className: 'bg-green-100 text-green-800' },
      approved: { text: isRTL ? 'معتمد' : 'Approved', className: 'bg-blue-100 text-blue-800' },
      pending: { text: isRTL ? 'في الانتظار' : 'Pending', className: 'bg-yellow-100 text-yellow-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || record.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.netSalary, 0);
  const avgSalary = totalPayroll / payrollRecords.length;

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'الرواتب والأجور' : 'Salaries & Wages'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'إدارة الرواتب وسلالم الأجور وكشوف المرتبات' : 'Manage salaries, wage scales and payroll'}
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {isRTL ? 'تشغيل كشف مرتبات' : 'Run Payroll'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إجمالي الرواتب' : 'Total Payroll'}
                  </p>
                  <p className="text-2xl font-bold">{totalPayroll.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'متوسط الراتب' : 'Average Salary'}
                  </p>
                  <p className="text-2xl font-bold">{Math.round(avgSalary).toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'كشوف معتمدة' : 'Approved Payrolls'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">247</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'في الانتظار' : 'Pending'}
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payroll" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payroll">{isRTL ? 'كشوف المرتبات' : 'Payroll Records'}</TabsTrigger>
            <TabsTrigger value="scales">{isRTL ? 'سلالم الرواتب' : 'Salary Scales'}</TabsTrigger>
            <TabsTrigger value="reports">{isRTL ? 'التقارير' : 'Reports'}</TabsTrigger>
          </TabsList>

          <TabsContent value="payroll">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في كشوف المرتبات...' : 'Search payroll records...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {isRTL ? 'تصدير' : 'Export'}
              </Button>
            </div>

            {/* Payroll Records */}
            <div className="space-y-4">
              {filteredRecords.map((record) => {
                const statusBadge = getStatusBadge(record.status);
                
                return (
                  <Card key={record.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="text-lg font-semibold">{record.employeeName}</h3>
                            <p className="text-sm text-muted-foreground">{record.employeeId} - {record.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{isRTL ? 'فترة الدفع' : 'Pay Period'}</p>
                            <p className="font-semibold">{record.payPeriod}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">{isRTL ? 'الراتب الأساسي' : 'Basic Salary'}</p>
                          <p className="font-semibold text-green-600">{record.basicSalary.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">{isRTL ? 'البدلات' : 'Allowances'}</p>
                          <p className="font-semibold text-blue-600">+{record.allowances.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">{isRTL ? 'العمل الإضافي' : 'Overtime'}</p>
                          <p className="font-semibold text-blue-600">+{record.overtime.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">{isRTL ? 'الاستقطاعات' : 'Deductions'}</p>
                          <p className="font-semibold text-red-600">-{record.deductions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">{isRTL ? 'صافي الراتب' : 'Net Salary'}</p>
                          <p className="font-bold text-lg">{record.netSalary.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            {isRTL ? 'عرض' : 'View'}
                          </Button>
                          <Button size="sm" variant="outline">
                            {isRTL ? 'تحرير' : 'Edit'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="scales">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salaryScales.map((scale) => (
                <Card key={scale.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{scale.position}</CardTitle>
                    <p className="text-sm text-muted-foreground">{scale.level} - {scale.department}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{isRTL ? 'الحد الأدنى:' : 'Min Salary:'}</span>
                        <span className="text-sm font-medium">{scale.minSalary.toLocaleString()} {scale.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{isRTL ? 'الحد الأقصى:' : 'Max Salary:'}</span>
                        <span className="text-sm font-medium">{scale.maxSalary.toLocaleString()} {scale.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{isRTL ? 'الخبرة المطلوبة:' : 'Experience:'}</span>
                        <span className="text-sm">{scale.experience}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        {isRTL ? 'تحرير' : 'Edit'}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        {isRTL ? 'عرض' : 'View'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'تقارير الرواتب والأجور' : 'Salary & Wage Reports'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'تقارير شاملة عن الرواتب والأجور والاتجاهات المالية' : 'Comprehensive reports on salaries, wages and financial trends'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};