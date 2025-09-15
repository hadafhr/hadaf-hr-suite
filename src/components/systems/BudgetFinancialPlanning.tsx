import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Calculator, 
  Target, 
  BarChart3, 
  FileText, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Plus,
  Download,
  RefreshCw,
  Edit,
  Eye,
  Trash2,
  Settings,
  Bell,
  Users,
  Award,
  Building
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { useBudgetCategories, useBudgetAllocations, useBudgetExpenses, useBudgetKPIs } from '@/hooks/useBudget';
import { useToast } from '@/hooks/use-toast';

interface BudgetFinancialPlanningProps {
  onBack?: () => void;
}

const BudgetFinancialPlanning: React.FC<BudgetFinancialPlanningProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [newAllocationDialog, setNewAllocationDialog] = useState(false);
  const [newExpenseDialog, setNewExpenseDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const { toast } = useToast();
  const { categories } = useBudgetCategories();
  const { allocations, createAllocation, updateAllocation } = useBudgetAllocations(selectedYear);
  const { expenses, createExpense } = useBudgetExpenses();
  const { kpis } = useBudgetKPIs(selectedYear);

  // Colors for charts
  const COLORS = ['#009F87', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Mock data for charts (would be replaced with real data)
  const monthlyData = [
    { month: 'يناير', planned: 420000, actual: 400000 },
    { month: 'فبراير', planned: 420000, actual: 385000 },
    { month: 'مارس', planned: 420000, actual: 445000 },
    { month: 'أبريل', planned: 420000, actual: 390000 },
    { month: 'مايو', planned: 420000, actual: 420000 },
    { month: 'يونيو', planned: 420000, actual: 405000 }
  ];

  const categoryDistribution = categories.map((cat, index) => ({
    name: cat.name_ar,
    value: allocations.find(a => a.category_id === cat.id)?.allocated_amount || 0,
    color: COLORS[index % COLORS.length]
  }));

  const budgetComparison = categories.map(cat => {
    const allocation = allocations.find(a => a.category_id === cat.id);
    const categoryExpenses = expenses.filter(e => e.category_id === cat.id);
    const totalSpent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      name: cat.name_ar,
      allocated: allocation?.allocated_amount || 0,
      spent: totalSpent,
      percentage: allocation ? (totalSpent / allocation.allocated_amount) * 100 : 0
    };
  });

  const BudgetOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              إجمالي المخصص
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">
                {kpis?.total_allocated?.toLocaleString() || '0'}
              </span>
              <span className="text-sm text-muted-foreground">ريال</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              إجمالي المصروف
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">
                {kpis?.total_spent?.toLocaleString() || '0'}
              </span>
              <span className="text-sm text-muted-foreground">ريال</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              نسبة الالتزام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-2xl font-bold">
                {kpis?.compliance_rate?.toFixed(1) || '0'}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              نسبة الانحراف
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-2xl font-bold">
                {kpis?.variance_percent?.toFixed(1) || '0'}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget vs Actual Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              المخصص مقابل المصروف حسب البند
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} ريال`]} />
                <Legend />
                <Bar dataKey="allocated" fill="#009F87" name="المخصص" />
                <Bar dataKey="spent" fill="#00C49F" name="المصروف" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              الاتجاه الشهري للمصروفات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} ريال`]} />
                <Legend />
                <Line type="monotone" dataKey="planned" stroke="#009F87" name="المخطط" />
                <Line type="monotone" dataKey="actual" stroke="#FF8042" name="الفعلي" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            توزيع الميزانية على البنود
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} ريال`]} />
              <RechartsPieChart data={categoryDistribution}>
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RechartsPieChart>
            </RechartsPieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل الميزانية حسب البند</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>البند</TableHead>
                <TableHead>المخصص</TableHead>
                <TableHead>المصروف</TableHead>
                <TableHead>المتبقي</TableHead>
                <TableHead>نسبة الصرف</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetComparison.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.allocated.toLocaleString()} ريال</TableCell>
                  <TableCell>{item.spent.toLocaleString()} ريال</TableCell>
                  <TableCell>{(item.allocated - item.spent).toLocaleString()} ريال</TableCell>
                  <TableCell>{item.percentage.toFixed(1)}%</TableCell>
                  <TableCell>
                    <Badge variant={
                      item.percentage > 90 ? "destructive" : 
                      item.percentage > 75 ? "default" : "secondary"
                    }>
                      {item.percentage > 90 ? "تجاوز" : 
                       item.percentage > 75 ? "تحذير" : "طبيعي"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const AllocationManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[2023, 2024, 2025, 2026].map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setNewAllocationDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة مخصص
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>مخصصات الميزانية لعام {selectedYear}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>البند</TableHead>
                <TableHead>المبلغ المخصص</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell>{allocation.category?.name_ar}</TableCell>
                  <TableCell>{allocation.allocated_amount.toLocaleString()} ريال</TableCell>
                  <TableCell>
                    <Badge variant={
                      allocation.status === 'approved' ? "default" :
                      allocation.status === 'pending' ? "secondary" :
                      allocation.status === 'rejected' ? "destructive" : "outline"
                    }>
                      {allocation.status === 'approved' ? 'معتمد' :
                       allocation.status === 'pending' ? 'قيد المراجعة' :
                       allocation.status === 'rejected' ? 'مرفوض' : 'مسودة'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(allocation.created_at).toLocaleDateString('ar-SA')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Allocation Dialog */}
      <Dialog open={newAllocationDialog} onOpenChange={setNewAllocationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة مخصص جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل مخصص الميزانية الجديد
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">البند</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البند" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">المبلغ المخصص</Label>
              <Input id="amount" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea id="notes" placeholder="ملاحظات إضافية..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAllocationDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setNewAllocationDialog(false)}>
              إضافة المخصص
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  const ExpenseTracking = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button onClick={() => setNewExpenseDialog(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة مصروف
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>متابعة المصروفات الفعلية</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>البند</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.slice(0, 10).map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{new Date(expense.expense_date).toLocaleDateString('ar-SA')}</TableCell>
                  <TableCell>{expense.category?.name_ar}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount.toLocaleString()} ريال</TableCell>
                  <TableCell>
                    <Badge variant={
                      expense.status === 'approved' ? "default" :
                      expense.status === 'rejected' ? "destructive" : "secondary"
                    }>
                      {expense.status === 'approved' ? 'معتمد' :
                       expense.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Expense Dialog */}
      <Dialog open={newExpenseDialog} onOpenChange={setNewExpenseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة مصروف جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل المصروف الجديد
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="expense-category">البند</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البند" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-date">التاريخ</Label>
              <Input id="expense-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-amount">المبلغ</Label>
              <Input id="expense-amount" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-description">الوصف</Label>
              <Textarea id="expense-description" placeholder="وصف المصروف..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewExpenseDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setNewExpenseDialog(false)}>
              إضافة المصروف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  const AIReports = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          التقارير الذكية والتنبؤات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">توقعات نهاية العام</h3>
            <div className="space-y-2">
              {categories.slice(0, 4).map((category, index) => (
                <div key={category.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{category.name_ar}</span>
                    <Badge variant="outline">AI</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    التوقع: {(Math.random() * 1000000 + 500000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ريال
                  </div>
                  <div className="text-sm text-muted-foreground">
                    الانحراف المتوقع: {(Math.random() * 20 - 10).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">التنبيهات الذكية</h3>
            <div className="space-y-2">
              <div className="p-4 border rounded-lg border-orange-200 bg-orange-50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="font-medium text-orange-800">تحذير متوقع</span>
                </div>
                <p className="text-sm text-orange-700">
                  بند "التدريب والتطوير" متوقع أن يتجاوز الميزانية بنسبة 15% بحلول نهاية العام
                </p>
              </div>
              
              <div className="p-4 border rounded-lg border-red-200 bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="font-medium text-red-800">تنبيه عاجل</span>
                </div>
                <p className="text-sm text-red-700">
                  بند "الأنظمة والتقنية" تجاوز 95% من المخصص المعتمد
                </p>
              </div>
              
              <div className="p-4 border rounded-lg border-green-200 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-800">أداء جيد</span>
                </div>
                <p className="text-sm text-green-700">
                  بند "جودة الحياة" يسير وفق الخطة المرسومة بدقة 98%
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ApprovalCenter = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          مركز الاعتمادات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-20 text-muted-foreground">
          <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>وحدة مركز الاعتمادات قيد التطوير</p>
          <p className="text-sm">ستتضمن إدارة طلبات الموافقة ودورة الاعتماد</p>
        </div>
      </CardContent>
    </Card>
  );

  const IntegrationsPage = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          التكاملات مع الأنظمة المالية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-20 text-muted-foreground">
          <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>وحدة التكاملات قيد التطوير</p>
          <p className="text-sm">ستتضمن ربط الأنظمة المالية وتزامن البيانات</p>
        </div>
      </CardContent>
    </Card>
  );

  const NotificationsCenter = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          مركز الإشعارات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-20 text-muted-foreground">
          <Bell className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>مركز الإشعارات قيد التطوير</p>
          <p className="text-sm">سيتضمن جميع الإشعارات والتنبيهات المالية</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
        <div className="flex items-center gap-6">
          {onBack && (
            <>
              <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300">
                <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
                رجوع
              </Button>
              <div className="h-8 w-px bg-gray-300"></div>
            </>
          )}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              <DollarSign className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                قسم الميزانية والتخطيط المالي
              </h1>
              <p className="text-muted-foreground text-lg">
                إدارة شاملة للميزانيات والتخطيط المالي المؤسسي
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-4 py-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4 ml-2" />
            نظام متقدم
          </Badge>
          <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقارير
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-foreground">
                نظام الميزانية والتخطيط المالي المتكامل
              </CardTitle>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  نظام معتمد
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-8 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="overview"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="font-medium">لوحة عامة</span>
                </TabsTrigger>
                <TabsTrigger
                  value="allocations"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Calculator className="h-4 w-4" />
                  <span className="font-medium">إعداد الميزانية</span>
                </TabsTrigger>
                <TabsTrigger
                  value="expenses"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">متابعة الصرف</span>
                </TabsTrigger>
                <TabsTrigger
                  value="ai-reports"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Award className="h-4 w-4" />
                  <span className="font-medium">التقارير الذكية</span>
                </TabsTrigger>
                <TabsTrigger
                  value="approvals"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Users className="h-4 w-4" />
                  <span className="font-medium">الموافقات</span>
                </TabsTrigger>
                <TabsTrigger
                  value="integrations"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Settings className="h-4 w-4" />
                  <span className="font-medium">التكامل</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Bell className="h-4 w-4" />
                  <span className="font-medium">الإشعارات</span>
                </TabsTrigger>
              </TabsList>

              <div className="animate-fade-in">
                <TabsContent value="overview">
                  <BudgetOverview />
                </TabsContent>
                
                <TabsContent value="allocations">
                  <AllocationManagement />
                </TabsContent>
                
                <TabsContent value="expenses">
                  <ExpenseTracking />
                </TabsContent>
                
                <TabsContent value="ai-reports">
                  <AIReports />
                </TabsContent>
                
                <TabsContent value="approvals">
                  <ApprovalCenter />
                </TabsContent>
                
                <TabsContent value="integrations">
                  <IntegrationsPage />
                </TabsContent>
                
                <TabsContent value="notifications">
                  <NotificationsCenter />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetFinancialPlanning;