import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, Shuffle, Users, TrendingUp } from 'lucide-react';

export const SmartRestructuring = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">إعادة الهيكلة الذكية</h2>
        <p className="text-muted-foreground">تصميم وتطبيق الهيكل التنظيمي الأمثل</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Building className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">الإدارات</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">245</div>
            <div className="text-sm text-muted-foreground">الموظفين</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm text-muted-foreground">كفاءة الهيكل</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>مراحل إعادة الهيكلة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'التحليل الحالي', progress: 100, status: 'مكتمل' },
              { name: 'تصميم الهيكل الجديد', progress: 75, status: 'قيد التنفيذ' },
              { name: 'تطبيق التغييرات', progress: 25, status: 'قادم' }
            ].map((phase, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{phase.name}</span>
                  <Badge variant={phase.status === 'مكتمل' ? 'default' : 'secondary'}>
                    {phase.status}
                  </Badge>
                </div>
                <Progress value={phase.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};