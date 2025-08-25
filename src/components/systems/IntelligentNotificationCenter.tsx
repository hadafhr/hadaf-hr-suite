import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Bell,
  BellRing,
  MessageSquare,
  Mail,
  Smartphone,
  Globe,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  Clock,
  User,
  Users,
  Send,
  Trash2,
  Archive,
  Star,
  TrendingUp,
  Zap,
  Shield,
  Target,
  Calendar,
  FileText,
  DollarSign,
  Award,
  AlertCircle,
  Info,
  CheckSquare,
  UserPlus
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'announcement';
  category: 'hr' | 'payroll' | 'leave' | 'performance' | 'training' | 'system' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'unread' | 'read' | 'archived' | 'deleted';
  sender: string;
  senderRole: string;
  recipient: string;
  recipientType: 'individual' | 'department' | 'all' | 'group';
  recipients: string[];
  createdAt: string;
  readAt?: string;
  channel: 'in_app' | 'email' | 'sms' | 'push' | 'all';
  actionRequired: boolean;
  actionUrl?: string;
  relatedEntity?: {
    type: 'employee' | 'request' | 'task' | 'meeting' | 'document';
    id: string;
    name: string;
  };
  attachments: string[];
  isStarred: boolean;
  scheduledFor?: string;
  expiresAt?: string;
}

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'announcement';
  category: string;
  variables: string[];
  isActive: boolean;
  usageCount: number;
}

interface IntelligentNotificationCenterProps {
  onBack: () => void;
}

export const IntelligentNotificationCenter: React.FC<IntelligentNotificationCenterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'NOT001',
      title: 'طلب إجازة جديد يحتاج موافقة',
      message: 'قدم الموظف أحمد محمد طلب إجازة سنوية لمدة 5 أيام من تاريخ 2025-01-10 إلى 2025-01-14',
      type: 'warning',
      category: 'leave',
      priority: 'high',
      status: 'unread',
      sender: 'نظام إدارة الإجازات',
      senderRole: 'system',
      recipient: 'مدير الموارد البشرية',
      recipientType: 'individual',
      recipients: ['hr_manager@company.com'],
      createdAt: '2024-12-25 14:30',
      channel: 'in_app',
      actionRequired: true,
      actionUrl: '/leave-requests/approve/LR001',
      relatedEntity: {
        type: 'request',
        id: 'LR001',
        name: 'طلب إجازة أحمد محمد'
      },
      attachments: [],
      isStarred: false
    },
    {
      id: 'NOT002',
      title: 'تم اعتماد راتب شهر ديسمبر',
      message: 'تم اعتماد ومعالجة رواتب جميع الموظفين لشهر ديسمبر 2024. إجمالي المبلغ: 2,450,000 ريال',
      type: 'success',
      category: 'payroll',
      priority: 'medium',
      status: 'read',
      sender: 'قسم المحاسبة',
      senderRole: 'finance_manager',
      recipient: 'جميع الموظفين',
      recipientType: 'all',
      recipients: [],
      createdAt: '2024-12-25 09:00',
      readAt: '2024-12-25 09:15',
      channel: 'all',
      actionRequired: false,
      attachments: ['payroll_report_dec2024.pdf'],
      isStarred: true
    },
    {
      id: 'NOT003',
      title: 'تذكير: اجتماع تقييم الأداء غداً',
      message: 'لديك اجتماع تقييم أداء مع الموظفة سارة أحمد غداً الساعة 10:00 صباحاً في قاعة الاجتماعات الرئيسية',
      type: 'info',
      category: 'performance',
      priority: 'medium',
      status: 'unread',
      sender: 'نظام إدارة الأداء',
      senderRole: 'system',
      recipient: 'علي محمود',
      recipientType: 'individual',
      recipients: ['ali.mahmoud@company.com'],
      createdAt: '2024-12-25 16:00',
      channel: 'in_app',
      actionRequired: true,
      relatedEntity: {
        type: 'meeting',
        id: 'MTG003',
        name: 'تقييم أداء سارة أحمد'
      },
      attachments: ['performance_form.pdf'],
      isStarred: false,
      scheduledFor: '2024-12-26 08:00'
    },
    {
      id: 'NOT004',
      title: 'تحديث نظام إدارة الموظفين',
      message: 'سيتم تحديث نظام إدارة الموظفين يوم السبت القادم من الساعة 12 ظهراً حتى 6 مساءً. قد تكون الخدمة غير متاحة خلال هذه الفترة',
      type: 'announcement',
      category: 'system',
      priority: 'low',
      status: 'unread',
      sender: 'قسم تقنية المعلومات',
      senderRole: 'it_admin',
      recipient: 'جميع المستخدمين',
      recipientType: 'all',
      recipients: [],
      createdAt: '2024-12-25 11:45',
      channel: 'all',
      actionRequired: false,
      attachments: [],
      isStarred: false,
      expiresAt: '2024-12-28 18:00'
    },
    {
      id: 'NOT005',
      title: 'انتهاء فترة التجربة - إجراء مطلوب',
      message: 'ستنتهي فترة التجربة للموظف محمد خالد خلال 3 أيام. يرجى اتخاذ القرار النهائي بشأن التثبيت',
      type: 'warning',
      category: 'hr',
      priority: 'urgent',
      status: 'unread',
      sender: 'نظام الموارد البشرية',
      senderRole: 'system',
      recipient: 'مدير الموارد البشرية',
      recipientType: 'individual',
      recipients: ['hr_manager@company.com'],
      createdAt: '2024-12-25 08:30',
      channel: 'in_app',
      actionRequired: true,
      actionUrl: '/employees/probation/EMP002',
      relatedEntity: {
        type: 'employee',
        id: 'EMP002',
        name: 'محمد خالد'
      },
      attachments: ['probation_evaluation.pdf'],
      isStarred: true
    }
  ]);

  // Mock notification templates
  const [templates, setTemplates] = useState<NotificationTemplate[]>([
    {
      id: 'TEMP001',
      name: 'موافقة طلب الإجازة',
      title: 'تم اعتماد طلب الإجازة',
      content: 'تم اعتماد طلب الإجازة المقدم بتاريخ {{request_date}} للفترة من {{start_date}} إلى {{end_date}}',
      type: 'success',
      category: 'leave',
      variables: ['request_date', 'start_date', 'end_date', 'employee_name'],
      isActive: true,
      usageCount: 145
    },
    {
      id: 'TEMP002',
      name: 'رفض طلب الإجازة',
      title: 'تم رفض طلب الإجازة',
      content: 'تم رفض طلب الإجازة المقدم بتاريخ {{request_date}} لسبب: {{rejection_reason}}',
      type: 'error',
      category: 'leave',
      variables: ['request_date', 'rejection_reason', 'employee_name'],
      isActive: true,
      usageCount: 23
    },
    {
      id: 'TEMP003',
      name: 'تذكير اجتماع',
      title: 'تذكير: اجتماع {{meeting_title}}',
      content: 'لديك اجتماع بعنوان "{{meeting_title}}" في {{meeting_date}} الساعة {{meeting_time}}',
      type: 'info',
      category: 'general',
      variables: ['meeting_title', 'meeting_date', 'meeting_time'],
      isActive: true,
      usageCount: 89
    }
  ]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || notification.category === selectedCategory;
    const matchesTab = 
      activeTab === 'inbox' ? notification.status !== 'archived' && notification.status !== 'deleted' :
      activeTab === 'unread' ? notification.status === 'unread' :
      activeTab === 'starred' ? notification.isStarred :
      activeTab === 'archived' ? notification.status === 'archived' :
      true;
    
    return matchesSearch && matchesType && matchesCategory && matchesTab;
  });

  const getTypeIcon = (type: string) => {
    const icons = {
      info: Info,
      success: CheckCircle2,
      warning: AlertTriangle,
      error: XCircle,
      announcement: Bell
    };
    return icons[type as keyof typeof icons] || Info;
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      info: { label: 'معلومات', class: 'bg-blue-100 text-blue-800', icon: Info },
      success: { label: 'نجح', class: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      warning: { label: 'تحذير', class: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
      error: { label: 'خطأ', class: 'bg-red-100 text-red-800', icon: XCircle },
      announcement: { label: 'إعلان', class: 'bg-purple-100 text-purple-800', icon: Bell }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.class}>
        <IconComponent className="h-3 w-3 ml-1" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'منخفض', class: 'bg-gray-100 text-gray-800' },
      medium: { label: 'متوسط', class: 'bg-blue-100 text-blue-800' },
      high: { label: 'عالي', class: 'bg-orange-100 text-orange-800' },
      urgent: { label: 'عاجل', class: 'bg-red-100 text-red-800' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Badge className={config.class} variant="outline">
        {config.label}
      </Badge>
    );
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, status: 'read' as const, readAt: new Date().toISOString() }
        : notification
    ));
  };

  const handleMarkAsUnread = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, status: 'unread' as const, readAt: undefined }
        : notification
    ));
  };

  const handleStarToggle = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isStarred: !notification.isStarred }
        : notification
    ));
  };

  const handleArchive = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, status: 'archived' as const }
        : notification
    ));
    toast({
      title: "تم الأرشفة",
      description: "تم نقل الإشعار إلى الأرشيف"
    });
  };

  const handleDelete = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, status: 'deleted' as const }
        : notification
    ));
    toast({
      title: "تم الحذف",
      description: "تم حذف الإشعار"
    });
  };

  const calculateStats = () => {
    const total = notifications.filter(n => n.status !== 'deleted').length;
    const unread = notifications.filter(n => n.status === 'unread').length;
    const urgent = notifications.filter(n => n.priority === 'urgent' && n.status === 'unread').length;
    const actionRequired = notifications.filter(n => n.actionRequired && n.status === 'unread').length;
    
    return { total, unread, urgent, actionRequired };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 to-background">
      {/* Professional Header */}
      <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-[#009F87]/10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-[#009F87]/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#009F87]/10 rounded-lg">
                <Bell className="h-6 w-6 text-[#009F87]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#009F87]">مركز الإشعارات الذكي</h1>
                <p className="text-muted-foreground">إدارة وتتبع جميع الإشعارات والتنبيهات النظام</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 ml-2" />
              الإعدادات
            </Button>
            <Button size="sm" className="bg-[#009F87] hover:bg-[#008072]">
              <Plus className="h-4 w-4 ml-2" />
              إشعار جديد
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
          <Card className="border-[#009F87]/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#009F87]">
                {stats.total}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي الإشعارات</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.unread}
              </div>
              <div className="text-sm text-muted-foreground">غير مقروءة</div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {stats.urgent}
              </div>
              <div className="text-sm text-muted-foreground">عاجلة</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.actionRequired}
              </div>
              <div className="text-sm text-muted-foreground">تحتاج إجراء</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-white/90 backdrop-blur">
          <TabsTrigger value="inbox" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Mail className="h-4 w-4 ml-2" />
            صندوق الوارد
            {stats.unread > 0 && (
              <Badge className="bg-red-500 text-white text-xs mr-2">
                {stats.unread}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <BellRing className="h-4 w-4 ml-2" />
            غير مقروءة
          </TabsTrigger>
          <TabsTrigger value="starred" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Star className="h-4 w-4 ml-2" />
            مميزة
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <FileText className="h-4 w-4 ml-2" />
            القوالب
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 ml-2" />
            التحليلات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="البحث في الإشعارات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 ml-2" />
                    <SelectValue placeholder="النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="info">معلومات</SelectItem>
                    <SelectItem value="success">نجح</SelectItem>
                    <SelectItem value="warning">تحذير</SelectItem>
                    <SelectItem value="error">خطأ</SelectItem>
                    <SelectItem value="announcement">إعلان</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[160px]">
                    <Target className="h-4 w-4 ml-2" />
                    <SelectValue placeholder="الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="hr">الموارد البشرية</SelectItem>
                    <SelectItem value="payroll">الرواتب</SelectItem>
                    <SelectItem value="leave">الإجازات</SelectItem>
                    <SelectItem value="performance">الأداء</SelectItem>
                    <SelectItem value="training">التدريب</SelectItem>
                    <SelectItem value="system">النظام</SelectItem>
                    <SelectItem value="general">عام</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              return (
                <Card 
                  key={notification.id} 
                  className={`bg-white/90 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all cursor-pointer ${
                    notification.status === 'unread' ? 'border-l-4 border-l-[#009F87]' : ''
                  }`}
                  onClick={() => {
                    setSelectedNotification(notification);
                    setShowNotificationDialog(true);
                    if (notification.status === 'unread') {
                      handleMarkAsRead(notification.id);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'success' ? 'bg-green-100' :
                          notification.type === 'warning' ? 'bg-yellow-100' :
                          notification.type === 'error' ? 'bg-red-100' :
                          notification.type === 'announcement' ? 'bg-purple-100' :
                          'bg-blue-100'
                        }`}>
                          <TypeIcon className={`h-4 w-4 ${
                            notification.type === 'success' ? 'text-green-600' :
                            notification.type === 'warning' ? 'text-yellow-600' :
                            notification.type === 'error' ? 'text-red-600' :
                            notification.type === 'announcement' ? 'text-purple-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${
                              notification.status === 'unread' ? 'text-[#009F87]' : 'text-gray-800'
                            }`}>
                              {notification.title}
                            </h3>
                            {notification.isStarred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                            {notification.actionRequired && (
                              <Badge className="bg-red-100 text-red-800">
                                <AlertCircle className="h-3 w-3 ml-1" />
                                إجراء مطلوب
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {notification.sender}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {notification.createdAt}
                            </span>
                            {notification.relatedEntity && (
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {notification.relatedEntity.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-2">
                          {getTypeBadge(notification.type)}
                          {getPriorityBadge(notification.priority)}
                        </div>
                        
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStarToggle(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Star className={`h-3 w-3 ${
                              notification.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'
                            }`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleArchive(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Archive className="h-3 w-3 text-gray-400" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3 text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="space-y-6">
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              return (
                <Card 
                  key={notification.id} 
                  className="bg-white/90 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all border-l-4 border-l-[#009F87]"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'success' ? 'bg-green-100' :
                          notification.type === 'warning' ? 'bg-yellow-100' :
                          notification.type === 'error' ? 'bg-red-100' :
                          notification.type === 'announcement' ? 'bg-purple-100' :
                          'bg-blue-100'
                        }`}>
                          <TypeIcon className={`h-4 w-4 ${
                            notification.type === 'success' ? 'text-green-600' :
                            notification.type === 'warning' ? 'text-yellow-600' :
                            notification.type === 'error' ? 'text-red-600' :
                            notification.type === 'announcement' ? 'text-purple-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-[#009F87]">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{notification.sender}</span>
                            <span>{notification.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {getTypeBadge(notification.type)}
                        {getPriorityBadge(notification.priority)}
                        <Button
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs"
                        >
                          تم القراءة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="starred" className="space-y-6">
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              return (
                <Card 
                  key={notification.id} 
                  className="bg-white/90 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Star className="h-5 w-5 text-yellow-500 fill-current mt-1" />
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-[#009F87]">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{notification.sender}</span>
                            <span>{notification.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {getTypeBadge(notification.type)}
                        {getPriorityBadge(notification.priority)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          {/* Templates Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="bg-white/90 backdrop-blur border-[#009F87]/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {template.isActive ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">العنوان:</h4>
                    <p className="text-sm text-muted-foreground">{template.title}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">المحتوى:</h4>
                    <p className="text-xs text-muted-foreground line-clamp-3">{template.content}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">الاستخدام:</span>
                    <span className="font-medium">{template.usageCount} مرة</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {getTypeBadge(template.type)}
                    <Badge variant="outline">{template.category}</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 ml-2" />
                      معاينة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#009F87]" />
                  توزيع الإشعارات حسب النوع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'معلومات', count: 45, color: 'bg-blue-500' },
                    { type: 'نجح', count: 32, color: 'bg-green-500' },
                    { type: 'تحذير', count: 18, color: 'bg-yellow-500' },
                    { type: 'خطأ', count: 8, color: 'bg-red-500' },
                    { type: 'إعلان', count: 12, color: 'bg-purple-500' }
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${item.color}`}></div>
                        <span className="text-sm">{item.type}</span>
                      </div>
                      <span className="font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#009F87]" />
                  معدل القراءة حسب الفئة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'الموارد البشrية', rate: 92 },
                    { category: 'الرواتب', rate: 98 },
                    { category: 'الإجازات', rate: 89 },
                    { category: 'الأداء', rate: 85 },
                    { category: 'النظام', rate: 76 }
                  ].map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.category}</span>
                        <span>{item.rate}%</span>
                      </div>
                      <Progress value={item.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#009F87]" />
                مؤشرات الأداء الرئيسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#009F87]">94%</div>
                  <div className="text-sm text-muted-foreground">معدل القراءة</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +5% من الشهر الماضي
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">2.4h</div>
                  <div className="text-sm text-muted-foreground">متوسط وقت الاستجابة</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    -0.6h تحسن
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-purple-600">87%</div>
                  <div className="text-sm text-muted-foreground">معدل اتخاذ الإجراء</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +8% تحسن
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-orange-600">324</div>
                  <div className="text-sm text-muted-foreground">إشعارات هذا الشهر</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +18% زيادة
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Details Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-[#009F87]">
              <Bell className="h-6 w-6" />
              تفاصيل الإشعار
            </DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{selectedNotification.title}</h3>
                  <p className="text-muted-foreground">{selectedNotification.message}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {getTypeBadge(selectedNotification.type)}
                  {getPriorityBadge(selectedNotification.priority)}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات الإشعار</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المرسل:</span>
                        <span className="font-medium">{selectedNotification.sender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المستقبل:</span>
                        <span className="font-medium">{selectedNotification.recipient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الفئة:</span>
                        <span className="font-medium">{selectedNotification.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                        <span className="font-medium">{selectedNotification.createdAt}</span>
                      </div>
                      {selectedNotification.readAt && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">تاريخ القراءة:</span>
                          <span className="font-medium">{selectedNotification.readAt}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات التسليم</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">القناة:</span>
                        <span className="font-medium">{selectedNotification.channel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">نوع المستقبل:</span>
                        <span className="font-medium">{selectedNotification.recipientType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">إجراء مطلوب:</span>
                        <span className="font-medium">{selectedNotification.actionRequired ? 'نعم' : 'لا'}</span>
                      </div>
                      {selectedNotification.expiresAt && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ينتهي في:</span>
                          <span className="font-medium">{selectedNotification.expiresAt}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {selectedNotification.relatedEntity && (
                <Card>
                  <CardHeader>
                    <CardTitle>الكيان المرتبط</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{selectedNotification.relatedEntity.name}</div>
                        <div className="text-sm text-muted-foreground">
                          النوع: {selectedNotification.relatedEntity.type} | الرقم: {selectedNotification.relatedEntity.id}
                        </div>
                      </div>
                      {selectedNotification.actionUrl && (
                        <Button size="sm">
                          عرض التفاصيل
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedNotification.attachments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>المرفقات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedNotification.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{attachment}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 ml-2" />
                            تحميل
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedNotification.status === 'read' ? (
                  <Button variant="outline" onClick={() => handleMarkAsUnread(selectedNotification.id)}>
                    تحديد كغير مقروء
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => handleMarkAsRead(selectedNotification.id)}>
                    تحديد كمقروء
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => handleStarToggle(selectedNotification.id)}
                >
                  <Star className={`h-4 w-4 ml-2 ${selectedNotification.isStarred ? 'fill-current text-yellow-500' : ''}`} />
                  {selectedNotification.isStarred ? 'إلغاء التمييز' : 'تمييز'}
                </Button>
                
                <Button variant="outline" onClick={() => handleArchive(selectedNotification.id)}>
                  <Archive className="h-4 w-4 ml-2" />
                  أرشفة
                </Button>
                
                <Button variant="outline" onClick={() => handleDelete(selectedNotification.id)}>
                  <Trash2 className="h-4 w-4 ml-2" />
                  حذف
                </Button>

                {selectedNotification.actionRequired && selectedNotification.actionUrl && (
                  <Button className="bg-[#009F87] hover:bg-[#008072]">
                    اتخاذ الإجراء المطلوب
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};