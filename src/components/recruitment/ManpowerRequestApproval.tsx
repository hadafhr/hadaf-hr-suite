import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface ManpowerRequest {
  id: string;
  status: string;
  finance_required: boolean;
}

interface ManpowerRequestApprovalProps {
  request: ManpowerRequest;
  onUpdate: () => void;
}

export const ManpowerRequestApproval: React.FC<ManpowerRequestApprovalProps> = ({ request, onUpdate }) => {
  const { toast } = useToast();
  const [comments, setComments] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApproval = async (approved: boolean) => {
    setIsProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let nextStatus = '';
      let updateFields: any = {};
      let timelineAction = '';
      let timelineStage = '';

      switch (request.status) {
        case 'pending_manager':
          if (approved) {
            nextStatus = request.finance_required ? 'pending_finance' : 'pending_hr';
            updateFields = {
              manager_approved_by: user.id,
              manager_approved_at: new Date().toISOString(),
              manager_comments: comments,
              current_approver_role: request.finance_required ? 'finance' : 'hr',
            };
            timelineAction = 'تمت الموافقة من قبل المدير المباشر';
            timelineStage = 'manager_approved';
          } else {
            nextStatus = 'rejected';
            updateFields = {
              manager_comments: comments,
              rejection_reason: comments,
            };
            timelineAction = 'تم رفض الطلب من قبل المدير المباشر';
            timelineStage = 'manager_rejected';
          }
          break;

        case 'pending_finance':
          if (approved) {
            nextStatus = 'pending_hr';
            updateFields = {
              finance_approved_by: user.id,
              finance_approved_at: new Date().toISOString(),
              finance_comments: comments,
              current_approver_role: 'hr',
            };
            timelineAction = 'تمت الموافقة من قبل الإدارة المالية';
            timelineStage = 'finance_approved';
          } else {
            nextStatus = 'rejected';
            updateFields = {
              finance_comments: comments,
              rejection_reason: comments,
            };
            timelineAction = 'تم رفض الطلب من قبل الإدارة المالية';
            timelineStage = 'finance_rejected';
          }
          break;

        case 'pending_hr':
          if (approved) {
            nextStatus = 'approved';
            updateFields = {
              hr_approved_by: user.id,
              hr_approved_at: new Date().toISOString(),
              hr_comments: comments,
              current_approver_role: null,
            };
            timelineAction = 'تمت الموافقة النهائية من قبل الموارد البشرية';
            timelineStage = 'hr_approved';
          } else {
            nextStatus = 'rejected';
            updateFields = {
              hr_comments: comments,
              rejection_reason: comments,
            };
            timelineAction = 'تم رفض الطلب من قبل الموارد البشرية';
            timelineStage = 'hr_rejected';
          }
          break;
      }

      // Update request status
      const { error: updateError } = await supabase
        .from('manpower_requests')
        .update({
          ...updateFields,
          status: nextStatus,
        })
        .eq('id', request.id);

      if (updateError) throw updateError;

      // Add timeline entry
      const { error: timelineError } = await supabase
        .from('manpower_request_timeline')
        .insert({
          request_id: request.id,
          stage: timelineStage,
          action: timelineAction,
          comments: comments || null,
          actor_id: user.id,
        });

      if (timelineError) throw timelineError;

      toast({
        title: approved ? 'تمت الموافقة' : 'تم الرفض',
        description: approved
          ? 'تم تحديث حالة الطلب وإرسال إشعار للمرحلة التالية'
          : 'تم رفض الطلب وإرسال إشعار لمقدم الطلب',
      });

      setComments('');
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'خطأ في معالجة الطلب',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-accent/10 border-accent">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          إجراء الموافقة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">الملاحظات (اختياري)</label>
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="أضف أي ملاحظات أو تعليقات..."
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => handleApproval(true)}
            disabled={isProcessing}
            className="flex-1"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {isProcessing ? 'جاري المعالجة...' : 'موافقة'}
          </Button>
          <Button
            onClick={() => handleApproval(false)}
            disabled={isProcessing}
            variant="destructive"
            className="flex-1"
          >
            <XCircle className="h-4 w-4 mr-2" />
            رفض
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
