import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, Send, Plus, Clock, CheckCircle, 
  AlertCircle, User, CreditCard, Building2,
  FileCheck, Briefcase, GraduationCap, Satellite
} from 'lucide-react';
import { useEmployeeServices } from '@/hooks/useEmployeeServices';

export function EmployeeRequestsPortal() {
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestForm, setRequestForm] = useState({
    request_type: '',
    title: '',
    description: '',
    priority: 'medium'
  });

  const { submitEmployeeRequest, employeeRequests, loading } = useEmployeeServices();

  const requestTypes = [
    { id: 'salary_certificate', name: 'شهادة راتب', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'experience_letter', name: 'خطاب خبرة', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'bank_letter', name: 'خطاب للبنك', icon: <Building2 className="h-4 w-4" /> },
    { id: 'transfer_request', name: 'طلب نقل', icon: <User className="h-4 w-4" /> },
    { id: 'training_certificate', name: 'شهادة تدريب', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'resident_request', name: 'طلب مقيم', icon: <Satellite className="h-4 w-4" /> },
    { id: 'other', name: 'طلب آخر', icon: <FileText className="h-4 w-4" /> }
  ];

  const handleSubmit = async () => {
    try {
      await submitEmployeeRequest({
        employee_id: '1',
        status: 'submitted',
        documents: [],
        ...requestForm
      });
      setShowRequestDialog(false);
      setRequestForm({ request_type: '', title: '', description: '', priority: 'medium' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              بوابة طلبات الموظفين
            </CardTitle>
            <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  طلب جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إرسال طلب جديد</DialogTitle>
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

                  <div className="space-y-2">
                    <Label>عنوان الطلب</Label>
                    <Input 
                      value={requestForm.title}
                      onChange={(e) => setRequestForm({...requestForm, title: e.target.value})}
                      placeholder="أدخل عنوان الطلب"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>تفاصيل الطلب</Label>
                    <Textarea 
                      value={requestForm.description}
                      onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                      placeholder="اشرح تفاصيل طلبك..."
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowRequestDialog(false)}>إلغاء</Button>
                    <Button onClick={handleSubmit} disabled={!requestForm.request_type || !requestForm.title}>
                      إرسال الطلب
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {employeeRequests.length > 0 ? (
            <div className="space-y-4">
              {employeeRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{request.title}</h4>
                    <Badge variant={request.status === 'completed' ? 'default' : 'secondary'}>
                      {request.status === 'submitted' ? 'مرسل' : 
                       request.status === 'under_review' ? 'قيد المراجعة' :
                       request.status === 'completed' ? 'مكتمل' : request.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(request.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد طلبات</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}