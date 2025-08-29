import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  ChevronDown,
  ChevronRight,
  Crown,
  Building2,
  TrendingUp,
  Award,
  UserCheck,
  Bell,
  Video
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
import OrganizationalDevelopment from '@/components/systems/OrganizationalDevelopment';
import { GovernanceCompliance } from '@/components/systems/GovernanceCompliance';
import { WageProtectionSystem } from '@/components/systems/WageProtectionSystem';
import LegalAffairs from '@/components/systems/LegalAffairs';
import { PerformanceEvaluation } from '@/components/systems/PerformanceEvaluation';
import TrainingDevelopment from '@/components/employee/TrainingDevelopment';
import SmartHire from '@/pages/SmartHire';
import { InsuranceManagement } from '@/components/systems/InsuranceManagement';
import { RewardsIncentivesManagement } from '@/components/systems/RewardsIncentivesManagement';
import MeetingHub from '@/pages/MeetingHub';
import { ElectronicSignature } from '@/components/systems/ElectronicSignature';
import { TasksTracking } from '@/components/systems/TasksTracking';
import { CombinedRequestsNotifications } from '@/components/systems/CombinedRequestsNotifications';
import ArtificialIntelligence from '@/components/systems/ArtificialIntelligence';
import Reports from '@/components/systems/Reports';
import ComprehensiveDisciplinarySystem from '@/components/disciplinary/ComprehensiveDisciplinarySystem';
import TalentManagementDepartment from '@/components/systems/TalentManagementDepartment';
import { TrackingSystem } from '@/components/systems/TrackingSystem';

const ComprehensiveEmployeeManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  // HR Categories according to international best practices
  const hrCategories = [
    {
      id: 'strategic',
      name: 'القيادة والإدارة الاستراتيجية',
      icon: Crown,
      color: 'bg-blue-500',
      modules: [
        { id: 'dashboard', name: 'لوحة التحكم الرئيسية', icon: BarChart3, featured: true },
        { id: 'governance', name: 'الحوكمة والامتثال', icon: Shield },
        { id: 'legal', name: 'الشؤون القانونية', icon: Scale },
        { id: 'meetings', name: 'الاجتماعات', icon: Video },
        { id: 'esignature', name: 'التوقيع الإلكتروني', icon: PenTool },
        { id: 'requests', name: 'الطلبات والإشعارات', icon: Bell },
        { id: 'ai', name: 'الذكاء الاصطناعي', icon: Bot },
        { id: 'settings', name: 'الإعدادات', icon: Settings }
      ]
    },
    {
      id: 'organizational',
      name: 'الهيكلة والتنظيم المؤسسي',
      icon: Building2,
      color: 'bg-green-500',
      modules: [
        { id: 'departments', name: 'الإدارات والأقسام', icon: Building },
        { id: 'organization', name: 'التطوير والتنظيم المؤسسي', icon: Network },
        { id: 'talents', name: 'إدارة المواهب', icon: Star },
        { id: 'training', name: 'التدريب والتطوير', icon: GraduationCap }
      ]
    },
    {
      id: 'operations',
      name: 'العمليات اليومية للموارد البشرية',
      icon: Clock,
      color: 'bg-orange-500',
      modules: [
        { id: 'employees', name: 'فريق العمل', icon: Users },
        { id: 'attendance', name: 'الحضور والانصراف', icon: Clock },
        { id: 'leaves', name: 'الإجازات والعطلات', icon: Calendar },
        { id: 'tasks', name: 'المهام والمتابعة', icon: CheckSquare },
        { id: 'tracking', name: 'التتبع الميداني', icon: MapPin },
        { id: 'selfservice', name: 'نظام الخدمة الذاتية السحابي', icon: User }
      ]
    },
    {
      id: 'acquisition',
      name: 'التوظيف والتكامل',
      icon: UserPlus,
      color: 'bg-purple-500',
      modules: [
        { id: 'recruitment', name: 'التوظيف والتعيين', icon: UserPlus },
        { id: 'insurance', name: 'التأمين', icon: Shield },
        { id: 'government', name: 'التكامل والربط', icon: Plug }
      ]
    },
    {
      id: 'performance',
      name: 'الأداء والمكافآت',
      icon: TrendingUp,
      color: 'bg-red-500',
      modules: [
        { id: 'evaluation', name: 'تقييم الأداء', icon: Target },
        { id: 'payroll', name: 'الرواتب والأجور', icon: DollarSign },
        { id: 'rewards', name: 'المكافآت والحوافز', icon: Gift },
        { id: 'wageprotection', name: 'حماية الأجور', icon: Banknote }
      ]
    },
    {
      id: 'relations',
      name: 'الانضباط والعلاقات العمالية',
      icon: AlertTriangle,
      color: 'bg-yellow-500',
      modules: [
        { id: 'disciplinary', name: 'الجزاءات والعقوبات', icon: AlertTriangle }
      ]
    },
    {
      id: 'analytics',
      name: 'التحليلات والتقارير',
      icon: FileBarChart,
      color: 'bg-indigo-500',
      modules: [
        { id: 'reports', name: 'التقارير', icon: FileBarChart }
      ]
    }
  ];

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
        <div className="flex h-16 items-center px-6">
          {/* BOUD Logo */}
          <div className="flex items-center gap-3 ml-4">
            <BoudLogo 
              variant="full" 
              size="md"
              className="h-8 w-auto"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4 hover:bg-[#009F87]/10"
          >
            <ArrowLeft className="h-3 w-3 ml-2" />
            العودة
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#009F87]/10 rounded-md">
              <Users className="h-4 w-4 text-[#009F87]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#009F87]">نظام إدارة الموظفين الشامل</h1>
              <p className="text-xs text-muted-foreground">إدارة احترافية لدورة حياة الموظف الكاملة</p>
            </div>
          </div>
          
          <div className="mr-auto flex items-center gap-2">
            {/* Dashboard Button */}
            <Button 
              onClick={() => setActiveTab('dashboard')}
              variant={activeTab === 'dashboard' ? 'default' : 'outline'}
              size="sm"
              className={`transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-[#009F87] text-white hover:bg-[#009F87]/90' 
                  : 'hover:bg-[#009F87] hover:text-white'
              }`}
            >
              <BarChart3 className="h-3 w-3 ml-2" />
              لوحة التحكم
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-[#009F87] hover:text-white transition-colors"
            >
              <RefreshCw className="h-3 w-3 ml-2" />
              تحديث
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-[#009F87] hover:text-white transition-colors"
            >
              <Download className="h-3 w-3 ml-2" />
              تصدير
            </Button>
          </div>
        </div>
      </div>

      <div className="relative p-6">
        {/* Strategic HR Categories Layout */}
        <div className="space-y-6">
          {/* Quick Access Dashboard Button */}
          <div className="mb-4">
            <Card className="border-2 border-[#009F87]/20 bg-gradient-to-r from-[#009F87]/5 to-[#009F87]/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#009F87] rounded-lg text-white">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#009F87]">لوحة التحكم الرئيسية</h3>
                      <p className="text-xs text-muted-foreground">نظرة شاملة على جميع البيانات والإحصائيات</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setActiveCategory(null);
                    }}
                    variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                    size="sm"
                    className={`transition-all ${
                      activeTab === 'dashboard' 
                        ? 'bg-[#009F87] text-white hover:bg-[#009F87]/90' 
                        : 'hover:bg-[#009F87] hover:text-white'
                    }`}
                  >
                    <ArrowLeft className="h-3 w-3 ml-2" />
                    عرض لوحة التحكم
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories Row - Horizontal Layout */}
          <div className="flex flex-wrap gap-3 justify-center">
            {hrCategories.map((category) => {
              const CategoryIcon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <Card key={category.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-[#009F87] min-w-[280px] flex-1">
                  <Collapsible open={isActive} onOpenChange={() => setActiveCategory(isActive ? null : category.id)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-md ${category.color} text-white`}>
                              <CategoryIcon className="h-3 w-3" />
                            </div>
                            <CardTitle className="text-xs font-bold text-right">
                              {category.name}
                            </CardTitle>
                          </div>
                          {isActive ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 px-3 pb-3">
                        <div className="space-y-1">
                          {category.modules.map((module) => {
                            const ModuleIcon = module.icon;
                            const isFeatured = (module as any).featured;
                            return (
                              <button
                                key={module.id}
                                onClick={() => {
                                  setActiveTab(module.id);
                                  if (module.id === 'dashboard') {
                                    setActiveCategory(null);
                                  }
                                }}
                                className={`w-full flex items-center gap-2 p-2 rounded-md text-right transition-all duration-200 hover:bg-[#009F87]/10 hover:text-[#009F87] ${
                                  activeTab === module.id 
                                    ? 'bg-[#009F87] text-white shadow-sm' 
                                    : isFeatured
                                    ? 'bg-[#009F87]/5 text-[#009F87] border border-[#009F87]/20'
                                    : 'bg-gray-50 text-gray-700'
                                }`}
                              >
                                <ModuleIcon className="h-3 w-3 flex-shrink-0" />
                                <span className="text-xs font-medium">{module.name}</span>
                                {isFeatured && (
                                  <Star className="h-2 w-2 text-yellow-500 mr-auto" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>

          {/* Active Module Content */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Content Header with Back Button */}
            <div className="border-b bg-gray-50/50 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeTab !== 'dashboard' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('dashboard')}
                      className="hover:bg-[#009F87]/10 text-[#009F87]"
                    >
                      <ArrowLeft className="h-3 w-3 ml-1" />
                      عودة لوحة التحكم
                    </Button>
                  )}
                  <div className="h-4 w-px bg-gray-300 mx-2" />
                  <h2 className="text-sm font-semibold text-gray-800">
                    {hrCategories
                      .flatMap(cat => cat.modules)
                      .find(mod => mod.id === activeTab)?.name || 'لوحة التحكم الرئيسية'}
                  </h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="hover:bg-[#009F87] hover:text-white"
                >
                  <RefreshCw className="h-3 w-3 ml-1" />
                  تحديث
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Content for each module */}
                <TabsContent value="dashboard" className="mt-0">
                  <ComprehensiveDashboard />
                </TabsContent>
              
              <TabsContent value="employees" className="mt-0">
                <TeamMembers />
              </TabsContent>
              
              <TabsContent value="departments" className="mt-0">
                <DepartmentsManagement onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="attendance" className="mt-0">
                <ComprehensiveAttendance />
              </TabsContent>
              
              <TabsContent value="disciplinary" className="mt-0">
                <ComprehensiveDisciplinarySystem />
              </TabsContent>
              
              <TabsContent value="leaves" className="mt-0">
                <ComprehensiveLeaveSystem />
              </TabsContent>
              
              <TabsContent value="payroll" className="mt-0">
                <ComprehensivePayrollSystem />
              </TabsContent>
              
              <TabsContent value="government" className="mt-0">
                <GovernmentIntegration onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="organization" className="mt-0">
                <OrganizationalDevelopment onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="governance" className="mt-0">
                <GovernanceCompliance onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="wageprotection" className="mt-0">
                <WageProtectionSystem onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="legal" className="mt-0">
                <LegalAffairs onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="evaluation" className="mt-0">
                <PerformanceEvaluation onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="training" className="mt-0">
                <TrainingDevelopment />
              </TabsContent>
              
              <TabsContent value="recruitment" className="mt-0">
                <SmartHire />
              </TabsContent>
              
              <TabsContent value="insurance" className="mt-0">
                <InsuranceManagement onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="rewards" className="mt-0">
                <RewardsIncentivesManagement onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="meetings" className="mt-0">
                <MeetingHub />
              </TabsContent>
              
              <TabsContent value="esignature" className="mt-0">
                <ElectronicSignature onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="tasks" className="mt-0">
                <TasksTracking onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="requests" className="mt-0">
                <CombinedRequestsNotifications onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-0">
                <ArtificialIntelligence onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="reports" className="mt-0">
                <Reports onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="talents" className="mt-0">
                <TalentManagementDepartment onBack={() => setActiveTab('dashboard')} />
              </TabsContent>
              
              <TabsContent value="tracking" className="mt-0">
                <TrackingSystem />
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0">
                <SystemSettings />
              </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Details Dialog */}
      <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-right">تفاصيل الموظف</DialogTitle>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="space-y-6" dir="rtl">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
                  <AvatarFallback>{selectedEmployee.name?.charAt(0) || 'M'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground">{selectedEmployee.position}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.department}</p>
                  <div className="mt-2">
                    {getStatusBadge(selectedEmployee.status)}
                  </div>
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