import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  Plus, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Request {
  id: string;
  type: 'salary_certificate' | 'financial_advance' | 'complaint' | 'general';
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  amount?: number;
}

export const RequestsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const requestTypes = [
    { value: 'salary_certificate', label: 'شهادة راتب', icon: FileText },
    { value: 'financial_advance', label: 'سلفة مالية', icon: CreditCard },
    { value: 'complaint', label: 'شكوى', icon: MessageSquare },
    { value: 'general', label: 'طلب عام', icon: FileText }
  ];

  // Mock requests data
  const requests: Request[] = [
    {
      id: '1',
      type: 'salary_certificate',
      title: 'شهادة راتب للبنك',
      description: 'شهادة راتب مطلوبة لإجراءات قرض من البنك',
      status: 'approved',
      submittedDate: '2024-01-10'
    },
    {
      id: '2',
      type: 'financial_advance',
      title: 'سلفة مالية',
      description: 'سلفة مالية للظروف الطارئة',
      status: 'pending',
      submittedDate: '2024-01-12',
      amount: 5000
    },
    {
      id: '3',
      type: 'complaint',
      title: 'شكوى بخصوص بيئة العمل',
      description: 'مشكلة في التكييف بالمكتب',
      status: 'pending',
      submittedDate: '2024-01-14'
    }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getRequestTypeLabel = (type: string) => {
    const requestType = requestTypes.find(rt => rt.value === type);
    return requestType ? requestType.label : type;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 ml-1" />
            قيد المراجعة
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 ml-1" />
            موافق عليه
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 ml-1" />
            مرفوض
          </Badge>
        );
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('تم تقديم الطلب بنجاح!');
    setShowNewRequestForm(false);
    setSelectedRequestType('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon" onClick={() => navigate('/employee-dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-right">
                <h1 className="text-xl font-semibold">إدارة الطلبات</h1>
                <p className="text-sm text-muted-foreground">تقديم ومتابعة جميع أنواع الطلبات</p>
              </div>
            </div>
            <Button onClick={() => setShowNewRequestForm(true)}>
              <Plus className="w-4 h-4 ml-2" />
              طلب جديد
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Request Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{requests.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الطلبات</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {requests.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">طلبات معلقة</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {requests.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">طلبات موافق عليها</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {requests.filter(r => r.status === 'rejected').length}
              </div>
              <div className="text-sm text-muted-foreground">طلبات مرفوضة</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="البحث في الطلبات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 text-right"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="pending">قيد المراجعة</SelectItem>
                  <SelectItem value="approved">موافق عليه</SelectItem>
                  <SelectItem value="rejected">مرفوض</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* New Request Form */}
        {showNewRequestForm && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-right">تقديم طلب جديد</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-right">نوع الطلب</Label>
                  <Select value={selectedRequestType} onValueChange={setSelectedRequestType}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الطلب" />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRequestType && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-right">عنوان الطلب</Label>
                      <Input placeholder="أدخل عنوان الطلب..." className="text-right" required />
                    </div>

                    {selectedRequestType === 'financial_advance' && (
                      <div className="space-y-2">
                        <Label className="text-right">المبلغ المطلوب (ريال)</Label>
                        <Input type="number" placeholder="0" className="text-right" required />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label className="text-right">تفاصيل الطلب</Label>
                      <Textarea
                        placeholder="أدخل تفاصيل الطلب..."
                        className="text-right"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-right">المرفقات (اختياري)</Label>
                      <Input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" />
                    </div>

                    <div className="flex space-x-2 space-x-reverse">
                      <Button type="button" variant="outline" onClick={() => setShowNewRequestForm(false)}>
                        إلغاء
                      </Button>
                      <Button type="submit">
                        تقديم الطلب
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        )}

        {/* Requests List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-right">سجل الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد طلبات تطابق معايير البحث</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {getStatusBadge(request.status)}
                        <Badge variant="outline">
                          {getRequestTypeLabel(request.type)}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <h4 className="font-medium">{request.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          تم التقديم في {request.submittedDate}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-right mb-3">
                      {request.description}
                    </p>
                    {request.amount && (
                      <p className="text-sm font-medium text-right mb-3">
                        المبلغ: {request.amount.toLocaleString()} ريال
                      </p>
                    )}
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 ml-1" />
                        عرض
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 ml-1" />
                        تعليق
                      </Button>
                      {request.status === 'approved' && (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 ml-1" />
                          تحميل
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};