import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Megaphone, Bell, MessageSquare, Send, Settings, Eye, Save, Download, Share, Mail, CheckCircle, Clock, AlertTriangle, Plus, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface RequestsNotificationsProps {
  onBack: () => void;
}

export const RequestsNotifications: React.FC<RequestsNotificationsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // بيانات الطلبات والاشعارات
  const requestsData = [
    { month: 'يناير', approved: 145, pending: 25, rejected: 8 },
    { month: 'فبراير', approved: 162, pending: 18, rejected: 5 },
    { month: 'مارس', approved: 138, pending: 32, rejected: 12 },
    { month: 'أبريل', approved: 175, pending: 15, rejected: 3 },
    { month: 'مايو', approved: 156, pending: 28, rejected: 7 },
    { month: 'يونيو', approved: 183, pending: 12, rejected: 4 }
  ];

  const requestsMetrics = [
    { category: 'الطلبات المعتمدة', count: 1240, percentage: 89, color: '#009F87' },
    { category: 'الطلبات المعلقة', count: 95, percentage: 7, color: '#f59e0b' },
    { category: 'الطلبات المرفوضة', count: 58, percentage: 4, color: '#dc2626' },
    { category: 'الاشعارات المرسلة', count: 3250, percentage: 100, color: '#1e40af' }
  ];

  const notificationTypes = [
    { type: 'اشعارات الموظفين', value: 50, count: 1625 },
    { type: 'اشعارات إدارية', value: 30, count: 975 },
    { type: 'تنبيهات النظام', value: 20, count: 650 }
  ];

  const BOUD_COLORS = ['#009F87', '#1e40af', '#f59e0b'];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#009F87] via-[#008072] to-[#009F87] p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Share className="h-4 w-4 ml-2" />
                  {isRTL ? 'استيراد' : 'Import'}
                </Button>
                <Button className="bg-[#009F87]/80 border-[#009F87]/30 text-white hover:bg-[#009F87]/90 backdrop-blur-sm">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير Excel' : 'Export Excel'}
                </Button>
                <Button className="bg-red-600/80 border-red-600/30 text-white hover:bg-red-600/90 backdrop-blur-sm">
                  <Megaphone className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير PDF' : 'Export PDF'}
                </Button>
                <Button className="bg-blue-600 border-blue-600 text-white hover:bg-blue-600/90 shadow-lg">
                  <Save className="h-4 w-4 ml-2" />
                  {isRTL ? 'حفظ' : 'Save'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Megaphone className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام الطلبات والاشعارات الذكي' : 'Smart Requests & Notifications System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'نظام متطور لإدارة الطلبات والاشعارات والتواصل الداخلي' : 'Advanced system for requests management and internal communications'}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Analytics Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900 via-[#009F87] to-blue-900 text-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Requests Management */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-300">
                      {isRTL ? 'إدارة الطلبات' : 'Requests Management'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-[#009F87]/50 to-blue-600/50 rounded-xl p-4 flex items-center justify-center">
                      <CheckCircle className="h-32 w-32 text-green-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-[#009F87]/80 px-3 py-1 rounded-full text-sm">
                        1240 {isRTL ? 'طلب معتمد' : 'Approved'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        89% {isRTL ? 'معدل الاعتماد' : 'Approval Rate'}
                      </div>
                    </div>
                  </div>

                  {/* Notifications System */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-300">
                      {isRTL ? 'نظام الاشعارات' : 'Notifications System'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-blue-600/50 to-purple-600/50 rounded-xl p-4 flex items-center justify-center">
                      <Bell className="h-32 w-32 text-blue-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        3250 {isRTL ? 'اشعار مرسل' : 'Sent'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-purple-600/80 px-3 py-1 rounded-full text-sm">
                        100% {isRTL ? 'معدل التسليم' : 'Delivery Rate'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requests Trends Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={requestsData}>
                      <defs>
                        <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#009F87" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#009F87" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Area type="monotone" dataKey="approved" stroke="#009F87" fill="url(#colorApproved)" />
                      <Area type="monotone" dataKey="pending" stroke="#f59e0b" fill="url(#colorPending)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {isRTL ? 'مؤشرات الطلبات' : 'Request Metrics'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {requestsMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                      <div>
                        <p className="font-semibold text-gray-800">{metric.category}</p>
                        <p className="text-sm text-gray-600">{metric.count} {isRTL ? 'عنصر' : 'items'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: metric.color }}>{metric.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {isRTL ? 'أنواع الاشعارات' : 'Notification Types'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={notificationTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {notificationTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={BOUD_COLORS[index % BOUD_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Requests & Notifications System */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#009F87] text-white px-6 py-2 rounded-full shadow-lg">
              <Megaphone className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'نظام طلبات متطور' : 'Advanced Requests System'}</span>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'نظام الطلبات والاشعارات المتطور' : 'Advanced Requests & Notifications System'}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: Megaphone, label: isRTL ? 'إدارة الطلبات' : 'Request Management', color: 'bg-[#009F87]', count: 0 },
                  { icon: Bell, label: isRTL ? 'التنبيهات الفورية' : 'Real-time Alerts', color: 'bg-blue-600', count: 95 },
                  { icon: MessageSquare, label: isRTL ? 'الرسائل والتواصل' : 'Messages & Communication', color: 'bg-green-600', count: 32 },
                  { icon: Send, label: isRTL ? 'الإرسال الجماعي' : 'Bulk Sending', color: 'bg-purple-600', count: 0 },
                  { icon: Mail, label: isRTL ? 'البريد الإلكتروني' : 'Email System', color: 'bg-yellow-600', count: 18 },
                  { icon: Clock, label: isRTL ? 'الطلبات المعلقة' : 'Pending Requests', color: 'bg-orange-600', count: 95 },
                  { icon: CheckCircle, label: isRTL ? 'الموافقات الآلية' : 'Auto Approvals', color: 'bg-indigo-600', count: 0 },
                  { icon: Settings, label: isRTL ? 'الإعدادات المتقدمة' : 'Advanced Settings', color: 'bg-gray-600', count: 0 }
                ].map((item, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform relative`}>
                      <item.icon className="h-8 w-8 text-white" />
                      {item.count > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {item.count}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-[#009F87] transition-colors">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-[#009F87]/10 to-[#009F87]/20 rounded-xl border border-[#009F87]/20">
                  <div className="text-3xl font-bold text-[#009F87] mb-2">1,240</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'طلبات معتمدة' : 'Approved Requests'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-yellow-600/10 to-yellow-600/20 rounded-xl border border-yellow-600/20">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">95</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'طلبات معلقة' : 'Pending Requests'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-blue-600/20 rounded-xl border border-blue-600/20">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3,250</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'اشعارات مرسلة' : 'Notifications Sent'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-600/20 rounded-xl border border-green-600/20">
                  <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'معدل الاعتماد' : 'Approval Rate'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

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