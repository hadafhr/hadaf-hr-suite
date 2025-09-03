import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Plus,
  FileText,
  Upload,
  Eye,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  User,
  DollarSign,
  MessageSquare,
  Circle
} from 'lucide-react';

export const EmployeeSocialRequests = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');

  const requestStatuses = [
    { id: 'all', name: 'الكل', count: 247 },
    { id: 'pending', name: 'قيد المراجعة', count: 45, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'approved', name: 'موافق عليه', count: 156, color: 'bg-green-100 text-green-800' },
    { id: 'rejected', name: 'مرفوض', count: 23, color: 'bg-red-100 text-red-800' },
    { id: 'processing', name: 'قيد التنفيذ', count: 23, color: 'bg-blue-100 text-blue-800' }
  ];

  const socialRequests = [
    {
      id: 'REQ-2024-001',
      employee: {
        name: 'أحمد محمد علي',
        id: 'EMP-001',
        department: 'تقنية المعلومات',
        photo: '/api/placeholder/40/40'
      },
      type: 'مساعدة طبية',
      description: 'طلب مساعدة مالية لإجراء عملية جراحية عاجلة',
      amount: 25000,
      requestDate: '2024-01-15',
      status: 'pending',
      priority: 'urgent',
      attachments: ['تقرير_طبي.pdf', 'فاتورة_المستشفى.pdf'],
      workflow: [
        { step: 'تقديم الطلب', status: 'completed', date: '2024-01-15', user: 'أحمد محمد' },
        { step: 'مراجعة المدير المباشر', status: 'completed', date: '2024-01-16', user: 'سارة أحمد' },
        { step: 'مراجعة الموارد البشرية', status: 'current', date: '', user: 'فاطمة علي' },
        { step: 'موافقة أخصائي الخدمات الاجتماعية', status: 'pending', date: '', user: 'محمد سالم' }
      ],
      comments: [
        { user: 'سارة أحمد', date: '2024-01-16', comment: 'الطلب مدعوم بالمستندات المطلوبة وموصى بالموافقة' }
      ]
    },
    {
      id: 'REQ-2024-002',
      employee: {
        name: 'فاطمة عبدالله',
        id: 'EMP-002',
        department: 'المحاسبة',
        photo: '/api/placeholder/40/40'
      },
      type: 'دعم تعليمي',
      description: 'طلب دعم الرسوم الجامعية لابنة الموظفة المتفوقة',
      amount: 18000,
      requestDate: '2024-01-14',
      status: 'approved',
      priority: 'normal',
      attachments: ['كشف_الدرجات.pdf', 'فاتورة_الجامعة.pdf'],
      workflow: [
        { step: 'تقديم الطلب', status: 'completed', date: '2024-01-14', user: 'فاطمة عبدالله' },
        { step: 'مراجعة المدير المباشر', status: 'completed', date: '2024-01-15', user: 'خالد محمد' },
        { step: 'مراجعة الموارد البشرية', status: 'completed', date: '2024-01-16', user: 'فاطمة علي' },
        { step: 'موافقة أخصائي الخدمات الاجتماعية', status: 'completed', date: '2024-01-17', user: 'محمد سالم' }
      ],
      comments: [
        { user: 'خالد محمد', date: '2024-01-15', comment: 'الطالبة متفوقة وتستحق الدعم' },
        { user: 'محمد سالم', date: '2024-01-17', comment: 'تم الموافقة على الطلب وسيتم الصرف خلال 5 أيام عمل' }
      ]
    },
    {
      id: 'REQ-2024-003',
      employee: {
        name: 'محمد سالم أحمد',
        id: 'EMP-003',
        department: 'المبيعات',
        photo: '/api/placeholder/40/40'
      },
      type: 'إعانة زواج',
      description: 'طلب إعانة زواج للموظف الجديد',
      amount: 15000,
      requestDate: '2024-01-13',
      status: 'processing',
      priority: 'normal',
      attachments: ['عقد_الزواج.pdf', 'بطاقة_الهوية.pdf'],
      workflow: [
        { step: 'تقديم الطلب', status: 'completed', date: '2024-01-13', user: 'محمد سالم' },
        { step: 'مراجعة المدير المباشر', status: 'completed', date: '2024-01-14', user: 'نورا عبدالله' },
        { step: 'مراجعة الموارد البشرية', status: 'completed', date: '2024-01-15', user: 'فاطمة علي' },
        { step: 'موافقة أخصائي الخدمات الاجتماعية', status: 'completed', date: '2024-01-16', user: 'محمد سالم' }
      ],
      comments: []
    }
  ];

  const filteredRequests = activeTab === 'all' 
    ? socialRequests 
    : socialRequests.filter(request => request.status === activeTab);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد المراجعة', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'موافق عليه', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'مرفوض', className: 'bg-red-100 text-red-800' },
      processing: { label: 'قيد التنفيذ', className: 'bg-blue-100 text-blue-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, className: 'bg-gray-100 text-gray-800' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">عاجل</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">مهم</Badge>;
      default:
        return <Badge variant="outline">عادي</Badge>;
    }
  };

  const getWorkflowProgress = (workflow: any[]) => {
    const completedSteps = workflow.filter(step => step.status === 'completed').length;
    return (completedSteps / workflow.length) * 100;
  };

  const NewRequestForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="requestType">نوع الطلب</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع الطلب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medical">مساعدة طبية</SelectItem>
              <SelectItem value="education">دعم تعليمي</SelectItem>
              <SelectItem value="marriage">إعانة زواج</SelectItem>
              <SelectItem value="emergency">مساعدة طوارئ</SelectItem>
              <SelectItem value="bereavement">تعزية ومواساة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="amount">المبلغ المطلوب (₪)</Label>
          <Input 
            id="amount" 
            type="number"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">وصف الطلب</Label>
        <Textarea 
          id="description" 
          placeholder="اشرح سبب الطلب والظروف المحيطة به"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="justification">المبررات</Label>
        <Textarea 
          id="justification" 
          placeholder="اذكر المبررات والأسباب التي تستدعي هذا الطلب"
          rows={3}
        />
      </div>

      <div>
        <Label>المستندات المطلوبة</Label>
        <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            اسحب الملفات هنا أو انقر للاختيار
          </p>
          <Button variant="outline" size="sm">
            اختيار الملفات
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
        <Button variant="outline" onClick={() => setShowNewRequest(false)}>
          إلغاء
        </Button>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowNewRequest(false)}>
          تقديم الطلب
        </Button>
      </div>
    </div>
  );

  const RequestDetails = ({ request }: { request: any }) => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{request.employee.name}</h3>
            <p className="text-sm text-muted-foreground">{request.employee.department} • {request.employee.id}</p>
          </div>
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            {getStatusBadge(request.status)}
            {getPriorityBadge(request.priority)}
          </div>
          <p className="text-sm text-muted-foreground">رقم الطلب: {request.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="font-semibold">{request.type}</div>
            <div className="text-sm text-muted-foreground">نوع الطلب</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="font-semibold">₪{request.amount.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">المبلغ المطلوب</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold">{request.requestDate}</div>
            <div className="text-sm text-muted-foreground">تاريخ التقديم</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">تفاصيل الطلب</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{request.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Clock className="h-5 w-5 mr-2" />
            مراحل الموافقة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Progress value={getWorkflowProgress(request.workflow)} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {request.workflow.filter(step => step.status === 'completed').length} من {request.workflow.length} مراحل مكتملة
            </p>
          </div>
          
          <div className="space-y-4">
            {request.workflow.map((step, index) => (
              <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-100 text-green-600' :
                  step.status === 'current' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {step.status === 'completed' ? <CheckCircle className="h-4 w-4" /> :
                   step.status === 'current' ? <Clock className="h-4 w-4" /> :
                   <Circle className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{step.step}</h4>
                    {step.date && <span className="text-sm text-muted-foreground">{step.date}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.user}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {request.attachments && request.attachments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">المرفقات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {request.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm">{file}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {request.comments && request.comments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MessageSquare className="h-5 w-5 mr-2" />
              التعليقات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {request.comments.map((comment, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{comment.user}</span>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">طلبات الدعم الاجتماعي</h2>
          <p className="text-muted-foreground mt-1">
            إدارة ومتابعة طلبات الموظفين للدعم الاجتماعي
          </p>
        </div>
        <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              طلب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>تقديم طلب دعم اجتماعي</DialogTitle>
            </DialogHeader>
            <NewRequestForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-1 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="البحث في الطلبات..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          تصفية متقدمة
        </Button>
      </div>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {requestStatuses.map((status) => (
            <TabsTrigger
              key={status.id}
              value={status.id}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <span>{status.name}</span>
              <Badge variant="secondary" className="text-xs">
                {status.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <h3 className="font-semibold">{request.employee.name}</h3>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{request.id}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.employee.department}</p>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                      <Badge variant="outline">{request.type}</Badge>
                      {getStatusBadge(request.status)}
                      {getPriorityBadge(request.priority)}
                    </div>
                  </div>
                </div>

                <div className="text-left space-y-1">
                  <div className="text-lg font-semibold text-foreground">₪{request.amount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{request.requestDate}</div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          عرض التفاصيل
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>تفاصيل الطلب - {request.id}</DialogTitle>
                        </DialogHeader>
                        <RequestDetails request={request} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>التقدم: {request.workflow.filter(step => step.status === 'completed').length}/{request.workflow.length}</span>
                  </div>
                  <Progress value={getWorkflowProgress(request.workflow)} className="w-32 h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};