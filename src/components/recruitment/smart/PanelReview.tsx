import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  Play, 
  Pause, 
  MessageSquare, 
  Star, 
  Clock, 
  Eye, 
  EyeOff,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Edit,
  Save,
  UserCheck,
  Award,
  TrendingUp,
  BarChart3,
  FileText,
  Calendar,
  Timer,
  User,
  CheckCircle
} from 'lucide-react';

export const PanelReview = () => {
  const [activeTab, setActiveTab] = useState('candidates');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [reviewMode, setReviewMode] = useState('individual'); // individual, group, anonymous
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);

  const panelMembers = [
    { id: 1, name: 'د. محمد الأحمد', role: 'مدير التوظيف', weight: 30, avatar: 'MA' },
    { id: 2, name: 'أ. فاطمة السعيد', role: 'مدير تقني', weight: 25, avatar: 'FS' },
    { id: 3, name: 'أ. خالد المطيري', role: 'مدير الموارد البشرية', weight: 25, avatar: 'KM' },
    { id: 4, name: 'د. نورا العتيبي', role: 'مستشار أول', weight: 20, avatar: 'NA' }
  ];

  const candidates = [
    {
      id: 1,
      name: 'أحمد محمد العتيبي',
      position: 'مطور Full Stack',
      aiScore: 92,
      recordingUrl: '#',
      recordingDuration: '18:30',
      submittedAt: '2024-01-20 14:30',
      status: 'pending',
      reviews: [
        {
          memberId: 1,
          memberName: 'د. محمد الأحمد',
          overallScore: 4.5,
          competencies: {
            technical: 5,
            communication: 4,
            problemSolving: 4.5,
            teamwork: 4,
            leadership: 3.5
          },
          comments: 'مرشح ممتاز مع خبرة تقنية قوية. يحتاج تطوير في المهارات القيادية.',
          timestampNotes: [
            { time: '2:15', note: 'شرح ممتاز للمشروع الأخير' },
            { time: '5:30', note: 'إجابة قوية على السؤال التقني' },
            { time: '12:45', note: 'قليل الثقة في الحديث عن القيادة' }
          ],
          reviewedAt: '2024-01-20 16:00'
        },
        {
          memberId: 2,
          memberName: 'أ. فاطمة السعيد',
          overallScore: 4.2,
          competencies: {
            technical: 4.5,
            communication: 4,
            problemSolving: 4.5,
            teamwork: 4,
            leadership: 3.8
          },
          comments: 'مهارات تقنية جيدة جداً. التواصل واضح ومفهوم.',
          timestampNotes: [
            { time: '3:20', note: 'فهم عميق للتقنيات الحديثة' },
            { time: '8:10', note: 'حل إبداعي للمشكلة المطروحة' }
          ],
          reviewedAt: '2024-01-20 17:30'
        }
      ],
      panelAverageScore: 4.35,
      aiCombinedScore: 89
    },
    {
      id: 2,
      name: 'فاطمة سالم القحطاني',
      position: 'محاسب أول',
      aiScore: 88,
      recordingUrl: '#',
      recordingDuration: '22:15',
      submittedAt: '2024-01-20 13:15',
      status: 'completed',
      reviews: [
        {
          memberId: 1,
          memberName: 'د. محمد الأحمد',
          overallScore: 4.8,
          competencies: {
            technical: 5,
            communication: 4.5,
            problemSolving: 5,
            teamwork: 4.5,
            leadership: 4.5
          },
          comments: 'مرشحة استثنائية بخبرة واسعة وشخصية قيادية قوية.',
          timestampNotes: [
            { time: '1:30', note: 'تقديم ممتاز وواثق' },
            { time: '7:45', note: 'شرح مفصل وواضح للخبرات السابقة' },
            { time: '15:20', note: 'إجابات ذكية على الأسئلة الصعبة' }
          ],
          reviewedAt: '2024-01-20 15:45'
        },
        {
          memberId: 3,
          memberName: 'أ. خالد المطيري',
          overallScore: 4.6,
          competencies: {
            technical: 4.5,
            communication: 5,
            problemSolving: 4.5,
            teamwork: 4.5,
            leadership: 4.5
          },
          comments: 'تواصل ممتاز ومهارات شخصية قوية. ستكون إضافة رائعة للفريق.',
          timestampNotes: [
            { time: '4:10', note: 'تفاعل إيجابي ومهني' },
            { time: '11:30', note: 'أمثلة عملية مقنعة' }
          ],
          reviewedAt: '2024-01-20 16:20'
        }
      ],
      panelAverageScore: 4.7,
      aiCombinedScore: 91
    }
  ];

  const competencyAreas = [
    { key: 'technical', label: 'المهارات التقنية', icon: Award },
    { key: 'communication', label: 'التواصل', icon: MessageSquare },
    { key: 'problemSolving', label: 'حل المشاكل', icon: TrendingUp },
    { key: 'teamwork', label: 'العمل الجماعي', icon: Users },
    { key: 'leadership', label: 'القيادة', icon: UserCheck }
  ];

  const ReviewForm = ({ candidate, member }) => {
    const [scores, setScores] = useState({
      technical: 4,
      communication: 4,
      problemSolving: 4,
      teamwork: 4,
      leadership: 4
    });
    const [overallScore, setOverallScore] = useState(4);
    const [comments, setComments] = useState('');
    const [timestampNotes, setTimestampNotes] = useState([]);

    return (
      <div className="space-y-6">
        {/* Competency Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">تقييم الكفاءات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {competencyAreas.map((area) => (
              <div key={area.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <area.icon className="w-4 h-4" />
                    {area.label}
                  </Label>
                  <span className="font-semibold">{scores[area.key]}/5</span>
                </div>
                <Slider
                  value={[scores[area.key]]}
                  onValueChange={(value) => setScores(prev => ({ ...prev, [area.key]: value[0] }))}
                  max={5}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Overall Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">التقييم الإجمالي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>النتيجة الإجمالية</Label>
                <span className="text-2xl font-bold text-primary">{overallScore}/5</span>
              </div>
              <Slider
                value={[overallScore]}
                onValueChange={(value) => setOverallScore(value[0])}
                max={5}
                min={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">التعليقات والملاحظات</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="اكتب تعليقاتك وملاحظاتك حول المرشح..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button className="w-full" size="lg">
          <Save className="w-4 h-4 mr-2" />
          حفظ التقييم
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            مراجعة اللجنة
          </h2>
          <p className="text-muted-foreground">مراجعة جماعية للمرشحين مع تقييمات وتعليقات اللجنة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            تقرير اللجنة
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            ملخص التقييمات
          </Button>
        </div>
      </div>

      {/* Panel Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            إعدادات اللجنة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-semibold mb-3 block">وضع المراجعة</Label>
              <div className="space-y-2">
                <Button
                  variant={reviewMode === 'individual' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setReviewMode('individual')}
                  className="w-full justify-start"
                >
                  مراجعة فردية
                </Button>
                <Button
                  variant={reviewMode === 'group' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setReviewMode('group')}
                  className="w-full justify-start"
                >
                  مراجعة جماعية
                </Button>
                <Button
                  variant={reviewMode === 'anonymous' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setReviewMode('anonymous')}
                  className="w-full justify-start"
                >
                  مراجعة مجهولة
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold mb-3 block">أعضاء اللجنة</Label>
              <div className="space-y-2">
                {panelMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{member.weight}%</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold mb-3 block">إعدادات إضافية</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">النتائج المرجحة</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">التصويت الجماعي</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">تحديد حد أدنى</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="candidates">المرشحون</TabsTrigger>
          <TabsTrigger value="reviews">التقييمات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="candidates" className="mt-6">
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{candidate.name}</CardTitle>
                      <CardDescription>{candidate.position}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        AI: {candidate.aiScore}%
                      </Badge>
                      {candidate.panelAverageScore && (
                        <Badge>
                          اللجنة: {candidate.panelAverageScore}/5
                        </Badge>
                      )}
                      <Badge className={
                        candidate.status === 'completed' ? 'bg-green-500 text-white' :
                        candidate.status === 'pending' ? 'bg-yellow-500 text-white' :
                        'bg-gray-500 text-white'
                      }>
                        {candidate.status === 'completed' ? 'مكتمل' : 'معلق'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Recording Player */}
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">تسجيل المقابلة</h4>
                        <span className="text-sm text-muted-foreground">{candidate.recordingDuration}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="outline">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm">00:00</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div className="w-[25%] bg-primary h-2 rounded-full"></div>
                          </div>
                          <span className="text-sm">{candidate.recordingDuration}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          {volume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Review Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">حالة المراجعة</h5>
                        <div className="space-y-2">
                          {panelMembers.map((member) => {
                            const review = candidate.reviews?.find(r => r.memberId === member.id);
                            return (
                              <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs">
                                    {member.avatar}
                                  </div>
                                  <span className="text-sm">{member.name}</span>
                                </div>
                                {review ? (
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-green-500 text-white">
                                      {review.overallScore}/5
                                    </Badge>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  </div>
                                ) : (
                                  <Clock className="w-4 h-4 text-yellow-600" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-2">ملخص التقييم</h5>
                        {candidate.panelAverageScore ? (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>متوسط اللجنة:</span>
                              <span className="font-semibold">{candidate.panelAverageScore}/5</span>
                            </div>
                            <div className="flex justify-between">
                              <span>درجة الذكاء الاصطناعي:</span>
                              <span className="font-semibold">{candidate.aiScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>النتيجة المدمجة:</span>
                              <span className="font-semibold text-primary">{candidate.aiCombinedScore}%</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">في انتظار اكتمال المراجعات</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            عرض التفاصيل
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
                          <DialogHeader>
                            <DialogTitle>تفاصيل المراجعة - {candidate.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            {candidate.reviews?.map((review) => (
                              <Card key={review.memberId}>
                                <CardHeader>
                                  <CardTitle className="text-lg">{review.memberName}</CardTitle>
                                  <CardDescription>مراجعة في {review.reviewedAt}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-5 gap-4">
                                      {competencyAreas.map((area) => (
                                        <div key={area.key} className="text-center">
                                          <area.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                                          <p className="text-sm text-muted-foreground">{area.label}</p>
                                          <p className="font-semibold">{review.competencies[area.key]}/5</p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="text-center p-3 bg-primary/10 rounded">
                                      <p className="text-sm text-muted-foreground">التقييم الإجمالي</p>
                                      <p className="text-2xl font-bold text-primary">{review.overallScore}/5</p>
                                    </div>
                                    <div>
                                      <h5 className="font-semibold mb-2">التعليقات:</h5>
                                      <p className="text-sm bg-muted/50 p-3 rounded">{review.comments}</p>
                                    </div>
                                    {review.timestampNotes && review.timestampNotes.length > 0 && (
                                      <div>
                                        <h5 className="font-semibold mb-2">ملاحظات زمنية:</h5>
                                        <div className="space-y-2">
                                          {review.timestampNotes.map((note, index) => (
                                            <div key={index} className="flex gap-3 p-2 bg-muted/30 rounded">
                                              <Badge variant="outline" className="shrink-0">
                                                {note.time}
                                              </Badge>
                                              <p className="text-sm">{note.note}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        إضافة تقييم
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>منطقة التقييم السريع</CardTitle>
              <CardDescription>قم بتقييم المرشحين بسرعة وكفاءة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">اختر مرشح للتقييم</h3>
                <p className="text-muted-foreground">حدد أحد المرشحين من القائمة أعلاه لبدء التقييم</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">متوسط اللجنة</p>
                    <p className="text-2xl font-bold">4.35/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">التوافق مع الذكاء الاصطناعي</p>
                    <p className="text-2xl font-bold">87%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">متوسط وقت المراجعة</p>
                    <p className="text-2xl font-bold">25 دقيقة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">معدل الإكمال</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تحليلات مفصلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">أداء أعضاء اللجنة</h4>
                  <div className="space-y-3">
                    {panelMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">متوسط النقاط: 4.2/5</p>
                          <p className="text-sm text-muted-foreground">3 تقييمات مكتملة</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};