import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, AlertTriangle, FileText, Search, Plus, Calendar } from 'lucide-react';

interface DisciplinaryActionsProps {
  onBack: () => void;
}

interface DisciplinaryAction {
  id: string;
  employeeName: string;
  employeeId: string;
  actionType: 'warning' | 'suspension' | 'termination' | 'written_warning';
  reason: string;
  description: string;
  actionDate: string;
  actionBy: string;
  status: 'pending' | 'approved' | 'closed';
  severity: 'low' | 'medium' | 'high';
  followUpDate?: string;
}

export const DisciplinaryActions: React.FC<DisciplinaryActionsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const disciplinaryActions: DisciplinaryAction[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      actionType: 'written_warning',
      reason: 'تأخير متكرر',
      description: 'تأخير متكرر عن مواعيد العمل الرسمية لأكثر من 5 مرات في الشهر الماضي',
      actionDate: '2024-01-15',
      actionBy: 'سارة أحمد - مدير الموارد البشرية',
      status: 'approved',
      severity: 'medium',
      followUpDate: '2024-02-15'
    },
    {
      id: '2',
      employeeName: 'فاطمة عبد الرحمن',
      employeeId: 'EMP002',
      actionType: 'warning',
      reason: 'عدم اتباع السياسات',
      description: 'عدم اتباع سياسة الشركة المتعلقة بالحضور والانصراف',
      actionDate: '2024-01-20',
      actionBy: 'محمد خالد - مدير القسم',
      status: 'pending',
      severity: 'low'
    },
    {
      id: '3',
      employeeName: 'عبد الله سعد',
      employeeId: 'EMP003',
      actionType: 'suspension',
      reason: 'سوء السلوك',
      description: 'سوء سلوك مع زميل في العمل وعدم احترام القواعد الداخلية',
      actionDate: '2024-01-25',
      actionBy: 'علي حسن - المدير العام',
      status: 'approved',
      severity: 'high',
      followUpDate: '2024-02-01'
    }
  ];

  const getActionTypeBadge = (type: string) => {
    const typeConfig = {
      warning: { text: isRTL ? 'تحذير شفهي' : 'Verbal Warning', className: 'bg-yellow-100 text-yellow-800' },
      written_warning: { text: isRTL ? 'إنذار كتابي' : 'Written Warning', className: 'bg-orange-100 text-orange-800' },
      suspension: { text: isRTL ? 'إيقاف عن العمل' : 'Suspension', className: 'bg-red-100 text-red-800' },
      termination: { text: isRTL ? 'إنهاء خدمات' : 'Termination', className: 'bg-gray-100 text-gray-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: isRTL ? 'في الانتظار' : 'Pending', className: 'bg-blue-100 text-blue-800' },
      approved: { text: isRTL ? 'معتمد' : 'Approved', className: 'bg-green-100 text-green-800' },
      closed: { text: isRTL ? 'مغلق' : 'Closed', className: 'bg-gray-100 text-gray-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      low: { text: isRTL ? 'منخفض' : 'Low', className: 'bg-green-100 text-green-800' },
      medium: { text: isRTL ? 'متوسط' : 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      high: { text: isRTL ? 'عالي' : 'High', className: 'bg-red-100 text-red-800' }
    };
    return severityConfig[severity as keyof typeof severityConfig];
  };

  const filteredActions = disciplinaryActions.filter(action => {
    const matchesSearch = action.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || action.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'الإجراءات التأديبية' : 'Disciplinary Actions'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'إدارة وتتبع الإجراءات التأديبية للموظفين' : 'Manage and track employee disciplinary actions'}
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {isRTL ? 'إجراء تأديبي جديد' : 'New Disciplinary Action'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إجمالي الإجراءات' : 'Total Actions'}
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'في الانتظار' : 'Pending'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'هذا الشهر' : 'This Month'}
                  </p>
                  <p className="text-2xl font-bold text-red-600">5</p>
                </div>
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'حالات عالية الخطورة' : 'High Severity'}
                  </p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="actions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="actions">{isRTL ? 'الإجراءات التأديبية' : 'Disciplinary Actions'}</TabsTrigger>
            <TabsTrigger value="policies">{isRTL ? 'السياسات' : 'Policies'}</TabsTrigger>
            <TabsTrigger value="reports">{isRTL ? 'التقارير' : 'Reports'}</TabsTrigger>
          </TabsList>

          <TabsContent value="actions">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في الإجراءات...' : 'Search actions...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Actions List */}
            <div className="space-y-6">
              {filteredActions.map((action) => {
                const actionTypeBadge = getActionTypeBadge(action.actionType);
                const statusBadge = getStatusBadge(action.status);
                const severityBadge = getSeverityBadge(action.severity);
                
                return (
                  <Card key={action.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <CardTitle className="text-lg">{action.employeeName}</CardTitle>
                            <p className="text-sm text-muted-foreground">{action.employeeId}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={actionTypeBadge.className}>
                            {actionTypeBadge.text}
                          </Badge>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <Badge className={severityBadge.className}>
                            {severityBadge.text}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">
                              {isRTL ? 'سبب الإجراء' : 'Reason'}
                            </h4>
                            <p className="text-sm font-medium">{action.reason}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">
                              {isRTL ? 'الوصف' : 'Description'}
                            </h4>
                            <p className="text-sm">{action.description}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ الإجراء:' : 'Action Date:'}</span>
                            <span className="text-sm font-medium">{action.actionDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'بواسطة:' : 'Action By:'}</span>
                            <span className="text-sm">{action.actionBy}</span>
                          </div>
                          {action.followUpDate && (
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ المتابعة:' : 'Follow-up Date:'}</span>
                              <span className="text-sm font-medium text-orange-600">{action.followUpDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'تحديث الحالة' : 'Update Status'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'طباعة' : 'Print'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'سياسات الانضباط' : 'Disciplinary Policies'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'عرض وإدارة سياسات الانضباط والإجراءات التأديبية في الشركة' : 'View and manage company disciplinary policies and procedures'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'تقارير الإجراءات التأديبية' : 'Disciplinary Action Reports'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'تقارير مفصلة عن الإجراءات التأديبية والاتجاهات' : 'Detailed reports on disciplinary actions and trends'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};