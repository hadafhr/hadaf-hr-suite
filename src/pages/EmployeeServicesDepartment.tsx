import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, Calendar, DollarSign, FileText, 
  Clock, AlertCircle, LogOut, ArrowRight,
  UserCheck, CalendarDays, Banknote, 
  FileCheck, UserCog, Building2
} from 'lucide-react';

import { EmployeeProfileManagement } from '@/components/employee/EmployeeProfileManagement';
import { AttendanceTimeTracking } from '@/components/employee/AttendanceTimeTracking';
import { PayrollBenefitsRequests } from '@/components/employee/PayrollBenefitsRequests';
import { LeaveAbsenceManagement } from '@/components/employee/LeaveAbsenceManagement';
import { DisciplinaryActionsManagement } from '@/components/employee/DisciplinaryActionsManagement';
import { EmployeeRequestsPortal } from '@/components/employee/EmployeeRequestsPortal';
import { EndOfServiceManagement } from '@/components/employee/EndOfServiceManagement';
import { useEmployeeServices } from '@/hooks/useEmployeeServices';
import { Separator } from '@/components/ui/separator';

interface ServiceModule {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: {
    pending?: number;
    total?: number;
    status?: string;
  };
}

export default function EmployeeServicesDepartment() {
  const [activeTab, setActiveTab] = useState('profile');
  const { 
    loading, 
    leaveRequests, 
    employeeRequests, 
    attendanceCorrections, 
    payrollRequests,
    endOfServiceRecords 
  } = useEmployeeServices();

  // حساب الإحصائيات السريعة
  const stats = {
    pendingLeaveRequests: leaveRequests.filter(r => r.status === 'pending').length,
    pendingEmployeeRequests: employeeRequests.filter(r => r.status === 'submitted').length,
    pendingAttendanceCorrections: attendanceCorrections.filter(r => r.status === 'pending').length,
    pendingPayrollRequests: payrollRequests.filter(r => r.status === 'pending').length,
    activeEOSRecords: endOfServiceRecords.filter(r => r.status === 'pending').length
  };

  const serviceModules: ServiceModule[] = [
    {
      id: 'profile',
      title: 'إدارة ملف الموظف',
      titleEn: 'Employee Profile Management',
      description: 'إنشاء وعرض وتحرير بيانات الموظفين والوثائق الشخصية',
      icon: <UserCheck className="h-6 w-6" />,
      color: 'bg-blue-50 border-blue-200',
      stats: { total: 1, status: 'نشط' }
    },
    {
      id: 'attendance',
      title: 'الحضور وتتبع الوقت',
      titleEn: 'Attendance & Time Tracking',
      description: 'مراجعة الحضور وطلبات التصحيح والتقارير الشهرية',
      icon: <CalendarDays className="h-6 w-6" />,
      color: 'bg-green-50 border-green-200',
      stats: { pending: stats.pendingAttendanceCorrections, total: attendanceCorrections.length }
    },
    {
      id: 'payroll',
      title: 'طلبات الرواتب والمزايا',
      titleEn: 'Payroll & Benefits Requests',
      description: 'طلب شهادات راتب، سلف، بدلات، وخطابات بنكية',
      icon: <Banknote className="h-6 w-6" />,
      color: 'bg-yellow-50 border-yellow-200',
      stats: { pending: stats.pendingPayrollRequests, total: payrollRequests.length }
    },
    {
      id: 'leave',
      title: 'إدارة الإجازات والغياب',
      titleEn: 'Leave & Absence Management',
      description: 'تقديم طلبات الإجازة ومراجعة الأرصدة والموافقات',
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-purple-50 border-purple-200',
      stats: { pending: stats.pendingLeaveRequests, total: leaveRequests.length }
    },
    {
      id: 'disciplinary',
      title: 'الإجراءات التأديبية',
      titleEn: 'Disciplinary Actions',
      description: 'مراجعة المخالفات والإنذارات وتطبيق اللوائح',
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'bg-red-50 border-red-200',
      stats: { total: 0, status: 'لا توجد مخالفات' }
    },
    {
      id: 'requests',
      title: 'بوابة طلبات الموظفين',
      titleEn: 'Employee Requests Portal',
      description: 'إرسال ومتابعة الطلبات الإدارية والشهادات',
      icon: <FileCheck className="h-6 w-6" />,
      color: 'bg-indigo-50 border-indigo-200',
      stats: { pending: stats.pendingEmployeeRequests, total: employeeRequests.length }
    },
    {
      id: 'eos',
      title: 'إدارة نهاية الخدمة',
      titleEn: 'End of Service Management',
      description: 'حساب مكافآت نهاية الخدمة ومعاملات إنهاء العقد',
      icon: <LogOut className="h-6 w-6" />,
      color: 'bg-gray-50 border-gray-200',
      stats: { pending: stats.activeEOSRecords, total: endOfServiceRecords.length }
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            قسم خدمات الموظفين
          </h1>
          <p className="text-gray-600">
            مركز شامل لجميع الخدمات المتعلقة بالموظفين
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          <Badge variant="outline" className="text-sm">
            BOUD HR System
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">الطلبات المعلقة</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.pendingEmployeeRequests + stats.pendingLeaveRequests + stats.pendingPayrollRequests}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">طلبات الحضور</p>
                <p className="text-2xl font-bold text-green-600">{stats.pendingAttendanceCorrections}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">طلبات الإجازة</p>
                <p className="text-2xl font-bold text-purple-600">{stats.pendingLeaveRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">طلبات الرواتب</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayrollRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {serviceModules.map((module) => (
          <Card 
            key={module.id} 
            className={`${module.color} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
            onClick={() => setActiveTab(module.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {module.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-800 mb-1">
                      {module.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{module.titleEn}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {module.description}
              </p>
              <div className="flex items-center justify-between">
                {module.stats.pending !== undefined ? (
                  <div className="flex gap-2">
                    <Badge variant={module.stats.pending > 0 ? "destructive" : "secondary"} className="text-xs">
                      معلقة: {module.stats.pending}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      الإجمالي: {module.stats.total}
                    </Badge>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {module.stats.status}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile" className="text-xs">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs">الحضور</TabsTrigger>
            <TabsTrigger value="payroll" className="text-xs">الرواتب</TabsTrigger>
            <TabsTrigger value="leave" className="text-xs">الإجازات</TabsTrigger>
            <TabsTrigger value="disciplinary" className="text-xs">التأديبية</TabsTrigger>
            <TabsTrigger value="requests" className="text-xs">الطلبات</TabsTrigger>
            <TabsTrigger value="eos" className="text-xs">نهاية الخدمة</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="profile">
              <EmployeeProfileManagement />
            </TabsContent>

            <TabsContent value="attendance">
              <AttendanceTimeTracking />
            </TabsContent>

            <TabsContent value="payroll">
              <PayrollBenefitsRequests />
            </TabsContent>

            <TabsContent value="leave">
              <LeaveAbsenceManagement />
            </TabsContent>

            <TabsContent value="disciplinary">
              <DisciplinaryActionsManagement />
            </TabsContent>

            <TabsContent value="requests">
              <EmployeeRequestsPortal />
            </TabsContent>

            <TabsContent value="eos">
              <EndOfServiceManagement />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}