import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  BarChart3,
  Star,
  User,
  FileText,
  Shield,
  Award,
  Activity,
  Zap,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react';

export const AIScreeningPredictions = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showExplainability, setShowExplainability] = useState(false);

  const candidates = [
    {
      id: 1,
      name: 'أحمد محمد العتيبي',
      position: 'مطور Full Stack',
      matchScore: 92,
      preScreenScore: 89,
      status: 'قوي',
      predictions: {
        retentionProbability: 85,
        performanceSuccess: 92,
        timeToProductivity: 45,
        attritionRisk: 15,
        offerAcceptanceLikelihood: 78
      },
      explainabilityFactors: [
        { factor: 'مطابقة المهارات التقنية', weight: 35, impact: 'إيجابي', score: 95 },
        { factor: 'سنوات الخبرة', weight: 25, impact: 'إيجابي', score: 88 },
        { factor: 'التعليم والشهادات', weight: 20, impact: 'إيجابي', score: 90 },
        { factor: 'المقابلة الأولية', weight: 15, impact: 'إيجابي', score: 85 },
        { factor: 'توقع الراتب', weight: 5, impact: 'محايد', score: 75 }
      ],
      confidence: 94,
      biasCheck: 'آمن',
      riskFlags: []
    },
    {
      id: 2,
      name: 'فاطمة سالم القحطاني',
      position: 'محاسب أول',
      matchScore: 88,
      preScreenScore: 91,
      status: 'قوي',
      predictions: {
        retentionProbability: 90,
        performanceSuccess: 88,
        timeToProductivity: 30,
        attritionRisk: 10,
        offerAcceptanceLikelihood: 85
      },
      explainabilityFactors: [
        { factor: 'الخبرة في المحاسبة', weight: 40, impact: 'إيجابي', score: 92 },
        { factor: 'الشهادات المهنية (CPA)', weight: 30, impact: 'إيجابي', score: 95 },
        { factor: 'مهارات البرمجيات', weight: 20, impact: 'إيجابي', score: 85 },
        { factor: 'التقييم الشخصي', weight: 10, impact: 'إيجابي', score: 88 }
      ],
      confidence: 91,
      biasCheck: 'آمن',
      riskFlags: []
    },
    {
      id: 3,
      name: 'خالد عبدالله المطيري',
      position: 'مدير مشروع',
      matchScore: 75,
      preScreenScore: 82,
      status: 'جيد',
      predictions: {
        retentionProbability: 70,
        performanceSuccess: 75,
        timeToProductivity: 60,
        attritionRisk: 30,
        offerAcceptanceLikelihood: 65
      },
      explainabilityFactors: [
        { factor: 'خبرة الإدارة', weight: 35, impact: 'إيجابي', score: 80 },
        { factor: 'المهارات القيادية', weight: 25, impact: 'إيجابي', score: 78 },
        { factor: 'الخبرة في المجال', weight: 20, impact: 'محايد', score: 70 },
        { factor: 'التوافق الثقافي', weight: 15, impact: 'سلبي', score: 65 },
        { factor: 'توقعات الراتب', weight: 5, impact: 'سلبي', score: 60 }
      ],
      confidence: 76,
      biasCheck: 'تحذير',
      riskFlags: ['توقعات راتب عالية', 'تاريخ تنقل وظيفي']
    }
  ];

  const modelPerformance = {
    accuracy: 94,
    precision: 92,
    recall: 89,
    f1Score: 90,
    auc: 0.96,
    lastUpdate: '2024-01-20',
    trainingData: 25000,
    biasScore: 8.5
  };

  const getPredictionColor = (value: number, type: string) => {
    if (type === 'risk') {
      if (value <= 20) return 'text-green-600';
      if (value <= 40) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (value >= 80) return 'text-green-600';
      if (value >= 60) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'قوي': return 'bg-green-500 text-white';
      case 'جيد': return 'bg-blue-500 text-white';
      case 'ضعيف': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const ExplainabilityModal = ({ candidate }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          تفسير تقييم الذكاء الاصطناعي - {candidate?.name}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Overall Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">النتيجة الإجمالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{candidate?.matchScore}%</p>
                <p className="text-sm text-muted-foreground">درجة المطابقة</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{candidate?.preScreenScore}%</p>
                <p className="text-sm text-muted-foreground">المقابلة الأولية</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{candidate?.confidence}%</p>
                <p className="text-sm text-muted-foreground">مستوى الثقة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contributing Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">العوامل المؤثرة</CardTitle>
            <CardDescription>العوامل التي أثرت على تقييم الذكاء الاصطناعي مرتبة حسب الأهمية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidate?.explainabilityFactors.map((factor, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{factor.factor}</h4>
                    <Badge className={
                      factor.impact === 'إيجابي' ? 'bg-green-500 text-white' :
                      factor.impact === 'سلبي' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                    }>
                      {factor.impact}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">الوزن</p>
                      <p className="font-semibold">{factor.weight}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">النتيجة</p>
                      <p className="font-semibold">{factor.score}%</p>
                    </div>
                    <div className="flex items-center">
                      <Progress value={factor.score} className="flex-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Predictions Detail */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">التنبؤات المفصلة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>احتمالية البقاء</span>
                  <span className={`font-semibold ${getPredictionColor(candidate?.predictions.retentionProbability, 'normal')}`}>
                    {candidate?.predictions.retentionProbability}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>نجاح الأداء</span>
                  <span className={`font-semibold ${getPredictionColor(candidate?.predictions.performanceSuccess, 'normal')}`}>
                    {candidate?.predictions.performanceSuccess}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>الوصول للإنتاجية</span>
                  <span className="font-semibold text-blue-600">
                    {candidate?.predictions.timeToProductivity} يوم
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>مخاطر الاستقالة</span>
                  <span className={`font-semibold ${getPredictionColor(candidate?.predictions.attritionRisk, 'risk')}`}>
                    {candidate?.predictions.attritionRisk}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>احتمال قبول العرض</span>
                  <span className={`font-semibold ${getPredictionColor(candidate?.predictions.offerAcceptanceLikelihood, 'normal')}`}>
                    {candidate?.predictions.offerAcceptanceLikelihood}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bias & Risk Check */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5" />
              فحص التحيز والمخاطر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>حالة التحيز:</span>
                <Badge className={candidate?.biasCheck === 'آمن' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}>
                  {candidate?.biasCheck}
                </Badge>
              </div>
              
              {candidate?.riskFlags.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">تحذيرات المخاطر:</p>
                  <div className="space-y-2">
                    {candidate.riskFlags.map((flag, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            الفحص الذكي والتنبؤات
          </h2>
          <p className="text-muted-foreground">تحليل ذكي شامل للمرشحين مع تنبؤات الأداء والاحتفاظ</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            تقرير الأداء
          </Button>
          <Button className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            معالجة دفعية
          </Button>
        </div>
      </div>

      {/* Model Performance Overview */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            أداء النموذج
          </CardTitle>
          <CardDescription>إحصائيات شاملة عن أداء نموذج الذكاء الاصطناعي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{modelPerformance.accuracy}%</p>
              <p className="text-sm text-muted-foreground">الدقة</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{modelPerformance.precision}%</p>
              <p className="text-sm text-muted-foreground">الدقة المحددة</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{modelPerformance.recall}%</p>
              <p className="text-sm text-muted-foreground">الاستدعاء</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{modelPerformance.biasScore}/10</p>
              <p className="text-sm text-muted-foreground">نقاط التحيز</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            تحليل المرشحين
          </CardTitle>
          <CardDescription>نتائج الفحص الذكي والتنبؤات لكل مرشح</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="p-6 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{candidate.name}</h4>
                    <p className="text-muted-foreground">{candidate.position}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          تفسير
                        </Button>
                      </DialogTrigger>
                      <ExplainabilityModal candidate={candidate} />
                    </Dialog>
                  </div>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{candidate.matchScore}%</p>
                    <p className="text-sm text-muted-foreground">درجة المطابقة</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{candidate.preScreenScore}%</p>
                    <p className="text-sm text-muted-foreground">المقابلة الأولية</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{candidate.confidence}%</p>
                    <p className="text-sm text-muted-foreground">مستوى الثقة</p>
                  </div>
                </div>

                {/* AI Predictions */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    التنبؤات الذكية
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Target className="w-5 h-5 text-green-600" />
                        <span className={`font-semibold ${getPredictionColor(candidate.predictions.retentionProbability, 'normal')}`}>
                          {candidate.predictions.retentionProbability}%
                        </span>
                        <span className="text-muted-foreground">البقاء</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Star className="w-5 h-5 text-blue-600" />
                        <span className={`font-semibold ${getPredictionColor(candidate.predictions.performanceSuccess, 'normal')}`}>
                          {candidate.predictions.performanceSuccess}%
                        </span>
                        <span className="text-muted-foreground">الأداء</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold text-orange-600">
                          {candidate.predictions.timeToProductivity} يوم
                        </span>
                        <span className="text-muted-foreground">الإنتاجية</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className={`font-semibold ${getPredictionColor(candidate.predictions.attritionRisk, 'risk')}`}>
                          {candidate.predictions.attritionRisk}%
                        </span>
                        <span className="text-muted-foreground">مخاطر</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                        <span className={`font-semibold ${getPredictionColor(candidate.predictions.offerAcceptanceLikelihood, 'normal')}`}>
                          {candidate.predictions.offerAcceptanceLikelihood}%
                        </span>
                        <span className="text-muted-foreground">قبول العرض</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Flags */}
                {candidate.riskFlags.length > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-semibold text-yellow-800">تحذيرات:</p>
                      <p className="text-sm text-yellow-700">{candidate.riskFlags.join(', ')}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={candidate.biasCheck === 'آمن' ? 'text-green-600' : 'text-yellow-600'}>
                      <Shield className="w-3 h-3 mr-1" />
                      {candidate.biasCheck}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-1" />
                      تقرير مفصل
                    </Button>
                    <Button size="sm">
                      إرسال للجنة
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};