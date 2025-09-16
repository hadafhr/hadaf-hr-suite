import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, AlertTriangle, Calendar, Clock, DollarSign, Building, BarChart3, ArrowLeft, ArrowUp, ArrowDown, RefreshCw, Download, Settings, Plug, Network, Shield, Banknote, Scale, Target, GraduationCap, FileBarChart, CalendarClock, Gift, PenTool, CheckSquare, Bot, User, Star, MessageSquare, MapPin, Heart, Briefcase, MessageCircle, Users2, HardHat, Zap, Brain, Sparkles, GripVertical } from 'lucide-react';

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
import BudgetFinancialPlanning from '@/components/systems/BudgetFinancialPlanning';
type TabType = 'dashboard' | 'settings' | 'teamwork' | 'departments' | 'quality-of-life' | 'skills-inventory' | 'internal-communication' | 'admin-communications' | 'occupational-safety' | 'social-services' | 'field-tracking' | 'occupational-health-safety' | 'disciplinary' | 'leaves' | 'payroll' | 'government' | 'organization' | 'governance' | 'wageprotection' | 'legal' | 'performance' | 'training' | 'talents' | 'recruitment' | 'insurance' | 'benefits' | 'meetings' | 'signature' | 'tasks' | 'requests' | 'ai' | 'reports' | 'tracking' | 'attendance' | 'budget-planning' | 'employee-services';

const ComprehensiveEmployeeManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
  const [isDragMode, setIsDragMode] = useState(false);
  const [tabOrder, setTabOrder] = useState<TabType[]>(['dashboard', 'departments', 'teamwork', 'quality-of-life', 'skills-inventory', 'internal-communication', 'admin-communications', 'occupational-safety', 'social-services', 'field-tracking', 'occupational-health-safety', 'disciplinary', 'leaves', 'payroll', 'government', 'organization', 'governance', 'wageprotection', 'legal', 'performance', 'training', 'talents', 'recruitment', 'insurance', 'benefits', 'meetings', 'signature', 'tasks', 'requests', 'ai', 'reports', 'tracking', 'attendance', 'budget-planning', 'employee-services']);

  // Helper function to safely change tabs
  const handleTabChange = (value: string) => {
    if (isValidTabType(value)) {
      setActiveTab(value);
    }
  };

  // Type guard function
  const isValidTabType = (value: string): value is TabType => {
    const validTabs: TabType[] = ['dashboard', 'settings', 'teamwork', 'departments', 'quality-of-life', 'skills-inventory', 'internal-communication', 'admin-communications', 'occupational-safety', 'social-services', 'field-tracking', 'occupational-health-safety', 'disciplinary', 'leaves', 'payroll', 'government', 'organization', 'governance', 'wageprotection', 'legal', 'performance', 'training', 'talents', 'recruitment', 'insurance', 'benefits', 'meetings', 'signature', 'tasks', 'requests', 'ai', 'reports', 'tracking', 'attendance', 'budget-planning', 'employee-services'];
    return validTabs.includes(value as TabType);
  };

  // Tab ordering functions
  const handleTabReorder = (action: 'settings' | 'reset') => {
    if (action === 'settings') {
      // Open settings for tab configuration
      toast({
        title: "إعدادات الترتيب",
        description: "تم فتح إعدادات ترتيب التبويبات",
      });
    } else if (action === 'reset') {
      // Reset to default order
      setTabOrder(['dashboard', 'departments', 'teamwork', 'quality-of-life', 'skills-inventory', 'internal-communication', 'admin-communications', 'occupational-safety', 'social-services', 'field-tracking', 'occupational-health-safety', 'disciplinary', 'leaves', 'payroll', 'government', 'organization', 'governance', 'wageprotection', 'legal', 'performance', 'training', 'talents', 'recruitment', 'insurance', 'benefits', 'meetings', 'signature', 'tasks', 'requests', 'ai', 'reports', 'tracking', 'attendance', 'budget-planning', 'employee-services']);
      toast({
        title: "إعادة الترتيب",
        description: "تم إعادة الترتيب إلى الوضع الافتراضي بنجاح",
      });
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
      toast({
        title: "تم النقل",
        description: `تم نقل التبويب ${directionText[direction]} بنجاح`,
      });
    }
  };

  const toggleDragMode = () => {
    setIsDragMode(!isDragMode);
    toast({
      title: isDragMode ? "إيقاف وضع السحب" : "تفعيل وضع السحب", 
      description: isDragMode ? 'تم إيقاف وضع الترتيب بالماوس' : 'تم تفعيل وضع الترتيب بالماوس - اسحب التبويبات لإعادة ترتيبها',
    });
  };

  // Tabs configuration
  const tabsConfig = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: BarChart3 },
    { id: 'departments', label: 'إدارة الأقسام', icon: Building },
    { id: 'teamwork', label: 'إدارة فرق العمل', icon: Users2 },
    { id: 'quality-of-life', label: 'جودة الحياة الوظيفية', icon: Heart },
    { id: 'skills-inventory', label: 'جرد المهارات والخبرات', icon: Brain },
    { id: 'internal-communication', label: 'التواصل الداخلي', icon: MessageCircle },
    { id: 'admin-communications', label: 'المراسلات الإدارية', icon: Briefcase },
    { id: 'occupational-safety', label: 'السلامة المهنية', icon: HardHat },
    { id: 'social-services', label: 'الخدمات الاجتماعية', icon: Gift },
    { id: 'field-tracking', label: 'متابعة ميدانية', icon: Zap },
    { id: 'occupational-health-safety', label: 'الصحة والسلامة المهنية', icon: Sparkles },
    { id: 'disciplinary', label: 'الإجراءات التأديبية', icon: Shield },
    { id: 'leaves', label: 'إدارة الأجازات', icon: Calendar },
    { id: 'payroll', label: 'كشف المرتبات', icon: DollarSign },
    { id: 'government', label: 'الجهات الحكومية', icon: Plug },
    { id: 'organization', label: 'التطوير التنظيمي', icon: Network },
    { id: 'governance', label: 'الحوكمة', icon: Shield },
    { id: 'wageprotection', label: 'حماية الأجور', icon: Banknote },
    { id: 'legal', label: 'الشؤون القانونية', icon: Scale },
    { id: 'performance', label: 'تقييم الأداء', icon: Star },
    { id: 'training', label: 'التدريب والتطوير', icon: GraduationCap },
    { id: 'talents', label: 'إدارة المواهب', icon: Bot },
    { id: 'recruitment', label: 'التوظيف الذكي', icon: UserPlus },
    { id: 'insurance', label: 'إدارة التأمينات', icon: CheckSquare },
    { id: 'benefits', label: 'المكافآت والحوافز', icon: Gift },
    { id: 'meetings', label: 'مركز الاجتماعات', icon: Users },
    { id: 'signature', label: 'التوقيع الإلكتروني', icon: PenTool },
    { id: 'tasks', label: 'تتبع المهام', icon: Clock },
    { id: 'requests', label: 'طلبات وإشعارات', icon: MessageSquare },
    { id: 'ai', label: 'الذكاء الاصطناعي', icon: Bot },
    { id: 'reports', label: 'التقارير', icon: FileBarChart },
    { id: 'tracking', label: 'قسم التتبع الميداني', icon: MapPin },
    { id: 'budget-planning', label: 'قسم الميزانية والتخطيط المالي', icon: DollarSign },
    { id: 'attendance', label: 'نظام الحضور والانصراف', icon: Clock },
    { id: 'employee-services', label: 'قسم خدمات الموظفين', icon: User }
  ];

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
                <h1 className="text-3xl font-bold text-foreground">نظام إدارة الموارد البشرية المتكامل</h1>
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
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          {/* Professional Grid Navigation - All Tabs Visible */}
          <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg p-4 mb-6">
            {/* Control Icons for Tab Organization */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="ترتيب الأيقونات" onClick={() => handleTabReorder('settings')}>
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="إعادة ترتيب" onClick={() => handleTabReorder('reset')}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="نقل للأعلى" onClick={() => handleTabMove('up')}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="نقل للأسفل" onClick={() => handleTabMove('down')}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="نقل لليمين" onClick={() => handleTabMove('right')}>
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors" title="نقل لليسار" onClick={() => handleTabMove('left')}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className={`h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors ${isDragMode ? 'bg-[#009F87]/20 text-[#009F87] animate-pulse' : ''}`} title="ترتيب بالماوس - حسب الرغبة" onClick={() => toggleDragMode()}>
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {/* Dashboard Tab - Moved to top */}
                <Button 
                  variant={activeTab === 'dashboard' ? "default" : "ghost"} 
                  size="sm" 
                  className={`h-8 px-3 text-xs transition-all duration-300 ${
                    activeTab === 'dashboard' 
                      ? "bg-[#009F87] text-white shadow-md hover:bg-[#009F87]/90" 
                      : "hover:bg-[#009F87]/10 hover:text-[#009F87]"
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <BarChart3 className="h-3 w-3 ml-1" />
                  لوحة التحكم
                </Button>
                
                {/* General Settings Tab */}
                <Button 
                  variant={activeTab === 'settings' ? "default" : "ghost"} 
                  size="sm" 
                  className={`h-8 px-3 text-xs transition-all duration-300 ${
                    activeTab === 'settings' 
                      ? "bg-[#009F87] text-white shadow-md hover:bg-[#009F87]/90" 
                      : "hover:bg-[#009F87]/10 hover:text-[#009F87]"
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="h-3 w-3 ml-1" />
                  الإعدادات العامة
                </Button>
                 
                <Button
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-3 text-xs transition-all duration-300 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 hover:border-[#009F87]/30 rounded-lg"
                >
                  <Download className="h-3 w-3 ml-1" />
                  حفظ التخطيط
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-3 text-xs transition-all duration-300 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 hover:border-[#009F87]/30 rounded-lg"
                >
                  <Settings className="h-3 w-3 ml-1" />
                  تخصيص
                </Button>
              </div>
            </div>
            
            <div className="w-full">
              <TabsList className={`grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 bg-transparent p-0 h-auto w-full transition-all duration-300 ${isDragMode ? 'bg-gradient-to-r from-[#009F87]/5 to-transparent border border-dashed border-[#009F87]/30 rounded-lg p-2' : ''}`}>
                {tabOrder.map((tab, index) => {
                  const tabConfig = tabsConfig.find(config => config.id === tab);
                  if (!tabConfig) return null;
                  
                  return (
                    <TabsTrigger 
                      key={tab} 
                      value={tab} 
                      className={`group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg ${isDragMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                      draggable={isDragMode}
                      onDragStart={(e) => {
                        if (!isDragMode) return;
                        e.dataTransfer.setData('text/plain', tab);
                        e.dataTransfer.effectAllowed = 'move';
                      }}
                      onDragOver={(e) => {
                        if (!isDragMode) return;
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                      }}
                      onDrop={(e) => {
                        if (!isDragMode) return;
                        e.preventDefault();
                        const draggedTab = e.dataTransfer.getData('text/plain') as TabType;
                        const dropIndex = index;
                        const dragIndex = tabOrder.findIndex(t => t === draggedTab);
                        
                        if (dragIndex !== dropIndex) {
                          const newTabOrder = [...tabOrder];
                          const [removed] = newTabOrder.splice(dragIndex, 1);
                          newTabOrder.splice(dropIndex, 0, removed);
                          setTabOrder(newTabOrder);
                          
                          toast({
                            title: "تم إعادة الترتيب",
                            description: "تم ترتيب التبويبات بنجاح",
                          });
                        }
                      }}
                    >
                      <tabConfig.icon className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                      <span className="text-center leading-tight">{tabConfig.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </div>

          {/* Tab Contents */}
          <TabsContent value="dashboard">
            <ComprehensiveDashboard onNavigateToSection={handleTabChange} />
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
            <SmartAttendanceSystem />
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
            <CombinedRequestsNotifications onBack={() => setActiveTab('dashboard')} onNavigateToSection={handleTabChange} />
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

          <TabsContent value="attendance">
            <SmartAttendanceSystem />
          </TabsContent>

          <TabsContent value="budget-planning">
            <BudgetFinancialPlanning onBack={() => setActiveTab('dashboard')} />
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
    <Toaster />
    </div>;
};
export default ComprehensiveEmployeeManagement;