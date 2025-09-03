import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
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
  ArrowRight,
  ArrowUp,
  ArrowDown,
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
  HardHat,
  Grid3X3,
  Save
} from 'lucide-react';

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

const ComprehensiveEmployeeManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  
  // Default tabs configuration
  const defaultTabs = [
    { id: 'teamwork', label: 'قسم فريق العمل', icon: Users2, visible: true },
    { id: 'departments', label: 'قسم الإدارات والوحدات', icon: Building, visible: true },
    { id: 'quality-of-life', label: 'قسم جودة الحياة', icon: Heart, visible: true },
    { id: 'skills-inventory', label: 'قسم مخزون المهارات', icon: Briefcase, visible: true },
    { id: 'internal-communication', label: 'قسم التواصل الداخلي', icon: Users2, visible: true },
    { id: 'admin-communications', label: 'الاتصالات الادارية', icon: MessageCircle, visible: true },
    { id: 'occupational-safety', label: 'السلامة المهنية', icon: HardHat, visible: true },
    { id: 'social-services', label: 'الخدمات الاجتماعية', icon: Heart, visible: true },
    { id: 'attendance', label: 'الحضور والانصراف', icon: Clock, visible: true },
    { id: 'employee-services', label: 'قسم خدمات الموظفين', icon: User, visible: true },
    { id: 'disciplinary', label: 'الجزاءات والعقوبات', icon: AlertTriangle, visible: true },
    { id: 'leaves', label: 'الإجازات والعطلات', icon: Calendar, visible: true },
    { id: 'payroll', label: 'الرواتب والأجور', icon: DollarSign, visible: true },
    { id: 'government', label: 'التكامل والربط', icon: Plug, visible: true },
    { id: 'organization', label: 'التطوير والتنظيم المؤسسي', icon: Network, visible: true },
    { id: 'governance', label: 'الحوكمة والامتثال', icon: Shield, visible: true },
    { id: 'wageprotection', label: 'حماية الأجور', icon: Banknote, visible: true },
    { id: 'legal', label: 'الشؤون القانونية', icon: Scale, visible: true },
    { id: 'performance', label: 'تقييم الأداء الذكي', icon: Target, visible: true },
    { id: 'training', label: 'نظام التدريب الشامل', icon: GraduationCap, visible: true },
    { id: 'recruitment', label: 'التوظيف الذكي', icon: UserPlus, visible: true },
    { id: 'insurance', label: 'إدارة التأمينات', icon: Shield, visible: true },
    { id: 'rewards', label: 'المكافآت والحوافز', icon: Gift, visible: true },
    { id: 'tasks', label: 'متابعة المهام', icon: CheckSquare, visible: true },
    { id: 'announcements', label: 'الإعلانات والتبليغات', icon: Megaphone, visible: true },
    { id: 'ai', label: 'الذكاء الاصطناعي', icon: Bot, visible: true },
    { id: 'reports', label: 'التقارير', icon: FileBarChart, visible: true },
    { id: 'meetings', label: 'مركز الاجتماعات', icon: Calendar, visible: true },
    { id: 'signatures', label: 'التوقيع الإلكتروني', icon: PenTool, visible: true },
    { id: 'talent', label: 'إدارة المواهب', icon: Star, visible: true },
    { id: 'field-tracking', label: 'تتبع العمل الميداني', icon: MapPin, visible: true },
    { id: 'health', label: 'الصحة والسلامة المهنية', icon: HardHat, visible: true },
    { id: 'settings', label: 'الإعدادات', icon: Settings, visible: true }
  ];

  const [tabsConfig, setTabsConfig] = useState(() => {
    const saved = localStorage.getItem('employee-management-tabs');
    try {
      const parsedTabs = saved ? JSON.parse(saved) : defaultTabs;
      // Validate and ensure all tabs have required properties
      const validatedTabs = parsedTabs.filter(tab => 
        tab && 
        typeof tab === 'object' && 
        tab.id && 
        tab.label && 
        tab.icon &&
        typeof tab.visible === 'boolean'
      );
      return validatedTabs.length > 0 ? validatedTabs : defaultTabs;
    } catch (error) {
      console.error('Error parsing saved tabs config:', error);
      return defaultTabs;
    }
  });

  // Drag and drop states
  const [draggedTab, setDraggedTab] = useState<string | null>(null);
  const [dragOverTab, setDragOverTab] = useState<string | null>(null);

  // Save tabs configuration to localStorage
  const saveTabsConfig = useCallback(() => {
    console.log('حفظ التخطيط:', tabsConfig);
    localStorage.setItem('employee-management-tabs', JSON.stringify(tabsConfig));
    toast.success('تم حفظ التخطيط بنجاح');
  }, [tabsConfig]);

  // Reset to default configuration
  const resetTabsConfig = useCallback(() => {
    console.log('إعادة تعيين التخطيط إلى الافتراضي');
    setTabsConfig(defaultTabs);
    localStorage.removeItem('employee-management-tabs');
    toast.success('تم إعادة تعيين التخطيط إلى الافتراضي');
  }, []);

  // Move tab left
  const moveTabLeft = useCallback(() => {
    console.log('نقل التبويب يساراً:', activeTab);
    const currentIndex = tabsConfig.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      const newTabs = [...tabsConfig];
      const temp = newTabs[currentIndex];
      newTabs[currentIndex] = newTabs[currentIndex - 1];
      newTabs[currentIndex - 1] = temp;
      setTabsConfig(newTabs);
      toast.success('تم نقل التبويب إلى اليسار');
    } else {
      toast.error('لا يمكن نقل التبويب أكثر إلى اليسار');
    }
  }, [activeTab, tabsConfig]);

  // Move tab right
  const moveTabRight = useCallback(() => {
    console.log('نقل التبويب يميناً:', activeTab);
    const currentIndex = tabsConfig.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabsConfig.length - 1) {
      const newTabs = [...tabsConfig];
      const temp = newTabs[currentIndex];
      newTabs[currentIndex] = newTabs[currentIndex + 1];
      newTabs[currentIndex + 1] = temp;
      setTabsConfig(newTabs);
      toast.success('تم نقل التبويب إلى اليمين');
    } else {
      toast.error('لا يمكن نقل التبويب أكثر إلى اليمين');
    }
  }, [activeTab, tabsConfig]);

  // Sort tabs alphabetically
  const sortTabsAlphabetically = useCallback(() => {
    console.log('ترتيب التبويبات أبجدياً');
    const sortedTabs = [...tabsConfig].sort((a, b) => 
      a.label.localeCompare(b.label, 'ar')
    );
    setTabsConfig(sortedTabs);
    toast.success('تم ترتيب التبويبات أبجدياً');
  }, [tabsConfig]);

  // Save layout configuration to localStorage
  const saveLayoutConfiguration = useCallback(() => {
    console.log('حفظ تخطيط التبويبات');
    localStorage.setItem('employee-management-layout', JSON.stringify(tabsConfig));
    toast.success('تم حفظ تخطيط التبويبات بنجاح');
  }, [tabsConfig]);

  // Open customization options
  const openCustomization = useCallback(() => {
    console.log('فتح خيارات التخصيص');
    toast.success('سيتم فتح خيارات التخصيص قريباً');
  }, []);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, tabId: string) => {
    setDraggedTab(tabId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', tabId);
  };

  const handleDragOver = (e: React.DragEvent, tabId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverTab(tabId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverTab(null);
  };

  const handleDrop = (e: React.DragEvent, dropTabId: string) => {
    e.preventDefault();
    
    if (!draggedTab || draggedTab === dropTabId) {
      setDraggedTab(null);
      setDragOverTab(null);
      return;
    }

    const draggedIndex = tabsConfig.findIndex(tab => tab.id === draggedTab);
    const dropIndex = tabsConfig.findIndex(tab => tab.id === dropTabId);

    if (draggedIndex === -1 || dropIndex === -1) return;

    const newTabs = [...tabsConfig];
    const draggedTabData = newTabs[draggedIndex];
    
    // Remove dragged tab from its original position
    newTabs.splice(draggedIndex, 1);
    // Insert dragged tab at new position
    newTabs.splice(dropIndex, 0, draggedTabData);

    setTabsConfig(newTabs);
    setDraggedTab(null);
    setDragOverTab(null);
    
    toast.success('تم إعادة ترتيب التبويب بنجاح');
  };

  const handleDragEnd = () => {
    setDraggedTab(null);
    setDragOverTab(null);
  };

  // Move tab up (to earlier position in array)
  const moveTabUp = useCallback(() => {
    console.log('نقل التبويب للأعلى:', activeTab);
    const currentIndex = tabsConfig.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      const newTabs = [...tabsConfig];
      const temp = newTabs[currentIndex];
      newTabs[currentIndex] = newTabs[currentIndex - 1];
      newTabs[currentIndex - 1] = temp;
      setTabsConfig(newTabs);
      toast.success('تم نقل التبويب للأعلى');
    } else {
      toast.error('لا يمكن نقل التبويب أكثر للأعلى');
    }
  }, [activeTab, tabsConfig]);

  // Move tab down (to later position in array)
  const moveTabDown = useCallback(() => {
    console.log('نقل التبويب للأسفل:', activeTab);
    const currentIndex = tabsConfig.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabsConfig.length - 1) {
      const newTabs = [...tabsConfig];
      const temp = newTabs[currentIndex];
      newTabs[currentIndex] = newTabs[currentIndex + 1];
      newTabs[currentIndex + 1] = temp;
      setTabsConfig(newTabs);
      toast.success('تم نقل التبويب للأسفل');
    } else {
      toast.error('لا يمكن نقل التبويب أكثر للأسفل');
    }
  }, [activeTab, tabsConfig]);

  // Toggle tab visibility
  const toggleTabVisibility = useCallback((tabId: string) => {
    console.log('تبديل رؤية التبويب:', tabId);
    setTabsConfig(prev => 
      prev.map(tab => 
        tab.id === tabId ? { ...tab, visible: !tab.visible } : tab
      )
    );
  }, []);

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
            {/* Control Icons for Tab Organization */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors"
                    title="ترتيب الأيقونات"
                    onClick={sortTabsAlphabetically}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors"
                    title="إعادة ترتيب"
                    onClick={resetTabsConfig}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors"
                    title="نقل للأعلى"
                    onClick={moveTabUp}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors"
                    title="نقل للأسفل"
                    onClick={moveTabDown}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors"
                    title="نقل لليمين"
                    onClick={moveTabRight}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors"
                    title="نقل لليسار"
                    onClick={moveTabLeft}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors"
                  onClick={saveLayoutConfiguration}
                >
                  <Download className="h-3 w-3 ml-1" />
                  حفظ التخطيط
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors"
                  onClick={openCustomization}
                >
                  <Settings className="h-3 w-3 ml-1" />
                  تخصيص
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs hover:bg-[#009F87]/10 hover:text-[#009F87] transition-colors"
                  onClick={() => setActiveTab('dashboard')}
                  title="لوحة التحكم"
                >
                  <BarChart3 className="h-3 w-3 ml-1" />
                  لوحة التحكم
                </Button>
              </div>
            </div>
            
            <div className="w-full">
              <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 bg-transparent p-0 h-auto w-full">
                {tabsConfig.filter(tab => tab && tab.visible === true).map((tab) => {
                  if (!tab || !tab.id || !tab.label || !tab.icon) return null;
                  
                  const IconComponent = tab.icon;
                  const isDragged = draggedTab === tab.id;
                  const isDraggedOver = dragOverTab === tab.id;
                  
                  return (
                    <TabsTrigger 
                      key={tab.id}
                      value={tab.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, tab.id)}
                      onDragOver={(e) => handleDragOver(e, tab.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, tab.id)}
                      onDragEnd={handleDragEnd}
                      className={`group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-lg cursor-move ${
                        isDragged ? 'opacity-50 scale-95' : ''
                      } ${
                        isDraggedOver ? 'border-[#009F87] border-2 bg-[#009F87]/5' : ''
                      }`}
                    >
                      <IconComponent className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                      <span className="text-center leading-tight">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
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
                <ComprehensiveFieldTracking onBack={() => setActiveTab('dashboard')} />
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