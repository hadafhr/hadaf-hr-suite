import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target,
  Download,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  Brain
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface ImpactData {
  id: string;
  initiative_id: string;
  measurement_type: 'performance' | 'cost' | 'satisfaction';
  before_value: number;
  after_value: number;
  improvement_percentage: number;
  measurement_date: string;
}

export const ImpactMeasurementDashboard = () => {
  const [impactData, setImpactData] = useState<ImpactData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadImpactData();
  }, []);

  const loadImpactData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('od_impact_measurements')
        .select('*')
        .order('measurement_date', { ascending: false });

      if (error) throw error;
      setImpactData((data || []).map(item => ({
        ...item,
        measurement_type: item.measurement_type as 'performance' | 'cost' | 'satisfaction'
      })));
    } catch (error) {
      console.error('Error loading impact data:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل بيانات قياس الأثر',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const mockPerformanceComparison = [
    { name: 'يناير', before: 65, after: 78 },
    { name: 'فبراير', before: 68, after: 82 },
    { name: 'مارس', before: 70, after: 85 },
    { name: 'أبريل', before: 72, after: 88 },
    { name: 'مايو', before: 75, after: 91 },
    { name: 'يونيو', before: 77, after: 94 }
  ];

  const mockCostComparison = [
    { name: 'الأداء', before: 100000, after: 85000, improvement: 15 },
    { name: 'التكلفة', before: 250000, after: 200000, improvement: 20 },
    { name: 'الرضا', before: 3.2, after: 4.1, improvement: 28 }
  ];

  const impactColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  const getImprovementIcon = (percentage: number) => {
    return percentage > 0 ? (
      <div className="flex items-center text-green-600">
        <ArrowUp className="h-4 w-4 mr-1" />
        <span className="font-medium">+{percentage}%</span>
      </div>
    ) : (
      <div className="flex items-center text-red-600">
        <ArrowDown className="h-4 w-4 mr-1" />
        <span className="font-medium">{percentage}%</span>
      </div>
    );
  };

  const getImprovementColor = (percentage: number) => {
    return percentage > 0 ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200';
  };

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
          <h2 className="text-2xl font-bold">لوحة قياس الأثر المؤسسي</h2>
          <p className="text-muted-foreground">مقارنة الأداء قبل وبعد التطوير مع مؤشرات التحسن</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            فلترة
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            الفترة الزمنية
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Key Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">تحسن الأداء</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-2xl font-bold text-green-600">+18%</div>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">خفض التكلفة</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-2xl font-bold text-blue-600">-22%</div>
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">رضا الموظفين</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-2xl font-bold text-yellow-600">+28%</div>
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ROI إجمالي</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-2xl font-bold text-purple-600">325%</div>
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Before vs After Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              مقارنة الأداء: قبل وبعد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockPerformanceComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="before" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="قبل التطوير" />
                <Area type="monotone" dataKey="after" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="بعد التطوير" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              مؤشرات التحسن الرئيسية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockCostComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="improvement" fill="#3b82f6" radius={[4, 4, 0, 0]} name="نسبة التحسن %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>تحليل تفصيلي للأثر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCostComparison.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {index === 0 && <Target className="h-5 w-5 text-primary" />}
                    {index === 1 && <DollarSign className="h-5 w-5 text-primary" />}
                    {index === 2 && <Users className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      قبل: {item.before.toLocaleString()} → بعد: {item.after.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getImprovementColor(item.improvement)}>
                    {getImprovementIcon(item.improvement)}
                  </Badge>
                  <Progress value={item.improvement} className="w-20 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">تحسن الأداء في قسم المبيعات بنسبة 25% بعد تطبيق برنامج التدريب الجديد</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">انخفضت تكاليف التشغيل بنسبة 18% نتيجة أتمتة العمليات الإدارية</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm">يُنصح بالتركيز على تطوير قسم خدمة العملاء لتحقيق أقصى استفادة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};