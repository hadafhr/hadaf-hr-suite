import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  ArrowLeft, Clock, CheckCircle, XCircle, Calendar as CalendarIcon, 
  Users, Search, Filter, Download, Plus, MapPin, Camera, AlertCircle,
  TrendingUp, BarChart3, Activity, Timer, Eye, Edit
} from 'lucide-react';
import patternBg from '@/assets/boud-pattern-bg.jpg';
import gradientMesh from '@/assets/boud-gradient-mesh.jpg';
import circlesPattern from '@/assets/boud-circles-pattern.jpg';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  breakStart: string | null;
  breakEnd: string | null;
  workingHours: number;
  overtime: number;
  status: 'present' | 'late' | 'absent' | 'halfDay' | 'remote';
  location: string;
  notes: string;
}

interface AttendanceProps {
  onBack: () => void;
}

export const ComprehensiveAttendance: React.FC<AttendanceProps> = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);

  // Mock data with comprehensive attendance records
  const attendanceData: AttendanceRecord[] = [
    {
      id: 'ATT001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      date: '2024-03-20',
      checkIn: '08:00',
      checkOut: '17:30',
      breakStart: '12:00',
      breakEnd: '13:00',
      workingHours: 8.5,
      overtime: 0.5,
      status: 'present',
      location: 'المكتب الرئيسي',
      notes: 'حضور منتظم'
    },
    {
      id: 'ATT002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة أحمد سالم',
      department: 'الموارد البشرية',
      date: '2024-03-20',
      checkIn: '08:30',
      checkOut: '17:00',
      breakStart: '12:30',
      breakEnd: '13:30',
      workingHours: 7.0,
      overtime: 0,
      status: 'late',
      location: 'المكتب الرئيسي',
      notes: 'تأخير 30 دقيقة - ازدحام مروري'
    },
    {
      id: 'ATT003',
      employeeId: 'EMP003',
      employeeName: 'عبدالله يوسف خالد',
      department: 'المالية',
      date: '2024-03-20',
      checkIn: '09:00',
      checkOut: null,
      breakStart: null,
      breakEnd: null,
      workingHours: 0,
      overtime: 0,
      status: 'remote',
      location: 'العمل عن بُعد',
      notes: 'عمل من المنزل'
    }
  ];

  const attendanceStats = {
    totalEmployees: 245,
    presentToday: 189,
    lateToday: 12,
    absentToday: 8,
    remoteToday: 15,
    onLeaveToday: 21,
    averageWorkingHours: 8.2,
    attendanceRate: 92.5
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: { text: 'حاضر', className: 'bg-success/20 text-success border-success/30' },
      late: { text: 'متأخر', className: 'bg-warning/20 text-warning border-warning/30' },
      absent: { text: 'غائب', className: 'bg-destructive/20 text-destructive border-destructive/30' },
      halfDay: { text: 'نصف يوم', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      remote: { text: 'عن بُعد', className: 'bg-purple-100 text-purple-800 border-purple-200' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const handleCheckIn = () => {
    toast.success('تم تسجيل الحضور بنجاح', {
      description: 'تم تسجيل وقت الوصول في الساعة ' + new Date().toLocaleTimeString('ar-SA')
    });
    setIsCheckInDialogOpen(false);
  };

  const handleCheckOut = () => {
    toast.success('تم تسجيل الانصراف بنجاح', {
      description: 'تم تسجيل وقت المغادرة في الساعة ' + new Date().toLocaleTimeString('ar-SA')
    });
  };

  const filteredAttendance = attendanceData.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${gradientMesh})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative p-6 backdrop-blur-sm">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="bg-white/90 backdrop-blur border-primary/20 hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 backdrop-blur rounded-xl border border-primary/30">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">نظام الحضور والانصراف الشامل</h1>
                <p className="text-muted-foreground">إدارة ومراقبة حضور الموظفين بتقنيات متطورة</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-success hover:bg-success/90 text-white shadow-lg">
                  <CheckCircle className="h-4 w-4 ml-2" />
                  تسجيل حضور
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur">
                <DialogHeader>
                  <DialogTitle className="text-primary">تسجيل الحضور</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">الموظف</label>
                    <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMP001">أحمد محمد العلي</SelectItem>
                        <SelectItem value="EMP002">فاطمة أحمد سالم</SelectItem>
                        <SelectItem value="EMP003">عبدالله يوسف خالد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">الموقع</label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <MapPin className="h-4 w-4 ml-2" />
                        تحديد الموقع
                      </Button>
                      <Button variant="outline">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold text-primary">
                      {new Date().toLocaleTimeString('ar-SA')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                  <Button onClick={handleCheckIn} className="w-full bg-success hover:bg-success/90">
                    تأكيد الحضور
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleCheckOut} variant="destructive" className="shadow-lg">
              <XCircle className="h-4 w-4 ml-2" />
              تسجيل انصراف
            </Button>
          </div>
        </div>

        {/* Comprehensive Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                  <p className="text-3xl font-bold text-primary">{attendanceStats.totalEmployees}</p>
                  <p className="text-xs text-muted-foreground">موظف مسجل</p>
                </div>
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur border-success/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">الحضور اليوم</p>
                  <p className="text-3xl font-bold text-success">{attendanceStats.presentToday}</p>
                  <p className="text-xs text-success">+{attendanceStats.remoteToday} عن بُعد</p>
                </div>
                <div className="p-3 bg-success/20 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-warning/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المتأخرين</p>
                  <p className="text-3xl font-bold text-warning">{attendanceStats.lateToday}</p>
                  <p className="text-xs text-muted-foreground">موظف متأخر</p>
                </div>
                <div className="p-3 bg-warning/20 rounded-lg">
                  <AlertCircle className="h-8 w-8 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">معدل الحضور</p>
                  <p className="text-3xl font-bold text-blue-600">{attendanceStats.attendanceRate}%</p>
                  <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${attendanceStats.attendanceRate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs defaultValue="today" className="space-y-6">
          <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg border border-primary/20">
            <TabsList className="grid w-full grid-cols-4 bg-primary/10">
              <TabsTrigger value="today" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                اليوم
              </TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                أسبوعي
              </TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                شهري
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                التقارير
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="today" className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث عن موظف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/90 backdrop-blur border-primary/20"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-white/90 backdrop-blur border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="present">حاضر</SelectItem>
                    <SelectItem value="late">متأخر</SelectItem>
                    <SelectItem value="absent">غائب</SelectItem>
                    <SelectItem value="remote">عن بُعد</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur border-primary/20">
                  <Filter className="h-4 w-4 ml-2" />
                  تصفية
                </Button>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur border-primary/20">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </div>

            {/* Enhanced Attendance Records */}
            <div className="space-y-4">
              {filteredAttendance.map((record) => {
                const statusBadge = getStatusBadge(record.status);
                return (
                  <Card key={record.id} className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/20 rounded-lg">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{record.employeeName}</h3>
                            <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                            <p className="text-xs text-primary font-medium">{record.department}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">الدخول: {record.checkIn || 'لم يسجل'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-destructive" />
                            <span className="text-sm font-medium">الخروج: {record.checkOut || 'لم يسجل'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">ساعات العمل: {record.workingHours}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{record.location}</span>
                          </div>
                          {record.overtime > 0 && (
                            <div className="text-xs text-warning font-medium">
                              إضافي: {record.overtime} ساعة
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 justify-center">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-4 w-4 ml-2" />
                            تعديل
                          </Button>
                        </div>
                      </div>
                      {record.notes && (
                        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  التقرير الأسبوعي للحضور
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">التقرير الأسبوعي</h3>
                  <p className="text-muted-foreground mb-4">
                    عرض تفصيلي لحضور الموظفين خلال الأسبوع الحالي
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    عرض التقرير الأسبوعي
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  التقرير الشهري للحضور
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CalendarIcon className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">التقرير الشهري</h3>
                  <p className="text-muted-foreground mb-4">
                    تحليل شامل لأداء الحضور والإنتاجية الشهرية
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    عرض التقرير الشهري
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">تقرير الحضور التفصيلي</h3>
                  <p className="text-sm text-muted-foreground">عرض مفصل لجميع سجلات الحضور</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-warning/20 rounded-full w-fit mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-warning" />
                  </div>
                  <h3 className="font-semibold mb-2">تقرير التأخير والغياب</h3>
                  <p className="text-sm text-muted-foreground">تحليل أنماط التأخير والغياب</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-success/20 rounded-full w-fit mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold mb-2">تقرير الإنتاجية</h3>
                  <p className="text-sm text-muted-foreground">قياس إنتاجية الموظفين وأداء الفرق</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};