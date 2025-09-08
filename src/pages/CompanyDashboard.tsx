import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { CompanyOverview } from '@/components/company/CompanyOverview';
import { SubscriptionManager } from '@/components/company/SubscriptionManager';
import { TechnicalSupport } from '@/components/company/TechnicalSupport';
import { UserManagement } from '@/components/company/UserManagement';
import { HRSystemManagement } from '@/components/company/HRSystemManagement';
import { 
  Building2, 
  Users, 
  CreditCard, 
  HeadphonesIcon,
  TrendingUp, 
  Activity,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  Crown
} from 'lucide-react';

export const CompanyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for company overview
  const companyStats = {
    totalEmployees: 245,
    activeUsers: 198,
    pendingTasks: 23,
    subscriptionStatus: 'active',
    supportTickets: 3,
    systemHealth: 98.5
  };

  const tabsConfig = [
    {
      id: 'dashboard',
      label: 'لوحة القيادة',
      icon: <Activity className="w-4 h-4" />,
      component: CompanyOverview
    },
    {
      id: 'subscriptions',
      label: 'إدارة الاشتراكات',
      icon: <CreditCard className="w-4 h-4" />,
      component: SubscriptionManager
    },
    {
      id: 'support',
      label: 'الدعم الفني',
      icon: <HeadphonesIcon className="w-4 h-4" />,
      component: TechnicalSupport
    },
    {
      id: 'users',
      label: 'إدارة المستخدمين',
      icon: <Users className="w-4 h-4" />,
      component: UserManagement
    },
    {
      id: 'hr-system',
      label: 'إدارة النظام',
      icon: <Settings className="w-4 h-4" />,
      component: HRSystemManagement
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="🏢 لوحة تحكم المنشأة"
          description="الواجهة الرسمية لإدارة نظام إدارة الموارد البشرية المتكاملة"
          icon={<Building2 className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold">{companyStats.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">مستخدمون نشطون</p>
                  <p className="text-2xl font-bold">{companyStats.activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">مهام معلقة</p>
                  <p className="text-2xl font-bold">{companyStats.pendingTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">حالة الاشتراك</p>
                  <p className="text-lg font-bold">نشط</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HeadphonesIcon className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">تذاكر الدعم</p>
                  <p className="text-2xl font-bold">{companyStats.supportTickets}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">صحة النظام</p>
                  <p className="text-2xl font-bold">{companyStats.systemHealth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-muted/30 p-2 rounded-lg">
              {tabsConfig.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md hover:bg-white/50"
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabsConfig.map((tab) => {
              const Component = tab.component;
              return (
                <TabsContent key={tab.id} value={tab.id} className="space-y-6 mt-6">
                  <Component />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};