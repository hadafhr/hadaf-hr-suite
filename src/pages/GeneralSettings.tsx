import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Settings, 
  Building2,
  Users,
  CreditCard,
  Bell,
  Shield,
  Cog,
  BarChart3,
  Trophy,
  Target,
  Save,
  Download,
  Upload
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { AccountIdentitySettings } from '@/components/settings/AccountIdentitySettings';
import { UserManagementPermissions } from '@/components/settings/UserManagementPermissions';
import { SubscriptionsBilling } from '@/components/settings/SubscriptionsBilling';
import { NotificationsAlerts } from '@/components/settings/NotificationsAlerts';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { AdditionalSettings } from '@/components/settings/AdditionalSettings';
import { ConsolidatedReports } from '@/components/settings/ConsolidatedReports';
import { LeaderboardGamification } from '@/components/settings/LeaderboardGamification';
import { ChallengesSystem } from '@/components/settings/ChallengesSystem';

export const GeneralSettings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('account');
  const isRTL = i18n.language === 'ar';

  const handleGoBack = () => {
    console.log('Going back...');
  };

  const handleSaveSettings = () => {
    console.log('Saving settings...');
  };

  const handleExportSettings = () => {
    console.log('Exporting settings...');
  };

  const handleImportSettings = () => {
    console.log('Importing settings...');
  };

  const tabs = [
    {
      id: 'account',
      label: isRTL ? 'الهوية والحساب' : 'Account & Identity',
      icon: Building2,
      component: AccountIdentitySettings
    },
    {
      id: 'users',
      label: isRTL ? 'المستخدمين والصلاحيات' : 'Users & Permissions',
      icon: Users,
      component: UserManagementPermissions
    },
    {
      id: 'subscriptions',
      label: isRTL ? 'الاشتراكات والفواتير' : 'Subscriptions & Billing',
      icon: CreditCard,
      component: SubscriptionsBilling
    },
    {
      id: 'notifications',
      label: isRTL ? 'الإشعارات والتنبيهات' : 'Notifications & Alerts',
      icon: Bell,
      component: NotificationsAlerts
    },
    {
      id: 'security',
      label: isRTL ? 'إعدادات الأمان' : 'Security Settings',
      icon: Shield,
      component: SecuritySettings
    },
    {
      id: 'additional',
      label: isRTL ? 'إعدادات إضافية' : 'Additional Settings',
      icon: Cog,
      component: AdditionalSettings
    },
    {
      id: 'reports',
      label: isRTL ? 'التقارير المجمعة' : 'Consolidated Reports',
      icon: BarChart3,
      component: ConsolidatedReports
    },
    {
      id: 'leaderboard',
      label: isRTL ? 'لوحة المتصدرين' : 'Leaderboard',
      icon: Trophy,
      component: LeaderboardGamification
    },
    {
      id: 'challenges',
      label: isRTL ? 'التحديات' : 'Challenges',
      icon: Target,
      component: ChallengesSystem
    }
  ];

  const customButtons = (
    <div className="flex items-center gap-2">
      <Button onClick={handleSaveSettings} className="gap-2">
        <Save className="w-4 h-4" />
        {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
      </Button>
      <Button onClick={handleExportSettings} variant="outline" className="gap-2">
        <Download className="w-4 h-4" />
        {isRTL ? 'تصدير الإعدادات' : 'Export Settings'}
      </Button>
      <Button onClick={handleImportSettings} variant="outline" className="gap-2">
        <Upload className="w-4 h-4" />
        {isRTL ? 'استيراد الإعدادات' : 'Import Settings'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <SystemHeader
        title={isRTL ? 'الإعدادات العامة' : 'General Settings'}
        description={isRTL ? 'إدارة جميع إعدادات النظام والمنشآت مع دعم الفروع والتقارير المجمعة' : 'Manage all system and organization settings with multi-branch support and consolidated reports'}
        icon={<Settings className="w-6 h-6" />}
        onBack={handleGoBack}
        showBackButton={true}
        customButtons={customButtons}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tabs Navigation */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-border/40 mb-6 p-1">
              <TabsList className={`grid w-full ${tabs.length === 9 ? 'grid-cols-9' : 'grid-cols-4'} bg-transparent gap-1`}>
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-accent/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline truncate">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Tabs Content */}
            {tabs.map((tab) => {
              const ComponentToRender = tab.component;
              return (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <div className="animate-fade-in">
                    <ComponentToRender />
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="fixed bottom-6 left-6 z-50">
        <LanguageSwitcher />
      </div>
    </div>
  );
};