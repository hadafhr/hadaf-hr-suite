import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const HRSystemManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  // Mock data for employees
  const employees = [
    {
      id: 1,
      name: 'أحمد محمد السالم',
      position: 'مطور تطبيقات أول',
      department: 'تقنية المعلومات',
      email: 'ahmed.salem@company.com',
      phone: '+966501234567',
      salary: 12000,
      joinDate: '2022-03-15',
      status: 'نشط',
      performance: 95,
      avatar: ''
    },
    {
      id: 2,
      name: 'فاطمة علي الزهراني',
      position: 'مديرة الموارد البشرية',
      department: 'الموارد البشرية',
      email: 'fatima.alzahrani@company.com',
      phone: '+966502345678',
      salary: 15000,
      joinDate: '2021-01-10',
      status: 'نشط',
      performance: 98,
      avatar: ''
    },
    {
      id: 3,
      name: 'خالد أحمد المالكي',
      position: 'محاسب أول',
      department: 'المالية',
      email: 'khalid.malki@company.com',
      phone: '+966503456789',
      salary: 9000,
      joinDate: '2023-06-20',
      status: 'إجازة',
      performance: 87,
      avatar: ''
    }
  ];

  // Mock data for HR statistics
  const hrStats = [
    { label: isArabic ? 'إجمالي الموظفين' : 'Total Employees', value: '156', icon: Users, color: 'text-blue-500', change: '+12' },
    { label: isArabic ? 'الطلبات المعلقة' : 'Pending Requests', value: '23', icon: Clock, color: 'text-orange-500', change: '+5' },
    { label: isArabic ? 'معدل الحضور' : 'Attendance Rate', value: '94%', icon: CheckCircle, color: 'text-green-500', change: '+2%' },
    { label: isArabic ? 'ساعات العمل الإضافي' : 'Overtime Hours', value: '284', icon: TrendingUp, color: 'text-purple-500', change: '-15' }
  ];

  // Mock data for recent requests
  const recentRequests = [
    { id: 1, employee: 'سارة أحمد', type: 'إجازة سنوية', date: '2024-01-15', status: 'معلق', priority: 'متوسط' },
    { id: 2, employee: 'محمد سالم', type: 'إجازة مرضية', date: '2024-01-14', status: 'موافق', priority: 'عالي' },
    { id: 3, employee: 'نورا خالد', type: 'تعديل بيانات', date: '2024-01-13', status: 'مرفوض', priority: 'منخفض' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'نشط': { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      'إجازة': { variant: 'secondary' as const, color: 'bg-orange-100 text-orange-800' },
      'معلق': { variant: 'outline' as const, color: 'bg-yellow-100 text-yellow-800' },
      'موافق': { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      'مرفوض': { variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['نشط'];
    return <Badge className={config.color}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isArabic ? 'نظام إدارة الموارد البشرية' : 'HR Management System'}
          </h2>
          <p className="text-muted-foreground">
            {isArabic ? 'إدارة شاملة للموظفين والموارد البشرية' : 'Comprehensive employee and HR management'}
          </p>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            {isArabic ? 'إضافة موظف' : 'Add Employee'}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {isArabic ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* HR Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hrStats.map((stat, index) => (
          <Card key={index} className="p-6 backdrop-blur-sm bg-background/80 border border-border/50 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500 font-medium">{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main HR Management Tabs */}
      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="employees">{isArabic ? 'الموظفين' : 'Employees'}</TabsTrigger>
          <TabsTrigger value="requests">{isArabic ? 'الطلبات' : 'Requests'}</TabsTrigger>
          <TabsTrigger value="attendance">{isArabic ? 'الحضور' : 'Attendance'}</TabsTrigger>
          <TabsTrigger value="payroll">{isArabic ? 'الرواتب' : 'Payroll'}</TabsTrigger>
        </TabsList>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">{isArabic ? 'قائمة الموظفين' : 'Employee List'}</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isArabic ? 'البحث عن موظف...' : 'Search employees...'}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {isArabic ? 'تصفية' : 'Filter'}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{employee.name}</h4>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                      <div className="flex items-center space-x-4 space-x-reverse mt-1">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {employee.email}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {employee.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="text-right">
                      <p className="text-sm font-medium">{employee.department}</p>
                      <p className="text-xs text-muted-foreground">{isArabic ? 'انضم في' : 'Joined'} {employee.joinDate}</p>
                    </div>
                    {getStatusBadge(employee.status)}
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{employee.performance}%</span>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          {isArabic ? 'عرض التفاصيل' : 'View Details'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          {isArabic ? 'تعديل' : 'Edit'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          {isArabic ? 'حذف' : 'Delete'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isArabic ? 'الطلبات الأخيرة' : 'Recent Requests'}</h3>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{request.employee}</h4>
                      <p className="text-sm text-muted-foreground">{request.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-sm text-muted-foreground">{request.date}</span>
                    {getStatusBadge(request.status)}
                    <Badge variant="outline" className={
                      request.priority === 'عالي' ? 'border-red-200 text-red-800' :
                      request.priority === 'متوسط' ? 'border-yellow-200 text-yellow-800' :
                      'border-gray-200 text-gray-800'
                    }>
                      {request.priority}
                    </Badge>
                    <div className="flex space-x-1 space-x-reverse">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isArabic ? 'إدارة الحضور والانصراف' : 'Attendance Management'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-border rounded-lg">
                <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-lg font-semibold">142</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'حاضر اليوم' : 'Present Today'}</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-lg font-semibold">8</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'متأخر' : 'Late Arrivals'}</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-lg font-semibold">6</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'غائب' : 'Absent'}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isArabic ? 'إدارة الرواتب' : 'Payroll Management'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-border rounded-lg">
                <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-lg font-semibold">₺1.2M</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'إجمالي الرواتب' : 'Total Payroll'}</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-lg font-semibold">156</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'الموظفين المؤهلين' : 'Eligible Employees'}</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-lg font-semibold">145</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'تم الدفع' : 'Paid'}</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-lg font-semibold">11</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'معلق' : 'Pending'}</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};