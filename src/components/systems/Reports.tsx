import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, BarChart3, Search, Plus, Download, Calendar, TrendingUp } from 'lucide-react';

interface ReportsProps {
  onBack: () => void;
}

interface Report {
  id: string;
  title: string;
  description: string;
  category: 'hr' | 'payroll' | 'attendance' | 'performance' | 'recruitment';
  type: 'standard' | 'custom' | 'automated';
  createdDate: string;
  lastGenerated: string;
  format: 'pdf' | 'excel' | 'csv';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'on_demand';
  status: 'active' | 'draft' | 'archived';
}

interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: number;
  lastUpdated: string;
  isPublic: boolean;
  category: string;
}

export const Reports: React.FC<ReportsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const reports: Report[] = [
    {
      id: '1',
      title: 'تقرير الحضور والانصراف الشهري',
      description: 'تقرير شامل عن حضور الموظفين وساعات العمل خلال الشهر',
      category: 'attendance',
      type: 'automated',
      createdDate: '2024-01-01',
      lastGenerated: '2024-02-01',
      format: 'pdf',
      frequency: 'monthly',
      status: 'active'
    },
    {
      id: '2',
      title: 'تقرير كشوف المرتبات',
      description: 'تفصيل شامل لكشوف المرتبات والاستقطاعات والمكافآت',
      category: 'payroll',
      type: 'standard',
      createdDate: '2024-01-15',
      lastGenerated: '2024-02-01',
      format: 'excel',
      frequency: 'monthly',
      status: 'active'
    },
    {
      id: '3',
      title: 'تقرير تقييم الأداء السنوي',
      description: 'تحليل شامل لأداء الموظفين والأهداف المحققة خلال العام',
      category: 'performance',
      type: 'custom',
      createdDate: '2024-01-10',
      lastGenerated: '2024-01-31',
      format: 'pdf',
      frequency: 'yearly',
      status: 'active'
    },
    {
      id: '4',
      title: 'تقرير التوظيف والتعيين',
      description: 'إحصائيات عن عمليات التوظيف والمرشحين والمقابلات',
      category: 'recruitment',
      type: 'standard',
      createdDate: '2024-02-01',
      lastGenerated: '2024-02-10',
      format: 'excel',
      frequency: 'quarterly',
      status: 'draft'
    }
  ];

  const dashboards: Dashboard[] = [
    {
      id: '1',
      name: 'لوحة الموارد البشرية الرئيسية',
      description: 'نظرة عامة شاملة على جميع مؤشرات الموارد البشرية',
      widgets: 12,
      lastUpdated: '2024-02-10',
      isPublic: true,
      category: 'hr'
    },
    {
      id: '2',
      name: 'لوحة تحليلات الأداء',
      description: 'تحليل مفصل لأداء الموظفين والأقسام',
      widgets: 8,
      lastUpdated: '2024-02-09',
      isPublic: false,
      category: 'performance'
    },
    {
      id: '3',
      name: 'لوحة إحصائيات الحضور',
      description: 'متابعة حضور الموظفين والإجازات بشكل تفاعلي',
      widgets: 6,
      lastUpdated: '2024-02-08',
      isPublic: true,
      category: 'attendance'
    }
  ];

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      hr: { text: isRTL ? 'الموارد البشرية' : 'HR', className: 'bg-blue-100 text-blue-800' },
      payroll: { text: isRTL ? 'الرواتب' : 'Payroll', className: 'bg-green-100 text-green-800' },
      attendance: { text: isRTL ? 'الحضور' : 'Attendance', className: 'bg-purple-100 text-purple-800' },
      performance: { text: isRTL ? 'الأداء' : 'Performance', className: 'bg-orange-100 text-orange-800' },
      recruitment: { text: isRTL ? 'التوظيف' : 'Recruitment', className: 'bg-pink-100 text-pink-800' }
    };
    return categoryConfig[category as keyof typeof categoryConfig];
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      standard: { text: isRTL ? 'قياسي' : 'Standard', className: 'bg-gray-100 text-gray-800' },
      custom: { text: isRTL ? 'مخصص' : 'Custom', className: 'bg-blue-100 text-blue-800' },
      automated: { text: isRTL ? 'آلي' : 'Automated', className: 'bg-green-100 text-green-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: isRTL ? 'نشط' : 'Active', className: 'bg-green-100 text-green-800' },
      draft: { text: isRTL ? 'مسودة' : 'Draft', className: 'bg-yellow-100 text-yellow-800' },
      archived: { text: isRTL ? 'مؤرشف' : 'Archived', className: 'bg-gray-100 text-gray-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getFrequencyBadge = (frequency: string) => {
    const frequencyConfig = {
      daily: { text: isRTL ? 'يومي' : 'Daily', className: 'bg-red-100 text-red-800' },
      weekly: { text: isRTL ? 'أسبوعي' : 'Weekly', className: 'bg-orange-100 text-orange-800' },
      monthly: { text: isRTL ? 'شهري' : 'Monthly', className: 'bg-blue-100 text-blue-800' },
      quarterly: { text: isRTL ? 'ربع سنوي' : 'Quarterly', className: 'bg-purple-100 text-purple-800' },
      yearly: { text: isRTL ? 'سنوي' : 'Yearly', className: 'bg-green-100 text-green-800' },
      on_demand: { text: isRTL ? 'عند الطلب' : 'On Demand', className: 'bg-gray-100 text-gray-800' }
    };
    return frequencyConfig[frequency as keyof typeof frequencyConfig];
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || report.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'التقارير' : 'Reports'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'إنشاء وإدارة التقارير والتحليلات واللوحات التفاعلية' : 'Create and manage reports, analytics and interactive dashboards'}
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {isRTL ? 'تقرير جديد' : 'New Report'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إجمالي التقارير' : 'Total Reports'}
                  </p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'التقارير النشطة' : 'Active Reports'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">32</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'اللوحات التفاعلية' : 'Dashboards'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'التنزيلات اليوم' : 'Downloads Today'}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">127</p>
                </div>
                <Download className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reports">{isRTL ? 'التقارير' : 'Reports'}</TabsTrigger>
            <TabsTrigger value="dashboards">{isRTL ? 'اللوحات التفاعلية' : 'Dashboards'}</TabsTrigger>
            <TabsTrigger value="analytics">{isRTL ? 'التحليلات' : 'Analytics'}</TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في التقارير...' : 'Search reports...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {isRTL ? 'تصدير الكل' : 'Export All'}
              </Button>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => {
                const categoryBadge = getCategoryBadge(report.category);
                const typeBadge = getTypeBadge(report.type);
                const statusBadge = getStatusBadge(report.status);
                const frequencyBadge = getFrequencyBadge(report.frequency);
                
                return (
                  <Card key={report.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{report.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={categoryBadge.className}>
                          {categoryBadge.text}
                        </Badge>
                        <Badge className={typeBadge.className}>
                          {typeBadge.text}
                        </Badge>
                        <Badge className={statusBadge.className}>
                          {statusBadge.text}
                        </Badge>
                        <Badge className={frequencyBadge.className}>
                          {frequencyBadge.text}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{isRTL ? 'التنسيق:' : 'Format:'}</span>
                            <span className="font-medium uppercase">{report.format}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{isRTL ? 'تم الإنشاء:' : 'Created:'}</span>
                            <span>{report.createdDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{isRTL ? 'آخر إنشاء:' : 'Last Generated:'}</span>
                            <span className="font-medium">{report.lastGenerated}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'تنزيل' : 'Download'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="dashboards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboards.map((dashboard) => (
                <Card key={dashboard.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                      <Badge variant={dashboard.isPublic ? 'default' : 'secondary'}>
                        {dashboard.isPublic ? (isRTL ? 'عام' : 'Public') : (isRTL ? 'خاص' : 'Private')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{dashboard.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{isRTL ? 'العناصر:' : 'Widgets:'}</span>
                        <span className="text-sm font-medium">{dashboard.widgets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{isRTL ? 'آخر تحديث:' : 'Last Updated:'}</span>
                        <span className="text-sm font-medium">{dashboard.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <Button size="sm" variant="outline" className="flex-1">
                        {isRTL ? 'فتح' : 'Open'}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        {isRTL ? 'تحرير' : 'Edit'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {isRTL ? 'التحليلات المتقدمة' : 'Advanced Analytics'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'أدوات التحليل المتقدمة وذكاء الأعمال للموارد البشرية' : 'Advanced analytics tools and business intelligence for HR'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};