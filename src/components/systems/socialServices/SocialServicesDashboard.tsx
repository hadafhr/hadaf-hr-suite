import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  DollarSign, 
  Heart, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Home,
  HandHeart,
  Calendar,
  Award,
  ArrowUp,
  ArrowDown,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

export const SocialServicesDashboard = () => {
  const kpiData = [
    {
      title: 'إجمالي حالات الدعم النشطة',
      value: '342',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'حالة دعم قيد المعالجة'
    },
    {
      title: 'البرامج المساعدة النشطة',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: Heart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'برنامج مساعدة متاح'
    },
    {
      title: 'الموظفين المستفيدين',
      value: '1,247',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'موظف استفاد من الدعم'
    },
    {
      title: 'إجمالي المبالغ المصروفة',
      value: '₪2.8M',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'شيكل صُرف هذا العام'
    }
  ];

  const programData = [
    { name: 'مساعدة طبية', value: 145, color: '#0ea5e9' },
    { name: 'دعم تعليمي', value: 89, color: '#10b981' },
    { name: 'إعانة زواج', value: 67, color: '#f59e0b' },
    { name: 'دعم إسكان', value: 41, color: '#ef4444' },
    { name: 'مساعدة طوارئ', value: 23, color: '#8b5cf6' }
  ];

  const monthlyTrends = [
    { month: 'يناير', cases: 45, amount: 180000 },
    { month: 'فبراير', cases: 52, amount: 205000 },
    { month: 'مارس', cases: 48, amount: 195000 },
    { month: 'أبريل', cases: 61, amount: 240000 },
    { month: 'مايو', cases: 58, amount: 230000 },
    { month: 'يونيو', cases: 67, amount: 265000 }
  ];

  const pendingRequests = [
    { id: 'REQ-2024-001', employee: 'أحمد محمد علي', type: 'مساعدة طبية', amount: '12,000 ₪', priority: 'urgent', date: '2024-01-15' },
    { id: 'REQ-2024-002', employee: 'فاطمة أحمد', type: 'دعم تعليمي', amount: '8,500 ₪', priority: 'high', date: '2024-01-14' },
    { id: 'REQ-2024-003', employee: 'محمد سالم', type: 'إعانة زواج', amount: '15,000 ₪', priority: 'normal', date: '2024-01-13' },
    { id: 'REQ-2024-004', employee: 'نورا عبدالله', type: 'مساعدة طوارئ', amount: '5,000 ₪', priority: 'urgent', date: '2024-01-12' }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">عاجل</Badge>;
      case 'high':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">مهم</Badge>;
      default:
        return <Badge variant="outline">عادي</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.trend === 'up';
          
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <div className="flex items-end space-x-2 rtl:space-x-reverse">
                      <h3 className="text-3xl font-bold text-foreground">{kpi.value}</h3>
                      <div className={`flex items-center space-x-1 rtl:space-x-reverse ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        <span className="text-sm font-medium">{kpi.change}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{kpi.description}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg font-semibold">
              <Heart className="h-5 w-5 text-primary mr-2" />
              توزيع البرامج المساعدة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {programData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg font-semibold">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              الاتجاهات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="cases" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                    name="عدد الحالات"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#0ea5e9"
                    name="المبلغ المصروف"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg font-semibold">
              <Clock className="h-5 w-5 text-primary mr-2" />
              الطلبات المعلقة ({pendingRequests.length})
            </CardTitle>
            <Button size="sm" variant="outline">
              عرض الكل
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                      <h4 className="font-medium text-foreground">{request.employee}</h4>
                      {getPriorityBadge(request.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground">{request.type} • {request.amount}</p>
                    <p className="text-xs text-muted-foreground">{request.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button size="sm" variant="outline">
                    مراجعة
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    موافقة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">برنامج دعم جديد</h3>
            <p className="text-sm text-muted-foreground mb-4">إنشاء برنامج مساعدة جديد للموظفين</p>
            <Button className="w-full bg-primary hover:bg-primary/90">
              إضافة برنامج
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-green-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <HandHeart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">حملة تطوعية</h3>
            <p className="text-sm text-muted-foreground mb-4">تنظيم حملة تطوعية جديدة للموظفين</p>
            <Button variant="outline" className="w-full">
              تنظيم حملة
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">تقرير شامل</h3>
            <p className="text-sm text-muted-foreground mb-4">إنشاء تقرير شامل عن الأنشطة</p>
            <Button variant="outline" className="w-full">
              إنشاء تقرير
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};