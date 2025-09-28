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
  CheckSquare, 
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  FileText,
  MessageSquare,
  Bell,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Timer,
  Award,
  Sparkles,
  User,
  Building,
  BookOpen,
  Settings,
  Share,
  Paperclip,
  Send,
  Archive,
  Flag,
  RefreshCw,
  Star,
  Hash,
  Zap,
  Globe,
  Shield,
  UserCheck,
  Phone,
  Mail,
  Database,
  Server,
  Info,
  UserPlus
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface ComprehensiveTasksFollowupProps {
  onBack: () => void;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeId: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in-progress' | 'completed' | 'overdue';
  category: 'hr' | 'finance' | 'operations' | 'it' | 'marketing';
  deadline: string;
  createdAt: string;
  completedAt?: string;
  progress: number;
  attachments: number;
  comments: number;
}

interface TaskCategory {
  id: string;
  name: string;
  nameEn: string;
  head: string;
  tasks: number;
  completed: number;
  performance: number;
  avgCompletionTime: number;
  description: string;
}

interface Collaboration {
  id: string;
  taskId: string;
  user: string;
  message: string;
  timestamp: string;
  type: 'comment' | 'status_change' | 'assignment' | 'attachment';
}

export const ComprehensiveTasksFollowup: React.FC<ComprehensiveTasksFollowupProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Mock data for demonstration
  const tasks: Task[] = [
    {
      id: '1',
      title: 'مراجعة ملفات الموظفين الجدد',
      description: 'مراجعة وإعداد ملفات 15 موظف جديد للقسم التقني',
      assignee: 'أحمد محمد الخالدي',
      assigneeId: 'emp_001',
      department: 'الموارد البشرية',
      priority: 'high',
      status: 'in-progress',
      category: 'hr',
      deadline: '2024-01-25',
      createdAt: '2024-01-15',
      progress: 65,
      attachments: 3,
      comments: 8
    },
    {
      id: '2',
      title: 'إعداد التقرير المالي الشهري',
      description: 'تحضير التقرير المالي لشهر يناير 2024',
      assignee: 'فاطمة سالم المطيري',
      assigneeId: 'emp_002',
      department: 'المالية',
      priority: 'urgent',
      status: 'overdue',
      category: 'finance',
      deadline: '2024-01-20',
      createdAt: '2024-01-10',
      progress: 80,
      attachments: 5,
      comments: 12
    },
    {
      id: '3',
      title: 'تحديث نظام إدارة المحتوى',
      description: 'تحديث الموقع الإلكتروني وإضافة الميزات الجديدة',
      assignee: 'محمد علي العبدالله',
      assigneeId: 'emp_003',
      department: 'تقنية المعلومات',
      priority: 'medium',
      status: 'new',
      category: 'it',
      deadline: '2024-02-01',
      createdAt: '2024-01-18',
      progress: 15,
      attachments: 2,
      comments: 4
    },
    {
      id: '4',
      title: 'حملة التسويق الرقمي',
      description: 'إطلاق حملة تسويقية جديدة على وسائل التواصل الاجتماعي',
      assignee: 'نورا أحمد السالم',
      assigneeId: 'emp_004',
      department: 'التسويق',
      priority: 'medium',
      status: 'completed',
      category: 'marketing',
      deadline: '2024-01-15',
      createdAt: '2024-01-05',
      completedAt: '2024-01-14',
      progress: 100,
      attachments: 7,
      comments: 15
    }
  ];

  const taskCategories: TaskCategory[] = [
    {
      id: '1',
      name: 'الموارد البشرية',
      nameEn: 'Human Resources',
      head: 'أحمد محمد الخالدي',
      tasks: 25,
      completed: 18,
      performance: 92,
      avgCompletionTime: 3.5,
      description: 'إدارة المهام المتعلقة بالموظفين والتوظيف'
    },
    {
      id: '2',
      name: 'المالية',
      nameEn: 'Finance',
      head: 'فاطمة سالم المطيري',
      tasks: 18,
      completed: 14,
      performance: 88,
      avgCompletionTime: 2.8,
      description: 'مهام التقارير المالية والمحاسبة'
    },
    {
      id: '3',
      name: 'العمليات',
      nameEn: 'Operations',
      head: 'محمد علي العبدالله',
      tasks: 32,
      completed: 28,
      performance: 95,
      avgCompletionTime: 4.2,
      description: 'مهام العمليات التشغيلية اليومية'
    },
    {
      id: '4',
      name: 'تقنية المعلومات',
      nameEn: 'IT',
      head: 'سارة أحمد المتعب',
      tasks: 22,
      completed: 19,
      performance: 90,
      avgCompletionTime: 5.1,
      description: 'المهام التقنية وتطوير النظم'
    }
  ];

  const collaborations: Collaboration[] = [
    {
      id: '1',
      taskId: '1',
      user: 'أحمد محمد الخالدي',
      message: 'تم الانتهاء من مراجعة 10 ملفات من أصل 15',
      timestamp: '2024-01-20 14:30',
      type: 'comment'
    },
    {
      id: '2',
      taskId: '1',
      user: 'النظام',
      message: 'تم تغيير حالة المهمة إلى "قيد التنفيذ"',
      timestamp: '2024-01-19 09:15',
      type: 'status_change'
    },
    {
      id: '3',
      taskId: '2',
      user: 'فاطمة سالم المطيري',
      message: 'يحتاج التقرير لمراجعة إضافية من المدير المالي',
      timestamp: '2024-01-21 11:45',
      type: 'comment'
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'يناير', completed: 85, inProgress: 32, new: 15, overdue: 8 },
    { month: 'فبراير', completed: 92, inProgress: 28, new: 18, overdue: 5 },
    { month: 'مارس', completed: 78, inProgress: 35, new: 22, overdue: 12 },
    { month: 'أبريل', completed: 95, inProgress: 25, new: 16, overdue: 4 },
    { month: 'مايو', completed: 88, inProgress: 38, new: 24, overdue: 9 },
    { month: 'يونيو', completed: 102, inProgress: 30, new: 20, overdue: 6 }
  ];

  const departmentDistribution = [
    { name: 'الموارد البشرية', value: 25, color: '#3b82f6' },
    { name: 'المالية', value: 18, color: '#10b981' },
    { name: 'العمليات', value: 32, color: '#f59e0b' },
    { name: 'تقنية المعلومات', value: 22, color: '#8b5cf6' },
    { name: 'التسويق', value: 15, color: '#ef4444' }
  ];

  const priorityDistribution = [
    { name: 'عاجل', value: 12, color: '#dc2626' },
    { name: 'عالي', value: 28, color: '#ea580c' },
    { name: 'متوسط', value: 45, color: '#ca8a04' },
    { name: 'منخفض', value: 27, color: '#16a34a' }
  ];

  // Calculate statistics
  const stats = {
    totalTasks: tasks.length,
    activeTasks: tasks.filter(t => ['new', 'in-progress'].includes(t.status)).length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    overdueTasks: tasks.filter(t => t.status === 'overdue').length,
    avgCompletionTime: 3.8,
    completionRate: Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير المهام والمتابعة كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const handleUpload = () => {
    toast({
      title: "تم الرفع بنجاح",
      description: "تم رفع الملفات المرفقة",
    });
  };

  const handleDownload = () => {
    toast({
      title: "جاري التحميل",
      description: "يتم تحميل الملفات المرفقة",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'new': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    const priorityMap: { [key: string]: string } = {
      'urgent': 'عاجل',
      'high': 'عالي',
      'medium': 'متوسط',
      'low': 'منخفض'
    };
    return priorityMap[priority] || priority;
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'completed': 'مكتملة',
      'in-progress': 'قيد التنفيذ',
      'new': 'جديدة',
      'overdue': 'متأخرة'
    };
    return statusMap[status] || status;
  };

  const getCategoryText = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'hr': 'موارد بشرية',
      'finance': 'مالية',
      'operations': 'عمليات',
      'it': 'تقنية معلومات',
      'marketing': 'تسويق'
    };
    return categoryMap[category] || category;
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl animate-fade-in">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-emerald-400/50 hover:text-emerald-400 transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <div className="h-8 w-px bg-white/20"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <div className="relative z-10 group-hover:scale-110 transition-transform text-white">
              <CheckSquare className="h-8 w-8" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              المهام والمتابعة
            </h1>
            <p className="text-white/70 text-lg">
              منظومة شاملة لإدارة المهام والمتابعة مع أدوات التعاون والتحليل المتقدمة والتقارير التفصيلية
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-emerald-400/30 text-emerald-400 bg-emerald-500/10 px-4 py-2 text-sm font-medium">
          <CheckSquare className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button 
          onClick={handleExport}
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
        >
          <Download className="h-4 w-4 ml-2" />
          تصدير التقرير
        </Button>
        <Button 
          onClick={handlePrint}
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
        >
          <FileText className="h-4 w-4 ml-2" />
          طباعة
        </Button>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
        >
          <Plus className="h-4 w-4 ml-2" />
          مهمة جديدة
        </Button>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">إجمالي المهام</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.totalTasks}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">مهام نشطة</p>
                <p className="text-2xl font-bold text-blue-400">{stats.activeTasks}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">مهام مكتملة</p>
                <p className="text-2xl font-bold text-green-400">{stats.completedTasks}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-red-500/25 transition-all duration-300 border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">مهام متأخرة</p>
                <p className="text-2xl font-bold text-red-400">{stats.overdueTasks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">متوسط الإنجاز</p>
                <p className="text-2xl font-bold text-purple-400">{stats.avgCompletionTime} أيام</p>
              </div>
              <Timer className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">معدل الإنجاز</p>
                <p className="text-2xl font-bold text-green-400">{stats.completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              أداء المهام الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area type="monotone" dataKey="completed" stackId="1" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="inProgress" stackId="2" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="new" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
                <Area type="monotone" dataKey="overdue" stackId="4" stroke="#ef4444" fill="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <PieChart className="h-5 w-5 text-emerald-400" />
              توزيع المهام حسب الأولوية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={priorityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي للمهام والمتابعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">أداء ممتاز</span>
              </div>
              <p className="text-sm text-emerald-700">
                تحسن ملحوظ في معدل إنجاز المهام بنسبة 23% مقارنة بالشهر الماضي
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحذير</span>
              </div>
              <p className="text-sm text-orange-700">
                يُتوقع زيادة في المهام المتأخرة في قسم المالية خلال الأسبوع القادم
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية</span>
              </div>
              <p className="text-sm text-blue-700">
                يُنصح بإعادة توزيع المهام لتحسين التوازن في أعباء العمل
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTaskManagement = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في المهام..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="تصفية حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="new">جديدة</SelectItem>
              <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
              <SelectItem value="completed">مكتملة</SelectItem>
              <SelectItem value="overdue">متأخرة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-6">{task.title}</CardTitle>
                  <CardDescription className="mt-1">{task.description}</CardDescription>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTask(task)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المسؤول:</span>
                <span className="font-medium">{task.assignee}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">القسم:</span>
                <span>{task.department}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(task.priority)}>
                  {getPriorityText(task.priority)}
                </Badge>
                <Badge className={getStatusColor(task.status)}>
                  {getStatusText(task.status)}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">التقدم</span>
                  <span className="font-medium">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{task.deadline}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    <span>{task.attachments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{task.comments}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFollowupTracking = () => (
    <div className="space-y-6">
      {/* Timeline View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            الجدول الزمني للمهام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={task.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'completed' ? 'bg-green-500' :
                    task.status === 'overdue' ? 'bg-red-500' :
                    task.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">{task.assignee} - {task.department}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {task.deadline}
                </div>
                <Badge className={getStatusColor(task.status)}>
                  {getStatusText(task.status)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts and Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              التنبيهات والتذكيرات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-semibold text-red-800">مهمة متأخرة</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  التقرير المالي الشهري - متأخر منذ يوم واحد
                </p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-semibold text-orange-800">موعد قريب</span>
                </div>
                <p className="text-sm text-orange-700 mt-1">
                  مراجعة ملفات الموظفين الجدد - باقي 3 أيام
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">تذكير</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  اجتماع مراجعة المهام الأسبوعي - غداً الساعة 10:00 ص
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              تتبع التقدم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taskCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.completed}/{category.tasks}
                    </span>
                  </div>
                  <Progress 
                    value={(category.completed / category.tasks) * 100} 
                    className="h-2" 
                  />
                  <div className="text-xs text-muted-foreground">
                    معدل الأداء: {category.performance}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCollaboration = () => (
    <div className="space-y-6">
      {/* Task Communication */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              التعليقات والمحادثات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {collaborations.map((collab) => (
                <div key={collab.id} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{collab.user}</span>
                    <span className="text-xs text-muted-foreground">{collab.timestamp}</span>
                  </div>
                  <p className="text-sm">{collab.message}</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {collab.type === 'comment' ? 'تعليق' :
                       collab.type === 'status_change' ? 'تغيير حالة' :
                       collab.type === 'assignment' ? 'تكليف' : 'مرفق'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="اكتب تعليقك..." className="flex-1" />
                <Button size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              فريق العمل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {taskCategories.map((category) => (
                <div key={category.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.head}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{category.tasks} مهمة</p>
                      <p className="text-xs text-muted-foreground">
                        {category.performance}% إنجاز
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={category.performance} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            التنبيهات والإشعارات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <UserPlus className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">تكليف جديد</span>
              </div>
              <p className="text-sm text-blue-700">
                تم تكليفك بمهمة جديدة: تحديث نظام إدارة المحتوى
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-800">مهمة مكتملة</span>
              </div>
              <p className="text-sm text-green-700">
                تم إنجاز حملة التسويق الرقمي بنجاح
              </p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تذكير</span>
              </div>
              <p className="text-sm text-orange-700">
                موعد تسليم التقرير المالي خلال 24 ساعة
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <User className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير الموظفين</h3>
            <p className="text-sm text-muted-foreground">
              معدل إنجاز المهام لكل موظف
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Building className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير الأقسام</h3>
            <p className="text-sm text-muted-foreground">
              أداء المهام حسب القسم
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تحليل التأخير</h3>
            <p className="text-sm text-muted-foreground">
              المهام المتأخرة وأسبابها
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">مؤشرات الأداء</h3>
            <p className="text-sm text-muted-foreground">
              الإنتاجية ومعايير SLA
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              معدل الإنجاز حسب القسم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="performance" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المهام حسب القسم
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

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>خيارات التصدير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 ml-2" />
              تصدير PDF
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <FileText className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <FileText className="h-4 w-4 ml-2" />
              طباعة التقرير
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 ml-2" />
              مشاركة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Task Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            فئات المهام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 ml-2" />
              إضافة فئة جديدة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              صلاحيات المستخدمين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>إنشاء المهام</Label>
                <Select defaultValue="managers">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستخدمين</SelectItem>
                    <SelectItem value="managers">المدراء فقط</SelectItem>
                    <SelectItem value="admins">المشرفين فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>تعديل المهام</Label>
                <Select defaultValue="assigned">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستخدمين</SelectItem>
                    <SelectItem value="assigned">المكلف بالمهمة</SelectItem>
                    <SelectItem value="managers">المدراء فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>حذف المهام</Label>
                <Select defaultValue="admins">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creator">منشئ المهمة</SelectItem>
                    <SelectItem value="managers">المدراء فقط</SelectItem>
                    <SelectItem value="admins">المشرفين فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إعدادات المتابعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>التذكيرات الافتراضية</Label>
                <Select defaultValue="1day">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1hour">ساعة واحدة</SelectItem>
                    <SelectItem value="6hours">6 ساعات</SelectItem>
                    <SelectItem value="1day">يوم واحد</SelectItem>
                    <SelectItem value="3days">3 أيام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>قواعد التصعيد</Label>
                <Select defaultValue="auto">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">تلقائي</SelectItem>
                    <SelectItem value="manual">يدوي</SelectItem>
                    <SelectItem value="disabled">معطل</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>تدفق العمل</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">بسيط</SelectItem>
                    <SelectItem value="standard">قياسي</SelectItem>
                    <SelectItem value="advanced">متقدم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">إلغاء</Button>
        <Button>حفظ الإعدادات</Button>
      </div>
    </div>
  );

  // Add Task Dialog
  const AddTaskDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>إضافة مهمة جديدة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>عنوان المهمة</Label>
              <Input placeholder="أدخل عنوان المهمة" />
            </div>
            <div className="space-y-2">
              <Label>الأولوية</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">عاجل</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>الوصف</Label>
            <Textarea placeholder="وصف تفصيلي للمهمة" rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>المسؤول</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المسؤول" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emp_001">أحمد محمد الخالدي</SelectItem>
                  <SelectItem value="emp_002">فاطمة سالم المطيري</SelectItem>
                  <SelectItem value="emp_003">محمد علي العبدالله</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>القسم</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">الموارد البشرية</SelectItem>
                  <SelectItem value="finance">المالية</SelectItem>
                  <SelectItem value="operations">العمليات</SelectItem>
                  <SelectItem value="it">تقنية المعلومات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>تاريخ التسليم</Label>
              <Input type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>الفئة</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hr">موارد بشرية</SelectItem>
                <SelectItem value="finance">مالية</SelectItem>
                <SelectItem value="operations">عمليات</SelectItem>
                <SelectItem value="it">تقنية معلومات</SelectItem>
                <SelectItem value="marketing">تسويق</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={() => {
              setIsAddDialogOpen(false);
              toast({
                title: "تم إنشاء المهمة",
                description: "تم إنشاء المهمة الجديدة بنجاح",
              });
            }}>
              إنشاء المهمة
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-r from-green-400/15 to-emerald-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-600/10 to-green-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-green-500/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10">
        {renderHeader()}
        
        <div className="container mx-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-black/40 backdrop-blur-md border border-white/10">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              إدارة المهام
            </TabsTrigger>
            <TabsTrigger value="followup" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              المتابعة والتتبع
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              التعاون
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {renderTaskManagement()}
          </TabsContent>

          <TabsContent value="followup" className="space-y-6">
            {renderFollowupTracking()}
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-6">
            {renderCollaboration()}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      <AddTaskDialog />
    </div>
    </div>
  );
};