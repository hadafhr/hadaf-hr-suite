import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Workflow, Settings, Plus, Eye, Edit, Play, Pause } from 'lucide-react';

export const WorkflowEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');

  const workflowTemplates = [
    { id: 1, name: 'موافقة الإجازات', type: 'إجازة سنوية', steps: 3, status: 'active', usage: 145 },
    { id: 2, name: 'اعتماد البدلات', type: 'بدل إقامة', steps: 2, status: 'active', usage: 89 },
    { id: 3, name: 'موافقة السلف', type: 'سلفة راتب', steps: 4, status: 'draft', usage: 0 }
  ];

  const activeWorkflows = [
    { id: 'WF-001', request: 'REQ-2024-001', template: 'موافقة الإجازات', currentStep: 2, totalSteps: 3, approver: 'مدير الموارد البشرية' },
    { id: 'WF-002', request: 'REQ-2024-003', template: 'موافقة السلف', currentStep: 1, totalSteps: 4, approver: 'المدير المباشر' },
    { id: 'WF-003', request: 'REQ-2024-005', template: 'اعتماد البدلات', currentStep: 2, totalSteps: 2, approver: 'المدير المالي' }
  ];

  const auditLog = [
    { time: '14:30', action: 'موافقة', user: 'أحمد المدير', request: 'REQ-2024-001', step: 'موافقة المدير المباشر' },
    { time: '14:25', action: 'رفض', user: 'سارة المديرة', request: 'REQ-2024-002', step: 'موافقة مدير الموارد البشرية' },
    { time: '14:20', action: 'تفويض', user: 'محمد المدير', request: 'REQ-2024-003', step: 'موافقة المدير المالي' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">محرك سير العمل</h2>
          <p className="text-muted-foreground">إدارة قوالب وعمليات سير العمل للموافقات</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          قالب جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Workflow className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium">قوالب نشطة</h3>
            <p className="text-2xl font-bold mt-2">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Play className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">سير عمل جاري</h3>
            <p className="text-2xl font-bold mt-2">28</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Badge className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">مكتمل اليوم</h3>
            <p className="text-2xl font-bold mt-2">15</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قوالب سير العمل</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workflowTemplates.map(template => (
              <div key={template.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{template.name}</p>
                  <p className="text-sm text-muted-foreground">{template.type} - {template.steps} خطوات - استخدم {template.usage} مرة</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                    {template.status === 'active' ? 'نشط' : 'مسودة'}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>سير العمل النشط</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeWorkflows.map(workflow => (
              <div key={workflow.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{workflow.id} - {workflow.template}</p>
                  <p className="text-sm text-muted-foreground">الطلب: {workflow.request} - الخطوة {workflow.currentStep} من {workflow.totalSteps}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <p>المعتمد الحالي:</p>
                    <p className="font-medium">{workflow.approver}</p>
                  </div>
                  <Button variant="outline" size="sm">عرض</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>سجل التدقيق</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLog.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{log.action} - {log.request}</p>
                  <p className="text-sm text-muted-foreground">{log.step} - {log.user}</p>
                </div>
                <span className="text-sm">{log.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};