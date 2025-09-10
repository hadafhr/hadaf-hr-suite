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
  Clock, 
  User, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar,
  Download,
  Plus,
  Search,
  Filter,
  Building,
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
  Info,
  UserPlus,
  Phone,
  Mail,
  Crown,
  Users2,
  MapPin,
  Timer,
  Users
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

interface ComprehensiveAttendanceProps {
  onBack: () => void;
}

const ComprehensiveAttendance = ({ onBack }: ComprehensiveAttendanceProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newAttendanceRecord, setNewAttendanceRecord] = useState({
    employee_name: '',
    employee_id: '',
    department: '',
    check_in: '',
    check_out: '',
    status: 'present',
    notes: ''
  });
  const [newShift, setNewShift] = useState({
    name: '',
    start_time: '',
    end_time: '',
    break_duration: '60',
    description: '',
    days: []
  });

  // Mock attendance records
  const attendanceRecords = [
    {
      id: '1',
      employee_name: 'أحمد محمد',
      employee_id: 'EMP001',
      department: 'تقنية المعلومات',
      check_in: '08:15',
      check_out: '17:30',
      working_hours: '8.25',
      status: 'present',
      date: '2024-01-15',
      overtime: '0.5',
      late_minutes: 15,
      location: 'المكتب الرئيسي'
    },
    {
      id: '2',
      employee_name: 'فاطمة علي',
      employee_id: 'EMP002',
      department: 'الموارد البشرية',
      check_in: '08:00',
      check_out: '17:00',
      working_hours: '8.0',
      status: 'present',
      date: '2024-01-15',
      overtime: '0',
      late_minutes: 0,
      location: 'المكتب الرئيسي'
    },
    {
      id: '3',
      employee_name: 'محمد حسن',
      employee_id: 'EMP003',
      department: 'المبيعات',
      check_in: '09:30',
      check_out: '18:30',
      working_hours: '8.0',
      status: 'late',
      date: '2024-01-15',
      overtime: '1.0',
      late_minutes: 90,
      location: 'عمل عن بُعد'
    },
    {
      id: '4',
      employee_name: 'نور الدين',
      employee_id: 'EMP004',
      department: 'المالية',
      check_in: '',
      check_out: '',
      working_hours: '0',
      status: 'absent',
      date: '2024-01-15',
      overtime: '0',
      late_minutes: 0,
      location: ''
    }
  ];

  // Mock shift schedules
  const shiftSchedules = [
    {
      id: '1',
      name: 'النوبة الصباحية',
      start_time: '08:00',
      end_time: '17:00',
      break_duration: 60,
      description: 'نوبة العمل الأساسية للموظفين الإداريين',
      days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
      employees_count: 85,
      is_active: true
    },
    {
      id: '2',
      name: 'النوبة المسائية',
      start_time: '14:00',
      end_time: '23:00',
      break_duration: 60,
      description: 'نوبة المساء لقسم خدمة العملاء',
      days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
      employees_count: 25,
      is_active: true
    },
    {
      id: '3',
      name: 'نوبة نهاية الأسبوع',
      start_time: '09:00',
      end_time: '18:00',
      break_duration: 60,
      description: 'نوبة العمل في عطلة نهاية الأسبوع',
      days: ['الجمعة', 'السبت'],
      employees_count: 15,
      is_active: true
    }
  ];

  // Analytics data
  const attendanceData = [
    { month: 'يناير', present: 85, late: 12, absent: 3 },
    { month: 'فبراير', present: 87, late: 10, absent: 2 },
    { month: 'مارس', present: 89, late: 8, absent: 1 },
    { month: 'أبريل', present: 88, late: 15, absent: 4 },
    { month: 'مايو', present: 91, late: 7, absent: 2 },
    { month: 'يونيو', present: 93, late: 5, absent: 1 }
  ];

  const departmentAttendance = [
    { name: 'تقنية المعلومات', value: 95, color: 'hsl(var(--primary))' },
    { name: 'الموارد البشرية', value: 92, color: 'hsl(var(--primary-glow))' },
    { name: 'المالية', value: 88, color: 'hsl(var(--warning))' },
    { name: 'التسويق', value: 90, color: 'hsl(var(--success))' },
    { name: 'العمليات', value: 85, color: 'hsl(var(--muted-foreground))' }
  ];

  // Calculate statistics
  const stats = {
    totalEmployees: 127,
    presentToday: 118,
    lateArrivals: 8,
    avgAttendance: 92,
    remoteWorkers: 12,
    avgWorkHours: 8.2
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير الحضور والانصراف كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const handleAddAttendance = () => {
    if (!newAttendanceRecord.employee_name || !newAttendanceRecord.employee_id) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم إضافة السجل بنجاح",
      description: `تم إضافة سجل حضور للموظف ${newAttendanceRecord.employee_name}`,
    });

    setNewAttendanceRecord({
      employee_name: '',
      employee_id: '',
      department: '',
      check_in: '',
      check_out: '',
      status: 'present',
      notes: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleAddShift = () => {
    if (!newShift.name || !newShift.start_time || !newShift.end_time) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم إضافة النوبة بنجاح",
      description: `تم إضافة نوبة ${newShift.name}`,
    });

    setNewShift({
      name: '',
      start_time: '',
      end_time: '',
      break_duration: '60',
      description: '',
      days: []
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: { label: 'حاضر', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      late: { label: 'متأخر', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      absent: { label: 'غائب', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
      remote: { label: 'عمل عن بُعد', variant: 'outline' as const, color: 'bg-blue-100 text-blue-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <Clock className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام الحضور والانصراف المتطور
            </h1>
            <p className="text-gray-600 text-lg">
              منظومة شاملة لإدارة حضور الموظفين مع أدوات التتبع المتقدمة
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <Clock className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4 ml-2" />
          إضافة نوبة
        </Button>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">حاضر اليوم</p>
                <p className="text-2xl font-bold text-success">{stats.presentToday}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متأخرين</p>
                <p className="text-2xl font-bold text-warning">{stats.lateArrivals}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الحضور</p>
                <p className="text-2xl font-bold text-primary">{stats.avgAttendance}%</p>
              </div>
              <Target className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عمل عن بُعد</p>
                <p className="text-2xl font-bold text-primary">{stats.remoteWorkers}</p>
              </div>
              <Globe className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط ساعات العمل</p>
                <p className="text-2xl font-bold text-primary">{stats.avgWorkHours}</p>
              </div>
              <Timer className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="h-5 w-5 text-primary" />
              إحصائيات الحضور الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="present" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" />
                <Area type="monotone" dataKey="late" stackId="2" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" />
                <Area type="monotone" dataKey="absent" stackId="3" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <PieChart className="h-5 w-5 text-primary" />
              معدل الحضور حسب القسم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentAttendance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {departmentAttendance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="dashboard-card border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي للحضور والانصراف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm font-semibold text-success">حضور ممتاز</span>
              </div>
              <p className="text-sm text-muted-foreground">
                تحسن ملحوظ في معدلات الحضور العامة بنسبة 12% هذا الشهر
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm font-semibold text-warning">تنبيه تأخير</span>
              </div>
              <p className="text-sm text-muted-foreground">
                ملاحظة زيادة في حالات التأخير الصباحي في قسم المبيعات
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-muted-foreground">
                التوقعات تشير لتحقيق هدف 95% حضور منتظم نهاية الشهر
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Zap className="h-5 w-5 text-primary" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <Clock className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">تسجيل حضور</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <Calendar className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">إدارة النوبات</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <MapPin className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">تتبع الموقع</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <FileText className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">تقرير يومي</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <Settings className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">إعدادات النظام</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <Bell className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">التنبيهات</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {renderHeader()}
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-white rounded-xl border border-border shadow-soft p-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted rounded-lg p-2">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-white">لوحة التحكم</TabsTrigger>
                <TabsTrigger value="attendance" className="data-[state=active]:bg-primary data-[state=active]:text-white">سجل الحضور</TabsTrigger>
                <TabsTrigger value="shifts" className="data-[state=active]:bg-primary data-[state=active]:text-white">إدارة النوبات</TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-white">التقارير</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard">
              {renderAnalyticsDashboard()}
            </TabsContent>

            <TabsContent value="attendance">
              <div className="space-y-6">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="البحث عن موظف..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="max-w-xs"
                    />
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="present">حاضر</SelectItem>
                        <SelectItem value="late">متأخر</SelectItem>
                        <SelectItem value="absent">غائب</SelectItem>
                        <SelectItem value="remote">عمل عن بُعد</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90">
                          <Plus className="h-4 w-4 ml-2" />
                          إضافة سجل حضور
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>إضافة سجل حضور جديد</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="employee_name">اسم الموظف</Label>
                            <Input
                              id="employee_name"
                              value={newAttendanceRecord.employee_name}
                              onChange={(e) => setNewAttendanceRecord({...newAttendanceRecord, employee_name: e.target.value})}
                              placeholder="أدخل اسم الموظف"
                            />
                          </div>
                          <div>
                            <Label htmlFor="employee_id">رقم الموظف</Label>
                            <Input
                              id="employee_id"
                              value={newAttendanceRecord.employee_id}
                              onChange={(e) => setNewAttendanceRecord({...newAttendanceRecord, employee_id: e.target.value})}
                              placeholder="مثال: EMP001"
                            />
                          </div>
                          <div>
                            <Label htmlFor="department">القسم</Label>
                            <Select value={newAttendanceRecord.department} onValueChange={(value) => setNewAttendanceRecord({...newAttendanceRecord, department: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر القسم" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                                <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                                <SelectItem value="المالية">المالية</SelectItem>
                                <SelectItem value="المبيعات">المبيعات</SelectItem>
                                <SelectItem value="التسويق">التسويق</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="check_in">وقت الوصول</Label>
                              <Input
                                id="check_in"
                                type="time"
                                value={newAttendanceRecord.check_in}
                                onChange={(e) => setNewAttendanceRecord({...newAttendanceRecord, check_in: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="check_out">وقت المغادرة</Label>
                              <Input
                                id="check_out"
                                type="time"
                                value={newAttendanceRecord.check_out}
                                onChange={(e) => setNewAttendanceRecord({...newAttendanceRecord, check_out: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="status">الحالة</Label>
                            <Select value={newAttendanceRecord.status} onValueChange={(value) => setNewAttendanceRecord({...newAttendanceRecord, status: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر الحالة" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="present">حاضر</SelectItem>
                                <SelectItem value="late">متأخر</SelectItem>
                                <SelectItem value="absent">غائب</SelectItem>
                                <SelectItem value="remote">عمل عن بُعد</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="notes">ملاحظات</Label>
                            <Textarea
                              id="notes"
                              value={newAttendanceRecord.notes}
                              onChange={(e) => setNewAttendanceRecord({...newAttendanceRecord, notes: e.target.value})}
                              placeholder="أدخل أي ملاحظات إضافية"
                            />
                          </div>
                          <Button onClick={handleAddAttendance} className="w-full">
                            إضافة السجل
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Attendance Records Table */}
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      سجل الحضور والانصراف - {selectedDate}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attendanceRecords
                        .filter(record => 
                          (selectedFilter === 'all' || record.status === selectedFilter) &&
                          (searchTerm === '' || record.employee_name.includes(searchTerm) || record.employee_id.includes(searchTerm))
                        )
                        .map((record) => (
                        <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{record.employee_name}</h4>
                              <p className="text-sm text-muted-foreground">{record.employee_id} - {record.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm">
                              <p className="font-medium">الوصول: {record.check_in || 'لم يسجل'}</p>
                              <p className="text-muted-foreground">المغادرة: {record.check_out || 'لم يسجل'}</p>
                            </div>
                            <div className="text-sm">
                              <p>ساعات العمل: {record.working_hours}</p>
                              <p className="text-muted-foreground">الإضافي: {record.overtime}س</p>
                            </div>
                            <div className="text-sm">
                              <p>التأخير: {record.late_minutes}د</p>
                              <p className="text-muted-foreground">{record.location}</p>
                            </div>
                            {getStatusBadge(record.status)}
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="shifts">
              <div className="space-y-6">
                {/* Shift Management Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">إدارة النوبات</h2>
                    <p className="text-muted-foreground">إدارة جداول العمل والنوبات</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة نوبة جديدة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>إضافة نوبة عمل جديدة</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="shift_name">اسم النوبة</Label>
                          <Input
                            id="shift_name"
                            value={newShift.name}
                            onChange={(e) => setNewShift({...newShift, name: e.target.value})}
                            placeholder="مثل: النوبة الصباحية"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="start_time">وقت البداية</Label>
                            <Input
                              id="start_time"
                              type="time"
                              value={newShift.start_time}
                              onChange={(e) => setNewShift({...newShift, start_time: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="end_time">وقت النهاية</Label>
                            <Input
                              id="end_time"
                              type="time"
                              value={newShift.end_time}
                              onChange={(e) => setNewShift({...newShift, end_time: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="break_duration">مدة الاستراحة (بالدقائق)</Label>
                          <Input
                            id="break_duration"
                            type="number"
                            value={newShift.break_duration}
                            onChange={(e) => setNewShift({...newShift, break_duration: e.target.value})}
                            placeholder="60"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">الوصف</Label>
                          <Textarea
                            id="description"
                            value={newShift.description}
                            onChange={(e) => setNewShift({...newShift, description: e.target.value})}
                            placeholder="وصف النوبة..."
                          />
                        </div>
                        <Button onClick={handleAddShift} className="w-full">
                          إضافة النوبة
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Shift Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="dashboard-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">إجمالي النوبات</p>
                          <p className="text-2xl font-bold text-primary">{shiftSchedules.length}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-primary/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="dashboard-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">النوبات النشطة</p>
                          <p className="text-2xl font-bold text-success">{shiftSchedules.filter(s => s.is_active).length}</p>
                        </div>
                        <CheckCircle2 className="h-8 w-8 text-success/60" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="dashboard-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                          <p className="text-2xl font-bold text-primary">{shiftSchedules.reduce((sum, shift) => sum + shift.employees_count, 0)}</p>
                        </div>
                        <Users className="h-8 w-8 text-primary/60" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Shift Schedules */}
                <div className="grid gap-6">
                  {shiftSchedules.map((shift) => (
                    <Card key={shift.id} className="dashboard-card">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-primary" />
                              {shift.name}
                            </CardTitle>
                            <p className="text-muted-foreground mt-1">{shift.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={shift.is_active ? "default" : "secondary"}>
                              {shift.is_active ? "نشط" : "غير نشط"}
                            </Badge>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">التوقيت</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              من {shift.start_time} إلى {shift.end_time}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Timer className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">الاستراحة</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {shift.break_duration} دقيقة
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">عدد الموظفين</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {shift.employees_count} موظف
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">أيام العمل</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {shift.days.map((day, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {day}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="space-y-6">
                {/* Reports Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">التقارير والإحصائيات</h2>
                    <p className="text-muted-foreground">تقارير شاملة لحضور الموظفين</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleExport} className="bg-primary hover:bg-primary/90">
                      <Download className="h-4 w-4 ml-2" />
                      تصدير التقارير
                    </Button>
                    <Button onClick={handlePrint} variant="outline">
                      <FileText className="h-4 w-4 ml-2" />
                      طباعة
                    </Button>
                  </div>
                </div>

                {/* Report Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="dashboard-card hover:border-primary/50 cursor-pointer transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        تقرير الحضور اليومي
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        تقرير مفصل عن حضور الموظفين اليومي
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>الحاضرين اليوم:</span>
                          <span className="font-semibold text-success">{stats.presentToday}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>المتأخرين:</span>
                          <span className="font-semibold text-warning">{stats.lateArrivals}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>الغائبين:</span>
                          <span className="font-semibold text-destructive">{stats.totalEmployees - stats.presentToday}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        عرض التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="dashboard-card hover:border-primary/50 cursor-pointer transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                        تقرير الحضور الشهري
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        إحصائيات شاملة للحضور الشهري
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>معدل الحضور:</span>
                          <span className="font-semibold text-primary">{stats.avgAttendance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متوسط ساعات العمل:</span>
                          <span className="font-semibold">{stats.avgWorkHours}س</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>العمل عن بُعد:</span>
                          <span className="font-semibold text-primary">{stats.remoteWorkers}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        عرض التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="dashboard-card hover:border-primary/50 cursor-pointer transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Building className="h-5 w-5 text-primary" />
                        تقرير الأقسام
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        أداء الحضور حسب الأقسام
                      </p>
                      <div className="space-y-2">
                        {departmentAttendance.slice(0, 3).map((dept, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{dept.name}:</span>
                            <span className="font-semibold" style={{ color: dept.color }}>
                              {dept.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        عرض التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="dashboard-card hover:border-primary/50 cursor-pointer transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Timer className="h-5 w-5 text-primary" />
                        تقرير ساعات العمل
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        تحليل ساعات العمل والإضافي
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>إجمالي الساعات:</span>
                          <span className="font-semibold">1,024</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>ساعات إضافية:</span>
                          <span className="font-semibold text-warning">128</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متوسط يومي:</span>
                          <span className="font-semibold">{stats.avgWorkHours}س</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        عرض التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="dashboard-card hover:border-primary/50 cursor-pointer transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                        تقرير التأخير والغياب
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        تحليل حالات التأخير والغياب
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>حالات التأخير:</span>
                          <span className="font-semibold text-warning">24</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>أيام الغياب:</span>
                          <span className="font-semibold text-destructive">8</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>معدل الالتزام:</span>
                          <span className="font-semibold text-success">96%</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        عرض التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="dashboard-card hover:border-primary/50 cursor-pointer transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Settings className="h-5 w-5 text-primary" />
                        تقرير مخصص
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        إنشاء تقرير حسب المتطلبات
                      </p>
                      <div className="space-y-2">
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="اختر نوع التقرير" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">يومي</SelectItem>
                            <SelectItem value="weekly">أسبوعي</SelectItem>
                            <SelectItem value="monthly">شهري</SelectItem>
                            <SelectItem value="annual">سنوي</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="اختر القسم" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">جميع الأقسام</SelectItem>
                            <SelectItem value="it">تقنية المعلومات</SelectItem>
                            <SelectItem value="hr">الموارد البشرية</SelectItem>
                            <SelectItem value="finance">المالية</SelectItem>
                            <SelectItem value="sales">المبيعات</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full mt-4">
                        إنشاء التقرير
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Statistics */}
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      ملخص الأداء الحالي
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-2">{stats.avgAttendance}%</div>
                        <div className="text-sm text-muted-foreground">معدل الحضور العام</div>
                        <Progress value={stats.avgAttendance} className="mt-2" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success mb-2">{stats.presentToday}</div>
                        <div className="text-sm text-muted-foreground">حاضر اليوم</div>
                        <Progress value={(stats.presentToday / stats.totalEmployees) * 100} className="mt-2" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning mb-2">{stats.lateArrivals}</div>
                        <div className="text-sm text-muted-foreground">متأخر اليوم</div>
                        <Progress value={(stats.lateArrivals / stats.totalEmployees) * 100} className="mt-2" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-2">{stats.avgWorkHours}</div>
                        <div className="text-sm text-muted-foreground">متوسط ساعات العمل</div>
                        <Progress value={(stats.avgWorkHours / 8) * 100} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveAttendance;