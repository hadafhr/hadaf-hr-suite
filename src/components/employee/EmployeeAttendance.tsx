import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Clock, 
  Calendar as CalendarIcon,
  MapPin,
  TrendingUp,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Employee, AttendanceRecord } from '@/hooks/useEmployeeDashboard';
import { supabase } from '@/integrations/supabase/client';

interface EmployeeAttendanceProps {
  employee: Employee;
  todayAttendance: AttendanceRecord | null;
}

interface AttendanceStats {
  total_days: number;
  present_days: number;
  absent_days: number;
  late_days: number;
  total_hours: number;
  overtime_hours: number;
  month: number;
  year: number;
}

export const EmployeeAttendance: React.FC<EmployeeAttendanceProps> = ({
  employee,
  todayAttendance
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [monthlyAttendance, setMonthlyAttendance] = useState<AttendanceRecord[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // جلب حضور الشهر
  const fetchMonthlyAttendance = async (month: number, year: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('employee_attendance_records')
        .select('*')
        .eq('employee_id', employee.id)
        .gte('attendance_date', `${year}-${String(month).padStart(2, '0')}-01`)
        .lt('attendance_date', `${year}-${String(month + 1).padStart(2, '0')}-01`)
        .order('attendance_date', { ascending: false });

      if (error) {
        console.error('Error fetching monthly attendance:', error);
        return;
      }

      setMonthlyAttendance(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // جلب إحصائيات الحضور
  const fetchAttendanceStats = async (month: number, year: number) => {
    try {
      // حساب الإحصائيات من البيانات المحلية
      const stats: AttendanceStats = {
        total_days: monthlyAttendance.length,
        present_days: monthlyAttendance.filter(a => a.status === 'present').length,
        absent_days: monthlyAttendance.filter(a => a.status === 'absent').length,
        late_days: monthlyAttendance.filter(a => a.status === 'late').length,
        total_hours: monthlyAttendance.reduce((sum, a) => sum + (a.total_hours || 0), 0),
        overtime_hours: monthlyAttendance.reduce((sum, a) => sum + (a.overtime_hours || 0), 0),
        month: month,
        year: year
      };

      setAttendanceStats(stats);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    
    fetchMonthlyAttendance(month, year);
  }, [selectedDate, employee.id]);

  useEffect(() => {
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    fetchAttendanceStats(month, year);
  }, [monthlyAttendance]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge variant="default" className="bg-green-600">حاضر</Badge>;
      case 'absent':
        return <Badge variant="destructive">غائب</Badge>;
      case 'late':
        return <Badge variant="secondary" className="bg-yellow-600">متأخر</Badge>;
      case 'half_day':
        return <Badge variant="outline">نصف يوم</Badge>;
      case 'sick_leave':
        return <Badge variant="secondary">إجازة مرضية</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '--:--';
    return format(new Date(timeString), 'HH:mm');
  };

  const formatDuration = (hours?: number) => {
    if (!hours) return '--';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}:${String(m).padStart(2, '0')}`;
  };

  const getLocationText = (location: any) => {
    if (!location) return 'غير محدد';
    if (location.address) return location.address;
    if (location.lat && location.lng) {
      return `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
    }
    return 'موقع محفوظ';
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات الشهر الحالي */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">أيام الحضور</p>
                <p className="text-2xl font-bold text-green-600">
                  {attendanceStats?.present_days || 0}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">أيام الغياب</p>
                <p className="text-2xl font-bold text-red-600">
                  {attendanceStats?.absent_days || 0}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الساعات</p>
                <p className="text-2xl font-bold text-blue-600">
                  {attendanceStats?.total_hours?.toFixed(1) || '0.0'}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ساعات إضافية</p>
                <p className="text-2xl font-bold text-purple-600">
                  {attendanceStats?.overtime_hours?.toFixed(1) || '0.0'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* حضور اليوم */}
      {todayAttendance && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              حضور اليوم - {format(new Date(), 'EEEE، dd MMMM yyyy', { locale: ar })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">وقت الدخول</span>
                </div>
                <p className="text-lg font-bold">
                  {formatTime(todayAttendance.check_in_time)}
                </p>
                {todayAttendance.check_in_location && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{getLocationText(todayAttendance.check_in_location)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">وقت الخروج</span>
                </div>
                <p className="text-lg font-bold">
                  {formatTime(todayAttendance.check_out_time)}
                </p>
                {todayAttendance.check_out_location && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{getLocationText(todayAttendance.check_out_location)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">إجمالي الساعات</span>
                </div>
                <p className="text-lg font-bold">
                  {formatDuration(todayAttendance.total_hours)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">الحالة</span>
                </div>
                <div>
                  {getStatusBadge(todayAttendance.status)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* التقويم */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              اختيار الشهر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              locale={ar}
            />
          </CardContent>
        </Card>

        {/* سجل الحضور الشهري */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              سجل الحضور - {format(selectedDate, 'MMMM yyyy', { locale: ar })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Clock className="h-6 w-6 animate-spin" />
                  <span className="mr-2">جارٍ التحميل...</span>
                </div>
              ) : monthlyAttendance.length > 0 ? (
                <div className="space-y-3">
                  {monthlyAttendance.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="font-medium text-sm">
                            {format(new Date(record.attendance_date), 'dd')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(record.attendance_date), 'MMM', { locale: ar })}
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm">
                            {format(new Date(record.attendance_date), 'EEEE', { locale: ar })}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>الدخول: {formatTime(record.check_in_time)}</span>
                            <span>الخروج: {formatTime(record.check_out_time)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {record.total_hours && (
                          <span className="text-sm font-medium">
                            {formatDuration(record.total_hours)}
                          </span>
                        )}
                        {getStatusBadge(record.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">لا توجد سجلات حضور</h3>
                  <p className="text-muted-foreground">
                    لا توجد سجلات حضور لهذا الشهر
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};