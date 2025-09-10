import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { FileText, Plus, Edit, Eye, Copy, User, CheckCircle } from 'lucide-react';

export const ApplicationForm = () => {
  const [templates] = useState([
    {
      id: '1',
      name: 'نموذج التقديم الأساسي',
      description: 'نموذج بسيط يحتوي على الحقول الأساسية',
      isDefault: true,
      isActive: true,
      submissionCount: 245,
      fieldCount: 5
    },
    {
      id: '2',
      name: 'نموذج التقديم المتقدم',
      description: 'نموذج شامل مع حقول تفصيلية',
      isDefault: false,
      isActive: true,
      submissionCount: 123,
      fieldCount: 10
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">النماذج النشطة</p>
                <p className="text-2xl font-bold text-blue-600">
                  {templates.filter(t => t.isActive).length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-green-600">368</p>
              </div>
              <User className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            نماذج التقديم
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              نموذج جديد
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{template.name}</h4>
                      {template.isDefault && <Badge variant="outline">افتراضي</Badge>}
                      <Badge variant={template.isActive ? 'default' : 'secondary'}>
                        {template.isActive ? 'نشط' : 'متوقف'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                      <span>{template.submissionCount} طلب</span>
                      <span>{template.fieldCount} حقل</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Switch checked={template.isActive} />
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};