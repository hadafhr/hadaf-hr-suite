import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  LogOut, Plus, Calendar, CreditCard, FileText, 
  Calculator, CheckCircle, AlertCircle, User
} from 'lucide-react';
import { useEmployeeServices } from '@/hooks/useEmployeeServices';

export function EndOfServiceManagement() {
  const [showEOSDialog, setShowEOSDialog] = useState(false);
  const [eosForm, setEosForm] = useState({
    termination_type: '',
    termination_date: '',
    reason: '',
    notice_period_days: 30
  });

  const { endOfServiceRecords, loading } = useEmployeeServices();

  const terminationTypes = [
    { id: 'resignation', name: 'استقالة', color: 'bg-blue-100 text-blue-800' },
    { id: 'termination', name: 'فصل', color: 'bg-red-100 text-red-800' },
    { id: 'contract_end', name: 'انتهاء عقد', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'retirement', name: 'تقاعد', color: 'bg-green-100 text-green-800' }
  ];

  const calculateEOSBenefits = (yearsOfService: number, lastSalary: number) => {
    // حساب مكافأة نهاية الخدمة حسب نظام العمل السعودي
    let eosAmount = 0;
    
    if (yearsOfService >= 1) {
      // أول 5 سنوات: نصف راتب شهر عن كل سنة
      const firstFiveYears = Math.min(yearsOfService, 5);
      eosAmount += firstFiveYears * (lastSalary * 0.5);
      
      // ما زاد عن 5 سنوات: راتب شهر كامل عن كل سنة
      if (yearsOfService > 5) {
        const remainingYears = yearsOfService - 5;
        eosAmount += remainingYears * lastSalary;
      }
    }
    
    return eosAmount;
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              إدارة نهاية الخدمة
            </CardTitle>
            <Dialog open={showEOSDialog} onOpenChange={setShowEOSDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة طلب نهاية خدمة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle>طلب نهاية خدمة موظف</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>نوع إنهاء الخدمة</Label>
                      <Select 
                        value={eosForm.termination_type} 
                        onValueChange={(value) => setEosForm({...eosForm, termination_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الإنهاء" />
                        </SelectTrigger>
                        <SelectContent>
                          {terminationTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>تاريخ الإنهاء</Label>
                      <Input 
                        type="date"
                        value={eosForm.termination_date}
                        onChange={(e) => setEosForm({...eosForm, termination_date: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>فترة الإشعار (بالأيام)</Label>
                    <Input 
                      type="number"
                      value={eosForm.notice_period_days}
                      onChange={(e) => setEosForm({...eosForm, notice_period_days: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>سبب إنهاء الخدمة</Label>
                    <Textarea 
                      value={eosForm.reason}
                      onChange={(e) => setEosForm({...eosForm, reason: e.target.value})}
                      placeholder="اذكر سبب إنهاء الخدمة..."
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      حاسبة مكافأة نهاية الخدمة
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">سنوات الخدمة:</span>
                        <span className="font-medium mr-2">5.2 سنة</span>
                      </div>
                      <div>
                        <span className="text-gray-600">آخر راتب:</span>
                        <span className="font-medium mr-2">8,000 ريال</span>
                      </div>
                      <div>
                        <span className="text-gray-600">مكافأة نهاية الخدمة:</span>
                        <span className="font-medium text-green-600 mr-2">29,600 ريال</span>
                      </div>
                      <div>
                        <span className="text-gray-600">رصيد الإجازات:</span>
                        <span className="font-medium mr-2">15 يوم</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowEOSDialog(false)}>إلغاء</Button>
                    <Button>إرسال الطلب</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {endOfServiceRecords.length > 0 ? (
            <div className="space-y-4">
              {endOfServiceRecords.map((record) => (
                <div key={record.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">طلب نهاية خدمة - {record.employee_id}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(record.termination_date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={record.status === 'completed' ? 'default' : 'secondary'}
                      className={
                        terminationTypes.find(t => t.id === record.termination_type)?.color || 'bg-gray-100 text-gray-800'
                      }
                    >
                      {terminationTypes.find(t => t.id === record.termination_type)?.name || record.termination_type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>تاريخ الإنهاء: {new Date(record.termination_date).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span>المبلغ المستحق: {record.net_amount?.toLocaleString() || 0} ريال</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {record.status === 'completed' ? 
                        <CheckCircle className="h-4 w-4 text-green-500" /> : 
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      }
                      <span>
                        {record.status === 'pending' ? 'قيد المراجعة' : 
                         record.status === 'approved' ? 'معتمد' : 
                         record.status === 'completed' ? 'مكتمل' : record.status}
                      </span>
                    </div>
                  </div>

                  {record.reason && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <FileText className="h-4 w-4 inline ml-1" />
                      {record.reason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <LogOut className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد طلبات نهاية خدمة</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}