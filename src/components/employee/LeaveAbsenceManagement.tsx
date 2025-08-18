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
  Calendar as CalendarIcon, Plane, Heart, Baby, 
  Clock, Send, Plus, BarChart3, User, MapPin
} from 'lucide-react';
import { useEmployeeServices } from '@/hooks/useEmployeeServices';
import { useToast } from '@/hooks/use-toast';

export function LeaveAbsenceManagement() {
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leave_type_id: '',
    start_date: '',
    end_date: '',
    total_days: 0,
    reason: '',
    emergency_contact: '',
    replacement_employee_id: ''
  });

  const { submitLeaveRequest, leaveRequests, leaveTypes, loading } = useEmployeeServices();
  const { toast } = useToast();

  // بيانات تجريبية لأرصدة الإجازات
  const leaveBalances = [
    { type: 'الإجازة السنوية', balance: 25, used: 5, total: 30, color: 'bg-blue-500' },
    { type: 'الإجازة المرضية', balance: 28, used: 2, total: 30, color: 'bg-green-500' },
    { type: 'إجازة الطوارئ', balance: 3, used: 2, total: 5, color: 'bg-red-500' },
    { type: 'إجازة الحج والعمرة', balance: 15, used: 0, total: 15, color: 'bg-purple-500' }
  ];

  const handleSubmitLeaveRequest = async () => {
    try {
      await submitLeaveRequest({
        employee_id: '1', // سيتم استبداله بالموظف الحالي
        status: 'pending',
        ...leaveForm
      });
      
      setShowRequestDialog(false);
      setLeaveForm({
        leave_type_id: '',
        start_date: '',
        end_date: '',
        total_days: 0,
        reason: '',
        emergency_contact: '',
        replacement_employee_id: ''
      });
    } catch (error) {
      console.error('Error submitting leave request:', error);
    }
  };

  const calculateDays = () => {
    if (leaveForm.start_date && leaveForm.end_date) {
      const start = new Date(leaveForm.start_date);
      const end = new Date(leaveForm.end_date);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setLeaveForm({...leaveForm, total_days: diffDays});
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد المراجعة', variant: 'secondary' as const },
      approved: { label: 'مقبولة', variant: 'default' as const },
      rejected: { label: 'مرفوضة', variant: 'destructive' as const },
      cancelled: { label: 'ملغية', variant: 'destructive' as const }
    };
    
    return <Badge variant={statusConfig[status as keyof typeof statusConfig]?.variant || 'secondary'}>
      {statusConfig[status as keyof typeof statusConfig]?.label || status}
    </Badge>;
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              إدارة الإجازات والغياب
            </CardTitle>
            <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  طلب إجازة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg" dir="rtl">
                <DialogHeader>
                  <DialogTitle>طلب إجازة جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>نوع الإجازة</Label>
                    <Select 
                      value={leaveForm.leave_type_id} 
                      onValueChange={(value) => setLeaveForm({...leaveForm, leave_type_id: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الإجازة" />
                      </SelectTrigger>
                      <SelectContent>
                        {leaveTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>{type.name_ar}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>تاريخ البداية</Label>
                      <Input 
                        type="date"
                        value={leaveForm.start_date}
                        onChange={(e) => {
                          setLeaveForm({...leaveForm, start_date: e.target.value});
                          setTimeout(calculateDays, 100);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>تاريخ النهاية</Label>
                      <Input 
                        type="date"
                        value={leaveForm.end_date}
                        onChange={(e) => {
                          setLeaveForm({...leaveForm, end_date: e.target.value});
                          setTimeout(calculateDays, 100);
                        }}
                      />
                    </div>
                  </div>

                  {leaveForm.total_days > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        إجمالي الأيام المطلوبة: <span className="font-bold">{leaveForm.total_days} يوم</span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>سبب الإجازة</Label>
                    <Textarea 
                      value={leaveForm.reason}
                      onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                      placeholder="اشرح سبب طلب الإجازة..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>جهة الاتصال في حالات الطوارئ</Label>
                    <Input 
                      value={leaveForm.emergency_contact}
                      onChange={(e) => setLeaveForm({...leaveForm, emergency_contact: e.target.value})}
                      placeholder="الاسم ورقم الجوال"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                      إلغاء
                    </Button>
                    <Button 
                      onClick={handleSubmitLeaveRequest} 
                      disabled={!leaveForm.leave_type_id || !leaveForm.start_date || !leaveForm.end_date || !leaveForm.reason}
                    >
                      إرسال الطلب
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Leave Balances */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {leaveBalances.map((balance, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${balance.color}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{balance.type}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-green-600">{balance.balance}</span>
                      <span className="text-sm text-gray-500">/ {balance.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${balance.color}`}
                        style={{ width: `${(balance.balance / balance.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requests">طلباتي</TabsTrigger>
          <TabsTrigger value="balances">أرصدة الإجازات</TabsTrigger>
          <TabsTrigger value="calendar">التقويم</TabsTrigger>
        </TabsList>

        {/* Leave Requests */}
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>طلبات الإجازة</CardTitle>
            </CardHeader>
            <CardContent>
              {leaveRequests.length > 0 ? (
                <div className="space-y-4">
                  {leaveRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="h-5 w-5 text-blue-500" />
                          <div>
                            <h4 className="font-medium">{request.leave_types?.name_ar || 'إجازة'}</h4>
                            <p className="text-sm text-gray-600">
                              {request.start_date} إلى {request.end_date} ({request.total_days} أيام)
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{request.reason}</p>
                      <p className="text-xs text-gray-500">
                        تاريخ الطلب: {new Date(request.created_at).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد طلبات إجازة</p>
                  <Button variant="outline" className="mt-4" onClick={() => setShowRequestDialog(true)}>
                    طلب إجازة جديدة
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Balances Details */}
        <TabsContent value="balances">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                تفاصيل أرصدة الإجازات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {leaveBalances.map((balance, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${balance.color}`}></div>
                        {balance.type}
                      </h4>
                      <Badge variant="outline">{balance.balance} متبقي</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-600">الرصيد الإجمالي</p>
                        <p className="text-lg font-bold">{balance.total}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">المستخدم</p>
                        <p className="text-lg font-bold text-red-500">{balance.used}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">المتبقي</p>
                        <p className="text-lg font-bold text-green-500">{balance.balance}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>المستخدم</span>
                        <span>المتبقي</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${balance.color}`}
                          style={{ width: `${(balance.balance / balance.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>تقويم الإجازات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">عرض تقويم الإجازات قيد التطوير...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}