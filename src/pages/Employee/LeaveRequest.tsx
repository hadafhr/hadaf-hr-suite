
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';

const leaveRequests = [
  {
    id: 1,
    type: "إجازة سنوية",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    days: 3,
    status: "مقبول",
    reason: "إجازة عائلية"
  },
  {
    id: 2,
    type: "إجازة مرضية",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    days: 2,
    status: "مرفوض",
    reason: "إجازة مرضية"
  },
  {
    id: 3,
    type: "إجازة اضطرارية",
    startDate: "2024-03-01",
    endDate: "2024-03-01",
    days: 1,
    status: "معلق",
    reason: "ظروف طارئة"
  }
];

export const LeaveRequest: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  return (
    <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/src/assets/boud-logo-centered.png" 
            alt="Boud Logo" 
            className="h-32 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">طلبات الإجازات</h1>
          <p className="text-muted-foreground">إدارة طلبات الإجازات ومتابعة حالتها</p>
        </div>

        {/* Add Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            طلب إجازة جديد
          </Button>
        </div>

        {/* Leave Balance */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الإجازات المتاحة</p>
                <p className="text-2xl font-bold text-green-600">15 يوم</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المستخدمة هذا العام</p>
                <p className="text-2xl font-bold text-blue-600">8 أيام</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الطلبات المعلقة</p>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* New Request Form */}
        {showForm && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">طلب إجازة جديد</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-black">نوع الإجازة</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>إجازة سنوية</option>
                    <option>إجازة مرضية</option>
                    <option>إجازة اضطرارية</option>
                    <option>إجازة أمومة</option>
                  </select>
                </div>
                
                <div>
                  <Label className="text-black">تاريخ البداية</Label>
                  <Input type="date" className="mt-1" />
                </div>

                <div>
                  <Label className="text-black">تاريخ النهاية</Label>
                  <Input type="date" className="mt-1" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-black">سبب الإجازة</Label>
                  <Textarea 
                    placeholder="اكتب سبب طلب الإجازة..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      // إرسال الطلب
                      setShowForm(false);
                      // يمكن إضافة منطق الإرسال هنا
                    }}
                  >
                    إرسال الطلب
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Leave Requests History */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-black mb-4">سجل طلبات الإجازات</h3>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${
                    request.status === 'مقبول' ? 'bg-green-500' :
                    request.status === 'مرفوض' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-black">{request.type}</h4>
                    <p className="text-sm text-gray-600">{request.reason}</p>
                    <p className="text-xs text-gray-500">
                      {request.startDate} إلى {request.endDate} ({request.days} أيام)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant={
                    request.status === 'مقبول' ? 'default' :
                    request.status === 'مرفوض' ? 'destructive' : 'secondary'
                  }>
                    {request.status}
                  </Badge>
                  
                  {request.status === 'مقبول' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {request.status === 'مرفوض' && <XCircle className="h-5 w-5 text-red-500" />}
                  {request.status === 'معلق' && <Clock className="h-5 w-5 text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
