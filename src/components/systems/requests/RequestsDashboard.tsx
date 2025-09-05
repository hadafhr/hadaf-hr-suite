import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Users,
  AlertTriangle,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export const RequestsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data
  const requestTrendData = [
    { month: 'يناير', total: 120, approved: 95, pending: 15, rejected: 10 },
    { month: 'فبراير', total: 145, approved: 115, pending: 20, rejected: 10 },
    { month: 'مارس', total: 165, approved: 130, pending: 25, rejected: 10 },
    { month: 'أبريل', total: 180, approved: 145, pending: 20, rejected: 15 },
    { month: 'مايو', total: 200, approved: 160, pending: 25, rejected: 15 },
    { month: 'يونيو', total: 185, approved: 150, pending: 20, rejected: 15 }
  ];

  const requestTypeData = [
    { name: 'إجازات', value: 35, count: 168 },
    { name: 'بدلات', value: 25, count: 120 },
    { name: 'سلف', value: 20, count: 96 },
    { name: 'وثائق', value: 15, count: 72 },
    { name: 'أخرى', value: 5, count: 24 }
  ];

  const recentRequests = [
    { id: 'REQ-2024-001', type: 'إجازة سنوية', employee: 'أحمد محمد', status: 'pending', date: '2024-01-15', priority: 'عادية' },
    { id: 'REQ-2024-002', type: 'بدل إقامة', employee: 'سارة أحمد', status: 'approved', date: '2024-01-15', priority: 'متوسطة' },
    { id: 'REQ-2024-003', type: 'سلفة راتب', employee: 'محمد علي', status: 'pending', date: '2024-01-14', priority: 'عالية' },
    { id: 'REQ-2024-004', type: 'شهادة راتب', employee: 'فاطمة خالد', status: 'approved', date: '2024-01-14', priority: 'عادية' },
    { id: 'REQ-2024-005', type: 'إجازة مرضية', employee: 'خالد أحمد', status: 'rejected', date: '2024-01-13', priority: 'عالية' }
  ];

  const COLORS = ['#3CB593', '#60A5FA', '#F59E0B', '#EF4444', '#8B5CF6'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">لوحة تحكم الطلبات</h2>
          <p className="text-muted-foreground">نظرة شاملة على حالة جميع الطلبات والأنشطة</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            طلب جديد
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            فلترة
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معلقة</p>
                <p className="text-2xl font-bold">95</p>
                <p className="text-xs text-muted-foreground">-5% من الشهر الماضي</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معتمدة</p>
                <p className="text-2xl font-bold">1,085</p>
                <p className="text-xs text-muted-foreground">+8% من الشهر الماضي</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متجاوزة SLA</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-muted-foreground">تحتاج متابعة عاجلة</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
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
                <Area type="monotone" dataKey="total" stackId="1" stroke="#3CB593" fill="#3CB593" fillOpacity={0.6} />
                <Area type="monotone" dataKey="approved" stackId="2" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.6} />
                <Area type="monotone" dataKey="rejected" stackId="3" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع أنواع الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={requestTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {requestTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>أحدث الطلبات</span>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 ml-2" />
              عرض الكل
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRequests.map((request, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div className="flex items-center gap-4">
                  {getStatusIcon(request.status)}
                  <div>
                    <p className="font-medium">{request.id}</p>
                    <p className="text-sm text-muted-foreground">{request.type} - {request.employee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status === 'approved' ? 'معتمد' : request.status === 'rejected' ? 'مرفوض' : 'معلق'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{request.date}</span>
                  <Button variant="outline" size="sm">عرض</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};