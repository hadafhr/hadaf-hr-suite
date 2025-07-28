
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, XCircle, User, Eye } from 'lucide-react';

const leaveRequests = [
  {
    id: 1,
    employeeName: "أحمد محمد السعد",
    department: "تقنية المعلومات",
    leaveType: "إجازة سنوية",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    days: 3,
    status: "معلق",
    reason: "إجازة عائلية",
    submittedDate: "2024-02-01"
  },
  {
    id: 2,
    employeeName: "فاطمة عبدالله النور",
    department: "المالية",
    leaveType: "إجازة مرضية",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    days: 2,
    status: "معلق",
    reason: "إجازة مرضية",
    submittedDate: "2024-02-08"
  },
  {
    id: 3,
    employeeName: "محمد عبدالرحمن الشمري",
    department: "المبيعات",
    leaveType: "إجازة اضطرارية",
    startDate: "2024-01-25",
    endDate: "2024-01-25",
    days: 1,
    status: "مقبول",
    reason: "ظروف طارئة",
    submittedDate: "2024-01-24"
  }
];

export const LeaveManagement: React.FC = () => {
  const pendingRequests = leaveRequests.filter(req => req.status === 'معلق').length;
  const approvedRequests = leaveRequests.filter(req => req.status === 'مقبول').length;
  const rejectedRequests = leaveRequests.filter(req => req.status === 'مرفوض').length;

  const handleApprove = (id: number) => {
    console.log(`تم قبول طلب الإجازة رقم ${id}`);
  };

  const handleReject = (id: number) => {
    console.log(`تم رفض طلب الإجازة رقم ${id}`);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-2">إدارة طلبات الإجازات</h1>
          <p className="text-gray-600">مراجعة والموافقة على طلبات الإجازات</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">طلبات معلقة</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">طلبات مقبولة</p>
                <p className="text-2xl font-bold text-green-600">{approvedRequests}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">طلبات مرفوضة</p>
                <p className="text-2xl font-bold text-red-600">{rejectedRequests}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-blue-600">{leaveRequests.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </Card>
        </div>

        {/* Leave Requests */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-black mb-4">طلبات الإجازات</h3>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">{request.employeeName}</h4>
                      <p className="text-sm text-gray-600">{request.department}</p>
                      <p className="text-xs text-gray-500">تاريخ التقديم: {request.submittedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="font-medium text-black">{request.leaveType}</p>
                      <p className="text-xs text-gray-500">نوع الإجازة</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium text-black">{request.startDate}</p>
                      <p className="text-xs text-gray-500">من</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium text-black">{request.endDate}</p>
                      <p className="text-xs text-gray-500">إلى</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="font-medium text-black">{request.days} أيام</p>
                      <p className="text-xs text-gray-500">المدة</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        request.status === 'مقبول' ? 'default' :
                        request.status === 'مرفوض' ? 'destructive' : 'secondary'
                      }>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pl-16">
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>السبب:</strong> {request.reason}
                  </p>
                  
                  {request.status === 'معلق' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleApprove(request.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        قبول
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleReject(request.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        رفض
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">إحصائيات الإجازات</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">متوسط مدة الإجازة</span>
                <span className="font-bold text-black">2.3 أيام</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">أكثر نوع إجازة</span>
                <span className="font-bold text-black">إجازة سنوية</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">معدل القبول</span>
                <span className="font-bold text-green-600">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">وقت المعالجة المتوسط</span>
                <span className="font-bold text-black">1.5 يوم</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">إجراءات سريعة</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                إدارة سياسات الإجازات
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                تقرير الإجازات الشهري
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                عرض رصيد الإجازات
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
