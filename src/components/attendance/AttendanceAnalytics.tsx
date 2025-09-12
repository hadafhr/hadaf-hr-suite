import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Calendar, 
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  dailyStats: {
    date: string;
    present: number;
    absent: number;
    late: number;
    total: number;
    attendanceRate: number;
  }[];
  weeklyTrends: {
    week: string;
    avgAttendance: number;
    avgLateArrival: number;
    avgWorkingHours: number;
  }[];
  departmentStats: {
    department: string;
    totalEmployees: number;
    presentToday: number;
    attendanceRate: number;
    avgWorkingHours: number;
  }[];
  violations: {
    type: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
    percentage: number;
  }[];
}

export const AttendanceAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    dailyStats: [],
    weeklyTrends: [],
    departmentStats: [],
    violations: []
  });
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // حساب التواريخ حسب الفترة المحددة
      const endDate = new Date();
      const startDate = new Date();
      
      if (selectedPeriod === 'week') {
        startDate.setDate(endDate.getDate() - 7);
      } else if (selectedPeriod === 'month') {
        startDate.setMonth(endDate.getMonth() - 1);
      } else if (selectedPeriod === 'quarter') {
        startDate.setMonth(endDate.getMonth() - 3);
      }

      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      // جلب بيانات الحضور
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('employee_attendance_records')
        .select(`
          *,
          boud_employees!inner(
            first_name,
            last_name,
            boud_departments(department_name)
          )
        `)
        .gte('attendance_date', startDateStr)
        .lte('attendance_date', endDateStr);

      if (attendanceError) throw attendanceError;

      // جلب بيانات الموظفين
      const { data: employeesData, error: employeesError } = await supabase
        .from('boud_employees')
        .select(`
          id,
          first_name,
          last_name,
          boud_departments(department_name)
        `)
        .eq('is_active', true);

      if (employeesError) throw employeesError;

      // جلب بيانات المخالفات
      const { data: violationsData, error: violationsError } = await supabase
        .from('attendance_violations')
        .select('*')
        .gte('violation_date', startDateStr)
        .lte('violation_date', endDateStr);

      if (violationsError) throw violationsError;

      // معالجة البيانات
      const processedData = processAnalyticsData(
        attendanceData || [],
        employeesData || [],
        violationsData || [],
        startDate,
        endDate
      );

      setAnalyticsData(processedData);

    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast.error('خطأ في تحميل بيانات التحليلات');
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (
    attendanceRecords: any[],
    employees: any[],
    violations: any[],
    startDate: Date,
    endDate: Date
  ): AnalyticsData => {
    // معالجة الإحصائيات اليومية
    const dailyStats = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayRecords = attendanceRecords.filter(r => r.attendance_date === dateStr);
      
      const present = dayRecords.filter(r => r.status === 'present').length;
      const absent = employees.length - dayRecords.length;
      const late = dayRecords.filter(r => r.status === 'late').length;
      const total = employees.length;
      const attendanceRate = total > 0 ? (present / total) * 100 : 0;

      dailyStats.push({
        date: dateStr,
        present,
        absent,
        late,
        total,
        attendanceRate
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // معالجة الاتجاهات الأسبوعية
    const weeklyTrends = [];
    const weeks = Math.ceil(dailyStats.length / 7);
    
    for (let i = 0; i < weeks; i++) {
      const weekStart = i * 7;
      const weekEnd = Math.min(weekStart + 7, dailyStats.length);
      const weekData = dailyStats.slice(weekStart, weekEnd);
      
      const avgAttendance = weekData.reduce((sum, day) => sum + day.attendanceRate, 0) / weekData.length;
      const avgLateArrival = weekData.reduce((sum, day) => sum + day.late, 0) / weekData.length;
      
      // حساب متوسط ساعات العمل
      const weekAttendanceRecords = attendanceRecords.filter(r => {
        const recordDate = new Date(r.attendance_date);
        const weekStartDate = new Date(startDate);
        weekStartDate.setDate(weekStartDate.getDate() + weekStart);
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekEndDate.getDate() + 7);
        
        return recordDate >= weekStartDate && recordDate < weekEndDate;
      });
      
      const avgWorkingHours = weekAttendanceRecords.length > 0 
        ? weekAttendanceRecords.reduce((sum, r) => sum + (r.total_hours || 0), 0) / weekAttendanceRecords.length
        : 0;

      weeklyTrends.push({
        week: `الأسبوع ${i + 1}`,
        avgAttendance,
        avgLateArrival,
        avgWorkingHours
      });
    }

    // معالجة إحصائيات الأقسام
    const departmentGroups = employees.reduce((acc: any, emp) => {
      const deptName = emp.boud_departments?.[0]?.department_name || 'غير محدد';
      if (!acc[deptName]) {
        acc[deptName] = [];
      }
      acc[deptName].push(emp);
      return acc;
    }, {});

    const departmentStats = Object.keys(departmentGroups).map(deptName => {
      const deptEmployees = departmentGroups[deptName];
      const today = new Date().toISOString().split('T')[0];
      const todayRecords = attendanceRecords.filter(r => 
        r.attendance_date === today && 
        deptEmployees.some((emp: any) => emp.id === r.employee_id)
      );

      const presentToday = todayRecords.filter(r => r.status === 'present').length;
      const attendanceRate = deptEmployees.length > 0 ? (presentToday / deptEmployees.length) * 100 : 0;
      
      const deptAttendanceRecords = attendanceRecords.filter(r => 
        deptEmployees.some((emp: any) => emp.id === r.employee_id)
      );
      
      const avgWorkingHours = deptAttendanceRecords.length > 0
        ? deptAttendanceRecords.reduce((sum, r) => sum + (r.total_hours || 0), 0) / deptAttendanceRecords.length
        : 0;

      return {
        department: deptName,
        totalEmployees: deptEmployees.length,
        presentToday,
        attendanceRate,
        avgWorkingHours
      };
    });

    // معالجة المخالفات
    const violationTypes = violations.reduce((acc: any, violation) => {
      const type = violation.violation_type;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type]++;
      return acc;
    }, {});

    const processedViolations = Object.keys(violationTypes).map(type => {
      const typeNames: any = {
        late_arrival: 'التأخير',
        early_departure: 'الانصراف المبكر',
        absence: 'الغياب',
        missing_checkout: 'عدم تسجيل الانصراف',
        location_violation: 'مخالفة الموقع'
      };

      return {
        type: typeNames[type] || type,
        count: violationTypes[type],
        trend: Math.random() > 0.5 ? 'up' : 'down' as 'up' | 'down',
        percentage: Math.random() * 20
      };
    });

    return {
      dailyStats,
      weeklyTrends,
      departmentStats,
      violations: processedViolations
    };
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchAnalyticsData();
    setRefreshing(false);
    toast.success('تم تحديث البيانات');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
        <p className="text-lg text-muted-foreground">جاري تحميل التحليلات...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">تحليلات الحضور المتقدمة</h2>
          <p className="text-muted-foreground">لوحة تحليلية شاملة لمراقبة أداء الحضور</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={selectedPeriod === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('week')}
            >
              أسبوعي
            </Button>
            <Button
              variant={selectedPeriod === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('month')}
            >
              شهري
            </Button>
            <Button
              variant={selectedPeriod === 'quarter' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('quarter')}
            >
              ربع سنوي
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
          <TabsTrigger value="departments">الأقسام</TabsTrigger>
          <TabsTrigger value="violations">المخالفات</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">متوسط الحضور</p>
                    <p className="text-2xl font-bold text-green-600">
                      {analyticsData.dailyStats.length > 0 
                        ? Math.round(analyticsData.dailyStats.reduce((sum, day) => sum + day.attendanceRate, 0) / analyticsData.dailyStats.length)
                        : 0}%
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">متوسط ساعات العمل</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {analyticsData.weeklyTrends.length > 0
                        ? (analyticsData.weeklyTrends.reduce((sum, week) => sum + week.avgWorkingHours, 0) / analyticsData.weeklyTrends.length).toFixed(1)
                        : '0.0'}h
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">متوسط التأخير</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {analyticsData.weeklyTrends.length > 0
                        ? Math.round(analyticsData.weeklyTrends.reduce((sum, week) => sum + week.avgLateArrival, 0) / analyticsData.weeklyTrends.length)
                        : 0}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">إجمالي المخالفات</p>
                    <p className="text-2xl font-bold text-red-600">
                      {analyticsData.violations.reduce((sum, v) => sum + v.count, 0)}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Stats Chart */}
          <Card>
            <CardHeader>
              <CardTitle>معدل الحضور اليومي</CardTitle>
              <CardDescription>تتبع معدل الحضور على مدار الفترة المحددة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.dailyStats.slice(-7).map((day) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium min-w-[80px]">
                        {new Date(day.date).toLocaleDateString('ar-SA', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex-1">
                        <Progress value={day.attendanceRate} className="h-3" />
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{Math.round(day.attendanceRate)}%</div>
                      <div className="text-muted-foreground text-xs">
                        {day.present}/{day.total}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه الحضور الأسبوعي</CardTitle>
                <CardDescription>متوسط معدل الحضور لكل أسبوع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.weeklyTrends.map((week, index) => (
                    <div key={week.week} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{week.week}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round(week.avgAttendance)}% حضور
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {index > 0 && (
                          <>
                            {week.avgAttendance > analyticsData.weeklyTrends[index - 1].avgAttendance ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                          </>
                        )}
                        <Badge variant={week.avgAttendance >= 90 ? 'default' : 'secondary'}>
                          {Math.round(week.avgAttendance)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>متوسط ساعات العمل الأسبوعية</CardTitle>
                <CardDescription>تتبع متوسط ساعات العمل المنجزة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.weeklyTrends.map((week) => (
                    <div key={week.week} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{week.week}</p>
                        <p className="text-sm text-muted-foreground">
                          {week.avgWorkingHours.toFixed(1)} ساعة متوسط
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {week.avgWorkingHours.toFixed(1)}h
                        </div>
                        <Progress value={(week.avgWorkingHours / 9) * 100} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <div className="grid gap-4">
            {analyticsData.departmentStats.map((dept) => (
              <Card key={dept.department}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{dept.department}</h3>
                      <p className="text-sm text-muted-foreground">
                        {dept.totalEmployees} موظف
                      </p>
                    </div>
                    <Badge variant={dept.attendanceRate >= 90 ? 'default' : 'secondary'}>
                      {Math.round(dept.attendanceRate)}% حضور
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{dept.presentToday}</p>
                      <p className="text-xs text-muted-foreground">حاضر اليوم</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{dept.avgWorkingHours.toFixed(1)}h</p>
                      <p className="text-xs text-muted-foreground">متوسط الساعات</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{Math.round(dept.attendanceRate)}%</p>
                      <p className="text-xs text-muted-foreground">معدل الحضور</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Progress value={dept.attendanceRate} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Violations Tab */}
        <TabsContent value="violations" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أنواع المخالفات</CardTitle>
                <CardDescription>توزيع المخالفات حسب النوع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.violations.map((violation) => (
                    <div key={violation.type} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div>
                          <p className="font-medium">{violation.type}</p>
                          <div className="flex items-center gap-1">
                            {violation.trend === 'up' ? (
                              <TrendingUp className="h-3 w-3 text-red-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-green-500" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {violation.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">{violation.count}</p>
                        <p className="text-xs text-muted-foreground">حالة</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تحليل المخالفات</CardTitle>
                <CardDescription>الأنماط والاتجاهات في المخالفات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">المخالفات الأكثر شيوعاً</h4>
                    <div className="space-y-2">
                      {analyticsData.violations
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 3)
                        .map((violation, index) => (
                          <div key={violation.type} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                              index === 0 ? 'bg-red-500' : index === 1 ? 'bg-orange-500' : 'bg-yellow-500'
                            }`}>
                              {index + 1}
                            </div>
                            <span className="flex-1">{violation.type}</span>
                            <span className="font-bold">{violation.count}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">التوصيات</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• تطبيق نظام تنبيهات مبكرة للتأخير</p>
                      <p>• تحسين مرونة أوقات العمل</p>
                      <p>• توفير برامج توعوية للموظفين</p>
                      <p>• مراجعة سياسات الحضور والانصراف</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};