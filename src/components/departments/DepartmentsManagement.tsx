import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Building, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
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
  Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

interface DepartmentsManagementProps {
  onBack: () => void;
}

export const DepartmentsManagement: React.FC<DepartmentsManagementProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [newDepartmentForm, setNewDepartmentForm] = useState({
    name: '',
    description: '',
    manager: '',
    budget: '',
    type: ''
  });

  // Mock data
  const departments = [
    {
      id: '1',
      name: 'تقنية المعلومات',
      employeeCount: 15,
      performance: 92,
      budget: 500000
    },
    {
      id: '2', 
      name: 'الموارد البشرية',
      employeeCount: 8,
      performance: 95,
      budget: 200000
    }
  ];

  const stats = {
    totalDepartments: 16,
    activeDepartments: 14,
    totalPositions: 38,
    openPositions: 12,
    avgPerformance: 89,
    totalBudget: 2500000
  };

  const performanceData = [
    { month: 'يناير', departments: 12, positions: 25, performance: 85 },
    { month: 'فبراير', departments: 13, positions: 28, performance: 87 },
    { month: 'مارس', departments: 14, positions: 32, performance: 89 },
    { month: 'أبريل', departments: 14, positions: 30, performance: 88 },
    { month: 'مايو', departments: 15, positions: 35, performance: 91 },
    { month: 'يونيو', departments: 16, positions: 38, performance: 93 }
  ];

  const departmentTypeDistribution = [
    { name: 'تقني', value: 35, color: '#3b82f6' },
    { name: 'إداري', value: 25, color: '#10b981' },
    { name: 'عمليات', value: 20, color: '#f59e0b' },
    { name: 'دعم', value: 15, color: '#8b5cf6' },
    { name: 'استراتيجي', value: 5, color: '#ef4444' }
  ];

  const handleExport = () => {
    // Create and download Excel file with department data
    const csvContent = "data:text/csv;charset=utf-8," 
      + "القسم,عدد الموظفين,الأداء,الميزانية\n"
      + departments.map(dept => 
          `${dept.name},${dept.employeeCount},${dept.performance}%,${dept.budget}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `departments_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير بيانات الأقسام إلى ملف CSV",
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head><title>تقرير الأقسام</title></head>
        <body>
          <h1>تقرير إدارة الأقسام</h1>
          <table border="1">
            <tr><th>القسم</th><th>عدد الموظفين</th><th>الأداء</th><th>الميزانية</th></tr>
            ${departments.map(dept => 
              `<tr><td>${dept.name}</td><td>${dept.employeeCount}</td><td>${dept.performance}%</td><td>${dept.budget}</td></tr>`
            ).join('')}
          </table>
        </body>
      </html>
    `);
    printWindow?.print();
    
    toast({
      title: "جاري الطباعة", 
      description: "تم إرسال التقرير إلى الطابعة",
    });
  };

  const handleAddDepartment = () => {
    if (!newDepartmentForm.name || !newDepartmentForm.type) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // Add default values if not provided
    const newDepartment = {
      id: Date.now().toString(),
      name: newDepartmentForm.name,
      description: newDepartmentForm.description || 'وصف القسم الجديد',
      employeeCount: 0,
      performance: 85, // Default performance
      budget: parseInt(newDepartmentForm.budget) || 100000, // Default budget
      type: newDepartmentForm.type,
      manager: newDepartmentForm.manager || 'غير محدد'
    };

    // Here you would typically add to your state or API
    toast({
      title: "تم إنشاء القسم بنجاح",
      description: `تم إضافة قسم ${newDepartment.name} بنجاح`,
    });

    setIsAddDialogOpen(false);
    setNewDepartmentForm({ name: '', description: '', manager: '', budget: '', type: '' });
  };

  const handleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    toast({
      title: "الإشعارات",
      description: "لديك 3 إشعارات جديدة",
    });
  };

  const handleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    toast({
      title: "الإعدادات",
      description: "فتح إعدادات النظام",
    });
  };

  const renderProfessionalHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group cursor-pointer"
               onClick={() => setActiveTab('dashboard')}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <Building className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام إدارة الأقسام المتطور
            </h1>
            <p className="text-gray-600 text-lg">
              إدارة شاملة للهيكل التنظيمي والأقسام بتقنيات ذكية متطورة
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Settings Button */}
        <Button variant="outline" size="sm" onClick={handleSettings} className="border-gray-300 hover:bg-blue-50 hover:border-blue-300">
          <Settings className="h-4 w-4 ml-2" />
          الإعدادات
        </Button>
        
        {/* Notifications Button */}
        <Button variant="outline" size="sm" onClick={handleNotifications} className="border-gray-300 hover:bg-yellow-50 hover:border-yellow-300">
          <Bell className="h-4 w-4 ml-2" />
          الإشعارات
        </Button>

        {/* Print Button */}
        <Button variant="outline" size="sm" onClick={handlePrint} className="border-gray-300 hover:bg-purple-50 hover:border-purple-300">
          <FileText className="h-4 w-4 ml-2" />
          طباعة
        </Button>

        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium cursor-pointer"
               onClick={() => setActiveTab('reports')}>
          <Building className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        
        <Button onClick={handleExport} className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="h-4 w-4 ml-2" />
              قسم جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة قسم جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">اسم القسم *</Label>
                <Input
                  id="name"
                  value={newDepartmentForm.name}
                  onChange={(e) => setNewDepartmentForm(prev => ({...prev, name: e.target.value}))}
                  placeholder="أدخل اسم القسم"
                />
              </div>
              <div>
                <Label htmlFor="type">نوع القسم *</Label>
                <Select value={newDepartmentForm.type} onValueChange={(value) => setNewDepartmentForm(prev => ({...prev, type: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تقني">تقني</SelectItem>
                    <SelectItem value="إداري">إداري</SelectItem>
                    <SelectItem value="عمليات">عمليات</SelectItem>
                    <SelectItem value="دعم">دعم</SelectItem>
                    <SelectItem value="استراتيجي">استراتيجي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="manager">مدير القسم</Label>
                <Input
                  id="manager"
                  value={newDepartmentForm.manager}
                  onChange={(e) => setNewDepartmentForm(prev => ({...prev, manager: e.target.value}))}
                  placeholder="اسم مدير القسم (اختياري)"
                />
              </div>
              <div>
                <Label htmlFor="budget">الميزانية</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newDepartmentForm.budget}
                  onChange={(e) => setNewDepartmentForm(prev => ({...prev, budget: e.target.value}))}
                  placeholder="100000 (افتراضي)"
                />
              </div>
              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={newDepartmentForm.description}
                  onChange={(e) => setNewDepartmentForm(prev => ({...prev, description: e.target.value}))}
                  placeholder="وصف القسم الجديد (اختياري)"
                />
              </div>
              <Button onClick={handleAddDepartment} className="w-full">
                إنشاء القسم
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الأقسام</p>
                <p className="text-2xl font-bold text-primary">{stats.totalDepartments}</p>
              </div>
              <Building className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">أقسام نشطة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activeDepartments}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المناصب الإجمالية</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.totalPositions}</p>
              </div>
              <Users className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مناصب شاغرة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.openPositions}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الأداء (%)</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgPerformance}</p>
              </div>
              <Target className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الميزانية</p>
                <p className="text-2xl font-bold text-green-600">{(stats.totalBudget / 1000000).toFixed(1)}م</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              أداء النظام الإداري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="departments" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="positions" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="performance" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع أنواع الأقسام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
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
            رؤى الذكاء الاصطناعي الإدارية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">هيكل متوازن</span>
              </div>
              <p className="text-sm text-emerald-700">
                الهيكل التنظيمي متوازن ويحقق كفاءة عالية في توزيع الأدوار
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">احتياج إعادة هيكلة</span>
              </div>
              <p className="text-sm text-orange-700">
                قسم العمليات يحتاج لإعادة هيكلة بسبب زيادة الأعباء
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">نمو متوقع</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لحاجة 3 أقسام جديدة خلال العام القادم
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderProfessionalHeader()}
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b border-border">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="departments">الأقسام</TabsTrigger>
              <TabsTrigger value="positions">المناصب</TabsTrigger>
              <TabsTrigger value="structure">الهيكل التنظيمي</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="departments">
            <h2 className="text-2xl font-bold">إدارة الأقسام</h2>
            <Card>
              <CardContent className="p-6">
                <p>قائمة الأقسام والوحدات التنظيمية</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions">
            <h2 className="text-2xl font-bold">إدارة المناصب</h2>
            <Card>
              <CardContent className="p-6">
                <p>المناصب الوظيفية المتاحة</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure">
            <h2 className="text-2xl font-bold">الهيكل التنظيمي</h2>
            <Card>
              <CardContent className="p-6">
                <p>المخطط التنظيمي للشركة</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <h2 className="text-2xl font-bold">التقارير</h2>
            <Card>
              <CardContent className="p-6">
                <p>تقارير الأقسام والأداء</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <h2 className="text-2xl font-bold">الإعدادات</h2>
            <Card>
              <CardContent className="p-6">
                <p>إعدادات النظام</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Notifications Dialog */}
        <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                الإشعارات
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-800">قسم جديد</span>
                </div>
                <p className="text-sm text-blue-700">تم إضافة قسم الذكاء الاصطناعي بنجاح</p>
                <p className="text-xs text-blue-600 mt-1">منذ ساعتين</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="font-semibold text-orange-800">تحديث مطلوب</span>
                </div>
                <p className="text-sm text-orange-700">قسم العمليات يحتاج إعادة تقييم الميزانية</p>
                <p className="text-xs text-orange-600 mt-1">منذ يوم واحد</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-800">إنجاز</span>
                </div>
                <p className="text-sm text-green-700">تم تحديث هيكل قسم الموارد البشرية</p>
                <p className="text-xs text-green-600 mt-1">منذ 3 أيام</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                إعدادات النظام
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>لغة النظام</Label>
                <Select defaultValue="ar">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>المنطقة الزمنية</Label>
                <Select defaultValue="riyadh">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riyadh">الرياض (GMT+3)</SelectItem>
                    <SelectItem value="dubai">دبي (GMT+4)</SelectItem>
                    <SelectItem value="cairo">القاهرة (GMT+2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>العملة الافتراضية</Label>
                <Select defaultValue="sar">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sar">ريال سعودي (SAR)</SelectItem>
                    <SelectItem value="aed">درهم إماراتي (AED)</SelectItem>
                    <SelectItem value="egp">جنيه مصري (EGP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>الإشعارات</Label>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label>التزامن التلقائي</Label>
                <Button variant="outline" size="sm">
                  <Activity className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={() => {
                setIsSettingsOpen(false);
                toast({
                  title: "تم حفظ الإعدادات",
                  description: "تم حفظ إعدادات النظام بنجاح"
                });
              }} className="w-full">
                حفظ الإعدادات
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DepartmentsManagement;