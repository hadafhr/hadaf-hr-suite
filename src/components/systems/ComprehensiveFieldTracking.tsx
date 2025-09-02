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
  Route,
  Map,
  Camera,
  Upload,
  MapPinned,
  Locate,
  Timer,
  FileImage,
  Printer
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

export const ComprehensiveFieldTracking = ({ onBack }: ComprehensiveFieldTrackingProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isIncidentDialogOpen, setIsIncidentDialogOpen] = useState(false);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock data for Field Employees
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

  // Mock data for Field Tasks
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
      dueDate: '2024-01-15 16:00:00',
      evidence: []
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
      dueDate: '2024-01-15 17:00:00',
      evidence: []
    }
  ];

  // Mock data for Field Incidents
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
      reportedAt: '2024-01-15 10:30:00',
      evidence: []
    }
  ];

  // Mock data for Attendance Records
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      employeeId: '1',
      date: '2024-01-15',
      checkIn: {
        time: '08:00:00',
        location: {
          lat: 24.7136,
          lng: 46.6753,
          address: 'الرياض - حي الملز'
        },
        verified: true
      },
      workingHours: 8,
      overtime: 0,
      status: 'present'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on-break': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'syncing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddTask = () => {
    toast({
      title: "تمت إضافة المهمة",
      description: "تم إنشاء مهمة ميدانية جديدة بنجاح",
    });
    setIsTaskDialogOpen(false);
  };

  const handleReportIncident = () => {
    toast({
      title: "تم الإبلاغ عن الحادث",
      description: "تم تسجيل الحادث وإرساله للمراجعة",
    });
    setIsIncidentDialogOpen(false);
  };

  const handleExportReport = () => {
    toast({
      title: "جاري تصدير التقرير",
      description: "سيتم تنزيل التقرير قريباً",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              نظام التتبع الميداني
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              تتبع وإدارة الموظفين الميدانيين في الوقت الفعلي مع تحليلات ذكية شاملة
            </p>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <Button 
              onClick={handleExportReport}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="ml-2 h-5 w-5" />
              تصدير التقارير
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-primary/5 border-primary/20">
              <Settings className="ml-2 h-5 w-5" />
              الإعدادات المتقدمة
            </Button>
            <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="hover:bg-primary/5 border-primary/20">
                  <Plus className="ml-2 h-5 w-5" />
                  إضافة مهمة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
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
                  <div>
                    <Label htmlFor="task-priority">الأولوية</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">عالية</SelectItem>
                        <SelectItem value="medium">متوسطة</SelectItem>
                        <SelectItem value="low">منخفضة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddTask} className="flex-1">
                      إضافة المهمة
                    </Button>
                    <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
                      إلغاء
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/10 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">الموظفين النشطين</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary">
                      {fieldEmployees.filter(emp => emp.status === 'active').length}
                    </span>
                    <Badge className="bg-green-100 text-green-800">+12%</Badge>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">الزيارات المكتملة</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-blue-600">127</span>
                    <Badge className="bg-green-100 text-green-800">+8%</Badge>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">المهام المعلقة</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-orange-600">
                      {fieldTasks.filter(task => task.status === 'pending').length}
                    </span>
                    <Badge className="bg-red-100 text-red-800">+3</Badge>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">الحوادث المبلغة</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-red-600">
                      {fieldIncidents.length}
                    </span>
                    <Badge className="bg-green-100 text-green-800">-2</Badge>
                  </div>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="h-4 w-4" />
              لوحة القيادة
            </TabsTrigger>
            <TabsTrigger value="live-tracking" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Map className="h-4 w-4" />
              التتبع المباشر
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Target className="h-4 w-4" />
              المهام والمواعيد
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <UserCheck className="h-4 w-4" />
              الحضور الميداني
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <AlertTriangle className="h-4 w-4" />
              الإبلاغ عن الحوادث
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Chart */}
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    نشاط الموظفين الميدانيين
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { month: 'يناير', active: 45, tasks: 120, incidents: 3 },
                        { month: 'فبراير', active: 52, tasks: 145, incidents: 2 },
                        { month: 'مارس', active: 48, tasks: 135, incidents: 4 },
                        { month: 'أبريل', active: 55, tasks: 160, incidents: 1 },
                        { month: 'مايو', active: 60, tasks: 180, incidents: 2 },
                        { month: 'يونيو', active: 58, tasks: 175, incidents: 1 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="active" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="tasks" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Distribution Chart */}
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    توزيع المهام حسب القسم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'المبيعات', value: 35, color: 'hsl(var(--primary))' },
                            { name: 'خدمة العملاء', value: 25, color: '#3B82F6' },
                            { name: 'التوصيل', value: 20, color: '#F59E0B' },
                            { name: 'الصيانة', value: 15, color: '#EF4444' },
                            { name: 'أخرى', value: 5, color: '#8B5CF6' },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {[
                            { name: 'المبيعات', value: 35, color: 'hsl(var(--primary))' },
                            { name: 'خدمة العملاء', value: 25, color: '#3B82F6' },
                            { name: 'التوصيل', value: 20, color: '#F59E0B' },
                            { name: 'الصيانة', value: 15, color: '#EF4444' },
                            { name: 'أخرى', value: 5, color: '#8B5CF6' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  مؤشرات الأداء الميداني
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">معدل الحضور الميداني</span>
                      <span className="text-sm font-bold text-green-600">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">دقة التتبع</span>
                      <span className="text-sm font-bold text-blue-600">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">إنجاز المهام في الوقت</span>
                      <span className="text-sm font-bold text-orange-600">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Tracking Tab */}
          <TabsContent value="live-tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  التتبع المباشر للموظفين
                </CardTitle>
                <CardDescription>
                  تتبع مواقع الموظفين الميدانيين في الوقت الفعلي
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Map Placeholder */}
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">خريطة التتبع المباشر</p>
                    <p className="text-sm text-gray-400">سيتم عرض مواقع الموظفين هنا</p>
                  </div>
                </div>

                {/* Active Employees List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">الموظفين النشطين حالياً</h3>
                  {fieldEmployees.filter(emp => emp.status === 'active').map((employee) => (
                    <Card key={employee.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h4 className="font-semibold">{employee.name}</h4>
                            <p className="text-sm text-muted-foreground">{employee.position}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {employee.currentLocation.address}
                            </p>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge className={getStatusColor(employee.status)}>
                              {employee.status === 'active' ? 'نشط' : employee.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              آخر تحديث: {new Date(employee.currentLocation.timestamp).toLocaleString('ar')}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks & Assignments Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      إدارة المهام والمواعيد الميدانية
                    </CardTitle>
                    <CardDescription>
                      تعيين ومتابعة المهام الميدانية للموظفين
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="ml-2 h-4 w-4" />
                          إضافة مهمة
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button variant="outline" onClick={handleExportReport}>
                      <Download className="ml-2 h-4 w-4" />
                      تصدير
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="البحث في المهام..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="تصفية المهام" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المهام</SelectItem>
                      <SelectItem value="pending">معلقة</SelectItem>
                      <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                      <SelectItem value="completed">مكتملة</SelectItem>
                      <SelectItem value="delayed">متأخرة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tasks List */}
                <div className="space-y-4">
                  {fieldTasks.map((task) => (
                    <Card key={task.id} className="hover:shadow-md transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{task.title}</h3>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority === 'high' ? 'عالية' : 
                                 task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                              </Badge>
                              <Badge className={getStatusColor(task.status)}>
                                {task.status === 'pending' ? 'معلقة' :
                                 task.status === 'in-progress' ? 'قيد التنفيذ' :
                                 task.status === 'completed' ? 'مكتملة' : 'متأخرة'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <UserCheck className="h-3 w-3" />
                                {task.assignedTo}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {task.location.address}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(task.dueDate).toLocaleString('ar')}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-primary" />
                      إدارة الحضور الميداني
                    </CardTitle>
                    <CardDescription>
                      تتبع حضور وانصراف الموظفين في المواقع الميدانية
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button>
                      <Plus className="ml-2 h-4 w-4" />
                      إضافة سجل حضور
                    </Button>
                    <Button variant="outline" onClick={handleExportReport}>
                      <Download className="ml-2 h-4 w-4" />
                      تصدير
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Attendance Records */}
                <div className="space-y-4">
                  {attendanceRecords.map((record) => {
                    const employee = fieldEmployees.find(emp => emp.id === record.employeeId);
                    return (
                      <Card key={record.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h4 className="font-semibold">{employee?.name}</h4>
                              <p className="text-sm text-muted-foreground">{employee?.position}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {record.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  دخول: {record.checkIn.time}
                                </span>
                                {record.checkOut && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    خروج: {record.checkOut.time}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {record.checkIn.location.address}
                                </span>
                              </div>
                            </div>
                            <div className="text-right space-y-1">
                              <Badge className={getStatusColor(record.status)}>
                                {record.status === 'present' ? 'حاضر' :
                                 record.status === 'late' ? 'متأخر' :
                                 record.status === 'absent' ? 'غائب' : 'حضور جزئي'}
                              </Badge>
                              <p className="text-xs text-muted-foreground">
                                ساعات العمل: {record.workingHours}
                              </p>
                              {record.overtime > 0 && (
                                <p className="text-xs text-orange-600">
                                  إضافي: {record.overtime} ساعة
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      إدارة الحوادث والبلاغات
                    </CardTitle>
                    <CardDescription>
                      تسجيل ومتابعة الحوادث والمشاكل في العمل الميداني
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={isIncidentDialogOpen} onOpenChange={setIsIncidentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="ml-2 h-4 w-4" />
                          إبلاغ عن حادث
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>إبلاغ عن حادث ميداني</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="incident-title">عنوان الحادث</Label>
                            <Input id="incident-title" placeholder="أدخل عنوان الحادث" />
                          </div>
                          <div>
                            <Label htmlFor="incident-type">نوع الحادث</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر نوع الحادث" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="accident">حادث</SelectItem>
                                <SelectItem value="delay">تأخير</SelectItem>
                                <SelectItem value="safety">سلامة</SelectItem>
                                <SelectItem value="equipment">معدات</SelectItem>
                                <SelectItem value="other">أخرى</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="incident-severity">الخطورة</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر مستوى الخطورة" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="critical">حرجة</SelectItem>
                                <SelectItem value="high">عالية</SelectItem>
                                <SelectItem value="medium">متوسطة</SelectItem>
                                <SelectItem value="low">منخفضة</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="incident-description">تفاصيل الحادث</Label>
                            <Textarea id="incident-description" placeholder="أدخل تفاصيل الحادث" />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleReportIncident} className="flex-1">
                              إرسال البلاغ
                            </Button>
                            <Button variant="outline" onClick={() => setIsIncidentDialogOpen(false)}>
                              إلغاء
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" onClick={handleExportReport}>
                      <Download className="ml-2 h-4 w-4" />
                      تصدير
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Incidents List */}
                <div className="space-y-4">
                  {fieldIncidents.map((incident) => (
                    <Card key={incident.id} className="hover:shadow-md transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{incident.title}</h3>
                              <Badge className={getSeverityColor(incident.severity)}>
                                {incident.severity === 'critical' ? 'حرجة' :
                                 incident.severity === 'high' ? 'عالية' :
                                 incident.severity === 'medium' ? 'متوسطة' : 'منخفضة'}
                              </Badge>
                              <Badge variant="outline">
                                {incident.type === 'accident' ? 'حادث' :
                                 incident.type === 'delay' ? 'تأخير' :
                                 incident.type === 'safety' ? 'سلامة' :
                                 incident.type === 'equipment' ? 'معدات' : 'أخرى'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{incident.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <UserCheck className="h-3 w-3" />
                                بلغ بواسطة: {incident.reportedBy}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {incident.location.address}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(incident.reportedAt).toLocaleString('ar')}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileImage className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  تقارير النشاط الميداني
                </CardTitle>
                <CardDescription>
                  إنشاء وتصدير التقارير التحليلية للعمل الميداني
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">تقرير نشاط الموظفين</h3>
                      <p className="text-sm text-muted-foreground mb-3">إحصائيات شاملة لنشاط الموظفين الميدانيين</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={handleExportReport}>
                          <Download className="h-4 w-4 ml-1" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Printer className="h-4 w-4 ml-1" />
                          طباعة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">تقرير إنجاز المهام</h3>
                      <p className="text-sm text-muted-foreground mb-3">تفاصيل المهام المكتملة والمعلقة</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={handleExportReport}>
                          <Download className="h-4 w-4 ml-1" />
                          Excel
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Printer className="h-4 w-4 ml-1" />
                          طباعة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">تقرير الحضور</h3>
                      <p className="text-sm text-muted-foreground mb-3">سجل الحضور والانصراف الميداني</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={handleExportReport}>
                          <Download className="h-4 w-4 ml-1" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Printer className="h-4 w-4 ml-1" />
                          طباعة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">تقرير الحوادث</h3>
                      <p className="text-sm text-muted-foreground mb-3">سجل الحوادث والمشاكل المبلغة</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={handleExportReport}>
                          <Download className="h-4 w-4 ml-1" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Printer className="h-4 w-4 ml-1" />
                          طباعة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">تقرير الأداء</h3>
                      <p className="text-sm text-muted-foreground mb-3">تحليل أداء الموظفين الميدانيين</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={handleExportReport}>
                          <Download className="h-4 w-4 ml-1" />
                          Excel
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Printer className="h-4 w-4 ml-1" />
                          طباعة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <Map className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">تقرير المواقع</h3>
                      <p className="text-sm text-muted-foreground mb-3">إحصائيات المواقع والمناطق المغطاة</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={handleExportReport}>
                          <Download className="h-4 w-4 ml-1" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Printer className="h-4 w-4 ml-1" />
                          طباعة
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    إعدادات التتبع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tracking-frequency">تكرار التحديث (بالثواني)</Label>
                    <Input id="tracking-frequency" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="geofence-radius">نطاق السياج الجغرافي (بالمتر)</Label>
                    <Input id="geofence-radius" type="number" defaultValue="500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="work-hours-start">بداية ساعات العمل</Label>
                    <Input id="work-hours-start" type="time" defaultValue="08:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="work-hours-end">نهاية ساعات العمل</Label>
                    <Input id="work-hours-end" type="time" defaultValue="17:00" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    إعدادات التنبيهات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="late-threshold">حد التأخير (بالدقائق)</Label>
                    <Input id="late-threshold" type="number" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="absence-threshold">حد الغياب (بالساعات)</Label>
                    <Input id="absence-threshold" type="number" defaultValue="2" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-notifications" defaultChecked />
                    <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="sms-notifications" defaultChecked />
                    <Label htmlFor="sms-notifications">إشعارات الرسائل النصية</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  صلاحيات المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">مدير النظام</h4>
                        <ul className="text-sm space-y-1">
                          <li>• عرض جميع البيانات</li>
                          <li>• تعديل الإعدادات</li>
                          <li>• إدارة المستخدمين</li>
                          <li>• حذف البيانات</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">مشرف الميدان</h4>
                        <ul className="text-sm space-y-1">
                          <li>• عرض بيانات فريقه</li>
                          <li>• تعيين المهام</li>
                          <li>• مراجعة التقارير</li>
                          <li>• إدارة الحوادث</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">موظف ميداني</h4>
                        <ul className="text-sm space-y-1">
                          <li>• عرض مهامه الشخصية</li>
                          <li>• تسجيل الحضور</li>
                          <li>• إبلاغ عن الحوادث</li>
                          <li>• رفع الأدلة</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};