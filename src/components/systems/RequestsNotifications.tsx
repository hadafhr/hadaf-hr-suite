import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Bell, MessageSquare, Search, Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface RequestsNotificationsProps {
  onBack: () => void;
}

interface Request {
  id: string;
  employeeName: string;
  employeeId: string;
  type: 'leave' | 'overtime' | 'expense' | 'training' | 'equipment' | 'other';
  title: string;
  description: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  priority: 'high' | 'medium' | 'low';
  department: string;
  approver?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  recipient: 'all' | 'managers' | 'hr' | 'specific';
  createdDate: string;
  isRead: boolean;
  sender: string;
}

export const RequestsNotifications: React.FC<RequestsNotificationsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const requests: Request[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      type: 'leave',
      title: 'طلب إجازة سنوية',
      description: 'طلب إجازة سنوية لمدة 5 أيام للسفر مع العائلة',
      submittedDate: '2024-02-10',
      status: 'pending',
      priority: 'medium',
      department: 'الموارد البشرية'
    },
    {
      id: '2',
      employeeName: 'فاطمة عبد الرحمن',
      employeeId: 'EMP002',
      type: 'training',
      title: 'طلب التحاق بدورة تدريبية',
      description: 'طلب الالتحاق بدورة إدارة المشاريع المتقدمة',
      submittedDate: '2024-02-08',
      status: 'approved',
      priority: 'high',
      department: 'المحاسبة',
      approver: 'سارة أحمد'
    },
    {
      id: '3',
      employeeName: 'عبد الله سعد',
      employeeId: 'EMP003',
      type: 'equipment',
      title: 'طلب معدات جديدة',
      description: 'طلب جهاز كمبيوتر محمول جديد لاستبدال الجهاز الحالي',
      submittedDate: '2024-02-05',
      status: 'under_review',
      priority: 'medium',
      department: 'تقنية المعلومات'
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'تذكير: اجتماع الفريق',
      message: 'اجتماع فريق الموارد البشرية اليوم الساعة 2:00 ظهراً في القاعة الرئيسية',
      type: 'info',
      recipient: 'hr',
      createdDate: '2024-02-10 09:00',
      isRead: false,
      sender: 'نظام الإشعارات'
    },
    {
      id: '2',
      title: 'تم اعتماد طلب الإجازة',
      message: 'تم اعتماد طلب الإجازة المقدم من أحمد محمد علي',
      type: 'success',
      recipient: 'specific',
      createdDate: '2024-02-09 14:30',
      isRead: true,
      sender: 'سارة أحمد'
    },
    {
      id: '3',
      title: 'تنبيه: انتهاء صلاحية التأمين',
      message: 'ينتهي التأمين الصحي لـ 5 موظفين خلال الشهر القادم',
      type: 'warning',
      recipient: 'hr',
      createdDate: '2024-02-08 10:15',
      isRead: false,
      sender: 'نظام التأمين'
    }
  ];

  const getRequestTypeBadge = (type: string) => {
    const typeConfig = {
      leave: { text: isRTL ? 'إجازة' : 'Leave', className: 'bg-blue-100 text-blue-800' },
      overtime: { text: isRTL ? 'عمل إضافي' : 'Overtime', className: 'bg-purple-100 text-purple-800' },
      expense: { text: isRTL ? 'مصروفات' : 'Expense', className: 'bg-green-100 text-green-800' },
      training: { text: isRTL ? 'تدريب' : 'Training', className: 'bg-orange-100 text-orange-800' },
      equipment: { text: isRTL ? 'معدات' : 'Equipment', className: 'bg-pink-100 text-pink-800' },
      other: { text: isRTL ? 'أخرى' : 'Other', className: 'bg-gray-100 text-gray-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: isRTL ? 'في الانتظار' : 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      approved: { text: isRTL ? 'معتمد' : 'Approved', className: 'bg-green-100 text-green-800' },
      rejected: { text: isRTL ? 'مرفوض' : 'Rejected', className: 'bg-red-100 text-red-800' },
      under_review: { text: isRTL ? 'تحت المراجعة' : 'Under Review', className: 'bg-blue-100 text-blue-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { text: isRTL ? 'عالي' : 'High', className: 'bg-red-100 text-red-800' },
      medium: { text: isRTL ? 'متوسط' : 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      low: { text: isRTL ? 'منخفض' : 'Low', className: 'bg-green-100 text-green-800' }
    };
    return priorityConfig[priority as keyof typeof priorityConfig];
  };

  const getNotificationTypeBadge = (type: string) => {
    const typeConfig = {
      info: { text: isRTL ? 'معلومات' : 'Info', className: 'bg-blue-100 text-blue-800', icon: Bell },
      warning: { text: isRTL ? 'تحذير' : 'Warning', className: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      success: { text: isRTL ? 'نجح' : 'Success', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      error: { text: isRTL ? 'خطأ' : 'Error', className: 'bg-red-100 text-red-800', icon: AlertCircle }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || request.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'الطلبات والإشعارات' : 'Requests & Notifications'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'إدارة طلبات الموظفين والإشعارات العامة' : 'Manage employee requests and general notifications'}
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {isRTL ? 'طلب جديد' : 'New Request'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'طلبات معلقة' : 'Pending Requests'}
                  </p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'طلبات معتمدة' : 'Approved Requests'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">42</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إشعارات جديدة' : 'New Notifications'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'رسائل غير مقروءة' : 'Unread Messages'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">23</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">{isRTL ? 'الطلبات' : 'Requests'}</TabsTrigger>
            <TabsTrigger value="notifications">{isRTL ? 'الإشعارات' : 'Notifications'}</TabsTrigger>
            <TabsTrigger value="settings">{isRTL ? 'الإعدادات' : 'Settings'}</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في الطلبات...' : 'Search requests...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Requests List */}
            <div className="space-y-6">
              {filteredRequests.map((request) => {
                const typeBadge = getRequestTypeBadge(request.type);
                const statusBadge = getStatusBadge(request.status);
                const priorityBadge = getPriorityBadge(request.priority);
                
                return (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{request.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{request.employeeName} - {request.employeeId}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={typeBadge.className}>
                            {typeBadge.text}
                          </Badge>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <Badge className={priorityBadge.className}>
                            {priorityBadge.text}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">
                              {isRTL ? 'الوصف' : 'Description'}
                            </h4>
                            <p className="text-sm">{request.description}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ التقديم:' : 'Submitted Date:'}</span>
                            <span className="text-sm font-medium">{request.submittedDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'القسم:' : 'Department:'}</span>
                            <span className="text-sm">{request.department}</span>
                          </div>
                          {request.approver && (
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">{isRTL ? 'المعتمد من:' : 'Approved By:'}</span>
                              <span className="text-sm">{request.approver}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                              {isRTL ? 'اعتماد' : 'Approve'}
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              {isRTL ? 'رفض' : 'Reject'}
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-4">
              {notifications.map((notification) => {
                const typeBadge = getNotificationTypeBadge(notification.type);
                const Icon = typeBadge.icon;
                
                return (
                  <Card key={notification.id} className={`hover:shadow-lg transition-shadow ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Icon className={`h-5 w-5 mt-1 ${notification.type === 'info' ? 'text-blue-600' : notification.type === 'warning' ? 'text-yellow-600' : notification.type === 'success' ? 'text-green-600' : 'text-red-600'}`} />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{isRTL ? 'من:' : 'From:'} {notification.sender}</span>
                              <span>{notification.createdDate}</span>
                              {!notification.isRead && (
                                <Badge variant="secondary" className="text-xs">
                                  {isRTL ? 'جديد' : 'New'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge className={typeBadge.className}>
                          {typeBadge.text}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'إعدادات الإشعارات' : 'Notification Settings'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'إدارة إعدادات الإشعارات والتنبيهات' : 'Manage notification and alert settings'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};