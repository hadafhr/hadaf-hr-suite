import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UnifiedHeader } from '@/components/shared/UnifiedHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { NotificationBell } from '@/components/shared/NotificationSystem';
import { useAnalytics, useTrackEvent } from '@/components/shared/AnalyticsProvider';
import {
  Users,
  UserX,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  Calendar,
  Building2,
  TrendingUp,
  Activity,
  Bell,
  Settings,
  Plus,
  Download,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';

// Mock Data Interfaces
interface CompanyStats {
  totalEmployees: number;
  activeEmployees: number;
  todayAbsent: number;
  todayLate: number;
  pendingApprovals: number;
  complianceAlerts: number;
}

interface PendingApproval {
  id: string;
  type: 'leave' | 'expense' | 'promotion' | 'contract';
  employee: string;
  amount?: number;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface ComplianceItem {
  id: string;
  type: 'wps' | 'gosi' | 'qiwa' | 'mudad';
  status: 'due' | 'overdue' | 'completed';
  dueDate: string;
  description: string;
}

export const NewCompanyDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { track } = useAnalytics();
  const trackEvent = useTrackEvent();
  
  const isArabic = i18n.language === 'ar';

  // Mock Data
  const companyStats: CompanyStats = {
    totalEmployees: 245,
    activeEmployees: 238,
    todayAbsent: 12,
    todayLate: 8,
    pendingApprovals: 15,
    complianceAlerts: 3
  };

  const pendingApprovals: PendingApproval[] = [
    {
      id: '1',
      type: 'leave',
      employee: 'أحمد محمد علي',
      date: '2024-01-15',
      priority: 'high'
    },
    {
      id: '2',
      type: 'expense',
      employee: 'فاطمة السالم',
      amount: 2500,
      date: '2024-01-14',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'promotion',
      employee: 'خالد العتيبي',
      date: '2024-01-13',
      priority: 'high'
    }
  ];

  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      type: 'wps',
      status: 'due',
      dueDate: '2024-01-20',
      description: 'رفع ملف حماية الأجور'
    },
    {
      id: '2',
      type: 'gosi',
      status: 'overdue',
      dueDate: '2024-01-10',
      description: 'تحديث بيانات التأمينات'
    },
    {
      id: '3',
      type: 'qiwa',
      status: 'completed',
      dueDate: '2024-01-05',
      description: 'تقرير التوطين الشهري'
    }
  ];

  const handleQuickAction = (action: string) => {
    trackEvent.trackEmployeeRequestCreated(action);
    // Handle navigation based on action
    switch (action) {
      case 'add_employee':
        navigate('/add-employee');
        break;
      case 'approve_requests':
        navigate('/approvals');
        break;
      case 'run_payroll':
        navigate('/payroll');
        break;
      case 'upload_wps':
        navigate('/wps-upload');
        break;
      case 'create_meeting':
        navigate('/meetings/create');
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      due: 'default',
      overdue: 'destructive',
      completed: 'secondary'
    } as const;
    
    const labels = {
      due: isArabic ? 'مستحق' : 'Due',
      overdue: isArabic ? 'متأخر' : 'Overdue',
      completed: isArabic ? 'مكتمل' : 'Completed'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'destructive',
      medium: 'default',
      low: 'secondary'
    } as const;
    
    const labels = {
      high: isArabic ? 'عالية' : 'High',
      medium: isArabic ? 'متوسطة' : 'Medium',
      low: isArabic ? 'منخفضة' : 'Low'
    };
    
    return (
      <Badge variant={variants[priority as keyof typeof variants]} className="text-xs">
        {labels[priority as keyof typeof labels]}
      </Badge>
    );
  };

  const breadcrumbItems = [
    { label: isArabic ? 'لوحة التحكم' : 'Dashboard', href: '/company-dashboard' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader showAuthActions={true} userRole="company" />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {isArabic ? 'لوحة تحكم المنشأة' : 'Company Dashboard'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isArabic ? 'إدارة شاملة لموارد المنشأة البشرية' : 'Comprehensive HR management for your organization'}
            </p>
          </div>
          <NotificationBell count={companyStats.complianceAlerts} />
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'إجمالي الموظفين' : 'Total Employees'}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companyStats.totalEmployees}</div>
              <p className="text-xs text-muted-foreground">
                {companyStats.activeEmployees} {isArabic ? 'نشط' : 'active'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'الغياب اليوم' : 'Today\'s Absences'}
              </CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{companyStats.todayAbsent}</div>
              <p className="text-xs text-muted-foreground">
                {((companyStats.todayAbsent / companyStats.totalEmployees) * 100).toFixed(1)}% {isArabic ? 'من الإجمالي' : 'of total'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'التأخير اليوم' : 'Today\'s Late'}
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{companyStats.todayLate}</div>
              <p className="text-xs text-muted-foreground">
                {((companyStats.todayLate / companyStats.totalEmployees) * 100).toFixed(1)}% {isArabic ? 'من الإجمالي' : 'of total'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'طلبات الاعتماد' : 'Pending Approvals'}
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{companyStats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'تتطلب المراجعة' : 'require review'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              {isArabic ? 'الإجراءات السريعة' : 'Quick Actions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Button 
                onClick={() => handleQuickAction('add_employee')}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Plus className="h-6 w-6" />
                <span className="text-xs text-center">
                  {isArabic ? 'إضافة موظف' : 'Add Employee'}
                </span>
              </Button>

              <Button 
                onClick={() => handleQuickAction('approve_requests')}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
              >
                <CheckCircle className="h-6 w-6" />
                <span className="text-xs text-center">
                  {isArabic ? 'اعتماد طلب' : 'Approve Request'}
                </span>
              </Button>

              <Button 
                onClick={() => handleQuickAction('run_payroll')}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
              >
                <DollarSign className="h-6 w-6" />
                <span className="text-xs text-center">
                  {isArabic ? 'تشغيل الرواتب' : 'Run Payroll'}
                </span>
              </Button>

              <Button 
                onClick={() => handleQuickAction('upload_wps')}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
              >
                <FileText className="h-6 w-6" />
                <span className="text-xs text-center">
                  {isArabic ? 'رفع ملف WPS' : 'Upload WPS'}
                </span>
              </Button>

              <Button 
                onClick={() => handleQuickAction('create_meeting')}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Calendar className="h-6 w-6" />
                <span className="text-xs text-center">
                  {isArabic ? 'إنشاء اجتماع' : 'Create Meeting'}
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              {isArabic ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="approvals">
              {isArabic ? 'الاعتمادات' : 'Approvals'}
            </TabsTrigger>
            <TabsTrigger value="compliance">
              {isArabic ? 'الامتثال' : 'Compliance'}
            </TabsTrigger>
            <TabsTrigger value="integrations">
              {isArabic ? 'التكاملات' : 'Integrations'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Analytics Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {isArabic ? 'تحليلات الأداء' : 'Performance Analytics'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      {isArabic ? 'مخطط تحليلات الأداء' : 'Performance Analytics Chart'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {isArabic ? 'توزيع الأقسام' : 'Department Distribution'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? 'تقنية المعلومات' : 'IT Department'}</span>
                      <span>45</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? 'المالية' : 'Finance'}</span>
                      <span>32</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? 'الموارد البشرية' : 'Human Resources'}</span>
                      <span>28</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? 'المبيعات' : 'Sales'}</span>
                      <span>55</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {isArabic ? 'مركز الاعتمادات' : 'Approval Center'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{approval.employee}</p>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? 'طلب' : 'Request'} {approval.type} - {approval.date}
                          </p>
                          {approval.amount && (
                            <p className="text-sm text-green-600">
                              {approval.amount} {isArabic ? 'ريال' : 'SAR'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(approval.priority)}
                        <Button size="sm" variant="outline">
                          {isArabic ? 'مراجعة' : 'Review'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {isArabic ? 'حالة الامتثال' : 'Compliance Status'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{item.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? 'تاريخ الاستحقاق:' : 'Due Date:'} {item.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.status)}
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

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {isArabic ? 'حالة التكاملات' : 'Integration Status'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{isArabic ? 'قِوى' : 'Qiwa'}</p>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? 'آخر مزامنة: قبل ساعتين' : 'Last sync: 2 hours ago'}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {isArabic ? 'متصل' : 'Connected'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">WPS</p>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? 'آخر مزامنة: يوم واحد' : 'Last sync: 1 day ago'}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {isArabic ? 'متصل' : 'Connected'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">GOSI</p>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? 'خطأ في الاتصال' : 'Connection error'}
                      </p>
                    </div>
                    <Badge variant="destructive">
                      {isArabic ? 'غير متصل' : 'Disconnected'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{isArabic ? 'مدد' : 'Mudad'}</p>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? 'آخر مزامنة: 3 ساعات' : 'Last sync: 3 hours ago'}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {isArabic ? 'متصل' : 'Connected'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};