import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Award, 
  Coins, 
  Trophy, 
  Gift,
  TrendingUp,
  Target,
  Crown,
  Zap,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Sparkles,
  Flame,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PointsData {
  employee_id: string;
  employee_name: string;
  accumulated_points: number;
  points_earned: number;
  points_deducted: number;
  reward_amount: number;
  reason: string;
  month_year: string;
  streak_days: number;
  level: string;
}

export const AttendancePointsRewards: React.FC = () => {
  const [pointsData, setPointsData] = useState<PointsData[]>([]);
  const [leaderboard, setLeaderboard] = useState<PointsData[]>([]);
  const [myPoints, setMyPoints] = useState<PointsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPointsData();
  }, []);

  const fetchPointsData = async () => {
    try {
      const { data: pointsData, error } = await supabase
        .from('attendance_points')
        .select(`
          *,
          boud_employees(first_name, last_name, employee_id)
        `)
        .order('accumulated_points', { ascending: false });

      if (error) throw error;

      const formattedData: PointsData[] = (pointsData || []).map(item => {
        const points = item.accumulated_points || 0;
        const level = getLevelFromPoints(points);
        const streakDays = Math.floor(Math.random() * 30) + 1; // محاكاة

        return {
          employee_id: item.employee_id,
          employee_name: `${item.boud_employees?.first_name || ''} ${item.boud_employees?.last_name || ''}`.trim(),
          accumulated_points: points,
          points_earned: item.points_earned || 0,
          points_deducted: item.points_deducted || 0,
          reward_amount: item.reward_amount || 0,
          reason: item.reason || '',
          month_year: item.month_year,
          streak_days: streakDays,
          level
        };
      });

      setPointsData(formattedData);
      setLeaderboard(formattedData.slice(0, 10));
      setMyPoints(formattedData[0] || null); // محاكاة المستخدم الحالي
      setLoading(false);
    } catch (error) {
      console.error('Error fetching points data:', error);
      toast.error('خطأ في تحميل بيانات النقاط');
      setLoading(false);
    }
  };

  const getLevelFromPoints = (points: number): string => {
    if (points >= 1000) return 'ماسي';
    if (points >= 500) return 'ذهبي';
    if (points >= 200) return 'فضي';
    if (points >= 50) return 'برونزي';
    return 'مبتدئ';
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'ماسي': return 'bg-purple-100 text-purple-800';
      case 'ذهبي': return 'bg-yellow-100 text-yellow-800';
      case 'فضي': return 'bg-gray-100 text-gray-800';
      case 'برونزي': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ماسي': return <Crown className="h-5 w-5 text-purple-600" />;
      case 'ذهبي': return <Trophy className="h-5 w-5 text-yellow-600" />;
      case 'فضي': return <Award className="h-5 w-5 text-gray-600" />;
      case 'برونزي': return <Star className="h-5 w-5 text-orange-600" />;
      default: return <Target className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNextLevelPoints = (currentPoints: number): number => {
    if (currentPoints >= 1000) return 1000;
    if (currentPoints >= 500) return 1000;
    if (currentPoints >= 200) return 500;
    if (currentPoints >= 50) return 200;
    return 50;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-orange-500" />;
      default: return <Star className="h-5 w-5 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <Star className="h-12 w-12 animate-spin mx-auto mb-4 text-yellow-500" />
            <p className="text-lg text-muted-foreground">جاري تحميل نظام النقاط والمكافآت...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
            نظام النقاط والمكافآت
          </h1>
          <p className="text-lg text-muted-foreground">
            اكسب النقاط من خلال الالتزام بالحضور واستبدلها بمكافآت قيمة
          </p>
        </div>

        {/* My Points Overview */}
        {myPoints && (
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Sparkles className="h-6 w-6" />
                نقاطي الحالية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {myPoints.accumulated_points}
                  </div>
                  <div className="text-sm text-muted-foreground">النقاط المتراكمة</div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {getLevelIcon(myPoints.level)}
                    <Badge className={getLevelColor(myPoints.level)}>
                      {myPoints.level}
                    </Badge>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    +{myPoints.points_earned}
                  </div>
                  <div className="text-sm text-muted-foreground">نقاط مكتسبة</div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600">هذا الشهر</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {myPoints.streak_days}
                  </div>
                  <div className="text-sm text-muted-foreground">أيام متتالية</div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-xs text-orange-600">سلسلة الحضور</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {myPoints.reward_amount} ر.س
                  </div>
                  <div className="text-sm text-muted-foreground">المكافآت المحققة</div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Gift className="h-4 w-4 text-purple-500" />
                    <span className="text-xs text-purple-600">هذا الشهر</span>
                  </div>
                </div>
              </div>

              {/* Progress to Next Level */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>التقدم للمستوى التالي</span>
                  <span>{myPoints.accumulated_points} / {getNextLevelPoints(myPoints.accumulated_points)} نقطة</span>
                </div>
                <Progress 
                  value={(myPoints.accumulated_points / getNextLevelPoints(myPoints.accumulated_points)) * 100} 
                  className="h-3"
                />
                <div className="text-xs text-muted-foreground mt-2 text-center">
                  تحتاج {getNextLevelPoints(myPoints.accumulated_points) - myPoints.accumulated_points} نقطة للوصول للمستوى التالي
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard and Rewards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                لوحة المتصدرين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((employee, index) => (
                  <div 
                    key={employee.employee_id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      index < 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(index + 1)}
                        <span className="font-bold text-lg">#{index + 1}</span>
                      </div>
                      
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {employee.employee_name.charAt(0)}
                      </div>
                      
                      <div>
                        <h4 className="font-medium">{employee.employee_name}</h4>
                        <div className="flex items-center gap-2">
                          {getLevelIcon(employee.level)}
                          <Badge className={getLevelColor(employee.level)} variant="secondary">
                            {employee.level}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-600">
                        {employee.accumulated_points}
                      </div>
                      <div className="text-xs text-muted-foreground">نقطة</div>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <Flame className="h-3 w-3 text-orange-500" />
                        <span className="text-xs text-orange-600">{employee.streak_days} يوم</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rewards Store */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-purple-600" />
                متجر المكافآت
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'يوم إجازة إضافية', points: 100, color: 'text-green-600', icon: Calendar },
                  { name: 'قسيمة شراء 200 ر.س', points: 250, color: 'text-blue-600', icon: DollarSign },
                  { name: 'موقف سيارة مميز', points: 150, color: 'text-purple-600', icon: Star },
                  { name: 'وجبة غداء مجانية', points: 75, color: 'text-orange-600', icon: Gift },
                  { name: 'شهادة تقدير', points: 50, color: 'text-yellow-600', icon: Award },
                  { name: 'مرونة في وقت الحضور', points: 200, color: 'text-teal-600', icon: Clock }
                ].map((reward, index) => {
                  const canAfford = myPoints ? myPoints.accumulated_points >= reward.points : false;
                  
                  return (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border ${
                        canAfford ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <reward.icon className={`h-4 w-4 ${reward.color}`} />
                          <span className={`text-sm font-medium ${canAfford ? 'text-gray-900' : 'text-gray-500'}`}>
                            {reward.name}
                          </span>
                        </div>
                        {canAfford && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-bold text-yellow-700">{reward.points}</span>
                        </div>
                        
                        <Button 
                          size="sm" 
                          disabled={!canAfford}
                          className={canAfford ? 'bg-green-600 hover:bg-green-700' : ''}
                        >
                          {canAfford ? 'استبدال' : 'غير متاح'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-600" />
              نظام الإنجازات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'أسبوع مثالي',
                  description: 'حضور كامل بدون تأخير لمدة أسبوع',
                  reward: '+50 نقطة',
                  achieved: true,
                  icon: Target,
                  color: 'text-green-600 bg-green-100'
                },
                {
                  title: 'شهر الانضباط',
                  description: 'حضور منتظم لمدة شهر كامل',
                  reward: '+200 نقطة',
                  achieved: true,
                  icon: Calendar,
                  color: 'text-blue-600 bg-blue-100'
                },
                {
                  title: 'التحسن المستمر',
                  description: 'تحسن في نقاط الحضور لثلاثة أشهر متتالية',
                  reward: '+300 نقطة',
                  achieved: false,
                  icon: TrendingUp,
                  color: 'text-purple-600 bg-purple-100'
                },
                {
                  title: 'السرعة البرقية',
                  description: 'الحضور قبل الموعد المحدد لأسبوعين',
                  reward: '+100 نقطة',
                  achieved: false,
                  icon: Zap,
                  color: 'text-yellow-600 bg-yellow-100'
                },
                {
                  title: 'قائد الفريق',
                  description: 'الحصول على المركز الأول في الحضور',
                  reward: '+500 نقطة',
                  achieved: false,
                  icon: Crown,
                  color: 'text-orange-600 bg-orange-100'
                },
                {
                  title: 'الموظف المثالي',
                  description: 'حضور مثالي لمدة 6 أشهر',
                  reward: '+1000 نقطة',
                  achieved: false,
                  icon: Star,
                  color: 'text-pink-600 bg-pink-100'
                }
              ].map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    achievement.achieved 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-full ${achievement.color}`}>
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    {achievement.achieved && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  
                  <h4 className={`font-medium mb-2 ${achievement.achieved ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h4>
                  
                  <p className={`text-sm mb-3 ${achievement.achieved ? 'text-gray-700' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-bold text-yellow-700">
                      {achievement.reward}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};