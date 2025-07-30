import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, ArrowLeft, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

export const LeaveManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Mock leave requests
  const leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      type: 'إجازة سنوية',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      days: 6,
      reason: 'سفر عائلي',
      status: 'approved',
      submittedDate: '2024-01-10'
    },
    {
      id: '2',
      type: 'إجازة مرضية',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      days: 2,
      reason: 'وعكة صحية',
      status: 'pending',
      submittedDate: '2024-01-14'
    },
    {
      id: '3',
      type: 'إجازة اضطرارية',
      startDate: '2024-01-10',
      endDate: '2024-01-10',
      days: 1,
      reason: 'ظروف عائلية طارئة',
      status: 'rejected',
      submittedDate: '2024-01-09'
    }
  ];

  const leaveBalance = {
    annual: { total: 30, used: 12, remaining: 18 },
    sick: { total: 15, used: 2, remaining: 13 },
    emergency: { total: 5, used: 1, remaining: 4 }
  };

  const leaveTypes = [
    { value: 'annual', label: 'إجازة سنوية' },
    { value: 'sick', label: 'إجازة مرضية' },
    { value: 'emergency', label: 'إجازة اضطرارية' },
    { value: 'maternity', label: 'إجازة أمومة' },
    { value: 'paternity', label: 'إجازة أبوة' }
  ];

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the leave request to your backend
    console.log('Submitting leave request:', formData);
    setShowNewRequestForm(false);
    setFormData({ type: '', startDate: '', endDate: '', reason: '' });
    alert('تم تقديم طلب الإجازة بنجاح!');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 ml-1" />
            قيد المراجعة
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 ml-1" />
            موافق عليه
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 ml-1" />
            مرفوض
          </Badge>
        );
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon" onClick={() => navigate('/employee-dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-right">
                <h1 className="text-xl font-semibold">إدارة الإجازات</h1>
                <p className="text-sm text-muted-foreground">تقديم ومتابعة طلبات الإجازة</p>
              </div>
            </div>
            <Button onClick={() => setShowNewRequestForm(true)}>
              <Plus className="w-4 h-4 ml-2" />
              طلب إجازة جديد
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Leave Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-right">الإجازة السنوية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-right">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">المتاح:</span>
                  <span className="font-medium">{leaveBalance.annual.remaining} يوم</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">المستخدم:</span>
                  <span className="font-medium">{leaveBalance.annual.used} يوم</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">الإجمالي:</span>
                  <span className="font-medium">{leaveBalance.annual.total} يوم</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-right">الإجازة المرضية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-right">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">المتاح:</span>
                  <span className="font-medium">{leaveBalance.sick.remaining} يوم</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">المستخدم:</span>
                  <span className="font-medium">{leaveBalance.sick.used} يوم</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">الإجمالي:</span>
                  <span className="font-medium">{leaveBalance.sick.total} يوم</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-right">الإجازة الاضطرارية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-right">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">المتاح:</span>
                  <span className="font-medium">{leaveBalance.emergency.remaining} يوم</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">المستخدم:</span>
                  <span className="font-medium">{leaveBalance.emergency.used} يوم</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">الإجمالي:</span>
                  <span className="font-medium">{leaveBalance.emergency.total} يوم</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Request Form */}
        {showNewRequestForm && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-right">طلب إجازة جديد</CardTitle>
              <CardDescription className="text-right">
                يرجى ملء جميع البيانات المطلوبة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leave-type" className="text-right">نوع الإجازة</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الإجازة" />
                      </SelectTrigger>
                      <SelectContent>
                        {leaveTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-right">تاريخ البداية</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-right">تاريخ النهاية</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-right">سبب الإجازة</Label>
                  <Textarea
                    id="reason"
                    placeholder="أدخل سبب طلب الإجازة..."
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className="text-right"
                    required
                  />
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button type="button" variant="outline" onClick={() => setShowNewRequestForm(false)}>
                    إلغاء
                  </Button>
                  <Button type="submit">
                    تقديم الطلب
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Leave Requests History */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-right">سجل طلبات الإجازة</CardTitle>
            <CardDescription className="text-right">
              جميع طلبات الإجازة المقدمة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusBadge(request.status)}
                      <span className="text-sm font-medium">{request.type}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">تم التقديم في {request.submittedDate}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-right">
                      <p className="text-muted-foreground">السبب:</p>
                      <p>{request.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">التاريخ:</p>
                      <p>{request.startDate} إلى {request.endDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">عدد الأيام:</p>
                      <p>{request.days} أيام</p>
                    </div>
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