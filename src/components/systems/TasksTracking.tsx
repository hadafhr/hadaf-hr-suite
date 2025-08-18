import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckSquare, Clock, Users, AlertCircle, Calendar, User, Search, Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  department: string;
  priority: 'عالي' | 'متوسط' | 'منخفض';
  status: 'جديد' | 'قيد التنفيذ' | 'مكتمل' | 'متأخر' | 'ملغي';
  progress: number;
  startDate: string;
  dueDate: string;
  completionDate?: string;
  category: 'مشروع' | 'إدارية' | 'تقنية' | 'تدريب' | 'أخرى';
}

interface TasksTrackingProps {
  onBack: () => void;
}

export const TasksTracking: React.FC<TasksTrackingProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const tasks: Task[] = [
    {
      id: 'TSK001',
      title: 'تطوير نظام إدارة الحضور الجديد',
      description: 'تطوير وتنفيذ نظام متقدم لإدارة حضور وانصراف الموظفين',
      assignedTo: 'أحمد محمد العلي',
      assignedBy: 'مدير تقنية المعلومات',
      department: 'تقنية المعلومات',
      priority: 'عالي',
      status: 'قيد التنفيذ',
      progress: 75,
      startDate: '2024-03-01',
      dueDate: '2024-04-15',
      category: 'تقنية'
    },
    {
      id: 'TSK002',
      title: 'مراجعة وتحديث سياسات الموارد البشرية',
      description: 'مراجعة شاملة لجميع سياسات الموارد البشرية وتحديثها',
      assignedTo: 'فاطمة أحمد السالم',
      assignedBy: 'مدير الموارد البشرية',
      department: 'الموارد البشرية',
      priority: 'متوسط',
      status: 'قيد التنفيذ',
      progress: 45,
      startDate: '2024-03-10',
      dueDate: '2024-04-30',
      category: 'إدارية'
    },
    {
      id: 'TSK003',
      title: 'تنظيم برنامج التدريب الربع سنوي',
      description: 'تخطيط وتنفيذ برنامج التدريب للموظفين للربع الثاني',
      assignedTo: 'محمد سعد الخالد',
      assignedBy: 'مدير التدريب والتطوير',
      department: 'الموارد البشرية',
      priority: 'عالي',
      status: 'جديد',
      progress: 10,
      startDate: '2024-03-25',
      dueDate: '2024-05-15',
      category: 'تدريب'
    },
    {
      id: 'TSK004',
      title: 'إعداد التقرير المالي الربع سنوي',
      description: 'إعداد وتجهيز التقرير المالي للربع الأول من العام',
      assignedTo: 'سارة عبدالله النصر',
      assignedBy: 'المدير المالي',
      department: 'المالية',
      priority: 'عالي',
      status: 'مكتمل',
      progress: 100,
      startDate: '2024-03-01',
      dueDate: '2024-03-31',
      completionDate: '2024-03-28',
      category: 'إدارية'
    },
    {
      id: 'TSK005',
      title: 'تحديث موقع الشركة الإلكتروني',
      description: 'تحديث المحتوى والتصميم لموقع الشركة الرسمي',
      assignedTo: 'عبدالرحمن يوسف',
      assignedBy: 'مدير التسويق',
      department: 'التسويق',
      priority: 'منخفض',
      status: 'متأخر',
      progress: 30,
      startDate: '2024-02-15',
      dueDate: '2024-03-15',
      category: 'تقنية'
    }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      'جديد': 'bg-blue-100 text-blue-800 border-blue-200',
      'قيد التنفيذ': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'مكتمل': 'bg-green-100 text-green-800 border-green-200',
      'متأخر': 'bg-red-100 text-red-800 border-red-200',
      'ملغي': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return config[status as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const config = {
      'عالي': 'bg-red-100 text-red-800 border-red-200',
      'متوسط': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منخفض': 'bg-green-100 text-green-800 border-green-200'
    };
    return config[priority as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return <CheckSquare className="h-4 w-4 text-green-600" />;
      case 'قيد التنفيذ':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'متأخر':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <CheckSquare className="h-4 w-4 text-blue-600" />;
    }
  };

  const getProgressColor = (status: string, progress: number) => {
    if (status === 'متأخر') return 'bg-red-500';
    if (status === 'مكتمل') return 'bg-green-500';
    if (progress > 75) return 'bg-blue-500';
    if (progress > 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const newTasks = tasks.filter(t => t.status === 'جديد').length;
  const inProgressTasks = tasks.filter(t => t.status === 'قيد التنفيذ').length;
  const completedTasks = tasks.filter(t => t.status === 'مكتمل').length;
  const overdueTasks = tasks.filter(t => t.status === 'متأخر').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="hover:bg-[#009F87]/10"
        >
          <ArrowLeft className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <CheckSquare className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">المهام والمتابعة</h1>
            <p className="text-muted-foreground">إدارة ومتابعة مهام الموظفين والمشاريع</p>
          </div>
        </div>
        <div className="mr-auto">
          <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
            <Plus className="h-4 w-4 ml-2" />
            إضافة مهمة جديدة
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{newTasks}</div>
            <div className="text-sm text-muted-foreground">مهام جديدة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">{inProgressTasks}</div>
            <div className="text-sm text-muted-foreground">قيد التنفيذ</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckSquare className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">{completedTasks}</div>
            <div className="text-sm text-muted-foreground">مكتملة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-red-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600 mb-1">{overdueTasks}</div>
            <div className="text-sm text-muted-foreground">متأخرة</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في المهام (العنوان، المنفذ، القسم)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={selectedFilter} 
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-[#009F87]/20 rounded-lg px-3 py-2 focus:border-[#009F87] w-full md:w-48"
            >
              <option value="all">جميع الحالات</option>
              <option value="جديد">مهام جديدة</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="مكتمل">مكتملة</option>
              <option value="متأخر">متأخرة</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#009F87]/10 rounded-lg">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <User className="h-4 w-4 ml-1" />
                        {task.assignedTo}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 ml-1" />
                        {task.department}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 ml-1" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusBadge(task.status)}>
                    {task.status}
                  </Badge>
                  <Badge className={getPriorityBadge(task.priority)}>
                    أولوية {task.priority}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">التقدم</span>
                  <span className="text-sm text-muted-foreground">{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${getProgressColor(task.status, task.progress)}`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-900 mb-1">تاريخ البداية</div>
                  <div className="text-blue-700">{task.startDate}</div>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="font-medium text-orange-900 mb-1">تاريخ الاستحقاق</div>
                  <div className="text-orange-700">{task.dueDate}</div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-medium text-purple-900 mb-1">الفئة</div>
                  <div className="text-purple-700">{task.category}</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">مكلف من</div>
                  <div className="text-gray-700">{task.assignedBy}</div>
                </div>
              </div>

              {task.completionDate && (
                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center text-sm">
                    <CheckSquare className="h-4 w-4 text-green-600 ml-2" />
                    <span className="font-medium text-green-700">
                      تم الإنجاز في: {task.completionDate}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  عرض التفاصيل
                </Button>
                {task.status !== 'مكتمل' && task.status !== 'ملغي' && (
                  <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50">
                    تحديث التقدم
                  </Button>
                )}
                <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50">
                  إضافة تعليق
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-8 text-center">
            <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">لا توجد مهام</h3>
            <p className="text-muted-foreground">لم يتم العثور على مهام تطابق معايير البحث المحددة</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};