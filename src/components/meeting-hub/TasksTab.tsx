import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Plus, 
  CheckSquare, 
  Circle, 
  Clock, 
  User, 
  Calendar as CalendarIcon,
  Edit,
  Trash2,
  Target,
  AlertTriangle
} from 'lucide-react';
import { meetingService, Task } from '@/services/meetingService';
import { useToast } from '@/hooks/use-toast';

export const TasksTab: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigned_to: 'current-user-id', // This should come from auth or user selection
    assignee_name: 'المستخدم الحالي', // This should come from auth or user selection
    assigned_by: 'current-user-id', // This should come from auth
    assigner_name: 'المستخدم الحالي', // This should come from auth
    priority: 'medium' as Task['priority'],
    due_date: '',
    meeting_id: undefined as string | undefined
  });

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await meetingService.getMeetingTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
      toast({
        title: "خطأ في تحميل المهام",
        description: "حدث خطأ أثناء تحميل قائمة المهام",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = async () => {
    try {
      if (!newTask.title || !newTask.assignee_name) {
        toast({
          title: "بيانات ناقصة",
          description: "يرجى ملء العنوان واختيار المسؤول عن المهمة",
          variant: "destructive"
        });
        return;
      }

      await meetingService.createTask({
        ...newTask,
        status: 'pending'
      });

      setShowCreateDialog(false);
      setNewTask({
        title: '',
        description: '',
        assigned_to: 'current-user-id',
        assignee_name: 'المستخدم الحالي',
        assigned_by: 'current-user-id',
        assigner_name: 'المستخدم الحالي',
        priority: 'medium',
        due_date: '',
        meeting_id: undefined
      });

      toast({
        title: "تم إنشاء المهمة",
        description: "تم إنشاء المهمة بنجاح وإرسال إشعار للمسؤول",
      });

      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "خطأ في إنشاء المهمة",
        description: "حدث خطأ أثناء إنشاء المهمة",
        variant: "destructive"
      });
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      const completedAt = newStatus === 'completed' ? new Date().toISOString() : undefined;
      await meetingService.updateTaskStatus(taskId, newStatus, completedAt);
      
      toast({
        title: "تم تحديث المهمة",
        description: `تم تغيير حالة المهمة إلى "${getStatusLabel(newStatus)}"`,
      });

      loadTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      toast({
        title: "خطأ في تحديث المهمة",
        description: "حدث خطأ أثناء تحديث حالة المهمة",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      pending: { text: 'معلقة', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
      in_progress: { text: 'قيد التنفيذ', className: 'bg-blue-100 text-blue-800', icon: Circle },
      completed: { text: 'مكتملة', className: 'bg-green-100 text-green-800', icon: CheckSquare },
      cancelled: { text: 'ملغية', className: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const configs = {
      high: { text: 'عالي', className: 'bg-red-100 text-red-800' },
      medium: { text: 'متوسط', className: 'bg-yellow-100 text-yellow-800' },
      low: { text: 'منخفض', className: 'bg-green-100 text-green-800' }
    };
    return configs[priority as keyof typeof configs] || configs.medium;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'معلقة',
      in_progress: 'قيد التنفيذ',
      completed: 'مكتملة',
      cancelled: 'ملغية'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDateStr: string) => {
    if (!dueDateStr) return false;
    const dueDate = new Date(dueDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const getDaysUntilDue = (dueDateStr: string) => {
    if (!dueDateStr) return null;
    const dueDate = new Date(dueDateStr);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTasksByStatus = () => {
    const pending = tasks.filter(task => task.status === 'pending').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const overdue = tasks.filter(task => task.due_date && isOverdue(task.due_date) && task.status !== 'completed').length;
    
    return { pending, inProgress, completed, overdue };
  };

  const stats = getTasksByStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المهام المعلقة</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">قيد التنفيذ</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <Circle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">مكتملة</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متأخرة</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>إدارة المهام</CardTitle>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  إنشاء مهمة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>إنشاء مهمة جديدة</DialogTitle>
                  <DialogDescription>
                    أدخل تفاصيل المهمة الجديدة
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task-title">عنوان المهمة *</Label>
                    <Input
                      id="task-title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="أدخل عنوان المهمة"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-description">الوصف</Label>
                    <Textarea
                      id="task-description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      placeholder="أدخل وصف المهمة"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="task-priority">الأولوية</Label>
                      <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({...newTask, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">منخفض</SelectItem>
                          <SelectItem value="medium">متوسط</SelectItem>
                          <SelectItem value="high">عالي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="task-due-date">تاريخ الاستحقاق</Label>
                      <Input
                        id="task-due-date"
                        type="date"
                        value={newTask.due_date}
                        onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-assignee">المسؤول عن المهمة</Label>
                    <Input
                      id="task-assignee"
                      value={newTask.assignee_name}
                      onChange={(e) => setNewTask({...newTask, assignee_name: e.target.value})}
                      placeholder="اختر المسؤول عن المهمة"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleCreateTask}>
                    إنشاء المهمة
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 min-w-64">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في المهام..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">معلقة</SelectItem>
                <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                <SelectItem value="completed">مكتملة</SelectItem>
                <SelectItem value="cancelled">ملغية</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الأولوية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأولويات</SelectItem>
                <SelectItem value="high">عالي</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="low">منخفض</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">لا توجد مهام</h3>
              <p className="text-gray-500">لم يتم العثور على مهام تطابق المعايير المحددة</p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => {
            const statusBadge = getStatusBadge(task.status);
            const priorityBadge = getPriorityBadge(task.priority);
            const daysUntilDue = task.due_date ? getDaysUntilDue(task.due_date) : null;
            const overdue = task.due_date ? isOverdue(task.due_date) : false;
            const StatusIcon = statusBadge.icon;

            return (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Checkbox
                        checked={task.status === 'completed'}
                        onCheckedChange={(checked) => {
                          handleUpdateTaskStatus(
                            task.id, 
                            checked ? 'completed' : 'pending'
                          );
                        }}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          <Badge className={statusBadge.className}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusBadge.text}
                          </Badge>
                          <Badge className={priorityBadge.className}>
                            {priorityBadge.text}
                          </Badge>
                          {overdue && task.status !== 'completed' && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              متأخرة
                            </Badge>
                          )}
                        </div>
                        
                        {task.description && (
                          <p className="text-muted-foreground mb-3">{task.description}</p>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>مسند إلى: {task.assignee_name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>بواسطة: {task.assigner_name}</span>
                          </div>
                          {task.due_date && (
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {formatDate(task.due_date)}
                                {daysUntilDue !== null && task.status !== 'completed' && (
                                  <span className={`mr-2 ${overdue ? 'text-red-600' : daysUntilDue <= 3 ? 'text-orange-600' : 'text-muted-foreground'}`}>
                                    ({overdue ? `متأخر ${Math.abs(daysUntilDue)} يوم` : 
                                      daysUntilDue === 0 ? 'اليوم' : 
                                      daysUntilDue === 1 ? 'غداً' : 
                                      `بعد ${daysUntilDue} أيام`})
                                  </span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>

                        {task.completed_at && (
                          <div className="mt-2 text-sm text-green-600">
                            <CheckSquare className="h-4 w-4 inline mr-1" />
                            تم الإكمال في: {formatDate(task.completed_at)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {task.status !== 'completed' && (
                        <Select 
                          value={task.status} 
                          onValueChange={(value: any) => handleUpdateTaskStatus(task.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">معلقة</SelectItem>
                            <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                            <SelectItem value="completed">مكتملة</SelectItem>
                            <SelectItem value="cancelled">ملغية</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};