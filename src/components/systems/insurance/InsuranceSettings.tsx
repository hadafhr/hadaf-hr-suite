import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings, Shield, Bell, Users } from 'lucide-react';

const InsuranceSettings = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`space-y-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'إعدادات النظام' : 'System Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-medium">{isRTL ? 'تفعيل الحواجز التلقائية' : 'Enable Auto Guardrails'}</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">{isRTL ? 'تنبيهات الانتهاء' : 'Expiry Notifications'}</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-green-600" />
                <span className="font-medium">{isRTL ? 'موافقات متعددة المستويات' : 'Multi-level Approvals'}</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574]">
              {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceSettings;