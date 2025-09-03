import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, FileText, Calendar, User, CheckCircle } from 'lucide-react';

const TasksNotes = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const tasks = [
    {
      id: 'TSK001',
      title: isRTL ? 'إكمال تقرير المشروع الشهري' : 'Complete Monthly Project Report',
      assignedTo: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed',
      dueDate: '2024-06-15',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'TSK002',
      title: isRTL ? 'مراجعة الكود البرمجي' : 'Code Review Session',
      assignedTo: isRTL ? 'سارة أحمد' : 'Sara Ahmed',
      dueDate: '2024-06-10',
      status: 'pending',
      priority: 'medium'
    }
  ];

  const notes = [
    {
      id: 'NOTE001',
      title: isRTL ? 'تقييم أداء ممتاز' : 'Excellent Performance Review',
      employee: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed',
      date: '2024-06-01',
      type: 'positive'
    },
    {
      id: 'NOTE002',
      title: isRTL ? 'تحسن في مهارات التواصل' : 'Improvement in Communication Skills',
      employee: isRTL ? 'سارة أحمد' : 'Sara Ahmed',
      date: '2024-05-28',
      type: 'neutral'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: isRTL ? 'معلق' : 'Pending', color: 'bg-gray-100 text-gray-800' },
      'in-progress': { label: isRTL ? 'قيد التنفيذ' : 'In Progress', color: 'bg-blue-100 text-blue-800' },
      completed: { label: isRTL ? 'مكتمل' : 'Completed', color: 'bg-green-100 text-green-800' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      high: { label: isRTL ? 'عالية' : 'High', color: 'bg-red-100 text-red-800' },
      medium: { label: isRTL ? 'متوسطة' : 'Medium', color: 'bg-orange-100 text-orange-800' },
      low: { label: isRTL ? 'منخفضة' : 'Low', color: 'bg-green-100 text-green-800' }
    };
    
    const priorityInfo = priorityMap[priority as keyof typeof priorityMap];
    return <Badge className={priorityInfo.color}>{priorityInfo.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isRTL ? 'إدارة المهام والملاحظات' : 'Tasks & Notes Management'}
        </h2>
        <p className="text-gray-600">
          {isRTL ? 'إدارة مهام الموظفين وإضافة ملاحظات الأداء والتطوير' : 'Manage employee tasks and add performance and development notes'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {isRTL ? 'المهام' : 'Tasks'}
              </CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {isRTL ? 'إضافة مهمة' : 'Add Task'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-gray-900">{task.title}</h4>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{task.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {isRTL ? 'الملاحظات' : 'Notes'}
              </CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {isRTL ? 'إضافة ملاحظة' : 'Add Note'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-gray-900">{note.title}</h4>
                  <Badge className={note.type === 'positive' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                    {note.type === 'positive' ? (isRTL ? 'إيجابي' : 'Positive') : (isRTL ? 'محايد' : 'Neutral')}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{note.employee}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{note.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksNotes;