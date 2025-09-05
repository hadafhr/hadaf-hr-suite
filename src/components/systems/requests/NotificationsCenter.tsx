import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Bell, Mail, MessageSquare, Settings, Send, Eye } from 'lucide-react';

export const NotificationsCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');

  const notificationTemplates = [
    { id: 1, name: 'موافقة طلب', type: 'approval', channels: ['email', 'app'], status: 'active' },
    { id: 2, name: 'رفض طلب', type: 'rejection', channels: ['email', 'app', 'sms'], status: 'active' },
    { id: 3, name: 'تذكير معلق', type: 'reminder', channels: ['email', 'app'], status: 'draft' }
  ];

  const recentNotifications = [
    { id: 1, title: 'طلب إجازة معتمد', recipient: 'أحمد محمد', channel: 'Email', status: 'sent', time: '14:30' },
    { id: 2, title: 'تذكير طلب معلق', recipient: 'سارة أحمد', channel: 'App', status: 'delivered', time: '14:25' },
    { id: 3, title: 'طلب سلفة مرفوض', recipient: 'محمد علي', channel: 'SMS', status: 'failed', time: '14:20' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مركز الإشعارات</h2>
          <p className="text-muted-foreground">إدارة قوالب وإعدادات الإشعارات</p>
        </div>
        <Button>
          <Send className="w-4 h-4 ml-2" />
          إرسال إشعار
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Bell className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">إشعارات التطبيق</h3>
            <p className="text-2xl font-bold mt-2">1,248</p>
            <p className="text-sm text-muted-foreground">مرسلة اليوم</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Mail className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">رسائل البريد</h3>
            <p className="text-2xl font-bold mt-2">856</p>
            <p className="text-sm text-muted-foreground">مرسلة اليوم</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">رسائل SMS</h3>
            <p className="text-2xl font-bold mt-2">124</p>
            <p className="text-sm text-muted-foreground">مرسلة اليوم</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قوالب الإشعارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notificationTemplates.map(template => (
              <div key={template.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{template.name}</p>
                  <p className="text-sm text-muted-foreground">القنوات: {template.channels.join(', ')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                    {template.status === 'active' ? 'نشط' : 'مسودة'}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الإشعارات الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentNotifications.map(notification => (
              <div key={notification.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.recipient} - {notification.channel}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={notification.status === 'sent' ? 'default' : notification.status === 'failed' ? 'destructive' : 'secondary'}>
                    {notification.status === 'sent' ? 'مرسل' : notification.status === 'failed' ? 'فشل' : 'تم التسليم'}
                  </Badge>
                  <span className="text-sm">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};