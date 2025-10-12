import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, AlertTriangle, Calendar, Clock, DollarSign, Building, BarChart3, ArrowLeft, ArrowUp, ArrowDown, RefreshCw, Download, Settings, Plug, Network, Shield, Banknote, Scale, Target, GraduationCap, FileBarChart, CalendarClock, Gift, PenTool, CheckSquare, Bot, User, Star, MessageSquare, MapPin, Heart, Briefcase, MessageCircle, Users2, HardHat, Zap, Brain, Sparkles, GripVertical, Gavel, FileText, Receipt, LogOut, Plane, Crown, ArrowRight, CheckCircle, Leaf, Activity, Smartphone, Phone } from 'lucide-react';
import boudLogo from '@/assets/boud-logo-white-brown.png';
import hrManagementLogo from '@/assets/hr-management-logo.png';

// Import components
import { ComprehensiveDashboard } from '@/components/dashboard/ComprehensiveDashboard';
import { SystemSettings } from '@/components/settings/SystemSettings';
import { NotificationSystem } from '@/components/NotificationSystem';
// Team Management System
import TeamMembers from '@/components/systems/TeamMembers';
import { DepartmentsManagement } from '@/components/departments/DepartmentsManagement';
import { SmartAttendanceSystem } from '@/components/attendance/SmartAttendanceSystem';
import { ComprehensiveLeaveManagementSystem } from '@/components/systems/ComprehensiveLeaveManagementSystem';
import { ComprehensivePayrollSystem } from '@/components/systems/ComprehensivePayrollSystem';
import { ComprehensiveIntegrationSystem } from '@/components/systems/ComprehensiveIntegrationSystem';
import { OrganizationalDevelopmentSmart } from '@/components/organizational-development/OrganizationalDevelopmentSmart';
import { ComprehensiveGovernanceCompliance } from '@/components/systems/ComprehensiveGovernanceCompliance';
import { ComprehensiveWageProtection } from '@/components/systems/ComprehensiveWageProtection';
import { ComprehensiveLegalAffairs } from '@/components/systems/ComprehensiveLegalAffairs';
import { ChangeManagement } from '@/components/governance/ChangeManagement';
import { PoliciesProcedures } from '@/components/governance/PoliciesProcedures';
import { InternalAudit } from '@/components/governance/InternalAudit';
import { ComprehensiveSmartEvaluation } from '@/components/systems/ComprehensiveSmartEvaluation';
import { ComprehensiveTraining } from '@/components/systems/ComprehensiveTraining';
import SmartHire from '@/pages/SmartHire';
import { InsuranceManagement } from '@/components/systems/InsuranceManagement';
import { ExpensesManagement } from '@/components/systems/ExpensesManagement';
import { AdvancedExpensesManagement } from '@/components/systems/AdvancedExpensesManagement';
import { ComprehensiveRewardsIncentives } from '@/components/systems/ComprehensiveRewardsIncentives';
import { WorkforcePlanningBudget } from '@/components/compensation/WorkforcePlanningBudget';
import { TravelExpensesManagement } from '@/components/compensation/TravelExpensesManagement';
import { SmartLearningAI } from '@/components/development/SmartLearningAI';
import { InternalMobilityCareerPaths } from '@/components/development/InternalMobilityCareerPaths';
import { SuccessionPlanning } from '@/components/development/SuccessionPlanning';
import { QualityOfLifeSystem } from '@/components/systems/QualityOfLifeSystem';
import { SkillsInventorySystem } from '@/components/systems/SkillsInventorySystem';
import { InternalCommunication } from '@/components/systems/InternalCommunication';
import { DiversityInclusion } from '@/components/corporate/DiversityInclusion';
import { SustainabilityCSR } from '@/components/corporate/SustainabilityCSR';
import { CallCenterManagement } from '@/components/call-center/CallCenterManagement';
import { DigitalHealthIntegration } from '@/components/corporate/DigitalHealthIntegration';
import { MobileExperience } from '@/components/digital/MobileExperience';
import { HSEWorkplaceSafety } from '@/components/digital/HSEWorkplaceSafety';
import { ProjectManagement } from '@/components/digital/ProjectManagement';
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
import BudgetFinancialPlanning from '@/components/systems/BudgetFinancialPlanning';
import { EndOfServiceManagement } from '@/components/employee/EndOfServiceManagement';
type TabType = 'dashboard' | 'settings' | 'employee-operations' | 'compensation-benefits' | 'development-performance' | 'governance-compliance' | 'digital-transformation' | 'corporate-relations' | 'field-tracking' | 'occupational-health-safety';
type EmployeeOperationsTabType = 'attendance' | 'employee-services' | 'leaves' | 'disciplinary' | 'requests' | 'tasks' | 'teamwork' | 'recruitment' | 'end-of-service';
type CompensationBenefitsTabType = 'payroll' | 'wageprotection' | 'insurance' | 'expenses' | 'benefits' | 'workforce-planning' | 'travel-expenses';
type DevelopmentPerformanceTabType = 'performance' | 'training' | 'talents' | 'quality-of-life' | 'skills-inventory' | 'departments' | 'budget-planning' | 'organization' | 'smart-learning' | 'internal-mobility' | 'succession-planning' | 'call-center';
type GovernanceComplianceTabType = 'legal' | 'governance' | 'policies-procedures' | 'internal-audit' | 'change-management';
type DigitalTransformationTabType = 'ai' | 'reports' | 'integration' | 'signature' | 'tracking' | 'meetings' | 'mobile-experience' | 'hse-safety' | 'project-management';
type CorporateRelationsTabType = 'internal-communication' | 'social-services' | 'admin-communications' | 'occupational-safety' | 'diversity-inclusion' | 'sustainability-csr' | 'digital-health';
const ComprehensiveEmployeeManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [activeEmployeeOpsTab, setActiveEmployeeOpsTab] = useState<EmployeeOperationsTabType>('attendance');
  const [activeCompensationTab, setActiveCompensationTab] = useState<CompensationBenefitsTabType>('payroll');
  const [activeDevelopmentTab, setActiveDevelopmentTab] = useState<DevelopmentPerformanceTabType>('performance');
  const [activeGovernanceTab, setActiveGovernanceTab] = useState<GovernanceComplianceTabType>('legal');
  const [activeDigitalTransformationTab, setActiveDigitalTransformationTab] = useState<DigitalTransformationTabType>('ai');
  const [activeCorporateRelationsTab, setActiveCorporateRelationsTab] = useState<CorporateRelationsTabType>('internal-communication');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
  const [isDragMode, setIsDragMode] = useState(false);
  const [tabOrder, setTabOrder] = useState<TabType[]>(['dashboard', 'employee-operations', 'compensation-benefits', 'development-performance', 'governance-compliance', 'digital-transformation', 'corporate-relations', 'field-tracking', 'occupational-health-safety']);

  // Helper function to safely change tabs
  const handleTabChange = (value: string) => {
    if (isValidTabType(value)) {
      setActiveTab(value);
    }
  };

  // Type guard function
  const isValidTabType = (value: string): value is TabType => {
    const validTabs: TabType[] = ['dashboard', 'settings', 'employee-operations', 'compensation-benefits', 'development-performance', 'governance-compliance', 'digital-transformation', 'corporate-relations', 'field-tracking', 'occupational-health-safety'];
    return validTabs.includes(value as TabType);
  };

  // Helper function for employee operations tabs
  const handleEmployeeOpsTabChange = (value: string) => {
    if (isValidEmployeeOpsTabType(value)) {
      setActiveEmployeeOpsTab(value);
    }
  };

  // Type guard function for employee operations
  const isValidEmployeeOpsTabType = (value: string): value is EmployeeOperationsTabType => {
    const validTabs: EmployeeOperationsTabType[] = ['attendance', 'employee-services', 'leaves', 'disciplinary', 'requests', 'tasks', 'teamwork', 'recruitment', 'end-of-service'];
    return validTabs.includes(value as EmployeeOperationsTabType);
  };

  // Helper function for compensation benefits tabs
  const handleCompensationTabChange = (value: string) => {
    if (isValidCompensationTabType(value)) {
      setActiveCompensationTab(value);
    }
  };

  // Type guard function for compensation benefits
  const isValidCompensationTabType = (value: string): value is CompensationBenefitsTabType => {
    const validTabs: CompensationBenefitsTabType[] = ['payroll', 'wageprotection', 'insurance', 'expenses', 'benefits', 'workforce-planning', 'travel-expenses'];
    return validTabs.includes(value as CompensationBenefitsTabType);
  };

  // Helper function for development performance tabs
  const handleDevelopmentTabChange = (value: string) => {
    if (isValidDevelopmentTabType(value)) {
      setActiveDevelopmentTab(value);
    }
  };

  // Type guard function for development performance
  const isValidDevelopmentTabType = (value: string): value is DevelopmentPerformanceTabType => {
    const validTabs: DevelopmentPerformanceTabType[] = ['performance', 'training', 'talents', 'quality-of-life', 'skills-inventory', 'departments', 'budget-planning', 'organization', 'smart-learning', 'internal-mobility', 'succession-planning', 'call-center'];
    return validTabs.includes(value as DevelopmentPerformanceTabType);
  };

  // Helper function for governance compliance tabs
  const handleGovernanceTabChange = (value: string) => {
    if (isValidGovernanceTabType(value)) {
      setActiveGovernanceTab(value);
    }
  };

  // Type guard function for governance compliance
  const isValidGovernanceTabType = (value: string): value is GovernanceComplianceTabType => {
    const validTabs: GovernanceComplianceTabType[] = ['legal', 'governance', 'policies-procedures', 'internal-audit', 'change-management'];
    return validTabs.includes(value as GovernanceComplianceTabType);
  };

  // Helper function for digital transformation tabs
  const handleDigitalTransformationTabChange = (value: string) => {
    if (isValidDigitalTransformationTabType(value)) {
      setActiveDigitalTransformationTab(value);
    }
  };

  // Type guard function for digital transformation
  const isValidDigitalTransformationTabType = (value: string): value is DigitalTransformationTabType => {
    const validTabs: DigitalTransformationTabType[] = ['ai', 'reports', 'integration', 'signature', 'tracking', 'meetings', 'mobile-experience', 'hse-safety', 'project-management'];
    return validTabs.includes(value as DigitalTransformationTabType);
  };

  // Helper function for corporate relations tabs
  const handleCorporateRelationsTabChange = (value: string) => {
    if (isValidCorporateRelationsTabType(value)) {
      setActiveCorporateRelationsTab(value);
    }
  };

  // Type guard function for corporate relations
  const isValidCorporateRelationsTabType = (value: string): value is CorporateRelationsTabType => {
    const validTabs: CorporateRelationsTabType[] = ['internal-communication', 'social-services', 'admin-communications', 'occupational-safety', 'diversity-inclusion', 'sustainability-csr', 'digital-health'];
    return validTabs.includes(value as CorporateRelationsTabType);
  };

  // Tab ordering functions
  const handleTabReorder = (action: 'settings' | 'reset') => {
    if (action === 'settings') {
      // Open settings for tab configuration
      toast.success('إعدادات الترتيب');
    } else if (action === 'reset') {
      // Reset to default order
      setTabOrder(['dashboard', 'employee-operations', 'compensation-benefits', 'development-performance', 'governance-compliance', 'digital-transformation', 'corporate-relations', 'field-tracking', 'occupational-health-safety']);
      toast.success('تم إعادة الترتيب إلى الوضع الافتراضي');
    }
  };
  const handleTabMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    const currentIndex = tabOrder.findIndex(tab => tab === activeTab);
    if (currentIndex === -1) return;
    let newIndex = currentIndex;
    if (direction === 'up' || direction === 'right') {
      newIndex = Math.max(0, currentIndex - 1);
    } else if (direction === 'down' || direction === 'left') {
      newIndex = Math.min(tabOrder.length - 1, currentIndex + 1);
    }
    if (newIndex !== currentIndex) {
      const newTabOrder = [...tabOrder];
      const movedTab = newTabOrder.splice(currentIndex, 1)[0];
      newTabOrder.splice(newIndex, 0, movedTab);
      setTabOrder(newTabOrder);
      const directionText = {
        up: 'للأعلى',
        down: 'للأسفل',
        left: 'لليسار',
        right: 'لليمين'
      };
      toast.success(`تم نقل التبويب ${directionText[direction]}`);
    }
  };
  const toggleDragMode = () => {
    setIsDragMode(!isDragMode);
    toast.info(isDragMode ? 'تم إيقاف وضع الترتيب بالماوس' : 'تم تفعيل وضع الترتيب بالماوس - اسحب التبويبات لإعادة ترتيبها');
  };

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
      'نشط': 'bg-success/10 text-success border-success/20',
      'في إجازة': 'bg-warning/10 text-warning border-warning/20',
      'متوقف': 'bg-destructive/10 text-destructive border-destructive/20',
      'منتهي الخدمة': 'bg-muted text-muted-foreground border-border'
    };
    return <Badge className={statusConfig[status as keyof typeof statusConfig] || 'bg-muted text-muted-foreground'}>
        {status}
      </Badge>;
  };
  return <div className="min-h-screen relative overflow-hidden font-arabic bg-background text-foreground" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="w-full h-full bg-repeat animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
          backgroundSize: '60px 60px'
        }}></div>
        </div>
      </div>
      
      {/* Floating Elements for Professional Look */}
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full blur-xl animate-pulse bg-accent/10"></div>
      <div className="absolute top-32 left-16 w-32 h-32 rounded-full blur-2xl animate-pulse delay-1000 bg-accent/5"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 rounded-full blur-lg animate-pulse delay-500 bg-accent/15"></div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 container mx-auto px-8 py-8 rounded-2xl bg-card/30 backdrop-blur-sm">
        {/* الشريط العلوي الاحترافي */}
        <div className="flex items-center justify-between mb-12 p-6 rounded-3xl animate-fade-in bg-card backdrop-blur-xl border border-border">
          <div className="flex items-center gap-6">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="transition-all duration-300 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 border-border">
              <ArrowLeft className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="h-8 w-px bg-border/30"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center relative overflow-hidden bg-accent">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-accent/10 to-transparent"></div>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full animate-pulse bg-accent"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">نظام إدارة الموارد البشرية المتكامل</h1>
                <p className="text-lg text-muted-foreground">
                  النظام الشامل والمتقدم لإدارة الموظفين والفرق
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-border bg-card">
              <Sparkles className="h-4 w-4 ml-2" />
              نظام متطور
            </Badge>
            <Button size="sm" className="transition-all duration-300 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>

        <div className="relative p-6 rounded-3xl transition-all duration-300 animate-fade-in bg-card backdrop-blur-xl border border-border">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          {/* Professional Grid Navigation - All Tabs Visible */}
          <div className="rounded-xl p-4 mb-6 bg-card backdrop-blur-xl border border-border">
            {/* Control Icons for Tab Organization */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-lg p-1 bg-black border border-border">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 transition-colors hover:bg-accent hover:text-accent-foreground" title="ترتيب الأيقونات" onClick={() => handleTabReorder('settings')}>
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 transition-colors hover:bg-accent hover:text-accent-foreground" title="إعادة ترتيب" onClick={() => handleTabReorder('reset')}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 transition-colors hover:bg-accent hover:text-accent-foreground" title="نقل للأعلى" onClick={() => handleTabMove('up')}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 transition-colors hover:bg-accent hover:text-accent-foreground" title="نقل للأسفل" onClick={() => handleTabMove('down')}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors" title="نقل لليمين" onClick={() => handleTabMove('right')}>
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors" title="نقل لليسار" onClick={() => handleTabMove('left')}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-colors cursor-grab active:cursor-grabbing" title="ترتيب بالماوس - حسب الرغبة" onClick={() => toggleDragMode()}>
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-1 rounded-lg p-1 bg-black border border-border">
                {/* Dashboard Tab - Moved to top */}
                <Button variant={activeTab === 'dashboard' ? "default" : "ghost"} size="sm" className={`h-8 px-3 text-xs transition-all duration-300 ${activeTab === 'dashboard' ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" : "hover:bg-accent hover:text-accent-foreground"}`} onClick={() => setActiveTab('dashboard')}>
                  <BarChart3 className="h-3 w-3 ml-1" />
                  لوحة التحكم
                </Button>
                
                {/* General Settings Tab */}
                <Button variant={activeTab === 'settings' ? "default" : "ghost"} size="sm" className={`h-8 px-3 text-xs transition-all duration-300 ${activeTab === 'settings' ? "bg-black text-white shadow-md hover:bg-black/90" : "hover:bg-accent hover:text-accent-foreground"}`} onClick={() => setActiveTab('settings')}>
                  <Settings className="h-3 w-3 ml-1" />
                  الإعدادات العامة
                </Button>
                 
                <Button variant="ghost" size="sm" className="h-8 px-3 text-xs transition-all duration-300 hover:bg-accent hover:text-accent-foreground rounded-lg">
                  <Download className="h-3 w-3 ml-1" />
                  حفظ التخطيط
                </Button>
                
                <Button variant="ghost" size="sm" className="h-8 px-3 text-xs transition-all duration-300 hover:bg-accent hover:text-accent-foreground rounded-lg">
                  <Settings className="h-3 w-3 ml-1" />
                  تخصيص
                </Button>
              </div>
            </div>
            
            <div className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-6 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
                <TabsTrigger value="employee-operations" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">إدارة الموظفين والعمليات</span>
                </TabsTrigger>
                <TabsTrigger value="compensation-benefits" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs">إدارة التعويضات والمزايا</span>
                </TabsTrigger>
                <TabsTrigger value="development-performance" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-xs">إدارة التطوير والأداء</span>
                </TabsTrigger>
                <TabsTrigger value="governance-compliance" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                  <Scale className="h-4 w-4" />
                  <span className="text-xs">إدارة الحوكمة والالتزام</span>
                </TabsTrigger>
                <TabsTrigger value="corporate-relations" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">إدارة العلاقات والتواصل</span>
                </TabsTrigger>
                <TabsTrigger value="digital-transformation" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                  <Brain className="h-4 w-4" />
                  <span className="text-xs">إدارة التحول الرقمي</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Tab Contents */}
          <TabsContent value="dashboard">
            <ComprehensiveDashboard onNavigateToSection={handleTabChange} />
          </TabsContent>

          <TabsContent value="employee-operations">
            <div className="space-y-6">
              <div className="rounded-3xl p-6 transition-all duration-300 bg-card border border-border/20">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="text-center">
                    <img src={boudLogo} alt="Boud Logo" className="h-48 w-auto mx-auto mb-2" />
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">مرحباً بك في</h2>
                      <h2 className="text-2xl font-bold text-foreground">إدارة شؤون الموظفين والعمليات</h2>
                    </div>
                    <p className="text-muted-foreground mt-1">النظام المتكامل لإدارة جميع شؤون الموظفين والعمليات التشغيلية</p>
                  </div>
                </div>
                
                <Tabs value={activeEmployeeOpsTab} onValueChange={handleEmployeeOpsTabChange} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-9 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
                    <TabsTrigger value="attendance" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs">الحضور والانصراف</span>
                    </TabsTrigger>
                    <TabsTrigger value="leaves" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs">الإجازات</span>
                    </TabsTrigger>
                    <TabsTrigger value="disciplinary" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Gavel className="h-4 w-4" />
                      <span className="text-xs">الجزاءات والعقوبات</span>
                    </TabsTrigger>
                    <TabsTrigger value="employee-services" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <User className="h-4 w-4" />
                      <span className="text-xs">خدمات الموظفين</span>
                    </TabsTrigger>
                    <TabsTrigger value="recruitment" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <UserPlus className="h-4 w-4" />
                      <span className="text-xs">التوظيف والتعيين</span>
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <CheckSquare className="h-4 w-4" />
                      <span className="text-xs">المهام والمتابعة</span>
                    </TabsTrigger>
                    <TabsTrigger value="requests" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-xs">الطلبات والإشعارات</span>
                    </TabsTrigger>
                    <TabsTrigger value="end-of-service" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <LogOut className="h-4 w-4" />
                      <span className="text-xs">الاستقالات وإنهاء الخدمة</span>
                    </TabsTrigger>
                    <TabsTrigger value="teamwork" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Users2 className="h-4 w-4" />
                      <span className="text-xs">فريق العمل</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="attendance">
                    <SmartAttendanceSystem />
                  </TabsContent>

                  <TabsContent value="employee-services">
                    <EmployeeServicesDepartment />
                  </TabsContent>

                  <TabsContent value="leaves">
                    <ComprehensiveLeaveManagementSystem onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="disciplinary">
                    <ComprehensiveDisciplinarySystem />
                  </TabsContent>

                  <TabsContent value="requests">
                    <CombinedRequestsNotifications onBack={() => setActiveTab('dashboard')} onNavigateToSection={handleTabChange} />
                  </TabsContent>

                  <TabsContent value="tasks">
                    <ComprehensiveTasksFollowup onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="teamwork">
                    <TeamWork />
                  </TabsContent>

                  <TabsContent value="recruitment">
                    <SmartHire />
                  </TabsContent>

                  <TabsContent value="end-of-service">
                    <EndOfServiceManagement />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compensation-benefits">
            <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-arabic" dir="rtl">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div 
                    className="w-full h-full bg-repeat animate-pulse"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
                      backgroundSize: '60px 60px'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Floating Elements for Professional Look */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-32 left-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute bottom-32 right-20 w-16 h-16 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>
              
              <div className="relative z-10">
                <div className="space-y-6 container mx-auto p-6">
                  {/* Logo */}
                  <div className="flex justify-center">
                    <img 
                      src="/src/assets/boud-logo-new.png" 
                      alt="Boud Logo" 
                      className="h-32 w-auto object-contain"
                    />
                  </div>

                  {/* Header */}
                  <div className="text-center mb-8">
                    <p className="text-sm text-muted-foreground mb-2">مرحباً بك في</p>
                    <h1 className="text-3xl font-bold mb-2 text-foreground">إدارة التعويضات والمزايا</h1>
                    <p className="text-muted-foreground">إدارة شاملة للرواتب والتأمينات والمكافآت والحوافز</p>
                  </div>
                </div>

                <div className="container mx-auto p-6">
                  <Tabs value={activeCompensationTab} onValueChange={handleCompensationTabChange} className="space-y-6 relative z-10">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-7 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
                      <TabsTrigger value="payroll" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-xs">الرواتب والأجور</span>
                      </TabsTrigger>
                      <TabsTrigger value="wageprotection" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                        <Shield className="h-4 w-4" />
                        <span className="text-xs">حماية الأجور</span>
                      </TabsTrigger>
                      <TabsTrigger value="insurance" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">التأمين</span>
                      </TabsTrigger>
                      <TabsTrigger value="benefits" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                        <Gift className="h-4 w-4" />
                        <span className="text-xs">المكافآت والحوافز</span>
                      </TabsTrigger>
                      <TabsTrigger value="expenses" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                        <Receipt className="h-4 w-4" />
                        <span className="text-xs">المصروفات والنفقات</span>
                      </TabsTrigger>
                      <TabsTrigger value="workforce-planning" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                        <Target className="h-4 w-4" />
                        <span className="text-xs">تخطيط القوى العاملة</span>
                      </TabsTrigger>
                      <TabsTrigger value="travel-expenses" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                        <Plane className="h-4 w-4" />
                        <span className="text-xs">السفر والمصروفات</span>
                      </TabsTrigger>
                    </TabsList>

                  <TabsContent value="payroll">
                    <ComprehensivePayrollSystem onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="wageprotection">
                    <ComprehensiveWageProtection onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="insurance">
                    <InsuranceManagement onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="benefits">
                    <ComprehensiveRewardsIncentives onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="expenses">
                    <AdvancedExpensesManagement onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="workforce-planning">
                    <WorkforcePlanningBudget />
                  </TabsContent>

                  <TabsContent value="travel-expenses">
                    <TravelExpensesManagement />
                  </TabsContent>

                </Tabs>
              </div>
            </div>
          </div>
          </TabsContent>

          <TabsContent value="development-performance">
            <div className="space-y-6">
              <div className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300 rounded-lg">
                <div className="flex flex-col items-center justify-center text-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">إدارة التطوير والأداء المؤسسي</h2>
                    <p className="text-muted-foreground">النظام المتكامل لتطوير الأداء وإدارة المواهب والتدريب المؤسسي</p>
                  </div>
                </div>
                
                <Tabs value={activeDevelopmentTab} onValueChange={handleDevelopmentTabChange} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 mb-6 bg-[#1a1a1a] border border-[#cfcbcb]">
                      <TabsTrigger value="performance" className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        تقييم الأداء
                      </TabsTrigger>
                      <TabsTrigger value="training" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        التدريب والتأهيل
                      </TabsTrigger>
                      <TabsTrigger value="talents" className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        إدارة المواهب
                      </TabsTrigger>
                      <TabsTrigger value="quality-of-life" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        جودة الحياة
                      </TabsTrigger>
                      <TabsTrigger value="skills-inventory" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        مخزون المهارات
                      </TabsTrigger>
                      <TabsTrigger value="organization" className="flex items-center gap-2">
                        <Network className="h-4 w-4" />
                        التطوير المؤسسي
                      </TabsTrigger>
                      <TabsTrigger value="budget-planning" className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        الميزانية والتخطيط
                      </TabsTrigger>
                      <TabsTrigger value="departments" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        الإدارات والوحدات
                      </TabsTrigger>
                      <TabsTrigger value="smart-learning" className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        التعلم الذكي
                      </TabsTrigger>
                      <TabsTrigger value="internal-mobility" className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        التنقل الداخلي
                      </TabsTrigger>
                      <TabsTrigger value="succession-planning" className="flex items-center gap-2">
                        <Crown className="h-4 w-4" />
                        تخطيط التعاقب
                      </TabsTrigger>
                      <TabsTrigger value="call-center" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        الكول سنتر
                      </TabsTrigger>
                    </TabsList>

                  <TabsContent value="performance">
                    <ComprehensiveSmartEvaluation onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="training">
                    <ComprehensiveTraining onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="talents">
                    <ComprehensiveTalentManagement onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="quality-of-life">
                    <QualityOfLifeSystem onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="skills-inventory">
                    <SkillsInventorySystem onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="departments">
                    <DepartmentsManagement onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="budget-planning">
                    <BudgetFinancialPlanning onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="organization">
                    <OrganizationalDevelopmentSmart />
                  </TabsContent>

                  <TabsContent value="smart-learning">
                    <SmartLearningAI />
                  </TabsContent>

                  <TabsContent value="internal-mobility">
                    <InternalMobilityCareerPaths />
                  </TabsContent>

                  <TabsContent value="succession-planning">
                    <SuccessionPlanning />
                  </TabsContent>

                  <TabsContent value="call-center">
                    <CallCenterManagement />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>


          <TabsContent value="quality-of-life">
            <QualityOfLifeSystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="skills-inventory">
            <SkillsInventorySystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>


          <TabsContent value="admin-communications">
            <AdministrativeCommunications onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="occupational-safety">
            <OccupationalHealthSafety onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="digital-transformation">
            <div className="space-y-6">
              <div className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300 rounded-lg animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow">
                    <Brain className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">إدارة التقنية والتحول الرقمي</h2>
                    <p className="text-muted-foreground">النظام المتقدم لإدارة التقنيات الرقمية والذكاء الاصطناعي والتكامل</p>
                  </div>
                </div>
                
                <Tabs value={activeDigitalTransformationTab} onValueChange={handleDigitalTransformationTabChange} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-9 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
                    <TabsTrigger value="ai" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs">الذكاء الاصطناعي</span>
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <FileBarChart className="h-4 w-4" />
                      <span className="text-xs">التقارير الشاملة</span>
                    </TabsTrigger>
                    <TabsTrigger value="integration" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Plug className="h-4 w-4" />
                      <span className="text-xs">التكامل والربط</span>
                    </TabsTrigger>
                    <TabsTrigger value="signature" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <PenTool className="h-4 w-4" />
                      <span className="text-xs">التوقيع الإلكتروني</span>
                    </TabsTrigger>
                    <TabsTrigger value="tracking" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs">التتبع الميداني</span>
                    </TabsTrigger>
                    <TabsTrigger value="meetings" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <CalendarClock className="h-4 w-4" />
                      <span className="text-xs">الاجتماعات</span>
                    </TabsTrigger>
                    <TabsTrigger value="mobile-experience" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Smartphone className="h-4 w-4" />
                      <span className="text-xs">تطبيقات الجوال</span>
                    </TabsTrigger>
                    <TabsTrigger value="hse-safety" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Shield className="h-4 w-4" />
                      <span className="text-xs">الصحة والسلامة</span>
                    </TabsTrigger>
                    <TabsTrigger value="project-management" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-xs">إدارة المشاريع</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="ai">
                    <ArtificialIntelligence onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="reports">
                    <Reports onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="integration">
                    <ComprehensiveIntegrationSystem onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="signature">
                    <ElectronicSignature onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="tracking">
                    <ComprehensiveFieldTracking onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="meetings">
                    <MeetingHub />
                  </TabsContent>

                  <TabsContent value="mobile-experience">
                    <MobileExperience />
                  </TabsContent>

                  <TabsContent value="hse-safety">
                    <HSEWorkplaceSafety />
                  </TabsContent>

                  <TabsContent value="project-management">
                    <ProjectManagement />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="governance-compliance">
            <div className="space-y-6">
              <div className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300 rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow">
                    <Scale className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">إدارة الحوكمة والالتزام</h2>
                    <p className="text-muted-foreground">النظام المتقدم لإدارة الحوكمة والامتثال والأمان والشؤون القانونية</p>
                  </div>
                </div>
                
                <Tabs value={activeGovernanceTab} onValueChange={handleGovernanceTabChange} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
                    <TabsTrigger value="legal" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Gavel className="h-4 w-4" />
                      <span className="text-xs">الشؤون القانونية</span>
                    </TabsTrigger>
                    <TabsTrigger value="governance" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Shield className="h-4 w-4" />
                      <span className="text-xs">الحوكمة والامتثال</span>
                    </TabsTrigger>
                    <TabsTrigger value="policies-procedures" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <FileText className="h-4 w-4" />
                      <span className="text-xs">السياسات والإجراءات</span>
                    </TabsTrigger>
                    <TabsTrigger value="internal-audit" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs">التدقيق الداخلي</span>
                    </TabsTrigger>
                    <TabsTrigger value="change-management" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <RefreshCw className="h-4 w-4" />
                      <span className="text-xs">إدارة التغيير</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="legal">
                    <ComprehensiveLegalAffairs onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="governance">
                    <ComprehensiveGovernanceCompliance onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="policies-procedures">
                    <PoliciesProcedures />
                  </TabsContent>

                  <TabsContent value="internal-audit">
                    <InternalAudit />
                  </TabsContent>

                  <TabsContent value="change-management">
                    <ChangeManagement />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="corporate-relations">
            <div className="space-y-6">
              <div className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300 rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow">
                    <MessageCircle className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">إدارة العلاقات والتواصل المؤسسي</h2>
                    <p className="text-muted-foreground">نظام شامل لإدارة العلاقات الداخلية والتواصل المؤسسي والخدمات الاجتماعية</p>
                  </div>
                </div>
                
                <Tabs value={activeCorporateRelationsTab} onValueChange={handleCorporateRelationsTabChange} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
                    <TabsTrigger value="internal-communication" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Users2 className="h-4 w-4" />
                      <span className="text-xs">التواصل الداخلي</span>
                    </TabsTrigger>
                    <TabsTrigger value="admin-communications" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <FileText className="h-4 w-4" />
                      <span className="text-xs">المراسلات الإدارية</span>
                    </TabsTrigger>
                    <TabsTrigger value="social-services" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">الخدمات الاجتماعية</span>
                    </TabsTrigger>
                    <TabsTrigger value="occupational-safety" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <HardHat className="h-4 w-4" />
                      <span className="text-xs">السلامة المهنية</span>
                    </TabsTrigger>
                    <TabsTrigger value="diversity-inclusion" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Users className="h-4 w-4" />
                      <span className="text-xs">التنوع والشمول</span>
                    </TabsTrigger>
                    <TabsTrigger value="sustainability-csr" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Leaf className="h-4 w-4" />
                      <span className="text-xs">الاستدامة CSR</span>
                    </TabsTrigger>
                    <TabsTrigger value="digital-health" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                      <Activity className="h-4 w-4" />
                      <span className="text-xs">الصحة الرقمية</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="internal-communication">
                    <InternalCommunication onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="social-services">
                    <SocialServices />
                  </TabsContent>

                  <TabsContent value="admin-communications">
                    <AdministrativeCommunications onBack={() => setActiveTab('dashboard')} />
                  </TabsContent>

                  <TabsContent value="occupational-safety">
                    <OccupationalSafety />
                  </TabsContent>

                  <TabsContent value="diversity-inclusion">
                    <DiversityInclusion />
                  </TabsContent>

                  <TabsContent value="sustainability-csr">
                    <SustainabilityCSR />
                  </TabsContent>

                  <TabsContent value="digital-health">
                    <DigitalHealthIntegration />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="organization">
            <OrganizationalDevelopmentSmart />
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

          <TabsContent value="meetings">
            <MeetingHub onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          </Tabs>
        </div>

        {/* Employee Details Dialog */}
        <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card backdrop-blur-xl border border-border shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-primary">
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
                  <h3 className="text-xl font-bold text-foreground">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground">{selectedEmployee.position} - {selectedEmployee.department}</p>
                  {getStatusBadge(selectedEmployee.status)}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card backdrop-blur-xl border border-border hover:border-primary shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">المعلومات الأساسية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">رقم الموظف:</span>
                        <span className="font-medium text-foreground">{selectedEmployee.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">البريد الإلكتروني:</span>
                        <span className="font-medium text-foreground">{selectedEmployee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الهاتف:</span>
                        <span className="font-medium text-foreground">{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">تاريخ التوظيف:</span>
                        <span className="font-medium text-foreground">{selectedEmployee.joinDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card backdrop-blur-xl border border-border hover:border-primary shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">معلومات الراتب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الراتب الأساسي:</span>
                        <span className="font-medium text-foreground">{selectedEmployee.salary?.basic?.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">بدل السكن:</span>
                        <span className="font-medium text-foreground">{selectedEmployee.salary?.housing?.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">بدل النقل:</span>
                        <span className="font-medium text-foreground">{selectedEmployee.salary?.transport?.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2 font-semibold">
                        <span className="text-foreground">إجمالي الراتب:</span>
                        <span className="text-foreground">{selectedEmployee.salary?.total?.toLocaleString()} ريال</span>
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