import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Brain,
  Bot,
  Target,
  AlertTriangle,
  Star,
  Calendar,
  FileText,
  Award,
  BarChart3
} from 'lucide-react';

export const RecruitmentOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const overviewData = {
    totalCandidates: 156,
    aiProcessed: 142,
    panelReviewed: 45,
    finalVotes: 28,
    hired: 12,
    rejected: 89,
    pending: 55,
    avgTimeToHire: 18,
    aiAccuracy: 94,
    panelAgreement: 87
  };

  const recentActivity = [
    {
      id: 1,
      type: 'ai-screening',
      candidate: 'أحمد محمد العتيبي',
      position: 'مطور Full Stack',
      score: 92,
      status: 'قوي',
      timestamp: '2024-01-20 14:30',
      icon: Brain,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      type: 'panel-review',
      candidate: 'فاطمة سالم القحطاني',
      position: 'محاسب أول',
      score: 88,
      status: 'مراجعة اللجنة',
      timestamp: '2024-01-20 13:15',
      icon: Users,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 3,
      type: 'final-vote',
      candidate: 'خالد عبدالله المطيري',
      position: 'مدير مشروع',
      score: 85,
      status: 'موافقة',
      timestamp: '2024-01-20 11:45',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 4,
      type: 'chatbot',
      candidate: 'نورا أحمد السعيد',
      position: 'مصمم UX/UI',
      score: 78,
      status: 'مقابلة أولية',
      timestamp: '2024-01-20 10:20',
      icon: Bot,
      color: 'text-cyan-600 bg-cyan-50'
    }
  ];

  const topCandidates = [
    {
      name: 'أحمد محمد العتيبي',
      position: 'مطور Full Stack',
      aiScore: 92,
      panelScore: 89,
      combinedScore: 91,
      stage: 'التصويت النهائي',
      predictions: {
        retention: 85,
        performance: 92,
        timeToProductivity: 45
      }
    },
    {
      name: 'فاطمة سالم القحطاني',
      position: 'محاسب أول',
      aiScore: 88,
      panelScore: 91,
      combinedScore: 90,
      stage: 'مراجعة اللجنة',
      predictions: {
        retention: 90,
        performance: 88,
        timeToProductivity: 30
      }
    },
    {
      name: 'خالد عبدالله المطيري',
      position: 'مدير مشروع',
      aiScore: 85,
      panelScore: 87,
      combinedScore: 86,
      stage: 'تم القبول',
      predictions: {
        retention: 82,
        performance: 89,
        timeToProductivity: 60
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">معالج بالذكاء الاصطناعي</p>
                <p className="text-2xl font-bold text-blue-600">{overviewData.aiProcessed}</p>
                <p className="text-xs text-green-600">+{overviewData.aiAccuracy}% دقة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">مراجعة اللجنة</p>
                <p className="text-2xl font-bold text-purple-600">{overviewData.panelReviewed}</p>
                <p className="text-xs text-green-600">{overviewData.panelAgreement}% توافق</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تم التوظيف</p>
                <p className="text-2xl font-bold text-green-600">{overviewData.hired}</p>
                <p className="text-xs text-blue-600">{overviewData.avgTimeToHire} يوم متوسط</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">معلق</p>
                <p className="text-2xl font-bold text-orange-600">{overviewData.pending}</p>
                <p className="text-xs text-purple-600">يحتاج مراجعة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              النشاط الأخير
            </CardTitle>
            <CardDescription>آخر الأنشطة في نظام التوظيف الذكي</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className={`p-2 rounded-full ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.candidate}</p>
                      <Badge variant="outline">{activity.score}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.position}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                  <Badge className={activity.color}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Candidates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              أفضل المرشحين
            </CardTitle>
            <CardDescription>المرشحون الأعلى تقييماً حسب الذكاء الاصطناعي واللجنة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCandidates.map((candidate, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    </div>
                    <Badge variant={candidate.stage === 'تم القبول' ? 'default' : 'secondary'}>
                      {candidate.stage}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">درجة الذكاء الاصطناعي</p>
                      <p className="font-semibold text-blue-600">{candidate.aiScore}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">درجة اللجنة</p>
                      <p className="font-semibold text-purple-600">{candidate.panelScore}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">النتيجة المدمجة</p>
                      <p className="font-semibold text-primary">{candidate.combinedScore}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">التنبؤات الذكية:</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="text-muted-foreground">البقاء</p>
                        <p className="font-semibold text-green-600">{candidate.predictions.retention}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">الأداء</p>
                        <p className="font-semibold text-blue-600">{candidate.predictions.performance}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">الإنتاجية</p>
                        <p className="font-semibold text-orange-600">{candidate.predictions.timeToProductivity} يوم</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            تحليلات الأداء
          </CardTitle>
          <CardDescription>إحصائيات شاملة عن أداء نظام التوظيف الذكي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-600" />
                أداء الذكاء الاصطناعي
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>دقة التطابق</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>تحليل السيرة الذاتية</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>المقابلة الأولية</span>
                    <span>91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                أداء اللجنة
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>التوافق مع الذكاء الاصطناعي</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>سرعة المراجعة</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>جودة التقييم</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                النتائج الإجمالية
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>معدل النجاح</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>رضا التوظيف</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>تقليل الوقت</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};