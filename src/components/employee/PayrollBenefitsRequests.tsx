import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, CreditCard, Building2, FileText, 
  Download, Send, CheckCircle, Clock, Banknote,
  Receipt, PiggyBank, Calculator
} from 'lucide-react';
import { useEmployeeServices } from '@/hooks/useEmployeeServices';
import { useToast } from '@/hooks/use-toast';

export function PayrollBenefitsRequests() {
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestForm, setRequestForm] = useState({
    request_type: '',
    requested_amount: '',
    request_reason: '',
    bank_letter_type: ''
  });

  const { submitPayrollRequest, payrollRequests, loading } = useEmployeeServices();
  const { toast } = useToast();

  // بيانات تجريبية للراتب
  const salaryData = {
    basic_salary: 8000,
    housing_allowance: 2000,
    transport_allowance: 500,
    other_allowances: 300,
    gross_salary: 10800,
    gosi_deduction: 540,
    income_tax: 0,
    other_deductions: 200,
    net_salary: 10060
  };

  const handleSubmitRequest = async () => {
    try {
      await submitPayrollRequest({
        employee_id: '1', // سيتم استبداله بالموظف الحالي
        status: 'pending',
        documents: [],
        ...requestForm,
        requested_amount: requestForm.requested_amount ? parseFloat(requestForm.requested_amount) : undefined
      });
      
      setShowRequestDialog(false);
      setRequestForm({
        request_type: '',
        requested_amount: '',
        request_reason: '',
        bank_letter_type: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  const requestTypes = [
    { id: 'salary_certificate', name: 'شهادة راتب', icon: <FileText className="h-4 w-4" />, requiresAmount: false },
    { id: 'salary_advance', name: 'سلفة على الراتب', icon: <PiggyBank className="h-4 w-4" />, requiresAmount: true },
    { id: 'housing_allowance', name: 'طلب بدل سكن', icon: <Building2 className="h-4 w-4" />, requiresAmount: true },
    { id: 'transport_allowance', name: 'طلب بدل مواصلات', icon: <CreditCard className="h-4 w-4" />, requiresAmount: true }
  ];

  const bankLetterTypes = [
    { id: 'loan', name: 'قرض شخصي' },
    { id: 'credit_card', name: 'بطاقة ائتمانية' },
    { id: 'mortgage', name: 'قرض سكني' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد المراجعة', variant: 'secondary' as const },
      approved: { label: 'مقبول', variant: 'default' as const },
      rejected: { label: 'مرفوض', variant: 'destructive' as const },
      processed: { label: 'تم التنفيذ', variant: 'default' as const }
    };
    
    return <Badge variant={statusConfig[status as keyof typeof statusConfig]?.variant || 'secondary'}>
      {statusConfig[status as keyof typeof statusConfig]?.label || status}
    </Badge>;
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              طلبات الرواتب والمزايا
            </CardTitle>
            <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  طلب جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إرسال طلب راتب أو مزايا</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>نوع الطلب</Label>
                    <Select 
                      value={requestForm.request_type} 
                      onValueChange={(value) => setRequestForm({...requestForm, request_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الطلب" />
                      </SelectTrigger>
                      <SelectContent>
                        {requestTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {type.icon}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {requestForm.request_type === 'salary_certificate' && (
                    <div className="space-y-2">
                      <Label>نوع الخطاب البنكي</Label>
                      <Select 
                        value={requestForm.bank_letter_type} 
                        onValueChange={(value) => setRequestForm({...requestForm, bank_letter_type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الخطاب" />
                        </SelectTrigger>
                        <SelectContent>
                          {bankLetterTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {requestTypes.find(t => t.id === requestForm.request_type)?.requiresAmount && (
                    <div className="space-y-2">
                      <Label>المبلغ المطلوب (ريال)</Label>
                      <Input 
                        type="number"
                        value={requestForm.requested_amount}
                        onChange={(e) => setRequestForm({...requestForm, requested_amount: e.target.value})}
                        placeholder="أدخل المبلغ"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>سبب الطلب</Label>
                    <Textarea 
                      value={requestForm.request_reason}
                      onChange={(e) => setRequestForm({...requestForm, request_reason: e.target.value})}
                      placeholder="اشرح سبب الطلب..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                      إلغاء
                    </Button>
                    <Button 
                      onClick={handleSubmitRequest} 
                      disabled={!requestForm.request_type || !requestForm.request_reason}
                    >
                      إرسال الطلب
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Salary Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">الراتب الصافي</p>
                  <p className="text-xl font-bold text-green-600">{salaryData.net_salary.toLocaleString()} ر.س</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">الراتب الإجمالي</p>
                  <p className="text-xl font-bold text-blue-600">{salaryData.gross_salary.toLocaleString()} ر.س</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">بدل السكن</p>
                  <p className="text-xl font-bold text-purple-600">{salaryData.housing_allowance.toLocaleString()} ر.س</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">بدل المواصلات</p>
                  <p className="text-xl font-bold text-orange-600">{salaryData.transport_allowance.toLocaleString()} ر.س</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="salary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="salary">تفاصيل الراتب</TabsTrigger>
          <TabsTrigger value="requests">طلباتي</TabsTrigger>
          <TabsTrigger value="payslips">قسائم الراتب</TabsTrigger>
        </TabsList>

        {/* Salary Details */}
        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الراتب - يناير 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-700">المستحقات</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>الراتب الأساسي:</span>
                      <span className="font-medium">{salaryData.basic_salary.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>بدل السكن:</span>
                      <span className="font-medium">{salaryData.housing_allowance.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>بدل المواصلات:</span>
                      <span className="font-medium">{salaryData.transport_allowance.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>بدلات أخرى:</span>
                      <span className="font-medium">{salaryData.other_allowances.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-green-200">
                      <span className="font-semibold">إجمالي المستحقات:</span>
                      <span className="font-bold text-green-600">{salaryData.gross_salary.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-red-700">الاستقطاعات</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>التأمينات الاجتماعية (5%):</span>
                      <span className="font-medium">{salaryData.gosi_deduction.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ضريبة الدخل:</span>
                      <span className="font-medium">{salaryData.income_tax.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>استقطاعات أخرى:</span>
                      <span className="font-medium">{salaryData.other_deductions.toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-red-200">
                      <span className="font-semibold">إجمالي الاستقطاعات:</span>
                      <span className="font-bold text-red-600">
                        {(salaryData.gosi_deduction + salaryData.income_tax + salaryData.other_deductions).toLocaleString()} ر.س
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">صافي الراتب:</span>
                  <span className="text-2xl font-bold text-blue-600">{salaryData.net_salary.toLocaleString()} ر.س</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests */}
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>طلباتي</CardTitle>
            </CardHeader>
            <CardContent>
              {payrollRequests.length > 0 ? (
                <div className="space-y-4">
                  {payrollRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {requestTypes.find(t => t.id === request.request_type)?.name || request.request_type}
                          </span>
                          {request.requested_amount && (
                            <Badge variant="outline">{request.requested_amount.toLocaleString()} ر.س</Badge>
                          )}
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{request.request_reason}</p>
                      <p className="text-xs text-gray-500">
                        تاريخ الإرسال: {new Date(request.created_at).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد طلبات</p>
                  <Button variant="outline" className="mt-4" onClick={() => setShowRequestDialog(true)}>
                    إرسال طلب جديد
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payslips */}
        <TabsContent value="payslips">
          <Card>
            <CardHeader>
              <CardTitle>قسائم الراتب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: 'يناير 2024', amount: salaryData.net_salary, status: 'مدفوع' },
                  { month: 'ديسمبر 2023', amount: salaryData.net_salary, status: 'مدفوع' },
                  { month: 'نوفمبر 2023', amount: salaryData.net_salary, status: 'مدفوع' }
                ].map((payslip, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Receipt className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{payslip.month}</h4>
                        <p className="text-sm text-gray-600">{payslip.amount.toLocaleString()} ر.س</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="default">{payslip.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}