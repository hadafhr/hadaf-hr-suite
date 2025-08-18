import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, Users, Building2, Clock, AlertTriangle, Calendar, 
  DollarSign, Globe, Network, Shield, Scale, Target, BookOpen, 
  UserPlus, ShieldCheck, Award, Video, PenTool, CheckSquare, 
  Bell, Brain, FileText, TrendingUp
} from 'lucide-react';
import { BoudEmployeeManagement } from '@/components/BoudEmployeeManagement';
import { BoudCompanyManagement } from '@/components/BoudCompanyManagement';
import { BoudAttendanceSystem } from '@/components/BoudAttendanceSystem';
import { BoudPayrollSystem } from '@/components/BoudPayrollSystem';
import BoudDashboard from '@/components/BoudDashboard';
import { WorkforceManagement } from '@/components/systems/WorkforceManagement';
import { DepartmentManagement } from '@/components/systems/DepartmentManagement';
import { DisciplinaryActions } from '@/components/systems/DisciplinaryActions';
import { LeavesHolidays } from '@/components/systems/LeavesHolidays';
import { SalariesWages } from '@/components/systems/SalariesWages';
import { GovernmentIntegration } from '@/components/systems/GovernmentIntegration';
import { OrganizationalStructure } from '@/components/systems/OrganizationalStructure';
import { WageProtectionSystem } from '@/components/systems/WageProtectionSystem';
import { LegalAffairs } from '@/components/systems/LegalAffairs';
import { PerformanceEvaluation } from '@/components/systems/PerformanceEvaluation';
import { Training } from '@/components/systems/Training';
import { Recruitment } from '@/components/systems/Recruitment';
import { InsuranceManagement } from '@/components/systems/InsuranceManagement';
import { RewardsIncentives } from '@/components/systems/RewardsIncentives';
import { Meetings } from '@/components/systems/Meetings';
import { ElectronicSignature } from '@/components/systems/ElectronicSignature';
import { TasksTracking } from '@/components/systems/TasksTracking';
import { ArtificialIntelligence } from '@/components/systems/ArtificialIntelligence';
import { RequestsNotifications } from '@/components/systems/RequestsNotifications';
import { Reports } from '@/components/systems/Reports';
import { useBoudEMS } from '@/hooks/useBoudEMS';

export const BoudEMS: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  const { stats, isLoading } = useBoudEMS();

  const systemModules = [
    { id: 'dashboard', title: isRTL ? 'لوحة التحكم' : 'Dashboard', icon: LayoutDashboard },
    { id: 'workforce', title: isRTL ? 'القوى العاملة' : 'Workforce', icon: Users },
    { id: 'departments', title: isRTL ? 'الأقسام' : 'Departments', icon: Building2 },
    { id: 'attendance', title: isRTL ? 'الحضور' : 'Attendance', icon: Clock },
    { id: 'disciplinary', title: isRTL ? 'الإجراءات التأديبية' : 'Disciplinary Actions', icon: AlertTriangle },
    { id: 'leaves', title: isRTL ? 'الإجازات والعطل' : 'Leaves & Holidays', icon: Calendar },
    { id: 'salaries', title: isRTL ? 'الرواتب والأجور' : 'Salaries & Wages', icon: DollarSign },
    { id: 'government', title: isRTL ? 'التكامل الحكومي' : 'Government Integration', icon: Globe },
    { id: 'organization', title: isRTL ? 'الهيكل التنظيمي' : 'Organizational Structure', icon: Network },
    { id: 'wage_protection', title: isRTL ? 'نظام حماية الأجور' : 'Wage Protection System', icon: Shield },
    { id: 'legal', title: isRTL ? 'الشؤون القانونية' : 'Legal Affairs', icon: Scale },
    { id: 'performance', title: isRTL ? 'تقييم الأداء' : 'Performance Evaluation', icon: Target },
    { id: 'training', title: isRTL ? 'التدريب والتطوير' : 'Training & Development', icon: BookOpen },
    { id: 'recruitment', title: isRTL ? 'التوظيف والتعيين' : 'Recruitment & Hiring', icon: UserPlus },
    { id: 'insurance', title: isRTL ? 'التأمين' : 'Insurance', icon: ShieldCheck },
    { id: 'rewards', title: isRTL ? 'المكافآت والحوافز' : 'Rewards & Incentives', icon: Award },
    { id: 'meetings', title: isRTL ? 'الاجتماعات' : 'Meetings', icon: Video },
    { id: 'esignature', title: isRTL ? 'التوقيع الإلكتروني' : 'eSignature', icon: PenTool },
    { id: 'tasks', title: isRTL ? 'المهام والتتبع' : 'Tasks & Tracking', icon: CheckSquare },
    { id: 'requests', title: isRTL ? 'الطلبات والإشعارات' : 'Requests & Notifications', icon: Bell },
    { id: 'ai', title: isRTL ? 'الذكاء الاصطناعي' : 'Artificial Intelligence', icon: Brain },
    { id: 'reports', title: isRTL ? 'التقارير' : 'Reports', icon: FileText }
  ];

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

        {/* System Modules Grid */}
        <div className="grid grid-cols-11 gap-4">
          {systemModules.map((module) => {
            const Icon = module.icon;
            return (
              <Card 
                key={module.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary"
                onClick={() => setActiveTab(module.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 rounded-full bg-white border-2 border-gray-200 shadow-sm">
                      <Icon className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-sm font-semibold text-center leading-tight">
                      {module.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Module Content */}
        {activeTab === 'dashboard' && <BoudDashboard />}
        {activeTab === 'workforce' && <WorkforceManagement onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'departments' && <DepartmentManagement onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'attendance' && <BoudAttendanceSystem />}
        {activeTab === 'disciplinary' && <DisciplinaryActions onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'leaves' && <LeavesHolidays onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'salaries' && <SalariesWages onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'government' && <GovernmentIntegration onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'organization' && <OrganizationalStructure onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'wage_protection' && <WageProtectionSystem onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'legal' && <LegalAffairs onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'performance' && <PerformanceEvaluation onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'training' && <Training onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'recruitment' && <Recruitment onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'insurance' && <InsuranceManagement onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'rewards' && <RewardsIncentives onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'meetings' && <Meetings onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'esignature' && <ElectronicSignature onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'tasks' && <TasksTracking onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'requests' && <RequestsNotifications onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'ai' && <ArtificialIntelligence onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'reports' && <Reports onBack={() => setActiveTab('dashboard')} />}
      </div>
    </div>
  );
};