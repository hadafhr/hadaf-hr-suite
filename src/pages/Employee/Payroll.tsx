
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Download, Eye, TrendingUp, Calendar } from 'lucide-react';

const payrollHistory = [
  {
    month: "يناير 2024",
    basicSalary: 12000,
    allowances: 2000,
    deductions: 500,
    netSalary: 13500,
    status: "مدفوع"
  },
  {
    month: "ديسمبر 2023",
    basicSalary: 12000,
    allowances: 1800,
    deductions: 600,
    netSalary: 13200,
    status: "مدفوع"
  },
  {
    month: "نوفمبر 2023",
    basicSalary: 12000,
    allowances: 2200,
    deductions: 400,
    netSalary: 13800,
    status: "مدفوع"
  }
];

export const Payroll: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-2">كشف الراتب</h1>
          <p className="text-gray-600">عرض تفاصيل الراتب والمستحقات الشهرية</p>
        </div>

        {/* Current Month Summary */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الراتب الأساسي</p>
                <p className="text-2xl font-bold text-green-600">12,000 ريال</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">البدلات</p>
                <p className="text-2xl font-bold text-blue-600">2,000 ريال</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الاستقطاعات</p>
                <p className="text-2xl font-bold text-red-600">500 ريال</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">صافي الراتب</p>
                <p className="text-2xl font-bold text-purple-600">13,500 ريال</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Current Month Details */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">تفاصيل راتب يناير 2024</h3>
            <Button className="bg-green-500 hover:bg-green-600">
              <Download className="h-4 w-4 mr-2" />
              تحميل PDF
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-black mb-4">الراتب والبدلات</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">الراتب الأساسي</span>
                  <span className="font-medium text-black">12,000 ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">بدل النقل</span>
                  <span className="font-medium text-black">800 ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">بدل السكن</span>
                  <span className="font-medium text-black">1,200 ريال</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold text-black">إجمالي الراتب</span>
                  <span className="font-bold text-green-600">14,000 ريال</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">الاستقطاعات</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">التأمين الاجتماعي</span>
                  <span className="font-medium text-black">300 ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">التأمين الطبي</span>
                  <span className="font-medium text-black">150 ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">القروض</span>
                  <span className="font-medium text-black">50 ريال</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold text-black">إجمالي الاستقطاعات</span>
                  <span className="font-bold text-red-600">500 ريال</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black">صافي الراتب</span>
              <span className="text-2xl font-bold text-green-600">13,500 ريال</span>
            </div>
          </div>
        </Card>

        {/* Payroll History */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-black mb-4">سجل الرواتب</h3>
          <div className="space-y-4">
            {payrollHistory.map((payroll, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Calendar className="h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-semibold text-black">{payroll.month}</h4>
                    <p className="text-sm text-gray-600">صافي الراتب: {payroll.netSalary.toLocaleString()} ريال</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant="default">
                    {payroll.status}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
