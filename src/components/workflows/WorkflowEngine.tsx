import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, User, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WorkflowStep {
  order: number;
  role: string;
  slaHours: number;
  fallbackRole?: string;
  actorId?: string;
  decision?: 'approved' | 'rejected';
  decidedAt?: Date;
  comments?: string;
}

interface WorkflowConfig {
  workflowKey: string;
  entity: string;
  steps: WorkflowStep[];
  onApprove?: Array<{ action: string; params: Record<string, any> }>;
  onReject?: Array<{ action: string; params: Record<string, any> }>;
  notifications?: {
    created?: string[];
    approved?: string[];
    rejected?: string[];
  };
}

interface WorkflowEngineProps {
  requestId: string;
  requestType: string;
  requestData: Record<string, any>;
  currentStep: number;
  workflow: WorkflowConfig;
  onStepComplete: (step: number, decision: 'approved' | 'rejected', comments?: string) => void;
  onWorkflowComplete: (finalStatus: 'approved' | 'rejected') => void;
  userRole: string;
  userId: string;
}

export const WorkflowEngine: React.FC<WorkflowEngineProps> = ({
  requestId,
  requestType,
  requestData,
  currentStep,
  workflow,
  onStepComplete,
  onWorkflowComplete,
  userRole,
  userId
}) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState('');
  const [processingStep, setProcessingStep] = useState<number | null>(null);

  const handleApproval = async (step: number, decision: 'approved' | 'rejected') => {
    setProcessingStep(step);
    
    try {
      // Execute step actions
      onStepComplete(step, decision, comments);
      
      // Check if this is the final step
      if (step === workflow.steps.length - 1) {
        // Execute final workflow actions
        if (decision === 'approved' && workflow.onApprove) {
          await executeWorkflowActions(workflow.onApprove);
        } else if (decision === 'rejected' && workflow.onReject) {
          await executeWorkflowActions(workflow.onReject);
        }
        
        onWorkflowComplete(decision);
      }
      
      // Send notifications
      await sendNotifications(decision, step);
      
      toast({
        title: t('msg.success'),
        description: `Request ${decision === 'approved' ? 'approved' : 'rejected'} successfully`
      });
      
    } catch (error) {
      toast({
        title: t('msg.error'),
        description: 'Failed to process workflow step',
        variant: 'destructive'
      });
    } finally {
      setProcessingStep(null);
      setComments('');
    }
  };

  const executeWorkflowActions = async (actions: Array<{ action: string; params: Record<string, any> }>) => {
    for (const actionConfig of actions) {
      switch (actionConfig.action) {
        case 'DEDUCT_LEAVE_BALANCE':
          // Implement leave balance deduction
          console.log('Deducting leave balance:', actionConfig.params);
          break;
        case 'MARK_ATTENDANCE_ABSENCE':
          // Implement attendance marking
          console.log('Marking attendance absence:', actionConfig.params);
          break;
        case 'CREATE_LOAN_SCHEDULE':
          // Implement loan schedule creation
          console.log('Creating loan schedule:', actionConfig.params);
          break;
        case 'UPDATE_JOB_INFO':
          // Implement job info update
          console.log('Updating job info:', actionConfig.params);
          break;
        case 'UPDATE_PAYROLL':
          // Implement payroll update
          console.log('Updating payroll:', actionConfig.params);
          break;
        case 'GENERATE_PDF_LETTER':
          // Implement PDF generation
          console.log('Generating PDF letter:', actionConfig.params);
          break;
        case 'UPDATE_PROFILE':
          // Implement profile update
          console.log('Updating profile:', actionConfig.params);
          break;
        case 'ASSIGN_TRAINING':
          // Implement training assignment
          console.log('Assigning training:', actionConfig.params);
          break;
        case 'MARK_ATTENDANCE_EARLYEXIT':
          // Implement early exit marking
          console.log('Marking early exit:', actionConfig.params);
          break;
        case 'INITIATE_END_OF_SERVICE':
          // Implement end of service process
          console.log('Initiating end of service:', actionConfig.params);
          break;
        case 'APPLY_SANCTION':
          // Implement sanction application
          console.log('Applying sanction:', actionConfig.params);
          break;
        case 'ARCHIVE_INCIDENT':
          // Implement incident archiving
          console.log('Archiving incident:', actionConfig.params);
          break;
        case 'EMIT_EVENT':
          // Implement event emission
          console.log('Emitting event:', actionConfig.params);
          break;
        default:
          console.warn('Unknown workflow action:', actionConfig.action);
      }
    }
  };

  const sendNotifications = async (decision: 'approved' | 'rejected', step: number) => {
    // Implementation for sending notifications
    console.log('Sending notifications for decision:', decision, 'at step:', step);
  };

  const canUserApproveStep = (step: WorkflowStep) => {
    return step.role === userRole || step.fallbackRole === userRole;
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'pending';
    return 'waiting';
  };

  const getStepIcon = (status: string, decision?: string) => {
    switch (status) {
      case 'completed':
        return decision === 'approved' ? (
          <CheckCircle className="h-5 w-5 text-success" />
        ) : (
          <XCircle className="h-5 w-5 text-destructive" />
        );
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return <User className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string, decision?: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant={decision === 'approved' ? 'default' : 'destructive'}>
            {decision === 'approved' ? t('status.approved') : t('status.rejected')}
          </Badge>
        );
      case 'pending':
        return <Badge variant="secondary">{t('status.pending')}</Badge>;
      default:
        return <Badge variant="outline">Waiting</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Workflow Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {workflow.steps.map((step, index) => {
          const status = getStepStatus(index);
          const isCurrentStep = index === currentStep;
          const canApprove = isCurrentStep && canUserApproveStep(step);

          return (
            <div
              key={index}
              className={`p-4 border rounded-lg ${
                isCurrentStep ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStepIcon(status, step.decision)}
                  <div>
                    <h4 className="font-medium">Step {index + 1}: {step.role}</h4>
                    <p className="text-sm text-muted-foreground">
                      SLA: {step.slaHours} hours
                      {step.fallbackRole && ` (Fallback: ${step.fallbackRole})`}
                    </p>
                  </div>
                </div>
                {getStatusBadge(status, step.decision)}
              </div>

              {step.comments && (
                <div className="mb-3 p-2 bg-muted rounded text-sm">
                  <strong>Comments:</strong> {step.comments}
                </div>
              )}

              {canApprove && (
                <div className="space-y-3">
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add comments (optional)"
                    className="w-full p-2 border rounded-lg resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApproval(index, 'approved')}
                      disabled={processingStep === index}
                      className="bg-success hover:bg-success/90"
                    >
                      {processingStep === index ? 'Processing...' : t('btn.approve')}
                    </Button>
                    <Button
                      onClick={() => handleApproval(index, 'rejected')}
                      disabled={processingStep === index}
                      variant="destructive"
                    >
                      {processingStep === index ? 'Processing...' : t('btn.reject')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};