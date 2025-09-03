import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, Play, Pause, Settings, Plus, ArrowRight, Clock, 
  CheckCircle, AlertTriangle, BarChart3, FileText, Users, Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AutomationWorkflows = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('workflows');

  const workflows = [
    {
      id: 1,
      name: isRTL ? 'اعتماد طلبات الإجازة' : 'Leave Request Approval',
      description: isRTL ? 'إرسال طلبات الإجازة تلقائياً للمدير المباشر' : 'Automatically route leave requests to direct manager',
      category: 'approvals',
      status: 'active',
      trigger: 'Leave request submitted',
      actions: [
        'Send to direct manager',
        'Notify HR if > 5 days',
        'Auto-approve if < 1 day and sufficient balance'
      ],
      frequency: 'Real-time',
      lastRun: '2024-06-15 14:30',
      success: 95,
      enabled: true
    },
    {
      id: 2,
      name: isRTL ? 'تذكير تقييم الأداء' : 'Performance Review Reminders',
      description: isRTL ? 'إرسال تذكيرات للمديرين بتقييمات الأداء المستحقة' : 'Send reminders to managers for due performance reviews',
      category: 'reminders',
      status: 'active',
      trigger: 'Review due date approaching',
      actions: [
        'Email manager 7 days before',
        'Email manager 3 days before',
        'Escalate to HR if overdue'
      ],
      frequency: 'Daily',
      lastRun: '2024-06-15 09:00',
      success: 88,
      enabled: true
    },
    {
      id: 3,
      name: isRTL ? 'تقارير الحضور الأسبوعية' : 'Weekly Attendance Reports',
      description: isRTL ? 'إنشاء وإرسال تقارير الحضور الأسبوعية تلقائياً' : 'Generate and send weekly attendance reports automatically',
      category: 'reports',
      status: 'active',
      trigger: 'Every Sunday at 8:00 AM',
      actions: [
        'Generate attendance report',
        'Calculate overtime hours',
        'Send to department managers',
        'Copy HR team'
      ],
      frequency: 'Weekly',
      lastRun: '2024-06-14 08:00',
      success: 100,
      enabled: true
    },
    {
      id: 4,
      name: isRTL ? 'تأهيل الموظفين الجدد' : 'New Employee Onboarding',
      description: isRTL ? 'تسلسل آلي لتأهيل الموظفين الجدد' : 'Automated sequence for new employee onboarding',
      category: 'onboarding',
      status: 'paused',
      trigger: 'New employee added',
      actions: [
        'Send welcome email',
        'Create IT accounts',
        'Schedule orientation',
        'Assign buddy/mentor',
        'Send first week checklist'
      ],
      frequency: 'Event-driven',
      lastRun: '2024-06-10 11:00',
      success: 92,
      enabled: false
    }
  ];

  const automationStats = [
    { label: isRTL ? 'سير العمل النشط' : 'Active Workflows', value: 12, icon: Zap, color: 'text-primary' },
    { label: isRTL ? 'المهام المتممة' : 'Tasks Completed', value: 1247, icon: CheckCircle, color: 'text-success' },
    { label: isRTL ? 'الوقت المُوفر' : 'Time Saved', value: '156h', icon: Clock, color: 'text-chart-2' },
    { label: isRTL ? 'معدل النجاح' : 'Success Rate', value: '94%', icon: BarChart3, color: 'text-chart-3' }
  ];

  const recentTasks = [
    {
      id: 1,
      workflow: isRTL ? 'اعتماد الإجازة' : 'Leave Approval',
      task: isRTL ? 'إرسال طلب إجازة سارة أحمد للمدير' : 'Send Sara Ahmed leave request to manager',
      status: 'completed',
      timestamp: '2024-06-15 14:25',
      duration: '2s'
    },
    {
      id: 2,
      workflow: isRTL ? 'تذكير التقييم' : 'Review Reminder',
      task: isRTL ? 'إرسال تذكير تقييم لمدير المبيعات' : 'Send review reminder to Sales Manager',
      status: 'completed',
      timestamp: '2024-06-15 09:00',
      duration: '1s'
    },
    {
      id: 3,
      workflow: isRTL ? 'تقرير الحضور' : 'Attendance Report',
      task: isRTL ? 'إنشاء تقرير حضور أسبوعي' : 'Generate weekly attendance report',
      status: 'in-progress',
      timestamp: '2024-06-15 08:00',
      duration: '45s'
    },
    {
      id: 4,
      workflow: isRTL ? 'تأهيل موظف' : 'Employee Onboarding',
      task: isRTL ? 'إرسال بريد ترحيب لأحمد محمد' : 'Send welcome email to Ahmed Mohamed',
      status: 'failed',
      timestamp: '2024-06-14 16:30',
      duration: '5s'
    }
  ];

  const toggleWorkflow = (id) => {
    const workflow = workflows.find(w => w.id === id);
    toast({
      title: workflow.enabled 
        ? (isRTL ? 'تم إيقاف سير العمل' : 'Workflow Disabled')
        : (isRTL ? 'تم تفعيل سير العمل' : 'Workflow Enabled'),
      description: `${workflow.name} ${workflow.enabled ? 'disabled' : 'enabled'}`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {automationStats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-${stat.color.replace('text-', '')}/10 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              {isRTL ? 'الأتمتة وسير العمل' : 'Automation & Workflows'}
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'سير عمل جديد' : 'New Workflow'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="workflows">{isRTL ? 'سير العمل' : 'Workflows'}</TabsTrigger>
              <TabsTrigger value="activity">{isRTL ? 'النشاط الأخير' : 'Recent Activity'}</TabsTrigger>
            </TabsList>

            <TabsContent value="workflows" className="mt-6">
              <div className="space-y-6">
                {workflows.map((workflow) => (
                  <Card key={workflow.id} className="relative">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{workflow.name}</h3>
                            <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                              {workflow.status === 'active' 
                                ? (isRTL ? 'نشط' : 'Active')
                                : (isRTL ? 'متوقف' : 'Paused')
                              }
                            </Badge>
                            <Badge variant="outline">
                              {workflow.success}% {isRTL ? 'نجاح' : 'success'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {workflow.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium text-sm mb-2">
                                {isRTL ? 'المحفز:' : 'Trigger:'}
                              </h4>
                              <p className="text-sm text-muted-foreground">{workflow.trigger}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-2">
                                {isRTL ? 'التكرار:' : 'Frequency:'}
                              </h4>
                              <p className="text-sm text-muted-foreground">{workflow.frequency}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-sm mb-2">
                              {isRTL ? 'الإجراءات:' : 'Actions:'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {workflow.actions.map((action, idx) => (
                                <div key={idx} className="flex items-center gap-1 text-xs">
                                  {idx > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                                  <Badge variant="outline" className="text-xs">
                                    {action}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                              {isRTL ? 'آخر تشغيل:' : 'Last run:'} {workflow.lastRun}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Switch
                            checked={workflow.enabled}
                            onCheckedChange={() => toggleWorkflow(workflow.id)}
                          />
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant={workflow.status === 'active' ? 'outline' : 'default'}
                          >
                            {workflow.status === 'active' ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                {isRTL ? 'إيقاف' : 'Pause'}
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                {isRTL ? 'تشغيل' : 'Start'}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${
                            task.status === 'completed' ? 'bg-success/10 text-success' :
                            task.status === 'in-progress' ? 'bg-warning/10 text-warning' :
                            'bg-destructive/10 text-destructive'
                          }`}>
                            {task.status === 'completed' ? <CheckCircle className="h-4 w-4" /> :
                             task.status === 'in-progress' ? <Clock className="h-4 w-4" /> :
                             <AlertTriangle className="h-4 w-4" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{task.task}</h4>
                            <p className="text-sm text-muted-foreground">
                              {task.workflow} • {task.timestamp} • {task.duration}
                            </p>
                          </div>
                        </div>
                        <Badge variant={
                          task.status === 'completed' ? 'default' :
                          task.status === 'in-progress' ? 'secondary' :
                          'destructive'
                        }>
                          {task.status === 'completed' ? (isRTL ? 'مكتمل' : 'Completed') :
                           task.status === 'in-progress' ? (isRTL ? 'قيد التنفيذ' : 'In Progress') :
                           (isRTL ? 'فشل' : 'Failed')}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'قوالب سير العمل' : 'Workflow Templates'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <Mail className="h-8 w-8" />
              <div className="text-center">
                <div className="font-medium">{isRTL ? 'إشعارات آلية' : 'Auto Notifications'}</div>
                <div className="text-xs text-muted-foreground">
                  {isRTL ? 'إرسال إشعارات للأحداث المهمة' : 'Send notifications for important events'}
                </div>
              </div>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <FileText className="h-8 w-8" />
              <div className="text-center">
                <div className="font-medium">{isRTL ? 'تقارير دورية' : 'Periodic Reports'}</div>
                <div className="text-xs text-muted-foreground">
                  {isRTL ? 'إنشاء تقارير بشكل تلقائي' : 'Generate reports automatically'}
                </div>
              </div>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-6">
              <Users className="h-8 w-8" />
              <div className="text-center">
                <div className="font-medium">{isRTL ? 'إدارة المهام' : 'Task Management'}</div>
                <div className="text-xs text-muted-foreground">
                  {isRTL ? 'توزيع وتتبع المهام' : 'Assign and track tasks'}
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationWorkflows;