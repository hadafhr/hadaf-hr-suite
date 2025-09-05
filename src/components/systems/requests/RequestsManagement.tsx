import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Filter, FileText, Upload, Edit, Trash2, Eye } from 'lucide-react';

export const RequestsManagement: React.FC = () => {
  const [selectedRequestType, setSelectedRequestType] = useState('');
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);

  const requestTypes = [
    { id: 'leave', name: 'إجازة سنوية', description: 'طلب إجازة سنوية' },
    { id: 'allowance', name: 'بدل إقامة', description: 'طلب بدل سكن أو إقامة' },
    { id: 'loan', name: 'سلفة راتب', description: 'طلب سلفة من الراتب' },
    { id: 'certificate', name: 'شهادة راتب', description: 'طلب شهادة راتب للبنك' },
    { id: 'document', name: 'وثيقة رسمية', description: 'طلب وثيقة أو مستند رسمي' }
  ];

  const activeRequests = [
    { id: 'REQ-001', type: 'إجازة سنوية', employee: 'أحمد محمد', status: 'pending', date: '2024-01-15', stage: 'مدير مباشر' },
    { id: 'REQ-002', type: 'بدل إقامة', employee: 'سارة أحمد', status: 'approved', date: '2024-01-14', stage: 'مكتمل' },
    { id: 'REQ-003', type: 'سلفة راتب', employee: 'محمد علي', status: 'pending', date: '2024-01-13', stage: 'الموارد البشرية' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
          <p className="text-muted-foreground">إنشاء ومتابعة وإدارة جميع أنواع الطلبات</p>
        </div>
        <Button onClick={() => setShowNewRequestForm(true)}>
          <Plus className="w-4 h-4 ml-2" />
          طلب جديد
        </Button>
      </div>

      {showNewRequestForm && (
        <Card>
          <CardHeader>
            <CardTitle>إنشاء طلب جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select value={selectedRequestType} onValueChange={setSelectedRequestType}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الطلب" />
                </SelectTrigger>
                <SelectContent>
                  {requestTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="عنوان الطلب" />
            </div>
            <Textarea placeholder="تفاصيل الطلب" rows={4} />
            <div className="flex gap-2">
              <Button>
                <Upload className="w-4 h-4 ml-2" />
                رفع مرفقات
              </Button>
              <Button variant="outline">حفظ كمسودة</Button>
              <Button>إرسال الطلب</Button>
              <Button variant="ghost" onClick={() => setShowNewRequestForm(false)}>إلغاء</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {requestTypes.map(type => (
          <Card key={type.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">{type.name}</h3>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>الطلبات النشطة</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 ml-2" />
                بحث
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 ml-2" />
                فلترة
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{request.id}</p>
                    <p className="text-sm text-muted-foreground">{request.type} - {request.employee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>{request.stage}</Badge>
                  <span className="text-sm">{request.date}</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};