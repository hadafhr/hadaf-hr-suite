import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  CheckSquare,
  Clock,
  User,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  Calendar as CalendarIcon,
  Flag,
  Target,
  Zap,
  Star,
  TrendingUp,
  Timer,
  FileText,
  MessageSquare,
  Paperclip,
  ArrowUp,
  ArrowDown,
  Minus,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Send
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'project' | 'maintenance' | 'support' | 'development' | 'admin' | 'training';
  assignee: string;
  assigneeId: string;
  reporter: string;
  department: string;
  project?: string;
  createdDate: string;
  dueDate: string;
  startDate?: string;
  completedDate?: string;
  estimatedHours: number;
  actualHours?: number;
  progress: number;
  dependencies: string[];
  subtasks: SubTask[];
  attachments: string[];
  comments: Comment[];
  tags: string[];
  isBlocked: boolean;
  blockReason?: string;
}

interface SubTask {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignee: string;
  dueDate: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'status_change' | 'assignment' | 'update';
}

interface AdvancedTaskManagementProps {
  onBack: () => void;
}

export const AdvancedTaskManagement: React.FC<AdvancedTaskManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');

  // Mock tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'TSK001',
      title: 'تطوير واجهة المستخدم الجديدة',
      description: 'تصميم وتطوير واجهة المستخدم الجديدة للتطبيق مع التركيز على تجربة المستخدم',
      status: 'in_progress',
      priority: 'high',
      category: 'development',
      assignee: 'أحمد محمد العلي',
      assigneeId: 'EMP001',
      reporter: 'سارة أحمد',
      department: 'تقنية المعلومات',
      project: 'تطوير التطبيق الجديد',
      createdDate: '2024-12-20',
      dueDate: '2024-12-30',
      startDate: '2024-12-22',
      estimatedHours: 40,
      actualHours: 25,
      progress: 65,
      dependencies: ['TSK002'],
      subtasks: [
        { id: 'ST1', title: 'تصميم الواجهة', status: 'completed', assignee: 'أحمد محمد', dueDate: '2024-12-25' },
        { id: 'ST2', title: 'البرمجة', status: 'in_progress', assignee: 'أحمد محمد', dueDate: '2024-12-28' },
        { id: 'ST3', title: 'الاختبار', status: 'pending', assignee: 'فاطمة علي', dueDate: '2024-12-30' }
      ],
      attachments: ['ui_mockup.pdf', 'requirements.docx'],
      comments: [
        { id: 'C1', author: 'سارة أحمد', content: 'يرجى التركيز على الاستجابة للأجهزة المحمولة', timestamp: '2024-12-22 10:30', type: 'comment' },
        { id: 'C2', author: 'أحمد محمد', content: 'تم الانتهاء من التصميم، بدء البرمجة', timestamp: '2024-12-23 14:15', type: 'status_change' }
      ],
      tags: ['frontend', 'ui/ux', 'mobile'],
      isBlocked: false
    },
    {
      id: 'TSK002',
      title: 'إعداد قاعدة البيانات',
      description: 'تصميم وإعداد قاعدة البيانات للتطبيق الجديد',
      status: 'completed',
      priority: 'high',
      category: 'development',
      assignee: 'محمد خالد',
      assigneeId: 'EMP002',
      reporter: 'علي محمود',
      department: 'تقنية المعلومات',
      project: 'تطوير التطبيق الجديد',
      createdDate: '2024-12-18',
      dueDate: '2024-12-25',
      startDate: '2024-12-19',
      completedDate: '2024-12-24',
      estimatedHours: 20,
      actualHours: 18,
      progress: 100,
      dependencies: [],
      subtasks: [
        { id: 'ST4', title: 'تصميم المخطط', status: 'completed', assignee: 'محمد خالد', dueDate: '2024-12-20' },
        { id: 'ST5', title: 'إنشاء الجداول', status: 'completed', assignee: 'محمد خالد', dueDate: '2024-12-22' },
        { id: 'ST6', title: 'إدخال البيانات التجريبية', status: 'completed', assignee: 'محمد خالد', dueDate: '2024-12-24' }
      ],
      attachments: ['database_schema.pdf'],
      comments: [
        { id: 'C3', author: 'علي محمود', content: 'ممتاز، تم الانتهاء في الموعد المحدد', timestamp: '2024-12-24 16:00', type: 'comment' }
      ],
      tags: ['database', 'backend', 'sql'],
      isBlocked: false
    },
    {
      id: 'TSK003',
      title: 'مراجعة الأمان والحماية',
      description: 'فحص شامل لثغرات الأمان في النظام وتطبيق إجراءات الحماية',
      status: 'not_started',
      priority: 'urgent',
      category: 'maintenance',
      assignee: 'عبدالرحمن صالح',
      assigneeId: 'EMP003',
      reporter: 'هند عبدالله',
      department: 'الأمن السيبراني',
      createdDate: '2024-12-25',
      dueDate: '2025-01-05',
      estimatedHours: 35,
      progress: 0,
      dependencies: ['TSK001', 'TSK002'],
      subtasks: [],
      attachments: [],
      comments: [],
      tags: ['security', 'audit', 'compliance'],
      isBlocked: true,
      blockReason: 'في انتظار اكتمال المهام المرتبطة'
    }
  ]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      not_started: { label: 'لم تبدأ', class: 'bg-gray-100 text-gray-800 border-gray-200', icon: Minus },
      in_progress: { label: 'قيد التنفيذ', class: 'bg-blue-100 text-blue-800 border-blue-200', icon: PlayCircle },
      on_hold: { label: 'معلقة', class: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: PauseCircle },
      completed: { label: 'مكتملة', class: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle2 },
      cancelled: { label: 'ملغية', class: 'bg-red-100 text-red-800 border-red-200', icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.class}>
        <IconComponent className="h-3 w-3 ml-1" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'منخفض', class: 'bg-gray-100 text-gray-800', icon: ArrowDown },
      medium: { label: 'متوسط', class: 'bg-blue-100 text-blue-800', icon: Minus },
      high: { label: 'عالي', class: 'bg-orange-100 text-orange-800', icon: ArrowUp },
      urgent: { label: 'عاجل', class: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.class} variant="outline">
        <IconComponent className="h-3 w-3 ml-1" />
        {config.label}
      </Badge>
    );
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { 
        ...task, 
        status: newStatus as Task['status'],
        completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined,
        progress: newStatus === 'completed' ? 100 : task.progress
      } : task
    ));
    toast({
      title: "تم تحديث حالة المهمة",
      description: `تم تغيير حالة المهمة إلى: ${getStatusBadge(newStatus).props.children[1]}`
    });
  };

  const calculateTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const overdue = tasks.filter(t => 
      new Date(t.dueDate) < new Date() && t.status !== 'completed'
    ).length;
    
    return { total, completed, inProgress, overdue };
  };

  const stats = calculateTaskStats();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 to-background">
      {/* Professional Header */}
      <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-[#009F87]/10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-[#009F87]/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#009F87]/10 rounded-lg">
                <CheckSquare className="h-6 w-6 text-[#009F87]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#009F87]">إدارة المهام والمتابعة المتقدمة</h1>
                <p className="text-muted-foreground">نظام شامل لتتبع وإدارة المهام والمشاريع</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">عرض القائمة</SelectItem>
                <SelectItem value="kanban">لوحة كانبان</SelectItem>
                <SelectItem value="calendar">عرض التقويم</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button size="sm" className="bg-[#009F87] hover:bg-[#008072]">
              <Plus className="h-4 w-4 ml-2" />
              مهمة جديدة
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6">
          <Card className="border-[#009F87]/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#009F87]">
                {stats.total}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي المهام</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.inProgress}
              </div>
              <div className="text-sm text-muted-foreground">قيد التنفيذ</div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.completed}
              </div>
              <div className="text-sm text-muted-foreground">مكتملة</div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {stats.overdue}
              </div>
              <div className="text-sm text-muted-foreground">متأخرة</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((stats.completed / stats.total) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">معدل الإنجاز</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-white/90 backdrop-blur">
          <TabsTrigger value="tasks" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <CheckSquare className="h-4 w-4 ml-2" />
            المهام
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Target className="h-4 w-4 ml-2" />
            المشاريع
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 ml-2" />
            التحليلات
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Settings className="h-4 w-4 ml-2" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="البحث في المهام..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 ml-2" />
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="not_started">لم تبدأ</SelectItem>
                    <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                    <SelectItem value="on_hold">معلقة</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                    <SelectItem value="cancelled">ملغية</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-[160px]">
                    <Flag className="h-4 w-4 ml-2" />
                    <SelectValue placeholder="الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأولويات</SelectItem>
                    <SelectItem value="low">منخفض</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="high">عالي</SelectItem>
                    <SelectItem value="urgent">عاجل</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Upload className="h-4 w-4 ml-2" />
                  استيراد
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tasks View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="bg-white/90 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-[#009F87]">{task.title}</h3>
                          {task.isBlocked && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 ml-1" />
                              محجوبة
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{task.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>استحقاق: {task.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span>{task.department}</span>
                          </div>
                          {task.project && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{task.project}</span>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>التقدم</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>

                        {/* Tags */}
                        {task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Subtasks Progress */}
                        {task.subtasks.length > 0 && (
                          <div className="text-sm text-muted-foreground">
                            المهام الفرعية: {task.subtasks.filter(st => st.status === 'completed').length}/{task.subtasks.length} مكتملة
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="flex flex-col gap-2">
                          {getStatusBadge(task.status)}
                          {getPriorityBadge(task.priority)}
                        </div>

                        <div className="flex gap-2">
                          <Select
                            value={task.status}
                            onValueChange={(value) => handleStatusChange(task.id, value)}
                          >
                            <SelectTrigger className="w-[120px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="not_started">لم تبدأ</SelectItem>
                              <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                              <SelectItem value="on_hold">معلقة</SelectItem>
                              <SelectItem value="completed">مكتملة</SelectItem>
                              <SelectItem value="cancelled">ملغية</SelectItem>
                            </SelectContent>
                          </Select>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedTask(task);
                              setShowTaskDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            التفاصيل
                          </Button>
                        </div>

                        {/* Time tracking */}
                        <div className="text-xs text-muted-foreground text-right">
                          <div>المقدر: {task.estimatedHours}س</div>
                          {task.actualHours && <div>الفعلي: {task.actualHours}س</div>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Kanban View */}
          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {['not_started', 'in_progress', 'on_hold', 'completed', 'cancelled'].map((status) => (
                <Card key={status} className="bg-white/90 backdrop-blur">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center justify-between">
                      {getStatusBadge(status)}
                      <span className="text-muted-foreground">
                        {filteredTasks.filter(t => t.status === status).length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {filteredTasks
                      .filter(task => task.status === status)
                      .map((task) => (
                        <Card key={task.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                              onClick={() => {
                                setSelectedTask(task);
                                setShowTaskDialog(true);
                              }}>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm line-clamp-2">{task.title}</h4>
                            <div className="flex items-center justify-between">
                              {getPriorityBadge(task.priority)}
                              <span className="text-xs text-muted-foreground">{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1" />
                            <div className="text-xs text-muted-foreground">
                              {task.assignee}
                            </div>
                          </div>
                        </Card>
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {/* Projects Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'تطوير التطبيق الجديد', progress: 65, tasks: 8, completed: 5, team: 6 },
              { name: 'تحديث النظام الأساسي', progress: 40, tasks: 12, completed: 5, team: 4 },
              { name: 'مشروع الأمان السيبراني', progress: 20, tasks: 6, completed: 1, team: 3 }
            ].map((project, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur border-[#009F87]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#009F87]" />
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>التقدم الإجمالي</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-[#009F87]">{project.tasks}</div>
                      <div className="text-xs text-muted-foreground">مهام</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-green-600">{project.completed}</div>
                      <div className="text-xs text-muted-foreground">مكتملة</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-blue-600">{project.team}</div>
                      <div className="text-xs text-muted-foreground">فريق</div>
                    </div>
                  </div>

                  <Button size="sm" className="w-full">
                    <Eye className="h-4 w-4 ml-2" />
                    عرض التفاصيل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#009F87]" />
                  توزيع المهام حسب الحالة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: 'مكتملة', count: stats.completed, color: 'bg-green-500' },
                    { status: 'قيد التنفيذ', count: stats.inProgress, color: 'bg-blue-500' },
                    { status: 'لم تبدأ', count: tasks.filter(t => t.status === 'not_started').length, color: 'bg-gray-500' },
                    { status: 'معلقة', count: tasks.filter(t => t.status === 'on_hold').length, color: 'bg-yellow-500' }
                  ].map((item) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${item.color}`}></div>
                        <span className="text-sm">{item.status}</span>
                      </div>
                      <span className="font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#009F87]" />
                  الإنتاجية حسب القسم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { dept: 'تقنية المعلومات', completed: 8, total: 12 },
                    { dept: 'التطوير', completed: 6, total: 8 },
                    { dept: 'الأمن السيبراني', completed: 2, total: 4 },
                    { dept: 'إدارة المشاريع', completed: 5, total: 6 }
                  ].map((item) => (
                    <div key={item.dept} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.dept}</span>
                        <span>{item.completed}/{item.total}</span>
                      </div>
                      <Progress value={(item.completed / item.total) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#009F87]" />
                مؤشرات الأداء الرئيسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#009F87]">
                    {Math.round((stats.completed / stats.total) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">معدل الإنجاز</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +5% من الشهر الماضي
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">4.2</div>
                  <div className="text-sm text-muted-foreground">متوسط وقت الإنجاز (يوم)</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    -0.8 يوم تحسن
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-purple-600">94%</div>
                  <div className="text-sm text-muted-foreground">دقة التقدير</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <Star className="h-3 w-3" />
                    ممتاز
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-orange-600">28</div>
                  <div className="text-sm text-muted-foreground">متوسط المهام الشهرية</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% زيادة
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Settings */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#009F87]" />
                إعدادات نظام إدارة المهام
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">إعدادات عامة</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>إشعارات المهام المتأخرة</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>تذكير قبل الاستحقاق</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>موافقة تلقائية للمهام البسيطة</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">إعدادات التقارير</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>تكرار التقارير</Label>
                      <Select defaultValue="weekly">
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
                    <div>
                      <Label>إرسال التقارير إلى</Label>
                      <Input defaultValue="manager@company.com" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Task Details Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-[#009F87]">
              <CheckSquare className="h-6 w-6" />
              تفاصيل المهمة
            </DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{selectedTask.title}</h3>
                  <p className="text-muted-foreground mt-1">{selectedTask.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {getStatusBadge(selectedTask.status)}
                  {getPriorityBadge(selectedTask.priority)}
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات المهمة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المسؤول:</span>
                        <span className="font-medium">{selectedTask.assignee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المبلغ:</span>
                        <span className="font-medium">{selectedTask.reporter}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">القسم:</span>
                        <span className="font-medium">{selectedTask.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                        <span className="font-medium">{selectedTask.createdDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">تاريخ الاستحقاق:</span>
                        <span className="font-medium">{selectedTask.dueDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>التوقيت والتقدم</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>{selectedTask.progress}%</span>
                      </div>
                      <Progress value={selectedTask.progress} className="h-2" />
                    </div>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الساعات المقدرة:</span>
                        <span className="font-medium">{selectedTask.estimatedHours}س</span>
                      </div>
                      {selectedTask.actualHours && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">الساعات الفعلية:</span>
                          <span className="font-medium">{selectedTask.actualHours}س</span>
                        </div>
                      )}
                      {selectedTask.startDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">تاريخ البدء:</span>
                          <span className="font-medium">{selectedTask.startDate}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>معلومات إضافية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm font-medium">التصنيف:</span>
                      <Badge variant="outline" className="mr-2">{selectedTask.category}</Badge>
                    </div>
                    {selectedTask.project && (
                      <div>
                        <span className="text-sm font-medium">المشروع:</span>
                        <div className="text-sm text-[#009F87]">{selectedTask.project}</div>
                      </div>
                    )}
                    {selectedTask.tags.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">العلامات:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedTask.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Subtasks */}
              {selectedTask.subtasks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>المهام الفرعية ({selectedTask.subtasks.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedTask.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium text-sm">{subtask.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {subtask.assignee} - استحقاق: {subtask.dueDate}
                            </div>
                          </div>
                          <Badge className={`${
                            subtask.status === 'completed' ? 'bg-green-100 text-green-800' :
                            subtask.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`} variant="outline">
                            {subtask.status === 'completed' ? 'مكتملة' :
                             subtask.status === 'in_progress' ? 'قيد التنفيذ' : 'في الانتظار'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comments */}
              {selectedTask.comments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>التعليقات والتحديثات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedTask.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-8 h-8 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-[#009F87]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                              <Badge variant="outline" className="text-xs">
                                {comment.type === 'comment' ? 'تعليق' :
                                 comment.type === 'status_change' ? 'تغيير حالة' :
                                 comment.type === 'assignment' ? 'تعيين' : 'تحديث'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add Comment */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex gap-2">
                        <Input placeholder="إضافة تعليق..." className="flex-1" />
                        <Button size="sm">
                          <Send className="h-4 w-4 ml-2" />
                          إرسال
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};