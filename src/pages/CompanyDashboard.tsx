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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <SystemHeader
            title="🏢 لوحة تحكم المنشأة"
            description="الواجهة الرسمية لإدارة نظام إدارة الموارد البشرية المتكاملة"
            icon={<Building2 className="h-12 w-12 text-white" />}
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
          <Card className="bg-card border border-border text-card-foreground shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-card-foreground" />
                <div>
                  <p className="text-muted-foreground text-sm">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold text-card-foreground">{companyStats.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-success border border-border text-success-foreground shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success-foreground" />
                <div>
                  <p className="text-success-foreground/80 text-sm">مستخدمون نشطون</p>
                  <p className="text-2xl font-bold text-success-foreground">{companyStats.activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-warning border border-border text-warning-foreground shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning-foreground" />
                <div>
                  <p className="text-warning-foreground/80 text-sm">مهام معلقة</p>
                  <p className="text-2xl font-bold text-warning-foreground">{companyStats.pendingTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary border border-border text-primary-foreground shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary-foreground" />
                <div>
                  <p className="text-primary-foreground/80 text-sm">حالة الاشتراك</p>
                  <p className="text-lg font-bold text-primary-foreground">نشط</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent border border-border text-accent-foreground shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HeadphonesIcon className="w-5 h-5 text-accent-foreground" />
                <div>
                  <p className="text-accent-foreground/80 text-sm">تذاكر الدعم</p>
                  <p className="text-2xl font-bold text-accent-foreground">{companyStats.supportTickets}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary border border-border text-secondary-foreground shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary-foreground" />
                <div>
                  <p className="text-secondary-foreground/80 text-sm">صحة النظام</p>
                  <p className="text-2xl font-bold text-secondary-foreground">{companyStats.systemHealth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <div className="bg-card backdrop-blur rounded-xl border border-border shadow-lg p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-muted p-2 rounded-lg">
              {tabsConfig.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent text-foreground"
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