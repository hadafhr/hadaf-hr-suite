import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Calendar, TrendingUp, UserPlus, FileText, Clock, Target } from 'lucide-react';
import { BoudEmployeeManagement } from '@/components/BoudEmployeeManagement';
import { BoudCompanyManagement } from '@/components/BoudCompanyManagement';
import { BoudAttendanceSystem } from '@/components/BoudAttendanceSystem';
import { BoudPayrollSystem } from '@/components/BoudPayrollSystem';
import BoudDashboard from '@/components/BoudDashboard';
import { useBoudEMS } from '@/hooks/useBoudEMS';

export const BoudEMS: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { stats, isLoading } = useBoudEMS();

  const dashboardCards = [
    {
      title: 'إجمالي الموظفين',
      value: stats?.totalEmployees || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'الشركات النشطة',
      value: stats?.activeCompanies || 0,
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'الحضور اليوم',
      value: stats?.todayAttendance || 0,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'نمو الموظفين',
      value: `${stats?.employeeGrowth || 0}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const quickActions = [
    { title: 'إضافة موظف جديد', icon: UserPlus, action: () => setActiveTab('employees') },
    { title: 'إنشاء تقرير', icon: FileText, action: () => setActiveTab('reports') },
    { title: 'مراجعة الحضور', icon: Clock, action: () => setActiveTab('attendance') },
    { title: 'إدارة الأهداف', icon: Target, action: () => setActiveTab('performance') }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            نظام إدارة الموظفين - بود
          </h1>
          <p className="text-muted-foreground">
            لوحة تحكم شاملة لإدارة الموارد البشرية والموظفين
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="employees">الموظفين</TabsTrigger>
            <TabsTrigger value="companies">الشركات</TabsTrigger>
            <TabsTrigger value="attendance">الحضور</TabsTrigger>
            <TabsTrigger value="payroll">الرواتب</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <BoudDashboard />
          </TabsContent>

          <TabsContent value="employees">
            <BoudEmployeeManagement />
          </TabsContent>

          <TabsContent value="companies">
            <BoudCompanyManagement />
          </TabsContent>

          <TabsContent value="attendance">
            <BoudAttendanceSystem />
          </TabsContent>

          <TabsContent value="payroll">
            <BoudPayrollSystem />
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>التقارير والإحصائيات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  قريباً - نظام التقارير الشامل
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};