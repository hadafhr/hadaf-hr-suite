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
    { id: 'salary_certificate', name: 'شهادة راتب', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'experience_letter', name: 'خطاب خبرة', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'bank_letter', name: 'خطاب للبنك', icon: <Building2 className="h-4 w-4" /> },
    { id: 'financial_advance', name: 'سلفة مالية', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'transfer_request', name: 'طلب نقل', icon: <User className="h-4 w-4" /> },
    { id: 'training_certificate', name: 'شهادة تدريب', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'vacation_request', name: 'طلب إجازة', icon: <Calendar className="h-4 w-4" /> },
    { id: 'other', name: 'طلب آخر', icon: <FileText className="h-4 w-4" /> }
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
      pending: { color: 'bg-warning/20 text-warning border-warning/50', label: 'معلق' },
      approved: { color: 'bg-success/20 text-success border-success/50', label: 'معتمد' },
      rejected: { color: 'bg-destructive/20 text-destructive border-destructive/50', label: 'مرفوض' },
      submitted: { color: 'bg-primary/20 text-primary border-primary/50', label: 'مرسل' },
      under_review: { color: 'bg-accent/20 text-accent-foreground border-accent', label: 'قيد المراجعة' },
      completed: { color: 'bg-success/20 text-success border-success/50', label: 'مكتمل' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      urgent: { color: 'bg-destructive/20 text-destructive border-destructive/50', label: 'عاجل' },
      high: { color: 'bg-warning/20 text-warning border-warning/50', label: 'هام' },
      medium: { color: 'bg-primary/20 text-primary border-primary/50', label: 'متوسط' },
      low: { color: 'bg-muted text-muted-foreground border-border', label: 'منخفض' }
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
    <div className="min-h-screen p-6 bg-background text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/src/assets/boud-logo-centered.png" 
            alt="Boud Logo" 
            className="h-32 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">نظام الطلبات والإشعارات</h1>
          <p className="text-muted-foreground">إدارة شاملة للطلبات والإشعارات</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">{requests.filter(r => r.status === 'approved').length}</div>
              <div className="text-sm text-muted-foreground">طلبات معتمدة</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">{requests.filter(r => r.status === 'pending').length}</div>
              <div className="text-sm text-muted-foreground">طلبات معلقة</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{notifications.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الإشعارات</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border hover:bg-accent/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-destructive mb-2">{unreadCount}</div>
              <div className="text-sm text-muted-foreground">إشعارات غير مقروءة</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="bg-card border-border rounded-2xl overflow-hidden">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
            <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted border-border rounded-xl">
              <TabsTrigger value="requests" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 rounded-lg">
                <FileText className="h-4 w-4 ml-2" />
                إدارة الطلبات ({requests.length})
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 rounded-lg">
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
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
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
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform bg-primary text-primary-foreground"
                      >
                        {type.icon}
                      </div>
                      <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
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
                          <Card key={request.id} className="bg-card border-border hover:bg-accent/50 transition-all">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div 
                                  className="w-12 h-12 rounded-full flex items-center justify-center bg-primary text-primary-foreground flex-shrink-0"
                                >
                                  {typeConfig.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="font-medium text-foreground">{request.title}</h4>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      {getStatusBadge(request.status)}
                                      {getPriorityBadge(request.priority)}
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{request.employee_name} - {request.department}</span>
                                    <span>{request.created_at.toLocaleDateString('ar-SA')}</span>
                                  </div>
                                  {request.amount && (
                                    <div className="mt-2 text-sm font-medium text-primary">
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
              <CardContent className="p-6 bg-card border-border rounded-3xl">
                {/* Notification Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Bell className="h-6 w-6 text-primary" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">مركز الإشعارات</h3>
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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8 p-4 bg-card border-border rounded-3xl">
                  {[
                    { icon: Users, label: 'فريق العمل', section: 'employees' },
                    { icon: Clock, label: 'الحضور', section: 'attendance' },
                    { icon: Calendar, label: 'الإجازات', section: 'leaves' },
                    { icon: DollarSign, label: 'الرواتب', section: 'payroll' },
                    { icon: Target, label: 'الأداء', section: 'performance' },
                    { icon: GraduationCap, label: 'التدريب', section: 'training' },
                    { icon: AlertTriangle, label: 'التأديب', section: 'disciplinary' },
                    { icon: Building, label: 'الإدارات', section: 'departments' }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="text-center group cursor-pointer"
                      onClick={() => onNavigateToSection?.(item.section)}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:scale-110 transition-transform bg-primary text-primary-foreground"
                      >
                        <item.icon className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
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
                          className={`cursor-pointer transition-all hover:bg-accent/50 bg-card border-border ${
                            notification.read ? 'opacity-70' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex items-center gap-2 mt-1">
                                {notification.priority === 'urgent' ? 
                                  <AlertTriangle className="h-4 w-4 text-destructive" /> :
                                  notification.type === 'success' ? <CheckCircle className="h-4 w-4 text-success" /> :
                                  notification.type === 'warning' ? <AlertTriangle className="h-4 w-4 text-warning" /> :
                                  notification.type === 'error' ? <XCircle className="h-4 w-4 text-destructive" /> :
                                  <Info className="h-4 w-4 text-primary" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    {getPriorityBadge(notification.priority)}
                                    <span className="text-xs text-muted-foreground">
                                      {Math.floor((new Date().getTime() - notification.timestamp.getTime()) / (1000 * 60))} دقيقة
                                    </span>
                                  </div>
                                </div>
                                <p className={`text-sm mt-1 ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
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
  );
};