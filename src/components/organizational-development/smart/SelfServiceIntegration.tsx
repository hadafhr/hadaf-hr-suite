import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Bell, TrendingUp, Award } from 'lucide-react';

export const SelfServiceIntegration = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">تكامل بوابة الموظفين</h2>
        <p className="text-muted-foreground">ويدجت وإشعارات تفاعلية لعرض ترتيب الإدارة ومؤشر السعادة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">إدارتك</div>
            <div className="text-sm text-muted-foreground">المركز الثاني</div>
            <Badge className="mt-2 bg-green-100 text-green-700">تحسن +15%</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Bell className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-lg font-bold">إشعار جديد</div>
            <div className="text-sm text-muted-foreground">إدارتك تقدمت للمركز 2</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">4.2</div>
            <div className="text-sm text-muted-foreground">مؤشر السعادة</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold">شارة التميز</div>
            <div className="text-sm text-muted-foreground">أعلى تحسن</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};