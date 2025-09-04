import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GitBranch, Users, Clock, CheckCircle } from 'lucide-react';

export const ChangeManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">إدارة التغيير</h2>
        <p className="text-muted-foreground">تخطيط وتنفيذ التغييرات المؤسسية بفعالية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <GitBranch className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">مبادرات التغيير</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">180</div>
            <div className="text-sm text-muted-foreground">المتأثرين</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm text-muted-foreground">أشهر التنفيذ</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">72%</div>
            <div className="text-sm text-muted-foreground">معدل القبول</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>خريطة أصحاب المصلحة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { group: 'الإدارة العليا', support: 95, impact: 'عالي' },
              { group: 'المدراء المتوسطين', support: 78, impact: 'متوسط' },
              { group: 'الموظفين', support: 65, impact: 'منخفض' },
              { group: 'العملاء', support: 88, impact: 'عالي' }
            ].map((stakeholder, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{stakeholder.group}</span>
                  <Badge variant="outline">{stakeholder.impact}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>مستوى الدعم</span>
                    <span>{stakeholder.support}%</span>
                  </div>
                  <Progress value={stakeholder.support} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};