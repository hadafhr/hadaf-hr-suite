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
  MessageSquare,
  MapPin,
  Heart,
  Briefcase,
  MessageCircle,
  Users2,
  HardHat
} from 'lucide-react';

// Import components
import { ComprehensiveDashboard } from '@/components/dashboard/ComprehensiveDashboard';
import { SystemSettings } from '@/components/settings/SystemSettings';
import { NotificationSystem } from '@/components/NotificationSystem';
import { TeamMembers } from '@/components/systems/TeamMembers';
import { DepartmentsManagement } from '@/components/departments/DepartmentsManagement';
import ComprehensiveAttendance from '@/components/systems/ComprehensiveAttendance';
import { ComprehensiveLeaveSystem } from '@/components/leave/ComprehensiveLeaveSystem';
import { ComprehensivePayrollSystem } from '@/components/payroll/ComprehensivePayrollSystem';
import { GovernmentIntegration } from '@/components/systems/GovernmentIntegration';
import OrganizationalDevelopment from '@/components/systems/OrganizationalDevelopment';
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
import OccupationalSafety from '@/components/systems/OccupationalSafety';
import SocialServices from '@/components/systems/SocialServices';
import MeetingHub from '@/pages/MeetingHub';
import { ElectronicSignature } from '@/components/systems/ElectronicSignature';
import { TasksTracking } from '@/components/systems/TasksTracking';
import { CombinedRequestsNotifications } from '@/components/systems/CombinedRequestsNotifications';
import ArtificialIntelligence from '@/components/systems/ArtificialIntelligence';
import Reports from '@/components/systems/Reports';
import ComprehensiveDisciplinarySystem from '@/components/disciplinary/ComprehensiveDisciplinarySystem';
import { ComprehensiveTalentManagement } from '@/components/systems/ComprehensiveTalentManagement';
import { TrackingSystem } from '@/components/systems/TrackingSystem';
import TeamWork from '@/components/systems/TeamWork';

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
          </div>
        </div>
      </div>

      <div className="relative p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Professional Grid Navigation - All Tabs Visible */}
          <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg p-4 mb-6">
            <div className="w-full">
              <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 bg-transparent p-0 h-auto w-full">
                <TabsTrigger 
                  value="dashboard" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <BarChart3 className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">لوحة التحكم</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="teamwork" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Users2 className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم فريق العمل</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="departments" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Building className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم الإدارات والوحدات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="quality-of-life" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Heart className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم جودة الحياة</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="skills-inventory" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Briefcase className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">قسم مخزون المهارات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="internal-communication" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Users2 className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">التواصل الداخلي</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="admin-communications" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الاتصالات الادارية</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="occupational-safety" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <HardHat className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">السلامة المهنية</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="social-services" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Heart className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الخدمات الاجتماعية</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="attendance" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Clock className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الحضور والانصراف</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="disciplinary" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الجزاءات والعقوبات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="leaves" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Calendar className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الإجازات والعطلات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="payroll" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <DollarSign className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الرواتب والأجور</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="government" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Plug className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">التكامل والربط</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="organization" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Network className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">التطوير والتنظيم المؤسسي</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="governance" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Shield className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الحوكمة والامتثال</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="wageprotection" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Banknote className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">حماية الأجور</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="legal" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Scale className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الشؤون القانونية</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Target className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">تقييم الأداء</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="training" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <GraduationCap className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">التدريب والتطوير</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="talents" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Star className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">إدارة المواهب</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="recruitment" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <UserPlus className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">التوظيف والتعين</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="insurance" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Shield className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">التأمين</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="benefits" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Gift className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">المكافآت والحوافز</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="meetings" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <CalendarClock className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الاجتماعات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="signature" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <PenTool className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">التوقيع الإلكتروني</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="tasks" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <CheckSquare className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">المهام والمتابعة</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="requests" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <MessageSquare className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الطلبات والإشعارات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="ai" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Bot className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الذكاء الاصطناعي</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <FileBarChart className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">التقارير</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="tracking" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <MapPin className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">التتبع الميداني</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg"
                >
                  <Settings className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-center leading-tight">الإعدادات</span>
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
            <OccupationalSafety />
          </TabsContent>

          <TabsContent value="social-services">
            <SocialServices />
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

              <TabsContent value="tracking">
                <TrackingSystem onBack={() => setActiveTab('dashboard')} />
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