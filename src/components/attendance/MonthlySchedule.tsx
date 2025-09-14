import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  Plus, 
  Clock, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Save,
  Copy,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Shift {
  id: string;
  shift_name: string;
  shift_name_ar: string;
  start_time: string;
  end_time: string;
  break_duration: number;
  is_flexible: boolean;
  work_days: number[];
}

interface ScheduleEntry {
  id?: string;
  employee_id: string;
  shift_id: string;
  work_date: string;
  planned_start: string;
  planned_end: string;
  work_type: 'office' | 'remote' | 'hybrid' | 'flexible';
  status: 'scheduled' | 'holiday' | 'leave' | 'sick';
  employee_name?: string;
  shift_name?: string;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  department?: string;
}

export const MonthlySchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newShift, setNewShift] = useState({
    shift_name_ar: '',
    start_time: '08:00',
    end_time: '17:00',
    break_duration: 60,
    is_flexible: false,
    work_days: [1, 2, 3, 4, 5]
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (currentDate) {
      fetchSchedules();
    }
  }, [currentDate]);

  const fetchInitialData = async () => {
    try {
      const [shiftsResponse, employeesResponse] = await Promise.all([
        supabase.from('shifts').select('*').eq('is_active', true),
        supabase.from('boud_employees').select('id, first_name, last_name, boud_departments(department_name)').eq('is_active', true)
      ]);

      if (shiftsResponse.error) throw shiftsResponse.error;
      if (employeesResponse.error) throw employeesResponse.error;

      setShifts(shiftsResponse.data || []);
      
      const employeesData = employeesResponse.data?.map(emp => ({
        id: emp.id,
        first_name: emp.first_name,
        last_name: emp.last_name,
        department: emp.boud_departments?.[0]?.department_name || 'غير محدد'
      })) || [];
      
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedules = async () => {
    try {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const { data, error } = await supabase
        .from('employee_schedules')
        .select(`
          *,
          boud_employees(first_name, last_name),
          shifts(shift_name_ar)
        `)
        .gte('work_date', startOfMonth.toISOString().split('T')[0])
        .lte('work_date', endOfMonth.toISOString().split('T')[0]);

      if (error) throw error;

      const schedulesData = data?.map(schedule => ({
        id: schedule.id,
        employee_id: schedule.employee_id,
        shift_id: schedule.shift_id,
        work_date: schedule.work_date,
        planned_start: schedule.planned_start,
        planned_end: schedule.planned_end,
        work_type: (schedule.work_type as 'office' | 'remote' | 'hybrid' | 'flexible') || 'office',
        status: (schedule.status as 'scheduled' | 'holiday' | 'leave' | 'sick') || 'scheduled',
        employee_name: `${schedule.boud_employees?.first_name || ''} ${schedule.boud_employees?.last_name || ''}`.trim(),
        shift_name: 'غير محدد' // Fixed: relation not available
      })) || [];

      setSchedules(schedulesData);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast.error('خطأ في تحميل الجداول');
    }
  };

  const addShift = async () => {
    try {
      const { data: companyData } = await supabase
        .from('boud_companies')
        .select('id')
        .limit(1)
        .single();

      if (!companyData) {
        toast.error('لم يتم العثور على الشركة');
        return;
      }

      const { error } = await supabase
        .from('shifts')
        .insert({
          company_id: companyData.id,
          shift_name: `shift_${Date.now()}`,
          shift_name_ar: newShift.shift_name_ar,
          start_time: newShift.start_time,
          end_time: newShift.end_time,
          break_duration: newShift.break_duration,
          is_flexible: newShift.is_flexible,
          work_days: newShift.work_days,
          is_active: true
        });

      if (error) throw error;

      toast.success('تم إضافة الشفت بنجاح');
      setIsAddShiftOpen(false);
      setNewShift({
        shift_name_ar: '',
        start_time: '08:00',
        end_time: '17:00',
        break_duration: 60,
        is_flexible: false,
        work_days: [1, 2, 3, 4, 5]
      });
      fetchInitialData();
    } catch (error: any) {
      console.error('Error adding shift:', error);
      toast.error(error.message || 'خطأ في إضافة الشفت');
    }
  };

  const addScheduleEntry = async (employeeId: string, date: string, shiftId: string) => {
    try {
      const shift = shifts.find(s => s.id === shiftId);
      if (!shift) return;

      const scheduleEntry = {
        employee_id: employeeId,
        shift_id: shiftId,
        work_date: date,
        planned_start: shift.start_time,
        planned_end: shift.end_time,
        work_type: 'office' as const,
        status: 'pending' as const
      };

      const { error } = await supabase
        .from('employee_schedules')
        .upsert(scheduleEntry, {
          onConflict: 'employee_id,work_date',
          ignoreDuplicates: false
        });

      if (error) throw error;

      toast.success('تم تحديث الجدولة بنجاح');
      fetchSchedules();
    } catch (error: any) {
      console.error('Error adding schedule entry:', error);
      toast.error(error.message || 'خطأ في إضافة الجدولة');
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getScheduleForEmployeeAndDate = (employeeId: string, date: string) => {
    return schedules.find(s => s.employee_id === employeeId && s.work_date === date);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-500',
      holiday: 'bg-green-500',
      leave: 'bg-yellow-500',
      sick: 'bg-red-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const getWorkTypeColor = (workType: string) => {
    const colors = {
      office: 'bg-blue-100 text-blue-800',
      remote: 'bg-green-100 text-green-800',
      hybrid: 'bg-purple-100 text-purple-800',
      flexible: 'bg-orange-100 text-orange-800'
    };
    return colors[workType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
        <p className="text-lg text-muted-foreground">جاري تحميل الجداول...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">الجدولة الشهرية</h2>
          <p className="text-muted-foreground">إدارة جداول الدوامات والشفتات</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddShiftOpen} onOpenChange={setIsAddShiftOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                إضافة شفت
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة شفت جديد</DialogTitle>
                <DialogDescription>
                  قم بإنشاء شفت عمل جديد لاستخدامه في الجدولة
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>اسم الشفت</Label>
                  <Input
                    value={newShift.shift_name_ar}
                    onChange={(e) => setNewShift(prev => ({ ...prev, shift_name_ar: e.target.value }))}
                    placeholder="الدوام الصباحي"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>وقت البداية</Label>
                    <Input
                      type="time"
                      value={newShift.start_time}
                      onChange={(e) => setNewShift(prev => ({ ...prev, start_time: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>وقت النهاية</Label>
                    <Input
                      type="time"
                      value={newShift.end_time}
                      onChange={(e) => setNewShift(prev => ({ ...prev, end_time: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>مدة الاستراحة (بالدقائق)</Label>
                  <Input
                    type="number"
                    value={newShift.break_duration}
                    onChange={(e) => setNewShift(prev => ({ ...prev, break_duration: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddShiftOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={addShift}>
                  إضافة الشفت
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            تصدير الجدول
          </Button>
        </div>
      </div>

      {/* Month Navigation */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl">{monthName}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Shifts Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">الشفتات المتاحة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shifts.map((shift) => (
              <div key={shift.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{shift.shift_name_ar}</p>
                  <p className="text-sm text-muted-foreground">
                    {shift.start_time} - {shift.end_time}
                  </p>
                </div>
                <Badge variant={shift.is_flexible ? 'secondary' : 'default'}>
                  {shift.is_flexible ? 'مرن' : 'ثابت'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle>جدول الشهر</CardTitle>
          <CardDescription>اسحب واترك لجدولة الموظفين</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Days Header */}
              <div className="grid grid-cols-32 gap-1 mb-4">
                <div className="font-medium text-sm p-2">الموظف</div>
                {days.map((day) => (
                  <div key={day.toISOString()} className="text-center text-xs p-2 font-medium">
                    <div>{day.getDate()}</div>
                    <div className="text-muted-foreground">
                      {day.toLocaleDateString('ar-SA', { weekday: 'short' })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Employee Rows */}
              <div className="space-y-2">
                {employees.slice(0, 10).map((employee) => (
                  <div key={employee.id} className="grid grid-cols-32 gap-1 items-center">
                    <div className="p-2 font-medium text-sm">
                      <div>{employee.first_name} {employee.last_name}</div>
                      <div className="text-xs text-muted-foreground">{employee.department}</div>
                    </div>
                    
                    {days.map((day) => {
                      const dateStr = day.toISOString().split('T')[0];
                      const schedule = getScheduleForEmployeeAndDate(employee.id, dateStr);
                      const isWeekend = day.getDay() === 5 || day.getDay() === 6; // الجمعة والسبت
                      
                      return (
                        <div
                          key={dateStr}
                          className={`h-12 border rounded cursor-pointer hover:bg-accent/50 ${
                            isWeekend ? 'bg-gray-100' : ''
                          } ${schedule ? getStatusColor(schedule.status) : 'bg-white'}`}
                          onClick={() => {
                            if (shifts.length > 0) {
                              addScheduleEntry(employee.id, dateStr, shifts[0].id);
                            }
                          }}
                        >
                          {schedule && (
                            <div className="p-1 text-xs text-center text-white">
                              <div className="truncate">
                                {schedule.shift_name}
                              </div>
                              {schedule.work_type !== 'office' && (
                                <Badge className={`${getWorkTypeColor(schedule.work_type)} text-xs`}>
                                  {schedule.work_type === 'remote' ? 'عن بعد' :
                                   schedule.work_type === 'hybrid' ? 'مختلط' : 'مرن'}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              إحصائيات الشهر
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">إجمالي الأيام المجدولة:</span>
              <span className="font-bold">{schedules.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">أيام العطل:</span>
              <span className="font-bold text-green-600">
                {schedules.filter(s => s.status === 'holiday').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الإجازات:</span>
              <span className="font-bold text-yellow-600">
                {schedules.filter(s => s.status === 'leave').length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              أنماط العمل
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">حضوري:</span>
              <span className="font-bold">
                {schedules.filter(s => s.work_type === 'office').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">عن بُعد:</span>
              <span className="font-bold text-green-600">
                {schedules.filter(s => s.work_type === 'remote').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">مختلط:</span>
              <span className="font-bold text-purple-600">
                {schedules.filter(s => s.work_type === 'hybrid').length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Copy className="h-4 w-4 mr-2" />
              نسخ جدول الشهر الماضي
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Save className="h-4 w-4 mr-2" />
              حفظ كقالب
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              جدولة تلقائية
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};