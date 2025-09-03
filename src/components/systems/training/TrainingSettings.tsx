import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings, Users, Shield, Workflow } from 'lucide-react';

const TrainingSettings = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const settingsCategories = [
    {
      title: isRTL ? 'إدارة الصلاحيات' : 'Permission Management',
      icon: Shield,
      description: isRTL ? 'تحديد صلاحيات الوصول للمستخدمين' : 'Define user access permissions'
    },
    {
      title: isRTL ? 'فئات التدريب' : 'Training Categories',
      icon: Settings,
      description: isRTL ? 'إدارة فئات ومستويات التدريب' : 'Manage training categories and levels'
    },
    {
      title: isRTL ? 'سير عمل الموافقات' : 'Approval Workflows',
      icon: Workflow,
      description: isRTL ? 'تكوين مسارات الموافقة على طلبات التدريب' : 'Configure training request approval workflows'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{isRTL ? 'الإعدادات' : 'Settings'}</h2>
        <p className="text-muted-foreground">
          {isRTL ? 'إعدادات النظام والصلاحيات' : 'System settings and permissions'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{category.description}</p>
              <Button className="w-full">
                {isRTL ? 'إدارة' : 'Manage'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'إعدادات النظام العامة' : 'General System Settings'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{isRTL ? 'التنبيهات التلقائية' : 'Automatic Notifications'}</h4>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'إرسال تنبيهات للمواعيد النهائية' : 'Send alerts for upcoming deadlines'}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{isRTL ? 'المصادقة المطلوبة' : 'Required Authentication'}</h4>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'مطالبة بالمصادقة للوصول للمحتوى' : 'Require authentication for content access'}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingSettings;