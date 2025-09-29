import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  ArrowLeft, Megaphone, Bell, MessageSquare, Send, Settings, Eye, Save, Download, Share, Mail, 
  CheckCircle, Clock, AlertTriangle, AlertCircle, Plus, Search, FileText, DollarSign, Target, 
  GraduationCap, Shield, Users, Calendar, Info, XCircle, Trash2, User, CreditCard, Building2,
  FileCheck, Briefcase, PenTool, Filter, Building, UserPlus, CalendarClock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface CombinedRequestsNotificationsProps {
  onBack: () => void;
  onNavigateToSection?: (section: string) => void;
}

interface Request {
  id: string;
  type: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'submitted' | 'under_review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  employee_id: string;
  employee_name: string;
  department: string;
  created_at: Date;
  updated_at: Date;
  documents?: string[];
  amount?: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  relatedData?: any;
}

export const CombinedRequestsNotifications: React.FC<CombinedRequestsNotificationsProps> = ({ 
  onBack, 
  onNavigateToSection 
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // States
  const [activeSubTab, setActiveSubTab] = useState('requests');
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  
  // Request Form State
  const [requestForm, setRequestForm] = useState({
    type: '',
    title: '',
    description: '',
    priority: 'medium' as const,
    amount: ''
  });

  // Mock Data for Requests
  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      type: 'salary_certificate',
      title: 'طلب شهادة راتب',
      description: 'أحتاج شهادة راتب لإجراءات البنك',
      status: 'pending',
      priority: 'medium',
      employee_id: 'EMP001',
      employee_name: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      type: 'experience_letter',
      title: 'طلب خطاب خبرة',
      description: 'خطاب خبرة للتقديم لوظيفة أخرى',
      status: 'approved',
      priority: 'high',
      employee_id: 'EMP002',
      employee_name: 'فاطمة سالم الخالدي',
      department: 'الموارد البشرية',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'financial_advance',
      title: 'طلب سلفة مالية',
      description: 'سلفة مالية لظروف خاصة',
      status: 'under_review',
      priority: 'urgent',
      employee_id: 'EMP003',
      employee_name: 'محمد عبدالله السعدي',
      department: 'المحاسبة',
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
      updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
      amount: 5000
    }
  ]);

  // Mock Data for Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'موظف جديد ينتظر الموافقة',
      message: 'أحمد محمد السالم - قسم التسويق. يحتاج إلى مراجعة وموافقة الملف الشخصي.',
      type: 'info',
      category: 'employees',
      priority: 'medium',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: false,
      actionUrl: 'employees'
    },
    {
      id: '2',
      title: 'انتهاء عقد قريب',
      message: 'عقد سارة أحمد علي (قسم الموارد البشرية) ينتهي خلال 15 يوم. يرجى المتابعة.',
      type: 'warning',
      category: 'contracts',
      priority: 'high',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      actionUrl: 'employees'
    },
    {
      id: '3',
      title: 'طلب إجازة جديد',
      message: 'فاطمة أحمد قدمت طلب إجازة اعتيادية لمدة 5 أيام ابتداءً من الأسبوع القادم.',
      type: 'info',
      category: 'leaves',
      priority: 'medium',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionUrl: 'leaves'
    }
  ]);

  // Request Types
  const requestTypes = [
    { id: 'salary_certificate', name: 'شهادة راتب', icon: <CreditCard className="h-4 w-4" />, color: '#009F87' },
    { id: 'experience_letter', name: 'خطاب خبرة', icon: <Briefcase className="h-4 w-4" />, color: '#1e40af' },
    { id: 'bank_letter', name: 'خطاب للبنك', icon: <Building2 className="h-4 w-4" />, color: '#059669' },
    { id: 'financial_advance', name: 'سلفة مالية', icon: <DollarSign className="h-4 w-4" />, color: '#dc2626' },
    { id: 'transfer_request', name: 'طلب نقل', icon: <User className="h-4 w-4" />, color: '#7c3aed' },
    { id: 'training_certificate', name: 'شهادة تدريب', icon: <GraduationCap className="h-4 w-4" />, color: '#ea580c' },
    { id: 'vacation_request', name: 'طلب إجازة', icon: <Calendar className="h-4 w-4" />, color: '#0891b2' },
    { id: 'other', name: 'طلب آخر', icon: <FileText className="h-4 w-4" />, color: '#6b7280' }
  ];

  // Analytics Data
  const requestsData = [
    { month: 'يناير', approved: 145, pending: 25, rejected: 8 },
    { month: 'فبراير', approved: 162, pending: 18, rejected: 5 },
    { month: 'مارس', approved: 138, pending: 32, rejected: 12 },
    { month: 'أبريل', approved: 175, pending: 15, rejected: 3 },
    { month: 'مايو', approved: 156, pending: 28, rejected: 7 },
    { month: 'يونيو', approved: 183, pending: 12, rejected: 4 }
  ];

  // Auto-refresh notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAddNew = Math.random() > 0.95;
      if (shouldAddNew) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: 'إشعار جديد',
          message: 'تم إنشاء إشعار تلقائي جديد.',
          type: 'info',
          category: 'system',
          priority: 'low',
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
        toast.info('وصل إشعار جديد');
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Functions
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employee_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredNotifications = notifications.filter(notification => {
    switch (notificationFilter) {
      case 'unread':
        return !notification.read;
      case 'urgent':
        return notification.priority === 'urgent';
      default:
        return true;
    }
  });

  const handleSubmitRequest = () => {
    if (!requestForm.type || !requestForm.title) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newRequest: Request = {
      id: Date.now().toString(),
      type: requestForm.type,
      title: requestForm.title,
      description: requestForm.description,
      status: 'submitted',
      priority: requestForm.priority,
      employee_id: 'EMP_CURRENT',
      employee_name: 'المستخدم الحالي',
      department: 'القسم الحالي',
      created_at: new Date(),
      updated_at: new Date(),
      amount: requestForm.amount ? parseFloat(requestForm.amount) : undefined
    };

    setRequests(prev => [newRequest, ...prev]);
    setRequestForm({ type: '', title: '', description: '', priority: 'medium', amount: '' });
    setShowNewRequestForm(false);
    toast.success('تم إرسال الطلب بنجاح');
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.actionUrl && onNavigateToSection) {
      onNavigateToSection(notification.actionUrl);
      toast.info(`تم التوجه إلى قسم ${notification.actionUrl}`);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'معلق' },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'معتمد' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'مرفوض' },
      submitted: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'مرسل' },
      under_review: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'قيد المراجعة' },
      completed: { color: 'bg-green-100 text-green-800 border-green-200', label: 'مكتمل' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      urgent: { color: 'bg-red-100 text-red-800 border-red-200', label: 'عاجل' },
      high: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'هام' },
      medium: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'متوسط' },
      low: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'منخفض' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getRequestTypeConfig = (type: string) => {
    return requestTypes.find(rt => rt.id === type) || requestTypes[requestTypes.length - 1];
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.read).length;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-arabic" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Floating Elements for Professional Look */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto p-6 backdrop-blur-xl bg-black/20 rounded-3xl border border-[#008C6A]/20 shadow-2xl shadow-[#008C6A]/10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-12 p-6 bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/10 rounded-3xl animate-fade-in">
          <div className="flex items-center gap-6">
            <Button variant="outline" size="sm" onClick={onBack} className="border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50 transition-all duration-300">
              <ArrowLeft className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="h-8 w-px bg-[#008C6A]/30"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#008C6A] to-[#00694F] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#008C6A]/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                <div className="relative z-10 group-hover:scale-110 transition-transform text-white">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#008C6A] rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  نظام الطلبات والإشعارات المتكامل
                </h1>
                <p className="text-gray-300 text-lg">
                  إدارة شاملة للطلبات والإشعارات مع التكامل الكامل مع جميع أنظمة الموارد البشرية
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-[#008C6A]/30 text-[#008C6A] bg-[#008C6A]/10 px-4 py-2 text-sm font-medium">
              <MessageSquare className="h-4 w-4 ml-2" />
              نظام متقدم
            </Badge>
            <Button 
              className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white shadow-2xl shadow-[#008C6A]/20 hover:scale-105 transition-all duration-300"
            >
              <Share className="h-4 w-4 ml-2" />
              استيراد
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white shadow-2xl shadow-[#008C6A]/20 hover:scale-105 transition-all duration-300"
            >
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white shadow-2xl shadow-[#008C6A]/20 hover:scale-105 transition-all duration-300"
            >
              <Megaphone className="h-4 w-4 ml-2" />
              تصدير PDF
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#008C6A] mb-2">{requests.filter(r => r.status === 'approved').length}</div>
              <div className="text-sm text-gray-300">طلبات معتمدة</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{requests.filter(r => r.status === 'pending').length}</div>
              <div className="text-sm text-gray-300">طلبات معلقة</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{notifications.length}</div>
              <div className="text-sm text-gray-300">إجمالي الإشعارات</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{unreadCount}</div>
              <div className="text-sm text-gray-300">إشعارات غير مقروءة</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/10 rounded-2xl overflow-hidden">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
            <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/10 rounded-xl">
              <TabsTrigger value="requests" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008C6A] data-[state=active]:via-[#009F87] data-[state=active]:to-[#00694F] data-[state=active]:text-white hover:bg-[#008C6A]/20 transition-all duration-300 rounded-lg">
                <FileText className="h-4 w-4 ml-2" />
                إدارة الطلبات ({requests.length})
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008C6A] data-[state=active]:via-[#009F87] data-[state=active]:to-[#00694F] data-[state=active]:text-white hover:bg-[#008C6A]/20 transition-all duration-300 rounded-lg">
                <Bell className="h-4 w-4 ml-2" />
                مركز الإشعارات ({unreadCount})
              </TabsTrigger>
            </TabsList>

            {/* Requests Tab */}
            <TabsContent value="requests">
              <CardContent className="p-6">
                {/* Requests Controls */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex-1 min-w-[200px]">
                    <Input
                      placeholder="البحث في الطلبات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="تصفية حسب الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الطلبات</SelectItem>
                      <SelectItem value="pending">معلقة</SelectItem>
                      <SelectItem value="approved">معتمدة</SelectItem>
                      <SelectItem value="rejected">مرفوضة</SelectItem>
                      <SelectItem value="under_review">قيد المراجعة</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={showNewRequestForm} onOpenChange={setShowNewRequestForm}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#009F87] hover:bg-[#008072]">
                        <Plus className="h-4 w-4 ml-2" />
                        طلب جديد
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg" dir="rtl">
                      <DialogHeader>
                        <DialogTitle>إرسال طلب جديد</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">نوع الطلب</label>
                          <Select value={requestForm.type} onValueChange={(value) => setRequestForm({...requestForm, type: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر نوع الطلب" />
                            </SelectTrigger>
                            <SelectContent>
                              {requestTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  <div className="flex items-center gap-2">
                                    {type.icon}
                                    {type.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">عنوان الطلب</label>
                          <Input 
                            value={requestForm.title}
                            onChange={(e) => setRequestForm({...requestForm, title: e.target.value})}
                            placeholder="أدخل عنوان الطلب"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">تفاصيل الطلب</label>
                          <Textarea 
                            value={requestForm.description}
                            onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                            placeholder="اشرح تفاصيل طلبك..."
                            rows={3}
                          />
                        </div>

                        {requestForm.type === 'financial_advance' && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">المبلغ المطلوب (ريال)</label>
                            <Input 
                              type="number"
                              value={requestForm.amount}
                              onChange={(e) => setRequestForm({...requestForm, amount: e.target.value})}
                              placeholder="أدخل المبلغ"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-sm font-medium">الأولوية</label>
                          <Select value={requestForm.priority} onValueChange={(value: any) => setRequestForm({...requestForm, priority: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">منخفضة</SelectItem>
                              <SelectItem value="medium">متوسطة</SelectItem>
                              <SelectItem value="high">عالية</SelectItem>
                              <SelectItem value="urgent">عاجلة</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setShowNewRequestForm(false)}>إلغاء</Button>
                          <Button onClick={handleSubmitRequest} disabled={!requestForm.type || !requestForm.title}>
                            إرسال الطلب
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Request Types Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
                  {requestTypes.map((type) => (
                    <div key={type.id} className="text-center group cursor-pointer" onClick={() => setRequestForm({...requestForm, type: type.id})}>
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform text-white"
                        style={{ backgroundColor: type.color }}
                      >
                        {type.icon}
                      </div>
                      <p className="text-xs font-medium text-gray-700 group-hover:text-[#009F87] transition-colors">
                        {type.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Requests List */}
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {filteredRequests.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>لا توجد طلبات</p>
                      </div>
                    ) : (
                      filteredRequests.map((request) => {
                        const typeConfig = getRequestTypeConfig(request.type);
                        return (
                          <Card key={request.id} className="border-r-4 hover:shadow-md transition-all" style={{ borderRightColor: typeConfig.color }}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div 
                                  className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                                  style={{ backgroundColor: typeConfig.color }}
                                >
                                  {typeConfig.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="font-medium text-gray-900">{request.title}</h4>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      {getStatusBadge(request.status)}
                                      {getPriorityBadge(request.priority)}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{request.employee_name} - {request.department}</span>
                                    <span>{request.created_at.toLocaleDateString('ar-SA')}</span>
                                  </div>
                                  {request.amount && (
                                    <div className="mt-2 text-sm font-medium" style={{ color: typeConfig.color }}>
                                      المبلغ: {request.amount.toLocaleString()} ريال
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <CardContent className="p-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 animate-fade-in transition-all duration-300">
                {/* Notification Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Bell className="h-6 w-6 text-[#009F87]" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#009F87]">مركز الإشعارات</h3>
                      <p className="text-sm text-muted-foreground">
                        {unreadCount} إشعار غير مقروء
                        {urgentCount > 0 && ` • ${urgentCount} عاجل`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={notificationFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNotificationFilter('all')}
                    >
                      الكل ({notifications.length})
                    </Button>
                    <Button
                      variant={notificationFilter === 'unread' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNotificationFilter('unread')}
                    >
                      غير مقروء ({unreadCount})
                    </Button>
                    <Button
                      variant={notificationFilter === 'urgent' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNotificationFilter('urgent')}
                    >
                      عاجل ({urgentCount})
                    </Button>
                  </div>
                </div>

                {/* Integration Icons */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8 p-4 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 animate-fade-in transition-all duration-300">
                  {[
                    { icon: Users, label: 'فريق العمل', section: 'employees', color: '#009F87' },
                    { icon: Clock, label: 'الحضور', section: 'attendance', color: '#1e40af' },
                    { icon: Calendar, label: 'الإجازات', section: 'leaves', color: '#059669' },
                    { icon: DollarSign, label: 'الرواتب', section: 'payroll', color: '#dc2626' },
                    { icon: Target, label: 'الأداء', section: 'performance', color: '#7c3aed' },
                    { icon: GraduationCap, label: 'التدريب', section: 'training', color: '#ea580c' },
                    { icon: AlertTriangle, label: 'التأديب', section: 'disciplinary', color: '#ef4444' },
                    { icon: Building, label: 'الإدارات', section: 'departments', color: '#0891b2' }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="text-center group cursor-pointer"
                      onClick={() => onNavigateToSection?.(item.section)}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:scale-110 transition-transform text-white"
                        style={{ backgroundColor: item.color }}
                      >
                        <item.icon className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-medium text-gray-700 group-hover:text-[#009F87] transition-colors">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Notifications List */}
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {filteredNotifications.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>لا توجد إشعارات</p>
                      </div>
                    ) : (
                      filteredNotifications.map((notification) => (
                        <Card 
                          key={notification.id}
                          className={`cursor-pointer transition-all hover:shadow-md border-r-4 ${
                            notification.read ? 'border-r-gray-200 bg-gray-50' : 
                            notification.priority === 'urgent' ? 'border-r-red-500 bg-red-50' :
                            notification.priority === 'high' ? 'border-r-orange-500 bg-orange-50' :
                            'border-r-blue-500 bg-blue-50'
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <CardContent className="p-4 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 animate-fade-in transition-all duration-300">
                            <div className="flex items-start gap-3">
                              <div className="flex items-center gap-2 mt-1">
                                {notification.priority === 'urgent' ? 
                                  <AlertTriangle className="h-4 w-4 text-red-600" /> :
                                  notification.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                                  notification.type === 'warning' ? <AlertTriangle className="h-4 w-4 text-orange-600" /> :
                                  notification.type === 'error' ? <XCircle className="h-4 w-4 text-red-600" /> :
                                  <Info className="h-4 w-4 text-blue-600" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    {getPriorityBadge(notification.priority)}
                                    <span className="text-xs text-muted-foreground">
                                      {Math.floor((new Date().getTime() - notification.timestamp.getTime()) / (1000 * 60))} دقيقة
                                    </span>
                                  </div>
                                </div>
                                <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-700' : 'text-gray-500'}`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center gap-2">
                                    {!notification.read && (
                                      <Badge variant="secondary" className="text-xs">
                                        جديد
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {notification.actionUrl && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onNavigateToSection?.(notification.actionUrl!);
                                        }}
                                        className="h-6 px-2 text-xs"
                                      >
                                        <Eye className="h-3 w-3 ml-1" />
                                        عرض
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
        </div>
      </div>
    </div>
  );
};