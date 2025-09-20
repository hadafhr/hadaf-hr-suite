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
  MapPin, 
  Navigation, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
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
  Route
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface ComprehensiveFieldTrackingProps {
  onBack: () => void;
}

interface FieldEmployee {
  id: string;
  name: string;
  nameEn: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on-break' | 'offline';
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
    timestamp: string;
  };
  lastCheckIn: string;
  workingHours: number;
  tasksCompleted: number;
  totalTasks: number;
  incidents: number;
}

interface FieldTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  dueDate: string;
  completedAt?: string;
  evidence?: string[];
}

interface FieldIncident {
  id: string;
  title: string;
  type: 'accident' | 'delay' | 'safety' | 'equipment' | 'other';
  description: string;
  reportedBy: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  reportedAt: string;
  evidence?: string[];
}

interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: {
    time: string;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    verified: boolean;
  };
  checkOut?: {
    time: string;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    verified: boolean;
  };
  workingHours: number;
  overtime: number;
  status: 'present' | 'late' | 'absent' | 'partial';
}

interface TrackingMetric {
  id: string;
  metric: string;
  category: 'Performance' | 'Tasks' | 'Employees' | 'Attendance' | 'Safety';
  status: 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const ComprehensiveFieldTracking: React.FC<ComprehensiveFieldTrackingProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const fieldEmployees: FieldEmployee[] = [
    {
      id: '1',
      name: 'أحمد محمد العلي',
      nameEn: 'Ahmed Mohammed Ali',
      department: 'المبيعات الميدانية',
      position: 'مندوب مبيعات',
      status: 'active',
      currentLocation: {
        lat: 24.7136,
        lng: 46.6753,
        address: 'الرياض - حي الملز',
        timestamp: '2024-01-15 14:30:00'
      },
      lastCheckIn: '08:00',
      workingHours: 6.5,
      tasksCompleted: 8,
      totalTasks: 12,
      incidents: 0
    },
    {
      id: '2',
      name: 'سارة أحمد المطيري',
      nameEn: 'Sara Ahmed Al-Mutairi',
      department: 'خدمة العملاء',
      position: 'أخصائي خدمة عملاء ميداني',
      status: 'on-break',
      currentLocation: {
        lat: 24.6877,
        lng: 46.7219,
        address: 'الرياض - حي النخيل',
        timestamp: '2024-01-15 14:15:00'
      },
      lastCheckIn: '09:00',
      workingHours: 4.2,
      tasksCompleted: 5,
      totalTasks: 8,
      incidents: 1
    }
  ];

  const fieldTasks: FieldTask[] = [
    {
      id: '1',
      title: 'زيارة عميل في حي الملز',
      description: 'متابعة طلب عميل جديد وتوقيع العقد',
      assignedTo: 'أحمد محمد العلي',
      location: {
        lat: 24.7136,
        lng: 46.6753,
        address: 'الرياض - حي الملز'
      },
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-01-15 16:00:00'
    },
    {
      id: '2',
      title: 'صيانة معدات في موقع العمل',
      description: 'فحص وصيانة المعدات في الموقع',
      assignedTo: 'سارة أحمد المطيري',
      location: {
        lat: 24.6877,
        lng: 46.7219,
        address: 'الرياض - حي النخيل'
      },
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-01-15 17:00:00'
    }
  ];

  const fieldIncidents: FieldIncident[] = [
    {
      id: '1',
      title: 'تأخير في الوصول للموقع',
      type: 'delay',
      description: 'تأخر الموظف في الوصول بسبب حركة المرور الكثيفة',
      reportedBy: 'سارة أحمد المطيري',
      location: {
        lat: 24.6877,
        lng: 46.7219,
        address: 'الرياض - حي النخيل'
      },
      severity: 'low',
      status: 'investigating',
      reportedAt: '2024-01-15 10:30:00'
    }
  ];

  const trackingMetrics: TrackingMetric[] = [
    {
      id: '1',
      metric: 'معدل إنجاز المهام',
      category: 'Performance',
      status: 'Excellent',
      value: 94,
      target: 90,
      trend: 'up',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      metric: 'دقة الحضور الجغرافي',
      category: 'Attendance',
      status: 'Good',
      value: 88,
      target: 90,
      trend: 'stable',
      lastUpdated: '2024-01-15'
    }
  ];

  // Analytics data
  const trackingData = [
    { month: 'يناير', tasks: 85, attendance: 92, incidents: 3 },
    { month: 'فبراير', tasks: 87, attendance: 94, incidents: 2 },
    { month: 'مارس', tasks: 89, attendance: 96, incidents: 1 },
    { month: 'أبريل', tasks: 88, attendance: 93, incidents: 4 },
    { month: 'مايو', tasks: 91, attendance: 95, incidents: 2 },
    { month: 'يونيو', tasks: 93, attendance: 97, incidents: 1 }
  ];

