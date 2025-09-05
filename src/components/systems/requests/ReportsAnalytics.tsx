import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  LineChart, 
  PieChart,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, Cell } from 'recharts';

interface KPICard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

export const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data for charts
  const requestTrendData = [
    { month: 'يناير', requests: 120, approved: 95, rejected: 15, pending: 10 },
    { month: 'فبراير', requests: 145, approved: 115, rejected: 20, pending: 10 },
    { month: 'مارس', requests: 165, approved: 130, rejected: 25, pending: 10 },
    { month: 'أبريل', requests: 180, approved: 145, rejected: 20, pending: 15 },
    { month: 'مايو', requests: 200, approved: 160, rejected: 25, pending: 15 },
    { month: 'يونيو', requests: 185, approved: 150, rejected: 20, pending: 15 }
  ];

  const departmentData = [
    { name: 'الموارد البشرية', requests: 45, color: '#3CB593' },
    { name: 'المالية', requests: 38, color: '#60A5FA' },
    { name: 'التقنية', requests: 52, color: '#F59E0B' },
    { name: 'المبيعات', requests: 35, color: '#EF4444' },
    { name: 'التسويق', requests: 28, color: '#8B5CF6' }
  ];

  const slaComplianceData = [
    { department: 'الموارد البشرية', compliance: 95, avgTime: '2.3 ساعة' },
    { department: 'المالية', compliance: 88, avgTime: '3.1 ساعة' },
    { department: 'التقنية', compliance: 92, avgTime: '2.8 ساعة' },
    { department: 'المبيعات', compliance: 85, avgTime: '3.5 ساعة' },
    { department: 'التسويق', compliance: 90, avgTime: '2.9 ساعة' }
  ];

  const kpiCards: KPICard[] = [
    {
      title: 'إجمالي الطلبات',
      value: '1,248',
      change: '+12.5%',
      trend: 'up',
      icon: <FileText className="w-5 h-5" />,
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'معدل الموافقة',
      value: '87.2%',
      change: '+3.1%',
      trend: 'up',
      icon: <Target className="w-5 h-5" />,
      color: 'from-green-600 to-green-700'
    },
    {
      title: 'متوسط وقت المعالجة',
      value: '2.8 ساعة',
      change: '-15%',
      trend: 'up',
      icon: <Clock className="w-5 h-5" />,
      color: 'from-purple-600 to-purple-700'
    },
    {
      title: 'الطلبات المتجاوزة لـ SLA',
      value: '23',
      change: '-8.5%',
      trend: 'up',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'الموظفون النشطون',
      value: '342',
      change: '+5.2%',
      trend: 'up',
      icon: <Users className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'معدل الالتزام بـ SLA',
      value: '89.5%',
      change: '+2.3%',
      trend: 'up',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-indigo-600 to-indigo-700'
    }
  ];

  const agingRequests = [
    { id: 'REQ-2024-001', type: 'إجازة سنوية', employee: 'أحمد محمد', age: '5 أيام', priority: 'عالية' },
    { id: 'REQ-2024-002', type: 'بدل إقامة', employee: 'سارة أحمد', age: '3 أيام', priority: 'متوسطة' },
    { id: 'REQ-2024-003', type: 'سلفة راتب', employee: 'محمد علي', age: '7 أيام', priority: 'عالية' },
    { id: 'REQ-2024-004', type: 'شهادة راتب', employee: 'فاطمة خالد', age: '2 أيام', priority: 'عادية' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية':
        return 'bg-red-100 text-red-800';
      case 'متوسطة':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportReport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
    // Implementation for export functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">التقارير والتحليلات</h2>
          <p className="text-muted-foreground">تحليل شامل لأداء نظام الطلبات والإشعارات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportReport('pdf')}>
            <Download className="w-4 h-4 ml-2" />
            تصدير PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportReport('excel')}>
            <Download className="w-4 h-4 ml-2" />
            تصدير Excel
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 ml-2" />
            تقرير مجدول
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">المرشحات:</span>
            </div>
            <Input 
              type="date"
              placeholder="من تاريخ"
              className="w-40"
            />
            <Input 
              type="date"
              placeholder="إلى تاريخ"
              className="w-40"
            />
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="القسم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأقسام</SelectItem>
                <SelectItem value="hr">الموارد البشرية</SelectItem>
                <SelectItem value="finance">المالية</SelectItem>
                <SelectItem value="it">التقنية</SelectItem>
                <SelectItem value="sales">المبيعات</SelectItem>
                <SelectItem value="marketing">التسويق</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm">تطبيق المرشحات</Button>
            <Button size="sm" variant="outline">إعادة تعيين</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="sla">SLA والامتثال</TabsTrigger>
          <TabsTrigger value="aging">الطلبات القديمة</TabsTrigger>
          <TabsTrigger value="executive">التقرير التنفيذي</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiCards.map((kpi, index) => (
              <Card key={index} className={`bg-gradient-to-br ${kpi.color} text-white shadow-xl border-0`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    {kpi.icon}
                    <div>
                      <p className="text-white/80 text-sm">{kpi.title}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <div className="flex items-center gap-1 text-sm">
                        {kpi.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{kpi.change}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>اتجاه الطلبات الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={requestTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="requests" stackId="1" stroke="#3CB593" fill="#3CB593" />
                    <Area type="monotone" dataKey="approved" stackId="2" stroke="#60A5FA" fill="#60A5FA" />
                    <Area type="monotone" dataKey="rejected" stackId="3" stroke="#EF4444" fill="#EF4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الطلبات حسب القسم</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="requests" fill="#3CB593">
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sla" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>امتثال SLA حسب القسم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {slaComplianceData.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{dept.department}</p>
                        <p className="text-sm text-muted-foreground">متوسط الوقت: {dept.avgTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${dept.compliance}%` }}
                        />
                      </div>
                      <span className="font-bold text-lg">{dept.compliance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات المتقادمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agingRequests.map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{request.id}</p>
                        <p className="text-sm text-muted-foreground">{request.type} - {request.employee}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                      <span className="font-medium text-red-600">{request.age}</span>
                      <Button size="sm" variant="outline">معالجة</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="executive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الملخص التنفيذي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">النقاط الرئيسية</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      زيادة 12.5% في إجمالي الطلبات مقارنة بالشهر الماضي
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      تحسن 3.1% في معدل الموافقة على الطلبات
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full" />
                      انخفاض 15% في متوسط وقت معالجة الطلبات
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      23 طلب متجاوز لوقت SLA يتطلب متابعة عاجلة
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">التوصيات</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• تطبيق نظام التذكير التلقائي لتقليل الطلبات المتقادمة</li>
                    <li>• تدريب إضافي لقسم المبيعات لتحسين معدل الامتثال</li>
                    <li>• مراجعة سياسة SLA للطلبات المالية</li>
                    <li>• تفعيل نظام التصعيد التلقائي للطلبات الحرجة</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => exportReport('board-pack')}>
                  <Download className="w-4 h-4 ml-2" />
                  تصدير Board Pack
                </Button>
                <Button variant="outline" onClick={() => exportReport('executive-summary')}>
                  <Download className="w-4 h-4 ml-2" />
                  الملخص التنفيذي
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};