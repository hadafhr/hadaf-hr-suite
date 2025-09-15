import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowLeft,
  Eye,
  MessageSquare,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { useBudgetApprovals } from '@/hooks/useBudget';

const BudgetApprovalCenter: React.FC = () => {
  const { approvals, loading, updateApproval } = useBudgetApprovals();
  const [selectedApproval, setSelectedApproval] = useState<string | null>(null);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [comments, setComments] = useState('');
  const [pendingAction, setPendingAction] = useState<'approved' | 'rejected' | 'returned' | null>(null);

  const handleAction = async (id: string, decision: 'approved' | 'rejected' | 'returned') => {
    try {
      await updateApproval(id, decision, comments);
      setDetailsDialog(false);
      setComments('');
      setPendingAction(null);
      setSelectedApproval(null);
    } catch (error) {
      console.error('Error updating approval:', error);
    }
  };

  const getStatusBadge = (decision: string) => {
    switch (decision) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />معتمد</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />مرفوض</Badge>;
      case 'returned':
        return <Badge variant="outline" className="border-orange-300 text-orange-700"><ArrowLeft className="h-3 w-3 mr-1" />مُعاد</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />قيد الانتظار</Badge>;
    }
  };

  const getRequestTypeName = (type: string) => {
    switch (type) {
      case 'allocation':
        return 'مخصص ميزانية';
      case 'expense':
        return 'مصروف';
      case 'deletion':
        return 'حذف';
      case 'update':
        return 'تحديث';
      default:
        return type;
    }
  };

  const pendingApprovals = approvals.filter(a => a.decision === 'pending');
  const completedApprovals = approvals.filter(a => a.decision !== 'pending');

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">جاري تحميل الموافقات...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{pendingApprovals.length}</p>
                <p className="text-sm text-muted-foreground">قيد الانتظار</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{completedApprovals.filter(a => a.decision === 'approved').length}</p>
                <p className="text-sm text-muted-foreground">معتمد</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{completedApprovals.filter(a => a.decision === 'rejected').length}</p>
                <p className="text-sm text-muted-foreground">مرفوض</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{completedApprovals.filter(a => a.decision === 'returned').length}</p>
                <p className="text-sm text-muted-foreground">مُعاد للتعديل</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            قيد الانتظار ({pendingApprovals.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            المكتملة ({completedApprovals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                طلبات تحتاج موافقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                  <p className="text-lg font-medium">لا توجد طلبات تحتاج موافقة</p>
                  <p className="text-sm text-muted-foreground">جميع الطلبات تم معالجتها</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نوع الطلب</TableHead>
                      <TableHead>معرف الطلب</TableHead>
                      <TableHead>المرحلة</TableHead>
                      <TableHead>تاريخ الإنشاء</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((approval) => (
                      <TableRow key={approval.id}>
                        <TableCell className="font-medium">
                          {getRequestTypeName(approval.request_type)}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {approval.request_id.substring(0, 8)}...
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">المرحلة {approval.stage_index + 1}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(approval.created_at).toLocaleDateString('ar-SA')}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(approval.decision)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedApproval(approval.id);
                              setDetailsDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            مراجعة
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                سجل الموافقات المكتملة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نوع الطلب</TableHead>
                    <TableHead>معرف الطلب</TableHead>
                    <TableHead>القرار</TableHead>
                    <TableHead>تاريخ القرار</TableHead>
                    <TableHead>الملاحظات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell>{getRequestTypeName(approval.request_type)}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {approval.request_id.substring(0, 8)}...
                      </TableCell>
                      <TableCell>{getStatusBadge(approval.decision)}</TableCell>
                      <TableCell>
                        {approval.decided_at ? new Date(approval.decided_at).toLocaleDateString('ar-SA') : '-'}
                      </TableCell>
                      <TableCell>
                        {approval.comments ? (
                          <div className="max-w-xs truncate" title={approval.comments}>
                            {approval.comments}
                          </div>
                        ) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Approval Details Dialog */}
      <Dialog open={detailsDialog} onOpenChange={setDetailsDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>مراجعة طلب الموافقة</DialogTitle>
            <DialogDescription>
              راجع تفاصيل الطلب واتخذ القرار المناسب
            </DialogDescription>
          </DialogHeader>
          
          {selectedApproval && (
            <div className="space-y-6">
              {(() => {
                const approval = approvals.find(a => a.id === selectedApproval);
                if (!approval) return null;
                
                return (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">نوع الطلب</label>
                        <p className="text-lg">{getRequestTypeName(approval.request_type)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">معرف الطلب</label>
                        <p className="text-lg font-mono">{approval.request_id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">المرحلة الحالية</label>
                        <p className="text-lg">المرحلة {approval.stage_index + 1}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">تاريخ الإنشاء</label>
                        <p className="text-lg">{new Date(approval.created_at).toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">ملاحظات القرار</label>
                      <Textarea
                        placeholder="أدخل ملاحظاتك حول القرار..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDetailsDialog(false);
                setComments('');
                setPendingAction(null);
              }}
            >
              إلغاء
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (selectedApproval) {
                  handleAction(selectedApproval, 'returned');
                }
              }}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              إرجاع للتعديل
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedApproval) {
                  handleAction(selectedApproval, 'rejected');
                }
              }}
            >
              <XCircle className="h-4 w-4 ml-2" />
              رفض
            </Button>
            <Button
              onClick={() => {
                if (selectedApproval) {
                  handleAction(selectedApproval, 'approved');
                }
              }}
            >
              <CheckCircle className="h-4 w-4 ml-2" />
              اعتماد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BudgetApprovalCenter;