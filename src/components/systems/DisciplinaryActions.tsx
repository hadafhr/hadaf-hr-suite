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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  رجوع
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Search className="h-4 w-4 ml-2" />
                  البحث المتقدم
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  إجراء تأديبي جديد
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <AlertTriangle className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام الجزاءات والعقوبات المتقدم
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                منظومة ذكية شاملة لإدارة الإجراءات التأديبية وضمان الانضباط الوظيفي مع أحدث أنظمة المتابعة والتحليل
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">نظام الإجراءات التأديبية</h3>
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">إجمالي الإجراءات</span>
                      <span className="font-bold text-primary">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل الامتثال</span>
                      <span className="font-bold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">القضايا المحلولة</span>
                      <span className="font-bold text-blue-600">41</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">إدارة المخالفات</h3>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">مخالفات متوسطة</span>
                      <span className="font-bold text-yellow-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">مخالفات عالية</span>
                      <span className="font-bold text-red-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل التحسن</span>
                      <span className="font-bold text-green-600">+23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">مؤشرات الانضباط</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">94.2%</div>
                    <div className="text-sm text-gray-600">معدل الامتثال العام</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">78</div>
                    <div className="text-sm text-gray-600">قضايا محلولة</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">12</div>
                    <div className="text-sm text-gray-600">قضايا معلقة</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منظومة الجزاءات المتكاملة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: AlertTriangle, label: "إدارة المخالفات", color: "text-red-600", count: 12 },
                { icon: FileText, label: "التوثيق الرقمي", color: "text-blue-600", count: 24 },
                { icon: Search, label: "نظام التتبع", color: "text-green-600", count: 8 },
                { icon: Calendar, label: "المتابعة الدورية", color: "text-purple-600", count: 15 },
                { icon: ArrowLeft, label: "تقارير تفصيلية", color: "text-orange-600", count: 6 },
                { icon: Plus, label: "إجراءات وقائية", color: "text-teal-600", count: 3 }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className={`mx-auto w-12 h-12 ${item.color} mb-3 p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors flex items-center justify-center relative`}>
                    <item.icon className="w-6 h-6" />
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">312</div>
                <div className="text-sm text-gray-600">إجمالي الحالات المعالجة</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">87%</div>
                <div className="text-sm text-gray-600">معدل نجاح الإجراءات</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">4.2</div>
                <div className="text-sm text-gray-600">متوسط وقت المعالجة (أيام)</div>
              </div>
            </div>
          </CardContent>
        </Card>

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