import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Shield, Lock, Eye, AlertTriangle, CheckCircle, Key } from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { PatternBackground } from '@/components/PatternBackground';
import { 
  User,
  LogOut,
  ChevronDown,
  Crown,
  Settings
} from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { signOut, user } = useAuth();
  const isArabic = i18n.language === 'ar';

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: false,
    sessionTimeout: true,
    ipWhitelisting: false,
    auditLogging: true,
    encryptionAtRest: true
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  const securityMetrics = [
    { 
      label: isArabic ? 'التهديدات المحجوبة' : 'Blocked Threats', 
      value: '1,247', 
      icon: Shield, 
      color: 'text-green-500'
    },
    { 
      label: isArabic ? 'محاولات تسجيل الدخول' : 'Login Attempts', 
      value: '8,453', 
      icon: Lock, 
      color: 'text-blue-500'
    },
    { 
      label: isArabic ? 'الأنشطة المشبوهة' : 'Suspicious Activities', 
      value: '23', 
      icon: Eye, 
      color: 'text-orange-500'
    },
    { 
      label: isArabic ? 'مستوى الأمان' : 'Security Level', 
      value: '98%', 
      icon: CheckCircle, 
      color: 'text-green-500'
    }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: 'warning',
      title: isArabic ? 'محاولة دخول مشبوهة' : 'Suspicious Login Attempt',
      description: isArabic ? 'محاولة دخول من IP غير معروف' : 'Login attempt from unknown IP',
      time: '2 min ago',
      urgent: true
    },
    {
      id: 2,
      type: 'success',
      title: isArabic ? 'تم تحديث كلمة المرور' : 'Password Updated',
      description: isArabic ? 'تم تحديث كلمة مرور المستخدم بنجاح' : 'User password updated successfully',
      time: '1 hour ago',
      urgent: false
    },
    {
      id: 3,
      type: 'info',
      title: isArabic ? 'فحص أمني مجدول' : 'Scheduled Security Scan',
      description: isArabic ? 'سيتم إجراء فحص أمني في منتصف الليل' : 'Security scan will run at midnight',
      time: '3 hours ago',
      urgent: false
    }
  ];

  const handleSettingChange = (setting: string, value: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border h-16 flex items-center justify-between px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {isArabic ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </Button>
          <div className="flex items-center gap-3 mr-6">
            <BoudLogo variant="icon" size="md" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">
                {isArabic ? 'إعدادات الأمان' : 'Security Settings'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'إدارة الأمان والحماية للنظام' : 'System Security and Protection Management'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Crown className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                {isArabic ? 'الملف الشخصي' : 'Admin Profile'}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                {isArabic ? 'إعدادات النظام' : 'System Settings'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {isArabic ? 'تسجيل الخروج' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => (
              <Card key={index} className="p-6 backdrop-blur-sm bg-background/80 border border-border/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Security Settings */}
            <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {isArabic ? 'إعدادات الأمان' : 'Security Settings'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {isArabic ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? 'طبقة إضافية من الحماية' : 'Additional layer of protection'}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(value) => handleSettingChange('twoFactorAuth', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {isArabic ? 'انتهاء صلاحية كلمة المرور' : 'Password Expiry'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? 'إجبار تغيير كلمة المرور دورياً' : 'Force periodic password changes'}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordExpiry}
                    onCheckedChange={(value) => handleSettingChange('passwordExpiry', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {isArabic ? 'انتهاء الجلسة' : 'Session Timeout'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? 'إنهاء الجلسات غير النشطة تلقائياً' : 'Auto-logout inactive sessions'}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.sessionTimeout}
                    onCheckedChange={(value) => handleSettingChange('sessionTimeout', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Security Alerts */}
            <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                {isArabic ? 'تنبيهات الأمان' : 'Security Alerts'}
              </h3>
              <div className="space-y-3">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border border-border/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'warning' ? 'bg-orange-500' :
                        alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground text-sm">{alert.title}</h4>
                          {alert.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              {isArabic ? 'عاجل' : 'Urgent'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{alert.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};