import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, 
  Trophy, 
  Users, 
  Calendar, 
  Plus,
  Edit3,
  Trash2,
  Play,
  Pause,
  Award,
  Zap,
  Crown,
  Clock,
  Flag,
  CheckCircle
} from 'lucide-react';

export const ChallengesSystem: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [challenges, setChallenges] = useState([
    {
      id: '1',
      title: isRTL ? 'تحدي الأمان الشهري' : 'Monthly Security Challenge',
      description: isRTL ? 'تحقيق 95% في معايير الأمان لمدة شهر كامل' : 'Achieve 95% security metrics for a full month',
      type: 'security',
      mode: 'individual',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      participants: 8,
      completions: 3,
      rewards: {
        points: 500,
        badge: 'security_master',
        certificate: true
      },
      criteria: {
        metric: 'security_score',
        target: 95,
        duration: 30
      },
      progress: 65
    },
    {
      id: '2',
      title: isRTL ? 'سباق الاستجابة السريعة' : 'Rapid Response Race',
      description: isRTL ? 'الرد على الإشعارات خلال 30 دقيقة' : 'Respond to notifications within 30 minutes',
      type: 'notifications',
      mode: 'team',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      participants: 12,
      completions: 7,
      rewards: {
        points: 300,
        badge: 'lightning_bolt',
        certificate: false
      },
      criteria: {
        metric: 'response_time',
        target: 30,
        duration: 30
      },
      progress: 80
    },
    {
      id: '3',
      title: isRTL ? 'ماراثون الامتثال' : 'Compliance Marathon',
      description: isRTL ? 'تحدي جماعي للوصول لـ 100% امتثال' : 'Team challenge to reach 100% compliance',
      type: 'compliance',
      mode: 'team_vs_team',
      status: 'upcoming',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      participants: 0,
      completions: 0,
      rewards: {
        points: 1000,
        badge: 'compliance_champion',
        certificate: true
      },
      criteria: {
        metric: 'compliance_rate',
        target: 100,
        duration: 28
      },
      progress: 0
    },
    {
      id: '4',
      title: isRTL ? 'بطولة إدارة المستخدمين' : 'User Management Championship',
      description: isRTL ? 'أفضل إدارة للمستخدمين والصلاحيات' : 'Best user and permissions management',
      type: 'user_management',
      mode: 'individual',
      status: 'completed',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      participants: 6,
      completions: 4,
      rewards: {
        points: 400,
        badge: 'user_master',
        certificate: true
      },
      criteria: {
        metric: 'user_management_score',
        target: 90,
        duration: 31
      },
      progress: 100
    }
  ]);

  const [teams, setTeams] = useState([
    {
      id: '1',
      name: isRTL ? 'فريق المنطقة الوسطى' : 'Central Region Team',
      members: ['الرياض', 'القصيم', 'حائل'],
      totalScore: 2450,
      rank: 1,
      activeChallenges: 2
    },
    {
      id: '2',
      name: isRTL ? 'فريق المنطقة الغربية' : 'Western Region Team',
      members: ['جدة', 'مكة', 'المدينة'],
      totalScore: 2280,
      rank: 2,
      activeChallenges: 2
    },
    {
      id: '3',
      name: isRTL ? 'فريق المنطقة الشرقية' : 'Eastern Region Team',
      members: ['الدمام', 'الجبيل', 'الأحساء'],
      totalScore: 2150,
      rank: 3,
      activeChallenges: 1
    }
  ]);

  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    type: 'security',
    mode: 'individual',
    startDate: '',
    endDate: '',
    target: 90,
    points: 300,
    badge: '',
    certificate: false
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: isRTL ? 'نشط' : 'Active' },
      upcoming: { color: 'bg-blue-100 text-blue-800', label: isRTL ? 'قريباً' : 'Upcoming' },
      completed: { color: 'bg-gray-100 text-gray-800', label: isRTL ? 'مكتمل' : 'Completed' },
      paused: { color: 'bg-yellow-100 text-yellow-800', label: isRTL ? 'متوقف' : 'Paused' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      security: Target,
      notifications: Zap, 
      compliance: Award,
      user_management: Users
    };
    
    return typeIcons[type as keyof typeof typeIcons] || Target;
  };

  const getModeIcon = (mode: string) => {
    const modeIcons = {
      individual: Target,
      team: Users,
      team_vs_team: Trophy
    };
    
    return modeIcons[mode as keyof typeof modeIcons] || Target;
  };

  const handleCreateChallenge = () => {
    console.log('Creating new challenge:', newChallenge);
  };

  const handleEditChallenge = (challengeId: string) => {
    console.log('Editing challenge:', challengeId);
  };

  const handleDeleteChallenge = (challengeId: string) => {
    console.log('Deleting challenge:', challengeId);
  };

  const handleStartChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, status: 'active' }
        : challenge
    ));
  };

  const handlePauseChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, status: 'paused' }
        : challenge
    ));
  };

  return (
    <div className="space-y-6">
      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-lg">
                  {isRTL ? 'التحديات النشطة' : 'Active Challenges'}
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'التحديات الجارية والقادمة' : 'Ongoing and upcoming challenges'}
                </CardDescription>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  {isRTL ? 'إنشاء تحدي' : 'Create Challenge'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{isRTL ? 'إنشاء تحدي جديد' : 'Create New Challenge'}</DialogTitle>
                  <DialogDescription>
                    {isRTL ? 'أنشئ تحدي جديد للفروع' : 'Create a new challenge for branches'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{isRTL ? 'عنوان التحدي' : 'Challenge Title'}</Label>
                      <Input
                        value={newChallenge.title}
                        onChange={(e) => setNewChallenge(prev => ({ ...prev, title: e.target.value }))}
                        placeholder={isRTL ? 'أدخل عنوان التحدي' : 'Enter challenge title'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'نوع التحدي' : 'Challenge Type'}</Label>
                      <Select value={newChallenge.type} onValueChange={(value) => setNewChallenge(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="security">{isRTL ? 'الأمان' : 'Security'}</SelectItem>
                          <SelectItem value="notifications">{isRTL ? 'الإشعارات' : 'Notifications'}</SelectItem>
                          <SelectItem value="compliance">{isRTL ? 'الامتثال' : 'Compliance'}</SelectItem>
                          <SelectItem value="user_management">{isRTL ? 'إدارة المستخدمين' : 'User Management'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{isRTL ? 'وصف التحدي' : 'Challenge Description'}</Label>
                    <Textarea
                      value={newChallenge.description}
                      onChange={(e) => setNewChallenge(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={isRTL ? 'اشرح تفاصيل التحدي' : 'Explain the challenge details'}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>{isRTL ? 'نمط التحدي' : 'Challenge Mode'}</Label>
                      <Select value={newChallenge.mode} onValueChange={(value) => setNewChallenge(prev => ({ ...prev, mode: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">{isRTL ? 'فردي' : 'Individual'}</SelectItem>
                          <SelectItem value="team">{isRTL ? 'جماعي' : 'Team'}</SelectItem>
                          <SelectItem value="team_vs_team">{isRTL ? 'فريق ضد فريق' : 'Team vs Team'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'الهدف %' : 'Target %'}</Label>
                      <Input
                        type="number"
                        value={newChallenge.target}
                        onChange={(e) => setNewChallenge(prev => ({ ...prev, target: parseInt(e.target.value) }))}
                        min="1"
                        max="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'النقاط' : 'Points'}</Label>
                      <Input
                        type="number"
                        value={newChallenge.points}
                        onChange={(e) => setNewChallenge(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                        min="100"
                        step="50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{isRTL ? 'تاريخ البداية' : 'Start Date'}</Label>
                      <Input
                        type="date"
                        value={newChallenge.startDate}
                        onChange={(e) => setNewChallenge(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{isRTL ? 'تاريخ النهاية' : 'End Date'}</Label>
                      <Input
                        type="date"
                        value={newChallenge.endDate}
                        onChange={(e) => setNewChallenge(prev => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <DialogTrigger asChild>
                      <Button variant="outline">{isRTL ? 'إلغاء' : 'Cancel'}</Button>
                    </DialogTrigger>
                    <Button onClick={handleCreateChallenge}>
                      {isRTL ? 'إنشاء التحدي' : 'Create Challenge'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => {
              const TypeIcon = getTypeIcon(challenge.type);
              const ModeIcon = getModeIcon(challenge.mode);
              
              return (
                <div key={challenge.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TypeIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-lg">{challenge.title}</span>
                          {getStatusBadge(challenge.status)}
                          <Badge variant="outline" className="gap-1">
                            <ModeIcon className="w-3 h-3" />
                            {isRTL ? 
                              (challenge.mode === 'individual' ? 'فردي' : challenge.mode === 'team' ? 'جماعي' : 'فريق ضد فريق') :
                              challenge.mode.replace('_', ' ')
                            }
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {challenge.status === 'upcoming' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartChallenge(challenge.id)}
                          className="gap-1"
                        >
                          <Play className="w-4 h-4" />
                          {isRTL ? 'بدء' : 'Start'}
                        </Button>
                      )}
                      {challenge.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePauseChallenge(challenge.id)}
                          className="gap-1"
                        >
                          <Pause className="w-4 h-4" />
                          {isRTL ? 'إيقاف' : 'Pause'}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditChallenge(challenge.id)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteChallenge(challenge.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{challenge.startDate} - {challenge.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{challenge.participants} {isRTL ? 'مشارك' : 'participants'}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="w-4 h-4 text-yellow-600" />
                        <span>{challenge.rewards.points} {isRTL ? 'نقطة' : 'points'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span>{challenge.rewards.badge}</span>
                      </div>
                      {challenge.rewards.certificate && (
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{isRTL ? 'شهادة' : 'Certificate'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team vs Team Challenges */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">
              {isRTL ? 'تحديات الفرق' : 'Team Challenges'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div key={team.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{team.rank}</span>
                    </div>
                    <span className="font-medium">{team.name}</span>
                  </div>
                  {team.rank === 1 && <Crown className="w-5 h-5 text-yellow-600" />}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="text-2xl font-bold text-primary">{team.totalScore.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    {isRTL ? 'إجمالي النقاط' : 'Total Points'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{isRTL ? 'الأعضاء:' : 'Members:'}</span>
                    <div className="mt-1">
                      {team.members.map((member, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{isRTL ? 'التحديات النشطة:' : 'Active Challenges:'}</span>
                    <Badge variant="secondary">{team.activeChallenges}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenge Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'إجمالي التحديات' : 'Total Challenges'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'التحديات النشطة' : 'Active Challenges'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">28</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'إجمالي المشاركين' : 'Total Participants'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'التحديات المكتملة' : 'Completed Challenges'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};