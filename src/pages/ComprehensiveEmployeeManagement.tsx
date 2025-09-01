import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Clock, 
  DollarSign, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Award,
  UserCheck,
  Settings,
  TrendingUp,
  Building,
  Target,
  Shield,
  Briefcase,
  Calendar,
  MessageSquare,
  Activity,
  ChevronRight,
  ArrowLeft,
  RefreshCw,
  Download,
  AlertTriangle,
  Plug,
  Network,
  Banknote,
  Scale,
  GraduationCap,
  Star,
  UserPlus,
  Gift,
  CalendarClock,
  PenTool,
  CheckSquare,
  Bot,
  FileBarChart,
  MapPin,
  User
} from 'lucide-react';
import { TeamMembers } from '@/components/systems/TeamMembers';
import { ComprehensiveAttendanceSystem } from '@/components/systems/ComprehensiveAttendanceSystem';
import { ComprehensivePayrollSystem } from '@/components/systems/ComprehensivePayrollSystem';
import { ComprehensiveTrainingSystem } from '@/components/systems/ComprehensiveTrainingSystem';
import { BoudHRHeader } from '@/components/shared/BoudHRHeader';
import { BoudLogo } from '@/components/BoudLogo';
import { ComprehensiveDashboard } from '@/components/dashboard/ComprehensiveDashboard';
import { mockEmployees } from '@/data/mockEmployees';

