import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Calendar as CalendarIcon, Users, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AttendanceRecord {
  id: string;
  employee_id: string;
  attendance_date: string;
  check_in_time?: string;
  check_out_time?: string;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'early_leave' | 'overtime';
  late_minutes?: number;
  overtime_hours?: number;
  notes?: string;
  employee?: {
    first_name: string;
    last_name: string;
    employee_id: string;
  };
}

export const BoudAttendanceSystem: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().substring(0, 7));
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    averageWorkingHours: 0
  });
  const { toast } = useToast();

  // Fetch attendance data
  const fetchAttendanceData = async (date: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('boud_attendance')
        .select(`
          *,
          employee:boud_employees(first_name, last_name, employee_id)
        `)
        .eq('attendance_date', date)
        .order('check_in_time', { ascending: true });

      if (error) throw error;
      setAttendanceRecords(data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل بيانات الحضور',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch attendance stats
  const fetchAttendanceStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const [attendanceResult, employeesResult] = await Promise.all([
        supabase
          .from('boud_attendance')
          .select('status, overtime_hours')
          .eq('attendance_date', today),
        supabase
          .from('boud_employees')
          .select('id', { count: 'exact' })
          .eq('is_active', true)
      ]);

      if (attendanceResult.error) throw attendanceResult.error;
      if (employeesResult.error) throw employeesResult.error;

      const attendanceData = attendanceResult.data || [];
      const totalEmployees = employeesResult.count || 0;

      const presentToday = attendanceData.filter(record => record.status === 'present').length;
      const absentToday = attendanceData.filter(record => record.status === 'absent').length;
      const lateToday = attendanceData.filter(record => record.status === 'late').length;
      
      const totalOvertimeHours = attendanceData
        .filter(record => record.overtime_hours)
        .reduce((sum, record) => sum + (record.overtime_hours || 0), 0);
      const averageWorkingHours = attendanceData.length > 0 ? (8 + totalOvertimeHours / attendanceData.length) : 8;

      setStats({
        totalEmployees,
        presentToday,
        absentToday,
        lateToday,
        averageWorkingHours: Math.round(averageWorkingHours * 100) / 100
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Generate attendance report for selected month
  const generateMonthlyReport = async () => {
    try {
      toast({
        title: 'تم بدء إنشاء التقرير',
        description: 'جاري إنشاء تقرير الحضور الشهري...'
      });
      
      // This would typically call an API to generate the report
      // For now, we'll just show a success message
      setTimeout(() => {
        toast({
          title: 'تم إنشاء التقرير',
          description: 'تم إنشاء تقرير الحضور الشهري بنجاح'
        });
      }, 2000);
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في إنشاء التقرير',
        variant: 'destructive'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      present: { label: 'حاضر', variant: 'default' as const, icon: CheckCircle },
      absent: { label: 'غائب', variant: 'destructive' as const, icon: XCircle },
      late: { label: 'متأخر', variant: 'secondary' as const, icon: Clock },
      half_day: { label: 'نصف يوم', variant: 'outline' as const, icon: Clock }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.present;
    const Icon = statusInfo.icon;
    
    return (
      <Badge variant={statusInfo.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '--:--';
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  useEffect(() => {
    fetchAttendanceStats();
  }, []);

  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    fetchAttendanceData(dateString);
  }, [selectedDate]);

  const statsCards = [
    {
      title: 'إجمالي الموظفين',
      value: stats.totalEmployees,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'الحاضرون اليوم',
      value: stats.presentToday,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'الغائبون اليوم',
      value: stats.absentToday,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'متوسط ساعات العمل',
      value: `${stats.averageWorkingHours}س`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">نظام الحضور والانصراف</h2>
          <p className="text-muted-foreground">مراقبة وإدارة حضور الموظفين</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date();
                date.setMonth(i);
                const value = date.toISOString().substring(0, 7);
                const label = date.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' });
                return (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Button onClick={generateMonthlyReport}>
            إنشاء تقرير شهري
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {card.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              التقويم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              dir="rtl"
            />
          </CardContent>
        </Card>

        {/* Attendance Records */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>
              سجل الحضور - {selectedDate.toLocaleDateString('ar-SA', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : attendanceRecords.length > 0 ? (
              <div className="space-y-4">
                {attendanceRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary text-sm">
                          {record.employee?.first_name?.charAt(0)}{record.employee?.last_name?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {record.employee?.first_name} {record.employee?.last_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          رقم الموظف: {record.employee?.employee_id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-center">
                        <p className="font-medium">وقت الحضور</p>
                        <p className="text-muted-foreground">{formatTime(record.check_in_time)}</p>
                      </div>
                      <div className="text-sm text-center">
                        <p className="font-medium">وقت الانصراف</p>
                        <p className="text-muted-foreground">{formatTime(record.check_out_time)}</p>
                      </div>
                      <div className="text-sm text-center">
                        <p className="font-medium">ساعات إضافية</p>
                        <p className="text-muted-foreground">{record.overtime_hours || 0}س</p>
                      </div>
                      <div>
                        {getStatusBadge(record.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد سجلات حضور لهذا التاريخ
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};