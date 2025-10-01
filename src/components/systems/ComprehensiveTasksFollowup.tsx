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
  FolderOpen,
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
    { name: 'الموارد البشرية', value: 25, color: 'hsl(var(--primary))' },
    { name: 'المالية', value: 18, color: 'hsl(var(--success))' },
    { name: 'العمليات', value: 32, color: 'hsl(var(--warning))' },
    { name: 'تقنية المعلومات', value: 22, color: 'hsl(var(--accent))' },
    { name: 'التسويق', value: 15, color: 'hsl(var(--destructive))' }
  ];

  const priorityDistribution = [
    { name: 'عاجل', value: 12, color: 'hsl(var(--destructive))' },
    { name: 'عالي', value: 28, color: 'hsl(var(--warning))' },
    { name: 'متوسط', value: 45, color: 'hsl(var(--primary))' },
    { name: 'منخفض', value: 27, color: 'hsl(var(--success))' }
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
      case 'urgent': return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'high': return 'bg-warning/20 text-warning border-warning/50';
      case 'medium': return 'bg-primary/20 text-primary border-primary/50';
      case 'low': return 'bg-success/20 text-success border-success/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/20 text-success border-success/50';
      case 'in-progress': return 'bg-primary/20 text-primary border-primary/50';
      case 'new': return 'bg-muted/20 text-muted-foreground border-muted/50';
      case 'overdue': return 'bg-destructive/20 text-destructive border-destructive/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
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
    <div className="space-y-6">
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
        <h1 className="text-3xl font-bold mb-2 text-foreground">المهام والمتابعة</h1>
        <p className="text-muted-foreground">منظومة شاملة لإدارة المهام والمتابعة</p>
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
                <p className="text-sm text-muted-foreground">إجمالي المهام</p>
                <p className="text-2xl font-bold text-primary">{stats.totalTasks}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مهام نشطة</p>
                <p className="text-2xl font-bold text-primary">{stats.activeTasks}</p>
              </div>
              <Activity className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مهام مكتملة</p>
                <p className="text-2xl font-bold text-success">{stats.completedTasks}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مهام متأخرة</p>
                <p className="text-2xl font-bold text-destructive">{stats.overdueTasks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الإنجاز</p>
                <p className="text-2xl font-bold text-accent-foreground">{stats.avgCompletionTime} أيام</p>
              </div>
              <Timer className="h-8 w-8 text-accent/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الإنجاز</p>
                <p className="text-2xl font-bold text-success">{stats.completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="h-5 w-5 text-primary" />
              أداء المهام الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }} 
                />
                <Area type="monotone" dataKey="completed" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" />
                <Area type="monotone" dataKey="inProgress" stackId="2" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
                <Area type="monotone" dataKey="new" stackId="3" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" />
                <Area type="monotone" dataKey="overdue" stackId="4" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <PieChart className="h-5 w-5 text-primary" />
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
                  fill="hsl(var(--primary))"
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
      <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي للمهام والمتابعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm font-semibold text-success">أداء ممتاز</span>
              </div>
              <p className="text-sm text-muted-foreground">
                تحسن ملحوظ في معدل إنجاز المهام بنسبة 23% مقارنة بالشهر الماضي
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm font-semibold text-warning">تحذير</span>
              </div>
              <p className="text-sm text-muted-foreground">
                يُتوقع زيادة في المهام المتأخرة في قسم المالية خلال الأسبوع القادم
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">توصية</span>
              </div>
              <p className="text-sm text-muted-foreground">
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
            className="pr-10 bg-card border-border text-foreground"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40 bg-card border-border text-foreground">
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
          <Card key={task.id} className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-6 text-foreground">{task.title}</CardTitle>
                  <CardDescription className="mt-1 text-muted-foreground">{task.description}</CardDescription>
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
                <span className="font-medium text-foreground">{task.assignee}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">القسم:</span>
                <span className="text-foreground">{task.department}</span>
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
                  <span className="font-medium text-foreground">{task.progress}%</span>
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
      <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Clock className="h-5 w-5 text-primary" />
            الجدول الزمني للمهام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={task.id} className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'completed' ? 'bg-success' :
                    task.status === 'overdue' ? 'bg-destructive' :
                    task.status === 'in-progress' ? 'bg-primary' : 'bg-muted'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{task.title}</h4>
                  <p className="text-sm text-white/60">{task.assignee} - {task.department}</p>
                </div>
                <div className="text-sm text-white/60">
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
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Bell className="h-5 w-5 text-emerald-400" />
              التنبيهات والتذكيرات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-300">مهمة متأخرة</span>
                </div>
                <p className="text-sm text-white/70 mt-1">
                  التقرير المالي الشهري - متأخر منذ يوم واحد
                </p>
              </div>
              <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span className="text-sm font-semibold text-orange-300">موعد قريب</span>
                </div>
                <p className="text-sm text-white/70 mt-1">
                  مراجعة ملفات الموظفين الجدد - باقي 3 أيام
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-semibold text-blue-300">تذكير</span>
                </div>
                <p className="text-sm text-white/70 mt-1">
                  اجتماع مراجعة المهام الأسبوعي - غداً الساعة 10:00 ص
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              تتبع التقدم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taskCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{category.name}</span>
                    <span className="text-sm text-white/60">
                      {category.completed}/{category.tasks}
                    </span>
                  </div>
                  <Progress 
                    value={(category.completed / category.tasks) * 100} 
                    className="h-2" 
                  />
                  <div className="text-xs text-white/60">
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
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <MessageSquare className="h-5 w-5 text-emerald-400" />
              التعليقات والمحادثات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {collaborations.map((collab) => (
                <div key={collab.id} className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-white">{collab.user}</span>
                    <span className="text-xs text-white/60">{collab.timestamp}</span>
                  </div>
                  <p className="text-sm text-white/80">{collab.message}</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                      {collab.type === 'comment' ? 'تعليق' :
                       collab.type === 'status_change' ? 'تغيير حالة' :
                       collab.type === 'assignment' ? 'تكليف' : 'مرفق'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input placeholder="اكتب تعليقك..." className="flex-1 bg-black/40 border-white/10 text-white placeholder:text-white/50" />
                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-emerald-400" />
              فريق العمل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {taskCategories.map((category) => (
                <div key={category.id} className="p-3 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{category.name}</h4>
                      <p className="text-sm text-white/60">{category.head}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{category.tasks} مهمة</p>
                      <p className="text-xs text-white/60">
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
      <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Bell className="h-5 w-5 text-emerald-400" />
            التنبيهات والإشعارات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <UserPlus className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-300">تكليف جديد</span>
              </div>
              <p className="text-sm text-white/70">
                تم تكليفك بمهمة جديدة: تحديث نظام إدارة المحتوى
              </p>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span className="text-sm font-semibold text-green-300">مهمة مكتملة</span>
              </div>
              <p className="text-sm text-white/70">
                تم إنجاز حملة التسويق الرقمي بنجاح
              </p>
            </div>
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-semibold text-orange-300">تذكير</span>
              </div>
              <p className="text-sm text-white/70">
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
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <User className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-white">تقرير الموظفين</h3>
            <p className="text-sm text-white/70">
              معدل إنجاز المهام لكل موظف
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <Building className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-white">تقرير الأقسام</h3>
            <p className="text-sm text-white/70">
              أداء المهام حسب القسم
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-white">تحليل التأخير</h3>
            <p className="text-sm text-white/70">
              المهام المتأخرة وأسبابها
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-white">مؤشرات الأداء</h3>
            <p className="text-sm text-white/70">
              الإنتاجية ومعايير SLA
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              معدل الإنجاز حسب القسم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskCategories}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="performance" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <PieChart className="h-5 w-5 text-emerald-400" />
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">خيارات التصدير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={handleExport} className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Download className="h-4 w-4 ml-2" />
              تصدير PDF
            </Button>
            <Button variant="outline" onClick={handleExport} className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <FileText className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button variant="outline" onClick={handlePrint} className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <FileText className="h-4 w-4 ml-2" />
              طباعة التقرير
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
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
      <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BookOpen className="h-5 w-5 text-emerald-400" />
            فئات المهام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{category.name}</h4>
                  <p className="text-sm text-white/70">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Plus className="h-4 w-4 ml-2" />
              إضافة فئة جديدة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-emerald-400" />
              صلاحيات المستخدمين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">إنشاء المهام</Label>
                <Select defaultValue="managers">
                  <SelectTrigger className="bg-black/40 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="all">جميع المستخدمين</SelectItem>
                    <SelectItem value="managers">المدراء فقط</SelectItem>
                    <SelectItem value="admins">المشرفين فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">تعديل المهام</Label>
                <Select defaultValue="assigned">
                  <SelectTrigger className="bg-black/40 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="all">جميع المستخدمين</SelectItem>
                    <SelectItem value="assigned">المكلف بالمهمة</SelectItem>
                    <SelectItem value="managers">المدراء فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">حذف المهام</Label>
                <Select defaultValue="admins">
                  <SelectTrigger className="bg-black/40 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="creator">منشئ المهمة</SelectItem>
                    <SelectItem value="managers">المدراء فقط</SelectItem>
                    <SelectItem value="admins">المشرفين فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Settings className="h-5 w-5 text-emerald-400" />
              إعدادات المتابعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">التذكيرات الافتراضية</Label>
                <Select defaultValue="1day">
                  <SelectTrigger className="bg-black/40 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="1hour">ساعة واحدة</SelectItem>
                    <SelectItem value="6hours">6 ساعات</SelectItem>
                    <SelectItem value="1day">يوم واحد</SelectItem>
                    <SelectItem value="3days">3 أيام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">قواعد التصعيد</Label>
                <Select defaultValue="auto">
                  <SelectTrigger className="bg-black/40 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="auto">تلقائي</SelectItem>
                    <SelectItem value="manual">يدوي</SelectItem>
                    <SelectItem value="disabled">معطل</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">تدفق العمل</Label>
                <Select defaultValue="standard">
                  <SelectTrigger className="bg-black/40 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
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
        <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">إلغاء</Button>
        <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white">حفظ الإعدادات</Button>
      </div>
    </div>
  );

  // Add Task Dialog
  const AddTaskDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="max-w-2xl bg-black/95 backdrop-blur-md border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">إضافة مهمة جديدة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">عنوان المهمة</Label>
              <Input placeholder="أدخل عنوان المهمة" className="bg-black/40 border-white/10 text-white placeholder:text-white/50" />
            </div>
            <div className="space-y-2">
              <Label className="text-white">الأولوية</Label>
              <Select>
                <SelectTrigger className="bg-black/40 border-white/10 text-white">
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="urgent">عاجل</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">الوصف</Label>
            <Textarea placeholder="وصف تفصيلي للمهمة" rows={3} className="bg-black/40 border-white/10 text-white placeholder:text-white/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white">المسؤول</Label>
              <Select>
                <SelectTrigger className="bg-black/40 border-white/10 text-white">
                  <SelectValue placeholder="اختر المسؤول" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="emp_001">أحمد محمد الخالدي</SelectItem>
                  <SelectItem value="emp_002">فاطمة سالم المطيري</SelectItem>
                  <SelectItem value="emp_003">محمد علي العبدالله</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white">القسم</Label>
              <Select>
                <SelectTrigger className="bg-black/40 border-white/10 text-white">
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="hr">الموارد البشرية</SelectItem>
                  <SelectItem value="finance">المالية</SelectItem>
                  <SelectItem value="operations">العمليات</SelectItem>
                  <SelectItem value="it">تقنية المعلومات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white">تاريخ التسليم</Label>
              <Input type="date" className="bg-black/40 border-white/10 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">الفئة</Label>
            <Select>
              <SelectTrigger className="bg-black/40 border-white/10 text-white">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/10">
                <SelectItem value="hr">موارد بشرية</SelectItem>
                <SelectItem value="finance">مالية</SelectItem>
                <SelectItem value="operations">عمليات</SelectItem>
                <SelectItem value="it">تقنية معلومات</SelectItem>
                <SelectItem value="marketing">تسويق</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              إلغاء
            </Button>
            <Button onClick={() => {
              setIsAddDialogOpen(false);
              toast({
                title: "تم إنشاء المهمة",
                description: "تم إنشاء المهمة الجديدة بنجاح",
              });
            }} className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white">
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
        <div className="flex items-center justify-between mb-12 p-6 rounded-3xl transition-all duration-300 bg-card border border-border">
          <div className="flex items-center gap-6">
            <Button variant="outline" size="sm" className="transition-all duration-300">
              <ArrowLeft className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="h-8 w-px bg-border"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center relative overflow-hidden group bg-accent">
                <CheckSquare className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  نظام إدارة المهام الشامل
                </h1>
                <p className="text-lg text-muted-foreground">
                  نظام متطور لإدارة ومتابعة المهام والمشاريع مع التحليلات التنبؤية
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              <CheckSquare className="h-4 w-4 ml-2" />
              نظام متقدم
            </Badge>
            <Button className="transition-all duration-300 bg-primary text-primary-foreground">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقارير
            </Button>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:grid-cols-8 p-1 h-auto rounded-xl bg-primary border border-border">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 p-3 transition-all duration-300 rounded-lg data-[state=active]:bg-accent text-foreground">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">لوحة التحكم</span>
            </TabsTrigger>
            
            <TabsTrigger value="tasks" className="flex items-center gap-2 p-3 transition-all duration-300 rounded-lg data-[state=active]:bg-accent text-foreground">
              <CheckSquare className="h-4 w-4" />
              <span className="hidden sm:inline">المهام</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2 p-3 transition-all duration-300 rounded-lg data-[state=active]:bg-accent text-foreground">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">المشاريع</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2 p-3 transition-all duration-300 rounded-lg data-[state=active]:bg-accent text-foreground">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">الفرق</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 p-3 transition-all duration-300 rounded-lg data-[state=active]:bg-accent text-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">التحليلات</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2 p-3 transition-all duration-300 rounded-lg data-[state=active]:bg-accent text-foreground">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">التقويم</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 p-3 transition-all duration-300 rounded-lg data-[state=active]:bg-accent text-foreground">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">التقارير</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 p-3 transition-all duration-300 rounded-lg data-[state=active]:bg-accent text-foreground">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {renderTaskManagement()}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            {renderFollowupTracking()}
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            {renderCollaboration()}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            {renderFollowupTracking()}
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
  );
};