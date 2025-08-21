import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Clock,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Notification } from '@/hooks/useEmployeeDashboard';

interface EmployeeNotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
}

export const EmployeeNotifications: React.FC<EmployeeNotificationsProps> = ({
  notifications,
  onMarkAsRead
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">عاجل</Badge>;
      case 'high':
        return <Badge variant="destructive">مهم</Badge>;
      case 'medium':
        return <Badge variant="default">متوسط</Badge>;
      case 'low':
        return <Badge variant="secondary">منخفض</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getActionTypeLabel = (actionType?: string) => {
    switch (actionType) {
      case 'salary_update':
        return 'تحديث راتب';
      case 'position_update':
        return 'تحديث منصب';
      case 'employment_status_update':
        return 'تحديث حالة وظيفية';
      case 'attendance':
        return 'حضور وانصراف';
      case 'leave':
        return 'إجازة';
      case 'performance':
        return 'أداء';
      case 'disciplinary':
        return 'إجراء تأديبي';
      case 'welcome':
        return 'ترحيب';
      default:
        return actionType || '';
    }
  };

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا توجد إشعارات</h3>
            <p className="text-muted-foreground">
              ستظهر هنا جميع الإشعارات والتحديثات المتعلقة بحسابك
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const unreadNotifications = notifications.filter(n => !n.is_read);
  const readNotifications = notifications.filter(n => n.is_read);

  return (
    <div className="space-y-4">
      {/* إحصائيات الإشعارات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الإجمالي</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">غير مقروء</p>
                <p className="text-2xl font-bold text-red-600">{unreadNotifications.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مقروء</p>
                <p className="text-2xl font-bold text-green-600">{readNotifications.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عاجل</p>
                <p className="text-2xl font-bold text-orange-600">
                  {notifications.filter(n => n.priority === 'urgent' || n.priority === 'high').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة الإشعارات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            الإشعارات الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    !notification.is_read 
                      ? 'border-primary/50 bg-primary/5' 
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.notification_type)}
                    
                    <div className="flex-1 space-y-2">
                      {/* رأس الإشعار */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {notification.title}
                          </h4>
                          {notification.action_type && (
                            <span className="text-xs text-muted-foreground">
                              {getActionTypeLabel(notification.action_type)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(notification.priority)}
                          {!notification.is_read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onMarkAsRead(notification.id)}
                              className="h-7 px-2"
                            >
                              <Eye className="h-3 w-3 ml-1" />
                              تمت قراءته
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* محتوى الإشعار */}
                      {notification.description && (
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      )}

                      {/* التاريخ والوقت */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(new Date(notification.created_at), 'dd/MM/yyyy HH:mm', { locale: ar })}
                          </span>
                        </div>
                        
                        {notification.read_at && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            <span>
                              قُرئ في: {format(new Date(notification.read_at), 'dd/MM/yyyy HH:mm', { locale: ar })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};