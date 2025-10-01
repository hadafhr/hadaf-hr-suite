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
  BellOff,
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
  Info,
  RefreshCw,
  Pause
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

  // Mock data - enhanced
  const [departments, setDepartments] = useState([
    {
      id: '1',
      name: 'تقنية المعلومات',
      description: 'قسم متخصص في تطوير وصيانة الأنظمة التقنية',
      employeeCount: 15,
      performance: 92,
      budget: 500000,
      manager: 'أحمد محمد',
      type: 'تقني',
      status: 'نشط',
      createdDate: '2023-01-15',
      location: 'الدور الثالث'
    },
    {
      id: '2', 
      name: 'الموارد البشرية',
      description: 'إدارة شؤون الموظفين والتوظيف والتطوير',
      employeeCount: 8,
      performance: 95,
      budget: 200000,
      manager: 'سارة أحمد',
      type: 'إداري',
      status: 'نشط',
      createdDate: '2023-02-10',
      location: 'الدور الثاني'
    },
    {
      id: '3',
      name: 'المبيعات والتسويق',
      description: 'تطوير استراتيجيات المبيعات والتسويق الرقمي',
      employeeCount: 12,
      performance: 88,
      budget: 350000,
      manager: 'محمد العلي',
      type: 'عمليات',
      status: 'نشط',
      createdDate: '2023-01-20',
      location: 'الدور الأول'
    }
  ]);

  const [positions, setPositions] = useState([
    {
      id: '1',
      title: 'مطور برمجيات أول',
      department: 'تقنية المعلومات',
      level: 'أول',
      salary: 15000,
      requirements: 'خبرة 5 سنوات في البرمجة',
      status: 'متاح',
      type: 'دائم'
    },
    {
      id: '2',
      title: 'أخصائي موارد بشرية',
      department: 'الموارد البشرية',
      level: 'متوسط',
      salary: 8000,
      requirements: 'شهادة في الموارد البشرية',
      status: 'مشغول',
      type: 'دائم'
    },
    {
      id: '3',
      title: 'منسق مبيعات',
      department: 'المبيعات والتسويق',
      level: 'مبتدئ',
      salary: 6000,
      requirements: 'خبرة سنتين في المبيعات',
      status: 'متاح',
      type: 'مؤقت'
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: '1',
      title: 'تقرير الأداء الشهري',
      type: 'أداء',
      department: 'جميع الأقسام',
      createdDate: '2024-01-15',
      status: 'مكتمل'
    },
    {
      id: '2',
      title: 'تقرير الميزانيات',
      type: 'مالي',
      department: 'جميع الأقسام', 
      createdDate: '2024-01-10',
      status: 'قيد المراجعة'
    }
  ]);

  const [systemSettings, setSystemSettings] = useState({
    language: 'ar',
    timezone: 'riyadh',
    currency: 'sar',
    notifications: true,
    autoSync: true,
    theme: 'light',
    backupFrequency: 'daily'
  });

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

  const renderHeader = () => (
    <div className="space-y-6 container mx-auto p-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img 
          src="/src/assets/boud-logo-centered.png" 
          alt="Boud Logo" 
          className="h-32 w-auto object-contain"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">نظام إدارة الأقسام المتطور</h1>
        <p className="text-muted-foreground">إدارة شاملة للهيكل التنظيمي والأقسام</p>
      </div>
    </div>
  );

  const renderProfessionalHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent animate-fade-in transition-all duration-300" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="bg-card text-foreground border-border hover:bg-accent/20 hover:border-accent hover:scale-105 transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-border"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
               onClick={() => setActiveTab('dashboard')}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/20 to-transparent animate-pulse"></div>
            <Building className="h-8 w-8 text-primary-foreground relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              نظام إدارة الأقسام المتطور
            </h1>
            <p className="text-muted-foreground text-lg">
              إدارة شاملة للهيكل التنظيمي والأقسام بتقنيات ذكية متطورة
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Settings Button */}
        <Button variant="outline" size="sm" onClick={handleSettings} className="bg-card text-foreground border-border hover:bg-accent/20 hover:border-accent hover:scale-105 transition-all duration-300">
          <Settings className="h-4 w-4 ml-2" />
          الإعدادات
        </Button>
        
        {/* Notifications Button */}
        <Button variant="outline" size="sm" onClick={handleNotifications} className="bg-card text-foreground border-border hover:bg-accent/20 hover:border-accent hover:scale-105 transition-all duration-300">
          <Bell className="h-4 w-4 ml-2" />
          الإشعارات
        </Button>

        {/* Print Button */}
        <Button variant="outline" size="sm" onClick={handlePrint} className="bg-card text-foreground border-border hover:bg-accent/20 hover:border-accent hover:scale-105 transition-all duration-300">
          <FileText className="h-4 w-4 ml-2" />
          طباعة
        </Button>

        <Badge variant="outline" className="bg-card text-foreground border-border px-4 py-2 text-sm font-medium cursor-pointer hover:bg-accent/20 hover:border-accent transition-all duration-300"
               onClick={() => setActiveTab('reports')}>
          <Building className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        
        <Button onClick={handleExport} className="bg-card text-foreground border-border hover:bg-accent/20 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300">
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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-arabic" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Floating Elements for Professional Look */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 left-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>
      
      <div className="relative z-10">
      {renderHeader()}
      
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 relative z-10">
          <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
              <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="departments" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">الأقسام</TabsTrigger>
              <TabsTrigger value="positions" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">المناصب</TabsTrigger>
              <TabsTrigger value="structure" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">الهيكل التنظيمي</TabsTrigger>
              <TabsTrigger value="reports" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">التقارير</TabsTrigger>
              <TabsTrigger value="settings" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">الإعدادات</TabsTrigger>
            </TabsList>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="departments">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">إدارة الأقسام</h2>
                <div className="flex gap-2">
                  <Input
                    placeholder="البحث في الأقسام..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة قسم
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.filter(dept => 
                  dept.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((dept) => (
                  <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
                          <Badge variant="outline" className="mb-2">{dept.type}</Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>المدير:</span>
                          <span>{dept.manager}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>عدد الموظفين:</span>
                          <span>{dept.employeeCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>الأداء:</span>
                          <span>{dept.performance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>الميزانية:</span>
                          <span>{dept.budget.toLocaleString()} ر.س</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>الموقع:</span>
                          <span>{dept.location}</span>
                        </div>
                        <Progress value={dept.performance} className="mt-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="positions">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">إدارة المناصب</h2>
                <Button onClick={() => {
                  const newPosition = {
                    id: Date.now().toString(),
                    title: 'منصب جديد',
                    department: 'غير محدد',
                    level: 'متوسط',
                    salary: 8000,
                    requirements: 'متطلبات المنصب',
                    status: 'متاح',
                    type: 'دائم'
                  };
                  setPositions([...positions, newPosition]);
                  toast({
                    title: "تم إنشاء المنصب",
                    description: "تم إضافة منصب جديد بنجاح"
                  });
                }}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة منصب
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {positions.map((position) => (
                  <Card key={position.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold">{position.title}</h3>
                          <p className="text-sm text-muted-foreground">{position.department}</p>
                        </div>
                        <Badge variant={position.status === 'متاح' ? 'default' : 'secondary'}>
                          {position.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>المستوى:</span>
                          <span>{position.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الراتب:</span>
                          <span>{position.salary.toLocaleString()} ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span>النوع:</span>
                          <span>{position.type}</span>
                        </div>
                        <div className="mt-2">
                          <span className="font-medium">المتطلبات:</span>
                          <p className="text-muted-foreground">{position.requirements}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="structure">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">الهيكل التنظيمي</h2>
                <Button onClick={() => {
                  toast({
                    title: "تحديث الهيكل",
                    description: "جاري تحديث المخطط التنظيمي..."
                  });
                }}>
                  <RefreshCw className="h-4 w-4 ml-2" />
                  تحديث الهيكل
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-6">
                    {/* CEO Level */}
                    <div className="flex justify-center">
                      <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                        <Building className="h-8 w-8 mx-auto mb-2" />
                        <h3 className="font-semibold">الرئيس التنفيذي</h3>
                        <p className="text-sm">إدارة عليا</p>
                      </div>
                    </div>

                    {/* Department Level */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {departments.map((dept) => (
                        <div key={dept.id} className="relative">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-px h-4 bg-border"></div>
                          <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-4 text-center">
                              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                                <Users className="h-6 w-6" />
                              </div>
                              <h4 className="font-semibold text-sm">{dept.name}</h4>
                              <p className="text-xs text-muted-foreground">{dept.manager}</p>
                              <p className="text-xs text-muted-foreground">{dept.employeeCount} موظف</p>
                              <Badge variant="outline" className="mt-2 text-xs">{dept.type}</Badge>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>

                    {/* Teams Level */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['فريق التطوير', 'فريق التصميم', 'فريق الدعم', 'فريق المبيعات'].map((team, index) => (
                        <Card key={index} className="bg-muted">
                          <CardContent className="p-3 text-center">
                            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center mx-auto mb-1">
                              <UserCheck className="h-4 w-4" />
                            </div>
                            <p className="text-xs font-medium">{team}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">التقارير</h2>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => {
                    const newReport = {
                      id: Date.now().toString(),
                      title: 'تقرير مخصص',
                      type: 'مخصص',
                      department: 'جميع الأقسام',
                      createdDate: new Date().toISOString().split('T')[0],
                      status: 'جديد'
                    };
                    setReports([...reports, newReport]);
                    toast({
                      title: "تقرير جديد",
                      description: "تم إنشاء تقرير مخصص جديد"
                    });
                  }}>
                    <Plus className="h-4 w-4 ml-2" />
                    تقرير جديد
                  </Button>
                  <Button onClick={handleExport}>
                    <Download className="h-4 w-4 ml-2" />
                    تصدير الكل
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "تقرير الأداء",
                    description: "عرض تقرير أداء الأقسام الشامل"
                  });
                }}>
                  <CardContent className="p-4 text-center">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">تقرير الأداء</h3>
                    <p className="text-sm text-muted-foreground">أداء جميع الأقسام</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "التقرير المالي",
                    description: "عرض تقرير الميزانيات والنفقات"
                  });
                }}>
                  <CardContent className="p-4 text-center">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-semibold">التقرير المالي</h3>
                    <p className="text-sm text-muted-foreground">ميزانيات الأقسام</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "تقرير الموظفين", 
                    description: "إحصائيات وبيانات الموظفين"
                  });
                }}>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">تقرير الموظفين</h3>
                    <p className="text-sm text-muted-foreground">إحصائيات الموظفين</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "تقرير مخصص",
                    description: "إنشاء تقرير حسب المتطلبات"
                  });
                }}>
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-semibold">تقرير مخصص</h3>
                    <p className="text-sm text-muted-foreground">تخصيص حسب الحاجة</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>التقارير الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">{report.department} - {report.createdDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={report.status === 'مكتمل' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                          <Button size="sm" variant="ghost">
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

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إعدادات النظام</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الإعدادات العامة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>لغة النظام</Label>
                      <Select value={systemSettings.language} onValueChange={(value) => 
                        setSystemSettings(prev => ({...prev, language: value}))
                      }>
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
                      <Select value={systemSettings.timezone} onValueChange={(value) => 
                        setSystemSettings(prev => ({...prev, timezone: value}))
                      }>
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
                      <Select value={systemSettings.currency} onValueChange={(value) => 
                        setSystemSettings(prev => ({...prev, currency: value}))
                      }>
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>تفضيلات النظام</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>الإشعارات</Label>
                        <p className="text-sm text-muted-foreground">تفعيل إشعارات النظام</p>
                      </div>
                      <Button 
                        variant={systemSettings.notifications ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSystemSettings(prev => ({...prev, notifications: !prev.notifications}))}
                      >
                        {systemSettings.notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>التزامن التلقائي</Label>
                        <p className="text-sm text-muted-foreground">مزامنة البيانات تلقائياً</p>
                      </div>
                      <Button 
                        variant={systemSettings.autoSync ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSystemSettings(prev => ({...prev, autoSync: !prev.autoSync}))}
                      >
                        {systemSettings.autoSync ? <Activity className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>نسخ احتياطي</Label>
                      <Select value={systemSettings.backupFrequency} onValueChange={(value) => 
                        setSystemSettings(prev => ({...prev, backupFrequency: value}))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">يومي</SelectItem>
                          <SelectItem value="weekly">أسبوعي</SelectItem>
                          <SelectItem value="monthly">شهري</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>إجراءات النظام</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={() => {
                      toast({
                        title: "تم حفظ الإعدادات",
                        description: "تم حفظ جميع الإعدادات بنجاح"
                      });
                    }}>
                      <Settings className="h-4 w-4 ml-2" />
                      حفظ الإعدادات
                    </Button>

                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "إعادة تعيين",
                        description: "تم إعادة الإعدادات للقيم الافتراضية"
                      });
                    }}>
                      <RefreshCw className="h-4 w-4 ml-2" />
                      إعادة تعيين
                    </Button>

                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "نسخة احتياطية",
                        description: "جاري إنشاء نسخة احتياطية..."
                      });
                    }}>
                      <Archive className="h-4 w-4 ml-2" />
                      نسخة احتياطية
                    </Button>

                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "تصدير الإعدادات",
                        description: "جاري تصدير إعدادات النظام..."
                      });
                    }}>
                      <Download className="h-4 w-4 ml-2" />
                      تصدير الإعدادات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
    </div>
  );
};

export default DepartmentsManagement;