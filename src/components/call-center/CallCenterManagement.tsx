import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Phone,
  LayoutDashboard,
  Clock,
  Users,
  PhoneCall,
  Star,
  Gift,
  BarChart3,
  GraduationCap,
  Calendar,
  UserCheck,
  TrendingUp,
  Award,
  Download,
  FileText,
  Settings,
  Bell,
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';

export const CallCenterManagement = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  // Mock KPIs data
  const kpis = [
    {
      title: isRTL ? 'المكالمات اليومية' : 'Daily Calls',
      value: '1,247',
      change: '+12%',
      icon: PhoneCall,
      color: 'from-primary to-primary/80'
    },
    {
      title: isRTL ? 'متوسط مدة المكالمة' : 'Avg Call Duration',
      value: '4:32',
      change: '-8%',
      icon: Clock,
      color: 'from-success to-success/80'
    },
    {
      title: isRTL ? 'معدل الرضا' : 'CSAT Score',
      value: '94.5%',
      change: '+5%',
      icon: Star,
      color: 'from-accent to-accent/80'
    },
    {
      title: isRTL ? 'الالتزام بالدوام' : 'Attendance Rate',
      value: '97.8%',
      change: '+2%',
      icon: CheckCircle,
      color: 'from-warning to-warning/80'
    }
  ];

  const tabs = [
    { id: 'dashboard', label: isRTL ? 'لوحة التحكم' : 'Dashboard', icon: LayoutDashboard },
    { id: 'shifts', label: isRTL ? 'إدارة الورديات' : 'Shifts Management', icon: Calendar },
    { id: 'attendance', label: isRTL ? 'الحضور والانصراف' : 'Attendance', icon: UserCheck },
    { id: 'performance', label: isRTL ? 'أداء المكالمات' : 'Call Performance', icon: PhoneCall },
    { id: 'quality', label: isRTL ? 'جودة الخدمة' : 'Service Quality', icon: Star },
    { id: 'incentives', label: isRTL ? 'التحفيز والمكافآت' : 'Incentives', icon: Gift },
    { id: 'reports', label: isRTL ? 'التحليل والتقارير' : 'Reports', icon: BarChart3 },
    { id: 'training', label: isRTL ? 'التدريب والتطوير' : 'Training', icon: GraduationCap }
  ];

  const handleExport = (type: string) => {
    toast({
      title: isRTL ? `تصدير ${type}` : `Export ${type}`,
      description: isRTL ? `جاري إنشاء ملف ${type}` : `Generating ${type} file`
    });
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {isRTL ? 'قسم الكول سنتر وإدارة مراكز الاتصال' : 'Call Center & Contact Center Management'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'إدارة شاملة لمراكز الاتصال وتحليل الأداء المباشر' : 'Comprehensive call center management with real-time analytics'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport('Excel')}>
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('PDF')}>
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                  <kpi.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <Badge variant={kpi.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                  {kpi.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs Content */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6 bg-muted/50">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col gap-1 h-16 text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden lg:block">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="bg-[#1a1a1a] border-border">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      {isRTL ? 'الأداء المباشر' : 'Live Performance'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white">{isRTL ? 'المكالمات النشطة' : 'Active Calls'}</span>
                        <Badge className="bg-success/20 text-success">23</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">{isRTL ? 'في قائمة الانتظار' : 'In Queue'}</span>
                        <Badge className="bg-warning/20 text-warning">7</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">{isRTL ? 'متاح' : 'Available'}</span>
                        <Badge className="bg-primary/20 text-primary">15</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1a1a] border-border">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      {isRTL ? 'التنبيهات الفورية' : 'Real-time Alerts'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                        <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-white font-medium">
                            {isRTL ? 'تأخر في الرد' : 'Delayed Response'}
                          </p>
                          <p className="text-xs text-white/70">
                            {isRTL ? 'متوسط وقت الانتظار: 3 دقائق' : 'Avg wait time: 3 minutes'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-white font-medium">
                            {isRTL ? 'أداء ممتاز' : 'Excellent Performance'}
                          </p>
                          <p className="text-xs text-white/70">
                            {isRTL ? 'فريق الوردية الصباحية' : 'Morning shift team'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Shifts Management Tab */}
            <TabsContent value="shifts" className="space-y-4">
              <Card className="bg-[#1a1a1a] border-border">
                <CardHeader>
                  <CardTitle className="text-white">{isRTL ? 'جدول الورديات' : 'Shift Schedule'}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isRTL ? 'إدارة وتنظيم ورديات فريق الكول سنتر' : 'Manage and organize call center team shifts'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-white/70">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p>{isRTL ? 'سيتم إضافة نظام إدارة الورديات قريباً' : 'Shift management system coming soon'}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-4">
              <Card className="bg-[#1a1a1a] border-border">
                <CardHeader>
                  <CardTitle className="text-white">{isRTL ? 'سجلات الحضور' : 'Attendance Records'}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isRTL ? 'مراقبة حضور وانصراف موظفي الكول سنتر' : 'Monitor call center staff attendance'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-white/70">
                    <UserCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p>{isRTL ? 'سيتم إضافة نظام الحضور والانصراف قريباً' : 'Attendance system coming soon'}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Call Performance Tab */}
            <TabsContent value="performance" className="space-y-4">
              <Card className="bg-[#1a1a1a] border-border">
                <CardHeader>
                  <CardTitle className="text-white">{isRTL ? 'أداء المكالمات' : 'Call Performance'}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isRTL ? 'تحليل شامل لأداء المكالمات وجودة الخدمة' : 'Comprehensive call performance and service quality analysis'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-white/70 mb-1">{isRTL ? 'إجمالي المكالمات' : 'Total Calls'}</p>
                      <p className="text-2xl font-bold text-white">12,847</p>
                    </div>
                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <p className="text-sm text-white/70 mb-1">{isRTL ? 'المكالمات الناجحة' : 'Successful Calls'}</p>
                      <p className="text-2xl font-bold text-white">11,923</p>
                    </div>
                    <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <p className="text-sm text-white/70 mb-1">{isRTL ? 'المعلقة' : 'Pending'}</p>
                      <p className="text-2xl font-bold text-white">324</p>
                    </div>
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <p className="text-sm text-white/70 mb-1">{isRTL ? 'الملغاة' : 'Cancelled'}</p>
                      <p className="text-2xl font-bold text-white">600</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Service Quality Tab */}
            <TabsContent value="quality" className="space-y-4">
              <Card className="bg-[#1a1a1a] border-border">
                <CardHeader>
                  <CardTitle className="text-white">{isRTL ? 'جودة الخدمة' : 'Service Quality'}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isRTL ? 'مراجعة وتقييم جودة خدمة العملاء' : 'Review and evaluate customer service quality'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-white/70">
                    <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p>{isRTL ? 'سيتم إضافة نظام جودة الخدمة قريباً' : 'Service quality system coming soon'}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Incentives Tab */}
            <TabsContent value="incentives" className="space-y-4">
              <Card className="bg-[#1a1a1a] border-border">
                <CardHeader>
                  <CardTitle className="text-white">{isRTL ? 'التحفيز والمكافآت' : 'Incentives & Rewards'}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isRTL ? 'نظام نقاط ومكافآت لتحفيز الأداء المتميز' : 'Points and rewards system for outstanding performance'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{isRTL ? 'أفضل موظف هذا الشهر' : 'Top Employee This Month'}</h4>
                        <Award className="w-5 h-5 text-accent" />
                      </div>
                      <p className="text-white/70 text-sm">{isRTL ? 'أحمد محمد - 450 نقطة' : 'Ahmed Mohammed - 450 points'}</p>
                    </div>
                    <div className="text-center py-8 text-white/70">
                      <Gift className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <p>{isRTL ? 'لوحة الشرف والمكافآت قيد التطوير' : 'Leaderboard and rewards under development'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <Card className="bg-[#1a1a1a] border-border">
                <CardHeader>
                  <CardTitle className="text-white">{isRTL ? 'التحليل والتقارير' : 'Reports & Analytics'}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isRTL ? 'تقارير تفصيلية وتحليلات متقدمة' : 'Detailed reports and advanced analytics'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-white/70">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p>{isRTL ? 'سيتم إضافة نظام التقارير المتقدم قريباً' : 'Advanced reporting system coming soon'}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Training Tab */}
            <TabsContent value="training" className="space-y-4">
              <Card className="bg-[#1a1a1a] border-border">
                <CardHeader>
                  <CardTitle className="text-white">{isRTL ? 'التدريب والتطوير' : 'Training & Development'}</CardTitle>
                  <CardDescription className="text-white/70">
                    {isRTL ? 'برامج تدريب وتطوير مهارات فريق الكول سنتر' : 'Training and skill development programs for call center team'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-white/70">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p>{isRTL ? 'سيتم إضافة نظام التدريب والتطوير قريباً' : 'Training and development system coming soon'}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* AI Assistant Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {isRTL ? 'المساعد الذكي للكول سنتر' : 'Call Center AI Assistant'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isRTL 
                  ? 'تحليل الأداء العام والتوصية بتحسينات تلقائية باستخدام الذكاء الاصطناعي'
                  : 'AI-powered performance analysis and automated improvement recommendations'
                }
              </p>
            </div>
            <Button variant="default">
              {isRTL ? 'استشر المساعد' : 'Consult Assistant'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};