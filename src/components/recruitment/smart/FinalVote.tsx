import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Vote, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Users,
  UserCheck,
  Shield,
  TrendingUp,
  FileText,
  Award,
  Target,
  Star,
  Eye,
  Download,
  Send,
  Settings,
  Calendar,
  User
} from 'lucide-react';

export const FinalVote = () => {
  const [activeTab, setActiveTab] = useState('voting');
  const [voteSettings, setVoteSettings] = useState({
    voteType: 'majority', // majority, weighted, unanimous
    threshold: 70,
    allowOverride: true,
    requireJustification: true,
    anonymousVoting: false
  });

  const candidates = [
    {
      id: 1,
      name: 'أحمد محمد العتيبي',
      position: 'مطور Full Stack',
      aiScore: 92,
      panelAverage: 4.35,
      combinedScore: 89,
      status: 'voting', // voting, approved, rejected, pending
      votes: [
        { memberId: 1, memberName: 'د. محمد الأحمد', vote: 'approve', weight: 30, justification: 'مرشح ممتاز مع مهارات تقنية قوية', timestamp: '2024-01-20 16:30' },
        { memberId: 2, memberName: 'أ. فاطمة السعيد', vote: 'approve', weight: 25, justification: 'خبرة جيدة وتواصل ممتاز', timestamp: '2024-01-20 17:00' },
        { memberId: 3, memberName: 'أ. خالد المطيري', vote: 'pending', weight: 25, justification: '', timestamp: null },
        { memberId: 4, memberName: 'د. نورا العتيبي', vote: 'pending', weight: 20, justification: '', timestamp: null }
      ],
      currentVoteWeight: 55,
      voteResult: 'pending',
      finalDecision: null,
      decisionDate: null,
      nextStep: 'في انتظار التصويت'
    },
    {
      id: 2,
      name: 'فاطمة سالم القحطاني',
      position: 'محاسب أول',
      aiScore: 88,
      panelAverage: 4.7,
      combinedScore: 91,
      status: 'approved',
      votes: [
        { memberId: 1, memberName: 'د. محمد الأحمد', vote: 'approve', weight: 30, justification: 'مرشحة استثنائية بخبرة واسعة', timestamp: '2024-01-19 15:45' },
        { memberId: 2, memberName: 'أ. فاطمة السعيد', vote: 'approve', weight: 25, justification: 'مؤهلات ممتازة ومهارات قيادية', timestamp: '2024-01-19 16:20' },
        { memberId: 3, memberName: 'أ. خالد المطيري', vote: 'approve', weight: 25, justification: 'تواصل رائع وخبرة مميزة', timestamp: '2024-01-19 16:45' },
        { memberId: 4, memberName: 'د. نورا العتيبي', vote: 'approve', weight: 20, justification: 'إضافة قوية للفريق', timestamp: '2024-01-19 17:10' }
      ],
      currentVoteWeight: 100,
      voteResult: 'approved',
      finalDecision: 'approved',
      decisionDate: '2024-01-19 17:15',
      nextStep: 'إرسال العرض'
    },
    {
      id: 3,
      name: 'خالد عبدالله المطيري',
      position: 'مدير مشروع',
      aiScore: 75,
      panelAverage: 3.8,
      combinedScore: 76,
      status: 'rejected',
      votes: [
        { memberId: 1, memberName: 'د. محمد الأحمد', vote: 'reject', weight: 30, justification: 'توقعات راتب عالية جداً', timestamp: '2024-01-18 14:30' },
        { memberId: 2, memberName: 'أ. فاطمة السعيد', vote: 'wait', weight: 25, justification: 'يحتاج مزيد من التقييم', timestamp: '2024-01-18 15:00' },
        { memberId: 3, memberName: 'أ. خالد المطيري', vote: 'reject', weight: 25, justification: 'عدم توافق ثقافي واضح', timestamp: '2024-01-18 15:30' },
        { memberId: 4, memberName: 'د. نورا العتيبي', vote: 'approve', weight: 20, justification: 'خبرة إدارية جيدة', timestamp: '2024-01-18 16:00' }
      ],
      currentVoteWeight: 55,
      voteResult: 'rejected',
      finalDecision: 'rejected',
      decisionDate: '2024-01-18 16:15',
      nextStep: 'أرشفة'
    }
  ];

  const voteOptions = [
    { value: 'approve', label: 'موافقة', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { value: 'reject', label: 'رفض', icon: XCircle, color: 'text-red-600 bg-red-50' },
    { value: 'wait', label: 'انتظار', icon: Clock, color: 'text-yellow-600 bg-yellow-50' }
  ];

  const getVoteColor = (vote: string) => {
    switch (vote) {
      case 'approve': return 'bg-green-500 text-white';
      case 'reject': return 'bg-red-500 text-white';
      case 'wait': return 'bg-yellow-500 text-white';
      case 'pending': return 'bg-gray-400 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      case 'voting': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const calculateVoteResult = (candidate: any) => {
    const approveWeight = candidate.votes.filter(v => v.vote === 'approve').reduce((sum: number, v: any) => sum + v.weight, 0);
    const rejectWeight = candidate.votes.filter(v => v.vote === 'reject').reduce((sum: number, v: any) => sum + v.weight, 0);
    const waitWeight = candidate.votes.filter(v => v.vote === 'wait').reduce((sum: number, v: any) => sum + v.weight, 0);
    const totalVoted = approveWeight + rejectWeight + waitWeight;
    
    if (totalVoted < 100) return 'pending';
    if (voteSettings.voteType === 'majority') {
      if (approveWeight > 50) return 'approved';
      if (rejectWeight > 50) return 'rejected';
      return 'tie';
    } else if (voteSettings.voteType === 'weighted') {
      if (approveWeight >= voteSettings.threshold) return 'approved';
      return 'rejected';
    }
    return 'pending';
  };

  const VotingCard = ({ candidate }) => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{candidate.name}</CardTitle>
            <CardDescription>{candidate.position}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(candidate.status)}>
              {candidate.status === 'approved' ? 'موافق عليه' :
               candidate.status === 'rejected' ? 'مرفوض' :
               candidate.status === 'voting' ? 'قيد التصويت' : 'معلق'}
            </Badge>
            <Badge variant="outline">
              {candidate.combinedScore}% إجمالي
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Score Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{candidate.aiScore}%</p>
              <p className="text-sm text-muted-foreground">الذكاء الاصطناعي</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{candidate.panelAverage}/5</p>
              <p className="text-sm text-muted-foreground">متوسط اللجنة</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{candidate.combinedScore}%</p>
              <p className="text-sm text-muted-foreground">النتيجة المدمجة</p>
            </div>
          </div>

          {/* Vote Progress */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-semibold">تقدم التصويت</h5>
              <span className="text-sm text-muted-foreground">{candidate.currentVoteWeight}% مكتمل</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${candidate.currentVoteWeight}%` }}
              ></div>
            </div>
            
            {/* Individual Votes */}
            <div className="space-y-2">
              {candidate.votes.map((vote, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold">
                      {vote.memberName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{vote.memberName}</p>
                      <p className="text-xs text-muted-foreground">وزن {vote.weight}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {vote.vote !== 'pending' && vote.timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(vote.timestamp).toLocaleDateString('ar-SA')}
                      </span>
                    )}
                    <Badge className={getVoteColor(vote.vote)}>
                      {vote.vote === 'approve' ? 'موافقة' :
                       vote.vote === 'reject' ? 'رفض' :
                       vote.vote === 'wait' ? 'انتظار' : 'معلق'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vote Justifications */}
          <div className="space-y-2">
            <h5 className="font-semibold">مبررات التصويت</h5>
            {candidate.votes.filter(v => v.justification).map((vote, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{vote.memberName}</span>
                  <Badge className={getVoteColor(vote.vote)}>
                    {vote.vote === 'approve' ? 'موافقة' : vote.vote === 'reject' ? 'رفض' : 'انتظار'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{vote.justification}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-2">
              {candidate.finalDecision && (
                <Badge variant="outline">
                  القرار النهائي: {candidate.finalDecision === 'approved' ? 'موافقة' : 'رفض'}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">{candidate.nextStep}</span>
            </div>
            <div className="flex gap-2">
              {candidate.status === 'voting' && (
                <Button size="sm" variant="outline">
                  <Vote className="w-4 h-4 mr-1" />
                  تصويت
                </Button>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    تفاصيل
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>تفاصيل التصويت - {candidate.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>النتيجة المحسوبة</Label>
                        <p className="text-lg font-semibold">{calculateVoteResult(candidate)}</p>
                      </div>
                      <div>
                        <Label>تاريخ القرار</Label>
                        <p className="text-sm">{candidate.decisionDate || 'لم يتم بعد'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label>ملخص الأصوات</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div className="text-center p-3 bg-green-50 rounded">
                          <p className="text-lg font-bold text-green-600">
                            {candidate.votes.filter(v => v.vote === 'approve').reduce((s, v) => s + v.weight, 0)}%
                          </p>
                          <p className="text-sm">موافقة</p>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded">
                          <p className="text-lg font-bold text-red-600">
                            {candidate.votes.filter(v => v.vote === 'reject').reduce((s, v) => s + v.weight, 0)}%
                          </p>
                          <p className="text-sm">رفض</p>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded">
                          <p className="text-lg font-bold text-yellow-600">
                            {candidate.votes.filter(v => v.vote === 'wait').reduce((s, v) => s + v.weight, 0)}%
                          </p>
                          <p className="text-sm">انتظار</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {(candidate.status === 'approved' || candidate.status === 'rejected') && (
                <Button size="sm">
                  <Send className="w-4 h-4 mr-1" />
                  {candidate.status === 'approved' ? 'إرسال عرض' : 'إشعار رفض'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Vote className="w-6 h-6 text-primary" />
            التصويت النهائي
          </h2>
          <p className="text-muted-foreground">نظام التصويت والموافقات النهائية للمرشحين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            تقرير التصويت
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            إعدادات التصويت
          </Button>
        </div>
      </div>

      {/* Vote Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            إعدادات التصويت
          </CardTitle>
          <CardDescription>تخصيص قواعد وآليات التصويت</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-semibold">نوع التصويت</Label>
              <Select value={voteSettings.voteType} onValueChange={(value) => setVoteSettings(prev => ({ ...prev, voteType: value }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="majority">قاعدة الأغلبية</SelectItem>
                  <SelectItem value="weighted">تصويت مرجح</SelectItem>
                  <SelectItem value="unanimous">إجماع كامل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-semibold">الحد الأدنى للموافقة (%)</Label>
              <Input
                type="number"
                value={voteSettings.threshold}
                onChange={(e) => setVoteSettings(prev => ({ ...prev, threshold: parseInt(e.target.value) }))}
                className="mt-2"
                min={50}
                max={100}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">السماح بالتجاوز التنفيذي</Label>
                <Switch
                  checked={voteSettings.allowOverride}
                  onCheckedChange={(checked) => setVoteSettings(prev => ({ ...prev, allowOverride: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">تبرير إجباري</Label>
                <Switch
                  checked={voteSettings.requireJustification}
                  onCheckedChange={(checked) => setVoteSettings(prev => ({ ...prev, requireJustification: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">تصويت مجهول</Label>
                <Switch
                  checked={voteSettings.anonymousVoting}
                  onCheckedChange={(checked) => setVoteSettings(prev => ({ ...prev, anonymousVoting: checked }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="voting">التصويت النشط</TabsTrigger>
          <TabsTrigger value="approved">المقبولين</TabsTrigger>
          <TabsTrigger value="rejected">المرفوضين</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="voting" className="mt-6">
          <div className="space-y-4">
            {candidates.filter(c => c.status === 'voting').map(candidate => (
              <VotingCard key={candidate.id} candidate={candidate} />
            ))}
            {candidates.filter(c => c.status === 'voting').length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Vote className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">لا توجد تصويتات نشطة</h3>
                  <p className="text-muted-foreground">جميع المرشحين تم اتخاذ قرار بشأنهم</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="space-y-4">
            {candidates.filter(c => c.status === 'approved').map(candidate => (
              <VotingCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="space-y-4">
            {candidates.filter(c => c.status === 'rejected').map(candidate => (
              <VotingCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">معدل الموافقة</p>
                    <p className="text-2xl font-bold">67%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">متوسط وقت التصويت</p>
                    <p className="text-2xl font-bold">3.2 أيام</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">التوافق مع الذكاء الاصطناعي</p>
                    <p className="text-2xl font-bold">85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">إجماع الآراء</p>
                    <p className="text-2xl font-bold">78%</p>
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
                  <h4 className="font-semibold mb-4">نتائج التصويت حسب الوقت</h4>
                  <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">رسم بياني لنتائج التصويت (سيتم تطويره)</p>
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