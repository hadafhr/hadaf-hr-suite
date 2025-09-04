import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, FileCheck, AlertCircle, CheckCircle } from 'lucide-react';

export const GovernanceCompliance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">الحوكمة والامتثال</h2>
        <p className="text-muted-foreground">إدارة الحوكمة المؤسسية والامتثال للوائح</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-muted-foreground">مستوى الامتثال</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <FileCheck className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">السياسات النشطة</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">مخاطر متوسطة</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm text-muted-foreground">مراجعات مكتملة</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>حالة الامتثال للوائح</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { regulation: 'نظام العمل السعودي', compliance: 100, status: 'مكتمل' },
              { regulation: 'لائحة الحوكمة', compliance: 95, status: 'ممتاز' },
              { regulation: 'معايير رؤية 2030', compliance: 88, status: 'جيد' },
              { regulation: 'أنظمة ساما', compliance: 92, status: 'ممتاز' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.regulation}</span>
                  <Badge variant={item.compliance >= 95 ? 'default' : item.compliance >= 85 ? 'secondary' : 'destructive'}>
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>مستوى الامتثال</span>
                  <span>{item.compliance}%</span>
                </div>
                <Progress value={item.compliance} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};