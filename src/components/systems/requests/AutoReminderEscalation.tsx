import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, AlertTriangle, Bell, Settings, Plus } from 'lucide-react';

export const AutoReminderEscalation: React.FC = () => {
  const [selectedRequestType, setSelectedRequestType] = useState('leave');

  const slaSettings = [
    { type: 'إجازة سنوية', sla: '48 ساعة', reminder1: '25%', reminder2: '50%', escalation: '90%', enabled: true },
    { type: 'بدل إقامة', sla: '72 ساعة', reminder1: '25%', reminder2: '50%', escalation: '90%', enabled: true },
    { type: 'سلفة راتب', sla: '24 ساعة', reminder1: '25%', reminder2: '50%', escalation: '90%', enabled: true },
    { type: 'وثيقة رسمية', sla: '24 ساعة', reminder1: '25%', reminder2: '50%', escalation: '90%', enabled: false }
  ];

  const escalationMatrix = [
    { level: 1, title: 'المستوى الأول', target: 'مدير المدير', condition: '100% من SLA', action: 'تذكير + إشعار' },
    { level: 2, title: 'المستوى الثاني', target: 'الإدارة العليا', condition: '200% من SLA', action: 'تصعيد + مهمة جديدة' },
    { level: 3, title: 'المستوى الثالث', target: 'المدير التنفيذي', condition: 'الطلبات الحرجة', action: 'تدخل فوري' }
  ];

  const activeReminders = [
    { id: 'REM-001', request: 'REQ-2024-001', type: 'إجازة سنوية', employee: 'أحمد محمد', stage: 'تذكير ثاني', timeLeft: '4 ساعات' },
    { id: 'REM-002', request: 'REQ-2024-003', type: 'سلفة راتب', employee: 'محمد علي', stage: 'تصعيد أول', timeLeft: 'متجاوز' },
    { id: 'REM-003', request: 'REQ-2024-005', type: 'بدل إقامة', employee: 'سارة أحمد', stage: 'تذكير أول', timeLeft: '12 ساعة' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">التذكير والتصعيد التلقائي</h2>
          <p className="text-muted-foreground">إدارة SLA والتذكيرات التلقائية وقواعد التصعيد</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          قاعدة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">تذكيرات نشطة</h3>
            <p className="text-2xl font-bold mt-2">15</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <h3 className="font-medium">طلبات متجاوزة</h3>
            <p className="text-2xl font-bold mt-2">7</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Bell className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <h3 className="font-medium">تصعيدات اليوم</h3>
            <p className="text-2xl font-bold mt-2">3</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إعدادات SLA والتذكير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {slaSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <Switch checked={setting.enabled} />
                  <div>
                    <p className="font-medium">{setting.type}</p>
                    <p className="text-sm text-muted-foreground">SLA: {setting.sla}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span>تذكير: {setting.reminder1}, {setting.reminder2}</span>
                    <span className="mx-2">|</span>
                    <span>تصعيد: {setting.escalation}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>مصفوفة التصعيد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {escalationMatrix.map((level, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{level.title}</p>
                  <p className="text-sm text-muted-foreground">{level.target} - {level.condition}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>{level.action}</Badge>
                  <Button variant="outline" size="sm">تعديل</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>التذكيرات النشطة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeReminders.map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{reminder.request} - {reminder.type}</p>
                  <p className="text-sm text-muted-foreground">{reminder.employee}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={reminder.timeLeft === 'متجاوز' ? 'destructive' : 'default'}>
                    {reminder.stage}
                  </Badge>
                  <span className="text-sm">{reminder.timeLeft}</span>
                  <Button variant="outline" size="sm">إجراء</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};