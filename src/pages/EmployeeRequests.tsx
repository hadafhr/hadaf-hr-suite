import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  User,
  Mail,
  Phone,
  Building2,
  Eye,
  Check,
  X,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const employeeRequests = [
  {
    id: 1,
    employeeName: 'أحمد محمد السعيد',
    department: 'تقنية المعلومات',
    requestType: 'إجازة سنوية',
    description: 'طلب إجازة سنوية لمدة أسبوعين للسفر مع العائلة',
    startDate: '2024-08-15',
    endDate: '2024-08-29',
    submitDate: '2024-08-01',
    status: 'pending',
    priority: 'medium',
    email: 'ahmed.mohammed@company.com',
    phone: '+966501234567'
  },
  {
    id: 2,
    employeeName: 'فاطمة أحمد علي',
    department: 'المبيعات',
    requestType: 'إجازة مرضية',
    description: 'طلب إجازة مرضية لمدة 3 أيام بسبب حالة صحية طارئة',
    startDate: '2024-08-05',
    endDate: '2024-08-07',
    submitDate: '2024-08-04',
    status: 'approved',
    priority: 'high',
    email: 'fatima.ahmed@company.com',
    phone: '+966502345678'
  },
  {
    id: 3,
    employeeName: 'محمد علي حسن',
    department: 'التسويق',
    requestType: 'تغيير ساعات العمل',
    description: 'طلب تغيير ساعات العمل لتتناسب مع ظروف شخصية',
    startDate: '2024-08-10',
    endDate: '',
    submitDate: '2024-08-03',
    status: 'rejected',
    priority: 'low',
    email: 'mohammed.ali@company.com',
    phone: '+966503456789'
  },
  {
    id: 4,
    employeeName: 'سارة محمود طه',
    department: 'الموارد البشرية',
    requestType: 'إجازة أمومة',
    description: 'طلب إجازة أمومة لمدة 10 أسابيع',
    startDate: '2024-09-01',
    endDate: '2024-11-10',
    submitDate: '2024-08-02',
    status: 'pending',
    priority: 'high',
    email: 'sara.mahmoud@company.com',
    phone: '+966504567890'
  },
  {
    id: 5,
    employeeName: 'خالد سعد الدين',
    department: 'المالية',
    requestType: 'تدريب خارجي',
    description: 'طلب حضور دورة تدريبية في إدارة المخاطر المالية',
    startDate: '2024-08-20',
    endDate: '2024-08-22',
    submitDate: '2024-08-01',
    status: 'approved',
    priority: 'medium',
    email: 'khalid.saad@company.com',
    phone: '+966505678901'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">في انتظار الموافقة</Badge>;
    case 'approved':
      return <Badge variant="secondary" className="bg-green-100 text-green-800">موافق عليه</Badge>;
    case 'rejected':
      return <Badge variant="secondary" className="bg-red-100 text-red-800">مرفوض</Badge>;
    default:
      return <Badge variant="secondary">غير محدد</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">عالي</Badge>;
    case 'medium':
      return <Badge variant="secondary">متوسط</Badge>;
    case 'low':
      return <Badge variant="outline">منخفض</Badge>;
    default:
      return <Badge variant="secondary">غير محدد</Badge>;
  }
};

