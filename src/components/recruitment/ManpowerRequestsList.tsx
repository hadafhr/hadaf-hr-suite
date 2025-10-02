import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle, XCircle, Eye, Users, Calendar, DollarSign, FileText } from 'lucide-react';
import { ManpowerRequestTimeline } from './ManpowerRequestTimeline';
import { ManpowerRequestApproval } from './ManpowerRequestApproval';

interface ManpowerRequest {
  id: string;
  job_title: string;
  number_of_positions: number;
  reason: string;
  required_skills: string;
  required_experience: string;
  contract_type: string;
  proposed_salary: number;
  required_start_date: string;
  status: string;
  created_at: string;
  manager_approved_at?: string;
  finance_approved_at?: string;
  hr_approved_at?: string;
  finance_required: boolean;
}

export const ManpowerRequestsList: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ManpowerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ManpowerRequest | null>(null);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('manpower_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error: any) {
      toast({
        title: 'خطأ في تحميل الطلبات',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();

    // Subscribe to changes
    const channel = supabase
      .channel('manpower_requests_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'manpower_requests' }, () => {
        fetchRequests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      draft: { label: 'مسودة', variant: 'secondary' },
      pending_manager: { label: 'بانتظار المدير', variant: 'default' },
      pending_finance: { label: 'بانتظار المالية', variant: 'default' },
      pending_hr: { label: 'بانتظار الموارد البشرية', variant: 'default' },
      approved: { label: 'مكتمل', variant: 'default' },
      rejected: { label: 'مرفوض', variant: 'destructive' },
      converted_to_job: { label: 'تم التحويل لوظيفة شاغرة', variant: 'default' },
    };

    const config = statusConfig[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getReasonLabel = (reason: string) => {
    const reasons: Record<string, string> = {
      workload_increase: 'زيادة حجم العمل',
      new_project: 'مشروع جديد',
      replacement: 'بديل موظف',
      other: 'أخرى',
    };
    return reasons[reason] || reason;
  };

  const getContractTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      permanent: 'دائم',
      temporary: 'مؤقت',
      fixed_term: 'عقد محدد',
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const pendingRequests = requests.filter((r) =>
    ['pending_manager', 'pending_finance', 'pending_hr'].includes(r.status)
  );
  const completedRequests = requests.filter((r) =>
    ['approved', 'converted_to_job'].includes(r.status)
  );
  const rejectedRequests = requests.filter((r) => r.status === 'rejected');

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
          <TabsTrigger value="all" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
            <FileText className="h-4 w-4" />
            <span className="text-xs">الكل ({requests.length})</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
            <Clock className="h-4 w-4" />
            <span className="text-xs">قيد المراجعة ({pendingRequests.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs">مكتملة ({completedRequests.length})</span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
            <XCircle className="h-4 w-4" />
            <span className="text-xs">مرفوضة ({rejectedRequests.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} onViewDetails={setSelectedRequest} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingRequests.map((request) => (
            <RequestCard key={request.id} request={request} onViewDetails={setSelectedRequest} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedRequests.map((request) => (
            <RequestCard key={request.id} request={request} onViewDetails={setSelectedRequest} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 mt-6">
          {rejectedRequests.map((request) => (
            <RequestCard key={request.id} request={request} onViewDetails={setSelectedRequest} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Request Details Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل طلب الاحتياج الوظيفي</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">المسمى الوظيفي</p>
                  <p className="font-medium">{selectedRequest.job_title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الحالة</p>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">عدد الموظفين</p>
                  <p className="font-medium">{selectedRequest.number_of_positions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">نوع العقد</p>
                  <p className="font-medium">{getContractTypeLabel(selectedRequest.contract_type)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">السبب</p>
                  <p className="font-medium">{getReasonLabel(selectedRequest.reason)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الراتب المقترح</p>
                  <p className="font-medium">{selectedRequest.proposed_salary?.toLocaleString()} ريال</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">المهارات المطلوبة</p>
                <p className="text-sm">{selectedRequest.required_skills}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">الخبرات المطلوبة</p>
                <p className="text-sm">{selectedRequest.required_experience}</p>
              </div>

              <ManpowerRequestTimeline requestId={selectedRequest.id} />

              {['pending_manager', 'pending_finance', 'pending_hr'].includes(selectedRequest.status) && (
                <ManpowerRequestApproval request={selectedRequest} onUpdate={fetchRequests} />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const RequestCard: React.FC<{
  request: ManpowerRequest;
  onViewDetails: (request: ManpowerRequest) => void;
}> = ({ request, onViewDetails }) => {
  const getReasonLabel = (reason: string) => {
    const reasons: Record<string, string> = {
      workload_increase: 'زيادة حجم العمل',
      new_project: 'مشروع جديد',
      replacement: 'بديل موظف',
      other: 'أخرى',
    };
    return reasons[reason] || reason;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      draft: { label: 'مسودة', variant: 'secondary' },
      pending_manager: { label: 'بانتظار المدير', variant: 'default' },
      pending_finance: { label: 'بانتظار المالية', variant: 'default' },
      pending_hr: { label: 'بانتظار الموارد البشرية', variant: 'default' },
      approved: { label: 'مكتمل', variant: 'default' },
      rejected: { label: 'مرفوض', variant: 'destructive' },
      converted_to_job: { label: 'تم التحويل لوظيفة شاغرة', variant: 'default' },
    };

    const config = statusConfig[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Card className="bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300 rounded-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{request.job_title}</h3>
            <p className="text-sm text-muted-foreground">{getReasonLabel(request.reason)}</p>
          </div>
          {getStatusBadge(request.status)}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{request.number_of_positions} موظف</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{request.proposed_salary?.toLocaleString()} ريال</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{new Date(request.required_start_date).toLocaleDateString('ar-SA')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{new Date(request.created_at).toLocaleDateString('ar-SA')}</span>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={() => onViewDetails(request)} className="w-full">
          <Eye className="h-4 w-4 mr-2" />
          عرض التفاصيل
        </Button>
      </CardContent>
    </Card>
  );
};
