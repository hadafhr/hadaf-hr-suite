import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, AlertTriangle, Calendar, Clock, DollarSign, Building, BarChart3, ArrowLeft, RefreshCw, Download, Settings, Plug, Network, Shield, Banknote, Scale, Target, GraduationCap, FileBarChart, CalendarClock, Gift, PenTool, CheckSquare, Bot, User, Star, MessageSquare, MapPin, Heart, Briefcase, MessageCircle, Users2, HardHat, Zap, Brain, Sparkles } from 'lucide-react';

// Import components
import { ComprehensiveDashboard } from '@/components/dashboard/ComprehensiveDashboard';
import { SystemSettings } from '@/components/settings/SystemSettings';
import { NotificationSystem } from '@/components/NotificationSystem';
// Team Management System
import TeamMembers from '@/components/systems/TeamMembers';
import { DepartmentsManagement } from '@/components/departments/DepartmentsManagement';
import ComprehensiveAttendance from '@/components/systems/ComprehensiveAttendance';
import { ComprehensiveLeaveManagementSystem } from '@/components/systems/ComprehensiveLeaveManagementSystem';
import { ComprehensivePayrollSystem } from '@/components/systems/ComprehensivePayrollSystem';
import { ComprehensiveIntegrationSystem } from '@/components/systems/ComprehensiveIntegrationSystem';
import { OrganizationalDevelopment } from '@/components/systems/OrganizationalDevelopment';
import { ComprehensiveGovernanceCompliance } from '@/components/systems/ComprehensiveGovernanceCompliance';
import { ComprehensiveWageProtection } from '@/components/systems/ComprehensiveWageProtection';
import { ComprehensiveLegalAffairs } from '@/components/systems/ComprehensiveLegalAffairs';
import { ComprehensiveSmartEvaluation } from '@/components/systems/ComprehensiveSmartEvaluation';
import { ComprehensiveTraining } from '@/components/systems/ComprehensiveTraining';
import SmartHire from '@/pages/SmartHire';
import { InsuranceManagement } from '@/components/systems/InsuranceManagement';
import { ComprehensiveRewardsIncentives } from '@/components/systems/ComprehensiveRewardsIncentives';
import { QualityOfLifeSystem } from '@/components/systems/QualityOfLifeSystem';
import { SkillsInventorySystem } from '@/components/systems/SkillsInventorySystem';
import { InternalCommunication } from '@/components/systems/InternalCommunication';
import { AdministrativeCommunications } from '@/components/systems/AdministrativeCommunications';
import { OccupationalSafety } from '@/components/systems/OccupationalSafety';
import SocialServices from '@/components/systems/SocialServices';
import MeetingHub from '@/pages/MeetingHub';
import { ElectronicSignature } from '@/components/systems/ElectronicSignature';
import { TasksTracking } from '@/components/systems/TasksTracking';
import { CombinedRequestsNotifications } from '@/components/systems/CombinedRequestsNotifications';
import ArtificialIntelligence from '@/components/systems/ArtificialIntelligence';
import Reports from '@/components/systems/Reports';
import ComprehensiveDisciplinarySystem from '@/components/disciplinary/ComprehensiveDisciplinarySystem';
import { ComprehensiveTalentManagement } from '@/components/systems/ComprehensiveTalentManagement';
import { ComprehensiveFieldTracking } from '@/components/systems/ComprehensiveFieldTracking';
import { ComprehensiveTasksFollowup } from '@/components/systems/ComprehensiveTasksFollowup';
import { OccupationalHealthSafety } from '@/components/systems/OccupationalHealthSafety';
import TeamWork from '@/components/systems/TeamWork';
import EmployeeServicesDepartment from '@/pages/EmployeeServicesDepartment';
import { EmployeeMovementsSystem } from '@/components/systems/EmployeeMovementsSystem';
const ComprehensiveEmployeeManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);

  // Mock employee data
  const mockEmployee = {
    id: 'EMP001',
    name: 'أحمد محمد العلي',
    position: 'مطور برمجيات أول',
    department: 'تقنية المعلومات',
    status: 'نشط',
    joinDate: '2023-01-15',
    email: 'ahmed.ali@company.com',
    phone: '+966501234567',
    avatar: '/placeholder.svg',
    salary: {
      basic: 12000,
      housing: 2000,
      transport: 800,
      total: 15300
    }
  };
  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsViewEmployeeOpen(true);
  };
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'نشط': 'bg-green-100 text-green-800 border-green-200',
      'في إجازة': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'متوقف': 'bg-red-100 text-red-800 border-red-200',
      'منتهي الخدمة': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return <Badge className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>;
  };
  return <div className="min-h-screen bg-white" dir="rtl">
      {/* خلفية احترافية متحركة بألوان الهوية البصرية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/8 to-primary/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-muted/15 to-primary/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-muted/20 rounded-full blur-lg animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-primary/8 rounded-full blur-md animate-pulse"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* الشريط العلوي الاحترافي */}
        <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft border border-border/20 animate-fade-in">
          <div className="flex items-center gap-6">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="border-muted-foreground/20 text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 px-4 py-2">
              <ArrowLeft className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="h-8 w-px bg-border/30"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                <Users className="h-8 w-8 text-white relative z-10" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  نظام إدارة الموظفين الشامل
                </h1>
                <p className="text-muted-foreground text-lg">
                  النظام الشامل والمتقدم لإدارة الموظفين والفرق
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 ml-2" />
              نظام متطور
            </Badge>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white shadow-glow hover:shadow-strong transition-all duration-300 px-6 py-2">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>

        <div className="relative p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Professional Grid Navigation - All Tabs Visible */}
          <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg p-4 mb-6">
            {/* Control Icons for Tab Organization */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="ترتيب الأيقونات">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="إعادة ترتيب">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="نقل لليمين">
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="نقل لليسار">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" onClick={() => setActiveTab('dashboard')}>
                  <BarChart3 className="h-3 w-3 ml-1" />
                  لوحة التحكم
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" onClick={() => setActiveTab('settings')}>
                  <Settings className="h-3 w-3 ml-1" />
                  الإعدادات العامة
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors">
                  <Download className="h-3 w-3 ml-1" />
                  حفظ التخطيط
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors">
                  <Settings className="h-3 w-3 ml-1" />
                  تخصيص
                </Button>
              </div>
            </div>
            
            <div className="w-full">
              <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 bg-transparent p-0 h-auto w-full">
                <TabsTrigger value="teamwork" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Users2 className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم فريق العمل</span>
                </TabsTrigger>
                <TabsTrigger value="departments" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Building className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم الإدارات والوحدات</span>
                </TabsTrigger>
                <TabsTrigger value="quality-of-life" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Heart className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم جودة الحياة</span>
                </TabsTrigger>
                <TabsTrigger value="skills-inventory" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Briefcase className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم مخزون المهارات</span>
                </TabsTrigger>
                <TabsTrigger value="internal-communication" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Users2 className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم التواصل الداخلي</span>
                </TabsTrigger>
                <TabsTrigger value="admin-communications" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <MessageCircle className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الاتصالات الادارية</span>
                </TabsTrigger>
                <TabsTrigger value="occupational-safety" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <HardHat className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم السلامة المهنية</span>
                </TabsTrigger>
                <TabsTrigger value="social-services" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Heart className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الخدمات الاجتماعية</span>
                </TabsTrigger>
                <TabsTrigger value="attendance" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Clock className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الحضور والانصراف</span>
                </TabsTrigger>
                <TabsTrigger value="employee-services" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <User className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم خدمات الموظفين</span>
                </TabsTrigger>
                <TabsTrigger value="disciplinary" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الجزاءات والعقوبات</span>
                </TabsTrigger>
                <TabsTrigger value="leaves" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Calendar className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الإجازات </span>
                </TabsTrigger>
                <TabsTrigger value="payroll" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <DollarSign className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الرواتب والأجور</span>
                </TabsTrigger>
                <TabsTrigger value="government" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Plug className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم التكامل والربط</span>
                </TabsTrigger>
                <TabsTrigger value="organization" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Network className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم التطوير المؤسسي</span>
                </TabsTrigger>
                <TabsTrigger value="governance" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Shield className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الحوكمة والامتثال</span>
                </TabsTrigger>
                <TabsTrigger value="wageprotection" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Banknote className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم حماية الأجور</span>
                </TabsTrigger>
                <TabsTrigger value="legal" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Scale className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الشؤون القانونية</span>
                </TabsTrigger>
                <TabsTrigger value="performance" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Target className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم تقييم الأداء</span>
                </TabsTrigger>
                <TabsTrigger value="training" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <GraduationCap className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم التدريب والتأهيل</span>
                </TabsTrigger>
                <TabsTrigger value="talents" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Star className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم إدارة المواهب</span>
                </TabsTrigger>
                <TabsTrigger value="recruitment" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <UserPlus className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم التوظيف والتعين</span>
                </TabsTrigger>
                <TabsTrigger value="insurance" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Shield className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم التأمين</span>
                </TabsTrigger>
                <TabsTrigger value="benefits" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Gift className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110 bg-black rounded-sm" />
                  <span className="text-center leading-tight"> قسم المكافآت والحوافز</span>
                </TabsTrigger>
                <TabsTrigger value="meetings" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <CalendarClock className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الاجتماعات</span>
                </TabsTrigger>
                <TabsTrigger value="signature" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <PenTool className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم التوقيع الإلكتروني</span>
                </TabsTrigger>
                <TabsTrigger value="tasks" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <CheckSquare className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم المهام والمتابعة</span>
                </TabsTrigger>
                <TabsTrigger value="requests" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <MessageSquare className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الطلبات والإشعارات</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <Bot className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الذكاء الاصطناعي</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <FileBarChart className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم التقارير الشاملة</span>
                </TabsTrigger>
                <TabsTrigger value="tracking" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <MapPin className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم التتبع الميداني</span>
                </TabsTrigger>
                <TabsTrigger value="movements" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg">
                  <RefreshCw className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight"> قسم الحركة والتنقلات</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab Contents */}
          <TabsContent value="dashboard">
            <ComprehensiveDashboard onNavigateToSection={setActiveTab} />
          </TabsContent>


          <TabsContent value="teamwork">
            <TeamWork />
          </TabsContent>

          <TabsContent value="departments">
            <DepartmentsManagement onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="quality-of-life">
            <QualityOfLifeSystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="skills-inventory">
            <SkillsInventorySystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="internal-communication">
            <InternalCommunication onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="admin-communications">
            <AdministrativeCommunications onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="occupational-safety">
            <OccupationalHealthSafety onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="social-services">
            <SocialServices />
          </TabsContent>

          <TabsContent value="attendance">
            <ComprehensiveAttendance onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="employee-services">
            <EmployeeServicesDepartment />
          </TabsContent>

          <TabsContent value="disciplinary">
            <ComprehensiveDisciplinarySystem />
          </TabsContent>

          <TabsContent value="leaves">
            <ComprehensiveLeaveManagementSystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="payroll">
            <ComprehensivePayrollSystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="government">
            <ComprehensiveIntegrationSystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="organization">
            <OrganizationalDevelopment onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="governance">
            <ComprehensiveGovernanceCompliance onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="wageprotection">
            <ComprehensiveWageProtection onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="legal">
            <ComprehensiveLegalAffairs onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="performance">
            <ComprehensiveSmartEvaluation onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="training">
            <ComprehensiveTraining onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="talents">
            <ComprehensiveTalentManagement onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="recruitment">
            <SmartHire />
          </TabsContent>

          <TabsContent value="insurance">
            <InsuranceManagement onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="benefits">
            <ComprehensiveRewardsIncentives onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="meetings">
            <MeetingHub />
          </TabsContent>

          <TabsContent value="signature">
            <ElectronicSignature onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="tasks">
            <ComprehensiveTasksFollowup onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="requests">
            <CombinedRequestsNotifications onBack={() => setActiveTab('dashboard')} onNavigateToSection={setActiveTab} />
          </TabsContent>

          <TabsContent value="ai">
            <ArtificialIntelligence onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="reports">
            <Reports onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

              <TabsContent value="tracking">
                <ComprehensiveFieldTracking onBack={() => setActiveTab('dashboard')} />
              </TabsContent>

              <TabsContent value="movements">
                <EmployeeMovementsSystem onBack={() => setActiveTab('dashboard')} />
              </TabsContent>

          <TabsContent value="settings">
            <SystemSettings onBack={() => setActiveTab('dashboard')} />
          </TabsContent>
          </Tabs>
        </div>

        {/* Employee Details Dialog */}
        <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-[#009F87]">
              <User className="h-6 w-6" />
              تفاصيل الموظف
            </DialogTitle>
          </DialogHeader>
          {selectedEmployee && <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedEmployee.avatar} />
                  <AvatarFallback>{selectedEmployee.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground">{selectedEmployee.position} - {selectedEmployee.department}</p>
                  {getStatusBadge(selectedEmployee.status)}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>المعلومات الأساسية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">رقم الموظف:</span>
                        <span className="font-medium">{selectedEmployee.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">البريد الإلكتروني:</span>
                        <span className="font-medium">{selectedEmployee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الهاتف:</span>
                        <span className="font-medium">{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">تاريخ التوظيف:</span>
                        <span className="font-medium">{selectedEmployee.joinDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>معلومات الراتب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الراتب الأساسي:</span>
                        <span className="font-medium">{selectedEmployee.salary?.basic?.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">بدل السكن:</span>
                        <span className="font-medium">{selectedEmployee.salary?.housing?.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">بدل النقل:</span>
                        <span className="font-medium">{selectedEmployee.salary?.transport?.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>إجمالي الراتب:</span>
                        <span>{selectedEmployee.salary?.total?.toLocaleString()} ريال</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>}
        </DialogContent>
        </Dialog>
      </div>
    </div>;
};
export default ComprehensiveEmployeeManagement;