import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Area,
  AreaChart
} from 'recharts';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Scale,
  FileText,
  Users,
  Calendar,
  Target,
  Zap,
  Shield,
  RefreshCw,
  Download
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const AIAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<any[]>([]);

  // Load AI insights from database
  useEffect(() => {
    loadAIInsights();
  }, [selectedPeriod, selectedDepartment]);

  const loadAIInsights = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('insights-risks', {
        body: { 
          action: 'analyze_legal_risks',
          period: selectedPeriod,
          department: selectedDepartment
        }
      });

      if (error) throw error;
      setAiInsights(data?.insights || []);
    } catch (error) {
      console.error('Error loading AI insights:', error);
      toast.error('خطأ في تحميل التحليلات الذكية');
    } finally {
      setIsLoading(false);
    }
  };

  const legalRisksByDepartment = [
    { department: 'الموارد البشرية', high: 12, medium: 8, low: 3, total: 23 },
    { department: 'تقنية المعلومات', high: 5, medium: 12, low: 8, total: 25 },
    { department: 'المالية', high: 8, medium: 6, low: 2, total: 16 },
    { department: 'التسويق', high: 3, medium: 9, low: 12, total: 24 },
    { department: 'العمليات', high: 7, medium: 11, low: 5, total: 23 }
  ];

  const disputeTrends = [
    { month: 'يناير', disputes: 8, resolved: 6, pending: 2, cost: 45000 },
    { month: 'فبراير', disputes: 12, resolved: 9, pending: 3, cost: 67000 },
    { month: 'مارس', disputes: 6, resolved: 5, pending: 1, cost: 32000 },
    { month: 'أبريل', disputes: 15, resolved: 10, pending: 5, cost: 89000 },
    { month: 'مايو', disputes: 9, resolved: 8, pending: 1, cost: 51000 },
    { month: 'يونيو', disputes: 11, resolved: 7, pending: 4, cost: 73000 }
  ];

  const contractRisks = [
    { type: 'عقود التوظيف', risk: 15, color: '#ef4444' },
    { type: 'عقود التوريد', risk: 25, color: '#f97316' },
    { type: 'اتفاقيات الشراكة', risk: 8, color: '#eab308' },
    { type: 'عقود الاستشارة', risk: 12, color: '#22c55e' },
    { type: 'اتفاقيات السرية', risk: 5, color: '#3b82f6' }
  ];

  const complianceScores = [
    { month: 'يناير', score: 92 },
    { month: 'فبراير', score: 89 },
    { month: 'مارس', score: 94 },
    { month: 'أبريل', score: 87 },
    { month: 'مايو', score: 96 },
    { month: 'يونيو', score: 93 }
  ];

  const predictiveInsights = [
    {
      id: 1,
      type: 'dispute_prediction',
      title: 'توقع نزاع عمالي محتمل',
      description: 'النمط يشير إلى احتمالية نزاع في قسم تقنية المعلومات خلال الأسبوعين القادمين',
      probability: 78,
      department: 'تقنية المعلومات',
      timeline: '2-3 أسابيع',
      impact: 'متوسط',
      recommendedAction: 'مراجعة سياسات العمل الإضافي وجدولة اجتماع مع الفريق'
    },
    {
      id: 2,
      type: 'contract_expiry',
      title: 'عقود قريبة من الانتهاء',
      description: '15 عقد توظيف ستنتهي خلال الشهرين القادمين',
      probability: 100,
      department: 'الموارد البشرية',
      timeline: '30-60 يوم',
      impact: 'عالي',
      recommendedAction: 'بدء إجراءات التجديد أو الاستبدال فوراً'
    },
    {
      id: 3,
      type: 'compliance_risk',
      title: 'مخاطر امتثال محتملة',
      description: 'تحديثات متوقعة في لوائح GOSI قد تؤثر على السياسات الحالية',
      probability: 65,
      department: 'المالية',
      timeline: '1-2 شهر',
      impact: 'عالي',
      recommendedAction: 'مراقبة التحديثات التنظيمية وتحضير خطة التكيف'
    }
  ];

  const aiMetrics = [
    {
      title: 'دقة التنبؤ',
      value: '87%',
      change: '+5%',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'المخاطر المكتشفة',
      value: '23',
      change: '+3',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'التوفير المتوقع',
      value: '2.4م ريال',
      change: '+15%',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'سرعة الاستجابة',
      value: '1.2 يوم',
      change: '-0.3 يوم',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const generateAIReport = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('insights-risks', {
        body: { 
          action: 'generate_comprehensive_report',
          period: selectedPeriod,
          department: selectedDepartment,
          include_predictions: true
        }
      });

      if (error) throw error;
      
      toast.success('تم إنشاء التقرير الذكي بنجاح');
      
      // Here you would typically download or display the generated report
      console.log('Generated AI Report:', data);
      
    } catch (error) {
      console.error('Error generating AI report:', error);
      toast.error('خطأ في إنشاء التقرير الذكي');
    } finally {
      setIsLoading(false);
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-red-600 bg-red-100';
    if (probability >= 60) return 'text-orange-600 bg-orange-100';
    if (probability >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getImpactBadge = (impact: string) => {
    const impactConfig = {
      'عالي': 'bg-red-100 text-red-800',
      'متوسط': 'bg-yellow-100 text-yellow-800',
      'منخفض': 'bg-green-100 text-green-800'
    };
    
    return <Badge className={impactConfig[impact as keyof typeof impactConfig]}>{impact}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">التحليلات والتنبؤات الذكية</h2>
          <p className="text-gray-600 mt-2">رؤى متقدمة ومؤشرات تنبؤية للمخاطر القانونية</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 أشهر</SelectItem>
              <SelectItem value="6months">6 أشهر</SelectItem>
              <SelectItem value="12months">سنة</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأقسام</SelectItem>
              <SelectItem value="hr">الموارد البشرية</SelectItem>
              <SelectItem value="it">تقنية المعلومات</SelectItem>
              <SelectItem value="finance">المالية</SelectItem>
              <SelectItem value="marketing">التسويق</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateAIReport} disabled={isLoading}>
            <Brain className={`ml-2 h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
            تقرير ذكي
          </Button>
        </div>
      </div>

      {/* AI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600">{metric.change}</span>
                    <span className="text-sm text-gray-600 mr-1">هذا الشهر</span>
                  </div>
                </div>
                <div className={`${metric.bgColor} p-3 rounded-full`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Predictive Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            التنبؤات الذكية والرؤى المتقدمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveInsights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{insight.title}</h3>
                      <Badge className={`${getProbabilityColor(insight.probability)} px-3 py-1`}>
                        {insight.probability}% احتمالية
                      </Badge>
                      {getImpactBadge(insight.impact)}
                    </div>
                    <p className="text-gray-700 mb-3">{insight.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">القسم المتأثر</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{insight.department}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">الإطار الزمني</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{insight.timeline}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">مستوى التأثير</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{insight.impact}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">الإجراء المقترح</span>
                  </div>
                  <p className="text-sm text-blue-700">{insight.recommendedAction}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legal Risks by Department */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              المخاطر القانونية حسب القسم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={legalRisksByDepartment}>
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="high" stackId="a" fill="#ef4444" />
                <Bar dataKey="medium" stackId="a" fill="#f97316" />
                <Bar dataKey="low" stackId="a" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contract Risks Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              توزيع مخاطر العقود
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contractRisks}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="risk"
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                >
                  {contractRisks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dispute Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              اتجاهات النزاعات والتكاليف
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={disputeTrends}>
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="disputes" fill="#3b82f6" />
                <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Scores Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              درجات الامتثال عبر الوقت
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={complianceScores}>
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            توصيات الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-blue-900">تحسين الامتثال</h3>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                تطوير برنامج تدريبي شامل لرفع مستوى الوعي القانوني في قسم تقنية المعلومات
              </p>
              <Badge className="bg-blue-200 text-blue-800">أولوية عالية</Badge>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-green-900">تخفيض التكاليف</h3>
              </div>
              <p className="text-sm text-green-800 mb-3">
                تطبيق نظام الوساطة الداخلية يمكن أن يقلل تكاليف التقاضي بنسبة 40%
              </p>
              <Badge className="bg-green-200 text-green-800">توفير متوقع: 800 ألف</Badge>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-600 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-purple-900">الأتمتة الذكية</h3>
              </div>
              <p className="text-sm text-purple-800 mb-3">
                تفعيل نظام الإنذار المبكر للعقود المنتهية الصلاحية والمراجعات الدورية
              </p>
              <Badge className="bg-purple-200 text-purple-800">تحسين الكفاءة</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};