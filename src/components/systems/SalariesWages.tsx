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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
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
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Search className="h-4 w-4 ml-2" />
                  البحث المتقدم
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  تشغيل كشف مرتبات
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <DollarSign className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام الرواتب والأجور المتطور
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                منظومة ذكية شاملة لإدارة الرواتب وسلالم الأجور وكشوف المرتبات مع التكامل الكامل مع الأنظمة المحاسبية
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">نظام كشوف المرتبات</h3>
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">إجمالي الرواتب</span>
                      <span className="font-bold text-primary">{totalPayroll.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">متوسط الراتب</span>
                      <span className="font-bold text-green-600">{Math.round(avgSalary).toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">كشوف معالجة</span>
                      <span className="font-bold text-blue-600">247</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">إدارة سلالم الرواتب</h3>
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">مستويات الرواتب</span>
                      <span className="font-bold text-purple-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">أعلى راتب</span>
                      <span className="font-bold text-green-600">25,000 ر.س</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل الزيادة السنوية</span>
                      <span className="font-bold text-blue-600">8.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">إحصائيات الرواتب</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{totalPayroll.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">إجمالي الرواتب (ر.س)</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">247</div>
                    <div className="text-sm text-gray-600">كشوف معتمدة</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">12</div>
                    <div className="text-sm text-gray-600">في الانتظار</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منظومة الرواتب المتكاملة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: DollarSign, label: "كشوف المرتبات", color: "text-green-600", count: 247 },
                { icon: TrendingUp, label: "سلالم الرواتب", color: "text-blue-600", count: 12 },
                { icon: Download, label: "التقارير المالية", color: "text-purple-600", count: 0 },
                { icon: Search, label: "البحث المتقدم", color: "text-orange-600", count: 0 },
                { icon: Plus, label: "الحوافز والمكافآت", color: "text-teal-600", count: 89 },
                { icon: ArrowLeft, label: "التكامل المحاسبي", color: "text-red-600", count: 0 }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className={`mx-auto w-12 h-12 ${item.color} mb-3 p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors flex items-center justify-center relative`}>
                    <item.icon className="w-6 h-6" />
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count > 99 ? '99+' : item.count}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">2.1M</div>
                <div className="text-sm text-gray-600">إجمالي الرواتب المدفوعة (ر.س)</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">96%</div>
                <div className="text-sm text-gray-600">معدل الدقة في المعالجة</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1.2</div>
                <div className="text-sm text-gray-600">متوسط وقت المعالجة (ساعات)</div>
              </div>
            </div>
          </CardContent>
        </Card>

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