import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  MapPin, 
  Star, 
  DollarSign, 
  TrendingUp, 
  Award,
  Eye,
  Timer,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Navigation,
  Coins,
  Target,
  Brain
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardProps {
  stats: any;
  onTabChange: (tab: string) => void;
}

export const ComprehensiveAttendanceDashboard: React.FC<DashboardProps> = ({ stats, onTabChange }) => {
  const [liveTracking, setLiveTracking] = useState<any[]>([]);
  const [attendancePoints, setAttendancePoints] = useState<any[]>([]);
  const [overtimeRecords, setOvertimeRecords] = useState<any[]>([]);
  const [todayActivity, setTodayActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchLiveData();
  }, []);

  const fetchLiveData = async () => {
    try {
      // جلب بيانات التتبع المباشر
      const { data: tracking } = await supabase
        .from('employee_live_tracking')
        .select(`
          *,
          boud_employees(first_name, last_name)
        `)
        .order('timestamp', { ascending: false })
        .limit(10);

      // جلب نقاط الحضور
      const { data: points } = await supabase
        .from('attendance_points')
        .select(`
          *,
          boud_employees(first_name, last_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      // جلب الساعات الإضافية
      const { data: overtime } = await supabase
        .from('overtime_records')
        .select(`
          *,
          boud_employees(first_name, last_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      // جلب نشاط اليوم
      const today = new Date().toISOString().split('T')[0];
      const { data: activity } = await supabase
        .from('attendance_records_new')
        .select(`
          *,
          boud_employees(first_name, last_name, boud_departments(department_name))
        `)
        .eq('attendance_date', today)
        .order('check_in_time', { ascending: false })
        .limit(8);

      setLiveTracking(tracking || []);
      setAttendancePoints(points || []);
      setOvertimeRecords(overtime || []);
      setTodayActivity(activity || []);
    } catch (error) {
      console.error('Error fetching live data:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">الحاضرين اليوم</p>
                <p className="text-2xl font-bold text-green-900">{stats.presentToday}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">الغائبين</p>
                <p className="text-2xl font-bold text-red-900">{stats.absentToday}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">المتأخرين</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.lateToday}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">العمل عن بُعد</p>
                <p className="text-2xl font-bold text-blue-900">{stats.remoteWorkers || 8}</p>
              </div>
              <Navigation className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">نقاط المكافآت</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalPoints || 1250}</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-700">الساعات الإضافية</p>
                <p className="text-2xl font-bold text-teal-900">{stats.overtimeHours || 45}h</p>
              </div>
              <Timer className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* مؤشرات الأداء */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              معدل الحضور الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{Math.round(stats.attendanceRate)}%</div>
            <Progress value={stats.attendanceRate} className="h-3 bg-green-100" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>الهدف: 95%</span>
              <span>+2.5% من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              متوسط ساعات العمل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.avgWorkingHours?.toFixed(1) || '8.2'}h</div>
            <Progress value={(stats.avgWorkingHours / 9) * 100} className="h-3 bg-blue-100" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>المطلوب: 8h</span>
              <span>+0.3h إضافية</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600" />
              مؤشر الذكاء الاصطناعي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
            <Progress value={92} className="h-3 bg-purple-100" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>توقعات إيجابية</span>
              <span>تحسن مستمر</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أقسام التفاصيل */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* التتبع المباشر */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              التتبع المباشر للموظفين الميدانيين
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onTabChange('live-tracking')}
            >
              <Eye className="h-4 w-4 mr-2" />
              عرض الخريطة
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveTracking.length > 0 ? (
                liveTracking.slice(0, 5).map((track) => (
                  <div key={track.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium">
                          {track.boud_employees?.first_name} {track.boud_employees?.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          آخر تحديث: {new Date(track.timestamp).toLocaleTimeString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">{track.activity_type}</p>
                      <p className="text-xs">البطارية: {track.battery_level}%</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا يوجد موظفين في الميدان حالياً</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* نشاط اليوم */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              نشاط الحضور اليوم
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onTabChange('dashboard')}
            >
              عرض الكل
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {todayActivity.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      record.status === 'present' ? 'bg-green-500' :
                      record.status === 'late' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium">
                        {record.boud_employees?.[0]?.first_name} {record.boud_employees?.[0]?.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {record.boud_employees?.[0]?.boud_departments?.department_name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">
                      {record.check_in_time ? new Date(record.check_in_time).toLocaleTimeString('ar-SA') : '-'}
                    </p>
                    <Badge variant={record.status === 'present' ? 'default' : 
                                 record.status === 'late' ? 'secondary' : 'destructive'} 
                           className="text-xs">
                      {record.status === 'present' ? 'حاضر' :
                       record.status === 'late' ? 'متأخر' : 'غائب'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* نقاط المكافآت والساعات الإضافية */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-600" />
              نقاط المكافآت والحوافز
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendancePoints.length > 0 ? (
                attendancePoints.map((point) => (
                  <div key={point.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">
                          {point.boud_employees?.first_name} {point.boud_employees?.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground">{point.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-yellow-700">+{point.points_earned}</p>
                      <p className="text-xs text-muted-foreground">نقطة</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد نقاط جديدة اليوم</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              الساعات الإضافية المعتمدة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overtimeRecords.length > 0 ? (
                overtimeRecords.map((overtime) => (
                  <div key={overtime.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <Timer className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">
                          {overtime.boud_employees?.first_name} {overtime.boud_employees?.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground">{overtime.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-700">{overtime.overtime_hours}h</p>
                      <p className="text-xs text-muted-foreground">{overtime.total_amount} ر.س</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Timer className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد ساعات إضافية اليوم</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أزرار الإجراءات السريعة */}
      <Card>
        <CardHeader>
          <CardTitle>الإجراءات السريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => onTabChange('checkin')}
              className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <MapPin className="h-6 w-6" />
              تسجيل GPS
            </Button>
            
            <Button 
              onClick={() => onTabChange('devices')}
              className="h-20 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700"
            >
              <Fingerprint className="h-6 w-6" />
              إدارة الأجهزة
            </Button>
            
            <Button 
              onClick={() => onTabChange('analytics')}
              className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700"
            >
              <BarChart3 className="h-6 w-6" />
              التحليلات المتقدمة
            </Button>
            
            <Button 
              onClick={() => onTabChange('ai-insights')}
              className="h-20 flex flex-col gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            >
              <Brain className="h-6 w-6" />
              الذكاء الاصطناعي
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};