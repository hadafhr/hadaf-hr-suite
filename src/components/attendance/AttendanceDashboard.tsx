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
  const [selectedStatsDialog, setSelectedStatsDialog] = useState<string | null>(null);
  const [detailsDialogData, setDetailsDialogData] = useState<any[]>([]);

  // إحصائيات اليوم
  const [todayStats, setTodayStats] = useState({
    totalEmployees: 245,
    present: 189,
    absent: 8,
    late: 12,
    remote: 15,
    onBreak: 21
  });

  // بيانات وهمية للموظفين - محدثة ومفصلة أكثر
  const mockEmployees = [
    { id: 'EMP001', name: 'أحمد محمد العلي', department: 'تقنية المعلومات', status: 'present', location: 'GPS - المكتب الرئيسي', checkInMethod: 'تطبيق الجوال', checkInTime: '08:00', checkOutTime: '17:30' },
    { id: 'EMP002', name: 'فاطمة أحمد سالم', department: 'الموارد البشرية', status: 'late', location: 'بصمة - المدخل الرئيسي', checkInMethod: 'جهاز البصمة', checkInTime: '08:30', checkOutTime: '17:00' },
    { id: 'EMP003', name: 'عبدالله يوسف خالد', department: 'المالية', status: 'present', location: 'GPS - المكتب الرئيسي', checkInMethod: 'تطبيق الجوال', checkInTime: '07:45', checkOutTime: '16:45' },
    { id: 'EMP004', name: 'نورا سالم المطيري', department: 'التسويق', status: 'remote', location: 'GPS - العمل من المنزل', checkInMethod: 'تطبيق الجوال', checkInTime: '09:00', checkOutTime: null },
    { id: 'EMP005', name: 'محمد خالد الشمري', department: 'المبيعات', status: 'absent', location: null, checkInMethod: null, checkInTime: null, checkOutTime: null },
    { id: 'EMP006', name: 'سارة أحمد الدوسري', department: 'العمليات', status: 'present', location: 'بصمة - المدخل الجانبي', checkInMethod: 'جهاز البصمة', checkInTime: '08:15', checkOutTime: '17:15' },
    { id: 'EMP007', name: 'علي حسن القحطاني', department: 'تقنية المعلومات', status: 'late', location: 'GPS - المكتب الرئيسي', checkInMethod: 'تطبيق الجوال', checkInTime: '08:45', checkOutTime: null },
    { id: 'EMP008', name: 'مريم عبدالله النجار', department: 'الجودة', status: 'present', location: 'بصمة - المدخل الرئيسي', checkInMethod: 'جهاز البصمة', checkInTime: '07:55', checkOutTime: '16:55' }
  ];

  useEffect(() => {
    loadTodayStats();
    loadAttendanceRecords();
    loadWorkSchedules();
  }, [selectedDate]);

  const loadTodayStats = async () => {
    // استخدام البيانات الوهمية
    const stats = {
      totalEmployees: 245,
      present: 189,
      absent: 8,
      late: 12,
      remote: 15,
      onBreak: 21
    };
    setTodayStats(stats);
  };

  const handleStatsClick = (statType: string) => {
    let filteredData: any[] = [];
    
    switch (statType) {
      case 'present':
        filteredData = mockEmployees.filter(emp => emp.status === 'present');
        setSelectedStatsDialog('الموظفين الحاضرين');
        break;
      case 'absent':
        filteredData = mockEmployees.filter(emp => emp.status === 'absent');
        setSelectedStatsDialog('الموظفين الغائبين');
        break;
      case 'late':
        filteredData = mockEmployees.filter(emp => emp.status === 'late');
        setSelectedStatsDialog('الموظفين المتأخرين');
        break;
      case 'remote':
        filteredData = mockEmployees.filter(emp => emp.status === 'remote');
        setSelectedStatsDialog('الموظفين العاملين عن بُعد');
        break;
      case 'total':
        filteredData = mockEmployees;
        setSelectedStatsDialog('جميع الموظفين');
        break;
      default:
        filteredData = mockEmployees.slice(0, 5);
        setSelectedStatsDialog('الموظفين في الاستراحة');
    }
    
    setDetailsDialogData(filteredData);
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

      {/* إحصائيات سريعة تفاعلية */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all"
          onClick={() => handleStatsClick('total')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي الموظفين</p>
                <p className="text-2xl font-bold">{todayStats.totalEmployees}</p>
                <p className="text-xs text-blue-200 mt-1">اضغط لعرض التفاصيل</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-green-500 to-green-600 text-white cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all"
          onClick={() => handleStatsClick('present')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">حاضرون</p>
                <p className="text-2xl font-bold">{todayStats.present}</p>
                <p className="text-xs text-green-200 mt-1">اضغط لعرض الأسماء</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-red-500 to-red-600 text-white cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all"
          onClick={() => handleStatsClick('absent')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">غائبون</p>
                <p className="text-2xl font-bold">{todayStats.absent}</p>
                <p className="text-xs text-red-200 mt-1">اضغط لعرض الأسماء</p>
              </div>
              <UserX className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all"
          onClick={() => handleStatsClick('late')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">متأخرون</p>
                <p className="text-2xl font-bold">{todayStats.late}</p>
                <p className="text-xs text-yellow-200 mt-1">اضغط لعرض الأسماء</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all"
          onClick={() => handleStatsClick('remote')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">عمل عن بُعد</p>
                <p className="text-2xl font-bold">{todayStats.remote}</p>
                <p className="text-xs text-purple-200 mt-1">اضغط لعرض الأسماء</p>
              </div>
              <MapIcon className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all"
          onClick={() => handleStatsClick('break')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">في الاستراحة</p>
                <p className="text-2xl font-bold">{todayStats.onBreak}</p>
                <p className="text-xs text-orange-200 mt-1">اضغط لعرض الأسماء</p>
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
                  {mockEmployees.map((employee) => (
                    <div key={employee.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{employee.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>الإدارة: {employee.department}</span>
                              <span>الرقم الوظيفي: {employee.id}</span>
                              {getStatusBadge(employee.status)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">وقت الحضور</div>
                            <div className="text-xl font-bold text-green-600">
                              {employee.checkInTime || '--:--'}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {employee.checkInMethod || 'لم يسجل'}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">وقت الانصراف</div>
                            <div className="text-xl font-bold text-red-600">
                              {employee.checkOutTime || '--:--'}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {employee.checkOutTime ? employee.checkInMethod : 'لم ينصرف بعد'}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">ساعات العمل</div>
                            <div className="text-xl font-bold text-blue-600">
                              {employee.checkInTime && employee.checkOutTime 
                                ? calculateWorkingHours(`2024-03-20T${employee.checkInTime}:00`, `2024-03-20T${employee.checkOutTime}:00`)
                                : '--:--'
                              }
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">الموقع</div>
                            <div className="text-sm font-medium max-w-32 text-center">
                              {employee.location || 'غير محدد'}
                            </div>
                            <div className="flex items-center justify-center gap-1  mt-1">
                              {employee.location?.includes('GPS') ? (
                                <MapPin className="h-3 w-3 text-blue-500" />
                              ) : employee.location?.includes('بصمة') ? (
                                <Timer className="h-3 w-3 text-green-500" />
                              ) : null}
                              <span className="text-xs text-muted-foreground">
                                {employee.location?.includes('GPS') ? 'GPS' : 
                                 employee.location?.includes('بصمة') ? 'البصمة' : 'غير محدد'}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 ml-1" />
                              عرض
                            </Button>
                            {!employee.checkOutTime && (
                              <Button 
                                size="sm"
                                onClick={() => handleClockOut(employee.id)}
                              >
                                <Clock className="h-4 w-4 ml-1" />
                                انصراف
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dialog لعرض تفاصيل الإحصائيات */}
        <Dialog open={selectedStatsDialog !== null} onOpenChange={() => setSelectedStatsDialog(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedStatsDialog}</DialogTitle>
              <DialogDescription>
                قائمة بأسماء الموظفين وتفاصيل حضورهم
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {detailsDialogData.map((employee) => (
                <div key={employee.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{employee.name}</h4>
                        <p className="text-sm text-muted-foreground">{employee.department} - {employee.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-xs font-medium text-muted-foreground">الحضور</div>
                        <div className="text-sm font-bold text-green-600">
                          {employee.checkInTime || '--:--'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium text-muted-foreground">الانصراف</div>
                        <div className="text-sm font-bold text-red-600">
                          {employee.checkOutTime || '--:--'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium text-muted-foreground">الموقع</div>
                        <div className="text-xs">
                          {employee.location || 'غير محدد'}
                        </div>
                      </div>
                      {getStatusBadge(employee.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

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