export const EmployeeRequests: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState(employeeRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleApprove = (requestId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
    toast({
      title: "تم الموافقة على الطلب",
      description: "تم الموافقة على الطلب بنجاح وإرسال إشعار للموظف",
    });
  };

  const handleReject = (requestId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
    toast({
      title: "تم رفض الطلب",
      description: "تم رفض الطلب وإرسال إشعار للموظف",
      variant: "destructive"
    });
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const approvedRequests = requests.filter(req => req.status === 'approved');
  const rejectedRequests = requests.filter(req => req.status === 'rejected');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">نظام طلبات الموظفين</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* الإحصائيات السريعة */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-primary">{requests.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">في الانتظار</p>
                  <p className="text-2xl font-bold text-warning">{pendingRequests.length}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">موافق عليها</p>
                  <p className="text-2xl font-bold text-success">{approvedRequests.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">مرفوضة</p>
                  <p className="text-2xl font-bold text-destructive">{rejectedRequests.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            </Card>
          </div>

          {/* تبويبات الطلبات */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">جميع الطلبات</TabsTrigger>
              <TabsTrigger value="pending">في الانتظار ({pendingRequests.length})</TabsTrigger>
              <TabsTrigger value="approved">موافق عليها ({approvedRequests.length})</TabsTrigger>
              <TabsTrigger value="rejected">مرفوضة ({rejectedRequests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <RequestsList 
                requests={requests} 
                onApprove={handleApprove} 
                onReject={handleReject}
                onView={setSelectedRequest}
              />
            </TabsContent>

            <TabsContent value="pending">
              <RequestsList 
                requests={pendingRequests} 
                onApprove={handleApprove} 
                onReject={handleReject}
                onView={setSelectedRequest}
              />
            </TabsContent>

            <TabsContent value="approved">
              <RequestsList 
                requests={approvedRequests} 
                onApprove={handleApprove} 
                onReject={handleReject}
                onView={setSelectedRequest}
              />
            </TabsContent>

            <TabsContent value="rejected">
              <RequestsList 
                requests={rejectedRequests} 
                onApprove={handleApprove} 
                onReject={handleReject}
                onView={setSelectedRequest}
              />
            </TabsContent>
          </Tabs>

          {/* نافذة تفاصيل الطلب */}
          {selectedRequest && (
            <RequestDetailsModal 
              request={selectedRequest} 
              onClose={() => setSelectedRequest(null)}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const RequestsList: React.FC<{
  requests: any[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onView: (request: any) => void;
}> = ({ requests, onApprove, onReject, onView }) => {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="dashboard-card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="font-semibold">{request.employeeName}</h3>
                {getStatusBadge(request.status)}
                {getPriorityBadge(request.priority)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {request.department}
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {request.requestType}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {request.submitDate}
                </div>
              </div>
              <p className="text-sm mt-2">{request.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onView(request)}>
                <Eye className="h-4 w-4 mr-2" />
                عرض
              </Button>
              {request.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-success hover:bg-success hover:text-white"
                    onClick={() => onApprove(request.id)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    موافقة
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => onReject(request.id)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    رفض
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

const RequestDetailsModal: React.FC<{
  request: any;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}> = ({ request, onClose, onApprove, onReject }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">تفاصيل الطلب</h2>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* معلومات الموظف */}
            <div>
              <h3 className="font-semibold mb-3">معلومات الموظف</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>{request.employeeName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>{request.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{request.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{request.phone}</span>
                </div>
              </div>
            </div>

            {/* تفاصيل الطلب */}
            <div>
              <h3 className="font-semibold mb-3">تفاصيل الطلب</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">نوع الطلب: </span>
                  <span>{request.requestType}</span>
                </div>
                <div>
                  <span className="font-medium">الوصف: </span>
                  <span>{request.description}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">تاريخ البداية: </span>
                    <span>{request.startDate}</span>
                  </div>
                  {request.endDate && (
                    <div>
                      <span className="font-medium">تاريخ النهاية: </span>
                      <span>{request.endDate}</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="font-medium">تاريخ التقديم: </span>
                  <span>{request.submitDate}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">الحالة: </span>
                  {getStatusBadge(request.status)}
                  <span className="font-medium">الأولوية: </span>
                  {getPriorityBadge(request.priority)}
                </div>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            {request.status === 'pending' && (
              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="text-destructive hover:bg-destructive hover:text-white"
                  onClick={() => {
                    onReject(request.id);
                    onClose();
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  رفض الطلب
                </Button>
                <Button 
                  className="bg-success hover:bg-success/90"
                  onClick={() => {
                    onApprove(request.id);
                    onClose();
                  }}
                >
                  <Check className="h-4 w-4 mr-2" />
                  الموافقة على الطلب
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmployeeRequests;