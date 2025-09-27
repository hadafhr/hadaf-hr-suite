import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

import { useAuth } from '@/hooks/useAuth';
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
  Crown,
  LogOut
} from 'lucide-react';

export const CompanyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

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
      label: 'إدارة الموارد البشرية',
      icon: <Building2 className="w-4 h-4" />,
      component: HRSystemManagement
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <SystemHeader
            title="🏢 لوحة تحكم المنشأة"
            description="الواجهة الرسمية لإدارة نظام إدارة الموارد البشرية المتكاملة"
            icon={<Building2 className="h-12 w-12" />}
            showBackButton={false}
          />
          <Button 
            onClick={handleLogout}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold">{companyStats.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">مستخدمون نشطون</p>
                  <p className="text-2xl font-bold text-green-600">{companyStats.activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">مهام معلقة</p>
                  <p className="text-2xl font-bold text-yellow-600">{companyStats.pendingTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">حالة الاشتراك</p>
                  <p className="text-lg font-bold text-purple-600">نشط</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <HeadphonesIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">تذاكر الدعم</p>
                  <p className="text-2xl font-bold text-orange-600">{companyStats.supportTickets}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">صحة النظام</p>
                  <p className="text-2xl font-bold text-indigo-600">{companyStats.systemHealth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                {tabsConfig.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-300"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};