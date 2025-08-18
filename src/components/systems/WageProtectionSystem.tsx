import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Banknote, CheckCircle, AlertTriangle, Users, DollarSign, Calendar } from 'lucide-react';

interface WageRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paymentDate: string;
  status: 'مدفوع' | 'معلق' | 'مرفوض';
  mudadReference?: string;
}

interface WageProtectionSystemProps {
  onBack: () => void;
}

export const WageProtectionSystem: React.FC<WageProtectionSystemProps> = ({ onBack }) => {
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  
  const wageRecords: WageRecord[] = [
    {
      id: 'WR001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      basicSalary: 12000,
      allowances: 3300,
      deductions: 800,
      netSalary: 14500,
      paymentDate: '2024-03-25',
      status: 'مدفوع',
      mudadReference: 'MD240325001'
    },
    {
      id: 'WR002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة أحمد السالم',
      basicSalary: 10000,
      allowances: 2500,
      deductions: 600,
      netSalary: 11900,
      paymentDate: '2024-03-25',
      status: 'مدفوع',
      mudadReference: 'MD240325002'
    },
    {
      id: 'WR003',
      employeeId: 'EMP003',
      employeeName: 'محمد سعد الخالد',
      basicSalary: 8000,
      allowances: 2000,
      deductions: 400,
      netSalary: 9600,
      paymentDate: '2024-03-25',
      status: 'معلق',
      mudadReference: undefined
    }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      'مدفوع': 'bg-green-100 text-green-800 border-green-200',
      'معلق': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'مرفوض': 'bg-red-100 text-red-800 border-red-200'
    };
    return config[status as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'مدفوع':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'معلق':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'مرفوض':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const paidRecords = wageRecords.filter(r => r.status === 'مدفوع');
  const pendingRecords = wageRecords.filter(r => r.status === 'معلق');
  const totalWages = wageRecords.reduce((sum, record) => sum + record.netSalary, 0);
  const paidWages = paidRecords.reduce((sum, record) => sum + record.netSalary, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="hover:bg-[#009F87]/10"
        >
          <ArrowLeft className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <Banknote className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">نظام حماية الأجور</h1>
            <p className="text-muted-foreground">إدارة ومراقبة دفع الأجور عبر منصة مدد</p>
          </div>
        </div>
        <div className="mr-auto flex items-center gap-3">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-[#009F87]/20 rounded-lg px-3 py-2 focus:border-[#009F87]"
          >
            <option value="2024-03">مارس 2024</option>
            <option value="2024-02">فبراير 2024</option>
            <option value="2024-01">يناير 2024</option>
          </select>
          <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
            <Banknote className="h-4 w-4 ml-2" />
            رفع ملف الأجور
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87] mb-1">{wageRecords.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">{paidRecords.length}</div>
            <div className="text-sm text-muted-foreground">أجور مدفوعة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">{pendingRecords.length}</div>
            <div className="text-sm text-muted-foreground">أجور معلقة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {((paidWages / totalWages) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">معدل الدفع</div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#009F87]">
            <Banknote className="h-6 w-6" />
            ملخص الأجور - {selectedMonth}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#009F87]/5 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#009F87] mb-1">
                {totalWages.toLocaleString()} ر.س
              </div>
              <div className="text-sm text-muted-foreground">إجمالي الأجور</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {paidWages.toLocaleString()} ر.س
              </div>
              <div className="text-sm text-muted-foreground">المبلغ المدفوع</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {(totalWages - paidWages).toLocaleString()} ر.س
              </div>
              <div className="text-sm text-muted-foreground">المبلغ المعلق</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wage Records */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#009F87]">
            <Users className="h-6 w-6" />
            سجل أجور الموظفين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wageRecords.map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#009F87]/10 rounded-lg">
                      <Users className="h-5 w-5 text-[#009F87]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                      <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(record.status)}
                    <Badge className={getStatusBadge(record.status)}>
                      {record.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 gap-4 text-sm">
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <div className="font-semibold text-blue-600">{record.basicSalary.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">الراتب الأساسي</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded text-center">
                    <div className="font-semibold text-green-600">{record.allowances.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">البدلات</div>
                  </div>
                  <div className="bg-red-50 p-2 rounded text-center">
                    <div className="font-semibold text-red-600">{record.deductions.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">الاستقطاعات</div>
                  </div>
                  <div className="bg-[#009F87]/5 p-2 rounded text-center">
                    <div className="font-semibold text-[#009F87]">{record.netSalary.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">صافي الراتب</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <div className="font-semibold text-gray-700">
                      <Calendar className="h-4 w-4 inline ml-1" />
                      {record.paymentDate}
                    </div>
                    <div className="text-xs text-muted-foreground">تاريخ الدفع</div>
                  </div>
                </div>

                {record.mudadReference && (
                  <div className="mt-3 bg-green-50 p-2 rounded-lg">
                    <div className="text-sm">
                      <span className="font-medium text-green-700">مرجع مدد: </span>
                      <span className="text-green-600">{record.mudadReference}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};