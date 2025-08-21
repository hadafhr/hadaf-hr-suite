import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEmployeeDashboard } from '@/hooks/useEmployeeDashboard';
import { EmployeeNotifications } from './EmployeeNotifications';
import { EmployeeDocuments } from './EmployeeDocuments';
import { EmployeeAttendance } from './EmployeeAttendance';
import { 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  Bell, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export const EmployeeDashboard = () => {
  const {
    employee,
    todayAttendance,
    notifications,
    unreadNotifications,
    documents,
    isLoading,
    checkInWithLocation,
    checkOutWithLocation,
    markNotificationAsRead,
    uploadDocument
  } = useEmployeeDashboard();

  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="mr-2">جارٍ تحميل البيانات...</span>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold">خطأ في الوصول</h3>
              <p className="text-muted-foreground">لم يتم العثور على بيانات الموظف</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    try {
      await checkInWithLocation();
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    setIsCheckingOut(true);
    try {
      await checkOutWithLocation();
    } finally {
      setIsCheckingOut(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-600">نشط</Badge>;
      case 'inactive':
        return <Badge variant="secondary">غير نشط</Badge>;
      case 'suspended':
        return <Badge variant="destructive">موقوف</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const canCheckIn = !todayAttendance || !todayAttendance.check_in_time;
  const canCheckOut = todayAttendance && todayAttendance.check_in_time && !todayAttendance.check_out_time;

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* رأس الصفحة - معلومات الموظف */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Avatar className="h-20 w-20">
              <AvatarImage src={employee.profile_picture_url} />
              <AvatarFallback className="text-lg">
                {employee.first_name[0]}{employee.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">
                  {employee.first_name} {employee.last_name}
                </h1>
                {getStatusBadge(employee.employment_status)}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>رقم الموظف: {employee.employee_id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(), 'EEEE، dd MMMM yyyy', { locale: ar })}</span>
                </div>
              </div>
            </div>
            {unreadNotifications > 0 && (
              <div className="relative">
                <Bell className="h-6 w-6 text-primary" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {unreadNotifications}
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* قسم الحضور والانصراف السريع */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            الحضور والانصراف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* معلومات حضور اليوم */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">حضور اليوم</h4>
              {todayAttendance ? (
                <div className="space-y-1">
                  {todayAttendance.check_in_time && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>دخول: {format(new Date(todayAttendance.check_in_time), 'HH:mm')}</span>
                    </div>
                  )}
                  {todayAttendance.check_out_time && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span>خروج: {format(new Date(todayAttendance.check_out_time), 'HH:mm')}</span>
                    </div>
                  )}
                  {todayAttendance.total_hours && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>الإجمالي: {todayAttendance.total_hours} ساعة</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">لم يتم تسجيل حضور اليوم</p>
              )}
            </div>

            {/* أزرار التسجيل */}
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleCheckIn}
                disabled={!canCheckIn || isCheckingIn}
                className="w-full"
                size="lg"
              >
                {isCheckingIn ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جارٍ التسجيل...
                  </>
                ) : (
                  <>
                    <MapPin className="ml-2 h-4 w-4" />
                    تسجيل الحضور
                  </>
                )}
              </Button>

              <Button
                onClick={handleCheckOut}
                disabled={!canCheckOut || isCheckingOut}
                variant="outline"
                className="w-full"
                size="lg"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جارٍ التسجيل...
                  </>
                ) : (
                  <>
                    <MapPin className="ml-2 h-4 w-4" />
                    تسجيل الانصراف
                  </>
                )}
              </Button>
            </div>

            {/* معلومات إضافية */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">معلومات إضافية</h4>
              <div className="text-sm space-y-1">
                <div>الراتب الأساسي: {employee.basic_salary?.toLocaleString()} ريال</div>
                <div>المستندات: {documents.length}</div>
                <div>الإشعارات غير المقروءة: {unreadNotifications}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التبويبات الرئيسية */}
      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
            {unreadNotifications > 0 && (
              <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                {unreadNotifications}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            الحضور
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            المستندات
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            الملف الشخصي
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <EmployeeNotifications 
            notifications={notifications}
            onMarkAsRead={markNotificationAsRead}
          />
        </TabsContent>

        <TabsContent value="attendance">
          <EmployeeAttendance 
            employee={employee}
            todayAttendance={todayAttendance}
          />
        </TabsContent>

        <TabsContent value="documents">
          <EmployeeDocuments 
            documents={documents}
            onUpload={uploadDocument}
          />
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>الملف الشخصي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">الاسم الأول</label>
                  <p className="text-sm text-muted-foreground">{employee.first_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">الاسم الأخير</label>
                  <p className="text-sm text-muted-foreground">{employee.last_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">البريد الإلكتروني</label>
                  <p className="text-sm text-muted-foreground">{employee.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">رقم الهاتف</label>
                  <p className="text-sm text-muted-foreground">{employee.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">رقم الموظف</label>
                  <p className="text-sm text-muted-foreground">{employee.employee_id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">الحالة الوظيفية</label>
                  <div className="mt-1">{getStatusBadge(employee.employment_status)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};