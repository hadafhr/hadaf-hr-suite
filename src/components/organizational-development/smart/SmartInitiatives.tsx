import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, Calendar, Users } from 'lucide-react';

export const SmartInitiatives = () => {
  const initiatives = [
    { id: 1, title: 'برنامج التحول الرقمي', progress: 75, status: 'active', department: 'التقنية' },
    { id: 2, title: 'تطوير المهارات القيادية', progress: 50, status: 'active', department: 'الموارد البشرية' },
    { id: 3, title: 'تحسين بيئة العمل', progress: 90, status: 'completed', department: 'الإدارة العامة' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">المبادرات الذكية</h2>
          <p className="text-muted-foreground">مبادرات التطوير المؤسسي مع التتبع الذكي</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          مبادرة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {initiatives.map((initiative) => (
          <Card key={initiative.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{initiative.title}</CardTitle>
                <Badge variant={initiative.status === 'completed' ? 'default' : 'secondary'}>
                  {initiative.status === 'completed' ? 'مكتمل' : 'نشط'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {initiative.department}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">التقدم</span>
                    <span className="text-sm font-medium">{initiative.progress}%</span>
                  </div>
                  <Progress value={initiative.progress} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};