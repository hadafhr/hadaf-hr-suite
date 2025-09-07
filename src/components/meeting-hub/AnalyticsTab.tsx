import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users,
  Clock,
  Calendar,
  Video,
  Brain,
  Target,
  Award,
  Activity
} from 'lucide-react';
import { meetingService } from '@/services/meetingService';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  meetingsByType: Array<{ name: string; value: number; color: string }>;
  meetingsByStatus: Array<{ name: string; value: number; color: string }>;
  monthlyTrend: Array<{ month: string; meetings: number; attendance: number }>;
  topParticipants: Array<{ name: string; meetings: number; attendance: number }>;
  timeDistribution: Array<{ hour: string; meetings: number }>;
  productivityMetrics: {
    averageDuration: number;
    attendanceRate: number;
    completionRate: number;
    engagementScore: number;
  };
  insights: Array<{
    type: 'success' | 'warning' | 'info';
    title: string;
    description: string;
    value?: string;
  }>;
}

export const AnalyticsTab: React.FC = () => {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('3months');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, you would fetch this data from the API
      // For now, we'll use mock data based on the time range
      const mockAnalytics: AnalyticsData = {
        meetingsByType: [
          { name: 'فريق', value: 45, color: '#10B981' },
          { name: 'إلكتروني', value: 35, color: '#3B82F6' },
          { name: 'مجلس إدارة', value: 12, color: '#8B5CF6' },
          { name: 'تنفيذي', value: 8, color: '#F59E0B' }
        ],
        meetingsByStatus: [
          { name: 'مكتملة', value: 78, color: '#10B981' },
          { name: 'مجدولة', value: 15, color: '#3B82F6' },
          { name: 'جارية', value: 5, color: '#F59E0B' },
          { name: 'ملغية', value: 2, color: '#EF4444' }
        ],
        monthlyTrend: [
          { month: 'يناير', meetings: 45, attendance: 87 },
          { month: 'فبراير', meetings: 52, attendance: 91 },
          { month: 'مارس', meetings: 48, attendance: 88 },
          { month: 'أبريل', meetings: 55, attendance: 92 },
          { month: 'مايو', meetings: 49, attendance: 89 },
          { month: 'يونيو', meetings: 58, attendance: 94 }
        ],
        topParticipants: [
          { name: 'أحمد محمد', meetings: 45, attendance: 98 },
          { name: 'سارة أحمد', meetings: 42, attendance: 95 },
          { name: 'محمد خالد', meetings: 38, attendance: 92 },
          { name: 'فاطمة علي', meetings: 35, attendance: 90 },
          { name: 'علي حسن', meetings: 32, attendance: 88 }
        ],
        timeDistribution: [
          { hour: '8:00', meetings: 5 },
          { hour: '9:00', meetings: 12 },
          { hour: '10:00', meetings: 18 },
          { hour: '11:00', meetings: 15 },
          { hour: '12:00', meetings: 8 },
          { hour: '13:00', meetings: 6 },
          { hour: '14:00', meetings: 14 },
          { hour: '15:00', meetings: 10 },
          { hour: '16:00', meetings: 7 },
          { hour: '17:00', meetings: 3 }
        ],
        productivityMetrics: {
          averageDuration: 75,
          attendanceRate: 91,
          completionRate: 94,
          engagementScore: 87
        },
        insights: [
          {
            type: 'success',
            title: 'أداء ممتاز',
            description: 'معدل الحضور في الاجتماعات أعلى من المتوسط',
            value: '+8%'
          },
          {
            type: 'info',
            title: 'وقت مثالي',
            description: 'معظم الاجتماعات تتم في الفترة الصباحية',
            value: '65%'
          },
          {
            type: 'warning',
            title: 'تحسين مطلوب',
            description: 'بعض الاجتماعات تتجاوز الوقت المحدد',
            value: '12%'
          },
          {
            type: 'success',
            title: 'مشاركة فعالة',
            description: 'زيادة في استخدام ميزة مشاركة الملفات',
            value: '+25%'
          }
        ]
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast({
        title: "خطأ في تحميل التحليلات",
        description: "حدث خطأ أثناء تحميل بيانات التحليلات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              تحليلات الاجتماعات
            </CardTitle>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">الشهر الماضي</SelectItem>
                <SelectItem value="3months">آخر 3 أشهر</SelectItem>
                <SelectItem value="6months">آخر 6 أشهر</SelectItem>
                <SelectItem value="1year">السنة الماضية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط المدة</p>
                <p className="text-2xl font-bold">{analytics.productivityMetrics.averageDuration} دقيقة</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+5% من الشهر الماضي</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معدل الحضور</p>
                <p className="text-2xl font-bold">{analytics.productivityMetrics.attendanceRate}%</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+3% من الشهر الماضي</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معدل الإكمال</p>
                <p className="text-2xl font-bold">{analytics.productivityMetrics.completionRate}%</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+2% من الشهر الماضي</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">نقاط المشاركة</p>
                <p className="text-2xl font-bold">{analytics.productivityMetrics.engagementScore}/100</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+7% من الشهر الماضي</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>الاتجاه الشهري للاجتماعات</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="meetings" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="attendance" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Meetings by Type */}
        <Card>
          <CardHeader>
            <CardTitle>الاجتماعات حسب النوع</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.meetingsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.meetingsByType.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع الاجتماعات خلال اليوم</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.timeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="meetings" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Participants */}
        <Card>
          <CardHeader>
            <CardTitle>أكثر المشاركين نشاطاً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topParticipants.map((participant, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-muted-foreground">{participant.meetings} اجتماع</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{participant.attendance}%</p>
                    <p className="text-xs text-muted-foreground">معدل الحضور</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <div className={`p-2 rounded-full ${
                  insight.type === 'success' ? 'bg-green-100' :
                  insight.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {insight.type === 'success' ? (
                    <Award className="h-4 w-4 text-green-600" />
                  ) : insight.type === 'warning' ? (
                    <TrendingDown className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    {insight.value && (
                      <Badge variant="outline" className={
                        insight.type === 'success' ? 'text-green-600 border-green-200' :
                        insight.type === 'warning' ? 'text-yellow-600 border-yellow-200' :
                        'text-blue-600 border-blue-200'
                      }>
                        {insight.value}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meeting Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>توزيع حالات الاجتماعات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {analytics.meetingsByStatus.map((status, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: status.color + '20' }}>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: status.color }}></div>
                </div>
                <p className="font-medium text-lg">{status.value}</p>
                <p className="text-sm text-muted-foreground">{status.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatPercentage(status.value, analytics.meetingsByStatus.reduce((sum, s) => sum + s.value, 0))}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};