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
  Building,
  Wifi,
  WifiOff,
  Database,
  Cloud,
  Link,
  Key,
  Shield,
  TestTube,
  Filter,
  Search,
  Mail,
  AlertCircle,
  Info,
  CheckCircle2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { useBudgetCategories, useBudgetAllocations, useBudgetExpenses, useBudgetKPIs, useBudgetIntegrations, useBudgetNotifications } from '@/hooks/useBudget';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [newAllocationForm, setNewAllocationForm] = useState({
    category_id: '',
    allocated_amount: 0,
    notes: ''
  });
  const [newExpenseForm, setNewExpenseForm] = useState({
    category_id: '',
    amount: 0,
    description: '',
    expense_date: new Date().toISOString().split('T')[0]
  });
  
  const { toast } = useToast();
  
  // Mock default data until hooks work properly
  const defaultCategories = [
    { id: '1', code: 'SAL', name_ar: 'الرواتب والأجور', name_en: 'Salaries', status: 'active', description: 'رواتب الموظفين والمكافآت', created_at: '2024-01-01', updated_at: '2024-01-01' },
    { id: '2', code: 'RENT', name_ar: 'الإيجارات والمرافق', name_en: 'Rent & Utilities', status: 'active', description: 'إيجار المكاتب والمرافق', created_at: '2024-01-01', updated_at: '2024-01-01' },
    { id: '3', code: 'MKTG', name_ar: 'التسويق والإعلان', name_en: 'Marketing', status: 'active', description: 'حملات التسويق والإعلان', created_at: '2024-01-01', updated_at: '2024-01-01' },
    { id: '4', code: 'IT', name_ar: 'تقنية المعلومات', name_en: 'IT', status: 'active', description: 'معدات وبرمجيات تقنية المعلومات', created_at: '2024-01-01', updated_at: '2024-01-01' },
    { id: '5', code: 'TRAIN', name_ar: 'التدريب والتطوير', name_en: 'Training', status: 'active', description: 'برامج التدريب وتطوير المهارات', created_at: '2024-01-01', updated_at: '2024-01-01' }
  ];

  const defaultAllocations = [
    { id: '1', category_id: '1', year: 2024, allocated_amount: 1200000, notes: 'رواتب فريق العمل الأساسي', status: 'approved', created_at: '2024-01-01', updated_at: '2024-01-01', category: defaultCategories[0] },
    { id: '2', category_id: '2', year: 2024, allocated_amount: 240000, notes: 'إيجار المكتب الرئيسي والفروع', status: 'approved', created_at: '2024-01-01', updated_at: '2024-01-01', category: defaultCategories[1] },
    { id: '3', category_id: '3', year: 2024, allocated_amount: 180000, notes: 'حملات التسويق الرقمي', status: 'pending', created_at: '2024-01-01', updated_at: '2024-01-01', category: defaultCategories[2] },
    { id: '4', category_id: '4', year: 2024, allocated_amount: 120000, notes: 'تحديث الأجهزة والبرمجيات', status: 'approved', created_at: '2024-01-01', updated_at: '2024-01-01', category: defaultCategories[3] },
    { id: '5', category_id: '5', year: 2024, allocated_amount: 60000, notes: 'برامج التدريب المهني', status: 'draft', created_at: '2024-01-01', updated_at: '2024-01-01', category: defaultCategories[4] }
  ];

  const defaultExpenses = [
    { id: '1', category_id: '1', expense_date: '2024-01-15', amount: 95000, description: 'رواتب شهر يناير', status: 'approved', created_at: '2024-01-15', updated_at: '2024-01-15', category: defaultCategories[0] },
    { id: '2', category_id: '2', expense_date: '2024-01-01', amount: 20000, description: 'إيجار المكتب الرئيسي', status: 'approved', created_at: '2024-01-01', updated_at: '2024-01-01', category: defaultCategories[1] },
    { id: '3', category_id: '3', expense_date: '2024-01-10', amount: 15000, description: 'حملة إعلانية على وسائل التواصل', status: 'pending', created_at: '2024-01-10', updated_at: '2024-01-10', category: defaultCategories[2] },
    { id: '4', category_id: '4', expense_date: '2024-01-08', amount: 8000, description: 'تراخيص البرمجيات السنوية', status: 'approved', created_at: '2024-01-08', updated_at: '2024-01-08', category: defaultCategories[3] },
    { id: '5', category_id: '1', expense_date: '2024-02-15', amount: 98000, description: 'رواتب شهر فبراير', status: 'approved', created_at: '2024-02-15', updated_at: '2024-02-15', category: defaultCategories[0] },
    { id: '6', category_id: '2', expense_date: '2024-02-01', amount: 20000, description: 'إيجار المكتب شهر فبراير', status: 'approved', created_at: '2024-02-01', updated_at: '2024-02-01', category: defaultCategories[1] },
    { id: '7', category_id: '5', expense_date: '2024-02-20', amount: 5000, description: 'دورة تدريبية في إدارة المشاريع', status: 'pending', created_at: '2024-02-20', updated_at: '2024-02-20', category: defaultCategories[4] }
  ];

  const defaultKpis = {
    total_allocated: 1800000,
    total_spent: 261000,
    compliance_rate: 14.5,
    exceeded_categories: 0,
    variance_percent: -85.5
  };

  // Use hooks with fallback to default data
  const { categories, loading: categoriesLoading } = useBudgetCategories();
  const { allocations, createAllocation, updateAllocation, loading: allocationsLoading } = useBudgetAllocations(selectedYear);
  const { expenses, createExpense, loading: expensesLoading } = useBudgetExpenses();
  const { kpis, loading: kpisLoading } = useBudgetKPIs(selectedYear);

  // Use actual data if available, otherwise use defaults
  const displayCategories = categories?.length ? categories : defaultCategories;
  const displayAllocations = allocations?.length ? allocations : defaultAllocations;
  const displayExpenses = expenses?.length ? expenses : defaultExpenses;
  const displayKpis = kpis || defaultKpis;

  // Add loading states
  const isLoading = categoriesLoading || allocationsLoading || expensesLoading || kpisLoading;

  // Show loading spinner if data is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium">جاري تحميل بيانات الميزانية...</p>
        </div>
      </div>
    );
  }

  // Debug logging
  console.log('Budget data status:', {
    categories: displayCategories?.length || 0,
    allocations: displayAllocations?.length || 0,
    expenses: displayExpenses?.length || 0,
    kpis: displayKpis
  });
  const filteredAllocations = displayAllocations.filter(allocation => {
    const categoryName = allocation.category?.name_ar || displayCategories.find(c => c.id === allocation.category_id)?.name_ar || '';
    const categoryCode = allocation.category?.code || displayCategories.find(c => c.id === allocation.category_id)?.code || '';
    const matchesSearch = categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         categoryCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || allocation.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || allocation.category_id === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const filteredExpenses = displayExpenses.filter(expense => {
    const categoryName = expense.category?.name_ar || displayCategories.find(c => c.id === expense.category_id)?.name_ar || '';
    const matchesSearch = categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || expense.category_id === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Handle form submissions
  const handleCreateAllocation = async () => {
    try {
      if (!newAllocationForm.category_id || !newAllocationForm.allocated_amount) {
        toast({
          title: "خطأ في البيانات",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive"
        });
        return;
      }

      const newAllocation = {
        ...newAllocationForm,
        year: selectedYear,
        status: 'draft' as const
      };

      // await createAllocation(newAllocation);
      if (createAllocation) {
        await createAllocation(newAllocation);
      }
      toast({
        title: "تم إنشاء المخصص بنجاح",
        description: "تم إضافة مخصص الميزانية الجديد"
      });
      
      setNewAllocationDialog(false);
      setNewAllocationForm({ category_id: '', allocated_amount: 0, notes: '' });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء المخصص",
        description: "حدث خطأ أثناء إنشاء المخصص",
        variant: "destructive"
      });
    }
  };

  const handleCreateExpense = async () => {
    try {
      if (!newExpenseForm.category_id || !newExpenseForm.amount || !newExpenseForm.description) {
        toast({
          title: "خطأ في البيانات",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive"
        });
        return;
      }

      const newExpense = {
        ...newExpenseForm,
        status: 'pending' as const
      };

      // await createExpense(newExpense);
      if (createExpense) {
        await createExpense(newExpense);
      }
      toast({
        title: "تم إنشاء المصروف بنجاح",
        description: "تم إضافة المصروف الجديد"
      });
      
      setNewExpenseDialog(false);
      setNewExpenseForm({ category_id: '', amount: 0, description: '', expense_date: new Date().toISOString().split('T')[0] });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء المصروف",
        description: "حدث خطأ أثناء إنشاء المصروف",
        variant: "destructive"
      });
    }
  };

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

  const categoryDistribution = displayCategories.map((cat, index) => ({
    name: cat.name_ar,
    value: displayAllocations.find(a => a.category_id === cat.id)?.allocated_amount || 0,
    color: COLORS[index % COLORS.length]
  }));

  const budgetComparison = displayCategories.map(cat => {
    const allocation = displayAllocations.find(a => a.category_id === cat.id);
    const categoryExpenses = displayExpenses.filter(e => e.category_id === cat.id);
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
                {displayKpis?.total_allocated?.toLocaleString() || '0'}
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
                {displayKpis?.total_spent?.toLocaleString() || '0'}
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
                {displayKpis?.compliance_rate?.toFixed(1) || '0'}%
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
                {displayKpis?.variance_percent?.toFixed(1) || '0'}%
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
      {/* Header with filters and actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
          
          <div className="flex gap-2">
            <div className="relative">
              <Input
                placeholder="البحث في المخصصات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="draft">مسودة</SelectItem>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
                <SelectItem value="approved">معتمد</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="البند" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع البنود</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name_ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={() => setNewAllocationDialog(true)} className="w-fit">
          <Plus className="h-4 w-4 ml-2" />
          إضافة مخصص جديد
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المخصصات</p>
                <p className="text-xl font-bold">{allocations.reduce((sum, a) => sum + a.allocated_amount, 0).toLocaleString()} ريال</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المعتمد</p>
                <p className="text-xl font-bold">{allocations.filter(a => a.status === 'approved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">قيد المراجعة</p>
                <p className="text-xl font-bold">{allocations.filter(a => a.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">مسودات</p>
                <p className="text-xl font-bold">{allocations.filter(a => a.status === 'draft').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            مخصصات الميزانية لعام {selectedYear}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>البند</TableHead>
                  <TableHead>الكود</TableHead>
                  <TableHead>المبلغ المخصص</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead>الملاحظات</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAllocations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      لا توجد مخصصات مطابقة للفلاتر المحددة
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAllocations.map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell className="font-medium">{allocation.category?.name_ar}</TableCell>
                      <TableCell className="font-mono text-sm">{allocation.category?.code}</TableCell>
                      <TableCell className="font-semibold">{allocation.allocated_amount.toLocaleString()} ريال</TableCell>
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
                      <TableCell className="max-w-32 truncate" title={allocation.notes}>
                        {allocation.notes || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" title="عرض">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="تعديل">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="حذف" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* New Allocation Dialog */}
      <Dialog open={newAllocationDialog} onOpenChange={setNewAllocationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة مخصص جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل مخصص الميزانية الجديد لعام {selectedYear}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">البند *</Label>
              <Select value={newAllocationForm.category_id} onValueChange={(value) => setNewAllocationForm(prev => ({ ...prev, category_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البند" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.code} - {category.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">المبلغ المخصص (ريال) *</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="0"
                value={newAllocationForm.allocated_amount || ''}
                onChange={(e) => setNewAllocationForm(prev => ({ ...prev, allocated_amount: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea 
                id="notes" 
                placeholder="ملاحظات إضافية..."
                value={newAllocationForm.notes}
                onChange={(e) => setNewAllocationForm(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAllocationDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreateAllocation}>
              إضافة المخصص
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  const ExpenseTracking = () => (
    <div className="space-y-6">
      {/* Header with filters and actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex gap-2">
            <div className="relative">
              <Input
                placeholder="البحث في المصروفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
                <SelectItem value="approved">معتمد</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="البند" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع البنود</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name_ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={() => setNewExpenseDialog(true)} className="w-fit">
          <Plus className="h-4 w-4 ml-2" />
          إضافة مصروف جديد
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المصروفات</p>
                <p className="text-xl font-bold">{expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()} ريال</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المعتمد</p>
                <p className="text-xl font-bold">{expenses.filter(e => e.status === 'approved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">قيد المراجعة</p>
                <p className="text-xl font-bold">{expenses.filter(e => e.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">مرفوض</p>
                <p className="text-xl font-bold">{expenses.filter(e => e.status === 'rejected').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            متابعة المصروفات الفعلية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>البند</TableHead>
                  <TableHead>الكود</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      لا توجد مصروفات مطابقة للفلاتر المحددة
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{new Date(expense.expense_date).toLocaleDateString('ar-SA')}</TableCell>
                      <TableCell className="font-medium">{expense.category?.name_ar}</TableCell>
                      <TableCell className="font-mono text-sm">{expense.category?.code}</TableCell>
                      <TableCell className="max-w-48 truncate" title={expense.description}>
                        {expense.description}
                      </TableCell>
                      <TableCell className="font-semibold">{expense.amount.toLocaleString()} ريال</TableCell>
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
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" title="عرض">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="تعديل">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="حذف" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
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
              <Label htmlFor="expense-category">البند *</Label>
              <Select value={newExpenseForm.category_id} onValueChange={(value) => setNewExpenseForm(prev => ({ ...prev, category_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البند" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.code} - {category.name_ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-date">التاريخ *</Label>
              <Input 
                id="expense-date" 
                type="date" 
                value={newExpenseForm.expense_date}
                onChange={(e) => setNewExpenseForm(prev => ({ ...prev, expense_date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-amount">المبلغ (ريال) *</Label>
              <Input 
                id="expense-amount" 
                type="number" 
                placeholder="0"
                value={newExpenseForm.amount || ''}
                onChange={(e) => setNewExpenseForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-description">الوصف *</Label>
              <Textarea 
                id="expense-description" 
                placeholder="وصف المصروف..."
                value={newExpenseForm.description}
                onChange={(e) => setNewExpenseForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewExpenseDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreateExpense}>
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

  const ApprovalCenter = () => {
    const [selectedApproval, setSelectedApproval] = useState<any>(null);
    const [approvalDialog, setApprovalDialog] = useState(false);
    const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | 'return'>('approve');
    const [approvalComment, setApprovalComment] = useState('');

    // Mock approval data
    const approvals = [
      {
        id: '1',
        type: 'allocation',
        title: 'طلب تخصيص ميزانية - التسويق الرقمي',
        amount: 180000,
        category: 'التسويق والإعلان',
        requestor: 'أحمد محمد',
        department: 'التسويق',
        status: 'pending',
        priority: 'high',
        submitted_date: '2024-03-15',
        description: 'طلب تخصيص ميزانية إضافية لحملة التسويق الرقمي للربع الثاني'
      },
      {
        id: '2',
        type: 'expense',
        title: 'طلب موافقة مصروف - شراء أجهزة جديدة',
        amount: 85000,
        category: 'تقنية المعلومات',
        requestor: 'سارة أحمد',
        department: 'تقنية المعلومات',
        status: 'pending',
        priority: 'medium',
        submitted_date: '2024-03-18',
        description: 'شراء 5 أجهزة حاسوب جديدة للموظفين الجدد'
      },
      {
        id: '3',
        type: 'transfer',
        title: 'طلب نقل ميزانية - من التدريب إلى الرواتب',
        amount: 25000,
        category: 'نقل بين البنود',
        requestor: 'محمد علي',
        department: 'الموارد البشرية',
        status: 'pending',
        priority: 'low',
        submitted_date: '2024-03-20',
        description: 'نقل جزء من ميزانية التدريب لتغطية الرواتب الإضافية'
      },
      {
        id: '4',
        type: 'allocation',
        title: 'طلب تخصيص ميزانية - مشروع جديد',
        amount: 150000,
        category: 'المشاريع الخاصة',
        requestor: 'خالد حسن',
        department: 'التطوير',
        status: 'approved',
        priority: 'high',
        submitted_date: '2024-03-10',
        approved_date: '2024-03-12',
        approved_by: 'مدير المالية',
        description: 'تخصيص ميزانية لمشروع تطوير النظام الجديد'
      },
      {
        id: '5',
        type: 'expense',
        title: 'طلب موافقة مصروف - إيجار إضافي',
        amount: 30000,
        category: 'الإيجارات والمرافق',
        requestor: 'فاطمة سالم',
        department: 'المالية',
        status: 'rejected',
        priority: 'medium',
        submitted_date: '2024-03-08',
        rejected_date: '2024-03-09',
        rejected_by: 'مدير عام',
        rejection_reason: 'لا توجد حاجة فعلية للمساحة الإضافية',
        description: 'طلب إيجار مساحة إضافية للمكتب'
      }
    ];

    const pendingApprovals = approvals.filter(a => a.status === 'pending');
    const completedApprovals = approvals.filter(a => a.status !== 'pending');

    const getStatusBadge = (status: string) => {
      const statusMap = {
        pending: { variant: 'secondary', text: 'في الانتظار', color: 'text-orange-600' },
        approved: { variant: 'default', text: 'موافق عليه', color: 'text-green-600' },
        rejected: { variant: 'destructive', text: 'مرفوض', color: 'text-red-600' },
        returned: { variant: 'outline', text: 'مُعاد للمراجعة', color: 'text-blue-600' }
      };
      const config = statusMap[status as keyof typeof statusMap] || statusMap.pending;
      return (
        <Badge variant={config.variant as any} className={config.color}>
          {config.text}
        </Badge>
      );
    };

    const getPriorityBadge = (priority: string) => {
      const priorityMap = {
        high: { variant: 'destructive', text: 'عالية' },
        medium: { variant: 'secondary', text: 'متوسطة' },
        low: { variant: 'outline', text: 'منخفضة' }
      };
      const config = priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium;
      return (
        <Badge variant={config.variant as any}>
          {config.text}
        </Badge>
      );
    };

    const getTypeIcon = (type: string) => {
      const typeMap = {
        allocation: DollarSign,
        expense: TrendingUp,
        transfer: ArrowUp
      };
      const Icon = typeMap[type as keyof typeof typeMap] || FileText;
      return <Icon className="h-4 w-4" />;
    };

    const handleApprovalAction = async (id: string, action: 'approve' | 'reject' | 'return') => {
      try {
        // In a real app, this would call an API
        toast({
          title: "تم تحديث الطلب",
          description: `تم ${action === 'approve' ? 'الموافقة على' : action === 'reject' ? 'رفض' : 'إعادة'} الطلب بنجاح`,
        });
        setApprovalDialog(false);
        setSelectedApproval(null);
        setApprovalComment('');
      } catch (error) {
        toast({
          title: "خطأ في التحديث",
          description: "حدث خطأ أثناء تحديث الطلب",
          variant: "destructive"
        });
      }
    };

    return (
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">طلبات معلقة</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingApprovals.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">موافق عليها</p>
                  <p className="text-2xl font-bold text-green-600">
                    {completedApprovals.filter(a => a.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">مرفوضة</p>
                  <p className="text-2xl font-bold text-red-600">
                    {completedApprovals.filter(a => a.status === 'rejected').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي القيمة</p>
                  <p className="text-2xl font-bold text-primary">
                    {pendingApprovals.reduce((sum, a) => sum + a.amount, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              الطلبات المعلقة ({pendingApprovals.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد طلبات معلقة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getTypeIcon(approval.type)}
                          <h3 className="font-semibold">{approval.title}</h3>
                          {getPriorityBadge(approval.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{approval.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {approval.amount.toLocaleString()} ريال
                          </span>
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {approval.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {approval.requestor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {approval.submitted_date}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(approval.status)}
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedApproval(approval);
                            setApprovalDialog(true);
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          مراجعة
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              الطلبات المكتملة ({completedApprovals.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedApprovals.map((approval) => (
                <div key={approval.id} className="border rounded-lg p-4 opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(approval.type)}
                        <h3 className="font-semibold">{approval.title}</h3>
                        {getPriorityBadge(approval.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{approval.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {approval.amount.toLocaleString()} ريال
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {approval.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {approval.requestor}
                        </span>
                        {approval.status === 'approved' && approval.approved_date && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            موافق عليه في {approval.approved_date}
                          </span>
                        )}
                        {approval.status === 'rejected' && approval.rejected_date && (
                          <span className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-3 w-3" />
                            مرفوض في {approval.rejected_date}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(approval.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Approval Dialog */}
        <Dialog open={approvalDialog} onOpenChange={setApprovalDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedApproval && getTypeIcon(selectedApproval.type)}
                مراجعة الطلب
              </DialogTitle>
              <DialogDescription>
                يرجى مراجعة تفاصيل الطلب واتخاذ الإجراء المناسب
              </DialogDescription>
            </DialogHeader>

            {selectedApproval && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">عنوان الطلب</Label>
                    <p className="text-sm mt-1">{selectedApproval.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">القيمة</Label>
                    <p className="text-sm mt-1">{selectedApproval.amount.toLocaleString()} ريال</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">مقدم الطلب</Label>
                    <p className="text-sm mt-1">{selectedApproval.requestor}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">القسم</Label>
                    <p className="text-sm mt-1">{selectedApproval.department}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">تاريخ التقديم</Label>
                    <p className="text-sm mt-1">{selectedApproval.submitted_date}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">الأولوية</Label>
                    <div className="mt-1">{getPriorityBadge(selectedApproval.priority)}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">الوصف</Label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded-lg">{selectedApproval.description}</p>
                </div>

                <div>
                  <Label htmlFor="comment">تعليق الموافقة</Label>
                  <Textarea
                    id="comment"
                    placeholder="أضف تعليقاً على قرارك (اختياري)"
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setApprovalDialog(false)}>
                إلغاء
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleApprovalAction(selectedApproval?.id, 'return')}
              >
                <ArrowUp className="h-4 w-4 mr-1" />
                إعادة للمراجعة
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleApprovalAction(selectedApproval?.id, 'reject')}
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                رفض
              </Button>
              <Button
                onClick={() => handleApprovalAction(selectedApproval?.id, 'approve')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                موافقة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const IntegrationsPage = () => {
    const { integrations, loading, createIntegration, testConnection } = useBudgetIntegrations();
    const { toast } = useToast();
    const [newIntegrationDialog, setNewIntegrationDialog] = useState(false);
    const [testingConnection, setTestingConnection] = useState<string | null>(null);
    const [formData, setFormData] = useState({
      system_name: '',
      api_endpoint: '',
      auth_type: 'api_key' as 'api_key' | 'oauth2',
      token_secret: '',
      status: 'active' as 'active' | 'inactive'
    });

    const handleCreateIntegration = async () => {
      try {
        await createIntegration(formData);
        setNewIntegrationDialog(false);
        setFormData({
          system_name: '',
          api_endpoint: '',
          auth_type: 'api_key',
          token_secret: '',
          status: 'active'
        });
        toast({
          title: "تم إنشاء التكامل",
          description: "تم إضافة التكامل الجديد بنجاح"
        });
      } catch (error) {
        console.error('Error creating integration:', error);
        toast({
          title: "خطأ في إنشاء التكامل",
          description: "حدث خطأ أثناء إضافة التكامل",
          variant: "destructive"
        });
      }
    };

    const handleTestConnection = async (id: string) => {
      setTestingConnection(id);
      try {
        const success = await testConnection(id);
        if (success) {
          toast({
            title: "نجح اختبار الاتصال",
            description: "تم الاتصال بالنظام الخارجي بنجاح"
          });
        }
      } catch (error) {
        console.error('Connection test failed:', error);
        toast({
          title: "فشل اختبار الاتصال",
          description: "تعذر الاتصال بالنظام الخارجي",
          variant: "destructive"
        });
      } finally {
        setTestingConnection(null);
      }
    };

    const getStatusBadge = (status: string) => {
      return status === 'active' ? (
        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <Wifi className="h-3 w-3 ml-1" />
          نشط
        </Badge>
      ) : (
        <Badge variant="outline" className="border-red-300 text-red-700 dark:border-red-600 dark:text-red-400">
          <WifiOff className="h-3 w-3 ml-1" />
          غير نشط
        </Badge>
      );
    };

    const getSystemIcon = (systemName: string) => {
      const name = systemName.toLowerCase();
      if (name.includes('erp') || name.includes('sap')) {
        return <Database className="h-5 w-5 text-blue-600" />;
      }
      if (name.includes('cloud') || name.includes('aws') || name.includes('azure')) {
        return <Cloud className="h-5 w-5 text-purple-600" />;
      }
      return <Link className="h-5 w-5 text-muted-foreground" />;
    };

    const formatLastSync = (lastSync: string | undefined) => {
      if (!lastSync) return 'لم يتم المزامنة';
      const date = new Date(lastSync);
      return `${date.toLocaleDateString('ar-SA')} ${date.toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    };

    if (loading) {
      return (
        <Card>
          <CardContent className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">جاري تحميل التكاملات...</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{integrations.length}</p>
                  <p className="text-sm text-muted-foreground">إجمالي التكاملات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'active').length}</p>
                  <p className="text-sm text-muted-foreground">نشط</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'inactive').length}</p>
                  <p className="text-sm text-muted-foreground">غير نشط</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                إدارة التكاملات مع الأنظمة الخارجية
              </CardTitle>
              <Button onClick={() => setNewIntegrationDialog(true)}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة تكامل جديد
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {integrations.length === 0 ? (
              <div className="text-center py-12">
                <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-lg font-medium">لا توجد تكاملات مُعدة</p>
                <p className="text-sm text-muted-foreground mb-4">
                  ابدأ بإضافة تكامل مع نظام خارجي لمزامنة البيانات المالية
                </p>
                <Button onClick={() => setNewIntegrationDialog(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة تكامل جديد
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>النظام</TableHead>
                    <TableHead>نوع المصادقة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>آخر مزامنة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getSystemIcon(integration.system_name)}
                          <div>
                            <p className="font-medium">{integration.system_name}</p>
                            {integration.api_endpoint && (
                              <p className="text-sm text-muted-foreground">
                                {integration.api_endpoint}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          {integration.auth_type === 'api_key' ? (
                            <>
                              <Key className="h-3 w-3" />
                              API Key
                            </>
                          ) : (
                            <>
                              <Shield className="h-3 w-3" />
                              OAuth2
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(integration.status)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {formatLastSync(integration.last_sync)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTestConnection(integration.id)}
                            disabled={testingConnection === integration.id}
                          >
                            {testingConnection === integration.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <TestTube className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* New Integration Dialog */}
        <Dialog open={newIntegrationDialog} onOpenChange={setNewIntegrationDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة تكامل جديد</DialogTitle>
              <DialogDescription>
                أضف تكامل مع نظام خارجي لمزامنة البيانات المالية
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system_name">اسم النظام</Label>
                <Input
                  id="system_name"
                  placeholder="مثال: SAP ERP، Oracle Financial"
                  value={formData.system_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, system_name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api_endpoint">رابط API</Label>
                <Input
                  id="api_endpoint"
                  placeholder="https://api.example.com/v1"
                  value={formData.api_endpoint}
                  onChange={(e) => setFormData(prev => ({ ...prev, api_endpoint: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth_type">نوع المصادقة</Label>
                <Select
                  value={formData.auth_type}
                  onValueChange={(value: 'api_key' | 'oauth2') => 
                    setFormData(prev => ({ ...prev, auth_type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api_key">API Key</SelectItem>
                    <SelectItem value="oauth2">OAuth2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="token_secret">
                  {formData.auth_type === 'api_key' ? 'API Key' : 'OAuth Token'}
                </Label>
                <Input
                  id="token_secret"
                  type="password"
                  placeholder="أدخل المفتاح السري..."
                  value={formData.token_secret}
                  onChange={(e) => setFormData(prev => ({ ...prev, token_secret: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewIntegrationDialog(false)}>
                إلغاء
              </Button>
              <Button onClick={handleCreateIntegration}>
                إضافة التكامل
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const NotificationsCenter = () => {
    const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useBudgetNotifications();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const getNotificationIcon = (type: string) => {
      switch (type) {
        case 'allocation':
          return <Target className="h-5 w-5 text-blue-500" />;
        case 'expense':
          return <DollarSign className="h-5 w-5 text-green-500" />;
        case 'deletion':
          return <Trash2 className="h-5 w-5 text-red-500" />;
        case 'update':
          return <RefreshCw className="h-5 w-5 text-orange-500" />;
        default:
          return <Bell className="h-5 w-5 text-muted-foreground" />;
      }
    };

    const getNotificationTypeText = (type: string) => {
      switch (type) {
        case 'allocation':
          return 'تخصيص الميزانية';
        case 'expense':
          return 'مصروف';
        case 'deletion':
          return 'حذف';
        case 'update':
          return 'تحديث';
        default:
          return 'إشعار عام';
      }
    };

    const formatTime = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) {
        return 'منذ قليل';
      } else if (diffInHours < 24) {
        return `منذ ${diffInHours} ساعة`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `منذ ${diffInDays} يوم`;
      }
    };

    const getChannelIcon = (channel: string) => {
      switch (channel) {
        case 'email':
          return <Mail className="h-3 w-3" />;
        case 'push':
          return <Bell className="h-3 w-3" />;
        default:
          return <Info className="h-3 w-3" />;
      }
    };

    const filteredNotifications = notifications.filter(notification => {
      const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || notification.request_type === filterType;
      return matchesSearch && matchesType;
    });

    if (loading) {
      return (
        <Card>
          <CardContent className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">جاري تحميل الإشعارات...</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                  <p className="text-sm text-muted-foreground">إجمالي الإشعارات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                  <p className="text-sm text-muted-foreground">غير مقروءة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{notifications.length - unreadCount}</p>
                  <p className="text-sm text-muted-foreground">مقروءة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                مركز الإشعارات والتنبيهات
              </CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    <CheckCircle className="h-4 w-4 ml-2" />
                    تعليم الكل كمقروء
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 ml-2" />
                  إعدادات الإشعارات
                </Button>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="البحث في الإشعارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الإشعارات</SelectItem>
                  <SelectItem value="allocation">تخصيص الميزانية</SelectItem>
                  <SelectItem value="expense">المصروفات</SelectItem>
                  <SelectItem value="deletion">الحذف</SelectItem>
                  <SelectItem value="update">التحديثات</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-lg font-medium">لا توجد إشعارات</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || filterType !== 'all' 
                    ? 'لا توجد إشعارات تطابق معايير البحث'
                    : 'ستظهر جميع الإشعارات والتنبيهات المالية هنا'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`transition-all duration-200 hover:shadow-md ${
                      notification.status === 'unread' 
                        ? 'border-l-4 border-l-primary bg-primary/5' 
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getNotificationIcon(notification.request_type)}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {getNotificationTypeText(notification.request_type)}
                                </Badge>
                                <Badge variant="outline" className="text-xs flex items-center gap-1">
                                  {getChannelIcon(notification.channel)}
                                  {notification.channel === 'email' ? 'إيميل' : 
                                   notification.channel === 'push' ? 'دفع' : 'التطبيق'}
                                </Badge>
                                {notification.status === 'unread' && (
                                  <Badge variant="default" className="text-xs bg-primary">
                                    جديد
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-medium mt-1">
                                {getNotificationTypeText(notification.request_type)} - {notification.request_id.slice(-8)}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {formatTime(notification.created_at)}
                              </span>
                              {notification.status === 'unread' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 px-2 text-xs"
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">قسم الميزانية والتخطيط المالي</h1>
          <p className="text-muted-foreground">إدارة شاملة للميزانيات والتخطيط المالي المؤسسي</p>
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