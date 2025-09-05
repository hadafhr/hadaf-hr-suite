import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import {
  MessageSquare,
  TrendingUp,
  Brain,
  Star,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  Lightbulb,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

interface Evaluation {
  id: string;
  sessionId: string;
  sessionTitle: string;
  traineeId: string;
  traineeName: string;
  rating: number;
  feedback: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  recommendations: string[];
  createdAt: Date;
  analysisStatus: 'pending' | 'processing' | 'completed';
}

interface SentimentAnalysis {
  overall: 'positive' | 'negative' | 'neutral';
  score: number;
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
  };
  keywords: string[];
  themes: string[];
}

export const InstantEvaluation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';

  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [sentimentData, setSentimentData] = useState<SentimentAnalysis | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newFeedback, setNewFeedback] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('evaluations');

  // Mock data
  useEffect(() => {
    const mockEvaluations: Evaluation[] = [
      {
        id: '1',
        sessionId: 'session1',
        sessionTitle: 'إدارة المشاريع الرشيقة',
        traineeId: 'trainee1',
        traineeName: 'أحمد محمد',
        rating: 5,
        feedback: 'كانت الجلسة ممتازة ومفيدة جداً، أسلوب المدرب واضح ومفهوم',
        sentiment: 'positive',
        keywords: ['ممتاز', 'مفيد', 'واضح'],
        recommendations: ['زيادة الأمثلة العملية', 'إضافة ورش تفاعلية'],
        createdAt: new Date(),
        analysisStatus: 'completed'
      },
      {
        id: '2',
        sessionId: 'session1',
        sessionTitle: 'إدارة المشاريع الرشيقة',
        traineeId: 'trainee2',
        traineeName: 'فاطمة علي',
        rating: 4,
        feedback: 'الجلسة جيدة ولكن أحتاج لمزيد من التطبيق العملي',
        sentiment: 'neutral',
        keywords: ['جيد', 'تطبيق عملي'],
        recommendations: ['زيادة التمارين التطبيقية'],
        createdAt: new Date(),
        analysisStatus: 'completed'
      },
      {
        id: '3',
        sessionId: 'session2',
        sessionTitle: 'مهارات التواصل الفعال',
        traineeId: 'trainee3',
        traineeName: 'محمد سالم',
        rating: 3,
        feedback: 'المحتوى صعب والوقت قصير، أحتاج لمزيد من الشرح',
        sentiment: 'negative',
        keywords: ['صعب', 'وقت قصير', 'شرح'],
        recommendations: ['تقسيم المحتوى على جلسات أكثر', 'إضافة مواد مساعدة'],
        createdAt: new Date(),
        analysisStatus: 'completed'
      }
    ];
    setEvaluations(mockEvaluations);
  }, []);

  const handleSubmitEvaluation = async () => {
    if (!newFeedback.trim()) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى إدخال التعليق' : 'Please enter feedback',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newEvaluation: Evaluation = {
        id: Date.now().toString(),
        sessionId: 'current-session',
        sessionTitle: 'الجلسة الحالية',
        traineeId: 'current-user',
        traineeName: 'المستخدم الحالي',
        rating: newRating,
        feedback: newFeedback,
        sentiment: newRating >= 4 ? 'positive' : newRating >= 3 ? 'neutral' : 'negative',
        keywords: extractKeywords(newFeedback),
        recommendations: generateRecommendations(newFeedback, newRating),
        createdAt: new Date(),
        analysisStatus: 'completed'
      };

      setEvaluations(prev => [newEvaluation, ...prev]);
      setNewFeedback('');
      setNewRating(5);

      toast({
        title: isRTL ? 'تم بنجاح' : 'Success',
        description: isRTL ? 'تم إرسال التقييم وتحليله بالذكاء الاصطناعي' : 'Evaluation submitted and analyzed with AI'
      });
    } catch (error) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'حدث خطأ في تحليل التقييم' : 'Error analyzing evaluation',
        variant: 'destructive'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const extractKeywords = (text: string): string[] => {
    // Simple keyword extraction (in real app, use AI service)
    const keywords = ['ممتاز', 'جيد', 'مفيد', 'واضح', 'صعب', 'قصير', 'طويل', 'مفهوم'];
    return keywords.filter(keyword => text.includes(keyword));
  };

  const generateRecommendations = (feedback: string, rating: number): string[] => {
    // Simple recommendation generation (in real app, use AI service)
    const recommendations = [];
    if (rating < 3) {
      recommendations.push('تحسين أسلوب الشرح');
      recommendations.push('إضافة المزيد من الأمثلة');
    }
    if (feedback.includes('عملي') || feedback.includes('تطبيق')) {
      recommendations.push('زيادة التمارين التطبيقية');
    }
    if (feedback.includes('وقت')) {
      recommendations.push('إعادة تنظيم توزيع الوقت');
    }
    return recommendations;
  };

  const analyzeSentiment = async (evaluationId: string) => {
    const evaluation = evaluations.find(e => e.id === evaluationId);
    if (!evaluation) return;

    setIsAnalyzing(true);
    try {
      // Simulate AI sentiment analysis
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockSentiment: SentimentAnalysis = {
        overall: evaluation.sentiment,
        score: evaluation.rating * 20,
        emotions: {
          joy: evaluation.sentiment === 'positive' ? 80 : 20,
          sadness: evaluation.sentiment === 'negative' ? 60 : 10,
          anger: evaluation.sentiment === 'negative' ? 40 : 5,
          fear: 10,
          surprise: 15
        },
        keywords: evaluation.keywords,
        themes: ['جودة التدريب', 'أسلوب المدرب', 'المحتوى التدريبي']
      };

      setSentimentData(mockSentiment);
      setSelectedEvaluation(evaluation);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="w-4 h-4" />;
      case 'negative': return <ThumbsDown className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getOverallStats = () => {
    const total = evaluations.length;
    const positive = evaluations.filter(e => e.sentiment === 'positive').length;
    const neutral = evaluations.filter(e => e.sentiment === 'neutral').length;
    const negative = evaluations.filter(e => e.sentiment === 'negative').length;
    const avgRating = evaluations.reduce((sum, e) => sum + e.rating, 0) / total || 0;

    return { total, positive, neutral, negative, avgRating };
  };

  const stats = getOverallStats();

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'إجمالي التقييمات' : 'Total Evaluations'}
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'متوسط التقييم' : 'Average Rating'}
                </p>
                <p className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'تقييمات إيجابية' : 'Positive Reviews'}
                </p>
                <p className="text-2xl font-bold text-green-600">{stats.positive}</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'يحتاج تحسين' : 'Needs Improvement'}
                </p>
                <p className="text-2xl font-bold text-red-600">{stats.negative}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evaluations">
            {isRTL ? 'التقييمات' : 'Evaluations'}
          </TabsTrigger>
          <TabsTrigger value="submit">
            {isRTL ? 'إرسال تقييم' : 'Submit Evaluation'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {isRTL ? 'تحليل المشاعر' : 'Sentiment Analysis'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="evaluations" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {isRTL ? 'آخر التقييمات' : 'Recent Evaluations'}
            </h3>
            <Button onClick={() => window.location.reload()} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
              {isRTL ? 'تحديث' : 'Refresh'}
            </Button>
          </div>

          <div className="space-y-3">
            {evaluations.map((evaluation) => (
              <Card key={evaluation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {evaluation.sessionTitle}
                        </Badge>
                        <Badge 
                          variant={evaluation.sentiment === 'positive' ? 'default' : 
                                  evaluation.sentiment === 'negative' ? 'destructive' : 'secondary'}
                          className="gap-1"
                        >
                          {getSentimentIcon(evaluation.sentiment)}
                          {isRTL ? 
                            (evaluation.sentiment === 'positive' ? 'إيجابي' :
                             evaluation.sentiment === 'negative' ? 'سلبي' : 'محايد') :
                            evaluation.sentiment}
                        </Badge>
                      </div>

                      <h4 className="font-medium mb-1">{evaluation.traineeName}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{evaluation.feedback}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < evaluation.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {evaluation.createdAt.toLocaleString()}
                        </span>
                      </div>

                      {evaluation.keywords.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {evaluation.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => analyzeSentiment(evaluation.id)}
                            variant="outline" 
                            size="sm"
                          >
                            <Brain className="w-4 h-4" />
                            {isRTL ? 'تحليل' : 'Analyze'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              {isRTL ? 'تحليل المشاعر والذكاء الاصطناعي' : 'AI Sentiment Analysis'}
                            </DialogTitle>
                          </DialogHeader>
                          
                          {selectedEvaluation && sentimentData && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">
                                    {isRTL ? 'التحليل العام' : 'Overall Sentiment'}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      variant={sentimentData.overall === 'positive' ? 'default' : 
                                              sentimentData.overall === 'negative' ? 'destructive' : 'secondary'}
                                      className="gap-1"
                                    >
                                      {getSentimentIcon(sentimentData.overall)}
                                      {isRTL ? 
                                        (sentimentData.overall === 'positive' ? 'إيجابي' :
                                         sentimentData.overall === 'negative' ? 'سلبي' : 'محايد') :
                                        sentimentData.overall}
                                    </Badge>
                                    <span className="font-bold">{sentimentData.score}%</span>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">
                                    {isRTL ? 'المشاعر المكتشفة' : 'Detected Emotions'}
                                  </h4>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span className="text-sm">{isRTL ? 'فرح' : 'Joy'}</span>
                                      <span className="text-sm font-medium">{sentimentData.emotions.joy}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">{isRTL ? 'حزن' : 'Sadness'}</span>
                                      <span className="text-sm font-medium">{sentimentData.emotions.sadness}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">
                                  {isRTL ? 'الكلمات المفتاحية' : 'Keywords'}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {sentimentData.keywords.map((keyword, index) => (
                                    <Badge key={index} variant="outline">{keyword}</Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">
                                  {isRTL ? 'التوصيات الذكية' : 'AI Recommendations'}
                                </h4>
                                <div className="space-y-2">
                                  {selectedEvaluation.recommendations.map((rec, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                                      <span className="text-sm">{rec}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {isAnalyzing && (
                            <div className="flex items-center justify-center py-8">
                              <div className="flex items-center gap-2">
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                <span>{isRTL ? 'جاري التحليل...' : 'Analyzing...'}</span>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                {isRTL ? 'تقييم الجلسة التدريبية' : 'Session Evaluation'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'التقييم (1-5 نجوم)' : 'Rating (1-5 stars)'}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewRating(rating)}
                      className="p-1"
                    >
                      <Star 
                        className={`w-6 h-6 ${rating <= newRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                  <span className="text-sm ml-2">{newRating}/5</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'التعليق والملاحظات' : 'Feedback & Comments'}
                </label>
                <Textarea
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder={isRTL ? 'اكتب تعليقك حول الجلسة التدريبية...' : 'Write your feedback about the training session...'}
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleSubmitEvaluation}
                disabled={isAnalyzing || !newFeedback.trim()}
                className="w-full gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {isRTL ? 'جاري التحليل...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {isRTL ? 'إرسال التقييم' : 'Submit Evaluation'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {isRTL ? 'توزيع المشاعر' : 'Sentiment Distribution'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{isRTL ? 'إيجابي' : 'Positive'}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(stats.positive / stats.total) * 100} className="w-24" />
                      <span className="text-sm font-medium">{stats.positive}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{isRTL ? 'محايد' : 'Neutral'}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(stats.neutral / stats.total) * 100} className="w-24" />
                      <span className="text-sm font-medium">{stats.neutral}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{isRTL ? 'سلبي' : 'Negative'}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(stats.negative / stats.total) * 100} className="w-24" />
                      <span className="text-sm font-medium">{stats.negative}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {isRTL ? 'أهم التوصيات' : 'Top Recommendations'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{isRTL ? 'زيادة التمارين العملية' : 'Increase practical exercises'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{isRTL ? 'تحسين أسلوب الشرح' : 'Improve explanation style'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{isRTL ? 'إضافة المزيد من الأمثلة' : 'Add more examples'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'تصدير تقارير التحليل' : 'Export Analysis Reports'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  {isRTL ? 'تصدير PDF' : 'Export PDF'}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  {isRTL ? 'تصدير Excel' : 'Export Excel'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};