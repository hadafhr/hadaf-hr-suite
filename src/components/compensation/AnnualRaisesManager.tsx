import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface EmployeeRaise {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  currentSalary: number;
  performanceRating: string;
  raisePercentage: number;
  newSalary: number;
  status: 'pending' | 'approved' | 'rejected';
  evaluationYear: number;
  lastRaiseDate: string;
}

export const AnnualRaisesManager: React.FC = () => {
  const [raises, setRaises] = useState<EmployeeRaise[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد',
      position: 'مطور برمجيات',
      currentSalary: 8000,
      performanceRating: 'ممتاز',
      raisePercentage: 7,
      newSalary: 8560,
      status: 'pending',
      evaluationYear: 2024,
      lastRaiseDate: '2023-01-01'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'فاطمة علي',
      position: 'محاسبة',
      currentSalary: 6500,
      performanceRating: 'جيد جداً',
      raisePercentage: 5,
      newSalary: 6825,
      status: 'approved',
      evaluationYear: 2024,
      lastRaiseDate: '2023-01-01'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'خالد سالم',
      position: 'مندوب مبيعات',
      currentSalary: 5000,
      performanceRating: 'جيد',
      raisePercentage: 3,
      newSalary: 5150,
      status: 'pending',
      evaluationYear: 2024,
      lastRaiseDate: '2023-01-01'
    }
  ]);

  const [selectedYear, setSelectedYear] = useState('2024');
  const [filterStatus, setFilterStatus] = useState('all');

  const performanceRates = {
    'ممتاز': { percentage: 7, color: 'bg-green-100 text-green-800' },
    'جيد جداً': { percentage: 5, color: 'bg-blue-100 text-blue-800' },
    'جيد': { percentage: 3, color: 'bg-yellow-100 text-yellow-800' },
    'مقبول': { percentage: 1, color: 'bg-orange-100 text-orange-800' },
    'ضعيف': { percentage: 0, color: 'bg-red-100 text-red-800' }
  };

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    'pending': 'معلق',
    'approved': 'موافق عليه',
    'rejected': 'مرفوض'
  };

  const handleApprove = (id: string) => {
    setRaises(prev => prev.map(raise => 
      raise.id === id ? { ...raise, status: 'approved' as const } : raise
    ));
  };

  const handleReject = (id: string) => {
    setRaises(prev => prev.map(raise => 
      raise.id === id ? { ...raise, status: 'rejected' as const } : raise
    ));
  };

  const filteredRaises = raises.filter(raise => {
    const yearMatch = selectedYear === 'all' || raise.evaluationYear.toString() === selectedYear;
    const statusMatch = filterStatus === 'all' || raise.status === filterStatus;
    return yearMatch && statusMatch;
  });

  const totalRaiseBudget = filteredRaises
    .filter(raise => raise.status === 'approved')
    .reduce((sum, raise) => sum + (raise.newSalary - raise.currentSalary), 0);

  const pendingRaises = filteredRaises.filter(raise => raise.status === 'pending').length;
  const approvedRaises = filteredRaises.filter(raise => raise.status === 'approved').length;

  const generateAutomaticRaises = () => {
    // Logic to automatically calculate raises based on performance ratings
    console.log('Generating automatic raises for eligible employees...');
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">علاوات معلقة</p>
                <p className="text-2xl font-bold">{pendingRaises}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">علاوات موافق عليها</p>
                <p className="text-2xl font-bold">{approvedRaises}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي ميزانية العلاوات</p>
                <p className="text-xl font-bold">{totalRaiseBudget.toLocaleString()} ريال</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">السنة المالية</p>
                <p className="text-2xl font-bold">{selectedYear}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>إدارة العلاوات السنوية</CardTitle>
            <div className="flex gap-2">
              <Button onClick={generateAutomaticRaises}>
                <TrendingUp className="w-4 h-4 ml-2" />
                حساب العلاوات التلقائي
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4 mt-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="اختر السنة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع السنوات</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="فلترة حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">معلق</SelectItem>
                <SelectItem value="approved">موافق عليه</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* Performance Rating Legend */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-3">سلم تقييم الأداء ونسب العلاوات:</h4>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(performanceRates).map(([rating, data]) => (
                <div key={rating} className="text-center">
                  <Badge className={data.color}>{rating}</Badge>
                  <p className="text-sm mt-1 font-medium">{data.percentage}%</p>
                </div>
              ))}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الموظف</TableHead>
                <TableHead>المنصب</TableHead>
                <TableHead>الراتب الحالي</TableHead>
                <TableHead>تقييم الأداء</TableHead>
                <TableHead>نسبة العلاوة</TableHead>
                <TableHead>الراتب الجديد</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRaises.map((raise) => (
                <TableRow key={raise.id}>
                  <TableCell className="font-medium">{raise.employeeName}</TableCell>
                  <TableCell>{raise.position}</TableCell>
                  <TableCell>{raise.currentSalary.toLocaleString()} ريال</TableCell>
                  <TableCell>
                    <Badge className={performanceRates[raise.performanceRating as keyof typeof performanceRates].color}>
                      {raise.performanceRating}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{raise.raisePercentage}%</span>
                      <Progress 
                        value={raise.raisePercentage * 10} 
                        className="w-16"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {raise.newSalary.toLocaleString()} ريال
                    <div className="text-xs text-muted-foreground">
                      (+{(raise.newSalary - raise.currentSalary).toLocaleString()})
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[raise.status]}>
                      {statusLabels[raise.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {raise.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApprove(raise.id)}
                        >
                          موافقة
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReject(raise.id)}
                        >
                          رفض
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};