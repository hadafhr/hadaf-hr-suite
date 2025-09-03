import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  FileText,
  Target,
  Users,
  Flag
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  dueDate: string;
  createdDate: string;
  category: 'performance' | 'disciplinary' | 'development' | 'administrative';
}

interface Note {
  id: string;
  employeeName: string;
  employeeId: string;
  title: string;
  content: string;
  category: 'performance' | 'disciplinary' | 'general' | 'training';
  createdBy: string;
  createdDate: string;
  priority: 'high' | 'medium' | 'low';
  isConfidential: boolean;
}

const TasksNotes: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'tasks' | 'notes'>('tasks');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  // Mock data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'مراجعة تقييم الأداء السنوي',
      description: 'مراجعة وتقييم أداء الموظف أحمد محمد للعام الحالي',
      assignedTo: 'أحمد محمد السعيد',
      assignedBy: 'محمد أحمد الخالدي',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-02-15',
      createdDate: '2024-01-20',
      category: 'performance'
    },
    {
      id: '2',
      title: 'إكمال دورة تدريبية',
      description: 'حضور دورة تدريبية في إدارة المشاريع',
      assignedTo: 'فاطمة عبدالله النور',
      assignedBy: 'نورا أحمد السالم',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-02-28',
      createdDate: '2024-01-18',
      category: 'development'
    }
  ];

  const notes: Note[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد السعيد',
      employeeId: 'EMP-2024-001',
      title: 'ملاحظة أداء ممتاز',
      content: 'أظهر الموظف أداءً استثنائياً في مشروع تطوير النظام الجديد وقاد الفريق بكفاءة عالية',
      category: 'performance',
      createdBy: 'محمد أحمد الخالدي',
      createdDate: '2024-01-20',
      priority: 'high',
      isConfidential: false
    },
    {
      id: '2',
      employeeName: 'فاطمة عبدالله النور',
      employeeId: 'EMP-2024-002',
      title: 'تحسن في الحضور',
      content: 'تحسن ملحوظ في معدل الحضور خلال الشهر الماضي بعد المناقشة',
      category: 'disciplinary',
      createdBy: 'نورا أحمد السالم',
      createdDate: '2024-01-15',
      priority: 'medium',
      isConfidential: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتملة';
      case 'in-progress': return 'قيد التنفيذ';
      case 'pending': return 'في الانتظار';
      case 'cancelled': return 'ملغية';
      default: return status;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'performance': return 'الأداء';
      case 'disciplinary': return 'تأديبية';
      case 'development': return 'التطوير';
      case 'administrative': return 'إدارية';
      case 'general': return 'عامة';
      case 'training': return 'التدريب';
      default: return category;
    }
  };

  const handleAddTask = () => {
    setIsAddTaskOpen(false);
    toast({
      title: "تم إنشاء المهمة بنجاح",
      description: "تم إضافة المهمة الجديدة وإرسال إشعار للموظف المعني",
    });
  };

  const handleAddNote = () => {
    setIsAddNoteOpen(false);
    toast({
      title: "تم حفظ الملاحظة بنجاح",
      description: "تم إضافة الملاحظة إلى ملف الموظف",
    });
  };

  const renderTasksTab = () => (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في المهام..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  <SelectItem value="pending">في الانتظار</SelectItem>
                  <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                  <SelectItem value="completed">مكتملة</SelectItem>
                  <SelectItem value="cancelled">ملغية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة مهمة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة مهمة جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>عنوان المهمة</Label>
                    <Input placeholder="أدخل عنوان المهمة" />
                  </div>
                  <div>
                    <Label>الوصف</Label>
                    <Textarea placeholder="وصف تفصيلي للمهمة" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>تعيين إلى</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الموظف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp1">أحمد محمد السعيد</SelectItem>
                          <SelectItem value="emp2">فاطمة عبدالله النور</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>الأولوية</Label>
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
                    <div>
                      <Label>الفئة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">الأداء</SelectItem>
                          <SelectItem value="disciplinary">تأديبية</SelectItem>
                          <SelectItem value="development">التطوير</SelectItem>
                          <SelectItem value="administrative">إدارية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>تاريخ الانتهاء</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={handleAddTask}>
                      إضافة المهمة
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <Badge className={getPriorityColor(task.priority)}>
                      <Flag className="h-3 w-3 ml-1" />
                      {getPriorityText(task.priority)}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {getStatusText(task.status)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{task.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>معين إلى: {task.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>تاريخ الانتهاء: {task.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>الفئة: {getCategoryText(task.category)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderNotesTab = () => (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الملاحظات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الفئات</SelectItem>
                  <SelectItem value="performance">الأداء</SelectItem>
                  <SelectItem value="disciplinary">تأديبية</SelectItem>
                  <SelectItem value="general">عامة</SelectItem>
                  <SelectItem value="training">التدريب</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة ملاحظة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة ملاحظة جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>الموظف</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp1">أحمد محمد السعيد - EMP-2024-001</SelectItem>
                        <SelectItem value="emp2">فاطمة عبدالله النور - EMP-2024-002</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>عنوان الملاحظة</Label>
                    <Input placeholder="أدخل عنوان الملاحظة" />
                  </div>
                  <div>
                    <Label>المحتوى</Label>
                    <Textarea placeholder="تفاصيل الملاحظة" rows={4} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>الفئة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">الأداء</SelectItem>
                          <SelectItem value="disciplinary">تأديبية</SelectItem>
                          <SelectItem value="general">عامة</SelectItem>
                          <SelectItem value="training">التدريب</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>الأولوية</Label>
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
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="confidential" />
                    <Label htmlFor="confidential">ملاحظة سرية</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddNoteOpen(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={handleAddNote}>
                      حفظ الملاحظة
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="grid gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{note.title}</h3>
                    <Badge className={getPriorityColor(note.priority)}>
                      {getPriorityText(note.priority)}
                    </Badge>
                    <Badge variant="outline">
                      {getCategoryText(note.category)}
                    </Badge>
                    {note.isConfidential && (
                      <Badge className="bg-red-100 text-red-800">
                        سري
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-3">{note.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>الموظف: {note.employeeName} ({note.employeeId})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>التاريخ: {note.createdDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>بواسطة: {note.createdBy}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            <button
              className={`flex-1 p-4 text-center font-medium transition-colors ${
                activeTab === 'tasks'
                  ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('tasks')}
            >
              <Target className="h-5 w-5 inline-block ml-2" />
              المهام المعينة
            </button>
            <button
              className={`flex-1 p-4 text-center font-medium transition-colors ${
                activeTab === 'notes'
                  ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              <FileText className="h-5 w-5 inline-block ml-2" />
              ملاحظات HR
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'tasks' && renderTasksTab()}
      {activeTab === 'notes' && renderNotesTab()}
    </div>
  );
};

export default TasksNotes;