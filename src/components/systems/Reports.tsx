import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileBarChart, BarChart3, PieChart, TrendingUp, Download, Settings, Eye, Save, Share, FileText, Filter, Calendar, Database, Plus, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface ReportsProps {
  onBack: () => void;
}

export const Reports: React.FC<ReportsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // بيانات التقارير والتحليلات
  const reportsData = [
    { month: 'يناير', reports: 85, analytics: 145, exports: 65 },
    { month: 'فبراير', reports: 92, analytics: 162, exports: 78 },
    { month: 'مارس', reports: 78, analytics: 138, exports: 52 },
    { month: 'أبريل', reports: 105, analytics: 175, exports: 89 },
    { month: 'مايو', reports: 98, analytics: 156, exports: 73 },
    { month: 'يونيو', reports: 112, analytics: 183, exports: 95 }
  ];

  const reportsMetrics = [
    { category: 'التقارير المُنشأة', count: 1680, percentage: 100, color: '#009F87' },
    { category: 'التحليلات التفاعلية', count: 2850, percentage: 95, color: '#1e40af' },
    { category: 'التصديرات اليومية', count: 452, percentage: 78, color: '#059669' },
    { category: 'المستخدمين النشطين', count: 320, percentage: 87, color: '#7c3aed' }
  ];

  const reportTypes = [
    { type: 'تقارير الموظفين', value: 40, count: 672 },
    { type: 'تقارير مالية', value: 35, count: 588 },
    { type: 'تقارير الحضور', value: 25, count: 420 }
  ];

  const BOUD_COLORS = ['#009F87', '#1e40af', '#059669'];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#009F87] via-[#008072] to-[#009F87] p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Share className="h-4 w-4 ml-2" />
                  {isRTL ? 'استيراد' : 'Import'}
                </Button>
                <Button className="bg-[#009F87]/80 border-[#009F87]/30 text-white hover:bg-[#009F87]/90 backdrop-blur-sm">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير Excel' : 'Export Excel'}
                </Button>
                <Button className="bg-red-600/80 border-red-600/30 text-white hover:bg-red-600/90 backdrop-blur-sm">
                  <FileBarChart className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير PDF' : 'Export PDF'}
                </Button>
                <Button className="bg-blue-600 border-blue-600 text-white hover:bg-blue-600/90 shadow-lg">
                  <Save className="h-4 w-4 ml-2" />
                  {isRTL ? 'حفظ' : 'Save'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <FileBarChart className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام التقارير والتحليلات الذكي' : 'Smart Reports & Analytics System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'نظام متطور لإنشاء التقارير التفاعلية والتحليلات المتقدمة' : 'Advanced system for interactive reports and business intelligence'}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Analytics Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900 via-[#009F87] to-blue-900 text-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Reports Generation */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-300">
                      {isRTL ? 'إنشاء التقارير' : 'Reports Generation'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-[#009F87]/50 to-blue-600/50 rounded-xl p-4 flex items-center justify-center">
                      <FileBarChart className="h-32 w-32 text-green-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-[#009F87]/80 px-3 py-1 rounded-full text-sm">
                        1680 {isRTL ? 'تقرير' : 'Reports'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        100% {isRTL ? 'معدل التوليد' : 'Generation Rate'}
                      </div>
                    </div>
                  </div>

                  {/* Analytics System */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-300">
                      {isRTL ? 'نظام التحليلات' : 'Analytics System'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-blue-600/50 to-purple-600/50 rounded-xl p-4 flex items-center justify-center">
                      <BarChart3 className="h-32 w-32 text-blue-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        2850 {isRTL ? 'تحليل' : 'Analytics'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-purple-600/80 px-3 py-1 rounded-full text-sm">
                        95% {isRTL ? 'دقة التحليل' : 'Analysis Accuracy'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reports Trends Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={reportsData}>
                      <defs>
                        <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#009F87" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#009F87" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorAnalytics" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1e40af" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Area type="monotone" dataKey="reports" stroke="#009F87" fill="url(#colorReports)" />
                      <Area type="monotone" dataKey="analytics" stroke="#1e40af" fill="url(#colorAnalytics)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {isRTL ? 'مؤشرات التقارير' : 'Reports Metrics'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {reportsMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                      <div>
                        <p className="font-semibold text-gray-800">{metric.category}</p>
                        <p className="text-sm text-gray-600">{metric.count} {isRTL ? 'عنصر' : 'items'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: metric.color }}>{metric.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {isRTL ? 'أنواع التقارير' : 'Report Types'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={reportTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {reportTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={BOUD_COLORS[index % BOUD_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reports System */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#009F87] text-white px-6 py-2 rounded-full shadow-lg">
              <FileBarChart className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'نظام تقارير متطور' : 'Advanced Reports System'}</span>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'نظام التقارير والتحليلات المتطور' : 'Advanced Reports & Analytics System'}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: FileBarChart, label: isRTL ? 'تقارير شاملة' : 'Comprehensive Reports', color: 'bg-[#009F87]', count: 0 },
                  { icon: BarChart3, label: isRTL ? 'الرسوم البيانية' : 'Charts & Graphs', color: 'bg-blue-600', count: 0 },
                  { icon: PieChart, label: isRTL ? 'التحليلات المتقدمة' : 'Advanced Analytics', color: 'bg-green-600', count: 0 },
                  { icon: TrendingUp, label: isRTL ? 'مؤشرات الأداء' : 'Performance KPIs', color: 'bg-purple-600', count: 0 },
                  { icon: FileText, label: isRTL ? 'التقارير المخصصة' : 'Custom Reports', color: 'bg-yellow-600', count: 45 },
                  { icon: Filter, label: isRTL ? 'الفلاتر المتقدمة' : 'Advanced Filters', color: 'bg-red-600', count: 0 },
                  { icon: Calendar, label: isRTL ? 'التقارير المجدولة' : 'Scheduled Reports', color: 'bg-indigo-600', count: 12 },
                  { icon: Database, label: isRTL ? 'مصادر البيانات' : 'Data Sources', color: 'bg-gray-600', count: 0 }
                ].map((item, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform relative`}>
                      <item.icon className="h-8 w-8 text-white" />
                      {item.count > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {item.count}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-[#009F87] transition-colors">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-[#009F87]/10 to-[#009F87]/20 rounded-xl border border-[#009F87]/20">
                  <div className="text-3xl font-bold text-[#009F87] mb-2">1,680</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'تقارير مُنشأة' : 'Generated Reports'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-blue-600/20 rounded-xl border border-blue-600/20">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2,850</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'تحليلات تفاعلية' : 'Interactive Analytics'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-600/20 rounded-xl border border-green-600/20">
                  <div className="text-3xl font-bold text-green-600 mb-2">452</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'تصديرات يومية' : 'Daily Exports'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-600/10 to-purple-600/20 rounded-xl border border-purple-600/20">
                  <div className="text-3xl font-bold text-purple-600 mb-2">320</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'مستخدمين نشطين' : 'Active Users'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

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