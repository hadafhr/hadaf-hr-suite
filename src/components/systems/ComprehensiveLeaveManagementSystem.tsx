import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Calendar, 
  CalendarDays, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
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
  Database,
  RefreshCw,
  Server,
  Users,
  Upload
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface ComprehensiveLeaveManagementSystemProps {
  onBack: () => void;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  appliedDate: string;
  documents?: string[];
  managerComments?: string;
  hrComments?: string;
}

interface LeaveType {
  id: string;
  name: string;
  nameEn: string;
  category: 'annual' | 'sick' | 'maternity' | 'paternity' | 'marriage' | 'bereavement' | 'study' | 'unpaid' | 'custom';
  maxDays: number;
  isPaid: boolean;
  requiresDocuments: boolean;
  description: string;
}

interface PublicHoliday {
  id: string;
  name: string;
  nameEn: string;
  date: string;
  type: 'fixed' | 'islamic';
  description: string;
  isOfficial: boolean;
}

interface LeaveBalance {
  employeeId: string;
  employeeName: string;
  department: string;
  annualLeave: {
    entitled: number;
    used: number;
    remaining: number;
    carryOver: number;
  };
  sickLeave: {
    entitled: number;
    used: number;
    remaining: number;
  };
  emergencyLeave: {
    entitled: number;
    used: number;
    remaining: number;
  };
}

