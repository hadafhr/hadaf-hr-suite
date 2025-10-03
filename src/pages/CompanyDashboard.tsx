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
    navigate('/admin-login');
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
    </div>
  );
};