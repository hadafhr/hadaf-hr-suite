import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Smile, 
  Frown, 
  Meh, 
  Heart,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  Calendar,
  Plus,
  AlertTriangle,
  Brain,
  ThermometerSun
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';

interface HappinessData {
  id: string;
  department: string;
  score: number;
  measurement_date: string;
  employee_count: number;
  trend?: 'up' | 'down' | 'stable';
}

export const HappinessIndexIntegration = () => {
  const [happinessData, setHappinessData] = useState<HappinessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewMeasurementOpen, setIsNewMeasurementOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadHappinessData();
  }, []);

  const loadHappinessData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('od_happiness_measurements')
        .select('*')
        .order('measurement_date', { ascending: false });

      if (error) throw error;
      
      const formattedData = data?.map(item => ({
        id: item.id,
        department: item.department,
        score: parseFloat(item.score.toString()),
        measurement_date: item.measurement_date,
        employee_count: item.employee_count,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down' as 'up' | 'down' | 'stable'
      })) || [];

      setHappinessData(formattedData);
    } catch (error) {
      console.error('Error loading happiness data:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل بيانات السعادة',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addHappinessMeasurement = async (measurementData: any) => {
    try {
      const { data, error } = await supabase
        .from('od_happiness_measurements')
        .insert([{
          ...measurementData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'نجح الحفظ',
        description: 'تم إضافة قياس السعادة بنجاح'
      });

      loadHappinessData();
      setIsNewMeasurementOpen(false);
    } catch (error) {
      console.error('Error adding happiness measurement:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة قياس السعادة',
        variant: 'destructive'
      });
    }
  };

  // Mock trend data
  const trendData = [
    { month: 'يناير', overall: 3.8, hr: 4.1, sales: 3.6, tech: 4.2 },
    { month: 'فبراير', overall: 3.9, hr: 4.2, sales: 3.8, tech: 4.0 },
    { month: 'مارس', overall: 4.1, hr: 4.3, sales: 3.9, tech: 4.1 },
    { month: 'أبريل', overall: 4.0, hr: 4.1, sales: 4.2, tech: 3.8 },
    { month: 'مايو', overall: 4.2, hr: 4.4, sales: 4.1, tech: 4.0 },
    { month: 'يونيو', overall: 4.3, hr: 4.5, sales: 4.3, tech: 4.1 }
  ];

  const gaugeData = [
    { name: 'السعادة', value: 85, fill: '#22c55e' }
  ];

  const departmentColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getHappinessIcon = (score: number) => {
    if (score >= 4) return <Smile className="h-5 w-5 text-green-500" />;
    if (score >= 3) return <Meh className="h-5 w-5 text-yellow-500" />;
    return <Frown className="h-5 w-5 text-red-500" />;
  };

  const getHappinessColor = (score: number) => {
    if (score >= 4) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 3) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const averageScore = happinessData.length > 0 
    ? (happinessData.reduce((sum, item) => sum + item.score, 0) / happinessData.length).toFixed(1)
    : '0.0';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مؤشر السعادة الوظيفية</h2>
          <p className="text-muted-foreground">قياس ومتابعة مستويات الرضا والسعادة حسب الإدارات والفترات</p>
        </div>
        <Dialog open={isNewMeasurementOpen} onOpenChange={setIsNewMeasurementOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              قياس جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة قياس سعادة جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = {
                department: formData.get('department'),
                score: parseFloat(formData.get('score') as string),
                employee_count: parseInt(formData.get('employee_count') as string),
                measurement_date: formData.get('measurement_date') || new Date().toISOString().split('T')[0]
              };
              addHappinessMeasurement(data);
            }}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">القسم</label>
                  <Input name="department" placeholder="اسم القسم" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">النتيجة (من 5)</label>
                  <Input name="score" type="number" step="0.1" min="0" max="5" placeholder="4.5" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">عدد الموظفين</label>
                  <Input name="employee_count" type="number" placeholder="25" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">تاريخ القياس</label>
                  <Input name="measurement_date" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsNewMeasurementOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">
                  حفظ القياس
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Happiness Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-6 text-center">
            <ThermometerSun className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-600">{averageScore}</div>
            <p className="text-sm text-muted-foreground">المتوسط العام</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {getHappinessIcon(parseFloat(averageScore))}
              <span className="text-xs text-muted-foreground">من 5</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">+12%</div>
            <p className="text-sm text-muted-foreground">التحسن الشهري</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {happinessData.reduce((sum, item) => sum + item.employee_count, 0)}
            </div>
            <p className="text-sm text-muted-foreground">إجمالي المشاركين</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-6 text-center">
            <Building className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">
              {happinessData.filter(item => item.score < 3).length}
            </div>
            <p className="text-sm text-muted-foreground">أقسام تحتاج اهتمام</p>
            {happinessData.filter(item => item.score < 3).length > 0 && (
              <Badge variant="destructive" className="mt-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                تنبيه
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Happiness Trends and Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              اتجاهات السعادة عبر الزمن
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="overall" stroke="#22c55e" strokeWidth={3} name="المتوسط العام" />
                <Line type="monotone" dataKey="hr" stroke="#3b82f6" strokeWidth={2} name="الموارد البشرية" />
                <Line type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={2} name="المبيعات" />
                <Line type="monotone" dataKey="tech" stroke="#8b5cf6" strokeWidth={2} name="التقنية" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              مؤشر السعادة الحالي
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={gaugeData}>
                <RadialBar dataKey="value" cornerRadius={10} fill="#22c55e" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-current text-2xl font-bold">
                  85%
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Details */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل السعادة حسب الأقسام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {happinessData.map((dept, index) => (
              <div key={dept.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{dept.department}</h4>
                    <p className="text-sm text-muted-foreground">{dept.employee_count} موظف</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {getHappinessIcon(dept.score)}
                      <span className="font-medium">{dept.score.toFixed(1)}</span>
                    </div>
                    <Progress value={(dept.score / 5) * 100} className="w-20 mt-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(dept.trend || 'stable')}
                    <Badge className={getHappinessColor(dept.score)}>
                      {dept.score >= 4 ? 'ممتاز' : dept.score >= 3 ? 'جيد' : 'يحتاج تحسين'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {happinessData.length === 0 && (
            <div className="text-center py-8">
              <Smile className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">لا توجد قياسات سعادة حالياً</p>
              <Button className="mt-4" onClick={() => setIsNewMeasurementOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                إضافة قياس جديد
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            توصيات الذكاء الاصطناعي لتحسين السعادة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">قسم الموارد البشرية يحقق أعلى مستويات السعادة - يُنصح بتطبيق نفس الممارسات في الأقسام الأخرى</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">يُلاحظ انخفاض طفيف في السعادة خلال نهاية الربع المالي - يُنصح بتنظيم فعاليات تحفيزية</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">تنبيه: قسم المبيعات يحتاج إلى اهتمام فوري لتحسين مستوى السعادة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};