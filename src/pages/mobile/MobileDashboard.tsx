import React, { useState } from 'react';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileSidebar } from '@/components/mobile/MobileSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Clock, 
  Calendar, 
  CreditCard, 
  Users, 
  TrendingUp,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

export const MobileDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const quickStats = [
    {
      title: t('employeeRequests'),
      value: '12',
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: t('attendanceOverview'),
      value: '98%',
      icon: Clock,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: t('leaveBalance'),
      value: '15',
      icon: Calendar,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: t('myTeam'),
      value: '8',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const recentRequests = [
    {
      id: 1,
      type: t('leaveRequest'),
      status: 'pending',
      date: '2024-01-15',
      days: 3
    },
    {
      id: 2,
      type: t('salaryCertificate'),
      status: 'approved',
      date: '2024-01-14'
    },
    {
      id: 3,
      type: t('attendanceModification'),
      status: 'rejected',
      date: '2024-01-13'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Attendance Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('attendanceOverview')}</CardTitle>
            <CardDescription>هذا الشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>أيام الحضور</span>
                <span>20/22 يوم</span>
              </div>
              <Progress value={91} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>إجمالي الساعات: 160 ساعة</span>
                <span>الإضافي: 8 ساعات</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col">
                <Plus className="h-5 w-5 mb-1" />
                <span className="text-xs">{t('newRequest')}</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Clock className="h-5 w-5 mb-1" />
                <span className="text-xs">تسجيل حضور</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs">كشف الراتب</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <TrendingUp className="h-5 w-5 mb-1" />
                <span className="text-xs">التقارير</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(request.status)}
                    <div>
                      <p className="font-medium text-sm">{request.type}</p>
                      <p className="text-xs text-muted-foreground">{request.date}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {t(request.status)}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              عرض جميع الطلبات
            </Button>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  );
};