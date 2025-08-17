import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Clock,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  UserX,
  Timer,
  MapIcon,
  RefreshCw,
  Download,
  Filter,
  Search,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';

const AttendanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [workSchedules, setWorkSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  // إحصائيات اليوم
  const [todayStats, setTodayStats] = useState({
    totalEmployees: 0,
    present: 0,
    absent: 0,
    late: 0,
    remote: 0,
    onBreak: 0
  });

  useEffect(() => {
    loadTodayStats();
    loadAttendanceRecords();
    loadWorkSchedules();
  }, [selectedDate]);

  const loadTodayStats = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance_records_new')
        .select('status, is_remote')
        .eq('attendance_date', selectedDate);

      if (error) {
        console.error('Error loading stats:', error);
        return;
      }

      const stats = {
        totalEmployees: data?.length || 0,
        present: data?.filter(r => r.status === 'present').length || 0,
        absent: data?.filter(r => r.status === 'absent').length || 0,
        late: data?.filter(r => r.status === 'late').length || 0,
        remote: data?.filter(r => r.is_remote).length || 0,
        onBreak: 0 // سيتم حسابها بناء على أوقات الاستراحة
      };

      setTodayStats(stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadAttendanceRecords = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('attendance_records_new')
        .select(`
          *,
          work_schedules (
            name,
            schedule_type,
            start_time,
            end_time
          )
        `)
        .eq('attendance_date', selectedDate)
        .order('clock_in_time', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter as any);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading attendance records:', error);
        return;
      }

      let filteredData = data || [];

      if (searchTerm) {
        filteredData = filteredData.filter(record =>
          record.employee_id?.toString().includes(searchTerm.toLowerCase())
        );
      }

      setAttendanceRecords(filteredData);
    } catch (error) {
      console.error('Error loading attendance records:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWorkSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from('work_schedules')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error loading work schedules:', error);
        return;
      }

      setWorkSchedules(data || []);
    } catch (error) {
      console.error('Error loading work schedules:', error);
    }
  };

  const handleClockIn = async () => {
    setIsClockingIn(true);
    try {
      // الحصول على الموقع الجغرافي
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const location = `${position.coords.latitude},${position.coords.longitude}`;
          setCurrentLocation(location);

          const clockInData = {
            employee_id: crypto.randomUUID(), // يجب استبدال هذا بـ ID الموظف الحقيقي
            attendance_date: selectedDate,
            clock_in_time: new Date().toISOString(),
            status: 'present' as const,
            is_remote: false,
            location_check_in: location
          };

          const { error } = await supabase
            .from('attendance_records_new')
            .insert([clockInData]);

          if (error) throw error;

          toast.success('تم تسجيل الحضور بنجاح');
          loadAttendanceRecords();
          loadTodayStats();
        });
      } else {
        // إذا لم يكن الموقع متاحاً
        const clockInData = {
          employee_id: crypto.randomUUID(),
          attendance_date: selectedDate,
          clock_in_time: new Date().toISOString(),
          status: 'present' as const,
          is_remote: false
        };

        const { error } = await supabase
          .from('attendance_records_new')
          .insert([clockInData]);

        if (error) throw error;

        toast.success('تم تسجيل الحضور بنجاح');
        loadAttendanceRecords();
        loadTodayStats();
      }
    } catch (error) {
      console.error('Error clocking in:', error);
      toast.error('حدث خطأ أثناء تسجيل الحضور');
    } finally {
      setIsClockingIn(false);
    }
  };

  const handleClockOut = async (recordId: string) => {
    try {
      const { error } = await supabase
        .from('attendance_records_new')
        .update({
          clock_out_time: new Date().toISOString(),
          location_check_out: currentLocation
        })
        .eq('id', recordId);

      if (error) throw error;

      toast.success('تم تسجيل الانصراف بنجاح');
      loadAttendanceRecords();
      loadTodayStats();
    } catch (error) {
      console.error('Error clocking out:', error);
      toast.error('حدث خطأ أثناء تسجيل الانصراف');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: { color: 'bg-green-100 text-green-800', text: 'حاضر' },
      absent: { color: 'bg-red-100 text-red-800', text: 'غائب' },
      late: { color: 'bg-yellow-100 text-yellow-800', text: 'متأخر' },
      early_leave: { color: 'bg-orange-100 text-orange-800', text: 'انصراف مبكر' },
      remote_work: { color: 'bg-blue-100 text-blue-800', text: 'عمل عن بُعد' },
      sick_leave: { color: 'bg-purple-100 text-purple-800', text: 'إجازة مرضية' },
      vacation: { color: 'bg-cyan-100 text-cyan-800', text: 'إجازة' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const formatTime = (timestamp: string) => {
    if (!timestamp) return '--';
    return new Date(timestamp).toLocaleTimeString('ar', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateWorkingHours = (clockIn: string, clockOut: string) => {
    if (!clockIn || !clockOut) return '--';
    const diff = new Date(clockOut).getTime() - new Date(clockIn).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">لوحة تحكم الحضور والانصراف</h2>
          <p className="text-muted-foreground">متابعة حضور الموظفين وإدارة السجلات اليومية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
          <Button onClick={handleClockIn} disabled={isClockingIn}>
            <Clock className="h-4 w-4 mr-2" />
            {isClockingIn ? 'جاري التسجيل...' : 'تسجيل حضور'}
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي الموظفين</p>
                <p className="text-2xl font-bold">{todayStats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">حاضرون</p>
                <p className="text-2xl font-bold">{todayStats.present}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">غائبون</p>
                <p className="text-2xl font-bold">{todayStats.absent}</p>
              </div>
              <UserX className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">متأخرون</p>
                <p className="text-2xl font-bold">{todayStats.late}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">عمل عن بُعد</p>
                <p className="text-2xl font-bold">{todayStats.remote}</p>
              </div>
              <MapIcon className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">في الاستراحة</p>
                <p className="text-2xl font-bold">{todayStats.onBreak}</p>
              </div>
              <Timer className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">اليوم</TabsTrigger>
          <TabsTrigger value="weekly">الأسبوع</TabsTrigger>
          <TabsTrigger value="monthly">الشهر</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {/* فلاتر البحث */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث عن موظف..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="فلترة حسب الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="present">حاضر</SelectItem>
                    <SelectItem value="absent">غائب</SelectItem>
                    <SelectItem value="late">متأخر</SelectItem>
                    <SelectItem value="remote_work">عمل عن بُعد</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-[200px]"
                />
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* سجلات الحضور */}
          <Card>
            <CardHeader>
              <CardTitle>سجلات الحضور اليومية</CardTitle>
              <CardDescription>
                سجلات حضور وانصراف الموظفين لتاريخ {new Date(selectedDate).toLocaleDateString('ar')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p>جاري تحميل البيانات...</p>
                </div>
              ) : attendanceRecords.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد سجلات حضور لهذا التاريخ</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {attendanceRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">موظف {record.employee_id.substring(0, 8)}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>جدول العمل: {record.work_schedules?.name || 'غير محدد'}</span>
                              {record.is_remote && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                  عمل عن بُعد
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-sm font-medium">وقت الحضور</div>
                            <div className="text-lg font-bold text-green-600">
                              {formatTime(record.clock_in_time)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">وقت الانصراف</div>
                            <div className="text-lg font-bold text-red-600">
                              {formatTime(record.clock_out_time)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">ساعات العمل</div>
                            <div className="text-lg font-bold">
                              {record.total_hours || calculateWorkingHours(record.clock_in_time, record.clock_out_time)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">الحالة</div>
                            {getStatusBadge(record.status)}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 ml-1" />
                              عرض
                            </Button>
                            {!record.clock_out_time && (
                              <Button 
                                size="sm"
                                onClick={() => handleClockOut(record.id)}
                              >
                                <Clock className="h-4 w-4 ml-1" />
                                انصراف
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      {record.notes && (
                        <div className="mt-3 p-2 bg-muted rounded">
                          <p className="text-sm text-muted-foreground">
                            <strong>ملاحظات:</strong> {record.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">سيتم إضافة التقارير الأسبوعية قريباً</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">سيتم إضافة التقارير الشهرية قريباً</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">سيتم إضافة تقارير مفصلة قريباً</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceDashboard;