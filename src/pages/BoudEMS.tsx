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
import WorkforceManagement from '@/components/systems/WorkforceManagement';
import { DepartmentManagement } from '@/components/systems/DepartmentManagement';
import { DisciplinaryActions } from '@/components/systems/DisciplinaryActions';
import { LeavesHolidays } from '@/components/systems/LeavesHolidays';
import { SalariesWages } from '@/components/systems/SalariesWages';
import { GovernmentIntegration } from '@/components/systems/GovernmentIntegration';
import { OrganizationalStructure } from '@/components/systems/OrganizationalStructure';
import { WageProtectionSystem } from '@/components/systems/WageProtectionSystem';
import LegalAffairs from '@/components/systems/LegalAffairs';
import { PerformanceEvaluation } from '@/components/systems/PerformanceEvaluation';
import { Training } from '@/components/systems/Training';
import { Recruitment } from '@/components/systems/Recruitment';
import { InsuranceManagement } from '@/components/systems/InsuranceManagement';
import { RewardsIncentives } from '@/components/systems/RewardsIncentives';
import { Meetings } from '@/components/systems/Meetings';
import { ElectronicSignature } from '@/components/systems/ElectronicSignature';
import { TasksTracking } from '@/components/systems/TasksTracking';
import ArtificialIntelligence from '@/components/systems/ArtificialIntelligence';
import { RequestsNotifications } from '@/components/systems/RequestsNotifications';
import Reports from '@/components/systems/Reports';
import { useBoudEMS } from '@/hooks/useBoudEMS';

export const BoudEMS: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  const { stats, isLoading } = useBoudEMS();

  // HR Categories according to international best practices
  const hrCategories = [
    {
      id: 'strategic',
      title: isRTL ? 'القيادة والإدارة الاستراتيجية' : 'Strategic HR Management',
      icon: Shield,
      color: 'bg-blue-500',
      modules: [
        { id: 'dashboard', title: isRTL ? 'لوحة التحكم' : 'Dashboard', icon: LayoutDashboard },
        { id: 'governance', title: isRTL ? 'الحوكمة والامتثال' : 'Governance & Compliance', icon: Shield },
        { id: 'legal', title: isRTL ? 'الشؤون القانونية' : 'Legal Affairs', icon: Scale },
        { id: 'meetings', title: isRTL ? 'الاجتماعات' : 'Meetings', icon: Video },
        { id: 'esignature', title: isRTL ? 'التوقيع الإلكتروني' : 'eSignature', icon: PenTool },
        { id: 'requests', title: isRTL ? 'الطلبات والإشعارات' : 'Requests & Notifications', icon: Bell },
        { id: 'ai', title: isRTL ? 'الذكاء الاصطناعي' : 'Artificial Intelligence', icon: Brain }
      ]
    },
    {
      id: 'organizational',
      title: isRTL ? 'الهيكلة والتنظيم المؤسسي' : 'Organizational Design & Development',
      icon: Building2,
      color: 'bg-green-500',
      modules: [
        { id: 'departments', title: isRTL ? 'الإدارات والأقسام' : 'Departments & Divisions', icon: Building2 },
        { id: 'organization', title: isRTL ? 'التطوير والتنظيم المؤسسي' : 'Organizational Development', icon: Network },
        { id: 'talents', title: isRTL ? 'إدارة المواهب' : 'Talent Management', icon: Award },
        { id: 'training', title: isRTL ? 'التدريب والتطوير' : 'Training & Development', icon: BookOpen }
      ]
    },
    {
      id: 'operations',
      title: isRTL ? 'العمليات اليومية للموارد البشرية' : 'Daily HR Operations & Self Service',
      icon: Clock,
      color: 'bg-orange-500',
      modules: [
        { id: 'workforce', title: isRTL ? 'فريق العمل' : 'Workforce Directory', icon: Users },
        { id: 'attendance', title: isRTL ? 'الحضور والانصراف' : 'Attendance', icon: Clock },
        { id: 'leaves', title: isRTL ? 'الإجازات والعطلات' : 'Leaves & Holidays', icon: Calendar },
        { id: 'tasks', title: isRTL ? 'المهام والمتابعة' : 'Tasks & Tracking', icon: CheckSquare }
      ]
    },
    {
      id: 'acquisition',
      title: isRTL ? 'التوظيف والتكامل' : 'Talent Acquisition & Onboarding',
      icon: UserPlus,
      color: 'bg-purple-500',
      modules: [
        { id: 'recruitment', title: isRTL ? 'التوظيف والتعيين' : 'Recruitment & Hiring', icon: UserPlus },
        { id: 'insurance', title: isRTL ? 'التأمين' : 'Insurance Management', icon: ShieldCheck },
        { id: 'government', title: isRTL ? 'التكامل والربط' : 'Integration & APIs', icon: Globe }
      ]
    },
    {
      id: 'performance',
      title: isRTL ? 'الأداء والمكافآت' : 'Performance Management & Rewards',
      icon: Target,
      color: 'bg-red-500',
      modules: [
        { id: 'evaluation', title: isRTL ? 'تقييم الأداء' : 'Performance Review', icon: Target },
        { id: 'salaries', title: isRTL ? 'الرواتب والأجور' : 'Payroll & Compensation', icon: DollarSign },
        { id: 'rewards', title: isRTL ? 'المكافآت والحوافز' : 'Bonuses & Incentives', icon: Award },
        { id: 'wage_protection', title: isRTL ? 'حماية الأجور' : 'Wage Protection System', icon: Shield }
      ]
    },
    {
      id: 'relations',
      title: isRTL ? 'الانضباط والعلاقات العمالية' : 'Employee Relations & Disciplinary',
      icon: AlertTriangle,
      color: 'bg-yellow-500',
      modules: [
        { id: 'disciplinary', title: isRTL ? 'الجزاءات والعقوبات' : 'Penalties & Violations', icon: AlertTriangle }
      ]
    },
    {
      id: 'analytics',
      title: isRTL ? 'التحليلات والتقارير' : 'Analytics & Reports',
      icon: FileText,
      color: 'bg-indigo-500',
      modules: [
        { id: 'reports', title: isRTL ? 'التقارير' : 'Reports Center', icon: FileText }
      ]
    }
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

        {/* HR Categories Grid */}
        <div className="space-y-8">
          {hrCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className={`${category.color} p-4`}>
                  <div className="flex items-center gap-3 text-white">
                    <CategoryIcon className="h-6 w-6" />
                    <h2 className="text-xl font-bold">{category.title}</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.modules.map((module) => {
                      const Icon = module.icon;
                      return (
                        <Card 
                          key={module.id} 
                          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary group"
                          onClick={() => setActiveTab(module.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="flex flex-col items-center space-y-3">
                              <div className={`p-3 rounded-full ${category.color} text-white group-hover:scale-110 transition-transform`}>
                                <Icon className="h-6 w-6" />
                              </div>
                              <h3 className="text-xs font-semibold text-center leading-tight">
                                {module.title}
                              </h3>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
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
        {activeTab === 'evaluation' && <PerformanceEvaluation onBack={() => setActiveTab('dashboard')} />}
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
        {activeTab === 'talents' && <WorkforceManagement onBack={() => setActiveTab('dashboard')} />}
        {activeTab === 'governance' && <WorkforceManagement onBack={() => setActiveTab('dashboard')} />}
      </div>
    </div>
  );
};