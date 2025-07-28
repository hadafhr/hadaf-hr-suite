
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';

const attendanceData = [
  {
    id: 1,
    name: "أحمد محمد السعد",
    department: "تقنية المعلومات",
    checkIn: "08:00",
    checkOut: "17:00",
    workingHours: "9:00",
    status: "حضور",
    late: false
  },
  {
    id: 2,
    name: "فاطمة عبدالله النور",
    department: "المالية",
    checkIn: "08:15",
    checkOut: "17:10",
    workingHours: "8:55",
    status: "حضور",
    late: true
  },
  {
    id: 3,
    name: "محمد عبدالرحمن الشمري",
    department: "المبيعات",
    checkIn: "-",
    checkOut: "-",
    workingHours: "-",
    status: "غياب",
    late: false
  }
];

export const AttendanceManagement: React.FC = () => {
  const presentCount = attendanceData.filter(emp => emp.status === 'حضور').length;
  const absentCount = attendanceData.filter(emp => emp.status === 'غياب').length;
  const lateCount = attendanceData.filter(emp => emp.late).length;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">إدارة الحضور والانصراف</h1>
            <p className="text-gray-600">متابعة حضور الموظفين وإدارة أوقات العمل</p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600">
            <Download className="h-4 w-4 mr-2" />
            تقرير الحضور اليومي
          </Button>
        </div>

        {/* Daily Summary */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الموظفين الحاضرين</p>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الموظفين الغائبين</p>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المتأخرين</p>
                <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">نسبة الحضور</p>
                <p className="text-2xl font-bold text-blue-600">{Math.round((presentCount / attendanceData.length) * 100)}%</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>
        </div>

        {/* Today's Attendance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-black mb-4">حضور اليوم - {new Date().toLocaleDateString('ar-SA')}</h3>
          <div className="space-y-4">
            {attendanceData.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${
                    employee.status === 'حضور' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">{employee.name}</h4>
                    <p className="text-sm text-gray-600">{employee.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="font-medium text-black">{employee.checkIn}</p>
                    <p className="text-xs text-gray-500">وقت الحضور</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-medium text-black">{employee.checkOut}</p>
                    <p className="text-xs text-gray-500">وقت الانصراف</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-medium text-black">{employee.workingHours}</p>
                    <p className="text-xs text-gray-500">ساعات العمل</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={employee.status === 'حضور' ? 'default' : 'destructive'}>
                      {employee.status}
                    </Badge>
                    {employee.late && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        متأخر
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Attendance Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">إحصائيات الحضور الأسبوعية</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">متوسط الحضور اليومي</span>
                <span className="font-bold text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">متوسط ساعات العمل</span>
                <span className="font-bold text-black">8.5 ساعة</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">معدل التأخير</span>
                <span className="font-bold text-yellow-600">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">الانصراف المبكر</span>
                <span className="font-bold text-red-600">3%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">إجراءات سريعة</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                تسجيل حضور يدوي
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                تصدير تقرير الحضور
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                إدارة أوقات العمل
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                تقرير التأخير والغياب
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
