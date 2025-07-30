import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  FileText, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Star, 
  Bell, 
  User,
  MapPin,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();

  const quickStats = [
    { title: 'ساعات العمل هذا الشهر', value: '176', icon: Clock, color: 'text-blue-600' },
    { title: 'أيام الإجازة المتبقية', value: '12', icon: Calendar, color: 'text-green-600' },
    { title: 'الطلبات المعلقة', value: '3', icon: FileText, color: 'text-orange-600' },
    { title: 'تقييم الأداء', value: '4.8/5', icon: Star, color: 'text-yellow-600' }
  ];

  const recentActivities = [
    { type: 'attendance', message: 'تم تسجيل الحضور في 08:30 صباحاً', time: 'منذ 2 ساعة', status: 'success' },
    { type: 'request', message: 'تم قبول طلب الإجازة للفترة 15-17 ديسمبر', time: 'أمس', status: 'approved' },
    { type: 'announcement', message: 'إعلان جديد: اجتماع فريق العمل غداً', time: 'منذ 3 أيام', status: 'info' }
  ];

  const serviceCards = [
    {
      title: 'نظام الحضور والانصراف',
      description: 'تسجيل الحضور بنظام GPS',
      icon: MapPin,
      path: '/attendance',
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'طلبات الإجازات',
      description: 'تقديم ومتابعة طلبات الإجازة',
      icon: Calendar,
      path: '/leave-management',
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'الطلبات العامة',
      description: 'شهادات راتب، سلف، شكاوى',
      icon: FileText,
      path: '/requests',
      color: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      title: 'الملف الشخصي',
      description: 'عرض وتحديث البيانات الشخصية',
      icon: User,
      path: '/employee-profile',
      color: 'bg-orange-50 hover:bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <h1 className="text-xl font-semibold">مرحباً، أحمد محمد</h1>
                <p className="text-sm text-muted-foreground">مطور برمجيات - قسم التكنولوجيا</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/hr-login')}>
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-right">الخدمات الذاتية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceCards.map((service, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-200 border-0 shadow-sm ${service.color}`}
                  onClick={() => navigate(service.path)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <service.icon className="w-8 h-8 text-primary" />
                      <div className="text-right">
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-right">الأنشطة الأخيرة</h2>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-right">التحديثات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 space-x-reverse">
                    <div className="flex-shrink-0">
                      {activity.status === 'success' && (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                      {activity.status === 'approved' && (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                      {activity.status === 'info' && (
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <Bell className="w-4 h-4 text-orange-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-right">إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-end" 
                  variant="outline"
                  onClick={() => navigate('/attendance')}
                >
                  <Clock className="w-4 h-4 ml-2" />
                  تسجيل الحضور
                </Button>
                <Button 
                  className="w-full justify-end" 
                  variant="outline"
                  onClick={() => navigate('/leave-management')}
                >
                  <Calendar className="w-4 h-4 ml-2" />
                  طلب إجازة
                </Button>
                <Button 
                  className="w-full justify-end" 
                  variant="outline"
                  onClick={() => navigate('/requests')}
                >
                  <FileText className="w-4 h-4 ml-2" />
                  طلب شهادة راتب
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};