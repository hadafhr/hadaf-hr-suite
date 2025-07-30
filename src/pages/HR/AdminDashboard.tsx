import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Upload,
  Settings,
  BarChart3,
  Calendar,
  MessageSquare,
  Shield,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const dashboardStats = [
    { 
      title: 'إجمالي الموظفين', 
      value: '150', 
      change: '+5 هذا الشهر',
      icon: Users, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'الطلبات المعلقة', 
      value: '23', 
      change: '12 طلب جديد',
      icon: FileText, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      title: 'معدل الحضور', 
      value: '94.5%', 
      change: '+2.1% من الشهر الماضي',
      icon: TrendingUp, 
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      title: 'ساعات العمل الإضافية', 
      value: '1,240', 
      change: 'هذا الشهر',
      icon: Clock, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentRequests = [
    { 
      employee: 'سارة أحمد', 
      type: 'إجازة سنوية', 
      date: '15-17 ديسمبر', 
      status: 'pending',
      priority: 'normal'
    },
    { 
      employee: 'محمد علي', 
      type: 'شهادة راتب', 
      date: 'اليوم', 
      status: 'approved',
      priority: 'urgent'
    },
    { 
      employee: 'فاطمة خالد', 
      type: 'سلفة مالية', 
      date: 'أمس', 
      status: 'pending',
      priority: 'high'
    }
  ];

  const adminFeatures = [
    {
      title: 'إدارة الموظفين',
      description: 'إضافة وتعديل بيانات الموظفين',
      icon: Users,
      path: '/admin/employees',
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'تحميل ملف Excel',
      description: 'رفع بيانات الموظفين من ملف Excel',
      icon: Upload,
      path: '/admin/upload',
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'التقارير والإحصائيات',
      description: 'عرض التقارير التفصيلية',
      icon: BarChart3,
      path: '/admin/reports',
      color: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      title: 'منصات النظام',
      description: 'إدارة وإضافة منصات جديدة',
      icon: Settings,
      path: '/admin/platforms',
      color: 'bg-orange-50 hover:bg-orange-100'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">معلق</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">موافق عليه</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">مرفوض</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-r-red-500';
      case 'high':
        return 'border-r-orange-500';
      case 'normal':
        return 'border-r-blue-500';
      default:
        return 'border-r-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <h1 className="text-xl font-semibold">لوحة إدارة الموارد البشرية</h1>
                <p className="text-sm text-muted-foreground">مرحباً، عبدالله المدير</p>
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
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Admin Features */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-right">أدوات الإدارة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adminFeatures.map((feature, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all duration-200 border-0 shadow-sm ${feature.color}`}
                  onClick={() => navigate(feature.path)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <feature.icon className="w-8 h-8 text-primary" />
                      <div className="text-right">
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Requests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">عرض الكل</Button>
              <h2 className="text-xl font-semibold">الطلبات الأخيرة</h2>
            </div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-4">
                {recentRequests.map((request, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border-r-4 ${getPriorityColor(request.priority)} bg-gray-50 rounded-lg`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex space-x-2 space-x-reverse">
                        {getStatusBadge(request.status)}
                        <Badge variant="outline" className="text-xs">
                          {request.priority === 'urgent' ? 'عاجل' : 
                           request.priority === 'high' ? 'مهم' : 'عادي'}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-right">{request.employee}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground text-right">{request.type}</p>
                    <p className="text-xs text-muted-foreground text-right">{request.date}</p>
                    <div className="flex space-x-2 space-x-reverse mt-3">
                      <Button size="sm" variant="outline" className="text-xs">
                        رفض
                      </Button>
                      <Button size="sm" className="text-xs">
                        موافقة
                      </Button>
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
                <Button className="w-full justify-end" variant="outline">
                  <MessageSquare className="w-4 h-4 ml-2" />
                  إرسال إعلان جديد
                </Button>
                <Button className="w-full justify-end" variant="outline">
                  <Upload className="w-4 h-4 ml-2" />
                  تحميل بيانات الموظفين
                </Button>
                <Button className="w-full justify-end" variant="outline">
                  <BarChart3 className="w-4 h-4 ml-2" />
                  تصدير التقرير الشهري
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};