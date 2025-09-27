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
    <div className="min-h-screen bg-black relative overflow-hidden" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-300/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-teal-200/15 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-32 right-10 w-12 h-12 border border-white/20 rotate-45 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 left-16 w-8 h-8 bg-white/10 transform rotate-12 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:32px_32px] opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-6 p-6 relative z-10 animate-fade-in">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between animate-slide-in-right">
          <SystemHeader
            title="🏢 لوحة تحكم المنشأة"
            description="الواجهة الرسمية لإدارة نظام إدارة الموارد البشرية المتكاملة"
            icon={<Building2 className="h-12 w-12 text-white" />}
            showBackButton={false}
          />
          <Button 
            onClick={handleLogout}
            variant="destructive"
            className="flex items-center gap-2 backdrop-blur-xl bg-red-600/20 border border-red-500/30 text-red-300 hover:bg-red-600/30 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-scale-in">
          <Card className="backdrop-blur-xl bg-black/20 border border-[#008C6A]/20 shadow-2xl shadow-[#008C6A]/10 hover-scale transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-400" />
                <div>
                  <p className="text-gray-400 text-sm">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold text-white">{companyStats.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-green-900/20 border border-green-500/30 shadow-2xl shadow-green-500/10 hover-scale transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-300 text-sm">مستخدمون نشطون</p>
                  <p className="text-2xl font-bold text-green-300">{companyStats.activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-yellow-900/20 border border-yellow-500/30 shadow-2xl shadow-yellow-500/10 hover-scale transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-yellow-300 text-sm">مهام معلقة</p>
                  <p className="text-2xl font-bold text-yellow-300">{companyStats.pendingTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-teal-900/20 border border-teal-400/30 shadow-2xl shadow-teal-400/10 hover-scale transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-teal-400" />
                <div>
                  <p className="text-teal-300 text-sm">حالة الاشتراك</p>
                  <p className="text-lg font-bold text-teal-300">نشط</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-blue-900/20 border border-blue-500/30 shadow-2xl shadow-blue-500/10 hover-scale transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HeadphonesIcon className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-blue-300 text-sm">تذاكر الدعم</p>
                  <p className="text-2xl font-bold text-blue-300">{companyStats.supportTickets}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-purple-900/20 border border-purple-500/30 shadow-2xl shadow-purple-500/10 hover-scale transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-purple-300 text-sm">صحة النظام</p>
                  <p className="text-2xl font-bold text-purple-300">{companyStats.systemHealth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <div className="backdrop-blur-xl bg-black/20 border border-[#008C6A]/20 shadow-2xl shadow-[#008C6A]/10 rounded-xl p-6 animate-scale-in">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-black/30 border border-[#008C6A]/30 p-2 rounded-lg">
              {tabsConfig.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-300 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-teal-600/20 text-gray-300 hover:text-white"
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