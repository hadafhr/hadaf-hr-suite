import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plane,
  Home,
  Users
} from 'lucide-react';

interface AttendanceCalendarProps {
  employeeId?: string;
  viewMode?: 'employee' | 'manager';
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  employeeId = 'EMP001',
  viewMode = 'employee'
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarType, setCalendarType] = useState<'gregorian' | 'hijri'>('gregorian');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState(employeeId);

  // Mock attendance data
  const attendanceData = {
    'EMP001': {
      '2024-01-15': { status: 'present', checkIn: '08:15', checkOut: '17:00', hours: 8.75, late: 15 },
      '2024-01-16': { status: 'present', checkIn: '07:55', checkOut: '17:05', hours: 9.17, late: 0 },
      '2024-01-17': { status: 'late', checkIn: '08:45', checkOut: '17:15', hours: 8.5, late: 45 },
      '2024-01-18': { status: 'absent', reason: 'مرض' },
      '2024-01-19': { status: 'leave', type: 'إجازة سنوية' },
      '2024-01-20': { status: 'weekend' },
      '2024-01-21': { status: 'weekend' },
      '2024-01-22': { status: 'present', checkIn: '08:00', checkOut: '17:00', hours: 9, late: 0 },
      '2024-01-23': { status: 'remote', checkIn: '08:30', checkOut: '16:30', hours: 8, late: 0 },
      '2024-01-24': { status: 'present', checkIn: '08:10', checkOut: '17:10', hours: 9, late: 10 },
      '2024-01-25': { status: 'holiday', name: 'يوم التأسيس' }
    }
  };

  const employees = [
    { id: 'EMP001', name: 'أحمد محمد العلي', department: 'تقنية المعلومات' },
    { id: 'EMP002', name: 'فاطمة عبدالله', department: 'الموارد البشرية' },
    { id: 'EMP003', name: 'محمد خالد السالم', department: 'المبيعات' },
    { id: 'EMP004', name: 'نورا عبدالرحمن', department: 'التسويق' },
    { id: 'EMP005', name: 'سارة أحمد المطيري', department: 'المالية' }
  ];

  // Hijri date conversion (simplified)
  const getHijriDate = (date: Date) => {
    const hijriMonths = [
      'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة',
      'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
    ];
    
    // Simplified conversion (in real app, use proper library like moment-hijri)
    const hijriYear = 1445;
    const hijriMonth = (date.getMonth() + 9) % 12;
    const hijriDay = date.getDate();
    
    return `${hijriDay} ${hijriMonths[hijriMonth]} ${hijriYear}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'leave':
        return <Plane className="h-4 w-4 text-blue-600" />;
      case 'remote':
        return <Home className="h-4 w-4 text-purple-600" />;
      case 'holiday':
        return <Sun className="h-4 w-4 text-orange-600" />;
      case 'weekend':
        return <Moon className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      present: { label: 'حاضر', className: 'bg-green-100 text-green-800' },
      absent: { label: 'غائب', className: 'bg-red-100 text-red-800' },
      late: { label: 'متأخر', className: 'bg-yellow-100 text-yellow-800' },
      leave: { label: 'إجازة', className: 'bg-blue-100 text-blue-800' },
      remote: { label: 'عن بعد', className: 'bg-purple-100 text-purple-800' },
      holiday: { label: 'عطلة رسمية', className: 'bg-orange-100 text-orange-800' },
      weekend: { label: 'عطلة نهاية أسبوع', className: 'bg-gray-100 text-gray-800' }
    };

    const statusInfo = config[status as keyof typeof config] || { label: 'غير محدد', className: 'bg-gray-100 text-gray-800' };
    
    return <Badge className={statusInfo.className}>{statusInfo.label}</Badge>;
  };

  const getDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getAttendanceForDate = (date: Date) => {
    const dateKey = getDateKey(date);
    return attendanceData[selectedEmployee as keyof typeof attendanceData]?.[dateKey];
  };

  const getDayStatus = (date: Date) => {
    const attendance = getAttendanceForDate(date);
    return attendance?.status || 'no-data';
  };

  const getDayClassName = (date: Date) => {
    const status = getDayStatus(date);
    const baseClass = 'relative hover:bg-gray-100 transition-colors';
    
    switch (status) {
      case 'present':
        return `${baseClass} bg-green-50 hover:bg-green-100`;
      case 'absent':
        return `${baseClass} bg-red-50 hover:bg-red-100`;
      case 'late':
        return `${baseClass} bg-yellow-50 hover:bg-yellow-100`;
      case 'leave':
        return `${baseClass} bg-blue-50 hover:bg-blue-100`;
      case 'remote':
        return `${baseClass} bg-purple-50 hover:bg-purple-100`;
      case 'holiday':
        return `${baseClass} bg-orange-50 hover:bg-orange-100`;
      case 'weekend':
        return `${baseClass} bg-gray-50 hover:bg-gray-100`;
      default:
        return baseClass;
    }
  };

  const renderDayContent = (date: Date) => {
    const attendance = getAttendanceForDate(date);
    const status = getDayStatus(date);
    
    return (
      <div className="w-full h-full p-1">
        <div className="text-center text-sm font-medium mb-1">
          {date.getDate()}
        </div>
        {attendance && (
          <div className="absolute bottom-1 right-1">
            {getStatusIcon(status)}
          </div>
        )}
      </div>
    );
  };

  const selectedDateAttendance = selectedDate ? getAttendanceForDate(selectedDate) : null;

  return (
    <div className="space-y-6">
      {/* Calendar Controls */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-[#009F87]" />
              التقويم المزدوج - الحضور والانصراف
            </div>
            
            <div className="flex gap-2">
              <Select value={calendarType} onValueChange={(value: 'gregorian' | 'hijri') => setCalendarType(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gregorian">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      ميلادي
                    </div>
                  </SelectItem>
                  <SelectItem value="hijri">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      هجري
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {viewMode === 'manager' && (
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {emp.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">عرض التقويم</TabsTrigger>
              <TabsTrigger value="list">العرض القائمي</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">
                        {calendarType === 'gregorian' 
                          ? selectedMonth.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long' })
                          : getHijriDate(selectedMonth)
                        }
                      </h3>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newMonth = new Date(selectedMonth);
                            newMonth.setMonth(newMonth.getMonth() - 1);
                            setSelectedMonth(newMonth);
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMonth(new Date())}
                        >
                          اليوم
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newMonth = new Date(selectedMonth);
                            newMonth.setMonth(newMonth.getMonth() + 1);
                            setSelectedMonth(newMonth);
                          }}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      month={selectedMonth}
                      onMonthChange={setSelectedMonth}
                      className="w-full"
                      classNames={{
                        day: "h-12 w-12 p-0 font-normal aria-selected:opacity-100",
                        day_selected: "bg-[#009F87] text-white hover:bg-[#008072] hover:text-white focus:bg-[#008072] focus:text-white",
                        day_today: "bg-accent text-accent-foreground font-bold",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_hidden: "invisible"
                      }}
                      components={{
                        DayContent: ({ date }) => renderDayContent(date)
                      }}
                    />
                  </div>

                  {/* Legend */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      حاضر
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      غائب
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      متأخر
                    </div>
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-blue-600" />
                      إجازة
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-purple-600" />
                      عن بعد
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-orange-600" />
                      عطلة رسمية
                    </div>
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-gray-600" />
                      عطلة أسبوعية
                    </div>
                  </div>
                </div>

                {/* Day Details */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        تفاصيل اليوم المحدد
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="font-medium mb-2">التاريخ</div>
                        <div className="text-sm space-y-1">
                          <div>ميلادي: {selectedDate.toLocaleDateString('ar-SA')}</div>
                          <div>هجري: {getHijriDate(selectedDate)}</div>
                        </div>
                      </div>

                      {selectedDateAttendance ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(selectedDateAttendance.status)}
                            {getStatusBadge(selectedDateAttendance.status)}
                          </div>

                          {selectedDateAttendance.checkIn && (
                            <div>
                              <div className="font-medium mb-1">أوقات الحضور</div>
                              <div className="space-y-1 text-sm">
                                <div>الحضور: {selectedDateAttendance.checkIn}</div>
                                <div>الانصراف: {selectedDateAttendance.checkOut}</div>
                                <div>إجمالي الساعات: {selectedDateAttendance.hours} ساعة</div>
                                {selectedDateAttendance.late && selectedDateAttendance.late > 0 && (
                                  <div className="text-yellow-600">
                                    تأخير: {selectedDateAttendance.late} دقيقة
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {selectedDateAttendance.reason && (
                            <div>
                              <div className="font-medium mb-1">السبب</div>
                              <div className="text-sm">{selectedDateAttendance.reason}</div>
                            </div>
                          )}

                          {selectedDateAttendance.type && (
                            <div>
                              <div className="font-medium mb-1">نوع الإجازة</div>
                              <div className="text-sm">{selectedDateAttendance.type}</div>
                            </div>
                          )}

                          {selectedDateAttendance.name && (
                            <div>
                              <div className="font-medium mb-1">اسم العطلة</div>
                              <div className="text-sm">{selectedDateAttendance.name}</div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          لا توجد بيانات حضور لهذا اليوم
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">إحصائيات سريعة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-green-600">22</div>
                          <div className="text-xs text-gray-600">أيام حضور</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-red-600">3</div>
                          <div className="text-xs text-gray-600">أيام غياب</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-yellow-600">5</div>
                          <div className="text-xs text-gray-600">مرات تأخير</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-blue-600">94%</div>
                          <div className="text-xs text-gray-600">معدل الحضور</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="space-y-2">
                {Object.entries(attendanceData[selectedEmployee as keyof typeof attendanceData] || {})
                  .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                  .slice(0, 15)
                  .map(([date, attendance]) => (
                    <Card key={date} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(attendance.status)}
                          <div>
                            <div className="font-medium">{new Date(date).toLocaleDateString('ar-SA')}</div>
                            <div className="text-sm text-gray-600">{getHijriDate(new Date(date))}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {'checkIn' in attendance && attendance.checkIn && (
                            <div className="text-sm text-gray-600">
                              {attendance.checkIn} - {attendance.checkOut}
                            </div>
                          )}
                          
                          {getStatusBadge(attendance.status)}
                          
                          {'hours' in attendance && attendance.hours && (
                            <div className="text-sm font-medium">
                              {attendance.hours} س
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceCalendar;