import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Gavel,
  Shield,
  MessageSquare,
  Plus,
  Eye,
  Calendar
} from 'lucide-react';

export const LegalDashboard: React.FC = () => {
  // Mock data for dashboard statistics
  const dashboardStats = [
    {
      title: 'القضايا النشطة',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: Gavel,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'العقود المراجعة',
      value: '156',
      change: '+18',
      changeType: 'increase', 
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'الاستشارات المعلقة',
      value: '8',
      change: '-3',
      changeType: 'decrease',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'معدل الامتثال',
      value: '95%',
      change: '+2%',
      changeType: 'increase',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const recentCases = [
    {
      id: 1,
      caseNumber: 'LC-2024-001',
      employee: 'أحمد محمد العلي',
      caseType: 'نزاع عمالي',
      status: 'active',
      priority: 'عالي',
      date: '2024-01-15'
    },
    {
      id: 2,
      caseNumber: 'LC-2024-002', 
      employee: 'فاطمة أحمد سالم',
      caseType: 'إنهاء خدمة',
      status: 'under_review',
      priority: 'متوسط',
      date: '2024-01-14'
    },
    {
      id: 3,
      caseNumber: 'LC-2024-003',
      employee: 'محمد عبدالله النور',
      caseType: 'مخالفة عقد',
      status: 'resolved',
      priority: 'منخفض',
      date: '2024-01-13'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'انتهاء عقد موظف - أحمد سالم',
      date: '2024-02-15',
      type: 'contract',
      priority: 'عالي'
    },
    {
      id: 2,
      title: 'موعد جلسة محكمة - قضية LC-2024-001',
      date: '2024-02-20',
      type: 'hearing',
      priority: 'عالي'
    },
    {
      id: 3,
      title: 'مراجعة لائحة داخلية',
      date: '2024-02-25',
      type: 'review',
      priority: 'متوسط'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { label: 'نشط', color: 'bg-red-100 text-red-800' },
      'under_review': { label: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800' },
      'resolved': { label: 'محلول', color: 'bg-green-100 text-green-800' },
      'closed': { label: 'مغلق', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['active'];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'عالي': 'bg-red-100 text-red-800',
      'متوسط': 'bg-yellow-100 text-yellow-800', 
      'منخفض': 'bg-green-100 text-green-800'
    };
    
    return <Badge className={priorityConfig[priority as keyof typeof priorityConfig]}>{priority}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">لوحة تحكم الشؤون القانونية</h2>
          <p className="text-gray-600 mt-2">نظرة شاملة على الوضع القانوني للشركة</p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            قضية جديدة
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-600 mr-1">هذا الشهر</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              القضايا الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <div key={case_.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">{case_.caseNumber}</span>
                      {getStatusBadge(case_.status)}
                      {getPriorityBadge(case_.priority)}
                    </div>
                    <p className="text-gray-700 font-medium">{case_.employee}</p>
                    <p className="text-sm text-gray-600">{case_.caseType}</p>
                    <p className="text-xs text-gray-500 mt-1">{case_.date}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="w-full">
                عرض جميع القضايا
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              المواعيد المهمة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{deadline.title}</p>
                    <p className="text-sm text-gray-600">{deadline.date}</p>
                    <div className="mt-1">
                      {getPriorityBadge(deadline.priority)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="w-full">
                عرض جميع المواعيد
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>الإجراءات السريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Plus className="h-6 w-6" />
              قضية جديدة
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              مراجعة عقد
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <MessageSquare className="h-6 w-6" />
              استشارة قانونية
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Shield className="h-6 w-6" />
              تدقيق امتثال
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};