const ComprehensiveEmployeeManagement = () => {
  const navigate = useNavigate();
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Calculate statistics from mock data
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;
  const avgPerformance = Math.round(mockEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / totalEmployees);
  const totalPayroll = mockEmployees.reduce((sum, emp) => sum + emp.salary, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/10 text-success border-success/20">نشط</Badge>;
      case 'inactive':
        return <Badge variant="secondary">غير نشط</Badge>;
      case 'on_leave':
        return <Badge variant="outline">في إجازة</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  if (activeSystem === 'team') {
    return <TeamMembers onBack={() => setActiveSystem(null)} />;
  }

  if (activeSystem === 'attendance') {
    return <ComprehensiveAttendanceSystem onBack={() => setActiveSystem(null)} />;
  }

  if (activeSystem === 'payroll') {
    return <ComprehensivePayrollSystem onBack={() => setActiveSystem(null)} />;
  }

  if (activeSystem === 'training') {
    return <ComprehensiveTrainingSystem onBack={() => setActiveSystem(null)} />;
  }

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
          {/* Professional Horizontal Navigation - Optimized for 20 Icons */}
          <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg p-4 mb-6">
            <div className="horizontal-icon-nav overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#009F87 transparent' }}>
              <TabsList className="flex w-max gap-3 bg-transparent p-0 h-auto min-w-max">
                <TabsTrigger 
                  value="dashboard" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <BarChart3 className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  لوحة التحكم
                </TabsTrigger>
                <TabsTrigger 
                  value="employees" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Users className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  فريق العمل
                </TabsTrigger>
                <TabsTrigger 
                  value="departments" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Building className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  الإدارات والاقسام
                </TabsTrigger>
                <TabsTrigger 
                  value="attendance" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Clock className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  الحضور والانصراف
                </TabsTrigger>
                <TabsTrigger 
                  value="disciplinary" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <AlertTriangle className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  الجزاءات والعقوبات
                </TabsTrigger>
                <TabsTrigger 
                  value="leaves" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Calendar className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  الإجازات والعطلات
                </TabsTrigger>
                <TabsTrigger 
                  value="payroll" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <DollarSign className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  الرواتب والأجور
                </TabsTrigger>
                <TabsTrigger 
                  value="government" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Plug className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  التكامل والربط
                </TabsTrigger>
                <TabsTrigger 
                  value="organization" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Network className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  التطوير والتنظيم المؤسسي
                </TabsTrigger>
                <TabsTrigger 
                  value="governance" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Shield className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  الحوكمة والامتثال
                </TabsTrigger>
                <TabsTrigger 
                  value="wageprotection" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Banknote className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  حماية الأجور
                </TabsTrigger>
                <TabsTrigger 
                  value="legal" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Scale className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  الشؤون القانونية
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Target className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  تقييم الأداء
                </TabsTrigger>
                <TabsTrigger 
                  value="training" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <GraduationCap className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  التدريب والتطوير
                </TabsTrigger>
                <TabsTrigger 
                  value="talents" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Star className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  إدارة المواهب
                </TabsTrigger>
                <TabsTrigger 
                  value="recruitment" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <UserPlus className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  التوظيف والتعين
                </TabsTrigger>
                <TabsTrigger 
                  value="benefits" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Gift className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  المكافآت والحوافز
                </TabsTrigger>
                <TabsTrigger 
                  value="ai" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Bot className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  الذكاء الاصطناعي
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <FileBarChart className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  التقارير
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="group flex-shrink-0 px-6 py-3 rounded-lg whitespace-nowrap font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-md bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] min-w-[140px] justify-center hover:scale-105 hover:shadow-lg"
                >
                  <Settings className="h-4 w-4 ml-2 flex-shrink-0 transition-transform group-hover:scale-110" />
                  الإعدادات
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Navigation Helper */}
            <div className="flex justify-center mt-2">
              <p className="text-xs text-muted-foreground">اسحب لليمين أو اليسار لعرض جميع الأنظمة (20 نظام)</p>
            </div>
          </div>

          {/* Tab Contents */}
          <TabsContent value="dashboard">
            <ComprehensiveDashboard onNavigateToSection={setActiveTab} />
          </TabsContent>

          <TabsContent value="employees">
            <TeamMembers onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="departments">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">إدارة الأقسام</h3>
                <p className="text-muted-foreground">عرض وإدارة أقسام الشركة</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <ComprehensiveAttendanceSystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="disciplinary">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">النظام التأديبي</h3>
                <p className="text-muted-foreground">إدارة الإجراءات التأديبية</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">إدارة الإجازات</h3>
                <p className="text-muted-foreground">نظام شامل لإدارة الإجازات</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll">
            <ComprehensivePayrollSystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="government">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Network className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">التكامل الحكومي</h3>
                <p className="text-muted-foreground">الربط مع الأنظمة الحكومية</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organization">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">التطوير التنظيمي</h3>
                <p className="text-muted-foreground">تطوير الهيكل التنظيمي</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">الحوكمة والامتثال</h3>
                <p className="text-muted-foreground">أنظمة الحوكمة والامتثال</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wageprotection">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">حماية الأجور</h3>
                <p className="text-muted-foreground">نظام حماية الأجور</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Scale className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">الشؤون القانونية</h3>
                <p className="text-muted-foreground">إدارة الشؤون القانونية</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">تقييم الأداء</h3>
                <p className="text-muted-foreground">نظام التقييم المتقدم</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <ComprehensiveTrainingSystem onBack={() => setActiveTab('dashboard')} />
          </TabsContent>

          <TabsContent value="talents">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">إدارة المواهب</h3>
                <p className="text-muted-foreground">نظام شامل لإدارة المواهب</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recruitment">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <UserPlus className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">التوظيف الذكي</h3>
                <p className="text-muted-foreground">نظام التوظيف الذكي</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Gift className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">المكافآت والحوافز</h3>
                <p className="text-muted-foreground">نظام المكافآت والحوافز</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Bot className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">الذكاء الاصطناعي</h3>
                <p className="text-muted-foreground">مساعد الذكاء الاصطناعي</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <FileBarChart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">التقارير</h3>
                <p className="text-muted-foreground">تقارير شاملة ومفصلة</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Settings className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">إعدادات النظام</h3>
                <p className="text-muted-foreground">إعدادات النظام العامة</p>
              </CardContent>
            </Card>
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
                        <span className="font-medium">{selectedEmployee.salary?.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">نقاط الأداء:</span>
                        <span className="font-medium">{selectedEmployee.performanceScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">معدل الحضور:</span>
                        <span className="font-medium">{selectedEmployee.attendanceRate}%</span>
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