import React, { useState } from 'react';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileSidebar } from '@/components/mobile/MobileSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  Calendar,
  User,
  MoreVertical
} from 'lucide-react';

export const MobileTasks: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const tasks = [
    {
      id: 1,
      title: 'مراجعة تقييمات الأداء',
      description: 'مراجعة تقييمات فريق المبيعات للربع الأول',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-20',
      assignedBy: 'أحمد محمد',
      category: 'performance'
    },
    {
      id: 2,
      title: 'إعداد جدولة التدريب',
      description: 'تنظيم برنامج التدريب الجديد للموظفين',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-01-25',
      assignedBy: 'فاطمة علي',
      category: 'training'
    },
    {
      id: 3,
      title: 'تحديث بيانات الموظفين',
      description: 'تحديث معلومات الاتصال وبيانات الطوارئ',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-01-15',
      assignedBy: 'سعد الأحمد',
      category: 'admin'
    },
    {
      id: 4,
      title: 'مراجعة طلبات الإجازات',
      description: 'الموافقة على طلبات الإجازات المعلقة',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-18',
      assignedBy: 'نورا خالد',
      category: 'requests'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <CheckSquare className="h-4 w-4 text-green-600" />;
    }
  };

  const filterTasksByStatus = (status: string) => {
    if (status === 'all') return tasks;
    return tasks.filter(task => task.status === status);
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length
    };
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('tasks')}</h1>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المهام المعلقة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المهام المكتملة</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </Card>
        </div>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">قائمة المهام</CardTitle>
            <CardDescription>إدارة مهامك اليومية</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-xs">الكل</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs">معلقة</TabsTrigger>
                <TabsTrigger value="in-progress" className="text-xs">جارية</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs">مكتملة</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-3 mt-4">
                {filterTasksByStatus('all').map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPriorityIcon(task.priority)}
                          <h3 className="font-medium text-sm">{task.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status === 'pending' ? 'معلقة' : task.status === 'in-progress' ? 'جارية' : 'مكتملة'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>بواسطة: {task.assignedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>موعد التسليم: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-3 mt-4">
                {filterTasksByStatus('pending').map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPriorityIcon(task.priority)}
                          <h3 className="font-medium text-sm">{task.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>بواسطة: {task.assignedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>موعد التسليم: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="in-progress" className="space-y-3 mt-4">
                {filterTasksByStatus('in-progress').map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPriorityIcon(task.priority)}
                          <h3 className="font-medium text-sm">{task.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>بواسطة: {task.assignedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>موعد التسليم: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-3 mt-4">
                {filterTasksByStatus('completed').map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg space-y-3 opacity-75">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckSquare className="h-4 w-4 text-green-600" />
                          <h3 className="font-medium text-sm line-through">{task.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                        <Badge className={getStatusColor(task.status)}>
                          مكتملة
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>بواسطة: {task.assignedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>تم في: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  );
};