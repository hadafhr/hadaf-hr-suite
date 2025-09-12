import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  MapPin, 
  Users, 
  Calendar, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Fingerprint,
  Navigation,
  BarChart3,
  Download,
  Plus,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { GPSCheckInOut } from './GPSCheckInOut';
import { DeviceManagement } from './DeviceManagement';
import { MonthlySchedule } from './MonthlySchedule';
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
  source_type: string;
  employee_name?: string;
  department?: string;
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
    devicesOnline: 0
  });
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

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
      
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('employee_attendance_records')
        .select(`
          *,
          boud_employees!inner(first_name, last_name, boud_departments(department_name))
        `)
        .eq('attendance_date', today);

      if (attendanceError) throw attendanceError;

      // جلب عدد الموظفين الكلي
      const { data: employeesData, error: employeesError } = await supabase
        .from('boud_employees')
        .select('id')
        .eq('is_active', true);

      if (employeesError) throw employeesError;

      // جلب حالة الأجهزة
      const { data: devicesData, error: devicesError } = await supabase
        .from('attendance_devices')
        .select('id, status')
        .eq('is_active', true);

      if (devicesError) throw devicesError;

      // معالجة البيانات
      const totalEmployees = employeesData?.length || 0;
      const attendanceRecords = attendanceData || [];
      
      const presentToday = attendanceRecords.filter(r => r.status === 'present').length;
      const absentToday = totalEmployees - attendanceRecords.length;
      const lateToday = attendanceRecords.filter(r => r.status === 'late').length;
      const devicesOnline = devicesData?.filter(d => d.status === 'online').length || 0;
      
      const avgWorkingHours = attendanceRecords.reduce((sum, r) => sum + (r.total_hours || 0), 0) / (attendanceRecords.length || 1);
      const attendanceRate = totalEmployees > 0 ? (presentToday / totalEmployees) * 100 : 0;

      setStats({
        totalEmployees,
        presentToday,
        absentToday,
        lateToday,
        onBreak: 0, // سيتم تحديثه لاحقاً
        avgWorkingHours,
        attendanceRate,
        devicesOnline
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
        source_type: record.source_type || 'manual',
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
      present: { variant: 'default' as const, label: 'حاضر', color: 'bg-green-500' },
      absent: { variant: 'destructive' as const, label: 'غائب', color: 'bg-red-500' },
      late: { variant: 'secondary' as const, label: 'متأخر', color: 'bg-yellow-500' },
      early_leave: { variant: 'outline' as const, label: 'انصراف مبكر', color: 'bg-orange-500' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '-';
    return new Date(timeString).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <Clock className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg text-muted-foreground">جاري تحميل نظام الحضور الذكي...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            نظام الحضور والانصراف الذكي
          </h1>
          <p className="text-lg text-muted-foreground">
            إدارة شاملة للحضور مع دعم GPS والبصمة والجدولة المتقدمة
          </p>
          <div className="mt-4 p-4 bg-card rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-primary mb-1">
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

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-6 p-1 h-auto bg-card border">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 p-3">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger value="checkin" className="flex items-center gap-2 p-3">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">تسجيل GPS</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center gap-2 p-3">
              <Fingerprint className="h-4 w-4" />
              <span className="hidden sm:inline">الأجهزة</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2 p-3">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">الجدولة</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 p-3">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">التحليلات</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 p-3">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">الحاضرين اليوم</p>
                      <p className="text-2xl font-bold text-green-600">{stats.presentToday}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">الغائبين</p>
                      <p className="text-2xl font-bold text-red-600">{stats.absentToday}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">المتأخرين</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.lateToday}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">معدل الحضور</p>
                      <p className="text-2xl font-bold text-blue-600">{Math.round(stats.attendanceRate)}%</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Indicators */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">معدل الحضور الشهري</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">{Math.round(stats.attendanceRate)}%</div>
                  <Progress value={stats.attendanceRate} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">متوسط ساعات العمل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">{stats.avgWorkingHours.toFixed(1)}h</div>
                  <Progress value={(stats.avgWorkingHours / 9) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">حالة الأجهزة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-2">{stats.devicesOnline}/5</div>
                  <Progress value={(stats.devicesOnline / 5) * 100} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Today's Attendance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>سجل حضور اليوم</CardTitle>
                  <CardDescription>
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
                  {todayAttendance.length > 0 ? (
                    todayAttendance.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            record.status === 'present' ? 'bg-green-500' :
                            record.status === 'late' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{record.employee_name || 'غير معروف'}</p>
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
                              {record.source_type === 'gps' ? 'GPS' : 
                               record.source_type === 'device' ? 'بصمة' : 'يدوي'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد سجلات حضور لليوم</p>
                    </div>
                  )}
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
            <MonthlySchedule />
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
    </div>
  );
};