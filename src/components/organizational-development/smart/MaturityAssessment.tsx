import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Users, Star } from 'lucide-react';

export const MaturityAssessment = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">قياس النضج المؤسسي</h2>
        <p className="text-muted-foreground">تقييم مستوى النضج في المجالات المختلفة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">4.2</div>
            <div className="text-sm text-muted-foreground">النضج الإجمالي</div>
            <div className="text-xs text-muted-foreground">من 5</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">+18%</div>
            <div className="text-sm text-muted-foreground">التحسن السنوي</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">مجالات التقييم</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">مجالات متقدمة</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>مستويات النضج بالمجالات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { area: 'الاستراتيجية والتخطيط', level: 4.5, description: 'متقدم' },
              { area: 'العمليات والإجراءات', level: 4.2, description: 'متقدم' },
              { area: 'الموارد البشرية', level: 4.0, description: 'جيد جداً' },
              { area: 'التقنية والرقمنة', level: 3.8, description: 'جيد جداً' },
              { area: 'إدارة المخاطر', level: 3.5, description: 'جيد' },
              { area: 'الحوكمة', level: 4.3, description: 'متقدم' },
              { area: 'الابتكار', level: 3.2, description: 'متوسط' },
              { area: 'رضا العملاء', level: 4.1, description: 'جيد جداً' }
            ].map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{area.area}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{area.level}</span>
                    <Badge variant={area.level >= 4 ? 'default' : area.level >= 3.5 ? 'secondary' : 'outline'}>
                      {area.description}
                    </Badge>
                  </div>
                </div>
                <Progress value={(area.level / 5) * 100} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};