import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Calendar as CalendarIcon,
  TrendingUp,
  AlertCircle,
  Loader2,
  Navigation,
  Shield,
  Wifi,
  Battery,
  Timer,
  Users,
  BarChart3,
  FileText,
  Download,
  Filter,
  Search,
  RefreshCw,
  Settings,
  Eye
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  workHours: number;
  overtimeHours: number;
  status: 'present' | 'absent' | 'late' | 'earlyLeave' | 'holiday' | 'weekend';
  location?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
}

interface AttendanceSchedule {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakTime: number;
  workDays: string[];
  isActive: boolean;
}

const AttendanceManagement: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Mock attendance schedules
  const [attendanceSchedules] = useState<AttendanceSchedule[]>([
    {
      id: 'SCH001',
      name: 'الدوام العادي',
      startTime: '08:00',
      endTime: '17:00',
      breakTime: 60,
      workDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
      isActive: true
    },
    {
      id: 'SCH002',
      name: 'الدوام المرن',
      startTime: '09:00',
      endTime: '18:00',
      breakTime: 60,
      workDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
      isActive: true
    },
    {
      id: 'SCH003',
      name: 'المناوبة الليلية',
      startTime: '22:00',
      endTime: '06:00',
      breakTime: 30,
      workDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
      isActive: true
    }
  ]);

  // Mock attendance records
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: 'ATT001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      date: '2024-03-25',
      checkIn: '08:00',
      checkOut: '17:15',
      workHours: 8.25,
      overtimeHours: 0.25,
      status: 'present',
      location: 'المكتب الرئيسي - الرياض',
      coordinates: { latitude: 24.7136, longitude: 46.6753 }
    },
    {
      id: 'ATT002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة سعد الأحمد',
      date: '2024-03-25',
      checkIn: '08:15',
      checkOut: '17:00',
      workHours: 7.75,
      overtimeHours: 0,
      status: 'late',
      location: 'المكتب الرئيسي - الرياض',
      coordinates: { latitude: 24.7136, longitude: 46.6753 }
    },
    {
      id: 'ATT003',
      employeeId: 'EMP003',
      employeeName: 'خالد يوسف النمر',
      date: '2024-03-25',
      checkIn: null,
      checkOut: null,
      workHours: 0,
      overtimeHours: 0,
      status: 'absent',
      notes: 'إجازة مرضية'
    },
    {
      id: 'ATT004',
      employeeId: 'EMP004',
      employeeName: 'نورا محمد السعد',
      date: '2024-03-25',
      checkIn: '08:00',
      checkOut: '16:30',
      workHours: 7.5,
      overtimeHours: 0,
      status: 'earlyLeave',
      location: 'المكتب الرئيسي - الرياض',
      coordinates: { latitude: 24.7136, longitude: 46.6753 },
      notes: 'ظروف طارئة'
    }
  ]);

  const departments = [
    'تقنية المعلومات',
    'المالية', 
    'الموارد البشرية',
    'المبيعات',
    'التسويق',
    'العمليات'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'present': { color: 'bg-green-100 text-green-700 border-green-200', text: 'حاضر', icon: CheckCircle },
      'absent': { color: 'bg-red-100 text-red-700 border-red-200', text: 'غائب', icon: XCircle },
      'late': { color: 'bg-orange-100 text-orange-700 border-orange-200', text: 'متأخر', icon: Clock },
      'earlyLeave': { color: 'bg-blue-100 text-blue-700 border-blue-200', text: 'انصراف مبكر', icon: Timer },
      'holiday': { color: 'bg-purple-100 text-purple-700 border-purple-200', text: 'عطلة', icon: CalendarIcon },
      'weekend': { color: 'bg-gray-100 text-gray-700 border-gray-200', text: 'نهاية أسبوع', icon: CalendarIcon }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const calculateDailyStats = () => {
    const todayRecords = attendanceRecords.filter(record => 
      record.date === selectedDate.toISOString().split('T')[0]
    );
    
    return {
      total: todayRecords.length,
      present: todayRecords.filter(r => r.status === 'present').length,
      late: todayRecords.filter(r => r.status === 'late').length,
      absent: todayRecords.filter(r => r.status === 'absent').length,
      earlyLeave: todayRecords.filter(r => r.status === 'earlyLeave').length,
      totalWorkHours: todayRecords.reduce((sum, r) => sum + r.workHours, 0),
      totalOvertimeHours: todayRecords.reduce((sum, r) => sum + r.overtimeHours, 0)
    };
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesDate = record.date === selectedDate.toISOString().split('T')[0];
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesSearch;
  });

  const dailyStats = calculateDailyStats();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
      </div>

      {/* Header */}
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#009F87]/10 rounded-lg">
              <Clock className="h-8 w-8 text-[#009F87]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#009F87]">نظام إدارة الحضور والانصراف</h1>
              <p className="text-muted-foreground">
                الوقت الحالي: {currentTime.toLocaleTimeString('ar-SA', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit',
                  hour12: false 
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hover:bg-[#009F87] hover:text-white">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" className="hover:bg-[#009F87] hover:text-white">
              <Settings className="h-4 w-4 ml-2" />
              إعدادات الحضور
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-[#009F87]" />
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border border-[#009F87]/20"
                />
              </div>
              
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث عن موظف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#009F87]/20 focus:border-[#009F87]"
                />
              </div>

              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48 border-[#009F87]/20 focus:border-[#009F87]">
                  <SelectValue placeholder="القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={viewMode} onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setViewMode(value)}>
                <SelectTrigger className="w-32 border-[#009F87]/20 focus:border-[#009F87]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">يومي</SelectItem>
                  <SelectItem value="weekly">أسبوعي</SelectItem>
                  <SelectItem value="monthly">شهري</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87]">{dailyStats.total}</div>
            <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{dailyStats.present}</div>
            <div className="text-sm text-muted-foreground">حاضر</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-orange-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{dailyStats.late}</div>
            <div className="text-sm text-muted-foreground">متأخر</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-red-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{dailyStats.absent}</div>
            <div className="text-sm text-muted-foreground">غائب</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-blue-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Timer className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{dailyStats.earlyLeave}</div>
            <div className="text-sm text-muted-foreground">انصراف مبكر</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-purple-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.5s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{dailyStats.totalWorkHours.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">ساعات العمل</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-teal-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.6s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-6 w-6 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-teal-600">{dailyStats.totalOvertimeHours.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">ساعات إضافية</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card className="relative bg-white/80 backdrop-blur border-[#009F87]/20 animate-slide-in-left">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#009F87]">
            <FileText className="h-6 w-6" />
            سجل الحضور اليومي - {selectedDate.toLocaleDateString('ar-SA')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>لا توجد سجلات حضور لهذا التاريخ</p>
              </div>
            ) : (
              filteredRecords.map((record, index) => (
                <Card 
                  key={record.id} 
                  className="hover:shadow-md transition-all animate-fade-in hover:scale-[1.02]"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-[#009F87]">
                            {record.employeeName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                          <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                          {record.location && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {record.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm font-medium text-muted-foreground">الحضور</div>
                          <div className="font-semibold text-green-600">
                            {record.checkIn || '--:--'}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-medium text-muted-foreground">الانصراف</div>
                          <div className="font-semibold text-red-600">
                            {record.checkOut || '--:--'}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-medium text-muted-foreground">ساعات العمل</div>
                          <div className="font-semibold text-[#009F87]">
                            {record.workHours.toFixed(1)}
                          </div>
                        </div>
                        
                        {record.overtimeHours > 0 && (
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">إضافي</div>
                            <div className="font-semibold text-purple-600">
                              {record.overtimeHours.toFixed(1)}
                            </div>
                          </div>
                        )}
                        
                        <div className="text-center">
                          <div className="text-sm font-medium text-muted-foreground mb-1">الحالة</div>
                          {getStatusBadge(record.status)}
                        </div>
                        
                        <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                          <Eye className="h-4 w-4 ml-1" />
                          تفاصيل
                        </Button>
                      </div>
                    </div>
                    
                    {record.notes && (
                      <div className="mt-3 p-2 bg-yellow-50 rounded border-r-4 border-yellow-400">
                        <p className="text-sm text-yellow-800">{record.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Schedules */}
      <Card className="relative bg-white/80 backdrop-blur border-[#009F87]/20 animate-slide-in-right">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#009F87]">
            <CalendarIcon className="h-6 w-6" />
            جداول الحضور المتاحة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {attendanceSchedules.map((schedule, index) => (
              <Card 
                key={schedule.id} 
                className="hover:shadow-md transition-all animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[#009F87]">{schedule.name}</h3>
                    <Badge className={schedule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {schedule.isActive ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">بداية العمل:</span>
                      <span className="font-medium">{schedule.startTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">نهاية العمل:</span>
                      <span className="font-medium">{schedule.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">فترة الراحة:</span>
                      <span className="font-medium">{schedule.breakTime} دقيقة</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-muted-foreground text-xs">أيام العمل:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {schedule.workDays.map((day) => (
                          <Badge key={day} variant="outline" className="text-xs">
                            {day.slice(0, 3)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagement;