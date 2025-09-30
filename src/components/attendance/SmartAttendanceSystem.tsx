import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Clock, MapPin, Users, Calendar, Settings, CheckCircle, XCircle, AlertCircle, Fingerprint, Navigation, BarChart3, Download, Plus, Eye, QrCode, Camera, Smartphone, Timer, Award, TrendingUp, DollarSign, AlertTriangle, CheckCircle2, Zap, Target, PlayCircle, PauseCircle, RotateCcw, MapIcon, Bell, MessageSquare, FileText, Star, Coins, Activity, Radio, Wifi, BatteryLow, Shield, CreditCard, Gauge, TrendingDown, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AttendanceRealTimeClock from './AttendanceRealTimeClock';
import { GPSCheckInOut } from './GPSCheckInOut';
import { DeviceManagement } from './DeviceManagement';
import ShiftScheduleTable from './ShiftScheduleTable';
import { AttendanceAnalytics } from './AttendanceAnalytics';
import AttendanceSettings from './AttendanceSettings';
interface AttendanceRecord {
  id: string;
  employee_id: string;
  attendance_date: string;
  check_in_time?: string;
  check_out_time?: string;
  total_hours?: number;
  status: string;
  check_method?: string;
  work_type?: string;
  late_minutes?: number;
  attendance_points?: number;
  penalty_amount?: number;
  employee_name?: string;
  department?: string;
  location?: string;
  source_type?: string;
  device_name?: string;
}
interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  onBreak: number;
  avgWorkingHours: number;
  attendanceRate: number;
  devicesOnline: number;
  totalPoints: number;
  totalPenalties: number;
  overtimeHours: number;
  remoteWorkers: number;
}
interface LiveTrackingData {
  id: string;
  employee_id: string;
  employee_name: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  activity_type: string;
  battery_level: number;
  is_inside_geofence: boolean;
}
interface AttendancePoint {
  id: string;
  employee_id: string;
  employee_name: string;
  points_earned: number;
  points_deducted: number;
  accumulated_points: number;
  reward_amount: number;
  reason: string;
}
interface OvertimeRecord {
  id: string;
  employee_id: string;
  employee_name: string;
  overtime_hours: number;
  total_amount: number;
  reason: string;
  approved: boolean;
}
interface AttendanceLocation {
  id: string;
  location_name: string;
  latitude: number;
  longitude: number;
  radius_meters: number;
  work_type: string;
  is_active: boolean;
}
export const SmartAttendanceSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    onBreak: 0,
    avgWorkingHours: 0,
    attendanceRate: 0,
    devicesOnline: 0,
    totalPoints: 0,
    totalPenalties: 0,
    overtimeHours: 0,
    remoteWorkers: 0
  });
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);

  // تحديث الوقت الحالي كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchDashboardData();
  }, []);
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // جلب إحصائيات اليوم
      const today = new Date().toISOString().split('T')[0];
      const {
        data: attendanceData,
        error: attendanceError
      } = await supabase.from('employee_attendance_records').select(`
          *,
          boud_employees!inner(first_name, last_name, boud_departments(department_name))
        `).eq('attendance_date', today);
      if (attendanceError) throw attendanceError;

      // جلب عدد الموظفين الكلي
      const {
        data: employeesData,
        error: employeesError
      } = await supabase.from('boud_employees').select('id').eq('is_active', true);
      if (employeesError) throw employeesError;

      // جلب حالة الأجهزة
      const {
        data: devicesData,
        error: devicesError
      } = await supabase.from('attendance_devices').select('id, status').eq('is_active', true);
      if (devicesError) throw devicesError;

      // معالجة البيانات
      const totalEmployees = employeesData?.length || 0;
      const attendanceRecords = attendanceData || [];
      const presentToday = attendanceRecords.filter(r => r.status === 'present').length;
      const absentToday = totalEmployees - attendanceRecords.length;
      const lateToday = attendanceRecords.filter(r => r.status === 'late').length;
      const devicesOnline = devicesData?.filter(d => d.status === 'online').length || 0;
      const avgWorkingHours = attendanceRecords.reduce((sum, r) => sum + (r.total_hours || 0), 0) / (attendanceRecords.length || 1);
      const attendanceRate = totalEmployees > 0 ? presentToday / totalEmployees * 100 : 0;
      setStats({
        totalEmployees,
        presentToday,
        absentToday,
        lateToday,
        onBreak: 0,
        avgWorkingHours,
        attendanceRate,
        devicesOnline,
        totalPoints: 0,
        totalPenalties: 0,
        overtimeHours: 0,
        remoteWorkers: 0
      });

      // تنسيق بيانات الحضور للعرض
      const formattedAttendance: AttendanceRecord[] = attendanceRecords.map(record => ({
        id: record.id,
        employee_id: record.employee_id,
        attendance_date: record.attendance_date,
        check_in_time: record.check_in_time,
        check_out_time: record.check_out_time,
        total_hours: record.total_hours,
        status: record.status || 'present',
        source_type: 'manual',
        employee_name: `${record.boud_employees?.[0]?.first_name || ''} ${record.boud_employees?.[0]?.last_name || ''}`.trim(),
        department: record.boud_employees?.[0]?.boud_departments?.department_name || 'غير محدد'
      }));
      setTodayAttendance(formattedAttendance);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('خطأ في تحميل بيانات لوحة التحكم');
    } finally {
      setLoading(false);
    }
  };
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: {
        variant: 'default' as const,
        label: 'حاضر',
        color: 'bg-success'
      },
      absent: {
        variant: 'destructive' as const,
        label: 'غائب',
        color: 'bg-destructive'
      },
      late: {
        variant: 'secondary' as const,
        label: 'متأخر',
        color: 'bg-warning'
      },
      early_leave: {
        variant: 'outline' as const,
        label: 'انصراف مبكر',
        color: 'bg-accent'
      }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    return <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>;
  };
  const formatTime = (timeString?: string) => {
    if (!timeString) return '-';
    return new Date(timeString).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <Clock className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg text-muted-foreground">جاري تحميل نظام الحضور الذكي...</p>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-arabic p-6" dir="rtl">
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
      <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 left-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Enhanced Professional Header */}
        <div className="flex items-center justify-between mb-12 p-6 bg-card backdrop-blur-xl rounded-3xl shadow-2xl border border-border hover:border-accent animate-fade-in transition-all duration-300">
          <div className="flex items-center gap-6">
            <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300 bg-card/20 backdrop-blur-sm">
              <Clock className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="h-8 w-px bg-border"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent rounded-3xl flex items-center justify-center shadow-glow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent animate-pulse"></div>
                <Clock className="h-8 w-8 text-accent-foreground relative z-10 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  نظام الحضور والانصراف الذكي
                </h1>
                <p className="text-muted-foreground text-lg">
                  إدارة شاملة للحضور مع دعم GPS والبصمة والجدولة المتقدمة
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-border text-foreground bg-muted/50 backdrop-blur-sm px-4 py-2 text-sm font-medium">
              <Clock className="h-4 w-4 ml-2" />
              نظام متقدم
            </Badge>
            <div className="p-4 bg-card backdrop-blur-xl rounded-2xl shadow-2xl border border-border">
              <div className="text-2xl font-bold text-accent mb-1">
                {currentTime.toLocaleTimeString('ar-SA')}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString('ar-SA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              </div>
            </div>
          </div>
        </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-8 lg:grid-cols-8 p-1 h-auto bg-card backdrop-blur-xl border border-border shadow-2xl">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 p-3 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/20 transition-all duration-300">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">لوحة التحكم</span>
              </TabsTrigger>
              
              <TabsTrigger value="checkin" className="flex items-center gap-2 p-3 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/20 transition-all duration-300">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">GPS</span>
              </TabsTrigger>
              <TabsTrigger value="live-tracking" className="flex items-center gap-2 p-3 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/20 transition-all duration-300">
                <Navigation className="h-4 w-4" />
                <span className="hidden sm:inline">التتبع المباشر</span>
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex items-center gap-2 p-3 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/20 transition-all duration-300">
                <Fingerprint className="h-4 w-4" />
                <span className="hidden sm:inline">الأجهزة</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2 p-3 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/20 transition-all duration-300">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">الجدولة</span>
              </TabsTrigger>
              <TabsTrigger value="points-rewards" className="flex items-center gap-2 p-3 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/20 transition-all duration-300">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">النقاط</span>
              </TabsTrigger>
              <TabsTrigger value="ai-insights" className="flex items-center gap-2 p-3 text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/20 transition-all duration-300">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">الذكاء الاصطناعي</span>
              </TabsTrigger>
            </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-success">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">الحاضرين اليوم</p>
                      <p className="text-2xl font-bold text-success">{stats.presentToday}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-destructive">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">الغائبين</p>
                      <p className="text-2xl font-bold text-destructive">{stats.absentToday}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-warning">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">المتأخرين</p>
                      <p className="text-2xl font-bold text-warning">{stats.lateToday}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-accent">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">معدل الحضور</p>
                      <p className="text-2xl font-bold text-accent">{Math.round(stats.attendanceRate)}%</p>
                    </div>
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Indicators */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">معدل الحضور الشهري</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent mb-2">{Math.round(stats.attendanceRate)}%</div>
                  <Progress value={stats.attendanceRate} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">متوسط ساعات العمل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent mb-2">{stats.avgWorkingHours.toFixed(1)}h</div>
                  <Progress value={stats.avgWorkingHours / 9 * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">حالة الأجهزة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success mb-2">{stats.devicesOnline}/5</div>
                  <Progress value={stats.devicesOnline / 5 * 100} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Today's Attendance */}
            <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">سجل حضور اليوم</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {new Date().toLocaleDateString('ar-SA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة يدوية
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {todayAttendance.length > 0 ? todayAttendance.map(record => <div key={record.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${record.status === 'present' ? 'bg-success' : record.status === 'late' ? 'bg-warning' : 'bg-destructive'}`} />
                          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-accent-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{record.employee_name || 'غير معروف'}</p>
                            <p className="text-sm text-muted-foreground">{record.department}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="font-medium">{formatTime(record.check_in_time)}</p>
                            <p className="text-xs text-muted-foreground">دخول</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{formatTime(record.check_out_time)}</p>
                            <p className="text-xs text-muted-foreground">خروج</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{record.total_hours?.toFixed(1) || '-'}h</p>
                            <p className="text-xs text-muted-foreground">المدة</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(record.status)}
                            <Badge variant="outline" className="text-xs">
                              {record.source_type === 'gps' ? 'GPS' : record.source_type === 'device' ? 'بصمة' : 'يدوي'}
                            </Badge>
                          </div>
                        </div>
                      </div>) : <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد سجلات حضور لليوم</p>
                    </div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GPS Check-in Tab */}
          <TabsContent value="checkin">
            <GPSCheckInOut onAttendanceUpdate={fetchDashboardData} />
          </TabsContent>

          {/* Device Management Tab */}
          <TabsContent value="devices">
            <DeviceManagement />
          </TabsContent>

          {/* Schedule Management Tab */}
          <TabsContent value="schedule">
            <ShiftScheduleTable />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AttendanceAnalytics />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <AttendanceSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};