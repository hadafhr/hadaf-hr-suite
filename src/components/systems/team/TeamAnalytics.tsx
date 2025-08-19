import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Users,
  Target,
  Calendar,
  Clock,
  Award,
  AlertTriangle,
  Brain,
  Zap,
  Heart,
  Star,
  Activity,
  Filter,
  Download,
  Building2
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

interface TeamAnalyticsProps {
  employees: Employee[];
}

const TeamAnalytics: React.FC<TeamAnalyticsProps> = ({ employees }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [activeInsight, setActiveInsight] = useState<string>('performance');

  // Filter employees based on selected department
  const filteredEmployees = useMemo(() => {
    return selectedDepartment 
      ? employees.filter(emp => emp.department === selectedDepartment)
      : employees;
  }, [employees, selectedDepartment]);

  // Calculate comprehensive analytics
  const analytics = useMemo(() => {
    const activeEmployees = filteredEmployees.filter(emp => emp.status === 'active');
    
    // Performance Analytics
    const avgPerformance = activeEmployees.length > 0 
      ? Math.round(activeEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / activeEmployees.length)
      : 0;
    
    const performanceDistribution = {
      excellent: activeEmployees.filter(emp => emp.performanceScore >= 90).length,
      good: activeEmployees.filter(emp => emp.performanceScore >= 70 && emp.performanceScore < 90).length,
      needsImprovement: activeEmployees.filter(emp => emp.performanceScore < 70).length
    };
    
    // Attendance Analytics
    const avgAttendance = activeEmployees.length > 0
      ? Math.round(activeEmployees.reduce((sum, emp) => sum + emp.attendanceRate, 0) / activeEmployees.length)
      : 0;
    
    // Department Analytics
    const departmentStats = employees.reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = {
          total: 0,
          active: 0,
          avgPerformance: 0,
          avgAttendance: 0,
          employees: []
        };
      }
      acc[emp.department].total += 1;
      acc[emp.department].employees.push(emp);
      if (emp.status === 'active') {
        acc[emp.department].active += 1;
      }
      return acc;
    }, {} as Record<string, any>);
    
    // Calculate department averages
    Object.keys(departmentStats).forEach(dept => {
      const deptEmployees = departmentStats[dept].employees.filter((emp: Employee) => emp.status === 'active');
      if (deptEmployees.length > 0) {
        departmentStats[dept].avgPerformance = Math.round(
          deptEmployees.reduce((sum: number, emp: Employee) => sum + emp.performanceScore, 0) / deptEmployees.length
        );
        departmentStats[dept].avgAttendance = Math.round(
          deptEmployees.reduce((sum: number, emp: Employee) => sum + emp.attendanceRate, 0) / deptEmployees.length
        );
      }
    });
    
    // Risk Analytics
    const riskAnalytics = {
      high: activeEmployees.filter(emp => emp.burnoutRisk === 'high').length,
      medium: activeEmployees.filter(emp => emp.burnoutRisk === 'medium').length,
      low: activeEmployees.filter(emp => emp.burnoutRisk === 'low').length
    };
    
    // Task Analytics
    const taskStats = {
      totalTasks: activeEmployees.reduce((sum, emp) => sum + emp.tasks, 0),
      completedTasks: activeEmployees.reduce((sum, emp) => sum + emp.completedTasks, 0),
      completionRate: 0
    };
    
    if (taskStats.totalTasks > 0) {
      taskStats.completionRate = Math.round((taskStats.completedTasks / taskStats.totalTasks) * 100);
    }
    
    // Experience Analytics
    const experienceDistribution = {
      newHires: activeEmployees.filter(emp => emp.yearsInCompany < 1).length,
      junior: activeEmployees.filter(emp => emp.yearsInCompany >= 1 && emp.yearsInCompany < 3).length,
      midLevel: activeEmployees.filter(emp => emp.yearsInCompany >= 3 && emp.yearsInCompany < 7).length,
      senior: activeEmployees.filter(emp => emp.yearsInCompany >= 7).length
    };
    
    // Retention Insights
    const retentionRate = employees.filter(emp => emp.status !== 'terminated').length / employees.length * 100;
    
    return {
      totalEmployees: filteredEmployees.length,
      activeEmployees: activeEmployees.length,
      avgPerformance,
      avgAttendance,
      performanceDistribution,
      departmentStats,
      riskAnalytics,
      taskStats,
      experienceDistribution,
      retentionRate
    };
  }, [filteredEmployees, employees]);

  // AI-Generated Insights
  const aiInsights = useMemo(() => {
    const insights = [];
    
    // Performance insights
    if (analytics.avgPerformance < 75) {
      insights.push({
        type: 'warning',
        icon: TrendingDown,
        title: 'انخفاض في الأداء العام',
        description: `متوسط الأداء ${analytics.avgPerformance}% - أقل من المستوى المطلوب`,
        recommendation: 'تنفيذ برامج تدريبية وتحسين نظام الحوافز',
        priority: 'high'
      });
    }
    
    // Risk insights
    if (analytics.riskAnalytics.high > 0) {
      insights.push({
        type: 'critical',
        icon: AlertTriangle,
        title: 'موظفون معرضون لخطر عالي',
        description: `${analytics.riskAnalytics.high} موظف معرض لخطر الإرهاق`,
        recommendation: 'تقليل أعباء العمل وتوفير الدعم النفسي',
        priority: 'critical'
      });
    }
    
    // Task completion insights
    if (analytics.taskStats.completionRate < 80) {
      insights.push({
        type: 'warning',
        icon: Target,
        title: 'انخفاض في إنجاز المهام',
        description: `معدل الإنجاز ${analytics.taskStats.completionRate}%`,
        recommendation: 'مراجعة توزيع المهام وتحسين سير العمل',
        priority: 'medium'
      });
    }
    
    // Positive insights
    if (analytics.avgPerformance >= 90) {
      insights.push({
        type: 'success',
        icon: Star,
        title: 'أداء متميز للفريق',
        description: `متوسط الأداء ${analytics.avgPerformance}% - ممتاز!`,
        recommendation: 'الحفاظ على هذا المستوى وتقديم مكافآت للفريق',
        priority: 'low'
      });
    }
    
    return insights.sort((a, b) => {
      const priorityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    });
  }, [analytics]);

  const departments = [...new Set(employees.map(emp => emp.department))];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50 text-red-800';
      case 'warning': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'success': return 'border-green-200 bg-green-50 text-green-800';
      default: return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-slate-900">تحليلات الفريق المتقدمة</h2>
              </div>
              
              <Badge variant="outline" className="bg-primary/10">
                {analytics.totalEmployees} موظف
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Department Filter */}
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white/60"
              >
                <option value="">جميع الأقسام</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              {/* Timeframe Filter */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                {(['month', 'quarter', 'year'] as const).map(period => (
                  <Button
                    key={period}
                    variant={selectedTimeframe === period ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedTimeframe(period)}
                  >
                    {period === 'month' ? 'شهري' : period === 'quarter' ? 'ربعي' : 'سنوي'}
                  </Button>
                ))}
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                تصدير التحليل
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">متوسط الأداء</p>
                <p className="text-3xl font-bold">{analytics.avgPerformance}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-blue-100 text-xs">+5% من الشهر الماضي</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">معدل الحضور</p>
                <p className="text-3xl font-bold">{analytics.avgAttendance}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-green-100 text-xs">مستقر</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Clock className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">إنجاز المهام</p>
                <p className="text-3xl font-bold">{analytics.taskStats.completionRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <Target className="h-4 w-4" />
                  <span className="text-purple-100 text-xs">
                    {analytics.taskStats.completedTasks}/{analytics.taskStats.totalTasks}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Target className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">معدل الاستبقاء</p>
                <p className="text-3xl font-bold">{Math.round(analytics.retentionRate)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-orange-100 text-xs">ممتاز</span>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Heart className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              رؤى الذكاء الاصطناعي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${getInsightColor(insight.type)}`}>
                  <div className="flex items-start gap-3">
                    <insight.icon className="h-5 w-5 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{insight.title}</h4>
                      <p className="text-sm mb-2">{insight.description}</p>
                      <div className="text-xs font-medium opacity-80">
                        💡 التوصية: {insight.recommendation}
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={insight.priority === 'critical' ? 'border-red-300 text-red-700' : 
                                 insight.priority === 'high' ? 'border-orange-300 text-orange-700' :
                                 insight.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                                 'border-green-300 text-green-700'}
                    >
                      {insight.priority === 'critical' ? 'حرج' : 
                       insight.priority === 'high' ? 'عالي' :
                       insight.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="space-y-6">
              {/* Performance Breakdown */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="font-medium">ممتاز (90%+)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">
                      {analytics.performanceDistribution.excellent}
                    </span>
                    <div className="text-xs text-slate-600">موظف</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">جيد (70-89%)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">
                      {analytics.performanceDistribution.good}
                    </span>
                    <div className="text-xs text-slate-600">موظف</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="font-medium">يحتاج تحسين (&lt;70%)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-red-600">
                      {analytics.performanceDistribution.needsImprovement}
                    </span>
                    <div className="text-xs text-slate-600">موظف</div>
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-700">التوزيع المرئي</div>
                <div className="flex h-3 bg-slate-200 rounded-full overflow-hidden">
                  {analytics.activeEmployees > 0 && (
                    <>
                      <div 
                        className="bg-green-500"
                        style={{ 
                          width: `${(analytics.performanceDistribution.excellent / analytics.activeEmployees) * 100}%` 
                        }}
                      ></div>
                      <div 
                        className="bg-blue-500"
                        style={{ 
                          width: `${(analytics.performanceDistribution.good / analytics.activeEmployees) * 100}%` 
                        }}
                      ></div>
                      <div 
                        className="bg-red-500"
                        style={{ 
                          width: `${(analytics.performanceDistribution.needsImprovement / analytics.activeEmployees) * 100}%` 
                        }}
                      ></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Analytics */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            تحليل الأقسام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-right py-3 px-4 font-medium text-slate-700">القسم</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-700">عدد الموظفين</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-700">الموظفين النشطين</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-700">متوسط الأداء</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-700">متوسط الحضور</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-700">التقييم</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(analytics.departmentStats).map(([dept, stats]) => (
                  <tr key={dept} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{dept}</td>
                    <td className="py-3 px-4 text-center">{stats.total}</td>
                    <td className="py-3 px-4 text-center">{stats.active}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Progress value={stats.avgPerformance} className="w-16 h-2" />
                        <span className="text-sm font-medium">{stats.avgPerformance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Progress value={stats.avgAttendance} className="w-16 h-2" />
                        <span className="text-sm font-medium">{stats.avgAttendance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={
                        stats.avgPerformance >= 90 ? 'default' : 
                        stats.avgPerformance >= 70 ? 'secondary' : 'destructive'
                      }>
                        {stats.avgPerformance >= 90 ? 'ممتاز' : 
                         stats.avgPerformance >= 70 ? 'جيد' : 'يحتاج تحسين'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Experience & Risk Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              توزيع الخبرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries({
                'موظفون جدد (أقل من سنة)': analytics.experienceDistribution.newHires,
                'مبتدئون (1-3 سنوات)': analytics.experienceDistribution.junior,
                'متوسطو الخبرة (3-7 سنوات)': analytics.experienceDistribution.midLevel,
                'خبراء (7+ سنوات)': analytics.experienceDistribution.senior
              }).map(([label, count]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{label}</span>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={analytics.activeEmployees > 0 ? (count / analytics.activeEmployees) * 100 : 0} 
                      className="w-20 h-2" 
                    />
                    <span className="text-lg font-bold text-primary w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              تحليل المخاطر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-red-800">مخاطر عالية</span>
                </div>
                <span className="text-2xl font-bold text-red-600">{analytics.riskAnalytics.high}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-yellow-800">مخاطر متوسطة</span>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{analytics.riskAnalytics.medium}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-800">مخاطر منخفضة</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{analytics.riskAnalytics.low}</span>
              </div>
              
              {analytics.riskAnalytics.high > 0 && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800 font-medium">
                    ⚠️ يوجد {analytics.riskAnalytics.high} موظف يحتاج متابعة عاجلة
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamAnalytics;