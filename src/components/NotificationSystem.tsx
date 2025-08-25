import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Bell,
  BellRing,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  Clock,
  FileText,
  DollarSign,
  Target,
  GraduationCap,
  Shield,
  Settings,
  Eye,
  Trash2,
  Mark,
  MarkAsRead
} from 'lucide-react';

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

interface NotificationSystemProps {
  onNavigateToSection?: (section: string) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ onNavigateToSection }) => {
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
      title: 'تأخير في الحضور',
      message: 'محمد عبدالله الخالد تأخر عن العمل بـ 45 دقيقة اليوم.',
      type: 'warning',
      category: 'attendance',
      priority: 'medium',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      read: true,
      actionUrl: 'attendance'
    },
    {
      id: '4',
      title: 'طلب إجازة جديد',
      message: 'فاطمة أحمد قدمت طلب إجازة اعتيادية لمدة 5 أيام ابتداءً من الأسبوع القادم.',
      type: 'info',
      category: 'leaves',
      priority: 'medium',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionUrl: 'leaves'
    },
    {
      id: '5',
      title: 'معالجة الرواتب مكتملة',
      message: 'تم إكمال معالجة رواتب شهر مارس بنجاح. تم إرسال الإشعارات للموظفين.',
      type: 'success',
      category: 'payroll',
      priority: 'low',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      actionUrl: 'payroll'
    },
    {
      id: '6',
      title: 'مخالفة جديدة',
      message: 'تم رصد مخالفة سلوكية لخالد محمد. يتطلب إجراء تأديبي.',
      type: 'error',
      category: 'disciplinary',
      priority: 'urgent',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: false,
      actionUrl: 'disciplinary'
    },
    {
      id: '7',
      title: 'تقييم أداء مجدول',
      message: 'حان وقت تقييم الأداء الربع سنوي لـ 25 موظف.',
      type: 'info',
      category: 'performance',
      priority: 'medium',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      read: false,
      actionUrl: 'performance'
    },
    {
      id: '8',
      title: 'انتهاء برنامج تدريبي',
      message: 'برنامج "إدارة المشاريع" اكتمل بنجاح. 15 موظف حصلوا على الشهادة.',
      type: 'success',
      category: 'training',
      priority: 'low',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      actionUrl: 'training'
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');

  // تحديث الإشعارات كل 30 ثانية (محاكاة)
  useEffect(() => {
    const interval = setInterval(() => {
      // محاكاة إشعارات جديدة
      const shouldAddNew = Math.random() > 0.9;
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

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'urgent':
        return notification.priority === 'urgent';
      default:
        return true;
    }
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    toast.success('تم وضع علامة مقروء على جميع الإشعارات');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('تم حذف الإشعار');
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
    
    if (notification.actionUrl && onNavigateToSection) {
      onNavigateToSection(notification.actionUrl);
    }
  };

  const getNotificationIcon = (type: string, priority: string) => {
    if (priority === 'urgent') return <AlertTriangle className="h-4 w-4 text-red-600" />;
    
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'employees': return <Users className="h-4 w-4" />;
      case 'attendance': return <Clock className="h-4 w-4" />;
      case 'leaves': return <Calendar className="h-4 w-4" />;
      case 'payroll': return <DollarSign className="h-4 w-4" />;
      case 'disciplinary': return <Shield className="h-4 w-4" />;
      case 'performance': return <Target className="h-4 w-4" />;
      case 'training': return <GraduationCap className="h-4 w-4" />;
      case 'contracts': return <FileText className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `${diffInMinutes} دقيقة`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ساعة`;
    return `${Math.floor(diffInMinutes / 1440)} يوم`;
  };

  return (
    <div className="space-y-4">
      {/* رأس نظام الإشعارات */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
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
                <CardTitle className="text-[#009F87]">مركز الإشعارات</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {unreadCount} إشعار غير مقروء
                  {urgentCount > 0 && ` • ${urgentCount} عاجل`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                الكل ({notifications.length})
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                غير مقروء ({unreadCount})
              </Button>
              <Button
                variant={filter === 'urgent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('urgent')}
              >
                عاجل ({urgentCount})
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                وضع علامة مقروء على الكل
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد إشعارات {filter === 'unread' ? 'غير مقروءة' : filter === 'urgent' ? 'عاجلة' : ''}</p>
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
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2 mt-1">
                          {getNotificationIcon(notification.type, notification.priority)}
                          {getCategoryIcon(notification.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority === 'urgent' ? 'عاجل' :
                                 notification.priority === 'high' ? 'هام' :
                                 notification.priority === 'medium' ? 'متوسط' : 'منخفض'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.timestamp)}
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
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="h-6 px-2 text-xs"
                                >
                                  <Eye className="h-3 w-3 ml-1" />
                                  مقروء
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
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
      </Card>

      {/* مربع حوار تفاصيل الإشعار */}
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedNotification && getNotificationIcon(selectedNotification.type, selectedNotification.priority)}
              تفاصيل الإشعار
            </DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  {selectedNotification.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedNotification.message}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedNotification.timestamp.toLocaleString('ar-SA')}
                </div>
                <Badge className={getPriorityColor(selectedNotification.priority)}>
                  {selectedNotification.priority === 'urgent' ? 'عاجل' :
                   selectedNotification.priority === 'high' ? 'هام' :
                   selectedNotification.priority === 'medium' ? 'متوسط' : 'منخفض'}
                </Badge>
              </div>
              {selectedNotification.actionUrl && (
                <Button 
                  onClick={() => onNavigateToSection?.(selectedNotification.actionUrl!)}
                  className="w-full bg-[#009F87] hover:bg-[#008072]"
                >
                  الانتقال إلى القسم المختص
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};