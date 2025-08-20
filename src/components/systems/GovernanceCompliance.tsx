import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Shield, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Edit, 
  Plus, 
  Download, 
  Upload, 
  Calendar, 
  Users, 
  BarChart3, 
  Clock, 
  Target, 
  BookOpen, 
  Award, 
  Settings, 
  Bell,
  Gavel,
  Scale,
  Lock,
  UserCheck,
  Database,
  TrendingUp,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

interface GovernanceComplianceProps {
  onBack: () => void;
}

export const GovernanceCompliance: React.FC<GovernanceComplianceProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [isAddPolicyOpen, setIsAddPolicyOpen] = useState(false);

  // Mock data for governance and compliance
  const complianceStats = {
    totalPolicies: 45,
    activePolicies: 42,
    pendingReview: 3,
    complianceRate: 94.2,
    riskLevel: 'منخفض',
    lastAudit: '2024-02-15',
    nextAudit: '2024-08-15',
    violations: 2,
    resolvedViolations: 18
  };

  const policies = [
    {
      id: 'POL001',
      title: 'سياسة السلوك المهني وأخلاقيات العمل',
      category: 'أخلاقيات العمل',
      status: 'نشط',
      version: '2.1',
      lastUpdated: '2024-01-15',
      approvedBy: 'إدارة الموارد البشرية',
      effectiveDate: '2024-02-01',
      reviewDate: '2024-12-01',
      priority: 'عالي',
      compliance: 98,
      description: 'تحدد هذه السياسة المعايير الأخلاقية والسلوكية المطلوبة من جميع الموظفين',
      applicableTo: ['جميع الموظفين'],
      relatedLaws: ['نظام العمل السعودي', 'لائحة السلوك المهني']
    },
    {
      id: 'POL002',
      title: 'سياسة الخصوصية وحماية البيانات',
      category: 'أمن المعلومات',
      status: 'نشط',
      version: '1.5',
      lastUpdated: '2024-03-10',
      approvedBy: 'إدارة تقنية المعلومات',
      effectiveDate: '2024-03-15',
      reviewDate: '2024-09-15',
      priority: 'عالي',
      compliance: 96,
      description: 'تنظم هذه السياسة جمع ومعالجة واستخدام البيانات الشخصية',
      applicableTo: ['جميع الموظفين', 'قسم تقنية المعلومات'],
      relatedLaws: ['نظام حماية البيانات الشخصية', 'لائحة الأمن السيبراني']
    },
    {
      id: 'POL003',
      title: 'سياسة مكافحة التحرش في مكان العمل',
      category: 'بيئة العمل',
      status: 'نشط',
      version: '1.2',
      lastUpdated: '2024-02-20',
      approvedBy: 'الإدارة العليا',
      effectiveDate: '2024-03-01',
      reviewDate: '2024-11-01',
      priority: 'عالي',
      compliance: 100,
      description: 'تحدد إجراءات منع والتعامل مع حالات التحرش في بيئة العمل',
      applicableTo: ['جميع الموظفين', 'الإدارة'],
      relatedLaws: ['نظام مكافحة التحرش', 'نظام العمل السعودي']
    }
  ];

  const riskAssessments = [
    {
      id: 'RISK001',
      title: 'تقييم مخاطر أمن المعلومات',
      category: 'أمن المعلومات',
      riskLevel: 'متوسط',
      probability: 'متوسط',
      impact: 'عالي',
      status: 'قيد المراجعة',
      owner: 'إدارة تقنية المعلومات',
      dueDate: '2024-05-15',
      mitigationActions: 3,
      completedActions: 1
    },
    {
      id: 'RISK002',
      title: 'تقييم مخاطر الامتثال التنظيمي',
      category: 'امتثال',
      riskLevel: 'منخفض',
      probability: 'منخفض',
      impact: 'متوسط',
      status: 'مكتمل',
      owner: 'إدارة الموارد البشرية',
      dueDate: '2024-04-30',
      mitigationActions: 2,
      completedActions: 2
    }
  ];

  const auditActivities = [
    {
      id: 'AUD001',
      title: 'مراجعة داخلية لسياسات الموارد البشرية',
      type: 'مراجعة داخلية',
      status: 'مجدولة',
      auditor: 'فريق المراجعة الداخلية',
      scheduledDate: '2024-05-20',
      scope: ['سياسات التوظيف', 'إجراءات التقييم', 'نظم الحوافز'],
      findings: 0,
      recommendations: 0
    },
    {
      id: 'AUD002',
      title: 'مراجعة خارجية للامتثال التنظيمي',
      type: 'مراجعة خارجية',
      status: 'مكتملة',
      auditor: 'شركة المراجعة المعتمدة',
      completedDate: '2024-02-15',
      scope: ['الامتثال لنظام العمل', 'سياسات الأجور', 'إجراءات السلامة'],
      findings: 2,
      recommendations: 3
    }
  ];

  const trainingPrograms = [
    {
      id: 'TRN001',
      title: 'برنامج التوعية بالامتثال',
      category: 'امتثال',
      status: 'نشط',
      duration: '4 ساعات',
      completionRate: 87,
      enrolledEmployees: 245,
      completedEmployees: 213,
      dueDate: '2024-06-30',
      mandatory: true
    },
    {
      id: 'TRN002',
      title: 'ورشة أمن المعلومات',
      category: 'أمن المعلومات',
      status: 'مجدولة',
      duration: '6 ساعات',
      completionRate: 0,
      enrolledEmployees: 120,
      completedEmployees: 0,
      dueDate: '2024-07-15',
      mandatory: true
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const config = {
      'عالي': 'bg-red-100 text-red-800 border-red-200',
      'متوسط': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منخفض': 'bg-green-100 text-green-800 border-green-200'
    };
    return <Badge className={config[priority as keyof typeof config]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config = {
      'نشط': 'bg-green-100 text-green-800 border-green-200',
      'قيد المراجعة': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'مجدولة': 'bg-blue-100 text-blue-800 border-blue-200',
      'مكتملة': 'bg-green-100 text-green-800 border-green-200',
      'مكتمل': 'bg-green-100 text-green-800 border-green-200'
    };
    return <Badge className={config[status as keyof typeof config]}>{status}</Badge>;
  };

  const getRiskBadge = (risk: string) => {
    const config = {
      'عالي': 'bg-red-100 text-red-800 border-red-200',
      'متوسط': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منخفض': 'bg-green-100 text-green-800 border-green-200'
    };
    return <Badge className={config[risk as keyof typeof config]}>{risk}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#009F87]/10 rounded-lg">
            <Shield className="h-8 w-8 text-[#009F87]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#009F87]">نظام الحوكمة والامتثال</h2>
            <p className="text-muted-foreground">إدارة السياسات والامتثال التنظيمي</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقارير
          </Button>
          <Button 
            onClick={() => setIsAddPolicyOpen(true)}
            className="bg-[#009F87] hover:bg-[#008072] text-white"
          >
            <Plus className="h-4 w-4 ml-2" />
            إضافة سياسة جديدة
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#009F87]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي السياسات</p>
                <p className="text-2xl font-bold text-[#009F87]">{complianceStats.totalPolicies}</p>
                <p className="text-xs text-green-600">↗ +3 هذا الشهر</p>
              </div>
              <FileText className="h-8 w-8 text-[#009F87]/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#009F87]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معدل الامتثال</p>
                <p className="text-2xl font-bold text-green-600">{complianceStats.complianceRate}%</p>
                <p className="text-xs text-green-600">↗ +2.1% من الشهر الماضي</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#009F87]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">مستوى المخاطر</p>
                <p className="text-2xl font-bold text-green-600">{complianceStats.riskLevel}</p>
                <p className="text-xs text-green-600">↓ تحسن بنسبة 15%</p>
              </div>
              <Shield className="h-8 w-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#009F87]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المخالفات النشطة</p>
                <p className="text-2xl font-bold text-orange-600">{complianceStats.violations}</p>
                <p className="text-xs text-green-600">↓ -3 هذا الشهر</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-muted/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 ml-2" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="policies" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <FileText className="h-4 w-4 ml-2" />
            السياسات
          </TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Shield className="h-4 w-4 ml-2" />
            تقييم المخاطر
          </TabsTrigger>
          <TabsTrigger value="audit" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Eye className="h-4 w-4 ml-2" />
            المراجعة
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <BookOpen className="h-4 w-4 ml-2" />
            التدريب
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Compliance Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#009F87]" />
                  مؤشرات الامتثال
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>السياسات النشطة</span>
                    <span className="font-medium">{complianceStats.activePolicies}/{complianceStats.totalPolicies}</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>معدل الامتثال العام</span>
                    <span className="font-medium">{complianceStats.complianceRate}%</span>
                  </div>
                  <Progress value={complianceStats.complianceRate} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التدريب المكتمل</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#009F87]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#009F87]" />
                  جدولة المراجعات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <p className="font-medium text-sm">مراجعة سياسات الموارد البشرية</p>
                      <p className="text-xs text-muted-foreground">مجدولة: 20 مايو 2024</p>
                    </div>
                    {getRiskBadge('متوسط')}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-sm">مراجعة أمن المعلومات</p>
                      <p className="text-xs text-muted-foreground">مكتملة: 15 فبراير 2024</p>
                    </div>
                    {getStatusBadge('مكتملة')}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-sm">المراجعة السنوية الشاملة</p>
                      <p className="text-xs text-muted-foreground">مجدولة: 15 أغسطس 2024</p>
                    </div>
                    {getPriorityBadge('عالي')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="border-[#009F87]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#009F87]" />
                الأنشطة الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'تم تحديث سياسة الخصوصية', time: 'منذ ساعتين', user: 'أحمد المحمد', type: 'update' },
                  { action: 'تم إكمال مراجعة الامتثال', time: 'منذ 4 ساعات', user: 'سارة العلي', type: 'complete' },
                  { action: 'تم إضافة سياسة جديدة', time: 'أمس', user: 'محمد السالم', type: 'new' },
                  { action: 'تم تسجيل مخالفة', time: 'أمس', user: 'النظام الآلي', type: 'violation' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'update' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'complete' ? 'bg-green-100 text-green-600' :
                      activity.type === 'new' ? 'bg-[#009F87]/10 text-[#009F87]' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {activity.type === 'update' && <Edit className="h-4 w-4" />}
                      {activity.type === 'complete' && <CheckCircle2 className="h-4 w-4" />}
                      {activity.type === 'new' && <Plus className="h-4 w-4" />}
                      {activity.type === 'violation' && <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <Card className="border-[#009F87]/20">
            <CardHeader>
              <CardTitle>السياسات والإجراءات</CardTitle>
              <CardDescription>إدارة جميع السياسات المؤسسية وإجراءات الامتثال</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <Card key={policy.id} className="border border-gray-200 hover:border-[#009F87]/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-[#009F87]">{policy.title}</h3>
                            {getStatusBadge(policy.status)}
                            {getPriorityBadge(policy.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{policy.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div>
                              <span className="font-medium">الفئة:</span>
                              <p className="text-muted-foreground">{policy.category}</p>
                            </div>
                            <div>
                              <span className="font-medium">الإصدار:</span>
                              <p className="text-muted-foreground">{policy.version}</p>
                            </div>
                            <div>
                              <span className="font-medium">معدل الامتثال:</span>
                              <p className="text-green-600 font-medium">{policy.compliance}%</p>
                            </div>
                            <div>
                              <span className="font-medium">تاريخ المراجعة:</span>
                              <p className="text-muted-foreground">{policy.reviewDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card className="border-[#009F87]/20">
            <CardHeader>
              <CardTitle>تقييم المخاطر والتخفيف</CardTitle>
              <CardDescription>مراقبة وإدارة المخاطر التنظيمية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAssessments.map((risk) => (
                  <Card key={risk.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{risk.title}</h3>
                            {getRiskBadge(risk.riskLevel)}
                            {getStatusBadge(risk.status)}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium">الاحتمالية:</span>
                              <p className="text-muted-foreground">{risk.probability}</p>
                            </div>
                            <div>
                              <span className="font-medium">التأثير:</span>
                              <p className="text-muted-foreground">{risk.impact}</p>
                            </div>
                            <div>
                              <span className="font-medium">المسؤول:</span>
                              <p className="text-muted-foreground">{risk.owner}</p>
                            </div>
                            <div>
                              <span className="font-medium">الموعد النهائي:</span>
                              <p className="text-muted-foreground">{risk.dueDate}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>إجراءات التخفيف</span>
                              <span>{risk.completedActions}/{risk.mitigationActions}</span>
                            </div>
                            <Progress value={(risk.completedActions / risk.mitigationActions) * 100} className="h-2" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card className="border-[#009F87]/20">
            <CardHeader>
              <CardTitle>أنشطة المراجعة والتدقيق</CardTitle>
              <CardDescription>متابعة جميع أنشطة المراجعة الداخلية والخارجية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditActivities.map((audit) => (
                  <Card key={audit.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{audit.title}</h3>
                            {getStatusBadge(audit.status)}
                            <Badge variant="outline">{audit.type}</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                            <div>
                              <span className="font-medium">المدقق:</span>
                              <p className="text-muted-foreground">{audit.auditor}</p>
                            </div>
                            <div>
                              <span className="font-medium">التاريخ:</span>
                              <p className="text-muted-foreground">
                                {audit.status === 'مكتملة' ? audit.completedDate : audit.scheduledDate}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium">النتائج:</span>
                              <p className="text-muted-foreground">{audit.findings} نتيجة</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">نطاق المراجعة:</p>
                            <div className="flex flex-wrap gap-1">
                              {audit.scope.map((item, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card className="border-[#009F87]/20">
            <CardHeader>
              <CardTitle>برامج التدريب على الامتثال</CardTitle>
              <CardDescription>متابعة التدريبات الإجبارية والاختيارية للموظفين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingPrograms.map((program) => (
                  <Card key={program.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{program.title}</h3>
                            {getStatusBadge(program.status)}
                            {program.mandatory && <Badge className="bg-red-100 text-red-800">إجباري</Badge>}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <span className="font-medium">المدة:</span>
                              <p className="text-muted-foreground">{program.duration}</p>
                            </div>
                            <div>
                              <span className="font-medium">المسجلين:</span>
                              <p className="text-muted-foreground">{program.enrolledEmployees}</p>
                            </div>
                            <div>
                              <span className="font-medium">المكتملين:</span>
                              <p className="text-muted-foreground">{program.completedEmployees}</p>
                            </div>
                            <div>
                              <span className="font-medium">الموعد النهائي:</span>
                              <p className="text-muted-foreground">{program.dueDate}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>معدل الإنجاز</span>
                              <span>{program.completionRate}%</span>
                            </div>
                            <Progress value={program.completionRate} className="h-2" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Policy Dialog */}
      <Dialog open={isAddPolicyOpen} onOpenChange={setIsAddPolicyOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة سياسة جديدة</DialogTitle>
            <DialogDescription>
              قم بإنشاء سياسة جديدة لتعزيز الامتثال التنظيمي
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان السياسة</Label>
                <Input id="title" placeholder="مثال: سياسة أمن المعلومات" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">الفئة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethics">أخلاقيات العمل</SelectItem>
                    <SelectItem value="security">أمن المعلومات</SelectItem>
                    <SelectItem value="environment">بيئة العمل</SelectItem>
                    <SelectItem value="compliance">امتثال</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea id="description" placeholder="وصف مختصر للسياسة وأهدافها" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">الأولوية</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">عالي</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="low">منخفض</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="effective-date">تاريخ السريان</Label>
                <Input id="effective-date" type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddPolicyOpen(false)}>
                إلغاء
              </Button>
              <Button 
                className="bg-[#009F87] hover:bg-[#008072] text-white"
                onClick={() => {
                  toast.success('تم إنشاء السياسة بنجاح');
                  setIsAddPolicyOpen(false);
                }}
              >
                حفظ السياسة
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};