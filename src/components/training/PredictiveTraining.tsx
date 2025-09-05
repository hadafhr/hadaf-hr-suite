import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import {
  TrendingUp,
  Brain,
  Target,
  Calendar,
  Users,
  BookOpen,
  BarChart3,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  Lightbulb,
  TrendingDown,
  Award
} from 'lucide-react';

interface TrainingPrediction {
  id: string;
  departmentId: string;
  departmentName: string;
  skillGap: string;
  currentLevel: number;
  targetLevel: number;
  urgency: 'high' | 'medium' | 'low';
  estimatedTrainingDays: number;
  suggestedCourses: string[];
  employeesAffected: number;
  confidenceScore: number;
  timeline: string;
  businessImpact: 'critical' | 'high' | 'medium' | 'low';
  costEstimate: number;
}

interface SkillTrend {
  skill: string;
  currentDemand: number;
  futureDemand: number;
  gapPercentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface TrainingRecommendation {
  id: string;
  title: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  departments: string[];
  expectedOutcome: string;
  duration: string;
  cost: number;
  roi: number;
}

export const PredictiveTraining: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';

  const [predictions, setPredictions] = useState<TrainingPrediction[]>([]);
  const [skillTrends, setSkillTrends] = useState<SkillTrend[]>([]);
  const [recommendations, setRecommendations] = useState<TrainingRecommendation[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [timeframe, setTimeframe] = useState('6months');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('predictions');

  useEffect(() => {
    loadPredictiveData();
  }, []);

  const loadPredictiveData = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockPredictions: TrainingPrediction[] = [
        {
          id: '1',
          departmentId: 'it',
          departmentName: 'تقنية المعلومات',
          skillGap: 'الذكاء الاصطناعي وتعلم الآلة',
          currentLevel: 3,
          targetLevel: 8,
          urgency: 'high',
          estimatedTrainingDays: 45,
          suggestedCourses: ['مقدمة في الذكاء الاصطناعي', 'تعلم الآلة المتقدم', 'الشبكات العصبية'],
          employeesAffected: 12,
          confidenceScore: 89,
          timeline: '6 أشهر',
          businessImpact: 'critical',
          costEstimate: 150000
        },
        {
          id: '2',
          departmentId: 'hr',
          departmentName: 'الموارد البشرية',
          skillGap: 'إدارة التغيير الرقمي',
          currentLevel: 4,
          targetLevel: 7,
          urgency: 'medium',
          estimatedTrainingDays: 20,
          suggestedCourses: ['إدارة التغيير', 'القيادة الرقمية', 'تحويل العمليات'],
          employeesAffected: 8,
          confidenceScore: 76,
          timeline: '4 أشهر',
          businessImpact: 'high',
          costEstimate: 80000
        },
        {
          id: '3',
          departmentId: 'sales',
          departmentName: 'المبيعات',
          skillGap: 'البيع الرقمي والتجارة الإلكترونية',
          currentLevel: 5,
          targetLevel: 8,
          urgency: 'high',
          estimatedTrainingDays: 30,
          suggestedCourses: ['استراتيجيات البيع الرقمي', 'منصات التجارة الإلكترونية', 'تحليل بيانات العملاء'],
          employeesAffected: 15,
          confidenceScore: 82,
          timeline: '3 أشهر',
          businessImpact: 'critical',
          costEstimate: 120000
        }
      ];

      const mockSkillTrends: SkillTrend[] = [
        {
          skill: 'الذكاء الاصطناعي',
          currentDemand: 65,
          futureDemand: 95,
          gapPercentage: 46,
          trend: 'increasing'
        },
        {
          skill: 'تحليل البيانات',
          currentDemand: 70,
          futureDemand: 85,
          gapPercentage: 21,
          trend: 'increasing'
        },
        {
          skill: 'الأمن السيبراني',
          currentDemand: 80,
          futureDemand: 90,
          gapPercentage: 13,
          trend: 'increasing'
        },
        {
          skill: 'البرمجة التقليدية',
          currentDemand: 85,
          futureDemand: 70,
          gapPercentage: -18,
          trend: 'decreasing'
        }
      ];

      const mockRecommendations: TrainingRecommendation[] = [
        {
          id: '1',
          title: 'برنامج الذكاء الاصطناعي الشامل',
          priority: 'urgent',
          departments: ['تقنية المعلومات', 'التطوير'],
          expectedOutcome: 'تحسين الكفاءة بنسبة 40% وتطوير حلول ذكية',
          duration: '3 أشهر',
          cost: 200000,
          roi: 350
        },
        {
          id: '2',
          title: 'تطوير مهارات البيع الرقمي',
          priority: 'high',
          departments: ['المبيعات', 'التسويق'],
          expectedOutcome: 'زيادة المبيعات الإلكترونية بنسبة 60%',
          duration: '2 أشهر',
          cost: 120000,
          roi: 280
        },
        {
          id: '3',
          title: 'برنامج القيادة الرقمية',
          priority: 'medium',
          departments: ['الموارد البشرية', 'الإدارة العليا'],
          expectedOutcome: 'تحسين إدارة التغيير وزيادة الإنتاجية',
          duration: '6 أسابيع',
          cost: 80000,
          roi: 220
        }
      ];

      setPredictions(mockPredictions);
      setSkillTrends(mockSkillTrends);
      setRecommendations(mockRecommendations);

      toast({
        title: isRTL ? 'تم التحليل بنجاح' : 'Analysis Complete',
        description: isRTL ? 'تم تحليل احتياجات التدريب المستقبلية باستخدام الذكاء الاصطناعي' : 'Future training needs analyzed using AI'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <BarChart3 className="w-4 h-4 text-blue-600" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  const filteredPredictions = predictions.filter(p => 
    selectedDepartment === 'all' || p.departmentId === selectedDepartment
  );

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            {isRTL ? 'التنبؤ بالاحتياجات التدريبية' : 'Predictive Training Needs'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'تحليل ذكي لاحتياجات التدريب المستقبلية باستخدام الذكاء الاصطناعي' : 'AI-powered analysis of future training requirements'}
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? 'جميع الأقسام' : 'All Departments'}</SelectItem>
              <SelectItem value="it">{isRTL ? 'تقنية المعلومات' : 'IT Department'}</SelectItem>
              <SelectItem value="hr">{isRTL ? 'الموارد البشرية' : 'HR Department'}</SelectItem>
              <SelectItem value="sales">{isRTL ? 'المبيعات' : 'Sales Department'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">{isRTL ? '3 أشهر' : '3 Months'}</SelectItem>
              <SelectItem value="6months">{isRTL ? '6 أشهر' : '6 Months'}</SelectItem>
              <SelectItem value="1year">{isRTL ? 'سنة' : '1 Year'}</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={loadPredictiveData} disabled={isAnalyzing} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isRTL ? 'تحديث التحليل' : 'Refresh Analysis'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'فجوات عالية الأولوية' : 'High Priority Gaps'}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {predictions.filter(p => p.urgency === 'high').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'موظفون متأثرون' : 'Affected Employees'}
                </p>
                <p className="text-2xl font-bold">
                  {predictions.reduce((sum, p) => sum + p.employeesAffected, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'أيام التدريب المقدرة' : 'Estimated Training Days'}
                </p>
                <p className="text-2xl font-bold">
                  {predictions.reduce((sum, p) => sum + p.estimatedTrainingDays, 0)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'التكلفة المقدرة' : 'Estimated Cost'}
                </p>
                <p className="text-2xl font-bold">
                  {(predictions.reduce((sum, p) => sum + p.costEstimate, 0) / 1000).toFixed(0)}K
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="predictions">
            {isRTL ? 'التنبؤات' : 'Predictions'}
          </TabsTrigger>
          <TabsTrigger value="trends">
            {isRTL ? 'اتجاهات المهارات' : 'Skill Trends'}
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            {isRTL ? 'التوصيات' : 'Recommendations'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4">
            {filteredPredictions.map((prediction) => (
              <Card key={prediction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{prediction.departmentName}</Badge>
                        <Badge 
                          className={`gap-1 ${getUrgencyColor(prediction.urgency)}`}
                          variant="outline"
                        >
                          {getUrgencyIcon(prediction.urgency)}
                          {isRTL ? 
                            (prediction.urgency === 'high' ? 'عالي' :
                             prediction.urgency === 'medium' ? 'متوسط' : 'منخفض') :
                            prediction.urgency}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg mb-2">{prediction.skillGap}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'المستوى الحالي' : 'Current Level'}
                          </p>
                          <Progress value={(prediction.currentLevel / 10) * 100} className="h-2 mt-1" />
                          <p className="text-xs mt-1">{prediction.currentLevel}/10</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'المستوى المطلوب' : 'Target Level'}
                          </p>
                          <Progress value={(prediction.targetLevel / 10) * 100} className="h-2 mt-1" />
                          <p className="text-xs mt-1">{prediction.targetLevel}/10</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? 'دقة التنبؤ' : 'Confidence Score'}
                          </p>
                          <Progress value={prediction.confidenceScore} className="h-2 mt-1" />
                          <p className="text-xs mt-1">{prediction.confidenceScore}%</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'الموظفون المتأثرون' : 'Affected Employees'}</p>
                          <p className="font-medium">{prediction.employeesAffected}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'مدة التدريب' : 'Training Duration'}</p>
                          <p className="font-medium">{prediction.estimatedTrainingDays} {isRTL ? 'يوم' : 'days'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'الجدول الزمني' : 'Timeline'}</p>
                          <p className="font-medium">{prediction.timeline}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'التكلفة المقدرة' : 'Estimated Cost'}</p>
                          <p className="font-medium">{(prediction.costEstimate / 1000).toFixed(0)}K SAR</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">{isRTL ? 'الدورات المقترحة:' : 'Suggested Courses:'}</p>
                        <div className="flex flex-wrap gap-2">
                          {prediction.suggestedCourses.map((course, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <BookOpen className="w-4 h-4" />
                        {isRTL ? 'إنشاء خطة' : 'Create Plan'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {isRTL ? 'اتجاهات المهارات المستقبلية' : 'Future Skill Trends'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTrendIcon(trend.trend)}
                      <div>
                        <h4 className="font-medium">{trend.skill}</h4>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'الفجوة:' : 'Gap:'} {Math.abs(trend.gapPercentage)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">{isRTL ? 'حالياً' : 'Current'}</p>
                        <p className="font-medium">{trend.currentDemand}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">{isRTL ? 'مستقبلاً' : 'Future'}</p>
                        <p className="font-medium">{trend.futureDemand}%</p>
                      </div>
                      <Badge 
                        variant={trend.gapPercentage > 0 ? 'destructive' : 'default'}
                        className="gap-1"
                      >
                        {trend.gapPercentage > 0 ? (
                          <AlertTriangle className="w-3 h-3" />
                        ) : (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        {Math.abs(trend.gapPercentage)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={getPriorityColor(rec.priority)} className="gap-1">
                          <Zap className="w-3 h-3" />
                          {isRTL ? 
                            (rec.priority === 'urgent' ? 'عاجل' :
                             rec.priority === 'high' ? 'عالي' :
                             rec.priority === 'medium' ? 'متوسط' : 'منخفض') :
                            rec.priority}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Award className="w-3 h-3" />
                          ROI: {rec.roi}%
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg mb-2">{rec.title}</h3>
                      <p className="text-muted-foreground mb-3">{rec.expectedOutcome}</p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'الأقسام المشاركة' : 'Departments'}</p>
                          <p className="font-medium">{rec.departments.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'المدة' : 'Duration'}</p>
                          <p className="font-medium">{rec.duration}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'التكلفة' : 'Cost'}</p>
                          <p className="font-medium">{(rec.cost / 1000).toFixed(0)}K SAR</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {isRTL ? 'اعتماد' : 'Approve'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            {isRTL ? 'تصدير التقارير التنبؤية' : 'Export Predictive Reports'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              {isRTL ? 'تقرير كامل PDF' : 'Full Report PDF'}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              {isRTL ? 'بيانات Excel' : 'Excel Data'}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              {isRTL ? 'عرض تقديمي PPT' : 'PowerPoint Presentation'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};