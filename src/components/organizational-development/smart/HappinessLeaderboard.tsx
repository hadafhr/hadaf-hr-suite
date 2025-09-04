import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Zap,
  Target,
  Heart,
  Sparkles,
  Monitor,
  Share2
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  department: string;
  score: number;
  improvement_percentage: number;
  badge: string;
  employee_count: number;
  period_month: number;
  period_year: number;
  rank?: number;
}

export const HappinessLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isBigScreenMode, setIsBigScreenMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadLeaderboardData();
    
    // Auto-refresh every 30 seconds in live mode
    let interval: NodeJS.Timeout;
    if (isLiveMode) {
      interval = setInterval(() => {
        loadLeaderboardData();
      }, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLiveMode]);

  const loadLeaderboardData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('od_leaderboard')
        .select('*')
        .order('score', { ascending: false });

      if (error) throw error;

      const formattedData = data?.map((item, index) => ({
        id: item.id,
        department: item.department,
        score: parseFloat(item.score.toString()),
        improvement_percentage: parseFloat((item.improvement_percentage || 0).toString()),
        badge: item.badge || '',
        employee_count: item.employee_count,
        period_month: item.period_month,
        period_year: item.period_year,
        rank: index + 1
      })) || [];

      setLeaderboardData(formattedData);
    } catch (error) {
      console.error('Error loading leaderboard data:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل بيانات لوحة الشرف',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleLiveMode = () => {
    setIsLiveMode(!isLiveMode);
    toast({
      title: isLiveMode ? 'تم إيقاف التحديث المباشر' : 'تم تفعيل التحديث المباشر',
      description: isLiveMode ? 'لن يتم تحديث البيانات تلقائياً' : 'سيتم تحديث البيانات كل 30 ثانية'
    });
  };

  const toggleBigScreenMode = () => {
    setIsBigScreenMode(!isBigScreenMode);
    if (!isBigScreenMode) {
      // Enter fullscreen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const shareResults = async () => {
    try {
      const topThree = leaderboardData.slice(0, 3);
      const shareText = `🏆 لوحة شرف السعادة الوظيفية:\n\n${topThree.map((dept, index) => 
        `${index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} ${dept.department}: ${dept.score.toFixed(1)}/5`
      ).join('\n')}\n\n#السعادة_الوظيفية #التطوير_المؤسسي`;
      
      await navigator.share({
        title: 'لوحة شرف السعادة الوظيفية',
        text: shareText
      });
    } catch (error) {
      // Fallback to clipboard
      const shareText = `🏆 لوحة شرف السعادة الوظيفية - الشهر الحالي`;
      navigator.clipboard.writeText(shareText);
      toast({
        title: 'تم النسخ',
        description: 'تم نسخ النتائج إلى الحافظة'
      });
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'مبدع التغيير': return <Sparkles className="h-4 w-4" />;
      case 'رائد التطوير': return <Zap className="h-4 w-4" />;
      case 'محفز النمو': return <TrendingUp className="h-4 w-4" />;
      case 'قائد السعادة': return <Heart className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isBigScreenMode) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white z-50 p-8">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              🏆 لوحة شرف السعادة الوظيفية
            </h1>
            <p className="text-xl text-gray-300">
              {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long' })}
            </p>
            {isLiveMode && (
              <Badge className="bg-green-500 text-white animate-pulse mt-2">
                <div className="w-2 h-2 bg-green-200 rounded-full mr-2 animate-ping"></div>
                تحديث مباشر
              </Badge>
            )}
          </div>

          {/* Top 3 Podium */}
          <div className="flex justify-center items-end gap-8 mb-12">
            {leaderboardData.slice(0, 3).map((dept, index) => {
              const heights = ['h-40', 'h-32', 'h-28'];
              const positions = [1, 0, 2]; // Gold in center
              const actualIndex = positions[index];
              const actualDept = leaderboardData[actualIndex];
              
              return (
                <div key={actualDept.id} className="text-center">
                  <div className={`${heights[actualIndex]} w-32 bg-gradient-to-t ${
                    actualIndex === 0 ? 'from-yellow-400/20 to-yellow-600/40 border-yellow-500' :
                    actualIndex === 1 ? 'from-gray-300/20 to-gray-500/40 border-gray-400' :
                    'from-amber-400/20 to-amber-600/40 border-amber-500'
                  } border-2 rounded-t-lg flex flex-col justify-end items-center p-4`}>
                    <div className="text-4xl mb-2">
                      {actualIndex === 0 ? '🥇' : actualIndex === 1 ? '🥈' : '🥉'}
                    </div>
                    <div className="text-2xl font-bold">{actualDept.score.toFixed(1)}</div>
                    <div className="text-sm opacity-75">من 5</div>
                  </div>
                  <div className="mt-4">
                    <div className="text-lg font-semibold">{actualDept.department}</div>
                    <div className="text-sm text-gray-300">{actualDept.employee_count} موظف</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rest of Rankings */}
          <div className="grid grid-cols-2 gap-6 flex-1 overflow-auto">
            {leaderboardData.slice(3).map((dept) => (
              <div key={dept.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-gray-300">#{dept.rank}</div>
                    <div>
                      <div className="text-lg font-semibold">{dept.department}</div>
                      <div className="text-sm text-gray-300">{dept.employee_count} موظف</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{dept.score.toFixed(1)}</div>
                    <div className="text-sm text-gray-300">من 5</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Exit Button */}
          <div className="text-center mt-6">
            <Button onClick={toggleBigScreenMode} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              خروج من وضع الشاشة الكبيرة
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">لوحة شرف السعادة الوظيفية</h2>
          <p className="text-muted-foreground">ترتيب الإدارات والفرق حسب أعلى رضا وأكبر تحسن</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant={isLiveMode ? "default" : "outline"} 
            size="sm"
            onClick={toggleLiveMode}
          >
            <Monitor className="h-4 w-4 mr-2" />
            {isLiveMode ? 'إيقاف التحديث المباشر' : 'تحديث مباشر'}
            {isLiveMode && <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-ping"></div>}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleBigScreenMode}>
            <Monitor className="h-4 w-4 mr-2" />
            وضع الشاشة الكبيرة
          </Button>
          <Button variant="outline" size="sm" onClick={shareResults}>
            <Share2 className="h-4 w-4 mr-2" />
            مشاركة النتائج
          </Button>
        </div>
      </div>

      {/* Top 3 Departments */}
      <Card className="bg-gradient-to-r from-yellow-50/50 to-yellow-100/50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            المراكز الثلاثة الأولى
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaderboardData.slice(0, 3).map((dept, index) => (
              <Card key={dept.id} className={`text-center ${getRankBadgeColor(index + 1)} border-2 hover:scale-105 transition-transform`}>
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {getRankIcon(index + 1)}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{dept.department}</h3>
                  <div className="text-3xl font-bold mb-2">{dept.score.toFixed(1)}</div>
                  <p className="text-sm opacity-75 mb-3">من 5 نقاط</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+{dept.improvement_percentage}%</span>
                  </div>
                  <Badge className="bg-white/20 text-current">
                    {getBadgeIcon(dept.badge)}
                    <span className="mr-1">{dept.badge || 'متميز'}</span>
                  </Badge>
                  <p className="text-xs mt-2 opacity-75">{dept.employee_count} موظف</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            الترتيب الكامل للأقسام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardData.map((dept, index) => (
              <div 
                key={dept.id} 
                className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                  index < 3 ? 'bg-gradient-to-r from-yellow-50/50 to-yellow-100/30 border border-yellow-200' : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(dept.rank || index + 1)}`}>
                    <span className="font-bold text-lg">#{dept.rank || index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{dept.department}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {dept.employee_count} موظف
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{dept.score.toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground">من 5</p>
                    <Progress value={(dept.score / 5) * 100} className="w-16 mt-1" />
                  </div>
                  
                  <div className="text-center">
                    <div className={`flex items-center gap-1 ${dept.improvement_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dept.improvement_percentage >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="font-medium">{dept.improvement_percentage >= 0 ? '+' : ''}{dept.improvement_percentage}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">التحسن</p>
                  </div>

                  {dept.badge && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {getBadgeIcon(dept.badge)}
                      <span className="mr-1">{dept.badge}</span>
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {leaderboardData.length === 0 && (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">لا توجد بيانات لوحة الشرف حالياً</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            شارات الإنجاز
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-medium text-sm">قائد السعادة</h4>
              <p className="text-xs text-muted-foreground">أعلى نتيجة</p>
            </div>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium text-sm">الأكثر تطوراً</h4>
              <p className="text-xs text-muted-foreground">أكبر تحسن</p>
            </div>
            <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium text-sm">الفريق المتماسك</h4>
              <p className="text-xs text-muted-foreground">مشاركة عالية</p>
            </div>
            <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium text-sm">مبدع التغيير</h4>
              <p className="text-xs text-muted-foreground">أفكار مبتكرة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};