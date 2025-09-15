import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { UnifiedHeader } from '@/components/shared/UnifiedHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { NotificationBell } from '@/components/shared/NotificationSystem';
import { useAnalytics, useTrackEvent } from '@/components/shared/AnalyticsProvider';
import {
  User,
  Calendar,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Bell,
  Settings,
  Heart,
  GraduationCap,
  Shield,
  MapPin,
  Phone,
  Mail,
  Building2,
  Award,
  TrendingUp
} from 'lucide-react';

// Mock Data Interfaces
interface EmployeeProfile {
  id: string;
  name: string;
  employeeId: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'on_leave' | 'probation';
  avatar?: string;
}

interface LeaveBalance {
  annual: number;
  sick: number;
  emergency: number;
  totalUsed: number;
}

interface ServiceRequest {
  id: string;
  type: 'salary_certificate' | 'housing_allowance' | 'document_request' | 'complaint' | 'advance';
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_progress';
  requestDate: string;
  sla: number; // hours
}

interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'office' | 'remote' | 'hybrid';
}

export const NewEmployeePortal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { track } = useAnalytics();
  const trackEvent = useTrackEvent();
  
  const isArabic = i18n.language === 'ar';

  // Mock Data
  const employeeProfile: EmployeeProfile = {
    id: '1',
    name: 'أحمد محمد العتيبي',
    employeeId: 'EMP-2024-001',
    position: 'مطور برمجيات أول',
    department: 'تقنية المعلومات',
    joinDate: '2023-01-15',
    status: 'active'
  };

  const leaveBalance: LeaveBalance = {
    annual: 22,
    sick: 25,
    emergency: 5,
    totalUsed: 8
  };

  const serviceRequests: ServiceRequest[] = [
    {
      id: '1',
      type: 'salary_certificate',
      title: 'تعريف راتب',
      status: 'approved',
      requestDate: '2024-01-10',
      sla: 48
    },
    {
      id: '2',
      type: 'housing_allowance',
      title: 'طلب بدل سكن',
      status: 'pending',
      requestDate: '2024-01-12',
      sla: 72
    },
    {
      id: '3',
      type: 'advance',
      title: 'سلفة مالية',
      status: 'in_progress',
      requestDate: '2024-01-14',
      sla: 96
    }
  ];

  const upcomingShifts: Shift[] = [
    {
      id: '1',
      date: '2024-01-16',
      startTime: '08:00',
      endTime: '17:00',
      location: 'المكتب الرئيسي',
      type: 'office'
    },
    {
      id: '2',
      date: '2024-01-17',
      startTime: '09:00',
      endTime: '18:00',
      location: 'عمل عن بُعد',
      type: 'remote'
    },
    {
      id: '3',
      date: '2024-01-18',
      startTime: '08:30',
      endTime: '17:30',
      location: 'مكتب فرعي',
      type: 'hybrid'
    }
  ];

  const handleServiceRequest = (type: string) => {
    trackEvent.trackEmployeeRequestCreated(type);
    navigate(`/employee/services/${type}`);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'default',
      approved: 'secondary',
      rejected: 'destructive',
      in_progress: 'outline'
    } as const;
    
    const labels = {
      pending: isArabic ? 'قيد المراجعة' : 'Pending',
      approved: isArabic ? 'معتمد' : 'Approved',
      rejected: isArabic ? 'مرفوض' : 'Rejected',
      in_progress: isArabic ? 'قيد التنفيذ' : 'In Progress'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getShiftTypeIcon = (type: string) => {
    switch (type) {
      case 'office':
        return <Building2 className="h-4 w-4" />;
      case 'remote':
        return <MapPin className="h-4 w-4" />;
      case 'hybrid':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const breadcrumbItems = [
    { label: isArabic ? 'بوابة الموظف' : 'Employee Portal', href: '/employee-portal' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader showAuthActions={true} userRole="employee" />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{employeeProfile.name}</h1>
              <p className="text-muted-foreground">{employeeProfile.position}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{employeeProfile.employeeId}</Badge>
                <Badge variant="outline">{employeeProfile.department}</Badge>
              </div>
            </div>
          </div>
          <NotificationBell count={3} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'رصيد الإجازات' : 'Leave Balance'}
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveBalance.annual}</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'يوم إجازة سنوية' : 'annual leave days'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'الطلبات النشطة' : 'Active Requests'}
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{serviceRequests.filter(r => r.status === 'pending' || r.status === 'in_progress').length}</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'طلب قيد المراجعة' : 'requests under review'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'حالة الحضور' : 'Attendance Status'}
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">95%</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'معدل الحضور الشهري' : 'monthly attendance rate'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'آخر راتب' : 'Last Payslip'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,500</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'ريال سعودي' : 'SAR'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">
              {isArabic ? 'الرئيسية' : 'Dashboard'}
            </TabsTrigger>
            <TabsTrigger value="services">
              {isArabic ? 'الخدمات' : 'Services'}
            </TabsTrigger>
            <TabsTrigger value="schedule">
              {isArabic ? 'الجدول' : 'Schedule'}
            </TabsTrigger>
            <TabsTrigger value="requests">
              {isArabic ? 'طلباتي' : 'My Requests'}
            </TabsTrigger>
            <TabsTrigger value="profile">
              {isArabic ? 'الملف الشخصي' : 'Profile'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {isArabic ? 'الأنشطة الحديثة' : 'Recent Activities'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">{isArabic ? 'تم اعتماد طلب تعريف الراتب' : 'Salary certificate approved'}</p>
                      <p className="text-sm text-muted-foreground">{isArabic ? 'منذ ساعتين' : '2 hours ago'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">{isArabic ? 'طلب بدل السكن قيد المراجعة' : 'Housing allowance under review'}</p>
                      <p className="text-sm text-muted-foreground">{isArabic ? 'منذ يوم واحد' : '1 day ago'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{isArabic ? 'تم تحديث جدول المناوبات' : 'Shift schedule updated'}</p>
                      <p className="text-sm text-muted-foreground">{isArabic ? 'منذ 3 أيام' : '3 days ago'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Leave Balance Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {isArabic ? 'تفاصيل رصيد الإجازات' : 'Leave Balance Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? 'الإجازة السنوية' : 'Annual Leave'}</span>
                      <span>{leaveBalance.annual} {isArabic ? 'يوم' : 'days'}</span>
                    </div>
                    <Progress value={(leaveBalance.annual / 30) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? 'الإجازة المرضية' : 'Sick Leave'}</span>
                      <span>{leaveBalance.sick} {isArabic ? 'يوم' : 'days'}</span>
                    </div>
                    <Progress value={(leaveBalance.sick / 30) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? 'الإجازة الطارئة' : 'Emergency Leave'}</span>
                      <span>{leaveBalance.emergency} {isArabic ? 'يوم' : 'days'}</span>
                    </div>
                    <Progress value={(leaveBalance.emergency / 5) * 100} className="h-2" />
                  </div>
                  
                  <Button className="w-full mt-4" onClick={() => navigate('/employee/leave-request')}>
                    {isArabic ? 'طلب إجازة جديد' : 'Request New Leave'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  {isArabic ? 'كتالوج الخدمات الذاتية' : 'Self-Service Catalog'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => handleServiceRequest('salary_certificate')}
                    className="h-auto p-6 flex flex-col items-center gap-3"
                    variant="outline"
                  >
                    <FileText className="h-8 w-8" />
                    <div className="text-center">
                      <p className="font-medium">{isArabic ? 'تعريف راتب' : 'Salary Certificate'}</p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'للبنوك والجهات الرسمية' : 'For banks and official entities'}
                      </p>
                    </div>
                  </Button>

                  <Button 
                    onClick={() => handleServiceRequest('housing_allowance')}
                    className="h-auto p-6 flex flex-col items-center gap-3"
                    variant="outline"
                  >
                    <Building2 className="h-8 w-8" />
                    <div className="text-center">
                      <p className="font-medium">{isArabic ? 'بدل سكن' : 'Housing Allowance'}</p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'طلب بدل السكن' : 'Request housing allowance'}
                      </p>
                    </div>
                  </Button>

                  <Button 
                    onClick={() => handleServiceRequest('document_request')}
                    className="h-auto p-6 flex flex-col items-center gap-3"
                    variant="outline"
                  >
                    <Download className="h-8 w-8" />
                    <div className="text-center">
                      <p className="font-medium">{isArabic ? 'طلب مستند' : 'Document Request'}</p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'طلب أي مستند رسمي' : 'Request any official document'}
                      </p>
                    </div>
                  </Button>

                  <Button 
                    onClick={() => handleServiceRequest('profile_update')}
                    className="h-auto p-6 flex flex-col items-center gap-3"
                    variant="outline"
                  >
                    <User className="h-8 w-8" />
                    <div className="text-center">
                      <p className="font-medium">{isArabic ? 'تحديث البيانات' : 'Update Profile'}</p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'تحديث المعلومات الشخصية' : 'Update personal information'}
                      </p>
                    </div>
                  </Button>

                  <Button 
                    onClick={() => handleServiceRequest('complaint')}
                    className="h-auto p-6 flex flex-col items-center gap-3"
                    variant="outline"
                  >
                    <AlertCircle className="h-8 w-8" />
                    <div className="text-center">
                      <p className="font-medium">{isArabic ? 'شكوى أو بلاغ' : 'Complaint'}</p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'تقديم شكوى أو بلاغ' : 'Submit a complaint or report'}
                      </p>
                    </div>
                  </Button>

                  <Button 
                    onClick={() => handleServiceRequest('advance')}
                    className="h-auto p-6 flex flex-col items-center gap-3"
                    variant="outline"
                  >
                    <DollarSign className="h-8 w-8" />
                    <div className="text-center">
                      <p className="font-medium">{isArabic ? 'سلفة مالية' : 'Financial Advance'}</p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'طلب سلفة من الراتب' : 'Request salary advance'}
                      </p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {isArabic ? 'جدول المناوبات القادمة' : 'Upcoming Shifts'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingShifts.map((shift) => (
                    <div key={shift.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getShiftTypeIcon(shift.type)}
                        <div>
                          <p className="font-medium">{shift.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {shift.startTime} - {shift.endTime}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {shift.location}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {shift.type === 'office' ? (isArabic ? 'مكتبي' : 'Office') :
                         shift.type === 'remote' ? (isArabic ? 'عن بُعد' : 'Remote') :
                         (isArabic ? 'مختلط' : 'Hybrid')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {isArabic ? 'طلباتي' : 'My Requests'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{request.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? 'تاريخ الطلب:' : 'Request Date:'} {request.requestDate}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            SLA: {request.sla} {isArabic ? 'ساعة' : 'hours'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(request.status)}
                        <Button size="sm" variant="outline">
                          {isArabic ? 'عرض' : 'View'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">{isArabic ? 'الاسم الكامل' : 'Full Name'}</label>
                      <Input value={employeeProfile.name} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{isArabic ? 'رقم الموظف' : 'Employee ID'}</label>
                      <Input value={employeeProfile.employeeId} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{isArabic ? 'المنصب' : 'Position'}</label>
                      <Input value={employeeProfile.position} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{isArabic ? 'القسم' : 'Department'}</label>
                      <Input value={employeeProfile.department} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{isArabic ? 'تاريخ الانضمام' : 'Join Date'}</label>
                      <Input value={employeeProfile.joinDate} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{isArabic ? 'الحالة' : 'Status'}</label>
                      <Input value={employeeProfile.status} readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    {isArabic ? 'الإنجازات والشهادات' : 'Achievements & Certificates'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <Award className="h-8 w-8 text-gold" />
                      <div>
                        <p className="font-medium">{isArabic ? 'موظف الشهر' : 'Employee of the Month'}</p>
                        <p className="text-sm text-muted-foreground">{isArabic ? 'ديسمبر 2023' : 'December 2023'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <GraduationCap className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium">{isArabic ? 'شهادة أساسيات الأمان السيبراني' : 'Cybersecurity Fundamentals'}</p>
                        <p className="text-sm text-muted-foreground">{isArabic ? 'نوفمبر 2023' : 'November 2023'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <Shield className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-medium">{isArabic ? '5 سنوات خدمة مميزة' : '5 Years of Excellence'}</p>
                        <p className="text-sm text-muted-foreground">{isArabic ? 'يناير 2024' : 'January 2024'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};