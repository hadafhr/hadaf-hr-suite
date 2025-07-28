
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, TrendingUp, Download, Eye, Edit } from 'lucide-react';

const employeePayroll = [
  {
    id: 1,
    name: "أحمد محمد السعد",
    position: "مطور برمجيات أول",
    department: "تقنية المعلومات",
    basicSalary: 12000,
    allowances: 2000,
    deductions: 500,
    netSalary: 13500,
    status: "مدفوع"
  },
  {
    id: 2,
    name: "فاطمة عبدالله النور",
    position: "محاسبة مالية",
    department: "المالية",
    basicSalary: 9500,
    allowances: 1500,
    deductions: 400,
    netSalary: 10600,
    status: "مدفوع"
  },
  {
    id: 3,
    name: "محمد عبدالرحمن الشمري",
    position: "مسؤول مبيعات",
    department: "المبيعات",
    basicSalary: 8500,
    allowances: 1200,
    deductions: 350,
    netSalary: 9350,
    status: "معلق"
  }
];

export const PayrollManagement: React.FC = () => {
  const totalPayroll = employeePayroll.reduce((sum, emp) => sum + emp.netSalary, 0);
  const totalEmployees = employeePayroll.length;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">إدارة الرواتب والمستحقات</h1>
            <p className="text-gray-600">نظام شامل لإدارة رواتب الموظفين والمستحقات</p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600">
            <Download className="h-4 w-4 mr-2" />
            تقرير الرواتب الشهري
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الرواتب الشهرية</p>
                <p className="text-2xl font-bold text-green-600">{totalPayroll.toLocaleString()} ريال</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">عدد الموظفين</p>
                <p className="text-2xl font-bold text-blue-600">{totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط الراتب</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(totalPayroll / totalEmployees).toLocaleString()} ريال</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الرواتب المعلقة</p>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Employee Payroll List */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-black mb-4">رواتب الموظفين - يناير 2024</h3>
          <div className="space-y-4">
            {employeePayroll.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">{employee.name}</h4>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                    <p className="text-xs text-gray-500">{employee.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium text-black">{employee.basicSalary.toLocaleString()} ريال</p>
                    <p className="text-xs text-gray-500">الراتب الأساسي</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-green-600">+{employee.allowances.toLocaleString()} ريال</p>
                    <p className="text-xs text-gray-500">البدلات</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-red-600">-{employee.deductions.toLocaleString()} ريال</p>
                    <p className="text-xs text-gray-500">الاستقطاعات</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-black">{employee.netSalary.toLocaleString()} ريال</p>
                    <p className="text-xs text-gray-500">صافي الراتب</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={employee.status === 'مدفوع' ? 'default' : 'secondary'}>
                      {employee.status}
                    </Badge>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payroll Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">تحليل الرواتب</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">إجمالي الرواتب الأساسية</span>
                <span className="font-bold text-black">{employeePayroll.reduce((sum, emp) => sum + emp.basicSalary, 0).toLocaleString()} ريال</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">إجمالي البدلات</span>
                <span className="font-bold text-green-600">+{employeePayroll.reduce((sum, emp) => sum + emp.allowances, 0).toLocaleString()} ريال</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">إجمالي الاستقطاعات</span>
                <span className="font-bold text-red-600">-{employeePayroll.reduce((sum, emp) => sum + emp.deductions, 0).toLocaleString()} ريال</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-black">صافي الرواتب</span>
                  <span className="text-xl font-bold text-green-600">{totalPayroll.toLocaleString()} ريال</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">إجراءات سريعة</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                إنشاء رواتب الشهر الجديد
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                تصدير كشوف الرواتب
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                تقرير الرواتب السنوي
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                إدارة البدلات والاستقطاعات
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