  const departmentDistribution = [
    { name: 'المبيعات الميدانية', value: 35, color: '#3b82f6' },
    { name: 'خدمة العملاء', value: 25, color: '#10b981' },
    { name: 'الصيانة الميدانية', value: 20, color: '#f59e0b' },
    { name: 'التسليم والشحن', value: 15, color: '#8b5cf6' },
    { name: 'أقسام أخرى', value: 5, color: '#ef4444' }
  ];

  // Calculate statistics
  const stats = {
    activeEmployees: fieldEmployees.filter(e => e.status === 'active').length,
    totalTasks: fieldTasks.length,
    completedTasks: fieldTasks.filter(t => t.status === 'completed').length,
    pendingTasks: fieldTasks.filter(t => t.status === 'pending').length,
    totalIncidents: fieldIncidents.length,
    averageResponse: 95
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير التتبع الميداني كملف PDF",
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
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'on-break': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'نشط',
      'on-break': 'في استراحة',
      'inactive': 'غير نشط',
      'offline': 'غير متصل'
    };
    return statusMap[status] || status;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-black rounded-3xl border border-gray-700 animate-fade-in card-3d hover:shadow-glow transition-all duration-300">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="workforce-button btn-3d text-white border-gray-700 hover:bg-gray-900 hover:border-gray-600 hover:text-white transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2 text-white" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-gray-600"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <div className="relative z-10 group-hover:scale-110 transition-transform text-white">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              التتبع الميداني الشامل
            </h1>
            <p className="text-gray-300 text-lg">
              منظومة شاملة لتتبع وإدارة الموظفين الميدانيين في الوقت الفعلي مع تحليلات ذكية شاملة
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <MapPin className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button 
          onClick={handleExport}
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Download className="h-4 w-4 ml-2" />
          تصدير التقرير
        </Button>
        <Button 
          onClick={handlePrint}
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FileText className="h-4 w-4 ml-2" />
          طباعة
        </Button>
        <Button 
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة مهمة
        </Button>
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
                <p className="text-sm text-muted-foreground">الموظفين النشطين</p>
                <p className="text-2xl font-bold text-primary">{stats.activeEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المهام</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalTasks}</p>
              </div>
              <Target className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المهام المكتملة</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.completedTasks}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المهام المعلقة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.pendingTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الحوادث المبلغة</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalIncidents}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الاستجابة</p>
                <p className="text-2xl font-bold text-green-600">{stats.averageResponse}%</p>
              </div>
              <Activity className="h-8 w-8 text-green-500/60" />
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
              أداء التتبع الميداني
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trackingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="tasks" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="attendance" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="incidents" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الأقسام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي للتتبع الميداني
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">أداء متميز</span>
              </div>
              <p className="text-sm text-emerald-700">
                تحسن ملحوظ في معدل إنجاز المهام الميدانية بنسبة 12%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تنبيه</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بتحسين دقة نظام تتبع الحضور في منطقة النخيل
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لزيادة كفاءة العمل الميداني إلى 98%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              النشاطات الحديثة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-green-100">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تم إنجاز مهمة ميدانية</p>
                  <p className="text-xs text-muted-foreground">أحمد العلي - منذ ساعة</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-blue-100">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تحديث الموقع</p>
                  <p className="text-xs text-muted-foreground">سارة المطيري - منذ 30 دقيقة</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-yellow-100">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">تقرير حادث</p>
                  <p className="text-xs text-muted-foreground">فريق الصيانة - منذ ساعتين</p>
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
                <span className="text-xs">إضافة مهمة</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <MapPin className="h-5 w-5" />
                <span className="text-xs">تتبع مباشر</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-xs">تقرير حادث</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">تقرير الأداء</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEmployeeTracking = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث عن موظف..."
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
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="on-break">في استراحة</SelectItem>
                <SelectItem value="offline">غير متصل</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Filter className="h-4 w-4 ml-2" />
              فلترة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <div className="grid gap-4">
        {fieldEmployees.map((employee) => (
          <Card key={employee.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position} - {employee.department}</p>
                    <p className="text-xs text-muted-foreground">{employee.currentLocation.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={getStatusColor(employee.status)}>
                      {getStatusText(employee.status)}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      آخر تسجيل حضور: {employee.lastCheckIn}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض
                    </Button>
                    <Button size="sm" variant="outline">
                      <MapPin className="h-4 w-4 ml-2" />
                      تتبع
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">ساعات العمل</p>
                    <p className="font-semibold">{employee.workingHours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">المهام المنجزة</p>
                    <p className="font-semibold">{employee.tasksCompleted}/{employee.totalTasks}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">الحوادث</p>
                    <p className="font-semibold">{employee.incidents}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLiveTracking = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            خريطة التتبع المباشر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">سيتم عرض الخريطة التفاعلية هنا</p>
              <Button className="mt-4">
                <Globe className="h-4 w-4 ml-2" />
                تحميل الخريطة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTasksAssignments = () => (
    <div className="space-y-6">
      {/* Add Task Button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">إدارة المهام والتكليفات</h3>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة مهمة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة مهمة ميدانية جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="task-title">عنوان المهمة</Label>
                    <Input id="task-title" placeholder="أدخل عنوان المهمة" />
                  </div>
                  <div>
                    <Label htmlFor="task-description">وصف المهمة</Label>
                    <Textarea id="task-description" placeholder="أدخل تفاصيل المهمة" />
                  </div>
                  <div>
                    <Label htmlFor="task-employee">الموظف المكلف</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر موظف" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldEmployees.map(employee => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => {
                    toast({ title: "تم إضافة المهمة", description: "تم إنشاء مهمة جديدة بنجاح" });
                    setIsAddDialogOpen(false);
                  }}>
                    إضافة المهمة
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="grid gap-4">
        {fieldTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </Badge>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status === 'pending' ? 'معلقة' : 
                     task.status === 'in-progress' ? 'قيد التنفيذ' : 
                     task.status === 'completed' ? 'مكتملة' : 'متأخرة'}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">مكلف إلى:</p>
                  <p className="font-medium">{task.assignedTo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">الموقع:</p>
                  <p className="font-medium">{task.location.address}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">موعد الاستحقاق:</p>
                  <p className="font-medium">{task.dueDate}</p>
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

  const renderAttendanceField = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>الحضور والانصراف الجغرافي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">حضور اليوم</p>
                    <p className="text-2xl font-bold text-green-600">8</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">متأخرين</p>
                    <p className="text-2xl font-bold text-yellow-600">2</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">غائبين</p>
                    <p className="text-2xl font-bold text-red-600">1</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">ساعات إضافية</p>
                    <p className="text-2xl font-bold text-blue-600">24</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500/60" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Button>
              <Download className="h-4 w-4 ml-2" />
              تصدير تقرير الحضور
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIncidentReporting = () => (
    <div className="space-y-6">
      {/* Incident Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">حوادث هذا الشهر</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قيد المراجعة</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-500/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تم حلها</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الحل</p>
                <p className="text-2xl font-bold text-blue-600">2.5 ساعة</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incidents List */}
      <div className="grid gap-4">
        {fieldIncidents.map((incident) => (
          <Card key={incident.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{incident.title}</h3>
                  <p className="text-sm text-muted-foreground">{incident.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(incident.severity)}>
                    {incident.severity === 'critical' ? 'حرج' : 
                     incident.severity === 'high' ? 'عالي' : 
                     incident.severity === 'medium' ? 'متوسط' : 'منخفض'}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">مبلغ من:</p>
                  <p className="font-medium">{incident.reportedBy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">الموقع:</p>
                  <p className="font-medium">{incident.location.address}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">تاريخ الإبلاغ:</p>
                  <p className="font-medium">{incident.reportedAt}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 ml-2" />
                    عرض التفاصيل
                  </Button>
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
            <p className="font-semibold">تقرير الأداء الميداني</p>
            <p className="text-xs text-muted-foreground">تحليل شامل لأداء الفرق</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-32 flex-col gap-4">
          <MapPin className="h-8 w-8" />
          <div className="text-center">
            <p className="font-semibold">تقرير التتبع الجغرافي</p>
            <p className="text-xs text-muted-foreground">مواقع ومسارات الموظفين</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-32 flex-col gap-4">
          <AlertTriangle className="h-8 w-8" />
          <div className="text-center">
            <p className="font-semibold">تقرير الحوادث</p>
            <p className="text-xs text-muted-foreground">تحليل الحوادث والمخاطر</p>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات التتبع الميداني</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="tracking-interval">فترة التحديث (بالدقائق)</Label>
              <Input id="tracking-interval" type="number" defaultValue="5" />
            </div>
            <div>
              <Label htmlFor="geofence-radius">نطاق الحضور (بالمتر)</Label>
              <Input id="geofence-radius" type="number" defaultValue="100" />
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
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b border-border">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="live-tracking">التتبع المباشر</TabsTrigger>
              <TabsTrigger value="tasks-assignments">المهام والتكليفات</TabsTrigger>
              <TabsTrigger value="attendance-field">حضور ميداني</TabsTrigger>
              <TabsTrigger value="incident-reporting">تقارير الحوادث</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="live-tracking" className="space-y-6">
            {renderLiveTracking()}
          </TabsContent>

          <TabsContent value="tasks-assignments" className="space-y-6">
            {renderTasksAssignments()}
          </TabsContent>

          <TabsContent value="attendance-field" className="space-y-6">
            {renderAttendanceField()}
          </TabsContent>

          <TabsContent value="incident-reporting" className="space-y-6">
            {renderIncidentReporting()}
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
  );
};