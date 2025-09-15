import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Target,
  AlertTriangle,
  CheckCircle,
  Brain,
  Calendar,
  Download,
  RefreshCw,
  Zap,
  Award,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useAdvancedBudgetKPIs, useBudgetForecasts } from '@/hooks/useBudget';

const AdvancedBudgetAnalytics: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewType, setViewType] = useState<'overview' | 'trends' | 'forecasts' | 'variance'>('overview');
  const { detailedKpis, loading } = useAdvancedBudgetKPIs(selectedYear);
  const { forecasts } = useBudgetForecasts(selectedYear);

  // Mock data for advanced analytics
  const monthlyTrends = [
    { month: 'يناير', actual: 420000, budget: 400000, forecast: 410000, variance: 5 },
    { month: 'فبراير', actual: 385000, budget: 400000, forecast: 395000, variance: -3.75 },
    { month: 'مارس', actual: 445000, budget: 400000, forecast: 425000, variance: 11.25 },
    { month: 'أبريل', actual: 390000, budget: 400000, forecast: 400000, variance: -2.5 },
    { month: 'مايو', actual: 420000, budget: 400000, forecast: 415000, variance: 5 },
    { month: 'يونيو', actual: 405000, budget: 400000, forecast: 402000, variance: 1.25 }
  ];

  const varianceAnalysis = detailedKpis.map((kpi, index) => ({
    category: kpi.category_name_ar,
    variance: kpi.variance_amount,
    percentage: ((kpi.variance_amount / kpi.allocated_amount) * 100),
    status: kpi.status_indicator,
    utilization: kpi.utilization_percentage
  }));

  const performanceRadar = [
    { category: 'الالتزام بالميزانية', value: 85, fullMark: 100 },
    { category: 'دقة التوقعات', value: 78, fullMark: 100 },
    { category: 'سرعة الصرف', value: 92, fullMark: 100 },
    { category: 'كفاءة التخصيص', value: 88, fullMark: 100 },
    { category: 'الرقابة المالية', value: 95, fullMark: 100 },
    { category: 'الشفافية', value: 90, fullMark: 100 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Target className="h-4 w-4 text-gray-500" />;
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 10) return 'text-red-600';
    if (variance > 5) return 'text-orange-600';
    if (variance < -5) return 'text-blue-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">جاري تحميل التحليلات المتقدمة...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const OverviewAnalytics = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">87.3%</p>
                <p className="text-sm text-muted-foreground">دقة التوقعات</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.1% من الشهر السابق
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">94.5%</p>
                <p className="text-sm text-muted-foreground">كفاءة التخصيص</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +1.8% من الشهر السابق
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-2xl font-bold">78.2%</p>
                <p className="text-sm text-muted-foreground">نضج العمليات</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-orange-600 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -0.5% من الشهر السابق
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">91.7%</p>
                <p className="text-sm text-muted-foreground">النتيجة الإجمالية</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +1.2% من الشهر السابق
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            تحليل الأداء الشامل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={performanceRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={0} domain={[0, 100]} />
              <Radar 
                name="الأداء الحالي" 
                dataKey="value" 
                stroke="#009F87" 
                fill="#009F87" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const TrendsAnalysis = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          تحليل الاتجاهات الشهرية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} ريال`]} />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#009F87" name="الفعلي" strokeWidth={2} />
            <Line type="monotone" dataKey="budget" stroke="#0088FE" name="المخطط" strokeWidth={2} />
            <Line type="monotone" dataKey="forecast" stroke="#FFBB28" name="التوقع" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const VarianceAnalysisView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          تحليل الانحرافات حسب البند
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>البند</TableHead>
              <TableHead>الانحراف (ريال)</TableHead>
              <TableHead>نسبة الانحراف</TableHead>
              <TableHead>نسبة الاستخدام</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {varianceAnalysis.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell className={getVarianceColor(item.percentage)}>
                  {item.variance > 0 ? '+' : ''}{item.variance.toLocaleString()} ريال
                </TableCell>
                <TableCell className={getVarianceColor(item.percentage)}>
                  {item.percentage > 0 ? '+' : ''}{item.percentage.toFixed(1)}%
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.utilization > 90 ? 'bg-red-500' : 
                          item.utilization > 75 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(item.utilization, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{item.utilization.toFixed(1)}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <Badge variant={
                      item.status === 'good' ? 'default' :
                      item.status === 'warning' ? 'secondary' : 'destructive'
                    }>
                      {item.status === 'good' ? 'جيد' :
                       item.status === 'warning' ? 'تحذير' :
                       item.status === 'critical' ? 'حرج' : 'لا يوجد ميزانية'}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const ForecastsView = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          التوقعات الذكية بالذكاء الاصطناعي
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">توقع نهاية العام</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">8.75 مليون ريال</p>
              <p className="text-sm text-blue-700">إجمالي المصروفات المتوقعة</p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">تحذير متوقع</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">3 بنود</p>
              <p className="text-sm text-orange-700">ستتجاوز الميزانية المخصصة</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">فرص توفير</span>
              </div>
              <p className="text-2xl font-bold text-green-900">1.2 مليون ريال</p>
              <p className="text-sm text-green-700">إمكانية توفير متوقعة</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">توصيات الذكاء الاصطناعي</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white rounded border">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-red-800">تحذير عالي الأولوية</p>
                  <p className="text-sm text-gray-600">بند "الأنظمة والتقنية" متوقع تجاوز الميزانية بنسبة 23% بحلول نهاية العام</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white rounded border">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-orange-800">توصية للتحسين</p>
                  <p className="text-sm text-gray-600">يمكن إعادة توزيع 400,000 ريال من بند "جودة الحياة" إلى "التدريب والتطوير"</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white rounded border">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-green-800">فرصة توفير</p>
                  <p className="text-sm text-gray-600">تحسين كفاءة الإنفاق في "العمليات الإدارية" يمكن أن يوفر 15% من المخصص</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[2022, 2023, 2024, 2025].map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={viewType} onValueChange={(value: any) => setViewType(value)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">نظرة شاملة</SelectItem>
              <SelectItem value="trends">تحليل الاتجاهات</SelectItem>
              <SelectItem value="forecasts">التوقعات الذكية</SelectItem>
              <SelectItem value="variance">تحليل الانحرافات</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث البيانات
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {viewType === 'overview' && <OverviewAnalytics />}
      {viewType === 'trends' && <TrendsAnalysis />}
      {viewType === 'variance' && <VarianceAnalysisView />}
      {viewType === 'forecasts' && <ForecastsView />}
    </div>
  );
};

export default AdvancedBudgetAnalytics;