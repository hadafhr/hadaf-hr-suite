import React, { useState } from 'react';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileSidebar } from '@/components/mobile/MobileSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Calendar,
  FileText,
  UserPlus,
  Settings,
  Trash2,
  MoreVertical
} from 'lucide-react';

export const MobileNotifications: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const notifications = [
    {
      id: 1,
      title: 'طلب إجازة جديد',
      description: 'تم تقديم طلب إجازة من سارة أحمد لمدة 3 أيام',
      type: 'request',
      priority: 'high',
      time: 'منذ 5 دقائق',
      read: false,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'موافقة على طلب التدريب',
      description: 'تمت الموافقة على طلبك للانضمام لدورة إدارة المشاريع',
      type: 'approval',
      priority: 'medium',
      time: 'منذ 30 دقيقة',
      read: false,
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      id: 3,
      title: 'تذكير اجتماع',
      description: 'اجتماع فريق التطوير في تمام الساعة 2:00 مساءً',
      type: 'reminder',
      priority: 'high',
      time: 'منذ ساعة',
      read: true,
      icon: Calendar,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      id: 4,
      title: 'موظف جديد',
      description: 'تم إضافة محمد سعد إلى فريق المبيعات',
      type: 'info',
      priority: 'low',
      time: 'منذ 2 ساعة',
      read: true,
      icon: UserPlus,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      id: 5,
      title: 'تحديث النظام',
      description: 'سيتم إجراء صيانة للنظام غداً من 12:00 - 2:00 صباحاً',
      type: 'system',
      priority: 'medium',
      time: 'منذ 3 ساعات',
      read: true,
      icon: Settings,
      color: 'text-gray-600',
      bg: 'bg-gray-50'
    },
    {
      id: 6,
      title: 'تحذير: غياب غير مبرر',
      description: 'تم رصد غياب غير مبرر لأحمد خالد اليوم',
      type: 'warning',
      priority: 'high',
      time: 'أمس',
      read: false,
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ];

  const getNotificationStats = () => {
    return {
      total: notifications.length,
      unread: notifications.filter(n => !n.read).length,
      high: notifications.filter(n => n.priority === 'high').length,
      today: notifications.filter(n => n.time.includes('دقائق') || n.time.includes('ساعة')).length
    };
  };

  const filterNotificationsByType = (type: string) => {
    if (type === 'all') return notifications;
    if (type === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === type);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const stats = getNotificationStats();

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('notifications')}</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              تعليم كقروء
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">غير مقروءة</p>
                <p className="text-2xl font-bold text-red-600">{stats.unread}</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عالية الأولوية</p>
                <p className="text-2xl font-bold text-orange-600">{stats.high}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <div className="p-4 border-b">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" className="text-xs">الكل</TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">غير مقروء</TabsTrigger>
                  <TabsTrigger value="request" className="text-xs">طلبات</TabsTrigger>
                  <TabsTrigger value="system" className="text-xs">النظام</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="space-y-0 mt-0">
                {filterNotificationsByType('all').map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 ${index !== 0 ? 'border-t' : ''} ${!notification.read ? 'bg-blue-50/30' : ''} hover:bg-muted/50 transition-colors cursor-pointer`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${notification.bg} flex-shrink-0`}>
                          <Icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className={`font-medium text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority === 'high' ? 'عالية' : notification.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="unread" className="space-y-0 mt-0">
                {filterNotificationsByType('unread').map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 ${index !== 0 ? 'border-t' : ''} bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${notification.bg} flex-shrink-0`}>
                          <Icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-sm text-foreground">
                                {notification.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority === 'high' ? 'عالية' : notification.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="request" className="space-y-0 mt-0">
                {filterNotificationsByType('request').map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 ${index !== 0 ? 'border-t' : ''} ${!notification.read ? 'bg-blue-50/30' : ''} hover:bg-muted/50 transition-colors cursor-pointer`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${notification.bg} flex-shrink-0`}>
                          <Icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className={`font-medium text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority === 'high' ? 'عالية' : notification.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="system" className="space-y-0 mt-0">
                {filterNotificationsByType('system').map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 ${index !== 0 ? 'border-t' : ''} ${!notification.read ? 'bg-blue-50/30' : ''} hover:bg-muted/50 transition-colors cursor-pointer`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${notification.bg} flex-shrink-0`}>
                          <Icon className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className={`font-medium text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority === 'high' ? 'عالية' : notification.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  );
};