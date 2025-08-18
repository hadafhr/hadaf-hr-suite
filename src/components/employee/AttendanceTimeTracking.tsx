import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
  Clock, Calendar as CalendarIcon, User, CheckCircle, 
  XCircle, AlertTriangle, MapPin, Camera, FileText,
  BarChart3, TrendingUp, Target
} from 'lucide-react';
import { useEmployeeServices } from '@/hooks/useEmployeeServices';
import { useToast } from '@/hooks/use-toast';

export function AttendanceTimeTracking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCorrectionDialog, setShowCorrectionDialog] = useState(false);
  const [correctionForm, setCorrectionForm] = useState({
    correction_date: new Date().toISOString().split('T')[0],
    correction_type: '',
    reason: '',
    original_clock_in: '',
    original_clock_out: '',
    corrected_clock_in: '',
    corrected_clock_out: '',
    evidence_documents: []
  });

  const { submitAttendanceCorrection, attendanceCorrections, loading } = useEmployeeServices();
  const { toast } = useToast();

  // بيانات تجريبية للحضور
  const attendanceData = [
    {
      id: '1',
      date: '2024-01-15',
      clock_in: '08:00 AM',
      clock_out: '05:00 PM',
      status: 'present',
      working_hours: '9:00',
      overtime: '0:00',
      location: 'المكتب الرئيسي'
    },
    {
      id: '2',
      date: '2024-01-16',
      clock_in: '08:15 AM',
      clock_out: '05:10 PM',
      status: 'late',
      working_hours: '8:55',
      overtime: '0:10',
      location: 'المكتب الرئيسي'
    },
    {
      id: '3',
      date: '2024-01-17',
      clock_in: '--',
      clock_out: '--',
      status: 'absent',
      working_hours: '0:00',
      overtime: '0:00',
      location: '--'
    }
  ];

  const monthlyStats = {
    totalWorkingDays: 22,
    presentDays: 18,
    lateDays: 3,
    absentDays: 1,
    totalHours: 162,
    overtimeHours: 8
  };

  const handleSubmitCorrection = async () => {
    try {
      await submitAttendanceCorrection({
        employee_id: '1', // سيتم استبداله بالموظف الحالي
        ...correctionForm
      });
      
      setShowCorrectionDialog(false);
      setCorrectionForm({
        correction_date: new Date().toISOString().split('T')[0],
        correction_type: '',
        reason: '',
        original_clock_in: '',
        original_clock_out: '',
        corrected_clock_in: '',
        corrected_clock_out: '',
        evidence_documents: []
      });
    } catch (error) {
      console.error('Error submitting correction:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: { label: 'حاضر', variant: 'default' as const, color: 'bg-green-500' },
      late: { label: 'متأخر', variant: 'destructive' as const, color: 'bg-yellow-500' },
      absent: { label: 'غائب', variant: 'destructive' as const, color: 'bg-red-500' },
      early_leave: { label: 'انصراف مبكر', variant: 'destructive' as const, color: 'bg-orange-500' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header with Quick Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              الحضور وتتبع الوقت
            </CardTitle>
            <div className="flex gap-2">
              <Dialog open={showCorrectionDialog} onOpenChange={setShowCorrectionDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    طلب تصحيح
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>طلب تصحيح الحضور</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>تاريخ التصحيح</Label>
                      <Input 
                        type="date" 
                        value={correctionForm.correction_date}
                        onChange={(e) => setCorrectionForm({...correctionForm, correction_date: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>نوع التصحيح</Label>
                      <Select 
                        value={correctionForm.correction_type} 
                        onValueChange={(value) => setCorrectionForm({...correctionForm, correction_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع التصحيح" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="missing_clock_in">تسجيل دخول مفقود</SelectItem>
                          <SelectItem value="missing_clock_out">تسجيل خروج مفقود</SelectItem>
                          <SelectItem value="wrong_time">وقت خاطئ</SelectItem>
                          <SelectItem value="absent_excuse">عذر للغياب</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>الوقت الصحيح للدخول</Label>
                        <Input 
                          type="time"
                          value={correctionForm.corrected_clock_in}
                          onChange={(e) => setCorrectionForm({...correctionForm, corrected_clock_in: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>الوقت الصحيح للخروج</Label>
                        <Input 
                          type="time"
                          value={correctionForm.corrected_clock_out}
                          onChange={(e) => setCorrectionForm({...correctionForm, corrected_clock_out: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>سبب التصحيح</Label>
                      <Textarea 
                        value={correctionForm.reason}
                        onChange={(e) => setCorrectionForm({...correctionForm, reason: e.target.value})}
                        placeholder="اشرح سبب طلب التصحيح..."
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowCorrectionDialog(false)}>
                        إلغاء
                      </Button>
                      <Button onClick={handleSubmitCorrection} disabled={!correctionForm.reason || !correctionForm.correction_type}>
                        إرسال الطلب
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button>
                <MapPin className="h-4 w-4 mr-2" />
                تسجيل الحضور
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">أيام الحضور</p>
                  <p className="text-2xl font-bold text-green-600">{monthlyStats.presentDays}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">أيام التأخير</p>
                  <p className="text-2xl font-bold text-yellow-600">{monthlyStats.lateDays}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">أيام الغياب</p>
                  <p className="text-2xl font-bold text-red-600">{monthlyStats.absentDays}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">ساعات العمل</p>
                  <p className="text-2xl font-bold text-blue-600">{monthlyStats.totalHours}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">السجل اليومي</TabsTrigger>
          <TabsTrigger value="monthly">التقرير الشهري</TabsTrigger>
          <TabsTrigger value="corrections">طلبات التصحيح</TabsTrigger>
          <TabsTrigger value="calendar">التقويم</TabsTrigger>
        </TabsList>

        {/* Daily Records */}
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>سجل الحضور اليومي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">{record.date}</p>
                        <div className="mt-1">
                          {getStatusBadge(record.status)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">الدخول</p>
                          <p className="font-medium">{record.clock_in}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">الخروج</p>
                          <p className="font-medium">{record.clock_out}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">ساعات العمل</p>
                          <p className="font-medium">{record.working_hours}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">الإضافي</p>
                          <p className="font-medium">{record.overtime}</p>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <p className="text-gray-600">الموقع</p>
                        <p className="font-medium">{record.location}</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      التفاصيل
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monthly Report */}
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                التقرير الشهري - يناير 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">إحصائيات الحضور</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>إجمالي أيام العمل:</span>
                      <span className="font-medium">{monthlyStats.totalWorkingDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>أيام الحضور:</span>
                      <span className="font-medium text-green-600">{monthlyStats.presentDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>أيام التأخير:</span>
                      <span className="font-medium text-yellow-600">{monthlyStats.lateDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>أيام الغياب:</span>
                      <span className="font-medium text-red-600">{monthlyStats.absentDays}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span>معدل الحضور:</span>
                      <span className="font-bold text-blue-600">
                        {((monthlyStats.presentDays / monthlyStats.totalWorkingDays) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">ساعات العمل</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>إجمالي الساعات:</span>
                      <span className="font-medium">{monthlyStats.totalHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الساعات الإضافية:</span>
                      <span className="font-medium text-blue-600">{monthlyStats.overtimeHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>متوسط الساعات اليومية:</span>
                      <span className="font-medium">{(monthlyStats.totalHours / monthlyStats.presentDays).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Corrections */}
        <TabsContent value="corrections">
          <Card>
            <CardHeader>
              <CardTitle>طلبات تصحيح الحضور</CardTitle>
            </CardHeader>
            <CardContent>
              {attendanceCorrections.length > 0 ? (
                <div className="space-y-4">
                  {attendanceCorrections.map((correction) => (
                    <div key={correction.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{correction.correction_date}</span>
                        <Badge 
                          variant={correction.status === 'approved' ? 'default' : 
                                 correction.status === 'rejected' ? 'destructive' : 'secondary'}
                        >
                          {correction.status === 'pending' ? 'قيد المراجعة' :
                           correction.status === 'approved' ? 'مقبول' : 'مرفوض'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{correction.reason}</p>
                      <p className="text-xs text-gray-500">
                        تاريخ الإرسال: {new Date(correction.created_at).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد طلبات تصحيح</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                تقويم الحضور
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="lg:w-80 space-y-4">
                  <h4 className="font-semibold">معلومات اليوم المحدد</h4>
                  {selectedDate && (
                    <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium">{selectedDate.toLocaleDateString('ar-SA')}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>الحالة:</span>
                          <Badge variant="default">حاضر</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>وقت الدخول:</span>
                          <span>8:00 ص</span>
                        </div>
                        <div className="flex justify-between">
                          <span>وقت الخروج:</span>
                          <span>5:00 م</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ساعات العمل:</span>
                          <span>9:00</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}