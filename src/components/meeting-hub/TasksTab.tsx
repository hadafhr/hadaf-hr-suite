import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Clock, User, Plus, Search } from 'lucide-react';

export const TasksTab = () => {
  const [tasks] = useState([
    {
      id: '1',
      title: 'إعداد جدول أعمال اجتماع فريق التطوير',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-01-25',
      assignedTo: 'أحمد محمد'
    },
    {
      id: '2',
      title: 'مراجعة وثائق العميل الجديد',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-23',
      assignedTo: 'سارة أحمد'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="البحث في المهام..." className="pl-10" />
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          مهمة جديدة
        </Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckSquare className="h-4 w-4" />
                    <h3 className="font-semibold">{task.title}</h3>
                    <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                      {task.status === 'completed' ? 'مكتملة' : 'قيد التنفيذ'}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {task.assignedTo}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};