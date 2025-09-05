import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  Star, 
  Target,
  TrendingUp,
  Users,
  Shield,
  Bell,
  Zap,
  Gift,
  Download,
  Settings
} from 'lucide-react';

export const LeaderboardGamification: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [leaderboardData, setLeaderboardData] = useState([
    {
      rank: 1,
      branchId: 'riyadh',
      branchName: 'الفرع الرئيسي - الرياض',
      branchNameEn: 'Main Branch - Riyadh',
      manager: 'أحمد محمد',
      totalScore: 2850,
      badges: ['security_champion', 'fast_responder', 'compliance_master'],
      level: 'Platinum',
      achievements: {
        security: 95,
        notifications: 88,
        compliance: 92,
        user_management: 85
      },
      trend: 'up'
    },
    {
      rank: 2,
      branchId: 'jeddah',
      branchName: 'فرع جدة',
      branchNameEn: 'Jeddah Branch',
      manager: 'فاطمة علي',
      totalScore: 2650,
      badges: ['notification_expert', 'team_player'],
      level: 'Gold',
      achievements: {
        security: 82,
        notifications: 95,
        compliance: 78,
        user_management: 90
      },
      trend: 'up'
    },
    {
      rank: 3,
      branchId: 'dammam',
      branchName: 'فرع الدمام',
      branchNameEn: 'Dammam Branch',
      manager: 'محمد عبدالله',
      totalScore: 2450,
      badges: ['steady_performer'],
      level: 'Silver',
      achievements: {
        security: 75,
        notifications: 80,
        compliance: 85,
        user_management: 78
      },
      trend: 'stable'
    }
  ]);

  const [badges, setBadges] = useState([
    {
      id: 'security_champion',
      name: isRTL ? 'بطل الأمان' : 'Security Champion',
      description: isRTL ? 'تحقيق 90%+ في معايير الأمان' : 'Achieve 90%+ in security metrics',
      icon: Shield,
      color: 'text-blue-600',
      requirements: 'security >= 90',
      rarity: 'rare'
    },
    {
      id: 'fast_responder',
      name: isRTL ? 'الأسرع استجابة' : 'Fast Responder',
      description: isRTL ? 'الرد على الإشعارات خلال ساعة' : 'Respond to notifications within 1 hour',
      icon: Zap,
      color: 'text-yellow-600',
      requirements: 'response_time <= 60',
      rarity: 'common'
    },
    {
      id: 'compliance_master',
      name: isRTL ? 'خبير الامتثال' : 'Compliance Master',
      description: isRTL ? 'تحقيق 95%+ في معايير الامتثال' : 'Achieve 95%+ in compliance metrics', 
      icon: Award,
      color: 'text-green-600',
      requirements: 'compliance >= 95',
      rarity: 'legendary'
    },
    {
      id: 'notification_expert',
      name: isRTL ? 'خبير الإشعارات' : 'Notification Expert',
      description: isRTL ? 'إدارة ممتازة للإشعارات والتنبيهات' : 'Excellent notification management',
      icon: Bell,
      color: 'text-purple-600',
      requirements: 'notifications >= 90',
      rarity: 'rare'
    },
    {
      id: 'team_player',
      name: isRTL ? 'روح الفريق' : 'Team Player',
      description: isRTL ? 'التصدر في العمل الجماعي' : 'Leading in teamwork',
      icon: Users,
      color: 'text-pink-600',
      requirements: 'team_score >= 85',
      rarity: 'common'
    },
    {
      id: 'steady_performer',
      name: isRTL ? 'الأداء المستقر' : 'Steady Performer',
      description: isRTL ? 'أداء ثابت لمدة 3 أشهر' : 'Consistent performance for 3 months',
      icon: Target,
      color: 'text-orange-600',
      requirements: 'consistency >= 80',
      rarity: 'common'
    }
  ]);

  const [gamificationSettings, setGamificationSettings] = useState({
    enabled: true,
    autoRewards: true,
    publicLeaderboard: true,
    monthlyReset: false,
    pointsMultiplier: 1.0,
    badgeNotifications: true,
    levelUpRewards: true
  });

  const getBadgeIcon = (badgeId: string) => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return Award;
    return badge.icon;
  };

  const getBadgeColor = (badgeId: string) => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return 'text-gray-600';
    return badge.color;
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'Bronze': { color: 'bg-orange-100 text-orange-800', icon: Medal },
      'Silver': { color: 'bg-gray-100 text-gray-800', icon: Medal },
      'Gold': { color: 'bg-yellow-100 text-yellow-800', icon: Award },
      'Platinum': { color: 'bg-purple-100 text-purple-800', icon: Crown }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig];
    return { ...config, icon: config?.icon || Medal };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const handleSettingsChange = (key: string, value: boolean) => {
    setGamificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExportLeaderboard = () => {
    console.log('Exporting leaderboard data');
  };

  const handleResetScores = () => {
    console.log('Resetting monthly scores');
  };

  return (
    <div className="space-y-6">
      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-lg">
                  {isRTL ? 'لوحة المتصدرين' : 'Leaderboard'}
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'ترتيب الفروع حسب الأداء الشامل' : 'Branch ranking by overall performance'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="current_month">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current_month">{isRTL ? 'الشهر الحالي' : 'Current Month'}</SelectItem>
                  <SelectItem value="last_month">{isRTL ? 'الشهر السابق' : 'Last Month'}</SelectItem>
                  <SelectItem value="quarter">{isRTL ? 'الربع الحالي' : 'Current Quarter'}</SelectItem>
                  <SelectItem value="year">{isRTL ? 'السنة الحالية' : 'Current Year'}</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExportLeaderboard} variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                {isRTL ? 'تصدير' : 'Export'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((branch) => {
              const levelBadge = getLevelBadge(branch.level);
              return (
                <div key={branch.branchId} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      {branch.rank === 1 ? (
                        <Crown className="w-6 h-6 text-yellow-600" />
                      ) : branch.rank === 2 ? (
                        <Medal className="w-6 h-6 text-gray-600" />
                      ) : branch.rank === 3 ? (
                        <Medal className="w-6 h-6 text-orange-600" />
                      ) : (
                        <span className="text-lg font-bold text-primary">#{branch.rank}</span>
                      )}
                    </div>
                    
                    {/* Branch Info */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-lg">
                          {isRTL ? branch.branchName : branch.branchNameEn}
                        </span>
                        <Badge className={levelBadge.color}>
                          {branch.level}
                        </Badge>
                        {getTrendIcon(branch.trend)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {isRTL ? `المدير: ${branch.manager}` : `Manager: ${branch.manager}`}
                      </span>
                      
                      {/* Badges */}
                      <div className="flex items-center gap-1 mt-2">
                        {branch.badges.map((badgeId) => {
                          const IconComponent = getBadgeIcon(badgeId);
                          const color = getBadgeColor(badgeId);
                          return (
                            <div key={badgeId} className={`p-1 rounded ${color}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="flex items-center gap-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{branch.totalScore}</div>
                        <div className="text-xs text-muted-foreground">{isRTL ? 'النقاط' : 'Points'}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          <Progress value={branch.achievements.security} className="w-16 h-2" />
                          <span className="text-xs">{branch.achievements.security}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-purple-600" />
                          <Progress value={branch.achievements.notifications} className="w-16 h-2" />
                          <span className="text-xs">{branch.achievements.notifications}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Badge System */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">
              {isRTL ? 'نظام الشارات' : 'Badge System'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div key={badge.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-accent ${badge.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{badge.name}</span>
                        <Badge variant={badge.rarity === 'legendary' ? 'default' : 'secondary'} className="text-xs">
                          {badge.rarity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  <div className="mt-2 text-xs font-mono text-muted-foreground bg-accent px-2 py-1 rounded">
                    {badge.requirements}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gamification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">
              {isRTL ? 'إعدادات التلعيب' : 'Gamification Settings'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{isRTL ? 'تفعيل نظام التلعيب' : 'Enable Gamification'}</span>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'تفعيل النقاط والشارات والمستويات' : 'Enable points, badges, and levels system'}
              </p>
            </div>
            <Switch
              checked={gamificationSettings.enabled}
              onCheckedChange={(checked) => handleSettingsChange('enabled', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{isRTL ? 'المكافآت التلقائية' : 'Auto Rewards'}</span>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'منح الشارات والمكافآت تلقائياً' : 'Grant badges and rewards automatically'}
              </p>
            </div>
            <Switch
              checked={gamificationSettings.autoRewards}
              onCheckedChange={(checked) => handleSettingsChange('autoRewards', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{isRTL ? 'لوحة المتصدرين العامة' : 'Public Leaderboard'}</span>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'عرض الترتيب لجميع الفروع' : 'Show ranking to all branches'}
              </p>
            </div>
            <Switch
              checked={gamificationSettings.publicLeaderboard}
              onCheckedChange={(checked) => handleSettingsChange('publicLeaderboard', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{isRTL ? 'إعادة تعيين شهرية' : 'Monthly Reset'}</span>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'إعادة تعيين النقاط في بداية كل شهر' : 'Reset points at the beginning of each month'}
              </p>
            </div>
            <Switch
              checked={gamificationSettings.monthlyReset}
              onCheckedChange={(checked) => handleSettingsChange('monthlyReset', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{isRTL ? 'إشعارات الشارات' : 'Badge Notifications'}</span>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'إرسال إشعار عند الحصول على شارة جديدة' : 'Send notification when earning new badges'}
              </p>
            </div>
            <Switch
              checked={gamificationSettings.badgeNotifications}
              onCheckedChange={(checked) => handleSettingsChange('badgeNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{isRTL ? 'مكافآت ترقية المستوى' : 'Level Up Rewards'}</span>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'منح مكافآت خاصة عند ترقية المستوى' : 'Grant special rewards on level promotion'}
              </p>
            </div>
            <Switch
              checked={gamificationSettings.levelUpRewards}
              onCheckedChange={(checked) => handleSettingsChange('levelUpRewards', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <Button onClick={handleResetScores} variant="outline" className="gap-2">
          <Trophy className="w-4 h-4" />
          {isRTL ? 'إعادة تعيين النقاط' : 'Reset Scores'}
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Gift className="w-4 h-4" />
            {isRTL ? 'إنشاء مكافأة' : 'Create Reward'}
          </Button>
          <Button className="gap-2">
            <Star className="w-4 h-4" />
            {isRTL ? 'إضافة شارة' : 'Add Badge'}
          </Button>
        </div>
      </div>
    </div>
  );
};