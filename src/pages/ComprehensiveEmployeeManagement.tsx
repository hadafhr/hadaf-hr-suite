import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  AlertTriangle, 
  Calendar, 
  Clock,
  DollarSign,
  Building,
  BarChart3,
  ArrowLeft,
  RefreshCw,
  Download,
  Settings,
  Plug,
  Network,
  Shield,
  Banknote,
  Scale,
  Target,
  GraduationCap,
  FileBarChart,
  CalendarClock,
  Gift,
  PenTool,
  CheckSquare,
  Megaphone,
  Bot,
  User,
  Star,
  MessageSquare
} from 'lucide-react';

// Import components
import { ComprehensiveDashboard } from '@/components/dashboard/ComprehensiveDashboard';
import { SystemSettings } from '@/components/settings/SystemSettings';
import { NotificationSystem } from '@/components/NotificationSystem';
import TeamMembers from '@/components/systems/TeamMembers';
import { DepartmentsManagement } from '@/components/departments/DepartmentsManagement';
import { ComprehensiveAttendance } from '@/components/systems/ComprehensiveAttendance';
import { ComprehensiveLeaveSystem } from '@/components/leave/ComprehensiveLeaveSystem';
import { ComprehensivePayrollSystem } from '@/components/payroll/ComprehensivePayrollSystem';
import { GovernmentIntegration } from '@/components/systems/GovernmentIntegration';
import { OrganizationalDevelopment } from '@/components/systems/OrganizationalDevelopment';
import { GovernanceCompliance } from '@/components/systems/GovernanceCompliance';
import { WageProtectionSystem } from '@/components/systems/WageProtectionSystem';
import { LegalAffairs } from '@/components/systems/LegalAffairs';
import { PerformanceEvaluation } from '@/components/systems/PerformanceEvaluation';
import TrainingDevelopment from '@/components/employee/TrainingDevelopment';
import SmartHire from '@/pages/SmartHire';
import { InsuranceManagement } from '@/components/systems/InsuranceManagement';
import { RewardsIncentivesManagement } from '@/components/systems/RewardsIncentivesManagement';
import MeetingHub from '@/pages/MeetingHub';
import { ElectronicSignature } from '@/components/systems/ElectronicSignature';
import { TasksTracking } from '@/components/systems/TasksTracking';
import { CombinedRequestsNotifications } from '@/components/systems/CombinedRequestsNotifications';
import { ArtificialIntelligence } from '@/components/systems/ArtificialIntelligence';
import { Reports } from '@/components/systems/Reports';
import ComprehensiveDisciplinarySystem from '@/components/disciplinary/ComprehensiveDisciplinarySystem';
import TalentManagementDepartment from '@/components/systems/TalentManagementDepartment';

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
    
    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-[#009F87]/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <div className="relative border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-20 items-center px-6">
          {/* BOUD Logo */}
          <div className="flex items-center gap-4 ml-4">
            <BoudLogo 
              variant="full" 
              size="lg"
              className="h-12 w-auto"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4 hover:bg-[#009F87]/10"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#009F87]/10 rounded-lg">
              <Users className="h-6 w-6 text-[#009F87]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#009F87]">نظام إدارة الموظفين الشامل</h1>
              <p className="text-sm text-muted-foreground">إدارة احترافية لدورة حياة الموظف الكاملة</p>
            </div>
          </div>
          <div className="mr-auto flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-[#009F87] hover:text-white transition-colors"
            >
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث البيانات
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-[#009F87] hover:text-white transition-colors"
            >
              <Download className="h-4 w-4 ml-2" />
              تصدير التقارير
            </Button>
            <Button 
              size="sm"
              className="bg-[#009F87] hover:bg-[#008072] text-white shadow-lg hover:shadow-xl transition-all"
            >
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة موظف جديد
            </Button>
          </div>
        </div>
      </div>

      <div className="relative p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Professional Horizontal Navigation - Optimized for 22 Icons */}
          <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg p-4 mb-6">
            <div className="horizontal-icon-nav overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#009F87 transparent' }}>
              <TabsList className="flex w-max gap-3 bg-transparent p-0 h-auto min-w-max">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <BarChart3 className="h-4 w-4 ml-2 flex-shrink-0" />
                  لوحة التحكم
                </TabsTrigger>
                <TabsTrigger 
                  value="employees" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Users className="h-4 w-4 ml-2 flex-shrink-0" />
                  فريق العمل
                </TabsTrigger>
                <TabsTrigger 
                  value="departments" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Building className="h-4 w-4 ml-2 flex-shrink-0" />
                  الإدارات والاقسام
                </TabsTrigger>
                <TabsTrigger 
                  value="attendance" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Clock className="h-4 w-4 ml-2 flex-shrink-0" />
                  الحضور والانصراف
                </TabsTrigger>
                <TabsTrigger 
                  value="disciplinary" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <AlertTriangle className="h-4 w-4 ml-2 flex-shrink-0" />
                  الجزاءات والعقوبات
                </TabsTrigger>
                <TabsTrigger 
                  value="leaves" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Calendar className="h-4 w-4 ml-2 flex-shrink-0" />
                  الإجازات والعطلات
                </TabsTrigger>
                <TabsTrigger 
                  value="payroll" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <DollarSign className="h-4 w-4 ml-2 flex-shrink-0" />
                  الرواتب والأجور
                </TabsTrigger>
                <TabsTrigger 
                  value="government" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Plug className="h-4 w-4 ml-2 flex-shrink-0" />
                  التكامل والربط
                </TabsTrigger>
                <TabsTrigger 
                  value="organization" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Network className="h-4 w-4 ml-2 flex-shrink-0" />
                  التطوير والتنظيم المؤسسي
                </TabsTrigger>
                <TabsTrigger 
                  value="governance" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Shield className="h-4 w-4 ml-2 flex-shrink-0" />
                  الحوكمة والامتثال
                </TabsTrigger>
                <TabsTrigger 
                  value="wageprotection" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Banknote className="h-4 w-4 ml-2 flex-shrink-0" />
                  حماية الأجور
                </TabsTrigger>
                <TabsTrigger 
                  value="legal" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Scale className="h-4 w-4 ml-2 flex-shrink-0" />
                  الشؤون القانونية
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Target className="h-4 w-4 ml-2 flex-shrink-0" />
                  تقييم الأداء
                </TabsTrigger>
                <TabsTrigger 
                  value="training" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <GraduationCap className="h-4 w-4 ml-2 flex-shrink-0" />
                  التدريب والتطوير
                </TabsTrigger>
                <TabsTrigger 
                  value="talents" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Star className="h-4 w-4 ml-2 flex-shrink-0" />
                  إدارة المواهب
                </TabsTrigger>
                <TabsTrigger 
                  value="recruitment" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <UserPlus className="h-4 w-4 ml-2 flex-shrink-0" />
                  التوظيف والتعين
                </TabsTrigger>
                <TabsTrigger 
                  value="insurance" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Shield className="h-4 w-4 ml-2 flex-shrink-0" />
                  التأمين
                </TabsTrigger>
                <TabsTrigger 
                  value="benefits" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Gift className="h-4 w-4 ml-2 flex-shrink-0" />
                  المكافآت والحوافز
                </TabsTrigger>
                <TabsTrigger 
                  value="meetings" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <CalendarClock className="h-4 w-4 ml-2 flex-shrink-0" />
                  الاجتماعات
                </TabsTrigger>
                <TabsTrigger 
                  value="signature" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <PenTool className="h-4 w-4 ml-2 flex-shrink-0" />
                  التوقيع الإلكتروني
                </TabsTrigger>
                <TabsTrigger 
                  value="tasks" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <CheckSquare className="h-4 w-4 ml-2 flex-shrink-0" />
                  المهام والمتابعة
                </TabsTrigger>
                <TabsTrigger 
                  value="requests" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <MessageSquare className="h-4 w-4 ml-2 flex-shrink-0" />
                  الطلبات والإشعارات
                </TabsTrigger>
                <TabsTrigger 
                  value="ai" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Bot className="h-4 w-4 ml-2 flex-shrink-0" />
                  الذكاء الاصطناعي
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <FileBarChart className="h-4 w-4 ml-2 flex-shrink-0" />
                  التقارير
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center"
                >
                  <Settings className="h-4 w-4 ml-2 flex-shrink-0" />
                  الإعدادات
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Navigation Helper */}
            <div className="flex justify-center mt-2">
              <p className="text-xs text-muted-foreground">اسحب لليمين أو اليسار لعرض جميع الأنظمة (22 نظام)</p>
            </div>
          </div>

          {/* Tab Contents */}
          <TabsContent value="dashboard">
            <ComprehensiveDashboard onNavigateToSection={setActiveTab} />
          </TabsContent>

          <TabsContent value="employees">
            <TeamMembers />
          </TabsContent>

          <TabsContent value="departments">
            <DepartmentsManagement onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="attendance">
            <ComprehensiveAttendance onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="disciplinary">
            <ComprehensiveDisciplinarySystem />
          </TabsContent>

          <TabsContent value="leaves">
            <ComprehensiveLeaveSystem />
          </TabsContent>

          <TabsContent value="payroll">
            <ComprehensivePayrollSystem />
          </TabsContent>

          <TabsContent value="government">
            <GovernmentIntegration onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="organization">
            <OrganizationalDevelopment onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="governance">
            <GovernanceCompliance onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="wageprotection">
            <WageProtectionSystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="legal">
            <LegalAffairs onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceEvaluation onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="training">
            <TrainingDevelopment />
          </TabsContent>

          <TabsContent value="talents">
            <TalentManagementDepartment onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="recruitment">
            <SmartHire />
          </TabsContent>

          <TabsContent value="insurance">
            <InsuranceManagement onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="benefits">
            <RewardsIncentivesManagement onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="meetings">
            <MeetingHub />
          </TabsContent>

          <TabsContent value="signature">
            <ElectronicSignature onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="tasks">
            <TasksTracking onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="requests">
            <CombinedRequestsNotifications 
              onBack={() => setActiveTab('dashboard')} 
              onNavigateToSection={setActiveTab}
            />
          </TabsContent>

          <TabsContent value="ai">
            <ArtificialIntelligence onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="reports">
            <Reports onBack={() => setActiveTab('dashboard')} />
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
          {selectedEmployee && (
            <div className="space-y-4">
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComprehensiveEmployeeManagement;