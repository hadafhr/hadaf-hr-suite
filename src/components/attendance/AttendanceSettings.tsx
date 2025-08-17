import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Settings,
  Clock,
  MapPin,
  Shield,
  Calendar,
  Users,
  Save,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertCircle
} from 'lucide-react';

const AttendanceSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [workSchedules, setWorkSchedules] = useState<any[]>([]);
  const [holidays, setHolidays] = useState<any[]>([]);
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [isAddHolidayOpen, setIsAddHolidayOpen] = useState(false);

  // بيانات الإعدادات العامة
  const [generalSettings, setGeneralSettings] = useState({
    work_days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'] as ('sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday')[],
    default_start_time: '08:00',
    default_end_time: '17:00',
    break_duration: 60,
    late_threshold_minutes: 15,
    early_leave_threshold_minutes: 15,
    allow_remote_work: true,
    require_location_check: false,
    auto_clock_out: false,
    auto_clock_out_time: '18:00',
    overtime_threshold_hours: 8.00
  });

  // بيانات جدول العمل الجديد
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    schedule_type: 'full_time' as 'full_time' | 'remote' | 'part_time' | 'hybrid',
    description: '',
    work_days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'] as ('sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday')[],
    start_time: '08:00',
    end_time: '17:00',
    break_start_time: '12:00',
    break_end_time: '13:00',
    total_hours_per_day: 8,
    total_hours_per_week: 40
  });

  // بيانات الإجازة الجديدة
  const [newHoliday, setNewHoliday] = useState({
    name: '',
    holiday_date: '',
    is_recurring: false
  });

  const dayNames = {
    sunday: 'الأحد',
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت'
  };

  const scheduleTypes = {
    full_time: 'دوام كامل',
    remote: 'عن بُعد',
    part_time: 'دوام جزئي',
    hybrid: 'مختلط'
  };

  useEffect(() => {
    loadSettings();
    loadWorkSchedules();
    loadHolidays();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading settings:', error);
        return;
      }

      if (data) {
        setSettings(data);
        setGeneralSettings({
          work_days: (data.work_days || ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday']) as ('sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday')[],
          default_start_time: data.default_start_time || '08:00',
          default_end_time: data.default_end_time || '17:00',
          break_duration: data.break_duration || 60,
          late_threshold_minutes: data.late_threshold_minutes || 15,
          early_leave_threshold_minutes: data.early_leave_threshold_minutes || 15,
          allow_remote_work: data.allow_remote_work || true,
          require_location_check: data.require_location_check || false,
          auto_clock_out: data.auto_clock_out || false,
          auto_clock_out_time: data.auto_clock_out_time || '18:00',
          overtime_threshold_hours: data.overtime_threshold_hours || 8.00
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadWorkSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from('work_schedules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading work schedules:', error);
        return;
      }

      setWorkSchedules(data || []);
    } catch (error) {
      console.error('Error loading work schedules:', error);
    }
  };

  const loadHolidays = async () => {
    try {
      const { data, error } = await supabase
        .from('company_holidays')
        .select('*')
        .order('holiday_date', { ascending: true });

      if (error) {
        console.error('Error loading holidays:', error);
        return;
      }

      setHolidays(data || []);
    } catch (error) {
      console.error('Error loading holidays:', error);
    }
  };

  const saveGeneralSettings = async () => {
    setLoading(true);
    try {
      const settingsData = {
        ...generalSettings,
        work_days: generalSettings.work_days as any,
        default_start_time: generalSettings.default_start_time + ':00',
        default_end_time: generalSettings.default_end_time + ':00',
        auto_clock_out_time: generalSettings.auto_clock_out_time + ':00',
        updated_at: new Date().toISOString()
      };

      if (settings?.id) {
        const { error } = await supabase
          .from('attendance_settings')
          .update(settingsData)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('attendance_settings')
          .insert([{ ...settingsData, company_id: crypto.randomUUID() }]);

        if (error) throw error;
      }

      toast.success('تم حفظ الإعدادات العامة بنجاح');
      loadSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const saveWorkSchedule = async () => {
    setLoading(true);
    try {
      const scheduleData = {
        ...newSchedule,
        work_days: newSchedule.work_days as any,
        schedule_type: newSchedule.schedule_type as any,
        start_time: newSchedule.start_time + ':00',
        end_time: newSchedule.end_time + ':00',
        break_start_time: newSchedule.break_start_time ? newSchedule.break_start_time + ':00' : null,
        break_end_time: newSchedule.break_end_time ? newSchedule.break_end_time + ':00' : null,
        company_id: settings?.company_id || crypto.randomUUID()
      };

      const { error } = await supabase
        .from('work_schedules')
        .insert([scheduleData]);

      if (error) throw error;

      toast.success('تم إضافة جدول العمل بنجاح');
      setIsAddScheduleOpen(false);
      resetNewSchedule();
      loadWorkSchedules();
    } catch (error) {
      console.error('Error saving work schedule:', error);
      toast.error('حدث خطأ أثناء إضافة جدول العمل');
    } finally {
      setLoading(false);
    }
  };

  const saveHoliday = async () => {
    setLoading(true);
    try {
      const holidayData = {
        ...newHoliday,
        company_id: settings?.company_id || crypto.randomUUID()
      };

      const { error } = await supabase
        .from('company_holidays')
        .insert([holidayData]);

      if (error) throw error;

      toast.success('تم إضافة الإجازة بنجاح');
      setIsAddHolidayOpen(false);
      resetNewHoliday();
      loadHolidays();
    } catch (error) {
      console.error('Error saving holiday:', error);
      toast.error('حدث خطأ أثناء إضافة الإجازة');
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkSchedule = async (id: string) => {
    try {
      const { error } = await supabase
        .from('work_schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('تم حذف جدول العمل بنجاح');
      loadWorkSchedules();
    } catch (error) {
      console.error('Error deleting work schedule:', error);
      toast.error('حدث خطأ أثناء حذف جدول العمل');
    }
  };

  const deleteHoliday = async (id: string) => {
    try {
      const { error } = await supabase
        .from('company_holidays')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('تم حذف الإجازة بنجاح');
      loadHolidays();
    } catch (error) {
      console.error('Error deleting holiday:', error);
      toast.error('حدث خطأ أثناء حذف الإجازة');
    }
  };

  const resetNewSchedule = () => {
    setNewSchedule({
      name: '',
      schedule_type: 'full_time' as 'full_time' | 'remote' | 'part_time' | 'hybrid',
      description: '',
      work_days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'] as ('sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday')[],
      start_time: '08:00',
      end_time: '17:00',
      break_start_time: '12:00',
      break_end_time: '13:00',
      total_hours_per_day: 8,
      total_hours_per_week: 40
    });
  };

  const resetNewHoliday = () => {
    setNewHoliday({
      name: '',
      holiday_date: '',
      is_recurring: false
    });
  };

  const handleDayToggle = (day: string, isGeneralSettings = true) => {
    const dayValue = day as ('sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday');
    if (isGeneralSettings) {
      const newDays = generalSettings.work_days.includes(dayValue)
        ? generalSettings.work_days.filter(d => d !== dayValue)
        : [...generalSettings.work_days, dayValue];
      setGeneralSettings({ ...generalSettings, work_days: newDays });
    } else {
      const newDays = newSchedule.work_days.includes(dayValue)
        ? newSchedule.work_days.filter(d => d !== dayValue)
        : [...newSchedule.work_days, dayValue];
      setNewSchedule({ ...newSchedule, work_days: newDays });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إعدادات الحضور والانصراف</h2>
          <p className="text-muted-foreground">إدارة إعدادات النظام وجداول العمل والإجازات</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">الإعدادات العامة</TabsTrigger>
          <TabsTrigger value="schedules">جداول العمل</TabsTrigger>
          <TabsTrigger value="holidays">الإجازات والأعياد</TabsTrigger>
          <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* أيام العمل */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  أيام العمل الافتراضية
                </CardTitle>
                <CardDescription>اختر أيام العمل الأساسية للشركة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   {Object.entries(dayNames).map(([day, name]) => (
                     <div key={day} className="flex items-center space-x-2">
                       <Checkbox
                         id={day}
                         checked={generalSettings.work_days.includes(day as any)}
                         onCheckedChange={() => handleDayToggle(day)}
                       />
                       <Label htmlFor={day} className="mr-2">{name}</Label>
                     </div>
                   ))}
                </div>
              </CardContent>
            </Card>

            {/* أوقات العمل */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  أوقات العمل الافتراضية
                </CardTitle>
                <CardDescription>أوقات بداية ونهاية الدوام الافتراضي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_time">وقت البداية</Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={generalSettings.default_start_time}
                      onChange={(e) => setGeneralSettings({...generalSettings, default_start_time: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_time">وقت النهاية</Label>
                    <Input
                      id="end_time"
                      type="time"
                      value={generalSettings.default_end_time}
                      onChange={(e) => setGeneralSettings({...generalSettings, default_end_time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="break_duration">مدة الاستراحة (بالدقائق)</Label>
                  <Input
                    id="break_duration"
                    type="number"
                    value={generalSettings.break_duration}
                    onChange={(e) => setGeneralSettings({...generalSettings, break_duration: parseInt(e.target.value)})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* إعدادات التأخير */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  إعدادات التأخير والانصراف المبكر
                </CardTitle>
                <CardDescription>حدود التأخير والانصراف المبكر المسموح بها</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="late_threshold">حد التأخير المسموح (بالدقائق)</Label>
                  <Input
                    id="late_threshold"
                    type="number"
                    value={generalSettings.late_threshold_minutes}
                    onChange={(e) => setGeneralSettings({...generalSettings, late_threshold_minutes: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="early_leave_threshold">حد الانصراف المبكر (بالدقائق)</Label>
                  <Input
                    id="early_leave_threshold"
                    type="number"
                    value={generalSettings.early_leave_threshold_minutes}
                    onChange={(e) => setGeneralSettings({...generalSettings, early_leave_threshold_minutes: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="overtime_threshold">حد الساعات الإضافية (ساعات)</Label>
                  <Input
                    id="overtime_threshold"
                    type="number"
                    step="0.5"
                    value={generalSettings.overtime_threshold_hours}
                    onChange={(e) => setGeneralSettings({...generalSettings, overtime_threshold_hours: parseFloat(e.target.value)})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* الإعدادات المتقدمة */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  الإعدادات المتقدمة
                </CardTitle>
                <CardDescription>إعدادات إضافية لنظام الحضور</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow_remote">السماح بالعمل عن بُعد</Label>
                    <p className="text-sm text-muted-foreground">السماح للموظفين بتسجيل الحضور عن بُعد</p>
                  </div>
                  <Switch
                    id="allow_remote"
                    checked={generalSettings.allow_remote_work}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, allow_remote_work: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="location_check">التحقق من الموقع</Label>
                    <p className="text-sm text-muted-foreground">طلب موقع الموظف عند تسجيل الحضور</p>
                  </div>
                  <Switch
                    id="location_check"
                    checked={generalSettings.require_location_check}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, require_location_check: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto_clock_out">الانصراف التلقائي</Label>
                    <p className="text-sm text-muted-foreground">انصراف تلقائي في وقت محدد</p>
                  </div>
                  <Switch
                    id="auto_clock_out"
                    checked={generalSettings.auto_clock_out}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, auto_clock_out: checked})}
                  />
                </div>
                {generalSettings.auto_clock_out && (
                  <div>
                    <Label htmlFor="auto_clock_out_time">وقت الانصراف التلقائي</Label>
                    <Input
                      id="auto_clock_out_time"
                      type="time"
                      value={generalSettings.auto_clock_out_time}
                      onChange={(e) => setGeneralSettings({...generalSettings, auto_clock_out_time: e.target.value})}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={saveGeneralSettings} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </Button>
          </div>
        </TabsContent>

        {/* Work Schedules Tab */}
        <TabsContent value="schedules" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">جداول العمل والشفتات</h3>
            <Dialog open={isAddScheduleOpen} onOpenChange={setIsAddScheduleOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة جدول عمل
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>إضافة جدول عمل جديد</DialogTitle>
                  <DialogDescription>
                    قم بإنشاء جدول عمل أو شفت جديد للموظفين
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schedule_name">اسم جدول العمل</Label>
                      <Input
                        id="schedule_name"
                        value={newSchedule.name}
                        onChange={(e) => setNewSchedule({...newSchedule, name: e.target.value})}
                        placeholder="مثال: الدوام الصباحي"
                      />
                    </div>
                    <div>
                      <Label htmlFor="schedule_type">نوع الدوام</Label>
                       <Select
                         value={newSchedule.schedule_type}
                         onValueChange={(value) => setNewSchedule({...newSchedule, schedule_type: value as any})}
                       >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(scheduleTypes).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="schedule_description">وصف جدول العمل</Label>
                    <Input
                      id="schedule_description"
                      value={newSchedule.description}
                      onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                      placeholder="وصف مختصر لجدول العمل"
                    />
                  </div>
                  <div>
                    <Label>أيام العمل</Label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                       {Object.entries(dayNames).map(([day, name]) => (
                         <div key={day} className="flex items-center space-x-2">
                           <Checkbox
                             id={`new_${day}`}
                             checked={newSchedule.work_days.includes(day as any)}
                             onCheckedChange={() => handleDayToggle(day, false)}
                           />
                           <Label htmlFor={`new_${day}`} className="mr-2">{name}</Label>
                         </div>
                       ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new_start_time">وقت البداية</Label>
                      <Input
                        id="new_start_time"
                        type="time"
                        value={newSchedule.start_time}
                        onChange={(e) => setNewSchedule({...newSchedule, start_time: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new_end_time">وقت النهاية</Label>
                      <Input
                        id="new_end_time"
                        type="time"
                        value={newSchedule.end_time}
                        onChange={(e) => setNewSchedule({...newSchedule, end_time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new_break_start">بداية الاستراحة</Label>
                      <Input
                        id="new_break_start"
                        type="time"
                        value={newSchedule.break_start_time}
                        onChange={(e) => setNewSchedule({...newSchedule, break_start_time: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new_break_end">نهاية الاستراحة</Label>
                      <Input
                        id="new_break_end"
                        type="time"
                        value={newSchedule.break_end_time}
                        onChange={(e) => setNewSchedule({...newSchedule, break_end_time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hours_per_day">ساعات اليوم الواحد</Label>
                      <Input
                        id="hours_per_day"
                        type="number"
                        step="0.5"
                        value={newSchedule.total_hours_per_day}
                        onChange={(e) => setNewSchedule({...newSchedule, total_hours_per_day: parseFloat(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hours_per_week">ساعات الأسبوع</Label>
                      <Input
                        id="hours_per_week"
                        type="number"
                        step="0.5"
                        value={newSchedule.total_hours_per_week}
                        onChange={(e) => setNewSchedule({...newSchedule, total_hours_per_week: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveWorkSchedule} disabled={loading}>
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'جاري الحفظ...' : 'حفظ جدول العمل'}
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddScheduleOpen(false)}>
                      إلغاء
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {workSchedules.map((schedule) => (
              <Card key={schedule.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{schedule.name}</h3>
                        <p className="text-sm text-muted-foreground">{schedule.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary">{scheduleTypes[schedule.schedule_type as keyof typeof scheduleTypes]}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {schedule.start_time} - {schedule.end_time}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {schedule.total_hours_per_day} ساعة/يوم
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-1" />
                        تحرير
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteWorkSchedule(schedule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Holidays Tab */}
        <TabsContent value="holidays" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">الإجازات والأعياد الرسمية</h3>
            <Dialog open={isAddHolidayOpen} onOpenChange={setIsAddHolidayOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة إجازة
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة إجازة أو عيد جديد</DialogTitle>
                  <DialogDescription>
                    إضافة إجازة رسمية أو عيد للتقويم
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="holiday_name">اسم الإجازة أو العيد</Label>
                    <Input
                      id="holiday_name"
                      value={newHoliday.name}
                      onChange={(e) => setNewHoliday({...newHoliday, name: e.target.value})}
                      placeholder="مثال: عيد الفطر"
                    />
                  </div>
                  <div>
                    <Label htmlFor="holiday_date">تاريخ الإجازة</Label>
                    <Input
                      id="holiday_date"
                      type="date"
                      value={newHoliday.holiday_date}
                      onChange={(e) => setNewHoliday({...newHoliday, holiday_date: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_recurring"
                      checked={newHoliday.is_recurring}
                      onCheckedChange={(checked) => setNewHoliday({...newHoliday, is_recurring: !!checked})}
                    />
                    <Label htmlFor="is_recurring" className="mr-2">إجازة متكررة سنوياً</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveHoliday} disabled={loading}>
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'جاري الحفظ...' : 'حفظ الإجازة'}
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddHolidayOpen(false)}>
                      إلغاء
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {holidays.map((holiday) => (
              <Card key={holiday.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{holiday.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(holiday.holiday_date).toLocaleDateString('ar')}
                        </p>
                        {holiday.is_recurring && (
                          <Badge variant="secondary" className="mt-1">متكرر سنوياً</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-1" />
                        تحرير
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteHoliday(holiday.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                صلاحيات الحضور والانصراف
              </CardTitle>
              <CardDescription>إدارة صلاحيات المستخدمين لنظام الحضور</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    سيتم إضافة إعدادات الصلاحيات قريباً
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceSettings;