import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { 
  Bell, 
  FileText, 
  Settings, 
  BarChart3,
  Workflow,
  Zap,
  Clock,
  AlertTriangle,
  Download,
  Plus,
  Search,
  Filter
} from 'lucide-react';

// Import comprehensive components
import { RequestsDashboard } from './requests/RequestsDashboard';
import { RequestsManagement } from './requests/RequestsManagement';
import { NotificationsCenter } from './requests/NotificationsCenter';
import { AutoReminderEscalation } from './requests/AutoReminderEscalation';
import { WorkflowEngine } from './requests/WorkflowEngine';
import { IntegrationsHub } from './requests/IntegrationsHub';
import { ReportsAnalytics } from './requests/ReportsAnalytics';

interface ComprehensiveRequestsNotificationsProps {
  onBack: () => void;
}

export const ComprehensiveRequestsNotifications: React.FC<ComprehensiveRequestsNotificationsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock overview data
  const overviewStats = {
    totalRequests: 1248,
    pendingRequests: 95,
    approvedRequests: 1085,
    rejectedRequests: 68,
    avgProcessingTime: '2.8 ساعة',
    slaCompliance: 89.5,
    overdueRequests: 23,
    activeWorkflows: 15
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام الطلبات والإشعارات المتكامل"
          description="أتمتة دورة حياة الطلبات مع التذكير التلقائي والتصعيد الذكي والتكاملات الشاملة"
          icon={<Bell className="h-12 w-12 text-white" />}
          onBack={onBack}
          showBackButton={true}
        />

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold">{overviewStats.totalRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">طلبات معلقة</p>
                  <p className="text-2xl font-bold">{overviewStats.pendingRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Badge className="w-5 h-5 text-white bg-transparent" />
                <div>
                  <p className="text-white/80 text-sm">طلبات معتمدة</p>
                  <p className="text-2xl font-bold">{overviewStats.approvedRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">طلبات متجاوزة</p>
                  <p className="text-2xl font-bold">{overviewStats.overdueRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">متوسط المعالجة</p>
                  <p className="text-2xl font-bold">{overviewStats.avgProcessingTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">امتثال SLA</p>
                  <p className="text-2xl font-bold">{overviewStats.slaCompliance}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">سير عمل نشط</p>
                  <p className="text-2xl font-bold">{overviewStats.activeWorkflows}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">تكاملات نشطة</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 flex-wrap">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 ml-2" />
            طلب جديد
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 ml-2" />
            بحث متقدم
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            فلترة الطلبات
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير فوري
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="management">إدارة الطلبات</TabsTrigger>
              <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              <TabsTrigger value="reminders">التذكير والتصعيد</TabsTrigger>
              <TabsTrigger value="workflow">سير العمل</TabsTrigger>
              <TabsTrigger value="integrations">التكاملات</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <RequestsDashboard />
            </TabsContent>

            <TabsContent value="management">
              <RequestsManagement />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationsCenter />
            </TabsContent>

            <TabsContent value="reminders">
              <AutoReminderEscalation />
            </TabsContent>

            <TabsContent value="workflow">
              <WorkflowEngine />
            </TabsContent>

            <TabsContent value="integrations">
              <IntegrationsHub />
            </TabsContent>

            <TabsContent value="reports">
              <ReportsAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};