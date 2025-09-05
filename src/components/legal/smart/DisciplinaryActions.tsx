import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  AlertTriangle, 
  Search, 
  Eye, 
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Scale,
  User,
  Calendar,
  DollarSign,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

export const DisciplinaryActions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Mock data for disciplinary actions pending legal review
  const disciplinaryActions = [
    {
      id: 1,
      caseNumber: 'DA-2024-001',
      employee: {
        name: 'أحمد محمد العلي',
        id: 'EMP-001',
        department: 'تقنية المعلومات',
        position: 'مطور برمجيات'
      },
      violation: {
        type: 'تأخير متكرر',
        category: 'انتهاك سياسة الحضور',
        severity: 'متوسط',
        occurrenceCount: 5,
        date: '2024-01-15'
      },
      proposedAction: {
        type: 'إنذار كتابي',
        reason: 'التأخير المتكرر أكثر من 5 مرات في الشهر',
        monetaryPenalty: 0,
        suspensionDays: 0,
        effectiveDate: '2024-01-20'
      },
      hrRecommendation: 'بناءً على سجل الموظف وتكرار التأخير، نوصي بإصدار إنذار كتابي كإجراء أولي',
      legalReview: {
        status: 'pending',
        assignedTo: 'المستشار القانوني الأول',
        reviewDate: '2024-01-18',
        comments: null,
        decision: null
      },
      complianceCheck: {
        laborLawCompliant: true,
        contractCompliant: true,
        policyCompliant: true,
        notes: 'الإجراء متوافق مع نظام العمل السعودي والسياسة الداخلية'
      },
      evidence: [
        'تقرير الحضور والانصراف',
        'إشعارات تأخير سابقة',
        'محضر اجتماع مع الموظف'
      ]
    },
    {
      id: 2,
      caseNumber: 'DA-2024-002',
      employee: {
        name: 'فاطمة أحمد سالم',
        id: 'EMP-002',
        department: 'المبيعات',
        position: 'مندوبة مبيعات'
      },
      violation: {
        type: 'مخالفة سياسة البيانات',
        category: 'انتهاك السرية',
        severity: 'عالي',
        occurrenceCount: 1,
        date: '2024-01-16'
      },
      proposedAction: {
        type: 'إيقاف عن العمل',
        reason: 'إفشاء معلومات سرية للعملاء',
        monetaryPenalty: 1000,
        suspensionDays: 3,
        effectiveDate: '2024-01-22'
      },
      hrRecommendation: 'الموظفة أفشت معلومات سرية عن العملاء، نوصي بالإيقاف المؤقت والخصم المالي',
      legalReview: {
        status: 'approved',
        assignedTo: 'المستشار القانوني الثاني',
        reviewDate: '2024-01-17',
        comments: 'الإجراء متناسب مع خطورة المخالفة ومتوافق قانونياً',
        decision: 'موافق'
      },
      complianceCheck: {
        laborLawCompliant: true,
        contractCompliant: true,
        policyCompliant: true,
        notes: 'الإجراء متوافق مع بنود السرية في العقد ونظام العمل'
      },
      evidence: [
        'تسجيلات المكالمات',
        'بلاغ من العميل',
        'تقرير تحقيق داخلي',
        'عقد العمل - بند السرية'
      ]
    },
    {
      id: 3,
      caseNumber: 'DA-2024-003',
      employee: {
        name: 'محمد عبدالله النور',
        id: 'EMP-003',
        department: 'الموارد البشرية',
        position: 'أخصائي موارد بشرية'
      },
      violation: {
        type: 'سوء استخدام أنظمة الشركة',
        category: 'انتهاك سياسة تقنية',
        severity: 'منخفض',
        occurrenceCount: 2,
        date: '2024-01-14'
      },
      proposedAction: {
        type: 'إنذار شفهي',
        reason: 'استخدام الإنترنت لأغراض شخصية أثناء العمل',
        monetaryPenalty: 0,
        suspensionDays: 0,
        effectiveDate: '2024-01-19'
      },
      hrRecommendation: 'مخالفة بسيطة، إنذار شفهي كافي مع التأكيد على السياسة',
      legalReview: {
        status: 'rejected',
        assignedTo: 'المستشار القانوني الثالث',
        reviewDate: '2024-01-16',
        comments: 'الموظف في قسم الموارد البشرية، يحتاج معاملة أكثر صرامة كونه قدوة',
        decision: 'مرفوض - نوصي بإنذار كتابي'
      },
      complianceCheck: {
        laborLawCompliant: true,
        contractCompliant: true,
        policyCompliant: false,
        notes: 'يحتاج تعديل الإجراء ليكون متوافقاً مع منصب الموظف'
      },
      evidence: [
        'سجل تصفح الإنترنت',
        'تقرير النشاط على الحاسوب',
        'شهادة زملاء العمل'
      ]
    }
  ];

  const reviewStats = [
    {
      title: 'بانتظار المراجعة',
      value: '8',
      change: '+2',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'تم الموافقة',
      value: '15',
      change: '+3',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'تم الرفض',
      value: '4',
      change: '+1',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'معدل الامتثال',
      value: '92%',
      change: '+3%',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: 'بانتظار المراجعة', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'approved': { label: 'موافق عليه', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'rejected': { label: 'مرفوض', color: 'bg-red-100 text-red-800', icon: XCircle },
      'under_review': { label: 'قيد المراجعة', color: 'bg-blue-100 text-blue-800', icon: Eye }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['pending'];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      'عالي': 'bg-red-100 text-red-800',
      'متوسط': 'bg-yellow-100 text-yellow-800',
      'منخفض': 'bg-green-100 text-green-800'
    };
    
    return <Badge className={severityConfig[severity as keyof typeof severityConfig]}>{severity}</Badge>;
  };

  const getComplianceBadge = (compliant: boolean) => {
    return compliant 
      ? <Badge className="bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle className="h-3 w-3" />متوافق</Badge>
      : <Badge className="bg-red-100 text-red-800 flex items-center gap-1"><XCircle className="h-3 w-3" />غير متوافق</Badge>;
  };

  const handleApprove = (actionId: number) => {
    toast.success('تم الموافقة على الإجراء التأديبي');
  };

  const handleReject = (actionId: number) => {
    toast.success('تم رفض الإجراء التأديبي');
  };

  const handleViewAction = (action: any) => {
    setSelectedAction(action);
    setIsViewOpen(true);
  };

  const filteredActions = disciplinaryActions.filter(action => {
    const matchesSearch = action.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.violation.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || action.legalReview.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">الإجراءات التأديبية القانونية</h2>
          <p className="text-gray-600 mt-2">مراجعة وتدقيق الإجراءات التأديبية للتأكد من التوافق القانوني</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviewStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600">{stat.change}</span>
                    <span className="text-sm text-gray-600 mr-1">هذا الشهر</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="البحث في الإجراءات التأديبية..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="تصفية حسب الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="pending">بانتظار المراجعة</SelectItem>
            <SelectItem value="approved">موافق عليه</SelectItem>
            <SelectItem value="rejected">مرفوض</SelectItem>
            <SelectItem value="under_review">قيد المراجعة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Disciplinary Actions List */}
      <Card>
        <CardHeader>
          <CardTitle>الإجراءات التأديبية المعروضة للمراجعة القانونية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredActions.map((action) => (
              <div key={action.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{action.caseNumber}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(action.legalReview.status)}
                      {getSeverityBadge(action.violation.severity)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewAction(action)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {action.legalReview.status === 'pending' && (
                      <>
                        <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50" onClick={() => handleApprove(action.id)}>
                          <CheckCircle className="ml-2 h-4 w-4" />
                          موافق
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => handleReject(action.id)}>
                          <XCircle className="ml-2 h-4 w-4" />
                          رفض
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">الموظف</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{action.employee.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{action.employee.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">نوع المخالفة</p>
                    <p className="font-medium">{action.violation.type}</p>
                    <p className="text-xs text-gray-500">{action.violation.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">الإجراء المقترح</p>
                    <p className="font-medium">{action.proposedAction.type}</p>
                    {action.proposedAction.monetaryPenalty > 0 && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        غرامة: {action.proposedAction.monetaryPenalty} ريال
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">المراجع القانوني</p>
                    <p className="font-medium">{action.legalReview.assignedTo}</p>
                    <p className="text-xs text-gray-500">تاريخ المراجعة: {action.legalReview.reviewDate}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">توصية الموارد البشرية:</p>
                  <p className="text-sm text-gray-600">{action.hrRecommendation}</p>
                </div>

                {action.legalReview.comments && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-800 mb-2">تعليقات المراجعة القانونية:</p>
                    <p className="text-sm text-blue-700">{action.legalReview.comments}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">توافق مع نظام العمل</p>
                    {getComplianceBadge(action.complianceCheck.laborLawCompliant)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">توافق مع العقد</p>
                    {getComplianceBadge(action.complianceCheck.contractCompliant)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">توافق مع السياسة</p>
                    {getComplianceBadge(action.complianceCheck.policyCompliant)}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>تاريخ المخالفة: {action.violation.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{action.evidence.length} مستندات</span>
                    </div>
                  </div>
                  {action.proposedAction.effectiveDate && (
                    <div>
                      <span className="font-medium">تاريخ النفاذ المقترح: {action.proposedAction.effectiveDate}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Action Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل الإجراء التأديبي - المراجعة القانونية</DialogTitle>
          </DialogHeader>
          {selectedAction && (
            <div className="space-y-6">
              {/* Employee and Case Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">معلومات الموظف</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">الاسم</p>
                      <p className="font-medium">{selectedAction.employee.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">رقم الموظف</p>
                      <p className="font-medium">{selectedAction.employee.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">القسم</p>
                      <p className="font-medium">{selectedAction.employee.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">المنصب</p>
                      <p className="font-medium">{selectedAction.employee.position}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">معلومات القضية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">رقم القضية</p>
                      <p className="font-medium">{selectedAction.caseNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">نوع المخالفة</p>
                      <p className="font-medium">{selectedAction.violation.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الفئة</p>
                      <p className="font-medium">{selectedAction.violation.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">درجة الخطورة</p>
                      {getSeverityBadge(selectedAction.violation.severity)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">عدد مرات الحدوث</p>
                      <p className="font-medium">{selectedAction.violation.occurrenceCount}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Proposed Action */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">الإجراء المقترح</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">نوع الإجراء</p>
                      <p className="font-medium">{selectedAction.proposedAction.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">تاريخ النفاذ</p>
                      <p className="font-medium">{selectedAction.proposedAction.effectiveDate}</p>
                    </div>
                    {selectedAction.proposedAction.monetaryPenalty > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">الغرامة المالية</p>
                        <p className="font-medium text-red-600">{selectedAction.proposedAction.monetaryPenalty} ريال</p>
                      </div>
                    )}
                    {selectedAction.proposedAction.suspensionDays > 0 && (
                      <div>
                        <p className="text-sm text-gray-600">أيام الإيقاف</p>
                        <p className="font-medium text-red-600">{selectedAction.proposedAction.suspensionDays} أيام</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">السبب</p>
                    <p className="font-medium">{selectedAction.proposedAction.reason}</p>
                  </div>
                </CardContent>
              </Card>

              {/* HR Recommendation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">توصية الموارد البشرية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-700">{selectedAction.hrRecommendation}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Check */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">فحص الامتثال</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">نظام العمل السعودي</p>
                      {getComplianceBadge(selectedAction.complianceCheck.laborLawCompliant)}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">عقد العمل</p>
                      {getComplianceBadge(selectedAction.complianceCheck.contractCompliant)}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">السياسة الداخلية</p>
                      {getComplianceBadge(selectedAction.complianceCheck.policyCompliant)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">ملاحظات الامتثال:</p>
                    <p className="text-gray-700">{selectedAction.complianceCheck.notes}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Evidence */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">الأدلة والمستندات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedAction.evidence.map((evidence, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{evidence}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Legal Review */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">المراجعة القانونية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">الحالة</p>
                      {getStatusBadge(selectedAction.legalReview.status)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">المراجع المسؤول</p>
                      <p className="font-medium">{selectedAction.legalReview.assignedTo}</p>
                    </div>
                  </div>
                  
                  {selectedAction.legalReview.comments && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">تعليقات المراجعة:</p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">{selectedAction.legalReview.comments}</p>
                      </div>
                    </div>
                  )}

                  {selectedAction.legalReview.status === 'pending' && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">إضافة تعليق المراجعة:</p>
                      <Textarea 
                        placeholder="اكتب تعليق المراجعة القانونية..."
                        className="mb-4"
                      />
                      <div className="flex gap-3">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="ml-2 h-4 w-4" />
                          الموافقة على الإجراء
                        </Button>
                        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                          <XCircle className="ml-2 h-4 w-4" />
                          رفض الإجراء
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};