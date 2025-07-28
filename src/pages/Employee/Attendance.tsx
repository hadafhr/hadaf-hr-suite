
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const attendanceHistory = [
  {
    date: "2024-01-28",
    checkIn: "08:00",
    checkOut: "17:00",
    workingHours: "9:00",
    status: "حضور",
    late: false
  },
  {
    date: "2024-01-27",
    checkIn: "08:15",
    checkOut: "17:10",
    workingHours: "8:55",
    status: "حضور",
    late: true
  },
  {
    date: "2024-01-26",
    checkIn: "-",
    checkOut: "-",
    workingHours: "-",
    status: "غياب",
    late: false
  },
  {
    date: "2024-01-25",
    checkIn: "08:00",
    checkOut: "17:00",
    workingHours: "9:00",
    status: "حضور",
    late: false
  }
];

export const Attendance: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-2">سجل الحضور والانصراف</h1>
          <p className="text-gray-600">متابعة أوقات الحضور والانصراف اليومية</p>
        </div>

        {/* Current Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">الحالة الحالية</h3>
            <Badge className="bg-green-100 text-green-800">متواجد</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-semibold text-black">وقت الحضور</p>
                    <p className="text-sm text-gray-600">اليوم</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-green-600">08:00 ص</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold text-black">وقت الانصراف المتوقع</p>
                    <p className="text-sm text-gray-600">اليوم</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-600">17:00 م</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg">
                <Clock className="h-5 w-5 mr-2" />
                تسجيل الانصراف
              </Button>
            </div>
          </div>
        </Card>

        {/* Monthly Statistics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">أيام الحضور</p>
                <p className="text-2xl font-bold text-green-600">22</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">أيام الغياب</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مرات التأخير</p>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">نسبة الحضور</p>
                <p className="text-2xl font-bold text-blue-600">95%</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </Card>
        </div>

        {/* Attendance History */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-black mb-4">سجل الحضور الأسبوعي</h3>
          <div className="space-y-4">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${
                    record.status === 'حضور' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-semibold text-black">{record.date}</p>
                    <p className="text-sm text-gray-600">
                      {record.status === 'حضور' ? 
                        `${record.checkIn} - ${record.checkOut}` : 
                        'لم يتم التسجيل'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-black">{record.workingHours}</p>
                    <p className="text-xs text-gray-500">ساعات العمل</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={record.status === 'حضور' ? 'default' : 'destructive'}>
                      {record.status}
                    </Badge>
                    {record.late && (
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
      </div>
    </div>
  );
};
