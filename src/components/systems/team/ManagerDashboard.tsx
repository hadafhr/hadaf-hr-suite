import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Target,
  Award,
  MessageSquare,
  FileText,
  Eye,
  UserPlus,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Heart,
  Brain,
  Star,
  Shield
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  manager: string;
  status: 'active' | 'on_leave' | 'terminated';
  joinDate: string;
  yearsInCompany: number;
  profilePicture?: string;
  performanceScore: number;
  attendanceRate: number;
  tasks: number;
  completedTasks: number;
  salary: number;
  leaveBalance: number;
  role: 'employee' | 'manager' | 'hr_admin';
  skills: string[];
  certifications: string[];
  riskScore?: number;
  burnoutRisk?: 'low' | 'medium' | 'high';
}

interface ManagerDashboardProps {
  employees: Employee[];
  currentUser: Employee | null;
  onViewProfile: (employee: Employee) => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  employees,
  currentUser,
  onViewProfile
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('today');

  // Filter team members based on manager
  const teamMembers = useMemo(() => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'hr_admin') {
      return employees; // HR admin can see all employees
    } else if (currentUser.role === 'manager') {
      return employees.filter(emp => emp.manager === currentUser.name);
    }
    
    return [];
  }, [employees, currentUser]);

  // Calculate team statistics
  const teamStats = useMemo(() => {
    const totalMembers = teamMembers.length;
    const activeMembers = teamMembers.filter(emp => emp.status === 'active').length;
    const onLeave = teamMembers.filter(emp => emp.status === 'on_leave').length;
    
    const averagePerformance = totalMembers > 0 
      ? Math.round(teamMembers.reduce((sum, emp) => sum + emp.performanceScore, 0) / totalMembers)
      : 0;
    
    const averageAttendance = totalMembers > 0
      ? Math.round(teamMembers.reduce((sum, emp) => sum + emp.attendanceRate, 0) / totalMembers)
      : 0;
    
    const totalTasks = teamMembers.reduce((sum, emp) => sum + emp.tasks, 0);
    const completedTasks = teamMembers.reduce((sum, emp) => sum + emp.completedTasks, 0);
    const taskCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const highPerformers = teamMembers.filter(emp => emp.performanceScore >= 90).length;
    const atRiskEmployees = teamMembers.filter(emp => emp.burnoutRisk === 'high').length;
    
    return {
      totalMembers,
      activeMembers,
      onLeave,
      averagePerformance,
      averageAttendance,
      taskCompletion,
      highPerformers,
      atRiskEmployees,
      totalTasks,
      completedTasks
    };
  }, [teamMembers]);

  // Get performance trend data
  const performanceTrend = useMemo(() => {
    const excellent = teamMembers.filter(emp => emp.performanceScore >= 90).length;
    const good = teamMembers.filter(emp => emp.performanceScore >= 70 && emp.performanceScore < 90).length;
    const needsImprovement = teamMembers.filter(emp => emp.performanceScore < 70).length;
    
    return { excellent, good, needsImprovement };
  }, [teamMembers]);

  // Get priority alerts
  const priorityAlerts = useMemo(() => {
    const alerts = [];
    
    // High-risk employees
    const highRiskEmployees = teamMembers.filter(emp => emp.burnoutRisk === 'high');
    if (highRiskEmployees.length > 0) {
      alerts.push({
        type: 'high',
        icon: AlertTriangle,
        title: `${highRiskEmployees.length} موظف معرض لخطر الإرهاق`,
        description: 'يحتاجون لمتابعة عاجلة',
        employees: highRiskEmployees.slice(0, 3)
      });
    }
    
    // Low performance
    const lowPerformanceEmployees = teamMembers.filter(emp => emp.performanceScore < 70);
    if (lowPerformanceEmployees.length > 0) {
      alerts.push({
        type: 'medium',
        icon: TrendingDown,
        title: `${lowPerformanceEmployees.length} موظف يحتاج تحسين الأداء`,
        description: 'أداء أقل من المتوقع',
        employees: lowPerformanceEmployees.slice(0, 3)
      });
    }
    
    // Low attendance
    const lowAttendanceEmployees = teamMembers.filter(emp => emp.attendanceRate < 85);
    if (lowAttendanceEmployees.length > 0) {
      alerts.push({
        type: 'medium',
        icon: Clock,
        title: `${lowAttendanceEmployees.length} موظف لديه مشاكل في الحضور`,
        description: 'معدل حضور أقل من 85%',
        employees: lowAttendanceEmployees.slice(0, 3)
      });
    }
    
    return alerts;
  }, [teamMembers]);

  // Get top performers
  const topPerformers = useMemo(() => {
    return teamMembers
      .filter(emp => emp.status === 'active')
      .sort((a, b) => b.performanceScore - a.performanceScore)
      .slice(0, 5);
  }, [teamMembers]);

  const handleViewEmployeeDetails = (employee: Employee) => {
    toast.success(`عرض تفاصيل الموظف: ${employee.name}`);
    // في التطبيق الحقيقي سيتم توجيه المستخدم لصفحة تفاصيل الموظف
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'bulk-approval':
        toast.success('فتح نافذة اعتماد جماعي للطلبات');
        break;
      case 'performance-review':
        toast.success('بدء عملية تقييم الأداء الشهري');
        break;
      case 'team-meeting':
        toast.success('جدولة اجتماع فريق جديد');
        break;
      case 'training-assign':
        toast.success('تخصيص برامج تدريبية للفريق');
        break;
      default:
        toast.success(`تنفيذ إجراء: ${action}`);
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertTextColor = (type: string) => {
    switch (type) {
      case 'high': return 'text-red-700';
      case 'medium': return 'text-yellow-700';
      case 'low': return 'text-blue-700';
      default: return 'text-gray-700';
    }
  };

  if (!currentUser || (currentUser.role !== 'manager' && currentUser.role !== 'hr_admin')) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-600 mb-2">غير مصرح</h3>
          <p className="text-slate-500">ليس لديك صلاحية للوصول إلى لوحة المدير</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">لوحة المدير</h2>
          <p className="text-slate-600">
            {currentUser.role === 'hr_admin' 
              ? 'نظرة شاملة على جميع الموظفين' 
              : `إدارة فريق ${currentUser.department}`
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/60 rounded-lg p-1">
            {(['today', 'week', 'month'] as const).map(period => (
              <Button
                key={period}
                variant={selectedTimeframe === period ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTimeframe(period)}
              >
                {period === 'today' ? 'اليوم' : period === 'week' ? 'الأسبوع' : 'الشهر'}
              </Button>
            ))}
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => window.location.href = '/add-employee'}
          >
            <UserPlus className="h-4 w-4" />
            إضافة موظف
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">إجمالي الفريق</p>
                <p className="text-3xl font-bold">{teamStats.totalMembers}</p>
                <p className="text-blue-100 text-sm">
                  {teamStats.activeMembers} نشط • {teamStats.onLeave} في إجازة
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">متوسط الأداء</p>
                <p className="text-3xl font-bold">{teamStats.averagePerformance}%</p>
                <p className="text-green-100 text-sm">
                  {teamStats.highPerformers} أداء متميز
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">معدل الحضور</p>
                <p className="text-3xl font-bold">{teamStats.averageAttendance}%</p>
                <p className="text-purple-100 text-sm">متوسط الفريق</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <CheckCircle className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">إنجاز المهام</p>
                <p className="text-3xl font-bold">{teamStats.taskCompletion}%</p>
                <p className="text-orange-100 text-sm">
                  {teamStats.completedTasks}/{teamStats.totalTasks} مهمة
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Target className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Alerts */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              التنبيهات العاجلة
            </CardTitle>
          </CardHeader>
          <CardContent>
            {priorityAlerts.length > 0 ? (
              <div className="space-y-4">
                {priorityAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start gap-3">
                      <alert.icon className={`h-5 w-5 mt-0.5 ${getAlertTextColor(alert.type)}`} />
                      <div className="flex-1">
                        <h4 className={`font-medium ${getAlertTextColor(alert.type)}`}>
                          {alert.title}
                        </h4>
                        <p className="text-sm text-slate-600 mb-3">{alert.description}</p>
                        
                        <div className="flex items-center gap-2">
                          {alert.employees.map((emp, empIndex) => (
                            <div key={empIndex} className="flex items-center gap-2 bg-white/60 rounded-full px-3 py-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={emp.profilePicture} />
                                <AvatarFallback className="text-xs bg-slate-200">
                                  {emp.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{emp.name.split(' ')[0]}</span>
                            </div>
                          ))}
                          {alert.employees.length > 3 && (
                            <span className="text-sm text-slate-500">
                              +{alert.employees.length - 3} آخرين
                            </span>
                          )}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-white/60"
                        onClick={() => handleViewEmployeeDetails(alert.employees[0])}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">كل شيء يسير بسلاسة</h3>
                <p className="text-slate-500">لا توجد تنبيهات عاجلة في الوقت الحالي</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الأداء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">ممتاز (90%+)</span>
                </div>
                <span className="font-bold text-green-600">{performanceTrend.excellent}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">جيد (70-89%)</span>
                </div>
                <span className="font-bold text-blue-600">{performanceTrend.good}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">يحتاج تحسين (&lt;70%)</span>
                </div>
                <span className="font-bold text-red-600">{performanceTrend.needsImprovement}</span>
              </div>
              
              {/* Visual representation */}
              <div className="mt-6">
                <div className="flex h-2 bg-slate-200 rounded-full overflow-hidden">
                  {teamStats.totalMembers > 0 && (
                    <>
                      <div 
                        className="bg-green-500"
                        style={{ width: `${(performanceTrend.excellent / teamStats.totalMembers) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-blue-500"
                        style={{ width: `${(performanceTrend.good / teamStats.totalMembers) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-red-500"
                        style={{ width: `${(performanceTrend.needsImprovement / teamStats.totalMembers) * 100}%` }}
                      ></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Panel */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            الإجراءات السريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-20 flex-col"
              onClick={() => handleQuickAction('bulk-approval')}
            >
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-sm">اعتماد جماعي</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-20 flex-col"
              onClick={() => handleQuickAction('performance-review')}
            >
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <span className="text-sm">تقييم الأداء</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-20 flex-col"
              onClick={() => handleQuickAction('team-meeting')}
            >
              <MessageSquare className="h-6 w-6 text-purple-600" />
              <span className="text-sm">اجتماع الفريق</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-20 flex-col"
              onClick={() => handleQuickAction('training-assign')}
            >
              <Award className="h-6 w-6 text-orange-600" />
              <span className="text-sm">برامج التدريب</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers and Team Members */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              أفضل الموظفين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((employee, index) => (
                <div key={employee.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-amber-600' : 'bg-slate-300'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={employee.profilePicture} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                      {employee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{employee.name}</h4>
                    <p className="text-sm text-slate-600">{employee.position}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{employee.performanceScore}%</div>
                    <div className="text-xs text-slate-500">الأداء</div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onViewProfile(employee)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="flex flex-col items-center gap-2 h-20">
                <MessageSquare className="h-6 w-6" />
                <span className="text-sm">إرسال رسالة</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">جدولة اجتماع</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
                <Target className="h-6 w-6" />
                <span className="text-sm">تخصيص مهمة</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
                <FileText className="h-6 w-6" />
                <span className="text-sm">طلب تقرير</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
                <Award className="h-6 w-6" />
                <span className="text-sm">منح مكافأة</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
                <Settings className="h-6 w-6" />
                <span className="text-sm">إعدادات الفريق</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;