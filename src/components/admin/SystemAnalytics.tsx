import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Globe,
  Server,
  Database,
  RefreshCw,
  Eye,
  UserCheck,
  Building2,
  Calendar,
  PieChart,
  LineChart
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ChartData {
  name: string;
  value: number;
  growth?: number;
  target?: number;
}

export const SystemAnalytics: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState<MetricData[]>([]);

  // Real-time metrics
  const systemMetrics: MetricData[] = [
    {
      label: isArabic ? 'إجمالي العملاء' : 'Total Clients',
      value: '1,847',
      change: '+12.5%',
      trend: 'up',
      color: 'text-blue-500'
    },
    {
      label: isArabic ? 'المستخدمون النشطون' : 'Active Users',
      value: '23,456',
      change: '+8.2%',
      trend: 'up',
      color: 'text-green-500'
    },
    {
      label: isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue',
      value: '₺4.2M',
      change: '+15.8%',
      trend: 'up',
      color: 'text-purple-500'
    },
    {
      label: isArabic ? 'معدل النمو' : 'Growth Rate',
      value: '18.4%',
      change: '+3.2%',
      trend: 'up',
      color: 'text-emerald-500'
    },
    {
      label: isArabic ? 'رضا العملاء' : 'Client Satisfaction',
      value: '94.7%',
      change: '-1.2%',
      trend: 'down',
      color: 'text-orange-500'
    },
    {
      label: isArabic ? 'أداء النظام' : 'System Performance',
      value: '99.8%',
      change: '0%',
      trend: 'stable',
      color: 'text-cyan-500'
    }
  ];

  // Monthly growth data
  const monthlyGrowth: ChartData[] = [
    { name: 'يناير', value: 156, growth: 12, target: 150 },
    { name: 'فبراير', value: 178, growth: 14, target: 165 },
    { name: 'مارس', value: 195, growth: 9, target: 180 },
    { name: 'أبريل', value: 234, growth: 20, target: 200 },
    { name: 'مايو', value: 267, growth: 14, target: 250 },
    { name: 'يونيو', value: 298, growth: 12, target: 280 },
    { name: 'يوليو', value: 334, growth: 12, target: 320 },
    { name: 'أغسطس', value: 389, growth: 16, target: 360 }
  ];

  // Revenue by service type
  const revenueByService: ChartData[] = [
    { name: isArabic ? 'إدارة الموارد البشرية' : 'HR Management', value: 35 },
    { name: isArabic ? 'الاستشارات' : 'Consulting', value: 28 },
    { name: isArabic ? 'التدريب' : 'Training', value: 22 },
    { name: isArabic ? 'التقييم والتطوير' : 'Assessment', value: 15 }
  ];

  // Client distribution by region
  const clientsByRegion: ChartData[] = [
    { name: isArabic ? 'الرياض' : 'Riyadh', value: 450 },
    { name: isArabic ? 'جدة' : 'Jeddah', value: 320 },
    { name: isArabic ? 'الدمام' : 'Dammam', value: 280 },
    { name: isArabic ? 'مكة' : 'Makkah', value: 195 },
    { name: isArabic ? 'المدينة' : 'Madinah', value: 142 },
    { name: isArabic ? 'أخرى' : 'Others', value: 460 }
  ];

  // Performance trends
  const performanceTrends = [
    { month: 'يناير', efficiency: 85, satisfaction: 88, growth: 12 },
    { month: 'فبراير', efficiency: 87, satisfaction: 90, growth: 14 },
    { month: 'مارس', efficiency: 89, satisfaction: 89, growth: 16 },
    { month: 'أبريل', efficiency: 91, satisfaction: 93, growth: 18 },
    { month: 'مايو', efficiency: 93, satisfaction: 94, growth: 15 },
    { month: 'يونيو', efficiency: 94, satisfaction: 95, growth: 17 },
    { month: 'يوليو', efficiency: 96, satisfaction: 94, growth: 19 },
    { month: 'أغسطس', efficiency: 95, satisfaction: 96, growth: 21 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {isArabic ? 'تحليلات النظام المتقدمة' : 'Advanced System Analytics'}
            </h2>
            <p className="text-muted-foreground">
              {isArabic ? 'رؤى شاملة ومؤشرات أداء في الوقت الفعلي' : 'Comprehensive insights and real-time performance metrics'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            {isArabic ? 'تحديث' : 'Refresh'}
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            {isArabic ? 'عرض مفصل' : 'Detailed View'}
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="flex items-center justify-between">
              <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
              <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                {metric.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{isArabic ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
          <TabsTrigger value="growth">{isArabic ? 'النمو' : 'Growth'}</TabsTrigger>
          <TabsTrigger value="performance">{isArabic ? 'الأداء' : 'Performance'}</TabsTrigger>
          <TabsTrigger value="distribution">{isArabic ? 'التوزيع' : 'Distribution'}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Growth Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {isArabic ? 'نمو العملاء الشهري' : 'Monthly Client Growth'}
                </h3>
                <Badge variant="secondary">
                  {isArabic ? '+18.4% هذا الشهر' : '+18.4% This Month'}
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" name={isArabic ? 'العملاء الفعليون' : 'Actual Clients'} />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--destructive))" 
                    strokeDasharray="5 5"
                    name={isArabic ? 'الهدف' : 'Target'}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>

            {/* Revenue by Service */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {isArabic ? 'الإيرادات حسب الخدمة' : 'Revenue by Service'}
                </h3>
                <Button variant="outline" size="sm">
                  <PieChart className="h-4 w-4 mr-2" />
                  {isArabic ? 'تفاصيل' : 'Details'}
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={revenueByService}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueByService.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Growth Trends */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'اتجاهات النمو' : 'Growth Trends'}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.6}
                    name={isArabic ? 'معدل النمو %' : 'Growth Rate %'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Growth Metrics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'مؤشرات النمو' : 'Growth Metrics'}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{isArabic ? 'النمو السنوي' : 'Annual Growth'}</span>
                  <span className="text-xl font-bold text-green-500">+234%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{isArabic ? 'النمو الربعي' : 'Quarterly Growth'}</span>
                  <span className="text-xl font-bold text-blue-500">+67%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{isArabic ? 'النمو الشهري' : 'Monthly Growth'}</span>
                  <span className="text-xl font-bold text-purple-500">+18.4%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{isArabic ? 'توقعات الشهر القادم' : 'Next Month Forecast'}</span>
                  <span className="text-xl font-bold text-orange-500">+22%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {isArabic ? 'اتجاهات الأداء' : 'Performance Trends'}
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <RechartsLineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name={isArabic ? 'الكفاءة %' : 'Efficiency %'}
                />
                <Line 
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name={isArabic ? 'الرضا %' : 'Satisfaction %'}
                />
                <Line 
                  type="monotone" 
                  dataKey="growth" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name={isArabic ? 'النمو %' : 'Growth %'}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Clients by Region */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'توزيع العملاء حسب المنطقة' : 'Clients by Region'}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={clientsByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Regional Statistics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'إحصائيات إقليمية' : 'Regional Statistics'}
              </h3>
              <div className="space-y-4">
                {clientsByRegion.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-2">
                    <span className="font-medium">{region.name}</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Progress value={(region.value / 450) * 100} className="w-20" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {region.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};