interface LeaveMetric {
  id: string;
  metric: string;
  category: 'Requests' | 'Balance' | 'Compliance' | 'Trends' | 'Utilization';
  status: 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const ComprehensiveLeaveManagementSystem: React.FC<ComprehensiveLeaveManagementSystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد العلي',
      employeeId: 'EMP001',
      leaveType: 'إجازة سنوية',
      startDate: '2024-02-15',
      endDate: '2024-02-25',
      totalDays: 10,
      reason: 'سفر عائلي للخارج',
      status: 'pending',
      appliedDate: '2024-01-15'
    },
    {
      id: '2',
      employeeName: 'سارة أحمد المطيري',
      employeeId: 'EMP002',
      leaveType: 'إجازة مرضية',
      startDate: '2024-01-20',
      endDate: '2024-01-23',
      totalDays: 3,
      reason: 'حالة مرضية طارئة',
      status: 'approved',
      appliedDate: '2024-01-18',
      documents: ['medical-report.pdf']
    }
  ];

  const leaveTypes: LeaveType[] = [
    {
      id: '1',
      name: 'الإجازة السنوية',
      nameEn: 'Annual Leave',
      category: 'annual',
      maxDays: 21,
      isPaid: true,
      requiresDocuments: false,
      description: 'الإجازة السنوية المستحقة للموظف'
    },
    {
      id: '2',
      name: 'الإجازة المرضية',
      nameEn: 'Sick Leave',
      category: 'sick',
      maxDays: 30,
      isPaid: true,
      requiresDocuments: true,
      description: 'إجازة مرضية بتقرير طبي'
    },
    {
      id: '3',
      name: 'إجازة الوضع',
      nameEn: 'Maternity Leave',
      category: 'maternity',
      maxDays: 70,
      isPaid: true,
      requiresDocuments: true,
      description: 'إجازة الوضع للموظفات'
    }
  ];

  const publicHolidays: PublicHoliday[] = [
    {
      id: '1',
      name: 'يوم التأسيس',
      nameEn: 'Founding Day',
      date: '2024-02-22',
      type: 'fixed',
      description: 'يوم تأسيس الدولة السعودية',
      isOfficial: true
    },
    {
      id: '2',
      name: 'اليوم الوطني',
      nameEn: 'National Day',
      date: '2024-09-23',
      type: 'fixed',
      description: 'اليوم الوطني للمملكة العربية السعودية',
      isOfficial: true
    },
    {
      id: '3',
      name: 'عيد الفطر',
      nameEn: 'Eid Al-Fitr',
      date: '2024-04-10',
      type: 'islamic',
      description: 'عيد الفطر المبارك',
      isOfficial: true
    }
  ];

  const leaveBalances: LeaveBalance[] = [
    {
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      annualLeave: {
        entitled: 21,
        used: 8,
        remaining: 13,
        carryOver: 0
      },
      sickLeave: {
        entitled: 30,
        used: 2,
        remaining: 28
      },
      emergencyLeave: {
        entitled: 5,
        used: 0,
        remaining: 5
      }
    }
  ];

  const leaveMetrics: LeaveMetric[] = [
    {
      id: '1',
      metric: 'معدل استخدام الإجازات',
      category: 'Utilization',
      status: 'Good',
      value: 68,
      target: 70,
      trend: 'up',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      metric: 'سرعة الموافقة',
      category: 'Requests',
      status: 'Excellent',
      value: 2,
      target: 3,
      trend: 'down',
      lastUpdated: '2024-01-15'
    }
  ];

  // Analytics data
  const leaveData = [
    { month: 'يناير', annual: 45, sick: 12, emergency: 3 },
    { month: 'فبراير', annual: 52, sick: 8, emergency: 5 },
    { month: 'مارس', annual: 38, sick: 15, emergency: 2 },
    { month: 'أبريل', annual: 65, sick: 10, emergency: 4 },
    { month: 'مايو', annual: 48, sick: 7, emergency: 6 },
    { month: 'يونيو', annual: 72, sick: 14, emergency: 8 }
  ];

  const leaveTypeDistribution = [
    { name: 'إجازة سنوية', value: 65, color: 'hsl(var(--primary))' },
    { name: 'إجازة مرضية', value: 20, color: 'hsl(var(--success))' },
    { name: 'إجازة طارئة', value: 10, color: 'hsl(var(--warning))' },
    { name: 'أنواع أخرى', value: 5, color: 'hsl(var(--accent))' }
  ];

  // Calculate statistics
  const stats = {
    totalRequests: leaveRequests.length,
    pendingRequests: leaveRequests.filter(r => r.status === 'pending').length,
    approvedRequests: leaveRequests.filter(r => r.status === 'approved').length,
    rejectedRequests: leaveRequests.filter(r => r.status === 'rejected').length,
    totalHolidays: publicHolidays.length,
    avgProcessingTime: 2.5
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير إدارة الإجازات كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success border-success/30';
      case 'pending': return 'bg-warning/10 text-warning border-warning/30';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'cancelled': return 'bg-muted/10 text-muted-foreground border-muted/30';
      default: return 'bg-muted/10 text-muted-foreground border-muted/30';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'approved': 'موافق عليها',
      'pending': 'قيد المراجعة',
      'rejected': 'مرفوضة',
      'cancelled': 'ملغية'
    };
    return statusMap[status] || status;
  };

  const getCategoryText = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'annual': 'سنوية',
      'sick': 'مرضية',
      'maternity': 'وضع',
      'paternity': 'أبوة',
      'marriage': 'زواج',
      'bereavement': 'وفاة',
      'study': 'دراسة',
      'unpaid': 'بدون راتب',
      'custom': 'مخصصة'
    };
    return categoryMap[category] || category;
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
        <h1 className="text-3xl font-bold mb-2 text-foreground">نظام إدارة الإجازات المتطور</h1>
        <p className="text-muted-foreground">منظومة شاملة لإدارة الإجازات والعطل مع التحليلات الذكية</p>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-primary">{stats.totalRequests}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                <p className="text-2xl font-bold text-warning">{stats.pendingRequests}</p>
              </div>
              <Clock className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">طلبات موافق عليها</p>
                <p className="text-2xl font-bold text-success">{stats.approvedRequests}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">طلبات مرفوضة</p>
                <p className="text-2xl font-bold text-destructive">{stats.rejectedRequests}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">العطل الرسمية</p>
                <p className="text-2xl font-bold text-primary">{stats.totalHolidays}</p>
              </div>
              <CalendarDays className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط المعالجة</p>
                <p className="text-2xl font-bold text-success">{stats.avgProcessingTime} يوم</p>
              </div>
              <Activity className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/60 backdrop-blur-xl border border-border hover:border-accent shadow-2xl shadow-accent/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="h-5 w-5 text-accent" />
              اتجاهات الإجازات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={leaveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="annual" stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" />
                <Area type="monotone" dataKey="sick" stackId="2" stroke="hsl(var(--success))" fill="hsl(var(--success))" />
                <Area type="monotone" dataKey="emergency" stackId="3" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <PieChart className="h-5 w-5 text-primary" />
              توزيع أنواع الإجازات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={leaveTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {leaveTypeDistribution.map((entry, index) => (
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
      <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي لإدارة الإجازات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm font-semibold text-success">استخدام متوازن</span>
              </div>
              <p className="text-sm text-muted-foreground">
                معدل استخدام الإجازات السنوية في المستوى المطلوب (68%)
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm font-semibold text-warning">تنبيه موسمي</span>
              </div>
              <p className="text-sm text-muted-foreground">
                توقع زيادة طلبات الإجازات خلال عيد الفطر - يُنصح بالتخطيط المسبق
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">تحسن الأداء</span>
              </div>
              <p className="text-sm text-muted-foreground">
                تحسن سرعة معالجة طلبات الإجازات بنسبة 25% هذا الشهر
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Activity className="h-5 w-5 text-primary" />
              النشاطات الحديثة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <div className="p-2 rounded-full bg-success/10 border border-success/30">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">تمت الموافقة على طلب إجازة</p>
                  <p className="text-xs text-muted-foreground">أحمد العلي - إجازة سنوية - منذ ساعة</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <div className="p-2 rounded-full bg-primary/10 border border-primary/30">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">طلب إجازة جديد</p>
                  <p className="text-xs text-muted-foreground">سارة المطيري - إجازة مرضية - منذ ساعتين</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <div className="p-2 rounded-full bg-warning/10 border border-warning/30">
                  <Clock className="h-4 w-4 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">تذكير عطلة رسمية</p>
                  <p className="text-xs text-muted-foreground">يوم التأسيس - 22 فبراير</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Plus className="h-5 w-5" />
                <span className="text-xs">طلب إجازة</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Eye className="h-5 w-5" />
                <span className="text-xs">مراجعة الطلبات</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <CalendarDays className="h-5 w-5" />
                <span className="text-xs">العطل الرسمية</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">تقارير الإجازات</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLeaveTypes = () => (
    <div className="space-y-6">
      {/* Add Leave Type Button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">أنواع الإجازات</h3>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة نوع إجازة
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة نوع إجازة جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="leave-name">اسم الإجازة</Label>
                    <Input id="leave-name" placeholder="أدخل اسم الإجازة" />
                  </div>
                  <div>
                    <Label htmlFor="leave-category">الفئة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">سنوية</SelectItem>
                        <SelectItem value="sick">مرضية</SelectItem>
                        <SelectItem value="maternity">وضع</SelectItem>
                        <SelectItem value="paternity">أبوة</SelectItem>
                        <SelectItem value="custom">مخصصة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="max-days">الحد الأقصى (أيام)</Label>
                    <Input id="max-days" type="number" placeholder="عدد الأيام" />
                  </div>
                  <Button onClick={() => {
                    toast({ title: "تم إضافة نوع الإجازة", description: "تم إنشاء نوع إجازة جديد بنجاح" });
                    setIsAddDialogOpen(false);
                  }}>
                    إضافة نوع الإجازة
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Leave Types Grid */}
      <div className="grid gap-4">
        {leaveTypes.map((leaveType) => (
          <Card key={leaveType.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{leaveType.name}</h3>
                  <p className="text-sm text-muted-foreground">{leaveType.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={leaveType.isPaid ? 'default' : 'secondary'}>
                    {leaveType.isPaid ? 'مدفوعة الأجر' : 'بدون أجر'}
                  </Badge>
                  <Badge variant="outline">
                    {getCategoryText(leaveType.category)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">الحد الأقصى:</p>
                  <p className="font-medium">{leaveType.maxDays} يوم</p>
                </div>
                <div>
                  <p className="text-muted-foreground">المستندات:</p>
                  <p className="font-medium">{leaveType.requiresDocuments ? 'مطلوبة' : 'غير مطلوبة'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">النوع:</p>
                  <p className="font-medium">{leaveType.isPaid ? 'مدفوعة' : 'غير مدفوعة'}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPublicHolidays = () => (
    <div className="space-y-6">
      {/* Holiday Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي العطل</p>
                <p className="text-2xl font-bold text-primary">{publicHolidays.length}</p>
              </div>
              <CalendarDays className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عطل ثابتة</p>
                <p className="text-2xl font-bold text-success">
                  {publicHolidays.filter(h => h.type === 'fixed').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عطل هجرية</p>
                <p className="text-2xl font-bold text-accent-foreground">
                  {publicHolidays.filter(h => h.type === 'islamic').length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-accent/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قريباً</p>
                <p className="text-2xl font-bold text-warning">2</p>
              </div>
              <Bell className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holidays List */}
      <div className="grid gap-4">
        {publicHolidays.map((holiday) => (
          <Card key={holiday.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{holiday.name}</h3>
                  <p className="text-sm text-muted-foreground">{holiday.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={holiday.type === 'fixed' ? 'default' : 'secondary'}>
                    {holiday.type === 'fixed' ? 'ميلادي' : 'هجري'}
                  </Badge>
                  {holiday.isOfficial && (
                    <Badge variant="outline">رسمي</Badge>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">التاريخ:</p>
                  <p className="font-medium">{holiday.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">النوع:</p>
                  <p className="font-medium">{holiday.type === 'fixed' ? 'تاريخ ثابت' : 'حسب الهجري'}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLeaveRequests = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في طلبات الإجازة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="تصفية حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
                <SelectItem value="approved">موافق عليها</SelectItem>
                <SelectItem value="rejected">مرفوضة</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="grid gap-4">
        {leaveRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{request.employeeName}</h3>
                  <p className="text-sm text-muted-foreground">{request.leaveType} - {request.totalDays} أيام</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusText(request.status)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">من تاريخ:</p>
                  <p className="font-medium">{request.startDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">إلى تاريخ:</p>
                  <p className="font-medium">{request.endDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">تاريخ التقديم:</p>
                  <p className="font-medium">{request.appliedDate}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 ml-2" />
                    عرض
                  </Button>
                  {request.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm">
                  <span className="text-muted-foreground">السبب: </span>
                  {request.reason}
                </p>
                {request.documents && request.documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">المستندات المرفقة:</p>
                    <div className="flex gap-2 mt-1">
                      {request.documents.map((doc, index) => (
                        <Badge key={index} variant="outline">
                          <FileText className="h-3 w-3 ml-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLeaveBalances = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {leaveBalances.map((balance) => (
          <Card key={balance.employeeId}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-lg">{balance.employeeName}</h3>
                  <p className="text-sm text-muted-foreground">{balance.department}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  تفاصيل
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Annual Leave */}
                <div className="space-y-2">
                  <h4 className="font-medium">الإجازة السنوية</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>المستحق: {balance.annualLeave.entitled}</span>
                      <span>المستخدم: {balance.annualLeave.used}</span>
                    </div>
                    <Progress 
                      value={(balance.annualLeave.used / balance.annualLeave.entitled) * 100} 
                      className="h-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      المتبقي: {balance.annualLeave.remaining} يوم
                    </p>
                  </div>
                </div>

                {/* Sick Leave */}
                <div className="space-y-2">
                  <h4 className="font-medium">الإجازة المرضية</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>المستحق: {balance.sickLeave.entitled}</span>
                      <span>المستخدم: {balance.sickLeave.used}</span>
                    </div>
                    <Progress 
                      value={(balance.sickLeave.used / balance.sickLeave.entitled) * 100} 
                      className="h-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      المتبقي: {balance.sickLeave.remaining} يوم
                    </p>
                  </div>
                </div>

                {/* Emergency Leave */}
                <div className="space-y-2">
                  <h4 className="font-medium">الإجازة الطارئة</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>المستحق: {balance.emergencyLeave.entitled}</span>
                      <span>المستخدم: {balance.emergencyLeave.used}</span>
                    </div>
                    <Progress 
                      value={(balance.emergencyLeave.used / balance.emergencyLeave.entitled) * 100} 
                      className="h-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      المتبقي: {balance.emergencyLeave.remaining} يوم
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-32 flex-col gap-4">
          <BarChart3 className="h-8 w-8" />
          <div className="text-center">
            <p className="font-semibold">تقرير استخدام الإجازات</p>
            <p className="text-xs text-muted-foreground">تحليل شامل لاستخدام الإجازات</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-32 flex-col gap-4">
          <PieChart className="h-8 w-8" />
          <div className="text-center">
            <p className="font-semibold">توزيع أنواع الإجازات</p>
            <p className="text-xs text-muted-foreground">إحصائيات أنواع الإجازات</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-32 flex-col gap-4">
          <Calendar className="h-8 w-8" />
          <div className="text-center">
            <p className="font-semibold">تقرير العطل الرسمية</p>
            <p className="text-xs text-muted-foreground">العطل والأعياد الرسمية</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-32 flex-col gap-4">
          <Activity className="h-8 w-8" />
          <div className="text-center">
            <p className="font-semibold">تقرير الأرصدة</p>
            <p className="text-xs text-muted-foreground">أرصدة الإجازات للموظفين</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-32 flex-col gap-4">
          <TrendingUp className="h-8 w-8" />
          <div className="text-center">
            <p className="font-semibold">التحليلات الزمنية</p>
            <p className="text-xs text-muted-foreground">اتجاهات الإجازات عبر الوقت</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-32 flex-col gap-4">
          <Building className="h-8 w-8" />
          <div className="text-center">
            <p className="font-semibold">تقرير الأقسام</p>
            <p className="text-xs text-muted-foreground">إحصائيات الإجازات حسب القسم</p>
          </div>
        </Button>
      </div>
      
      <div className="flex gap-4">
        <Button>
          <Download className="h-4 w-4 ml-2" />
          تصدير جميع التقارير
        </Button>
        <Button variant="outline">
          <FileText className="h-4 w-4 ml-2" />
          طباعة التقارير
        </Button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات إدارة الإجازات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="annual-days">الإجازة السنوية (أيام)</Label>
              <Input id="annual-days" type="number" defaultValue="21" />
            </div>
            <div>
              <Label htmlFor="sick-days">الإجازة المرضية (أيام)</Label>
              <Input id="sick-days" type="number" defaultValue="30" />
            </div>
            <div>
              <Label htmlFor="carry-over">ترحيل الإجازة (أيام)</Label>
              <Input id="carry-over" type="number" defaultValue="5" />
            </div>
            <div>
              <Label htmlFor="min-notice">الحد الأدنى للإشعار (أيام)</Label>
              <Input id="min-notice" type="number" defaultValue="3" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">سير العمل</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="manager-approval" defaultChecked />
                <Label htmlFor="manager-approval">موافقة المدير المباشر</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="hr-approval" defaultChecked />
                <Label htmlFor="hr-approval">موافقة الموارد البشرية</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto-deduct" defaultChecked />
                <Label htmlFor="auto-deduct">خصم تلقائي من الرصيد</Label>
              </div>
            </div>
          </div>
          
          <Button>
            <Settings className="h-4 w-4 ml-2" />
            حفظ الإعدادات
          </Button>
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
          <TabsList className="grid w-full grid-cols-7 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
              <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs">لوحة التحكم</span>
              </TabsTrigger>
              <TabsTrigger value="leave-types" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">أنواع الإجازات</span>
              </TabsTrigger>
              <TabsTrigger value="public-holidays" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                <CalendarDays className="h-4 w-4" />
                <span className="text-xs">العطل الرسمية</span>
              </TabsTrigger>
              <TabsTrigger value="leave-requests" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                <FileText className="h-4 w-4" />
                <span className="text-xs">طلبات الإجازة</span>
              </TabsTrigger>
              <TabsTrigger value="leave-balances" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                <Activity className="h-4 w-4" />
                <span className="text-xs">أرصدة الإجازات</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">التقارير</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                <Settings className="h-4 w-4" />
                <span className="text-xs">الإعدادات</span>
              </TabsTrigger>
            </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="leave-types" className="space-y-6">
            {renderLeaveTypes()}
          </TabsContent>

          <TabsContent value="public-holidays" className="space-y-6">
            {renderPublicHolidays()}
          </TabsContent>

          <TabsContent value="leave-requests" className="space-y-6">
            {renderLeaveRequests()}
          </TabsContent>

          <TabsContent value="leave-balances" className="space-y-6">
            {renderLeaveBalances()}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </div>
  );
};