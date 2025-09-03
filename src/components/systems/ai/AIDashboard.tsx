import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, TrendingUp, Users, AlertTriangle, DollarSign, 
  Calendar, Target, Activity, Eye, Download
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AIDashboard = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const insights = [
    {
      title: isRTL ? 'خطر تسريب الموظفين' : 'Attrition Risk',
      value: '12%',
      change: '+2.1%',
      trend: 'up',
      description: isRTL ? 'في قسم المبيعات' : 'in Sales Department',
      icon: Users,
      color: 'destructive'
    },
    {
      title: isRTL ? 'اتجاهات الأداء' : 'Performance Trends',
      value: '87%',
      change: '+5.2%',
      trend: 'up',
      description: isRTL ? 'معدل الأداء العام' : 'Overall Performance Rate',
      icon: Target,
      color: 'success'
    },
    {
      title: isRTL ? 'أنماط الإجازات' : 'Leave Patterns',
      value: '23%',
      change: '+8.1%',
      trend: 'up',
      description: isRTL ? 'زيادة في الإجازات المرضية' : 'Increase in Sick Leaves',
      icon: Calendar,
      color: 'warning'
    },
    {
      title: isRTL ? 'مؤشر الرضا' : 'Satisfaction Index',
      value: '4.2/5',
      change: '+0.3',
      trend: 'up',
      description: isRTL ? 'رضا الموظفين العام' : 'Overall Employee Satisfaction',
      icon: Activity,
      color: 'primary'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'salary',
      title: isRTL ? 'شذوذ في الراتب' : 'Salary Anomaly',
      message: isRTL ? 'تم اكتشاف تضارب في راتب الموظف أحمد محمد' : 'Salary conflict detected for employee Ahmed Mohamed',
      severity: 'high',
      time: '10 دقائق'
    },
    {
      id: 2,
      type: 'compliance',
      title: isRTL ? 'مخاطر الامتثال' : 'Compliance Risk',
      message: isRTL ? '15 موظف لم يكملوا التدريب الإلزامي' : '15 employees have not completed mandatory training',
      severity: 'medium',
      time: '2 ساعات'
    },
    {
      id: 3,
      type: 'performance',
      title: isRTL ? 'تراجع في الأداء' : 'Performance Decline',
      message: isRTL ? 'انخفاض ملحوظ في أداء فريق التسويق' : 'Notable decline in Marketing team performance',
      severity: 'medium',
      time: '5 ساعات'
    }
  ];

  const chartData = [
    { month: 'Jan', predictions: 245, accuracy: 94, insights: 156 },
    { month: 'Feb', predictions: 268, accuracy: 96, insights: 178 },
    { month: 'Mar', predictions: 289, accuracy: 95, insights: 195 },
    { month: 'Apr', predictions: 312, accuracy: 97, insights: 223 },
    { month: 'May', predictions: 334, accuracy: 98, insights: 248 },
    { month: 'Jun', predictions: 356, accuracy: 99, insights: 267 }
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${insight.color}/10`}>
                  <insight.icon className={`h-5 w-5 text-${insight.color}`} />
                </div>
                <Badge variant={insight.trend === 'up' ? 'default' : 'secondary'}>
                  {insight.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {insight.title}
                </p>
                <p className="text-2xl font-bold">{insight.value}</p>
                <p className="text-xs text-muted-foreground">
                  {insight.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Performance Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {isRTL ? 'أداء الذكاء الاصطناعي' : 'AI Performance'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInsights" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="predictions" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorPredictions)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="insights" 
                    stroke="hsl(var(--chart-2))" 
                    fillOpacity={1} 
                    fill="url(#colorInsights)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {isRTL ? 'تنبيهات الذكاء الاصطناعي' : 'AI Alerts'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.severity === 'high' ? 'bg-destructive' : 
                        alert.severity === 'medium' ? 'bg-warning' : 'bg-success'
                      }`} />
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {isRTL ? `منذ ${alert.time}` : `${alert.time} ago`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {alert.message}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      {isRTL ? 'عرض' : 'View'}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs">
                      {isRTL ? 'تجاهل' : 'Dismiss'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <Brain className="h-6 w-6" />
              <span className="text-sm">{isRTL ? 'تدريب نموذج' : 'Train Model'}</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">{isRTL ? 'تحليل الاتجاهات' : 'Analyze Trends'}</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <Download className="h-6 w-6" />
              <span className="text-sm">{isRTL ? 'تصدير رؤى' : 'Export Insights'}</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <Activity className="h-6 w-6" />
              <span className="text-sm">{isRTL ? 'مراقبة النظام' : 'Monitor System'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIDashboard;