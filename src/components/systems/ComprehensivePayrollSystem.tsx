import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DollarSign,
  Calculator,
  FileText,
  TrendingUp,
  Users,
  Download,
  Eye,
  Edit,
  Settings,
  Calendar,
  CreditCard,
  PieChart,
  BarChart3,
  Search,
  Filter,
  User
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockEmployees } from '@/data/mockEmployees';
import { BoudHRHeader } from '@/components/shared/BoudHRHeader';
import { BackButton } from '@/components/BackButton';
import { toast } from 'sonner';

interface PayrollSystemProps {
  onBack: () => void;
}

const payrollData = mockEmployees.map(emp => ({
  ...emp,
  basicSalary: emp.salary,
  allowances: Math.floor(emp.salary * 0.2),
  deductions: Math.floor(emp.salary * 0.1),
  netSalary: emp.salary + Math.floor(emp.salary * 0.2) - Math.floor(emp.salary * 0.1),
  status: 'paid' as const
}));

const salaryTrends = [
  { month: 'يناير', total: 185000, employees: 18 },
  { month: 'فبراير', total: 195000, employees: 19 },
  { month: 'مارس', total: 210000, employees: 20 },
  { month: 'أبريل', total: 215000, employees: 20 },
  { month: 'مايو', total: 220000, employees: 20 },
  { month: 'يونيو', total: 225000, employees: 20 },
];

const departmentPayroll = [
  { name: 'تقنية المعلومات', value: 85000, color: '#0088FE' },
  { name: 'المالية', value: 45000, color: '#00C49F' },
  { name: 'الموارد البشرية', value: 35000, color: '#FFBB28' },
  { name: 'التسويق', value: 25000, color: '#FF8042' },
  { name: 'أخرى', value: 35000, color: '#8884D8' },
];

export const ComprehensivePayrollSystem: React.FC<PayrollSystemProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const totalPayroll = payrollData.reduce((sum, emp) => sum + emp.netSalary, 0);
  const avgSalary = totalPayroll / payrollData.length;

  const handleExportPayroll = () => {
    toast.success('تم تصدير كشوف المرتبات بنجاح');
  };

  const handleGenerateReport = () => {
    toast.success('تم إنشاء التقرير بنجاح');
  };

  const handleProcessPayroll = () => {
    toast.success('تم معالجة كشوف المرتبات بنجاح');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المرتبات</p>
                <p className="text-2xl font-bold text-primary">{totalPayroll.toLocaleString()}</p>
                <p className="text-xs text-primary/70">ريال سعودي</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط الراتب</p>
                <p className="text-2xl font-bold text-success">{Math.floor(avgSalary).toLocaleString()}</p>
                <p className="text-xs text-success/70">ريال سعودي</p>
              </div>
              <Calculator className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">عدد الموظفين</p>
                <p className="text-2xl font-bold text-blue-600">{payrollData.length}</p>
                <p className="text-xs text-blue-600/70">موظف نشط</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">نمو المرتبات</p>
                <p className="text-2xl font-bold text-amber-600">+8.5%</p>
                <p className="text-xs text-amber-600/70">هذا الشهر</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>اتجاهات المرتبات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salaryTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} ريال`, 'إجمالي المرتبات']} />
                <Area type="monotone" dataKey="total" fill="#3b82f6" stroke="#3b82f6" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>توزيع المرتبات حسب القسم</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentPayroll}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentPayroll.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} ريال`]} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>الإجراءات السريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button onClick={handleProcessPayroll} className="w-full gap-2">
              <Calculator className="w-4 h-4" />
              معالجة المرتبات
            </Button>
            <Button onClick={handleExportPayroll} variant="outline" className="w-full gap-2">
              <Download className="w-4 h-4" />
              تصدير كشوف المرتبات
            </Button>
            <Button onClick={handleGenerateReport} variant="outline" className="w-full gap-2">
              <FileText className="w-4 h-4" />
              إنشاء تقرير
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Settings className="w-4 h-4" />
              إعدادات المرتبات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPayrollRecords = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="البحث في كشوف المرتبات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80"
          />
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            تصفية
          </Button>
        </div>
        <Button onClick={handleExportPayroll}>
          <Download className="w-4 h-4 mr-2" />
          تصدير
        </Button>
      </div>

      <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-right p-4 font-medium">الموظف</th>
                  <th className="text-right p-4 font-medium">الراتب الأساسي</th>
                  <th className="text-right p-4 font-medium">البدلات</th>
                  <th className="text-right p-4 font-medium">الخصومات</th>
                  <th className="text-right p-4 font-medium">صافي الراتب</th>
                  <th className="text-right p-4 font-medium">الحالة</th>
                  <th className="text-right p-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {payrollData
                  .filter(record => record.name.includes(searchTerm))
                  .map((record) => (
                    <tr key={record.id} className="border-t border-border/20 hover:bg-muted/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={record.avatar} alt={record.name} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{record.name}</p>
                            <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{record.basicSalary.toLocaleString()} ريال</td>
                      <td className="p-4">{record.allowances.toLocaleString()} ريال</td>
                      <td className="p-4">{record.deductions.toLocaleString()} ريال</td>
                      <td className="p-4 font-semibold">{record.netSalary.toLocaleString()} ريال</td>
                      <td className="p-4">
                        <Badge className="bg-success/10 text-success border-success/20">
                          مدفوع
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <BoudHRHeader 
              title="إدارة المرتبات" 
              subtitle="نظام شامل لإدارة ومعالجة مرتبات الموظفين" 
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-muted/30">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="records">كشوف المرتبات</TabsTrigger>
            <TabsTrigger value="processing">معالجة المرتبات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="benefits">المزايا والخصومات</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
          <TabsContent value="records">{renderPayrollRecords()}</TabsContent>
          <TabsContent value="processing">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Calculator className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">معالجة المرتبات</h3>
                <p className="text-muted-foreground">حساب ومعالجة مرتبات الموظفين تلقائياً</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">تقارير المرتبات</h3>
                <p className="text-muted-foreground">تقارير مفصلة عن إحصائيات المرتبات</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="benefits">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <CreditCard className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">المزايا والخصومات</h3>
                <p className="text-muted-foreground">إدارة البدلات والمزايا والخصومات</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Settings className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">إعدادات المرتبات</h3>
                <p className="text-muted-foreground">تخصيص قواعد وإعدادات المرتبات</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};